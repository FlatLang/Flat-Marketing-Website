import { RemovalPolicy } from 'aws-cdk-lib';
import type { SSTConfig } from 'sst';
import { SvelteKitSite, Table } from 'sst/constructs';
import { fetchSstSecret } from './sst-secrets';
import { SSMClient } from '@aws-sdk/client-ssm';

export default {
  config(_input) {
    return {
      name: 'Flat-Website',
      region: 'us-east-1',
    };
  },
  async stacks(app) {
    return app.stack(async function Site({ stack, app }) {
      const ssm = new SSMClient({ region: stack.region });
      const GITHUB_API_TOKEN = await fetchSstSecret(ssm, app.name, 'GITHUB_API_TOKEN', stack.stage);
      const DOMAIN = await fetchSstSecret(ssm, app.name, 'DOMAIN', stack.stage);

      const cacheTable = new Table(stack, 'cache', {
        fields: {
          key: 'string',
          value: 'string',
        },
        primaryIndex: { partitionKey: 'key' },
        cdk: {
          table: {
            removalPolicy: RemovalPolicy.DESTROY,
          },
        },
      });

      const isProd = stack.stage === 'prod';
      const subdomain = isProd ? '' : `${stack.stage}.`;
      const domainName = `${subdomain}${DOMAIN}`;

      new SvelteKitSite(stack, 'flatlang', {
        customDomain: {
          hostedZone: DOMAIN,
          domainName,
        },
        environment: {
          GITHUB_API_TOKEN,
          LOGGING_DEFAULT_SHOW_FORMATTING: 'false',
          LOGGING_DEFAULT_SHOW_PREFIX: 'true',
          LOGGING_DEBUG_LABEL_LOGGING_LEVELS: '*',
        },
        bind: [cacheTable],
      });

      stack.addOutputs({
        host: `https://${domainName}`,
      });
    });
  },
} satisfies SSTConfig;

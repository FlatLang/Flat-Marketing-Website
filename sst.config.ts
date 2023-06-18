import { RemovalPolicy } from 'aws-cdk-lib';
import type { SSTConfig } from 'sst';
import { SvelteKitSite, Table } from 'sst/constructs';

const { GITHUB_API_TOKEN } = process.env as { [key: string]: string };

if (!GITHUB_API_TOKEN) throw Error('GITHUB_API_TOKEN environment variable is required');

export default {
  config(_input) {
    return {
      name: 'Flat-Website',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
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
      const domain = 'flatlang.org';
      const subdomain = isProd ? '' : `${stack.stage}.`;
      const domainName = `${subdomain}${domain}`;

      new SvelteKitSite(stack, 'flatlang', {
        customDomain: {
          hostedZone: domain,
          domainName,
        },
        environment: {
          GITHUB_API_TOKEN,
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

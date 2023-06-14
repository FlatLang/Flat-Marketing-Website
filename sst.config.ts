import type { SSTConfig } from 'sst';
import { SvelteKitSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'Flat-Website',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const isProd = stack.stage === 'prod';
      const domain = 'flatlang.org';
      const subdomain = isProd ? '' : `${stack.stage}.`;
      const domainName = `${subdomain}${domain}`;

      const site = new SvelteKitSite(stack, 'flatlang', {
        customDomain: {
          hostedZone: domain,
          domainName,
        },
        edge: isProd,
        environment: {
          API_HOST: `https://api.${domain}/api`,
        },
      });

      stack.addOutputs({
        url: site.url,
        host: `https://${domainName}`,
      });
    });
  },
} satisfies SSTConfig;

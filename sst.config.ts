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

      const site = new SvelteKitSite(stack, 'site', {
        customDomain: {
          hostedZone: domain,
          domainName,
        },
        edge: isProd,
      });

      stack.addOutputs({
        url: site.url,
        host: `https://${domainName}`,
      });
    });
  },
} satisfies SSTConfig;

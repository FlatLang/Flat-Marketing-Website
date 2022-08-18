import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import inlineSvg from './inline-svg.js'
import highlight from './highlight.js'
import replaceElement from './replace-element.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
    'flat-html': async function (args) {
      let code = args.content;

      code = (await inlineSvg(args)).code;
      code = (await highlight({...args, content: code})).code;
      code = (await replaceElement({...args, content: code})).code;

      return {code};
    },
    'replace': [[/(from\s*["'])src\//g, "$1/src/"]]
  }),

	kit: {
		adapter: adapter({
      // default options are shown. On some platforms
      // these options are set automatically — see below
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: true
    }),
    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: true
    }
	}
};

export default config;

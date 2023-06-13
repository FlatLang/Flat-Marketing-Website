import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: [{ find: 'src/', replacement: '/src/' }],
  },
};

export default config;

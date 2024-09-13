import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

// biome-ignore lint/style/noDefaultExport: vitest config file
export default defineConfig({
  plugins: [
    swc.vite({
      module: { type: 'nodenext' },
    }),
  ],
});

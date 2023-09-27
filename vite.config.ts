import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: [
      { find: '/@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  plugins: [
    vue({ script: { defineModel: true } }),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'vue-ui',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});

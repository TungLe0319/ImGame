import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
  ],
  build: {
    outDir: "../im-board/client",
    sourcemap: false,
  },
  server: {
    port: 8080,
  },
});

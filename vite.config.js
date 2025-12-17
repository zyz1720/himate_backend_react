import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import zipPack from 'vite-plugin-zip-pack';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  base: './',
  server: {
    hot: true,
    host: true,
    https: false,
    port: 8080,
    cors: true,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000/",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, "")
    //   }
    // }
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
      // 在生产构建中排除 mockjs
      external: process.env.NODE_ENV === 'production' ? ['mockjs'] : [],
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    // mock插件
    viteMockServe({
      mockPath: './src/mock', // mock文件夹路径
      supportTs: false, // 支持ts文件
      enable: process.env.NODE_ENV === 'development', // 只有开发环境才开启mock
    }),
    // 本地https证书
    mkcert(),
    // 打包zip
    zipPack({
      inDir: 'dist',
      outDir: 'archive',
      outFileName: 'dist.zip',
      pathPrefix: '',
    }),
  ],
});

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import fs from 'fs';
import path from 'path';
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteCompression(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    {
      // 插件逻辑：读取构建后的index.html文件中的js和css文件路径链接，并放到404.html文件中
      // 插件目的：在不支持history路由模式的Github Page中，history路由会被返回404.html，我们在404.html中拦截并处理前端路由。
      name: 'inject-404-scripts',
      apply: 'build', // 仅在构建时应用
      writeBundle() {
        // 在构建后的index.html中获取脚本和链接
        const indexHtmlPath = path.join(__dirname, 'docs/index.html');
        const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
        
        // 使用正则表达式提取脚本和链接
        const scriptRegex = /<script type="module" crossorigin src="(.+?)"><\/script>/g;
        const linkRegex = /<link rel="stylesheet" crossorigin href="(.+?)">/g;

        let scripts = '';
        let links = '';

        let scriptMatch;
        while ((scriptMatch = scriptRegex.exec(indexHtmlContent)) !== null) {
          scripts += `<script type="module" crossorigin src="${scriptMatch[1]}"></script>\n`;
        }

        let linkMatch;
        while ((linkMatch = linkRegex.exec(indexHtmlContent)) !== null) {
          links += `<link rel="stylesheet" crossorigin href="${linkMatch[1]}">\n`;
        }

        // 读取404.html模板
        const notFoundHtmlPath = path.join(__dirname, 'public/404.html');
        let notFoundHtmlContent = fs.readFileSync(notFoundHtmlPath, 'utf-8');

        // 将提取的脚本和链接注入到404.html中
        notFoundHtmlContent = notFoundHtmlContent.replace('</head>', `  ${scripts}    ${links}  </head>`);

        // 将修改后的内容写回404.html
        fs.writeFileSync(path.join(__dirname, 'docs/404.html'), notFoundHtmlContent);
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'docs', // 默认值是'dist'
  },
  base: '/kebiao'
})

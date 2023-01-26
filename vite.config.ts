import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/*.ts', 'src/*.tsx']
    })
  ],
  resolve: {
    alias: [
      {
        // 约定：使用 @ 表示 src 文件所在路径
        find:'@',
        replacement:path.resolve(__dirname, 'src'),
      }
    ]
  },
});

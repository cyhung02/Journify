import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        viteCompression({
            algorithm: 'gzip', // 或 'brotliCompress'
            threshold: 10240, // 大於 10kb 的檔案才會被壓縮
        })
    ],
    base: '/',
    build: {
        minify: 'terser', // 使用 terser 進行更強的壓縮
        terserOptions: {
            compress: {
                drop_console: true, // 移除 console.*
                drop_debugger: true, // 移除 debugger
                pure_funcs: ['console.log'] // 將純函數調用視為副作用
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    // 將 React 相關庫單獨打包
                    'react-vendor': ['react', 'react-dom'],
                    // 將日期處理庫單獨打包
                    'date-vendor': ['date-fns'],
                    // 將動畫庫單獨打包
                    'animation-vendor': ['framer-motion']
                }
            }
        }
    }
})
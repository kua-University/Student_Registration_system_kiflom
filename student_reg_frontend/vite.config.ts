import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api1': {
          target: 'http://localhost:3000', 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api1/, ''),
          
          configure: (proxy, options) => {
             proxy.on('error', (err, _req, _res) => {
              console.log('error', err);
             });
             proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Request sent to target:', req.method, req.url);
             });
             proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Response received from target:', proxyRes.statusCode, req.url);
             });
       }
      },
       '/api2': {
          target: 'http://localhost:3001', 
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api2/, ''),
          
          configure: (proxy, options) => {
             proxy.on('error', (err, _req, _res) => {
              console.log('error', err);
             });
             proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Request sent to target:', req.method, req.url);
             });
             proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Response received from target:', proxyRes.statusCode, req.url);
             });
       }
      },
  },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

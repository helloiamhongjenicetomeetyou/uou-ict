import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

/**
 * 공공데이터 오픈API는 브라우저에 CORS 헤더를 주지 않는다.
 * 그래서 개발 서버가 프록시 역할을 하고, 프론트는 항상 같은 출처(/openapi/*)로만 호출한다.
 * 운영에서는 이 프록시를 백엔드/게이트웨이가 대신해야 한다.
 */
const PROXY_TARGETS = {
  '/openapi/datago': 'https://apis.data.go.kr',
} as const;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: Object.fromEntries(
      Object.entries(PROXY_TARGETS).map(([prefix, target]) => [
        prefix,
        {
          target,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(prefix, ''),
        },
      ]),
    ),
  },
});

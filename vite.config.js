import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 현재 모드에 따라 .env 파일 로드
  const env = loadEnv(mode, import.meta.env.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env': env, // 환경 변수를 process.env로 정의
    },
  };
});

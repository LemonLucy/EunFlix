import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // 현재 모드에 따라 .env 파일 로드
  const env = loadEnv(mode, import.meta.env.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'import.meta.env': JSON.stringify(env), // import.meta.env로 환경 변수를 설정
    },
  };
});

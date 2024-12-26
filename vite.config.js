import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // mode에 따라 직접 파일 지정
  const envFile = mode === 'production' ? '.env.prod' : '.env.dev';
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'import.meta.env': JSON.stringify(env), // 환경 변수를 import.meta.env에 매핑
    },
  };
});

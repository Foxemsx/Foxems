/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VERCEL_URL: string | undefined;
  // Add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

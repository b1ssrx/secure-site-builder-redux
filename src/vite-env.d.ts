/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  // қажет болса, басқа .env айнымалыларды да осында қос
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/* ✅ Asset файлдарын TypeScript-ке таныстыру */
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";

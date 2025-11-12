declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";


interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css';
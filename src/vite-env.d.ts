/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATAGO_SERVICE_KEY?: string;
  readonly VITE_OPENAPI_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

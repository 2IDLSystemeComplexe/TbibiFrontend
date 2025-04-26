interface ImportMetaEnv {
    readonly VITE_CHATBOT_URL: string;
    // add more variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
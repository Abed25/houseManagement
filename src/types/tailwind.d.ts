/// <reference types="tailwindcss/tailwind-config" />

declare module 'tailwindcss/tailwind-config' {
  export interface TailwindConfig {
    content: string[];
    theme: {
      extend: {
        colors?: Record<string, string>;
      };
    };
    plugins: any[];
  }
} 
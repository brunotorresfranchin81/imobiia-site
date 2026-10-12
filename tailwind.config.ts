import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        preto: "var(--preto)",
        branco: "var(--branco)",
        dourado: {
          600: "var(--dourado-600)",
          700: "var(--dourado-700)",
          texto: "var(--dourado-texto)",
        },
        header: {
          DEFAULT: "var(--header-bg)",
          foreground: "var(--header-fg)",
        },
        rodape: {
          DEFAULT: "var(--footer-bg)",
          foreground: "var(--footer-fg)",
          suave: "var(--footer-fg-suave)",
        },
        whatsapp: "var(--whatsapp)",
        "borda-forte": "var(--borda-forte)",
        "borda-dourada": "var(--borda-dourada)",
        cinza: {
          100: "var(--cinza-100)",
          400: "var(--cinza-400)",
          600: "var(--cinza-600)",
        },
        acao: "var(--cor-acao)",
        "acao-hover": "var(--cor-acao-hover)",
        superficie: "var(--superficie)",
        "superficie-alt": "var(--superficie-alt)",
        texto: "var(--texto)",
        "texto-suave": "var(--texto-suave)",
        borda: "var(--borda)",
        foco: "var(--foco)",
        erro: "var(--erro)",
        sucesso: "var(--sucesso)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        sm: "var(--raio-sm)",
        md: "var(--raio-md)",
        lg: "var(--raio-lg)",
      },
      transitionDuration: {
        rapida: "120ms",
        media: "240ms",
      },
      transitionTimingFunction: {
        "ease-out-custom": "cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
};
export default config;

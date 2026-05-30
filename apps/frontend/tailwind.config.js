/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0A84FF', // Neon Blue
        'brand-purple': '#9A67EA', // Purple
        'brand-emerald': '#10B981', // Emerald Green
        
        'brand-light': '#FFFFFF', // Pure White
        'brand-gray': '#9CA3AF', // Light Gray subtext
        'brand-dark': '#000000', // Absolute dark
        
        // Semantic overrides
        'primary': '#0A84FF', 
        'primary-hover': '#3b82f6',
        'on-primary': '#FFFFFF',
        
        'surface': '#111827', // dark surface
        'on-surface': '#FFFFFF', 
        'on-surface-variant': '#9CA3AF', 
        
        'outline': '#374151', 
        'outline-variant': '#1F2937', 
        
        'surface-container-highest': '#374151',
        'surface-container-high': '#1F2937',
        'surface-container-low': '#111827',
        'surface-container-lowest': '#000000', 
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, rgba(10,132,255,0.05) 0%, rgba(0,0,0,0) 100%)',
        'sci-fi-gradient': 'linear-gradient(to right, #0A84FF, #9A67EA, #10B981)',
      }
    },
  },
  plugins: [],
}

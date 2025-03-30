import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './modules/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            boxShadow: {
                custom: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
            },
            colors: {
                //* default colors
                background_gray: '#F8F8F8',
                gray: '#f2f2f2',
                border_gray: '#d0d0d0',

                green: '#349934',
                blue: '#0000ff',
                red: '#ff0000',
                yellow: '#ffff00',
                white: '#ffffff',
                black: '#000000',
                gradient_start: '#007FDC',
                gradient_end: '#27CBC2',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'dark', 'drakula', 'cupcake', 'cyberpunk', 'pastel', 'autumn'],
    },
}
export default config

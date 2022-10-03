/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'hero-background': "url('images/black-panther.webp')",
            },
        },
    },
    plugins: [],
};

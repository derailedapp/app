/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        fontFamily: {
            main: "'JetBrains Mono'",
            header: '"IBM Plex Mono", sans-serif'
        },
        colors: {
            brand: "rgb(115 100 255)",
            borders: "rgb(118, 171, 174)",
            "not-quite-dark-blue": "rgb(22, 23, 33)",
            "quite-lighter-dark-blue": "rgb(27, 28, 41)"
        },
      },
    },
    plugins: [],
}
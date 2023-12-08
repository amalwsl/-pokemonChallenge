const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    mode: "jit",
    purge: ["./build/*.html", "./src/**/*.tsx", "./safeclasses.txt"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            animation: {
                "bounce-slow": "bounce 2s linear infinite",
            },
            fontFamily: {
                poppins: ["Helvetica"],
            },
            boxShadow: {
                d: " 1px 2px 4px rgba(0, 0, 0, 0.1)",
                drop: "1px 2px 10px rgba(0, 0, 0, 0.1)",
                i: "inset 1px 2px 4px rgba(0, 0, 0, 0.1)",
            },
            colors: {
                primary: "#00A3E0", // blue
                "primary-light": "rgba(0, 163, 224, 0.3)", //extra light blue
                "secondary-dark": "#000000", // black
                secondary: "rgba(0, 0, 0, 0.6)", //gray
                "secondary-light": "rgba(0, 0, 0, 0.3)", //light gray
                "secondary-extralight": "rgba(0, 0, 0, 0.02)", //for bg => extra light gray
                tertiary: "#FF0000", // red
                active: "rgba(0, 163, 224, 0.8)", // light blue
                disabled: "rgba(0, 0, 0, 0.1)",
                "secondary-medium": "#25252568",
            },
            cursor: {
                crosshair: "crosshair",
            },
            animation: {
                "bounce-slow": "bounce 2s linear infinite",
            },
            screens: {
                print: { raw: "print" },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}

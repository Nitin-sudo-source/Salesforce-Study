/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.html",             // Tailwind input file
      "./src/**/*.js",               // JS file for dynamic class usage
      "./force-app/**/*.html",       // Lightning Web Components
      "./force-app/**/*.js"          // LWC JS (e.g. for conditional classes)
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
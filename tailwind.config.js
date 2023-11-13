/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors:{
        "slate":{
          "1":"#252931",
          "2":"#383e49"
        }
      },
      screens:{
        'hsm': "420px"
      }
    },
  },
  plugins: [],
}


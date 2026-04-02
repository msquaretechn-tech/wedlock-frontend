/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      fontFamily: {

        'Proxima-Nova-Regular': ['Proxima-Nova-Regular', 'sans-serif'],
        'Proxima-Nova-SemiBold': ['Proxima-Nova-SemiBold', 'sans-serif'],
        'Proxima-Nova-Bold': ['Proxima-Nova-Bold', 'sans-serif'] ,
        'Proxima-Nova-Extrabold': ['Proxima-Nova-Extrabold', 'sans-serif'],
        'Proxima-Nova-Light': ['Proxima-Nova-Light', 'sans-serif'],
        'Proxima-Nova-Black': ['Proxima-Nova-Black', 'sans-serif'],
    },
    fontSize: {
      'h2-mobile': ['28px', '42px'],  // Size 28px with line-height 42px
      'h2-desktop': ['65px', '83.2px'], // Size 64px with line-height 83.2px
      'p-mobile':['16px','24px'],
      'p-desktop':['28px', '42px']

    },
    fontWeight:{
      'bold': '700'
    }

    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
}


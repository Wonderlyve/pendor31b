/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF4B4B',
        secondary: '#4A90E2',
        accent: '#FFD600',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'sport-pattern': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L17.515 10.485 18.93 11.9l7.9-7.9h-2.83zm5.656 0l-9.9 9.9 1.415 1.415 7.9-7.9h-2.83zm5.657 0l-9.9 9.9 1.415 1.415 7.9-7.9h-2.83zM38.97 0l-9.9 9.9 1.415 1.415L41.8 0h-2.83zm5.657 0l-9.9 9.9 1.415 1.415L47.457 0h-2.83zm5.657 0l-9.9 9.9 1.415 1.415L53.114 0h-2.83zm5.657 0l-9.9 9.9 1.415 1.415L58.77 0h-2.83zm5.657 0l-9.9 9.9 1.415 1.415L64.428 0h-2.83zm5.657 0l-9.9 9.9 1.415 1.415L70.085 0h-2.83zm5.657 0l-9.9 9.9 1.415 1.415L75.742 0h-2.83zm5.657 0l-9.9 9.9 1.415 1.415L81.4 0h-2.83zM0 0c1.837 0 3.523.67 4.828 1.778L0 6.606V0zm0 6.606L4.828 1.778C3.523.67 1.837 0 0 0v6.606z\' fill=\'%234A90E2\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
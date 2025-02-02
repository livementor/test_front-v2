/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,vue}",
    "./layouts/**/*.{js,ts,vue}",
    "./components/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
        colors: {
          primary: 'var(--primary)',
          'primary-light': 'var(--primary-light)',
          'primary-dark': 'var(--primary-dark)',
          secondary: 'var(--secondary)',
          'secondary-light': 'var(--secondary-light)',
          'secondary-dark': 'var(--secondary-dark)',
          accent: 'var(--accent)',
          'accent-light': 'var(--accent-light)',
          white: 'var(--white)',
          neutral: 'var(--neutral)',
          'neutral-light': 'var(--neutral-light)',
          'neutral-dark': 'var(--neutral-dark)',
          'neutral-80': 'var(--neutral-80)',
          'neutral-60': 'var(--neutral-60)',
          'neutral-40': 'var(--neutral-40)',
          'neutral-20': 'var(--neutral-20)',
          success: 'var(--success)',
          'success-light': 'var(--success-light)',
          danger: 'var(--danger)',
          'danger-light': 'var(--danger-light)',
          warning: 'var(--warning)',
          'warning-light': 'var(--warning-light)',
          info: 'var(--info)',
          'info-light': 'var(--info-light)',
          'other-1': 'var(--other-1)',
          'other-1-light': 'var(--other-1-light)',
        },
    },
  },
  plugins: [],
}


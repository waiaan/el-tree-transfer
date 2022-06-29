module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {}
  },
  plugins: [],
  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
}

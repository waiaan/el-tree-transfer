module.exports = (api) => {
  if (/\.scss$/.test(api.file)) {
    return {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}

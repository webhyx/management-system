module.exports = {
  devServer: {
    port:7777,
    open:true,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}
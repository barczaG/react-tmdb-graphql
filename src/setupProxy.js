//eslint-disable-next-line
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: 'http://tmdb.sandbox.zoosh.ie/',
      changeOrigin: true,
      pathRewrite: {
        '^/graphql': '/', // rewrite path
      },
    })
  );
};

//eslint-disable-next-line
const { createProxyMiddleware } = require("http-proxy-middleware");

// We need this reverse proxy to bypass CORS
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

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This is the path your React app will use to proxy requests
    createProxyMiddleware({
      target: 'https://test-api-a1g.pages.dev', // The actual endpoint
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // This removes the /api prefix when the request is proxied
      },
    })
  );
};

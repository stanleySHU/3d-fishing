const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/HttpServer', {
        target : 'http://pmj.w88uat.com',
        changeOrigin : true,
        ws: false
    }));
};




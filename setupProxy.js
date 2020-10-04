var proxy = require ("http-proxy-middleware");

module.exports = function (app) {
        app.use (
                proxy("/api", {
                        target: "http://127.0.0.1:3010/api",
                        changeOrigin: true,
                        secure: false
                })
        );

        app.use (
                proxy("/admin", {
                        target: "http://127.0.0.1:3010/admin",
                        changeOrigin: true,
                        secure: false
                })
        );

        app.use (
                proxy("/upload", {
                        target: "http://127.0.0.1:3010/",
                        changeOrigin: true,
                        secure: false
                })
        );

        app.use (
                proxy("/baidu", {
                        target: "https://www.baidu.com/",
                        changeOrigin: true,
                        secure: false,
                        pathRewrite: {
                                "^/baidu": ""
                        }
                })
        );
};

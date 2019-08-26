module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        port: 8081, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        proxy: { // 配置跨域
            '/api': {
                target: 'http://localhost:3000/',
            }
        },
    }
}
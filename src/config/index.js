const CONFIG = {
    // 开发环境配置
    development: {
		baseUrl: 'https://tenapi.cn/v2', // 后台接口请求地址
        websocketUrl: '', // websocket服务端地址
        weixinAppId: '' // 微信公众号appid
    },
    // 生产环境配置
    production: {
        baseUrl: 'https://tenapi.cn/v2', // 后台接口请求地址
        websocketUrl: '', // websocket服务端地址
        weixinAppId: '' // 微信公众号appid
    }

};
export default CONFIG[process.env.NODE_ENV];
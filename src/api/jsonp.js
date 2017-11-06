
/**
 * ixaoq
 * jsonp跨域
 */

const jsonp = function (options) {
    if (!options.url) {
        throw new Error("参数url不合法");
    }
    let callback = options.callback || "callback",  //回调参数，如： ?callback=jquery123456
        callbackName = options.callbackName,        //回调参数，如： ?callback=jquery123456
        data = options.data || {},                  //参数
        time = options.timeout || 10000,            //超时时间
        success = options.success,                  //成功函数
        fail = options.fail;                        //失败函数

    //格式化参数
    function formatParams(obj) {
        if (typeof obj === "string") return obj;
        var arr = [];
        for (var name in obj) {
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(obj[name]));
        }
        return arr.join('&');
    }

    //创建 script 标签
    let oHead = document.getElementsByTagName('head')[0] || document.head;
    callbackName = callbackName || ('jsonp_' + Math.random()).replace("\.", "");
    data[callback] = callbackName;
    let params = formatParams(data);

    let oScript = document.createElement('script');//发送请求
    oScript.type = 'text/javascript';
    oScript.async = true;
    oScript.src = options.url + (options.url.indexOf("?") == -1 ? '?' : "&") + params;
    log.info(oScript.src);
    //创建jsonp回调函数
    window[callbackName] = function (json) {
        oHead.removeChild(oScript);
        clearTimeout(oScript.timer);
        window[callbackName] = null;
        success && success(json);
    };

    // 发送
    oHead.appendChild(oScript);

    //超时处理
    if (time) {
        oScript.timer = setTimeout(function () {
            window[callbackName] = function () { };
            oHead.removeChild(oScript);
            fail && fail({ errCode: 1, errMsg: "请求超时!" });
        }, time);
    }
};

export function proxyJsonp(url, data) {
    return new Promise((resolve, reject) => {
        jsonp({
            url: url,
            data: data,
            success: data => {
                resolve(data);
            } 
        })
    })
};
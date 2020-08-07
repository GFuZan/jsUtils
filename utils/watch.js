
var dataKey = '$__VUE__DATA__'
var watchListKey = '$__VUE__WATCH__LIST__'

function Vue () { }

/**
 * @param {*} watchObject 监听对象
 * @param {Array<String>} watchKeys 监听的key
 * @param {Function} handle 监听处理
 * @param {Object} config 配置
 * @returns 监听key 用于移除监听
 */
Vue.prototype.watch = function (watchObject, watchKeys, handle, config) {
    // 配置
    config = config || {
        // 是否添加监听后立刻执行, 执行时回调值不存在
        immediate: false
    }

    var vueWatch = null
    watchObject && (!watchObject[watchListKey] && (Object.defineProperty(watchObject, watchListKey, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: {}
    })), vueWatch = watchObject[watchListKey])
    vueWatch && handle && watchKeys && watchKeys.forEach(function (key) {
        // 未监听过,创建监听,
        if (!vueWatch[key]) {
            var vueDataKey = dataKey + key
            // 创建监听队列
            var watchList = (vueWatch[key] = {})
            // 保存监听时的初始值
            var keyProperty = Object.getOwnPropertyDescriptor(watchObject, key)
            keyProperty && (
                keyProperty.enumerable = false,
                keyProperty.configurable = false
            )
            Object.defineProperty(watchObject, vueDataKey, keyProperty)
            // 创建监听
            Object.defineProperty(watchObject, key, {
                get () {
                    return watchObject[vueDataKey]
                },
                set (newVal) {
                    var oldVal = watchObject[vueDataKey]
                    watchObject[vueDataKey] = newVal
                    // 执行监听队列
                    for (var handle in watchList) {
                        if (watchList[handle]) {
                            try {
                                watchList[handle](newVal, oldVal, key)
                            } catch (error) {
                                console.warn('监听执行异常', error, watchList[handle])
                            }
                        }
                    }
                }
            })
        }
        // 添加处理至监听队列
        vueWatch[key][String(handle)] = handle
    })

    // 立即执行
    if (config.immediate) {
        try {
            handle && handle()
        } catch (error) {
            console.warn('监听执行异常', error, handle)
        }
    }

    return {
        watchObject: watchObject,
        watchKeys: watchKeys,
        handleKey: String(handle)
    }
}

/**
 * 取消监听
 * @param watchKey 监听key
 */
Vue.prototype.unWatch = function (watchKey) {
    var vueWatch = null
    watchKey && watchKey.watchObject && (vueWatch = watchKey.watchObject[watchListKey]) && watchKey.watchKeys && watchKey.watchKeys.forEach(function (wKey) {
        watchKey.handleKey && vueWatch[wKey] ? delete vueWatch[wKey][watchKey.handleKey] : delete vueWatch[wKey]
    })
}

module.exports = new Vue()


var dataKey = '$__VUE__DATA__'
var watchListKey = '$__VUE__WATCH__LIST__'

function Vue() { }

/**
 * @param {*} watchObject 监听对象
 * @param {Array<String>} watchKeys 监听的key
 * @param {WatchHanle} handle 监听处理
 * @param {WatchConfig?} config 配置
 * @returns {WatchKey} 监听key 用于移除监听
 *
 * @callback WatchHanle 值发生变化时处理方法
 * @param {*} newVal 更改后的值
 * @param {*} oldVal 更改前的值
 * @param {String|Number} key 更改的字段
 *
 * @typedef {Object} WatchConfig 监听配置
 * @property {Boolean?} immediate 是否添加监听后立刻执行, 执行时回调值不存在, 默认false
 * @property {Boolean?} async 是否异步执行, 默认false
 * @property {Number?} asyncTime 异步执行延时,异步执行时有效, 默认1
 * @property {Boolean?} changeTrigger 只有数据发生变化时才触发回调, 默认false
 * @property {String|Number?} handleKey 指定处理方法的唯一标识, 用于监听去重,不指定时,默认为handle
 */
Vue.prototype.watch = function (watchObject, watchKeys, handle, config) {
    try {
        // 配置
        config = config || {}

        /**
         * @type {WatchHanle}
         */
        var handleExcute = (function () {
            // 作用域闭包
            return function (newVal, oldVal, key) {
                // 立即执行时,key为undefined,此处是排除立即执行
                if (config.changeTrigger && key !== undefined && newVal === oldVal) {
                    return
                }
                var _watchCxcute = function () {
                    try {
                        handle(newVal, oldVal, key)
                    } catch (error) {
                        console.warn('监听执行异常', error, watchList[handle])
                    }
                }
                return !config.async ? _watchCxcute() : setTimeout(_watchCxcute, config.asyncTime || 1)
            }
        })()

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
                if (!keyProperty) {
                    keyProperty = {
                        writable: true
                    }
                    watchObject[key] = undefined
                }
                keyProperty.enumerable = false,
                    keyProperty.configurable = false

                Object.defineProperty(watchObject, vueDataKey, keyProperty)
                // 创建监听
                Object.defineProperty(watchObject, key, {
                    get() {
                        return watchObject[vueDataKey]
                    },
                    set(newVal) {
                        var oldVal = watchObject[vueDataKey]
                        watchObject[vueDataKey] = newVal
                        // 执行监听队列
                        for (var _handle in watchList) {
                            if (watchList[_handle]) {
                                watchList[_handle](newVal, oldVal, key)
                            }
                        }
                    }
                })
            }
            // 添加处理至监听队列
            vueWatch[key][config.handleKey || String(handle)] = handleExcute
        })

        // 立即执行
        if (config.immediate) {
            handleExcute()
        }

        return {
            watchObject: watchObject,
            watchKeys: watchKeys,
            handleKey: config.handleKey || String(handle)
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * 取消监听
 * @param {WatchKey} watchKey 监听key
 * @typedef {Object} WatchKey 监听key
 * @property {*} watchObject 监听的对象
 * @property {Array<String>} watchKeys 监听的属性列表
 * @property {String|Number} handleKey 监听处理的标识
 */
Vue.prototype.unWatch = function (watchKey) {
    try {
        var vueWatch = null
        watchKey && watchKey.watchObject && (vueWatch = watchKey.watchObject[watchListKey]) && watchKey.watchKeys && watchKey.watchKeys.forEach(function (wKey) {
            watchKey.handleKey && vueWatch[wKey] ? delete vueWatch[wKey][watchKey.handleKey] : delete vueWatch[wKey]
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = new Vue()

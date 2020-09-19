
/**
 * 精准计时器
 *
 * @param {TimerConfig} config 配置
 *
 * @typedef {Object}  TimerConfig 计时器
 * @property {Number} fromTime 开始计时时间(ms), 默认值: 10000
 * @property {Number} toTime 结束计时时间(ms), 默认值: 0
 * @property {Number} timeSpan 时间跨度(ms), 默认值: 1000
 * 
 * @callback TimeRunHandle 计时回调
 * @param {Numbar} currentTime 当前计时值
 */
var PreciseTimer = function (config) {

    var toTime = (config.toTime || 0)
    var fromTime = (config.fromTime || 10000) - toTime
    var timeSpan = config.timeSpan || 1000

    /**
     * @type {TimeRunHandle}
     */
    var trh = null
    // 计数次数
    var count = 0
    // 总共执行次数
    var totalSteps = Math.abs(Math.ceil(fromTime / timeSpan))
    var incrementUnit = Number.parseInt(fromTime / Math.abs(fromTime))

    var callbackHandle = function () {
        try {
            trh(fromTime + toTime - incrementUnit * timeSpan * count)
        } catch (error) {
            console.error('执行计时处理函数出错', error)
        }
        count++
    }

    return {
        /**
         * 启动计时
         * @param {TimeRunHandle} timeRunHandle 请设置计时处理函数
         * @returns {Function} 强制终止函数
         */
        start: function(timeRunHandle){
            if (!timeRunHandle) throw new Error('请设置计时处理函数')
            trh = timeRunHandle

            var startTime = Date.now()
            // setTimeout实例
            var setTimeoutInstance = null
            // 强制终止标志
            var forceStop = false

            var runHandle = function (immediate) {
                var currTime = Date.now()
                var diff = currTime - startTime - timeSpan * count
                if (diff > timeSpan) {
                    count += Math.floor(diff/timeSpan)
                    immediate = 1
                }
                setTimeoutInstance = setTimeout(() => {
                    callbackHandle()
                    if (!forceStop && count <= totalSteps) {
                        runHandle()
                    }
                }, immediate || timeSpan - diff)
            }
            runHandle(1)

            return function () {
                clearTimeout(setTimeoutInstance)
                forceStop = true

            }
        }
    }
}

module.exports = PreciseTimer
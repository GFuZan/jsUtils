const PreciseTimer = require('../utils/precise-timer')
const dateTool = require('../utils/date-tool')

// 此处用于阻塞线程,创建卡顿条件
setInterval(function () {
    let j = 0
    while (j++ < 100000000) { }
}, 1)

setTimeout(() => {
    console.log('\n降序计时')
    const timeSpan = 1
    const startDate = Date.now()
    PreciseTimer({
        fromTime: 10000,
        timeSpan: timeSpan,
        toTime: 0
    }).start((v, c) => {
        const currTime = Date.now()
        console.log('总时间: %dms\t误差: %dms\t当前值: %d\t当前时间: %s', currTime - startDate, currTime - startDate - c * timeSpan, v, dateTool.formatDate(currTime, 'yyyy-MM-dd HH:mm:ss.SSS'))
    })
}, 0)

setTimeout(() => {
    console.log('\n升序计时')
    const timeSpan = 500
    const startDate = Date.now()
    const forceStop = PreciseTimer({
        fromTime: -10000,
        timeSpan: timeSpan,
        toTime: 10000
    }).start((v, c) => {
        const currTime = Date.now()
        console.log('总时间: %dms\t误差: %dms\t当前值: %d\t当前时间: %s', currTime - startDate, currTime - startDate - c * timeSpan, v, dateTool.formatDate(currTime, 'yyyy-MM-dd HH:mm:ss.SSS'))
    })
    // 强制终止计时
    setTimeout(() => {
        forceStop()
    }, 10000)
}, 10500)
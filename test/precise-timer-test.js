const PreciseTimer = require('../utils/precise-timer')

setInterval(function () {
    let j = 0
    while (j++ < 100000000) { }
}, 1)

console.log('\n降序计时')
const startDate = Date.now()
let count = 0
PreciseTimer({
    fromTime: 10000,
    timeSpan: 500,
    toTime: -10000
}).start((v) => {
    console.log('总时间: %d,\t误差: %d,\t当前值: %d', Date.now() - startDate, Date.now() - startDate - 500 * count, v)
    count++
})

setTimeout(() => {
    console.log('\n升序计时')
    const forceStop = PreciseTimer({
        fromTime: -10000,
        timeSpan: 500,
        toTime: 10000
    }).start((v) => {
        console.log(Date.now(), v)
    })
    // 强制终止计时
    setTimeout(() => {
        forceStop()
    }, 10000)
}, 20500)
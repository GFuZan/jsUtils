const PreciseTimer = require('../utils/precise-timer')

console.log('\n降序计时')
const forceStop = PreciseTimer({
    fromTime: 10000,
    timeSpan: 500,
    toTime: -10000
}).start((v) => {
    console.log(Date.now(), v)
    console.log('--------------------');
})

// 强制终止计时
setTimeout(() => {
    forceStop()
}, 10000)

setTimeout(() => {
    console.log('\n升序计时')
    PreciseTimer({
        fromTime: -10000,
        timeSpan: 500,
        toTime: 10000
    }).start((v) => {
        console.log(Date.now(), v)
        console.log('--------------------');
    })
}, 10000)

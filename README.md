# js工具集
<p>
<h4>1.支持嵌套的插值替换工具</h4>
<pre>
    const PlaceholderHelper = require('../utils/placeholder-helper')
    console.log('\n#-- 基本使用方式')
    console.log(PlaceholderHelper('${', '}')
                .addValue('yyyy', '2020')
                .addValue('MM','07')
                .addValue('dd','01')
                .replacePlaceholders('今天是${yyyy}年${MM}月${dd}日'));
    
    console.log('\n#-- 嵌套替换-多级')
    console.log(PlaceholderHelper('${', '}')
                .addValue('12345', '2020')
                .addValue('abc','234')
                .addValue('777','b')
                .addValue('1000', 'c')
                .addValue('hh', '00')
                .replacePlaceholders('今天是${1${a${777}${1${hh}0}}5}年'));
</pre>
</p>

<p>
<h4>2.数据监听工具</h4>
<pre>
    const { watch, unWatch } = require('../utils/watch')

    // 监听a的变化
    watch(data, ['a'], (newVal, oldVal, key)=>{
        console.log(`监听A: A = ${data['a']}, newVal = ${newVal}, oldVal = ${oldVal}, key = ${key}`);
    }, {
        immediate: true
    })

    // 监听a,b,c三个值得变化
    const wk = watch(data, ['a','b','c'], (newVal, oldVal, key)=>{
        console.log(`监听多值: ${data['a']}-${data['b']}-${data['c']}, newVal = ${newVal}, oldVal = ${oldVal}, key = ${key}`);
    })

    // 移除监听
    unWatch(wk)
</pre>
</p>

<p>
<h4>3.时间格式化工具</h4>
<pre>
    const { formatDate } = require('../utils/date-tool')
    var date = new Date('2020/08/09 13:20:30.50')

    console.log('基本用法');
    console.log(formatDate(date, 'yyyy-MM-dd HH:mm:ss.SSS'))
</pre>
</p>

<p>
<h4>4.精准倒计时工具</h4>
<pre>
    // 从10000毫秒倒计时到0, 每隔10毫秒触发一次回调

    const startDate = Date.now()
    PreciseTimer({
        fromTime: 10000,
        timeSpan: 10,
        toTime: 0
    }).start((v, c) => {
        const currTime = Date.now()
        console.log('总时间: %dms\t当前值: %d', currTime - startDate, v)
    })
</pre>
</p>

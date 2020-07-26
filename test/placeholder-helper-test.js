const PlaceholderHelper = require('../utils/placeholder-helper')

console.log('\n#-- 基本使用方式')
console.log(PlaceholderHelper('${', '}')
              .addValue('yyyy', '2020')
              .addValue('MM','07')
              .addValue('dd','01')
              .replacePlaceholders('今天是${yyyy}年${MM}月${dd}日'));

console.log('\n#-- 嵌套替换-一级')
console.log(PlaceholderHelper('${', '}')
              .addValue('yyyy', '2020')
              .addValue('MM','07')
              .addValue('dd','01')
              .addValue('year', 'yy')
              .replacePlaceholders('今天是${y${year}y}年${MM}月${dd}日'));

console.log('\n#-- 嵌套替换-多级')
console.log(PlaceholderHelper('${', '}')
            .addValue('12345', '2020')
            .addValue('abc','234')
            .addValue('777','b')
            .addValue('1000', 'c')
            .addValue('hh', '00')
            .replacePlaceholders('今天是${1${a${777}${1${hh}0}}5}年'));

console.log('\n#-- 前缀后缀不一致测试-多余后缀')
console.log(PlaceholderHelper('{', '}')
              .addValue('yyyy', '2020')
              .addValue('MM','07')
              .addValue('dd','01')
              .addValue('year', 'yy')
              .replacePlaceholders('今天是{y{year}y}年}{MM}月}{dd}日}'));

console.log('\n#-- 前缀后缀不一致测试-多余前缀')
console.log(PlaceholderHelper('#{', '}')
              .addValue('yyyy', '2020')
              .addValue('MM','07')
              .addValue('dd','01')
              .addValue('year', 'yy')
              .replacePlaceholders('今天#{是#{yyyy}年#{MM}月#{dd}日#{'));





/**
 * 性能测试
 * @param {String} str 
 */
const performanceTest = (str, count = 10000) => {
    var start = Date.now()
    var res = null
    for(var a = 0; a< count; a++){
        res = PlaceholderHelper('${', '}')
        .addValue('y0701y', '2020')
        .addValue('MM','07')
        .addValue('dd','01')
        .replacePlaceholders(str)
    }
    console.log('工具: ', Date.now() - start, 'ms');
    console.log('工具结果: ', res.substr(0,100));

    var start = Date.now()
    for(var a = 0; a< count; a++){
        res = str.replace(/\${y0701y}/g, '2020').replace(/\${MM}/g, '07').replace(/\${dd}/g, '01')
    }
    console.log('直接替换: ', Date.now() - start, 'ms');
    console.log('直接替换结果: ', res.substr(0,100));
}

console.log('\n#-- 短字符串性能测试');
performanceTest('今天是${y${MM}${dd}y}年${MM}月${dd}日,今天是${y${MM}${dd}y}年${MM}月${dd}日')


console.log('\n#-- 长字符串性能测试');
var longStr = '今天是${y${MM}${dd}y}年${MM}月${dd}日'
for(var a = 0; a< 100; a++){
    longStr += ',今天是${y${MM}${dd}y}年${MM}月${dd}日'
}
performanceTest(longStr)



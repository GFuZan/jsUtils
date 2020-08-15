/**
 * 时间格式化
 * @param {Date | String | Number} date 有效时间
 * @param {String} format 格式化字符串
 */
var formatDate = function (date, format) {
    var formatValue = ''
    !(date instanceof Date) && (date = new Date(date))
    if (!isNaN(date.getTime()) && format) {
        var o = {
            y: date.getFullYear(),
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours() % 12,
            H: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            q: Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        }

        formatValue = format
        var tmp = null
        var match = formatValue.match(/(?:y+)|(?:M+)|(?:d+)|(?:h+)|(?:H+)|(?:m+)|(?:s+)|(?:S+)/g)
        match.forEach(function (v) {
            var key = v.substring(0, 1)
            if (key !== 'S') {
                tmp = (tmp = '000' + o[key]).substring(tmp.length - v.length)
            } else {
                tmp = String(o[key]).substring(0, v.length)
            }
            formatValue = formatValue.replace(v, tmp)
        })
    } else {
        console.error('无法格式化时间 date = %s, format = %s', date, format);
    }

    return formatValue
}

module.exports = {
    formatDate: formatDate
}
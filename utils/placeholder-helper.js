
/**
 * 插值替换工具
 * @param {String} placeholderPrefix 前缀
 * @param {String} placeholderSuffix 后缀
 * @param {*} config 配置项 { showPlaceholder:是否显示替换失败的插值,默认false, }
 */
var PlaceholderHelper = function (placeholderPrefix, placeholderSuffix, config) {
    if (!placeholderPrefix || !placeholderSuffix) {
        throw '必须指定插值前缀和后缀'
    }

    if (placeholderPrefix === placeholderSuffix) {
        throw '插值前缀和后缀不能相同'
    }

    config = config || {
        // 不显示替换失败的插值
        showPlaceholder: false
    }

    var valueList = {}
    var handle = {

        /**
         * 追加替换值
         * @param {String} key 替换符
         * @param {String} value 替换后的值
         */
        addValue: function (key, value) {
            valueList[key] = value
            return handle
        },

        /**
         * 清理插值
         */
        cleanValue: function () {
            valueList = {}
            return handle
        },

        /**
         * 执行替换
         * @param {String} placeholderString 包含插值的字符串
         */
        replacePlaceholders: function (placeholderString) {
            if (!placeholderString) {
                return ''
            }
            // 插值栈
            var placeholderPartStack = []
            var placeholderList = getPlaceholderList(placeholderString, placeholderPrefix, placeholderSuffix)
            placeholderList.forEach(function (str) {
                if (str !== placeholderSuffix) {
                    placeholderPartStack.push(str)
                } else {
                    var key = placeholderPartStack.pop()
                    var preKey = null
                    // 从前缀到后缀中的值为插值
                    while ((preKey = placeholderPartStack.pop()) !== placeholderPrefix) {
                        key = preKey + key
                        if (placeholderPartStack.length === 0) {
                            break
                        }
                    }
                    // 前缀后缀不对等兼容
                    if (placeholderPartStack.length !== 0) {
                        var repValue = config.showPlaceholder ? valueList[key] !== undefined ? valueList[key] : placeholderPrefix + key + placeholderSuffix : valueList[key]
                        placeholderPartStack.push(repValue)
                    } else {
                        placeholderPartStack.push(key + placeholderSuffix)
                    }
                }
            })

            return placeholderPartStack.join('')
        }
    }
    return handle
}

/**
 * 获取处理后的插值列表
 * @param {String} placeholderString 替换符的字符串
 * @param {String} placeholderPrefix 前缀
 * @param {String} placeholderSuffix 后缀
 */
var getPlaceholderList = function (placeholderString, placeholderPrefix, placeholderSuffix) {
    var prefixStrs = placeholderString.split(placeholderPrefix)
    var partStack = []
    prefixStrs && prefixStrs.forEach(function (str, pi) {
        var suffixStrs = str.split(placeholderSuffix)
        // 追加前缀
        pi !== 0 && partStack.push(placeholderPrefix)
        suffixStrs.forEach(function (str2, si) {
            partStack.push(str2)
            // 追加后缀
            suffixStrs.length - 1 !== si && partStack.push(placeholderSuffix)
        })
    })

    return partStack
}

module.exports = PlaceholderHelper

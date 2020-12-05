/**
 * 字段映射工具
 */

/**
 * 空处理
 */
function VoidHandle(v) {
    return v
}

/**
 * 开始映射
 * @param {*} mapData 需要映射的数据
 * @param {String} type 映射类型
 */
function mapping(mapData, type) {
    var _this = this
    var mapField = _this[type]
    if (!mapField) {
        throw new Error('未找到映射配置: ' + type)
    }

    if (mapField && mapData) {
        for (var key in mapField) {
            var srcField = key
            /**
             * @type {MapperValue}
             */
            var mapperValue = mapField[key]
            var targetField = mapperValue
            var targetValue = mapData[srcField]
            // 高级配置
            if (mapperValue.value) {
                var value = mapperValue.value
                var subMapper = mapperValue.subMapper
                var valueMapping = mapperValue.valueMapping || VoidHandle
                targetField = value
                targetValue = valueMapping(mapData[srcField], srcField, targetField, mapData)
                if (targetValue && subMapper) {
                    // 数组映射
                    if (targetValue instanceof Array) {
                        targetValue.forEach(function (subMapObj) {
                            mapping.call(_this, subMapObj, subMapper)
                        })
                    } else {
                        mapping.call(_this, targetValue, subMapper)
                    }
                }
            }
            targetValue !== undefined && (mapData[targetField] = targetValue)
            // 移除源属性
            srcField !== targetField && delete mapData[srcField]
        }
    }
    return mapData
}

/**
 * 映射器工厂
 * @param {*} fieldMapper 映射属性配置
 */
function MapperFactory(fieldMapper) {
    return {
        /**
         * @type {mapping}
         */
        mapping: mapping.bind(fieldMapper)
    }
}

// ----------------------------------------------

/**
 * 类型定义
 *
 * @typedef {Object} MapperValue 数据映射值
 * @property {String} value 目标字段
 * @property {ValueMapping} valueMapping 值映射处理
 * @property {String} subMapper 子映射
 */

/**
 * 值自定义映射
 * @callback ValueMapping
 * @param {*} srcValue 源值
 * @param {String} srcField 源字段名
 * @param {String} targetField 目标字段名
 * @param {*} mapObject 映射对象
 * @returns {String} 目标值
 */

// ----------------------------------------------

module.exports = MapperFactory

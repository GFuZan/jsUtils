/** @format */

var CacheHelper = require("./cache-helper");

var formatDateCache = CacheHelper();

/**
 * 缓存格式化
 * @param {Date | String | Number} date 有效时间
 * @param {String} format 格式化字符串
 * @param {_formatDate} formatFunction 格式化方法
 */
var formatDateCacheHelper = function (date, format, formatFunction) {
  var formatValue = "";
  var cacheKey = format + date.getTime();
  var cache = formatDateCache.getCache(cacheKey);
  if (cache) {
    formatValue = cache.value;
  } else {
    formatValue = formatFunction(date, format);
    formatDateCache.addCache(cacheKey, formatValue);
  }
  return formatValue;
};

/**
 * 格式化模板关键字匹配正则
 */
var dateMatcher = /(?:y+)|(?:M+)|(?:d+)|(?:h+)|(?:H+)|(?:m+)|(?:s+)|(?:S+)/g;

/**
 * 执行格式化
 * @param {Date | String | Number} date 有效时间
 * @param {String} format 格式化字符串
 */
var _formatDate = function (date, format) {
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
  };

  var tmp = null;
  var match = format.match(dateMatcher);
  match.forEach(function (v) {
    var key = v[0];
    if (key !== "S") {
      tmp = (tmp = "000" + o[key]).substring(tmp.length - v.length);
    } else {
      tmp = String(o[key]).substring(0, v.length);
    }
    format = format.replace(v, tmp);
  });

  return format;
};

/**
 * 时间格式化
 * @param {Date | String | Number} date 有效时间
 * @param {String} format 格式化字符串
 * @param {FormatDateConfig?} config
 *
 * @typedef {Object} FormatDateConfig 格式化时间配置
 * @property {Boolean?} cache 是否缓存,默认true
 */
var formatDate = function (date, format, config) {
  // 默认配置
  var defaultConfig = {
    cache: true
  };

  config = config ? Object.assign(defaultConfig, config) : defaultConfig;

  var formatValue = "";
  !(date instanceof Date) && (date = new Date(date));
  if (!isNaN(date.getTime()) && format) {
    formatValue = config.cache
      ? formatDateCacheHelper(date, format, _formatDate)
      : _formatDate(date, format);
  } else {
    console.error("无法格式化时间 date = %s, format = %s", date, format);
  }

  return formatValue;
};

module.exports = {
  formatDate: formatDate
};

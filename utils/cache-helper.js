/**
 * 缓存器
 *
 * @format
 * @param {CacheConfig?} config 缓存配置项
 *
 * @template T 缓存值类型
 * @typedef {Object} CacheObject<T> 缓存对象
 * @property {String|Number} key 缓存key
 * @property {T} value 缓存值
 *
 * @typedef {Object} CacheConfig 缓存配置项
 * @property {String|Number} key 缓存key
 * @property {CacheValue} value 缓存值
 * @property {Boolean} autoClean 自动清理缓存, 默认true
 * @property {Number} autoCleanTime 空闲多少毫秒后进行缓存清理,开启自动清理缓存时有效,默认100
 */

var CacheHelper = function (config) {
  // 默认配置
  var defaultConfig = {
    // 自动清理缓存
    autoClean: true,
    // 空闲多少毫秒后进行缓存清理,开启自动清理缓存时有效
    autoCleanTime: 100
  };
  config = config ? Object.assign(defaultConfig, config) : defaultConfig;

  var cleanHelper = null;
  var cacheData = {};

  return {
    /**
     * 添加缓存
     * @template R 缓存值类型
     * @param {String|Number} key 缓存key
     * @param {() => R} genValue 生成值
     * @returns {R}
     *
     */
    useCache: function (key, genValue) {
      var cache = this.getCache(key);
      if (cache) {
        return cache.value;
      }
      var newVal = genValue();
      this.addCache(key, newVal);

      return newVal;
    },
    /**
     * 添加缓存
     * @param {String|Number} key 缓存key
     * @param {*} value 缓存值
     */
    addCache: function (key, value) {
      cacheData[key] = { key: key, value: value };
      config.autoClean &&
        !cleanHelper &&
        (cleanHelper = setTimeout(() => {
          this.cleanCache();
        }, config.autoCleanTime));
    },
    /**
     * 获取缓存
     * @param {String|Number} key 缓存key
     * @returns {CacheObject<?>} 缓存对象
     */
    getCache: function (key) {
      return cacheData[key];
    },
    /**
     * 移除缓存
     * @param {String|Number} key 缓存key
     * @returns {CacheObject?} 移除的缓存对象
     */
    removeCache: function (key) {
      var value = this.getCache(key);
      value && delete cacheData[key];
      return value;
    },
    /**
     * 清除所有缓存
     */
    cleanCache: function () {
      cacheData = {};
      cleanHelper = null;
    }
  };
};

module.exports = CacheHelper;

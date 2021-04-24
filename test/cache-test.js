/** @format */

const CacheHelper = require("../utils/cache-helper");

const testCache = CacheHelper({ autoClean: true, autoCleanTime: 5000 });

setInterval(() => {
  const v = testCache.useCache("key1", () => {
    console.log("生成缓存数据");
    return Array(10000)
      .fill(0)
      .map(() => 2);
  });

  console.log(v[0]);
}, 1000);

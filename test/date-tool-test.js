/** @format */

const dateTool = require("../utils/date-tool");

var date = new Date("2020/08/09 13:20:30.50");

console.log("基本用法");
console.log(
  dateTool.formatDate(date, "yyyy-MM-dd HH:mm:ss.S // yyy-MM-dd hh:mm:ss.SSS")
);

var tmp;

var format = "yyyy-MM-dd";
console.log("\n性能测试 and 缓存: " + format);
var start = Date.now();
for (let index = 0; index < 100000; index++) {
  tmp = dateTool.formatDate(date, format);
}
console.log("结果:" + tmp + " 执行时间:", Date.now() - start, "ms");

var format = "yyyy-MM-dd hh:mm:ss";
console.log("\n性能测试 and 缓存: " + format);
var start = Date.now();
for (let index = 0; index < 100000; index++) {
  tmp = dateTool.formatDate(date, format);
}
console.log("结果:" + tmp + " 执行时间:", Date.now() - start, "ms");

var format = "yyyy-MM-dd hh:mm:ss SSS";
console.log("\n性能测试 and 缓存: " + format);
var start = Date.now();
for (let index = 0; index < 100000; index++) {
  tmp = dateTool.formatDate(date, format);
}
console.log("结果:" + tmp + " 执行时间:", Date.now() - start, "ms");

var format = "yyyy-MM-dd HH:mm:ss.S // yyy-MM-dd hh:mm:ss.SSS";
console.log("\n性能测试 and 缓存: " + format);
var start = Date.now();
for (let index = 0; index < 100000; index++) {
  tmp = dateTool.formatDate(date, format);
}
console.log("结果:" + tmp + " 执行时间:", Date.now() - start, "ms");

var format = "yyyy-MM-dd";
console.log("\n性能测试无缓存: " + format);
var start = Date.now();
for (let index = 0; index < 100000; index++) {
  date.setMilliseconds(date.getMilliseconds() + 1);
  tmp = dateTool.formatDate(date, format);
}
console.log("结果:" + tmp + " 执行时间:", Date.now() - start, "ms");

var format = "yyyy-MM-dd hh:mm:ss";
console.log("\n性能测试无缓存: " + format);
var start = Date.now();
for (let index = 0; index < 100000; index++) {
  date.setMilliseconds(date.getMilliseconds() + 1);
  tmp = dateTool.formatDate(date, format);
}
console.log("结果:" + tmp + " 执行时间:", Date.now() - start, "ms");

var format = "yyyy-MM-dd hh:mm:ss SSS";
console.log("\n性能测试无缓存: " + format);
var start = Date.now();
for (let index = 0; index < 100000; index++) {
  date.setMilliseconds(date.getMilliseconds() + 1);
  tmp = dateTool.formatDate(date, format);
}
console.log("结果:" + tmp + " 执行时间:", Date.now() - start, "ms");

var format = "yyyy-MM-dd HH:mm:ss.S // yyy-MM-dd hh:mm:ss.SSS";
console.log("\n性能测试无缓存: " + format);
var start = Date.now();
for (let index = 0; index < 100000; index++) {
  date.setMilliseconds(date.getMilliseconds() + 1);
  tmp = dateTool.formatDate(date, format);
}
console.log("结果:" + tmp + " 执行时间:", Date.now() - start, "ms");

var format = "yyyy-MM-dd HH:mm:ss.S // yyy-MM-dd hh:mm:ss.SSS";
console.log("\n性能测试无缓存并配置不使用缓存: " + format);
var start = Date.now();
for (let index = 0; index < 100000; index++) {
  date.setMilliseconds(date.getMilliseconds() + 1);
  tmp = dateTool.formatDate(date, format, {
    cache: false
  });
}
console.log("结果:" + tmp + " 执行时间:", Date.now() - start, "ms");

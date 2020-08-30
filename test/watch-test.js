const { watch, unWatch } = require('../utils/watch')


// 数据准备
const data = {
  a: 1,
  b: 1,
  c: 1,
  get d() {
    return this.c
  },
  set d(val) {
    this.c = val;
    this.b = val
  }
}

watch(data, ['x'], (newVal, oldVal, key) => {
  console.log(`监听未定义值: X = ${data['x']}, newVal = ${newVal}, oldVal = ${oldVal}, key = ${key}`);
})

// handleKey对照
// 监听a的变化
watch(data, ['a'], (newVal, oldVal, key) => {
  console.log(`监听A: A = ${data['a']}, newVal = ${newVal}, oldVal = ${oldVal}, key = ${key}`);
}, {
  immediate: true,
  handleKey: '哈哈1'
})

// 监听a的变化
watch(data, ['a'], (newVal, oldVal, key) => {
  console.log(`监听A: A = ${data['a']}, newVal = ${newVal}, oldVal = ${oldVal}, key = ${key}`);
}, {
  immediate: true,
  handleKey: '哈哈'
})

// 监听a,b,c三个值得变化
watch(data, ['a', 'b', 'c'], (newVal, oldVal, key) => {
  console.log(`监听多值: ${data['a']}-${data['b']}-${data['c']}, newVal = ${newVal}, oldVal = ${oldVal}, key = ${key}`);
})

// 同步/异步对照
watch(data, ['y'], () => {
  console.log(`异步监听: y = ${data['y']}. y2 = ${data['y2']}`);
}, {
  async: true,
  asyncTime: 1
})
watch(data, ['y'], () => {
  // 由于先加y, 后加y2, 同步监听取y2时, y2还未变化
  console.log(`同步监听: y = ${data['y']}. y2 = ${data['y2']}`);
}, {
  async: false
})

// 数据变化回调对照
watch(data, ['z'], (newVal, oldVal) => {
  console.log(`赋值监听: z = ${data['z']}, newVal = ${newVal}, oldVal = ${oldVal}`);
}, {
  changeTrigger: false
})
watch(data, ['z'], (newVal, oldVal) => {
  console.log(`变化监听: z = ${data['z']}, newVal = ${newVal}, oldVal = ${oldVal}`);
}, {
  changeTrigger: true
})


// 监听d的变化
const wk = watch(data, ['d'], () => {
  console.log(`监听D: D = ${data['d']}`);
})


// 取消监听
setTimeout(() => {
  unWatch(wk)
}, 6000)


setInterval(() => {
  data.a++
  data.d++
  data.x = (data.x || 0) + 1
  data.y = (data.y || 0) + 1
  data.y2 = (data.y2 || 0) + 1
  data.y % 2 ? (data.z = (data.z || 0) + 1) : (data.z = data.z)
}, 2000)
const { watch, unWatch } = require('../utils/watch')


// 数据准备
const data = {
    a: 1,
    b: 1,
    c: 1,
    get d(){
      return this.c
    },
    set d(val) {
      this.c = val;
      this.b = val
    }
  }


  // 监听a的变化
  watch(data, ['a'], (newVal, oldVal, key)=>{
    console.log(`监听A: A = ${data['a']}, newVal = ${newVal}, oldVal = ${oldVal}, key = ${key}`);
  })

  // 监听a,b,c三个值得变化
  watch(data, ['a','b','c'], (newVal, oldVal, key)=>{
    console.log(`监听多值: ${data['a']}-${data['b']}-${data['c']}, newVal = ${newVal}, oldVal = ${oldVal}, key = ${key}`);
  })


  // 监听d的变化
  const wk =  watch(data, ['d'], ()=>{
    console.log(`监听D: D = ${data['d']}`);
  })


  // 取消监听
  setTimeout(()=>{
    unWatch(wk)
  }, 6000)


  setInterval(()=>{
    data.a++
    data.d++
  }, 2000)
/** @format */

const MapperFactory = require("../utils/field-mapping");

// 测试
const a = {
  a: "1",
  b: {
    a: "b1",
    c: {
      a: "bc1",
      b: {
        a: "bcb1"
      }
    },
    d: "d"
  },
  c: [
    {
      a: "cc1",
      b: "cc2",
      c: "cc3"
    },
    {
      a: "cd1",
      b: "cd2",
      c: "cd3"
    }
  ],
  d: [
    {
      a: "dd1",
      b: "dd2",
      c: "dd3"
    },
    {
      a: "ddd1",
      b: "ddd2",
      c: "ddd3"
    }
  ]
};

console.log(
  MapperFactory({
    // 主映射
    MAIN: {
      // a.a => a.aa
      a: "aa",
      // a.b => a.bb
      b: {
        value: "bb",
        // 子映射
        subMapper: "MAIN_B"
      },
      // a.c => a.c
      c: {
        value: "c",
        // 子映射
        subMapper: "MAIN_C"
      }
    },
    MAIN_B: {
      // a.b.a => a.bb.ba
      a: {
        value: "ba",
        // 自定义值映射
        valueMapping: (v) => (v === "b1" ? "b3" : "b2")
      }
    },
    MAIN_C: {
      // a.c[?].a = > a.c[?].ccaa
      a: {
        value: "ccaa",
        valueMapping: (srcValue, srcField, targetField, mapObject) =>
          srcValue === "cd1" ? "1cd" : srcValue
      }
    }
  }).mapping(a, "MAIN")
);

console.log();

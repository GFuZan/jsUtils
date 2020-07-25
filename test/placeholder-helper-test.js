const PlaceholderHelper = require('../utils/placeholder-helper')

// 基本使用方式
console.log(PlaceholderHelper('${', '}')
              .addValue('yyyy', '2020')
              .addValue('MM','07')
              .addValue('dd','01')
              .replacePlaceholders('今天是${yyyy}年${MM}月${dd}日'));

// 嵌套替换
console.log(PlaceholderHelper('${', '}')
              .addValue('yyyy', '2020')
              .addValue('MM','07')
              .addValue('dd','01')
              .addValue('year', 'yy')
              .replacePlaceholders('今天是${y${year}y}年${MM}月${dd}日'));

// 前缀后缀不一致测试-多余后缀
console.log(PlaceholderHelper('{', '}')
              .addValue('yyyy', '2020')
              .addValue('MM','07')
              .addValue('dd','01')
              .addValue('year', 'yy')
              .replacePlaceholders('今天是{y{year}y}年}{MM}月}{dd}日}'));

// 前缀后缀不一致测试-多余前缀
console.log(PlaceholderHelper('#{', '}')
              .addValue('yyyy', '2020')
              .addValue('MM','07')
              .addValue('dd','01')
              .addValue('year', 'yy')
              .replacePlaceholders('今天#{是#{yyyy}年#{MM}月#{dd}日#{'));
/** @format */

module.exports = {
    printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
    tabWidth: 2, //一个tab代表几个空格数，默认为80
    useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
    singleQuote: false, //字符串是否使用单引号，默认为false，使用双引号
    semi: true, //行位是否使用分号，默认为true
    trailingComma: "none", //是否使用尾逗号，有三个可选值"<none|es5|all>"
    bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar },
    requirePragma: false, // 是否需要在文件头加上 @format 注释才进行格式化
    insertPragma: true, // 文件中插入一个特殊的标记 @format ，指定文件已格式化
    endOfLine: 'auto', // 换行符. <lf|crlf|cr|auto> lf: \n, crlf: \r\n, cr: \r, auto: 维护现有行末 
};

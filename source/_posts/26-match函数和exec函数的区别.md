---
title: match()函数和exec()函数的区别
abbrlink: 7d1bb77e
date: 2025-03-20 15:51:08
img: /static/10.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

### **<font color='red'>一、match() 方法</font>**

#### **<font color='#10c300'>1.1、用途</font>**

`match()` 是 **字符串(String)** 对象的方法，用来根据正则表达式匹配字符串。它会返回一个 **数组** 或 **null**，取决于是否匹配到。

#### **<font color='#10c300'>1.2、语法</font>**

```js
string.match(regexp)
```

- **regexp**：可以是正则表达式或者字符串（自动转成正则）。

#### **<font color='#10c300'>1.3、返回值规则</font>**

1. 如果正则表达式不带全局标志 `g`，返回的数组第 **0 **项是匹配到的内容，第 **1** 项开始是捕获组（如果有），并有额外的属性 `index` 和 `input`。
2. 如果带 `g`，`match()` 返回一个包含所有匹配到的字符串的数组（没有捕获组信息）。
3. 如果没有匹配，返回 **`null`**。

#### **<font color='#10c300'>1.4、常见示例</font>**

```js
// 不带 g 的情况
var str = 'api/getProduct/2'
var match = str.match(/api\/getProduct\/(\d+)/)  // ()括号用于创建一个捕获组
console.log(match) // 打印如下图
console.log(match[0]) // api/getProduct/2
console.log(match[1]) // 2

// 带 g 的情况
let str2 = 'Today is sunny. Sunny days are nice.'
let result2 = str2.match(/Sunny/gi)
console.log(result2) // ["sunny", "Sunny"]（大小写不敏感 g+i）
```

![image-20251122225153651](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251122225153651.png)

<br>

### **<font color='red'>2. exec() 方法</font>**

#### **<font color='#10c300'>2.1、用途</font>**

`exec()` 是 **正则表达式(RegExp)** 对象的方法，执行匹配并返回匹配结果数组或 `null`。

#### **<font color='#10c300'>2.2、语法</font>**

```js
regexp.exec(string)
```

#### **<font color='#10c300'>2.3、返回值规则</font>**

- 返回的数组第 0 项是匹配到的整体，第 1 项开始是捕获组内容。
- 总是返回第一个匹配；如果正则表达式有 `g` 标志，`exec()` 会在多次调用之间保存上一次的匹配位置（依靠 `lastIndex` 属性）。

#### **<font color='#10c300'>2.4、常见示例</font>**

```js
jslet regex = /(\d{4})-(\d{2})-(\d{2})/;
let dateStr = "Today is 2024-06-15";

let match = regex.exec(dateStr);
console.log(match);
/*
 输出:
[
  "2024-06-15",   // 完整匹配
  "2024",         // 捕获组1
  "06",           // 捕获组2
  "15",           // 捕获组3
  index: 9,       // 匹配开始位置
  input: "Today is 2024-06-15",
  groups: undefined
]
*/

// g 标志的循环使用
let regex2 = /\d+/g;
let str3 = "123 and 456";
let result;

while ((result = regex2.exec(str3)) !== null) {
  console.log(`Found ${result[0]} at index ${result.index}`);
}
/*
输出:
Found 123 at index 0
Found 456 at index 8
*/
```

------

### **<font color='red'>3. 总结对比</font>**

| 特性         | `match()` (String 方法)                   | `exec()` (RegExp 方法)            |
| ------------ | ----------------------------------------- | --------------------------------- |
| 调用者       | 字符串                                    | 正则表达式                        |
| 返回值       | 数组或 null                               | 数组或 null                       |
| 处理全局匹配 | 带 `g` 返回所有匹配值数组，没有捕获组信息 | 带 `g` 需循环多次调用得到所有结果 |
| 捕获组信息   | 不带 `g` 可以得到捕获组信息               | 可以得到捕获组信息                |
| 常用场景     | 直接获取所有匹配的字符串                  | 逐步分析匹配并获取捕获组          |

------

✅ **建议使用**

- **只是要所有匹配的结果** → `match()` + `g`
- **需要捕获组（并可能遍历所有匹配项）** → `exec()` 结合循环

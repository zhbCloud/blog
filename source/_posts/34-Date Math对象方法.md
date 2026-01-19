---
title: Date()/Math()对象方法
abbrlink: 79541cc
date: 2025-08-07 15:51:08
img: /static/18.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

### Date 对象

Date 对象用于处理日期与时间。

创建 Date 对象： **new Date()**

#### 实例

```js
let dt = new Date()    //Sat Aug 10 2019 10:47:16 GMT+0800 (中国标准时间)
let y = dt.getFullYear()    //年
let m = dt.getMonth() + 1   //月
let d = dt.getDate()        //日
let hh = dt.getHours()      //时
let mm = dt.getMinutes()    //分
let ss = dt.getSeconds()    //秒
let ww = dt.getDay()        //星期
console.log(y + '年-' + m + '月-' + d + '日-' + hh + ':' + mm + ':' + ss + ' 星期' + ww);

let mi = new Date().getTime()    
console.log(mi);   // 返回 1970 年 1 月 1 日至今的毫秒数。

Date.now()  //返回 1970 年 1 月 1 日至今的毫秒数。

#1514345477毫秒的时间
let dt = new Date(1514345477)   //Sun Jan 18 1970 20:39:05 GMT+0800 (中国标准时间)
#当前的时间
let dt = new Date()    //Sat Aug 10 2019 10:47:16 GMT+0800 (中国标准时间)
#当不足两位数的时候就在前面补0
let m = (dt.getMonth() + 1 +'').padStar(2,'0')
```

**new Date().getTime() 和 Date.now() 和new Date().valueOf()和+new Date()**

**都是获取1970年1月1日截止到现在时刻的时间戳，但是从性能上来讲** **Date.now()要快于new.Date().getTime()可以从代码执行上来看**

**+new Date()等同于new Date().valueOf()**

```js
console.time()
  for (let i = 0; i < 10000; i++) {
    new Date().getTime()
  }
console.timeEnd()    //default: 8.759033203125ms

console.time()
for (let i = 0; i < 10000; i++) {
  Date.now()
}
console.timeEnd()   //default: 2.578125ms
```

<br>

#### 其他

```
2025-11-13T10:01:53
```

这里的 **`T`** 是一种常见的时间格式分隔符，通常出现在 **ISO 8601** 标准的日期时间表示法中。

解释：

- **`2025-11-13`** 表示日期（年-月-日）
- **`T`** 是日期与时间的分隔符（不是字母 T 的含义，而是标准规定的一个字符）
- **`10:01:53`** 表示时间（时:分:秒）

ISO 8601 格式特点：

- 使用 `YYYY-MM-DD` 表示日期
- 用 `T` 分隔日期和时间
- 时间可以带时区信息，例如：
  - `2025-11-13T10:01:53Z` 表示 UTC 时间
  - `2025-11-13T10:01:53+08:00` 表示东八区时间（中国标准时间）

举例：

- `2025-11-13T10:01:53` → 2025年11月13日 上午10点01分53秒（没有时区信息，通常默认本地时间）
- `2025-11-13T10:01:53Z` → UTC 时间
- `2025-11-13T10:01:53+08:00` → UTC+8 时区时间



<br>

### Math 对象

Math 对象用于执行数学任务。

Math 对象并不像 Date 和 String 那样是对象的类，因此没有构造函数 Math()。

#### 1、abs() 方法

> 返回一个数的绝对值。
>

###### 语法

```js
#  Math.abs(x)
x：必需。必须是一个数值。
```

###### 实例

```js
var a=Math.abs(7.25);  //7.25
var b=Math.abs(-7.25); //7.25
var c=Math.abs(null);  //0
var d=Math.abs("Hello"); //NaN
var e=Math.abs(2+3);  //5
```

#### 2、ceil() 方法

> 向上取整
>

###### 语法

```js
#  Math.ceil(x)
x：必需。必须是一个数值。
```

###### 实例

```js
var a=Math.ceil(0.60); //1
var b=Math.ceil(0.40); //1
var c=Math.ceil(5); //5
var d=Math.ceil(5.1); //6
var e=Math.ceil(-5.1); //-5
var f=Math.ceil(-5.9); //-5
```

#### 3、floor() 方法

> 向下取整
>

###### 语法

```js
#  Math.floor(x)
x：必需。必须是一个数值。
```

###### 实例

```js
var a=Math.ceil(0.60); //0
var b=Math.ceil(0.40); //0
var c=Math.ceil(5); //5
var d=Math.ceil(5.1); //5
var e=Math.ceil(-5.1); //-6
var f=Math.ceil(-5.9); //-6
```

#### 4、random() 方法

> 返回介于 0（包含） ~ 1（不包含） 之间的一个随机数。
>

###### 语法

```js
#  Math.random()
```

###### 实例

```js
#实例1
var a=Math.random();

#实例2  取得介于 1 到 10 之间的一个随机数
Math.floor((Math.random()*10)+1);
```

#### 5、round() 方法

> 四舍五入
>

###### 语法

```js
#  Math.round(x)
x：必需。必须是一个数值
```

###### 实例

```js
#实例1
var a=Math.round(2.60);  //3
var b=Math.round(2.50);  //3
var c=Math.round(2.49);  //2
var d=Math.round(-2.60);  //-3
var e=Math.round(-2.50);  //-2
var f=Math.round(-2.49);  //-2
```

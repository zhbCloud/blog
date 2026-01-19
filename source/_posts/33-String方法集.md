---
title: String方法集
abbrlink: 5e5dbec2
date: 2025-08-05 15:51:08
img: /static/17.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

### **<font color='red'>charAt() </font>**

**返回新的值，**返回指定位置的字符

```js
var str = "HELLO WORLD";
var n = str.charAt(2)
#返回值
L

var str = "HELLO WORLD";
var n = str.charAt(str.length-1); 
#返回值
D
```

<br>

### **<font color='red'>charCodeAt()</font>**

**返回新的值，**返回指定位置字符的 Unicode 编码

```js
var str = "HELLO WORLD";
var n = str.charCodeAt(0);
#返回值
72
```

<br>

### **<font color='red'>fromCharCode() </font>**

**返回新的值，**可接受一个指定的 Unicode 值，返回一个字符串

```js
var n = String.fromCharCode(72,69,76,76,79); 
#返回值
'HELLO'
```

<br>

### **<font color='red'>concat() </font>**

**返回新的值，**用于连接两个或多个字符串

```js
let a = '中国'
let b = '真的'
let c = '很伟大'
let d = a.concat(b, c)
#返回值
'中国真的很伟大'
```

<br>

### **<font color='red'>indexOf()</font>**

返回某个指定的字符串值在字符串中**首次出现**的位置(**空格也算一个位置**)。如果没有找到匹配的字符串则返回 -1

```js
# string.indexOf(searchvalue,start)
	searchvalue：必需。规定需检索的字符串值。
	start：可选的整数参数，规定在字符串中开始检索的位置。

var str="Hello world";
var n=str.indexOf("e");  //1
var n= str.indexOf("o",5); // 7 这个的o是从索引5开始的 也就是字符串中的第二o
var n=str.indexOf('z')； //-1 字符串中没有z   就返回-1
```

<br>

### **<font color='red'>lastIndexOf() </font>**

返回一个指定的字符串值**最后出现**的位置，如果没有找到匹配的字符串则返回 -1

```js
var str = "abcdefabcdef";  
//从右往左第一个f的索引
var n = str.lastIndexOf("f");  //11 最后一个f的索引
var n = str.lastIndexOf("f",6); //5 从后前前去除6个 取剩下字符串的最后一个f的索引
```

<br>

### **<font color='red'>slice() </font>**

**返回新的值，**截取字符串的某个部分，和substring类似

```js
# string.slice(start,end)
	start：必须. 从哪一个下标开始截取（包含）。第一个字符位置为 0
	end：可选。 紧接着要截取到下标为多少的（不包含）。若未指定此参数，则从start到最后
   
    
var str="Hello world!";
var n=str.slice(1,5);
#返回值
'ello'

var str="Hello world!";
var n=str.slice(3); 
#返回值
lo world!

// 是负数的话-1就是截取一个 -2就是截取2个 以此类推
var str="Hello world";
var n=str.slice(-1);   //d
```

<br>

### **<font color='red'>substring()</font>**

**返回新的值，**截取字符串的某个部分

```js
# string.substring(from, to)
	from：必需。从哪一个下标开始截取（包含）。第一个字符位置为 0
	to：可选。紧接着要截取到下标为多少的（不包含）
    
var str="Hello world!";
let n = str.substring(3);
#返回值
'lo world!'

var str="Hello world!";
let n = str.substring(3,7);
#返回值
'lo w'
```

<br>

### **<font color='red'>substr() </font>**

**返回新的值，**在字符串中截取从开始下标开始的指定数目的字符

```js
# string.substr(start,length)
start：必需。要抽取的子串的起始下标(包含)。必须是数值。
ength：可选。截取的位数。如果省略了该参数，那么返回的是从开始位置到结尾的字串。

var str="Hello world!";
var n=str.substr(2,3)
#返回值
'llo'

var str="Hello world!";
var n=str.substr(2)
#返回值
'llo world!'
```

<br>

### **<font color='red'>replace()</font>**

**返回新的值，**用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的字符串

```js
# string.replace(regexp/substr,replacement)
	regexp/substr: 必需。规定子字符串或要替换的模式的 RegExp 对象。
    replacement: 必需。一个字符串值。规定了替换文本或生成替换文本的函数。
    
var str="Visit Microsoft! Visit Microsoft!";
var n=str.replace("Microsoft","Runoob");
#返回值
'Visit Runoob!Visit Microsoft!'

var str="Mr Blue has a blue house and a blue car";
var n=str.replace(/blue/g,"red");
#返回值
'Mr Blue has a red house and a red car'

var str = "我是你爸爸";
var newStr = '叫爷爷'
//这里不能用/str/gi去接收一个参数  只能用new RegExp(str, 'g')接收一个赋值的参数
// let a = str.replace(/str/gi,'爷'); 
let a = str.replace(new RegExp(str, 'g'), newStr);
#返回值
'叫爷爷'
```

<br>

### **<font color='red'>match() </font>**

**返回新的值，**可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。它返回指定的值（数组）

```js
# string.match(searchvalue)  // 匹配字符串
# string.match(regexp)  // 匹配正则
	searchvalue: 规定要检索的字符串值。
	regexp: 规定要匹配的模式的 RegExp 对象。
    
regexp的时候在很大程度上有赖于 regexp 是否具有标志 g。
没有标志 g，那么 match() 方法就只能在 string 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。除了这些常规的数组元素之外，返回的数组还含有两个对象属性。index 属性声明的是匹配文本的起始字符在 stringObject 中的位置，input 属性声明的是对 string 的引用
```

**匹配字符串**

```js
var str = "Hello world!"
var value = str.match("world")
var value1 = str.match("world").toString()
var value2 = str.match("World") // W是大写
#返回值分别是
['world', index: 6, input: 'Hello world!', groups: undefined]
'world'
null
```

**匹配正则**

```js
var str = 'chrome MicroMessenger'
var n = str.match(/chrome/i)
var n1 = str.match(/chrome/i).toString()
var n2 = str.match(/chrome/g)
#返回值分别是
['chrome', index: 0, input: 'chrome MicroMessenger', groups: undefined]
'chrome'
['chrome']
```

<br>

### **<font color='red'>search() </font>**

**返回新的值，**用于检索指定字符或检索与正则表达式相匹配字符，如果没有找到任何匹配项，则返回 -1。

```js
var str="Mr. Blue has a blue house";
var newStr = str.search("blue")
#返回值
15

#实例1  忽略大小写
var str="Mr. Blue has a blue house";
var newStr = str.search(/blue/i)
#返回值
4
```

<br>

### **<font color='red'>includes() </font>**

**返回布尔值，**判断字符串是否包含指定的字符。如果找到匹配的字符串则返回 true，否则返回 false。

```js
var str = "Hello world, welcome to the Runoob。";
var n = str.includes("world"); 
#返回值
true


var str = "Hello world, welcome to the Runoob.";
var n = str.includes("world", 12);
#返回值
false
```

<br>

### **<font color='red'>split()</font>**

**返回新的值，**把一个字符串分割成字符串数组（字符串转数组）

```js
# string.split(separator,limit)
	separator：可选。字符串或正则表达式，从该参数指定的地方分割 string Object。
	limit：可选。 该参数可指定返回的数组的最大长度。
    
var str = "Hello world";
var newStr = str.split("")
#返回值
["H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]

var str="How are you doing today?";
var n=str.split(" ",3); // 用空格分割，并且数组长度为3
#返回值
['How','are','you']
```

<br>

### **<font color='red'>trim()</font>**

**返回新的值，**去除字符串的头尾空格。

```js
var str = "       Runoob        ";
var n = str.trim();
#返回值
Runoob
```

<br>

### **<font color='red'>repeat() </font>**

**返回新的值**，字符串复制指定次数

```js
# string.repeat(count)
	count：必需，设置要复制的次数。
    
var str = "Runoob";
let n = str.repeat(2);
#返回值
'RunoobRunoob'
```

<br>

### **<font color='red'>toLowerCase() </font>**

**返回新的值，**用于把字符串转换为小写。

```js
var str = "RUNRON";
let n = str.toLowerCase()  
#返回值
'runron'
```

<br>

### **<font color='red'>toUpperCase()</font>**

**返回新的值，**用于把字符串转换为大写。

```js
var str = "runron";
let n = str.toUpperCase()
#返回值
'RUNRON'
```

<br>

### **<font color='red'>startsWith() </font>**

**返回新的值，**判断参数字符串是否在原字符串的头部。如果是以指定的子字符串开头返回 true，否则 false。

```js
# string.startsWith(searchvalue, start)
	searchvalue：必需，要查找的字符串。
	start：可选，查找的开始位置，默认为 0。
    
var str = "Hello world, welcome to the Runoob.";
var n = str.startsWith("Hello");
#返回值
true

var str = "Hello world, welcome to the Runoob.";
var n = str.startsWith("world", 6);
#返回值
true
```

<br>

### **<font color='red'>endsWith()</font>**

**返回新的值，**判断参数字符串是否在原字符串的尾部。如果是以指定的子字符串开头返回 true，否则 false。

```js
# string.endsWith(searchvalue, start)
	searchvalue：必需，要查找的字符串。
	start：可选，查找的开始位置，默认为 0。

let string = "apple,banana,orange";
var n = string.endsWith("apple");
#返回值
false
```

<br>

### **<font color='red'>padStart()</font>**

**返回新的值，**表示用参数字符串补全头部；

```js
# string.padStart(num，String)
	num：第一个参数是指定生成的字符串的最小长度
	String：补全字符串的参数字符串 如果没有指定第二个参数，默认用空格填充。
    
let a = 'abc'
let n =a.padStart(5, "o")
#返回值
'ooabc'

// 如果指定的长度小于或者等于原字符串的长度，则返回原字符串:
let n = "hello".padStart(5,"A")
#返回值
'hello'

// 如果原字符串加上补全字符串长度大于指定长度，则截去超出的补的字符串
let n = "qqqqq4".padStart(11,",wwwwww6")
#返回值
',wwwwqqqqq4'

var a = '1'
var n = a.padStart(2, "0");
#返回值
'01'
```

<br>

### **<font color='red'>padEnd() </font>**

返回新的值，表示用参数字符串补全尾部；

```js
let a = 'abc'
let n =a.padStart(5, "o")
#返回值
'abcoo'
```

<br>

### **<font color='red'>valueOf() </font>**

返回 String 对象的原始值。

通常由 JavaScript 在后台自动进行调用，而不是显式地处于代码中。

```js
var str="Hello world!";
let n = str.valueOf();
#返回值
'Hello world!'
```


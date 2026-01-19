---
title: 在浏览器中使用fetch加载js并调用方法
abbrlink: ca31d25b
date: 2025-03-22 15:51:08
img: /static/12.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

```js
// 使用dayjs中的方法
fetch('https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.9/dayjs.min.js')
  .then(response => response.text())
  .then(text => {
    eval(text);
    const now = dayjs();
    console.log(now.format('YYYY-MM-DD HH:mm:ss'));
  }).catch(err => {
    console.log(err);
  });
```

在JavaScript中，fetch API返回的Response对象还提供了其他一些属性和方法，可以根据需要来获取数据或者执行其他操作。以下是一些常用的Response对象的属性和方法：

<br>

### **<font color='red'>1、json()</font>**

这个方法返回一个Promise，解析为JSON格式的响应体

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error))
```

<br>

### **<font color='red'>2、blob()</font>**

这个方法返回一个Promise，将响应体解析为二进制数据（Blob对象）

```js
fetch('https://example.com/image.png')
  .then(response => response.blob())
  .then(blob => {
    // 处理二进制数据
  })
  .catch(error => console.error('Error fetching image:', error));
```

<br>

### **<font color='red'>3、arrayBuffer()</font>**

这个方法返回一个Promise，将响应体解析为ArrayBuffer

```jsx
fetch('https://example.com/file')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    // 处理ArrayBuffer
  })
  .catch(error => console.error('Error fetching file:', error));
```

<br>

### **<font color='red'>4、text()</font>**

它返回一个Promise，将响应体解析为文本

```jsx
fetch('https://example.com/text')
  .then(response => response.text())
  .then(text => console.log(text))
  .catch(error => console.error('Error fetching text:', error));
```

<br>

### **<font color='red'>eval函数</font>**

eval函数是JavaScript中的一个内置函数，用于将传入的字符串作为代码来执行。当使用eval函数时，传入的字符串会被当作JavaScript代码来执行，这可以用来动态执行代码或者动态生成代码。然而，由于eval函数的执行会影响性能和安全性，通常不推荐在实际项目中使用eval函数，除非确实有必要使用它。因为eval函数的执行会增加代码的复杂性，并且可能存在安全风险，因此应该尽量避免使用它。

---
title: axios请求头content-type理解
abbrlink: 6090aba3
date: 2025-02-26 23:55:31
img: /static/28.webp
categories: 前端与后端通信
tags:
  - axios
---

### **<font color='red'>一、http请求的Content-Type</font>**

我们在项目中调用接口，通常是以对象的数据格式传给自己封装的http请求函数的。

**<font color='cornflowerblue'>1、application/json  >>>>>>>>>>>  "{"title":"test","sub":[1,2,3]}</font>**

现在的前后端分离项目基本上都是使用的这个进行数据传递。

axios默认Content-type是采用application/json;charset=UTF-8，无需设置直接把 对象 传进去即可，当然，也可以在请求拦截器中使JSON.stringify(config.data)将传参转化成json后再发请求（但是不能用qs.stringify）：

**<font color='cornflowerblue'>2、application/x-www-form-urlencoded  >>>>>>>>>>>  "key1=val1&key2=val2"</font>**
用于表单的提交。值得注意的是ajax中（不是axios哈）contentType都是默认的值：application/x-www-form-urlencoded。

特点是提交的参数按照 'key1=val1&key2=val2' 的方式进行编码，key和val会进行了URL编码。而要实现这种参数的序列化，最简单的方法是引入qs，qs.stringify(data, { indices: true }) 传递的参数中有数组则需设置indices: true

**<font color='cornflowerblue'>3、multipart/form-data 一般用来上传文件</font>**
这个和application/x-www-form-urlencoded的区别在于一个适合传字段键值，一个适合传文件,传参是一个new FormData()格式不需要用qs转换



### **<font color='red'>二、qs.sringify和JSON.stringify的区别</font>**

```js
const aa = {name:'hehe',age:10};
```

1、qs.stringify序列化结果：'name=hehe&age=10'

2、JSON.stringify序列化结果："{"a":"hehe","age":10}"


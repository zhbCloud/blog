---
title: javascript中throw-error与throw-new-Error-error的用法及区别
abbrlink: e8619cd8
date: 2025-03-18 15:51:08
img: /static/9.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

抛出错误一般都是与try catch 同时出现的
先看定义：

**throw new Error(error)：** 这个是创建错误，创造一个错误类型抛出
**throw error：**这个是抛出错误。

### **<font color='red'>1、throw new Error(error)</font>**

```jsx
var a = 5;
try{
   if(a==5){
        //   抛出错误
           throw new Error("loopTerminates"); //Error要大写
     }
}catch(e){
    console.log(e);    //打印出Error对象：Error: loopTerminates
    console.log(e.message); //打印：loopTerminates
}
```

**打印结果：**

![image-20230417000354212](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140200161.png)

<br>

### **<font color='red'>2、throw error</font>**

```jsx
var a = 5;
try{
   if(a==5){
        //   抛出错误
        throw "loopTerminates";
     }
}catch(e){
    console.log(e);    //打印: loopTerminates
    console.log(e.message); //打印：undefined
}
```

**打印结果：**

![image-20230417000400590](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140200163.png)

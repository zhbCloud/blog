---
title: vue.extend()
abbrlink: 36687
date: 2025-03-04 23:55:41
img: /static/7.webp
categories: 框架与生态
tags:
  - vue2
---

#### **<font color='red'>1、官方例子</font>**

![image-20230417002823998](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140206564.png)

<br>

#### **<font color='red'>2、注意点:</font>**

**1、Vue.extend()必须要new出来(实例)**

```js
let Constructor = Vue.extend()
let Profile = new Constructor
```

<br>

**2、将创建的Profile实例, 挂载到一个元素上去**

```js
Profile.$mount('div')
```

<br>

#### **<font color='red'>3、例子</font>**

所用到的文件plugin.js 和 MyHeader.vue

```  js
// plugin.js
import MyHeader from './MyHeader.vue'
const myUI = {
  install (Vue, option) {
    // 构造vue子类构造器
    const MyHeaderConstructor = Vue.extend(MyHeader)
    // 通过上面的构造器生成 MyHeaderConstructor 通过new出来的实例对象是可以直接访问组件中的属性的
    const myHeaderInstall = new MyHeaderConstructor()

    // 挂载实例
    const ele = document.createElement('div')
    document.body.appendChild(ele)
    myHeaderInstall.$mount(ele)
  }
}
export default myUI
```

---
title: vue项目中快速使用阿里字体图标
abbrlink: 3e5e4cab
date: 2025-03-03 23:55:41
img: /static/27.webp
categories: 框架与生态
tags:
  - vue2
  - 阿里字体图标
---

### **<font color='red'>一、下载图标图</font>**

![image-20251111142429382](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251111142429382.png)

### **<font color='red'>二、引入项目中</font>**

<font color='cornflowerblue'>将下载的图标库重命名，并放至assets文件夹</font>

![image-20251111142809453](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251111142809453.png)

<br>

### **<font color='red'>三、引入方式</font>**

#### **<font color='#10c300'>3.1、Unicode方式</font>**

unicode是字体在网页端最原始的应用方式

- 兼容性最好，支持ie6+，及所有现代浏览器
- 支持按字体的方式去动态调整图标大小，颜色等等
- 但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色

<font color='cornflowerblue'>1）在main.js中引入</font>

```js
import '@/assets/iconfont/iconfont.css'
```

<br>

<font color='cornflowerblue'>2）在页面中使用</font>

**`1、标签形式使用`**

```html
<i class="iconfont">&#xedb8;</i>
```

<img src="https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251111145122762.png" style="zoom:70%" />必须添加上`iconfont`类名，将在阿里图标复制代码粘贴到标签内即可

<br>

**` 2、伪元素形式使用`**

```html
<template>
    <div class="index">
        <i class="icon"></i>
    </div>
</template>

<style scoped lang="scss">
.icon {
   &::after {
        content: '\edb8';
        font-family: 'iconfont'!important;
        font-size: 16px;
        font-style: normal;
    }
}
</style>
```

必须设置`font-family: 'iconfont';`，content中的内容就是：\ + &#x后面的edb8，即`'\edb8`

<br>

#### **<font color='#10c300'>3.2、Font class方式</font>**

font-class是unicode使用方式的一种变种，主要是解决unicode书写不直观，语意不明确的问题

- 兼容性良好，支持ie8+，及所有现代浏览器
- 因为使用class来定义图标，所以当要替换图标时，只需要修改class里面的unicode引用
- 相比于unicode语意明确，书写更直观。可以很容易分辨这个icon是什么
- 不过因为本质上还是使用的字体，所以多色图标还是不支持的

<font color='cornflowerblue'>1）在main.js中引入</font>

```js
import '@/assets/iconfont/iconfont.css'
```

<br>

<font color='cornflowerblue'>2）在页面中使用</font>

<img src="https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251111153701926.png" style="zoom:70%" />必须添加上`iconfont`类名，将在阿里图标复制代码粘贴到class中

```html
<i class="iconfont icon-a-02pinglun2"></i>
```

<br>

#### **<font color='#10c300'>3.3、Symbol方式</font>**

平台目前推荐的用法，做了一个svg的集合

- 支持多色图标了，不再受单色限制
- 通过**一些技巧**，支持像字体那样，通过font-size,color来调整样式
- 兼容性较差，支持 ie9+,及现代浏览器
- 浏览器渲染svg的性能一般，不如png

<font color='cornflowerblue'>1）在main.js中引入</font>

```js
import '@/assets/iconfont/iconfont.js'
```

<br>

<font color='cornflowerblue'>2）在页面中使用</font>

<img src="https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251111153701926.png" style="zoom:70%" />必须添加上`iconfont`类名，将在阿里图标复制代码粘贴到xlink:href中

```html
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-a-24wode1"></use>
</svg>
```

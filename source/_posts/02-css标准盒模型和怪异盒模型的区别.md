---
title: css标准盒模型和怪异盒模型的区别
abbrlink: 5a7a4826
date: 2025-02-19 23:50:08
img: /static/32.webp
categories: HTML/CSS/JS
tags:
  - css
---

css盒模型本质是一个盒子，它由边距、边框、填充和实际内容组成。盒模型能够让我们在其他元素和周边元素边框之间的空间放置元素。

标准模式下如果定义的DOCTYPE缺失，则在ie6、ie7、ie8下汇触发怪异模式。当设置为box-sizing:content-box时，将采用标准模式解析计算，也是默认模式；当设置为box-sizing:border-box时，将采用怪异模式解析计算；

#### **<font color='red'>标准盒模型</font>**

标准模式下总宽度 = width + margin（左右）+ padding(左右) + border(左右)；

![image-20230417001610017](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140202607.png)



#### **<font color='red'>怪异盒模型(IE)</font>**

怪异模式下总宽度  = width + margin(左右) `（就是说width已经包含了padding和border值）`

![image-20230417001615992](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140202530.png)

<br>

转载：https://www.jianshu.com/p/7dadcc458410

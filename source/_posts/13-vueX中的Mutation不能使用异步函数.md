---
title: vueX中的Mutation不能使用异步函数
abbrlink: 1515505e
date: 2025-02-28 23:55:40
img: /static/37.webp
categories: 框架与生态
tags:
  - vue2
  - vueX
---

### **<font color='red'>一、为什么必须是同步更新？</font>**

因为在开发过程中，我们常常会追踪状态的变化。常用的手段就是在浏览器控制台中调试。而在 mutation 中使用异步更新状态，虽然也会使状态正常更新，但是会导致开发者工具有时无法追踪到状态的变化，调试起来就会很困难。



```js
index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = { count: 0}

const mutations = {
  synchronization (state, params) {
    state.count += params.num
  },
  asynchronous (state, params) {
    setTimeout(() => {
      state.count += params.num
    }, 3000)
  }
}
export default new Vuex.Store({state,mutations})
```



```js
<template>
  <div class="content">
    <h3>测试在mutations使用同步和异步</h3>
    <button @click="sync">同步</button>
    <button @click="async">异步</button>
    <p style="font-size: 30px;">这是vuex中的 <span style="color:red">{{ $store.state.count }}</span></p>
  </div>
</template>

export default {
  methods: {
    sync () {
      this.$store.commit({
        type: 'synchronization',
        num: 20
      })
    },
    async () {
      this.$store.commit({
        type: 'asynchronous',
        num: 20
      })
    }
  }
}
```

我们来看Devtools的Vuex状态图

### **<font color='red'>二、点击同步 (在mutations里面做同步操作)</font>**

点击5次，点击时间线可以看到5次的点击每次都是增加20，页面中的count会随着点击变化而变化20>40>60>80>100

**第1次：**

![image-20230417004004491](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140210048.png)





**第2次：**

![image-20230417004009379](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140210601.png)


**... ...**



**第5次：**

![image-20230417004014966](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140210022.png)



### **<font color='red'>二、点击异步 (在mutations里面做异步操作)</font>**

1、在3s内点击异步按钮5次，因为异步操作未完成，所以在时间线里面可以看到点击的这5次count都是0。页面中的count不会随着点击变化而变化，而是在3s后计算总和100

![image-20230417004041328](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140210408.png)

2、在3s后点击异步按钮1次(第六次点击)，时间线上的count为前五次的总和100，而页面且为6次点击的总和120



![image-20230417004045943](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140210781.png)



#### 总结

可以看到在Mutation中使用异步和同步最终页面的总和都是正确的，也就是说在Mutation中使用异步不会对数据造成丢失和其他影响。然而我们注意Vue Devtools显示结果，当我们去查看多次Mutation状态时，发现同步的显示Ok，异步的Count显示为0 和我们预期结果不一致，所以会造成状态改变的不可追踪，所以官方说我们Mutation是同步的！

**重点事情**
造成状态改变的不可追踪
造成状态改变的不可追踪
造成状态改变的不可追踪

**在actions中就不会出现这种状态改变不可追踪的情况**


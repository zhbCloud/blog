---
title: vue监听路由变化的几种方式
abbrlink: 60784
date: 2025-02-27 23:55:37
img: /static/34.webp
categories: 框架与生态
tags:
  - vue2
  - vue-router
---

### **<font color='red'>一、Vue监听路由变化的几种方式</font>**

Vue页面开发中，我们经常需要根据路由的变化去实现一些操作，那么如何监听路由的变化呢？当然是利用VUE中的watch，请看代码。

**<font color='cornflowerblue'>1.1、监听路由从哪儿来到哪儿去</font>**

```js
watch:{
    $route(to,from){
        console.log(from.path);//从哪来
        console.log(to.path);//到哪去
    }
}
```

<br>

**<font color='cornflowerblue'>1.2、监听路由变化获取新老路由信息</font>**

```js
watch:{
    $route:{
      handler(val,oldval){
        console.log(val);//新路由信息
        console.log(oldval);//老路由信息
      },
      // 深度观察监听
      deep: true
    }
  }
```

<br>

**<font color='cornflowerblue'>1.3、监听路由变化触发方法</font>**

```js
methods:{
  getPath(){
    console.log(1111)
  }
},
watch:{
  '$route':'getPath' // 路由变化触发getPath()方法
}
```

<br>

**<font color='cornflowerblue'>1.4、全局监听路由</font>**

在app.vue的create种加入下面代码，然后进行判断

```js
this.$router.beforeEach((to, from, next) => {
    console.log(to);
    next();
});
```

<br>

### **<font color='red'>二、路由监听失效问题</font>**

**user组件**

```js
watch:{
     '$route' (to, from) {
         // 对路由变化作出响应...
         console.log(to)
     }
}
```

**路由配置**

```js
{
    path:'/user/:id',
    name:'User',
    component:() => import ('../views/User'),
    children:[]
 }
```

user 组件我让其成为异步组件，是想实现点击用户头像再跳转路由进入 /user，从路由参数中获取user id发起ajax请求获取用户信息

**可最终得到的结果是：**在user组件中使用watch 监听路由的变化无效（我想在监听中取出参数）

**注意：**不管你的组件是不是异步组件，也会有此问题

**原因：**

路由组件的渲染区域为 router-view，作为顶层出口（官方是这么叫的）它将匹配到的路由组件渲染在该区域中，路由组件渲染默认的方式是销毁 - 创建，在组件中加入生命周期函数可以证明：

```cpp
created(){
    console.log("user 组件被创建")
}
```

你可以使用浏览器的前进后退来跳转页面，也可以通过点击你设置的页面元素来进行路由跳转



**解决方案：**
正是因为组件被路由渲染出来的方式是销毁 - 创建,那么组件实例中定义的一系列方法每创建一次组件new Vue()，方法都是新添加上去的，自然 $watch这个操作就监听不到路由的变化，更不用说定义在组件中的beforeRouteUpdate这种方法，所以,要想实现这个功能得让组件成为 复用组件，只需加keep-alive即可

```html
<keep-alive>
    <router-view></router-view>
</keep-alive>
```

此后，你的 watch '$route' 将在路由改变的时候起作用！！！加上了keep-alive后你可以测试到在第一次跳转路由后你定义的生命周期函数 created()将不会再被调用。
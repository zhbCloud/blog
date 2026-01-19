---
title: vueX中的state、mapState、...mapState理解
abbrlink: 1ef04b2
date: 2025-03-04 23:59:41
img: /static/37.webp
categories: 框架与生态
tags:
  - vue2
  - vueX
---

### **<font color='red'>1、state</font>**

**state是什么?**                                         
定义：state(vuex) ≈ data (vue)

vuex的state和vue的data有很多相似之处，都是用于存储一些数据，或者说状态值。这些值都将被挂载数据和dom的双向绑定事件，也就是当你改变值的时候可以触发dom的更新。

虽然state和data有很多相似之处，但`state在使用的时候一般被挂载到子组件的computed计算属性上`，这样有利于state的值发生改变的时候及时响应给子组件。如果你用data去接收store.state，当然可以接收到值，但由于这只是一个简单的赋值操作，因此state中的状态改变的时候不能被vue中的data监听到，当然你也可以通过watch $store去解决这个问题，那你可以。真是一个杠精~

综上所述，请用computed去接收state，如下

```js
// vuex中的state.js
let state = {
  	count: 1,
    name: 'Jack',
    from: 'china'
}
export default state
```

```js
// mutations.js
const mutations = {
    INCREMENT(state) {
        state.count += 1
    },
    DECREMENT(state) {
        state.count -= 1
    }
}
export default mutations
```



```html
// xxx.vue
<template>
    <div id="example">
        <button @click="decrement">-</button>
        {{ count }}
        {{ dataCount }}
        <button @click="increment">+</button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            dataCount: this.$store.state.count // 用data接收
        }
    },
    computed: {
        count () {
            return this.$store.state.count // 用computed接收
        }
    },
    methods: {
        increment () {
            this.$store.commit('INCREMENT')
        },
        decrement () {
            this.$store.commit('DECREMENT')
        }
    }
}
</script>
```

初始化的时候都能获取到count的值，当对count进行加减操作的时候就会发现，data接收的值不能及时响应更新，computed接收的就可以。

<br>

### **<font color='red'>2、mapState 辅助函数</font>**

**mapState是什么?**
表面意思：mapState是state的辅助函数，这么说可能很难理解

抽象形容：mapState是state的语法糖，这么说可能你还想骂我，因为你根本不了解什么叫做语法糖，事实上我说的语法糖有自己的定义。

**什么是语法糖？**

我对语法糖的理解就是，用之前觉得，我明明已经对一种操作很熟练了，并且这种操作也不存在什么问题，为什么要用所谓的"更好的操作"，用了一段时间后，真香!

实际作用：当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键
在使用mapState之前，要导入这个辅助函数。

```js
import { mapState } from 'vuex'
```

```html
<template>
    <div id="example">
        <button @click="decrement">-</button>
        <button @click="increment">+</button>
        <p>dataCount：{{ dataCount }}</p>
        <p>count：{{ count }}</p>
        <p>姓名：{{ name }}</p>
        <p>{{ from }}</p>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {
            str: '国籍',
            dataCount: this.$store.state.count // 用data接收
        }
    },
    created () { // 写个定时器，发现computed依旧保持了只要内部有相关属性发生改变，不管是当前实例data中的改变，还是vuex中的值改变都会触发dom和值更新
        setTimeout(() => {
            this.str = '国家'
        }, 1000)
    },
    computed: mapState({
        count: 'count', // 第一种写法
        name: (state) => state.name, // 第二种写法
        from (state) { // 第三种写法
            return this.str + ':' + state.from
        }
    }),
    methods: {
        increment () {
            this.$store.commit('INCREMENT')
        },
        decrement () {
            this.$store.commit('DECREMENT')
        }
    }
}
</script>
```

<br>

**使用合并的方式添加非vuex中的计算属性**

```js
computed: Object.assign({}, mapState({
  count: 'count',
  name: state => state.name
}), {
  doubleCount() {
    return this.count * 2
  }
})
```

<br>

###  **<font color='red'>3、...mapState</font>**

事实上...mapState并不是mapState的扩展，而是...对象展开符的扩展。当然如果你把他用在这里会发现他能使得代码看起来变得，更加符合常规逻辑了，为什么这么说,你等下就会知道了。

```jsx
let arr = [1,2,3]
console.log(...arr) //1,2,3
```

然后来看一个例子

```jsx
let MapState = mapState({
      count: 'count',
      sex: (state) => state.sex
    })
let json = {
  'a': '我是json自带的',
  ...MapState
}
console.log(json)
```

**这里的json可以成功将mapState的json对象和json自带的a属性成功融合成一个新的对象。你可以将这个称为对象混合**

这样，你就可以自由的使用mapState了.

```kotlin
//之前的computed
computed:{
    fn1(){ return ...},
    fn2(){ return ...},
    fn3(){ return ...}
    ........
}
```

引入mapState辅助函数之后

```kotlin
computed:{
   //原来的继续保留
   fn1(){ return ...},
   fn2(){ return ...},
   fn3(){ return ...}
   ......
   //再维护vuex
   ...mapState({  //这里的...不是省略号了,是对象扩展符
       count:'count'
   })
}
```

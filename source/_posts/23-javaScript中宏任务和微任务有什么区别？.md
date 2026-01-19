---
title: javaScript中宏任务和微任务有什么区别？
abbrlink: 89a78f73
date: 2025-03-09 15:51:08
img: /static/31.webp
categories: HTML/CSS/JS
tags:
  - javaScript
  - Event Loop
---

微任务和宏任务皆为异步任务，它们都属于一个队列，主要**区别在于他们的执行顺序，Event Loop的走向和取值**。

`Event Loop`即事件循环，是指浏览器或`Node`的一种解决`javaScript`单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

<br>

### **<font color='red'>1、宏任务和微任务的区别</font>**

```jsx
宏任务                          浏览器          Node
I/O                             ✅            ✅
setTimeout                      ✅            ✅
setInterval                     ✅            ✅
setImmediate                    ❌            ✅
requestAnimationFrame           ✅            ✅ 

微任务
process.nextTick                ❌            ✅
MutationObserver                ✅            ❌
Promise.then catch finally      ✅            ✅
```

**宏任务与微任务之间的执行顺序(同步任务->微任务->宏任务)** 

```js
setTimeout (() => { console.log(4)}) // 宏任务

new Promise (resolve => {
    resolve()
    console.log(1) // 同步任务1
}).then (() => {
   console.log(3) // 微任务
})

 console.log(2) // 同步任务2

// 1 2 3 4
```

下面说说执行到宏任务后是怎么继续运行的
(这里声明下，整段js代码就是第一个大的宏任务，事件循环是由这第一个宏任务开始的，然后分出微任务，这里是为了理解微任务宏任务的执行区别就先跳过这第一层)

<br>

### **<font color='red'>2、场景</font>**

去银行办存钱业务，先取号再排队。 “您的号码为XX，前边还有XX人。”

银行柜台前排着一条队伍，都是存钱的人，存钱属于宏任务，这条队伍就是宏任务队列。

当一个“大爷”被叫到了自己的号码，就上前去--被处理，处理存钱业务时，‘宏大爷’**突然**想给自己的存款办个微理财(`微任务`)，那么银行职员就将他的需求添加到自己的微任务队列，大爷就不用再排队了，直接在存钱宏任务进行完后就处理衍生出来的微任务理财，办理财时大爷又说办个信用卡，那就又排到微任务队列里。当大爷的微任务(办理理财和办信用卡)没有办理完，是不会让让下一个人办理业务的**(即微任务没执行完是不会执行下一个宏任务的)**。

但要是在此次存钱时‘宏大爷’说他还要存钱，且是他老伴要存钱，也是`宏任务`，但不好意思，需要取号到宏任务队列的后面排队（这里就是在宏任务进行时产生微任务和宏任务的处理方式）。

![image-20230417002550329](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205251.png)

<br>

### **<font color='red'>3、案例</font>**

结合下面的题目理解理解（这里先不介绍node环境的事件循环的特殊地方，主要以浏览器环境）：

```js
<script>
    setTimeout(function () { //宏任务1
        console.log('1');
    });

    new Promise(function (resolve) {
        console.log('2'); //同步任务1
        resolve();
    }).then(function () { //微任务1
        console.log('3');
    });

    console.log('4'); //同步任务2

    setTimeout(function () { //宏任务2
        console.log('5'); //宏任务2中的同步任务
        new Promise(function (resolve) {
            console.log('6'); //宏任务2中的同步任务
            new Promise(function (resolve) { //宏任务2中的微任务
                console.log('x1');
                resolve();
            }).then(function () {
                console.log('X2');
            });
            setTimeout(function () { //宏任务2中的宏任务
                console.log('X3');
                new Promise(function (resolve) { //宏任务2中的宏任务中的同步任务
                    console.log('X4');
                    resolve();
                }).then(function () { //宏任务2中的宏任务中的微任务
                    console.log('X5');
                });
            })
            resolve();
        }).then(function () { //宏任务2中的微任务
            console.log('7');
        });
    })

    setTimeout(function () { //宏任务3
        console.log('8');
    });
    //（对于这段代码node环境和浏览器环境输出一致）
    //输出答案：2,4,3,1,5,6,x1,x2,7,8,x3,x4,x5
</script>
```


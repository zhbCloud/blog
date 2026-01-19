---
title: 如何优化JavaScript中的ifelse复杂判断？
abbrlink: dc9c7d28
date: 2025-03-21 15:51:08
img: /static/11.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

> 我们在写 JavaScript 代码的时候，经常会遇到逻辑判断比较复杂的情况，通常我们可以使用 if/else 或 switch 来实现多个条件判断。

但是这样就存在一个问题，随着逻辑复杂度的增加，代码中的 `if/else/switch` 会越来越臃肿，越来越难理解。那么如何才能把判断逻辑写得更优雅呢？

今天咱们就来看看这个问题！

#### **一元条件判断**

```js
const onButtonClick = (status)=>{
  if(status == 1){
    jumpTo('进入索引页')
  }else if(status == 2){
    jumpTo('进入失败页')
  }else if(status == 3){
    jumpTo('进入失败页')
  }else if(status == 4){
    jumpTo('进入成功页')
  }else if(status == 5){
    jumpTo('进入取消页')
  }else {
    jumpTo('其他操作')
  }
}
```

从代码中我们可以看到这个按钮的点击逻辑：根据不同的活动状态，进入不同的页面。

当然，以上代码也可以通过 switch 进行重写：

```js
const onButtonClick = (status)=>{
  switch (status){
    case 1:
      console.log('进入索引页')
      break
    case 2:
    case 3:
      jumpTo('进入失败页')
      break  
    case 4:
      jumpTo('进入成功页')
      break
    case 5:
      jumpTo('进入取消页')
      break
    default:
      jumpTo('其他操作')
      break
  }
}
```

这样看起来比用 if/else 要清晰多了。同时：当 case 2 和 case 3 的逻辑相同时，可以省略执行语句和 break，这样 case 2 就会自动执行 case 3 的逻辑。

**但是**，以上的代码还不够“完美”，我可以对它进行持续优化：

```js

const actions = {
  '1': ['进入索引页'],
  '2': ['进入失败页'],
  '3': ['进入失败页'],
  '4': ['进入成功页'],
  '5': ['进入取消页'],
  'default': ['其他操作'],
}
const onButtonClick = (status)=>{
  let action = actions[status] || actions['default'],
  jumpTo(action[0])
}
```

这样优化之后代码就会清晰很多，这个方法的巧妙之处在于：**把判定条件作为对象的属性名，把处理逻辑作为对象的属性值**，点击按钮时通过查找对象属性进行逻辑判断，这种写法特别适合 **一元条件** 判断。



#### **多元条件判断**

但是，如果判断条件变得更加复杂时，以上的操作就不适用了，例如：

```js
const  onButtonClick = ( status,identity )=>{
   if (identity == 'guest' ){
     if (status == 1 ){
       // ...
    } else  if (status == 2 ){
       // ...
    } else  if ( status == 3 ){
       // ...
    } else  if (status == 4 ){
       // ...
    } else  if (status == 5 ){
       // ...
    } else {
       // ...
    }
  } else  if (identity == 'master' ) {
     if (status == 1 ){
       // ...
    } else  if (status == 2 ){
       // ...
    } else  if (status == 3 ){
       // ...
    } else  if (status == 4 ){
       // ...
    } else  if (status == 5 ){
       // ...
    } else {
       // ...
    }
  }
}
```

那么一旦遇到这种复杂的情况，最初的代码就不适用了。所以，我们需要对最初的逻辑进行优化可以这么做：

```js

const actions = new Map([
  ['guest_1', ()=>{/* ... */}],
  ['guest_2', ()=>{/* ... */}],
  ['guest_3', ()=>{/* ... */}],
  ['guest_4', ()=>{/* ... */}],
  ['guest_5', ()=>{/* ... */}],
  ['master_1', ()=>{/* ... */}],
  ['master_2', ()=>{/* ... */}],
  ['master_3', ()=>{/* ... */}],
  ['master_4', ()=>{/* ... */}],
  ['master_5', ()=>{/* ... */}],
  ['default', ()=>{/* ... */}],
])
const onButtonClick = (identity,status)=>{
  let action = actions.get(`${identity}_${status}`) || actions.get('default')
  action.call(this)
}
```

上述代码的核心逻辑是：**将两个条件拼接成一个字符串，以拼接后的条件字符串为键，以处理函数为值，通过 Map 对象进行查找并执行**。这种方式在**多条件判断**的时候特别有用。

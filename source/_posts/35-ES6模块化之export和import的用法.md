---
title: ES6模块化之export和import的用法
abbrlink: 82ba275f
date: 2025-08-012 15:51:08
img: /static/19.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

> ES6中export和import一般的用法有两种
>
> 1. 命名导出（Named exports）
> 2. 默认导出（Default exports）

## 一、export 命名导出

就是每一个需要导出的数据类型都要有一个name(变量名)，统一引入一定要带有`{}`，即便只有一个需要导出的数据类型。**这种写法清爽直观，是推荐的写法。**

**导出：**

```js
/ profile.js

// 写法1：
export let firstName = 'Michael';
export function v2() { return '这是一个函数' }


// 写法2(常用)：
let firstName = 'Michael'
function v2() { return '这是一个函数' }
export {
	firstName,
    v2
}
```

**导入：**

```js
/ test.vue中

// 导入该文件应该使用重命名之后的变量名
import { firstName, v2 } from './profile.js'
```



### <font color='red' size="">1.1、别名引入（Aliasing named imports）</font>

当从不同模块引入的变量名相同的时候

```js
import {speak} from './cow.js'
import {speak} from './goat.js'	
```

这些写法显然会造成混乱



正切应该使用`as`关键字，将输入的变量重命名。

```js
import {speak as cowSpeak} from './cow.js'
import {speak as goatSpeak} from './goat.js'
```



可是，当从每个模块需要引入的方法很多的时候，这种写法就显得十分的繁琐、冗长，例如

```js
import {
  speak as cowSpeak,
  eat as cowEat,
  drink as cowDrink
} from './cow.js'

import {
  speak as goatSpeak,
  eat as goatEat,
  drink as goatDrink
} from './goat.js'


cowSpeak() // moo
cowEat() // cow eats
goatSpeak() // baa
goatDrink() // goat drinks
```

解决方案就是命名空间引入了



### <font color='red' size="">1.2、命名空间引入（Namespace imports）</font>

```js
import * as cow from './cow.js'
import * as goat from './goat.js'

cow.speak() // moo
goat.speak() // baa
```

十分的简洁优雅



### <font color='red' size="">1.3、as关键字重命名</font>

通常情况下，`export`输出的变量就是本来的名字，但是可以**使用`as`关键字重命名**。

**导出：**

```js
/ profile.js

function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2
};
```

**导入：**

```js
/ test.vue中

// 导入该文件应该使用重命名之后的变量名
import { streamV1, streamV2 } from './profile.js'
```



## 二、export default 默认导出

默认导出就不需要name了，但是一个js文件中只能有一个export default。

**导出：**

```js
/ export-default.js
export default function () { ... }

// 或者写成
function foo() { ... }
export default foo;
```

**导入：**

```javascript
/ test.vue
// 加载该模块时，`import`命令可以为该匿名函数指定任意名字。
import customName from './export-default';
customName();
```

其实这种导出方式可以看成是命名导出的变异 ，只不过把命名写成了default。



#### <font color='red' size="">2.1、export default也能导出多个变量</font>

```js
/ export-default.js
export default{
    v2() {
        return '这是一个函数'
    },
    aa: 6666
}

// 或者写成
const v2 = () => { return '这是一个函数' }
const aa = 6666
export default{
  v2,
  aa
}

# main.js
import fn from '.export-default.js'
console.log(fn.v2(), fn.aa)  // 这是一个函数  6666
```

---
title: ES6-Map和Set与iterable类型
abbrlink: 7bf3d856
date: 2025-03-05 15:51:08
img: /static/26.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

### **<font color='red'>一、Map（映射）</font>**

在ES6之前，JavaScript里通常用 **普通对象（Object）** 来存储键值对。

这样会导致很多问题：

1. **键只能是字符串（或Symbol）**，实际上Number或者其他数据类型作为键也是非常合理的；
2. **无法保证插入顺序**（旧版JS对象不保证属性顺序）

于是，ES6 引入了 **`Map`** —— **一个真正的键值对集合，支持任意类型的键**，并且**保持插入顺序**。

<br>

`Map` 是一种有序的键值对集合，具有极快的查找速度，允许任何类型的键，包括原始类型和对象。它比普通对象提供了更丰富的功能，尤其是在键值对管理方面。

#### **<font color='#10c300'>1.1、特点</font>**

- 初始化Map需要一个二维数组或者直接初始化一个空Map。
- 键可以是任何类型（对象、函数、原始类型等）。
- 按插入顺序存储键值对。
- 支持 `size` 属性来获取 Map 的大小。
- 支持 `set()`, `get()`, `has()`, `delete()`, `clear()` 等方法。

<br>

#### **<font color='#10c300'>1.2、创建 Map</font>**

```js
// 空 Map
const map = new Map();

// 从二维数组初始化
const userMap = new Map([
  ['name', 'Alice'],
  [1, '年龄'],
  [true, '是否VIP']
]);
console.log(userMap);  //  Map(3) {'name' => 'Alice', 1 => '年龄', true => '是否VIP'}
```

<br>

#### **<font color='#10c300'>1.3、Map属性</font>**

`Map.prototype.size`: Map 结构的成员总数

```js
const map = new Map();
map.set('name', 'Bob'); // 字符串键
map.set(1, '数字键');   // 数字键
map.set({ id: 1 }, '对象键'); // 对象键
console.log(map.size); // 3
```

<br>

#### **<font color='#10c300'>1.4、Map方法</font>**

`Map` 的方法都是继承于原型，`Map.prototype.set(key, value)`

- `set(key, value)` ：设置键值名，返回整个 Map 结构
- `get(key)`: 读取key对应的键值，如果找不到key，返回undefined
- `has(key)`: 表示某个键是否在当前 Map 对象之中
- `delete(key)`: 成功删除某个键，返回true，否则返回 false
- `clear()`: 清除所有成员，没有返回值

##### **<font color='cornflowerblue'>1）添加/修改键值（set）</font>**

```js
const map = new Map();
map.set('name', 'Bob'); // 字符串键
map.set(1, '数字键');   // 数字键
map.set({ id: 1 }, '对象键'); // 对象键
console.log(map) // Map(3) {'name' => 'Bob', 1 => '数字键', {…} => '对象键'}
```

##### **<font color='cornflowerblue'>2）获取值（get）</font>**

```js
console.log(map.get('name')); // 'Bob'
console.log(map.get(1));      // '数字键'
console.log(map.get({ id: 1 })); // undefined ❌（不同对象引用）
```

```js
const obj = { id: 1 }
const map = new Map();
map.set(obj, '对象键');
console.log(map.get(obj);  // 对象键
```

##### **<font color='cornflowerblue'>3）删除键值（delete）</font>**

```js
console.log(map.delete('name')) // 删除成功返回 true
console.log(map.delete('不存在的键')) // 返回 false
```

##### **<font color='cornflowerblue'>4）检查键是否存在（has）</font>**

```js
console.log(map.has(1)); // true
console.log(map.has('age')); // false
```

##### **<font color='cornflowerblue'>5）清空 Map（clear）</font>**

```js
map.clear();
console.log(map); // Map {}
```

<br>

#### **<font color='#10c300'>1.5、Map遍历</font>**

```js
const userMap = new Map([
    ['name', 'Alice'],
    ['age', 25],
    ['isVIP', true]
])

// forEach
userMap.forEach((value, key) => {
    console.log(`${key}: ${value}`)
})


// for...of（返回 [key, value] 数组）
for (const [key, value] of userMap) {
    console.log(key, value)
}
```

<br>

#### **<font color='#10c300'>1.6、将 Map 结构转换为数组结构</font>**

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]

```

除了转换为数组，也可以跟其他数据结构互相转换，如

- Map 转为对象，对象转 Map
- Map 转为 JSON， JSON 转 Map

<br>

#### **<font color='#10c300'>1.7、实战场景</font>**

```js
// 🔔场景 1：缓存数据（如 API 请求结果）
const cache = new Map();

function fetchData(url) {
  if (cache.has(url)) {
    console.log('从缓存读取:', url);
    return Promise.resolve(cache.get(url));
  }
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      cache.set(url, data);
      return data;
    });
}
// 使用
fetchData('/api/user').then(console.log);
fetchData('/api/user').then(console.log); // 第二次直接从缓存
// 优点：Map 的键可以直接用 URL 对象或字符串，不会发生键名冲突。



// 🔔场景 2：统计元素出现次数
const items = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const counter = new Map();
for (const item of items) {
  counter.set(item, (counter.get(item) || 0) + 1);
}
console.log(counter);
// Map(3) { 'apple' => 3, 'banana' => 2, 'orange' => 1 }
// 优点：直接用 Map 存储计数，键是任意类型，统计方便。


// 🔔场景 3：存储对象与元数据的映射
const user1 = { name: 'Alice' };
const user2 = { name: 'Bob' };

const lastLogin = new Map();
lastLogin.set(user1, '2024-06-01');
lastLogin.set(user2, '2024-06-02');

console.log(lastLogin.get(user1)); // 2024-06-01
// 优点：遍历顺序就是插入顺序，适合需要顺序处理的业务。


// 🔔场景 4：按插入顺序遍历
const orders = new Map();
orders.set(101, '已支付');
orders.set(102, '待支付');
orders.set(103, '已取消');

for (const [id, status] of orders) {
  console.log(`订单 ${id} 状态: ${status}`);
}
// 优点：遍历顺序就是插入顺序，适合需要顺序处理的业务。


// 🔔场景 5：替代 switch-case
const actionMap = new Map([
  ['create', () => console.log('创建')],
  ['update', () => console.log('更新')],
  ['delete', () => console.log('删除')],
]);

function handleAction(type) {
  const action = actionMap.get(type);
  if (action) action();
  else console.log('未知操作');
}
handleAction('update'); // 更新
// 优点：更灵活、更易维护，避免长长的 switch 或 if else。
```

<br>

### **<font color='red'>二、Set （集合）</font>**

`Set` 类似于数组，但是成员的值都是唯一的，没有重复的值。

#### **<font color='#10c300'>2.2、创建 Set</font>**

```js
// 空 Map
const set = new Set();

// 从数组初始化（自动去重）
const fruits = new Set(['🍎', '🍌', '🍎', '🍊']);
console.log(fruits); // Set { '🍎', '🍌', '🍊' }
```

<br>

#### **<font color='#10c300'>1.3、Set属性</font>**

- `Set.prototype.constructor`：构造函数，默认就是Set函数。
- `Set.prototype.size`：返回Set实例的成员总数。

```js
const colors = new Set(['red', 'green', 'blue']);
console.log(colors.size); // 3
```

<br>

#### **<font color='#10c300'>1.4、Set方法</font>**

`Set` 的方法都是继承于原型，`Set.prototype.add(value)`。

- `set(key, value)` ：设置键值名，返回整个 Map 结构
- `get(key)`: 读取key对应的键值，如果找不到key，返回undefined
- `has(key)`: 表示某个键是否在当前 Map 对象之中
- `delete(key)`: 成功删除某个键，返回true，否则返回 false
- `clear()`: 清除所有成员，没有返回值

##### **<font color='cornflowerblue'>1）添加值（add）</font>**

```js
const numbers = new Set();
numbers.add(1);
numbers.add(2);
numbers.add(2); // 重复值会被忽略
console.log(numbers); // Set { 1, 2 }
```

##### **<font color='cornflowerblue'>2）删除值（delete）</font>**

```js
console.log(numbers.delete(1)) // 删除成功返回 true
console.log(numbers.delete(99)) // 返回 false
```

##### **<font color='cornflowerblue'>3）检查键是否存在（has）</font>**

```js
console.log(numbers.has(2)); // true
console.log(numbers.has(5)); // false
```

##### **<font color='cornflowerblue'>4）清空 Map（clear）</font>**

```js
numbers.clear();
console.log(numbers); // Set {}
```

<br>

#### **<font color='#10c300'>1.5、Set遍历</font>**

```js
const letters = new Set(['a', 'b', 'c']);

// forEach
letters.forEach((value) => {
  console.log(value); // a, b, c
});

// for...of
for (const letter of letters) {
  console.log(letter); // a, b, c
}
```

<br>

#### **<font color='#10c300'>1.6、将 Set结构转换为数组结构</font>**

```js
const letters = new Set(['a', 'b', 'c'])
console.log([...letters.keys()]) // ['a', 'b', 'c']
console.log([...letters.values()]) // ['a', 'b', 'c']
console.log([...letters.entries()]) // [[a,a], [b,b], [c,c]]
console.log([...letters]) // ['a', 'b', 'c']
console.log(Array.from(letters)) // ['a', 'b', 'c']
```

<br>

#### **<font color='#10c300'>1.7、实战场景</font>**

```js
// 🔔场景 1：去重
let arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)]; // [3, 5, 2]
```

<br>

### **<font color='red'>三、iterable类型</font>**

遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。

具有iterable类型的集合可以通过新的for ... of循环来遍历。

用for ... of循环遍历集合，用法如下：

```javascript
var a = ['A', 'B', 'C']
var s = new Set(['A', 'B', 'C'])
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']])
for (var x of a) { // 遍历Array
    console.log(x) // A B C
}
for (var v of s) { // 遍历Set
    console.log(v) // A B C
}
for (var r of m) { // 遍历Map
    console.log(r[0] + '=' + r[1]) // 1=x 2=y 3=z
}
```

<br>

你可能会有疑问，for ... of循环和for ... in循环有何区别？

for ... in循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个Array数组实际上也是一个对象，它的每个元素的索引被视为一个属性。

当我们手动给Array对象添加了额外的属性后，for ... in循环将带来意想不到的意外效果：

```javascript
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}
```

for ... in循环将把name包括在内，但Array的length属性却不包括在内。

for ... of循环则完全修复了这些问题，它只循环集合本身的元素：

```javascript
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    console.log(x); // 'A', 'B', 'C'
}
```

这就是为什么要引入新的for ... of循环。

<br>

然而，更好的方式是直接使用iterable内置的forEach方法，它接收一个函数，每次迭代就自动回调该函数。以Array为例：

```javascript
var a = ['A', 'B', 'C'];
a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element + ', index = ' + index);
});
//A, index = 0
//B, index = 1
//C, index = 2
```

注意，forEach()方法是ES5.1标准引入的，你需要测试浏览器是否支持。

Set与Array类似，但Set没有索引，因此回调函数的前两个参数都是元素本身：

```javascript
var s = new Set(['A', 'B', 'C'])
s.forEach((element, sameElement, set) => {
    console.log(element) // A B C
    console.log(sameElement) // A B C
})
```

Map的回调函数参数依次为value、key和map本身：

```javascript
var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']])
m.forEach((value, key, map) => {
    console.log(value) // x y z
    console.log(key) // 1 2 3
})
```


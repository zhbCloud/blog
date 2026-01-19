---
title: Array方法集
abbrlink: 2b2e443a
date: 2025-08-03 15:51:08
img: /static/16.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

**改变原数组(变异)：**push()和pop()，shift() 和 unshift()，sort()，splice()，reverse()

**返回新数组(非变异)：**join()，concat()，slice()... ...等

### **<font color='red'>map()</font>**

**返回新的数组，**获取某个数组对象中满足条件的单个属性组成一个新的数组

```js
const students = [
	{ name: 'sam', age: 26, score: 80 },
	{ name: 'john', age: 25, score: 86 },
	{ name: 'dean', age: 20, score: 78 },
	{ name: 'timothy', age: 18, score: 95 },
	{ name: 'frank', age: 21, score: 67 },
	{ name: 'timothy', age: 8, score: 30 }
]

let mapStudentsName = students.map(student => student.name)
#返回值：
["sam", "john", "dean", "timothy", "frank", "timothy"]

let mapStudentsName = students.map(student => ({name: student.name}))
#返回值：
[name: 'sam',name: 'john',name: 'dean',name: 'timothy',name: 'frank',name: 'timothy']
```

<br>

### **<font color='red'>filter()</font>**

**返回新的数组，**返回所有满足条件的新数组（遍历数组所有内容 返回所有满足条件的），如果没有符合条件的元素返回 undefined

```js
const students = [
	{ name: 'sam', age: 26, score: 80 },
	{ name: 'john', age: 25, score: 86 },
	{ name: 'dean', age: 20, score: 78 },
	{ name: 'timothy', age: 18, score: 95 },
	{ name: 'frank', age: 21, score: 67 },
	{ name: 'timothy', age: 8, score: 30 }
]

let filteredStudentAge = students.filter(student => student.age >= 24)

#返回值：
[{"name": "sam", "age": 26, "score": 80},{"name": "john", "age": 25, "score": 86}]
```



### **<font color='red'>find()</font>**

**返回新的值，**如果有一个元素满足条件就返回这个元素，剩余的元素不会再执行检测，如果没有符合条件的元素返回 undefined

```js
const students = [
	{ name: 'sam', age: 26, score: 80 },
	{ name: 'john', age: 25, score: 86 },
	{ name: 'dean', age: 20, score: 78 },
	{ name: 'timothy', age: 18, score: 95 },
	{ name: 'frank', age: 21, score: 67 },
	{ name: 'timothy', age: 8, score: 30 }
]

let findStudentsName = students.find(student => student.name === 'timothy')

#返回值：
{
  "name": "timothy",
  "age": 18,
  "score": 95
}


findStudentsName.name = '小米'
console.log(students)
/*
[
	{ name: 'sam', age: 26, score: 80 },
	{ name: 'john', age: 25, score: 86 },
	{ name: 'dean', age: 20, score: 78 },
	{ name: '小米', age: 18, score: 95 },
	{ name: 'frank', age: 21, score: 67 },
	{ name: 'timothy', age: 8, score: 30 }
]
*/
```

<br>

### **<font color='red'>findIndex() </font>**

**返回新的值，**如果有一个元素满足条件就返回这个元素的索引，剩余的元素不会再执行检测，如果没有符合条件的元素返回-1

```js
const students = [
	{ name: 'sam', age: 26, score: 80 },
	{ name: 'john', age: 25, score: 86 },
	{ name: 'dean', age: 20, score: 78 },
	{ name: 'timothy', age: 18, score: 95 },
	{ name: 'frank', age: 21, score: 67 },
	{ name: 'timothy', age: 8, score: 30 }
]

let findStudentsName = students.findIndex(student => student.name === 'timothy')

#返回值：
3
```

<br>

### **<font color='red'>some()</font>**

**返回一个布尔值，**如果有一个元素满足条件，则表达式返回true, 剩余的元素不会再执行检测

some在碰到return true的时候，中止循环

```js
const students = [
	{ name: 'sam', age: 26, score: 80 },
	{ name: 'john', age: 25, score: 86 },
	{ name: 'dean', age: 20, score: 78 },
	{ name: 'timothy', age: 18, score: 95 },
	{ name: 'frank', age: 21, score: 67 },
	{ name: 'timothy', age: 8, score: 30 }
]

let someStudentsName = students.some(student => student.age < 18)

#返回值：
true
```

<br>

### **<font color='red'>every()</font>**

**返回一个布尔值，**数组内所有元素都要满足条件才返回true， 如有一个不满足就返回false 剩余的元素不会再执行检测，不会对空数组进行检测，空数组调用返回的是true

every在碰到return false的时候，中止循环

```js
const students = [
	{ name: 'sam', age: 26, score: 80 },
	{ name: 'john', age: 25, score: 86 },
	{ name: 'dean', age: 20, score: 78 },
	{ name: 'timothy', age: 18, score: 95 },
	{ name: 'frank', age: 21, score: 67 },
	{ name: 'timothy', age: 8, score: 30 }
]

let everyStudentsName = students.every(student => student.age < 18)

#返回值：
false
```

<br>

### **<font color='red'>includes()</font>**

**返回一个布尔值，**用来判断一个数组是否包含一个指定的值，包含则返回true，否则false。

```js
const fruitArr = ['mango', 'apple', 'orange', 'pineapple','lemon']

const includesApple = fruitArr.includes('apple')

#返回值：
true
```

<br>

### **<font color='red'>reduce()</font>**

**累加器 计算总分数**

```js
# 语法：array.reduce((prev, cur, index, arr) => {...}, init)
 		prev: 必需。初始值init, 或者计算结束后的返回值。初始值0即init设置的值
        cur: 必需。当前正在处理的数组元素(类似遍历出来的每一项)
        index: 可选。表示当前正在处理的数组元素的索引，若提供init值，则索引为0，否则索引为1；
        arr: 可选。当前元素所属的数组。
        init: 可选。传递给函数的初始值，不传值默认为数组第一项（第一次传给prev的）	
        
const students = [
	{ name: 'sam', age: 26, score: 80 },
	{ name: 'john', age: 25, score: 86 },
	{ name: 'dean', age: 20, score: 78 },
	{ name: 'timothy', age: 18, score: 95 },
	{ name: 'frank', age: 21, score: 67 },
	{ name: 'timothy', age: 8, score: 30 }
]

let reduceSum = students.reduce((prev, cur) => { 
    return prev + cur.score
}, 0)

#返回值：
436

const numbers = [65, 44, 12, 4];
const aa = numbers.reduce((prev, cur) => {
    console.log(prev); // init不传值默认初始值是65
	return prev + cur;
});
#返回值：
125
```

<br>

### **<font color='red'>reduceRight()</font>**

**累加器 计算总分数**

reduceRight() 方法的功能和 [reduce()](https://www.runoob.com/jsref/jsref-reduce.html) 功能是一样的，不同的是 reduceRight() 从数组的末尾向前将数组中的数组项做累加。

```js
# 语法：array.reduceRight((prev, cur, index, arr) => {...}, init)
 		prev: 必需。初始值init, 或者计算结束后的返回值。初始值0即init设置的值
        cur: 必需。当前正在处理的数组元素(类似遍历出来的每一项)
        index: 可选。表示当前正在处理的数组元素的索引，若提供init值，则索引为0，否则索引为1；
        arr: 可选。当前元素所属的数组。
        init: 可选。传递给函数的初始值，不传值默认为数组最后一项（第一次传给prev的）
       
 var numbers = [65, 44, 12, 4];
 let aa = numbers.reduceRight((prev, cur) => {
   console.log(prev); // init不传值默认初始值是4
   return prev + cur;
 });
#返回值：
125
```

<br>

### **<font color='red'>concat()</font>**

**返回新的数组，**连接两个或更多的数组，并返回结果

现在推荐扩展运算符：const concatArray = [...[1, 2, 3, 4, 5],  ...['a', 'b']]

```js
const concatArray = [1, 2, 3, 4, 5].concat(['a', 'b'])

#返回值：
[ 1, 2, 3, 4, 5, "a", "b" ]
```

<br>

### **<font color='red'>indexOf()</font>**

**返回数组中某个指定的第一个元素的索引**。如果在数组中没找到指定元素则返回 -1

```js
# 语法：array.indexOf(item,start)
     item:必须。查找的元素。
     start:可选的整数参数，规定在数组中开始检索的位置

const fruitArr = ['mango', 'apple', 'orange', 'pineapple','lemon']
const indexOfArray = fruitArr.indexOf('apple')
#返回值：
1

const fruitArr = ['mango', 'apple', 'orange', 'pineapple', 'apple']
const indexOfArray = fruitArr.indexOf('apple', 3)
#返回值：
4
```

<br>

### **<font color='red'>lastIndexOf() </font>**

**返回数组中某个指定的元素最后出现的索引**。如果在数组中没找到指定元素则返回 -1

```js
#语法：array.lastIndexOf(item,start)
     item:必须。查找的元素。
     start:可选的整数参数，规定在数组中开始检索的位置
     
从右往左第一个Apple的索引
const fruits = ["Banana", "Orange", "Apple", "Mango", "Apple", "Orange"];
const a = fruits.lastIndexOf("Apple");
#返回值：
4

从索引4(包含)开始从右往左第一个Apple的索引
const fruits=["Banana","Orange","Apple","Mango","Banana","Orange","Apple"];
const a = fruits.lastIndexOf("Apple",4); //2
#返回值：
2
```

<br>

### **<font color='red'>splice()</font>**

**改变原数组，**可以实现删除、插入和替换元素。

```js
# 语法：array.splice(index,howmany,item1,.....,itemX)
      index: 必需。规定从何处添加/删除元素。该参数是开始插入和（或）删除的数组元素的索引，必须是数字。
      howmany：可选。删除的项数(删除多少元素)。必须是数字，0就是不删除。如果未规定此参数，则删除从 index 			   开始到原数组结尾的所有元素。
      item1, ..., itemX：可选。要添加到数组的新元素
   
      
删除：可以删除任意数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2)会删除数组中的前两项。

const spliceArray = ['mango', 'apple', 'orange', 'pineapple', 'apple']
const spliceArrayRemoveed = spliceArray.splice(0, 2)
console.log(spliceArray)  // ['orange', 'pineapple', 'apple']
console.log(spliceArrayRemoveed) //  ['mango', 'apple']

const spliceArrayRemoveed = spliceArray.splice(1, 2)
console.log(spliceArray)  // ['mango', 'pineapple', 'apple']
console.log(spliceArrayRemoveed) //  ['apple', 'orange']

插入：可以向指定位置插入任意数量的项，只需提供3个参数：起始位置、 0（要删除的项数）和 要插入的项。例如，splice(2,0,'lemon','6')会从当前数组的索引2开始插入lemon和6。

const spliceArray = ['mango', 'apple', 'orange', 'pineapple', 'apple']
const spliceArrayRemoveed = spliceArray.splice(2, 0, 'lemon', '6')
console.log(spliceArray)  
// ['mango', 'apple', 'lemon', '6', 'orange', 'pineapple', 'apple']
console.log(spliceArrayRemoveed) // []


替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (1,2,'lemon')会删除当前数组位置 1 的项，然后再从位置 2 开始插入'lemon'。

const spliceArray = ['mango', 'apple', 'orange', 'pineapple', 'apple']
const spliceArrayRemoveed = spliceArray.splice(1, 2, 'lemon')
console.log(spliceArray) // ['mango', 'lemon', 'pineapple', 'apple']
console.log(spliceArrayRemoveed) // ['apple', 'orange']
```

<br>

### **<font color='red'>slice()</font>**

**返回新的数组，**取数组的某个部分

```js
const heroes = ["李白", '蔡文姬', '韩信', '赵云', '甄姬', '阿珂', '貂蝉', '妲己']
const neWheroes = heroes.slice(0, 3) // 从索引0开始截取(包含)，截取到索引3(不包含)
#返回值：
['李白', '蔡文姬', '韩信']

const neWheroes = heroes.slice(2, -1) // 从索引2开始截取(包含)，-1代表截取到倒数第一位（不含）
#返回值：
['韩信', '赵云', '甄姬', '阿珂', '貂蝉']

const neWheroes = heroes.slice(-4) // 截取后四位
#返回值：['赵云', '甄姬', '阿珂', '貂蝉']
```

<br>

### **<font color='red'>forEach() </font>**

遍历数组

```js
#原生的foreach是无法跳出循环的  for遍历用break跳出循环   jq的each的用return falsel来替代break

const students = [
	{ name: 'sam', age: 26, score: 80 },
	{ name: 'john', age: 25, score: 86 },
	{ name: 'dean', age: 20, score: 78 },
	{ name: 'timothy', age: 18, score: 95 },
	{ name: 'frank', age: 21, score: 67 },
	{ name: 'timothy', age: 8, score: 30 }
]

	#forEach
let paymentMethodIndex = ''
students.forEach((item, index) => {
    paymentMethodIndex = index;
    return false; // 退出不了循环
})
console.log(paymentMethodIndex) // 打印5

	#for
for (let index = 0; index < students.length; index++) {
    paymentMethodIndex = index
    break // 遍历第一次就终止循环了
}
console.log(paymentMethodIndex); // 打印0

	#$.each
$.each(students, function (index, item) {
    paymentMethodIndex = index
    return false // 遍历第一次就终止循环了
})
console.log(paymentMethodIndex); // 打印0

# 利用forEach给遍历出来的对象添加属性
let list1 = []
students.forEach((item, index) => {
	const newList = item // 直接给item赋值会报错
    newList.value = index.toString();
    list1 = [...list1, newList]
})
console.log(list1);
返回值：
const students = [
	{ value: '0', name: 'sam', age: 26, score: 80 },
	{ value: '1', name: 'john', age: 25, score: 86 },
	{ value: '2', name: 'dean', age: 20, score: 78 },
	{ value: '3', name: 'timothy', age: 18, score: 95 },
	{ value: '4', name: 'frank', age: 21, score: 67 },
	{ value: '5', name: 'timothy', age: 8, score: 30 }
]
```

<br>

### **<font color='red'>join()</font>**

**返回新的数组**，用于把数组中的所有元素用指定的字符串连接起来（数组转字符串）

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var energy = fruits.join();
#返回值
Banana,Orange,Apple,Mango

var fruits = ["Banana", "Orange", "Apple", "Mango"];
var energy = fruits.join(" / "); 
#返回值
Banana / Orange / Apple / Mango
```

<br>

### **<font color='red'>toString() </font>**

**返回新数组，**把数组转换为字符串，并返回结果。

```js
let fruitArr = ["Banana", "Orange", "Apple", "Mango"];
let fruitString = fruits.toString();
#返回值
"Banana", "Orange", "Apple", "Mango"
```

<br>

### **<font color='red'>fill() </font>**

**改变原数组，**用一个值替换数组中的元素

```js
#array.fill(value, start, end)
	value：必需。填充的值（替换数组中的值）。
	start：可选。开始填充位置。已经填充
	end：可选。停止填充位置 (默认为 array.length) 没填充
    
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("88");
#返回值
['88', '88', '88', '88']

var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("66", 2, 3);
#返回值
["Banana", "Orange", "66", "Mango"]
```

<br>

### **<font color='red'>from()</font>**

**1、用来将两种对象转换成数组转换成数组（ES6）**

两种对象：

（1）.部署了Iterator接口的对象，比如：Set，Map，Array。

（2）.类数组对象，什么叫类数组对象，就是一个对象必须有length属性，没有length，转出来的就是空数组，类数组对象的属性名必须为数值型或字符串型的数字（属性名不是数值或字符串数值返回的是一个都是undefined的数组）。

```js
var map = new Map()
  .set('k1', 1)
  .set('k2', 2)
  .set('k3', 3)
console.log(Array.from(map));
#返回值
[['k1', 1],['k2', 2],['k3', 3]]

var set = new Set()
  .add(1, 'a')
  .add(2, 'b')
  .add(3, 'c');
console.log(Array.from(set));
#返回值
[1, 2, 3]


let arrayLike = { 0: 'tom', 1: ['john','Mary'], 'length': 2}
let arr = Array.from(arrayLike)
#返回值
['tom',['john','Mary']]


let arrayLike = {  // 属性名不是数字或字符串数值，因此不是类数组
    'name': 'tom', 
    'friends': ['john','Mary'],
    length: 2
}
let arr = Array.from(arrayLike)
#返回值
// [ undefined, undefined ]
```

**2、`Array.from`还可以接受第二个参数，作用类似于数组的`map`方法，用来对每个元素进行处理，将处理后的值放入返回的数组。**

**返回新的数组**

```js
let arr = [1, 2, 3]
let set = new Set(arr)
let newArr = Array.from(set, item => item + 1)
#返回值
[2, 3, 4]
```

<br>

### **<font color='red'>isArray() </font>**

**返回一个布尔值，**用于判断一个对象是否为数组。

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var x = Array.isArray(fruits);
#返回值
true
```

<br>

### **<font color='red'>reverse() </font>**

**改变原数组，**颠倒数组中元素的顺序

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.reverse()
#返回值
['Mango', 'Apple', 'Orange', 'Banana']
```

<br>

### **<font color='red'>sort() </font>**

**改变原数组，**对数组的元素进行排序，默认排序顺序为按字母或数字(个位数)升序。

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();
#返回值
["Apple","Banana","Mango","Orange"]


var arr = [4, 3, 6, 5, 7, 2, 1];
arr.sort();
#返回值
//[1,2,3,4,5,6,7]


// a遍历出来是降序 100 40 25 10 5 1
// b遍历出来是升序 1 5 10 25 40 100
var points = [40, 100, 1, 5, 25, 10];
points.sort((a, b) => b - a); // 降序
#返回值
//[100, 40, 25, 10, 5, 1]


var points = [40, 100, 1, 5, 25, 10];
points.sort((a, b) => a - b);  // 升序
#返回值
//[1,5,10,25,40,100]


var arr1 = [
  {nama: '张飞', age:34},
  {nama: '曹操', age:20},
  {nama: '关旭', age:60}
]
arr1.sort((a, b) => a.age - b.age)
#返回值
[
  {nama: '曹操', age:20},
  {nama: '张飞', age:34},
  {nama: '关旭', age:60}
]
```

<br>

### **<font color='red'>push() </font>**

**改变原数组，**向数组的尾部添加一个或更多元素

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("11")
#返回值
["Banana", "Orange", "Apple", "Mango", "11"];
```

<br>

### **<font color='red'>pop()</font>**

**改变原数组，**删除数组的尾部最后一个元素

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var res = fruits.pop()
#返回值

console.log(fruits) // ["Banana", "Orange", "Apple"]
console.log(res) // 'Mango'
```

<br>

### **<font color='red'>shift() </font>**

**改变原数组，**把数组的第一个元素从其中删除

```js
let fruits = ["Banana", "Orange", "Apple", "Mango"];
let res = fruits.shift()
#返回值
console.log(fruits) // ['Orange', 'Apple', 'Mango']
console.log(res) // 'Banana'
```

<br>

### **<font color='red'>unshift()</font>**

**改变原数组，**向数组的开头添加一个或更多元素

```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.unshift("Lemon","Pineapple");
#返回值
Lemon,Pineapple,Banana,Orange,Apple,Mango
```

<br>

### **<font color='red'>copyWithin()</font>**

**返回新数组，**用于从数组的指定位置拷贝元素到数组的另一个指定位置中。  原数组长度保持不变。

```js
# array.copyWithin(target, start, end)
target：必需。复制到指定目标索引位置。
start：可选。元素复制的起始位置。
end：可选。停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数。


var fruits = ["你", "真", "的", "好"];
var n = fruits.copyWithin(2, 0);
#返回值
["你", "真", "你", "真"]


var fruits = ["你", "是", "真", "的", "好", "吗"];
var n = fruits.copyWithin(2, 0, 2);
#返回值
["你", "是","你", "是","好", "吗"]
```

<br>

### **<font color='red'>entries() </font>**

**返回新的数组，**返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。

迭代对象中数组的索引值作为 key， 数组元素作为 value。

**可迭代对象：可以使用for循环遍历的对象,我们称之为可迭代对象.**

`Object.entries()` 可以把一个对象的键值以数组的形式遍历出来，结果和 `for...in` 一致，但不会遍历原型属性。

```js
const arr = ['你', '啊', '的'];
const newArr = Object.entries(arr)
#返回值
[["0", "你"],["1", "啊"],["2", "的"]]


const obj = { foo: 'bar', baz: 'abc' }; 
const newobjr = Object.entries(obj)
#返回值
[['foo', 'bar'], ['baz', 'abc']]
```

<br>

### **<font color='red'>keys() </font>**

**返回新的数组，**用于从数组创建一个包含数组键的可迭代对象。

如果对象是数组返回 true，否则返回 false。

```js
let obj = { 'a': 123, "b": 456 };
let newObj = Object.keys(obj)
#返回值
["a","b"]

let str = 'asfdw';
let newstr = Object.keys(str)
#返回值
['0', '1', '2', '3', '4']

let arr = [1, 24, 45, 67];
let newArr = Object.keys(arr)
#返回值
["0", "1", "2", "3"]
```

<br>

### **<font color='red'>flat()</font>**

**返回新的数组，**用于将嵌套的数组“拉平

```js
#array.fill(num)
	num：默认1，1拉平一层数组  2拉平两层数组  Infinity拉平多层
    
let arr = ['a',[11]]
let res = arr.flat()

let arr = ['a',[11, [666]]]
let res = arr.flat(2)

let arr = ['a', [11, [666, ['qqq']]]]
let res = arr.flat(Infinity)
```


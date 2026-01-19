---
title: Js使用new关键字调用函数和直接调用函数的区别
abbrlink: be3789b9
date: 2025-03-10 15:51:08
img: /static/25.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

调用经典的构造函数需要加new

```js
function Person(name, age, job){
      var o = new Object();
      o.name = name;
      o.age = age;
      o.job = job;
      o.sayName = function () {
        alert(this.name);
      };
      return o;
}
console.log(new Person('Nicholas', 29, 'Software'));
// {name: 'Nicholas', age: 29, job: 'Software', sayName: ƒ}
```

Person函数创建了一个对象，并以相应的属性和方法初始化该对象，然后又返回了这个对象，除了使用new操作符且把使用的包装函数叫做构造函数

看到这里，我就将上面的例子的new关键字去掉，发现和原来结果一样。

```js
function Person(name, age, job){
      var o = new Object();
      o.name = name;
      o.age = age;
      o.job = job;
      o.sayName = function () {
        alert(this.name);
      };
      return o;
}
console.log(Person('Nicholas', 29, 'Software'));    
// {name: 'Nicholas', age: 29, job: 'Software', sayName: ƒ}
```



而后，写了几个例子，进行比较：

```jsx
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    alert(this.name);
  }
}
var person=new Person("张三",20); //此处为 构造对象，构造对象的话，返回的新对象是由解析器自己生成的。
console.log(person); // 有new 函数内部的this指向实例本身  
// Person {name: "张三", age: 20, sayName: ƒ}
    
var person = Person("张三", 20); //没有new 函数内部的this指向window
console.log(person); //报错 person undefined 此处为普通函数调用，又没有给返回值，出错。
```

**注意：构造函数在不返回值的情况下，默认返回新对象实例。**


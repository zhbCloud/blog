---
title: javascript深拷贝与浅拷贝的区别，实现深拷贝的几种方法
abbrlink: 3889ed3f
date: 2025-03-08 15:51:08
img: /static/29.webp
categories: HTML/CSS/JS
tags:
  - javaScript
---

### **<font color='red'>1、引言</font>**

如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。

此篇文章中也会简单阐述到`栈堆`，`基本数据类型`与`引用数据类型`，因为这些概念能更好的让你理解深拷贝与浅拷贝。

我们来举个浅拷贝例子：

```jsx
let a=[0,1,2,3,4],
    b=a;
console.log(a===b);
a[0]=1;
console.log(a,b);
```

![image-20230417002612240](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205451.png)



嗯？明明b复制了a，为啥修改数组a，数组b也跟着变了，这里我不禁陷入了沉思。

![image-20230417002616002](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205195.png)



那么这里，就得引入基本数据类型与引用数据类型的概念了。

<br>

### **<font color='red'>2、基本数据与复杂(引用)数据</font>**

面试常问，基本数据类型有哪些，**number，string，boolean，null，undefined，symbol**以及未来ES10新增的**BigInt**(任意精度整数)七类。

引用数据类型(Object类)有常规名值对的无序对象{a:1}，数组[1,2,3]，以及函数等。

而这两类数据存储分别是这样的：

#### **<font color='#10c300'>2.1、基本类型</font>**

名值存储在栈内存中，例如let a=1;

![image-20230417002628975](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205960.png)



当你b=a复制时，栈内存会新开辟一个内存，例如这样：

![image-20230417002632879](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205623.png)



所以当你此时修改a=2，对b并不会造成影响，因为此时的b已自食其力，翅膀硬了，不受a的影响了。当然，let a=1,b=a;虽然b不受a影响，但这也算不上深拷贝，因为深拷贝本身只针对较为复杂的object类型数据。



#### **<font color='#10c300'>2.2、引用数据类型</font>**

名存在栈内存中，值存在于堆内存中，但是栈内存会提供一个引用的地址指向堆内存中的值，我们以上面浅拷贝的例子画个图：

![image-20230417002638532](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205311.png)



当b=a进行拷贝时，其实复制的是a的引用地址，而并非堆里面的值。

![image-20230417002642684](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205763.png)



而当我们**a[0]=1**时进行数组修改时，由于a与b指向的是同一个地址，所以自然b也受了影响，这就是所谓的浅拷贝了。

![image-20230417002646615](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205308.png)



那，要是在堆内存中也开辟一个新的内存专门为b存放值，就像基本类型那样，岂不就达到深拷贝的效果了

![image-20230417002651596](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205176.png)



<br>

### **<font color='red'>3、实现简单的深拷贝</font>**

#### **<font color='#10c300'>3.1、递归</font>**

这么我们封装一个深拷贝的函数(PS：只是一个基本实现的展示，并非最佳实践)



```jsx
function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}    
let a=[1,2,3,4],
    b=deepClone(a);
a[0]=2;
console.log(a,b);
```

可以看到

![image-20230417002657047](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205888.png)



跟之前想象的一样，现在b脱离了a的控制，不再受a影响了。

这里再次强调，深拷贝，是拷贝对象各个层级的属性，可以看个例子。JQ里有一个extend方法也可以拷贝对象，我们来看看



```js
let a=[1,2,3,4],
    b=a.slice();
a[0]=2;
console.log(a,b);
```

![image-20230417002701042](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205474.png)



那是不是说slice方法也是深拷贝了，毕竟b也没受a的影响，上面说了，深拷贝是会拷贝所有层级的属性，还是这个例子，我们把a改改

```js
let a=[0,1,[2,3],4],
        b=a.slice();
a[0]=1;
a[2][0]=1;
console.log(a,b);
```

![image-20230417002706135](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205032.png)



拷贝的不彻底啊，b对象的一级属性确实不受影响了，但是二级属性还是没能拷贝成功，仍然脱离不了a的控制，说明slice根本不是真正的深拷贝。

这里引用知乎问答里面的一张图

![image-20230417002710421](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205614.png)



第一层的属性确实深拷贝，拥有了独立的内存，但更深的属性却仍然公用了地址，所以才会造成上面的问题。

同理，concat方法与slice也存在这样的情况，他们都不是真正的深拷贝，这里需要注意。



#### **<font color='#10c300'>3.2、JSON对象的parse和stringify</font>**

```jsx
function deepClone(obj){
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}    
let a=[0,1,[2,3],4],
    b=deepClone(a);
a[0]=1;
a[2][0]=1;
console.log(a,b);
```

![image-20230417002715510](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140205685.png)



可以看到，这下b是完全不受a的影响了。

附带说下，JSON.stringify与JSON.parse除了实现深拷贝，还能结合localStorage实现对象数组存储。有兴趣可以阅读博主这篇文章。

[localStorage存储数组，对象，localStorage,sessionStorage存储数组对象](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Fecholun%2Fp%2F9088189.html)



#### **<font color='#10c300'>3.3、JQ的extend</font>**

***$\*.extend( [deep ], target, object1 [, objectN ] )**

**deep**表示是否深拷贝，为true为深拷贝，为false，则为浅拷贝

**target\**\** Object**类型 目标对象，其他对象的成员属性将被附加到该对象上。

**object1 objectN**可选。 Object类型 第一个以及第N个被合并的对象。



```jsx
let a=[0,1,[2,3],4],
    b=$.extend(true,[],a);
a[0]=1;
a[2][0]=1;
console.log(a,b);
```

可以看到，效果与上面方法一样，只是需要依赖JQ库。

![image-20230417002720627](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140206063.png)



那么到这里，我们知道了深拷贝与浅拷贝的区别，同时从数据存储规则来解释，也明白了为什么要使用深拷贝；其次，我们知道了几种简单粗暴的深拷贝办法，也明白在何种情况下我们应该使用深拷贝。

对于文章中简单提及的栈堆概念，我专门整理了一篇关于JS内存空间的文章，若有兴趣欢迎阅读 [JS 从内存空间谈到垃圾回收机制](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Fecholun%2Fp%2F11503915.html) 这篇文章。

其实stringify与parse在日常开发中使用特别频繁，如果大家对于它两还有不解，可以阅读博主[ json.stringify()的妙用，json.stringify()与json.parse()的区别](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Fecholun%2Fp%2F9631836.html) 这篇文章。

转载于：https://www.cnblogs.com/echolun/p/7889848.html
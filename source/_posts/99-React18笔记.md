---
title: React18
img: /static/45.webp
categories: 框架与生态
tags:
  - react18
abbrlink: 4179c0b9
date: 2025-12-02 10:28:38
---



## **<font color='red'>一、认识react</font>**

React 是⼀个声明式，⾼效且灵活的⽤于构建⽤户界⾯的 JavaScript 库

> React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写⼀套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在 2013 年 5 月开源了。

2022年发布的18版本

### **<font color='#10c300'>1.1、基本结构</font>**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!--react核⼼包-->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <!--react dom相关的包-->
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- 提供es6和jsx的⽀持-->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>

<body>
    <!--提供⼀个挂载点-->
    <div id="app"></div>
    <!-- type="text/babel" 使其能够编译jsx -->
    <script type="text/babel">
        //1.获取到这个挂载点元素
        var container = document.getElementById("app");
        //2.创建⼀个根节点,接收我们的挂载点元素对象当参数
        var root = ReactDOM.createRoot(container);
        //3.调⽤渲染⽅法渲染⻚⾯,render⾥⾯放的是⻚⾯内容(内容指的是html标签或者组件)
        root.render(<h1>我是react</h1>) //jsx，html标签不需要加引号
        
        //也可以简写为
        //ReactDOM.createRoot(document.getElementById("app")).render(<h1>哈哈哈哈</h1>)
    </script>
</body>

</html>
```

<br>

### **<font color='#10c300'>1.2、关于jsx</font>**

> 所谓的jsx其实就是允许在js中正常编写html而无需加引号

```js
const element = <h1>Hello, world!</h1>;
//JSX 允许你将 UI 结构写得和 HTML 很相似，但实际上它会被编译成 JavaScript 对象和函数调⽤
//这段 JSX 会被编译成下⾯的 JavaScript：
const element = React.createElement('h1', null, 'Hello, world!');
```

这种看起来可能有些奇怪的标签语法既不是字符串也不是 HTML。
它被称为 JSX， ⼀种 JavaScript 的语法扩展。 我们推荐在 React 中使⽤ JSX 来描述用户界面。

`jsx中想写变量，使⽤{}就可以插⼊变量`

> { }相当于提供了js的执行环境，大括号里可以任意的js表达式（由运算符连接的），不能写语句（声明语句，if 、for）

#### **<font color='cornflowerblue'>1）注意事项 </font>**

1. **怎么在jsx中的html中写注释**

   ```jsx
   root.render(
       <div>
           {/*大苏打*/}
           <Welcome/>
           <Welcome/>
       <div/>
   );
   ```

   <br>

2. **在多行 JSX 代码中是推荐圆括号 `()` 来包裹 JSX 代码：**

   ```jsx
   let ele = (
       <div>
           <p>aaaa</p>
           <h1>你好</h1>
       </div>
   );
   ```

   <br>

3. **最外层只能有⼀个根元素：**

   ```jsx
   let ele = (
       <div>
           <p>aaaa</p>
           <h1>你好</h1>
       </div>
   );
   ```

   <br>

4. **jsx中，class要改为className**

   ```jsx
   let ele = (
       <div className="box">
           <p>aaaa</p>
           <h1>你好</h1>
       </div>
   );
   ```

   <br>

5. **jsx中style必须写成对象的形式**（双大括号）
   外面的那个大括号是提供一个js环境，里面的大括号是接受一个样式对象

   ```jsx
   let txt = "哈哈哈我是你哥";
   let a = "title";
   let ele = (
     <div className={a} style={{ color: "red" }}>
       <h1>{txt}</h1>
     </div>
   );
   
   
   let cssStyle = {
     width: "50px",
     height: "50px",
     color: "yellow",
   };
   let ele = (
     <div className={a} style={cssStyle}>
       <h1>{txt}</h1>
     </div>
   );
   
   
   let color = "green";
   let ele = (
     <div className={a} style={{ color: color, width: "200px" }}>
       <h1>{txt}</h1>
     </div>
   );
   ```

   <br>

6. **样式中有多个单词组成的样式不能用 横线连接，改为驼峰式**

   ```jsx
   let ele = (
     <div
       className={a}
       style={{ color: color, width: "200px", marginLeft: "50px" }}
     >
       <h1>{txt}</h1>
       <a href={url}>百度</a>
     </div>
   );
   ```

   <br>

7. **样式中是数字的，单位可以省略**

   ```jsx
   let ele = (
     <div className={a} style={{ color: color, width: 200, marginLeft: 50 }}>
       <h1>{txt}</h1>
       <a href={url}>百度</a>
     </div>
   );
   ```

   <br>

8. **jsx中标签数组会自动展开**

   ```jsx
   let arr = [<h1>111</h1>, <h1>222</h1>];
   class Welcome extends React.Component {
     render() {
       return <div>{arr}</div>;
     }
   }
   ```


<br>

## **<font color='red'>二、组件</font>**

其实就是⼀段封装了html css js的代码，最终表现为⼀个自定义标签

组件都有自己独立的作用域：

> react中的组件分为两大类：
>
> ⼀类是函数式组件（推荐）
>
> ⼀类是类组件 （过时）

<br>

### **<font color='#10c300'>2.1、类组件</font>**

要将 React 组件定义为类，请继承内置的 Component 类并定义 render 方法：

**基本结构**

```jsx
var container = document.getElementById("app");
var root = ReactDOM.createRoot(container);

class Welcome extends React.Component {
    render() {
        return <div>自定义类组件</div>;
        
        // return后面不写html标签直接换行 则需要用括号包裹
        // return (
        //     <div>自定义类组件</div>
        // )
    }
}

// 使用组件
root.render(<Welcome/>);
```

<br>

#### **<font color='cornflowerblue'>1）关于Fragment </font>**

这个空标签被称作 Fragment。React Fragment 允许你将子元素分组，而不会在 HTML 结构中添加额外节点。

类似vue中的`<templete></templete>`

```js
var container = document.getElementById("app");
var root = ReactDOM.createRoot(container);
let arr = [
    <h1 key="1">111</h1>,
    <h1 key="2">222</h1>
];
class Welcome extends React.Component {
    render() {
        return (
            <>
                <p>1</p>
                <p>2</p>
            </>
        )
    }
}
root.render(
    <>
        <Welcome/>
        <Welcome/>
    </>
);
```

<br>

#### **<font color='cornflowerblue'>2）props</font>**

组件的属性类似于函数的参数，可以让组件接收外面的数据，展现出不同的结果。

> props是类组件⾃带的属性，代表所有属性的集合

**注意：**属性不能更改，因为属性是从外部传⼊的并不是组件自己的数据，所有没权利更改。如果想更改只能去修改数据源，让他重新传⼀个新属性。

```jsx
class Welcome extends React.Component {
    render() {
        let { name } = this.props
        return <h1>hello，{name} </h1>
    }
}
root.render(<>
    <Welcome name="张三" />
    <Welcome name="李四" />
    <Welcome name="王五" />
    <Welcome name="赵六" />
</>);
```

<br>

##### **<font color='orange'>a、props.children </font>**

类似vue中的插槽

> 如果在组件标签内写内容，通过props.children读取
> 如果传⼊单个内容，返回的就是⼀个对象，如果传⼊多个内容的话，返回的就是数组

```jsx
class Welcome extends React.Component {
    render() {
        let { children } = this.props;
        return (
            <>
                <h1>一级标题</h1>
                {children}
            </>
        )
    }
}

root.render(
    <>
        <Welcome>
            <h3>二级主题</h3>
            <p>这是内容</p>
        </Welcome>
    </>
);


// 如果想把组件标签内的多个内容渲染到不同位置,通过数组索引访问即可
class Welcome extends React.Component {
    render() {
        console.log(this.props);
        let { children } = this.props;
        return (
            <>
                {children[1]}
                <h1>一级标题</h1>
                {children[0]}
            </>
        )
    }
}
root.render(
    <>
        <Welcome>
            <h3>二级主题</h3>
            <p>这是内容</p>
        </Welcome>
    </>
);
```

<br>

#### **<font color='cornflowerblue'>3）state </font>**

- state是属于组件内部私有的，外部无法访问
- state 用于存储组件的动态数据，当组件的 state 更新时，就会执行render函数，组件会重新渲染以更新页面

使用state必须先定义初始值：

```jsx
// 定义初始状态的两种⽅式

// 1.在构造器⾥定义
constructor() {
    super();
    this.state = {
        num: 1
    }
}

// 2.在类中直接定义
state = {
    num: 1
}
```

<br>

##### **<font color='orange'>a、何时使用状态？</font>**

- 组件中什么东西将来会变化，就把什么东西定义成状态
- 只要修改了状态，组件就会重新渲染

##### **<font color='orange'>b、state 的使用</font>**

**1、不能直接修改state，必须采取setState方法去更改**

```jsx
class Welcome extends React.Component {
  state = {
    num: 1,
  };
  add = () => {
    // 方式一：
    // this.setState({
    //    num: this.state.num += 1
    // })

    // 方式二：推荐 需要return出去，这里用了()即return了
    this.setState((prevState) => ({
      num: prevState.num + 1,
    }));
  };
  render() {
    const { num } = this.state;
    return (
      <>
        <h1>{num}</h1>
        <button onClick={this.add}>点击增加</button>
      </>
    );
  }
}

root.render(
    <>
        <Welcome />
    </>
);
```

<br>

**2、数组和对象的更改**

对于数组和对象，必须整体替换，即

```jsx
this.setState({
	数组名: 新数组
	对象: 新对象
})
```

示例：

```jsx
class Welcome extends React.Component {
    state = {
        num: 1,
        score: ["语文90", "数学99"],
        information: {
            name: "JACK",
            age: 18,
        },
    };
    change = () => {
        this.setState({
            num: this.state.num += 1,
            score: [...this.state.score, '英语59'],
            information: {...this.state.information, links: '唱歌'}
        });
    };
    render() {
        const { num, score, information } = this.state;
        return (
            <>
                <h1>{num}</h1>
                <p>成绩：{score}</p>
                <p>信息：{JSON.stringify(information)}</p>
                <button onClick={this.change}>修改</button>
            </>
        );
    }
}
root.render(<Welcome />);
```

<br>

**3、state的更新可能是异步的（出于性能考虑）**

```jsx
class Welcome extends React.Component {
    state = {
        num: 1
    };
    change = () => {
        this.setState({
            num: this.state.num + 1,
        });
        console.log(this.state.num); // 第一次点击修改时为：1 因此证明更新是异步的
    };
    render() {
        const { num } = this.state;
        return (
            <>
                <h1>{num}</h1>
                <button onClick={this.change}>修改</button>
            </>
        );
    }
}
root.render(<Welcome />);
```

如果想同步获取数据，那么可以使用setState的第⼆个参数

```jsx
class Welcome extends React.Component {
    state = {
        num: 1
    };
    change = () => {
        this.setState({
            num: this.state.num + 1,
        }, () => {
            console.log(this.state.num);
        });
    };
    render() {
        const { num } = this.state;
        return (
            <>
                <h1>{num}</h1>
                <button onClick={this.change}>修改</button>
            </>
        );
    }
}
root.render(<Welcome />);
```

<br>

**4、state的更新可能会被合并**

连续多次修改state，出于性能考虑，会只执行⼀次。

因为state中的值发生变化render函数就会执行一次，即页面渲染一次。如果这里遍历十次页面渲染十次就会影响性能。

```jsx
class Welcome extends React.Component {
    state = {
        num: 1
    };
    change = () => {
        for (let index = 0; index < 10; index++) {
            console.log(this.state.num); // 打印10个1
            this.setState({
                num: this.state.num + 1,
            });
        }
    };
    render() {
        const { num } = this.state;
        return (
            <>
                <h1>{num}</h1>  // 页面展示的确是2
                <button onClick={this.change}>修改</button>
            </>
        );
    }
}
root.render(<Welcome />);
```

如果不想合并多次更改state的操作，可以通过给setState传入函数的形式，返回新的状态

```jsx
class Welcome extends React.Component {
    state = {
        num: 1
    };
    change = () => {
        for (let i = 0; i < 10; i++) {
            this.setState((prev) => { // 代表的是上⼀次更新的状态
                console.log(prev.num); // 1,2,3,4,5,6,7,8,9,10
                return {  // 返回值就是你想把什么状态改成什么
                    num: prev.num + 1
                }
            });
        }
    };
    render() {
        const { num } = this.state;
        return (
            <>
                <h1>{num}</h1>
                <button onClick={this.change}>修改</button>
            </>
        );
    }
}
root.render(<Welcome />);
```

<br>

#### **<font color='cornflowerblue'>4）类组件完整结构</font>**

```jsx
class Qq extends React.Component {
    // 定义数据
    state = {
        nickname: '爷傲奈我何'
    }
    
    // js逻辑
    fn = () => {
        this.setState({
            nickname: '更换数据了'
        })
    }
    
    // html
    render() {
        const {nickname} = this.state
        return (
            <>
                <h1>{nickname}</h1>
                <button onClick={this.fn}>点击</button>
            </>
        );
    }
}
```

<br>

### **<font color='#10c300'>2.2、函数组件</font>**

#### **<font color='cornflowerblue'>1）基本概念</font>**

react中的函数组件通常只考虑负责UI的渲染，没有自身的状态没有业务逻辑代码，`是⼀个纯函数`

react中的函数组件基本等同于函数，但是函数组件有**两个必须**的特性：

> 1.组件名必须大写
>
> 2.返回jsx

它接收唯⼀带有数据的 “props”（代表属性）对象与并返回⼀个 React 元素。

`props是所有属性的集合。属性类似于函数中的参数，是一个对象`

`属性不允许更改，如果要改，必须由父组件重新传一个新的props`

这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

<br>

#### **<font color='cornflowerblue'>2）函数的嵌套</font>**

组件可以渲染其他组件，但是 **请不要嵌套他们的定义**：

```js
export default function Gallery() {
  // 🔴 永远不要在组件中定义组件
  function Profile() {
    // ...
  }
  // ...
}
```

上面这段代码 [非常慢，并且会导致 bug 产生](https://react.docschina.org/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state)。因此，你应该在顶层定义每个组件：

```jsx
export default function Gallery() {
    return (
        <>
            <h1>你好</h1>
            <Profile />
        </>
    )
}
// ✅ 在顶层声明组件
function Profile() {
    return (
        <p>我是TOM</p>
    )
}
root.render(<Gallery />);
```

<br>

#### **<font color='cornflowerblue'>3）什么是纯函数</font>**

> 一个函数的返回结果只依赖于它的参数(形参)，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数。

[副作用（side effect） 是指函数或表达式在执行过程中对外部环境产生的影响，而不仅仅是返回一个值。 副作用可能包括但不限于对全局变量、参数、数据结构、文件系统、网络请求等进行修改]()

以下都不是纯函数

```js
let a=5
function fn(b){
  return a+b
}
fn(8) //因为返回值依赖了外部的a，不仅仅是依赖参数


function fn(obj, a){
  obj.age=18
  return obj.age+a //修改了参数
}
```

以下都是纯函数

```jsx
function fn(a){
  return a+5
}

let fn=(b)=>{
    let obj={x:1}
    obj.x=2;
    return obj.x+b
}
```

<br>

## **<font color='red'>三、事件处理</font>**

### **<font color='#10c300'>3.1、基本语法</font>**

- React 事件绑定属性的命名采用驼峰式写法，而不是小写
- 等号后面跟的不是字符串，而是函数名

```jsx
class Welcome extends React.Component {
    fn() {
        alert(1)
    }
    render() {
        return <button onClick={this.fn}>按钮</button>
    }
}
root.render(<Welcome />);
```

<br>

### **<font color='#10c300'>3.2、关于this指向问题</font>**

```jsx
class Welcome extends React.Component {
    state = {
        msg: "我是一个状态"
    }
    fn() {
        console.log(this); // undefined
        console.log(this.state.msg);
    }
    render() {
        return <button onClick={this.fn}>按钮</button>
    }
}
root.render(<Welcome />);
```

**`这里的this是undefined`**
react中的onClick是⼀个自定义的事件名，中间经历过⼀次赋值（onClick={this.fn}），就是把等号后面的函数名赋给了前面的onClick，所以导致this丢失。

以下代码可以演示为什么经历过⼀次赋值，this会丢失：

```js
// 正常调用能取到this
"use strict"
let obj = {
    display: function () {
        console.log(this)
    }
}
obj.display()

// 将函数当做一个实参传给fn函数的形参，这里相当于一次赋值，丢失this
let obj = {
    display: function () {
        console.log(this) // undefined
    }
}
function fn(cb) {
    cb()
}
fn(obj.display)
```

<br>

### **<font color='#10c300'>3.3、如何解决this丢失的问题？</font>**

#### **<font color='cornflowerblue'>1）在构造器中绑定this</font>**

```jsx
class Welcome extends React.Component {
    constructor() {
        super();
        this.fn = this.fn.bind(this) // 在构造器⾥完成this绑定
    }
    state = {
        msg: "我是一个状态"
    }
    fn() {
        console.log(this); 
        console.log(this.state.msg);
    }
    render() {
        return <button onClick={this.fn}>按钮</button>
    }
}
root.render(<Welcome />);
```

<br>

#### **<font color='cornflowerblue'>2）调用的时候绑定 </font>**

```jsx
<button onClick={this.fn.bind(this)} >按钮</button>
```

<br>

#### **<font color='cornflowerblue'>3）使用箭头函数(最推荐) </font>**

```jsx
class Welcome extends React.Component {
    state = {
        msg: "我是一个状态"
    }
    fn = () => { // 使⽤箭头函数
        console.log(this); 
        console.log(this.state.msg);
    }
    render() {
        return <button onClick={this.fn}>按钮</button>
    }
}
root.render(<Welcome />);
```

<br>

### **<font color='#10c300'>3.4、函数参数的传递</font>**

> 注意⼀定不能直接写 函数名+（） 这种是函数调用语句
> react中的事件后面跟的是函数名或者函数体(匿名函数)

#### **<font color='cornflowerblue'>1）传入匿名函数的形式</font>**

```jsx
class Welcome extends React.Component {
    state = {
        msg: "我是一个状态"
    }
    fn = (val) => {
        console.log(val); 
    }
    render() {
        return <button onClick={() => {this.fn(66)}}>按钮</button>
    }
}
root.render(<Welcome />);
```

<br>

#### **<font color='cornflowerblue'>2）bind的方式</font>**

```jsx
<button onClick={this.fn.bind(this,5)} >按钮</button>
```

<br>

#### **<font color='cornflowerblue'>3）案例</font>**

```jsx
class Welcome extends React.Component {
    state = {
        bgColor: "rgb(255,255,255)"
    }
    fn = () => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        this.setState({
            bgColor: `rgb(${r},${g},${b})`
        })                
    }
    render() {
        const box = {
            width: '100px',
            height: '100px',
            border: '1px solid #ccc',
            background: this.state.bgColor
        }
        return (
            <>
                <div style={box}></div>
                <button onClick={this.fn}>切换</button>
            </>
        )
    }
}
root.render(<Welcome />);
```

<br>

## **<font color='red'>四、组件之间的传值</font>**

### **<font color='#10c300'>4.1、父传子(props)</font>**

```jsx
class Parent extends React.Component {
    state = {
        msg: "我是父组件的数据"
    }
    render() {
        const { msg } = this.state
        return (
            <>
                <h1>我是父组件</h1>
                <Child a={msg} />
            </>
        )
    }
}

class Child extends React.Component {
    render() {
        const { a } = this.props
        return (
            <>
                <h3>我是子组件，{a}</h3>
                <GrandChild b={a} />
            </>
        )
    }
}

function GrandChild(props) {
    return <h5>我是孙子组件，{props.b}</h5>
}

root.render(<Parent />);
```

<br>

### **<font color='#10c300'>4.2、子传父(回调函数)</font>**

```jsx
class Parent extends React.Component {
    state = {
        msg: "",
    };
    fn = (val) => {
        this.setState({
            msg: val
        })
    }
    render() {
        return (
            <>
                <h1>我是父组件, 这是子组件传来的数据：{this.state.msg || '______'}</h1>
                <Child fn={this.fn} />  // 1、将fn方法 通过方法传给子组件
            </>
        );
    }
}

class Child extends React.Component {
    state = {
        msg: "我是子组件的数据",
    };
    fn1 = () => {
        // 2、子组件通过props接收fn方法 并且调用传参
        this.props.fn(this.state.msg)
    }
    render() {
        return (
            <>
                <button onClick={this.fn1}>我是子组件，点击可将子组件数据传给父组件</button>
            </>
        );
    }
}

root.render(<Parent />);
```

<br>

### **<font color='#10c300'>4.3、案例</font>**

```jsx
var container = document.getElementById('app');
var root = ReactDOM.createRoot(container);

class Qq extends React.Component {
  state = {
    nickname: '爷傲奈我何',
    show: 'none',
  };
  edit = () => {
    this.setState({
      show: 'block',
    });
  };
  nclose = () => {
    this.setState({
      show: 'none',
    });
  };
  changeName = (nickname) => {
    this.setState({
      nickname,
    });
  };
  render() {
    let { nickname, show } = this.state;
    return (
      <div className="box">
        <h1>{nickname}</h1>
        <button onClick={this.edit}>编辑</button>
        <Modal
          nkname={nickname}
          show={show}
          nclose={this.nclose}
          changeName={this.changeName}
        />
      </div>
    );
  }
}

class Modal extends React.Component {
  render() {
    let { nkname, show, nclose, changeName } = this.props;
    return (
      <div className="sbox" style={{ display: show }}>
        <h1>{nkname}</h1>
        <button onClick={nclose}>关闭弹窗</button>
        <button onClick={() => changeName('不吃香菜')}>改名称</button>
      </div>
    );
  }
}

root.render(<Qq />);
```

<br>

## **<font color='red'>五、条件渲染</font>**

通常你的组件会需要根据不同的情况显示不同的内容。在 React 中，你可以通过使用 JavaScript 的 `if` 语句、`&&` 和 `? :` 运算符来选择性地渲染 JSX。

### **<font color='#10c300'>5.1、基本写法</font>**

```jsx
var container = document.getElementById("app");
var root = ReactDOM.createRoot(container);
function Welcome(props) { // 这里也可以用解构 {flag}
    if (props.flag) {
        return <h1>欢迎您尊贵的会员</h1>
    } else {
        return <h1>下午好，普通用户</h1>
    }
}
root.render(
    <>
        <Welcome flag={true} />
        <Welcome flag={false} />
    </>
);
```

<br>

### **<font color='#10c300'>5.2、可以返回null</font>**

```jsx
var container = document.getElementById("app");
var root = ReactDOM.createRoot(container);
function Welcome(props) {
    if (props.flag) {
        return <Vip />
    } else {
        return null
    }
}
function Vip() {
    return <h1>我是尊贵的vip</h1>
}
root.render(
    <>
        <Welcome flag={true} />
        <Welcome flag={false} />
    </>
);
```

<br>

### **<font color='#10c300'>5.3、&&运算符</font>**

```jsx
var container = document.getElementById("app");
var root = ReactDOM.createRoot(container);

function Email({msg}) {
    return msg.length > 0 && <h1>你有{ msg.length }条消息待处理</h1>
}

let arr = ["下午吃什么", "晚上吃什么", "明天吃什么"]
root.render(<Email msg={arr}/>);
```

<br>

### **<font color='#10c300'>5.4、三元表达式</font>**

```jsx
var container = document.getElementById("app");
var root = ReactDOM.createRoot(container);
function Welcome({ flag}) {
    return flag ? <Vip/> : <Normal/>
}
function Vip() {
    return <h1>我是尊贵的vip</h1>
}
function Normal() {
    return <h1>我是黄金普通用户</h1>
}

root.render(<Welcome flag={true} />);
```

<br>

## **<font color='red'>六、列表渲染</font>**

```jsx
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
function Week({ courseList }) {
    return <ul>
        {courseList.map((item, index) => (<li key={item.id}>{item.courseName}</li>))}
    </ul>
}
const courseList = [
    {
        id: '1',
        courseName: '第一节课'
    },
    {
        id: '2',
        courseName: '第二节课'
    },
    {
        id: '3',
        courseName: '第三节课'
    },
    {
        id: '4',
        courseName: '第四节课'
    }
]
root.render(<Week courseList={courseList} />);
```

**`为什么需要key？`**

key是用来给列表中的每一项做标记，后续更新只更新有差别的部分，不变的部分就不更新

不要用index当key，key要求是独一无二的字符串，一般由后端返回

```js
// 在原生js中，假如有一个渲染的列表如下：
<li>1</li>
<li>2</li>
<li>3</li>
<li>4</li>
// 当数据发生变化，变成：
<li>1</li>
<li>2</li>
<li>4</li>
<li>3</li>
// 对于js来说不会因为只变了一个就只删除这一个然后创建一个新的，而是整个列表都删除，创建新的全部重新创建，这样列表数据多了就会造成性能问题

// 在react和vue中这种列表如果变化了，不会立马去更新。因为react和vue有一个虚拟dom，每次列表数据更新，就会先去更新虚拟dom（更新很快），然后和真实dom做对比（这种对比就是diff算法）去更新改动的地方。

// key是用来给列表中的每一项做标记，后续更新只更新有差别的部分，不变的部分就不更新
```

**`不要用index当key，key要求是独一无二的字符串`**

![image-20250716010216779](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202507160102927.png)

```js
// 为什么不用index索引去当key呢？
如果用索引当key，那么图一列表以此是012345。如果某天将列表第二个删除了(图2)，那么是不是列表第一个之后的key全部都发生变化了，原来列表内容3的key是2，现在列表内容3key是1了，这时候需求demo和真实dom一对比，会去更新变化的地方即列表内容2 3 4 5 6的都要去做更新，如果又后端返回一个唯一id值，那么就不存在这种问题
```

<br>

## **<font color='red'>七、表单处理</font>**

在react中表单的处理通常和其他元素不一样， 正常情况下我们把html中会发上变化的地方都设置为state，然后通过更改state的更新视图

在 HTML 中，表单元素`（如<input>、 <textarea> 和 <select>）`通常自己维护 state，并根据用户输入进行更新。
而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。

渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

<br>

### **<font color='#10c300'>7.1、基本使用</font>**

```jsx
class Input extends React.Component {
    state={
        value: ''
    }
    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            value: e.target.value
        })
    }
    render() {
        return(
            <>
                <input onChange={this.handleChange} value={this.state.value} />
                <p>{this.state.value}</p>
            </>
        )
    }
}
root.render(<Input />);
```

<br>

### **<font color='#10c300'>7.2、多个表单元素</font>**

```jsx
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
class Input extends React.Component {
    state={
        userValue: '',
        emailValue: ''
    }
    handleChange = (e) => {
        const name = e.target.name === "user" ? 'userValue' : 'emailValue'
        this.setState({
            [name]: e.target.value
        })
        console.log(this.state.userValue);
        console.log(this.state.emailValue);
    }
    render() {
        return(
            <>
                <input onChange={this.handleChange} value={this.state.userValue} name="user"/>
                <br />
                <input onChange={this.handleChange} value={this.state.emailValue} name="email"/>
            </>
        )
    }
}
root.render(<Input />);
```

<br>

### <font color='red' size="">7.3、select、checkbox、radio等特殊元素</font>

#### **<font color='cornflowerblue'>1）select用法</font>**

```jsx
 const container = document.getElementById("app");
 const root = ReactDOM.createRoot(container);
 class Input extends React.Component {
     state = {
         value: "shanghai"
     }
     change = (e) => {
         this.setState({
             value: e.target.value
         })
     }
     render() {
         return <>
             <select value={this.state.value} onChange={this.change}>
                 <option value="beijing">北京</option>
                 <option value="shanghai">上海</option>
                 <option value="shenzhen">深圳</option>
             </select>
         </>
     }
 }
 root.render(<Input />);
```

<br>

#### **<font color='cornflowerblue'>2）checkbox用法</font>**

**`操作他的checked属性`**

```jsx
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
class Input extends React.Component {
    state = {
        isChecked: false
    }
    change = (e) => {
        this.setState({
            isChecked: e.target.checked
        })
    }
    render() {
        return <>
            <input type="checkbox" name="1" value="beijing" checked={this.state.checked}  onChange={this.change}/>
        </>
    }
}
root.render(<Input />);
```

<br>

#### **<font color='cornflowerblue'>3）radio的用法</font>**

**`通过更改value，间接操作checked属性`**

```jsx
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
class Input extends React.Component {
    state = {
        n: "option2"
    }
    change = (e) => {
        this.setState({
            n: e.target.value
        })
    }
    render() {
        return <>
            <input type="radio" name="city" value="option1" checked={this.state.n == "option1"} onChange={this.change} />
            <input type="radio" name="city" value="option2" checked={this.state.n == "option2"} onChange={this.change} />
        </>
    }
}
root.render(<Input />);
```

<br>

## **<font color='red'>八、ref</font>**

> 什么是ref：ref是React提供的用来操纵React组件实例或者DOM元素的接口。
>
> 基本跟vue中的ref用法一样 **`ref拿到的是真实dom `**

简单来说，就是提供了一种方式能让你直接获取到dom元素对象或者组件实例。

**`ref不能用于函数组件上（函数组件没有实例），ref只适用于实例对象上，例如class类`**

### **<font color='#10c300'>8.1、回调形式的ref （老版本推荐）</font>**

#### **<font color='cornflowerblue'>1）在元素中</font>**

```jsx
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
class Dome extends React.Component {
    test = () => {
        console.log(this.ins); // 获取到p标签这个dom
    }

    render() {
        return (
            <>
                <p ref={(dom) => { this.ins = dom }}>你好啊</p>
                <button onClick={this.test}>测试</button>
            </>
        )
    }
}
root.render(<Dome />);
```

<br>

#### **<font color='cornflowerblue'>2）在组件中</font>**

```jsx
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
class Dome extends React.Component {
    test = () => {
        console.log(this.ins);
        console.log(this.ins1.state.msg);
        this.ins1.fn()
    }
    render() {
        return (
            <>
                <p ref={(dom) => { this.ins = dom }}>你好啊</p>
                <button onClick={this.test}>测试</button>
                <Child ref={dom => this.ins1 = dom} />
            </>
        )
    }
}
class Child extends React.Component {
    state= {
        msg: '我是子组件的数据'
    }
    fn = () => {
        console.log(666666666);
        
    }
    render() {
        return <div>我是子组件</div>
    }
}
root.render(<Dome />);
```

<br>

### **<font color='#10c300'>8.2、React.createRef （适用于类组件） </font>**

> 通过在class中使用React.createRef()方法创建一些变量，可以将这些变量绑定到标签的ref中
>
> 那么该变量的current则指向绑定的标签dom

#### **<font color='cornflowerblue'>1）在元素中</font>**

```jsx
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
class Demo extends React.Component {
    myRef = React.createRef()
    fn = () => {
        console.log(this.myRef.current);
    }
    render() {
        return (
            <>
                <p ref={this.myRef}>这是一个组件</p>
                <button onClick={this.fn}>按钮</button>
            </>
        )
    }
}
root.render(<Demo />)
```

<br>

#### **<font color='cornflowerblue'>2）在组件中</font>**

```jsx 
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
class Demo extends React.Component {
    myRef = React.createRef()
    myRef1 = React.createRef()
    fn = () => {
        console.log(this.myRef.current);
        console.log(this.myRef1.current.state.msg);
        this.myRef1.current.childFn()
    }
    render() {
        return (
            <>
                <p ref={this.myRef}>这是一个组件</p>
                <button onClick={this.fn}>按钮</button>
                <Child ref={this.myRef1} />
            </>
        )
    }
}
class Child extends React.Component {
    state = {
        msg: '我是一个子组件数据'
    }
    childFn = () => {
        console.log(6666666);
    }
    render() {
        return <div>我是子组件</div>
    }
}
root.render(<Demo />)
```

<br>

### **<font color='#10c300'>8.3、useRef （适用于函数组件） </font>**

是一个hooks，后面讲

<br>

### **<font color='#10c300'>8.4、综合案例 </font>**

```jsx
const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
class Demo extends React.Component {
    myRef = React.createRef()
    
    state = {
        value: '',
        list: []
    }
    change = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    add = () => {
        if (this.state.value) {
            this.setState({
                list: [...this.state.list, this.state.value],
                value: ''
            })
            this.myRef.current.focus()
        }
    }
    del = (index) => {
        this.state.list.splice(index, 1)
        this.setState({
            list: [...this.state.list]
        })
    }
    render() {
        const { list } = this.state
        return (
            <>
                <input value={this.state.value} onChange={this.change} ref={this.myRef} type="text" />
                <button onClick={this.add}>添加</button>
                <ul>
                    {
                        list.length > 0 && list.map((item, index) => (<li onClick={() => this.del(index)} key={index}>{item}</li>))
                    }
                </ul>
            </>
        )
    }
}
root.render(<Demo />)
```

<br>

## **<font color='red'>九、脚手架搭建项目</font>**

### **<font color='#10c300'>9.1、基于webpack创建项目 </font>**

基于webpack创建是使用create-react-app搭建项目，Create React App 是一个官方支持的创建 React 单页应用程序的方法。

#### **<font color='cornflowerblue'>1）安装</font>**

```js
// 方式一
//全局安装脚手架
npm install -g create-react-app
//利用脚手架创建项目 
create-react-app my-app

// 方式二（推荐）
npx create-react-app my-app
cd my-app
npm start
```

npx 是 npm5.2.0版本新增的一个工具包，定义为npm包的执行者，相比 npm，npx 会自动安装依赖包并执行某个命令。

使用npx创建项目，创建的时候会检查电脑是否有create-react-app，没有就安装create-react-app，有就跳过。

<br>

#### **<font color='#10c300'>2）生成的项目文件解读</font>**

![image-20250720184443319](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202507201844527.png)

- node_modules:项目的核心模块，依赖包

- public：存放静态资源文件
  - .ico:页签的logo
  - index.html:唯一的页面文件，只提供根节点
  - manifest.json:移动端的配置一文件
  - robots.txt:告诉爬虫者，不可爬的页面，没有实质作用只是警告
- .gitignore:声明一些再在git上传的时候需要忽略的文件
- package.json:项目的说明文件，有哪些依赖，依赖了哪个版本
- package-lock.json：项目依赖的安装包的一些版本会做一些限制，进行版本锁定
- Readme.md:作者的一些话
- src
  - App.css:App组件的样式文件
  - App.js 项目的根组件
  - App.test.js：自动化测试文件
  - index.css全局样式文件
  - index.js：项目的入口文件，html只会加载这个js文件(类似vue中main.js)
  - reportWebVitals.js:谷歌浏览器退出的一个浏览器性能优化的库
  - setupTests：针对index.js的单元测试原件

> React.StrictMode的作用
>
> 1.识别一些不安全的生命周期
>
> 2.检测意外的副作用
>
> 3.检测过时的context api

<br>

### **<font color='#10c300'>9.2、基于Vite创建项目 </font>**

**`node版本要大雨18以上，建议用20版本。要不然运行会报错`**

使用 NPM:

```
npm create vite@latest
```

使用 Yarn:

```
yarn create vite
```

使用 PNPM:

```
pnpm create vite
```

![image-20250720184501683](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202507201845867.png)

<br>

### **<font color='#10c300'>9.3、项目的基本使用 </font>**

> 组件的后缀名我们推荐用jsx，表示是一个组件
>
> 普通js后缀名就用.js

默认引入：

> 引入的时候可以不需要加文件后缀，编辑器会自动查找.jsx后缀的文件，如果找不到，会接着查找后缀为.js的文件
>
> 如果直接引入的是文件夹的名字，那么默认去查找该文件夹下的index.jsx文件。

<br>

## **<font color='red'>十、模块化样式</font>**

### **<font color='#10c300'>10.1、xxx.module.css </font>**

**只需要将样式文件名字改  ：名字.module.css即可**

CSS Modules 允许通过自动创建 [filename]\_[classname]\_\_[hash] 格式的唯一 classname 来确定 CSS 的作用域,如下

```jsx
import Child from "./Child";
import style from  "./App.module.css"
function App() {
  return (
    <div >
      <h1 className={style.App}>你好</h1>
      <h2 className={style.title}>哈哈哈哈哈</h2>
      <Child/>
    </div>
  );
}

export default App;
```

<br>

### **<font color='#10c300'>10.2、预处理器（Sass/Less/Stylus） </font>**</font>

```scss
$text-color: blue;
.component {
	color: $text-color;
	font-size: 20px;
}
```

```js
// Component.js
import './Component.scss';

function Component() {
	return <div className="component">Styled Text</div>;
}
```

<br>

### **<font color='#10c300'>10.3、css-in-js库 </font>**

使用JS编写CSS的库，如styled-components、emotion等

```jsx
// 使用styled-components
import styled from 'styled-components';

const StyledDiv = styled.div`
  color: blue;
  font-size: 20px;
`;

function Component() {
  return <StyledDiv>Styled Text</StyledDiv>;
}
```

<br>

## **<font color='red'>十一、组件的生命周期</font>**

### **<font color='#10c300'>11.1、生命周期图谱 </font>**

组件的生命周期函数就是在特定时间节点上会自动运行的函数

**`重点：函数组件没有生命周期`**

![image-20240416135406354](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202507202212214.png)

![image-20240416135418172](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202507202212318.png)

```jsx
import Child from "./Child";
import React from "react";
class App extends React.Component {
    constructor() {
        super();
        console.log("constructor")
    }
    state = {
        msg: "hello",
        info: "hahahaha",
        flag: true
    }
    componentDidUpdate() {
        //组件更新完毕的时候执行
        console.log("componentDidUpdate")
    }
    componentDidMount() {
        //组件挂载完毕的时候执行
        console.log("componentDidMount")
    }

    componentWillUnmount() {
        //组件即将卸载的时候执行
        console.log("componentWillUnmount")
    }
    fn = () => {
        this.setState({
            flag: false
        })
    }
    change = () => {
        this.setState({
            info: "呵呵呵呵"
        })
    }
    render() {
        console.log("render")
        return <div>
            <h1>我是App组件{this.state.msg}</h1>
            <button onClick={this.fn}>按钮</button>
            <button onClick={this.change}>改info</button>
            {
                this.state.flag && <Child />
            }
        </div>
    }
}

export default App;
```

<br>

### **<font color='#10c300'>11.2、shouldComponentUpdate </font>**

shouldComponentUpdate 是一个可以在**`组件更新之前`**触发的生命周期方法，它允许你通过返回一个布尔值来决定一个组件的输出是否受当前状态或属性的改变影响而更新。如果 shouldComponentUpdate 返回 false，那么组件就不会进行更新。

简单来说就是用于更新数据时，如果更新的数据和上一次数据是一样的，理论上应该不需要再次更新组件了，但是实际上确实会更新，使用shouldComponentUpdate 则会避免这种情况，如果shouldComponentUpdate 返回false就说明数据一样，那么组件就不需要更新。

#### **<font color='cornflowerblue'>1）基本用法</font>**

shouldComponentUpdate 接收两个参数：nextProps 和 nextState，分别表示组件即将接收的新属性和新状态。你需要在这个方法中比较当前组件的属性和状态与新的属性和状态，然后返回一个布尔值来决定组件是否需要更新。

```jsx
shouldComponentUpdate(nextProps,nextState){
  if(nextState.msg===this.state.msg){
    return false
  }else{
    return true
  }
}
```

<br>

#### **<font color='cornflowerblue'>2）案例</font>**

```jsx
// app.jsx
import React from "react";
class App extends React.Component {
    state = {
        msg: "hello"
    }
    fn = () => {
        this.setState({
            msg: "world"
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.msg === this.state.msg) {
            return false
        } else {
            return true
        }
    }

    componentDidUpdate() {
        console.log("组件更新了")
    }

    render() {
        console.log("render")
        return <div>
            <h1>我是App组件{this.state.msg}</h1>
            <button onClick={this.fn}>按钮</button> // 第二次点击不会执行了
        </div>
    }
}

export default App

```

`自React 16.3版本起，推荐使用 PureComponent（对于类组件） 或 React.memo (对于函数组件) 来进行浅比较，这样可以减少手动编写 shouldComponentUpdate 的需求。`

<br>

### **<font color='#10c300'>11.3、PureComponent </font>**

React.PureComponent 与 React.Component 很相似，两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

**<font color='orange'>setState存在两个不合理之处:</font>**

1. setState无论是否更新了state，render函数都会重现调用，这是不合理的

2. 如果父组件更新了，无论子组件用没用到父组件的数据也都会重新渲染子组件，这是不合理的


<br>

**<font color='orange'>传统的解决方案：</font>**

通过生命周期函数shouldComponentUpdate(){}判断两次不一致再更新，否则不更新

```jsx
  shouldComponentUpdate(nextProps,nextState){
        if(this.props.someprops===nextProps.someprops){
          return false
        }else{
          return true
        }
  }
// 但是这仅仅是一个属性，如果有多个属性的话，一个一个对比会比较麻烦
```

<br>

**<font color='orange'>因此使用PureComponent：</font>**

直接将React.Component替换成React.PureComponent

```jsx
class Mouse extends React.PureComponent {
  // 与之前写法相同，只不过不用写shouldComponentUpdate了，会自动帮我们判断
}
```

```jsx
// app.jsx
import React from "react";
class App extends React.PureComponent {
    state = {
        msg: "hello"
    }
    fn = () => {
        this.setState({
            msg: "world"
        })
    }

    componentDidUpdate() {
        console.log("组件更新了")
    }

    render() {
        console.log("render")
        return <div>
            <h1>我是App组件{this.state.msg}</h1>
            <button onClick={this.fn}>按钮</button>
        </div>
    }
}

export default App
```

<br>

**<font color='orange'>注意：</font>**

React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。仅在你的 props 和 state 较为简单时，才使用React.PureComponent，或者在深层数据结构发生变化时调用 forceUpdate() 来确保组件被正确地更新。

<br>

## **<font color='red'>十二、context多层级传值</font>**

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

**<font color='orange'>使用步骤</font>**

```jsx
// 1.创建需要传递的数据React.Context()实例：括号里存放默认初始数据
// src\utils\context.js

import React from "react"
const MyContext=React.createContext("");
export default MyContext


// 2.父组件  提供Context数据：
// src\App.jsx

import React from "react";
import Child from "./components/Child";
import MyContext from "./utils/context";

class App extends React.PureComponent {
    state = {
        msg: "父组件数据",
    };

    render() {
        return (
            <div>
                <MyContext.Provider value={this.state.msg}>
                    <h1>我是父组件</h1>
                    <Child msg={this.state.msg}/>
                </MyContext.Provider>
            </div>
        );
    }
}
export default App;


// 3.后代组件获取Context数据
// src\components\GrandChild.jsx

// 方式一：通过consumer
import React from 'react'
import MyContext from '../utils/context'

class GrandChild extends React.PureComponent {
    render() {
        return(
            <MyContext.Consumer>
                {
                    (value) => (
                        <>
                            <h1>我是孙子组件 </h1>
                            <p>{value}</p>
                        </>
                    )
                }
            </MyContext.Consumer>
        )
    }
}

export default GrandChild

// 方式二：通过Class.contextType (类组件使用)
可以通过Class.contextType直接将Context对象挂载到class的contextType属性，然后就可以使用this.context对context对象进行使用
contextType属于类的属性，不属于某个实例，所以只能在外部添加或者使用static将其添加给类属性

class GrandChild extends React.PureComponent {
    // static contextType=MyContext; // 这里写在类里面并没有添加到实例上去，因为添加了static
    render() {
        return(
            <>
                <h1>我是孙子组件 </h1>
                <p>{this.context}</p>
            </>    
        )
    }
}

GrandChild.contextType = MyContext; // 添加在类属性上面

export default GrandChild
```

<br>

## **<font color='red'>十三、高阶组件 (HOC)</font>**

高阶组件（Higher-Order Component，简称HOC）是React中用于复用组件逻辑的一种高级技术。本质上，高阶组件是一个函数，它接收一个组件并返回一个新的组件。它主要用于逻辑的共享和重用，而不是直接渲染UI。这种模式类似于JavaScript中的高阶函数，那些以函数为参数或返回一个函数的函数。

- HOC 应当是纯函数，无副作用。
- 不要在 HOC 内部修改原始组件，而是返回一个新组件
- 高阶组件的命名一般**以 “with” 开头**，表示它是为组件提供附加功能的。

### **<font color='#10c300'>13.1、基本使用 </font>**

```jsx
import React from "react";

class Demo1 extends React.PureComponent {
    render() {
        return <div>我是demo1 {this.props.a}</div>
    }
}

class Demo2 extends React.PureComponent {
    render() {
        return <div>我是demo2</div>
    }
}

function withLog(WrapComponent) { // 高阶函数
    return class extends React.Component {
        componentDidMount() {
            console.log("挂载了")
        }
        render() {
            return <WrapComponent {...this.props} /> // 传值必须在这里解构props，要不然Demo1组件拿不到传的参数a和c
        }
    }
}

// 使用高阶函数
const MyCom = withLog(Demo1) 
const MyCom1 = withLog(Demo2)


class App extends React.PureComponent {
    state = {
        msg: "父组件数据",
    };

    render() {
        return (
            <>
                <MyCom a={this.state.msg} c="1231231" />
                <MyCom1 />
            </>
        );
    }
}

export default App;
```

<br>

### **<font color='#10c300'>13.2、高阶组件实战</font>**

请求地址

dogApi：https://dog.ceo/api/breeds/image/random

catApi：https://api.thecatapi.com/v1/images/search

```jsx
import axios from "axios";
import React from "react";

class MyCat extends React.Component {
    render() {
        return(
            <>
                <img src={this.props.url} width="200" alt="" />
                <div>这是一只猫</div>
            </>
        )
    }
}

class MyDog extends React.Component {
    render() {
        return(
            <>
                <img src={this.props.url} width="200" alt="" />
                <div>这是一只狗</div>
            </>
        )
    }
}

function withAnimal(WrapComponent, url, type) {
    return class extends React.Component {
        state={
            imgUrl: ''
        }
        componentDidMount() {
            axios.get(url).then((res) => {
                this.setState({
                    imgUrl: type ? res.data.message : res.data[0].url
                })
            })
        }
        render() {
            return <WrapComponent url={this.state.imgUrl}/>
        }
    }
}

const Cat = withAnimal(MyCat, 'https://api.thecatapi.com/v1/images/search', 0)
const Dog = withAnimal(MyDog, 'https://dog.ceo/api/breeds/image/random', 1)


class App extends React.Component {

    render() {
        console.log('渲染');
        
        return (
            <>
                <Cat></Cat>
                <Dog></Dog>
            </>
        );
    }
}


export default App;
```

<br>

## **<font color='red'>十四、跨域问题</font>**

### **<font color='#10c300'>14.1、Create React App (CRA)脚手架 </font>**

基于webpack创建是使用create-react-app搭建项目

```js
// src/setupProxy.js
//  你无需在任何位置导入此文件。 它在启动开发服务器时会自动注册。文件名不能更改
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) { 
    app.use(
        createProxyMiddleware("/api", {
            target: "https://api.jisuapi.com/recipe",//跨域地址
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        })
    );
    app.use(
        createProxyMiddleware("/api1", {
            target: "https://api.binstd.com",//跨域地址
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        })
    );
};
```

```jsx
import { PureComponent } from "react";
import axios from 'axios'

class App extends PureComponent {
    componentDidMount() {
        axios.get('api/search', {
            params: {
                keyword: '白菜',
                num: 10,
                start: 0,
                appkey: 'e7652690d5fdbcc4'
            }
        }).then((res) => {
            console.log(res);
        })

    }
    render() {
        return <div>我是组件</div>
    }
}
export default App;
```

<br>

### **<font color='#10c300'>14.2、vite脚手架 </font>**

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // 配置单个代理
            '/api': {
                target: 'https://api.jisuapi.com/recipe', // 后端服务地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，去除前缀
            },

            // 配置多个代理（可选）
            '/socket': {
                target: 'ws://localhost:8080', // WebSocket 服务
                ws: true,
            },
        },
    },
})

```

```js
import { PureComponent } from "react";
import axios from 'axios'

class App extends PureComponent {
    componentDidMount() {
        axios.get('api/search', {
            params: {
                keyword: '白菜',
                num: 10,
                start: 0,
                appkey: 'e7652690d5fdbcc4'
            }
        }).then((res) => {
            console.log(res);
        })

    }
    render() {
        return <div>我是组件</div>
    }
}
export default App;
```

<br>

## **<font color='red'>十五、Hooks</font>**

> *Hook* 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
>
> Hooks 基于函数组件开始设计，所以**Hooks 只支持函数组件**！！！

### **<font color='#10c300'>15.1、useState - 状态管理⭐⭐⭐</font>**

`useState` 是一个 React Hook，用于在函数组件中声明和管理**状态（state）**（ 一定要在**`组件顶层`**调用）

<br>以下是一个App组件。点击 “add” 按钮应该显示将 `index` 更改为 `1`，再次点击又更改为 `2`，以此类推。但这个组件现在**不起作用**（你可以试一试！）：

```js
export default function App() {
  let index = 0;

  const handleClick = () => {
    index = index + 1;
  }

  return (
    <>
      <button onClick={handleClick}>add</button>
      <h3>{index}</h3>
    </>
  );
}
```

`handleClick()` 事件处理函数正在更新局部变量 `index`。但存在两个原因使得变化不可见：

1. **局部变量无法在多次渲染中持久保存。** 当 React 再次渲染这个组件时，它会从头开始渲染——不会考虑之前对局部变量的任何更改。
2. **更改局部变量不会触发渲染。** React 没有意识到它需要使用新数据再次渲染组件。

要使用新数据更新组件，需要做两件事：

1. **保留** 渲染之间的数据。
2. **触发** React 使用新数据渲染组件（重新渲染）。

[`useState`](https://zh-hans.react.dev/reference/react/useState) Hook 提供了这两个功能：

1. **State 变量** 用于保存渲染间的数据。
2. **State setter 函数** 更新变量并触发 React 再次渲染组件。

<br>

#### **<font color='cornflowerblue'>1）语法</font>**

```jsx
const [state, setState] = useState(initialState);
```

- initialState：定义的初始值，可以是任意数据，像数字，字符串或者数组和对象。
- useState ()方法的返回值为由两个值组成的数组
  1. `state`：当前状态值：在首次渲染时，它将与你传递的 `initialState` 相匹配。
  2. `setState`：更新状态的函数：它可以让你将 state 更新为不同的值并触发重新渲染。

<br>

#### **<font color='cornflowerblue'>2）useState更新是异步的</font>**

useState 返回的更新对象的方法是**异步的**，要在下次重绘才能获取新值，不要试图在更改状态之后立即获取状态

```jsx
import { useState } from 'react'
function App() {
    let [num, setNum] = useState(0)

    let fn = () => {
        setNum(300)
        console.log(num); // 0 是0说明setNum是异步的
    }
    return (
        <>
            <div>我是app {num}</div>
            <button onClick={fn}>改num</button>
        </>
    )
}

export default App
```

连续修改state会合并，只执行最后一次

```jsx
import { useState } from 'react'
function App() {
    let [num, setNum] = useState(0)

    let fn = () => {
        setNum(300)
        setNum(400)
        setNum(32)
        setNum(322)
        setNum(1)  // 只会执行这一次
    }
    return (
        <>
            <div>我是app {num}</div> 
            <button onClick={fn}>改num</button>
        </>
    )
}

export default App
```

<br>

#### **<font color='cornflowerblue'>3）更新状态的两种方式</font>**

- **直接赋值**

  ```js
  setCount(5);
  ```

  将状态直接更新为新值。

- **函数式更新（推荐）**

  ```js
  setCount(prevCount => prevCount + 1);
  ```

  这种方式会使用上一次的状态值进行计算，尤其在多次更新时更安全。
  
  ```js
  import {useState} from "react";
  function App(){
    const [num,setNum]=useState(0)
    const [str,setStr]=useState("hello")
  
    function fn(){
      setTimeout(()=>{
        setNum(num+1)  // 连续点击3次 最终还是1 说明这是会合并处理的
      },1000)
    }
    function fn2(){
      setTimeout(()=>{
        setNum((prev)=>{
          return prev+1  // 连续点击3次 最终是4 说明不会合并处理
        })
      },1000)
    }
    return <div>我是app {num}
             <h1>{str}</h1>
             <button onClick={fn}>普通+</button>
             <button onClick={fn2}>函数+</button>
          </div>
  }
  
  
  export default App;
  ```

<br>

#### **<font color='cornflowerblue'>4）各数据类型更新方式</font>**

记住，永远不要直接对对象和数组进行赋值，要始终确保你的set函数里是一份全新的数据，这样React才能够检测到状态变化，并按预期进行更新和重新渲染操作。

```jsx
import { useState } from 'react';

function Form() {
  // 基础类型
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  
    
  // 对象类型
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  
  const updateUsername = (e) => { // 更新对象的某个字段
    setForm(prev => ({
      ...prev,
      username: e.target.value
    }));
  };
  
    
  // 数组类型
  const [items, setItems] = useState([]);
  
  const addItem = (item) => { // 添加项目
    setItems(prev => [...prev, item]);
  };
  
  const removeItem = (id) => { // 删除项目
    setItems(prev => prev.filter(item => item.id !== id));
  };
}
```

#### **<font color='cornflowerblue'>5）`useState` 的惰性初始化（Lazy Initialization）</font>**

这个特性早就有，但很多人忽略了。React 19 中依然支持：

```jsx
jsxconst [state, setState] = useState(() => {
  console.log('只在初次渲染时执行');
  return expensiveComputation();
});
```

如果初始值需要复杂计算，传入一个函数可以避免每次渲染都执行。

<br>

### **<font color='#10c300'>15.2、useEffect-副作用处理</font>**

#### **<font color='cornflowerblue'>1）基本语法</font>**

```js
// useEffect有两个参数，第一个参数是一个函数，第二个参数是一个数组
useEffect(()=>{
    console.log('组件挂载或更新了');
    // 组件卸载时执行（可选项）
    return ()=>{
        console.log('组件卸载了');
    }
}, [/*依赖项*/]) // 参数2(可选) 1:无该参数，每次渲染后都执行  2:空数组,仅在挂载时执行一次 3: 依赖变化时执行


// 例子：
// 每次渲染后都执行（数据更新也会导致页面重新渲染）
useEffect(() => {
  console.log('每次渲染');
});

// 仅在挂载时执行一次
useEffect(() => {
  console.log('组件挂载');
}, []);

// 依赖变化时执行
useEffect(() => {
  console.log('count 或 name 变化');
}, [count, name]);
```

#### **<font color='cornflowerblue'>2）案例</font>**

```js
import { useState, useEffect } from 'react';

function DataFetcher({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    // 副作用代码
        async function fetchUser() {
            setLoading(true);
            const response = await fetch(`/api/users/${userId}`);
            const data = await response.json();
            setUser(data);
            setLoading(false);
        }

        fetchUser();

        // 清理函数（组件卸载或依赖变化时执行）
        return () => {
            console.log('清理操作');
        };
    }, [userId]); // 依赖数组：userId 变化时重新执行

    if (loading) return <p>加载中...</p>;
    return <div>{user?.name}</div>;
}

export default DataFetcher;
```

<br>

### **<font color='#10c300'>15.3、useContext - 跨组件共享状态</font>**

> 如果你在接触 Hook 前已经对 context API 比较熟悉，那应该可以理解，useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>。
>
> useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context。

```jsx
// context.js
import React from "react";
const MyContext = React.createContext();
export const MyProvider = MyContext.Provider;
```

```jsx
// App.jsx
import { useState } from "react";
import Child from "./Child";
import { MyProvider } from "./context";

function App() {
  const [data, setData] = useState("父组件数据");
  return (
    <>
      <MyProvider value={data}>
        <p>我是父组件</p>
        <Child />
      </MyProvider>
    </>
  );
}

export default App;
```

```jsx
// Child.jsx
import GrandChild from "./GrandChild"

function Child() {
    return (
        <>
            <p>我是子组件</p>
            <GrandChild />
        </>
    )
}

export default Child
```

```jsx
// GrandChild.jsx

import {useContext} from 'react'
import { MyProvider } from "./context";

function GrandChild() {
    const data = useContext(MyProvider) // 这是app.jsx中传来的数据
    return (
        <>
            <p>我是孙组件后面是<span style={{color: 'red'}}>{data}</span></p>
        </>
    )
}

export default GrandChild
```

其他例子

```jsx
import { createContext, useContext, useState } from 'react';

// 1. 创建 Context
const ThemeContext = createContext();

// 2. 创建 Provider 组件
function ThemeProvider({ children }) {
    console.log(children);

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. 在组件中使用
function ThemedButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            style={{
                background: theme === 'dark' ? '#333' : '#fff',
                color: theme === 'dark' ? '#fff' : '#333'
            }}
        >
            当前主题: {theme}
        </button>
    );
}

// 4. 在 App 中使用 Provider 包裹
function App() {
    return (
        <ThemeProvider>
            <ThemedButton />
        </ThemeProvider>
    );
}

export default App;
```

<br>

### **<font color='#10c300'>15.4、React.memo (相对重要)</font>**

> `memo` 是一个 **高阶组件**，用于**优化函数组件的重新渲染**。它会对组件的 **props** 做浅层比较，如果 props 没有变化，就跳过重新渲染，直接复用上一次的渲染结果。

函数组件本身没有识别prop的能力，每次父组件的更新相当于是给子组件传递了一个全新的prop

```js
// App.jsx
import { useState } from "react";
import Child from "./Child";


function App() {
  const [data, setData] = useState("父组件数据");
  const [b] = useState(100)
  console.log('父组件渲染了');
  
  return (
    <>
      <p onClick={() => setData('新数据')}>我是App：{data}</p>
      <Child b={b}/>
    </>
  );
}

export default App;
```

```js
// Child.jsx
import { memo } from 'react';

function Child(props) {
    console.log('子组件渲染了');
    
    return (
        <>
            <p>我是子组件: {props.b}</p>
        </>
    )
}

// 使用 React.memo 包装组件，只有当 props 发生变化时才重新渲染
export default memo(Child);
```

<br>

#### **经典的问题**

函数作为 `props` 的“引用不稳定”问题

```js
// 子组件
const Child = React.memo((props) => {
  console.log('Child render');
  return <div>{props.count}</div>;
});


// 父组件
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <div onClick={handleClick}>
      <Child count={count} onClick={handleClick} />
    </div>
  );
}
export default Parent;
```

你期望的是：只要 `count` 没变，`Child` 不应该重新渲染。但实际上，**每次父组件重渲染，`Child` 都会重新渲染**。

**原因：函数的引用每次都变**

在 React 中，函数也是一种对象，而对象/函数的「引用地址」每次都会变。当父组件重新运行时 都会创建一个 **新函数对象**，和之前的不是同一个引用。

React.memo 的默认比较方式是浅比较（shallow compare）

```js
oldProps.onClick === newProps.onClick
```

而因为每次重新渲染时，这个函数都是新建的，所以结果是 `false`，导致 `Child` 无论 props 内容是否逻辑相同，都会被认为变动了。

解决方案：通过 `useCallback` 来让函数在依赖不变的情况下，保持同一个引用

<br>

#### **特点**

- **作用域：组件级别**（在组件外层包一层）
- 比较的是**props**的浅层变化，类似 `PureComponent` 针对函数组件的实现
- 默认用 `Object.is` 进行浅比较
- 适用于：**父组件频繁渲染，但子组件的 props 未变化的场景**
- 可以配合第二个参数自定义比较规则：

#### **工作原理**

- 当父组件重新渲染时，`memo` 会对比新旧 props
- 如果 props 没有变化，组件不会重新渲染
- 默认使用浅比较（shallow comparison）

#### **使用场景**

1. **纯展示组件** - 只依赖 props 渲染
2. **渲染开销大的组件** - 复杂计算或大量 DOM
3. **频繁渲染的父组件** - 子组件 props 不常变化

<br>

### **<font color='#10c300'>15.5、useMemo- 缓存计算结果</font>**

**语法：**

```jsx
useMemo(()=>{return 值},[依赖项])
```

> `useMemo` 是一个React Hook，用来在 **组件内部** 缓存某个**计算结果**，避免每次渲染都重复进行开销较大的计算，或者避免引用类型在每次渲染中变化导致子组件不必要的更新。

> `useMemo`的理念是同步的,useMemo不能进行一些额外的副操作，比如网络请求等。

#### **<font color='cornflowerblue'>1）用了缓存数据(计算结果)</font>**

如果没有优化

```js
import { useState } from "react";

function App() {
  const [price, setPrice] = useState(100)
  const [count] = useState(1)
  const [color, setColor] = useState('red')
  
  const totalPrice = () => {
    console.log('函数运行了'); // 修改颜色的时候函数也会重新执行，这是不合理的
    return price * count
  }
  
    return (
        <>
            <p>总价：{totalPrice()}</p>
            <p>{color}</p>
            <button onClick={() => setColor('blue')}>修改颜色</button>
            <button onClick={() => setPrice(price + 100)}>修改价格</button>
        </>
    )
}

export default App
```

使用了useMemo优化

```js
import { useState, useMemo } from "react";

function App() {
  const [price, setPrice] = useState(100)
  const [count] = useState(1)
  const [color, setColor] = useState('red')

  const totalPrice = useMemo(() => { // 修改颜色的时候函数不会执行了
    console.log('函数运行了'); 
    return price * count
  },[count, price])
  
    return (  
        <>
            <p>总价：{totalPrice}</p>
            <p>{color}</p>
            <button onClick={() => setColor('blue')}>修改颜色</button>
            <button onClick={() => setPrice(price + 100)}>修改价格</button>
        </>
    )
}

export default App
```

<br>

#### **<font color='cornflowerblue'>2）用来缓存组件</font>**

```js
import { useState, useMemo } from "react";
import Child from "./Child";

function App() {
  const [price, setPrice] = useState(100)
  const [count] = useState(1)
  const [color, setColor] = useState('red')

  const memoizedChild = useMemo(() => { // 缓存组件
    return <Child count={count} price={price} />
  }, [count, price])

  
    return (  
        <>
          <p>{color}</p>
          <button onClick={() => setColor('blue')}>修改颜色</button>
          <button onClick={() => setPrice(price + 100)}>修改价格</button>
          {/* 使用组件 */}
          {memoizedChild}
        </>
    )
}

export default App
```

> **React.memo和useMemo的区别**
>
> 想让组件只在`props`变化时重新渲染，用`React.memo`
>
> 想让组件只在依赖项变化时重新渲染，用`useMemo`

> React.memo是用来缓存整个组件的
>
> useMemo用来缓存数据或组件的

**特点**

- **作用域：组件内部**
- 缓存的是**值**（任何类型：对象、数组、计算结果等）
- 依赖项（第二个参数数组）不变化时，`useMemo` 返回的引用不会变
- 常用来：
  1. 避免重复的重计算（性能优化）
  2. 缓存对象/数组的引用，避免不必要的渲染（配合 `memo` 或 `useEffect`）
- 如果依赖项变化，就重新计算

<br>

### **<font color='#10c300'>15.6、useCallback  - 缓存函数引用</font>**

> `useCallback` 是一个允许你在多次渲染中缓存函数的Hook，避免组件在每次渲染时都**创建新的函数实例**。当一个组件传递回调给子组件，尤其是在子组件进行了性能优化（例如使用 `React.memo`）时，`useCallback` 非常有用。
>
> 当你把 `useCallback` 应用于函数时，你需要定义一个“依赖项数组”。只有当数组中的依赖项改变时，才会重新创建函数。如果依赖项保持不变，即使父组件重新渲染，回调函数的引用也会保持一致。

useCallback需要配合React.memo使用，因为如果自己自身不缓存，就算把函数缓存了，组件还是会重新渲染

**语法**

```jsx
const memoizedCallback = useCallback(() => {
    doSomething(a, b);
}, [a, b]); // 依赖为空，函数引用永远不变
```

> useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

> useMemo主要是用来缓存值，而useCallback主要用来缓存函数

```JSX
import React,{useCallback, useState} from "react";
import Child from "./Child";

const MyChild=React.memo(Child)


function App(){
  let [count,setCount]=useState(0)
  let [num,setNum]=useState(0)
  let fn=()=>{
    console.log("我是fn")
    return 123
  }
 let myFn=useCallback(fn,[num])
  return <div>
      <h1>我是app</h1>
      <MyChild fn={myFn}/>
      <button onClick={()=>setCount(count+1)}>改变{count}</button>
      <button onClick={()=>setNum(100)}>改num{num}</button>
  </div>
}

export default App;
```



<br>

### **<font color='#10c300'>15.7、useReducer-复杂状态管理</font>**

> useReducer 是 React 的一个钩子（hook），它可以用于处理更复杂的组件状态逻辑，特别是当下一个状态依赖于之前的状态时。它也是一个useState的替代方案，特别适合于状态逻辑复杂，涉及多个子值，或者下一个状态依赖于之前的状态的情景。
>
> useReducer 接受两个参数：一个reducer函数和初始状态（initial state）。reducer 函数接收当前状态和一个行为对象（action object），然后返回一个新的状态。



#### 基本语法

```js
useReducer(reducer, initialState); 不应该有4个参数么
```

- **`state`**：当前状态
- **`dispatch`**：触发状态更新的函数
- **`reducer`**：一个函数，负责“接收旧状态 + 动作（action）”，返回新状态
- **`initialState`**：初始状态
- **`init（可选）`**：*惰性初始化函数*，用于在初始渲染时对 `initialState` 进行加工或计算，返回真正的初始状态，只会在初始化执行一次

<br>

#### 简单示例

```jsx
import React, { useReducer, useState } from "react";

function myReducer(state, action) {
    if (action === "add") {
        return state + 1;
    } else if (action === "minus") {
        return state - 1;
    } else {
        return 0;
    }
}

function App(){
 const [state,dispatch]=useReducer(myReducer,0)
  return <div>
        <h1>我是app</h1>
        <button onClick={()=>dispatch("add")}>+</button>
        <h1>{state}</h1>
        <button onClick={()=>dispatch("minus")}>-</button>
  </div>
}

export default App;
```



第三个参数：

```jsx
import { useReducer } from "react";

function myReducer(state, action) {
    if (action === "add") {
        return state + 1;
    } else if (action === "minus") {
        return state - 1;
    } else {
        return 0;
    }
}

function init(initialCount) { // 0 这里就是传入的init值
    const saved = localStorage.getItem("count");
    return saved ? Number(saved) : initialCount
}

function App() {
    localStorage.setItem("count", 10);
    const [state, dispatch] = useReducer(myReducer, 0, init); // 0会作为init函数中的参数传入
    return (
        <div>
            <h1>我是app</h1>
            <button onClick={() => dispatch("add")}>+</button>
            <h1>{state}</h1>
            <button onClick={() => dispatch("minus")}>-</button>
        </div>
    );
}

export default App;

```

<br>

#### 简单示例

```js
import { useReducer, useState } from 'react';

// 定义 reducer 函数
function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: Date.now(), text: action.text, done: false }];
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'DELETE':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}

function TodoApp() {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [input, setInput] = useState('');

    const handleAdd = () => {
        console.log(todos);

        if (input.trim()) {
            dispatch({ type: 'ADD', text: input });
            setInput('');
        }
    };

    return (
        <div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={handleAdd}>添加</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            onClick={() => dispatch({ type: 'TOGGLE', id: todo.id })}
                            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>
                            删除
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TodoApp;

```

<br>

### **<font color='#10c300'>15.8、useRef  - 引用 DOM 和保存可变值</font>**

1. **访问 DOM 元素**（比如手动操作 `<input>` 焦点、滚动等）
2. **保存任意变量值**（这个值在组件的整个生命周期内保持不变，不会因重新渲染而丢失）

**语法：**

```javascript
const refContainer = useRef(initialValue);
```

- `initialValue` 是初始值
- `refContainer.current` 是存放值的地方
- 改变 `refContainer.current` **不会触发组件重新渲染**



#### **<font color='cornflowerblue'>1）操作 DOM 元素</font>**


当需要直接访问某个 DOM 节点时，可以用 useRef 获取它的引用：

**示例：聚焦输入框**

```jsx
import React, { useRef } from 'react';

function InputFocus() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    // 访问 DOM 元素，并调用 focus 方法
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="输入点什么..." />
      <button onClick={handleFocus}>聚焦输入框</button>
    </div>
  );
}

export default InputFocus;

```

**说明：**

- `ref={inputRef}` 将 DOM 节点绑定到 `inputRef.current`
- 点击按钮时执行 `inputRef.current.focus()` 来让输入框获得焦点

<br>

#### **<font color='cornflowerblue'>2）用来存储可变值</font>**

`useRef` 可以用来存储任意可变值，而且即使组件重新渲染，这个值仍然保留。

**示例：记录渲染次数**

```jsx
import { useState, useRef, useEffect } from 'react';

function RenderCount() {
    const [count, setCount] = useState(0);
    const renderTimes = useRef(0);

    useEffect(() => {
        renderTimes.current += 1;  // 每次渲染 +1
    });
    console.log('组件渲染');

    return (
        <div>
            <p>按钮点击次数：{count}</p>
            <p>组件渲染次数：{renderTimes.current}</p>
{/* 这里点击调用了useState，导致页面重新渲染，但是useRef一直处于叠加状态，没有初始到0 说明具有持久性 */}
            <button onClick={() => setCount(count + 1)}>点击</button>
        </div>
    );
}

export default RenderCount;

```

**说明：**

- `renderTimes.current` 是一个持久化引用，组件每次渲染都会累加，但不会引起额外的渲染
- 对 `useRef` 变量的修改不会触发 UI 更新

<br>

### **<font color='#10c300'>15.9、useId</font>**

`useId` 是一个 React 内置 Hook，用来生成一个稳定且唯一的 ID 字符串，通常用于：

- **无障碍（a11y）场景**：让 `label` 和表单控件配对使用；
- **服务端渲染（SSR）**：防止客户端与服务器渲染的 ID 不一致；
- **生成稳定唯一 key/id**（每次渲染保持不变）。

------

#### 1）基本语法

```js
const id = useId();
```

- 返回一个在当前组件作用域内 **唯一且稳定** 的字符串，例如：`"r1:0"`。
- 每次渲染都保证相同组件中的 id 一致。
- 不会在不同组件之间重复。

------

#### 2）示例：关联 `<label>` 与 `<input>`

```jsx
jsximport React, { useId } from 'react';

function NameField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>姓名：</label>
      <input id={id} type="text" placeholder="请输入姓名" />
    </div>
  );
}

export default NameField;
```

✅ 在这里：

- `useId` 生成一个唯一 id；
- `label` 的 `htmlFor` 与 `input` 的 `id` 一致；
- 当多个 `NameField` 组件同时存在时，每个组件生成的 id 不会冲突。

------

#### 3）组合前缀使用（推荐）

为了更明确区分不同控件，可以加上自定义前缀：

```jsx
jsxconst id = useId();

<input id={`email-${id}`} />
<label htmlFor={`email-${id}`}>邮箱</label>
```

结果类比：`id="email-r1:0"`, `email-r1:1` 等。

------

#### 4）与手动生成 id 的区别

| 特性               | 手动维护 id      | `useId`      |
| ------------------ | ---------------- | ------------ |
| SSR 一致性         | ❌ 可能不一致     | ✅ 一致       |
| 唯一性             | 需手动管理       | 自动唯一     |
| 稳定性（重新渲染） | ⚠️ 需注意不要变动 | ✅ 稳定不变   |
| 使用方便性         | 手动逻辑繁琐     | 一行代码生成 |

------

#### 5）注意事项

1. `useId` **不适合当作列表 key 的唯一标识**，因为它只在组件作用域独立唯一，不是数据层唯一。
2. 每次调用 `useId` 都会生成一个不同的子 ID，React 内部有机制确保组合时不冲突。
3. 只可在 **组件初始化阶段调用一次**，即让 `id` 在整个组件生命周期内稳定。

<br>

### **<font color='#10c300'>15.10、useDeferredValue - 延迟更新值</font>**

当你更新某个状态时，React 不一定立刻同步渲染使用这个值的部分，而是会**优先渲染更紧急的更新（交互、输入）**，稍后再更新那些耗时的渲染部分。

✅ 简单理解：让页面中不太重要的部分“晚一点更新”，以保证用户操作更流畅。

<hr>

#### 1）基本语法

```js
const deferredValue = useDeferredValue(value);
```

- `value`：原始的值（可能变化频繁）
- `deferredValue`：React 返回的延迟更新的值
- 当 `value` 改变时，React **不会立即**让 `deferredValue` 同步，而是“稍后”更新它（基于调度优先级）
- 如果更新非常快，比如频繁输入，`deferredValue` 会滞后一点跟上

#### 2）常见场景：搜索过滤（大列表）

假设我们有一个输入框用于搜索大量数据，输入过程中你不希望每个字母都立即导致昂贵的渲染：

```js
import React, { useState, useDeferredValue, useMemo } from 'react';

function SlowList({ input }) {
  // 模拟大数据过滤（耗时） 要配合useMemo使用，要不然子组件每次渲染，也会导致输入卡顿
  const list = useMemo(() => {
    const items = [];
    for (let i = 0; i < 10000; i++) {
      items.push(<div key={i}>{input} - 项 {i}</div>);
    }
    return items;
  }, [input]);

  return <div>{list}</div>;
}

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query); // 👈 延迟使用 query

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="输入搜索关键词..."
      />
      {/* 使用延迟的状态值渲染大列表 */}
      <SlowList input={deferredQuery} />
    </div>
  );
}

export default SearchPage;
```

**🔍 效果：**

- 输入框响应非常顺畅；
- 列表渲染稍微滞后一点更新（不会阻塞输入）；
- React 自动安排较低优先级的渲染任务。

#### 3）`useDeferredValue` 的本质

它利用了 **React 的并发特性（Concurrent Rendering）**
让某些更新以较低优先级进行：

- 用户输入 → 高优先级；
- 列表更新 → 低优先级；
- React 内部可在合适时机处理低优先级更新。

所以它非常适合：

- 输入搜索时展示结果；
- 大量数据过滤；
- 复杂渲染场景中保持 UI 互动流畅。

#### 4）注意事项

| 注意点                          | 说明                               |
| ------------------------------- | ---------------------------------- |
| 不会跳过更新                    | 只是延迟执行，最终仍会同步到最新值 |
| 不建议用于关键 UI 状态          | 因为它可能暂时落后于真实值         |
| 需要 React 18+                  | 属于并发系统的功能                 |
| 可搭配 `useTransition` 一起使用 | 共同控制更新优先级更加灵活         |

#### 5） 总结

| 属性       | 说明                                       |
| ---------- | ------------------------------------------ |
| Hook 名    | `useDeferredValue(value)`                  |
| React 版本 | 18+                                        |
| 主要作用   | 延迟低优先级渲染以保持交互流畅             |
| 常见场景   | 搜索、大列表、性能优化                     |
| 特点       | 返回一个“稍后更新”的值；不影响高优先级响应 |

<br>

### **<font color='#10c300'>15.11、useTransition</font>**

> useTransition 是一个帮助你在不阻塞 UI 的情况下更新状态的 React Hook。
>
> 这个 Hook 允许你在应用程序中告诉 React 哪些更新是紧急的，哪些可以稍后进行，从而改善应用程序的响应性。

> `useTransition` 则用于标记某段代码或者组件状态更新的优先级。它给你提供了一个`startTransition`的函数和一个表示状态是否处于过渡中的`isPending`状态
>
> isPending: true代表还没完成  false代表完成了

- **`useDeferredValue`** 主要用于延迟单个值的更新，适用于值的变化直接影响到 UI 渲染但又不是立即必要的更新。
- **`useTransition`** 用于告诉 React 哪些更新是低优先级的，并可使用 `isPending` 状态反馈更新是否处于等待状态，适用于控制大块区域或复杂状态的更新行为，允许你在触发更新时提供更自然的用户体验。

案例

```jsx
import {  useState,useTransition } from 'react';
import SlowList from './SlowList.js';

export default function App() {
  const [text, setText] = useState('');
  const [isPending,startTransition]=useTransition()
  const [input,setInput]=useState("") 
    function fn(e){
        setText(e.target.value)

        startTransition(()=>{
            setInput(e.target.value) //这件事晚点执行 。优先级更低一些
        })
    }
    
  return (
    <>
      <input value={text} onChange={fn} />
      {isPending?<span>loading...</span>:""}
      <SlowList text={input} />
    </>
  );
}
```

#### 与 `useDeferredValue` 的比较

| 特性     | `useDeferredValue` | `useTransition`          |
| -------- | ------------------ | ------------------------ |
| 使用场景 | 延迟部分渲染       | 延迟整个状态更新         |
| API 形式 | 返回延迟值         | 返回状态和启动函数       |
| 控制粒度 | 自动、简单         | 手动启动控制             |
| 常用于   | 输入过滤等局部延迟 | 路由切换、大范围渲染延迟 |

<br>

### **<font color='#10c300'>15.12、useImperativeHandle (相对重要)</font>**

> `useImperativeHandle` 是 React Hooks 中提供的一个高级钩子（hook），它结合 `forwardRef` 使用，主要用于在使用 React 函数组件时，自定义父组件通过 ref 访问子组件中的方法或属性。

> 正常情况下，函数组件不支持 ref 属性，因为它们没有实例。但有时候，你可能需要在父组件中直接访问子组件的某些方法。这时，`useImperativeHandle` 就派上用场了。

**语法：**

```jsx
useImperativeHandle(ref, createHandle, [deps])
```

- `ref`：来自父组件通过 `forwardRef` 传递给子组件的 ref。
- `createHandle`：一个函数，返回一个对象，这个对象包含你想让父组件通过 ref 能访问到的属性或方法。
- `[deps]`：依赖数组，只有当数组中的依赖项改变时，才会重新定义 ref 的内容。



#### **<font color='cornflowerblue'>1）关于forwardRef</font>**

> `forwardRef` 是 React 的一个高阶组件（HOC），用于转发引用（refs）

> forwardRef 允许组件使用 ref 将 DOM 节点暴露给父组件。



**语法：**

```jsx
forwardRef(render)
```

```jsx
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  // ...
});
```

- `render`：组件的渲染函数。React 会调用该函数并传入父组件传递的 props 和 `ref`。返回的 JSX 将作为组件的输出。

==App.js==

```jsx
import { useRef } from "react"
import Child from "./Child"
function App() {
   const a=useRef()
   function fn(){
    a.current.focus()
   }
    return <div>
            <Child  ref={a}/>
            <button onClick={fn}>父组件的按钮</button>
    </div>
}
export default  App
```

==Child.js==

```jsx
import { forwardRef } from "react"

// function Child(props,ref){
//     return <div>
//         <p>我是子组件</p>
//         <input ref={ref}/>
//     </div>
// }

const Child=forwardRef((props,ref)=>{
    return <div>
            <p>我是子组件</p>
            <input type="text" ref={ref} />
    </div>
})
//export default forwardRef(Child)
export default Child
```

<br>

#### **<font color='cornflowerblue'>2）useImperativeHandle</font>**

专门用来读取子组件的数据和方法的

语法

```jsx
useImperativeHandle(ref, createHandle, dependencies?)
```

- ref:父组件传递过来的ref
- createHandle：是一个函数，返回一个对象，这个对象就是父组件可以通过ref.current拿到的对象。所有你希望共享给父组件的数据或者方法，就写到这里

案例

==App.jsx==

```jsx
import { useRef } from "react"
import Child from "./Child"
function App() {
   const a=useRef()
   function fn(){
         a.current.handle()
   }

    return <div>
            <Child ref={a}/>
            <button onClick={fn}>父组件的按钮</button>
    </div>
}
export default  App
```

==Child.jsx==

```jsx
import React,{forwardRef, useImperativeHandle,useRef,useState} from "react"
function Child(props,ref){ 
  const b=useRef()  
  const [data,setData]=useState("我是子组件的数据")
    function fn(){
        console.log("我是子组件的方法")
    }
    function change(){
        setData("数据变了")
    }
    function handle(){
        b.current.focus()
    }
    useImperativeHandle(ref,()=>({
        fn2:fn,
        change,
        data,
        handle
    }))
        return <div>
                <p>我是子组件 {data}</p>
                <input type="text" ref={b}/>
        </div>
}


export default forwardRef(Child)
```

<br>

### **<font color='#10c300'>15.13、useLayoutEffect</font>**

- useLayoutEffect 的使用方式几乎与 useEffect 完全相同，但它在所有的 DOM 变更之后同步触发。这意味着在浏览器绘制之前，useLayoutEffect 中的操作会被完成，这就可以用来读取 DOM 布局并同步触发重绘。

- useEffect 是 React 中最常用的副作用钩子，允许你执行副作用操作，如数据获取、订阅以及手动更改 DOM。它在 DOM 更新完成后异步触发，这意味着它不会阻塞浏览器的绘制过程。



> 当你需要精确读取 DOM 布局（例如检测元素尺寸或位置）并在浏览器进行绘制之前立即同步更改它时。
>
> 当你需要通过 DOM 操作同步更新状态来避免视觉闪烁。

<br>

### **<font color='#10c300'>15.14、自定义hooks</font>**

自定义Hooks是React Hook的一种模式，用于将组件逻辑提取到可重用的函数中。当你想在多个组件之间共享一些状态逻辑时，自定义Hooks非常有用

**基本规则：**

> **在实现自定义Hooks之前，需要记住两个基本规则：**
>
> 1. 自定义Hooks的名称必须以“use”开头（这不是技术上的限制，而是约定俗成的命名规则，可以让你和其他开发者立即识别出哪些函数是钩子）。
> 2. 自定义Hooks内部可以调用其他的Hooks。

自定义hooks和普通函数的区别：

自定义hooks中可以调用其他hooks，而函数不可以



**自定义hooks实战，封装表单处理**

==App.js==

```jsx
import useFormInput from "./useFormInput"
function App() {
   const username = useFormInput("")
   const password = useFormInput("")
return <div>
        <h1>{username.value} {password.value}</h1>
        <input {...username}/>
        <input {...password} />   
</div>      
}
export default  App
```

==useFormInput.js==

```jsx
import { useState } from "react";

function useFormInput(initValue){
 const [value,setValue]=useState(initValue);
 function handleChange(e){
    setValue(e.target.value)
 }
 return {value:value,onChange:handleChange}
}

export default useFormInput
```




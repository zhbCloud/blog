---
title: React 完全指南 (React 18 & 19)
img: /static/45.webp
categories: 框架与生态
tags:
  - react18
abbrlink: 4179c0b9
date: 2025-12-02 10:28:38
---

# React 初学者完全指南 (React 18 & 19)

> 📚 本指南旨在帮助初学者快速掌握 React 的核心概念和最新特性

---

## 目录

1. [React 简介](#一-react-简介)
2. [环境搭建](#二-环境搭建)
3. [核心概念](#三-核心概念)
4. [React Hooks 详解](#四-react-hooks-详解)
5. [HOC 高阶组件](#五-hoc-高阶组件)
6. [React 18 新特性](#5-react-18-新特性)
7. [React 19 新特性](#6-react-19-新特性)
8. [最佳实践](#7-最佳实践)
9. [常见问题与解决方案](#8-常见问题与解决方案)
10. [学习资源推荐](#9-学习资源推荐)

<br>

## **一、React 简介**

### **<font color='red'>1.1 什么是 React？</font>**

React 是由 Facebook（现 Meta）开发的一个用于构建用户界面的 JavaScript 库。它的核心思想是：

- **组件化**：将 UI 拆分成独立、可复用的组件
- **声明式**：描述 UI 应该是什么样子，而不是如何改变它
- **单向数据流**：数据从父组件流向子组件，使应用更可预测

### **<font color='red'>1.2 为什么选择 React？</font>**

| 优势       | 说明                         |
| ---------- | ---------------------------- |
| 🚀 高性能   | 虚拟 DOM 最小化真实 DOM 操作 |
| 🧩 组件复用 | 一次编写，多处使用           |
| 🌐 生态丰富 | 大量第三方库和工具支持       |
| 📱 跨平台   | React Native 可开发移动应用  |
| 👥 社区活跃 | 丰富的学习资源和解决方案     |

---

<br>

## **二、 环境搭建**

### **<font color='red'>2.1 使用 Vite 创建项目（推荐）</font>**

```bash
# 使用 npm
npm create vite@latest vite-react-app -- --template react

# 使用 pnpm
pnpm create vite vite-react-app --template react

# 使用 yarn
yarn create vite vite-react-app --template react

# 进入项目目录并启动
cd vite-react-app
npm/pnpm/yarn install
npm/pnpm/yarn run dev
```

### **<font color='red'>2.2 使用 Create React App</font>**

```bash
npx create-react-app webpack-react-app
cd webpack-react-app
npm start
```

### **<font color='red'>2.3 项目结构</font>**

**vite**

```
vite-react-app/
├── 📁 public/                 # 公共资源目录
│   └── vite.svg               # Vite 项目默认 SVG 图标
├── 📁 src/                    # 源代码目录
│   ├── 📁 assets/             # 静态资源目录
│   ├── App.jsx                # 根组件
│   ├── App.css                # App 组件样式文件
│   ├── main.jsx               # 应用入口文件
│   └── index.css              # 全局样式文件
├── .gitignore                 # Git 忽略配置文件
├── README.md                  # 项目说明文档
├── eslint.config.js           # ESLint 配置文件
├── index.html                 # HTML 入口文件
├── package.json               # 项目配置文件
├── pnpm-lock.yaml             # pnpm 依赖锁定文件
└── vite.config.js             # Vite 配置文件
```

**webpack**

```
webpack-react-app/
├── 📁 public/                 # 公共资源目录 
│   ├── favicon.ico            # 网站图标
│   ├── index.html             # HTML 入口文件
│   ├── manifest.json          # Web App 清单文件
│   └── robots.txt             # 搜索引擎爬虫规则
├── 📁 src/                    # 源代码目录 
│   ├── App.css                # App 组件样式文件
│   ├── App.js                 # 根组件
│   ├── App.test.js            # App 组件测试文件
│   ├── index.css              # 全局样式文件
│   ├── index.js               # 应用入口文件
│   ├── reportWebVitals.js     # 性能检测文件
│   └── setupTests.js          # 测试设置文件
├── .gitignore                 # Git 忽略配置文件 
├── README.md                  # 项目说明文档 
├── package-lock.json          # npm 依赖锁定文件
└── package.json               # 项目配置文件
```

---

<br>

## **三、 核心概念**

### **<font color='red'>3.1 JSX 语法</font>**

JSX 是 JavaScript 的语法扩展，让你可以在 JS 中编写类似 HTML 的代码：

```jsx
// JSX 基础语法
function Welcome() {
  const name = "React";
  const isLoggedIn = true;
  
  return (
    <div className="welcome">
      {/* 使用花括号嵌入表达式 */}
      <h1>Hello, {name}!</h1>
      
      {/* 条件渲染 */}
      {isLoggedIn ? <p>欢迎回来</p> : <p>请登录</p>}
      
      {/* 注意：class 要写成 className */}
      <button className="btn">点击我</button>
    </div>
  );
}
```

#### **<font color='#10c300'>1）JSX 规则速记</font>**

| HTML       | JSX         |
| ---------- | ----------- |
| `class`    | `className` |
| `for`      | `htmlFor`   |
| `onclick`  | `onClick`   |
| `tabindex` | `tabIndex`  |

<br>

### **<font color='red'>3.2 组件</font>**

#### **<font color='#10c300'>1）函数组件（推荐）</font>**

```jsx
// 函数组件是 React 推荐的编写方式
function Greeting({ name }) {
  return <h1>你好, {name}!</h1>;
}

// 箭头函数写法
const Greeting = ({ name }) => {
  return <h1>你好, {name}!</h1>;
};
```

#### **<font color='#10c300'>2）类组件（了解即可）</font>**

```jsx
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>你好, {this.props.name}!</h1>;
  }
}
```

<br>

### **<font color='red'>3.3 Props（属性）</font>**

Props 是父组件传递给子组件的数据：

```jsx
// 父组件
function App() {
  return (
    <UserCard 
      name="张三"
      age={25}
      isAdmin={true}
      hobbies={['读书', '游戏']}
    />
  );
}

// 子组件
function UserCard({ name, age, isAdmin, hobbies }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>年龄: {age}</p>
      <p>身份: {isAdmin ? '管理员' : '普通用户'}</p>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### **<font color='#10c300'>1）Props 默认值</font>**

```jsx
function Button({ text = "点击", type = "primary" }) {
  return <button className={`btn-${type}`}>{text}</button>;
}
```

<br>

### **<font color='red'>3.4 State（状态）</font>**

State 是组件内部的可变数据：

```jsx
import { useState } from 'react';

function Counter() {
  // 声明状态：[当前值, 更新函数] = useState(初始值)
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  );
}
```

#### **<font color='#10c300'>1）State 更新注意事项</font>**

```jsx
function Example() {
  const [user, setUser] = useState({ name: '张三', age: 25 });
  
  // ❌ 错误：直接修改状态
  const wrongUpdate = () => {
    user.age = 26; // 不会触发重新渲染
  };
  
  // ✅ 正确：创建新对象
  const correctUpdate = () => {
    setUser({ ...user, age: 26 });
  };
  
  // ✅ 使用函数式更新（基于前一个状态）
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };
}
```

<br>

### **<font color='red'>3.5 事件处理</font>**

```jsx
function EventExample() {
  // 点击事件
  const handleClick = (e) => {
    console.log('按钮被点击', e);
  };
  
  // 带参数的事件处理
  const handleDelete = (id) => {
    console.log('删除项目:', id);
  };
  
  // 表单输入
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <div>
      <button onClick={handleClick}>点击我</button>
      <button onClick={() => handleDelete(123)}>删除</button>
      <input value={value} onChange={handleChange} />
    </div>
  );
}
```

<br>

### **<font color='red'>3.6 条件渲染</font>**

```jsx
function ConditionalExample({ isLoggedIn, messages }) {
  return (
    <div>
      {/* 方式1: 三元运算符 */}
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
      
      {/* 方式2: && 短路运算 */}
      {messages.length > 0 && <Badge count={messages.length} />}
      
      {/* 方式3: if-else 提前返回 */}
      {(() => {
        if (messages.length === 0) return <p>暂无消息</p>;
        if (messages.length < 5) return <p>少量消息</p>;
        return <p>大量消息</p>;
      })()}
    </div>
  );
}
```

<br>

### **<font color='red'>3.7 列表渲染</font>**

```jsx
function TodoList() {
  const todos = [
    { id: 1, text: '学习 React', done: false },
    { id: 2, text: '写代码', done: true },
    { id: 3, text: '看文档', done: false },
  ];
  
  return (
    <ul>
      {todos.map(todo => (
        // key 必须是唯一且稳定的标识符
        <li key={todo.id} className={todo.done ? 'completed' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

> ⚠️ **key 的重要性**：key 帮助 React 识别哪些元素改变了，避免使用数组索引作为 key（除非列表是静态的）

---

<br>

## **四、 React Hooks 详解**

Hooks 是 React 16.8 引入的特性，让你在函数组件中使用状态和其他 React 特性。

### **<font color='red'>4.1 useState - 状态管理</font>**

`useState` 是一个 React Hook，用于在函数组件中声明和管理**状态（state）**（ 一定要在**`组件顶层`**调用）

---

#### **<font color='#10c300'>1）基本语法</font>**

```js
const [state, setState] = useState(initialValue);
```

- initialArg：定义的初始值，可以是任意数据，像数字，字符串或者数组和对象。
- useState ()方法的返回值为由两个值组成的数组
  1. `state`：当前状态值：在首次渲染时，它将与你传递的 `initialArg` 相匹配。
  2. `setState`：更新状态的函数：它可以让你将 state 更新为不同的值并触发重新渲染。



#### **<font color='#10c300'>2）基本用法</font>**

```js
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            点击了 {count} 次
        </button>
    );
}

export default Counter
```



#### **<font color='#10c300'>3）核心特性详解</font>**

**1️⃣ 状态是隔离的**

每个组件实例拥有独立的状态，互不影响。

**2️⃣ 状态更新是替换而非合并**

与 class 组件的 `setState` 不同，`useState` 不会自动合并对象：

```jsx
const [user, setUser] = useState({ name: '张三', age: 20 });

// ❌ 错误：这会丢失 age 字段
setUser({ name: '李四' });

// ✅ 正确：需要手动展开
setUser({ ...user, name: '李四' });
```

**3️⃣ 函数式更新（解决闭包问题）**

当新状态依赖旧状态时，使用函数形式避免闭包陷阱：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  const incrementTwice = () => {
    // ❌ 问题：两次都基于 count=0，结果还是 1
    setCount(count + 1);
    setCount(count + 1);
    
    // ✅ 正确：基于最新状态更新
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };
  
  return <button onClick={incrementTwice}>+2</button>;
}
```

**4️⃣惰性初始化**

如果初始状态需要复杂计算，使用函数避免每次渲染都执行：

```jsx
// ❌ 每次渲染都会执行 heavyComputation()
const [data, setData] = useState(heavyComputation());

// ✅ 只在初始渲染执行一次，因为初始化的时候函数都会创建新的引用地址
const [data, setData] = useState(() => heavyComputation());
```

**5️⃣数组/对象更新技巧**

```jsx
const [list, setList] = useState([1, 2, 3]);
const [map, setMap] = useState(new Map());

// 数组操作
const addItem = (item) => setList([...list, item]);
const removeItem = (index) => setList(list.filter((_, i) => i !== index));
const updateItem = (index, value) =>
    setList(list.map((item, i) => i === index ? value : item));

// Map/Set 操作（需要新引用才会触发更新）
const addToMap = (k, v) => {
    const newMap = new Map(map);
    newMap.set(k, v);
    setMap(newMap);
};
```

#### **<font color='#10c300'>4）TypeScript 支持</font>**

```tsx
// 基础类型推断
const [count, setCount] = useState(0); // number

// 联合类型
const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

// 对象类型
interface User {
  id: number;
  name: string;
}
const [user, setUser] = useState<User | null>(null);

// 如果初始值为 undefined，需要显式指定类型
const [value, setValue] = useState<string>();
```

#### **<font color='#10c300'>5）常见陷阱与解决方案</font>**

**陷阱 1️⃣：闭包过期**

```jsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log(count); // 永远是旧值
        setCount(count + 1); // 永远基于初始值
    }, 1000);
}, []); // 空依赖导致闭包陷阱(可添加依赖项count解决，但是性能没有如下方法好)

// 解决：使用函数式更新或正确设置依赖
useEffect(() => {
    const timer = setInterval(() => {
        setCount(c => c + 1); // 总是获取最新值
    }, 1000);
    return () => clearInterval(timer);
}, []);
```

**陷阱 2️⃣：异步更新特性**

状态更新是异步且批处理的，不能立即获取新值：

```jsx
const handleClick = () => {
    setCount(count + 1);
    console.log(count); // 还是旧值！
  
    // 如需基于新值操作，使用 useEffect 或函数式更新
};
```

**陷阱 3️⃣：对象引用不变不触发更新**

```jsx
const [items, setItems] = useState([1, 2, 3]);

const wrongUpdate = () => {
    items.push(4); // 修改原数组
    setItems(items); // 引用相同，React 不重新渲染
};

const correctUpdate = () => {
    setItems([...items, 4]); // 新数组引用
};
```



#### **<font color='#10c300'>6）最佳实践</font>**

1️⃣**合理拆分状态：**不要把所有状态塞在一个对象里，独立变化的状态应该独立声明

```jsx
// ❌ 过度聚合
const [state, setState] = useState({ user: null, posts: [], loading: false });

// ✅ 独立声明
const [user, setUser] = useState(null);
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);
```

2️⃣**使用自定义 Hook 封装状态逻辑**：

```jsx
function useCounter(initial = 0) {
    const [count, setCount] = useState(initial);
    const inc = () => setCount(c => c + 1);
    const dec = () => setCount(c => c - 1);
    const reset = () => setCount(initial);
    return { count, inc, dec, reset };
}
```

3️⃣**避免深层嵌套状态**：复杂状态考虑使用 `useReducer`

`useState` 适用于简单状态管理，当状态逻辑复杂或多个状态相互关联时，考虑升级到 `useReducer`。

<br>

### **<font color='red'>4.2 useEffect-副作用处理</font>**

它让函数组件能够在**渲染后执行副作用操作（side effects）**，比如：网络请求、DOM 操作、事件监听、定时器、数据订阅等。

函数组件里没有生命周期方法（像类组件的 `componentDidMount`、`componentWillUnmount`）；React 提供 `useEffect` 来替代它们。

---

#### **<font color='#10c300'>1）基本语法</font>**

```js
useEffect(() => {
  // 执行副作用逻辑
  return () => {
    // 清理副作用逻辑（可选）
  };
}, [dependencies]);
```

- 参数1 (函数)：定义的初始值，可以是任意数据，像数字，字符串或者数组和对象。
- 参数2 (依赖项)：
  1. `无参数`：每次渲染后都执行。
  2. `空数组`：仅在挂载时执行一次。
  3. `依赖参数`：依赖参数变化时执行。



#### **<font color='#10c300'>2）使用场景示例</font>**

**<font color='#00A6ED'>1️⃣ 不带依赖 → 每次渲染都执行</font>**

```js
useEffect(() => {
  console.log('每次渲染都执行');
});
```

不写依赖数组时，意味着：

- 每次组件**挂载和更新**都会运行。
  ⚠️ 如无必要，不建议省略依赖数组，会影响性能。

------

**<font color='#00A6ED'>2️⃣ 组件挂载时执行（只执行一次）</font>**

```jsx
import { useEffect } from 'react';

function Hello() {
  useEffect(() => {
    console.log('组件挂载');

    return () => {
      console.log('组件卸载');
    };
  }, []); // 空数组 → 只执行一次
  return <h1>Hello React!</h1>;
}
```

**🔍 解释：**

- `[]` 表示该副作用没有依赖，只在组件**首次渲染**和**卸载**时执行；
- 清理函数返回部分 (`return () => …`) 会在组件卸载时调用。

可类比于：

- 挂载时执行：`componentDidMount`
- 卸载时清理：`componentWillUnmount`

------

**<font color='#00A6ED'>3️⃣ 依赖特定状态更新时执行</font>**

```jsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`count 更新了：${count}`);
  }, [count]); // 👈 当 count 改变时触发

  return (
    <div>
      <p>计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

✅ 当 `count` 改变时，`useEffect` 会重新运行副作用逻辑。



#### **<font color='#10c300'>3）清理副作用（如事件、定时器）</font>**

当副作用涉及**订阅或注册资源**时，应该在组件卸载时清理，以防止内存泄漏。

```js
useEffect(() => {
  const timer = setInterval(() => {
    console.log('定时器在运行');
  }, 1000);

  // 清理函数（组件卸载时调用）
  return () => clearInterval(timer);
}, []);
```



#### **<font color='#10c300'>4）常见用途总结</font>**

| 用途      | 示例                                     |
| --------- | ---------------------------------------- |
| 数据请求  | `fetch(url)`、`axios.get(...)`           |
| 事件监听  | `window.addEventListener('scroll', ...)` |
| DOM 操作  | `document.title = ...`                   |
| 定时器    | `setInterval()` / `setTimeout()`         |
| 订阅/清理 | WebSocket、Observer 模式等               |



#### **<font color='#10c300'>5）常见坑和注意事项</font>**

1. 依赖遗漏会导致逻辑错误。
   - 推荐使用 ESLint 插件：`eslint-plugin-react-hooks` 自动检查依赖。
2. 清理函数非常重要。
   - 不清理定时器或监听可能造成内存泄漏。
3. 不要在 useEffect 内直接修改状态导致无限循环。
   - React 会重复渲染；必须控制好条件。



#### **<font color='#10c300'>6）总结对比</font>**

| 生命周期行为 | 类组件写法             | 函数组件写法                               |
| ------------ | ---------------------- | ------------------------------------------ |
| 组件挂载     | `componentDidMount`    | `useEffect(() => {}, [])`                  |
| 组件更新     | `componentDidUpdate`   | `useEffect(() => {}, [某状态])`            |
| 组件卸载     | `componentWillUnmount` | `useEffect(() => { return () => {} }, [])` |

<br>



### **<font color='red'>4.3 useContext - 跨组件共享状态</font>**

它主要用于在组件树中**共享数据**，**避免层层传递 props（“props drilling”）的问题**。

在 React 应用中，如果很多层组件之间都需要共享某个数据（比如主题、语言、用户信息），直接通过 props 一层层往下传会非常麻烦：

```jsx
<App>
  <Layout theme={theme}>
    <Content theme={theme}>
      <Button theme={theme} />
    </Content>
  </Layout>
</App>
```

👆 每层都要传 `theme`，这就是 **props drilling**。

React 提供 **Context**，可以让你在组件树间**直接共享数据，不必层层传递**。

#### **<font color='#10c300'>1）使用步骤</font>**

**Step 1️⃣：创建 Context**

```jsx
// src\context\index.jsx
import {createContext} from "react";
const MyContext = createContext();
export {
	MyContext
}
```

**Step 2️⃣：上层组件提供数据**

```jsx
import { useState } from "react";
import Child from "./components/Child";
import GrandChild from "./components/GrandChild";
import { MyContext } from "./context/index";

function App() {
    const [data] = useState("大鱼海棠");
    return (
        <>
            <MyContext.Provider value={data}>
                <p>我是父组件</p>
                <Child>
                    <GrandChild />
                </Child>
            </MyContext.Provider>
        </>
    );
}

export default App;
```

**Step 3️⃣：子组件**

```jsx
function Child({children}) {
    return (
        <>
            <p>我是子组件</p>
            {children}
        </>
    )
}

export default Child
```

**Step 4️⃣：孙组件使用 `useContext` 获取值**

```jsx
import {useContext} from 'react'
import { MyContext } from "../context/index";

function GrandChild() {
    // 这是app.jsx中传来的数据
    const data = useContext(MyContext)
    return (
        <>
            <p>我是孙组件，红色部分是顶级组件数据：<span style={{color: 'red'}}>{data}</span></p>
        </>
    )
}

export defau lt GrandChild
```



#### **<font color='#10c300'>2）语法总结</font>**

```js
const value = useContext(MyContext);
```

- 参数：你创建的 context 对象（由 `React.createContext()` 生成）
- 返回值：最近一层匹配的 `MyContext.Provider` 中的 `value`

React 会自动：

- 找到离当前组件最近的 Provider；
- 读取它的 `value`；
- 如果找不到 Provider，返回 `createContext(defaultValue)` 里定义的默认值。



#### **<font color='#10c300'>3）使用场景示例</font>**

**<font color='#00A6ED'>1️⃣ 状态共享示例</font>**

可以结合 `useState` 在顶层定义共享状态：

```js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({ name: 'Alice', age: 20 });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <p>用户名：{user.name}</p>
      <button onClick={() => setUser({ ...user, name: 'Bob' })}>改名</button>
    </div>
  );
}
```

➡️ 子组件不仅能读到状态，还能调用 `setUser()` 修改它，所有使用此上下文的组件都会同步更新。

------

**<font color='#00A6ED'>2️⃣ 主题切换示例</font>**

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



#### **<font color='#10c300'>4）应用场景</font>**

`useContext` 常用于：

| 场景             | 举例               |
| ---------------- | ------------------ |
| 主题切换         | 深色 / 浅色主题    |
| 用户登录信息     | 全局用户状态       |
| 多语言（国际化） | 当前语言、翻译函数 |
| 全局设置         | 比如 App 配置对象  |

通常配合：

- `createContext()` 创建上下文；
- `<Context.Provider>` 提供数据；
- `useContext()` 消费数据。



#### **<font color='#10c300'>5）注意事项</font>**

| 注意点                        | 说明                                           |
| ----------------------------- | ---------------------------------------------- |
| 必须在 Provider 范围内使用    | 否则返回默认值（不是报错）                     |
| 不要滥用 Context              | 太多全局状态会降低可维护性                     |
| 每当 Provider 的 value 改变时 | 所有使用该 Context 的组件都会重新渲染          |
| 不支持选择性订阅              | 所以大型状态可以考虑使用 Zustand、Redux 等方案 |



#### **<font color='#10c300'>6）总结</font>**

| 项目     | 说明                                          |
| -------- | --------------------------------------------- |
| Hook 名  | `useContext(MyContext)`                       |
| 功能     | 在组件树中直接获取 Context 数据               |
| 替代了   | 类组件的 `contextType` / `<Context.Consumer>` |
| 搭配使用 | `createContext()` + `<Context.Provider>`      |
| 场景     | 全局状态共享（主题、用户、语言等）            |

<br>



### **<font color='red'>4.4 useMemo- 缓存计算结果</font>**

**让 React 记住一个计算值（memoized value）**，只有在依赖项变化时才重新计算。

换句话说：

- 如果依赖没变 → 直接用上次计算的结果；
- 如果依赖变了 → 重新计算并返回新结果。

它可以帮你显著减少不必要的计算或对象重建。

`useMemo`的理念是同步的，useMemo不能进行一些额外的副操作，比如网络请求等。

---

#### **<font color='#10c300'>1）基本语法</font>**

```js
useMemo(()=>{return 值},[依赖项])
```

- 参数1 (函数)：一个返回值的函数（执行计算）
- 参数2 (依赖项)：依赖数组，当其中某项改变时才重新计算

返回值：**缓存的计算结果**。

#### **<font color='#10c300'>2）使用场景示例</font>**

**<font color='#00A6ED'>1️⃣ 计算缓存</font>**

未使用`useMemo`的时候改变颜色，也会执行ComputeTotal价格的计算。

```
import { useState, useMemo } from "react";

function ComputeTotal(price, count) {
    console.log("函数运行了");
    return price * count;
}

function App() {
    const [price, setPrice] = useState(100);
    const [count] = useState(1);
    const [color, setColor] = useState("red");

    // 👉 只有 price 变化时，才重新计算
    const totalPrice = useMemo(() => ComputeTotal(price, count),[price]);

    return (
        <>
            <p>总价：{totalPrice}</p>
            <p>{color}</p>
            <button onClick={() => setColor("blue")}>修改颜色</button>
            <button onClick={() => setPrice(price + 100)}>修改价格</button>
        </>
    );
}

export default App;
```

✅ 当你改变颜色的时候，不会重新执行ComputeTotal。只有price变化时才会重新计算。

------

**<font color='#00A6ED'>2️⃣ 缓存组件(不常用)</font>**

```jsx
import { useState, useMemo } from "react";
import Child from "./Child";

function App() {
    const [price, setPrice] = useState(100);
    const [count] = useState(1);
    const [color, setColor] = useState("red");

    const memoizedChild = useMemo(() => {
        // 缓存组件
        return <Child count={count} price={price} />;
    }, [count, price]);

    return (
        <>
            <p>{color}</p>
            <button onClick={() => setColor("blue")}>修改颜色</button>
            <button onClick={() => setPrice(price + 100)}>修改价格</button>
            {/* 使用组件 */}
            {memoizedChild}
        </>
    );
}

export default App;
```



#### **<font color='#10c300'>3）核心用途</font>**

| 用途                 | 说明                                |
| -------------------- | ----------------------------------- |
| 缓存复杂计算         | 避免每次渲染都进行高耗时操作        |
| 缓存对象或数组       | 避免对象引用变化导致子组件重新渲染  |
| 与 `React.memo` 配合 | 保持 props 稳定，防止子组件误重渲染 |



#### **<font color='#10c300'>4）缓存引用（避免重渲染）</font>**

例如子组件使用 `React.memo`：

```jsx
import React, { useMemo } from "react";

function Child({ options }) {
    console.log("Child render");
    return <div>{options.join(", ")}</div>;
}
const MemoChild = React.memo(Child);

function Parent() {
    // 如果不缓存，数组每次渲染都新建，导致 Child 重新渲染
    const options = useMemo(() => ["A", "B"], []); // 👈 缓存数组引用

    return <MemoChild options={options} />;
}
export default Parent;
```

➡️ `useMemo` 保证每次渲染中 `options` 的引用稳定，`React.memo` 会认为 props 没变，从而跳过重新渲染。



#### **<font color='#10c300'>4）常见注意事项</font>**

| 注意点                         | 说明                                                 |
| ------------------------------ | ---------------------------------------------------- |
| 不要滥用                       | 如果计算很轻量级，没必要用 `useMemo`（会增加复杂度） |
| 依赖必须完整                   | 漏掉依赖可能导致值不同步（推荐使用 ESLint 检查）     |
| 缓存是基于引用比较             | 数组、对象、函数引用变化 → 会重新计算                |
| 仅缓存计算结果，不影响状态更新 | 状态变化仍然触发重新渲染                             |



#### **<font color='#10c300'>5）useMemo vs useCallback</font>**

| 项目     | `useMemo`                                       | `useCallback`                                       |
| -------- | ----------------------------------------------- | --------------------------------------------------- |
| 返回值   | 缓存**计算结果**                                | 缓存**函数引用**                                    |
| 适用场景 | 高开销计算、缓存对象                            | 保持回调函数引用稳定                                |
| 示例     | `const result = useMemo(() => heavyFn(x), [x])` | `const fn = useCallback(() => doSomething(x), [x])` |

两者都是性能优化 Hook，但返回目标不同。



#### **<font color='#10c300'>6）总结</font>**

| 项目     | 说明                             |
| -------- | -------------------------------- |
| Hook 名  | `useMemo`                        |
| 功能     | 缓存计算结果，依赖改变时重新计算 |
| 返回值   | 上次计算的结果（memoized value） |
| 主要用途 | 高性能计算缓存、稳定对象引用     |
| 常与搭配 | `React.memo`、`useCallback`      |
| 注意     | 不要滥用，确实有性能问题时再用   |

🌟 **一句话总结：**

`useMemo(fn, deps)` = “记住 fn 的返回值”，当 deps 不变时，不再重新执行 fn。

<br>

### **<font color='red'>4.5 useCallback- 缓存函数引用</font>**

在 React 中，每次组件渲染都会重新执行组件函数体，**里面定义的函数也会被“重新创建”**。
如果这些函数作为 props 传给子组件，即使函数逻辑没有变，根据 **引用地址比较**，子组件会认为 props 变了而重新渲染。

`useCallback` 解决了这个问题：

✅ **让函数引用在依赖不变时保持稳定（不变）**。

---

#### **<font color='#10c300'>1）基本语法</font>**

```jsx
const memoizedCallback = useCallback(() => {
  // 函数逻辑
}, [dependencies]);
```

- **第一个参数**：要缓存的回调函数
- **第二个参数**：依赖数组，当依赖中有值变化时，返回的新函数引用会更新



#### **<font color='#10c300'>2）基本示例</font>**

```jsx
import React, { useState, useCallback } from "react";

function Child({ onClick }) {
    console.log("子组件渲染了");
    return <button onClick={onClick}>子组件按钮</button>;
}

const MemoChild = React.memo(Child); // 👈 只有 props 变了才渲染

function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");

    // 只有 count 变化时才会更新函数引用(子组件渲染)
    const handleClick = useCallback(() => {
        console.log("Clicked:", count);
    }, [count]); // 👈 缓存函数引用

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>count +1</button>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <MemoChild onClick={handleClick} />
        </div>
    );
}

export default App;
```

**🔍 分析：**

- 如果不用 `useCallback`，每次 App 渲染都会“新建”一个 `handleClick` 函数引用；
- `MemoChild` 会认为 props (`onClick`) 改了 → 重新渲染；
- 用了 `useCallback` 后，在依赖不变化时，函数引用保持稳定 → 组件不重渲染。



#### **<font color='#10c300'>3）什么时候用 useCallback</font>**

1. 子组件使用了 `React.memo`
   - 避免因为回调函数引用变化导致子组件重渲染
2. 函数传递给深层子组件
   - 不希望每次父组件渲染都改变函数引用
3. 依赖稳定的函数
   - 当函数依赖的状态/变量不经常变化时，缓存引用意义更大



#### **<font color='#10c300'>4）依赖数组注意事项</font>**

- **依赖必须包含回调内部用到的变量**（闭包变量）
- 推荐使用 ESLint 插件 `eslint-plugin-react-hooks` 自动分析依赖
- 如果依赖数组为空`[]`：
  - 返回的函数引用将**永远不会变化**
  - 适用于那些不依赖任何外部变量的回调



#### **<font color='#10c300'>5）结合 React.memo的优化模式</font>**

常见模式：

```jsx
const MemoChild = React.memo(Child);

function Parent() {
	const handleClick = useCallback(() => { ... }, []);
 	return <MemoChild onClick={handleClick} />;
}
```

✅ 子组件 `MemoChild` 只在真正需要更新时才渲染。



#### **<font color='#10c300'>6）常见误区</font>**

1. **不要滥用**
   如果子组件没有 `React.memo` 或不是性能瓶颈，没必要加 `useCallback`（增加复杂度）
2. **缓存不是减少渲染次数的万能钥匙**
   `useCallback` 只防止不必要的重渲染，但状态更新触发的渲染仍会发生
3. **依赖不正确会导致逻辑错误**
   缺少依赖可能让函数内部拿到旧的状态



#### **<font color='#10c300'>7）总结</font>**

| 项目    | 内容                               |
| ------- | ---------------------------------- |
| Hook 名 | `useCallback`                      |
| 作用    | 缓存回调函数引用，避免不必要的渲染 |
| 参数    | `(fn, [deps])`                     |
| 返回值  | 稳定的函数引用                     |
| 常搭配  | `React.memo`, `useMemo`            |
| 注意    | 依赖完整性、勿滥用                 |

🌟 **一句话总结：**

当你需要把回调函数作为 props 传递给 `React.memo` 子组件时，用 `useCallback` 可以避免因为函数引用变化导致子组件重复渲染。

<br>

### **<font color='red'>4.6 useReducer-复杂状态管理</font>**

> ✅ `useReducer` 是 `useState` 的高级替代方案。
> 当状态变化逻辑比较复杂，或者新状态依赖旧状态时，用 `useReducer` 会更晰。

它和 Redux 的核心思想一样：
**通过 “动作（action）” 和 “状态更新函数（reducer）” 来控制状态变化。**

---

#### **<font color='#10c300'>1）基本语法</font>**

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

- **`state`**：当前状态
- **`dispatch`**：触发状态更新的函数
- **`reducer`**：一个函数，负责“接收旧状态 + 动作（action）”，返回新状态
- **`initialArg`**：初始状态
- **`init（可选）`**：*惰性初始化函数*，用于在初始渲染时对 `initialArg` 进行加工或计算，返回真正的初始状态，只会在初始化执行一次



#### **<font color='#10c300'>2）使用场景示例</font>**

**<font color='#00A6ED'>1️⃣ 计数器</font>**

```jsx
import { useReducer } from "react";

// 定义 reducer
function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state; // 返回原状态（防止报错）
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <div>
            <p>计数：{state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>+1</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
        </div>
    );
}

export default Counter;
```

✅ `dispatch` 类似于调用 `setState`，但语义更清晰、逻辑集中。

------

**<font color='#00A6ED'>2️⃣ 复杂状态示例：表单管理</font>**

```jsx
import { useReducer } from 'react';

const initialForm = {
    username: '',
    age: '',
};

function formReducer(state, action) {
    switch (action.type) {
        case 'CHANGE_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET':
            return initialForm;
        default:
            return state;
    }
}

function Form() {
    const [form, dispatch] = useReducer(formReducer, initialForm);

    return (
        <div>
            <input
                value={form.username}
                onChange={(e) =>
                    dispatch({ type: 'CHANGE_FIELD', field: 'username', value: e.target.value })
                }
                placeholder="用户名"
            />
            <input
                value={form.age}
                onChange={(e) =>
                    dispatch({ type: 'CHANGE_FIELD', field: 'age', value: e.target.value })
                }
                placeholder="年龄"
            />
            <button onClick={() => dispatch({ type: 'RESET' })}>重置</button>

            <p>{JSON.stringify(form)}</p>
        </div>
    );
}


export default Form;
```

✅ 优势：

- 所有状态更新逻辑集中在 `reducer`；
- 更容易维护、测试、调试。



#### **<font color='#10c300'>3）useReducer 的执行流程图</font>**

1️⃣ 组件渲染时：

- React 按 `initialArg` 初始化状态。

2️⃣ 调用 `dispatch(action)`：

- React 会执行 `reducer(state, action)`；
- 得到新的 state；
- 重新渲染组件。

```jsx
dispatch(action)
   ↓
reducer(state, action)
   ↓
newState → 触发重新渲染
```



#### **<font color='#10c300'>4）相比 useState 的优势</font>**

| 特点     | useState           | useReducer                   |
| -------- | ------------------ | ---------------------------- |
| 适用场景 | 状态简单（一个值） | 状态结构复杂，多逻辑分支     |
| 更新方式 | 直接传值或函数     | 派发 action，由 reducer 处理 |
| 状态结构 | 通常是单个值       | 常为对象（多个字段）         |
| 思维方式 | “我想要一个新值”   | “我派发一个意图（action）”   |



#### **<font color='#10c300'>5）、使用惰性初始化（第三个参数）</font>**

`useReducer` 还支持传入一个函数，延迟计算初始状态（避免初始化开销）👇

```jsx
import { useReducer } from 'react';

function init(initialCount) {
    return { count: initialCount };
}

function reducer(state, action) {
    switch (action.type) {
        case 'reset':
            return init(action.payload);
        case 'increment':
            return { count: state.count + 1 };
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, 0, init);

    return (
        <>
            <p>计数: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'reset', payload: 5 })}>重置为 5</button>
        </>
    );
}

export default Counter;
```

这种方式适用于初始状态计算非常复杂的情况。



#### **<font color='#10c300'>6）、与 Context 结合</font>**

全局状态（Redux 思想）

`useReducer` 常配合 `useContext` 使用，构建轻量“全局状态管理”：

```jsx
import { createContext, useReducer, useContext } from 'react';

const CounterContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'add': return state + 1;
        default: return state;
    }
}

function CounterProvider({ children }) {
    const [count, dispatch] = useReducer(reducer, 0);
    return (
        <CounterContext.Provider value={{ count, dispatch }}>
            {children}
        </CounterContext.Provider>
    );
}

function Child() {
    const { count, dispatch } = useContext(CounterContext);
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => dispatch({ type: 'add' })}>+1</button>
        </div>
    );
}

export default function App() {
    return (
        <CounterProvider>
            <Child />
        </CounterProvider>
    );
}
```

✅ 相当于一个小型 Redux。



#### **<font color='#10c300'>7）、注意事项</font>**

| 注意点                 | 说明                                |
| ---------------------- | ----------------------------------- |
| `reducer` 必须是纯函数 | 不要直接修改 state 或执行副作用     |
| 不要频繁重建 reducer   | 通常定义在组件外或 `useCallback` 中 |
| 与 Redux 思想相同      | 但更轻量不需要中间件                |
| 可结合 `useContext`    | 实现全局状态共享                    |



#### **<font color='#10c300'>8）、总结</font>**

| 特性             | 说明                                     |
| ---------------- | ---------------------------------------- |
| Hook 名          | `useReducer`                             |
| 作用             | 管理复杂的组件状态和变化逻辑             |
| 返回值           | `[state, dispatch]`                      |
| 与 useState 对比 | 状态逻辑更集中、可扩展性更强             |
| 常搭配           | `useContext`（全局状态）                 |
| 适用场景         | 复杂状态更新（表单、异步流程、全局管理） |

------

🌟 **一句话总结：**

`useReducer` = “复杂版 useState”
当状态逻辑复杂或多步骤更新时，用 reducer 管理更干净、更可靠。

<br>

### **<font color='red'>4.7 useRef - 引用 DOM 和保存可变值</font>**

✅ `useRef` 返回一个 **可变的 ref 对象** `{ current: ... }`
这个对象的 `.current` 属性可以存储任何值（DOM 元素、定时器 ID、普通变量等），**改变 `.current` 不会触发组件重渲染**。

它的两个主要用途：

1. **访问 DOM 元素**（函数组件中替代 `document.querySelector`）
2. **保存任意变量值**（这个值在组件的整个生命周期内保持不变，不会因重新渲染而丢失）

---

#### **<font color='#10c300'>1）基本语法</font>**

```js
const refContainer = useRef(initialValue);
```

- `initialValue` 是初始值
- `refContainer.current` 是存放值的地方
- 改变 `refContainer.current` **不会触发组件重新渲染**



#### **<font color='#10c300'>2）使用场景示例</font>**

**<font color='#00A6ED'>1️⃣ 操作 DOM 元素</font>**

```jsx
import { useRef } from 'react';

function InputFocus() {
  const inputRef = useRef(null); // 初始 current = null

  const focusInput = () => {
    inputRef.current.focus(); // 获取 DOM 节点并聚焦
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="点击按钮聚焦我" />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  );
}

export default InputFocus;
```

- `ref={inputRef}` 将 DOM 节点绑定到 `inputRef.current`
- 点击按钮时执行 `inputRef.current.focus()` 来让输入框获得焦点

------

**<font color='#00A6ED'>2️⃣ 用来存储可变值</font>**

`useRef` 可以用来存储任意可变值，而且即使组件重新渲染，这个值仍然保留。

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

- `renderTimes.current` 是一个持久化引用，组件每次渲染都会累加，但不会引起额外的渲染
- 对 `useRef` 变量的修改不会触发 UI 更新

------

**<font color='#00A6ED'>3️⃣记住上一次渲染的值</font>**

```jsx
import { useState, useRef, useEffect } from 'react';

function PrevValueExample() {
    const [value, setValue] = useState('');
    const prevValueRef = useRef('');

    useEffect(() => {
        prevValueRef.current = value; // 更新保存的值
    }, [value]);

    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <p>当前值: {value}</p>
            <p>上一次的值: {prevValueRef.current}</p>
        </div>
    );
}

export default PrevValueExample;
```

✅ 使用 `.current` 保存上一次更新前的值 —— 不会触发额外渲染。



#### **<font color='#10c300'>3）、注意事项</font>**

1. **不要用它来代替 state**，除非你不需要触发渲染。

2. `.current` 修改不会更新 UI，只有 `state` 更新会触发渲染。

3. 访问 DOM 节点要确保该节点已经渲染到页面上（通常在 `useEffect` 中使用）。

4. 函数组件不能使用ref，因为函数组件没有实例（和 forwardRef 搭配可使用ref）

   ```jsx
   import { useRef } from "react";
   import Child from "./child";
   function App() {
       const domRef = useRef();
       return (
           <div>
               {/* 错误写法，函数组件不能使用ref，因为函数组件没有实例 */}
               <Child ref = {domRef} />
               <button>父组件的按钮</button>
           </div>
       );
   }
   export default App;
   
   ```

   

#### **<font color='#10c300'>4）、和 forwardRef 搭配</font>**

<a name="forwardRef">**`useRef`** 配合 **`forwardRef`** 可以将 ref 传给子组件中的 DOM 元素：</a>

```jsx
import { useRef, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function App() {	
  const myInputRef = useRef();

  return (
    <div>
      <CustomInput ref={myInputRef} placeholder="自定义组件中的输入框" />
      <button onClick={() => myInputRef.current.focus()}>聚焦</button>
    </div>
  );
}

export default App;
```

✅ 这样可以让父组件直接操作子组件内部的 DOM 元素。

**<font color='red'>🚫在react19中已废弃forwardRef </font>**

```jsx
import { useRef } from 'react';

// ✅ React 19 写法：直接从 props 中获取 ref
function CustomInput({ placeholder, ref, ...props }) {
  return <input ref={ref} placeholder={placeholder} {...props} />;
}

function App() {	
  const myInputRef = useRef();

  return (
    <div>
      <CustomInput ref={myInputRef} placeholder="自定义组件中的输入框" />
      <button onClick={() => myInputRef.current.focus()}>聚焦</button>
    </div>
  );
}

export default App;
```



#### **<font color='#10c300'>5）、总结</font>**

| 用途                    | 示意                        |
| ----------------------- | --------------------------- |
| 获取 DOM 节点           | `ref={domRef}`              |
| 保存跨渲染变量          | 保存定时器 ID、上次值等     |
| 自定义组件中转 DOM 操作 | 结合 `forwardRef`           |
| 避免重复渲染            | `.current` 变化不会触发渲染 |

📌 **一句话总结：**

`useRef` 就像一个不会变的盒子，`.current` 可存任何值，对它的修改不会让组件重新渲染，它非常适合保存 DOM 节点或跨渲染的变量。

<br>

### **<font color='red'>4.8 useId - 生成唯一 ID</font>**

`useId` 是一个 React 内置 Hook，用来生成一个稳定且唯一的 ID 字符串，通常用于：

- **无障碍（a11y）场景**：让 `label` 和表单控件配对使用；
- **服务端渲染（SSR）**：防止客户端与服务器渲染的 ID 不一致；
- **生成稳定唯一 key/id**（每次渲染保持不变）。

---

#### **<font color='#10c300'>1）基本语法</font>**

```js
const id = useId();
```

- 返回一个在当前组件作用域内 **唯一且稳定** 的字符串，例如：`"r1:0"`。
- 每次渲染都保证相同组件中的 id 一致。
- 不会在不同组件之间重复。



#### **<font color='#10c300'>2）使用场景示例</font>**

**<font color='#00A6ED'>1️⃣ 关联 `<label>` 与 `<input>`</font>**

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

**<font color='#00A6ED'>2️⃣ 组合前缀使用（推荐）</font>**

为了更明确区分不同控件，可以加上自定义前缀：

```jsx
jsxconst id = useId();

<input id={`email-${id}`} />
<label htmlFor={`email-${id}`}>邮箱</label>
```

结果类比：`id="email-r1:0"`, `email-r1:1` 等。



#### **<font color='#10c300'>3）与 SSR 配合</font>**

React 18 引入了 `useId`，是为了解决 **服务端渲染（Server Side Rendering）** 时生成的 ID 不一致问题：

- SSR 阶段会生成稳定的 ID。
- Hydration（客户端激活）时，React 会保证客户端生成的 id 与服务端的一致。

✅ 所以 `useId` 是 **SSR 安全的唯一 ID**。



#### **<font color='#10c300'>4）注意事项</font>**

1. `useId` **不适合当作列表 key 的唯一标识**，因为它只在组件作用域独立唯一，不是数据层唯一。
2. 每次调用 `useId` 都会生成一个不同的子 ID，React 内部有机制确保组合时不冲突。
3. 只可在 **组件初始化阶段调用一次**，即让 `id` 在整个组件生命周期内稳定。

<br>

### **<font color='red'>4.9 useDeferredValue - 延迟更新值</font>**

当你更新某个状态时，React 不一定立刻同步渲染使用这个值的部分，而是会**优先渲染更紧急的更新（交互、输入）**，稍后再更新那些耗时的渲染部分。

✅ 简单理解：让页面中不太重要的部分“晚一点更新”，以保证用户操作更流畅。

---

#### **<font color='#10c300'>1）基本语法</font>**

```js
const deferredValue = useDeferredValue(value);
```

- `value`：原始的值（可能变化频繁）
- `deferredValue`：React 返回的延迟更新的值

当 `value` 改变时，React **不会立即**让 `deferredValue` 同步，而是“稍后”更新它（基于调度优先级），如果更新非常快，比如频繁输入，`deferredValue` 会滞后一点跟上。



#### **<font color='#10c300'>2）使用场景示例</font>**

**<font color='#00A6ED'>1️⃣ 搜索过滤（大列表）</font>**

假设我们有一个输入框用于搜索大量数据，输入过程中你不希望每个字母都立即导致昂贵的渲染：

```jsx
import { useState, useDeferredValue, useMemo } from 'react';

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



#### **<font color='#10c300'>3）useDeferredValue的本质</font>**

它利用了 **React 的并发特性（Concurrent Rendering）**
让某些更新以较低优先级进行：

- 用户输入 → 高优先级；
- 列表更新 → 低优先级；
- React 内部可在合适时机处理低优先级更新。

所以它非常适合：

- 输入搜索时展示结果；
- 大量数据过滤；
- 复杂渲染场景中保持 UI 互动流畅。



#### **<font color='#10c300'>4）注意事项</font>**

| 注意点                          | 说明                               |
| ------------------------------- | ---------------------------------- |
| 不会跳过更新                    | 只是延迟执行，最终仍会同步到最新值 |
| 不建议用于关键 UI 状态          | 因为它可能暂时落后于真实值         |
| 需要 React 18+                  | 属于并发系统的功能                 |
| 可搭配 `useTransition` 一起使用 | 共同控制更新优先级更加灵活         |



#### **<font color='#10c300'>5） 总结</font>**

| 属性       | 说明                                       |
| ---------- | ------------------------------------------ |
| Hook 名    | `useDeferredValue(value)`                  |
| React 版本 | 18+                                        |
| 主要作用   | 延迟低优先级渲染以保持交互流畅             |
| 常见场景   | 搜索、大列表、性能优化                     |
| 特点       | 返回一个“稍后更新”的值；不影响高优先级响应 |

<br>

### **<font color='red'>4.10 useTransition - 非阻塞状态更新</font>**

用来将某些状态更新标记为“过渡更新（transition update）”。

简单来说，它告诉 React：

> “这类更新不用立刻执行，可以稍后完成，让用户交互不要被卡顿。”

在 React 18 的 **并发渲染模式** 下，更新有优先级区分：

- **紧急更新（Urgent）**：立刻执行，比如输入框、点击。
- **过渡更新（Transition）**：可以延后，比如筛选、分页、排序、大列表渲染。



#### **<font color='#10c300'>1）基本语法</font>**

```jsx
const [isPending, startTransition] = useTransition();
```

- `isPending` ：布尔值：表示过渡更新是否正在进行中，可用于显示“加载中...”

- `startTransition()`：函数：用于包裹属于过渡更新的代码（例如 setState）



#### **<font color='#10c300'>2）使用场景示例</font>**

```jsx
import { useState, useTransition } from 'react';

const allItems = Array.from({ length: 20000 }, (_, i) => `Item ${i + 1}`);

function List({ list }) {
    return (
        <ul>
            {list.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

function App() {
    const [query, setQuery] = useState('');
    const [list, setList] = useState(allItems);
    const [isPending, startTransition] = useTransition(); // 👈 使用 useTransition

    function handleChange(e) {
        const newQuery = e.target.value;
        setQuery(newQuery); // 紧急更新（立即响应输入）

        // 过滤操作标记为“过渡更新”，不会阻塞输入
        startTransition(() => {
            const filtered = allItems.filter(item =>
                item.toLowerCase().includes(newQuery.toLowerCase())
            );
            setList(filtered);
        });
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>useTransition 优化的搜索示例</h2>
            <input
                value={query}
                onChange={handleChange}
                placeholder="输入关键字过滤列表…"
            />
            {isPending && <span style={{ color: 'orange' }}>正在过滤数据…</span>}
            <p>匹配到 {list.length} 条结果</p>
            <List list={list} />
        </div>
    );
}

export default App;
```

✅ 体验：
输入框输入即时响应；
列表过滤是延后执行的，界面不会卡顿。



#### **<font color='#10c300'>3）工作原理</font>**

```
用户输入 → 立即更新输入框（紧急更新）
        ↓
React 空闲时 → 执行过滤逻辑（过渡更新）
        ↓
过渡完成 → isPending = false，列表更新
```

当 `startTransition` 内的更新在进行时：

- React 会优先处理交互事件（比如输入框），
- 暂缓其他较慢的渲染任务，
- 确保界面流畅。



#### **<font color='#10c300'>4）与useDeferredValue的对比</font>**

- **`useDeferredValue`** 主要用于延迟单个值的更新，适用于值的变化直接影响到 UI 渲染但又不是立即必要的更新。
- **`useTransition`** 用于告诉 React 哪些更新是低优先级的，并可使用 `isPending` 状态反馈更新是否处于等待状态，适用于控制大块区域或复杂状态的更新行为，允许你在触发更新时提供更自然的用户体验。

| 对比项         | `useTransition`                | `useDeferredValue`     |
| -------------- | ------------------------------ | ---------------------- |
| 控制对象       | 一整段状态更新（`setState`）   | 一个状态值             |
| 延迟方式       | 手动包裹更新                   | 自动使值延迟生效       |
| 返回值         | `[isPending, startTransition]` | `deferredValue`        |
| 是否有加载状态 | ✅ 有 `isPending`               | ❌ 需手动比较           |
| 使用场景       | 你要延迟执行某个更新逻辑       | 你要延迟某个值传递下去 |

#### **<font color='#10c300'>5）注意事项</font>**

- `useTransition` 只在 React 18+ 有效果；
- 它不会跳过渲染，只是调度顺序不同；
- 不适用于动画或时间延迟，只改变更新优先级；
- 不要滥用——仅在性能瓶颈或卡顿时使用。

#### **<font color='#10c300'>6）总结</font>**

| 项目     | 内容                                     |
| -------- | ---------------------------------------- |
| Hook 名  | `useTransition()`                        |
| 返回值   | `[isPending, startTransition]`           |
| 主要作用 | 将状态更新标记为“过渡更新”               |
| 优点     | 减少卡顿、提高交互响应                   |
| 应用场景 | 搜索、筛选、大量渲染、分页、异步数据加载 |
| 特点     | 并发渲染特性，不阻塞用户输入             |

<br>

### **<font color='red'>4.11 useImperativeHandle - 自定义 ref 暴露的方法</font>**

`useImperativeHandle` 用于自定义通过 ref 暴露给父组件的实例值。它通常与 `forwardRef` 配合使用（React 19 后 ref 可作为 prop 直接传递）。[forwardRef用法](#forwardRef)

---

#### **<font color='#10c300'>1）基本语法</font>**

```jsx
useImperativeHandle(ref, createHandle, deps?)
```

- **ref**：从 `forwardRef` 或 props 传入的 ref
- **createHandle**：返回暴露给父组件的对象
- **deps**：依赖数组，类似 `useEffect`

#### **<font color='#10c300'>2）React 19 之前的写法（forwardRef）</font>**

```jsx
import { useRef, useImperativeHandle, forwardRef } from 'react';

// 子组件
const Child = forwardRef((props, ref) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
        getValue: () => inputRef.current.value
    }), []);

    return <input ref={inputRef} placeholder="输入内容" />;
});

// 父组件
function Parent() {
    const childRef = useRef(null);

    const handleClick = () => {
    // 调用子组件暴露的方法
        childRef.current.focus();
        console.log(childRef.current.getValue());
    };

    return (
        <>
            <Child ref={childRef} />
            <button onClick={handleClick}>操作子组件</button>
        </>
    );
}

export default Parent
```

#### **<font color='#10c300'>3）React 19 的简化写法</font>**

```jsx
import { useRef, useImperativeHandle } from 'react';

// 子组件
function Child({ ref }) {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        clear: () => { if (inputRef.current) inputRef.current.value = ''; }
    }), []);

    return <input ref={inputRef} />;
}

// 父组件
function Parent() {
    const childRef = useRef(null);

    const handleClick = () => {
    // 调用子组件暴露的方法
        childRef.current.focus();
    };

    return (
        <>
            <Child ref={childRef} />
            <button onClick={handleClick}>操作子组件</button>
        </>
    );
}

export default Parent
```

#### **<font color='#10c300'>4）使用场景</font>**

**1️⃣ 封装第三方组件**

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    // 只暴露特定的 API，隐藏内部实现
    focus: () => inputRef.current.focus(),
    scrollIntoView: () => inputRef.current.scrollIntoView({ behavior: 'smooth' })
  }));
  
  return <input ref={inputRef} {...props} />;
});
```

**2️⃣动画控制**

```jsx
const AnimatedBox = forwardRef((props, ref) => {
  const elementRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    shake: () => {
      elementRef.current?.classList.add('shake-animation');
      setTimeout(() => {
        elementRef.current?.classList.remove('shake-animation');
      }, 500);
    },
    highlight: () => {
      elementRef.current?.classList.add('highlight');
    }
  }));
  
  return <div ref={elementRef}>{props.children}</div>;
});
```

#### **<font color='#10c300'>5）注意事项</font>**

1. **避免过度使用**：优先通过 props 和 state 进行数据流通信，refs 是"逃生舱"

2. **返回值限制**：`createHandle` 返回的对象中不能包含原始类型的 ref 值（如 `{ current: ... }`），只能是普通函数或值

3. **TypeScript 支持**：

   ```jsx
   interface ChildRef {
       focus: () => void;
       clear: () => void;
   }
   
   const Child = forwardRef<ChildRef, Props>((props, ref) => {
       useImperativeHandle(ref, () => ({
           focus: () => {},
           clear: () => {}
       }));
   });
   ```

4. **与 `useRef` 配合**：通常在子组件内部维护实际 DOM ref，再通过 `useImperativeHandle` 选择性暴露方法

5. **清理逻辑**：如果暴露的方法涉及副作用（如定时器），记得在组件卸载时清理

这个模式适用于需要**命令式操作**（如聚焦、播放、滚动、触发动画）但不想暴露整个 DOM 节点的场景。















<br>

### **<font color='red'>4.20 Hooks 组合实战</font>**

#### **<font color='#10c300'>1）useReducer + useContext</font>**

用 **`useReducer` + `useContext`** 实现一个**全局状态管理系统**，就像一个轻量版 Redux。

我们以“主题切换（深色 / 浅色）”为例 👇

##### **<font color='cornflowerblue'>🎯 功能目标</font>**

- 页面上有多个组件；
- 这些组件都能感知当前主题；
- 点击按钮可以在浅色/深色模式之间切换；
- 所有组件自动更新，**不用手动传 props**。

##### **<font color='cornflowerblue'>🧱项目结构</font>**

```
├── 📁 components/                   # 组件
│   ├── 📄 Header.jsx               # 子组件，读取主题并展示
│   ├── 📄 Content.jsx              # 子组件，读取主题并展示
├── 📁 context/                      # Context
│   ├── 📄 index.js                 # 创建 Context + Reducer
└── 📄 App.jsx            
```

`src\App.jsx`

```jsx
import { ThemeProvider } from './context/index'; // 引入上面的 Provider
import Header from './components/Header';
import Content from './components/Content';

function App() {
    return (
        <ThemeProvider>
            <div>
                <Header />
                <Content />
            </div>
        </ThemeProvider>
    );
}

export default App;
```

`src\context\index.js`

```jsx
import { createContext, useReducer, useContext } from 'react';

// 1️⃣ 初始状态
const initialState = { theme: 'light' };

// 2️⃣ 定义 reducer：根据 action.type 决定如何更新状态
function themeReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return { theme: state.theme === 'light' ? 'dark' : 'light' };
        default:
            return state;
    }
}

// 3️⃣ 创建 Context
const ThemeContext = createContext(null);

// 4️⃣ 创建 Provider 组件（状态提供者）
export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, initialState);
    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 5️⃣ 自定义 Hook，方便子组件使用
export function useTheme() {
    return useContext(ThemeContext);
}
```

`src\components\Header.jsx`

```jsx
import { useTheme } from '../context/index';

export default function Header() {
    const { state, dispatch } = useTheme();

    return (
        <header
            style={{
                background: state.theme === 'light' ? '#f0f0f0' : '#222',
                color: state.theme === 'light' ? '#000' : '#fff',
                padding: '10px',
                textAlign: 'center'
            }}
        >
            <h1>当前主题：{state.theme}</h1>
            <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
                切换主题
            </button>
        </header>
    );
}
```

`src\components\Content.jsx`

```jsx
import { useTheme } from '../context/index';

export default function Content() {
    const { state } = useTheme();

    return (
        <div
            style={{
                background: state.theme === 'light' ? '#fff' : '#333',
                color: state.theme === 'light' ? '#000' : '#fff',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <p>这里是主要内容区 —— 当前是 {state.theme} 模式</p>
        </div>
    );
}
```

- 页面加载时默认“浅色”；
- 点击“切换主题”按钮；
- `dispatch` 触发 `TOGGLE_THEME`；
- `reducer` 更新 theme → 所有使用该状态的组件自动重新渲染；
- 所有组件同步变成“深色模式”。

<br>

## 五、 HOC 高阶组件

高阶组件是一个**函数**，它接收一个组件并返回一个新的组件，例如：

### **<font color='red'>5.1 React.memo</font>**

`memo` 是一个 **高阶组件**，用于**优化函数组件的重新渲染**。只有当它的 **props 发生变化** 时，React 才会重新渲染这个组件。否则，它会直接复用上一次的渲染结果，提高性能。

#### **<font color='#10c300'>1）基本语法</font>**

```js
// 直接在父组件将引入的子组件MyComponent使用memo缓存
const MemoizedComponent = React.memo(MyComponent);
```

或者定义时直接使用：

```js
// 直接在子组件导出的时候就对当前组件MyComponent使用memo缓存
export default React.memo(MyComponent);
```



#### **<font color='#10c300'>2）基本示例</font>**

```js
// app.jsx
import { useState } from "react";
import Child from "./components/Child";


function App() {
    const [data, setData] = useState("父组件数据");
    const [b] = useState(100)
    console.log('父组件渲染了');

    return (
        <>
            <button onClick={() => setData(`新数据${new Date().getTime()}`)}>我是App：{data}</button>
            <Child b={b}/>
        </>
    );
}

export default App;

============================================分割线==============================================
    
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

**🔍 输出结果：**

- 初始化的时候父组件和子组件都渲染
- 触发父组件的点击事件，data状态发生变化，b状态未变，子组件未触发渲染

如果用的是普通组件，哪怕 props 一样，也会重新渲染。



#### **<font color='#10c300'>3）工作原理</font>**

`React.memo` 在渲染后，会 **保存上一次的 props**。
下一次组件渲染时，它会做一个 **浅比较（shallow compare）**：

- 如果旧的 props 与新的 props 内容一致 → 跳过渲染；
- 如果不同 → 重新渲染。

> 默认比较是浅层（只比较基础类型或引用是否相同），
> 对象/数组类型的 props 如果新建了对象，就会认为不同。



#### **<font color='#10c300'>4）自定义比较函数</font>**	

有时候你希望控制“什么算变”，可以在第二个参数传入自定义比较函数：

```js
const Memoized = React.memo(
  MyComponent,
  (prevProps, nextProps) => {
    // 返回 true 表示不需要重新渲染（props 相等）
    // 返回 false 表示需要重渲染
    return prevProps.id === nextProps.id;
  }
);
```



#### **<font color='#10c300'>5）常见优化场景</font>**

| 场景                | 说明                               |
| ------------------- | ---------------------------------- |
| 列表项组件          | 列表中有大量子组件，父组件频繁更新 |
| 表单组件            | 输入变化导致整个页面重渲染         |
| 复杂组件            | 内部渲染代价高但 props 很稳定      |
| 与 useCallback 搭配 | 保持传入函数引用一致，避免误触更新 |



#### **<font color='#10c300'>6）与 useCallback 和 useMemo 的配合</font>**

`React.memo` 只关心 props 是否变化。但是如果传入的是一个函数，每次渲染函数都是新引用，就会导致重新渲染。函数作为 `props` 的“引用不稳定”问题

```jsx
import {useState} from "react";
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

**<font color='#00A6ED'>🌈原因：函数的引用每次都变</font>**

在 React 中，函数也是一种对象，而对象/函数的「引用地址」每次都会变。当父组件重新运行时 都会创建一个 **新函数对象**，和之前的不是同一个引用。

React.memo 的默认比较方式是浅比较（shallow compare）

```js
oldProps.onClick === newProps.onClick
```

而因为每次重新渲染时，这个函数都是新建的，所以结果是 `false`，导致 `Child` 无论 props 内容是否逻辑相同，都会被认为变动了。

🤏**解决方案：**通过 `useCallback` 来让函数在依赖不变的情况下，保持同一个引用

```jsx
import {useCallback, useState} from "react";

unction Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []) // 👈 引用稳定

  return (
    <div onClick={handleClick}>
      <Child count={count} onClick={handleClick} />
    </div>
  );
}
export default Parent;
```



#### **<font color='#10c300'>7）注意事项</font>**

| 项目                    | 说明                                   |
| ----------------------- | -------------------------------------- |
| 比较方式                | 浅比较（对象或函数需注意引用变化）     |
| 不适合滥用              | 若组件很轻量，比较成本可能高于渲染收益 |
| useContext 更新仍会触发 | Context 更新时会重新渲染子节点         |
| 不缓存 state            | 仅缓存渲染结果，与内部状态无关         |



#### **<font color='#10c300'>8）总结</font>**

| 项目     | 内容                                         |
| -------- | -------------------------------------------- |
| 作用     | 缓存组件渲染结果，避免不必要渲染             |
| 类型     | 高阶组件（HOC）                              |
| 比较机制 | 浅层比较 props（可自定义）                   |
| 推荐搭配 | `useCallback`, `useMemo` 保持 props 引用稳定 |
| 适用场景 | 子组件稳定、父组件频繁渲染、性能优化         |

------

🌟 **一句话总结：**

> `React.memo` 就像是函数组件的“PureComponent”。
> 当 props 没变时，跳过渲染，提高性能。

---

<br>

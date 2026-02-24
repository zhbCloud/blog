---
title: React 完全指南 (React 18 & 19)
img: /static/45.webp
categories: 框架与生态
tags:
  - react18
  - react19
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

<br>

## **一、React 简介**

### **<font color='red'>1.1 什么是 React？</font>**

React 是由 Facebook（现 Meta）开发的一个用于构建用户界面的 JavaScript 库。它的核心思想是：

- **组件化**：将 UI 拆分成独立、可复用的组件
- **声明式**：描述 UI 应该是什么样子，而不是如何改变它
- **单向数据流**：数据从父组件流向子组件，使应用更可预测

### **<font color='red'>1.2 为什么选择 React？</font>**

| 优势        | 说明                         |
| ----------- | ---------------------------- |
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

### **<font color='red'>2.4 跨域请求代理配置</font>**

在前后端分离跨域开发时，通常需要在本地开发服务器中配置代理解决跨域问题。

#### **<font color='#10c300'>1）Vite 配置跨域代理</font>**

修改根目录下的 `vite.config.js` 文件，在 `server` 选项中添加用户指定的 `proxy`：

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://jsonplaceholder.typicode.com", // 实际后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 如果后端接口本身不带 /api 前缀
      },
    },
  },
});
```

#### **<font color='#10c300'>2）Create React App 配置跨域代理</font>**

CRA 官方推荐通过在 src 目录下创建 `setupProxy.js` 来配置代理底层中间件。

1. 安装代理插件：

```bash
npm install http-proxy-middleware --save
```

2. 在 `src/` 目录中新建 `setupProxy.js`（注意：由于它是 Node 环境直接读取配置，只能使用 CommonJS 规范），写入以下配置：

```javascript
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://jsonplaceholder.typicode.com", // 实际后端地址
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // 路径重写，去掉 /api 前缀
      },
    }),
  );
};
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
import { Component } from "react";

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
    <UserCard name="张三" age={25} isAdmin={true} hobbies={["读书", "游戏"]} />
  );
}

// 子组件
function UserCard({ name, age, isAdmin, hobbies }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>年龄: {age}</p>
      <p>身份: {isAdmin ? "管理员" : "普通用户"}</p>
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
import { useState } from "react";

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
  const [user, setUser] = useState({ name: "张三", age: 25 });

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
    setCount((prevCount) => prevCount + 1);
  };
}
```

<br>

### **<font color='red'>3.5 事件处理</font>**

```jsx
function EventExample() {
  // 点击事件
  const handleClick = (e) => {
    console.log("按钮被点击", e);
  };

  // 带参数的事件处理
  const handleDelete = (id) => {
    console.log("删除项目:", id);
  };

  // 表单输入
  const [value, setValue] = useState("");
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
    { id: 1, text: "学习 React", done: false },
    { id: 2, text: "写代码", done: true },
    { id: 3, text: "看文档", done: false },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        // key 必须是唯一且稳定的标识符
        <li key={todo.id} className={todo.done ? "completed" : ""}>
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
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>点击了 {count} 次</button>;
}

export default Counter;
```

#### **<font color='#10c300'>3）核心特性详解</font>**

**1️⃣ 状态是隔离的**

每个组件实例拥有独立的状态，互不影响。

---

**2️⃣ 状态更新是替换而非合并**

与 class 组件的 `setState` 不同，`useState` 不会自动合并对象：

```jsx
const [user, setUser] = useState({ name: "张三", age: 20 });

// ❌ 错误：这会丢失 age 字段
setUser({ name: "李四" });

// ✅ 正确：需要手动展开
setUser({ ...user, name: "李四" });
```

---

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
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return <button onClick={incrementTwice}>+2</button>;
}
```

---

**4️⃣惰性初始化**

如果初始状态需要复杂计算，使用函数避免每次渲染都执行：

```jsx
// ❌ 每次渲染都会执行 heavyComputation()
const [data, setData] = useState(heavyComputation());

// ✅ 只在初始渲染执行一次，因为初始化的时候函数都会创建新的引用地址
const [data, setData] = useState(() => heavyComputation());
```

---

**5️⃣数组/对象更新技巧**

```jsx
const [list, setList] = useState([1, 2, 3]);
const [map, setMap] = useState(new Map());

// 数组操作
const addItem = (item) => setList([...list, item]);
const removeItem = (index) => setList(list.filter((_, i) => i !== index));
const updateItem = (index, value) =>
  setList(list.map((item, i) => (i === index ? value : item)));

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
const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

// 对象类型
interface User {
  id: number;
  name: string;
}
const [user, setUser] = useState<User | null>(null);

// 如果初始值为 undefined，需要显式指定类型
const [value, setValue] = useState<string>();
```

#### **<font color='#10c300'>5）常见陷阱与解决方案⚠️</font>**

**陷阱 1️⃣：闭包过期**

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // 永远是旧值
    setCount(count + 1); // 永远基于初始值
  }, 1000);
}, []); // 空依赖导致闭包陷阱

// 解决：使用函数式更新或正确设置依赖
useEffect(() => {
  const timer = setInterval(() => {
    setCount((c) => c + 1); // 总是获取最新值
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

---

**陷阱 2️⃣：异步更新特性**

状态更新是异步且批处理的，不能立即获取新值：

```jsx
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // 还是旧值！

  // 如需基于新值操作，使用 useEffect 或函数式更新
};
```

---

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

**1️⃣ 合理拆分状态：** 不要把所有状态塞在一个对象里，独立变化的状态应该独立声明

```jsx
// ❌ 过度聚合
const [state, setState] = useState({ user: null, posts: [], loading: false });

// ✅ 独立声明
const [user, setUser] = useState(null);
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);
```

---

**2️⃣ 使用自定义 Hook 封装状态逻辑**：

```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const inc = () => setCount((c) => c + 1);
  const dec = () => setCount((c) => c - 1);
  const reset = () => setCount(initial);
  return { count, inc, dec, reset };
}
```

---

**3️⃣ 避免深层嵌套状态**：复杂状态考虑使用 `useReducer`

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

- **参数1 (函数)：**定义的初始值，可以是任意数据，像数字，字符串或者数组和对象。
- **参数2 (依赖项)：**
  1. `无参数`：每次渲染后都执行。
  2. `空数组`：仅在挂载时执行一次。
  3. `依赖参数`：依赖参数变化时执行（首次渲染也会执行一次）。

#### **<font color='#10c300'>2）三种执行时机</font>**

**1️⃣ 不带依赖 → 每次渲染都执行**

```js
useEffect(() => {
  console.log("每次渲染都执行");
});
```

不写依赖数组时，意味着：

- 每次组件**挂载和更新**都会运行。
  ⚠️ 如无必要，不建议省略依赖数组，会影响性能。

---

**2️⃣ 组件挂载时执行（只执行一次）**

```jsx
useEffect(() => {
  console.log("组件挂载");
  return () => {
    console.log("组件卸载");
  };
}, []); // 空依赖数组 → 只执行一次
```

可类比于：

- 挂载时执行：`componentDidMount`
- 卸载时清理：`componentWillUnmount`

---

**3️⃣ 特定依赖变化时执行**

```jsx
useEffect(() => {
  console.log(`count 更新了：${count}`);
}, [count]); // 👈 当 count 改变重新运行副作用逻辑
```

#### **<font color='#10c300'>3）清理函数（Cleanup）</font>**

当**`取消订阅`**、**`清除定时器`**等，应该在组件卸载时清理，以防止内存泄漏。

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  // 清理函数：组件卸载或依赖变化前执行
  return () => {
    clearInterval(timer);
    console.log("定时器已清理");
  };
}, []);
```

**🔍执行时机**：

- 组件卸载时
- 依赖变化导致重新执行 effect 之前

#### **<font color='#10c300'>4）实际应用场景</font>**

**1️⃣ 数据获取（需处理竞态）**

```jsx
useEffect(() => {
  let cancelled = false;

  async function fetchData() {
    const data = await api.getUser(userId);

    // 防止竞态条件：如果组件已卸载或 userId 已变，忽略结果
    if (!cancelled) {
      setUser(data);
    }
  }

  fetchData();

  return () => {
    cancelled = true; // 取消标志
  };
}, [userId]);
```

---

**2️⃣事件监听**

```jsx
useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);

  // 必须清理，否则重复挂载会添加多个监听器
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
```

---

**3️⃣DOM 操作**

```jsx
useEffect(() => {
  // 直接操作 DOM（应尽量避免，但在与第三方库集成时有用）
  const element = document.getElementById("modal");
  element?.classList.add("active");

  return () => {
    element?.classList.remove("active");
  };
}, []);
```

#### **<font color='#10c300'>5）常见陷阱⚠️</font>**

**1️⃣无限循环**

```jsx
// ❌ 错误：setState 导致渲染，渲染触发 effect，effect 又 setState
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ 正确：使用函数式更新或条件判断
useEffect(() => {
  const timer = setTimeout(() => setCount((c) => c + 1), 1000);
  return () => clearTimeout(timer);
}, []); // 或 [count] 如果需要响应外部 count 变化
```

---

**2️⃣依赖缺失（ ESLint 会警告）**

`eslint-plugin-react-hooks` 自动检查依赖。

```js
// ❌ 遗漏依赖：callback 变化时 effect 不会更新
useEffect(() => {
  fetchData(query, callback);
}, [query]); // 缺少 callback

// ✅ 解决方案 1：添加所有依赖
useEffect(() => {
  fetchData(query, callback);
}, [query, callback]);

// ✅ 解决方案 2：如果 callback 不稳定，使用 ref
const callbackRef = useRef(callback);
useEffect(() => {
  callbackRef.current = callback;
}, [callback]);

useEffect(() => {
  fetchData(query, (data) => callbackRef.current(data));
}, [query]);
```

---

**3️⃣闭包陷阱（stale closure）**

```js
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // 永远是旧值！
  }, 1000);
}, []); // 空依赖导致闭包捕获初始 count

// ✅ 解决方案 1：添加依赖
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count);
  }, 1000);
}, [count]);

// ✅ 解决方案 2：使用 ref 获取最新值
const countRef = useRef(count);
useEffect(() => {
  countRef.current = count;
}, [count]);

useEffect(() => {
  const timer = setInterval(() => {
    console.log(countRef.current); // 总是最新值
  }, 1000);
}, []);
```

---

**4️⃣async/await 直接使用**

```jsx
// ❌ 错误：useEffect 不能返回 Promise（async 函数隐式返回 Promise）
useEffect(async () => {
  const data = await fetchData();
}, []);

// ✅ 正确：内部定义 async 函数
useEffect(() => {
  async function loadData() {
    const data = await fetchData();
    setData(data);
  }
  loadData();
}, []);
```

#### **<font color='#10c300'>6）useEffect vs useLayoutEffect</font>**

```jsx
import { useLayoutEffect } from "react";

// useEffect：浏览器绘制完成后执行（不阻塞渲染）
// useLayoutEffect：浏览器绘制之前执行（阻塞渲染，避免闪烁）
useLayoutEffect(() => {
  // 用于需要同步执行且影响视觉的 DOM 操作
  const width = element.getBoundingClientRect().width;
  setWidth(width);
}, []);
```

**使用建议**：

- 优先使用 `useEffect`
- 仅在出现视觉闪烁（如从服务端渲染恢复时需要同步计算布局）时使用 `useLayoutEffect`

#### **<font color='#10c300'>7）TypeScript 支持</font>**

```tsx
// 清理函数类型会自动推断
useEffect(() => {
  const subscription = api.subscribe();

  return () => {
    subscription.unsubscribe(); // 类型安全
  };
}, []);

// 依赖数组严格类型检查
useEffect(() => {
  console.log(name);
}, [name]); // name 必须是依赖项
```

#### **<font color='#10c300'>8）最佳实践</font>**

1️⃣**单一职责**：一个 `useEffect` 只做一件事，便于管理和清理

```js
// ❌ 混合多个不相关逻辑
useEffect(() => {
  fetchUser();
  const timer = setInterval(poll, 5000);
  document.title = "New Page";

  return () => {
    clearInterval(timer);
  };
}, []);

// ✅ 分离成多个 effect
useEffect(() => {
  fetchUser();
}, []);
useEffect(() => {
  const timer = setInterval(poll, 5000);
  return () => clearInterval(timer);
}, []);
useEffect(() => {
  document.title = "New Page";
}, []);
```

---

2️⃣**自定义 Hook 封装副作用**

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", update);
    update();

    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
```

---

3️⃣**对象/数组依赖使用 useMemo**

```
// ❌ 每次渲染都是新对象，导致 effect 每次都执行
useEffect(() => {
    fetchData(options);
}, [{ page: 1, size: 10 }]);

// ✅ 使用 useMemo 稳定引用
const options = useMemo(() => ({ page: 1, size: 10 }), []);
useEffect(() => {
    fetchData(options);
}, [options]);
```

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

#### **<font color='#10c300'>1）基础用法(使用步骤)</font>**

**Step 1️⃣：创建 Context**

```jsx
// src\context\index.jsx
import { createContext } from "react";
const MyContext = createContext();
export { MyContext };
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
function Child({ children }) {
  return (
    <>
      <p>我是子组件</p>
      {children}
    </>
  );
}

export default Child;
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

#### **<font color='#10c300'>2）自定义 Hook 封装（推荐）</font>**

直接 `useContext` 需要在每个组件处理 `null`，封装更安全：

```jsx
// contexts/ThemeContext.js
import { createContext, useState, useContext, useMemo } from "react";

const ThemeContext = createContext(null);

// 自定义 Hook，内置错误处理
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme 必须在 ThemeProvider 内部使用");
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // 使用 useMemo 防止不必要的重渲染
  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
```

```jsx
// app.vue 使用：
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

function Button() {
  const { theme, toggle } = useTheme(); // 直接使用，类型安全
  return <button onClick={toggle}>{theme}</button>;
}

export default function App() {
  return (
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  );
}
```

#### **<font color='#10c300'>3）性能优化（关键）</font>**

**Context 的问题**：一旦 `value` 变化，**所有**消费组件都会重渲染，即使只使用了部分数据。

**方案1️⃣：拆分 Context（推荐）**

将高频变化和低频变化分离：

```jsx
// ❌ 避免单一 Context 包含所有状态
const AppContext = createContext({
  user: {},
  theme: "",
  notifications: [],
  // ... 所有状态
});

// ✅ 拆分为多个 Context
const UserContext = createContext(null);
const ThemeContext = createContext(null);
const NotificationContext = createContext(null);

// 组件只订阅需要的 Context
function UserAvatar() {
  const user = useContext(UserContext); // 只有 user 变化时重渲染
  return <img src={user.avatar} />;
}
```

---

**方案2️⃣：使用 React.memo**

```jsx
function ExpensiveComponent() {
  const { theme } = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}

// 虽然 context 变化，但 props 没变时跳过渲染
export default React.memo(ExpensiveComponent);
```

---

**方案3️⃣：使用第三方状态管理**

如果频繁更新（如滚动位置、动画状态），使用 Zustand、Jotai 或 Redux，它们支持细粒度订阅。

**useContext + useReducer（简易 Redux）**

```jsx
// contexts/StoreContext.js
import { createContext, useReducer, useContext, useMemo } from "react";

const StoreContext = createContext(null);

const initialState = { count: 0, user: null };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "setUser":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// 自定义 Hooks
export function useStore() {
  const [state, dispatch] = useContext(StoreContext);
  return { state, dispatch };
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 将 state 和 dispatch 都放入 context
  const value = useMemo(() => [state, dispatch], [state]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

// app.jsx
import { StoreProvider, useStore } from "./contexts/ThemeContext";

// 使用
function Counter() {
  const { state, dispatch } = useStore();
  return (
    <button onClick={() => dispatch({ type: "increment" })}>
      {state.count}
    </button>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Counter />
    </StoreProvider>
  );
}
```

#### **<font color='#10c300'>4）TypeScript 支持</font>**

```tsx
interface User {
  id: number;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 类型安全的自定义 Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Provider 组件
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: (u: User) => {
        setUser(u);
      },
      logout: () => {
        setUser(null);
      },
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

#### **<font color='#10c300'>5）常见陷阱⚠️</font>**

**1️⃣Context 默认值陷阱**

```jsx
// 如果不提供 Provider，会使用默认值
const MyContext = createContext({ value: 0 });

function Component() {
  const ctx = useContext(MyContext);
  // 如果忘记包裹 Provider，ctx 是 { value: 0 }
  // 这可能隐藏错误，建议默认值设为 null 并检查
}
```

---

**2️⃣不必要的重渲染**

```jsx
function App() {
  const [count, setCount] = useState(0);

  // ❌ 每次渲染都是新对象，导致所有消费者重渲染
  return (
    <ThemeContext.Provider value={{ theme: "dark", count }}>
      <Child />
    </ThemeContext.Provider>
  );

  // ✅ 使用 useMemo 缓存
  const value = useMemo(() => ({ theme: "dark", count }), [count]);
  return (
    <ThemeContext.Provider value={value}>
      <Child />
    </ThemeContext.Provider>
  );
}
```

---

**3️⃣在条件语句中使用**

```jsx
function Component() {
  if (condition) {
    const ctx = useContext(MyContext); // ❌ Hook 必须在顶层调用
  }
  // ✅ 始终在组件顶层调用
  const ctx = useContext(MyContext);
  if (!ctx) return null;
}
```

#### **<font color='#10c300'>6）何时使用 vs 不用</font>**

**1️⃣适合使用：**

- 主题、语言等全局配置
- 认证状态（用户登录信息）
- 路由状态
- 需要在深层组件访问的共享状态

**2️⃣避免使用：**

- 仅父子组件通信（直接用 props）
- 频繁更新的状态（如滚动、输入、动画，考虑使用订阅模式或外部状态管理）
- 简单表单状态（用本地 useState）

**替代方案👇**

- 简单共享：props drilling、组合组件（composition）
- 高频更新：Zustand、Jotai、Recoil、Redux
- 服务端状态：React Query、SWR

#### **<font color='#10c300'>7）高级模式：Render Props 转 Context</font>**

将旧版 Render Props 组件转为 Hook：

```jsx
// 旧方式
<MouseTracker>
  {({ x, y }) => (
    <div>
      {x}, {y}
    </div>
  )}
</MouseTracker>;

// 新方式：结合 Context 和 Hook
const MouseContext = createContext({ x: 0, y: 0 });

function useMouse() {
  return useContext(MouseContext);
}

// 使用
function Component() {
  const { x, y } = useMouse(); // 更简洁的 API
  return (
    <div>
      {x}, {y}
    </div>
  );
}
```

<br>

### **<font color='red'>4.4 useMemo- 缓存计算结果</font>**

`useMemo` 用于缓存昂贵的计算结果，避免每次渲染都重新计算，同时保持**对象/数组的引用**稳定。

换句话说：

- 如果依赖没变 → 直接用上次计算的结果；
- 如果依赖变了 → 重新计算并返回新结果。

它可以帮你显著减少不必要的计算或对象重建。

`useMemo`的理念是同步的，**useMemo不能进行一些额外的副操作，比如网络请求等**。

---

#### **<font color='#10c300'>1）基本语法</font>**

```js
useMemo(() => {
  return 值;
}, [依赖项]);
```

- 参数1 (工厂函数)：一个返回值的函数（执行计算）
- 参数2 (依赖数组)：依赖数组，当其中某项改变时才重新计算

返回值：**缓存的计算结果**。

#### **<font color='#10c300'>2）使用场景示例</font>**

**1️⃣ 复杂计算缓存**

未使用`useMemo`的时候改变颜色，也会执行ComputeTotal价格的计算。

```jsx
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
  const totalPrice = useMemo(() => ComputeTotal(price, count), [price]);

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

---

**2️⃣ 保持引用稳定，避免重渲染（关键用途）**

**示例一：**

```jsx
function ChartComponent({ data, options }) {
  // ❌ 每次渲染都是新对象，导致 useEffect 无限循环或 Chart 组件重渲染
  const config = { type: "line", data, ...options };

  // ✅ 依赖不变时保持同一引用
  const config = useMemo(
    () => ({
      type: "line",
      data,
      options: {
        responsive: true,
        ...options,
      },
    }),
    [data, options],
  );

  useEffect(() => {
    // 现在只在 config 真正变化时执行
    chartRef.current.update(config);
  }, [config]);

  return <canvas ref={canvasRef} />;
}
```

**示例二：**

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

`useMemo` 保证每次渲染中 `options` 的引用稳定，`React.memo` 会认为 props 没变，从而跳过重新渲染。

---

**3️⃣ 缓存组件(极少用)**

```jsx
import { useState, useMemo } from "react";
import Child from "./Child";

function App() {
  const [price, setPrice] = useState(100);
  const [count] = useState(1);
  const [color, setColor] = useState("red");

  const memoizedChild = useMemo(
    () => <Child count={count} price={price} />,
    [count, price],
  );

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

#### **<font color='#10c300'>3）与 useCallback 的关系</font>**

`useCallback` 本质上是 `useMemo` 的语法糖：

```jsx
// 这两者是等价的
useCallback(fn, deps);
useMemo(() => fn, deps);
```

**选择原则**：

- 缓存**函数** → `useCallback`
- 缓存**值**（对象、数组、计算结果）→ `useMemo`

#### **<font color='#10c300'>4）实际示例：搜索过滤</font>**

**完整案例：**https://www.yuque.com/zhbiao/qr34us/qk5da4gmpqzhat4s?singleDoc#wkQxl

```jsx
function SearchResults({ query, items }) {
  const [highlightIndex, setHighlightIndex] = useState(0);

  // 搜索结果缓存
  const results = useMemo(() => {
    if (!query) return [];

    const startTime = performance.now();
    const filtered = items.filter((item) =>
      item.text.toLowerCase().includes(query.toLowerCase()),
    );

    console.log(`搜索耗时: ${performance.now() - startTime}ms`);
    return filtered;
  }, [query, items]);

  // 高亮项缓存（基于 results，形成计算链）
  const highlightedItem = useMemo(() => {
    return results[highlightIndex] || null;
  }, [results, highlightIndex]);

  return (
    <div>
      {results.map((item, idx) => (
        <div
          key={item.id}
          className={idx === highlightIndex ? "highlight" : ""}
        >
          {item.text}
        </div>
      ))}
      <Preview data={highlightedItem} />
    </div>
  );
}
```

#### **<font color='#10c300'>4）TypeScript 支持</font>**

```jsx
interface User {
    id: number;
    name: string;
    score: number;
  }

  // 自动推断返回类型为 number
  const averageScore = useMemo(() => {
    if (users.length === 0) return 0;
    return users.reduce((sum, u) => sum + u.score, 0) / users.length;
  }, [users]);

  // 复杂对象类型
  const processedData = useMemo<{ labels: string[]; values: number[] }>(() => {
    return {
      labels: data.map(d => d.date),
      values: data.map(d => d.value)
    };
  }, [data]);
```

#### **<font color='#10c300'>5）常见陷阱⚠️</font>**

**1️⃣过度使用（负优化）**

`useMemo` 本身也有开销（依赖比较、缓存存储），简单计算无需缓存：

```jsx
// ❌ 没必要：加法计算比 useMemo 开销更小
const sum = useMemo(() => a + b, [a, b]);

// ✅ 直接使用
const sum = a + b;
```

**使用时机**：

- 计算复杂度 > O(n) 且 n 较大
- 需要保持对象引用稳定（用于 props 或依赖数组）
- 明确测量到性能瓶颈（React DevTools Profiler）

---

**2️⃣依赖数组遗漏**

```jsx
// ❌ 遗漏 user，导致使用旧的 user 数据
const fullName = useMemo(() => {
  return `${user.firstName} ${lastName}`; // user 来自外层作用域
}, [lastName]); // 缺少 user

// ✅ 完整依赖
const fullName = useMemo(() => {
  return `${user.firstName} ${lastName}`;
}, [user, lastName]);
```

---

**3️⃣在 useMemo 里执行副作用**

```jsx
// ❌ 错误：useMemo 应该纯函数，不执行副作用
const data = useMemo(() => {
  localStorage.setItem("key", value); // 副作用！
  return process(value);
}, [value]);

// ✅ 副作用放在 useEffect
useEffect(() => {
  localStorage.setItem("key", value);
}, [value]);

const data = useMemo(() => process(value), [value]);
```

---

**4️⃣ 返回函数时的混淆**

```jsx
// ❌ 这样缓存的是函数的返回值，不是函数本身
const handler = useMemo(() => {
  return () => console.log("clicked"); // 返回一个函数
}, []);

// ✅ 如果真要缓存函数，直接用 useCallback
const handler = useCallback(() => {
  console.log("clicked");
}, []);
```

#### **<font color='#10c300'>6）高级模式</font>**

**1️⃣计算链**

`useMemo` 可以依赖其他 `useMemo` 的结果，形成计算链：

```jsx
const rawData = useMemo(() => fetchData(), []);
const processedData = useMemo(() => cleanData(rawData), [rawData]);
const statistics = useMemo(
  () => calculateStats(processedData),
  [processedData],
);
```

---

**2️⃣条件性缓存**

```jsx
const value = useMemo(() => {
  if (!enabled) return null; // 提前返回
  return heavyComputation(data);
}, [enabled, data]);
```

---

**3️⃣与 useEffect 配合防止无限循环**

```jsx
const userIds = useMemo(() => users.map((u) => u.id), [users]);

// 现在 userIds 引用稳定，不会导致 effect 每次都执行
useEffect(() => {
  fetchDetails(userIds);
}, [userIds]);
```

<br>

🌟 **一句话总结：**

`useMemo` 用来解决"因为对象引用变化导致的无效重渲染"比解决"重复计算"更常见

<br>

### **<font color='red'>4.5 useCallback- 缓存函数引用</font>**

在 React 中，每次组件渲染都会重新执行组件函数体，**里面定义的函数也会被“重新创建”**。
如果这些函数作为 props 传给子组件，即使函数逻辑没有变，根据 **引用地址比较**，子组件会认为 props 变了而重新渲染。

`useCallback` 解决了这个问题：

✅ **让函数引用在依赖不变时保持稳定（不变）**语义上，`useCallback` 明确表示"缓存函数"，而 `useMemo` 用于缓存任意计算值。

---

#### **<font color='#10c300'>1）基本语法</font>**

```jsx
const memoizedCallback = useCallback(() => {
  // 函数逻辑
}, [dependencies]);
```

- **第一个参数**：要缓存的回调函数
- **第二个参数**：依赖数组，当依赖中有值变化时，返回的新函数引用会更新

#### **<font color='#10c300'>2）核心使用场景</font>**

**1️⃣传递给优化后的子组件（最常见）**

配合 `React.memo` 防止子组件因父组件渲染而重渲染：

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

---

**2️⃣作为 useEffect 的依赖**

当 `useEffect` 依赖某个函数时，必须用 `useCallback` 保持引用稳定

```jsx
function Search({ query }) {
  const [results, setResults] = useState([]);

  // ❌ 每次渲染都是新函数，导致 effect 每次都要执行
  const fetchData = async () => {
    const res = await api.search(query);
    setResults(res);
  };

  // ✅ fetchData 引用稳定，只有 query 变化时才重新触发 effect
  const fetchData = useCallback(async () => {
    const res = await api.search(query);
    setResults(res);
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // 现在可以安全地将函数放入依赖数组

  return <Results data={results} />;
}
```

---

**3️⃣自定义 Hook 中返回的回调**

确保 Hook 使用者可以获得稳定的函数引用：

```js
function useDebounce(callback, delay) {
  const [debouncedCallback] = useState(() => debounce(callback, delay));

  // 返回稳定的函数引用
  return useCallback(
    (...args) => {
      debouncedCallback(...args);
    },
    [debouncedCallback],
  );
}
```

#### **<font color='#10c300'>3）什么时候用 useCallback</font>**

1. 函数作为 props 传递给 `React.memo` 包裹的子组件
2. 函数作为其他 Hook（`useEffect`、`useMemo`）的依赖
3. 函数是自定义 Hook 的返回值，供外部使用

#### **<font color='#10c300'>4）TypeScript 支持</font>**

```tsx
// 基础类型推断
const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
}, []);

// 泛型约束
type FetchFn = (id: string) => Promise<User>;

const fetchUser = useCallback<FetchFn>(async (id) => {
  const res = await api.getUser(id);
  return res.data;
}, []);

// 返回元组（常见于自定义 Hook）
function useToggle(initial = false) {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => {
    setState((s) => !s);
  }, []);

  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  // 类型自动推断为 [boolean, () => void, () => void, () => void]
  return [state, toggle, setTrue, setFalse] as const;
}
```

#### **<font color='#10c300'>5）高级模式</font>**

**1️⃣结合 useRef 解决过期闭包（稳定引用 + 最新值）**

```js
function useStableCallback(fn) {
  const ref = useRef(fn);
  ref.current = fn; // 每次渲染更新 ref

  // 返回稳定引用，但始终调用最新函数
  return useCallback((...args) => ref.current(...args), []);
}

// 使用：可以放入 useEffect 依赖而不触发重新执行，且能访问最新 props/state
function Component({ onUpdate }) {
  const stableCallback = useStableCallback(() => {
    console.log("最新状态"); // 永远能访问最新值，无需依赖数组
  });

  useEffect(() => {
    const timer = setInterval(stableCallback, 1000);
    return () => clearInterval(timer);
  }, [stableCallback]); // 永远不会变，effect 只执行一次
}
```

---

**2️⃣ 记忆化事件处理器工厂**

```js
function List({ items }) {
  // ❌ 每次渲染都创建 N 个新函数
  return items.map((item) => (
    <button onClick={() => handleItemClick(item.id)}>{item.name}</button>
  ));

  // ✅ 使用 useCallback 缓存每个处理器（配合 memo）
  return items.map((item) => (
    <MemoItem
      key={item.id}
      item={item}
      onClick={useCallback(
        () => handleItemClick(item.id),
        [item.id], // 只有当 item.id 变化时才更新
      )}
    />
  ));
}
```

---

**3️⃣依赖注入模式**

```js
function useApi(api) {
  // 即使 api 对象变化，只要 endpoint 不变，fetchData 引用稳定
  const fetchData = useCallback(
    (endpoint) => {
      return api.request(endpoint);
    },
    [api],
  ); // api 通常是稳定的单例

  return fetchData;
}
```

#### **<font color='#10c300'>6）常见误区⚠️</font>**

1. **不要滥用**
   如果子组件没有 `React.memo` 或不是性能瓶颈，没必要加 `useCallback`（增加复杂度）

2. **缓存不是减少渲染次数的万能钥匙**
   `useCallback` 只防止不必要的重渲染，但状态更新触发的渲染仍会发生

3. **依赖不正确会导致逻辑错误**
   缺少依赖可能让函数内部拿到旧的状态

4. 在写代码时，**默认不要加 `useCallback`**。只有当你遇到下面这两个信号时，再补上：
   - 👋 “我要把这个函数传给一个很重的、加了 memo 的列表子组件”。
   - “ESLint 警告我说，这个函数被用这了 useEffect 的依赖里”。

   除此之外，放心大胆地写普通函数，代码更干净，性能反而更好。

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
- **`init（可选）`**：_惰性初始化函数_，用于在初始渲染时对 `initialArg` 进行加工或计算，返回真正的初始状态，只会在初始化执行一次

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

---

**<font color='#00A6ED'>2️⃣ 复杂状态示例：表单管理</font>**

```jsx
import { useReducer } from "react";

const initialForm = {
  username: "",
  age: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "CHANGE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
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
          dispatch({
            type: "CHANGE_FIELD",
            field: "username",
            value: e.target.value,
          })
        }
        placeholder="用户名"
      />
      <input
        value={form.age}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_FIELD",
            field: "age",
            value: e.target.value,
          })
        }
        placeholder="年龄"
      />
      <button onClick={() => dispatch({ type: "RESET" })}>重置</button>

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

#### **<font color='#10c300'>4）useState vs useReducer 选择指南</font>**

| 场景     | useState                          | useReducer                               |
| :------- | :-------------------------------- | :--------------------------------------- |
| 状态类型 | 简单值（string, number, boolean） | 复杂对象（含多个字段）                   |
| 更新逻辑 | 直接设置新值                      | 基于动作（action）计算新状态             |
| 状态关联 | 独立状态                          | 多状态相互依赖（如表单校验影响提交按钮） |
| 状态转换 | 少（< 3 种变化）                  | 多（增删改查、加载、错误处理）           |
| 可测试性 | 一般                              | 高（reducer 是纯函数）                   |
| 团队协作 | 快速开发                          | 大型项目易维护                           |

**转换信号**：当 `useState` 出现多个 `setXxx` 连续调用，或状态逻辑超过 5 行时，考虑改用 `useReducer`。

#### **<font color='#10c300'>5）使用惰性初始化（第三个参数）</font>**

`useReducer` 还支持传入一个函数，延迟计算初始状态（避免初始化开销）👇

```jsx
import { useReducer } from "react";

function init(initialCount) {
  return { count: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return init(action.payload);
    case "increment":
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
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "reset", payload: 5 })}>
        重置为 5
      </button>
    </>
  );
}

export default Counter;
```

这种方式适用于初始状态计算非常复杂的情况。

#### **<font color='#10c300'>6）useReducer + useContext</font>**

**1️⃣全局状态（Redux 思想）**

`useReducer` 常配合 `useContext` 使用，构建轻量“全局状态管理”：

```jsx
import { createContext, useReducer, useContext } from "react";

const CounterContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    default:
      return state;
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
      <button onClick={() => dispatch({ type: "add" })}>+1</button>
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

---

**2️⃣主题切换**

用 **`useReducer` + `useContext`** 实现一个**全局状态管理系统**，就像一个轻量版 Redux。

我们以“主题切换（深色 / 浅色）”为例 👇

**<font color='cornflowerblue'>🎯 功能目标</font>**

- 页面上有多个组件；
- 这些组件都能感知当前主题；
- 点击按钮可以在浅色/深色模式之间切换；
- 所有组件自动更新，**不用手动传 props**。

**<font color='cornflowerblue'>🧱项目结构</font>**

```
├── 📁 components/                   # 组件
│   ├── 📄 Header.jsx               # 子组件，读取主题并展示
│   ├── 📄 Content.jsx              # 子组件，读取主题并展示
├── 📁 context/                      # Context
│   ├── 📄 index.js                 # 创建 Context + Reducer
└── 📄 App.jsx
```

完整案例：https://www.yuque.com/zhbiao/qr34us/qk5da4gmpqzhat4s/edit#S3pEZ

- 页面加载时默认“浅色”；
- 点击“切换主题”按钮；
- `dispatch` 触发 `TOGGLE_THEME`；
- `reducer` 更新 theme → 所有使用该状态的组件自动重新渲染；
- 所有组件同步变成“深色模式”。

#### **<font color='#10c300'>7）TypeScript 最佳实践</font>**

```tsx
// 1. 定义 State 和 Action 类型
interface State {
  count: number;
  error: string | null;
  status: "idle" | "loading" | "success";
}

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset"; payload: number }
  | { type: "setError"; error: string };

// 2. Reducer 类型推断
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "reset":
      return { ...state, count: action.payload, status: "idle" };
    // TypeScript 会检查是否处理了所有 action type
    default:
      return state;
  }
}

// 3. 在组件中使用
function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    error: null,
    status: "idle",
  });

  // dispatch 类型安全，错误的 action 会报错
  dispatch({ type: "increment" }); // ✅
  dispatch({ type: "reset", payload: 10 }); // ✅
  dispatch({ type: "unknown" }); // ❌ TypeScript 错误
}
```

<br>

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
import { useRef } from "react";

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

---

**<font color='#00A6ED'>2️⃣ 用来存储可变值</font>**

`useRef` 可以用来存储任意可变值，而且即使组件重新渲染，这个值仍然保留。

```jsx
import { useState, useRef, useEffect } from "react";

function RenderCount() {
  const [count, setCount] = useState(0);
  const renderTimes = useRef(0);

  useEffect(() => {
    renderTimes.current += 1; // 每次渲染 +1
  });
  console.log("组件渲染");

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

#### **<font color='#10c300'>3）注意事项⚠️</font>**

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
         <Child ref={domRef} />
         <button>父组件的按钮</button>
       </div>
     );
   }
   export default App;
   ```

#### **<font color='#10c300'>4）和 forwardRef 搭配</font>**

<a name="forwardRef">**`useRef`** 配合 **`forwardRef`** 可以将 ref 传给子组件中的 DOM 元素：</a>

```jsx
import { useRef, forwardRef } from "react";

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
import { useRef } from "react";

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

#### **<font color='#10c300'>5）TypeScript 支持</font>**

```tsx
// DOM 元素引用（自动推断类型）
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// 非 DOM 引用需要显式类型
const timerRef = useRef<number | null>(null);
timerRef.current = window.setTimeout(() => {}, 1000);

// 确保有初始值（非 null）
const countRef = useRef<number>(0);
countRef.current += 1;

// MutableRefObject vs RefObjectD
// useRef<T>(null) -> RefObject<T>（current 只读，用于 DOM）
// useRef<T>(undefined) 或 useRef<T>(initial) -> MutableRefObject<T>（current 可写）
```

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

---

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

#### **<font color='#10c300'>4）注意事项⚠️</font>**

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
import { useState, useDeferredValue, useMemo } from "react";

function SlowList({ input }) {
  // 模拟大数据过滤（耗时） 要配合useMemo使用，要不然子组件每次渲染，也会导致输入卡顿
  const list = useMemo(() => {
    const items = [];
    for (let i = 0; i < 10000; i++) {
      items.push(
        <div key={i}>
          {input} - 项 {i}
        </div>,
      );
    }
    return items;
  }, [input]);

  return <div>{list}</div>;
}

function SearchPage() {
  const [query, setQuery] = useState("");
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

#### **<font color='#10c300'>4）注意事项⚠️</font>**

| 注意点                          | 说明                               |
| ------------------------------- | ---------------------------------- |
| 不会跳过更新                    | 只是延迟执行，最终仍会同步到最新值 |
| 不建议用于关键 UI 状态          | 因为它可能暂时落后于真实值         |
| 需要 React 18+                  | 属于并发系统的功能                 |
| 可搭配 `useTransition` 一起使用 | 共同控制更新优先级更加灵活         |

<br>

### **<font color='red'>4.10 useTransition - 非阻塞状态更新</font>**

用来将某些状态更新标记为“过渡更新（transition update）”。

简单来说，它告诉 React：

> “这类更新不用立刻执行，可以稍后完成，让用户交互不要被卡顿。”

在 React 18 的 **并发渲染模式** 下，更新有优先级区分：

- **紧急更新（Urgent）**：立刻执行，比如输入框、点击。
- **过渡更新（Transition）**：可以延后，比如筛选、分页、排序、大列表渲染。

#### **<font color='#10c300'>1）基本语法搜索过滤</font>**

```jsx
const [isPending, startTransition] = useTransition();
```

- `isPending` ：布尔值：表示过渡更新是否正在进行中，可用于显示“加载中...”

- `startTransition()`：函数：用于包裹属于过渡更新的代码（例如 setState）

#### **<font color='#10c300'>2）使用场景示例</font>**

```jsx
import { useState, useTransition } from "react";

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
  const [query, setQuery] = useState("");
  const [list, setList] = useState(allItems);
  const [isPending, startTransition] = useTransition(); // 👈 使用 useTransition

  function handleChange(e) {
    const newQuery = e.target.value;
    setQuery(newQuery); // 紧急更新（立即响应输入）

    // 过滤操作标记为“过渡更新”，不会阻塞输入
    startTransition(() => {
      const filtered = allItems.filter((item) =>
        item.toLowerCase().includes(newQuery.toLowerCase()),
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
      {isPending && <span style={{ color: "orange" }}>正在过滤数据…</span>}
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
| 是否有加载状态 | ✅ 有 `isPending`              | ❌ 需手动比较          |
| 使用场景       | 你要延迟执行某个更新逻辑       | 你要延迟某个值传递下去 |

#### **<font color='#10c300'>5）注意事项⚠️</font>**

- `useTransition` 只在 React 18+ 有效果；
- 它不会跳过渲染，只是调度顺序不同；
- 不适用于动画或时间延迟，只改变更新优先级；
- 不要滥用——仅在性能瓶颈或卡顿时使用。

<br>

### **<font color='red'>4.11 useImperativeHandle - 暴露自定义ref</font>**

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
import { useRef, useImperativeHandle, forwardRef } from "react";

// 子组件
const Child = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current.focus();
      },
      getValue: () => inputRef.current.value,
    }),
    [],
  );

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

export default Parent;
```

#### **<font color='#10c300'>3）React 19 的简化写法</font>**

```jsx
import { useRef, useImperativeHandle } from "react";

// 子组件
function Child({ ref }) {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      // 返回一个对象
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) inputRef.current.value = "";
      },
    }),
    [],
  );

  return <input ref={inputRef} />;
}

// 父组件
function Parent() {
  const childRef = useRef(null);

  const handleClick = () => {
    // 调用子组件暴露的方法
    childRef.current.focus();
    childRef.current.clear();
  };

  return (
    <>
      <Child ref={childRef} />
      <button onClick={handleClick}>操作子组件</button>
    </>
  );
}

export default Parent;
```

#### **<font color='#10c300'>4）使用场景</font>**

**1️⃣ 封装第三方组件**

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    // 只暴露特定的 API，隐藏内部实现
    focus: () => inputRef.current.focus(),
    scrollIntoView: () =>
      inputRef.current.scrollIntoView({ behavior: "smooth" }),
  }));

  return <input ref={inputRef} {...props} />;
});
```

---

**2️⃣动画控制**

```jsx
const AnimatedBox = forwardRef((props, ref) => {
  const elementRef = useRef(null);

  useImperativeHandle(ref, () => ({
    shake: () => {
      elementRef.current?.classList.add("shake-animation");
      setTimeout(() => {
        elementRef.current?.classList.remove("shake-animation");
      }, 500);
    },
    highlight: () => {
      elementRef.current?.classList.add("highlight");
    },
  }));

  return <div ref={elementRef}>{props.children}</div>;
});
```

#### **<font color='#10c300'>5）注意事项⚠️</font>**

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

### **<font color='red'>4.12 useLayoutEffect - 同步执行的副作用</font>**

> `useLayoutEffect` 可能会影响性能。尽可能使用 [`useEffect`](https://zh-hans.react.dev/reference/react/useEffect)

`useLayoutEffect` 与 `useEffect` 签名完全相同，但执行时机不同：**在浏览器绘制（paint）之前同步执行**，用于避免视觉闪烁。

---

#### **<font color='#10c300'>1）执行时机对比</font>**

```
组件渲染完成
    ↓
useLayoutEffect（同步执行，阻塞绘制）← 在这里修改 DOM，用户看不到中间态
    ↓
浏览器绘制（Paint）到屏幕
    ↓
useEffect（异步执行，不阻塞绘制）
```

#### **<font color='#10c300'>2）核心使用场景</font>**

**1️⃣测量 DOM 并同步修改（防止闪烁）**

**完整案例：**https://www.yuque.com/zhbiao/qr34us/qk5da4gmpqzhat4s/edit#fdd2408c

```jsx
import { useLayoutEffect, useRef, useState } from "react";

function Tooltip({ children, content }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // 计算 tooltip 位置（例如显示在 trigger 上方）
    const top = triggerRect.top - tooltipRect.height - 8;
    const left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;

    // 同步设置位置，用户不会看到 tooltip 先出现在错误位置
    setPosition({ top, left });
  }, []);

  return (
    <>
      <span ref={triggerRef}>{children}</span>
      <div
        ref={tooltipRef}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
        }}
      >
        {content}
      </div>
    </>
  );
}
```

**如果用 `useEffect` 会怎样？**

- 浏览器先绘制 tooltip 在默认位置（例如 0,0）
- 用户看到一闪而过的错位
- 然后 `useEffect` 执行，跳转到正确位置

---

**2️⃣从服务端渲染恢复（SSR Hydration）**

当服务端渲染的 HTML 与客户端首次渲染不一致时，用 `useLayoutEffect` 在绘制前修正，避免 hydration 不匹配警告：

```jsx
function ClientOnlyComponent() {
  const [width, setWidth] = useState(0);

  // 服务端没有 window，默认渲染为 0
  // 客户端在绘制前同步计算实际宽度，防止闪烁
  useLayoutEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return <div>窗口宽度: {width}</div>;
}
```

#### **<font color='#10c300'>3）与 useEffect 的选择指南</font>**

| 场景                  | 推荐              | 原因                           |
| :-------------------- | :---------------- | :----------------------------- |
| 数据获取              | `useEffect`       | 不阻塞绘制，用户更快看到内容   |
| 事件监听              | `useEffect`       | 不阻塞绘制                     |
| 基于 DOM 测量调整布局 | `useLayoutEffect` | 防止闪烁                       |
| 动画初始状态          | `useLayoutEffect` | 防止闪烁                       |
| DOM 修改（如聚焦）    | `useEffect`       | 通常不需要同步，除非有视觉问题 |

**黄金法则**：先使用 `useEffect`，如果出现**视觉闪烁**（flicker）再改为 `useLayoutEffect`

#### **<font color='#10c300'>4）性能警告 ⚠️</font>**

`useLayoutEffect` **会阻塞浏览器绘制**，执行时间过长会导致：

1. **掉帧/卡顿**：用户感觉到界面卡住

2. **延迟交互**：无法响应用户输入

3. **影响用户体验**：比轻微的视觉闪烁更糟糕

   ```js
   // ❌ 错误：在 useLayoutEffect 中执行耗时操作
   useLayoutEffect(() => {
     // 大数据处理会阻塞绘制
     const processed = heavyDataProcessing(data);
     setData(processed);
   }, []);
   
   // ✅ 正确：耗时操作应在 useEffect 中
   useEffect(() => {
     const processed = heavyDataProcessing(data);
     setData(processed);
   }, []);
   ```

<br>

### **<font color='red'>4.13 自定义 Hooks</font>**

自定义 Hook 是**提取组件逻辑到可复用函数**的机制，解决 React 中状态逻辑复用问题（替代高阶组件 HOC 和 Render Props）。

#### **<font color='#10c300'>1）核心规则</font>**

**1️⃣ 命名必须以 `use` 开头**

```js
// ✅ 正确：React 识别为 Hook，会检查规则
function useWindowSize() { ... }

// ❌ 错误：普通函数，React 不会应用 Hook 规则
function getWindowSize() { ... }
```

---

**2️⃣遵循 Hooks 规则**

- 只在顶层调用（不在循环、条件、嵌套函数中）
- 只在 React 函数或自定义 Hook 中调用

#### **<font color='#10c300'>2）基础模板</font>**

```jsx
import { useState, useEffect } from "react";

function useCustomHook(arg) {
  // 可以使用其他 Hooks
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // 副作用逻辑
    return () => {
      // 清理逻辑
    };
  }, [arg]);

  // 返回状态、方法或计算值
  return [state, setState]; // 或返回对象 { state, action }
}
```

#### **<font color='#10c300'>3）实战示例</font>**

**1️⃣useLocalStorage（持久化状态）**

```js
// app.jsx
import useLocalStorage from "./Hooks/useLocalStorage"

function App() {
    const [name, setName] = useLocalStorage('name', 'Guest');

    return <input value={name} onChange={e => setName(e.target.value)} />;
}
export default App



// src\Hooks\useLocalStorage.js
import { useState } from "react";

function useLocalStorage(key, initialValue) {
    // 惰性初始化：从 localStorage 读取
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // 更新 localStorage 当状态变化
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage
```

---

**2️⃣useDebounce（防抖）**

```js
// app.jsx
import useDebounce from "./Hooks/useDebounce"
import { useState, useEffect } from "react"

function SearchInput() {
    const [text, setText] = useState('');
    const debouncedText = useDebounce(text, 500); // 500ms 防抖

    useEffect(() => {
        if (debouncedText) {
            console.log(debouncedText); // 只在停止输入 500ms 后搜索
        }
    }, [debouncedText]);

    return <input value={text} onChange={e => setText(e.target.value)} />;
}
export default SearchInput


// src\Hooks\useDebounce.js
import { useState, useEffect } from "react";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler); // 清除上一次的定时器
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce
```

---

**3️⃣useFetch（数据获取）**

```js
function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    setState((prev) => ({ ...prev, isLoading: true }));

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ data: null, isLoading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}

// 使用
function UserProfile({ userId }) {
  const { data: user, isLoading, error } = useFetch(`/api/users/${userId}`);

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <div>{user.name}</div>;
}
```

---

**4️⃣useMediaQuery（响应式）**

```jsx
import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    setMatches(media.matches);

    return () => media.removeEventListener("change", listener);
  }, [query]); // 不必依赖 matches

  return matches;
}

// 使用
function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

  return (
    <div>{isMobile ? "手机视图" : isTablet ? "平板视图" : "桌面视图"}</div>
  );
}

export default ResponsiveComponent;
```

#### **<font color='#10c300'>4）高级模式</font>**

**1️⃣组合多个 Hooks（自定义 Hook 使用其他自定义 Hook）**

```jsx
import { useState, useEffect, useMemo } from "react";

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const update = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", update);
    update();
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

// 组合使用
function useBreakpoint() {
  const { width } = useWindowSize();
  return useMemo(() => {
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    };
  }, [width]);
}

function App() {
  const breakpoints = useBreakpoint();
  return (
    <div>
      <h1>Current Breakpoints</h1>
      <pre>{JSON.stringify(breakpoints, null, 4)}</pre>
    </div>
  );
}

export default App;
```

**2️⃣返回稳定引用（防止无限重渲染）**

**完整案例：**https://www.yuque.com/zhbiao/qr34us/qk5da4gmpqzhat4s/edit#Xexzy

```jsx
function useAuth() {
  const [user, setUser] = useState(null);

  // 使用 useCallback 保持方法引用稳定
  const login = useCallback(async (credentials) => {
    const user = await api.login(credentials);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setUser(null);
  }, []);

  // 使用 useMemo 保持对象引用稳定
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return value;
}

// 现在可以安全地用于 useEffect 依赖
useEffect(() => {
  if (auth.isAuthenticated) {
    // 不会导致无限循环，因为 auth 引用稳定
  }
}, [auth]);
```

<br>

#### **<font color='#10c300'>5）常见陷阱</font>**

**1️⃣依赖数组遗漏**

```jsx
// ❌ 错误：handler 变化时不会更新
function useEventListener(eventName, handler) {
  useEffect(() => {
    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, []); // 缺少 handler
}

// ✅ 正确：但要求使用者使用 useCallback 包裹 handler
useEffect(() => {
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
}, [eventName, handler]);
```

**2️⃣返回不稳定引用导致重渲染**

```jsx
// ❌ 错误：每次返回新数组
function useData() {
  const data = fetchData();
  return [data, data.length]; // 新数组引用
}

// ✅ 正确：保持引用稳定
function useData() {
  const data = fetchData();
  return useMemo(() => [data, data.length], [data]);
}
```

**3️⃣在条件语句中使用 Hook**

```jsx
// ❌ 错误
function useConditionalHook(condition) {
  if (condition) {
    const [state, setState] = useState(0); // Hook 在条件中！
  }
}

// ✅ 正确
function useConditionalHook(condition) {
  const [state, setState] = useState(0);
  // 根据 condition 决定是否使用 state
  return condition ? state : null;
}
```

<br>

## **五、 HOC 高阶组件**

高阶组件是一个**函数**，它接收一个组件并返回一个新的组件，例如：

### **<font color='red'>5.1 React.memo</font>**

`memo` 是一个 **高阶组件**，用于**优化函数组件的重新渲染**。只有当它的 **props 发生变化** 时，React 才会重新渲染这个组件。否则，它会直接复用上一次的渲染结果，提高性能。

---

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
const Memoized = React.memo(MyComponent, (prevProps, nextProps) => {
  // 返回 true 表示不需要重新渲染（props 相等）
  // 返回 false 表示需要重渲染
  return prevProps.id === nextProps.id;
});
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
import { useState } from "react";
// 子组件
const Child = React.memo((props) => {
  console.log("Child render");
  return <div>{props.count}</div>;
});

// 父组件
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("clicked");
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
oldProps.onClick === newProps.onClick;
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

---

🌟 **一句话总结：**

> `React.memo` 就像是函数组件的“PureComponent”。
> 当 props 没变时，跳过渲染，提高性能。

---

<br>

## **七、 React 19 新特性**

React 19 带来了许多令人兴奋的新特性，特别是针对 **性能优化** 和 **服务端组件（RSC）** 的深度集成。最引人注目的是 React Compiler（React 编译器）的引入，它旨在自动处理 memoization，减少手动优化的负担。

### **<font color='red'>7.1 React Compiler (React 编译器)</font>**

这是 React 19 最具革命性的变化。

- **过去**：为了避免不必要的重新渲染，我们需要手动使用 `useMemo`、`useCallback` 和 `React.memo`。
- **现在**：React Compiler 可以在构建时自动分析代码，并自动应用优化。这意味着你可能不再需要手动写 `useMemo` 和 `useCallback` 了！

> ⚠️ 注意：这是一个构建工具层面的优化，而不是运行时 API。

### **<font color='red'>7.2 Actions (Server Actions)</font>**

React 19 更加拥抱服务端能力，引入了 **Actions** 概念，简化数据提交和变更。

#### **<font color='#10c300'>1）useActionState (原 useFormState)</font>**

用于管理表单提交的状态（如加载中、成功、失败、错误信息）。

```jsx
import { useActionState } from "react";

async function updateName(error, formData) {
  const name = formData.get("name");
  if (!name) return "Name required";
  await api.updateUser(name);
  return null;
}

function ChangeName() {
  const [error, submitAction, isPending] = useActionState(updateName, null);

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

#### **<font color='#10c300'>2）useFormStatus</font>**

让我们在子组件中直接获取父级 `<form>` 的状态，而不需要通过 props 传递 `loading` 状态。

```jsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "提交中..." : "提交"}</button>;
}

function App() {
  return (
    <form action={submitAction}>
      <input name="name" />
      <SubmitButton /> {/* 自动感知 form 状态 */}
    </form>
  );
}
```

### **<font color='red'>7.3 新的 `use` API</font>**

`use` 是一个新的 API，用于在 render 中读取资源（Promise 或 Context）。

#### **<font color='#10c300'>1）读取 Context</font>**

不再受限于只能在顶层使用 `useContext`，`use` 可以在条件语句和循环中使用（尽管仍建议在顶层）。

```jsx
import { use } from "react";
import ThemeContext from "./ThemeContext";

function Heading({ children }) {
  if (children == null) {
    return null;
  }
  // ✅ 可以在条件判断中使用
  const theme = use(ThemeContext);
  return <h1 style={{ color: theme.color }}>{children}</h1>;
}
```

#### **<font color='#10c300'>2）读取 Promise</font>**

可以直接在组件中等待 Promise 解析（配合 Suspense）。

```jsx
import { use, Suspense } from "react";

function Comments({ commentsPromise }) {
  // ❌ 以前：需要 useEffect + useState
  // ✅ 现在：直接 use(promise)
  const comments = use(commentsPromise);

  return comments.map((c) => <p key={c.id}>{c.text}</p>);
}

function Page({ post }) {
  return (
    <Suspense fallback="加载评论中...">
      <Comments commentsPromise={fetchComments(post.id)} />
    </Suspense>
  );
}
```

### **<font color='red'>7.4 Ref 作为 Prop</font>**

终于！在 React 19 中，你不再需要 `forwardRef` 了。`ref` 现在只是一个普通的 prop。

```jsx
// React 19 写法
function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />;
}

// 父组件
<MyInput ref={inputRef} />;
```

### **<font color='red'>7.5 文档元数据支持</font>**

直接在组件中渲染 `<title>`、`<meta>` 和 `<link>` 标签，React 会自动将它们提升到 `<head>` 中。

```jsx
function HomePage() {
  return (
    <>
      <title>首页 - 我的应用</title>
      <meta name="description" content="这是首页" />
      <h1>欢迎</h1>
    </>
  );
}
```

---

<br>

## **八、 最佳实践**

### **<font color='red'>8.1 组件拆分与结构</font>**

1. **单一职责原则**：每个组件只做一件事。如果一个组件超过 200 行，或者包含多个 `useEffect` 处理不同逻辑，考虑拆分。
2. **容器与展示组件分离**：
   - **展示组件 (Presentational)**：只负责渲染 UI，通过 props 接收数据和回调（如 `Button`, `Card`）。
   - **容器组件 (Container)**：负责获取数据、处理逻辑，将数据传给展示组件。

### **<font color='red'>8.2 性能优化指南</font>**

1. **变动分离**：将变动频繁的部分（如输入框文字）抽离成独立组件，避免带动父组件重渲染。
2. **列表虚拟化**：对于长列表（超过 50 条），使用 `react-window` 或 `react-virtuoso` 仅渲染可视区域的元素。
3. **懒加载 (Lazy Loading)**：
   对于非首屏路由或大型组件，使用 `lazy` 和 `Suspense`。

   ```jsx
   const AdminPanel = lazy(() => import("./AdminPanel"));
   
   <Suspense fallback={<Spinner />}>
     <AdminPanel />
   </Suspense>;
   ```

4. **避免滥用 Context**：Context 适合全局配置（主题、用户、语言），不适合高频变动的数据。高频数据应考虑 `Zustand` 或 `Redux` 等专门的状态管理库。

### **<font color='red'>8.3 自定义 Hooks 封装逻辑</font>**

不要在组件里堆砌 `useEffect`。将相关的逻辑（如 data fetching, event listeners）封装到自定义 Hook 中。

```jsx
// ❌ 不推荐
function Component() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  // ...
}

// ✅ 推荐
function Component() {
  const width = useWindowSize(); // 逻辑复用且清晰
  // ...
}
```

### **<font color='red'>8.4 错误边界 (Error Boundaries)</font>**

使用错误边界捕获组件树中的 JS 错误，防止整个应用崩溃（白屏）。推荐使用 `react-error-boundary` 库。

```jsx
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary fallback={<div>出错了！</div>}>
  <MyWidget />
</ErrorBoundary>;
```

---

<br>

## **九、 常见问题与解决方案**

### **<font color='red'>Q1: 为什么我的组件渲染了两次？</font>**

**A:** 这是 React 18+ 在 **开发模式 (Strict Mode)** 下的预期行为。
React 会故意卸载并重新挂载组件（mount -> unmount -> mount），主要为了检测：

- `useEffect` 清理函数是否正确。
- 是否有不纯的副作用。

**生产环境只会渲染一次**，无需担心性能。

### **<font color='red'>Q2: "Too many re-renders" 报错</font>**

**A:** 通常是因为你在**渲染阶段**直接调用了 `setState`。

```jsx
// ❌ 错误
function App() {
  const [count, setCount] = useState(0);
  setCount(1); // 🔴 每次渲染又触发更新 -> 死循环
  return <div>{count}</div>;
}

// ✅ 正确
useEffect(() => {
  setCount(1);
}, []); // 仅在挂载时执行
```

### **<font color='red'>Q3: useEffect 依赖警告 (exhaustive-deps)</font>**

**A:** ESLint 警告你遗漏了依赖项。

- **不要忽略它**：忽略通常会导致闭包陷阱（读到旧值）。
- **解决方案**：
  1. 将函数移到 `useEffect` 内部。
  2. 使用 `useCallback` 包裹函数。
  3. 如果真的只需要执行一次，检查逻辑是否正确，或者用 `useRef` 保存不需要触发更新的值。

### **<font color='red'>Q4: 为什么 console.log 打印 State 总是旧值？</font>**

**A:** `setState` 是**异步**（批处理）的。调用后状态不会立刻改变，而是等到下一次渲染。

```jsx
const handleClick = () => {
  setCount(10);
  console.log(count); // 仍然是 0 (旧值)
};

// 解决方法：使用 useEffect 监听变化
useEffect(() => {
  console.log(count); // 10 (新值)
}, [count]);
```

### **<font color='red'>Q5: A component is changing an uncontrolled input to be controlled</font>**

**A:** 这通常是因为你给 input 的 `value` 传了 `undefined` 或 `null`。

```jsx
// ❌ 错误：初始是 undefined (非受控)，后来变成 'hello' (受控)
const [text, setText] = useState();
<input value={text} />;

// ✅ 正确：给初始值
const [text, setText] = useState("");
```

### **<font color='red'>Q6: 如何处理组件卸载后的异步状态更新？</font>**

**A:** 在 `useEffect` 中发起异步请求时，如果组件在请求完成前被卸载，尝试更新状态可能会导致警告（React 18 前）或潜在的竞态条件。

**🤔 为什么说“组件可能已卸载”？**

由于 `fetch` 是异步的（网络请求需要时间），在请求发出后到响应返回前的这段时间内，用户可能已经点击了路由跳转、关闭了弹窗或条件渲染导致该组件被销毁。
此时代码执行到 `.then(setUser)` 时，实际上是在试图更新一个“已经不存在的组件”的状态。

```jsx
// ❌ 问题：组件卸载后更新状态
function UserData({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data)); // 如果此时用户已经离开当前页面，组件已卸载，这里就会报错
  }, [userId]);
}

// ✅ 解决：使用 AbortController (推荐)
function UserData({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // 1. 创建控制器

    fetch(`/api/users/${userId}`, { signal: controller.signal }) // 2. 绑定 signal
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => {
        // 3. 忽略因取消导致的错误
        if (err.name !== "AbortError") throw err;
      });

    // 4. 组件卸载或 userId 变化时取消请求
    return () => controller.abort();
  }, [userId]);
}

// ⚠️ 传统解法：使用 cleanup function + 标记变量 (isMounted)
// 这种方法不终止网络请求，只是不执行 setState，浪费流量但能避免报错
function UserDataFallback({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true; // 1. 设置标记

    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // 2. 只有组件还在挂载中时才更新状态
        if (isMounted) setUser(data);
      });

    // 3. 清理函数：组件卸载时将标记设为 false
    return () => {
      isMounted = false;
    };
  }, [userId]);
}
```

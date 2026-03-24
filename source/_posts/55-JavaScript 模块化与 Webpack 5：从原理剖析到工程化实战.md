---
title: JavaScript 模块化与 Webpack 5：从原理剖析到工程化实战
img: /static/51.webp
categories: 开发工具
tags:
  - webpack
  - javascript
  - modules
abbrlink: w41d92f5
date: 2026-02-27 22:11:00
---



> 📚 本总结深入剖析了 JavaScript 模块化规范的底层差异（CommonJS vs ESM），并结合 Webpack 5 及最新的 Webpack CLI 6.x 提供了详尽的实测验证与工程化最佳实践。

---

## 目录

1. [模块化规范详解](#一-javascript-模块化规范详解)
2. [核心区别：引用 vs 拷贝](#二-es6-modules-vs-commonjs-核心区别详解)
3. [package.json 配置项](#三-packagejson-中的-type-配置详解)
4. [webpack-cli 智能加载](#四-webpack-cli-版本影响实测结果)
5. [实测验证记录](#五-实测验证记录)
6. [最佳实践建议](#六-最佳实践建议基于实测)
7. [配置选择流程图](#七-配置选择流程图)
8. [关键项总结](#八-关键要点总结)
9. [常见问题 FAQ](#九-常见问题-faq)
10. [核心结论总结](#十-总结)

<br>

## **一、 JavaScript 模块化规范详解**

### **<font color='red'>1.1 CommonJS (CJS)</font>**

**使用场景**：Node.js 服务端

**特点**：

- 同步加载模块
- 运行时加载（值的拷贝）
- 每个文件是一个模块

**语法**：

```javascript
// 导出
module.exports = { add: (a, b) => a + b };
exports.count = 10;

// 导入
const math = require("./math");
const { add } = require("./math");
```

### **<font color='red'>1.2 AMD (Asynchronous Module Definition)</font>**

**使用场景**：浏览器端

**特点**：

- 异步加载模块
- 依赖前置，提前执行
- 代表库：RequireJS

**语法**：

```javascript
// 定义模块
define(["jquery", "underscore"], function ($, _) {
  return {
    method: function () {},
  };
});

// 使用模块
require(["module1", "module2"], function (m1, m2) {
  m1.method();
});
```

### **<font color='red'>1.3 UMD (Universal Module Definition)</font>**

**使用场景**：通用环境（浏览器 + Node.js）

**特点**：

- 兼容 CommonJS 和 AMD
- 可以在多种环境下运行
- 通常用于第三方库

**语法**：

```javascript
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // 浏览器全局变量
    root.myModule = factory();
  }
})(this, function () {
  return { method: function () {} };
});
```

### **<font color='red'>1.4 ES6 Modules (ESM) ⭐ 推荐</font>**

**使用场景**：现代浏览器和 Node.js

**特点**：

- JavaScript 官方标准
- 静态导入，编译时加载
- 支持 Tree Shaking（摇树优化）
- 值的引用（而非拷贝）

**语法**：

```javascript
// 导出
export const name = "value";
export function add(a, b) {
  return a + b;
}
export default function () {}

// 导入
import { name, add } from "./module.js";
import defaultExport from "./module.js";
import * as module from "./module.js";
```

### **<font color='red'>1.5 CMD (Common Module Definition)</font>**

**使用场景**：浏览器端（已淘汰）

**特点**：

- SeaJS 推广的规范
- 依赖就近，延迟执行
- 现在基本不再使用

---

<br>

## **二、 ES6 Modules vs CommonJS 核心区别详解**

### **<font color='red'>2.1 值的引用 vs 值的拷贝</font>**

这是 **ES6 Modules** 和 **CommonJS** 的一个关键区别。

#### **<font color='#10c300'>1）核心区别</font>**

| 模块系统        | 导出机制           | 特点                       |
| --------------- | ------------------ | -------------------------- |
| **CommonJS**    | 值的拷贝 📸        | 导出时复制一份值，互不影响 |
| **ES6 Modules** | 值的引用（绑定）📹 | 导出的是引用，指向同一个值 |

#### **<font color='#10c300'>2）CommonJS - 值的拷贝（拍照片）</font>**

```javascript
// counter.js (CommonJS)
let count = 0;

function increment() {
  count++;
}

function getCount() {
  return count;
}

module.exports = {
  count, // 导出的是 count 的拷贝
  increment,
  getCount,
};
```

```javascript
// main.js
const counter = require("./counter.js");

console.log(counter.count); // 0
counter.increment();
console.log(counter.count); // 还是 0 ❌（因为是拷贝，不会更新）
console.log(counter.getCount()); // 1 ✅（通过函数访问到最新值）
```

**说明**：

- `counter.count` 是导出时的**拷贝值**
- 内部 `count` 变化了，但导出的拷贝**不会更新**
- 就像复印了一份文件，原件改了，复印件不会变

#### **<font color='#10c300'>3）ES6 Modules - 值的引用（视频直播）</font>**

```javascript
// counter.js (ES6)
export let count = 0;

export function increment() {
  count++;
}

export function getCount() {
  return count;
}
```

```javascript
// main.js
import { count, increment, getCount } from "./counter.js";

console.log(count); // 0
increment();
console.log(count); // 1 ✅（实时更新！）
console.log(getCount()); // 1 ✅
```

**说明**：

- `count` 是一个**实时绑定**（引用）
- 内部 `count` 变化，外部**立即看到变化**
- 就像一个**指针**，始终指向同一个值

#### **<font color='#10c300'>4）形象比喻</font>**

**CommonJS - 拍照片 📸**

```
原始文件（counter.js）：
┌─────────┐
│ count:0 │  → 导出时 → ┌─────────┐ 照片（main.js）
│ ↓       │             │ count:0 │
│ count:1 │             │         │
└─────────┘             └─────────┘
                        照片不会自动更新！
```

**ES6 Modules - 视频直播 📹**

```
原始文件（counter.js）：
┌─────────┐
│ count:0 │  ←═══════ 实时连接 ═══════┐
│ ↓       │                         │
│ count:1 │  ←═══════ 同步更新 ═════════┤ main.js
│ └─────────┘                         │
                                    看到实时值！
```

#### **<font color='#10c300'>5）为什么这很重要？</font>**

**1. 状态管理更直观**

```javascript
// store.js (ES6)
export let state = { count: 0 };

export function updateState(newState) {
  state = newState;
}

// app.js
import { state } from "./store.js";
console.log(state); // ✅ 始终是最新的 state
```

**2. 避免常见陷阱**

```javascript
// ❌ CommonJS 的常见错误
const config = require("./config");
config.setDebug(true);
console.log(config.isDebug); // 还是 false ❌（拷贝不更新）

// ✅ ES6 的正确行为
import { isDebug } from "./config.js";
setDebug(true);
console.log(isDebug); // true ✅（引用自动更新）
```

**3. 注意：ES6 模块导入的值是只读的**

```javascript
// counter.js
export let count = 0;

// main.js
import { count } from "./counter.js";
count = 10; // ❌ TypeError: Assignment to constant variable

// 正确做法：通过导出的函数修改
export function setCount(value) {
  count = value; // ✅ 在模块内部可以修改
}
```

#### **<font color='#10c300'>6）总结对比</font>**

| 特性         | CommonJS           | ES6 Modules        |
| ------------ | ------------------ | ------------------ |
| **导出机制** | 值的拷贝 📸        | 值的引用 📹        |
| **更新机制** | 不会自动更新       | 实时同步           |
| **外部修改** | 可以修改导入的对象 | 只读，不能修改     |
| **适合场景** | 服务端同步加载     | 现代应用，静态分析 |

---

### **<font color='red'>2.2 Tree Shaking（摇树优化）详解</font>**

#### **<font color='#10c300'>1）什么是 Tree Shaking？</font>**

**Tree Shaking** 是一个术语，通常用于描述**移除 JavaScript 代码中未使用（dead code）的过程**。

**形象比喻**：

- 🌳 **树** = 你的整个代码库
- 🍃 **绿叶** = 实际使用的代码（活代码）
- 🍂 **枯叶** = 未使用的代码（死代码）

**摇树（Shaking）** = 摇动这棵树，让**枯叶（未使用的代码）掉落**，只保留**绿叶（使用的代码）**

#### **<font color='#10c300'>2）Tree Shaking 的作用</font>**

**优化前（没有 Tree Shaking）**：

```javascript
// math.js - 导出多个函数
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}
export function multiply(a, b) {
  return a * b;
}
export function divide(a, b) {
  return a / b;
}

// main.js - 只使用了 add
import { add } from "./math.js";
console.log(add(1, 2));
```

```javascript
// bundle.js - 包含所有函数（浪费）
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
} // ❌ 未使用但被打包
function multiply(a, b) {
  return a * b;
} // ❌ 未使用但被打包
function divide(a, b) {
  return a / b;
} // ❌ 未使用但被打包
console.log(add(1, 2));
```

**优化后（有 Tree Shaking）**：

```javascript
// bundle.js - 只包含使用的函数（优化）
function add(a, b) {
  return a + b;
} // ✅ 使用了，保留
console.log(add(1, 2));
```

**效果**：

- 📦 减小打包体积（可能减少 50%+ 的代码）
- ⚡ 加快加载速度
- 🚀 提升性能

#### **<font color='#10c300'>3）Tree Shaking 的工作原理</font>**

**1. 依赖 ES6 Modules（ESM）**

Tree Shaking **只对 ES6 模块（import/export）有效**，对 CommonJS（require/module.exports）**无效**。

**为什么？**

| 特性             | ES6 Modules      | CommonJS           |
| ---------------- | ---------------- | ------------------ |
| **加载时机**     | 编译时（静态）   | 运行时（动态）     |
| **结构**         | 静态结构，可分析 | 动态结构，不可预测 |
| **Tree Shaking** | ✅ 支持          | ❌ 不支持          |

**2. 静态分析**

Webpack 在**编译阶段**会分析代码的导入导出关系，标记哪些导出被使用了，并删除未使用的导出。

#### **<font color='#10c300'>4）如何启用 Tree Shaking</font>**

**在 webpack 5 中（自动启用）**

```javascript
// webpack.config.js
export default {
  mode: "production", // 生产模式自动启用 Tree Shaking
};
```

**package.json 配置（可选）**

```json
{
  "name": "my-project",
  "sideEffects": false
}
```

#### **<font color='#10c300'>5）sideEffects 配置的影响对比</font>**

| 配置                          | Tree Shaking 粒度   | 删除范围                 |
| ----------------------------- | ------------------- | ------------------------ |
| **未设置 sideEffects: false** | 成员级别            | 只删除文件内未使用的导出 |
| **设置 sideEffects: false**   | 文件级别 + 成员级别 | 可删除整个未使用的文件   |

#### **<font color='#10c300'>6）Tree Shaking 的限制与最佳实践</font>**

✅ **推荐做法**：使用 ES6 模块、生产模式构建、避免副作用代码、使用支持 Tree Shaking 的库。
❌ **避免**：混用 CommonJS 和 ESM、顶层副作用代码、默认导出整个大对象。

#### **<span style='color:#10c300'>7）生产级 sideEffects 标准排除清单</span>**

这是解决 Tree Shaking 误删问题的标准化 `package.json` 配置，建议直接作为模板使用：

```json
// package.json
{
  "sideEffects": [
    "*.css", // 确保 CSS 不被误删
    "*.less",
    "*.scss",
    "./src/polyfills.js", // Polyfill 全局初始化
    "./src/global.js", // 全局变量或插件初始化
    "**/plugins/*.js" // 通用插件目录
  ]
}
```

> **数组配置的“潜规则”**：
> 当你使用数组列出有副作用的文件时，**没有出现在清单中的所有其他 JS 文件都会被 Webpack 默认为“绝对纯净”**（即 `sideEffects: false`）。
>
> **这意味着**：如果一个 JS 文件不在清单里，即使它内部写了 `console.log` 或修改了全局变量，只要它的 `export` 成员未被其他地方使用，Webpack 就会**直接跳过并物理删除整个文件**，其中的副作用逻辑也会随之消失。
>
> **建议**：
>
> 1. 养成**纯净模块化**习惯：JS 文件应只负责导出功能，不应在顶层执行逻辑。
> 2. 如果某些历史遗留文件确实有“只需加载即生效”的代码，请务必将其加入上述清单。

#### **<font color='#10c300'>8）常见误区：与 "type": "module" 的关系</font>**

**真相**：Tree Shaking 与 package.json 的 `"type"` 无关。它只取决于源代码是否使用了 `import/export` 语法。

---

<br>

## **三、 package.json 中的 "type" 配置详解**

### **<font color='red'>3.1 初始化项目与目录结构</font>**

执行以下命令初始化项目并安装 Webpack 相关依赖：

```bash
npm init -y
npm i webpack webpack-cli -D
```

初始化后的推荐工程目录结构如下：

```text
webpack_code
├── src # 源代码目录
│   ├── js # JS 文件夹
│   │   ├── count.js
│   │   └── sum.js
│   └── main.js # 项目主入口文件
├── package.json # 项目配置文件
└── webpack.config.js # Webpack 配置文件
```

**`webpack.config.js`**

```js
const path = require("path");

module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    // __dirname nodejs的变量，表示当前文件的目录
    path: path.resolve(__dirname, "dist"), // 绝对路径
    filename: "js/main.js",
  },
  // 加载器
  module: {
    rules: [
      // loader的配置(执行顺序是 从下往上 或 从右到左)
    ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "production",
};
```

**`运行`**

```bash
npx webpack
```

### **<font color='red'>3.2 npx 与 xxx-cli 的关系解析</font>**

在现代前端工程化中，`npx` 和 `xxx-cli`（如 `webpack-cli`）是相辅相成的协作关系：

- **`xxx-cli` (工具箱)**：是功能的实体。例如 `webpack-cli` 包含了解析命令行参数、读取配置文件、调用 Webpack 内核的核心代码。没有它，Webpack 就无法通过命令行运行。
- **`npx` (通行证)**：是命令的执行者。它的核心作用是**自动寻找并执行**安装在项目本地（`node_modules/.bin`）的二进制命令。

**协作逻辑**：

1. **安装**：我们将 `webpack-cli` 安装为项目的本地 `devDependencies`（非全局安装）。
2. **寻找**：当你输入 `npx webpack` 时，`npx` 会在当前项目的 `node_modules` 中精准定位到 `webpack-cli` 的执行入口。
3. **执行**：`npx` 唤起 `webpack-cli`，后者开始读取配置并完成打包任务。

**优势**：这种模式避免了全局安装带来的版本冲突，确保每个项目使用的都是自己 package.json 中指定的特定版本工具。
<br>

### **<font color='red'>3.3 配置选项一览</font>**

| type 配置值    | .js 处理方式     | .mjs 文件 | .cjs 文件 |
| -------------- | ---------------- | --------- | --------- |
| **不设置**     | **CommonJS**     | ESM       | CommonJS  |
| **"commonjs"** | CommonJS（强制） | ESM       | CommonJS  |
| **"module"**   | ESM（严格模式）  | ESM       | CommonJS  |

### **<font color='red'>3.4 三种模式详解</font>**

#### **<font color='#10c300'>1）不设置 type</font>**

`.js` 文件默认为 CommonJS，但由于最新的 **webpack-cli 6.x** 智能加载机制，配置文件依然可以使用 `export default`。

#### **<font color='#10c300'>2）设置 "type": "commonjs" （默认行为）</font>**

npm init -y默认生成`type": "commonjs`。强制 `.js` 文件为 CommonJS。在此模式下，`webpack.config.js` **不能**使用 ESM 语法。

#### **<font color='#10c300'>3）设置 "type": "module"</font>**⭐⭐⭐⭐⭐

这是最推荐的配置。后面比较新的插件有的可能就是**纯 ESM 模块** `.js` 文件遵循 ESM 严格模式。**注意**：在此模式下，`import` 必须携带完整的文件扩展名（如 `.js`）。

---

<br>

## **四、 webpack-cli 版本影响（实测结果）**

### **<font color='red'>4.1 webpack-cli 6.x 智能加载机制 🎉</font>**

| package.json 配置      | config 可用语法     | 源代码 import     | 实测结果       |
| ---------------------- | ------------------- | ----------------- | -------------- |
| **不设置 type** ⭐     | **CJS ✅ / ESM ✅** | 不需要 .js ✅     | ✅ 通过        |
| **"type": "commonjs"** | CJS ✅ / ESM ❌     | 不需要 .js ✅     | ⚠️ ESM 报错    |
| **"type": "module"**   | CJS ❌ / ESM ✅     | **必须加 .js** ⚠️ | ⚠️ import 受限 |

### **<font color='red'>4.2 智能加载原理解析</font>**

webpack-cli 6.x 会先尝试 `require` 配置文件，如果遇到 ESM 语法抛出的报错，则会自动捕获并改用动态 `import()` 加载。这一特性让“不设置 type”成为了灵活性最高的选择。

---

<br>

## **五、 实测验证记录**

### **<font color='red'>5.1 测试 1：不设置 type + export default ✅</font>**

Node.js 环境下成功编译。说明 webpack-cli 6.x 成功兼容了不设 type 时的 ESM 配置。

### **<font color='red'>5.2 测试 2：type: "commonjs" + export default ❌</font>**

抛出 `SyntaxError: Unexpected token 'export'`。因为显式声明为 CJS 后，尝试使用 ESM 语法会被捕获为非法。

### **<font color='red'>5.3 测试 3：type: "module" + export default ⚠️</font>**

虽然配置文件通过，但源代码中的 `import` 因为没有写 `.js` 后缀而导致路径解析失败。

---

<br>

## **六、 最佳实践建议（基于实测）**

### **<font color='red'>6.1 推荐配置：五星级方案 ⭐⭐⭐⭐⭐</font>**

1.  **package.json**: 不设置 `type`。
2.  **webpack.config.js**: 使用 ESM 语法（`import path from 'path'` 和 `export default`）。
3.  **源代码**: 使用标准的 ES6 模块（`import count from "./js/count"`），享受无需后缀的简洁感。

---

<br>

## **七、 配置选择流程图**

```
需要配置 package.json 的 type 吗？
    │
    ├─→ 是否使用 webpack-cli 6.x？
    │   ├─→ 是 → 推荐不设置 type ⭐⭐⭐⭐⭐ (灵活、简洁)
    │   └─→ 否 → 配置文件必须用 CommonJS
    │
    ├─→ 是否纯 ESM 项目（Node.js 原生）？
    │   ├─→ 是 → "type": "module" (须加 .js 后缀)
    │   └─→ 否 → 不设置 type ⭐ 最推荐
```

---

<br>

## **八、 关键要点总结**

1.  **默认最强**：不设置 `type` 是目前最灵活、兼容性最好的方案。
2.  **后缀规则**：`.mjs` 始终为 ESM，`.cjs` 始终为 CommonJS。
3.  **智能 cli**：webpack-cli 6.x 的自动切换机制是简化工程配置的关键。
4.  **Tree Shaking**：只看代码语法，不看 `package.json` 配置。

---

<br>

## **九、 常见问题 FAQ**

### **<font color='red'>Q1: 不设置 type 能使用 Tree Shaking 吗？</font>**

**✅ 完全可以！** 这是一个常见的认知误区。Tree Shaking 取决于你的源代码是否使用了 `import/export` 静态分析，只要代码是 ESM 风格且开启了 `production` 模式，打包器就能进行优化。

---

<br>

## **十、 总结**

### **<font color='red'>10.1 核心结论</font>**

在这场模块化演进中，**webpack-cli 6.x** 通过智能加载弥合了 CJS 与 ESM 的配置鸿沟。**“不设置 type + 源代码使用 ESM”** 既享受了现代化的开发体验，又避免了原生 ESM 严格的后缀限制。

**这就是 Webpack 5 的终极工程化实践！** 🎯

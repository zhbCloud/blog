---
title: Babel Runtime 依赖图谱与模块化 Polyfill 方案
img: /static/babel.webp
categories: 工程化与质量
tags:
  - Babel
  - webpack
  - 前端构建
abbrlink: 4179c0b9
date: 2026-03-02 11:34:59
---

# **Babel Runtime 依赖图谱与模块化 Polyfill 方案**

在使用 Babel 进行 JavaScript 代码编译时，为了优化打包体积并处理新增 API，我们经常会用到 `@babel/plugin-transform-runtime` 以及它的两个核心依赖库。本文档将详细梳理它们的作用、关系以及最佳实践配置。

### 前言

需要用到辅助函数和Polyfill垫片，是因为当前浏览器不支持js新语法，因此才会用到。

像现在的现代浏览器大部分都支持这写新语法，因此要测试你配置的是否生效，可将浏览器范围修改到ie9（`"browserslist": ["ie 9"]`）,设置 ie 9 只是为了"逼"Babel 进行语法降级转译，从而产生辅助函数，方便我们验证 @babel/runtime 是否生效。这是临时的实验手段。

测试的时候，由于本地开发时的特殊性，每次构建之间需要清除先缓存。

```bash
# 清除 babel-loader 和 webpack 的缓存
Remove-Item -Recurse -Force ./node_modules/.cache
npm run build
```

生产不存在这样情况

```bash
# 每次 CI 流水线都是全新的干净环境
git clone 项目代码
npm install       # 全新安装，没有 .cache
npm run build     # 第一次 build，没有任何缓存可命中
```

生产代码都是经过压缩混淆的 ，可以在 babel-loader 的缓存文件查看（**未压缩的 Babel 编译输出**）

![image-20260301180329607](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260301180329607.png)

## 1. 核心包概览

| 包名                                  | 类型                  | 核心作用                                                                                                                           |
| :------------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **`@babel/plugin-transform-runtime`** | **开发依赖** (`-D`)   | **“搬运工” / “指挥官”**。在编译时工作，自动将代码中内联的 Babel 辅助函数替换为从 `runtime` 库中统一引入。                          |
| **`@babel/runtime`**                  | **运行时依赖** (`-S`) | **“基础弹药库”**。提供 Babel 辅助函数（helpers）的实际运行的时代码。**不包含** Polyfill。                                          |
| **`@babel/runtime-corejs3`**          | **运行时依赖** (`-S`) | **“高级弹药库”**。是上面的增强版，提供 辅助函数（helpers）的同时，额外包含了基于 `core-js@3` 的 **非全局污染式** Polyfill。        |
| **`core-js@3`**                       | **运行时依赖** (`-S`) | **“标准库垫片基石”**。提供最新 ES 规范（API 层面）的底层实现，是默认通过**全局污染**方式生效的Polyfill，常配合 `preset-env` 使用。 |

---

## 2. 关系图解与工作原理

### 工作流依赖关系

```text
@babel/plugin-transform-runtime (编译时插件)
        │
        ├─发现内联的 Helper 函数 ─> 替换为引入  ─> @babel/runtime 或 @babel/runtime-corejs3
        │
        └─发现需要 Polyfill 的 API ─> 替换为引入  ─> @babel/runtime-corejs3
```

### 痛点与解决方式

Babel 在转译 `class` 或 `async/await` 等新语法时，默认会在**每个文件顶部**注入辅助函数。

```javascript
// 【转换前】没有 plugin-transform-runtime 时，每个文件都会冗余内联 helper
// a.js
function _classCallCheck() {
  /* 重复代码 */
}
class A {}

// b.js
function _classCallCheck() {
  /* 重复代码 */
}
class B {}
```

![image-20260301155319309](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260301155319309.png)

这会导致打包体积剧增。**`@babel/plugin-transform-runtime` 的出现就是为了解决这个问题：**

```javascript
// 【转换后】使用 plugin-transform-runtime 后，统一从模块按需引入
// a.js
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
class A {}

// b.js
import _classCallCheck from "@babel/runtime/helpers/classCallCheck"; // 完美复用
class B {}
```

---

## 3. 详细解析

### 3.1 `@babel/plugin-transform-runtime`

- **定位**：编译时的工具（安装在 `devDependencies`）。
- **职责 1**：提取runtime库中 Babel 辅助函数，防止重复注入，减小打包体积。
- **职责 2**：配合 `corejs` 配置，提供沙箱式的环境，防止 Polyfill 污染全局作用域（Global Scope）。

### 3.2 `@babel/runtime`

- **定位**：运行时的代码库（必须安装在 `dependencies`）。
- **内容**：只包含 helpers 函数实现（如 `_classCallCheck`）和 `regenerator-runtime`（用于 async/await）。
- **限制**：**不包含**像 `Promise`、`Array.prototype.includes` 等现代 API 的 Polyfill垫片。

### 3.3 `@babel/runtime-corejs3`

- **定位**：运行时的代码库，`@babel/runtime` 的替代升级版（必须安装在 `dependencies`）。
- **内容**：包含 helpers + `core-js@3` 的局部化 Polyfill。
- **优势**：当你在代码中使用 `new Promise()` 时，它会将其转换为局部引入（如 `import _Promise from "@babel/runtime-corejs3/core-js-stable/promise"`），而不会去修改浏览器全局的 `window.Promise`。

### 3.4 `core-js@3`

- **定位**：运行时的核心底层代码库，Babel 生态实现 API Polyfill 的真正基石（安装在 `dependencies` 中）。
- **内容**：包含了几乎所有的现代 JavaScript 新原生 API（例如 `Promise`、`Map`、`Set`、`Array.prototype.includes` 等）的实现。
- **特点**：它是**全局污染式（Global Scope）**垫片（会直接修改浏览器全局对象或原型链）。在开发普通 Web 业务应用时，这是不可或缺的核心库，通常与 `@babel/preset-env` 搭配让其按需引入。

---

## 4. 全局污染式与非全局污染式的 Polyfill

### 4.1. 全局污染式

**代表组合**：`@babel/preset-env` (配置 `usage`) + `core-js@3`

**工作原理**：
它相当于直接给浏览器“打补丁”。Babel 会在当前文件中按需引入缺失的 API，例如当你使用了 `Promise` 时，它会注入 `import "core-js/modules/es.promise.js"`。
这行代码执行时，如果发现当前浏览器环境（比如老旧版本的 IE）没有原生的 `Promise` 支持，就会**直接修改浏览器的全局对象（即挂载到 `window.Promise` 上）或全局原型链（如 `Array.prototype.includes`）**。

**特点与适用场景**：

- **优点（全局生效）**：项目中任何地方（包括没有用 Babel 编译过的第三方老旧脚本）都能沾光用到这个新特性。
- **缺点（环境冲突）**：如果你的代码作为第三方库被别人引入，你**粗暴地修改了使用者的浏览器全局变量**，可能会覆盖他们自己定义的同名方法，或是与他们使用的其它 Polyfill 产生冲突。
- **适用场景**：**开发普通的 Web 业务项目**。由于你作为开发者掌控着整个应用的运行环境，全局打补丁不仅最省事，也能确保代码的行为一致。

### 4.2. 非全局污染式

**代表组合**：`@babel/plugin-transform-runtime` + `@babel/runtime-corejs3`

**工作原理**：
它相当于给你提供了一个完整的“工具箱/沙箱”。Babel 发现你使用了 `Promise` 后，会悄悄把你代码中的 `Promise` 替换成一个私有变量 `_Promise`，然后从库里将其导入：

```javascript
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
new _Promise();
```

**它不会修改浏览器的 `window.Promise`**，只是替换了你当前模块里的相关标识符。

**特点与适用场景**：

- **优点（互不干扰）**：它生成的 Polyfill 是局部、私有的，完全不会影响宿主环境（浏览器环境或其他执行环境）的全局变量。
- **缺点（存在盲区与冗余）**：
  1. **无法 Polyfill 实例方法**：像 `'abc'.includes('a')` 这种挂载在原型链上的实例方法（Array、String 的原型方法等），因为 Babel 无法在编译时准确判断 `'abc'` 的类型，所以**无法对实例方法提供按需的局部 Polyfill**。
  2. **冗余打包**：如果一个项目引入了 10 个使用了无污染 Polyfill 的 NPM 包，这 10 个包可能各自打包了一份私有的 `_Promise`，导致最终产物体积增大。
- **适用场景**：**开发 NPM 第三方依赖包、组件库或工具库**。第三方库绝不能随意修改引入者运行环境下的全局变量，这势必引发不可预知的 Bug，因此不论缺点如何，第三方库都必须使用无污染的独立 Polyfill。

## 5. 选型指南与常见套路

### 如何选择依赖搭配？

| 开发场景                             | 核心需求                                                    | 黄金搭配                                                                                                               |
| :----------------------------------- | :---------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **纯语法转译**                       | 只需要转译箭头函数、class等，不需要 Polyfill                | `@babel/plugin-transform-runtime` <br> + `@babel/runtime`                                                              |
| **开发第三方库 / NPM组件包**         | 需要 Polyfill，但**绝对不能污染全局变量**，以免影响宿主环境 | `@babel/plugin-transform-runtime` <br> + `@babel/runtime-corejs3`                                                      |
| **开发普通 Web 业务项目** (🌟最推荐) | 需要按需 Polyfill，且允许全局修改。同时需要减少辅助函数体积 | `@babel/preset-env` (配置 `usage`) <br> + `core-js@3` <br> + `@babel/plugin-transform-runtime` <br> + `@babel/runtime` |

---

## 6. 安装与配置示例

### 场景 A：开发普通的 Web 业务项目 (Vue/React 应用)

让 `preset-env` 负责全局按需 Polyfill，让 `transform-runtime` 专职提取辅助函数。

**1. 安装依赖：**

```bash
# 核心 polyfill 与基础仓库
npm install core-js@3 @babel/runtime -S
# 编译插件与预设
npm install @babel/preset-env @babel/plugin-transform-runtime -D
```

**2. Babel 配置 (`babel.config.json`):** json文件不能有注释 要不然配置不生效

如果启用了 `useBuiltIns: "usage"`，你需要运行 `npm install --save core-js@3`（Polyfill 垫片库）来安装这个库，否则打包时可能会报错找不到模块。

```json
{
  "presets": [
    [
      "@babel/preset-env",

      {
        "useBuiltIns": "usage", // 按使用情况注入（Polyfill 垫片）
        "corejs": "3" // Polyfill 交给 preset-env，按需全局注入
        // "modules": false // 让 Babel 别管 ES6 Module 的 `import/export`，把这个能力保留给 Webpack/Vite 这种打包工具，以便它们做无用代码修剪（Tree-shaking）。

        // "targets": { // 建议将其放到 `package.json` 的 `browserslist` 字段中统一定义，这里可以直接不写。
        //   "edge": "17",
        //   "firefox": "60",
        //   "chrome": "67",
        //   "safari": "11.1"
        // }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false // 关键：设为 false，表示只提取 helpers，不处理 Polyfill
      }
    ]
  ]
}
```

> `"useBuiltIns": "usage"` 堪称 Babel 配置中**最核心、最实用**的属性之一。它的字面意思是**“按使用情况注入（Polyfill 垫片）”**，也就是我们常说的**“按需引入”**。

### 场景 B：开发工具库 / NPM 依赖包

一切交给 `transform-runtime`，实现零全局污染的局部 Polyfill。

**1. 安装依赖：**

```bash
# 包含无污染 polyfill 的高级仓库
npm install @babel/runtime-corejs3 -S
# 编译插件
npm install @babel/preset-env @babel/plugin-transform-runtime -D
```

**2. Babel 配置 (`babel.config.json`):**

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

> **说明**：`corejs: 3` 启用 corejs3 沙箱模式（无全局污染的局部 Polyfill），需提前安装 `@babel/runtime-corejs3`。

## 7. 知识拓展：babel核心配置属性

`"useBuiltIns": "usage"` 堪称 Babel 配置中**最核心、最实用**的属性之一。它的字面意思是**“按使用情况注入（Polyfill 垫片）”**，也就是我们常说的**“按需引入”**。

为了让你更容易理解，我们先来看看如果没有它会发生什么，以及它到底解决了什么痛点。

### 1. 它是用来解决什么问题的？

Babel 的主要工作有两部分：

1. **语法转换**：把箭头函数 `() => {}` 变成 `function() {}`，把 `let/const` 变成 `var` 等。这部分目标浏览器不支持的**新语法**，Babel 会直接帮你转译。
2. **API 垫片 (Polyfill)**：把诸如 `Promise`、`Set`、`Map`、`Array.prototype.includes` 这种目标浏览器不支持的**新 API (全局对象或原型方法)** 补充进去。Babel 默认**不会**转换这些新 API。

为了让老浏览器支持这些新 API，我们需要引入 `core-js`（一个包含了各种新 API 具体实现的库，俗称 Polyfill）。

### 2. `"useBuiltIns"` 的三种模式对比

配置如何引入 Polyfill，完全由 `"useBuiltIns"` 决定，它有三个值：

#### ❌ 模式一：`false` (默认值)

- **含义**：Babel 什么都不做。它只负责转换语法，不管你的 API 是否兼容。
- **结果**：如果你在代码里写了 `new Promise()`，打包后的代码依然是 `new Promise()`。如果低级浏览器不支持，代码就直接报错白屏了。如果你想兼容，必须自己手动在入口文件引入**完整**的 `core-js`。

```js
// src/main.js
import "core-js"; // 手动引入完整的包，体积非常巨大！
```

#### 🟡 模式二：`"entry"` (入口全局注入)

- **含义**：需要在入口文件手动引入一次包。Babel 会根据你的目标浏览器环境（`.browserslistrc`），把那些目标浏览器不支持的 API 的 Polyfill **全部替换注入进来**。

- 效果

  ```js
  // 你的源码 (src/main.js)
  import "core-js/stable";

  // Babel 编译后会变成这样拆分开的很多包：
  import "core-js/modules/es.array.unscopables.flat";
  import "core-js/modules/es.array.unscopables.flat-map";
  import "core-js/modules/es.object.assign";
  // ... 塞入一堆目标浏览器不支持的 API，不管你代码里有没有用到它。
  ```

- **痛点**：它不管你代码里实际写没写 `Promise` 或者 `Map`，只要目标浏览器不支持，它就全盘塞进去。虽然比手动引入完整的 `core-js` 小了一点，但依然会有大量**你根本没用到的代码被打包进去了，严重拖慢网页加载速度。**

#### 🟢 模式三：`"usage"` (按需注入 - ✨ 最佳实践 ✨)

- **含义**：Babel 会变得非常智能。它会**逐行扫描你写的每个 JS 文件**，看看你**到底用到了哪些新 API**，然后再结合目标浏览器环境，**只把你用到的并且浏览器不支持的 API 的 Polyfill 悄悄地塞到文件顶部**。

- **前提条件**：不需要你手动在入口 `import 'core-js'`。

- 效果演示： 假设你只写了一句代码：

  ```
  // 你的源码 A.js
  const arr = [1, 2, 3].includes(2);
  
  ```

  Babel 扫描发现：哟，你用了 `includes`！再一看你的目标配置说要兼容 IE11。IE11 不支持 `includes`。那么 Babel 就会帮你把编译结果偷偷变成这样：

  ```js
  // Babel 编译后的 A.js
  import "core-js/modules/es.array.includes.js"; // 【只为你按需引入这一个文件！】
  
  var arr = [1, 2, 3].includes(2);
  ```

### 🎯 总结

配置了 `"useBuiltIns": "usage"` 和 `"corejs": "3"` 后，你得到了完美的开发体验：

1. **省心**：再也不用管什么目标浏览器支不支持这个 API 了，也不用手动引入完整的 `core-js`，随便放开手脚写最新的 ES6+ 代码。
2. **极致的打包体积**：Babel 像个精确的手术刀一样，你用什么它引什么，一行多余的废代码都不打进最后的包里。它极大程度上优化了前端项目的首屏加载性能。

## 8. 一句话总结

1. `@babel/plugin-transform-runtime` 是编译时的 **“搬运工”**，负责修改你的代码并添加 `import` 引用。
2. `@babel/runtime` 和 `@babel/runtime-corejs3` 是运行时的 **“功能仓库”**，承载了实际要运行的代码逻辑。
3. 三者配合使用的终极目标是：**减少打包体积**、**按需引入 Polyfill**、**避免全局作用域污染**。****

---
title: Babel 7 从入门到进阶的全场景指南
img: /static/babel.webp
categories: 框架与生态
tags:
  - babel7
  - javascript
  - compiler
abbrlink: b41c92e1
date: 2026-02-27 22:30:00
---



> 📚 本指南旨在帮助开发者彻底掌握 Babel 7+ 的工作机制、配置技巧及核心插件系统的使用。

---

## 目录

1. [Babel 简介](#一-babel-简介)
2. [工作方式](#二-5-分钟搞懂-babel-的工作方式)
3. [快速上手](#三-最小可运行示例)
4. [核心概念](#四-必须弄懂的-4-个核心概念)
5. [Polyfill 实战](#五-preset-env--core-js)
6. [Runtime 优化](#六-runtime-与-polyfill-的区别)
7. [生态集成](#七-babel-与-ts--react-结合)
8. [打包构建](#八-babel-在-webpack-和-vite-中的生态定位)
9. [高级原理](#九-ast遍历与编译原理速通)
10. [插件开发](#十-手写一个-babel-插件)
11. [配置模板](#十一-终极一键复制配置模板)

<br>

## **一、 Babel 简介**

### **<font color='red'>1.1 Babel 是什么？解决什么问题？</font>**

**一句话**：Babel 是一个 **JavaScript 编译器（Compiler / Transpiler）**，把“你写的现代 JS/TS/JSX”等代码，转换成“目标环境（老版浏览器/Node）能平稳运行的代码”。

你会在这些场景用到 Babel：

- **降级新语法**：把 ES202x 新语法转成旧语法（比如可选链 `?.`、空值合并 `??`、class 私有字段等）。
- **编译 JSX**：把 React 或 Vue 的 JSX 转成 `React.createElement` 或 `jsx-runtime` 的原生函数调用形式。
- **擦除 TypeScript**：把 TypeScript 里的类型声明直接去掉（**注意：Babel 不做任何类型检查**）。
- **做代码定制化变换**：比如自动注入日志、移除 `console.log`、按需引入组件库样式、甚至开发自己的宏（Macros），这些通常靠 Babel 插件完成。

---

<br>

## **二、 5 分钟搞懂 Babel 的工作方式**

### **<font color='red'>2.1 编译流水线</font>**

Babel 编译其实就是一条 3 步走的流水线：

1. **Parse（解析）**：源码字符串转换成计算机更容易理解处理的数据结构**AST（抽象语法树）**
   - 由 `@babel/parser`（以前被称为 Babylon）负责完成。
2. **Transform（遍历 / 转换阶段）**：接收 Parse 阶段生成的 AST，对其进行深度优先遍历，并允许我们对树上的节点进行增、删、改操作（**Babel 插件全在这里工作**）
   - 由 `@babel/traverse` 负责完成，这是你编写自定义 Babel 插件时**唯一需要介入**的阶段。Babel 在这里采用了**访问者模式 (Visitor Pattern)**。
3. **Generate（生成）**：拿着经过 Traverse 阶段被插件修改过的全新 AST 树，把它重新拼接复原成普通的 JavaScript 代码字符串。
   - 由 `@babel/generator` 负责完成。在这个阶段，Babel 会再次深度优先遍历新的 AST，根据节点的各种类型，翻译成目标代码。在这个阶段，同时也可以提取出 **Source Map（源码映射表）**，方便开发者在浏览器里调试。

> 💡 **核心结论**：
>
> - Babel 自己的“本能”其实很弱，所有的实际能力都来自 **插件（Plugins）**。
> - 但你不可能为了编译一个项目一个个去手写或安装几十个插件，所以官方提供了 **预设（Presets）**（即一组打包好的插件集合）。

---

<br>

## **三、 最小可运行示例**

> ⚠️ **避坑指南**：Babel 7 开始，所有官方包都移入了 `@babel/` 作用域命名空间。如果你在网上查教程，看到 `babel-core`、`babel-preset-env`（没有 `@` 开头的），请直接关闭网页，那是老旧的 Babel 6 黑历史！

### **<font color='red'>3.1 安装核心包</font>**

```bash
npm i -D @babel/core @babel/cli
```

### **<font color='red'>3.2 写一个最简单的配置</font>**

创建 `babel.config.json`（Babel 7 推荐，放置在项目根目录）：

```json
{
  "presets": []
}
```

### **<font color='red'>3.3 尝试编译</font>**

```bash
npx babel src --out-dir dist
```

_你会发现：不加任何 preset 或 plugin 时，Babel 输出的代码和源码一模一样。因为它“没有被灌输任何变换规则”。_

---

<br>

## **四、 必须弄懂的 4 个核心概念**

### **<font color='red'>4.1 @babel/core 是什么？</font>**

Babel 核心编译引擎，负责解析代码、调度执行配置好的插件、生成最终代码。但其实它自己什么语法都不会转。

### **<font color='red'>4.2 Plugin（插件）是什么？</font>**

**插件“从左往右”**：如果有多个插件，排在前面的先执行。

插件就是一个 JS 模块，负责告诉 Babel：遇到某种特定的 AST 节点时，该怎么改。
_例如：遇到“箭头函数”，就把它转成 `function () {}`；遇到 `?.`，就改成安全的兼容判断。_

### **<font color='red'>4.3 Preset（预设）是什么？</font>**

**预设“从右往左”**（逆序）：如果有多个预设，排在**后面**的先执行。

预设解决的是“懒人不用挑插件”的问题。现代项目最常用的老三样：

- **`@babel/preset-env`**：智能预设，根据你配置的目标浏览器，自动决定需要转哪些 JS 语法。
- **`@babel/preset-react`**：专门用来编译 JSX。
- **`@babel/preset-typescript`**：负责把 TS 类型代码擦除成普通的 JS（不做类型检查）。

### **<font color='red'>4.4 配置文件怎么选？</font>**

- **`babel.config.json`（Babel 7+ 强烈推荐）**：作用于整个项目（甚至跨层级的 monorepo），一劳永逸。
- **`.babelrc` / `.babelrc.json`**：只针对当前文件夹目录生效（局部配置），在复杂的 monorepo 工程中非常容易出现配置覆盖和失效的深坑。

---

<br>

## **五、 @babel/preset-env + core-js**

这一章是 Babel 学习的分水岭：大家经常把 **语法转换** 与 **API 补齐（Polyfill）** 混为一谈。

### **<font color='red'>5.1 语法转换 ≠ API 补齐</font>**

- **Babel（准确说是 preset-env 自身）主要负责语法**：比如 `const` 改成 `var`、去掉箭头函数等。
- **但是对于新的 API 或内置对象**：比如 `Promise`、`Array.from`、`Object.assign`、`[].includes`，老浏览器里根本没有这些全局对象和原型方法。Babel 转换后还是 `Promise` 字母，必定在旧浏览器报错。我们需要 **Polyfill** 给环境打补丁。

> ⚠️ **废弃提醒**：以前大家常装一个万金油包叫 `@babel/polyfill`。**从 Babel 7.4 起这个包已被废弃！** 现在的标准做法是直接使用 `core-js`，靠 `preset-env` 去自动引入。

### **<font color='red'>5.2 正确的配置姿势（按需注入 Polyfill）</font>**

首先安装 `core-js`（生产依赖）：

```bash
npm i core-js
# 注意，preset 仍然放开发依赖
npm i -D @babel/preset-env
```

配置 `babel.config.json`：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.2%, not dead",
        "useBuiltIns": "usage",
        "corejs": "3.38",
        "modules": false
      }
    ]
  ]
}
```

#### **<font color='#10c300'>1）必懂参数解析</font>**

- `targets`：你的目标环境。建议将其放到 `package.json` 的 `browserslist` 字段中统一定义，这里可以直接不写。
- `useBuiltIns: "usage"`：**真正的神级配置，重点注意！** 这是按需加载模式。这意味着在你项目的**源码文件中，绝对不需要手动写 `import 'core-js'`**。Babel 会静态分析你的代码，比如你用到了 `Promise`，它就在编译后的该文件顶部，自动帮你默默塞入一句 `import "core-js/modules/es.promise.js"`。这就叫按需补齐，体积最小！
  - _（补充：如果这里配置成 `"entry"`，那你才需要在项目入口文件如 `main.js` 的第一行手动写上一句 `import "core-js"`，此模式会把浏览器缺失的 API 全量打进来，容易导致包体积过大，不推荐。）_
- `corejs`：指定 core-js 的主版本号（目前标配使用的是 3.x ）。
- `modules: false`：让 Babel 别管 ES6 Module 的 `import/export`，把模块化的保留权交给 Webpack/Vite 这种打包工具，以便它们做无用代码修剪（Tree-shaking）。

---

<br>

## **六、 Runtime 与 Polyfill 的区别**

很多人到死都没搞清楚 `core-js` 和 `@babel/runtime` 为什么同时出现。

### **<font color='red'>6.1 为什么需要 runtime 插件？</font>**

Babel 在转译像 `class`、`async/await` 这种复杂新特性时，会在文件里注入一些辅助函数（Helpers）。比如：`_classCallCheck`。
如果项目里有 100 个文件用了 `class`，这段冗长的 helper 函数就会被内联 100 次，包体积会变得极速膨胀。

#### **<span style='color:#10c300'>1）为什么需要辅助函数</span>**

这触及了 Babel 转译的核心——**语法模拟（Syntax Emulation）**。

- **为什么不能直接转译？**

  虽然 ES6 的 `class`、`async/await` 经过 Babel 转换后变成了 ES5 的代码（主要是 `function` 和 `prototype`），但 ES5 本身的语法非常简陋。为了让转译后的 ES5 代码**表现得和 ES6 原生一模一样**，Babel 必须额外写一堆逻辑来“模拟”这些新特性的行为。

- **以 _classCallCheck 为例**

  在 ES6 中，如果你直接像调用普通函数一样调用 `class`（即不加 `new`），JS 引擎会报错：`TypeError: Class constructor cannot be invoked without 'new'`。

  **但是**，转译成 ES5 后，`class` 变成了普通的 `function`。在 ES5 里，`function` 是可以直接调用的。

  为了**强制报错（模拟原生行为）**，Babel 就会注入 `_classCallCheck`：

  ```js
  // Babel 生成的辅助函数
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  
  // 转译后的代码
  var Person = function Person() {
    _classCallCheck(this, Person); // 检查是不是用 new 调用的
  };
  ```

  

### **<font color='red'>6.2 transform-runtime 的作用</font>** 

安装配套：

```bash
npm i -D @babel/plugin-transform-runtime
npm i @babel/runtime
```

配置（**这通常写在你的 `babel.config.json` 或对应 Babel 配置文件中**）：

> 💡 **极其容易困惑的基础知识**：
> 在 Babel 配置文件中，`presets`（预设数组） 和 `plugins`（插件数组） 是**完全同级并列**的。

```json
{
  "presets": [
    // 这里放 Babel 的环境预设、React 预设等
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        // 核心参数：告诉 Babel 帮我把内联的辅助函数（Helpers）替换为以 module 形式引入 @babel/runtime 相关方法
        "<br>	": true, // 默认true
        // 是否开启 generator 相关的 polyfill 抽离，避免全局污染全局变量
        "regenerator": true // 默认true
        // (可选) 如果你是开发 npm 包库，不想全局引入 Promise 等 API
        // 你可以把这里的 corejs 设为 3，让 Babel 从 runtime 帮你进行局部的安全 polyfill 加载
        // "corejs": 3
      }
    ]
  ]
}
```

#### **<font color='#10c300'>1）核心结论</font>**

`transform-runtime` 被召唤出来就是为了 **避免每个文件重复声明 Babel Helper**。它会把那些注入的辅助函数，统统变成 `require("@babel/runtime/helpers/xxx")` 这个包里的引用。包体积瞬间被拯救。

> 💡 **项目选择建议**：
>
> - **做业务项目（Web App）**：用 `@babel/preset-env` 配上 `core-js` (useBuiltIns) 做全局 Polyfill。
> - **开发基础组件库/NPM 包**：尽量不要用 `useBuiltIns` 去污染全局原型，而是完全依赖 `@babel/plugin-transform-runtime` 做局部沙盒版的 api 隔离降级（配置它的 `corejs` 选项）。

---

<br>

## **七、 Babel 与 TS / React 结合**

### **<font color='red'>7.1 React：自动引入 JSX 运行时</font>**

配置：

```json
{
  "presets": [["@babel/preset-react", { "runtime": "automatic" }]]
}
```

_`runtime: "automatic"`（React 17+ 特性）意味着你再也不用在组件第一行手动写 `import React from "react"` 了。_

### **<font color='red'>7.2 TypeScript：编译 TS 这点坑</font>**

配置：

```json
{
  "presets": ["@babel/preset-typescript"]
}
```

#### **<font color='#10c300'>1）关键注意事项</font>**

1. Babel 剥离 TS 极快，但**不负责类型检查**。想要类型检查报错，得加上 `tsc --noEmit` 命令配合。
   - **具体操作**：你应该在根目录下生成一个 `tsconfig.json` 文件。然后在项目的 `package.json` 的 `scripts` 中添加一条脚本，例如 `"type-check": "tsc --noEmit"`。在每次打包（如 `npm run build`）或者提交代码（配合 husky + lint-staged）之前，先运行这条命令，以便把任何类型错误扼杀在摇篮里。这里 `--noEmit` 的意思是：tsc 编译器只负责报错，坚决不输出任何编译后的 js 文件（因为输出打包的工作已经全权交给 Babel / Webpack / Vite 了）。
2. **踩坑预警**：如果你直接用 `@babel/cli` 去编译一个带有 TS 文件的项目，它默认是会忽略 `.ts` 扩展名的！必须通过 CLI 指定扩展名才能生效：
   `npx babel src --out-dir dist --extensions ".ts,.tsx"`

---

<br>

## **八、 Babel 在 Webpack 和 Vite 中的生态定位**

- **Webpack（搭配 `babel-loader`）**：
  在 Webpack 中，一切都靠 loader 接入。当 Webpack 遇到 `.js/.ts/.jsx` 时，会交给 `babel-loader` 唤醒 Babel 编译，编译后的字符串再吐回给 Webpack 打包。
- **Vite（基于 ESBuild）**：
  Vite 在开发环境下主要使用 go 语言写的 ESBuild 极速转译代码，默认不启用 Babel。但在一些依赖 Babel 生态的场景下（例如 React 的 Fast Refresh 热更新、CSS in JS 宏、旧版本浏览器兼容、按需组件导入等），Vite 依然会借助自身的插件底层调用 Babel 辅助构建。

---

<br>

## **九、 AST、遍历与编译原理速通**

你不需要成为编译原理专家，但要记住这 3 个词：

### **<font color='red'>9.1 AST（Abstract Syntax Tree，抽象语法树）</font>**

简单来说：**AST 就是把你写的“源代码字符串”，转换成了计算机（编译器）更容易理解和操作的“树状数据结构”。**

- **为什么需要 AST？**
  对于计算机来说，代码只是一串字符序列，想要修改、翻译或者检查代码（比如处理复杂的嵌套和作用域），直接操作字符串极其困难。所以需要把一维字符串解析成结构化的树状数据（通常是 JSON 格式）。
- **代码是怎么变成 AST 的？**
  这个过程叫做**解析（Parsing）**，通常分为两步：
  - **词法分析（Tokenization）**：把代码切成一个个具备独立意义的“词法单元”（Tokens）。例如 `let a = 1;` 会被切成：`let`, `a`, `=`, `1`, `;`。
  - **语法分析（Syntax Analysis）**：把切出来的 Tokens 数组，根据 JS 语法规则组合拼装成树状结构（AST）。比如 `let a = 1;` 会被解析成包含 `VariableDeclaration`、`Identifier`、`NumericLiteral` 等节点的树。
- **AST 的用处：**
  前端工程化里 90% 的“魔法”（比如 Babel 转译、ESLint 检查、Webpack 构建依赖图谱、Vue/React 模板编译）的核心流程都是：**源码 → AST → 操作（修改/分析）AST → 重新生成代码**。

### **<font color='red'>9.2 Visitor（访问者模式）</font>**

你可以把这个想成一个事件监听器，设定“当我遍历 AST 遇到特定的节点（比如遇到 `BinaryExpression` 节点）时，触发我的回调函数”。

- 通过节点类型（如CallExpression()）进入钩子函数。
- 传入的参数是 `path`（路径），它包含了当前节点数据 `path.node` 和很多操作节点的 API 挂载点。
- **关键**：仅靠节点类型是不够的（比如有很多函数调用），必须使用 `@babel/types` (即 `t`) 提供的方法进行严谨的条件过滤，避免误伤其他代码。

### **<font color='red'>9.3 Path（路径对象）</font>**

插件拿到节点不仅仅是拿到节点本身的数据，而是拿到一个 Path 包装对象。它不仅包含了当前节点的信息，还包含了节点之间的父子上下文关联，并通过调用 `path.replaceWith()`、`path.remove()` 等提供的一整套 API 让你去安全地修改和操作 these 节点。

- **删**：`path.remove()`
- **改**：`path.replaceWith(newNode)` 或直接修改 `path.node.xxx` 的属性。
- **增**：`path.insertBefore(newNode)` 或 `path.insertAfter(newNode)`。
- **创建新节点**：使用 `@babel/types` (如 `t.identifier('myVar')`) 或 `@babel/template` (根据字符串模板快速生成复杂 AST)。

---

<br>

## **十、 手写一个 Babel 插件**

```js
// babel插件核心结构
export default function ({ types: t }) {
    return {
        name: "remove-console",
        visitor: {
            // ...
        },
    };
}
```

### **<span style='color:red'>10.1 项目结构</span>**

```
babel-plugin-dome/
    │
    ├── src/                    # 测试源码目录（你想用 Babel 转换的代码）
    │   └── index.js            # 包含各种 console.log let 等待被转换的 JS 文件
    │
    ├── plugin/                 # Babel 插件源码目录（你手写的插件全放在这里）
    │   ├── remove-console.js   # 我们实现的第一个插件：移除 console 对象调用
    │   └── let-to-var.js       # 我们实现的第二个插件：将 let 转换为 var
    │
    ├── dist/                   # 编译结果目录（Babel 转换后生成的代码存放在此）
    │   └── index.js            # 经过转换后的最终 JS 文件
    │
    ├── babel.config.json       # Babel 的核心配置文件（用来引入我们的自定义插件）
    │  
    ├── package.json            # npm 项目描述文件
    │
    └── node_modules/           # 项目依赖模块包（Babel 运行时所需的第三方库）
```

### **<span style='color:red'>10.2、安装依赖</span>**

```bash
npm i @babel/cli @babel/core @babel/preset-env -D
```

```json
{
    "devDependencies": {
        "@babel/cli": "^7.28.6",
        "@babel/core": "^7.29.0",
        "@babel/preset-env": "^7.29.0"
    }
}
```

### **<span style='color:red'>10.3、配置</span>**

```js
// src\index.js
// 这是待转换的业务代码
const add = (a, b) => {
    console.log("计算开始，参数：", a, b);
    const result = a + b;
    console.warn("这是一个警告");
    console.error("这是一个错误日志");
    return result;
};

console.log(add(1, 2));

var a = 1;
var b = 2;
```

```js
// plugin\remove-console.js
// Babel 插件就是一个函数，接收 babel 对象，返回一个包含 visitor 的对象
// visitor 是「访问者模式」的体现：Traverse 阶段会遍历每个 AST 节点，
// 当节点类型匹配时，自动调用对应的钩子函数
export default function ({ types: t }) {
    return {
        name: "remove-console",
        visitor: {
            CallExpression(path) {
                const { callee } = path.node;
                if (
                    t.isMemberExpression(callee) &&
                    t.isIdentifier(callee.object, { name: "console" })
                ) {
                    path.remove();
                }
            },
        },
    };
}
```

- types: 就是@babel/types 包含各种构建和校验 AST（抽象语法树）节点工具的方法库
- visitor: 这是插件的核心。Babel 会遍历（Traverse）代码生成的 AST，visitor 对象定义了当 Babel “访问”到特定类型的节点时该执行的操作。
- CallExpression: 这是一个 AST 节点类型，代表函数调用表达式（例如 func() 或 console.log()）。
- path: 代表当前节点的“路径”对象。它不仅包含当前节点的信息（path.node），还包含与父节点的关系、作用域信息，以及操作节点的方法（如 path.remove）。
- path.node: 获取当前的 CallExpression 节点。
- callee: 函数调用中的“被调用者”。在 console.log() 中，callee 就是 console.log 这部分。
- t.isMemberExpression(callee): 判断被调用者是否是一个成员表达式。
  - console.log 是成员表达式（对象 console 上的属性 log）
  - 普通的 alert() 就不是成员表达式，而是 Identifier。
- t.isIdentifier(callee.object, { name: "console" }): 进一步判断该成员表达式的对象（object）部分是否是一个名为 "console" 的标识符（Identifier）。
  - 这确保了我们匹配的是 console.log、console.error 等，而不会误伤其他类似的调用。



```js
// plugin\let-to-var.js
module.exports = function ({ types: t }) {
    return {
        name: "let-to-var",
        visitor: {
            VariableDeclaration(path) {
                // 如果当前声明的不是 let，则不处理，直接返回
                if (path.node.kind !== "let") return;

                // 将声明的 kind 从 let 修改为 var
                path.node.kind = "var";
            },
        },
    };
};
```

**调用**

```js
// babel.config.json
{
    "presets": ["@babel/preset-env"],
    "plugins": ["./plugin/remove-console.js", "./plugin/let-to-var.js"]
}

```



---

<br>

## 十一、编写插件的核心注意点

### **<span style='color:red'>11.1、切勿产生死循环 (Infinite Loops)</span>**

如果你在某个节点中**插入或替换**了一个与当前节点类型相同的新节点，Babel 会继续遍历这个新生成的节点，从而引发死循环。 

#### **<span style='color:#10c300'>1）死循环发生的场景模拟</span>**

假设我们写了这样一个插件：**“只要看到标识符 `foo`，就把他替换成新的标识符 `foo`”**（虽然看起来没用，但很典型）。

```js
visitor: {
  Identifier(path) {
    if (path.node.name === 'foo') {
      // 创建一个新的 foo 节点，替换掉老的 foo 节点
      path.replaceWith(t.identifier('foo')); 
    }
  }
}
```

#### **<span style='color:#10c300'>2）为什么会死循环？(Babel 的微观视角)</span>**

```
  1. 遍历到 Identifier 节点 { type: "Identifier", name: "foo" }
     ↓
  2. 触发 Identifier 钩子
     ↓
  3. 执行 replaceWith，创建新节点 { type: "Identifier", name: "foo" }
     ↓
  4. Babel 继续遍历这个新节点
     ↓
  5. 新节点类型是 Identifier，又触发 Identifier 钩子  ← 回到步骤 2！
     ↓
  6. 无限循环... 💀
```

#### **<span style='color:#10c300'>3）为什么对新节点会重新遍历？</span>**

Babel 这么设计**并不是 Bug，而是一个必须存在的 Feature（特性）**。

**场景设定**：假设你有两个插件（执行顺序先A后B）

__插件 A__：把 `foo` 替换成复杂的自执行函数`(function(){ console.log('bar') })()`

__插件 B__：移除所有 `console.log`

**<span style='color:cornflowerblue'>如果 Babel 替换后"拍拍屁股走人"（不重新遍历）</span>**

不对新节点重新遍历就像Babel 只处理了你替换的那个节点本身，但没有深入遍历新节点内部的子节点。

```javascript
遍历过程：
1. 遇到 CallExpression (foo())
2. 插件 A 把它替换成 (function(){ console.log('bar') })()
3. Babel 说："好的，替换完了，继续遍历下一个节点"
4. 插件 B 根本没机会看到新插入的 console.log('bar')
5. 最终输出：(function(){ console.log('bar') })()  ← console 没被移除！
```

**<span style='color:cornflowerblue'>如果 Babel 对新节点重新遍历</span>**

```javascript
遍历过程：
1. 遇到 CallExpression (foo())
2. 插件 A 把它替换成 (function(){ console.log('bar') })()
3. Babel 说："等等，这是个新节点，我要重新遍历它内部的子节点"
4. 遍历新节点内部：
   - 遇到 FunctionExpression
   - 遇到 BlockStatement
   - 遇到 ExpressionStatement
   - 遇到 CallExpression (console.log('bar'))  ← 插件 B 发现了它！
5. 插件 B 把 console.log 移除
6. 最终输出：(function(){ })()  ← console 被正确移除！
```

#### **<span style='color:#10c300'>4）如何打破这个死循环？</span>**

既然这是正常机制，Babel 也给我们提供了**“免检金牌”**，主要有两种方式来打破死循环：

**方案 1：打上人工标记 (Flag) 🌟（最常用）**

在生成新节点的时候，自己给它盖个章，在钩子最前面拦截：

```js
visitor: {
  Identifier(path) {
    // 1. 如果这个节点有“免检印章”，直接放行
    if (path.node._isVisited) return; 

    if (path.node.name === 'foo') {
      const newNode = t.identifier('foo');
      // 2. 给新节点盖章
      newNode._isVisited = true; 
      
      path.replaceWith(newNode);
    }
  }
}
```

**方案 2：利用 `path.skip()` 直接命令 Babel 跳过**

如果替换后，你明确知道这个节点内部再也没有需要处理的子节点了，可以直接命令 Babel 质检员：“跳过对当前节点本身以及它所有子孙节点的二次遍历！”

```js
visitor: {
  Identifier(path) {
    if (path.node.name === 'foo') {
      path.replaceWith(t.identifier('foo'));   
      // 告诉 Babel：这个新节点我担保没问题，你跳过它，去检查下一个树枝吧！
      path.skip(); 
    }
  }
}
```

**总结**：之所以死循环，是因为 Babel 为了保证 AST 的转换严谨性，**默认会对一切新插入的节点进行二次递归遍历**。如果你替换的恰好是同类型的节点，就会在原地无限触发同一个 Visitor 钩子。利用变量标记或 `path.skip()` 即可轻松破解。



### **<span style='color:red'>11.2、注意作用域与变量名冲突 (Scope & Binding)</span>**

如果你想在 AST 中插入新的变量声明，切忌直接写死变量名（例如强行插入一个 `const temp = 1;`），这极易覆盖原有代码里的同名变量。

 **解决办法**：利用 Babel 提供的作用域 API `path.scope.generateUidIdentifier('temp')`，它会自动在当前作用域寻找没有被占用的安全变量名（如 `_temp`、`_temp2`）。

### **<span style='color:red'>11.3、避免使用全局变量维持状态</span>**

Babel 在编译多文件项目时，使用的是同一个插件实例。如果你把一些临时状态挂载在插件最外层的全局变量上，不同文件编译时会导致状态污染。 

**解决办法**：将状态保存在 `state` 参数中，或者在 pre（遍历前）和 `post`（遍历后）生命周期钩子中初始化和清理状态。

```js
visitor: {
  Program: {
    enter(path, state) {
      // 遍历整个文件前，在 state 上挂载状态
      state.myCustomData = []; 
    }
  },
  CallExpression(path, state) {
    // 读取状态
    state.myCustomData.push(path.node);
  }
}
```

### **<span style='color:red'>11.4. 尽早退出，优化性能 (Bail Out Early)</span>**

庞大项目的 AST 非常深。如果你的条件不匹配，应该在 `visitor` 函数的第一行尽早 `return`，而不是把逻辑嵌套在深层的 `if` 块中。这能大幅提升编译速度。

### **<span style='color:red'>11.5. 优雅的抛出错误</span>**

如果在解析过程中发现了不符合插件预期的非法语法，不要只用 `console.error`。使用 `path.buildCodeFrameError(message)` 抛出错误可以像原生 Babel 报错一样，在终端里精准地画出红线，指出出错的代码位置，极大提升调试体验。

### **<span style='color:red'>11.6. 善用 `@babel/template`</span>**

当需要插入一大段复杂的代码逻辑时，用 `@babel/types` 一层层组装极度繁琐且容易发疯。引入 `@babel/template` 可以直接像写原生字符串一样生成代码树：

```js
const template = require('@babel/template').default;

const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE);
`);

// 调用并传入变量，直接生成优雅的 AST
const ast = buildRequire({
  IMPORT_NAME: t.identifier("myModule"),
  SOURCE: t.stringLiteral("my-module")
});
```

## **十二、 终极一键复制配置模板**

### **<font color='red'>11.1 绝大多数现代工程（Vue/普通 JS 项目，使用打包工具）</font>**

**`babel.config.json`**：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "3.38"
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": true,
        "regenerator": true
      }
    ]
  ]
}
```

**依赖清单**：

```bash
npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime
npm i core-js @babel/runtime
```

### **<font color='red'>11.2 React + TS 前端主应用项目</font>**

**`babel.config.json`**：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "3.38"
      }
    ],
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      { "helpers": true, "regenerator": true }
    ]
  ]
}
```

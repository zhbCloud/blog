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

# 🚀 彻底搞懂 Babel：从入门到进阶的全场景指南

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

1. **Parse（解析）**：源码字符串 → **AST（抽象语法树）**
2. **Transform（转换）**：对 AST 节点做各种增删改操作（**Babel 插件全在这里工作**）
3. **Generate（生成）**：修改后的 AST → 新代码字符串（以及对应的 SourceMap）

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

插件就是一个 JS 模块，负责告诉 Babel：遇到某种特定的 AST 节点时，该怎么改。
_例如：遇到“箭头函数”，就把它转成 `function () {}`；遇到 `?.`，就改成安全的兼容判断。_

### **<font color='red'>4.3 Preset（预设）是什么？</font>**

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
        "helpers": true,
        // 是否开启 generator 相关的 polyfill 抽离，避免全局污染全局变量
        "regenerator": true
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

### **<font color='red'>9.3 Path（路径对象）</font>**

插件拿到节点不仅仅是拿到节点本身的数据，而是拿到一个 Path 包装对象。它不仅包含了当前节点的信息，还包含了节点之间的父子上下文关联，并通过调用 `path.replaceWith()`、`path.remove()` 等提供的一整套 API 让你去安全地修改和操作 these 节点。

---

<br>

## **十、 手写一个 Babel 插件**

**需求**：把代码中的 `__DEV__` 替换为 `process.env.NODE_ENV !== "production"`，方便做开发环境包裹。

### **<font color='red'>10.1 插件代码（`replace-dev-flag.js`）</font>**

```javascript
module.exports = function myPlugin({ types: t }) {
  return {
    name: "replace-dev-flag",
    visitor: {
      Identifier(path) {
        // 发现不是目标变量，直接放行
        if (path.node.name !== "__DEV__") return;

        // 生成目标表达式
        path.replaceWith(
          t.binaryExpression(
            "!==",
            t.memberExpression(
              t.memberExpression(t.identifier("process"), t.identifier("env")),
              t.identifier("NODE_ENV"),
            ),
            t.stringLiteral("production"),
          ),
        );
      },
    },
  };
};
```

### **<font color='red'>10.2 在配置中使用它</font>**

```json
{
  "plugins": ["./babel-plugins/replace-dev-flag.js"]
}
```

---

<br>

## **十一、 终极一键复制配置模板**

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

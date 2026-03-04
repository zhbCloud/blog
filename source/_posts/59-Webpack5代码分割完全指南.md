---
title: Webpack 5 代码分割完全指南 (Code Splitting)
img: /static/59.webp
categories: 工程化与质量
tags:
  - webpack5
  - 性能优化
abbrlink: 59a1b2c3
date: 2026-03-04 14:00:00
---

# Webpack 5 代码分割完全指南 (Code Splitting)

> 📚 本指南旨在帮助开发者深入掌握 Webpack 5 的代码分割技术，从基础原理到生产环境的高级配置一应俱全。

---

## 目录

1. [为什么需要代码分割](#一、为什么需要代码分割)
2. [代码分割的三种方式](#二、代码分割的三种方式)
3. [入口起点分割](#三、入口起点分割)
4. [SplitChunksPlugin 详解](#四、splitchunksplugin-详解)
5. [动态导入（Dynamic Import）](#五、动态导入dynamic-import)
6. [魔法注释（Magic Comments）](#六、魔法注释magic-comments)
7. [代码分割统一命名规范](#七、代码分割统一命名规范)
8. [预获取与预加载](#八、预获取与预加载)
9. [Tree Shaking 与代码分割的协同](#九、tree-shaking-与代码分割的协同)
10. [实战：完整的代码分割配置方案](#十、实战完整的代码分割配置方案)
11. [分析与优化](#十一、分析与优化)
12. [针对不同类型项目的配置建议](#十二、针对不同类型项目的配置建议)

<br>

## **一、为什么需要代码分割**

在一个未经优化的 Webpack 项目中，所有代码会被打包成 **一个巨大的 bundle 文件**。这带来几个严重问题：

1. **首屏加载慢**：用户必须下载全部代码（包括当前页面根本不需要的部分）才能看到页面内容。
2. **缓存利用率低**：修改任何一行代码，整个 bundle 的 hash 都会变化，用户需要重新下载一切。
3. **并行加载受限**：浏览器的并发请求能力被浪费，只需下载一个文件却不能利用多连接并行。

**代码分割（Code Splitting）** 的核心思想就是：**把一个大 bundle 拆成多个更小的 chunk，按需加载或并行加载**。

```
┌──────────────────────────────────────────────┐
│                                              │
│        未分割：一个巨大的 bundle.js            │
│        (所有页面、所有库、所有逻辑)             │
│                                              │
└──────────────────────────────────────────────┘
                    ↓ 代码分割后
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ vendor.js│  │  main.js │  │ pageA.js │  │ pageB.js │
│(第三方库) │  │(公共逻辑) │  │(按需加载) │  │(按需加载) │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

<br>

## **二、代码分割的三种方式**

Webpack 提供了三种方式实现代码分割，它们可以组合使用：

| 方式                  | 说明                         | 适用场景                     |
| --------------------- | ---------------------------- | ---------------------------- |
| **入口起点**          | 在 `entry` 中配置多个入口    | **多页面应用（MPA）**        |
| **SplitChunksPlugin** | 自动提取公共依赖和第三方库   | 所有项目，尤其是有共享模块时 |
| **动态导入**          | 使用 `import()` 语法按需加载 | 路由级懒加载、大型功能模块   |

---

<br>

## **三、入口起点分割(不常用)**

### **<font color='red'>3.1 基础多入口配置</font>**

最简单的代码分割方式是手动在配置中指定多个入口：

```javascript
// webpack.config.js
module.exports = {
  // ./src/app.js'，只有一个入口文件，单入口
  entry: {
    // 有多个文，多入口
    app: "./src/app.js",
    admin: "./src/admin.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash:8].js",
  },
};
```

这样会生成 `app.xxx.js` 和 `admin.xxx.js` 两个独立的 bundle。

### **<font color='red'>3.2 问题：重复打包</font>**

假设 `app.js` 和 `admin.js` 都引入了 `lodash`，那么 `lodash` 会被 **打包两次**，分别出现在两个 bundle 中。这显然是一种浪费。

```javascript
// src/app.js
import _ from "lodash";
console.log(_.join(["App", "Module"], " "));

// src/admin.js
import _ from "lodash";
console.log(_.join(["Admin", "Module"], " "));
```

**打包结果（未去重时）：**

```
app.abcd1234.js    → 包含 lodash + app 逻辑（约 70KB + 1KB）
admin.efgh5678.js  → 包含 lodash + admin 逻辑（约 70KB + 1KB）
```

`lodash` 被重复包含了两次！这就需要 `SplitChunksPlugin` 来解决了。

### **<font color='red'>3.3 使用 dependOn 共享模块</font>**

Webpack 5 提供了 `dependOn` 选项来手动声明入口间的依赖关系。根据共享模块的数量，有以下几种配置方式：

#### **<font color='#10c300'>1）场景一：共享单个模块</font>**

```javascript
module.exports = {
  entry: {
    // 把 lodash 单独声明为一个共享入口
    shared: "lodash",
    app: {
      import: "./src/app.js",
      dependOn: "shared",
    },
    admin: {
      import: "./src/admin.js",
      dependOn: "shared",
    },
  },
  output: {
    filename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

**打包结果（去重后）：**

```
shared.xxxx.js  → 只包含 lodash（约 70KB）
app.xxxx.js     → 只包含 app 自身逻辑（约 1KB）
admin.xxxx.js   → 只包含 admin 自身逻辑（约 1KB）
```

#### **<font color='#10c300'>2）场景二：共享多个模块</font>**

如果入口文件共同依赖了多个第三方库（如 `lodash`, `axios`, `react` 等），你可以通过数组组合或拆分多个共享块来实现。

**方案 A：将多个依赖合并为一个公共 Chunk**

如果这些依赖体积总和不大，且更新频率相似，可以将它们放在一个数组中：

```javascript
module.exports = {
  entry: {
    // 将多个常用依赖打包到一个名为 commonVendor 的 chunk 中
    commonVendor: ["lodash", "axios", "dayjs"],
    app: {
      import: "./src/app.js",
      dependOn: "commonVendor",
    },
    admin: {
      import: "./src/admin.js",
      dependOn: "commonVendor",
    },
  },
};
```

**方案 B：将依赖拆分为多个公共 Chunk**

如果依赖库职责不同（例如基础 UI 库与工具函数库分开），可以定义多个独立入口，并在 `dependOn` 中传入数组：

```javascript
module.exports = {
  entry: {
    utils: ["lodash", "axios"],
    reactVendor: ["react", "react-dom"],
    app: {
      import: "./src/app.js",
      // dependOn 接收数组，表示同时依赖多个共享块
      dependOn: ["utils", "reactVendor"],
    },
    admin: {
      import: "./src/admin.js",
      // admin 也许只需要工具库
      dependOn: ["utils"],
    },
  },
};
```

#### **<font color='#10c300'>3）场景三：共享本地自定义模块</font>**

`dependOn` 的底层逻辑是**提取另一个入口 chunk 中的模块**，这种“共享”不局限于 `node_modules` 中的第三方库。你完全可以将自己封装的公用代码（比如一套业务专用的工具函数库、全局状态管理等）提取为一个共享入口。

```javascript
module.exports = {
  entry: {
    // 将自己的本地模块作为一个独立的入口配置
    myUtils: "./src/utils/index.js",
    app: {
      import: "./src/app.js",
      dependOn: "myUtils",
    },
    admin: {
      import: "./src/admin.js",
      dependOn: "myUtils",
    },
  },
};
```

**适用情况：**

- 你的多个入口应用（如前台和后台）都重度使用了同一个自建组件库或工具集。
- 你希望将这些相对稳定的自建库与频繁变动的业务逻辑拆分，以利用浏览器缓存。

> **注意与释疑**：配置了多个入口（`entry`），不代表所有入口都会放在**同一个** HTML 页面里。
>
> 1.  **多页应用（MPA）场景**：如果是各自独立的 HTML 页面（比如 `app.html` 只引入 `app.js`，`admin.html` 只引入 `admin.js`），此时每个页面只加载一个入口脚本，运行时不会冲突。
> 2.  **同一页面加载多入口场景**：而在本例的 `dependOn` 配置中，`shared.js` 和 `app.js` 通常会被同时注入到**同一个** HTML 页面中。这种情况下，必须设置 `optimization.runtimeChunk: 'single'`，提取出一个公共的 Webpack 运行时（Runtime）。否则 `shared` 和 `app` 将各自包含一套独立的 Webpack 模块加载与解析逻辑，这会导致全局变量冲突、模块重复实例化等严重的意外问题。
> 3.  **单页面应用（SPA）适用吗？**：**不适用，也没有必要。** 绝大多数 Vue/React 单页面应用通常只有一个核心入口文件（如 `src/main.js` 或 `src/index.js`）。既然没有“多个”入口，就不存在“跨入口提取共享模块”的需求。对于 SPA：
>     - 若想抽离第三方库（如 `vue`, `react`, `lodash`），请使用下一节介绍的 **SplitChunksPlugin**。
>     - 若想实现路由级别的按需加载，请配合使用稍后介绍的**动态导入（Dynamic Import）**。

```javascript
module.exports = {
  // ...entry 配置同上
  optimization: {
    runtimeChunk: "single",
  },
};
```

---

## 四、SplitChunksPlugin 详解

### **<font color='red'>4.1 默认行为</font>**

`SplitChunksPlugin` 是 Webpack 内置的、也是**最核心**的代码分割工具。它会自动分析模块间的依赖关系，把满足条件的公共模块提取到单独的 chunk 中。

即使你不做任何配置，Webpack 5 也有一套默认的分割策略：

```javascript
// Webpack 5 的默认配置（等价写法）
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "async", // 只对异步加载的模块进行分割
      minSize: 20000, // 生成 chunk 的最小体积（约 20KB）
      minRemainingSize: 0, // 分割后剩余 chunk 的最小体积
      minChunks: 1, // 模块至少被引用 1 次才会被分割
      maxAsyncRequests: 30, // 按需加载时最大并行请求数
      maxInitialRequests: 30, // 入口点的最大并行请求数
      enforceSizeThreshold: 50000, // 超过50kb强制分割，忽略其他限制
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        defaultVendors: {
          // 组名
          test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          priority: -10, // 优先级（越大越高）
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2, // 模块至少被引用 2 次才会被分割
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

> **关键点**：默认 `chunks: 'async'` 意味着**只对动态 `import()` 导入的模块生效**。如果你也想提取同步引用的第三方库（比如 `import lodash from 'lodash'`），需要改成 `'all'`。

![image-20260303222456796](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260303222456796.png)

### **<font color='red'>4.2 chunks 选项详解</font>**

`chunks` 是一个非常关键的选项，它决定了哪些 chunk 参与分割优化：

```javascript
splitChunks: {
  // 字符串形式
  chunks: "async"; // 默认值，只处理异步 chunk（动态 import）
  chunks: "initial"; // 只处理同步 chunk（静态 import）
  chunks: "all"; // 推荐！同步和异步 chunk 都处理
}
```

**三种模式的区别（以 lodash 为例）：**

```javascript
// 场景：入口文件同步引用了 lodash
import _ from "lodash";
```

| chunks 值   | 效果                                            |
| ----------- | ----------------------------------------------- |
| `'async'`   | lodash **不会**被单独提取（因为它是同步引入的） |
| `'initial'` | lodash **会**被提取到 vendor chunk              |
| `'all'`     | lodash **会**被提取到 vendor chunk              |

```javascript
// 场景：代码中动态引用了 lodash
const _ = await import("lodash");
```

| chunks 值   | 效果                                        |
| ----------- | ------------------------------------------- |
| `'async'`   | lodash **会**被提取为独立 chunk             |
| `'initial'` | lodash **不会**被提取（因为它是异步引入的） |
| `'all'`     | lodash **会**被提取为独立 chunk             |

`chunks` 也可以传入一个函数来做更精细的控制：

```javascript
splitChunks: {
  chunks(chunk) {
    // 排除名为 'my-excluded-chunk' 的 chunk
    return chunk.name !== 'my-excluded-chunk'
  }
}
```

### **<font color='red'>4.3 cacheGroups 缓存组</font>**

`cacheGroups`（缓存组）是 `SplitChunksPlugin` 的灵魂。它允许你自定义分组规则，指定哪些模块应该被归入哪个 chunk。

#### **<font color='#10c300'>1）匹配流程</font>**

```
模块被引入
  ↓
遍历所有 cacheGroup 规则
  ↓
模块匹配到多个 group？ → 按 priority 取最高者
  ↓
满足 minSize / minChunks 等条件？
  ↓
是 → 提取到对应 chunk
否 → 留在原始 bundle 中
```

#### **<font color='#10c300'>2）完整配置示例</font>**

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      // 第三方库统一打包
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        priority: 10
      },

      // 将 React 全家桶单独打包（因为版本稳定，利于长期缓存）
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
        name: 'react-vendor',
        chunks: 'all',
        priority: 20  // 优先级高于 vendors，所以 React 相关的不会被归到 vendors
      },

      // UI 组件库单独打包
      antd: {
        test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
        name: 'antd-vendor',
        chunks: 'all',
        priority: 20
      },

      // 项目内部的公共模块
      commons: {
        name: 'commons',
        minChunks: 2,     // 至少被 2 个 chunk 引用
        chunks: 'all',
        priority: 5,
        reuseExistingChunk: true
      }
    }
  }
}
```

#### **<font color='#10c300'>3）cacheGroup 的核心属性</font>**

| 属性                 | 类型                       | 说明                                                         |
| -------------------- | -------------------------- | ------------------------------------------------------------ |
| `test`               | RegExp / Function / String | 模块匹配规则                                                 |
| `name`               | String / Function          | 生成的 chunk 名称                                            |
| `priority`           | Number                     | 优先级，数值越大越优先匹配                                   |
| `minChunks`          | Number                     | 模块最少被多少个 chunk 引用                                  |
| `reuseExistingChunk` | Boolean                    | 如果当前 chunk 包含已从 main bundle 中拆分出来的模块，则复用 |
| `enforce`            | Boolean                    | `true` 时忽略 `minSize`、`maxSize` 等限制，强制创建 chunk    |

#### **<font color='#10c300'>4）深度解析：reuseExistingChunk</font>**

`reuseExistingChunk: true` 这个配置虽然默认开启，但很多人不理解它的具体作用。

**它的核心思想是：避免重复打包已经被分离出去的模块。**

**🤔 场景演示：**
假设你有三个文件：`A.js`, `B.js` 和一个公共工具模块 `utils.js`。

1.  `A.js` 引用了 `utils.js`。
2.  `B.js` 引用了 `A.js`，同时也直接引用了 `utils.js`。

在配置 `SplitChunksPlugin` 提取公共模块时：

- Webpack 在处理 `A.js` 时，决定把 `utils.js` 提取出来，单独打成一个叫 `chunk-utils.js` 的文件。
- 接着 Webpack 处理 `B.js`。按照依赖分析，`B.js` 需要 `A.js` 和 `utils.js`。
- 此时，Webpack 发现 `B.js` 需要的 `utils.js` **已经**在这个打包流程中被别人（`A.js`）提取成了一个独立的 Chunk (`chunk-utils.js`) 了。

**如果不开启 `reuseExistingChunk: false`**：
Webpack 可能会比较笨地再为 `B.js` 把 `utils.js` 重新打包一次（或者打包进 `B.js` 内部，或者生成一个新的重复 chunk）。

**如果开启 `reuseExistingChunk: true`（推荐）**：
Webpack 会很聪明地说：“哦，我已经有一个包含 `utils.js` 的 Chunk 了，那 `B.js` 直接去复用那个建立好的 `chunk-utils.js` 就行了，没必要再单独创建一份。”这样就极大地减小了打包体积，也提高了打包效率。

#### **<font color='#10c300'>5）name 的函数用法</font>**

`name` 传入函数可以实现动态命名：

```javascript
cacheGroups: {
  vendors: {
    test: /[\\/]node_modules[\\/]/,
    // 根据模块路径生成 chunk 名称
    name(module) {
      // 获取包名，例如 node_modules/lodash/lodash.js → lodash
      const packageName = module.context.match(
        /[\\/]node_modules[\\/](.*?)([\\/]|$)/
      )[1]
      // npm 包名允许有 @ 前缀（如 @babel/core），但 @ 在 URL 中不安全
      return `vendor.${packageName.replace('@', '')}`
    }
  }
}
```

> **⚠️ 注意**：在生产环境中不建议使用函数形式的 `name`，因为每个包一个 chunk 会导致 HTTP 请求过多。这里仅作演示。

### **<font color='red'>4.4 体积相关的关键参数</font>**

```javascript
splitChunks: {
  minSize: 20000,            // chunk 最小体积 20KB，低于则不分割
  maxSize: 250000,           // chunk 建议最大 250KB，超过则尝试继续拆分
  maxAsyncRequests: 30,      // 异步加载时的最大并行请求数
  maxInitialRequests: 30,    // 入口的最大并行请求数
  enforceSizeThreshold: 50000 // 强制分割阈值：超过 50KB 一定分割
}
```

**maxSize 的工作方式：**

`maxSize` 并不是一个硬限制（一个 chunk 可能因为无法继续拆分而超过此值），但 Webpack 会 **尽量** 把超出的 chunk 再次拆分。优先级关系为：

```
minSize（保底下限）> maxSize（建议上限）> maxInitialRequests/maxAsyncRequests（请求数上限）
```

也就是说，Webpack 绝不会因为 `maxSize` 而创建小于 `minSize` 的 chunk。

### **<font color='red'>4.5 runtimeChunk 运行时代码提取</font>**

Webpack 的 **runtime（运行时）** 是指模块加载、解析、执行的基础代码。把它提取为单独文件可以避免在业务代码变化时导致 runtime 所在的 chunk hash 变化：

```javascript
optimization: {
  // 方式一：所有入口共享一个 runtime chunk
  runtimeChunk: "single";

  // 方式二：每个入口各自拥有 runtime chunk
  // runtimeChunk: true

  // 方式三：自定义名称
  // runtimeChunk: {
  //   name: (entrypoint) => `runtime-${entrypoint.name}`
  // }
}
```

**推荐使用 `'single'`**，特别是对于单页面应用。

---

<br>

## **五、动态导入（Dynamic Import）**

### **<font color='red'>5.1 基础用法</font>**

动态导入是实现**按需加载**的核心手段。使用 ES 标准的 `import()` 语法, Webpack 会自动将目标模块拆分为独立的 chunk，并在运行时按需加载。

### 1. 基础用法

```javascript
// 点击按钮时才加载并使用 lodash
document.getElementById("btn").addEventListener("click", async () => {
  // import() 返回一个 Promise
  const { default: _ } = await import("lodash");
  const result = _.join(["Hello", "webpack"], " ");
  console.log(result);
});
```

`import('lodash')` 做了两件事：

1.  在打包阶段，Webpack 会把 `lodash` 及其依赖从主 bundle 中**拆分**出来，生成一个独立的 chunk 文件。
2.  在运行阶段，当代码执行到 `import('lodash')` 时，才会通过 `<script>` 标签**动态下载**并执行这个 chunk。

### **<font color='red'>5.2 路由级懒加载（React）</font>**

这是动态导入最常见的实战场景：

```jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 使用 lazy + import() 实现路由级代码分割
// 每个路由组件都会被打包为独立的 chunk
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

const App = () => {
  return (
    <BrowserRouter>
      {/* Suspense 提供加载过渡 UI */}
      <Suspense fallback={<div>页面加载中...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

### **<font color='red'>5.3 路由级懒加载（Vue）</font>**

```javascript
// router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    // Vue 天生支持异步组件，直接使用 import() 即可
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
```

### **<font color='red'>5.4 条件性按需加载</font>**

除了路由，还有很多场景适合动态导入：

```javascript
// 场景一：用户触发了某个功能后才加载对应的库
const handleExport = async () => {
  // xlsx 库体积很大，只有用户点击"导出"时才加载
  const XLSX = await import("xlsx");
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "export.xlsx");
};

// 场景二：根据运行环境加载不同模块
const loadEditor = async () => {
  if (isMobile()) {
    return import("./editors/MobileEditor");
  }
  return import("./editors/DesktopEditor");
};

// 场景三：大型可视化库按需加载
const renderChart = async (container, data) => {
  const echarts = await import("echarts");
  const chart = echarts.init(container);
  chart.setOption({
    /* ... */
  });
};
```

### **<font color='red'>5.5 output.chunkFilename — 非入口 chunk 的命名模板</font>**

配合下，Webpack 会产出大量**非入口 chunk**。`output.chunkFilename` 就是专门控制这些文件命名格式的配置项，它**可以独立使用，不依赖任何魔法注释**。

#### **<font color='#10c300'>1）filename vs chunkFilename 的分工</font>**

```javascript
output: {
  // filename —— 只管【入口 chunk】的文件名（entry 直接对应的输出文件）
  filename: '[name].[contenthash:8].js',

  // chunkFilename —— 只管【非入口 chunk】的文件名
  //   包括：SplitChunksPlugin 拆出来的 + 动态 import() 产生的
  chunkFilename: '[name].[contenthash:8].chunk.js'
}
```

| 配置项          | 作用对象                                                    | 输出示例                    |
| --------------- | ----------------------------------------------------------- | --------------------------- |
| `filename`      | **入口 chunk**（entry 直接对应的）                          | `app.a1b2c3d4.js`           |
| `chunkFilename` | **非入口 chunk**（SplitChunksPlugin 拆的 + 动态 import 的） | `vendors.e5f6g7h8.chunk.js` |

#### **<font color='#10c300'>2）[name] 占位符的值由谁决定？</font>**

`chunkFilename` 模板中最关键的占位符是 `[name]`。它的值**并非固定**，而是取决于 chunk 的来源：

| chunk 来源                                | `[name]` 的值                     | 文件名示例                     |
| ----------------------------------------- | --------------------------------- | ------------------------------ |
| SplitChunksPlugin 的 cacheGroup           | cacheGroup 中配置的 `name` 属性值 | `vendors.abcd1234.chunk.js`    |
| 动态 `import()` + `webpackChunkName` 注释 | 注释中指定的名称                  | `about-page.abcd1234.chunk.js` |
| 动态 `import()` **无任何注释**            | Webpack 自动分配的数字 ID         | `543.abcd1234.chunk.js`        |

```
chunkFilename: '[name].[contenthash:8].chunk.js'
                  ↑
            ┌─────┴──────────────────────────────────┐
            │  SplitChunksPlugin 的 cacheGroup       │ → name 属性值（如 'vendors'）
            │  动态 import() + webpackChunkName 注释  │ → 注释指定的名称
            │  动态 import() 无任何注释                │ → Webpack 自动分配的数字 ID
            └────────────────────────────────────────┘
```

#### **<font color='#10c300'>3）不配置 chunkFilename 会怎样？</font>**

如果你不显式设置 `chunkFilename`，Webpack 会**回退到 `filename` 的值**作为所有 chunk 的命名模板。这意味着入口文件和非入口 chunk 使用完全相同的命名规则，虽然功能上没有问题，但你会丧失通过文件名一眼区分"入口文件"和"拆分 chunk"的能力。

**推荐做法**：给 `chunkFilename` 加上 `.chunk` 后缀，方便在构建产物中快速辨认：

```javascript
output: {
  filename: 'js/[name].[contenthash:8].js',           // 入口文件：app.a1b2c3d4.js
  chunkFilename: 'js/[name].[contenthash:8].chunk.js'  // 非入口：vendors.e5f6g7h8.chunk.js
}
```

---

<br>

## **六、魔法注释（Magic Comments）**

Webpack 在 `import()` 中支持一系列特殊注释（魔法注释），用来精确控制分割行为。

### **<font color='red'>6.1 webpackChunkName — 自定义 chunk 名称</font>**

默认情况下，动态 `import()` 产生的 chunk 会被分配一个纯数字 ID 作为名称（如 `543`）。通过 `webpackChunkName` 注释，你可以将其替换为有意义的可读名称，这个名称会填入上一节介绍的 `chunkFilename` 模板中的 `[name]` 占位符：

```javascript
// 不加注释：[name] = 数字 ID → 生成 543.abcd1234.chunk.js
import("./pages/About");

// 加注释后：[name] = 'about-page' → 生成 about-page.abcd1234.chunk.js
import(/* webpackChunkName: "about-page" */ "./pages/About");
```

### **<font color='red'>6.2 webpackMode — 控制动态导入模式</font>**

```javascript
// lazy：默认模式，为每个 import() 调用生成一个可延迟加载的 chunk
import(/* webpackMode: "lazy" */ `./locales/${language}`);

// lazy-once：只生成一个 chunk，适用于可能被请求多次的动态表达式
// 所有可能匹配到的模块都打包到同一个 chunk 中
import(/* webpackMode: "lazy-once" */ `./locales/${language}`);

// eager：不生成额外 chunk，模块被包含在当前 chunk 中
// 但仍然返回 Promise，适用于条件导入但不想多一次网络请求
import(/* webpackMode: "eager" */ `./locales/${language}`);

// weak：如果模块已经被其他方式加载了则使用它，否则 Promise 会 reject
// 适用于服务端渲染（SSR），避免客户端额外请求
import(/* webpackMode: "weak" */ `./locales/${language}`);
```

### **<font color='red'>6.3 webpackInclude / webpackExclude — 过滤动态路径</font>**

当 `import()` 的路径包含变量时，Webpack 会把目录下所有可能匹配的文件都打包。用这两个注释可以缩小范围：

```javascript
// 假设 ./locales/ 目录下有 zh.js, en.js, fr.js, de.js, README.md 等文件

// 不过滤：所有文件都会被打包为可能的 chunk（包括 README.md）
import(`./locales/${lang}`);

// 过滤后：只打包 .js 结尾的文件
import(
  /* webpackInclude: /\.js$/ */
  `./locales/${lang}`
);

// 排除指定文件
import(
  /* webpackExclude: /\.test\.js$/ */
  `./locales/${lang}`
);

// 组合使用
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /deprecated/ */
  `./data/${filename}`
);
```

### **<font color='red'>6.4 webpackExports — 只导出指定成员</font>**

当你只使用模块的部分导出时，这个注释可以帮助 Webpack 做更激进的 Tree Shaking：

```javascript
// 只使用 lodash-es 的 debounce 和 throttle
// Webpack 在打包时可以排除其他不相关的导出
import(
  /* webpackExports: ["debounce", "throttle"] */
  "lodash-es"
);
```

### **<font color='red'>6.5 完整示例：组合使用魔法注释</font>**

```javascript
// 一个路由级懒加载的典型配置
const AdminDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "admin-dashboard" */
      /* webpackPrefetch: true */
      "./pages/AdminDashboard"
    ),
);

// 国际化包的按需加载
const loadLocale = (lang) =>
  import(
    /* webpackChunkName: "locale-[request]" */
    /* webpackMode: "lazy-once" */
    /* webpackInclude: /\/(zh|en|ja)\.json$/ */
    `./locales/${lang}.json`
  );
```

---

<br>

## **七、代码分割统一命名规范**

### **<font color='red'>7.1 JS 文件命名</font>**

bundle 拆成多个文件。为了在构建产物中**一眼区分主文件和分割出来的 chunk 文件**，我们需要为 JS 和 CSS 分别制定统一的命名规范。

在 `output` 中，`filename` 和 `chunkFilename` 分别控制入口文件和分割 chunk 的命名：

```javascript
output: {
  path: path.resolve(__dirname, 'dist'),

  // 入口文件（entry 直接对应的输出）
  filename: 'js/[name].[contenthash:8].js',

  // 非入口 chunk（SplitChunksPlugin 拆的 + 动态 import 产生的）
  // 通过 .chunk 后缀与入口文件区分
  chunkFilename: 'js/[name].[contenthash:8].chunk.js'
}
```

**构建产物对比：**

```
dist/js/
├── app.a1b2c3d4.js              ← 入口文件（filename 控制）
├── runtime.e5f6g7h8.js          ← 运行时（filename 控制）
├── vendors.i9j0k1l2.chunk.js    ← 第三方库 chunk（chunkFilename 控制）
├── commons.m3n4o5p6.chunk.js    ← 公共模块 chunk（chunkFilename 控制）
└── about-page.q7r8s9t0.chunk.js ← 动态导入 chunk（chunkFilename 控制）
```

看到 `.chunk.js` 后缀就知道这是代码分割产生的文件，没有 `.chunk` 的就是入口主文件。

### **<font color='red'>7.2 CSS 文件命名</font>**

使用 `MiniCssExtractPlugin` 提取 CSS 时，同样存在 `filename` 和 `chunkFilename` 两个配置，逻辑与 JS 完全一致：

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

plugins: [
  new MiniCssExtractPlugin({
    // 入口 chunk 中提取的 CSS（如全局样式、主样式文件）
    filename: "css/[name].[contenthash:8].css",

    // 非入口 chunk 中提取的 CSS（如动态导入的路由页面自带的样式）
    // 同样通过 .chunk 后缀与主 CSS 区分
    chunkFilename: "css/[name].[contenthash:8].chunk.css",
  }),
];
```

**构建产物对比：**

```
dist/css/
├── app.a1b2c3d4.css              ← 入口样式（filename 控制）
├── about-page.e5f6g7h8.chunk.css ← 动态导入页面的样式（chunkFilename 控制）
└── dashboard.i9j0k1l2.chunk.css  ← 动态导入页面的样式（chunkFilename 控制）
```

> **为什么 CSS 也会被分割？**
> 当你使用动态 `import()` 加载一个路由页面时，如果该页面组件中引用了 CSS（例如 `import './About.css'`），`MiniCssExtractPlugin` 会自动将这部分 CSS 也拆分为独立文件，与对应的 JS chunk 配对加载。所以 CSS 也需要 `chunkFilename` 来命名这些分割出来的样式文件。

### **<font color='red'>7.3 完整命名规范汇总</font>**

| 资源类型 | 配置项                               | 作用对象        | 推荐命名模板                           | 产出示例                        |
| -------- | ------------------------------------ | --------------- | -------------------------------------- | ------------------------------- |
| JS       | `output.filename`                    | 入口文件        | `js/[name].[contenthash:8].js`         | `app.a1b2c3d4.js`               |
| JS       | `output.chunkFilename`               | 分割 chunk      | `js/[name].[contenthash:8].chunk.js`   | `vendors.e5f6g7h8.chunk.js`     |
| CSS      | `MiniCssExtractPlugin.filename`      | 入口样式        | `css/[name].[contenthash:8].css`       | `app.a1b2c3d4.css`              |
| CSS      | `MiniCssExtractPlugin.chunkFilename` | 分割 chunk 样式 | `css/[name].[contenthash:8].chunk.css` | `about-page.e5f6g7h8.chunk.css` |

> **核心原则**：所有被代码分割拆出来的文件，统一加上 `.chunk` 后缀，构建产物一目了然。

---

<br>

## **八、预获取与预加载**

我们前面已经做了代码分割，同时会使用 import 动态导入语法来进行代码按需加载（我们也叫懒加载，比如路由懒加载就是这样实现的）。

但是加载速度还不够好，比如：是用户点击按钮时才加载这个资源的，如果资源体积很大，那么用户会感觉到明显卡顿效果。

我们想在浏览器空闲时间，加载后续需要使用的资源。我们就需要用上 `Preload` 或 `Prefetch` 技术。

### **<font color='red'>8.1 Prefetch（预获取）</font>**

**含义**：告诉浏览器 "这个资源将来可能会用到，在空闲时提前下载"。

```javascript
// 当用户在首页时，浏览器会在空闲时提前下载 login-page chunk
const LoginPage = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "login-page" */
      "./pages/LoginPage"
    ),
);
```

**Webpack 会在 HTML 的 `<head>` 中注入：**

```html
<link rel="prefetch" href="login-page.xxxx.chunk.js" />
```

**行为特点：**

- 浏览器在 **空闲时** 下载该资源
- 下载优先级 **很低**，不会影响当前页面的关键资源
- 资源会被缓存，当真正需要时直接从缓存中获取

### **<font color='red'>8.2 Preload（预加载）</font>**

**含义**：告诉浏览器 "这个资源当前页面一定会用到，请立即开始下载"。

```javascript
// ChartComponent 是当前页面马上就要渲染的内容
const ChartComponent = lazy(
  () =>
    import(
      /* webpackPreload: true */
      /* webpackChunkName: "chart" */
      "./components/Chart"
    ),
);
```

**Webpack 会在 HTML 的 `<head>` 中注入：**

```html
<link rel="preload" as="script" href="chart.xxxx.chunk.js" />
```

**行为特点：**

- 浏览器 **立即** 开始下载（与父 chunk 并行）
- 下载优先级 **较高**
- 如果资源在 3 秒内未被使用，控制台会发出警告

### **<font color='red'>8.3 Prefetch vs Preload 对比</font>**

| 特性                  | Prefetch                  | Preload                |
| --------------------- | ------------------------- | ---------------------- |
| **下载时机**          | 浏览器空闲时              | 立即并行下载           |
| **优先级**            | 低                        | 高                     |
| **适用场景**          | 未来可能需要的资源        | 当前页面即将使用的资源 |
| **与父 chunk 的关系** | 父 chunk 加载完成后才开始 | 与父 chunk 并行下载    |
| **典型应用**          | 下一页路由、不常用功能    | 首屏必需的异步模块     |

```
Prefetch 时间线：
├── 主 chunk 下载 ──┤
                     ├── 空闲... ──┤
                                    ├── prefetch chunk 下载 ──┤

Preload 时间线：
├── 主 chunk 下载 ──────────┤
├── preload chunk 下载 ──┤    ← 同时进行！
```

### **<font color='red'>8.4 实际使用建议</font>**

```javascript
// ✅ 适合 Prefetch 的场景
// 用户很可能会访问但当前不需要的页面/功能
const Settings = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/Settings"),
);
const HelpCenter = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/HelpCenter"),
);

// ✅ 适合 Preload 的场景
// 当前页面立即需要，但因为是动态引入而无法被一起打包的模块
const HeroAnimation = lazy(
  () => import(/* webpackPreload: true */ "./components/HeroAnimation"),
);

// ❌ 不要滥用 Preload
// 如果 preload 了太多资源，反而会与当前页面的关键资源争抢带宽
```

### **<font color='red'>8.5 还需要额外插件吗？（如 @vue/preload-webpack-plugin）</font>**

在 Webpack 5 中，**不再建议**使用 `@vue/preload-webpack-plugin` 或类似的第三方插件。

- **理由**：Webpack 4.6.0+ 已经原生支持了 `prefetch` 和 `preload` 魔法注释。当你使用这些注释时，Webpack 会在运行时利用其内置的脚本加载机制，自动在 HTML 的 `<head>` 中生成并维护对应的 `<link>` 标签。
- **优点**：直接使用魔法注释减少了配置复杂度和依赖项。除非你有“全局自动化注入所有异步 Chunk”这种极特殊的批量处理需求，否则魔法注释是目前最标准、最推荐的做法。

---

<br>

## **九、Tree Shaking 与代码分割的协同**

Tree Shaking 和代码分割通常被认为是两个独立的优化方向，但在 Webpack 5 中，它们是深度耦合、互相成就的。

- **代码分割（Code Splitting）**：解决 **“什么时候加载”** 的问题。它按文件、按路由将代码拆散。
- **Tree Shaking**：解决 **“加载多少内容”** 的问题。它从文件内部剔除没用的导出成员。

### **<font color='red'>9.1 sideEffects：Tree Shaking 的“免检开关”</font>**

这是最容易产生误区的地方。`sideEffects` 的核心作用是告诉 Webpack：**若本模块的导出未被使用，是否可以连带其内部的副作用逻辑一并“物理抹除”。**

#### **<font color='#10c300'>1）深入对比：设置 false vs 不设置</font>**

假设有模块 `math.js`：

```javascript
// math.js
export const add = (a, b) => a + b;
console.log("math 模块被加载了"); // 这就是一个副作用（Side Effect）
window.mathLoaded = true; // 这也是一个副作用
```

| 配置状态               | 场景：`import { add } from './math'` 但**未使用** `add`                               | 场景：使用 `add`               |
| :--------------------- | :------------------------------------------------------------------------------------ | :----------------------------- |
| **未设置**             | `add` 会被剔除，但 **`console.log` 和 `window` 赋值会保留**。Webpack 不敢删执行代码。 | `add` 保留，副作用逻辑也保留。 |
| **sideEffects: false** | **整个 `math.js` 被物理删除**。哪怕里面有 `console.log` 或 `window` 赋值也统统抹除。  | `add` 保留，副作用逻辑也保留。 |

> [!CAUTION]
> **风险提示**：如果你的代码依赖“只需 import 就能生效”的逻辑（如：CSS、全局变量初始化、Polyfill），必须在 `package.json` 中配置数组来排除它们：
>
> ```json
> "sideEffects": ["*.css", "./src/init-polyfill.js"]
> ```

### **<font color='red'>9.2 三种导入姿势对 Tree Shaking 的影响</font>**

为了配合代码分割和 Tree Shaking 达到最佳体积，导入方式至关重要：

```javascript
// ❌ 方案 A：全量导入（极其不推荐）
// 这种方式会导致整个 lodash 被包进来，除非 lodash 本身支持并配置了 sideEffects
import _ from "lodash";

// ✅ 方案 B：具名导入（Tree Shaking 友好）
// Webpack 会识别出你只用了 debounce，从而 shake 掉其他成员
import { debounce } from "lodash-es";

// ✅ 方案 C：子路径导入（物理级 Tree Shaking）
// 这种方式最直接，打包器只会关注 debounce.js 及其依赖，根本不看 lodash 其他部分
import debounce from "lodash/debounce";
```

### **<font color='red'>9.3 当 Tree Shaking 遇到 SplitChunks</font>**

这是一个高级协同场景。当你配置了 `optimization.splitChunks` 时，Tree Shaking 的结果会直接影响公共块的提取。

**协同逻辑：**

1. Webpack 首先对每个入口进行 **Tree Shaking** 标记（哪些成员没用）。
2. 在进行 **SplitChunks** 公共模块提取时，Webpack 提取的是 **“经过 Shake 之后的残余模块”**。
3. 如果一个公共模块 `utils.js` 在入口 A 里用了 `a()`，在入口 B 里用了 `b()`，那么最后提取出来的 `commons.chunk.js` 只会包含 `a` 和 `b` 的代码。

### **<font color='red'>9.4 结合动态导入与 webpackExports</font>**

这是 Webpack 5 提供的极致优化工具。如果你只想动态加载一个巨大模块中的一小部分成员：

```javascript
// 场景：只想动态加载模块中名为 'specificExport' 的成员
const member = await import(
  /* webpackExports: ["specificExport"] */
  "large-library"
);
```

**底层协同效果**：

- Webpack 会为这个特殊的 `import()` 创建一个极小的 Chunk。
- 它会绕过整个 `large-library` 的其他导出成员，利用 Tree Shaking 标记并仅提取 `specificExport` 及其必要依赖。

### **<font color='red'>9.5 协同优化检查表</font>**

- [ ] **项目源码**：`package.json` 里的 `sideEffects` 是否已正确设置（包含排除 CSS）。
- [ ] **第三方库**：是否优先使用了支持 ESM 协议的包（如 `lodash-es` 优于 `lodash`）。
- [ ] **导出模式**：是否使用了 `export default { ... }`？（**不要这样做**，对象形式的默认导出不利于 Tree Shaking，请使用具名 `export`）。
- [ ] **CSS 处理**：是否使用了 `MiniCssExtractPlugin`？（它能配合代码分割，在 Shake 掉 JS 的同时，也由 Webpack 自动分析并 Shake 掉多余的 CSS）。

---

<br>

## **十、实战：完整的代码分割配置方案**

下面是一个适用于中大型前端项目的生产级代码分割配置：

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",

  entry: {
    app: "./src/index.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash:8].js",
    chunkFilename: "js/[name].[contenthash:8].chunk.js",
    clean: true,
  },

  optimization: {
    // 提取运行时代码
    runtimeChunk: "single",

    // 模块 ID 使用确定性算法（利于长期缓存）
    moduleIds: "deterministic",

    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 250000,

      cacheGroups: {
        // 框架核心（React / Vue）—— 版本极少变动，长期缓存
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|vue|vue-router|pinia)[\\/]/,
          name: "framework",
          chunks: "all",
          priority: 40,
          enforce: true,
        },

        // UI 组件库 —— 体积大，单独分离
        ui: {
          test: /[\\/]node_modules[\\/](antd|@ant-design|element-plus|@element-plus)[\\/]/,
          name: "ui-lib",
          chunks: "all",
          priority: 30,
        },

        // 工具库（lodash、dayjs、axios 等）—— 使用频率高
        utils: {
          test: /[\\/]node_modules[\\/](lodash|lodash-es|dayjs|axios|qs)[\\/]/,
          name: "utils",
          chunks: "all",
          priority: 25,
        },

        // 其他第三方库
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 10,
        },

        // 项目中被多处引用的公共模块
        commons: {
          name: "commons",
          minChunks: 2,
          chunks: "all",
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },

    minimize: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};
```

**产出文件结构预览：**

```
dist/
├── index.html
└── js/
    ├── runtime.a1b2c3d4.js          ← Webpack 运行时（~2KB）
    ├── framework.e5f6g7h8.js        ← React/Vue 核心（~40KB gzip）
    ├── ui-lib.i9j0k1l2.chunk.js     ← UI 组件库（按需加载）
    ├── utils.m3n4o5p6.chunk.js      ← 工具库（~15KB gzip）
    ├── vendors.q7r8s9t0.chunk.js    ← 其他第三方（~30KB gzip）
    ├── commons.u1v2w3x4.chunk.js    ← 公共模块
    ├── app.y5z6a7b8.js              ← 入口主逻辑
    ├── home-page.c9d0e1f2.chunk.js  ← 首页（动态导入）
    ├── about-page.g3h4i5j6.chunk.js ← 关于页（动态导入）
    └── ...
```

---

<br>

## **十一、分析与优化**

### **<font color='red'>11.1 使用 webpack-bundle-analyzer</font>**

安装并配置 `webpack-bundle-analyzer`，可以直观地看到每个 chunk 的组成和体积：

```bash
npm install --save-dev webpack-bundle-analyzer
```

```javascript
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  plugins: [
    // 只在需要分析时开启
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // 生成静态 HTML 报告
      reportFilename: "report.html",
      openAnalyzer: false, // 不自动打开浏览器
    }),
  ],
};
```

通过分析报告，你可以发现：

- 哪些包体积过大，需要找替代方案或按需导入
- 哪些包被重复打包到了多个 chunk 中
- 哪些不必要的代码被打包进来了

### **<font color='red'>11.2 使用 stats.json 进行离线分析</font>**

```bash
# 生成 stats.json
npx webpack --profile --json > stats.json
```

将 `stats.json` 上传到以下在线工具进行分析：

- [Webpack Analyse](https://webpack.github.io/analyse/)
- [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/)

### **<font color='red'>11.3 实用的优化检查清单</font>**

在完成代码分割配置后，建议逐项检查以下内容：

- [ ] **`chunks` 是否设为 `'all'`**：确保同步和异步模块都能被优化
- [ ] **框架核心是否单独分包**：React/Vue 版本稳定，应该有独立的长期缓存
- [ ] **大型第三方库是否按需导入**：如 `antd`、`lodash`、`echarts` 不应全量引入
- [ ] **路由是否使用了懒加载**：除首页外的所有路由页面都应该动态 `import()`
- [ ] **contenthash 是否被使用**：文件名使用 `[contenthash]` 以实现浏览器长期缓存
- [ ] **runtimeChunk 是否被提取**：避免运行时代码嵌入到业务 chunk 中
- [ ] **是否配置了 moduleIds: 'deterministic'**：保证未变更模块的 hash 稳定
- [ ] **prefetch 是否用在了下一步操作**：如登录后的首页可以 prefetch
- [ ] **是否运行过 bundle analyzer**：确认没有意外的大包或重复包

---

<br>

## **十二、针对不同类型项目的配置建议**

在实际的商业项目中，配置通常会根据项目规模（代码量、包数量）在“缓存命中率”和“首屏加载速度”之间做权衡。

### **<font color='red'>12.1 “开发效率型”配置（适用于中小型项目）</font>**

这种配置主打“简单、稳定”。它不过度拆分，而是将所有第三方库收纳在一起，减少 HTTP 请求数。

```javascript
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}
```

### **<font color='red'>12.2 “平衡性能型”配置（适用于大多数主流项目）</font>**

我们在[第十章](#十实战完整的代码分割配置方案)中提供的配置即为此类型。它的核心逻辑是：

- **核心框架单独分包**（如 React/Vue），利用长期缓存。
- **大型 UI 库单独分包**（如 AntD/Element），避免阻塞首屏。
- **剩余第三方库收纳到 vendors**。

### **<font color='red'>12.3 “极致优化型”配置（针对巨大型项目）</font>**

如果你的项目 `node_modules` 极其臃肿，可以使用 Webpack 5 的 `maxSize` 配合更激进的拆分。

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    // 强制把超过 100KB 的 chunk 尝试继续拆分成更小的，利用多请求并行下载
    maxSize: 100000,
    minSize: 20000,
    cacheGroups: {
      // 这里的逻辑可以配合第十章的 cacheGroups 使用
    }
  }
}
```

### **<font color='red'>12.4 生产级 sideEffects 标准排除清单</font>**

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

> [!WARNING]
> **数组配置的“潜规则”**：
> 当你使用数组列出有副作用的文件时，**没有出现在清单中的所有其他 JS 文件都会被 Webpack 默认为“绝对纯净”**（即 `sideEffects: false`）。
>
> **这意味着**：如果一个 JS 文件不在清单里，即使它内部写了 `console.log` 或修改了全局变量，只要它的 `export` 成员未被其他地方使用，Webpack 就会**直接跳过并物理删除整个文件**，其中的副作用逻辑也会随之消失。
>
> **建议**：
>
> 1. 养成**纯净模块化**习惯：JS 文件应只负责导出功能，不应在顶层执行逻辑。
> 2. 如果某些历史遗留文件确实有“只需加载即生效”的代码，请务必将其加入上述清单。

### **<font color='red'>12.5 关于框架的选择</font>**

- **React 项目**：
  - 核心：`react`, `react-dom`, `react-router-dom` 必须放在一个 `priority` 最高的组。
  - 特点：React 自身不提供按需加载，强烈建议配合 `React.lazy` 使用。
- **Vue 项目**：
  - 核心：`vue`, `vue-router`, `pinia` 放在一个组。
  - 特点：Vue 的异步组件原生支持良好，建议在 `router/index.js` 中全程使用 `component: () => import(...)`。

---

> **结语**：没有完美的配置，只有最适合当前项目业务场景的权衡方案。建议每隔一到两个月，运行一次 `webpack-bundle-analyzer` 来巡检你的打包结果。

## 十三、如何编写 Tree-Shaking 友好的代码（避坑指南）

正如我们在第十二章提到的 `sideEffects` 机制，如果不规范编码，很容易在项目维护后期掉入“副作用丢失”的陷阱。

### **<span style='color:red'>1. 致命诱因：混合模块（Hybrid Modules）</span>**

这是最典型的维护惨案：在一个文件中既包含了“纯纯的导出成员”，又包含了“加载即执行的副作用”。

```javascript
// ❌ 极其危险的写法 (utils.js)
export const count = (x) => x + 11; // 纯函数

// 这是一个隐蔽的副作用，可能被全局某个地方引用
window.globalConfig = { theme: "dark" };
console.log("项目核心配置已初始化");
```

**为什么这很危险？**

1. 假设现在 `count` 函数还在用，项目运行完美。
2. 几个月后，同事小张重构代码，发现 `count` 没用了，于是删除了对 `count` 的所有引用。
3. 如果项目设置了 `sideEffects: false` 且没把 `utils.js` 写进例外清单。
4. **结局**：下次打包线上版时，Webpack 会认为 `utils.js` 没用，直接**物理抹除**。导致 `window.globalConfig` 变成了 `undefined`，线上项目直接白屏。

### **<span style='color:red'>2. 避坑准则一：物理分离副作用</span>**

**绝对不要将 utility（工具类）和 initialization（初始化类）逻辑写在一起。**

```bash
# 推荐的目录结构
src/
  ├── utils/          # 纯函数目录（sideEffects: false 的安全区）
  │     └── math.js
  └── init/           # 副作用目录（必须全部写进 sideEffects 例外清单）
        └── global-setup.js
```

### **<span style='color:red'>3. 避坑准则二：拒绝“隐蔽”导入</span>**

如果你导入一个文件是为了它的副作用，请在代码中明确体现，而不是指望它“顺便”被加载。

```javascript
// main.js
// ❌ 不要指望通过导入 utils 来顺便初始化全局变量
// import { someUtil } from './utils.js';

// ✅ 应该显式地、独立地导入初始化模块
import "./init/global-setup.js";
import { someUtil } from "./utils/math.js";
```

### **<span style='color:red'>4. 避坑准则三：使用具名导出（Named Exports）</span>**

对于对象类型的导出，Tree Shaking 的效果往往不佳。

```javascript
// ❌ 不利于 Tree Shaking
export default {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
};

// ✅ 最佳实践
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;
```

> **总结**：Tree Shaking 的最终效果，50% 取决于 Webpack 的配置，另外 **50% 取决于你的编码习惯**。一个优秀的 Webpack 工程师，必然也是一个深谙“关注点分离”的架构师。

---
title: Webpack 5 基础完全指南
img: /static/60.webp
categories: 工程化与质量
tags:
  - webpack5
abbrlink: w57b4c3d
date: 2026-02-27 22:31:00
---

> 📚 本指南旨在帮助开发者从零开始掌握 Webpack 5 的核心概念与基础配置，涵盖样式、资源、JS 处理及生产环境优化等全方位知识。

---

## 目录

1. [前言](#一、前言)
2. [基本使用](#二、基本使用)
3. [Webpack基本配置](#三、Webpack基本配置)
4. [开发模式](#四、开发模式)
5. [样式资源处理](#五、样式资源处理)
6. [其他资源处理](#六、其他资源处理)
7. [处理JavaScript资源](#七、处理JavaScript资源)
8. [Loader的多种写法](#八、Loader的多种写法)
9. [处理 Html 资源](#九、处理-Html-资源)
10. [开发服务器&自动化](#十、开发服务器&自动化)
11. [生产模式](#十一、生产模式)
12. [CSS进阶优化](#十二、CSS进阶优化)

<br>

## **一、前言**

### **1.1、为什么需要打包工具？**

开发时，我们会使用框架（React、Vue），ES6 模块化语法，Less/Sass 等 css 预处理器等语法进行开发。

这样的代码要想在浏览器运行必须经过编译成浏览器能识别的 JS、Css 等语法，才能运行。

所以我们需要打包工具帮我们做完这些事。

除此之外，打包工具还能压缩代码、做兼容性处理、提升代码性能等。

### **1.2、有哪些打包工具？**

- Grunt
- Gulp
- Parcel
- Webpack
- Rollup
- Vite
- ...

目前市面上最流量的是 Webpack，所以我们主要以 Webpack 来介绍使用打包工具

---

## **二、基本使用**

**`Webpack` 是一个静态资源打包工具。**

它会以一个或多个文件作为打包的入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去。

输出的文件就是编译好的文件，就可以在浏览器段运行了。

我们将 `Webpack` 输出的文件叫做 `bundle`。

### **2.1、 功能介绍**

Webpack 本身功能是有限的:

- 开发模式：仅能编译 JS 中的 `ES Module` 语法
- 生产模式：能编译 JS 中的 `ES Module` 语法，还能压缩 JS 代码

默认情况下webpack：

- 它能做什么： 当 Webpack 遇到你的 JS 文件里写了 import xxx from './xxx' 或是 export default xxx（甚至是 CommonJS 的 require）时，它能看懂！它知道这些文件之间有依赖关系，然后把它们“拼合（打包）”成一个或多个浏览器能直接运行的 JS 压缩包。
- 它不能做什么： 除此之外的其他所有现代 JS 高级语法（比如 箭头函数、解构赋值、Class 类、Promise、async/await 等），Webpack 原生是完全不管的。你写的是箭头函数，它打包出来依然是箭头函数。

### **2.2、项目搭建**

#### **<span style='color:red'>1）初始化项目</span>**

会在当前文件夹生成一个基础的 `package.json` 文件。

```bash
npm init -y
```

**注意点1：** `package.json` 中 `name` 字段不能叫做 `webpack`, 否则下一步会报错

**注意点2：**删除`package.json`中的`type": "commonjs`否则使用ESM语法会报错[详情](https://zhbcloud.github.io/posts/w41d92f5.html)

#### **<span style='color:red'>2）下载依赖</span>**

```bash
npm i webpack webpack-cli -D
```

#### **<span style='color:red'>3）创建文件</span>**

```js
// count.js
export default function count(x, y) {
  return x - y;
}

// sum.js
export default function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// main.js
import count from "./js/count";
import sum from "./js/sum";

console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));
```

#### **<span style='color:red'>4）目录结构</span>**

```text
webpack_code # 项目根目录（所有指令必须在这个目录运行）
    └── src # 项目源码目录
    │   ├── js # js文件目录
    │   │   ├── count.js
    │   │   └── sum.js
    │   └── main.js # 项目主文件
    └── package.json
```

#### **<span style='color:red'>5）启用 Webpack</span>**

- 开发模式

```bash
npx webpack ./src/main.js --mode=development
```

- 生产模式

```bash
npx webpack ./src/main.js --mode=production
```

`npx webpack`: 是用来运行本地安装 `Webpack` 包的。

`./src/main.js`: 指定 `Webpack` 从 `main.js` 文件开始打包，不但会打包 `main.js`，还会将其依赖也一起打包进来。

`--mode=xxx`：指定模式（环境）。

#### **<span style='color:red'>6）观察输出文件</span>**

默认 `Webpack` 会将文件打包输出到 `dist` 目录下，我们查看 `dist` 目录下文件情况就好了

### **2.3、小结**

`Webpack` 本身功能比较少，只能处理 `js` 资源，一旦遇到 `css` 等其他资源就会报错。所以我们学习 `Webpack`，就是主要学习如何处理其他资源。

---

## **三、Webpack基本配置**

在开始使用 `Webpack` 之前，我们需要对 `Webpack` 的配置有一定的认识。

### **3.1、五大核心概念**

#### **<span style='color:red'>1）entry（入口）</span>**

指示 Webpack 从哪个文件开始打包

#### **<span style='color:red'>2）utput（输出）</span>**

指示 Webpack 打包完的文件输出到哪里去，如何命名等

#### **<span style='color:red'>3）loader（加载器）</span>**

webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析

#### **<span style='color:red'>4）plugins（插件）</span>**

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

#### **<span style='color:red'>5）mode（模式）</span>**

- 开发模式：development
- 生产模式：production

### **3.2、准备Webpack配置文件**

#### **<span style='color:red'>1）创建配置文件</span>**

在项目**根目录**下新建文件：`webpack.config.js`

```js
const path = require("path");

module.exports = {
  // 入口文件
  entry: "./src/main.js",
  // 出口文件
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  // loader加载器
  module: {
    rules: [],
  },
  // plugin插件
  plugins: [],
  // mode模式
  mode: "development",
};
```

**输出命名解析**

`[name].js` = `[文件名].js`

**为什么入口文件路径使用相对路径，而输出文件路径是绝对路径**

- **`entry`** 的值是交给 **Webpack 的模块解析器（Module Resolver）** 来处理的。Webpack 的模块解析器本身就被设计为能够识别并处理相对路径，它会将相对路径解析为**相对于当前工作目录** 。
- **`output.path`** 是交给操作系统的**文件系统 API** 来处理的（用于写入磁盘）。**Webpack 官方明确要求这里必须传入绝对路径**，传入相对路径会报错或行为不可预测。

#### **<span style='color:red'>2、运行指令</span>**

配置了`webpack.config.js`，运行指令会自动去查询webpack的配置文件

```bash
npx webpack
```

此时功能和之前一样，也不能处理样式资源

### **3.3、小结**

Webpack 将来都通过 `webpack.config.js` 文件进行配置，来增强 Webpack 的功能。我们后面会以两个模式来分别搭建 Webpack 的配置，先进行开发模式，再完成生产模式。

---

## **四、开发模式**

开发模式顾名思义就是我们开发代码时使用的模式。

这个模式下我们主要做两件事：

 **1、编译代码，使浏览器能识别运行**

开发时我们有样式资源、字体图标、图片资源、html 资源等，webpack 默认都不能处理这些资源，所以我们要加载配置来编译这些资源

 **2、代码质量检查，树立代码规范**

提前检查代码的一些隐患，让代码运行时能更加健壮。

提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观。

---

## **五、样式资源处理**

Webpack 本身是不能识别样式资源的，所以我们需要借助 Loader 来帮助 Webpack 解析样式资源

我们找 Loader 都应该去官方文档中找到对应的 Loader，然后使用。

[Webpack 官方 Loader 中文文档](https://www.webpackjs.com/loaders/)

[CSS进阶优化](#十二、CSS进阶优化)

### **5.1、处理CSS资源**

#### css-loader & style-loader

#### **<span style='color:red'>1）安装包</span>**

```bash
npm i css-loader style-loader -D
```

#### **<span style='color:red'>2）功能介绍</span>**

- `css-loader`：读取 `.css` 文件内容，将其**转换为 JS 模块**（`export default "css字符串"`），使 CSS 成为 JS 依赖图的一部分，从而被打包进 bundle
- `style-loader`：接收 `css-loader` 输出的 JS 模块，在浏览器**运行时**动态创建 `<style>` 标签并插入DOM中

#### **<span style='color:red'>3）配置</span>**

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左，先执行css-loader再执行style-loader
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
};
```

#### **<span style='color:red'>4）测试验证</span>**

```text
webpac5_code/                     # 项目根目录（所有指令必须在这个目录运行）
    ├── dist/                   # 打包输出目录（由 Webpack 自动生成）
    ├── node_modules/           # 第三方依赖包目录（由 npm 自动生成）
    ├── public/                 # 静态资源目录
    │   └── index.html          # HTML 模板文件
    ├── src/                    # 项目源码目录
    │   ├── css/                # 样式文件目录
    │   │   └── index.css
    │   ├── js/                 # JS 文件目录（当前为空）
    │   └── main.js             # 项目主文件（入口文件）
    ├── .editorconfig           # 编辑器统一配置
    ├── .gitignore              # Git 忽略规则
    ├── package.json            # 项目依赖与脚本配置
    ├── package-lock.json       # 依赖版本锁定文件
    └── webpack.config.js       # Webpack 基础配置（或通用配置）
```

**`src\css\index.css`**

```css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
```

**`src\main.js`**

```js
import "./css/index.css";
```

**`public\index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 引入打包后的js文件，才能看到效果 -->
    <script src="../dist/main.js"></script>
  </head>

  <body>
    <!-- 准备一个使用样式的 DOM 容器 -->
    <div class="box"></div>
  </body>
</html>
```

**`运行打包指令`**

```b
npx webpack    // 打开 index.html 页面查看效果
```

#### **<span style='color:red'>5）使用css加载器前后对比</span>**

- **使用前：**直接报错

![image-20260305104254181](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260305104254181.png)

- **使用后：**会生成一个style标签

![image-20260305104729097](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260305104729097.png)

### **5.2、处理 Less 资源**

#### less-loader & less

#### **<span style='color:red'>1）安装包</span>**

```bash
npm i less-loader less -D
```

#### **<span style='color:red'>2）能介绍</span>**

- `less-loader`：负责将 Less 文件编译成 Css 文件
- `less`：`less-loader` 依赖 `less` 进行编译

#### **<span style='color:red'>3）配置</span>**

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  mode: "development",
};
```

### **5.3、处理 Sass 和 Scss 资源**

#### sass-loader & sass

#### **<span style='color:red'>1）安装包</span>**

```bash
npm i sass-loader sass -D
```

#### **<span style='color:red'>2）功能介绍</span>**

- `sass-loader`：负责将 Sass 文件编译成 css 文件
- `sass`：`sass-loader` 依赖 `sass` 进行编译

#### **<span style='color:red'>3）配置</span>**

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  mode: "development",
};
```

### **5.4、处理Stylus 资源**

#### stylus-loader & stylus

#### **<span style='color:red'>1）安装包</span>**

```bash
npm i stylus-loader stylus -D
```

#### **<span style='color:red'>2）能介绍</span>**

- `sass-loader`：负责将 Sass 文件编译成 css 文件
- `sass`：`sass-loader` 依赖 `sass` 进行编译

#### **<span style='color:red'>3）配置</span>**

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
  mode: "development",
};
```

---

## **六、其他资源处理**

### 图片/字体图标/音视频资源等

Webpack 5 用 **Asset Modules** 统一替代了以下四个旧版 loader，资源会自动输出到dist目录下

| Webpack 4 时代（需安装） | Webpack 5 内置 `type` 替代 | 作用                                |
| :----------------------- | :------------------------- | :---------------------------------- |
| `file-loader`            | `asset/resource`           | 输出为独立文件，返回 URL            |
| `url-loader`             | `asset/inline`             | 转为 base64 Data URI 内联           |
| `raw-loader`             | `asset/source`             | 读取文件原始文本内容（字符串）      |
| `url-loader`（自动模式） | `asset`                    | 根据阈值自动选择 resource 或 inline |

**`webpack5`**中资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

```js
type: "asset/resource";
```

- `asset/resource`**（默认值）**
  - 作用：将资源文件原封不动地打包输出到一个单独的文件中，并导出该文件的 URL 路径。
  - 替代：Webpack 4 中的 `file-loader`。
  - 适用场景：较大的图片文件、字体文件（woff2, eot 等）、音视频文件等。

- `asset/inline`
  - 作用：将资源文件转换为 Data URI（通常是 Base64 编码的字符串），并直接内嵌到打包后的 JS（或 CSS）文件中，不会生成独立的资源文件。
  - 替代：Webpack 4 中的` url-loader`（且不配置 limit 限制大小的情况）。
  - 适用场景：极小的图标（如 1kb、2kb 的小 png）。好处是可以减少网页加载时的 HTTP 请求数量；坏处是如果把大图片转成 Base64，会让你的 JS 文件体积急剧增大。

- `asset/source`
  - 作用：导出资源的源代码（把文件内容作为字符串原样导出）。
  - 替代：Webpack 4 中的 `raw-loader`。
  - 适用场景：需要读取文本内容时，比如导入 .txt 文本文件、.md Markdown 文件，或者你想把 SVG 图标直接当成 HTML 字符串插入到页面中时。

- `asset` **(最常用)**
  - 作用：这是一个智能类型。它会在 asset/resource（输出文件）和 asset/inline（转 Base64 内嵌）之间自动做出选择。

  - 替代：Webpack 4 中配置了文件体积限制（limit）的 `url-loader`。

  - 适用场景：常规的图片处理。

  - 默认规则：如果文件大小小于 8kb，Webpack 会自动将其当作 asset/inline 处理（转 Base64）；如果文件大小大于 8kb，则将其当作 asset/resource 处理（输出为单独文件）。你可以通过配置

    ```js
    // webpack.config.js
    module.exports = {
      // ...
      module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
          },
        ],
      },
      mode: "development",
    };
    ```

### **6.1、图片资源处理**

过去在 Webpack4 时，我们处理图片资源通过 `file-loader` 和 `url-loader` 进行处理

因为webpack内置了 **Asset Modules**直接执行打包指令，默认`type: “asset/resource”`

#### **<span style='color:red'>1）使用默认配置构建</span>**

**添加图片资源**

- src\images\1.png
- src\images\2.png

`src\css\index.css`

```css
.box1 {
  width: 100px;
  height: 100px;
  background-image: url("../images/1.png");
  background-size: cover;
}

.box2 {
  width: 100px;
  height: 100px;
  background-image: url("../images/2.png");
  background-size: cover;
}
```

`public\index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="../dist/main.js"></script>
  </head>

  <body>
    <div class="box1"></div>
    <div class="box2"></div>
  </body>
</html>
```

**运行打包指令**

```
npx webpack
```

打开 index.html 页面查看效果

#### **<span style='color:red'>2）输出资源情况</span>**

此时如果查看 dist 目录的话，会发现多了2张图片资源

因为 Webpack 会将所有打包好的资源输出到 dist 目录下

- **为什么样式资源没有呢？**

因为经过 `style-loader` 的处理，在浏览器**运行时**动态创建 `<style>` 标签并插入 DOM中，所以没有额外输出出来

#### **<span style='color:red'>3）对图片资源进行优化</span>**

将小于某个大小的图片转化成 data URI 形式（Base64 格式）

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
      },
    ],
  },
  mode: "development",
};
```

- 优点：减少请求数量
- 缺点：体积变得更大

此时输出的图片文件就只有两张，有一张图片以 data URI 形式内置到 js 中了 （注意：需要将上次打包生成的文件清空，再重新打包才有效果）

### **6.2、自动清空上次打包资源**

`clean: true`

```js
// webpack.config.js
module.exports = {
  output: {
    clean: true, // 开发模式没有输出，不需要清空输出结果
  },
};
```

### **6.3、修改输出资源名称和路径**

默认情况下，`asset` 模块以 `[hash][ext][query]` 文件名发送到输出目录dist。

可以通过在 webpack 配置中设置`Rule.generator.filename` 与 [`output.assetModuleFilename`](https://www.webpackjs.com/configuration/output/#outputassetmodulefilename)来修改此模板字符串，仅适用于 `asset` 和 `asset/resource` 模块类型。

#### **<span style='color:red'>1）最佳实践</span>**

在 output 里设置一个比如叫 assets 的通用目录作为“兜底”，然后对于图片，再在 rule 里单独覆盖它

```js
// webpack.config.js
module.exports = {
  output: {
    // ✨ 全局兜底：所有没单独配置 generator 的资源，都放到 media 文件夹
    assetModuleFilename: "assets/media/[hash:10][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        generator: {
          // ✨ 优先级更高：覆盖兜底配置，放到 images 目录
          filename: "images/[hash:10][ext][query]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: "asset/resource",
        // 这里不写 generator，就会默认触发兜底，被放进 media/ 目录下
      },
    ],
  },
  mode: "development",
};
```

> `[hash:10][ext][query]` = `[ hash值取8位][文件扩展名][添加之前的query参数]`

### **6.4、字体图标资源**

#### **<span style='color:red'>1）下载字体图标文件</span>**

1. 打开[阿里巴巴矢量图标库](https://www.iconfont.cn/)
2. 选择想要的图标添加到购物车，统一下载到本地
3. 将字体图标文件夹修改名字`fonts`，放置`src\assets\fonts`中

#### **<span style='color:red'>2）添加字体图标资源</span>**

- **src\main.js**

  ```js
  import "./fonts/iconfont.css";
  ```

- public\index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <script src="../dist/main.js"></script>
    </head>
  
    <body>
      <!-- 使用字体图标 -->
      <i class="iconfont icon-arrow-down"></i>
      <i class="iconfont icon-ashbin"></i>
      <i class="iconfont icon-browse"></i>
    </body>
  </html>
  ```

#### **<span style='color:red'>3）配置</span>**

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/media/[hash:8][ext][query]",
        },
      },
    ],
  },
  mode: "development",
};
```

#### **<span style='color:red'>4）运行指令</span>**

```
npx webpack  // 打开 index.html 页面查看效果
```

### **6.5、音视频资源等**

开发中可能还存在一些其他资源，如音视频等，我们也一起处理了

#### **<span style='color:red'>1）配置</span>**

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/media/[hash:8][ext][query]",
        },
      },
    ],
  },
  mode: "development",
};
```

就是在处理字体图标资源基础上增加其他文件类型，统一处理即可

---

## **七、处理JavaScript资源**

**有人可能会问，js 资源 Webpack 不能已经处理了吗，为什么我们还要处理呢？**

原因是 Webpack 对 js 处理是有限的，只能编译 js 中 ES 模块化语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以我们希望做一些兼容性处理。

其次开发中，团队对代码格式是有严格要求的，我们不能由肉眼去检测代码格式，需要使用专业的工具来检测。

- 针对 js 兼容性处理，我们使用 Babel 来完成
- 针对代码格式，我们使用 Eslint 来完成

我们先完成 Eslint，检测代码格式无误后，在由 Babel 做代码兼容性处理

### **7.1、Eslint**

可组装的 JavaScript 和 JSX 检查工具。意思就是它是用来检测 js 和 jsx 语法的工具，可以配置各项功能。

我们使用 Eslint，关键是写 Eslint 配置文件，里面写上各种 rules 规则，将来运行 Eslint 时就会以写的规则对代码进行检查。

> **注意：** ESLint 从 **v9.0.0** 开始，**Flat Config（扁平化配置）** 成为默认且唯一推荐的配置方式，旧版的 `.eslintrc.*` 系列配置文件已被废弃。以下内容均以 v9.0.0+ 的新版写法为准。

#### **<span style='color:red'>1）配置文件</span>**

- ESLint v9.0.0+ 使用 **Flat Config** 格式，配置文件为以下之一，项目根目录下存在一个即可：
  - `eslint.config.js`（推荐）
  - `eslint.config.mjs`
  - `eslint.config.cjs`

  > **旧版（已废弃）：** v9 之前使用的 `.eslintrc`、`.eslintrc.js`、`.eslintrc.json` 以及 `package.json` 中的 `eslintConfig` 字段，在 v9.0.0 中已被移除，不应再使用。

#### **<span style='color:red'>2）具体配置</span>**

Flat Config 的配置文件导出一个**数组**，数组中的每个对象都是一组独立的配置，按顺序叠加生效。

```js
// eslint.config.js 基本结构
export default [
  // 每个对象代表一组配置
  {
    files: ["**/*.js"], // files: 指定该配置生效的文件范围（不写则对所有文件生效）
    languageOptions: {}, // languageOptions: 取代旧版的 parserOptions + env
    rules: {}, // rules: 具体检查规则（写法与旧版相同）
  },
];
```

##### **<span style='color:cornflowerblue'>a、languageOptions（语言选项）</span>**

取代了旧版的 `parserOptions` 和 `env`，告诉 ESLint 代码的语法特性和可用的全局变量。

```js
// eslint.config.js 基本结构
import globals from "globals";

languageOptions: {
    ecmaVersion: "latest", // ES 语法版本，推荐使用 "latest"
    sourceType: "module", // ES 模块化
    globals: {
        ...globals.node, // 启用 Node.js 全局变量（取代旧版 env.node）
        ...globals.browser, // 启用浏览器全局变量（取代旧版 env.browser）
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true, // 如果是 React 项目，则需要开启 JSX 语法
        },
    },
},
```

##### **<span style='color:cornflowerblue'>b、rules 具体规则</span>**

2. 规则的值与旧版完全一致：

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn`（不会导致程序退出）
- `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error`（当被触发的时候，程序会退出）

```js
rules: {
    semi: "error",                     // 禁止使用分号
    'array-callback-return': 'warn',   // 强制数组方法的回调函数中有 return 语句，否则警告
    'default-case': [
        'warn',                          // 要求 switch 语句中有 default 分支，否则警告
        { commentPattern: '^no default$' } // 允许在最后注释 no default，就不会有警告了
      ],
}
```

更多规则详见：[规则文档](https://eslint.org/docs/latest/rules/)

##### **<span style='color:cornflowerblue'>c、继承官方推荐规则</span>**

开发中一条一条写 `rules` 规则太费劲，可以直接继承现有的规则集。在新版中通过**直接引入模块**来实现，不再使用字符串形式的 `extends`。

**常见规则集：**

- **ESLint 官方推荐**：来自 `@eslint/js` 包的 `js.configs.recommended`
- **Vue 官方规则**：来自 `eslint-plugin-vue` 包的 `pluginVue.configs["flat/essential"]`
- **React 官方规则**：来自 `eslint-plugin-react` 包

```js
// 以 Vue 项目为例
import pluginVue from "eslint-plugin-vue";

export default [
  // Vue 推荐配置 (应用到 .vue 文件及相关解析设置)
  ...pluginVue.configs["flat/essential"],

  // 自定义配置：针对 .vue 文件的覆盖
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-unused-vars": "warn",
    },
  },
];
```

#### **<span style='color:red'>3）完整示例（Vue 项目）</span>**

```js
// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";

export default [
  // 1. 继承 ESLint 官方推荐规则（应用于 .js、.mjs、.cjs 文件）
  js.configs.recommended,

  // 2. 继承 Vue 官方推荐配置（自动处理 .vue 文件的解析）
  ...pluginVue.configs["flat/essential"],

  // 3. 针对 .vue 文件的自定义覆盖规则
  {
    files: ["**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-unused-vars": "warn",
    },
  },

  // 4. 针对 .js 文件的语言选项与自定义规则
  {
    files: ["**/*.js"], // 如有 JSX 则改为 ["**/*.js", "**/*.jsx"]
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // 启用 Node.js 全局变量
        ...globals.browser, // 启用浏览器全局变量
      },
    },
    rules: {
      // 在 js.configs.recommended 基础上覆盖或添加
      "no-console": 2, // 禁止使用console
    },
  },
];
```

#### **<span style='color:red'>4）在 Webpack 中使用</span>**

##### **<span style='color:cornflowerblue'>a、安装包</span>**

```bash
npm i eslint-webpack-plugin eslint globals @eslint/js -D
```

`eslint-webpack-plugin` 的作用是**将 ESLint 集成进 Webpack 的构建流程**，让代码在每次打包（或 webpack-dev-server 热更新）时自动执行 lint 检查。

| 功能                 | 说明                                                                        |
| :------------------- | :-------------------------------------------------------------------------- |
| **构建时自动检查**   | 每次执行 `webpack` / `npm run build` 时，自动对源码跑一遍 ESLint            |
| **开发时实时反馈**   | 配合 `webpack-dev-server`，保存文件时立即在终端或浏览器控制台显示 lint 错误 |
| **阻断编译（可选）** | 开启 `failOnError: true` 后，lint 报错会直接让构建失败，防止问题代码上线    |

##### **<span style='color:cornflowerblue'>b、定义 Eslint 配置文件</span>**

```js
// eslint.config.js
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"], // 如有 JSX 则改为 ["**/*.js", "**/*.jsx"]
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // 启用 Node.js 全局变量
        ...globals.browser, // 启用浏览器全局变量
      },
    },
    rules: {
      // 在 js.configs.recommended 基础上覆盖或添加
      "no-console": 2, // 禁止使用console
    },
  },
];
```

##### **<span style='color:cornflowerblue'>c、webpack配置</span>**

```js
// webpack.config.js
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new ESLintWebpackPlugin({
      // 插件会自动识别 eslint.config.js
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "src"),
      failOnError: true, // 默认值：true。eslint 报错时终止构建（生产环境推荐开启
      failOnWarning: false, // 默认值：false。eslint 警告时终止构建（按需开启）
    }),
  ],
  mode: "development",
};
```

##### **<span style='color:cornflowerblue'>d、测试验证</span>**

```js
// main.js
console.log(11111);
```

不设置规则的情况下js写了`console.log(11111)`构建是不会报错的

```js
rules: {
    "no-console": 2,  // 禁止使用console
},
```

设置规则之后，`npx webpck`构建就会失败

![image-20260305173616845](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260305173616845.png)

#### **<span style='color:red'>5）VSCode Eslint 插件</span>**

打开 VSCode，下载 Eslint 插件，即可不用编译就能看到错误，可以提前解决。

但是此时就会对项目所有文件默认进行 Eslint 检查了，我们 dist 目录下的打包后文件就会报错。但是我们只需要检查 src 下面的文件，不需要检查 dist 下面的文件。

所以需要配置 Eslint 忽略文件：

**新版配置 (Flat Config)**：直接在 `eslint.config.js` 中添加 `ignores` 属性

```js
export default [
  {
    ignores: ["dist/**"], // 忽略 dist 目录下所有文件
  },
  // ... 其他配置
];
```

![image-20260305174025794](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260305174025794.png)

### **7.2、Babel**

**Babel（准确说是 preset-env 自身）主要负责语法**：比如 `const` 改成 `var`、去掉箭头函数等。

**对于新的 API 或内置对象**：比如 `Promise`、`Array.from`、`Object.assign`、`[].includes`，老浏览器里根本没有这些全局对象和原型方法。Babel 转换后还是 `Promise` 字母，必定在旧浏览器报错。我们需要 **Polyfill** 给环境打补丁。

[Babel 7 从入门到进阶的全场景指南](https://zhbcloud.github.io/posts/b41c92e1.html)

[Babel Runtime 依赖图谱与模块化 Polyfill 方案](https://zhbcloud.github.io/posts/44f179c0b9.html)

#### **<span style='color:red'>1）配置文件</span>**

配置文件由很多种写法：

- babel.config.\*
  - `babel.config.js`（有动态逻辑就使用这个）
  - `babel.config.json`（官方推荐使用）
- .babelrc.\*
  - `.babelrc`
  - `.babelrc.js`
  - `.babelrc.json`
- `package.json` 中 `babel`：不需要创建文件，在原有文件基础上写Babel 会查找和自动读取它们，所以以上配置文件只需要存在一个即可

#### **<span style='color:red'>2）具体配置</span>**

⚠️⚠️⚠️JSON 格式**不支持注释**，这会导致 Babel 解析配置文件时报错或**直接忽略整个配置**

```json
{
  "presets": [], // 预设：告诉 Babel 如何处理通用的语法
  "plugins": [] // babel插件 处理特殊的、非通用的转换需求
}
```

**presets 预设**

简单理解：就是预先设定好的一组 Babel 插件的集合，扩展 Babel 功能

- `@babel/preset-env`: 一个智能预设，允许您使用最新的 JavaScript。
- `@babel/preset-react`：一个用来编译 React jsx 语法的预设
- `@babel/preset-typescript`：一个用来编译 TypeScript 语法的预设

#### **<span style='color:red'>3）在 Webpack 中使用</span>**

##### **<span style='color:cornflowerblue'>a、安装包</span>**

```bash
npm i babel-loader @babel/core @babel/preset-env -D
```

这三个依赖是前端开发中处理 JavaScript 新语法的“黄金组合”，它们配合工作，让我们可以放心地使用最新的 JS 语法，而不用担心浏览器兼容性问题。它们的具体含义和分工如下：

**`babel-loader（搬运工/桥梁）`**

- **含义**：它是 Webpack 和 Babel 之间的一座桥梁。
- **作用**：Webpack 默认只能看懂基础的 JS，遇到高级的新语法它可能就不认识了。`babel-loader` 告诉 Webpack：“遇到 JS 文件时，先交给我，我把它送到 Babel 那里翻译一下，翻译好了再还给你去打包。”
- **大白话**：它就是一个快递员，负责把 Webpack 里的 JS 代码打包盒，送到 Babel 工厂去加工。

**`@babel/core（核心大脑）`**

- **含义**：Babel 的核心库，也就是刚才说的“Babel 工厂”的总部。
- **作用**：它包含了 Babel 编译代码的核心 API。它知道如何解析（Parse）JS 代码变成抽象语法树（AST），如何遍历（Traverse）这棵树，以及如何根据规则把树重新生成（Generate）为新的 JS 代码。
- **注意**：`@babel/core` 本身不包含具体的翻译规则。它只是一个引擎，提供能力，但不知道具体要把什么语法转换成什么样（比如它不知道要把箭头函数转成普通函数，这需要别人告诉它）。

**`@babel/preset-env（规则字典/翻译官）`**

- **含义**：这是一个预设（preset），也就是一组插件（翻译规则）的集合包。
- **作用**：前面说了核心大脑不知道具体的翻译规则，`@babel/preset-env` 就是这本厚厚的“翻译字典”。它包含了将最新 JavaScript 语法（如 ES6 的箭头函数、const/let、类等）转换成旧版本浏览器（如 IE、老版 Chrome）能听懂的 ES5 语法的所有必要规则（也就是各种 Babel plugins）。
- **强大之处**：它不仅包含规则，还很“智能”。你可以配置你想要支持的浏览器环境（比如 "目标是 Chrome 80 以上"），它会自动判断哪些语法需要转换，哪些不需要，从而避免过度编译，减小打包后的文件体积。

##### **<span style='color:cornflowerblue'>b、定义 Babel 配置文件</span>**

```json
// babel.config.json
{
  "presets": [["@babel/preset-env"]]
}
```

##### **<span style='color:cornflowerblue'>c、改 js 文件代码</span>**

```js
// main.js
const sum = (...args) => args.reduce((p, c) => p + c, 0);

console.log(sum(1, 2, 3, 4, 5));
```

##### **<span style='color:cornflowerblue'>d、配置webpack</span>**

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  mode: "development",
};
```

##### **<span style='color:cornflowerblue'>e、运行指令</span>**

```
npx webpack  // 打开 dist/static/js/main.js 文件查看，会发现箭头函数等 ES6 语法已经转换了
```

---

## **八、Loader的多种写法**

在 Webpack 的 `module.rules` 里，指定用哪个 loader 处理文件有两种方式：`loader` 或 `use`。二者都支持多种写法，按「单个/多个、有无选项」选即可。以下写法均以 [Webpack 中文文档](https://webpack.docschina.org/loaders/babel-loader/) 为准。

### **8.1、写法总览**

| 写法                                                     | 适用场景                                           |
| -------------------------------------------------------- | -------------------------------------------------- |
| `loader: "babel-loader"`                                 | 只有一个 loader 且无选项时的简写                   |
| `use: "babel-loader"`                                    | 单个 loader，无选项，字符串                        |
| `use: ["style-loader", "css-loader"]`                    | 多个 loader，都无选项，字符串数组                  |
| `use: { loader: "babel-loader", options: {} }`           | 单个 loader 带选项，**一个对象**（官网常用）       |
| `use: [{ loader: "babel-loader", options: {} }]`         | 单个 loader 带选项，数组里一个对象                 |
| `use: [{ loader, options? }, { loader, options? }, ...]` | 多个 loader，且有的要传选项，**必须用数组 + 对象** |

要点：**只有一个 loader 且要传 options 时**，可以写 `use: { loader, options }`，不必包在数组里。

### **8.2、按场景选择**

#### **<span style='color:red'>1）一个 loader、无选项</span>**

用 `loader` 或 `use` 字符串均可：

```javascript
{ test: /\.js$/, loader: "babel-loader" }
// 或
{ test: /\.js$/, use: "babel-loader" }
```

#### **<span style='color:red'>2）一个 loader、有选项</span>**

推荐用 **对象** 形式的 `use`（官网常见写法），也可用数组包一个对象：

```javascript
// 推荐：直接一个对象
{
  test: /\.js$/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"],
    },
  },
}

// 也可以：数组里一个对象
{ test: /\.js$/, use: [{ loader: "babel-loader", options: { presets: ["@babel/preset-env"] } }] }
```

#### **<span style='color:red'>3） 多个 loader</span>**

必须用 **数组**。都无选项时用字符串数组；有选项的写成对象放进数组：

```javascript
// 都无选项
use: ["style-loader", "css-loader"];

// 有的有选项：全部写成对象
use: [
  { loader: "style-loader", options: { injectType: "styleTag" } },
  { loader: "css-loader", options: { modules: true } },
];
```

### **8.3、示例：多个 loader 且都带选项**

例如给 JS 先经 `thread-loader` 再经 `babel-loader`，且都要传选项：

```javascript
{
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: [
        { loader: "thread-loader", options: { workers: 2 } },
        {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
                cacheDirectory: true,
            },
        },
    ],
}
```

以上写法适用于所有 loader，不限于 babel-loader。

---

## **九、处理 Html 资源**

### **9.1、安装包**

```
npm i html-webpack-plugin -D
```

**帮你自动生成** HTML 文件，并把打包好的 JS 和 CSS 自动插入到这个 HTML 中。

### **9.2、配置webpack**

```js
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin(), // 一般这么配置即可
    // new HtmlWebpackPlugin({
    // 以 public/index.html 为模板创建文件
    // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
    // template: path.resolve(__dirname, "public/index.html"),
    // }),
  ],
  mode: "development",
};
```

运行`npx webpack`此时 dist 目录就会输出一个 index.html 文件

---

## **十、开发服务器&自动化**

每次写完代码都需要手动输入指令才能编译代码，太麻烦了，我们希望一切自动化

### **10.1、安装包**

```
npm i webpack-dev-server -D
```

### **10.2、配置webpack**

```js
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // ...
  // 开发服务器:不会输出资源，在内存中编译打包的
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  mode: "development",
};
```

运行`npx webpack serve`此时当你使用开发服务器时，所有代码都会在内存中编译打包，并不会输出到 dist 目录下。

开发时我们只关心代码能运行，有效果即可，至于代码被编译成什么样子，我们并不需要知道。

---

## **十一、生产模式**

生产模式是开发完成代码后，我们需要得到代码将来部署上线。

这个模式下我们主要对代码进行优化，让其运行性能更好。

优化主要从两个角度出发:

1. 优化代码运行性能
2. 优化代码打包速度

我们在`config `中分别准备两个配置文件来放不同的配置

### **11.1、文件目录**

```
├── webpack-code (项目根目录)
    ├── config (Webpack配置文件目录)
    │    ├── webpack.dev.js(开发模式配置文件)
    │    └── webpack.prod.js(生产模式配置文件)
    ├── node_modules (下载包存放目录)
    ├── src (项目源码目录，除了html其他都在src里面)
    │    └── 略
    ├── public (项目html文件)
    │    └── index.html
    ├── eslint.config.js(Eslint配置文件)
    ├── babel.config.json(Babel配置文件)
    └── package.json (包的依赖管理配置文件)
```

### **11.2、修改 webpack.dev.js**

因为文件目录变了，所以所有绝对路径需要回退一层目录才能找到对应的文件

```js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: "js/main.js", // 将 js 文件输出到 static/js 目录中
    // ✨ 全局兜底：所有没单独配置 generator 的资源，都放到 media 文件夹
    assetModuleFilename: "media/[hash:10][ext][query]", // 图片的输出路径
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 /imgs 目录中
          filename: "imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 其他省略
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  mode: "development",
};
```

运行开发模式的指令：

```bash
npx webpack serve --config ./config/webpack.dev.js
```

### **11.3、修改 webpack.prod.js**

```js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "js/main.js", // 将 js 文件输出到 static/js 目录中
    // ✨ 全局兜底：所有没单独配置 generator 的资源，都放到 media 文件夹
    assetModuleFilename: "media/[hash:10][ext][query]", // 图片的输出路径
    clean: true,
  },
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 /imgs 目录中
          filename: "imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  mode: "production",
};
```

运行生产模式的指令：

```bash
npx webpack --config ./config/webpack.prod.js
```

### **11.4、配置运行指令**

为了方便运行不同模式的指令，我们将指令定义在 package.json 中 scripts 里面

```json
// package.json
{
  // 其他省略
  "scripts": {
    "dev": "npx webpack serve --config ./config/webpack.dev.js",
    "build": "npx webpack --config ./config/webpack.prod.js"
  }
}
```

以后启动指令：

- 开发模式：`npm run dev`
- 生产模式：`npm run build`

## **十二、CSS进阶优化**

### **12.1、提取 CSS 成单独文件**

Css 文件目前被`style-loader`打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式。

这样对于网站来说，会出现闪屏现象，用户体验不好，我们应该是单独的 Css 文件，通过 link 标签加载性能才好。

**`link`标签加载的优势**

- 浏览器缓存 (Caching)
- 并行下载 (Parallel Downloading)
- 复用性与关注点分离 (Separation of Concerns)
- 优化首屏渲染 (Performance)

#### **<span style='color:red'>1）安装包</span>**

```bash
npm i mini-css-extract-plugin -D
```

#### **<span style='color:red'>2）配置webpack</span>**

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
    ],
  },
  plugins: [
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "css/main.css",
    }),
  ],
  mode: "production",
};
```

运行`npm run build`

#### **<span style='color:red'>3）最佳实践</span>**

在目前的 Webpack 项目中，通常会看到这种配置：

- **开发环境**：使用 `style-loader`。它通过 JS 动态创建 `<style>` 标签插入到页面。这样做是为了支持 **热更新 (HMR)**，修改 CSS 后页面不刷新即可生效，开发体验极佳。
- **生产环境**：使用 `MiniCssExtractPlugin.loader`。它会将 CSS 提取到独立文件中，生成类似 `main.abcd123.css` 的文件。这样可以配合浏览器的强缓存，极大提升用户的二次访问速度。

### 12.2、CSS兼容性处理

#### **<span style='color:red'>1）安装包</span>**

```bash
npm i postcss-loader postcss postcss-preset-env -D
```

这三个工具在 Webpack 构建流程中共同协作，负责处理 CSS 的兼容性和现代特性。它们之间的关系可以用“核心引擎”、“连接器”和“插件集”来类比。

**下面是详细的分析：**

- <span style='color:#10c300'> 核心作用与定位</span>

| 工具名称                 | 作用定位           | 详细说明                                                                                                                                                                                                |
| :----------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`postcss`**            | **核心转换引擎**   | 这是一个用 JavaScript 转换 CSS 的工具。它本身不做任何具体的样式处理，而是提供了一个极其强大的 API，允许通过各种插件来分析和修改 CSS（类似 Babel 处理 JS 的机制）。                                      |
| **`postcss-loader`**     | **Webpack 连接器** | 它是 Webpack 的一个 Loader。作用是让 Webpack 能够调用 PostCSS。当 Webpack 遇到 CSS 文件时，`postcss-loader` 会把 CSS 交给 `postcss` 引擎去处理。                                                        |
| **`postcss-preset-env`** | **功能插件集**     | 这是一个 PostCSS 插件。它能让你使用最新的 CSS 语法（如 变量、嵌套等），并自动根据你指定的浏览器目标（Browserslist）添加对应的 Vendor Prefix（前缀）或降级处理。它集成了 `autoprefixer` 等多个常用插件。 |

---

- <span style='color:#10c300'>三者之间的依赖关系</span>

它们的关系是**层层递进**的：

1. **`postcss-loader`** 依赖 **`postcss`**：Loader 只是一个外壳，没有核心引擎它无法工作。
2. **`postcss`** 需要 **`postcss-preset-env`**：核心引擎只是一个平台，如果没有插件，它进出 CSS 的结果是一模一样的。
3. **Webpack 流程**： `Webpack` ➔ `postcss-loader` ➔ `postcss` ➔ `postcss-preset-env` (各种具体转换逻辑)

#### **<span style='color:red'>2）配置webpack</span>**

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "css/main.css",
    }),
  ],
  mode: "production",
};
```

#### **<span style='color:red'>3）控制兼容性</span>**

我们可以在 `package.json` 文件中添加 `browserslist` 来控制样式的兼容性做到什么程度。

```json
{
  // 其他省略
  "browserslist": ["ie >= 8"]
}
```

想要知道更多的 `browserslist` 配置，查看[browserslist 文档](https://github.com/browserslist/browserslist)

以上为了测试兼容性所以设置兼容浏览器 ie8 以上。

![image-20260228132335215](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260228132335215.png)

实际开发中我们一般不考虑旧版本浏览器了，所以我们可以这样设置：

```json
{
  // 其他省略
  "browserslist": [
    "last 2 version", // 每个主流浏览器（Chrome, Firefox, Safari, Edge 等）的最后两个版本。
    "> 1%", // 全球使用份额超过 1% 的浏览器。
    "not dead" // 排除**“已死亡”**的浏览器。
  ]
}
```

#### **<span style='color:red'>4）优化合并</span>**

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        preProcessor,
    ].filter(Boolean);
};

module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleLoaders()
            },
            {
                test: /\.less$/,
                use:  use: getStyleLoaders("less-loader")
            },
        ],
    },
    plugins: [
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 定义输出文件名和目录
            filename: "css/main.css",
        }),
    ],
    mode: "production",
};
```

运行`npm run build`查看

### 12.3、CSS压缩

#### **<span style='color:red'>1）安装包</span>**

```
npm i css-minimizer-webpack-plugin -D
```

#### **<span style='color:red'>2）配置webpack</span>**

```js
// webpack.config.js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  // ...
  plugins: [new CssMinimizerPlugin()],
  mode: "production",
};
```

运行`npm run build`查看

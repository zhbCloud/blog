---
title: 运行单vue文件
abbrlink: c9a5b66011
date: 2025-02-21 23:55:33
img: /static/3.webp
categories: 框架与生态
tags:
  - vue2
---

#### **<font color='red'>1、安装vue脚手架</font>**

这里一定要安装4.x的脚手架，5.x的脚手架会报错

```js
npm install -g @vue/cli@4.x
vue --version  // 查看版本号 是否安装成功
```



#### **<font color='red'>2、@vue/cli-service-global</font>**

全局安装支持零配置运行 .vue文件的扩展

```js'
npm install -g @vue/cli-service-global
```



#### **<font color='red'>3、新建一个test文件夹</font>**

在test文件夹中创建一个需要运行的vue文件--app.vue



#### **<font color='red'>4、初始化项目</font>**

```bash
npm init
```



#### **<font color='red'>5、运行app.vue文件</font>**

```bash
vue serve app.vue
```



**官方文档文档的介绍到此为止，但是我运行的时候一直报错，详细错误见**

```js
PS E:\Desktop\test> vue serve text.vue
 INFO  Starting development server...
(node:30628) UnhandledPromiseRejectionWarning: Error: Cannot find module 'vue-template-compiler'
Require stack:
- D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\vue-loader\lib\compiler.js
- D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\vue-loader\lib\resolveScript.js
- D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\vue-loader\lib\select.js
- D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\vue-loader\lib\index.js
- D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\@vue\cli-service\lib\config\base.js
- D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\@vue\cli-service\lib\Service.js
- D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\index.js
- D:\nvm\v12.18.1\node_modules\@vue\cli\lib\util\loadCommand.js
- D:\nvm\v12.18.1\node_modules\@vue\cli\bin\vue.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:966:15)
    at Function.resolve (internal/modules/cjs/helpers.js:78:19)
    at loadFromContext (D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\vue-loader\lib\compiler.js:30:26)
    at loadTemplateCompiler (D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\vue-loader\lib\compiler.js:37:12)
    at exports.resolveCompiler (D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\vue-loader\lib\compiler.js:25:23)
    at VueLoaderPlugin.apply (D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\vue-loader\lib\plugin-webpack4.js:91:22)
    at VueLoaderPlugin.apply (D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\vue-loader\lib\plugin.js:13:16)
    at webpack (D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\webpack\lib\webpack.js:51:13)
    at serve (D:\nvm\v12.18.1\node_modules\@vue\cli-service-global\node_modules\@vue\cli-service\lib\commands\serve.js:163:22)
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
(node:30628) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:30628) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

上面的错误主要是说 找不到 'vue-template-compiler' 这个模块。
**那我们就安装这个依赖模块**

```js
npm install vue-template-compiler --save-dev
```

**最后执行命令，运行成功**

```js
vue serve app.vue
```

![1712511397966](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140218383.jpeg)

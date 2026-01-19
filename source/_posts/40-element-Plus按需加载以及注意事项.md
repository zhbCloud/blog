---
title: element-Plus按需加载以及注意事项
abbrlink: e3b10f75
date: 2025-08-22 15:51:08
img: /static/23.webp
categories: 框架与生态
tags:
  - element-Plus
  - vue3
---

### **<font color='red'>一、依赖包安装</font>**

```shell
$ pnpm install element-plus
```

<br>

### **<font color='red'>二、Volar 支持</font>**

```json
/ tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

<br>

### **<font color='red'>三、按需自动导入</font>**

#### **<font color='#10c300'>3.1、安装 </font>**

安装自动导入组件和函数的插件

```shell
$ pnpm add unplugin-vue-components unplugin-auto-import -D
```

<br>

#### **<font color='#10c300'>3.2、配置 </font>**

安装完成会默认在根目录生成`auto-imports.d.ts`和`components.d.ts`两个文件ts声明文件

```ts
/ vite.config.ts配置

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    // ...
    plugins: [
        // ...
        AutoImport({
         	resolvers: [ElementPlusResolver()],
        }),
        Components({
         	resolvers: [ElementPlusResolver()],
        }),
    ],
})
```

将生成的声明文件关联到ts的配置文件中去

```json
/ tsconfig.app.json
// 将auto-imports.d.ts和components.d.ts和env.d.ts三个文件统一放到根目录的types文件夹中，然后在include中直接引入types即可
{
    // ...
    "include": ["types", "src/**/*", "src/**/*.vue"], // TypeScript编译器编译的文件
}
```

 问题：只要新加组件和和函数就又会在根目录生成两个声明文件，但是我需要生成的文件在types文件中，怎么做呢？ 在`vite.config.ts`文件中配置声明文件存储的路径

```ts
/ vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
    // ...
    plugins: [
        // ...
        AutoImport({
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue', 'pinia', 'vue-router'],
         	resolvers: [ElementPlusResolver()],
            // 指定自动导入 函数 TS类型声明文件路径，默认自动导入在根目录。
            dts: 'types/auto-imports.d.ts',
        }),
        Components({
         	resolvers: [ElementPlusResolver()],
            // 指定自动导入 组件 TS类型声明文件路径，默认自动导入在根目录。
            dts: 'types/components.d.ts',
        }),
    ],
})
```

怎么查看`components.d.ts`声明文件生效？鼠标放到使用的elementPlus组件上，会出现如图的ts。

![image-20250217102004143](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20250217102004143.png)

忽略`auto-imports.d.ts`和`components.d.ts`上传至仓库

```
types/*
!types/env.d.ts
```

<br>

### **<font color='red'>四、element-plus 样式问题</font>**

当你使用unplugin-vue-components来引入ui库的时候，message, notification，toast 等引入样式不生效（弹窗在底部）

![image-20250217104623237](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20250217104623237.png)

#### **<font color='#10c300'>4.1、全量引入（不推荐） </font>**

在main.ts中引入

```ts
import 'element-plus/dist/index.css'
```

<br>

#### **<font color='#10c300'>4.1、按需自动引入</font>**

##### **<font color='cornflowerblue'>1）安装 </font>**

```shell
$ pnpm add vite-plugin-style-import -D
```

<br>

##### **<font color='cornflowerblue'>2）配置文件 </font>**

在 `vite.config.ts` 配置

```ts
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

export default defineConfig({
    plugins: [
        createStyleImportPlugin({
            // 预设的和自定义二选一
            resolves: [ElementPlusResolve()], // 预设的样式解析器
            // libs: [{ // 自定义样式的加载方式
            //     libraryName: 'element-plus',
            //     esModule: true,
            //     resolveStyle: (name: string) => {
            //         return `element-plus/theme-chalk/${name}.css`
            //     },
            // }],
        }),
    ],
})
```

<br>

### **<font color='red'>五、icon图标自动导入</font>**

如果使用unocss原子CSS引擎，也可使用unocss的icon图标引入，详细见[unocss使用教程](https://shixna.github.io/post/74efe575.html)

#### **<font color='#10c300'>5.1、安装 </font>**

使用`unplugin-icons`和`unplugin-auto-import`从[iconify](https://icon-sets.iconify.design/ " iconify官网")中自动导入任何图标集，若安装unplugin-auto-import则不需再次安装

```shell
$ pnpm add -D unplugin-icons unplugin-auto-import
```

<br>

#### **<font color='#10c300'>5.2、配置文件</font>**

##### **<font color='cornflowerblue'>1）vite.config.ts配置 </font>**

```ts
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
                IconsResolver(), 
                // IconsResolver({
                	// prefix: 'i',
                	// enabledCollections: ['ep'],
                // }),
            ],
        }),
        Icons({
            autoInstall: true,
        }),
    ]
})
```

网上很多教程有写在AutoImport中也需设置IconsResolver()，实际在AutoImport 下的 IconsResolver 中可以不添加 IconsResolver 配置，只在 Components 下的 IconsResolver 中进行相应配置就行

<br>

##### **<font color='cornflowerblue'>2）自动导入icon 图标的格式</font>**

{prefix}-{collection}-{icon}

即 ~ “前缀-使用的图标库名称-图标名” 格式形式来使用的，element-plus 的图标库名称是 “ep”，默认前缀是 “i”，需要改的话可以在 Components 配置项 的 IconsResolver 的`prefix`中进行相应配置

以elementPlus的`icon`为例（[iconify](https://icon-sets.iconify.design/ " iconify官网")图标库中的也一样）

```html
<i-ep-Bowl />
<!-- 或者 -->
<el-icon>
	<i-ep-alarmClock />
</el-icon>
```

如果设置属性例如颜色、大写则必须使用`<el-icon>`包裹，然后在其上写属性

```html
<el-icon :size="60" color="red">
    <i-ep-Plus />
</el-icon>
```

<br>

##### **<font color='cornflowerblue'>3）IconsResolver配置解析</font>**

当IconsResolver()不设置参数的时候，[iconify](https://icon-sets.iconify.design/ " iconify官网")图标库中的图标都能使用（这里面也包含了elementPlus的图标）

```ts
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
                IconsResolver(), 
            ],
        }),
        Icons({
            autoInstall: true,
        }),
    ]
})
```

![image-20250217232957812](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502172329868.png)

怎么使用[iconify](https://icon-sets.iconify.design/ " iconify官网")图标库中的图标呢？举例子

![image-20250217234948316](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502172349404.png)

![image-20250217235318764](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502172353815.png)

 

当IconsResolver()设置参数的时候，自定义图标格式前缀、限制使用图标库。

```ts
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
                IconsResolver({
                	prefix: 'icon',
                	enabledCollections: ['ep', 'mdi', 'iconamoon'],
                }),
            ],
        }),
        Icons({
            autoInstall: true,
        }),
    ]
})
```

```html
// xxxx.vue
<icon-mdi-Bowl />
<icon-mdi-alarmClock />
<icon-iconamoon-arrow-bottom-right-1-fill />
```

![image-20250218000329782](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502180003832.png)

怎么去看enabledCollections中定义的这个图标库名称呢？

![image-20250218000454202](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502180004288.png)

**`注意`**

当没做图标库限制的时候，使用了哪些图标库就会自动安装这个图标库的依赖，因此更建议使用IconsResolver({})自定义的去限制图标库

![image-20250220170724230](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20250220170724230.png)

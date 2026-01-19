---
title: UnoCSS的使用
abbrlink: 74efe575
date: 2025-08-23 15:51:08
img: /static/24.webp
categories: 工程化与质量
tags:
  - unocss
  - css
---

![image-20250222155200521](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502221552580.png)

[UnoCSS中文文档](https://unocss.jiangruyi.com/)

### **<font color='red'>1、安装 </font>**

```
pnpm add -D unocss @iconify-json/ep @unocss/preset-rem-to-px
```

> unocss：核心库
>
> @iconify-jsonp/ep：使用elementplus图标库https://iconify.design/
>
> @unocss/preset-rem-to-px：默认是rem单位，将rem转成px

**`UnoCSS`**图标预设：https://unocss.jiangruyi.com/presets/icons

```ts
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```

<br>

### **<font color='red'>2、配置</font>**

**`UnoCSS`**的尺寸1（m-1）转换之后是4px，根目录默认字体大小16px即16px = 1rem，4px = 0.25rem，因此得知Uno中的1表示4px，也代表0.25rem。如果要想将UnoCSS中的1变成1px，则需要安装`@unocss/preset-rem-to-px`插件。

```ts
// uno.config.ts
import presetRemToPx from '@unocss/preset-rem-to-px'
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetWind3,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    shortcuts: { // 自定义属性  一个属性可以对应多个UnoCSS类值
        'flex-center': 'flex justify-center items-center',
        'flex-x-center': 'flex justify-center',
        'flex-y-center': 'flex items-center',
        'grid-center': 'grid place-items-center',
        'wh-full': 'w-full h-full',
        'flex-x-between': 'flex items-center justify-between',
        'flex-x-end': 'flex items-center justify-end',
        'absolute-lt': 'absolute left-0 top-0',
        'absolute-rt': 'absolute right-0 top-0 ',
        'fixed-lt': 'fixed left-0 top-0',
    },

    theme: {
        colors: { // 自定义颜色
            primary: 'var(--el-color-primary)',
            red: '#f53e31',
            gray_888: '#888',
            gray_999: '#999',
        },
    },

    presets: [
        presetWind3({
            important: '#app',
        }),
        // 允许你直接在HTML元素上使用属性来定义样式，而不需要使用class。例如，<div flex m="5"></div>可以等价于<div class="flex m-5"></div>
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
        presetRemToPx({ // 根目录字体设置为4即可实现unocss的1为1px
            baseFontSize: 4,
        }),

    ],
    // transformerDirectives() 可以使用@apply @screen theme函数
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
    rules: [
        // 以下官网规则可自定义转换
        // [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    ],
})

```



```ts
// main.ts
import 'virtual:uno.css'
```

<br>

**<font color='red'>3、UnoCSS中使用图标 </font>**

[iconify官网](https://icon-sets.iconify.design/ " iconify官网")中的@iconify-jsonp/ep图标

@iconify-jsonp/ep

> 语法：i前缀-ep图标库:xx（图标名称）

```html
<div i-ep:chrome-filled />
```

![image-20250223231812025](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502232318083.png)

<br>

### **<font color='red'>4、UnoCSS预设语法 </font>**

默认的 `@unocss/preset-uno` 预设（实验阶段）是一系列流行的原子化框架的通用超集，包括了 `Tailwind CSS`，`Windi CSS`，`Bootstrap`，`Tachyons` 等。

```css
w-10 h-10
    width: 10px;
    height: 10px;

max-w-96 min-w-96
    max-width: 96px;
    min-width: 96px;

text-30
	font-size: 30px

rounded  rounded-2
	border-radius: 1px;
    border-radius: 2px;

size-50
	width: 50px;
	height: 50px;

py-2
    padding-top: 2px;
  	padding-bottom: 2px;

px-4
    padding-left: 4px;
 	padding-right: 4px;

font-bold
	font-weight: 700;

border-4 // 边框宽度
	border-width: 4px;

box-border
	box-sizing: border-box;

leading-3
	line-height: 3px;

text-center
	text-align: center;

如果你的项目需要一次性自定义颜色，请考虑使用任意值符号来按需为该颜色生成一个类，而不是将其添加到你的主题中：
class="c-[#f40]" //必须要用class

b-b-2 b-solid b-red
	border-bottom: 2px solid red

gap10
	gap: 10px;  flex布局盒子之间距离
```








































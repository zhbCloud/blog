---
title: vue实现滚动到具体某元素位置
abbrlink: 6324
date: 2025-02-27 23:55:34
img: /static/36.webp
categories: 框架与生态
tags:
  - vue2
---

### **<font color='red'>一、scrollIntoView()方法</font>**

```javascript
scrollIntoView({ behavior:"smooth", block: "start", inline: "start"})
```

1. behavior 表示滚动方式。auto 表示使用当前元素的 scroll-behavior 样式。instant 和 smooth表示 直接滚到底 和 使用平滑滚动。

2. block 表示块级元素排列方向要滚动到的位置。对于默认的 writing-mode: horizontal-tb来说，就是竖直方向。start 表示将视口的顶部和元素顶部对齐；center表示将视口的中间和元素的中间对齐；end表示将视口的底部和元素底部对齐；nearest 表示就近对齐。

3. inline 表示行内元素排列方向要滚动到的位置。对于默认的 writing-mode: horizontal-tb来说，就是水平方向。其值与 block 类似。


```javascript
{

  behavior: "auto" | "instant" | "smooth", // 默认 auto
  block: "start" | "center" | "end" | "nearest", // 默认 center
  inline: "start" | "center" | "end" | "nearest", // 默认 nearest

}
```

### **<font color='red'>二、案例</font>**

vue 单文件运行 vue serve + 文件名

```vue
<template>
    <div class="content" ref="scrollDiv">
        <div class="go" @click="go">点击下滑</div>
        <h1 class="show" id="show" ref="view">展示</h1>
    </div>
</template>

<script>

export default {

  data () {
    return {

    }
  },
  methods: {
    go () {
        // 方法1：
      	// document.getElementById('show').scrollIntoView({ behavior: 'smooth' })
        // 方法2
      	this.$refs.view.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

</script>
<style lang='less' scoped>
.go {
  border: 1px solid #f40;
  width: 120px;
  text-align: center;
}
.content {
  padding: 10px 50px;
}
.show {
  margin-top: 3000px;
  background: #f40;
  color: #fff;
}
</style>

```

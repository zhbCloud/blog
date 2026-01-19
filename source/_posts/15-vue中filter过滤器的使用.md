---
title: vue中filter过滤器的使用
abbrlink: 51760
date: 2025-03-02 23:55:41
img: /static/6.webp
categories: 框架与生态
tags:
  - vue2
---

### **<font color='red'>一、全局filter过滤器的配置及使用</font>**

**1、在src下面新建filters/index.js**

```jsx
const currency = (price) => {
  if (!price) return '0.00'
  return `人民币${price.toFixed(2)}`
}

export default {
  currency
}
```

这里的函数就相当于把红色方框里的函数抽离出来,单独放在一个文件

![image-20230417000335469](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140200945.png)

**2、在main.js中引入和注册全局过滤器**

```jsx
import filters from './filter/index'
Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})

// Object.keys(filters)得到的就是filters/index.js里面的函数名组成的数组 ['currency '] 因为这里index.js里面就一个函数所以数组里就只有一个值
//filterName 就是通过遍历['currency '] 得到的就是index.js中的每一个函数名(过滤器名字)
//filters[filterName])出发./filter/index中的某个函数
```

**3、在不同的vue文件中使用定义的全局过滤器了**

```csharp
 <div class="proPrice">{{66  | currency}}元</div>
// currency就是过滤器名
```

最终打印的是 66.00

<br>

### **<font color='red'>二、局部filter过滤器的使用</font>**

```js
<template>
    <div>
        <p class="displayOrderStatus">
            {{ resultList.orderStatus | statusText }}
        </p>
    </div>
</template>

<script>
export default {
    data() {
        this.statusMap = {
            S2: '办理成功',
            R2: '已解约',
            R3: '已退货',
            F1: '审批失败',
            S1P: '办理中',
            S1F: '办理失败',
            ...['F2', 'F3', 'F4'].reduce((acc, key) => {
                acc[key] = '已失效'
                return acc
            }, {})
        }
        return {}
    },
    filters: {
        statusText: value => this.statusMap[value] || ''
    }
}
</script>
```


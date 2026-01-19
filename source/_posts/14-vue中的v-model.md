---
title: vue中的v-model
abbrlink: c9a5b6609
date: 2025-03-01 23:55:39
img: /static/35.webp
categories: 框架与生态
tags:
  - vue2
---

v-model 实际上就是 $emit(‘input’) 以及 props:value 的组合[语法糖](https://so.csdn.net/so/search?q=语法糖&spm=1001.2101.3001.7020)，在背后做了两件事：

1. v-bind绑定value属性的值；
2. v-on绑定input事件监听到函数中，函数会获取最新的值赋值到绑定的属性中；

### **<font color='red'>一、v-model用在html标签上</font>**

```html
<input v-model="foo" />  
相当于⬇️
<input :value="foo" @input="foo = $event.target.value" />
```

checkbox 和 radio 使用 props:checked 属性和 $emit(‘change’) 事件。

select 使用 props:value 属性和 $emit(‘change’) 事件。

但是，除了上面列举的这些，别的都是 $emit(‘input’) 以及 props:value

<br>

### **<font color='red'>二、v-model用在组件标签上</font>**

#### **<font color='#10c300'>2.1、组件中非v-model实现双向数据绑定</font>**

```html
// 父组件
<template>
   <div class=''>
        <UserInfo :value="userName" @input="onInput"></UserInfo>
        <p>姓名：{{userName}}</p>
   </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue'
export default {
    data() {
        return {
            userName: ''
        }
    },
    components: {
        UserInfo
    },
    methods: {
        onInput(val) {
            this.userName = val
        }
    }
}
</script>
```

```html
// 子组件
<template>
   <div>
        <input type="text" :value="value" @input="handlerInput">
   </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    methods: {
        handlerInput(e) {
            this.$emit('input', e.target.value)
        }
    }
}
</script>
```

<br>

#### **<font color='#10c300'>2.2、组件中v-model实现双向数据绑定</font>**

```html
// 父组件
<template>
   <div class=''>
        <UserInfo v-model="userName"></UserInfo>
        <p>姓名：{{userName}}</p>
   </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue'
export default {
    data() {
        return {
            userName: ''
        }
    },
    components: {
        UserInfo
    }
}
</script>
```

```html
// 子组件
<template>
   <div>
        <input type="text" :value="value" @input="handlerInput">
   </div>
</template>

<script>
export default {
    props: {
        value: { // 通过props接受父组件value的值（v-model默认传的是value）
            type: String,
            default: ''
        }
    },
    methods: {
        handlerInput(e) { // 通过$emit触发input方法修改值
            this.$emit('input', e.target.value)
        }
    }
}
</script>
```

<br>

##### **<font color='orange'>1）修改传递参数的默认值</font>**

> 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，为了避免有时候的冲突，我们可以自定义事件；以下是在子组件中声明：

```js
model: {
    prop: 'myValue', // 默认是value
    event: 'myInput', // 默认是input
}
```

```html
// 父组件
<template>
   <div class=''>
        <UserInfo v-model="userName"></UserInfo>
        <p>姓名：{{userName}}</p>
   </div>
</template>

<script>
import UserInfo from './components/UserInfo.vue'
export default {
    data() {
        return {
            userName: ''
        }
    },
    components: {
        UserInfo
    }
}
</script>
```

```html
// 子组件
<template>
    <div>
        <input type="text" :value="myValue" @input="handlerInput">
    </div>
</template>

<script>
export default {
    model: {
        prop: 'myValue', // 默认是value
        event: 'myInput' // 默认是input
    },
    props: {
        myValue: {
            type: String,
            default: ''
        }
    },
    methods: {
        handlerInput(e) {
            this.$emit('myInput', e.target.value)
        }
    }
}
</script>

```

<br>

##### **<font color='orange'>2）实践案例</font>**

```html
// 父组件
<template>
   <div class=''>
        <Dialog v-model="dialogFlag" @confirm="confirm"></Dialog>
        <p>{{params}}</p>
        <md-button type="primary" @click="open">打开弹窗</md-button>
   </div>
</template>

<script>
import Dialog from './components/Dialog.vue'
export default {
    data() {
        return {
            dialogFlag: false,
            params: ''
        }
    },
    components: {
        Dialog
    },
    methods: {
        open() {
            this.dialogFlag = true
        },
        confirm(val) {
            this.params = val
        }
    }
}
</script>
```

```html
// 子组件
<template>
    <div>
        <md-dialog
            title="窗口标题"
            :closable="true"
            v-model="basicDialogFlag"
            :btns="basicDialog.btns"
        >
            人生的刺，就在这里，留恋着不肯快走的，偏是你所不留恋的东西。
        </md-dialog>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            basicDialog: {
                btns: [
                    {
                        text: '确认操作',
                        handler: () => {
                            this.onBasicConfirm()
                        }
                    }
                ]
            }
        }
    },
    computed: {
        basicDialogFlag: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    mounted() {
        // 默认打开弹窗。不要直接修改 prop（this.value），通过计算属性的 setter 发出 input
        // this.basicDialogFlag = true
    },
    methods: {
        onBasicConfirm() {
            // 关闭对话框并通知父组件（通过 v-model 的 input）
            this.basicDialogFlag = false
            // 可选：通知父级确认操作
            this.$emit('confirm', '子组件确认操作已通知父组件')
        }
    }
}
</script>
```

<br>

##### **<font color='orange'>3）扩展</font>**

**Vue 2** 中 `.sync` 修饰符的用法，父子组件如何通过 **`:prop.sync`** 和 `$emit('update:prop')` 进行双向绑定。

在 Vue 2 中，当父组件写：

```vue
vue<Child :name.sync="username"></Child>
```

它等价于：

```vue
vue<Child :name="username" @update:name="val => username = val"></Child>
```

也就是说：

- 父组件传给子组件 `name` 属性
- 子组件通过 `$emit('update:name', newVal)` 能直接更新父组件的 `username`

```html
// 父组件
<template>
  <div>
    <h2>父组件</h2>
    <p>父组件的用户名: {{ username }}</p>

    <!-- 使用 .sync 修饰符 -->
    <Child :name.sync="username" />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  components: { Child },
  data() {
    return {
      username: '张三'
    }
  }
}
</script>
```

```html
// 子组件
<template>
  <div>
    <h3>子组件</h3>
    <p>接收到的用户名: {{ name }}</p>

    <!-- 点击按钮修改用户名 -->
    <button @click="changeName">修改用户名</button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    changeName() {
      const newName = this.name + '（子组件改过）'
      // 用 $emit 触发 update:name
      this.$emit('update:name', newName)
    }
  }
}
</script>
```


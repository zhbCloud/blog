---
title: vue详细开发插件并且发布到npm上
abbrlink: 22447
date: 2025-03-04 23:56:41
img: /static/8.webp
categories: 框架与生态
tags:
  - vue2
  - npm
---

这一篇开发的插件 类似elementUI中的 Message 消息提示，用this.$message()来调用 并且可以传参数

### **<font color='red'>一. 前期准备</font>**

#### **<font color='#10c300'>1.1、项目搭建</font>**

用 vue init webpack-simple myPlugin  指令去搭建项目

```bash
$ vue init webpack-simple myPlugin 
```

![image-20230417002907982](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140207446.png)

#### **<font color='#10c300'>1.2、项目结构</font>**

![image-20230417002913341](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140207655.png)

<br>

### **<font color='red'>二. 编写插件</font>**

#### **<font color='#10c300'>2.1、创建插件文件</font>**

![image-20230417002917885](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140207737.png)

1）在src目录下新建一个plugin文件夹(这是写插件的文件)，在plugin里面新建一个plugin.js和plugin.vue文件
![image-20230417002925410](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140207285.png)

<br>

2）调用插件（可以用先调用插件, 要不然在插件文件里面写的代码在运行项目之后看不到插件写的效果）
调用插件和elmentUI是一样的 
![image-20230417002929037](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140207587.png)

<br>

#### **<font color='#10c300'>2.2、plugin.js </font>**

插件的入口文件
这里主要用到Vue.exten()构造器  (不懂自行看vue官网)
![image-20230417002934289](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208202.png)

```js
import plugin from './plugin.vue'
const MyPlugin = {
  install (Vue, option = null) {
    // 开发插件方式1: 用Vue.extend()  然后new出来   最后挂载  开发的插件类似element中的弹出框  在组件中直接用this.$message()就能调用
    // Vue.extend(plugin)生成的构造器需要new出来(这时候能访问plugin组件里的属性)  最后挂载就可以了
    // 构造vue子类构造器
    const Constructor = Vue.extend(plugin)
    // 通过上面的构造器生成 MyHeaderConstructor 通过new出来的实例对象是可以直接访问组件plugin中的属性
    const Profile = new Constructor()
    console.log(Profile)
    // 当在组件中调用vue原型上的this.$message()这个方法 也就触发了插件plugin组件中的message()方法
    Vue.prototype.$message = function (message) {
      Profile.changeStatus(message)
    }
    const ele = document.createElement('div')
    document.body.appendChild(ele)
    Profile.$mount(ele)
  }
}
export default MyPlugin

```

<br>

#### **<font color='#10c300'>2.4、plugin.vue</font>**

插件的逻辑
```html
<template>
    <div class="content">
        <transition name="fade">
            <div class="box" v-show="isShow">
                <div class="inside">
                    <div class="top">
                        <div class="circle" :class="defaulTransmit.pluginData.type === 'success' ? 'success' : 'warning'">
                            <i class="iconfont font" :class="defaulTransmit.pluginData.type === 'success' ? 'iconduigou' : 'icongantanhao'"></i>
                        </div>
                    </div>
                    <p class="botton" :class="defaulTransmit.pluginData.type === 'success' ? 'blue' : 'orange'">
                        {{ defaulTransmit.pluginData.message }}
                    </p>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            defaulTransmit: {
                pluginData: {}
            },
            isShow: false
        }
    },
    methods: {
        changeStatus(message) {
            const params = {
                message: message.message,
                type: message.type
            }
            this.$set(this.defaulTransmit, 'pluginData', params)
            this.isShow = true
            setTimeout(() => {
                this.isShow = false
            }, message.time)
        }
    }
}
</script>
<style lang='less' scoped>
p {
    margin: 0;
}

.success {
    background-color: #14cab4;
}

.warning {
    background-color: #ffb800;
}

// 过渡的样式
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
    // transition: opacity 0.5s;
}

// 显示时的样式
.fade-enter {
    opacity: 0;
}

// 隐藏时的样式
.fade-leave-to {
    opacity: 0;
}

.blue {
    color: #14cab4;
}

.orange {
    color: #ffb800;
}

.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px 15px;
    box-sizing: border-box;
    width: 517px;
    border: 1px solid rgb(230, 230, 230);

    .top {
        position: relative;
        margin: 20px 0;
        height: 196px;
        background: url('../assets/tip.png') no-repeat center;

        .circle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -40%);
            width: 123px;
            height: 123px;
            line-height: 123px;
            border-radius: 123px/2;
            text-align: center;

            .font {
                color: #ffffff;
                font-size: 75px;
            }
        }
    }

    .botton {
        text-align: center;
        height: 83px;
        line-height: 83px;
        font-family: AdobeHeitiStd-Regular;
        font-size: 30px;
        letter-spacing: 2px;
    }
}
</style>
```

<br>

### **<font color='red'>三. 使用插件</font>**

![image-20230417002942294](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208865.png)

```html
// app.vue
<template>
  <div id='app'>
    <button @click="handle()">点击测试</button>
  </div>
</template>
<script>
export default 
  name: 'app',
  methods: {
    handle () {
      // 调用插件
      this.$message({
        message: '警告哦，这是一条警告消息',  // 消息框的文本内容
        type: 'warning',   // 消息框的类型 目前就设置了(warning和success)
        time: 2000  // 消息后多少s之后消失
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
```


### **<font color='red'>四. 效果</font>**

![image-20230417002942294](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208481.gif)



### **<font color='red'>五. 发布发到npm</font>**

#### **<font color='#10c300'>5.1、修改webpack.config.js文件</font>**

![](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208505.png)

<br>

#### **<font color='#10c300'>5.2、打包</font>**

```bash
npm run build
```

![image-20230417003416064](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208053.png)

<br>

#### **<font color='#10c300'>5.3.、修改引入文件</font>**

改变根目录下index.html中引入的js文件（修改成刚才打包成的dist文件夹中的js文件）

![image-20230417003419849](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208426.png)

<br>

#### **<font color='#10c300'>5.4、 配置package.json</font>**

版本号1.0.0默认的都需要更改
![image-20230417003424263](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208325.png)

<br>

#### **<font color='#10c300'>5.5、 修改gitignore 文件</font>**

在根目录下的gitignore 文件，去掉 dist/，如下：

![image-20230417003427985](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208351.png)

<br>

#### **<font color='#10c300'>5.6、 发布到npm</font>**

<font color='cornflowerblue'>1）运行命令</font>

```bash
$ npm login
```

根据提示填写npm 账号  密码  邮箱
![image-20230417003432712](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208707.png)

<font color='cornflowerblue'>2）运行命令</font>

```bash
$ npm publish
```

<br>

#### **<font color='#10c300'>5.7、 发布中可能遇到的问题</font>**

1）no_perms Private mode enable, only admin can publish this module

原因：因为镜像设置成淘宝镜像了，设置回来即可

方案：npm config set registry [http://registry.npmjs.org](http://registry.npmjs.org/)

<br>

2）npm publish failed put 500 unexpected status code 401

原因：一般是没有登录

方案：重新登陆一次

<br>

3）npm ERR! you do not have permission to publish “your module name”. Are you logged in as the correct user?

原因：包名被占用

方案：修改包名即可

nrm ls 查看镜像 切换成淘宝镜像 nrm use taobao

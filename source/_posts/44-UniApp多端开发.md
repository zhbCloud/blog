---
title: UniApp多端开发
abbrlink: 57fa3c28
date: 2025-12-02 00:29:04
img: /static/42.webp
categories: 框架与生态 
tags:
  - Uniapp
  - 多端开发
---

### **<font color='red'>一、uniApp生命周期 </font>**

#### **<font color='#10c300'>1-1、应用生命周期</font>**

| 函数名               | 说明                                                         | 平台兼容              |
| :------------------- | :----------------------------------------------------------- | :-------------------- |
| onLaunch             | 当`uni-app` 初始化完成时触发（全局只触发一次），参数为应用启动参数，同 [uni.getLaunchOptionsSync](https://uniapp.dcloud.net.cn/api/getLaunchOptionsSync.html#getlaunchoptionssync) 的返回值 |                       |
| onShow               | 当 `uni-app` 启动，或从后台进入前台显示，参数为应用启动参数，同 [uni.getLaunchOptionsSync](https://uniapp.dcloud.net.cn/api/getLaunchOptionsSync.html#getlaunchoptionssync) 的返回值 |                       |
| onHide               | 当 `uni-app` 从前台进入后台                                  |                       |
| onError              | 当 `uni-app` 报错时触发                                      | app-uvue 不支持       |
| onUniNViewMessage    | 对 `nvue` 页面发送的数据进行监听，可参考 [nvue 向 vue 通讯](https://uniapp.dcloud.io/tutorial/nvue-api?id=communication) | app-uvue 不支持       |
| onUnhandledRejection | 对未处理的 Promise 拒绝事件监听函数（2.8.1+ app-uvue 暂不支持） | app-uvue 不支持       |
| onPageNotFound       | 页面不存在监听函数                                           | app-uvue 不支持       |
| onThemeChange        | 监听系统主题变化                                             | app-uvue 不支持       |
| onLastPageBackPress  | 最后一个页面按下Android back键，常用于自定义退出             | app-uvue-android 3.9+ |
| onExit               | 监听应用退出                                                 | app-uvue-android 3.9+ |

应用生命周期仅可在`App.vue`中监听，在其它页面监听无效。

<br>

#### **<font color='#10c300'>1-2、面生命周期</font>**

| 函数名                              | 说明                                                         | 平台差异说明                                                 |
| :---------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| onInit                              | 监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad | 百度小程序                                                   |
| onLoad                              | 监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参） |                                                              |
| onShow                              | 监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |                                                              |
| onReady                             | 监听页面初次渲染完成，此时组件已挂载完成，DOM 树($el)已可用，注意如果渲染速度快，会在页面进入动画完成前触发 |                                                              |
| onHide                              | 监听页面隐藏                                                 |                                                              |
| onUnload                            | 监听页面卸载                                                 |                                                              |
| onResize                            | 监听窗口尺寸变化                                             | App、微信小程序、快手小程序                                  |
| onPullDownRefresh                   | 监听用户下拉动作，一般用于下拉刷新                           |                                                              |
| onReachBottom                       | 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项 |                                                              |
| onTabItemTap                        | 点击 tab 时触发，参数为Object，具体见下方注意事项            | 微信小程序、QQ小程序、支付宝小程序、百度小程序、H5、App、快手小程序、京东小程序 |
| onShareAppMessage                   | 用户点击右上角分享                                           | 微信小程序、QQ小程序、支付宝小程序、抖音小程序、飞书小程序、快手小程序、京东小程序 |
| onPageScroll                        | 监听页面滚动，参数为Object                                   | nvue不支持                                                   |
| onNavigationBarButtonTap            | 监听原生标题栏按钮点击事件，参数为Object                     | App、H5                                                      |
| onBackPress                         | 监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack；[详见](https://uniapp.dcloud.net.cn/tutorial/page.html#onbackpress) | app、H5、支付宝小程序                                        |
| onNavigationBarSearchInputChanged   | 监听原生标题栏搜索输入框输入内容变化事件                     | App、H5                                                      |
| onNavigationBarSearchInputConfirmed | 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。 | App、H5                                                      |
| onNavigationBarSearchInputClicked   | 监听原生标题栏搜索输入框点击事件（pages.json 中的 searchInput 配置 disabled 为 true 时才会触发） | App、H5                                                      |
| onShareTimeline                     | 监听用户点击右上角转发到朋友圈                               | 微信小程序                                                   |
| onAddToFavorites                    | 监听用户点击右上角收藏                                       | 微信小程序、QQ小程序                                         |



##### **<font color='cornflowerblue'>1）Vue2 页面及组件生命周期流程图</font>**

![img](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/uni-app-lifecycle-vue2.jpg)

<br>

##### **<font color='cornflowerblue'>Vue3 页面及组件生命周期流程图</font>**

![img](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/uni-app-lifecycle-vue3.jpg)

<br>

#### **<font color='#10c300'>1-3、组件生命周期</font>**

| 函数名        | 说明                                                         | 平台差异说明 |
| :------------ | :----------------------------------------------------------- | :----------- |
| beforeCreate  | 在实例初始化之前被调用。                                     |              |
| created       | 在实例创建完成后被立即调用。                                 |              |
| beforeMount   | 在挂载开始之前被调用。                                       |              |
| mounted       | 挂载到实例上去之后调用。注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用`$nextTick` |              |
| beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 打补丁之前。                  | 仅H5平台支持 |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。 | 仅H5平台支持 |
| beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。               |              |
| destroyed     | Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 |              |

<br>

### **<font color='red'>二、多端调试环境配置 </font>**

#### **<font color='#10c300'>2-1、安卓真机调试配置</font>**

**以小米手机为例：**

![image-20250604101545567](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20250604101545567.png)

![image-20250604102525380](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20250604102525380.png)

<br>

#### **<font color='#10c300'>2-2、IOS真机调试配置</font>**

2022年9月，因收到苹果公司警告，目前开发者已无法在iOS真机设备使用未签名的标准基座，所以现在要运行到 IOS ，也需要进行签名。Windows系统，开发者就可以使用三方工具（如爱思助手）对标准基座签名。

**`注意：使用Apple ID签名的IPA文件有效期为7天，7天后需要重签。如果需要“自动续签”功能，IOS手机需要越狱`**

##### **<font color='cornflowerblue'>1）前期准备</font>**

- HBuilder 3.6.9+(一般我会把软件更新到最新版，版本跟不上容易出现问题)

- ios设备

- 原装数据线

- 爱思助手软件（还有iTunes工具，下载爱思助手后会自动安装该工具）

- 安装基座：在HBuildex安装目录下面的plugins\launcher\base 目录下找到安装的ios基座：iPhone_base.ipa

  （如果没有需要安装），后面添加IPA文件的时候用到。

<br>

##### **<font color='cornflowerblue'>2）操作步骤</font>**

- **下载爱思助手**，打开爱思助手并用数据线连接ios设备。

- **进行签名：**

  ![image-20250604111911639](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20250604111911639.png)

  使用Apple ID 签名，依次点击使用Apple ID签名--->添加Apple ID---> 输入Apple ID和密码（账号最好是邮箱， 如果 Apple ID 账号是手机号码，在签名输入 ID 账号时，手机号前面需要加 86。例如：8615012345678。 ）--->确定。

  ![image-20250604113014783](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20250604113014783.png)

  如果签名成功，打开已签名IPA的位置，找到签名后的ipa文件，**`并命名为iPhone_base_signed.ipa`**，然后将其拷贝到HBuilderX安装目录\plugins\launcher\base

  ![img](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/2052514-20250121112902666-19879140.png)

  ![img](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/2052514-20250121113924730-1273769980.png)

  打开HBuilderX，选择要运行的项目，点击工具栏运行图标，选择【运行到iOS App基座】

  ![img](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/2052514-20250121113938712-386846139.png)

  如果没运行出来，可能是由于 iphone 没有开启 “开发者模式”，需要自己手动将开发者模式打开。

- **打开开发者模式**

  设置--->隐私与安全--->开发者模式 ，打开后会提示重启手机。

  **如果你的ios系统。是 16 以上，可能在 设置---隐私与安全 里面没有 “开发者模式这一项” ，需要利用 爱思助手 来将选项打开**

  打开爱思助手 工具箱--->虚拟定位， 随便输入一个经纬度，点击修改 

  ![image-20250604113829151](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20250604113829151.png)

  确定开发者模式已开启 ：在手机上，设置---隐私与安全性 里面，就能看到有”开发者选项“了，开启，然后提示重启手机。完成即可。

- **运行ios基座遇到的问题**

  下图运行到ios基座成功

  ![img](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/2052514-20250121114101865-331084701.png)

   

  1.ios上面安装了HBuilder调试基座，但是移动端未出现运行app的界面，点击安装的HBuilder调试基座，弹出 需要互联网连接以验证是否信任开发者iphone.....，此时确保网络是否链接是否通畅，如果设备已经连接到互联网，仍然没解决，我选择了重启设备，解决了上述问题；

  2.重启设备之后，再次点击HBuilder调试基座，提示不收信任的开发者，此时在设备上找到设置>通用>vpn与设备管理这个选项，可以看到我们的开发者APP当前是不受信任的 我们只需点开，信任当前开发APP就可以了

  ![image-20250604114032005](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20250604114032005.png)

  再重新打开这个APP，就可以发现已经可以进行iOS真机预览了。

<br>

#### **<font color='#10c300'>2-3、微信小程序调试配置</font>**

<br>

#### **<font color='#10c300'>2-4、支付宝小程序调试配置</font>**

<br>

### **<font color='red'>三、多端调试环境配置 </font>**

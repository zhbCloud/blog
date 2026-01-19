---
title: windows本地安装部署-Easy-Mock
abbrlink: c5a66ce8
date: 2025-02-22 23:31:42
img: /static/4.webp
categories: 后端与运维
tags:
  - Easy-Mock
---

集万家之精华
最详细的本地部署 Easy-Mock 没有之一了

### **<font color='red'>一、背景</font>**

在前后端分离的开发方式下，后端如果暂时没数据，前端为了开发方便可以使用模拟数据来对付一下，目前提供模拟数据的平台已经有不少，大多数都是自带Api管理的，比如[Yapi](https://links.jianshu.com/go?to=http%3A%2F%2Fyapi.demo.qunar.com%2F)、[sosoApi](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.sosoapi.com%2F)、[eoLinker](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.eolinker.com%2F%23%2F)、[Easy-Mock](https://links.jianshu.com/go?to=https%3A%2F%2Feasy-mock.com%2F)

Easy-Mock比较小清新，使用起来也方便点，缺点就是没有Api的分组功能，但平时应付应付不太大的应用、个人应用等场景足够了；如果要进行分组权限管理之类的复杂功能，则推介使用目前正在快速更新的Yapi~

**为什么要部署本地的easy-mock?**

1、官网的被不少人直接拿到开发环境用，因此经常被挤爆，稳定性较差；
2、有些公司/研究所限制外网；



### **<font color='red'>二、准备</font>**

**这里提供所有需要的安装包：**

[百度网盘](https://pan.baidu.com/s/1Gf0c7jpEp8krc3WvTM7e6g?pwd=wq6g)



### **<font color='red'>三、安装</font>**

#### **<font color='#10c300'>3.1、安装node.js</font>**

建议安装默认路径(安装路径不能有中文)
网上有的说node版本不能是10以上，但是我用的是14的版本也没出什么问题



#### **<font color='#10c300'>3.2、安装MongoDB</font>**

**a、打开安装程序，点击next**

![image-20230417001657942](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140202950.png)

<br>

**b、勾选协议，点击next**

![image-20230417001711965](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140202662.png)

<br>

**c、选择“custom”自定义安装路径(C:\MongoDB\Server\4.2)最终安装在4.2下面**

![image-20230417001718113](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140202989.png)

![image-20230417001724553](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140202154.png)

![image-20230417001731999](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203873.png)

![image-20230417001740911](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203561.png)

<br>

**d、点击安装**

![image-20230417001752473](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203946.png)



**就这么简单？不存在的**

![image-20230417001758688](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203665.png)

<br>

### **<font color='red'>四、配置</font>**

#### **<font color='#10c300'>4.1、新建mongo.conf 文件</font>**

C:\MongoDB\Server\4.2下面新建一个配置文件mongo.conf 写入如下代码（注意自己的路径)

```cpp
dbpath=C:\MongoDB\Server\4.2\data\db
logpath=C:\MongoDB\Server\4.2\log\mongo.log
logappend=true
journal=true
quiet=true
port=27017
```

  C:\MongoDB\Server\4.2\data下面新建一个文件夹db
  C:\MongoDB\Server\4.2下面新建一个log文件夹，再在该文件夹下面新建mongo.log文件

#### **<font color='#10c300'>4.2、创建服务</font>**

配置环境变量

```undefined
MONGO_HOME = C:\Program Files\MongoDB\Server\3.4\bin
Path = %MONGO_HOME%
```

![image-20230417001806039](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203786.png)

![image-20230417001811228](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203189.png)


  管理员权限的cmd中注册服务： mongod --config "C:\MongoDB\Server\4.2\mongo.conf" --install --serviceName "MongoDB"

![image-20230417001816723](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203833.png)



![image-20230417001822119](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203949.png)




  cmd中开启服务：net start mongodb

![image-20230417001827023](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203781.png)




**这时候浏览器中访问127.0.0.1:27017应该就已经有内容了**

![image-20230417001832067](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203464.png)



#### **<font color='#10c300'>4.3、Redis安装</font>**

Redis类似，在[Github-release](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FMSOpenTech%2Fredis%2Freleases)下载一个msi版本安装，一直下一步；

![image-20230417001836597](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203903.png)




安装完毕，在系统变量中配置

![image-20230417001841386](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203669.png)





这时，你的redis已经是默认服务了。如图：

![image-20230417001849131](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203643.png)




试下，打开cmd。进入到安装目录后输入 redis-cli.exe -h 127.0.0.1 -p 6379 （注：这个是redis默认的ip及端口，可自行搜索度娘修改）
然后在输入 set key value （key和value自己随便写），回车后再输入get key (你刚才输入的key)，看是否显示你刚才输入的value。如图：

![image-20230417001855304](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203421.png)




**注意：**
网上很多要求先输入redis-server.exe redis.windows.conf
这种情况不适用于安装包模式，只有压缩包模式的才会这样！ 这是个大坑

![image-20230417001859969](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203968.png)




如果不需要作为服务自动启动cmd中执行：redis-server --service-uninstall



#### <font color="#10c300" size="">4.4、安装部署Easy-Mock</font>

**a、首先要全局安装两个库**

```undefined
npm i -g cross-env pm2
```

**b、拉取github上的easy-mock的代码**

```bash
git clone https://github.com/easy-mock/easy-mock.git
cd easy-mock
npm install
npm run build
```

**c、配置在config/default.json中自行修改，注意其中有几个地方要改一下**

  db改为[mongodb://localhost:27017/easymockdb](https://links.jianshu.com/go?to=mongodb%3A%2F%2Flocalhost%3A27017%2Feasymockdb)
  redis->port应该跟之前安装的redis配置的port一致，默认6379

![image-20230417001905549](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203076.png)



**d、在easy-mock项目目录下使用pm2守护运行：**

```undefined
cross-env NODE_ENV=production pm2 start app.js
```

这时候访问本地的[http://localhost:7300/](https://links.jianshu.com/go?to=http%3A%2F%2Flocalhost%3A7300%2F) 就可以打开Easy-Mock页面了，跟Easy-Mock官网一样的

![image-20230417001911602](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140203928.png)

之后要打开本地Easy-Mock只需要在Easy-Mock项目下运行：cross-env NODE_ENV=production pm2 start app.js 即可打开本地的easy-mock

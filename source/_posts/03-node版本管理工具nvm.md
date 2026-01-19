---
title: node版本管理工具nvm
abbrlink: 5998a893
date: 2025-02-20 23:34:50
img: /static/2.webp
categories: 工具
tags:
  - node
  - nvm
---

### **<font color='red'>1、nvm是什么</font>**

nvm全名node.js version management，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。下面列出下载、安装及使用方法。



### **<font color='red'>2、下载</font>**

可在[点此在github](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fcoreybutler%2Fnvm-windows%2Freleases)上下载最新版本,本次下载安装的是windows版本。打开网址我们可以看到有两个版本：

- nvm-noinstall.zip：绿色免安装版，但使用时需进行配置。
- nvm-setup.zip：安装版，推荐使用



### **<font color='red'>3、安装</font>**

本次演示的是安装版。

<font color='cornflowerblue'>1）、双击安装文件 nvm-setup.exe</font>

![image-20230417002448198](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140204990.png)



<font color='cornflowerblue'>2、选择nvm安装路径（注意：这里的安装路径命名一定不能有空格）</font>

![image-20230417002453444](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140204478.png)



<font color='cornflowerblue'>3、选择nodejs路径（这里默认路径）</font>

![image-20230417002457882](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140204341.png)



<font color='cornflowerblue'>4、确认安装即可</font>

![image-20230417002502636](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140204374.png)



<font color='cornflowerblue'>5、安装完确认</font>

用管理员打开CMD，输入命令 nvm ，安装成功则如下显示。可以看到里面列出了各种命令，本节最后会列出这些命令的中文示意。

![image-20230417002506847](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140204790.png)



### **<font color='red'>4、安装/管理nodejs</font>**

<font color='cornflowerblue'>1、查看本地安装的所有版本；</font>

有可选参数available，显示所有可下载的版本。

```bash
$ nvm list
```



<font color='cornflowerblue'>2、安装，命令中的版本号可自定义，具体参考命令1查询出来的列表</font>

**注意：**

默认下载的是国外资源node和npm一起下载，下载比较慢

```bash
$ nvm install 11.13.0
```

解决下载慢问题

```basic
$ nvm node_mirror https://npmmirror.com/mirrors/node/
$ nvm npm_mirror https://npmmirror.com/mirrors/npm/
```



如果安装某个制定版本失败

![image-20240717221551737](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202407172215921.png)

node.js[官网](https://nodejs.cn/download/current/)下载指定版本的zip包，解压缩后放到上图指定文件夹下

![image-20240717222000051](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202407172220164.png)

<font color='cornflowerblue'>3、使用特定版本</font>

```bash
$ nvm use 11.13.0
```



<font color='cornflowerblue'>4、卸载</font>

```bash
$ nvm uninstall 11.13.0
```



### **<font color='red'>5、切换淘宝镜像源</font>**

npm下载会很慢，因为npm默认从国外下载资源，建议修改npm镜像源地址

1. 运行`npm i nrm -g`全局安装nrm包

2. 使用`nrm ls`查看当前所有可用的镜像源地址以及当前所使用的镜像源地址（带*的是当前使用的源）

3. 使用`nrm use taobao`切换镜像源地址

   ![image-20260119012255276](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260119012255276.png)

### **<font color='red'>6、命令提示</font>**

1）显示node是运行在32位还是64位

```bash
$ nvm arch
```

<br>

2）显示已安装的列表

```bash
$ nvm list
```

<br>

3）查看可下载的版本

```bash
$ nvm list available 
```

<br>

4）设置node镜像。默认是[https://nodejs.org/dist/](https://links.jianshu.com/go?to=https%3A%2F%2Fnodejs.org%2Fdist%2F)

```bash
$ nvm node_mirror [url] 
```

<br>

5）设置npm镜像。默认是[https://github.com/npm/cli/archive/](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fnpm%2Fcli%2Farchive%2F)

```bash
$ nvm npm_mirror [url] 
```

<br>

6）设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理

```bash
$ nvm proxy [url] 
```

<br>

7）卸载指定版本node

```bash
$ nvm uninstall < version >
```

<br>

8）显示nvm版本

```bash
$ nvm v
```

### **<font color='red'>7、总结</font>**

本节列出node.js版本管理工具nvm的安装及使用，需要注意的是安装路径最好不要出现中文和空格。

<br>

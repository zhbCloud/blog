---
title: 通过picGo将图片上传至服务器
abbrlink: bf2c8021
date: 2025-02-23 23:36:56
img: /static/33.webp
categories: 工具
tags:
  - picGo
  - Typora
  - 服务器
---

### **<font color='red'>一、前言</font>**

之前用的都是用的Gitee作为自己创图，在自己的网站上也能访问，而且也方便。但最近最近发现Gitee仓库存的图片都挂了，而且个人用户的仓库大小也有限制。

免费图床总归是不靠谱的，所以选择一个付费的好一点，市面上常用的有阿里云 OSS、腾讯云 COS，使用过阿里云 OSS一段时间后个人总感觉有一定的条件限制，后续的存储容量、流量、请求数都要计费，因此想在自己的服务器上搭一个图床，方便管理和转移，同时也没有其他的限制。

<br>

### **<font color='red'>二. 服务器搭建图床</font>**

**<font color='cornflowerblue' size="">2.1、图方便，直接用宝塔在服务器上搭建的一个存储图片的站点</font>**
访问地址：https://picgo.shixna.imgs/xxxx.jpg
这里我已经解析了我的域名，并且已经申请了SSL证书，必须申请证书，因为假如不加上 HTTPS，在使用 HTTPS 的网站（绝大部分都是）上查看图片时，会无法加载。通过 F12 查看请求可以发现默认使用的是 HTTPS 去请求图片的。由于浏览器安全策略的关系，访问不安全（非 HTTPS）的网站需要手动授权允许才能访问。

![image-20230417012816207](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212781.png)

**<font color='cornflowerblue'>2.2、在站点根目录下创建一个存放图片的路径img/</font>**

路径地址：/www/wwwroot/picgo.shixna.cn/imgs/

<br>

### **<font color='red'>三. 配置picGo</font>**

**<font color='cornflowerblue'>3.1、在picGo下载插件 picgo-plugin-sftp-uploader</font>**

![image-20230417014544495](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212747.png)

<br>

**<font color='cornflowerblue'>3.2、SFTP 配置</font>**

![image-20230417014834137](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212664.png)

**SFTP 配置文件说明，在上面的路径下创建对应文件**

```js
{
    // 网站标识
	"ZHB": {
        // 图片网站的域名
		"url": "https://picgo.shixna.cn/",
		// 图片访问地址，即网站根目录下的imgs路径里面
		"path": "imgs/{fullName}",
		// 图片在服务器的真是路径
		"uploadPath": "/www/wwwroot/picgo.shixna.cn/imgs/{fullName}",
		// 服务器对应的ip地址
		"host": "124.xxx.xxx.xxx",
		"port": 22,
         // 服务器ssh的账号
		"username": "username",
		// 服务器ssh的密码
		"password": "password!"
	}
}
```

<br>

插件文档地址：https://github.com/imba97/picgo-plugin-sftp-uploader

![image-20230417015421875](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212740.png)

点击上传即可上传到自己的服务器了！！！！！！！！！！！！

<br>

### **<font color='red'>四. Typora搭配picGo上传</font>**

![image-20230417015541070](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212702.png)

这样在 Typora 插入图片时即可自动上传到服务器上

![image-20230418230804275](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212068.png)

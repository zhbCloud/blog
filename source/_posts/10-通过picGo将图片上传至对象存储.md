---
title: 通过picGo将图片上传至对象存储
abbrlink: 13764
date: 2025-02-27 23:47:38
img: /static/38.webp
categories: 工具
tags:
  - picGo
  - Typora
  - 对象存储
---

### **<font color='red'>一、阿里云对象存储</font>**

我们这里使用的是阿里对象存储，使用其他的例如腾讯，华为的对象存储都大同小异。购买好了对象存储就开始创建Bucket。

#### **<font color='#10c300'>1.1、创建Bucket</font>**

![image-20251102235129693](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251102235129693.png)

![image-20251102235635569](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251102235635569.png)

#### **<font color='#10c300'>1.2、创建Bucket下的文件路径</font>**

![image-20251102235759717](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251102235759717.png)

![image-20251102235829418](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251102235829418.png)

![image-20251103000040270](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251103000040270.png)



创建好的这个AccessKeyID和keySecret要保存好

![image-20251103000131730](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251103000131730.png)



### **<font color='red'>二、PicGo配置</font>**

![image-20251103000516589](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251103000516589.png)

### **<font color='red'>三、Typora搭配PicGo使用</font>**

![image-20230417015541070](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212702.png)

这样在 Typora 插入图片时即可自动上传到服务器上

![image-20230418230804275](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212068.png)

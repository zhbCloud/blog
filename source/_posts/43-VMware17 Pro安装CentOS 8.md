---
title: VMware17 Pro安装CentOS 8
abbrlink: f6649ba0
date: 2025-11-25 22:29:48
img: /static/40.webp
categories: 后端与运维
tags:
  - CentOS 8
  - 虚拟机
  - VMware17
---

**软件版本**

> VMware 17 Pro  17.5.2 build-23775571
>
> CentOS-8.1.1911-x86_64-dvd1.iso

### **<font color='red'>一、 创建虚拟机</font>**

![image-20251021234224316](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251021234224316.png)

![image-20251021234501665](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251021234501665.png)

![image-20251021234533907](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251021234533907.png)

![image-20251021234601087](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251021234601087.png)

![image-20251021234734894](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251021234734894.png)

![image-20251021234936363](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251021234936363.png)

![image-20251021235013900](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251021235013900.png)

<br>

### **<font color='red'>二、 配置虚拟机</font>**

![image-20251021235209438](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251021235209438.png)

![image-20251022000540363](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251022000540363.png)

![image-20251022000621830](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251022000621830.png)

#### **<font color='#10c300'>虚拟化处于禁用状态</font>**

AMD处理器提示AMD-V处于禁用状态。

Intel处理器提示ntel VT-x处于禁用状态。

因为我是AMD的处理器以及ROG的主板，因为这里主要操作怎么在ROG主板的BIOS上开启虚拟化技术

![image-20251022232519026](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251022232519026.png)

**开启步骤**

1. 电脑开启的时候一直按F2或Del进入BIOS界面
1. 找到Advanced进入CPU Configguration中找到SVM Mode将其状态改成Enabled

![image-20251022234218884](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251022234218884.png)

![image-20251022234544337](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251022234544337.png)

<br>

### **<font color='red'>三、 系统安装引导界面</font>**

![img](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/5e9856fd57ad3cd601de474ed0a9d59b.png)

![img](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/da83ad02a5d26c3f865a68503efcbe2c.png)

![img](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/71e0855efe957df4c85e67e7642a1538.png)

<br>

### **<font color='red'>四、 定制化内容</font>**

![image-20251022001114895](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251022001114895.png)

<br>

#### **<font color='#10c300'>4.1、调整时间差</font>**

![image-20251022003530905](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251022003530905.png)

![image-20251022003918721](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251022003918721.png)

<br>

#### **<font color='#10c300'>4.2、配置磁盘分区</font>**

![image-20251023215033391](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023215033391.png)

<br>

##### **<font color='cornflowerblue'>1）默认磁盘分区配置</font>**![image-20251022004121785](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251022004121785.png)

<br>

##### **<font color='cornflowerblue'>2）自定义磁盘分区</font>**

![image-20251023215120757](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023215120757.png)

<br>

**<font color='orange'>a、手动添加分区</font>**

![image-20251023220443302](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023220443302.png)

<br>

**<font color='orange'>b、添加 boot 区 给上 1G 容量后点击添加挂载点</font>**

挂载点`/boot`是系统启动的引导分区

![image-20251023220707214](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023220707214.png)

文件系统默认选择ext4，即第四代文件扩展系统，其容量可以达到EB（GB→TB→EB）单个文件容量可以达到16TB。

我们选择xfs文件系统，这是一个高性能日志文件系统，特别擅长处理大文件，64位系统中最大能够支持8EB的文件系统，目前性能最强。

![image-20251023224710364](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023224710364.png)

<br>

**<font color='orange'>c、添加 swap 交换分区</font>**

swap交换分区：

​	在硬盘中单独创建一块分区来，单独去作为扩展内存。就是我们在配置虚拟机的时候设置的那个内存不足时，则可以将swap交换分区作为裸战内存来使用（我们当时是分了8G内存）。

执行的一个过程：



![image-20251023221045499](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023221045499.png)

![image-20251023221112598](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023221112598.png)

<br>

**<font color='orange'>d、配置根目录`/`</font>**

![image-20251023221245884](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023221245884.png)

![image-20251023221339058](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023221339058.png)

<br>

**<font color='orange'>e、分区配置完毕，点击完成，然后点击弹窗的接受更改</font>**

![image-20251023221441203](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023221441203.png)

<br>

#### **<font color='#10c300'>4.3、配置kdump</font>**

关闭 kdump 本身虚拟机内存就不够，他会吃掉一部分内存，我们尽量省一点

![image-20251023222056185](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023222056185.png)

![image-20251023221802804](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023221802804.png)

<br>

#### **<font color='#10c300'>4.4、配置网络和主机名</font>**

![image-20251023222257482](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023222257482.png)

![image-20251023222457521](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251023222457521.png)

<br>

#### **<font color='#10c300'>4.5、开始安装</font>**

##### **<font color='cornflowerblue'>1）设置Root用户密码</font>**

默认有个root用户，也就是超级管理员

![image-20251025162343490](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025162343490.png)

![image-20251025162349989](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025162349989.png)

<br>

##### **<font color='cornflowerblue'>2）创建用户</font>**

新创建了一个zhb用户

![image-20251025162417872](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025162417872.png)

等待安装

<br>

#### **<font color='#10c300'>4.6、虚拟机的使用引导界面</font>**

重启进入引导界面

![image-20251025163325360](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025163325360.png)

![image-20251025163408100](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025163408100.png)

![image-20251025163426606](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025163426606.png)

![image-20251025163508011](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025163508011.png)

![image-20251025163545397](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025163545397.png)

![image-20251025163555338](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025163555338.png)

![image-20251025163609171](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025163609171.png)

![image-20251025163627645](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025163627645.png)

安装完成

<br>

### **<font color='red'>五、 切换 root 用户</font>**

当前登录的用户是刚刚创建的用户，权限会缺少，所以使用 root，修改一些内容更加方便

![image-20251025165233836](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025165233836.png)![image-20251025165459175](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025165459175.png)

![image-20251025165518127](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025165518127.png)

![image-20251025165706320](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251025165706320.png)

<br>

### **<font color='red'>六、 网络配置</font>**

linux系统下，查看网络配置IP地址

```shell
ifconfig
```

windows系统下，查看网络配置IP地址

```shell
ipconfig
```

测试你的计算机与目标主机（可以是域名或IP地址）之间的连通性

```shell
ping + ip地址
```

<br>

**<font color='orange'>VMware提供了三种网络连接模式：</font>**

1. 桥接模式：虚拟机直接连接外部物理网络的模式，主机起到了网桥的作用。在这种模式下，虚拟机可以直接访问外部网络，并且对外部网络是可见的
2. NAT模式：虚拟机和主机构建一个专用网络，并通过虚拟网络地址转换（NAT）设备对IP进行转换。虚拟机通过共享主机IP可以访问外部网络，但外部网络无法访问虚拟机。
3. 仅主机模式：虚拟机只与主机共享一个专用网络，与外部网络无法通信



**<font color='orange'>获取到虚拟机的ip</font>**

![image-20251201225649883](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251201225649883.png)

<br>

#### **<font color='#10c300'>6.1、虚拟机修改静态ip</font>**

##### **<font color='cornflowerblue'>1）为什么要修改静态ip</font>**

因为虚拟默认是动态ip的，每次重新都会更新ip的，因此需要修改成静态ip方便网络管理，比如你要通过SSH、远程桌面等方式连接虚拟机，固定IP更容易记忆和配置。

<br>

##### **<font color='cornflowerblue'>2）修改静态ip</font>**

Linux的所有配置文件放在 /etc 目录下

![image-20251201225950902](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251201225950902.png)

![image-20251201230744458](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251201230744458.png)

<br>

修改为BOOTPROTO="static"
在底部添加

```
#IP地址
IPADDR=192.168.244.100
#网关
GATEWAY=192.168.244.2
#域名解析器
DNS1=192.168.244.2
```

![image-20251201232035172](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251201232035172.png)

**最后需要重启网络**，注意：conterOS7和8的命令不一样注意区分，我这里是直接重启虚拟机

<br>

**这里的ip地址要和虚拟网络的VMnet8的子网IP的网段保持一致（就是前三位保持一致，后一位可自行命名）**

![image-20251201231010889](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251201231010889.png)

<br>

**网关和域名解析器则和VMnet8的NAT设置中的网关IP保持一致**

![image-20251201231230608](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251201231230608.png)

<br>

#### **<font color='#10c300'>6.2、修改主机名</font>**

```shell
hostname  # 查看主机名
```

![image-20251201234837992](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251201234837992.png)

<br>

```shell
vim /etc/hostname  # 修改hostname的配置，此方式需要重启才会生效
```

```shell
hostnamectl set-hostname hadop100  # 此方式不需要重启，就可以生效 修改主机名为hadop100
```

![image-20251201235132862](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251201235132862.png)

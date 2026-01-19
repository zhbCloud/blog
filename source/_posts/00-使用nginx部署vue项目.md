---
title: 使用nginx部署vue项目
abbrlink: 11a62a27
date: 2025-02-17 23:03:54
img: /static/41.webp
categories: 后端与运维
tags:
  - vu2
  - 部署
---

使用Vue做前后端分离项目时，通常前端是单独部署，用户访问的也是前端项目地址，因此前端开发人员很有必要熟悉一下项目部署的流程与各类问题的解决办法了。

本文介绍一下使用nginx服务器代理前端项目的方法以及项目部署的相关问题

<br>

<br>



### **<font color='red'>一、准备工作——服务器和nginx使用</font>**

#### **<font color='#10c300'>1. 准备一台服务器</font>**

**服务器：**腾讯云服务器

**操作系统：**CentOS / 7.6 

![image-20230417003452498](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208565.png)

<br>



#### **<font color='#10c300'>2.宝塔可视化面板配置服务</font>**

相对于后端，前端对于linux操作还是比较陌生的，使用宝塔可视化面板使操作更加简单。(怎么简单怎么来)

**宝塔：**https://www.bt.cn/

**1)、选择宝塔linux面板**

![image-20230417003459066](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140208340.png)

<br>

**2)、linux面板向下滚动至在线一键快速安装宝塔**

![image-20230417003504811](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209677.png)

![image-20230417003508981](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209501.png)

![image-20230417003512965](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209297.png)

<br>

**3)、安装成功**

![image-20230417003517191](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209866.png)

<br>

**4)、添加站点**

![image-20230417003522031](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209494.png)

<br>

<br>



### **<font color='red'>二、hash模式部署发布（同域名部署多环境项目）</font>**

#### **<font color='#10c300'>1、 打包文件同步到服务器</font>**

##### **<font color='cornflowerblue'>1）配置</font>**

我们使用nginx部署Vue项目，实质上就是将Vue项目打包后的内容同步到nginx指向的文件夹。之前的步骤介绍了添加站点nginx指向我们创建的文件夹，剩下的问题就是怎么把打包好的文件同步到服务器上指定的文件夹里，比如同步到之前步骤中创建的/www/wwwroot/test.shixna.cn。

同步文件可以在git-bash或者powershell使用scp指令，如果是linux环境开发，还可以使用rsync指令:

```nginx
wondow环境： scp -r dist/* root@124.222.74.47:/www/wwwroot/test.shixna.cn

理解：dist/*提取dist下面的所有文件到 服务器124.222.74.47:/www/wwwroot/test.shixna.cn文件中
如果想要将dist提取到服务器中则不要dist后面的'/*'
```

```nginx
linux环境： rsync -avr --delete-after dist/*root@124.222.74.47:/www/wwwroot/test.shixna.cn
```

注意这里以及后续步骤是root使用用户远程同步，应该根据你的具体情况替换root和ip(ip换为你自己的服务器IP)。

**为了方便，可以在package.json脚本中加一个push命令，以使用npm为例**

```
"scripts": {
  "build": "vue-cli-service build --mode pro",
  "push": "npm run build && scp -r dist/*root@124.222.74.47:/www/wwwroot/test.shixna.cn",
},
```

这样就可以直接执行yarn push 或者npm run push直接发布了。不过还有一个小问题，就是命令执行的时候要求输入远程服务器的root密码（这里使用root来连接远程的，你可以用别的用户，毕竟root用户权限太高了）。

为了避免每次执行都要输入root密码，我们可以将本机的ssh同步到远程服务器的**authorized_keys**文件中。

<br>

##### **<font color='cornflowerblue'>2）同步ssh key</font>**

a、生成ssh key：使用git bash或者powershell执行ssh-keygen可以生成ssh key。会询问生成的key存放地址，直接回车就行，如果已经存在，则会询问是否覆盖：

```
ssh-keygen
```

![image-20230417003529630](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209808.png)

生成一个密钥对

![image-20230417003533860](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209360.png)

b、同步ssh key到远程服务器，使用ssh-copy-id指令同步

```
ssh-copy-id -i ~/.ssh/id_rsa.pub root@124.221.188.118
```

![image-20230417003537640](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209563.png)输入密码后，之后再次同步就不需要输入密码了。其实ssh_key是同步到了服务器（此处是root用户目录)~/.ssh/authorized_keys文件里

**注意：输入以上命令可能会报错**

![image-20230417003542343](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209026.png)

这里可以手动复制本地C:\Users\ZHB\.ssh（注意是pub结尾的公钥）文件内容追加到服务器root/.ssh/authorized_keys里面去（从命名可以看出该文件可以存储多个ssh key）

**本地id_rsa.pub**

![image-20230417003546473](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209979.png)

<br>

**服务器authorized_keys**

![image-20230417003550209](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209894.png)



注意：这里全程使用的是root用户，所以没有文件操作权限问题。如果你的文件夹创建用户不是远程登录用户，或许会存在同步文件失败的问题，此时需要远程服务器修改文件夹的读写权限



创建了一个测试项目试一下，打包、文件上传一句指令搞定啦：

![image-20230417003553802](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209185.png)

访问一下，果然看到了我们熟悉的界面：

![image-20230417003824128](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209139.png)

<br>



#### **<font color='#10c300'>2、部署多环境项目（sit环境和prod环境）</font>**

在同一域名下部署sit环境和prod环境的代码。

在新建站点下设置

![image-20230417003907663](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209638.png)

##### <font color="#0ee3e5" size="3">1）根目录 </font>

`在域名根目录下部署prod环境的代码：http://mi.shixna.cn/#/index`

vue项目中base:'/' 和 publicPath:'/' 保持默认值

配置nginx

![image-20230417003913846](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209339.png)

<br>

##### **<font color='cornflowerblue'>2）子目录</font>**

`在域名二级目录下部署sit环境代码：http://mi.shixna.cn/sit/#/index`

vue项目中base:'/sit/' 和 publicPath:'/sit/'  尽可能两者保持一致

**配置nginx**

这里的alisa和root的区别以及location ^~ 见内容四

![image-20230417003918308](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209273.png)



<br>

<br>



### **<font color='red'>三、history模式部署发布（同域名部署多环境项目）</font>**

默认情况下，Vue项目使用的是hash路由模式，就是URL中会包含一个#号的这种形式。#号以及之后的内容是路由地址的hash部分。

正常情况下，当浏览器地址栏地址改变，浏览器会重新加载页面，而如果是hash部分修改的话，则不会，这就是前端路由的原理，允许根据不同的路由页面局部更新而不刷新整个页面。

H5新增了history的pushState接口，也允许前端操作改变路由地址但是不触发页面刷新，history模式即利用这一接口来实现。因此使用history模式可以去掉路由中的#号。

<br>

#### **<font color='#10c300'>1、项目配置</font>**

在vue-router路由选项中配置mode选项和base选项，mode配置为'history'；如果部署到非域名根目录，还需要配置base选项为前文配置的publicPath值（注意：此情况下，publicPath必须使用绝对路径/test/的配置形式，而不能用相对路径./）

vue项目中mode:history，base:'/sit/' 和 publicPath:'/sit/'  尽可能两者保持一致

![image-20230417003923869](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209772.png)

<br>

![image-20230417003927682](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209112.png)

<br>

#### **<font color='#10c300'>2、配置nginx</font>**

![image-20230417003932707](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209226.png)

```nginx
 try_files $uri $uri/ /sit/index.html;
```

这句配置的意思就是，拿到一个地址，先根据地址尝试找对应文件，找不到再试探地址对应的文件夹，再找不到就返回/sit/index.html。

<br>

![image-20230417003940428](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140209110.png)

<br>

<br>



### **<font color='red'>四、nginx知识</font>**

#### **<font color='#10c300'>1、nginx配置文件中root和alias</font>**

```nginx
location /img/ {
    alias /var/www/image/;
}
```

若按照上述配置的话，则访问/img/目录里面的文件时，ningx会自动去/var/www/image/目录找文件



```nginx
location /img/ {
    root /var/www/image;
}
```

若按照这种配置的话，则访问/img/目录下的文件时，nginx会去/var/www/image/img/目录下找文件

<br>

alias是一个目录别名的定义，root则是最上层目录的定义。

还有一个重要的区别是alias后面必须要用“/”结束，否则会找不到文件的。。。而root则可有可无~~

<br>

#### **<font color='#10c300'>2、nginx location配置</font>**

```nginx
Nginx的HTTP配置主要包括三个区块，结构如下：
http { //这个是协议级别
　　include mime.types;
　　default_type application/octet-stream;
　　keepalive_timeout 65;
　　gzip on;
　　　　server { //这个是服务器级别
　　　　　　listen 80;
　　　　　　server_name localhost;
　　　　　　　　location / { //这个是请求级别
　　　　　　　　　　root html;
　　　　　　　　　　index index.html index.htm;
　　　　　　　　}
　　　　　　}
}
```

##### **<font color='cornflowerblue'>locatin区段</font>**

通过指定模式来与客户端请求的URI相匹配，基本语法如下：**location [=|~|~\*|^~|@] pattern{……}**

**1、没有修饰符 表示：必须以指定模式开始，如：**

```nginx
server {
　　server_name baidu.com;
　　location /abc {
　　　　……
　　}
}

那么，如下是对的：
http://baidu.com/abc
http://baidu.com/abc?p1
http://baidu.com/abc/
http://baidu.com/abcde
```



**2、=表示：必须与指定的模式精确匹配**

```nginx
server {
server_name sish
　　location = /abc {
　　　　……
　　}
}
那么，如下是对的：
http://baidu.com/abc
http://baidu.com/abc?p1
如下是错的：
http://baidu.com/abc/
http://baidu.com/abcde
```

 

**3、~ 表示：指定的正则表达式要区分大小写**

```nginx
server {
server_name baidu.com;
　　location ~ ^/abc$ {
　　　　……
　　}
}
那么，如下是对的：
http://baidu.com/abc
http://baidu.com/abc?p1=11&p2=22
如下是错的：
http://baidu.com/ABC
http://baidu.com/abc/
http://baidu.com/abcde
```

 

**4、~* 表示：指定的正则表达式不区分大小写**

```nginx
server {
server_name baidu.com;
location ~* ^/abc$ {
　　　　……
　　}
}
那么，如下是对的：
http://baidu.com/abc
http://baidu..com/ABC
http://baidu..com/abc?p1=11&p2=22
如下是错的：
http://baidu..com/abc/
http://baidu..com/abcde
```

 

**5、^~ 类似于无修饰符的行为，也是以指定模式开始，不同的是，如果模式匹配，**
那么就停止搜索其他模式了。

**6、@ ：定义命名location区段，这些区段客户段不能访问，只可以由内部产生的请**
求来访问，如try_files或error_page等

**查找顺序和优先级
1：带有“=“的精确匹配优先
2：没有修饰符的精确匹配
3：正则表达式按照他们在配置文件中定义的顺序
4：带有“^~”修饰符的，开头匹配
5：带有“~” 或“~\*” 修饰符的，如果正则表达式与URI匹配
6：没有修饰符的，如果指定字符串与URI开头匹配**

```nginx
Location区段匹配示例location = / {
　　# 只匹配 / 的查询.
　　[ configuration A ]
}
location / {
　　# 匹配任何以 / 开始的查询，但是正则表达式与一些较长的字符串将被首先匹配。
　　[ configuration B ]
}
location ^~ /images/ {
　　# 匹配任何以 /images/ 开始的查询并且停止搜索，不检查正则表达式。
　　[ configuration C ]
}
location ~* \.(gif|jpg|jpeg)$ {
　　# 匹配任何以gif, jpg, or jpeg结尾的文件，但是所有 /images/ 目录的请求将在Configuration C中处
　　理。
　　[ configuration D ]
} 各
请求的处理如下例：
■/ → configuration A
■/documents/document.html → configuration B
■/images/1.gif → configuration C
■/documents/1.jpg → configuration D
```

 
---
title: Hexo搭建个人博客
abbrlink: ec7d7221
date: 2025-11-25 21:57:23
img: /static/39.webp
categories: 其他
tags:
  - hexo
---

<div align="center">
    <img src="https://img.shields.io/badge/hexo-8.1.0-d1a8.svg"/>
    <img src="https://img.shields.io/badge/hexoCli-4.3.2-green.svg"/>
    <img src="https://img.shields.io/badge/Node-=22.21.0-ffbc39.svg"/>
    <br>
    <br>
    <img src="https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202409131343278.png"/>
</div>

<br>

### **<font color='red'>一、前置条件</font>**

#### **<font color='#10c300'>1.1、要求✏️</font>**

安装 Hexo 相当简单，只需要先安装下列应用程序即可：

- [Node.js](http://nodejs.org/) (Node.js 版本需不低于 10.13，建议使用 Node.js 12.0 及以上版本，本次使用的是18.18.0版本)
- [Git](http://git-scm.com/)

如果您的电脑中已经安装上述必备程序，那么恭喜您！ 你可以直接前往 [安装 Hexo](https://hexo.io/zh-cn/docs/#安装-Hexo) 步骤。

#### **<font color='#10c300'>1.2、安装 Hexo</font>**

在电脑上全局安装Hexo

```bash
$ npm install -g hexo-cli
```

<br>

### **<font color='red'>二、创建博客</font>**

安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建博客项目文件

```bash
$ hexo init <folder>
```

![image-20251030145443715](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251030145443715.png)

```bash
$ npm install
$ hexo server
```

![image-20251027230420614](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251027230420967.png)

#### **<font color='#10c300'>2.1、目录结构</font>**

初始化后，您的项目文件夹将如下所示：

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   └── _posts
└── themes
```

#### **<font color='#10c300'>2.1、_config.yml</font>**

网站的 [配置](https://hexo.io/zh-cn/docs/configuration) 文件。 您可以在此配置大部分的参数。

<br>

### **<font color='red'>三、主题</font>**

[Hexo Themes列表](https://github.com/shenliyang/hexo-theme-snippet)

我们这次使用后是[Asnippet](https://github.com/shenliyang/hexo-theme-snippet)主题

![image-20251027230809516](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251027230809516.png)

#### **<font color='#10c300'>3.1、下载主题</font>**

有两种方式获取本主题--下载 `*.zip` 文件和通过 `git`方式：

1. 下载 [Snippet 主题](https://github.com/shenliyang/hexo-theme-snippet) 文件解压后放在 `themes` 目录下，和博客中的 landscape 为同级目录
2. Git 方式，在 Hexo 根目录执行：

```bash
$ git clone git://github.com/shenliyang/hexo-theme-snippet.git themes/hexo-theme-snippet
```

<br>

#### **<font color='#10c300'>3.2、切换主题</font>**

在根目录的`_config.yml`文件中，找到 `theme: landscape`，将landscape替换成新的主题名

```yaml
theme: hexo-theme-snippet
```

<br>

#### **<font color='#10c300'>3.3、安装主题插件</font>**

1️⃣因为 **hexo-theme-snippet** 使用了 `ejs` 模版引擎 、 `Less` CSS 预编译语言以及在官方插件的基础上 进行功能的开发，以下为必装插件：

```bash
$ pnpm i hexo-renderer-ejs hexo-renderer-less hexo-deployer-git -S
```

2️⃣启用站内本地搜索功能

如果要使用本地站点搜索，必须安装插件 hexo-generator-json-content 来创建本地搜索 json 文件

```bash
$ pnpm i hexo-generator-json-content@2.2.0 -S
```

然后修改主题配置_config.yml 文件下`jsonContent`相关参数。

<br>

#### **<font color='#10c300'>3.4、部署主题</font>**

##### **<font color='cornflowerblue'>1）未修改过主题源文件</font>**

1️⃣  清空 hexo 静态文件和缓存，并重新生成

```bash
$ hexo clean && hexo g  //清空缓存并生成静态文件
```

2️⃣ 本地预览，确没有问题再进行发布

```bash
$ hexo s -p 4000 或者 hexo s  //启动本地服务默认
```

3️⃣ 当 gulp 执行完成，并提示 `please execute： hexo d` 时，可以进行发布

```bash
$ hexo d 或者 gulp deploy  //部署发布
```

<br>

##### **<font color='cornflowerblue'>2）修改过主题源文件</font>**

1️⃣ 拷贝主题目录下`package.json`文件到 Hexo 根目录下，然后安装项目的开发依赖。

如下是拷贝过来的，并删除了多余的代码。

```json
{
  "name": "blog",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "deploy": "hexo deploy",
    "dev": "hexo s",
    "gulp": "gulp --gulpfile gulpfile.js",
  },
  "hexo": {
    "version": "7.3.0"
  },
  "dependencies": {
    "ejs": "^3.1.10",
    "hexo": "^7.3.0",
    "hexo-abbrlink": "^2.2.1",
    "hexo-deployer-git": "^4.0.0",
    "hexo-generator-archive": "^2.0.0",
    "hexo-generator-category": "^2.0.0",
    "hexo-generator-feed": "^3.0.0",
    "hexo-generator-index": "^4.0.0",
    "hexo-generator-json-content": "^4.2.3",
    "hexo-generator-sitemap": "^3.0.1",
    "hexo-generator-tag": "^2.0.0",
    "hexo-renderer-ejs": "^2.0.0",
    "hexo-renderer-marked": "^7.0.1",
    "hexo-server": "^3.0.0"
  },
  "devDependencies": {
    "gulp": "^5.0.1",
    "gulp-autoprefixer": "^9.0.0",
    "gulp-clean-css": "^4.3.0",
    "gulp-htmlclean": "^2.7.22",
    "gulp-htmlmin": "^5.0.1",
    "gulp-jshint": "^2.1.0",
    "gulp-less": "^5.0.0",
    "gulp-notify": "^5.0.0",
    "gulp-path": "^4.0.0",
    "gulp-plumber": "^1.2.1",
    "gulp-rename": "^2.0.0",
    "gulp-rev-append": "^0.1.8",
    "gulp-sequence": "^1.0.0",
    "gulp-uglify": "^3.0.2",
    "gulp-watch": "^5.0.1",
    "jshint": "^2.13.6",
    "jshint-stylish": "^2.2.1",
    "notify-send": "^0.1.2"
  }
}
```

2️⃣ 在 Hexo 根目录下创建一个名为 gulpfile.js 的文件并引入主题中的gulpfile.mjs：	

```js
import * as gulpTasks from './themes/hexo-theme-snippet/gulpfile.mjs';

export default gulpTasks.default;
export const { build, dev, watchFiles, compileLess } = gulpTasks;
```

3️⃣ 编译less→css

在 Hexo 根目录下package.json添加并执行

```
 "scripts": {
    "compile-less": "gulp --gulpfile themes/hexo-theme-snippet/gulpfile.mjs compileLess"
  },
```

```bash
$ pnpm run compile-less
```

4️⃣  清空 hexo 静态文件和缓存，并重新生成

```bash
$ hexo clean && hexo g  //清空缓存并生成静态文件
```

5️⃣ 运行 gulp：

```bash
$ pnpm run gulp
```

- pnpm run gulp 执行的是gulpfile.js中的默认任务，该任务引用自主题目录中的gulpfile.mjs
- gulp默认执行的build任务主要功能是优化已存在的public目录中的文件，包括：

  - 压缩CSS并添加前缀
  - 压缩JS
  - 添加版本号到HTML文件
  - 压缩HTML文件
- 但是，gulp任务是在 ./public 目录下工作的，它 不会 自动生成public目录
- 在Hexo博客框架中，public目录是由 hexo g (hexo generate)命令生成的，该命令会将source目录中的Markdown文件等转换为静态HTML文件

**🔚结论 ：**要完成完整的打包流程，你需要先执行 hexo g 来生成public目录，然后再执行 pnpm run gulp 来优化public目录中的文件

6️⃣ 本地预览，确没有问题再进行发布

```bash
$ hexo s -p 4000 或者 hexo s  //启动本地服务默认
```

7️⃣ 当 gulp 执行完成，并提示 `please execute： hexo d` 时，可以进行发布

```bash
$ hexo d 或者 gulp deploy  //部署发布
```

<br>

##### **<font color='cornflowerblue'>3）拓展优化💡</font>**

1️⃣ 本地开发启动一个开发服务器，监听主题中的Less和JS文件变化，当文件发生变化时自动进行编译或校验，提高开发效率。

在 Hexo 根目录下package.json添加并执行

```json
"scripts": {
    "gulp:dev": "gulp --gulpfile themes/hexo-theme-snippet/gulpfile.mjs watchFiles",
},
```

```bash
$ pnpm run "gulp:dev"
```

开发者在修改样式或脚本文件后无需手动执行编译命令，系统会自动检测并处理文件变化

2️⃣优化指令

<br>

#### **<font color='#10c300'>3.5、更新主题</font>**

❌不建议更新，如果自己更改过主题源文件，更新主题会把自己改动的全部替换掉

主题可能会不定时优化和更新，更新主题代码：

```bash
$ cd themes/hexo-theme-snippet
$ git pull
```

<br>

#### **<font color='#10c300'>3.6、主题配置</font>**

```yaml

## menu -- 导航菜单显示{[@page:名字,@url:地址,@icon:图标]}
menu:
  - page: home
    url: /
    icon: fa-home

## favicon -- 网站图标位置{@favicon}
favicon: /favicon.ico

## rss --rss文件位置{@rss}
rss: /atom.xml


# 各个小工具的设置

## widgets -- 6个左边小工具{@widgets:[notification,category,archive,tagcloud,friends]}
widgets:
  - search
  - notification
  - social
  - category
  - archive
  - tagcloud
  - friends

# 各个小工具的设置

## 搜索
jsonContent:
  searchLocal: true // 是否启用本地搜索
  searchGoogle: true //是否启用谷歌搜索
  posts:
    title: true
    text: true
    content: true
    categories: false
    tags: false

## notification config --网站公告设置,支持 html 和 纯文本
notification: |-
            <p>主题已经上线！欢迎下载或更新~ <br/>
            主题下载：<a href="https://github.com/shenliyang/hexo-theme-snippet" title="fork me" target="_blank">Snippet主题</a> <br/>
            <hr/>接受贡献，包括不限于提交问题与需求，修复代码。欢迎Pull Request<br/>支持主题：<a href="https://github.com/shenliyang/hexo-theme-snippet/stargazers">Star一下</a></p>

## 社交设置{@name:社交工具名字，@icon:社交工具图标，@href:设置工具链接} [参考图标](http://fontawesome.io/icons/)
social:
  - name: Github
    icon: git
    href: //github.com/shenliyang

## 文章分类设置{@cate_config:{@show_count:是否显示数字，@show_current: 是否高亮当前category}}
cate_config:
   show_count: true
   show_current: true

## 文章归档设置{@arch_config:/*参数参考：https://hexo.io/zh-cn/docs/helpers.html#list-archives*/}
## 推荐组合方式：[{type: 'monthly',format: 'YYYY年MM月'},{type: 'yearly',format: 'YYYY年'}]
arch_config:
   type: 'monthly'
   format: 'YYYY年MM月'
   show_count: true
   order: -1

## 标签云设置{/*参数参考：http://www.goat1000.com/tagcanvas-options.php */}
tagcloud:
  tag3d: false // 是否启用3D标签云
  textColour: '#444' // 字体颜色
  outlineMethod: 'block' // 选中模式(outline|classic|block|colour|size|none)
  outlineColour: '#FFDAB9' // 选中模式的颜色
  interval: 30 // 动画帧之间的时间间隔，值越大，转动幅度越大
  freezeActive: true // 选中的标签是否继续滚动
  frontSelect: true // 不选标签云后部的标签
  reverse: true // 是否反向触发
  wheelZoom: false // 是否启用鼠标滚轮

## 友链设置{@链接名称：链接地址{@links:[,,,]}}
links:
  - Hexo官网: https://hexo.io/zh-cn/


# 主题自定义个性化配置

## 网站宣传语{@branding：网站宣传语(不设置显示本地图片)}
branding: 从未如此简单有趣

## 设置banner背景图片{@img:自定义图片地址(支持绝对和相对路径),主题默认{"静态背景":"banner.jpg"},{"动态背景":"banner2.jpg"},{"动态星空背景":"banner3.jpg"}}
## 例如：https://hexo-theme-snippet-1251680922.cos.ap-beijing.myqcloud.com/img/banner|2|3.jpg, 或者 './img/banner-img.jpg'(相对本地资源地址)
banner:
  img: https://hexo-theme-snippet-1251680922.cos.ap-beijing.myqcloud.com/img/banner.jpg


## 设置carousel{@img:图片地址,@url:点击跳转链接(默认值:"javascript:")}
carousel:
  img: 'img/head-img.jpg'
  url: 'javascript:'

## 首页列表底部面板{@homePanel: 是否开启}
homePanel: true

## 首页文章列表缩略图
### 加载规则: 自定义文章缩略图(在Front-matter中添加的'img'字段) > 文章内的图片 > defaultImgs(随机获取) > 无图模式列表

## 自定义随机图片
defaultImgs:
  - http://www.example.jpg //远程图片链接示例
  - /img/default-1.jpg //本地图片链接示例

### 文章摘要{@摘要显示优先级：自定义摘要 > 自动截取摘要 }
### 自定义摘要范围{@<!--more-->:截取more之前的内容为摘要}
### 自动截取摘要{@excerptLength:自动截取文章前多少个字为摘要，不配置默认：120字}
excerptLength: 120

## 是否开启文章目录
toc: true

## 代码高亮配置{@highlightTheme: 主题名称,(配置暂时不可用，后续开发中…)}

highlightTheme: default //TODO

## 文章过期提醒功能 {@warning:{days:临界天数(默认300天,设置0关闭功能),text:提醒文字/*%d为过期总天数占位符*/}}
warning:
  days: 300
  text: '本文于%d天之前发表，文中内容可能已经过时。'

## 文章内声明{@declaration: {enable:是否开启,title:声明标题,tip:提示内容}}
declaration:
  enable: true
  title: '转载声明'
  tip: |-
      商业转载请联系作者获得授权,非商业转载请注明出处 © <a href="" target="_blank">Snippet</a>

## 文章打赏{@reward: {alipay:支付宝打赏,wepay:微信打赏,tip:打赏提示语; 链接都为空,关闭打赏功能}}
reward:
  alipay: ''
  wepay: '../img/reward-wepay.jpg'
  tip: 赞赏是不耍流氓的鼓励


## 主题评论

## utterances评论: 一款基于 GitHub issues 的评论工具; 首先在 github 上进行安装 utterances，访问 [utterances应用程序](https://github.com/apps/utterances)；然后在主题内配置 [utterances更多配置](https://utteranc.es/)
utterances:
  enable: true
  repo: shenliyang/snippet-comment // github仓库名字, 格式为 user-name/repo-name
  issueTerm: pathname // 标识issue类型 1. pathname(推荐); 2. url; 3.title; 3. og:title; 4. issue-number 5. specific-term;
  issueNumber: 123 // 非必填，当配置 issueTerm = "issue-number"时，需要配置issue号
  theme: github-light // 主题配置 1. github-light(推荐); 2. github-dark; 3. preferred-color-scheme; 4. github-dark-orange; 5. icy-dark; 6. dark-blue; 7. photon-dark; 8. boxy-light
  label: // 非必填
  cdn: // 使用自定义utteranc脚本加载。 非必填，默认："https://utteranc.es/client.js"

### gitment
gitment:
  enable: false
  owner:
  repo:
  client_id:
  client_secret:
  labels:
  perPage:
  maxCommentHeight:

### 来必力
livere:
  enable: false
  livere_uid:

### 友言评论(服务不稳定，经常无法加载)
uyan:
  enable: false
  uyan_id:

### Disqus评论(需要翻墙，或者搭建代理)
disqus:
  enable: false
  shortname: snippet
  count: false

### 畅言评论(需要ICP备案)
changyan:
  enable: false
  appid:
  conf:

### Valine评论(leancloud需要实名认证) 参考网站: [valine评论](https://valine.js.org/)
valine:
  enable: false
  appId:
  appKey:
  placeholder: 说点什么吧
  notify: false // 邮件通知
  verify: false // 验证码
  avatar: mm // avatar头像
  meta: nick,mail // 输入框内容，可选值nick,mail,link
  pageSize: 10

## Gitalk评论 参考网站: [一个基于Github Issue和Preact开发的评论插件](https://gitalk.github.io/)
gitalk:
   enable: false
   clientID: "" // Github 应用ID
   clientSecret: "" // Github 应用密钥
   repo: shenliyang.github.io // Github仓库地址
   owner: shenliyang  // Github 用户名(Github仓库拥有者)
   admin: shenliyang // GitHub repository 的所有者和合作者 (对这个 repository 有写权限的用户)可以有一个或多个，如果有多名可使用，例如：admin: admin1,admin2 配置
   perPage: 10 // 每次加载的数据大小，最多100
   distractionFreeMode: true // 是否启用无干扰模式，类似Facebook评论框的全屏遮罩效果

   // 以下参数主题会默认处理，不需要配置
   language // 语言类型，默认为站点配置中选项
   id // 页面的唯一标识, 已使用md5对pathname转换生成唯一id处理

## 网站访客统计 [不蒜子统计](http://busuanzi.ibruce.info/)
visit_counter:
   site: true // 总访问量和访问人数统计
   page: true // 文章阅读量统计

## 网站访问统计

### 网盟CNZZ统计 参考网站: [网盟CNZZ](http://www.umeng.com/)
cnzz_anaylytics:

### 百度统计 参考网站: [百度统计](https://tongji.baidu.com/)
baidu_anaylytics:

### 谷歌统计 参考网站：[谷歌统计](https://www.google-analytics.com/)
google_anaylytics:

### 腾讯分析 参考网站：[腾讯分析](http://ta.qq.com/)
tencent_analytics:

### 百度站点认证
baidu-site-verification:

### 百度自动推送(@baidu_push: 是否启用百度自动推送)  参考网站: [百度站长资源](https://ziyuan.baidu.com/college/courseinfo?id=267&page=2#h2_article_title18)
baidu_push:

## ICON配置 (不配则启用本地Font Icon)
fontAwesome: //cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css

## 网站主题配置
since: 2017  //建站时间
beian: '京ICP备04000001号' //网站备案号
robot: 'all'  //控制搜索引擎的抓取和索引编制行为，默认为all
version: 1.3.0  //当前主题版本号
```

<br>

#### **<font color='#10c300'>3.7、主题使用技巧及功能扩展</font>**

修改新增文章 Front-matter 模板,修改`scaffolds`目录下的`post.md`模板

```yaml
  ---
  title: {{ title }} // 标题
  date: {{ date }}   // 时间
  categories: ['分类1','分类2'] // 分类
  tags: ['标签1','标签2']       // 标签
  comments: false    // 是否开启评论
  img:               // 自定义缩略图
  ---
```

<br>

### **<font color='red'>四、自定义路由(导航)</font>**

以我们这次[Asnippet](https://github.com/shenliyang/hexo-theme-snippet)主题为例

[前置元数据详解](#aa)(前置知识，必先：ctrl+左键点击查看)

#### **<font color='#10c300'>4.1、配置文件中添加导航项</font>**

- 主题配置文件中编辑 themes/hexo-theme-snippet/_config.yml
- 在 menu 部分添加新的菜单项（分类/关于），格式如下：

![image-20251028185224676](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251028185224676.png)

#### **<font color='#10c300'>4.2、创建页面内容</font>**

**<font color='orange'>1）创建的页面就是以.md文件内容为展示的路由页面</font>**

- 在Hexo项目的根目录的source目录下创建对应的文件夹和文件

  例如，要创建 `/about/`路由，需要在 source 目录下创建 `source\about\index.md`文件

- 在 index.md 中添加页面内容和前置元数据

  ```yaml
  ---
  title: 关于我
  date: 2025-10-28 16:03:32
  ---
  ```

  ![image-20251029000623224](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251029000623224.png)

**<font color='orange'>2）创建自定义页面模板</font>**

- 如果需要自定义页面模板，可以在`themes\hexo-theme-snippet\layout\`目录下创建新的`.ejs` 文件（`categories.ejs`）

- 在页面的前置元数据中指定布局文件。例如在layout文件夹中创建`categories.ejs`文件，那么在元数据中layout的属性值就得设置成`categories`和layout文件夹中创建的`.ejs` 文件名保持一致

  ```
  ---
  title: 分类
  date: 2025-10-28 16:15:28
  layout: categories
  ---
  ```

  ![image-20251029001736475](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251029001736475.png)

  ![image-20251029000804848](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251029000804848.png)

<br>

### **<font color='red'>五、前置元数据(Front-matter)</font>**

在Hexo中，页面的前置元数据（Front-matter）和内容的组织是创建自定义页面的关键。

前置元数据是位于文件顶部、由 --- 包围的YAML或JSON格式数据，它定义了页面的各种属性。

#### **<font color='#10c300'>5.1、基本结构</font>**

```yaml
---
title: 页面标题
date: 2025-10-28 16:03:32
layout: 布局名称
# 其他属性...
---

# 这里开始是页面内容
```
#### **<font color='#10c300'>5.2、常用前置元数据属性</font>**

根据您的项目中的示例，以下是常用的属性：

1. title : 页面标题
2. date : 创建日期，格式为 YYYY-MM-DD HH:mm:ss
3. layout : 指定使用的布局模板（如 categories ）
4. comments : 是否开启评论（true/false）
5. categories : 分类
6. tags : 标签
7. permalink : 自定义永久链接

<br>

### **<font color='red'>六、博客部署到Github Pages</font>**

#### **<font color='#10c300'>6.1、新建仓库</font>**

创建一个和你用户名相同的仓库，后面加 `.github.io`

![image-20251031115006280](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251031115006280.png)

#### **<font color='#10c300'>6.2、实现免密登录</font>**

**为了实现安全的免密访问 GitHub 仓库**，也就是在你每次部署或推送内容到 GitHub Pages 时，不再需要输入账号密码，同时保证传输是安全加密的。

##### **<font color='cornflowerblue'>1）配置 Git 用户信息</font>**

```bash
git config --global user.name "yourname"
git config --global user.email "youremail"
```

这两条命令不是用来登录的，而是：

- 告诉 Git **是谁在提交代码**。

- 每一次 commit 都会写入这两个信息，形成类似：

  ```
  Author: yourname <youremail>
  ```

>  **🚨注意：**
>  这个邮箱最好与你 GitHub 账号绑定的邮箱一致，否则 GitHub 无法正确识别为你的提交

查看当前配置：

```bash
bashgit config user.name
git config user.email
```

##### **<font color='cornflowerblue'>2）生成 SSH 密钥</font>**

```bash
ssh-keygen -t rsa -C "yourEmail"
```

这条命令是**创建一对 SSH 密钥**（key pair）：

- **私钥 (`id_rsa`)**：保存在你电脑上，不要泄露。
- **公钥 (`id_rsa.pub`)**：可以安全地上传到 GitHub（或其他服务器）。

然后你会发现 `C:\Users\19584\` 下有一个 `.ssh` 目录，如果没有，打开隐藏文件夹，`.ssh` 文件夹下有 `id_rsa` 和 `id_rsa.pub`，前一个是私钥，后一个是公钥

##### **<font color='cornflowerblue'>3）配置到 GitHub</font>**

将 `id_rsa.pub` 内的内容复制下来，然后进入 GitHub，点击 `Settings`，进入 `SSH and GPG keys` 选项，点击 `New SSH key`，然后填写 `Title: Blog`，`Key:你刚刚复制的公钥`

![image-20251031140039333](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251031140039333.png)

#### **<font color='#10c300'>6.3、一键部署</font>**

1. 安装 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)

   ```bash
   pnpm add hexo-deployer-git
   ```

2. 在根目录 `_config.yml` 中添加以下配置（如果配置已经存在，请将其替换为如下）:

```yaml
deploy:
  type: git
  repo: https://github.com/<username>/<username>.github.io
  # example, https://github.com/hexojs/hexojs.github.io
  branch: main  // 和你创建的<username>.github.io创库的主分支保持一致
```

- 执行 `hexo clean && hexo deploy` 。
- 浏览 *username*.github.io，检查你的网站能否运作。

添加组合命令

```json
 "scripts": {
    "push": "pnpm run compile-less && pnpm run del && pnpm run clean && pnpm run build && pnpm run gulp && pnpm run deploy",
  },
```


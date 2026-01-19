**注意！注意！注意！注意！注意！注意！**
不要更新主题，不要更新主题，不要更新主题。更新主题，配置的内容都全部丢失，若要更新，先拷贝一份主题

### 博客总体框架分类

#### 1. HTML/CSS/JS

- HTML & 语义化
- CSS 布局与样式体系
- JavaScript & ES6+
- Ajax & HTTP API

#### 2. 框架与生态

- Vue 基础 & 进阶
- React 基础 & 进阶
- 小程序 & 跨端方案
- 组件封装 & UI设计
- UI 库
- Unocss

#### 3. 工程化与质量

- 构建与打包（Webpack / Vite）
- 代码规范（ESLint / Prettier / Stylelint）
- 前端测试（Jest / Cypress）
- 持续集成 & 自动化部署

#### 4. 性能与体验

- 加载优化 & 性能监控
- 动画与交互（CSS / Canvas / WebGL）
- 可访问性 (A11Y)
- 响应式与国际化

#### 5. 数据与可视化

- API 请求封装 & 数据处理
- 图表库使用（ECharts / D3.js / AntV）
- 大数据可视化优化

#### 6. 进阶与架构

- 前端设计模式
- 网络与安全（XSS / CSRF）
- 前端架构（模块化 / 微前端）
- Node.js 全栈开发理念

#### 7. 计算机基础与网络

- 浏览器原理

#### 8. 后端与运维

- Linux
- Node.js

#### 9.前端与后端通信

- Ajax、fetch、axios

#### 10. 工具

- git
- typora

#### 11. 其他

- Hexo博客搭建



### Hexo命令

#### 1、init

```bash
$ hexo init [folder]
```

新建一个网站项目。 如果没有设置 `folder` ，Hexo 默认在目前的文件夹建立网站项目。



#### 2、new

```bash
$ hexo new [layout] <title>
```

新建一篇文章。 如果没有设置 `layout` 的话，默认使用 [_config.yml](https://hexo.io/zh-cn/docs/configuration) 中的 `default_layout` 参数代替。 使用布局 `draft` 来创建草稿。 如果标题包含空格的话，请使用引号括起来。

| 选项              | 描述                            |
| :---------------- | :------------------------------ |
| `-p`, `--path`    | 文章的路径。 自定义文章的路径。 |
| `-r`, `--replace` | 如果存在的话，替换当前的文章。  |
| `-s`, `--slug`    | 文章别名。 自定义文章的 URL。   |

**1️⃣ 区分 `post` 和 `page`**

hexo new page /  hexo new post 

在 Hexo 中有两种主要内容类型：

| 类型            | 命令关键字      | 是否出现在文章列表            | 默认保存位置                  |
| --------------- | --------------- | ----------------------------- | ----------------------------- |
| **文章 (post)** | `hexo new post` | ✅ 会出现在首页/归档等文章列表 | `source/_posts/`              |
| **页面 (page)** | `hexo new page` | ❌ 不会出现在文章列表          | `source/<page_path>/index.md` |

**2️⃣ 创建文章（会出现在博客文章列表）**

命令：

```bash
$ hexo new post "文章标题"
```

📂 结果：

```
source/_posts/文章标题.md
```

✏️ 里面会自动生成 YAML 头部（Front‑matter）：

```yaml
yaml---
title: 文章标题
date: 2024-07-01 12:00:00
tags:
categories:
---
```

------

**3️⃣ 创建页面（不会出现在文章列表）**

命令：

```bash
$ bashhexo new page "about"
```

结果：

```
source/about/index.md
```

这个页面不会出现在文章列表，而是独立存在。



#### 3、generate

生成静态文件

```bash
$ hexo generate
```

| 选项                  | 描述                                         |
| :-------------------- | :------------------------------------------- |
| `-d`, `--deploy`      | 在生成完成后部署。                           |
| `-w`, `--watch`       | 监视文件变动                                 |
| `-b`, `--bail`        | 生成过程中如果发生任何未处理的异常则抛出异常 |
| `-f`, `--force`       | 强制重新生成                                 |
| `-c`, `--concurrency` | 要同时生成的文件的最大数量。 默认无限制      |

#### 4、server

```bash
$ hexo server
```

启动服务器。 默认情况下，访问网址为： `http://localhost:4000/`。

| 选项             | 描述                               |
| :--------------- | :--------------------------------- |
| `-p`, `--port`   | 重设端口                           |
| `-s`, `--static` | 只使用静态文件                     |
| `-l`, `--log`    | 启用日志。 Override logger format. |

#### 5、deploy

```bash
$ hexo deploy
```

部署你的网站。

| 选项               | 描述         |
| :----------------- | :----------- |
| `-g`, `--generate` | 在部署前生成 |

#### 6、clean

```bash
$ hexo clean
```

清除缓存文件 (`db.json`) 和已生成的静态文件 (`public`)。



---

## 🚀 自动化部署配置指南

### ✅ 部署方式

本项目支持两种部署方式：

#### 1. 本地手动部署

使用一键命令即可完成全部流程：

```bash
pnpm run push
```

执行流程：
- ✅ 编译 Less 样式文件 (`compile-less`)
- ✅ 删除旧的部署文件 (`del`)
- ✅ 清理 Hexo 缓存 (`clean`)
- ✅ 生成静态文件 (`build`)
- ✅ Gulp 压缩优化 (`gulp`)
- ✅ 部署到 GitHub Pages (`deploy`)

#### 2. GitHub Actions 自动化部署 ⭐ (推荐)

每次推送代码到 `main` 分支时，自动完成构建和部署。

---

### 📋 GitHub Actions 配置步骤

#### 第一步：创建 GitHub Personal Access Token

1. **访问 GitHub Token 设置页面**
   - 网址：https://github.com/settings/tokens
   - 或者：GitHub 头像 → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **生成新的 Token**
   - 点击 **"Generate new token"** → **"Generate new token (classic)"**

3. **配置 Token**
   - **Note (备注名称)**: `HEXO_DEPLOY_TOKEN` (或任意您喜欢的名称)
   - **Expiration (过期时间)**: 
     - 建议选择 `90 days` 或 `1 year`
     - 也可以选择 `No expiration` (不过期，但不够安全)
   - **Select scopes (权限选择)**:
     - ✅ 勾选 `repo` (完整的仓库访问权限)

4. **生成并复制 Token**
   - 点击页面底部的 **"Generate token"** 按钮
   - ⚠️ **重要**：生成后的 Token 只显示一次，请立即复制保存！
   - 格式类似：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### 第二步：添加 Secret 到您的博客源码仓库

1. **进入博客源码仓库**
   - 打开存放 Hexo 源码的仓库（不是 `zhbcloud.github.io`）
   - 这个仓库应该包含 `package.json`、`_config.yml` 等文件
   - ⚠️ **重要**：Secret 必须添加到**源码仓库**（blog 仓库），而不是部署目标仓库

2. **进入 Secrets 设置**
   - 点击仓库顶部的 **Settings** 标签
   - 在左侧菜单找到 **Secrets and variables** → 点击 **Actions**

3. **添加新的 Secret**
   - 点击右上角的 **"New repository secret"** 按钮
   - 填写信息：
     - **Name**: `GH_TOKEN` (必须是这个名称)
     - **Secret**: 粘贴第一步复制的 Token
   - 点击 **"Add secret"**

#### 第三步：确认分支配置

1. **检查您的默认分支名称**

   在本地仓库运行：
   ```bash
   git branch
   ```

   查看当前分支名称是 `main` 还是 `master`。

2. **如果是 `master` 分支**

   需要修改 `.github/workflows/deploy.yml` 文件第 5 行：

   ```yaml
   on:
     push:
       branches:
         - master  # 改为 master
   ```

#### 第四步：推送代码并测试

1. **将配置文件推送到 GitHub**

   ```bash
   git add .
   git commit -m "配置 GitHub Actions 自动化部署"
   git push
   ```

2. **查看部署状态**

   - 进入 GitHub 仓库页面
   - 点击顶部的 **Actions** 标签
   - 可以看到 "部署 Hexo 博客" 工作流正在运行
   - 点击进去可以查看详细的执行日志

3. **等待部署完成**

   - 整个流程大约需要 2-5 分钟
   - 部署成功后，访问 `https://zhbCloud.github.io` 查看更新

---

### 🎯 日常使用流程

#### 写文章并发布

```bash
# 1. 创建新文章
hexo new post "文章标题"

# 2. 编辑文章
# 在 source/_posts/ 目录下找到并编辑 markdown 文件

# 3. 本地预览（可选）
pnpm run dev
# 访问 http://localhost:4000 预览

# 4. 提交并推送（自动触发部署）
git add .
git commit -m "新增文章：文章标题"
git push
```

#### 修改主题或配置

```bash
# 1. 修改配置文件或主题
# 编辑 _config.yml 或 themes/ 目录下的文件

# 2. 本地测试（可选）
pnpm run dev

# 3. 提交并推送（自动触发部署）
git add .
git commit -m "更新配置"
git push
```

---

### 🔍 查看部署状态和日志

#### 方式一：GitHub Actions 页面

1. 进入仓库页面
2. 点击顶部的 **Actions** 标签
3. 查看最新的工作流运行记录
4. 点击具体的运行记录查看详细日志

#### 方式二：提交页面

在提交记录右侧会显示部署状态：
- ✅ 绿色对号：部署成功
- ❌ 红色叉号：部署失败（点击可查看原因）
- 🟡 黄色圆点：正在部署中

---

### 🛠️ 故障排查

#### 问题 1：部署失败，提示认证错误

**错误信息**：
- `fatal: could not read Password for 'https://github.com': No such device or address`
- `Authentication failed` 或 `403 Forbidden`

**解决方法**：
1. 检查 `GH_TOKEN` Secret 是否正确添加到**源码仓库**（blog 仓库）
2. 检查 Token 是否有 `repo` 权限
3. 检查 Token 是否过期（重新生成并更新 Secret）
4. 如果没有配置 `GH_TOKEN`，workflow 会尝试使用 `GITHUB_TOKEN`（内置 token）
   - 如果推送到不同仓库，建议使用 Personal Access Token

#### 问题 2：部署成功但网站没有更新

**可能原因**：
1. GitHub Pages 有缓存，等待 1-2 分钟后刷新
2. 浏览器缓存，按 `Ctrl+F5` 强制刷新
3. 检查部署的目标仓库是否正确
4. **仓库地址大小写问题**：确保 workflow 中的仓库地址大小写正确（`zhbCloud/zhbCloud.github.io`）
   - 如果看到 "This repository moved" 提示，说明地址大小写不正确
   - 检查 `.github/workflows/deploy.yml` 中的仓库地址

#### 问题 3：构建失败

**排查步骤**：
1. 查看 Actions 页面的错误日志
2. 检查本地是否能成功运行 `pnpm run push`
3. 检查 `package.json` 中的脚本是否正确
4. 检查主题文件是否完整

#### 问题 4：Token 过期

**现象**：之前正常，突然无法部署

**解决方法**：
1. 重新生成新的 Token（步骤同上）
2. 更新仓库的 `GH_TOKEN` Secret

---

### 💡 高级功能

#### 手动触发部署

如果您只想重新部署而不提交新代码：

1. 进入 GitHub 仓库的 **Actions** 页面
2. 选择 **"部署 Hexo 博客"** 工作流
3. 点击右侧的 **"Run workflow"** 按钮
4. 选择分支并点击运行

#### 本地备用部署

如果 GitHub Actions 出现问题，仍可使用本地部署：

```bash
pnpm run push
```

这需要您在本地配置好 Git 认证（SSH 或 HTTPS）。

---

### ✨ 自动化部署的优势

- ✅ **真正的自动化**：提交即部署，无需本地构建
- ✅ **跨平台**：在任何设备上都能发文章
- ✅ **环境隔离**：不依赖本地环境
- ✅ **可追溯**：完整的构建日志
- ✅ **高效**：使用缓存加速构建
- ✅ **可靠**：构建失败不会影响线上站点

---

### 📁 相关文件说明

```
blog/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 工作流配置
├── _config.yml                  # Hexo 站点配置（包含部署配置）
├── package.json                 # 项目依赖和脚本
├── source/                      # 博客源文件目录
│   └── _posts/                  # 文章存放目录
└── README.md                    # 本文档
```

### ⚙️ 项目配置信息

- **源码仓库**：当前仓库（blog）
- **部署目标仓库**：`zhbCloud/zhbcloud.github.io`
- **部署地址**：https://zhbcloud.github.io/
- **Node.js 版本**：20 LTS
- **包管理器**：pnpm 9
- **Hexo 版本**：7.3.0

### ⚠️ 重要提示

1. **仓库地址大小写**：GitHub 仓库名区分大小写，确保 workflow 中的地址正确
2. **Secret 添加位置**：`GH_TOKEN` 必须添加到**源码仓库**（blog 仓库），不是部署目标仓库
3. **主题更新警告**：不要直接更新主题，更新前请先备份配置

---

**配置完成后，您就可以享受无缝的自动化部署体验了！** 🎉
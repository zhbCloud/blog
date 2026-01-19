---
title: Cusros的使用
abbrlink: aed47f69
date: 2025-12-02 00:38:45
img: /static/43.webp
categories: 工具
tags:
  - Cursor
  - AI
---



### **<font color='red'>一、解决限制国内使用</font>**

![image-20251115161133203](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251115161133203.png)

原因是美国那边制裁了 claude ，限制咱们国内地区的ip使用，因此我们就无法使用了。

**解决步骤**

1. 打开自己的魔法工具（大家懂得）

2. 在Cursor编辑器设置代理，ip的端口号设置成魔法工具的端口号

   ![image-20251115161504320](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251115161504320.png)

3. 将http/2设置成http/1.1即可

   ![image-20251115161623548](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251115161623548.png)

4. 测试

   ![image-20251115161703956](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251115161703956.png)

<br>

### **<font color='red'>二、Cusros对话模式模板</font>**

**提示词技巧总结:**

1. 提供上下文:提及项目语言、框架、业务背景等信息
2. 分点描述:将复杂需求拆解为具体步骤或要求
3. 使用技术术语:准确的术语能帮助 AI 更精准理解需求
4. 明确边界:说明必须保留的现有功能或禁止的实现方式
5. 示例引导:附上期望输出示例或参考代码风格

<br>

#### **<font color='#10c300'>2.1、代码生成类</font>**

```markdown
[任务类型]:请生成一个{功能描述}的{编程语言/框架}实现

[具体要求]:
1.使用{特定技术/库}
2.包含{特定功能点}
3.符合{编码规范/设计模式}
```

示例：

```
请生成一个学习计划页面的HTML+CSS+Javascript实现

[具体要求]:
1.使用Tailwind Css v3和Font Awesome
2.包含任务添加、编辑、删除功能
3.包含日历视图展示学习计划
4.包含学习进度可视化图表
5.符合现代UI设计原则和响应式设计
6.具有平滑的动画和交互效果
```

<br>

#### **<font color='#10c300'>2.2、代码修改类</font>**

```markdown
[任务类型]:请帮我修改{上下文:具体文件/代码片段}，实现{预期功能}

[当前问题]:{现有的错误/不足描述}

[具体要求]:
1.保持{现有功能/结构}不变
2.使用{特定方法/技术}}改进
3.修复{具体错误/警告}
```

示例：

```
请帮我修改当前的 React 组件，优化列表渲染性能
当前问题:滚动时列表卡顿，存在明显性能问题。要求:
1.保持现有 UI 不变
2.使用 React.memo 和虚拟列表技术优化
3.添加性能监控日志
```

<br>

#### **<font color='#10c300'>2.3、代码解释类</font>**

```markdown
[任务类型]:请解释{代码片段/功能模块}的{具体方面}

[上下文信息]:{相关业务背景/技术栈}

[具体问题]
1.{不理解的语法/逻辑}
2.{特定设计选择的原因]
3.{潜在的问题/优化点}
```

示例：

```
请解释这段 Typescript 代码的泛型约束和类型推导逻辑。
上下文:这是一个用于数据验证的工具函数。
具体问题:
1.<T extends object>这里为什么要加 extends object?
2.类型推导是如何工作的?
3.是否存在类型安全隐患?
```

<br>

#### **<font color='#10c300'>2.4、流程自动化类</font>**

```markdown
[任务类型]:请创建一个自动化流程，实现{目标描述}

[操作步骤]:
1.从{数据源}获取{数据类型}
2.执行{数据处理/转换操作}
3.将结果保存到{目标位置}
4.触发{后续操作/通知}

[具体要求]:
1.使用{特定工具/API}
2.添加{错误处理/重试机制}
3.生成{日志/报告}
```

示例：

```
请创建一个自动化流程，每天凌晨从 GitHub API 获取仓库星标数，保存到 Goog1e sheets 并生成趋势图。
要求:
1.使用 GitHub REST API V3
2.添加异常处理和邮件通知
3.生成周/月增长趋势图表
```

<br>

#### **<font color='#10c300'>2.5、命令行辅助类</font>**

```markdown
[任务类型]:请提供{操作场景}的{操作系统}命令

[具体需求]:
1.{执行的具体操作}
2.包含{特定参数/选项}
3.处理{特殊情况/错误}
```

示例：

```markdown
请提供在 macos 上批量压缩图片的命令行方案。需求:
1.将当前目录下所有 PNG/JPG 图片压缩 50%
2.保留原始文件并添加“-compressed”后缀
3.显示每个文件的压缩前后大小对比
```

<br>

### **<font color='red'>三、Cursor精准上下文指定</font>**

在 Cursor 工具里，“上下文（Context）” 可理解为 **让 AI 准确理解需求、辅助编码的 “信息参考范围”** ，是 AI 读懂代码、精准响应的关键!

#### **<font color='#10c300'>3.1 Codebase Indexing 代码库索引</font>**

##### **<font color='cornflowerblue'>1）、概念和作用</font>**

打开项目时，每个 Cursor 实例都将初始化该工作区的索引。初始索引设置完成后，Cursor 将自动为添加到工作区的任何新文件编制索引，以使您的代码库上下文保持最新：

- 快速 “读懂” 你的项目结构（哪些是工具文件、哪些是业务逻辑）
- 定位相关代码（如搜索 `getUser` 时，知道优先查 `userService.js`）
- 理解代码关系（如 `Order` 类和 `Product` 类的关联）

**Cursor 中的作用**：AI 分析索引内容后，生成代码时会更贴合项目实际（如使用已有工具函数、遵循命名规范）。

<br>

##### **<font color='cornflowerblue'>2）、代码库索引配置和示例</font>**

代码库索引的状态位于cursor settings > Indexing & Docs

![image-20251114004719325](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114004719325.png)

##### **<font color='cornflowerblue'>3)、忽略文件配置</font>**

Cursor 读取项目的代码库并为其编制索引以支持其功能。可以通过将.cursorignore 文件添加到根目录来控制
哪些文件被忽略和Cursor限制访问。

- 提升索引速度：排除大型依赖、生成文件(如node_modu1es、dist)
- 避免干扰：某些配置文件可能包含敏感信息或与当前任务无关

配置.cursorignore忽略文件的两种方法：

1. 自己创建 .cursorignore 文件添加到代码库目录的根目录下，并列出要忽略的目录和文件

2. 使用cursor配置快捷创建忽略文件`cursorsetting>indexing>Configure ignored files

   ![image-20251113233732232](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251113233732232.png)

<br>

#### **<font color='#10c300'>3.2、Rules规则</font>**

##### **<font color='cornflowerblue'>1）规则介绍</font>**

Rules是给Cursor AI功能(规则适用于Chat和Cmd K)生成结果添加规则和限制，让 AI生成的代码贴合团队规范，减少人工二次修改成本，主要的作用如下:

- 可约束代码风格(如强制用驼峰命名、要求函数必须写注释)
- 能限定技术选型(如禁止使用某老旧库、优先用项目指定工具类)
- 提前指定核心参数(如提前设置连接数据库的地址和账号密码等)

| 维度     | 项目规则(Project Rules)                    | 用户规则(User Rules)            |
| -------- | ------------------------------------------ | ------------------------------- |
| 作用范围 | 仅对当前项目生效，团队成员共享相同规则     | 对所有项目生效，个人专属配置    |
| 存储位置 | 项目根目录下的.cursor/rules/随意.mdc 文件  | 用户配置目录(如~/.cursor/ru1es) |
| 同步方式 | 随项目代码提交到版本库(如 Git)，团队共享   | 仅本地生效，不随项目同步        |
| 适用场景 | 统一团队编码规范(如函数注释格式、依赖版本) | 个人习惯(如快捷键、AI 响应风格) |

<font color='orange'>注意：项目规则和用户规则同时存在并且规则冲突，项目规则优先级更高--</font>

<br>

##### **<font color='cornflowerblue'>2）项目规则配置</font>**

**a、项目下创建规则文件的两种方法**

1. 在项目根目录创建文件夹`.cursor/rules/随意命名.mdc`
2. 快捷命令方式创建 ctr1+ shift +P > "New Cursor Rule"![image-20251114001431714](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114001431714.png)

<br>

**b、编写项目规则文件**

```markdown
---
alwaysApply: true
description: "团队前端项目规范"
priority: 1000
---

# 代码风格
1. 函数必须包含 JSDoc 注释
2. 禁止使用`var`,  统一使用 `const`/`let`
3. 函数命名必须添加 zwf_前缀，例如:zwf_login

# 技术选型
- 优先使用项目内已有的工具函数(如 `uti1s/request`)
- 禁止引入低版本的 1odash(<4.0.0)
```

<br>

**c、项目规则文件生效测试**

`ctrl+k`调出内联智能输入![image-20251114002810947](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114002810947.png)

<br>

##### **<font color='cornflowerblue'>3）用户规则配置</font>**

`ctrl+shift+j`快捷打开Cursor Settings，用户规则不支持 MDC，它们只是纯文本。

![image-20251114003925641](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114003925641.png)

![image-20251114003947859](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114003947859.png)

实现每行代码都用中文注释了

<br>

#### **<font color='#10c300'>3.3、mdc语法了解</font>**

Cursor 的 MDC（Markdown with Cursor）语法是专门为编写项目规则设计的轻量级格式，它结合了 Markdown 的可读性和元数据配置能力。接下来，我们来说明下mdc文件语法。

##### **<font color='cornflowerblue'>1） MDC 文件组成部分</font>**

- 前置元数据（Frontmatter）
  - 用 `---` 包裹的 YAML 格式配置
  - 定义规则的基本属性（如作用范围、优先级）
- 规则内容（Markdown 正文）
  - 用 Markdown 语法写具体规则

<br>

##### **<font color='cornflowerblue'>2）前置元数据</font>**

```yaml
---
# 官方约定字段（推荐用，AI 更易理解）
description: "前端项目规则"
globs: "src/**/*.tsx"
priority: 1000

# 自定义字段（自己或团队约定含义）
author: "技术团队"
review_date: "2025-06-04"
special_rule: "仅周一至周五生效"
---
```

| 字段          | 作用                                       | 示例                     |
| ------------- | ------------------------------------------ | ------------------------ |
| `description` | 描述规则用途，指导 AI 如何应用规则         | `"前端组件编码规范"`     |
| `globs`       | 指定规则生效的文件范围（支持 glob 语法）   | `"src/**/*.{js,ts,jsx}"` |
| `priority`    | 规则优先级（数值越大越优先），解决规则冲突 | `1000`                   |
| `version`     | 规则版本号（可选）                         | `"1.0.0"`                |

<br>

##### **<font color='cornflowerblue'>3）规则内容（Markdown 正文）</font>**

用 Markdown 的标题、列表、代码块等语法写具体规则，常见结构：

**代码风格规则（最常用）**

```markdown
# 一、代码风格
1. 函数必须包含 JSDoc 注释  
   - 至少包含 `@param` 和 `@return` 描述  
2. 变量命名必须使用驼峰命名法（camelCase）  
3. 每行代码长度不超过 120 个字符  

# 二、技术选型
- 禁止直接使用原生 fetch，必须通过项目封装的 request 工具  
- 优先使用 React Hooks 而非 Class 组件  
```

**安全约束规则**

```markdown
# 安全规范
1. 禁止使用 eval() 函数  
2. SQL 查询必须使用参数化查询，防止注入攻击  
3. 敏感信息（如 API 密钥）必须从环境变量读取  
```

**特殊语法：引用项目文件**

用 `@file` 引用项目内的配置文件，让 AI 参考：

```markdown
# 工具链配置
1. ESLint 规则必须符合 @file .eslintrc.js  
2. 测试用例必须遵循 Jest 框架规范  
```

<br>

##### **<font color='cornflowerblue'>4）完整示例（TypeScript 项目规则）</font>**

```markdown
---
description: "TypeScript 项目编码规范"
globs: "src/**/*.ts"
priority: 1000
---

# 一、基础规范
1. 所有文件必须使用 UTF-8 编码  
2. 统一使用 2 空格缩进  

# 二、类型约束
1. 禁止使用隐式 any 类型  
   - 示例：`const num: number = 123`（显式）  
   - 禁止：`const num = 123`（隐式）  
2. 接口命名必须以 `I` 开头（如 `interface IUser`）  

# 三、项目约束
- 所有 HTTP 请求必须通过 @file src/utils/request.ts 封装的工具  
- 状态管理必须使用 Redux Toolkit，禁止直接修改 state  
```

<br>

#### **<font color='#10c300'>3.4、@ 符号</font>**

在 Cursor 中使用 @ 符号在聊天中引用代码、文件、文档和其他上下文的指南，直接更具体的指定上下文环境！

以下是所有可用 @ 符号的列表：

- @Files & Folders - 引用项目中的特定文件或文件夹 ✅
- @Docs- 访问文档和指南✅
- @Git- 访问 git 历史记录和更改

![image-20251114013559213](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114013559213.png)

##### **<font color='cornflowerblue'>1）@Files & Folders 文件和文件夹</font>**

选择 `@Files & Folders`，然后选择要搜索的文件名即可引用整个文件。你也可以将侧边栏中的文件直接拖拽到 Agent 中作为上下文。

![image-20251114013919773](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114013919773.png)

选择文件夹后，输入 “/” 以继续下钻并查看所有子文件夹。

![image-20251114013934820](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114013934820.png)

<br>

##### **<font color='cornflowerblue'>2）@Docs</font>**

`@Docs` 功能可让你用文档来辅助写代码

**添加文档**

![image-20251114014157560](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114014157560.png)

![image-20251114014346829](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114014346829.png)

<br>

**提问**

![image-20251114014547119](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20251114014547119.png)
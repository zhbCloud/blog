---
title: Claude Code 安装与入门指南
abbrlink: claudecodeinstall
date: 2026-02-23 01:30:00
img: /static/49.webp
categories: 工具
tags:
  - Claude
  - AI
---

## 一、系统要求 (Prerequisites) 

在开始之前，请确保你的系统满足以下要求：

### **<span style='color:red'>1-1、硬件与系统</span>**

| 项目          | 要求                                                                                              |
| :------------ | :------------------------------------------------------------------------------------------------ |
| **操作系统**  | macOS 13.0+<br>Ubuntu 20.04+ / Debian 10+<br>Windows 10+ (需配合 WSL 1, WSL 2 或 Git for Windows) |
| **硬件**      | 至少 4 GB RAM                                                                                     |
| **Shell环境** | 推荐使用 Bash 或 Zsh                                                                              |

### **<span style='color:red'>1-2、账号与网络</span>**

- **账号要求**：需要 **Claude Pro** 或 **Team** 订阅才能使用 Claude Code
- **网络**：稳定的互联网连接（中国大陆用户需特殊网络配置，详见第五章）

![SR-IOV设置示意图](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130012622312.png)

<br>

## 二、安装步骤 (Installation) 

根据你的操作系统选择对应的安装命令。

### **<span style='color:red'>2-1、macOS, Linux, WSL</span>**

在终端中执行：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

<br>

### **<span style='color:red'>2-2、Windows</span>**

#### **<span style='color:#10c300'>1）PowerShell (推荐)</span>**

```powershell
irm https://claude.ai/install.ps1 | iex
```

#### **<span style='color:#10c300'>2）CMD</span>**

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

> **⚠️ 网络注意事项：**
> 由于网络环境限制，国内用户在安装过程中可能会失败。
> **解决方案**：请确保开启网络代理工具，并启用 **TUN 模式** 以确保终端流量被正确代理。

<br>

## 三、环境配置 (Configuration) 

### **<span style='color:red'>3-1、配置环境变量</span>**

安装完成后，如果系统提示无法识别 `claude` 命令，你需要手动配置环境变量。

1.  **打开系统属性**：
    按下 `Win + R`，输入 `sysdm.cpl` 并回车（或搜索“编辑系统环境变量”）。

2.  **添加路径**：
    点击“高级”选项卡 -> “环境变量”。在 `Path` 中添加 Claude Code 的安装路径。

    ![环境变量配置示例](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130012118216.png)

<br>

### **<span style='color:red'>3-2、验证安装</span>**

打开新的终端窗口，执行：

```bash
claude -v
```

如果显示版本号，则表示配置成功。

![版本验证](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130012255180.png)

<br>

## 四、登录与初始化 (Initialization) 

### **<span style='color:red'>4-1、启动登录</span>**

在终端执行：

```bash
claude auth login
```

### **<span style='color:red'>4-2、配置偏好</span>**

- **代码风格**：按需选择或直接回车保持默认。
  ![代码风格选择](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130013315135.png)

- **登录方式**：选择默认方式（通常是浏览器验证），浏览器会自动打开授权页面，确认授权即可。
  ![官网授权](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130013435258.png)

<br>

## 五、常见问题排查 

### **<span style='color:red'>5-1、TUN模式无法上网 / DNS 错误</span>**

**现象描述**：
开启代理软件的 TUN 模式后，网络连接断开，但系统代理模式下正常。日志显示 `all DNS requests failed` 或 `tcp4 failed`。

**原因分析**：
这通常与网卡设置有关，特别是网卡是否支持或开启了 **SR-IOV**（单根输入/输出虚拟化）。

<br>

### **<span style='color:red'>5-2、解决方案（以 ROG 主板 Bios 为例）</span>**

1.  重启电脑，进入 BIOS (F2 或 Del)。
2.  进入 **Advanced Mode (高级模式)** -> **Advanced (高级)**。
3.  进入 **PCI Subsystem Settings** 菜单。
4.  将 **SR-IOV Support** 开启 (**Enabled**)。
5.  F10 保存并重启。

<br>

## 六、Claude Code 接入阿里云百炼 GLM-5

详细说明了在终端（CLI）中使用官网安装的 `claude` 命令行工具，并配置阿里云百炼 **Coding Plan 专属 API Key** 以原生调用 **GLM-5** 模型的完整步骤。这使得你无需依赖 Anthropic 官网账单便能享受到强大的 AI 辅助编程能力。

### **<span style='color:red'>6.1、前提条件</span>**

1. **已经全局安装 Claude Code 核心 CL**

2. **跳过 Anthropic 登录**：如果首次启动强制要求登录 Anthropic 账户，找到 `C:\Users\你的用户名\.claude\settings.json` 文件(没有就创建)，将内容设置为

   ```json
   {
     "hasCompletedOnboarding": true
   }
   ```

3. **获取 API Key**：你需要进入[阿里云百炼控制台 Coding Plan 页面](https://bailian.console.aliyun.com/cn-beijing/?tab=model#/efm/coding_plan)订阅并获取专属的 API Key（格式为 `sk-sp-****`）。

### **<span style='color:red'>6.2、编辑配置文件。</span>**

将 YOUR_API_KEY 替换为 Coding Plan 专属 API Key

```bash
{    
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "YOUR_API_KEY",
        "ANTHROPIC_BASE_URL": "https://coding.dashscope.aliyuncs.com/apps/anthropic",
        "ANTHROPIC_MODEL": "glm-5"
    },
    "hasCompletedOnboarding": true
}
```



## 七、Claude Code的使用

![image-20260412004403240](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260412004403240.png)

### **<span style='color:red'>7.1、基础操作：命令与配置</span>** 

#### **<span style='color:#10c300'>1）命令</span>**

想快速上手？从 `claude --help` 开始。  这个命令会列出所有可用参数和命令，比如：  
- `-p` 用于非交互式输出  
- `-c` 继续最近的对话  
- `--model` 指定模型类型  

记住常用参数能让操作更高效，比如用 `claude -r` 恢复历史会话，或用 `--output-format json` 导出结构化结果。

| 命令                 | 解释       | 使用场景                                       |
| -------------------- | ---------- | ---------------------------------------------- |
| `/clear`             | 清空上下文 | 如果需要重新开始，或者感觉 AI 已经无法解决问题 |
| `/compact`           | 压缩对话   | 重开对话，但是不希望丢掉之前的记忆             |
| `/cost`              | 花费       | max 不需要看，API 用户可以看到                 |
| `/logout` / `/login` | 登出登录   | 切换账号等操作                                 |
| `/model`             | 切换模型   | 200 刀可以换使用 opus 模型，100 刀没有选择     |
| `/status`            | 状态       | 查看当前 CC 的状态                             |
| `/doctor`            | 检测       | 检测cc安装状态                                 |

![image-20260411205345731](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260411205345731.png)

#### **<span style='color:#10c300'>2）配置</span>**

Claude Code 的所有数据都保存本地。 这一点对后续理解配置管理、记忆系统、会话恢复等功能至关重要。

安装完成后Claude Code会在用户主目录下创建`~/.claude/`文件夹（windows下对应的目录`C:\Users\<用户名>\.claude`）这就是它的大本营

| 路径                      | 内容         | 说明                                                  |
| ------------------------- | ------------ | ----------------------------------------------------- |
| `~/.claude/settings.json` | 全局配置文件 | 更新通道、API KEY、环境变量、MCP Server等所有全局设置 |
| `~/.claude/CLAUDE.md`     | 全局记忆文件 | 跨项目生效的指令和偏好                                |
| `~/.claude/projects`      | 项目级数据   | 每个项目的回话记录、自动记忆、本地配置等              |
| `~/.claude/credits.json`  | 用量与额度   | API调用次数、TOKEN消耗统计                            |



### **<span style='color:red'>7.2、核心模式：按场景切换</span>**

#### **<span style='color:#10c300'>1）自动编辑模式：免确认批量操作</span>**

适合无需逐次确认的文件创建、修改场景。按下 `Shift+Tab` 一次即可开启，此时 Claude 会自动执行编辑操作，无需手动确认。比如提示 “创建一个酷炫的 todolist 应用”，它会直接生成文件并修改，省去反复确认的时间。

![image-20260411231145975](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260411231145975.png)

#### **<span style='color:#10c300'>2）Plan 模式：前期规划神器</span>**

面对项目搭建或复杂问题时，用 `Shift+Tab` 两次开启 Plan 模式。它会先梳理方案框架，比如要做 “像素风格的移动端 todolist”，会自动规划技术栈、页面结构、适配方案等，确认后再动手。若不满意可直接说 “重新规划”，直到符合预期。

![image-20260411231203319](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260411231203319.png)

#### **<span style='color:#10c300'>3）Yolo 模式：全权限放手干</span>**

重构代码、启动新项目或修复复杂 bug 时，用 `claude --dangerously-skip-permissions` 进入 Yolo 模式。此时 Claude 拥有更高权限，可直接执行更多操作（需注意安全，建议在沙箱环境使用）。进入后仍能用 `Shift+Tab` 调整模式，灵活切换权限粒度。

```bash
claude --dangerously-skip-permissions
```

### **<span style='color:red'>7.3、多级记忆系统</span>**

一个常见的 Agent 痛点是“金鱼记忆”——每次新会话都从零开始，不记得之前的任何约定。   ***\*Claude Code\**** 通过一套 **多级记忆架构** 解决了这个问题。

| 记忆层级                       | 存储位置                         | 作用域           | 内容示例                         |
| ------------------------------ | -------------------------------- | ---------------- | -------------------------------- |
| 项目记忆 (CLAUDE.md)           | 项目根目录 `CLAUDE.md`           | 当前项目所有会话 | 技术栈、代码规范、架构决策       |
| 用户记忆 (~/.claude/CLAUDE.md) | 用户主目录 `~/.claude/CLAUDE.md` | 所有项目         | 个人编码偏好、常用工具、关联链接 |
| 自动记忆 (Auto Memory)         | `~/.claude/memory/`              | 自动沉淀         | Claude 自主记录的项目细节和经验  |

### **<span style='color:red'>7.4、Claude Code 快捷键说明</span>**

| 快捷键             | 功能说明       |
| ------------------ | -------------- |
| `!`                | 进入 Bash 模式 |
| `/`                | 打开命令菜单   |
| `@`                | 输入文件路径   |
| `&`                | 后台运行       |
| `/btw`             | 提出附带问题   |
| 双击 `Esc`         | 清空输入       |
| `Shift + Tab`      | 自动接受编辑   |
| `\` + `Enter`      | 输入多行文本   |
| `Ctrl + Shift + -` | 撤销操作       |
| `Ctrl + O`         | 详细输出模式   |
| `Ctrl + T`         | 切换任务面板   |
| `Ctrl + S`         | 暂存提示词     |
| `Ctrl + G`         | 在编辑器中编辑 |
| `Alt + V`          | 粘贴图片       |
| `Meta + P`         | 切换模型       |
| `Meta + O`         | 切换快速模式   |

### **<span style='color:red'>7.5、斜杠命令系统</span>**

#### **<span style='color:#10c300'>1）最常用命令</span>**

| 命令      | 用途     |
| --------- | -------- |
| `/clear`  | 清除对话 |
| `/help`   | 查看帮助 |
| `/model`  | 切换模型 |
| `/resume` | 恢复会话 |
| `/cost`   | 查看消耗 |

#### **<span style='color:#10c300'>2）会话管理</span>**

| 命令                      | 功能说明                                                     |
| ------------------------- | ------------------------------------------------------------ |
| `/clear`                  | 清除对话历史并释放上下文。别名：`/reset`、`/new`             |
| `/compact [instructions]` | 压缩对话，可附带焦点指令                                     |
| `/resume [session]`       | 通过 ID 或名称恢复对话，或打开会话选择器。别名：`/continue`  |
| `/rename [name]`          | 重命名当前会话并在提示栏显示名称。无参数时自动生成名称       |
| `/branch [name]`          | 在当前点创建对话分支。别名：`/fork`                          |
| `/rewind`                 | 回退对话和/或代码到之前的状态，或从选定消息开始总结。别名：`/checkpoint` |
| `/export [filename]`      | 将当前对话导出为纯文本。带文件名直接写入，无参数则打开对话框 |
| `/exit`                   | 退出 CLI。别名：`/quit`                                      |

---

#### **<span style='color:#10c300'>3）模型与配置</span>**

| 命令                                     | 功能说明                                                     |
| ---------------------------------------- | ------------------------------------------------------------ |
| `/model [model]`                         | 选择或更改 AI 模型。支持左右箭头调整努力级别                 |
| `/effort [low\|medium\|high\|max\|auto]` | 设置模型努力级别。`low`、`medium`、`high` 跨会话持久化，`max` 仅当前会话有效 |
| `/fast [on\|off]`                        | 开启或关闭快速模式                                           |
| `/config`                                | 打开设置界面调整主题、模型、输出风格等偏好。别名：`/settings` |
| `/status`                                | 打开设置界面（状态标签页），显示版本、模型、账户和连接状态   |
| `/theme`                                 | 更改颜色主题，包括明暗变体、色盲友好主题和 ANSI 主题         |

---

#### **<span style='color:#10c300'>4）文件与目录</span>**

| 命令              | 功能说明                                           |
| ----------------- | -------------------------------------------------- |
| `/add-dir <path>` | 为当前会话添加工作目录以进行文件访问               |
| `/diff`           | 打开交互式差异查看器，显示未提交的更改和每轮差异   |
| `/context`        | 将当前上下文使用情况可视化为彩色网格，显示优化建议 |

---

#### **<span style='color:#10c300'>5）代码审查与质量</span>**

| 命令                | 功能说明                                                     |
| ------------------- | ------------------------------------------------------------ |
| `/security-review`  | 分析当前分支待更改的安全漏洞，审查 git diff 识别注入、认证和数据暴露风险 |
| `/simplify [focus]` | **[技能]** 审查最近更改的文件，检查代码复用、质量和效率问题，然后修复它们 |
| `/review`           | 已弃用。请安装 `code-review` 插件代替                        |

---

#### **<span style='color:#10c300'>6）Git 与 GitHub</span>**

| 命令                   | 功能说明                                                     |
| ---------------------- | ------------------------------------------------------------ |
| `/autofix-pr [prompt]` | 启动一个 Claude Code web 会话，监视当前分支的 PR 并在 CI 失败或审阅者评论时推送修复 |
| `/install-github-app`  | 为仓库设置 Claude GitHub Actions 应用                        |
| `/web-setup`           | 使用本地 `gh` CLI 凭据将 GitHub 账户连接到 Claude Code web   |
| `/pr-comments [PR]`    | 已移除（v2.1.91）。请直接让 Claude 查看 PR 评论              |

---

#### **<span style='color:#10c300'>7）调试与诊断</span>**

| 命令                   | 功能说明                                                     |
| ---------------------- | ------------------------------------------------------------ |
| `/debug [description]` | **[技能]** 为当前会话启用调试日志并排查问题                  |
| `/doctor`              | 诊断并验证 Claude Code 安装和设置                            |
| `/cost`                | 显示 token 使用统计                                          |
| `/usage`               | 显示计划使用限制和速率限制状态                               |
| `/stats`               | 可视化每日使用情况、会话历史、连续使用天数和模型偏好         |
| `/insights`            | 生成分析 Claude Code 会话的报告，包括项目领域、交互模式和痛点 |

---

#### **<span style='color:#10c300'>8）账户与权限</span>**

| 命令                | 功能说明                                                   |
| ------------------- | ---------------------------------------------------------- |
| `/login`            | 登录 Anthropic 账户                                        |
| `/logout`           | 登出 Anthropic 账户                                        |
| `/permissions`      | 管理工具权限的允许、询问和拒绝规则。别名：`/allowed-tools` |
| `/upgrade`          | 打开升级页面以切换到更高级的计划层级                       |
| `/privacy-settings` | 查看和更新隐私设置（仅限 Pro 和 Max 订阅者）               |
| `/extra-usage`      | 配置额外使用量以便在达到速率限制时继续工作                 |

---

#### **<span style='color:#10c300'>9）集成与扩展</span>**

| 命令                 | 功能说明                                             |
| -------------------- | ---------------------------------------------------- |
| `/mcp`               | 管理 MCP 服务器连接和 OAuth 认证                     |
| `/plugin`            | 管理 Claude Code 插件                                |
| `/reload-plugins`    | 重新加载所有活动插件以应用待处理的更改               |
| `/skills`            | 列出可用的技能                                       |
| `/hooks`             | 查看工具事件的钩子配置                               |
| `/agents`            | 管理代理配置                                         |
| `/ide`               | 管理 IDE 集成并显示状态                              |
| `/chrome`            | 配置 Claude in Chrome 设置                           |
| `/install-slack-app` | 安装 Claude Slack 应用                               |
| `/setup-bedrock`     | 通过交互式向导配置 Amazon Bedrock 认证、区域和模型   |
| `/setup-vertex`      | 通过交互式向导配置 Google Vertex AI 认证、项目和区域 |

---

#### **<span style='color:#10c300'>10）技能与自动化</span>**

| 命令                        | 功能说明                                                     |
| --------------------------- | ------------------------------------------------------------ |
| `/batch <instruction>`      | **[技能]** 在代码库中并行编排大规模更改，将工作分解为 5-30 个独立单元 |
| `/loop [interval] [prompt]` | **[技能]** 在会话保持打开时重复运行提示。示例：`/loop 5m check if the deploy finished` |
| `/plan [description]`       | 直接从提示进入计划模式                                       |
| `/ultraplan <prompt>`       | 在 ultraplan 会话中起草计划，在浏览器中审查，然后远程执行或发送回终端 |
| `/schedule [description]`   | 创建、更新、列出或运行云端计划任务                           |
| `/init`                     | 使用 `CLAUDE.md` 指南初始化项目                              |
| `/claude-api`               | **[技能]** 加载项目语言的 Claude API 参考材料                |

---

#### **<span style='color:#10c300'>11）界面与显示</span>**

| 命令                      | 功能说明                                                     |
| ------------------------- | ------------------------------------------------------------ |
| `/color [color\|default]` | 设置当前会话的提示栏颜色。可用颜色：`red`、`blue`、`green`、`yellow`、`purple`、`orange`、`pink`、`cyan` |
| `/copy [N]`               | 将最后的助手响应复制到剪贴板。传递数字 N 复制第 N 个最新响应 |
| `/keybindings`            | 打开或创建键绑定配置文件                                     |
| `/terminal-setup`         | 配置 Shift+Enter 和其他快捷键的终端键绑定                    |
| `/voice`                  | 切换按键说话语音听写                                         |
| `/desktop`                | 在 Claude Code 桌面应用中继续当前会话（仅 macOS 和 Windows）。别名：`/app` |
| `/mobile`                 | 显示二维码以下载 Claude 移动应用。别名：`/ios`、`/android`   |
| `/statusline`             | 配置 Claude Code 的状态栏                                    |

---

#### **<span style='color:#10c300'>12）其他命令</span>**

| 命令                 | 功能说明                                            |
| -------------------- | --------------------------------------------------- |
| `/help`              | 显示帮助和可用命令                                  |
| `/btw <question>`    | 提出快速附带问题而不添加到对话中                    |
| `/feedback [report]` | 提交关于 Claude Code 的反馈。别名：`/bug`           |
| `/release-notes`     | 在交互式版本选择器中查看更新日志                    |
| `/powerup`           | 通过快速互动课程和动画演示发现 Claude Code 功能     |
| `/stickers`          | 订购 Claude Code 贴纸                               |
| `/passes`            | 与朋友分享 Claude Code 免费周（仅限符合条件的账户） |
| `/tasks`             | 列出和管理后台任务。也可用 `/bashes`                |
| `/remote-control`    | 使此会话可从 claude.ai 远程控制。别名：`/rc`        |
| `/remote-env`        | 为使用 `--remote` 启动的 web 会话配置默认远程环境   |
| `/teleport`          | 将 Claude Code web 会话拉取到此终端。别名：`/tp`    |
| `/sandbox`           | 切换沙箱模式（仅在支持的平台上可用）                |

---

### **<span style='color:red'>7.6、扩展能力系统：MCP、Skills与 Plugin</span>**

Claude Code的内置工具覆盖了文件操作和命令执行，但真实的开发场景往往需要更多能力一-查询数据库、调用第三方API、执行特定业务流程。Claude Code提供了三套互补的扩展机制:

| 扩展类型                     | 核心定位             | 技术实现                    | 类比                          |
| ---------------------------- | -------------------- | --------------------------- | ----------------------------- |
| MCP (Model Context Protocol) | 连接外部数据源和工具 | 标准化的 Server-Client 协议 | 手机的 USB 接口——连接任何外设 |
| Skills                       | 封装可复用的业务流程 | Markdown 格式的提示词模板   | 标准操作手册（SOP）           |
| Plugin                       | 社区生态的打包扩展   | npm 包形式分发              | 手机 App Store 里的应用       |

#### **<span style='color:#10c300'>1）各个AI存放Skills位置</span>**

| AI 编辑器  | 全局 Skills 存放位置                                         | 项目级 Skills 存放位置         | 调用方式                                  |
| ---------- | ------------------------------------------------------------ | ------------------------------ | ----------------------------------------- |
| **Codex**  | `C:\Users\<用户>\.codex\skills\` <br> `C:\Users\<用户>\.agents\skills\` | `<项目根目录>\.codex\skills\`  | 使用 `$SkillName` 形式显式触发            |
| **Cursor** | `C:\Users\<用户>\.cursor\skills\`                            | `<项目根目录>/.cursor/skills/` | 使用`/SkillName`形式显式触发              |
| **Trae**   | `C:\Users\<用户>\.trae\skills\`                              | `<项目根目录>/.trae/skills/`   | 使用 `frontend-design` 技能生成一个登录页 |

#### **<span style='color:#10c300'>2）claude的skills使用</span>**

Skills 是 Claude Code 的扩展机制，通过 `/skill-name` 方式调用，用于增强 Claude 的特定能力。

##### **<span style='color:cornflowerblue'>1️⃣两种获取 Skills 的方式</span>**

- **<span style='color:orange'>通过 Plugin Marketplace 下载（官方推荐）</span>**

  - **适用场景**

    1. 使用官方或第三方维护的 skills 包
    2. 需要版本更新和统一管理
    3. 批量安装多个相关 skills

  - **操作步骤**

    ```bash
    # 1. 添加 marketplace
    /plugin marketplace add anthropics/skills
    
    # 2. 查看可用的插件
    /plugin browse
    
    # 3. 需要安装具体的 plugin 包
    /plugin install document-skills@anthropic-agent-skills
    /plugin install example-skills@anthropic-agent-skills
    
    # 4. 查看已启用的 skills
    /skills
    
    # 5. 使用 skill
    /pdf
    /xlsx
    /frontend-design
    ```
    
  - **文件存放位置**
  
    ```
    ~/.claude/plugins/marketplaces/<marketplace-name>/
    ├── .claude-plugin/
    │   └── marketplace.json      # 插件清单
    ├── skills/
    │   ├── pdf/
    │   │   ├── SKILL.md          # skill 主文件
    │   │   ├── reference.md      # 额外文档
    │   │   └── scripts/          # 可执行脚本
    │   ├── xlsx/
    │   └── ...
    └── README.md
    ```
  
  - **管理命令**
  
    ```bash
    /plugin marketplace list         # 查看已添加的 marketplace
    /plugin marketplace update       # 更新所有 marketplace
    /plugin enable <plugin-name>     # 启用插件
    /plugin disable <plugin-name>    # 禁用插件
    /plugin remove <plugin-name>     # 移除插件
    ```
  
    
  
- **<span style='color:orange'>手动放置到 skills 目录</span>**

  - **适用场景**

    1. 自己创建的 skill
    2. 从网上单独下载的 skill
    3. 快速测试或临时使用
    4. 不需要版本管理

  - **操作步骤**

    ```bash
    # 1. 创建 skills 目录（如果不存在）
    mkdir -p ~/.claude/skills/<skill-name>
    
    # 2. 放置 SKILL.md 文件
    # 将下载的 skill 文件放入该目录
    
    # 3. 重启 Claude Code 或开新会话，自动生效
    
    # 4. 使用 skill
    /<skill-name>
    ```

  - **文件存放位置**

    ```
    ~/.claude/skills/
    ├── my-custom-skill/
    │   └── SKILL.md              # 只需要这一个文件
    ├── another-skill/
    │   └── SKILL.md
    └── ...
    ```

  - **SKILL.md 基本格式**

    ```bash
    ---
    name: my-skill
    description: 这个 skill 的功能描述
    ---
    
    # Skill 标题
    
    这里写具体的指导内容...
    ```

##### **<span style='color:cornflowerblue'>2️⃣两种方式对比</span>**

| 对比项         | Marketplace 下载                  | 手动放置            |
| -------------- | --------------------------------- | ------------------- |
| **存放路径**   | `~/.claude/plugins/marketplaces/` | `~/.claude/skills/` |
| **启用方式**   | 需要 `/plugin enable`             | 自动加载            |
| **更新方式**   | `/plugin marketplace update`      | 手动更新            |
| **管理方式**   | 统一由 marketplace 管理           | 独立管理            |
| **适用场景**   | 官方/第三方包                     | 自建或单独下载      |
| **配置复杂度** | 较高                              | 简单                |



## 八、官方 Marketplace 介绍

**`C:\Users\zheng_hb\.claude\plugins\marketplaces`**

### **<span style='color:red'>claude-plugins-official</span>**

- **来源**：Anthropic 官方维护
- **内容**：100+ 插件（skills + MCP + LSP + hooks）
- **用途**：生产级工具、开发集成、第三方服务

**主要类别：**

- 开发工具：`agent-sdk-dev`, `mcp-server-dev`, `plugin-dev`
- LSP 支持：`typescript-lsp`, `rust-analyzer-lsp`, `gopls-lsp` 等
- 生产力：`asana`, `code-review`, `commit-commands`
- 安全：`security-guidance`, `aikido`

### **<span style='color:red'>anthropic-agent-skills</span>**

- **来源**：Anthropic 官方示例
- **内容**：17 个 skills
- **用途**：文档处理、学习参考

**包含的 Skills：**

| 插件包          | Skills                                                       |
| --------------- | ------------------------------------------------------------ |
| document-skills | xlsx, docx, pptx, pdf                                        |
| example-skills  | algorithmic-art, frontend-design, canvas-design, mcp-builder, skill-creator 等 |
| claude-api      | claude-api                                                   |

## 九、常见问题

### Q1: `/skills` 命令看不到下载的 skills？

**原因**：通过 marketplace 下载后，还需要 `/plugin enable` 启用。

**解决**：

```bash
/plugin enable <plugin-name>
```

### Q2: 手动放置的 skill 不生效？

**检查项**：

1. 文件夹名称和 SKILL.md 中的 `name` 是否一致
2. SKILL.md 是否有正确的 frontmatter（`---` 包围的元数据）
3. 是否重启了 Claude Code

### Q3: 如何判断下载的包放哪里？

- 包含 `marketplace.json` → 放 `plugins/marketplaces/`
- 只有 `SKILL.md` → 放 `skills/`

---

## 十、快速参考

```bash
# 查看可用 skills
/skills

# 查看插件状态
/plugin browse

# marketplace 相关
/plugin marketplace list
/plugin marketplace add <repo>
/plugin marketplace update

# 插件启用/禁用
/plugin enable <name>
/plugin disable <name>
```


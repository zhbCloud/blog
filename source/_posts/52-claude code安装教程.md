---
title: Claude Code 安装与配置指南
abbrlink: claudecodeinstall
date: 2026-02-23 01:30:00
img: /static/49.webp
categories: 工具
tags:
  - Claude
  - AI
---

### **<font color='red'>一、系统要求 (Prerequisites) </font>**

在开始之前，请确保你的系统满足以下要求：

#### **<font color='#10c300'>1-1、硬件与系统</font>**

| 项目          | 要求                                                                                              |
| :------------ | :------------------------------------------------------------------------------------------------ |
| **操作系统**  | macOS 13.0+<br>Ubuntu 20.04+ / Debian 10+<br>Windows 10+ (需配合 WSL 1, WSL 2 或 Git for Windows) |
| **硬件**      | 至少 4 GB RAM                                                                                     |
| **Shell环境** | 推荐使用 Bash 或 Zsh                                                                              |

#### **<font color='#10c300'>1-2、账号与网络</font>**

- **账号要求**：需要 **Claude Pro** 或 **Team** 订阅才能使用 Claude Code
- **网络**：稳定的互联网连接（中国大陆用户需特殊网络配置，详见第五章）

![SR-IOV设置示意图](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130012622312.png)

<br>

### **<font color='red'>二、安装步骤 (Installation) </font>**

根据你的操作系统选择对应的安装命令。

#### **<font color='#10c300'>2-1、macOS, Linux, WSL</font>**

在终端中执行：

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

<br>

#### **<font color='#10c300'>2-2、Windows</font>**

##### **<font color='cornflowerblue'>1）PowerShell (推荐)</font>**

```powershell
irm https://claude.ai/install.ps1 | iex
```

##### **<font color='cornflowerblue'>2）CMD</font>**

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

> **⚠️ 网络注意事项：**
> 由于网络环境限制，国内用户在安装过程中可能会失败。
> **解决方案**：请确保开启网络代理工具，并启用 **TUN 模式** 以确保终端流量被正确代理。

<br>

### **<font color='red'>三、环境配置 (Configuration) </font>**

#### **<font color='#10c300'>3-1、配置环境变量</font>**

安装完成后，如果系统提示无法识别 `claude` 命令，你需要手动配置环境变量。

1.  **打开系统属性**：
    按下 `Win + R`，输入 `sysdm.cpl` 并回车（或搜索“编辑系统环境变量”）。

2.  **添加路径**：
    点击“高级”选项卡 -> “环境变量”。在 `Path` 中添加 Claude Code 的安装路径。

    ![环境变量配置示例](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130012118216.png)

<br>

#### **<font color='#10c300'>3-2、验证安装</font>**

打开新的终端窗口，执行：

```bash
claude -v
```

如果显示版本号，则表示配置成功。

![版本验证](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130012255180.png)

<br>

### **<font color='red'>四、登录与初始化 (Initialization) </font>**

#### **<font color='#10c300'>4-1、启动登录</font>**

在终端执行：

```bash
claude auth login
```

#### **<font color='#10c300'>4-2、配置偏好</font>**

- **代码风格**：按需选择或直接回车保持默认。
  ![代码风格选择](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130013315135.png)

- **登录方式**：选择默认方式（通常是浏览器验证），浏览器会自动打开授权页面，确认授权即可。
  ![官网授权](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260130013435258.png)

<br>

### **<font color='red'>五、常见问题排查 </font>**

#### **<font color='#10c300'>5-1、TUN模式无法上网 / DNS 错误</font>**

**现象描述**：
开启代理软件的 TUN 模式后，网络连接断开，但系统代理模式下正常。日志显示 `all DNS requests failed` 或 `tcp4 failed`。

**原因分析**：
这通常与网卡设置有关，特别是网卡是否支持或开启了 **SR-IOV**（单根输入/输出虚拟化）。

<br>

#### **<font color='#10c300'>5-2、解决方案（以 ROG 主板 Bios 为例）</font>**

1.  重启电脑，进入 BIOS (F2 或 Del)。
2.  进入 **Advanced Mode (高级模式)** -> **Advanced (高级)**。
3.  进入 **PCI Subsystem Settings** 菜单。
4.  将 **SR-IOV Support** 开启 (**Enabled**)。
5.  F10 保存并重启。

<br>

### **<font color='red'>六、终端中使用 Claude Code 接入阿里云百炼 GLM-5</font>**

详细说明了在终端（CLI）中使用官网安装的 `claude` 命令行工具，并配置阿里云百炼 **Coding Plan 专属 API Key** 以原生调用 **GLM-5** 模型的完整步骤。这使得你无需依赖 Anthropic 官网账单便能享受到强大的 AI 辅助编程能力。



#### **<font color='#10c300'>6.1、前提条件</font>**

1. **已经全局安装 Claude Code 核心 CL**

2. **跳过 Anthropic 登录**：如果首次启动强制要求登录 Anthropic 账户，找到 `C:\Users\你的用户名\.claude.json` 文件，将内容设置为

   ```json
   {
     "hasCompletedOnboarding": true
   }
   ```

3. **获取 API Key**：你需要进入[阿里云百炼控制台 Coding Plan 页面](https://bailian.console.aliyun.com/cn-beijing/?tab=model#/efm/coding_plan)订阅并获取专属的 API Key（格式为 `sk-sp-****`）。

#### **<font color='#10c300'>6.2、全局环境变量配置（永久生效）</font>**

Claude Code 在无界面认证时需要读取终端的环境变量以发起请求。为了防止**每次重启终端后配置丢失**，建议使用 PowerShell 修改系统级（或用户级）环境变量。

**<font color='cornflowerblue'>第一步：打开 PowerShell 终端运行配置命令</font>**

粘贴并运行以下完整的环境变量设置命令：

```powershell
# 1. 配置你的 Coding Plan 专属 API Key（请替换为你自己的 key）
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-sp-75af544fcd5d4cd9bf2c7e0148555a5a", [EnvironmentVariableTarget]::User)

# 2. 配置 Coding Plan 专属的 Base URL
[Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://coding.dashscope.aliyuncs.com/apps/anthropic", [EnvironmentVariableTarget]::User)

# 3. 智能模型调度配置（推荐）

# 配置后无需手动切换模型，Claude Code 会根据任务难度自动在这 3 个模型间切换，帮你节省额度和提高加载速度：
# 复杂度极高的任务（如分析整个项目架构） -> 使用最强模型 GLM-5
[Environment]::SetEnvironmentVariable("ANTHROPIC_DEFAULT_OPUS_MODEL", "glm-5", [EnvironmentVariableTarget]::User)

# 日常编写大段代码、实现功能的核心任务 -> 使用主模型 GLM-5
[Environment]::SetEnvironmentVariable("ANTHROPIC_DEFAULT_SONNET_MODEL", "glm-5", [EnvironmentVariableTarget]::User)

# 简单的文件检索、拼写检查等打杂任务 -> 使用精简极速的 qwen3-coder-next
[Environment]::SetEnvironmentVariable("ANTHROPIC_DEFAULT_HAIKU_MODEL", "qwen3-coder-next", [EnvironmentVariableTarget]::User)

# （注：配置了上方 3 个细分变量后，不要再配置全局的 ANTHROPIC_MODEL，以免被强行覆盖）
```

**注意：** 这些变量已被永久写入操作系统的**用户环境变量**中。

**<font color='cornflowerblue'>第二步：彻底重启终端（非常关键！）</font>**

由于当前正在运行的 PowerShell 或内嵌终端（如 VS Code 终端）**不会自动重载**底层外部环境变量：

1. 请完全关闭当前的控制台/终端窗口（如果你在 VS Code 里面，请完全关闭整个 VS Code 软件）。
2. **重新打开一个新的终端窗口**。

最佳方式可直接重启电脑

**<font color='cornflowerblue'>第三步：运行与验证</font>**

在重新打开的新终端中进入你的代码项目目录。

**1.  验证变量生效**

在终端中执行测试命令检查：

```powershell
echo $env:ANTHROPIC_API_KEY
```

如果成功输出你的专属 API Key（如 `sk-sp-75af5...`），说明配置已经**永久生效**！

**2.  启动终端版 Claude Code**

在终端直接输入：

```bash
claude
```

此时你将跳过复杂的 Anthropic 官方验证拦截，直接在终端里启动对话交互模式，开始向 GLM-5 提问和辅助阅读源码、生成文件。

#### **<font color='#10c300'>6.3、（可选）体验项目级局部配置</font>**

如果你不想污染系统环境变量，或者想在不同项目间切换不同模型，Claude Code 也支持在你的项目根目录新建一个名为 `settings.json`（或全局的 `~/.claude.json`）并写入如下配置：（建议直接配置在 `~/.claude.json`中，这是目前我自己使用的方式）

```json
{
    "env": {
        "ANTHROPIC_API_KEY": "sk-sp-75af544fcd5d4cd9bf2c7e0148555a5a",
        "ANTHROPIC_BASE_URL": "https://coding.dashscope.aliyuncs.com/apps/anthropic",
        // 配置后无需手动切换模型，Claude Code会根据任务难度自动在这3个模型间切换，帮你节省额度和提高加载速度
        // 复杂度极高的任务（如分析整个项目架构） -> 使用最强模型 GLM-5
        "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5",
        // 日常编写大段代码、实现功能的核心任务 -> 使用主模型 GLM-5
        "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-5",
        // 简单的文件检索、拼写检查等打杂任务 -> 使用精简极速的 qwen3-coder-next
        "ANTHROPIC_DEFAULT_HAIKU_MODEL": "qwen3-coder-next"
    },
    "hasCompletedOnboarding": true
}
```

提示： `hasCompletedOnboarding: true` 用于跳过由于没有官方账号造成的强制登录流程。

#### **<font color='#10c300'>6.4、常见问题排查</font>**

**Q1：输入 `claude` 依然提示 `Could not resolve authentication method...`？**

- **原因：** VS Code 终端仍在使用旧的环境变量进程缓存。

- **解决：** 必须完全退出并关闭 VS Code 主程序，或者在当前终端立刻运行一条**临时热加载命令**：

  ```powershell
  $env:ANTHROPIC_API_KEY="你的API_KEY"; $env:ANTHROPIC_BASE_URL="https://coding.dashscope.aliyuncs.com/apps/anthropic"; $env:ANTHROPIC_MODEL="glm-5"; claude
  ```

**Q2：想切换到其他支持的模型？**

- 阿里云百炼 Coding Plan 还支持 `qwen3.5-plus`, `kimi-k2.5`, `qwen3-coder-next` 等。
- 在运行中的 `claude` 会话内，只需输入 `/model <模型名>` 即可迅速无缝切换。例如：`/model qwen3.5-plus`。






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

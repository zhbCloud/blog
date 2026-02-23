---
title: Git使用SSH拉取代码配置指南
abbrlink: 65464545tryt435
date: 2026-02-23 00:00:00
img: /static/47.webp
categories: 工具
tags:
  - Git
  - SSH
  - 版本控制
---

### **<font color='red'>一、配置 Git 用户信息</font>**

这些信息会记录在**每次 Git 提交（commit）**中，用于标识"谁提交了这段代码"。

```bash
git config --global user.name 'zhenghong'
git config --global user.email '772198520@qq.com'
```

<br>

**验证当前配置**

```bash
git config --global --list
```

![image-20260119231528481](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260119231528481.png)

<br>

### **<font color='red'>二、生成 SSH 密钥</font>**

```bash
ssh-keygen -t rsa -C '772198520@qq.com'
# 或使用更安全的 ed25519 算法（推荐）
ssh-keygen -t ed25519 -C '772198520@qq.com'
```

连续按 3 次回车（使用默认路径和空密码）

![image-20260119231535380](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260119231535380.png)

<br>

### **<font color='red'>三、查看并复制公钥</font>**

默认生成秘钥的位置C:\Users\zheng_hb\.ssh

```bash
type C:\Users\zheng_hb\.ssh\id_rsa.pub
# 或（如果用 ed25519）
type C:\Users\zheng_hb\.ssh\id_ed25519.pub
```

![image-20260119232637916](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260119232637916.png)

<br>

### **<font color='red'>四、添加公钥到 Git 平台</font>**

**以GitHub为例**

1. 登录 GitHub
2. 点击头像 → Settings → SSH and GPG keys
3. 点击 "New SSH key"
4. 粘贴公钥内容，保存

![image-20260119232647077](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260119232647077.png)

<br>

### **<font color='red'>五、测试连接</font>**

```bash
# GitHub
ssh -T git@github.com

# GitLab
ssh -T git@gitlab.com

# Gitee
ssh -T git@gitee.com            
```

成功返回示例：

```bash
Hi zhbCloud! You've successfully authenticated...
```

<br>

### **<font color='red'>六、克隆代码</font>**

```bash
git clone git@github.com:username/repository.git
```

<br>

### **<font color='red'>七、如果之前克隆的是 HTTPS 仓库</font>**

需要将远程地址改为 SSH 格式

```bash
# 查看当前远程地址
git remote -v

# 查看结果
origin  https://github.com/zhbCloud/仓库名.git (fetch)
origin  https://github.com/zhbCloud/仓库名.git (push)

# 改为 SSH
git remote set-url origin git@github.com:zhbCloud/仓库名.git

# 验证修改
git remote -v

# 修改成功
origin  git@github.com:zhbCloud/仓库名.git (fetch)
origin  git@github.com:zhbCloud/仓库名.git (push)
```

<br>

**TortoiseGit中修改**

![image-20260119232657035](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260119232657035.png)

<br>

### **<font color='red'>八、解决 TortoiseGit SSH 认证问题</font>**

TortoiseGit 使用的是 **PuTTY** 的 SSH 客户端，而命令行用的是 **OpenSSH**，它们的密钥格式不兼容！

![image-20260119232701820](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260119232701820.png)

<br>

**让 TortoiseGit 使用 OpenSSH**

```bash
# 配置 TortoiseGit 使用 Git 的 SSH
右键 → TortoiseGit → Settings
→ Network
→ SSH Client: 修改为 Git 的 ssh.exe 路径
```

<br>

**常见ssh.exe路径**

```bash
C:\Program Files\Git\usr\bin\ssh.exe
# 或者直接写
ssh.exe
```

![image-20260119232709254](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260119232709254.png)

<br>


---
title: Hyper-V虚拟机详细安装教程
abbrlink: hyper-v-install
date: 2026-02-23 10:00:00
img: /static/46.webp
categories: 后端与运维
tags:
  - Hyper-V
  - 虚拟机
  - Windows
---

### **<font color='red'>一、Hyper-V简介 </font>**

#### **<font color='#10c300'>1-1、什么是Hyper-V</font>**

Hyper-V 是微软开发的原生虚拟化平台，内置于 Windows 专业版、企业版和教育版系统中。它允许用户在单台物理计算机上创建和管理多个虚拟机，每个虚拟机都可以运行独立的操作系统。

<br>

#### **<font color='#10c300'>1-2、虚拟机软件对比</font>**

下表对比了目前主流的虚拟机软件，帮助您选择合适的虚拟化解决方案：

![image-20260118191245387](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260118191245387.png)

**`注意：Hyper-V 作为 Windows 系统自带的虚拟化工具，无需额外安装第三方软件，性能优秀且与 Windows 系统集成度高。`**

<br>

### **<font color='red'>二、系统要求与准备 </font>**

#### **<font color='#10c300'>2-1、Windows版本要求</font>**

Hyper-V 功能仅支持以下 Windows 版本：

- Windows 10 专业版/企业版/教育版
- Windows 11 专业版/企业版/教育版
- Windows Server 2016 及以上版本

**`注意：Windows 家庭版不支持 Hyper-V 功能。如果您使用的是家庭版，需要升级到专业版。可以从官方渠道或电商平台购买升级密钥。`**

查看当前系统版本：

![image-20260118191729848](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260118191729848.png)

<br>

#### **<font color='#10c300'>2-2、硬件要求</font>**

使用 Hyper-V 需要满足以下硬件条件：

- **处理器：** 64位处理器，支持二级地址转换（SLAT）
- **内存：** 至少 4GB RAM（建议 8GB 以上）
- **存储空间：** 根据虚拟机数量和用途，建议预留 50GB 以上
- **BIOS设置：** 需要在 BIOS 中启用虚拟化技术（Intel VT-x 或 AMD-V）

<br>

#### **<font color='#10c300'>2-3、准备安装镜像</font>**

在创建虚拟机之前，需要下载操作系统的 ISO 镜像文件。本教程以 Windows 10 为例：

- [下载 Windows 10 官方镜像](https://www.microsoft.com/zh-cn/software-download/windows10)
- [下载 Windows 11 官方镜像](https://www.microsoft.com/zh-cn/software-download/windows11)

也可以下载 Linux 发行版（如 Ubuntu、CentOS）的 ISO 镜像文件用于安装。

<br>

### **<font color='red'>三、启用Hyper-V功能 </font>**

#### **<font color='#10c300'>3-1、通过Windows功能启用</font>**

##### **<font color='cornflowerblue'>1）打开Windows功能</font>**

在 Windows 搜索框中输入"**启用或关闭Windows功能**"或"**功能**"，打开 Windows 功能设置窗口。

<br>

##### **<font color='cornflowerblue'>2）勾选Hyper-V选项</font>**

在 Windows 功能列表中，找到并勾选以下选项：

- **Hyper-V**
  - Hyper-V 管理工具
  - Hyper-V 平台

![image-20260118191918620](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260118191918620.png)

点击"**确定**"按钮，系统将自动安装 Hyper-V 相关组件。

<br>

##### **<font color='cornflowerblue'>3）重启计算机</font>**

安装完成后，系统会提示重启计算机。点击"**立即重启**"使 Hyper-V 功能生效。

**`注意：重启后 Hyper-V 服务会自动启动，您可以在开始菜单中找到"Hyper-V 管理器"。`**

<br>

#### **<font color='#10c300'>3-2、通过PowerShell启用（可选）</font>**

也可以使用 PowerShell 命令快速启用 Hyper-V：

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

执行命令后，同样需要重启计算机。

<br>

### **<font color='red'>四、创建和配置虚拟机 </font>**

#### **<font color='#10c300'>4-1、打开Hyper-V管理器</font>**

在开始菜单中搜索并打开"**Hyper-V 管理器**"。Hyper-V 管理器是管理所有虚拟机的控制台。

<br>

#### **<font color='#10c300'>4-2、新建虚拟机</font>**

##### **<font color='cornflowerblue'>1）启动新建虚拟机向导</font>**

在 Hyper-V 管理器中，点击右侧的"**新建**" > "**虚拟机**"，启动新建虚拟机向导。

<br>

##### **<font color='cornflowerblue'>2）指定名称和位置</font>**

为虚拟机指定一个有意义的名称（如"Win10-Dev"），并选择虚拟机文件的存储位置。

**`建议：选择空间充足的磁盘驱动器存储虚拟机文件。`**

![image-20260118193131223](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260118193131223.png)

<br>

##### **<font color='cornflowerblue'>3）指定代数</font>**

选择虚拟机代数：

- **第一代：** 适用于较旧的操作系统（如 Windows 7、Windows Server 2008 及更早版本）
- **第二代：** 适用于较新的操作系统（如 Windows 8.1、Windows 10、Windows 11 及 Windows Server 2012 以上版本），支持 UEFI 启动

**本教程以安装 Windows 10 为例，选择"第一代"以获得更好的兼容性。**

![image-20260118193237778](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260118193237778.png)

**`注意：如果要安装 Windows 11，建议选择"第二代"虚拟机，因为 Windows 11 需要 UEFI 和 TPM 2.0 支持。`**

<br>

##### **<font color='cornflowerblue'>4）分配内存</font>**

为虚拟机分配内存。根据要安装的操作系统和用途决定内存大小：

- **Windows 10：** 建议至少 4GB（4096MB）
- **Windows Server：** 建议至少 4GB
- **Linux桌面版：** 建议至少 2GB

可以勾选"**为此虚拟机使用动态内存**"选项，让 Hyper-V 自动调整内存分配。

![image-20260118193445956](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260118193445956.png)

<br>

##### **<font color='cornflowerblue'>5）配置网络</font>**

选择默认的虚拟交换机。

![image-20260118193500644](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260118193500644.png)

<br>

##### **<font color='cornflowerblue'>6）连接虚拟硬盘</font>**

配置虚拟硬盘：

- **创建虚拟硬盘：** 指定虚拟硬盘大小（建议至少 60GB）和存储位置
- **使用现有虚拟硬盘：** 选择已有的 VHD/VHDX 文件
- **稍后附加虚拟硬盘：** 跳过此步骤，稍后再添加

本教程选择"**创建虚拟硬盘**"，设置大小为 60GB。

![image-20260118193653514](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260118193653514.png)

<br>

##### **<font color='cornflowerblue'>7）安装选项</font>**

选择操作系统的安装方式：

- **从可启动的 CD/DVD-ROM 安装操作系统：** 选择之前下载的 ISO 镜像文件
- **从网络安装操作系统：** 通过 PXE 网络启动安装
- **稍后安装操作系统：** 先创建虚拟机，稍后再安装

本教程选择"**从映像文件(.iso)安装操作系统**"，并浏览选择 Windows 10 的 ISO 镜像文件。

<br>

##### **<font color='cornflowerblue'>8）完成创建</font>**

检查所有配置信息，确认无误后点击"**完成**"按钮。虚拟机创建成功！

![image-20260118193735999](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260118193735999.png)

**`注意：此时虚拟机仅创建完成，还需要启动虚拟机并安装操作系统。`**

<br>

### **<font color='red'>五、启动和安装操作系统 </font>**

#### **<font color='#10c300'>5-1、启动虚拟机</font>**

在 Hyper-V 管理器中，右键点击新创建的虚拟机，选择"**启动**"。然后右键选择"**连接**"打开虚拟机控制台窗口。

<br>

#### **<font color='#10c300'>5-2、安装操作系统</font>**

虚拟机启动后，会自动从 ISO 镜像文件引导，进入操作系统安装程序。按照安装向导的提示完成操作系统安装：

1. 选择语言、时间和键盘输入法
2. 点击"**现在安装**"
3. 输入产品密钥（或选择"**我没有产品密钥**"跳过）
4. 选择操作系统版本
5. 接受许可条款
6. 选择"**自定义：仅安装 Windows（高级）**"
7. 选择虚拟硬盘并进行分区
8. 等待安装完成

<br>

#### **<font color='#10c300'>5-3、安装集成服务（可选）</font>**

对于 Windows 虚拟机，Hyper-V 集成服务通常会自动安装。集成服务提供了增强功能，如：

- 鼠标集成
- 时间同步
- 数据交换
- 心跳检测

对于 Linux 虚拟机，可能需要手动安装集成服务组件。

<br>

### **<font color='red'>六、常见问题与解决方案 </font>**

#### **<font color='#10c300'>6-1、无法启用Hyper-V</font>**

**问题：** 勾选 Hyper-V 选项后提示无法安装。

**解决方案：**

1. 检查 Windows 版本是否为专业版/企业版/教育版
2. 确认 CPU 支持虚拟化技术（Intel VT-x 或 AMD-V）
3. 进入 BIOS 设置，启用虚拟化功能（通常在 CPU Configuration 或 Advanced 选项中）

<br>

#### **<font color='#10c300'>6-2、虚拟机无法联网</font>**

**问题：** 虚拟机创建后无法访问网络。

**解决方案：**

1. 检查虚拟机网络适配器是否连接到虚拟交换机
2. 创建外部虚拟交换机并绑定到物理网络适配器
3. 检查虚拟机内部的网络配置（IP地址、DNS等）

<br>

#### **<font color='#10c300'>6-3、虚拟机性能较差</font>**

**问题：** 虚拟机运行缓慢，响应速度慢。

**解决方案：**

1. 增加虚拟机分配的内存和处理器核心数
2. 启用动态内存功能
3. 将虚拟硬盘存储在 SSD 固态硬盘上
4. 确保主机系统有足够的可用资源

<br>

#### **<font color='#10c300'>6-4、与其他虚拟化软件冲突</font>**

**问题：** 启用 Hyper-V 后，VMware 或 VirtualBox 无法使用。

**解决方案：**

Hyper-V 会独占虚拟化功能，无法与其他虚拟化软件同时运行。如需使用其他虚拟化软件，需要暂时禁用 Hyper-V：

```powershell
Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-Hypervisor
```

禁用后需要重启计算机。

<br>

### **<font color='red'>七、进阶配置与优化 </font>**

#### **<font color='#10c300'>7-1、快照功能</font>**

Hyper-V 支持虚拟机快照（检查点）功能，可以保存虚拟机的某个时刻的状态。在进行重要操作前创建快照，出现问题时可以快速恢复。

**创建快照：** 在虚拟机上右键选择"**检查点**"。

<br>

#### **<font color='#10c300'>7-2、导出和导入虚拟机</font>**

可以导出虚拟机用于备份或迁移到其他主机：

**导出：** 右键虚拟机 > "**导出**" > 选择导出路径

**导入：** 在 Hyper-V 管理器中选择"**导入虚拟机**"，选择导出的虚拟机文件夹。

<br>

#### **<font color='#10c300'>7-3、增强会话模式</font>**

启用增强会话模式可以获得更好的用户体验，支持剪贴板共享、文件拖放、USB 重定向等功能。

在虚拟机设置中启用"**增强会话模式**"选项即可。

<br>
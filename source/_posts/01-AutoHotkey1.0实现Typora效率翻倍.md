---
title: AutoHotkey1.0实现Typora效率翻倍
abbrlink: b949808a
date: 2025-02-18 23:03:54
img: /static/1.webp
categories: 工具
tags:
  - typora
  - autoHotkey
---



### **<font color='red'>一、AutoHotkey下载</font>**

[AutoHotkey官网](https://www.autohotkey.com/)

[AutoHotkey下载地址](https://autohotkey.com/download/ahk-install.exe)

[AutoHotkey 阿里网盘下载地址](https://www.alipan.com/s/cGRGz5MAL5q)

<br>

### **<font color='red'>二、Typora</font>**

[Typora中文站](https://www.typoraio.cn/)

[Typora下载地址](https://support.typoraio.cn/)

<br>

### **<font color='red'>三、AutoHotkey的安装方法</font>**

<font color='cornflowerblue'>1、启动AutoHotkey_xxx_setup.exe，选择自定义安装</font>

![image-20230417005020518](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502182304631.png)



<font color='cornflowerblue'>2、选择AutoHotkey与您电脑相配的程序</font>

![image-20230417005025447](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502182304518.png)



<font color='cornflowerblue'>3、更改安装路径</font>

![image-20230417005029254](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502182304798.png)

<font color='cornflowerblue'>4、点击【install】软件就会安装</font>

![image-20230417005033226](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502182304792.png)

<font color='cornflowerblue'>5、AutoHotkey安装完成</font>

![image-20230417005037721](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502182304621.png)



<br>

### **<font color='red'>四、Typora颜色快捷键</font>**

#### **<font color='#10c300'>4.1、快捷键脚本</font>**

新建后缀为ahk 文件 MyHotkeyScript.ahk，将以下代码复制进去

```js
#Requires AutoHotkey v1.1+
#IfWinActive ahk_exe Typora.exe

; Alt+1 红
!1::addOrReplaceFontColor("red")
; Alt+2 绿色
!2::addOrReplaceFontColor("#10c300")
; Alt+3 浅蓝
!3::addOrReplaceFontColor("cornflowerblue")
; Alt+4 橙
!4::addOrReplaceFontColor("orange")          
; Alt+W 去除颜色
!w::removeFontColor()
; Alt+Q 插入换行标签<br>
!q::
    SendInput {Text}<br>
return

#IfWinActive

;--------------------------------------
; 添加或替换颜色标签
;--------------------------------------
addOrReplaceFontColor(color) {
    clipboard := ""   ; 清空剪贴板
    ; 选中整行
    Send {Home}
    Send +{End}
    Send ^c
    ClipWait, 0.3

    if (clipboard != "") {
        text := clipboard
        ; 检查是否已有 **<font color='...'>...**
        if RegExMatch(text, "^\*\*<font\s+color=['""]([^'""]+)['""]>(.*)</font>\*\*$", m) {
            innerText := m2
            ; 去掉旧的 markdown ** 和 font 标签
            innerText := RegExReplace(innerText, "\*\*", "")
            ; 直接替换颜色，并保持 markdown 加粗
            text := "**<font color='" . color . "'>" . innerText . "</font>**"
        } else {
            ; 没有标签则添加 ** + font
            ; 去掉旧的 **
            text := RegExReplace(text, "\*\*", "")
            ; 去掉旧的 font
            text := RegExReplace(text, "<font[^>]*>", "")
            text := RegExReplace(text, "</font>", "")
            text := "**<font color='" . color . "'>" . text . "</font>**"
        }
        clipboard := text
        Send ^v
        Send {End}
    } else {
        ; 空行时插入标签，加粗占位
        newText := "**<font color='" . color . "'></font>**"
        SendInput {Text}%newText%
        ; 光标定位到 font 内部
        Send {Left 4} ; 把光标移到 </font> 前
    }
}



removeFontColor() {
    clipboard := ""
    ; 选中整行
    Send {Home}
    Send +{End}
    Send ^c
    ClipWait, 0.3

    if (clipboard != "") {
        cleaned := clipboard
        ; 去掉 <font> 标签
        cleaned := RegExReplace(cleaned, "<font[^>]*>", "")
        cleaned := RegExReplace(cleaned, "</font>", "")
        ; 去掉 Markdown 粗体 **
        cleaned := RegExReplace(cleaned, "\*\*", "")
        clipboard := cleaned
        Send ^v
        Send {End}
    }
}

```



#### **<font color='#10c300'>4.2、执行方式</font>**

**方式1：**

双击运行 MyHotkeyScript.ahk文件，然后去Typora 尝试一下快捷键

选择要设置颜色的文字，按Alt+1添加红色，按Ctrl+w取消样式！

**方式2：**

右键 `MyHotkeyScript.ahk` 脚本文件，点击`Compile Script`编译脚本成`exe`程序，就可以不用下载`Autohotkey`在其他电脑上运行了;

<br>

### **<font color='red'>五、设置开机自启动脚本</font>**

在系统启动文件夹C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup内粘贴 生成的autohotkey.exe文件

![image-20230417005044206](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202502182304666.png)


---
title: 移动端viewports剖析
abbrlink: 2d0d8782
date: 2025-06-22 15:51:08
img: /static/13.webp
categories: 性能与体验
tags:
  - 移动端
  - viewport
---

### **<font color='red'>一、移动设备浏览器的问题</font>**

设备的宽度是移动设备浏览器和桌面浏览器的最大区别。移动设备的显示通常比桌面浏览器显示同一网站的内容要少。或者缩放浏览器变小导致文字无法阅读，或者只显示网站适合设备大小的部分内容。

移动设备的屏幕宽度比桌面浏览器小，经常最大就400px宽，而且通常会更小。（有些手机号称大宽度，但他们确是在说谎 – 或起嘛给了我们一些无用的信息）

一些中间宽度的pad设备(table device)如iPad或传说中HP的webOS设备填补了桌面和移动设备的缺口，但却没有解决根本的问题。网站还是必须在移动设备上工作，我们不得不让她们在小屏幕上显示得表现良好。

问题的风暴中心在于CSS，特别是viewport的尺寸。如果我们只是拷贝桌面的样式到移动设备，我们的CSS会丑得崩溃（假设移动设备的宽度400px）我们回到width: 10%的侧边栏。如果在移动设备上同理处理，会显示出40px宽，实在太窄了。你的可变布局看起来被可怕的压扁了。

其中一个解决方式是为移动设备重新建设一个特殊的网站。即使跳开这些基本的问题：你到底该怎么处理，现实的问题是只有很少的站长准备好了加入迎合移动设备而做的改变。

移动设备浏览器供应商期望他们的客户端提供最好的可能性体验，即现在意味着“尽可能的像桌面浏览器”。因此许多处理手段是必须的。

<br>

### **<font color='red'>二、两种viewport</font>**

`虚拟的viewport即理想的viewport`
因此viewport太窄，不能很好为你的基本CSS布局服务了。最显然的解决方式是让viewport更宽。因此这个需求分为了2个方面：虚拟的viewport visual-viewport和布局的viewport layout-viewport。



George Cummins在Stack Overflow上解释了这个基本概念

> 想象下layout viewport是一张大的不能改变大小和角度的图片。现在你有个更小的框来观看这张大图片，这个框被不透明的材料包围，因而你只能看到大图片的一部分。你通过这个框子看到的大图片的部分被称为虚拟viewport(visual viewport)。你能拿着这个框站得离大图片远点（用户的缩小页面功能），以一次性看到这个大图片。或者你能站得近点（用户的放大页面功能）以看到一部分。你能改变这个框子的方向，但这张大图片的大小和形状都不会改变。

visual viewport是当前显示在屏幕上的部分页面。用户会滚动页面来改变可见部分，或者缩放浏览器来改变visual viewport的尺寸。见图
![](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212141.png)

**但是CSS 布局，特别是百分比的宽度（percentual widths）通常是按照layout viewport来定义，而比visual viewport宽很多。**

**然而`<html>`元素的宽度继承于layout viewport**，你的CSS应预先准备着需要处理的屏幕(layout viewport)是不是远远超过手机屏幕宽度。这用以保证你的网站外观特性而恰如在桌面浏览器上一样。

layout viewport到底有多宽？每个浏览器都不同。iPhone上的Safari使用980px、Opera 850px，安卓的Webkit核心800px，IE974px。**（现在大部分是980px）**

<font color='orange' size="4">一些浏览器有特别的特性：</font>

- 塞班webkit试着保存`layout viewport`和`visual viewport`同样宽度。因此，定义百分比宽度的元素会变得巨难看。当然，如果页面有特定的宽度而不是适合`visual viewport`的宽度，那么该宽度的最大值会被设置为850px
- 三星的WebKit([bada](https://zh.wikipedia.org/zh/Bada_(操作系统))上)会设置`layout viewport`和最宽的元素一样宽
- 黑莓上`layout viewport`和`visual viewport`在100%缩放时一样宽。

<br>

### **<font color='red'>三、缩放 </font>**

两种viewports都以CSS的 pixels来度量。当你通过缩放改变visual viewport时，layout viewport保存不变。

<br>

### **<font color='red'>四、理解layout-viewport</font>**

为了理解layout viewport的尺寸，我们先看下页面完全缩小时发生了什么。许多移动设备浏览器在初始默认打开以最小缩放模式打开网站。（即在手机屏幕上展示完整宽度的页面）。如图

![image-20231120102453927](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212336.png)

**重点**：浏览器已经选择好他们的layout viewport的尺寸，它完整的覆盖了最小缩放模式下的移动浏览器的屏幕。

这时候layout viewport的宽度高度和最小缩放模式下能在页面上显示的内容的宽度高度一致。即便用户缩放，它依然保存不变。如图

![image-20231120102827860](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212155.png)

layout viewport宽度通常保存不变。如果你旋转你的手机，visual viewport改变，但浏览器会缩放页面以自适应，以达到layout viewport再次和visual viewport同样宽。如图

![image-20231120102912002](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212017.png)

这影响到了layout viewport的高度，它突然变得比竖着模式更小（portrait model肖像模式），但web开发者并不关心高度，只在乎宽度。如图

![image-20231120103006036](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212662.png)

<br>

### **<font color='red'>五、度量layout-viewport</font>**

```js
document.documentElement.clientWidth/Height
```

- 含义：layoutviewport尺寸
- 度量：CSS的pixels
- 完整支持：Opera, iPhone, Android, Symbian, Bolt, MicroB, Skyfire, Obigo
- 问题：在Iris上它标示visualvieport
  - 三星的Webkit核心浏览器，仅当在页面上写入`<meta viewport>`标签，才正确表示。否则就代表着
  - FireFox以设备的pixels来度量
  - IE返回1024 x 768 px，而准确的尺寸保存在document.body.clientWidth/Height
  - NetFront仅当100%缩放时候才正确
  - 塞班的Webkit1(在S60v3设备)不支持这些属性
- 不支持：黑莓

很幸运浏览器由于浏览器大战而遗留给我们2个特性对来度量这两种viewport。



document.documentElement.clientWidth/Height传递layoutviewport的尺寸，如图

![image-20231120233647722](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212509.png)

旋转只关系到高度，而不是宽度。如图
![image-20231120234758785](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212074.png)

<br>

### **<font color='red'>六、度量visual-viewport</font>**

```
window.innerWidth/Height
```

- 含义：visualviewport尺寸
- 度量：CSS的pixels
- 完整支持：iPhone, Symbian, BlackBerry
- 问题：
  - FireFox和Opera以设备的pixels返回该数值
  - Android, Bolt, MicroB, 和 NetFront 以CSS的pixels返回该数值，且为layoutviewport的值
- 不支持：
  - IE，它使用document. documentElement. offsetWidh/Height来表示
  - 三星的Webkit核心浏览器，仅当在页面上写入`<meta viewport>`标签，才正确表示。否则就代表着`<html>`的尺寸
- 混乱：Iris, Skyfire, Obigo返回的值不知所云

我们使用window.innerWidth/Height来度量visualviewport。显然，随着用户缩放浏览器，这值会改变，更多、更少的CSS pixels放进了屏幕。如图

![image-20231120235042869](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212976.png)

很不幸这是一个待完善的部分，许多浏览器依然没有支持对visualviewport的度量。到现在为止，没有浏览器将该度量存储在其他地方，我猜测window.innerWidth/Height会成为标准，albeit是最强力的支持者。

<br>

### **<font color='red'>七、屏幕 Screen</font>**

```
screen.width and screen.height
```

- 含义：屏幕尺寸
- 度量：设备的pixels
- 完整支持：Opera Mini, Android, Symbian, Iris, Firefox, MicroB, IE, BlackBerry
- 问题：
  - Opera在Windows Mobile下只给出横向尺寸(landscape size)。在S60上工作正确。
  - 三星的Webkit核心浏览器，仅当在页面上写入`<meta viewport>`标签，才正确表示。否则就代表着`<html>`的尺寸
  - iPhone和Obigo仅给出竖直尺寸(portrait sizes)
  - Android, Bolt, MicroB, 和 NetFront 以CSS的pixels返回该数值，且为layoutviewport的值
- 不支持：
  - IE，它使用document. documentElement. offsetWidh/Height来表示 - 三星的Webkit核心浏览器，仅当在页面上写入`<meta viewport>`标签，才正确表示。否则就代表着`<html>`的尺寸
- 混乱：Iris, Skyfire, Obigo返回的值不知所云

和pc浏览器一样，screen.width/height标示了设备屏幕的尺寸，以设备的pixels度量。和pc浏览器一样，**作为web开发人员你永远不需要这些信息。你不关心屏幕的物理宽度，而关心当前有多少CSS的pixels能供你使用。**

![image-20231120235610610](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212161.png)

<br>

### **<font color='red'>八、缩放等级 Zoom level</font>**

无法直接获取缩放等级，但可以使用screen.width除以window.innerWidth来计算。当然，只有这两个特性被完美支持时才能使用。

幸运的是，缩放等级并不重要。你只需要知道当前有多少CSS的pixels能供你使用。你可以从window.innerWidth获取这些信息 – 如果当前浏览器支持。

<br>

### **<font color='red'>九、滚动位移 </font>**

```
window.pageX/YOffset
```

- 含义：见描述
- 度量：CSS的pixels
- 完整支持：iPhone, Android, Symbian, Iris, MicroB, Skyfire, Obigo
- 问题：
  - Opera, Bolt, Firefox, and NetFront 总是返回 0.
  - 三星的Webkit核心浏览器，仅当在页面上写入标签，才正确表示。
- 不支持： IE，它使用document. scrollLeft/Top来表示

你同意需要知道当前visual viewport相对于layout viewport的距离。这就是滚动位移，如同在桌面浏览器一样，使用window.pageX/YOffset存储。如图

![image-20231121000217840](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212319.png)

<br>

### **<font color='red'>十、`<html>`元素</font>**

```
document.documentElement.offsetWidth / Height
```

- 含义：html元素的整体尺寸
- 度量：CSS的pixels
- 完整支持：Opera, iPhone, Android, Symbian, Samsung, Iris, Bolt, Firefox, MicroB, Skyfire, BlackBerry, Obigo
- 问题：
  - NetFront只在100%缩放时返回正确的值.
  - IE，使用这个特性对来表示visualviewport的尺寸。它使用document. body. clientWidth/Height来表示

和在桌面系统一样,document.documentElement.offsetWidth/Height给出了

元素以CSS的pixels度量的尺寸。如图

![image-20231121000405958](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140212184.png)

<br>

### **<font color='red'>十一、viewport的meta标签 meta viewport</font>**

- 含义：设置layout viewport的宽度
- 度量：CSS的pixels
- 完整支持：Opera Mobile, iPhone, Android, Iris, IE, BlackBerry, Obigo
- 不支持：Opera Mini, Symbian, Bolt, Firefox, MicroB, NetFront
- 问题：
  - Skyfire 不能处理我的测试页面。
  - 在三星的wibkit浏览器下，出现会改变一些特性对的值。
  - Opera Mobile, iPhone, Samsung, and BlackBerry 不允许用户在设置viewport后再进行缩小操作（do not allow the user to zoom out.）

最后我们讨论`<meta name="viewport" content="width=320">`；最初这是Apple的一个html扩展标签，但被许多浏览器复用，**意义是设置layout viewport的宽度**。为了理解它的含义，我们退一步看看基础。

假设你创建一个页面，并不为它赋值width。那么它会伸展开来占据100%的layout-viewport的宽度。绝大多数浏览器缩小这个页面以在一屏的宽度上显示这个layout viewport。我们获得如下效果

![image-20231121000948509](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140213370.png)

用户会立马放大页面，虽然会起到效果，但绝大多数浏览器会保存元素完整的宽度（保持元素定位的不变），而导致阅读困难（文字超过屏幕），如图
![image-20231121001030014](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140213952.png)

(唯一不同的是Android下的Webkit核心浏览器，他会剪短长串文字的html元素，以让他们适应屏幕。这简直太有才了，我觉得其余所有浏览器都应该复用这个特性。我会在再以后全面的写这方面内容)

现在你可以尝试着设置`htm{width: 320px}`。现在`<html>`元素收缩，随之所有的会计元素都占有100%的`<html>`宽度：320px。当用户放大浏览器显示时这样做工作得挺好，但在最初加载时的缩小显示下，用户感觉很糟糕，因为页面几乎没内容。如图

![image-20231121001239413](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140213048.png)

为了解决这个问题，Apple引入了metaviewport。当你设置`<meta name="viewport" content="width=320">`,你网站的layout-viewport变成了320px。页面的初始状态就很正确了。如图

![image-20231121002003765](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/202405140213127.png)

你能任意设置layout-width的宽度，甚至包括device-width。device-width由以设备的pixels度量screen.width来设置。

在这里有个钩子（There’s a catch here）。有时严格的screen.width一点意义都没有，因为pixels的值太大了。例如，Nexus One上的严格宽度是480px，但Google的工程师觉得在用户设置device-width时，将layoutviewport设置为480太大了。他们砍成了2/3，提供320px，和iPhone上一致。

加入，像传言中，新的iPhone将提供一个巨大的pixel值（并不等于一个巨大的屏幕，只是分辨率），如果他们沿用这个特性：device-width为320，我一点都不会惊讶。或许最终device-width会直接意味着320px。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

转载于：https://www.w3cplus.com/css/viewports.html 

---
title: React Router 全面指南 (v6.4+ & v7)
img: /static/50.webp
categories: 前端开发
tags:
  - React
  - React Router
abbrlink: e2d3b4a5wq
date: 2026-02-11 11:00:00
---

# React Router 全面指南 (v6.4+ & v7)

> 📚 本指南旨在帮助开发者掌握 React Router 的最新特性 (v6.4+ Data APIs) 及企业级封装写法。

---

## 目录

1. [引言](#一引言)
2. [快速上手 (Data Router)](#二快速上手-data-router)
3. [路由核心基础 (Routing)](#三路由核心基础-routing)
4. [Data API (进阶)](#四data-api-进阶)
5. [封装式路由配置](#五封装式路由配置-best-practice)
6. [进阶与优化](#六进阶与优化)
7. [常见误区 (Common Pitfalls)](#七常见误区-common-pitfalls)
8. [总结](#八总结)

<br>

## **一、引言**

### **<font color='red'>1.1 为什么需要路由？ (SPA vs MPA)</font>**

在传统的多页应用 (MPA) 中，每次点击链接，浏览器都会向服务器请求一个新的 HTML 页面，导致页面刷新（白屏闪烁）。

**React Router** 帮助我们构建 **单页应用 (SPA)**：

1.  **无刷新跳转**：点击链接时，只通过 JavaScript 更新页面内容，无需重新加载整个页面。
2.  **体验如原生应用**：丝滑的页面切换效果。
3.  **URL 与 UI 同步**：通过 URL (`/about`) 直接定位到特定组件 (`<About />`)。

<br>

### **<font color='red'>1.2 React Router v6.4+ (Data APIs)</font>**

这是 React Router 的一次革命性更新，引入了 **Data APIs**。这不仅是定义路由的新方式，更解决了 React 应用中常见的“加载瀑布流”问题。

**核心优势：**

- **并行加载**：路由与数据获取并行进行，极大提升首屏速度。
- **配置化路由**：使用对象数组 (`createBrowserRouter`) 管理路由，比 JSX 写法更清晰、更易维护。
- **自动状态管理**：内置 `loading`、`error` 状态处理，减少大量样板代码。

---

<br>

## **二、快速上手 (Data Router)**

### **<font color='red'>2.1 安装</font>**

```bash
# 安装最新版 React Router DOM (包含了核心 React Router)
npm install react-router-dom localforage match-sorter sort-by
```

> **提示**：安装完成后，检查 `package.json` 中的 `dependencies`，确认版本号 `>= 6.4`。

<br>

### **<font color='red'>2.2 基本使用</font>**

与传统的组件式 (`<BrowserRouter>`) 不同，新版推荐使用对象配置。

**src/main.jsx:**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. 创建路由器实例 (Router Instance)
// 这里定义了 URL 路径与 React 组件的映射关系
const router = createBrowserRouter([
  {
    path: "/", // 访问根路径 http://localhost:5173/ 时
    element: <div>Hello world!</div>, // 渲染这个 JSX
  },
  {
    path: "/about", // 访问 http://localhost:5173/about 时
    element: <div>About</div>, // 渲染 About 组件
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* RouterProvider 组件用于包裹整个应用或路由部分，能直接生成路由界面 */}
    <RouterProvider router={router} />
    {/*  <App /> */}
  </React.StrictMode>,
);
```

---

<br>

## **三、路由核心基础 (Routing)**

<br>

### **<font color='red'>3.1 数据加载 (Loader)</font>**

> **注意**: 这里展示的是基础概念，更深入的 Data API 用法请参考 [第四章 Data API](#四-data-api-进阶)。

这是 Data APIs 的基础功能。它允许路由在渲染组件**之前**并行加载数据，彻底解决了 React 应用中常见的“瀑布流加载”问题。

**<font color='#00A6ED'>为什么使用 loader 而不是 verifyEffect？</font>**

- **传统方式 (useEffect)**: `加载组件 JS` -> `渲染组件(Loading)` -> `发起 Fetch` -> `等待数据` -> `渲染真实内容`。
- **Loader 方式**: `点击链接` -> `并行加载组件 JS 和数据` -> `渲染真实内容`。

**代码实现：**

```jsx
// 1. 定义数据加载函数 (Loader)
// 该函数会在路由跳转时自动执行，支持异步操作
export const homeLoader = async () => {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("Failed to load");
  return res.json(); // 返回的数据可以在组件中通过 useLoaderData 获取
};

// 2. 在路由配置中绑定
const routes = [
  {
    path: "/",
    element: <Home />,
    loader: homeLoader, // <--- 绑定 loader
    errorElement: <ErrorPage />, // 自动捕获 loader 抛出的错误
  },
  {
    path: "/user/:id",
    element: <User />,
    // loader 函数接收一个 params 对象
    loader: async ({ params }) => {
      const response = fetch(`/api/user/${params.id}`);
      return response.json()
    },
  },
  {
    path: "/detail/:id",
    element: <Detail />,
    loader: async ({ params }) => {
      const response = fetch(`/api/user/${params.id}`);
      const res = response.json()
      if(!res.token) { // 重定向
          throw redirect('/login')
      } else {
          return res
      }
    },
  },
];
```

**在组件中获取数据：**

组件内部无需处理 `loading` 状态，因为 loader 执行完才会渲染组件（除非使用了 `defer`）。

```jsx
import { useLoaderData } from "react-router-dom";

function Home() {
  const user = useLoaderData(); //直接获取 loader 返回的数据
  return <h1>Welcome, {user.name}</h1>;
}
```

<br>

### **<font color='red'>3.2 路由跳转 (Navigation)</font>**

React Router 提供了两种主要的跳转方式：声明式和编程式。

#### **<font color='#10c300'>1）声明式跳转</font>**

用于构建用户界面中的导航链接，类似于 HTML 的 `<a>` 标签，但不会刷新页面。

- **`<Link>`**: 基础链接组件。
- **`<NavLink>`**: 特殊的 Link，自动感知是否处于激活状态（常用于菜单）。

```jsx
import { Link, NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav>
      {/* 基础跳转 */}
      <Link to="/about">关于我们</Link>

      {/* 带有激活样式的跳转 (Active Style) */}
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        首页
      </NavLink>

      {/* replace: 替换当前历史记录，不留痕迹 */}
      <Link to="/login" replace>
        登录 (Replace)
      </Link>
    </nav>
  );
}
```

#### **<font color='#10c300'>2）编程式跳转</font>**

`useNavigate`在事件处理函数 (Event Handler) 或副作用 (Effect) 中执行跳转。

```jsx
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 基础跳转
    navigate("/dashboard");

    // 替换模式 (Replace)
    navigate("/home", { replace: true });

    // 后退/前进
    navigate(-1); // 后退一步
    navigate(1); // 前进一步
  };

  return <button onClick={handleLogin}>登录</button>;
}
```

<br>

### **<font color='red'>3.3 参数传递 (Params)</font>**

这是开发中最常见的需求，React Router 支持三种主要的传参方式。

#### **<font color='#10c300'>1）路径参数 (Path Params)</font>**

参数直接拼接在 URL 中，如 `/user/123`。

- **优点**：刷新页面参数不丢失，语义清晰。
- **定义**：需要在路由配置中定义占位符 `:id`。

**1️⃣路由定义：**

```jsx
// router/index.jsx
{
  path: "/user/:id", // :id 是参数占位符
  element: <UserPage />,
}
```

**2️⃣跳转传参：**

```jsx
<Link to="/user/123">查看用户 123</Link>;
// 或者
navigate("/user/123");
```

**3️⃣获取参数：**

```jsx
import { useParams } from "react-router-dom";

function UserPage() {
  const { id } = useParams(); // 获取到的 id 为 string 类型 "123"
  return <div>User ID: {id}</div>;
}
```

#### **<font color='#10c300'>2）查询参数 (Query Params)</font>**

参数以 key=value 形式拼接在 ? 后，如 `/list?page=1&sort=desc`。

- **优点**：无需修改路由定义，灵活多变。

**1️⃣跳转传参：**

```jsx
<Link to="/list?page=1&sort=desc">商品列表</Link>;
// 或者
navigate("/list?page=1&sort=desc");
```

**2️⃣获取参数：**

```jsx
import { useSearchParams } from "react-router-dom";

function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 获取
  const page = searchParams.get("page"); // "1"
  const sort = searchParams.get("sort"); // "desc"

  // 修改 (这会更新 URL 并重新渲染组件)
  const changeSort = () => {
    setSearchParams({ page: 1, sort: "asc" });
  };

  return <div>Page: {page}</div>;
}
```

#### **<font color='#10c300'>3）隐式状态 (State)</font>**

参数不显示在 URL 中，存储在 history state 对象里。

- **优点**：可传递对象、数组等复杂数据，URL 干净。
- **缺点**：**刷新页面不丢失**（很多误区认为会丢失，实际上 History State 刷新后依然存在），但**复制链接给别人会丢失数据**。

**1️⃣跳转传参：**

```jsx
<Link to="/profile" state={{ role: "admin", code: 9527 }}>
  个人中心
</Link>;
// 或者
navigate("/profile", { state: { role: "admin", code: 9527 } });
```

**2️⃣获取参数：**

```jsx
import { useLocation } from "react-router-dom";

function ProfilePage() {
  const location = useLocation();
  const { role, code } = location.state || {}; // 记得处理空值，防止直接访问报错

  return <div>Role: {role}</div>;
}
```

<br>

### **<font color='red'>3.4 嵌套路由与 Outlet</font>**

嵌套路由是 React Router 最核心、最强大的功能。它让我们能够将 UI 的嵌套结构与 URL 的路径结构完美对应。

#### **<font color='#10c300'>1）什么是嵌套路由？</font>**

在大多数应用中，界面通常是由多层嵌套的组件组成的。例如：

- **URL**: `/dashboard/settings`
- **UI**: 页面整体 -> 侧边栏布局 (`Parent`) -> 设置面板 (`Child`)

React Router 通过 **嵌套路由** 自动帮我们将这种 URL 映射为组件层级：
`/dashboard` -> 渲染 `<DashboardLayout />`
`/dashboard/settings` -> 在 `<DashboardLayout>` 内部渲染 `<Settings />`

#### **<font color='#10c300'>2）嵌套配置</font>**

我们在路由配置中使用 `children` 数组来定义子路由。

```jsx
// src/router/index.jsx
const router = createBrowserRouter([
  {
    path: "/dashboard", // 1. 父路由路径
    element: <DashboardLayout />, // 2. 父组件（通常是布局文件）
    // 3. 定义子路由数组
    children: [
      {
        index: true, // 默认子路由 (访问 /dashboard 时显示，默认子路由里面不能再嵌套子路由)
        element: <Stats />,
      },
      {
        path: "settings", // 子路由路径 (注意：不要加 / )
        element: <Settings />, // 访问 /dashboard/settings 时显示
      },
    ],
  },
]);
```

#### **<font color='#10c300'>3）父组件如何渲染子路由？</font>**

光配置了路由还不够，**父组件必须明确指定“子组件显示在哪里”**。如果不写 `<Outlet />`，子路由的内容将不会渲染。

```jsx
// src/layouts/DashboardLayout.jsx
import { Outlet, Link } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="layout">
      {/* 侧边栏导航 (始终显示) */}
      <nav>
        <Link to="/dashboard">概览</Link>
        <Link to="/dashboard/settings">设置</Link>
      </nav>

      <hr />

      <main className="content">
        {/* 🔥 关键点：子路由匹配到的组件 (Stats 或 Settings) 将会填入这个位置 */}
        <Outlet />
      </main>
    </div>
  );
}
```

#### **<font color='#10c300'>4）总结：路由匹配流程</font>**

当用户访问 `/dashboard/settings` 时：

1.  React Router 匹配到 `/dashboard` -> 渲染 `<DashboardLayout>`。
2.  React Router 继续匹配 `settings` -> 找到 `<Settings>` 组件。
3.  它将 `<Settings>` 组件作为 children 传递给 `<Outlet />`，最终页面结构如下：

```jsx
<DashboardLayout>
  <nav>...</nav>
  <main>
    <Settings /> {/* <-- 这里就是 Outlet 渲染的内容 */}
  </main>
</DashboardLayout>
```

<br>

### **<font color='red'>3.5 路由懒加载</font>**

随着应用规模的增长，打包后的 JavaScript 文件（Chunk）会变得越来越大，导致首屏加载缓慢。 **路由懒加载** 是优化 React 应用性能的关键手段。

#### **<font color='#10c300'>1）为什么要懒加载？</font>**

- **默认行为**：构建工具（如 Viper/Webpack）会将所有页面组件打包进一个巨大的 JS 文件中。即使有些页面用户可能永远不会访问，浏览器也必须先下载这些代码。
- **懒加载行为**：将代码分割成多个小块（Chunks）。**只有当用户点击跳转到特定路由时**，浏览器才去下载该页面对应的 JS 代码。

#### **<font color='#10c300'>2）核心 API：React.lazy & Suspense</font>**

React 原生提供了 `lazy` 函数来实现动态导入，配合 `Suspense` 组件处理加载状态。

```jsx
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// 1. 使用 lazy 动态导入组件 (注意：不要在组件内部声明)
const About = lazy(() => import("./pages/About"));

//  2. 使用 Suspense 包裹懒加载组件，fallback 用于显示加载中状态
// 方式1：
const router = createBrowserRouter([
  {
    path: "/about",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    ),
  },
]);

// 方式2：封装 Suspens(HOC高阶函数)
const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/about",
    element: withSuspense(About),
  },
]);

export default router;

// 方式3：可在整个路由入口使用Suspense 包裹所有路由组件(前提全部路由懒加载)
<Suspense fallback={<div>Loading...</div>}>
  <RouterProvider router={router} />
</Suspense>;
```

> **注意**：如果不使用 `Suspense` 包裹，React 在等待组件加载时会抛出错误，导致应用崩溃。

<br>

### **<font color='red'>3.6 路由模式</font>**

React Router 主要支持两种路由模式：**History 模式** 和 **Hash 模式**。在 Data API (v6.4+) 中，它们分别对应 `createBrowserRouter` 和 `createHashRouter`。

#### **<font color='#10c300'>1）History 模式 (推荐)</font>**

这是现代 Web 应用的标准模式，使用 HTML5 History API (`pushState`, `replaceState`) 来管理 URL。

- **表现**：URL 看起来像标准的路径，例如 `example.com/user/123`。
- **优点**：URL 美观，符合用户习惯；SEO 友好。
- **缺点**：**需要服务器配置支持**。因为是单页应用，当用户直接访问深层路径（如 `/user/123`）或刷新页面时，服务器必须返回 `index.html`，否则会出现 404 错误。

**代码示例：**

```jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // ...路由配置
]);

<RouterProvider router={router} />;
```

**服务器配置示例 (Nginx)：**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### **<font color='#10c300'>2）Hash 模式</font>**

使用 URL 的 Hash 部分 (`#`) 来模拟一个完整的 URL。

- **表现**：URL 带有 `#` 号，例如 `example.com/#/user/123`。
- **优点**：兼容性极好（支持老旧浏览器）；**不需要服务器额外配置**（因为 `#` 后面的内容不会发送给服务器）。
- **缺点**：URL 不够美观；SEO 较差；某些第三方登录回调可能不支持 Hash 路径。

**代码示例：**

```jsx
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  // ...路由配置
]);

<RouterProvider router={router} />;
```

#### **<font color='#10c300'>3）如何选择？</font>**

| 特性           | History 模式 (`createBrowserRouter`) | Hash 模式 (`createHashRouter`)            |
| :------------- | :----------------------------------- | :---------------------------------------- |
| **URL 外观**   | 美观 (`/path`)                       | 带井号 (`/#/path`)                        |
| **服务器配置** | **需要** (Nginx/Apache rewrite)      | **不需要**                                |
| **SEO**        | 友好                                 | 较差                                      |
| **部署难度**   | 中                                   | 低                                        |
| **推荐场景**   | 公网项目、企业级应用                 | 内部工具、演示 Demo、无法控制服务器配置时 |

#### **<font color='#10c300'>4）拓展</font>**

1️⃣History 模式下为什么需要服务器配置支持，为什么当用户直接访问深层路径（如 `/user/123`）或刷新页面时，服务器必须返回 `index.html`，否则会出现 404 错误。

答：当你直接在浏览器地址栏输入 http://example.com/user/123 并回车（或按刷新键）：

1. 浏览器：这被视为一次全新的访问。浏览器会老老实实向服务器发送一个 HTTP GET 请求："请给我 /user/123 这个文件"。
2. **服务器**：去它的硬盘文件系统里找
   - 它找有没有 user 文件夹？没有。
   - 它找有没有 user/123 文件？没有。
   - 它找有没有 user/123.html？也没有。
   - 因为 SPA 项目打包后，服务器上通常只有一个 index.html 和一堆 .js/.css 文件，根本不存在物理上的 /user/123 目录。
3. **结果**：服务器诚实地返回了 **404 Not Found**。

<br>

### **<font color='red'>3.7 404 页面配置</font>**

在 SPA 应用中，当用户访问了未定义的路径时，如果不做处理，页面可能会显示一片空白。我们需要配置一个 **Catch-All 路由** 来展示友好的 404 页面。

在 React Router v6 中，使用 `path: "*"` 即可匹配任意路径。由于 v6 内部有智能的路由排名算法（Ranking Algorithm），你不需要在这个路由上加 `exact`，也不强求将它放在路由数组的最后（但在 v5 中必须放在最后）。

#### **<font color='#10c300'>1）基础配置</font>**

```jsx
// src/router/index.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  // 🔥 404 路由配置（通常建议放在最后，便于阅读）
  {
    path: "*",
    element: <NotFound />,
  },
]);
```

#### **<font color='#10c300'>2）创建优雅的 404 组件</font>**

简单的 404 页面应该包含错误提示和返回首页的按钮。

```jsx
// src/pages/NotFound.jsx
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "72px" }}>404</h1>
      <p style={{ fontSize: "24px" }}>抱歉，您访问的页面不存在。</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate(-1)} style={{ marginRight: "10px" }}>
          返回上一页
        </button>

        <Link to="/">
          <button>回到首页</button>
        </Link>
      </div>
    </div>
  );
}
```

#### **<font color='#10c300'>3）重定向到首页</font>**

有时候我们不希望显示 404 页面，而是直接将用户重定向回首页（例如在后台管理系统中）。可以使用 `<Navigate>` 组件。

```jsx
{
  path: "*",
  element: <Navigate to="/" replace />, // replace: true 防止用户点击后退时陷入死循环
}
```

<br>

---

<br>

## **四、Data API (进阶)**

React Router 6.4+ 引入的 Data API 不仅仅是关于路由跳转，它提供了一套完整的**数据生命周期管理**方案。这使得我们可以在路由层面处理数据获取、提交和错误处理，大大减少组件内部的副作用代码。

### **<font color='red'>4.1 数据加载 (Loader)</font>**

> **注意**：Loader 的基础用法已在 [3.1 节](#31-数据加载-loader) 中介绍。

Loader 是 Data API 的读取端。它在路由渲染前运行，为组件提供数据。

**核心优势**：

1.  **并行加载**：路由组件和数据并行请求，消除瀑布流。
2.  **数据/UI 分离**：组件只负责接收数据渲染，不负责 Fetch。

<br>

### **<font color='red'>4.2 数据提交 (Action)</font>**

Action 是 Data API 的写入端，用于处理非 GET 请求（如 POST, PUT, DELETE）。它与 `<Form>` 组件配合，能在不手动编写 `onSubmit` 和 `fetch` 的情况下完成数据提交。

#### **<font color='#10c300'>1）定义 Action</font>**

```javascript
// src/pages/Login.jsx
import { redirect } from "react-router-dom";

export async function loginAction({ request }) {
  // 获取表单数据
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // 发起请求
  await fetch("/api/login", { method: "POST", body: JSON.stringify(data) });

  // 成功后重定向
  return redirect("/dashboard");
}
```

#### **<font color='#10c300'>2）绑定 Config</font>**

```javascript
// router/index.jsx
{
  path: "/login",
  element: <Login />,
  action: loginAction, // 👈 绑定 action
}
```

#### **<font color='#10c300'>3）使用 Form 组件</font>**

```jsx
import { Form } from "react-router-dom";

function Login() {
  return (
    <Form method="post">
      <input name="username" type="text" />
      <input name="password" type="password" />
      <button type="submit">登录</button>
    </Form>
  );
}
```

<br>

### **<font color='red'>4.3 无导航交互 (useFetcher)</font>**

通常点击链接或提交表单会导致页面跳转。但有些操作我们**不希望跳转页面**，比如：**点赞**、**加入购物车**、**Newsletter 订阅**。这时使用 `useFetcher`。

提供了 `fetcher.Form`、`fetcher.submit`、`fetcher.load` 等方法，可以在不导航的情况下触发 loader 或 action。

```jsx
import { useFetcher } from "react-router-dom";

function ProductItem({ product }) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      {/* 这里的提交不会导致页面跳转，但会触发 action 并自动重新验证页面数据 */}
      <fetcher.Form method="post" action="/add-to-cart">
        <input type="hidden" name="productId" value={product.id} />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "添加中..." : "加入购物车"}
        </button>
      </fetcher.Form>
    </div>
  );
}
```

<br>

### **<font color='red'>4.4 错误边界 (ErrorElement)</font>**

每个路由都可以定义一个 `errorElement`。当 `loader`、`action` 或组件渲染过程中抛出错误时，React Router 会捕获它并渲染 `errorElement`，而不是让整个页面白屏。

```javascript
{
  path: "/",
  loader: async () => {
    throw new Error("Oh no!");
  },
  element: <Home />,
  errorElement: <ErrorPage />, // 👈 用户将看到这个组件
}
```

---

<br>

## **五、封装式路由配置 (Best Practice)**

在真实项目中，我们将路由配置抽离到独立文件中管理，使其结构更清晰。

### **<font color='red'>5.1 目录结构</font>**

推荐在 `src/router` 目录下管理路由：

```
src/
├── main.jsx         <-- 入口文件
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
├── router/
│   └── index.jsx    <-- 路由配置文件
```

<br>

### **<font color='red'>5.2 路由配置文件</font>**

利用 `createBrowserRouter` 和 `lazy` 实现配置化与懒加载的完美结合。

```javascript
// src/router/index.jsx

import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// 懒加载页面组件
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));

// 加载中组件
const Loading = () => <div className="p-4">Loading...</div>;

// 路由表定义
const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/dashboard",
    element: Dashboard,
    // 嵌套路由配置
    children: [
      {
        path: "stats", // 路径为 /dashboard/stats   子路由不要加'/'
        element: <div>Stats View</div>,
      },
      {
        path: "settings", // 路径为 /dashboard/settings
        element: <div>Settings View</div>,
      },
    ],
  },
  // 404 路由处理
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

// 创建并导出路由实例
const router = createBrowserRouter(routes);

export default router;
```

<br>

### **<font color='red'>5.3 接入</font>**

```jsx
// App.jsx
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "./router";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
```

---

<br>

## **六、进阶与优化**

在封装式写法中，我们可以创建一个包装组件来保护路由。

### **<font color='red'>6.1 路由守卫 (Protected Routes)</font>**

```jsx
// components/AuthGuard.jsx
import { Navigate, useLocation } from 'react-router-dom';

export default function AuthGuard({ children }) {
  const isLogged = false; // 替换为真实的鉴权逻辑
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// src/router/index.js 使用
{
  path: '/admin',
  element: (
    <AuthGuard>
      <AdminPage />
    </AuthGuard>
  ),
}
```

<br>

### **<font color='red'>6.2 全局 Loading 状态</font>**

使用 `useNavigation` 监听全局路由跳转状态。

```jsx
import { useNavigation, Outlet } from "react-router-dom";

function RootLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && <GlobalSpinner />}
      <Outlet />
    </>
  );
}
```

---

<br>

## **七、常见误区 (Common Pitfalls)**

### **<font color='red'>7.1 错误使用 Layout 组件 (Context 丢失)</font>**

很多初学者容易犯的一个错误是：**将布局组件 (`Layout` / `Menu`) 防止在 `RouterProvider` 之外**。

**错误写法：**

```jsx
// App.jsx
function App() {
  return (
    <div className="app">
      <Layout /> {/* ❌ 错误：Layout 在 RouterContext 之外 */}
      <RouterProvider router={router} />
    </div>
  );
}
```

**问题后果：**

1.  **无法使用 `<Link>` / `<NavLink>`**：点击菜单会报错 `useHref() may be used only in the context of a <Router> component.`
2.  **无法使用 hooks**：`useLocation`、`useNavigate` 等 Hook 均无法工作。
3.  **路由状态无法共享**：布局组件无法感知当前的路由变化。
4.  如果Layout中是固定的内容，不涉及路由跳转等，布局组件则可以写在 `RouterProvider` 之外

**最佳实践**：是利用 **嵌套路由 (Nested Routes)** 和 `<Outlet />`。

**第一步：创建布局组件 (src/components/Layout.jsx)**

利用 `<Outlet />` 渲染子路由内容：

```jsx
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <nav>
        <Link to="/">首页</Link> | <Link to="/about">关于</Link>
      </nav>
      <hr />
      {/* 子路由的内容将渲染在这里 */}
      <Outlet />
    </div>
  );
}

export default Layout;
```

**第二步：配置嵌套路由 (src/router/index.jsx)**

```jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import About from "../pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 1. 根路径渲染布局
    children: [
      // 2. 子路由渲染在 Layout 的 Outlet 中
      {
        index: true, // 默认子路由 (对应 path: "/")
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
```

**第三步：入口文件 (src/main.jsx)**

入口文件保持简洁，只需注入 `router`：

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/*  默认这里是APP组件，也可以将<RouterProvider router={router} />写到APP组件中去 */}
    {/*  <App /> */}
  </React.StrictMode>,
);
```

---

<br>

## **八、总结**

React Router v6.4+ 定义了现代 React 应用的路由标准：

1.  **使用 `createBrowserRouter`** 进行集中式路由管理。
2.  **利用 `loader`** 提前加载数据，提升首屏体验。
3.  **结合 `Suspense` 和 `lazy`** 实现代码分割。
4.  **目录结构规范化**，将路由逻辑与 UI 组件分离。

掌握这套模式，你将能构建出性能更优、架构更清晰的 React 应用。

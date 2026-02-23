---
title: React Redux 全面指南 (RTK)
img: /static/redux.webp
categories: 前端开发
tags:
  - React
  - Redux
  - RTK
abbrlink: rtk-guide-2026
date: 2026-02-22 15:30:00
---

# React Redux 全面指南 (Redux Toolkit)

> 📚 本指南旨在带你从零开始 Mastering React Redux，特别是现代标准的 **Redux Toolkit (RTK)** 写法。

---

## 目录

1. [基础篇：RTK 核心与快速上手](#一基础篇rtk-核心与快速上手)
2. [进阶篇：复杂状态与异步逻辑](#二进阶篇复杂状态与异步逻辑)
3. [高级篇：RTK Query 与性能优化](#三高级篇rtk-query-与性能优化)

<br>

## **一、 基础篇：RTK 核心与快速上手**

> [!NOTE]
>
> 1. **Store**：用来存数据的。
> 2. **Reducer**：是一个函数，用来处理数据的。
> 3. **Action**：是一个具有 `type` 字段的普通对象，用来描述要进行什么操作。
> 4. **Action Creator**：创建并返回 Action 对象的函数。
> 5. **Dispatch**：更新 State 的唯一方法，调用 `store.dispatch(action)`。

![image-20260213092945181](https://picgo-2024.oss-cn-beijing.aliyuncs.com/img/image-20260213092945181.png)

<br>

### **<font color='red'>1.1 Redux 是什么？</font>**

Redux 是一个用于 JavaScript 应用的状态容器，提供可预测的状态管理。

- **单一数据源**：应用的所有状态都存储在一个对象树中。
- **状态是只读的**：唯一改变状态的方法是触发一个 **Action**。
- **使用纯函数修改**：编写 **Reducer** 来描述 Action 如何转换 State。

> [!TIP]
> **为什么使用 Redux Toolkit (RTK)？**
> 官方推荐！RTK 是现代 Redux 的标准写法。它解决了传统 Redux 配置复杂、样板代码多、需手动添加不可变逻辑等痛点。RTK 内置了 `Immer`（简化不可变更新）、`Thunk`（异步）、`DevTools` 等工具。

<br>

### **<font color='red'>1.2 安装</font>**

使用 Create React App 或 Vite 创建项目后，安装核心依赖：

```bash
npm install @reduxjs/toolkit react-redux
```

<br>

### **<font color='red'>1.3 核心概念与实战 (Counter Example)</font>**

我们将通过一个计数器应用来演示最核心的 API。

#### **<font color='#10c300'>1）第一步：创建 Slice (切片)</font>**

**Slice** 是 Redux 逻辑的集合（包含 State，Reducers，Actions）

`src\redux\modules\counterSlice.js`

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter", // Slice 名称，用于生成 Action Type 前缀
  initialState: {
    value: 0,
  },
  reducers: {
    // Redux Toolkit 允许我们在 reducer 中直接编写"可变"逻辑
    // 它底层使用 Immer 库将 these 操作转换为安全的不可变更新
    increment: (state) => {
      // 获取到的是initialState
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Action Payload 在 action.payload 中
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 自动生成 Action Creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 导出 Reducer
export default counterSlice.reducer;
```

#### **<font color='#10c300'>2）第二步：配置 Store</font>**

使用 `configureStore` 创建 Store，它会自动组合 Slice Reducers 并添加常用中间件。

`src\redux\store.js`

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from './modules/counterSlice'

export const store = configureStore({
    reducer: {
        counterSlice  // 这里的 key 'counterSlice' 将决定 state 中的属性名
    },
});
```

#### **<font color='#10c300'>3）第三步：注入 Store</font>**

在应用入口文件中，使用 `<Provider>` 将 Store 注入到 React 组件树中。

`src/main.jsx` (或 `index.js`):

```jsx
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

#### **<font color='#10c300'>4）第四步：在组件中使用 Hooks</font>**

React Redux 提供了两个主要的 Hooks：

- **`useSelector`**：从 Store 中读取数据。
- **`useDispatch`**：发送 Action 以触发状态更新。

`src\pages\Home.jsx`

```jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";

export function Counter() {
  // 读取 State：state.counter 对应 store 配置中的 reducer key
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className="row">
        <button
          className="button"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className="value">{count}</span>
        <button
          className="button"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className="row">
        <input
          className="textbox"
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="button"
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}
```

---

<br>

## **二、 进阶篇：复杂状态与异步逻辑**

实际应用远比计数器复杂。我们需要处理 API 请求、加载状态以及更复杂的数据结构。

### **<font color='red'>2.1 异步逻辑与数据请求：createAsyncThunk</font>**

对于初学者来说，Redux 的异步逻辑可能有点绕。我们先用一个生活中的例子来理解。

#### **<font color='#10c300'>1）为什么需要异步？</font>**

Redux 的标准 `dispatch` 是**同步**的：你点击按钮 -> 发送 action -> store 立即更新 -> 页面刷新。这一切发生在一瞬间。

但这就像你去快餐店，点完汉堡如果立刻就能拿走，那就是同步。但现实中，很多操作是**异步**的：

- **点外卖**：你下单（dispatch action），但饭不会立马到。你需要**等待**（loading），直到骑手送到（success）或者餐厅取消订单（failed）。
- **API 请求**：前端向服务器发起请求，服务器处理需要几百毫秒甚至几秒，这段时间内页面通常显示"加载中"。

Redux Toolkit (RTK) 提供了一个强大的工具 `createAsyncThunk` 来专门处理这种"下单 -> 等待 -> 收到结果"的流程。它不需要你手动配置复杂的中间件。

#### **<font color='#10c300'>2）实战：实现一个"模拟网络请求的加法"</font>**

假设我们有一个"异步加法"按钮，点击后需要等待 1 秒钟（模拟服务器响应），然后数字才会加 1。

**第一步：定义异步 Action (Thunk)**

在 `counterSlice.js` 中，我们创建一个"点外卖"的动作。

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// createAsyncThunk 接收两个参数：
// 1. Action 的名字前缀：'counter/fetchCount'。这就好比给你的订单起个名字。
// 2. 一个异步函数 (payloadCreator)：在这里发送网络请求。
// 需要导出供组件调用
export const incrementAsync = createAsyncThunk("counter/fetchCount", async(amount) => {
    // 模拟发送网络请求，等待 1 秒
    // 这里的 Promise 就像是你在等待外卖，pending 状态
    const response = await new Promise((resolve) =>
        setTimeout(() => resolve({ data: amount }), 1000),
    );
    // 请求成功！返回的数据（外卖到了）
    // 这个返回值会自动变成 action.payload 传给 extraReducers
    return response.data;
});
```

**第二步：监听状态变化 (Pending / Fulfilled / Rejected)**

当 `incrementAsync` 被 dispatch 触发时，Redux 会自动派发三种状态的 action，就像外卖订单的状态变化：

1.  **pending** (进行中)：外卖刚下单，正在做。
2.  **fulfilled** (成功)：外卖送到了。
3.  **rejected** (失败)：外卖被取消了（网络错误等）。

我们需要在 `createSlice` 的 `extraReducers` 字段中监听这些状态，并更新 store。

```javascript
// counterSlice.js
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    status: "idle", // 状态：'idle' (空闲) | 'loading' (加载中) | 'failed' (失败)
  },
  reducers: {
    // 这里放普通的同步 reducers (如 increment, decrement)
  },
  // extraReducers 专门用来处理由 createAsyncThunk 生成的 action
  // 这里的 builder 语法不仅类型安全，而且更清晰
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        // 1. 刚开始请求 (Pending)
        state.status = "loading"; // 标记状态为"加载中"，界面可以显示转圈圈
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        // 2. 请求成功 (Fulfilled)
        state.status = "idle"; // 恢复为空闲状态
        state.value += action.payload; // 把请求回来的数据加到 value 上
      })
      .addCase(incrementAsync.rejected, (state) => {
        // 3. 请求失败 (Rejected)
        state.status = "failed"; // 标记失败，界面可以显示错误提示
      });
  },
});
```

**第三步：在组件中使用**

组件中的写法和普通 action 一模一样，使用 `dispatch` 即可。我们可以利用 state 中的 status 来控制按钮的禁用状态。

```javascript
import { useDispatch, useSelector } from "react-redux";
import { incrementAsync } from "./counterSlice";
import { useState } from "react";

export function Counter() {
  const dispatch = useDispatch();
  // 获取当前状态，如果是 'loading'，我们可以禁用按钮
  const status = useSelector((state) => state.counter.status);
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className="row">{/* ... 其他按钮 ... */}</div>

      <div className="row">
        <input
          className="textbox"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="button"
          // 点击触发异步操作
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
          // 如果正在加载，禁用按钮防止重复点击，提升用户体验
          disabled={status === "loading"}
        >
          {status === "loading" ? "计算中..." : "异步加"}
        </button>
      </div>
    </div>
  );
}
```

**总结一下流程**：

1. **Dispatch**: 用户点击按钮 -> `dispatch(incrementAsync(5))`
2. **Pending**: Redux 自动触发 `pending` -> `status` 变为 `'loading'` -> 按钮变灰。
3. **Async Work**: `incrementAsync` 里的 `async` 函数开始执行（等待 1 秒）。
4. **Fulfilled**: 1 秒后 Promise 完成 -> Redux 自动触发 `fulfilled` -> `status`变回 `'idle'`，`value` 更新。
5. **Re-render**: 组件重新渲染，显示最新的数字。

<br>

### **<font color='red'>2.2 异步逻辑的代码优化</font>**

随着项目规模扩大，异步逻辑会变得臃肿。我们可以从**结构分离**、**职责单一**和**逻辑复用**三个维度进行优化。

#### **<font color='#10c300'>1. 分离 Async Thunk 定义</font>**

将所有 Thunk 放在 `Slice` 文件中会导致文件过长且容易引发**循环依赖**。建议将异步逻辑提取到独立文件中。

- `src/features/counter/counterThunks.js`: 定义异步操作。
- `src/features/counter/counterSlice.js`: 引入并处理状态。

```javascript
// counterThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountFromServer = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetch(`/api/count?amount=${amount}`);
    return await response.json();
  },
);
```

#### **<font color='#10c300'>2. 职责单一与精细化错误处理</font>**

- **职责单一**：Thunk 只负责“拿数据”。复杂的数据转换逻辑应放在 `reducer` 中，保持 Thunk 清洁。
- **错误处理**：使用 `rejectWithValue` 返回自定义错误载荷，以便在界面上展示更有意义的提示。

```javascript
export const updateUser = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAPI.update(userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data); // 返回后端错误信息
    }
  },
);
```

#### **<font color='#10c300'>3. 使用 addMatcher 减少样板代码</font>**

如果多个异步操作都有相同的 Loading 或 Error 处理逻辑，可以使用 `addMatcher` 进行统一拦截，避免在每个 `addCase` 中重复编写。

```javascript
// counterSlice.js
extraReducers: (builder) => {
  builder
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    // 统一处理所有以 '/pending' 结尾的异步 Action
    .addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.status = "loading";
      },
    )
    // 统一处理错误
    .addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      },
    );
};
```

`addMatcher` 在项目后期优化中非常强大，它可以让你像写“拦截器”一样统一管理全局的异步状态。

<br>

### **<font color='red'>2.3 综合案例</font>**

定义异步操作`src\redux\modules\counterThunks.js`

```js
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * 获取帖子数据
 */
export const getHistory = createAsyncThunk('counter/getHistory', async (params) => {
    const response = await fetch('/posts');
    const res = await response.json();
    return res;
});

/**
 * 获取评论数据
 */
export const getComments = createAsyncThunk('counter/getComments', async (postId) => {
    const response = await fetch(`/comments?postId=${postId}`);
    const res = await response.json();
    return res;
});

```

引入并处理状态`src\redux\modules\counterSlice.js`

```js
import { createSlice } from "@reduxjs/toolkit";
import { getHistory, getComments } from "./counterThunks";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    status: "idle", // 初始状态设为 idle
    value: [],
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 处理具体的成功逻辑
      .addCase(getHistory.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        // 假设评论数据存放在另一个字段
        state.comments = action.payload;
      })
      // 使用 addMatcher 统一处理所有 pending 状态
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        },
      )
      // 使用 addMatcher 统一处理所有 fulfilled 状态（仅更新状态部分）
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "idle";
        },
      )
      // 使用 addMatcher 统一处理所有 rejected 状态
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.status = "failed";
        },
      );
  },
});

export default counterSlice.reducer;
```

组件中使用`src\pages\Home.jsx`

```js
import { useSelector, useDispatch } from 'react-redux'
import { getHistory, getComments } from '../redux/modules/counterThunks'


function Home() {
    const { value, status, comments } = useSelector((state) => state.counterSlice)
    const dispatch = useDispatch()

    return (
        <>
            <h2>首页</h2>
            <button onClick={() => dispatch(getHistory({count: '5'}))}>数据请求</button>
            <button onClick={() => dispatch(getComments(1))}>获取评论</button>
            <hr />
            <p>状态：{status === 'loading' ? '加载中...' : status === 'idle' ? '空闲' : '失败'}</p>
            { value.map(item => <p key={item.id}>{item.title}</p>) }
            { comments.map(item => <p key={item.id}>{item.name}</p>) }
        </>
    )
}

export default Home;
```

<br>

### **<font color='red'>2.4 Redux DevTools</font>**

Redux 最强大的特性之一是调试体验。

- 安装 Chrome 扩展程序 **Redux DevTools**。
- RTK 的 `configureStore` 默认开启 DevTools。
- 你可以看到每一个 Action 的触发时间、Payload 内容以及 State 的差异 (Diff)。
- **时间旅行 (Time Travel)**：你可以点击 "Jump" 跳转到任意历史状态，重现 Bug 现场。

---

<br>

## **三、高级篇：RTK Query 与性能优化**

### **<font color='red'>3.1 RTK Query：数据获取的新标准</font>**

如果你的 Redux 主要用于**缓存服务器数据**，那么甚至不需要写 slice 和 thunk！
RTK Query 是 Redux Toolkit 包含的一个强大的数据获取和缓存工具。

**创建 API Slice (`src/features/api/apiSlice.js`):**

```javascript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // 在 store 中的 key
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: initialPost,
      }),
    }),
  }),
});

// 自动生成的 React Hooks
export const { useGetPostsQuery, useAddNewPostMutation } = apiSlice;
```

<br>

### **<font color='red'>3.2 性能优化：Memoization</font>**

每当 Redux Store 更新时，所有使用 `useSelector` 的组件都会重新计算。如果 selector 返回新的引用（即使数据内容相同），组件也会重渲染。

**使用 `createSelector` (Reselect) 创建记忆化 Selector:**

```javascript
import { createSelector } from "@reduxjs/toolkit";

const selectAllPosts = (state) => state.posts.posts;
const selectUserId = (state, userId) => userId;

export const selectPostsByUser = createSelector(
  [selectAllPosts, selectUserId],
  (posts, userId) => posts.filter((post) => post.user === userId),
);
```

- `createSelector` 创建的 selector 会缓存上次的输入和输出。
- 只有当输入（`posts` 或 `userId`）发生变化时，才会重新执行过滤逻辑。
- 这对于昂贵的计算或返回新引用（如 mapping/filtering 数组）的 selector 非常重要。

<br>

### **<font color='red'>3.3 目录结构最佳实践</font>**

推荐基于**功能 (Feature-based)** 的文件夹结构，而不是按文件类型（actions/reducers）分类。

```text
├── 📁 src/
│   ├── 📁 app/                # 全局配置 (Store, 路由配置)
│   │   └── store.js
│   ├── 📁 assets/             # 静态资源 (图片, 字体, 全局样式)
│   ├── 📁 components/         # 通用基础组件 (非业务 logic)
│   ├── 📁 features/           # 业务功能模块 (Slice + 业务组件 + API)
│   │   └── 📁 counter/        # 示例功能
│   │       ├── counterSlice.js
│   │       └── Counter.jsx
│   ├── 📁 hooks/              # 通用 Hooks (useAuth, useTheme 等)
│   ├── 📁 pages/              # 页面级组件 (路由入口)
│   ├── 📁 utils/              # 工具函数 (formatDate, validators 等)
│   ├── App.jsx                # 根组件
│   └── index.js               # 入口文件
```

**核心说明**：

- **Feature-first**: `features/` 目录是核心。将一个功能的所有相关代码（Slice, 组件, API）放在同一个文件夹下，保持高内聚。
- **Layered Structure**: `components/` 存放纯 UI 组件，`pages/` 存放页面容器，`features/` 存放业务逻辑，层次分明。

<br>

### **<font color='red'>3.4 总结</font>**

1.  **始终使用 Redux Toolkit**：不要再手写传统的 Redux 样板代码。
2.  **State 范式化**：尽量保持 State 扁平化，避免深层嵌套。
3.  **不要把所有数据都放进 Redux**：
    - Form state -> Local state (`useState`)
    - Server cache -> RTK Query
    - Global UI state / Shared data -> Redux Slice
4.  **TypeScript**：RTK 对 TypeScript 支持极佳，利用它可以获得强大的类型提示。

---

_Happy Coding with React & Redux!_

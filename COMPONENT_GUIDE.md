# Next.js 15 Server vs Client Components Guide

## Overview

Next.js 15 App Router introduces a new paradigm where **Server Components** are the default. This is different from your Next.js 12 experience where everything was client-side.

## What Are Interactive Components?

**Interactive components** are components that:
- Respond to user actions (clicks, typing, hovering)
- Change their state based on user interaction
- Use browser APIs (localStorage, geolocation, etc.)
- Need React hooks like `useState`, `useEffect`

## Server Components (Default)

### How They Work:
1. **Run on the server** during the request
2. **Fetch data directly** from databases/APIs
3. **Render to HTML** and send to browser
4. **No JavaScript** sent to client for these components
5. **Cannot be interactive** - no event handlers or state

### Example:
```tsx
// No 'use client' = Server Component
export default async function BlogPost() {
  // This runs on the server
  const post = await fetch('https://api.example.com/posts/1')
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* No onClick, no useState - just display */}
    </div>
  )
}
```

### When to Use:
- ✅ Displaying static content
- ✅ Fetching and showing data
- ✅ SEO-critical content
- ✅ Initial page structure
- ✅ Layouts and headers

## Client Components ('use client')

### How They Work:
1. **Run in the browser** after page loads
2. **JavaScript is sent** to the client
3. **Can be interactive** - handle events, use state
4. **Can use React hooks** and browser APIs
5. **Hydrated** on the client side

### Example:
```tsx
'use client' // This makes it a Client Component

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me! {/* This works - it's interactive */}
      </button>
    </div>
  )
}
```

### When to Use:
- ✅ User interactions (buttons, forms, modals)
- ✅ State management (`useState`, Redux)
- ✅ Browser APIs (localStorage, geolocation)
- ✅ Event handling (`onClick`, `onChange`)
- ✅ Real-time updates

## Key Differences from Next.js 12

### Next.js 12 (Page Router):
```tsx
// Everything was client-side by default
export default function Page() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data').then(res => setData(res.json()))
  }, [])
  
  return <div>{data?.title}</div>
}

// Data fetching was separate
export async function getServerSideProps() {
  const data = await fetch('...')
  return { props: { data } }
}
```

### Next.js 15 (App Router):
```tsx
// Server Component (default) - can fetch directly
export default async function Page() {
  const data = await fetch('/api/data')
  return <div>{data.title}</div>
}

// Client Component - when you need interactivity
'use client'
export default function InteractivePage() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

## Best Practices

### 1. Use Server Components by Default
```tsx
// ✅ Good - Server Component for static content
export default async function UserProfile({ userId }) {
  const user = await getUser(userId)
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

### 2. Use Client Components for Interactivity
```tsx
// ✅ Good - Client Component for interactive elements
'use client'
export default function UserForm() {
  const [name, setName] = useState('')
  
  const handleSubmit = () => {
    // Handle form submission
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  )
}
```

### 3. Compose Server and Client Components
```tsx
// ✅ Good - Server Component containing Client Components
export default async function Dashboard() {
  const data = await fetchDashboardData() // Server-side
  
  return (
    <div>
      <h1>Dashboard</h1>
      <Stats data={data} /> {/* Server Component */}
      <InteractiveChart data={data} /> {/* Client Component */}
    </div>
  )
}
```

## Common Patterns

### 1. Data Fetching + Interactivity
```tsx
// Server Component fetches data
export default async function PostPage({ params }) {
  const post = await getPost(params.id)
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton postId={post.id} /> {/* Client Component */}
      <Comments postId={post.id} />   {/* Client Component */}
    </div>
  )
}
```

### 2. Layout with Interactive Elements
```tsx
// Server Component layout
export default function Layout({ children }) {
  return (
    <div>
      <Header />           {/* Server Component */}
      <Navigation />       {/* Client Component - interactive */}
      <main>{children}</main>
      <Footer />           {/* Server Component */}
    </div>
  )
}
```

## When to Use Each Type

| Feature | Server Component | Client Component |
|---------|------------------|------------------|
| Data fetching | ✅ Direct access | ❌ Use useEffect |
| SEO | ✅ Rendered on server | ⚠️ Hydrated later |
| Interactivity | ❌ No event handlers | ✅ Full React features |
| Performance | ✅ No JS to client | ⚠️ JavaScript bundle |
| State management | ❌ No useState | ✅ useState, Redux |
| Browser APIs | ❌ No access | ✅ Full access |

## Redux with App Router

For Redux, you need client components:

```tsx
// ✅ Correct - Redux in Client Component
'use client'
import { useAppSelector, useAppDispatch } from '@/store'

export default function UserProfile() {
  const user = useAppSelector(state => state.user.currentUser)
  const dispatch = useAppDispatch()
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  )
}
```

## Quick Decision Guide

**Use Server Component when:**
- Displaying data from API/database
- Static content (headers, footers)
- SEO is important
- No user interaction needed

**Use Client Component when:**
- Handling user clicks/input
- Using useState, useEffect
- Accessing browser APIs
- Managing complex state
- Using Redux/Context

**Remember:** You can mix both! Server Components can contain Client Components, giving you the best of both worlds. 
# FlowAI
Developer-Focused Full-Stack Starter Kit  
Next.js 14 (App Router) • Tailwind CSS 4 • shadcn/ui • Prisma • Custom Server • WebSockets

---

## Overview
FlowAI is a full-stack starter kit designed for developers who want a modern, scalable, and flexible foundation. It combines a custom Node.js server with a Next.js frontend, giving you full control over routing, middleware, WebSockets, and advanced runtime behavior.

This project is ideal for building production-grade platforms such as real-time dashboards, AI-driven interfaces, SaaS products, and Web3-enabled applications.

---

## Features

### Backend
- Custom server (server.ts)
- WebSocket-ready
- Extendable routing
- Can integrate background workers or microservices

### Frontend
- Next.js App Router
- React 19
- Tailwind CSS 4
- shadcn/ui
- Zustand for client state

### Database
- Prisma ORM
- Fully typed database models
- Migration-ready
- Compatible with PostgreSQL, MySQL, SQLite, etc.

### Developer Experience
- 100% TypeScript
- Hot reload with tsx + nodemon
- Clean folder structure
- Minimal but scalable architecture

---

## Project Structure (Short Version)

```
src/
  app/               # Next.js routes
  components/        # UI components
  hooks/             # Custom React hooks
  lib/               # Utilities & WebSocket client
  store/             # Zustand state
  styles/            # Global styles

prisma/
  schema.prisma       # Database schema

public/
  images/             # Assets (coins, logos, networks)

server.ts             # Custom Node.js server
examples/
  websocket/          # WebSocket demo
```

---

## Architecture

### Application Runtime
FlowAI uses a custom entrypoint (`server.ts`) to control:
- HTTP request routing
- Middleware injection
- Custom runtime logic
- WebSocket communication
- Advanced integration beyond default Next.js server

This gives you backend freedom while maintaining Next.js capabilities.

### Frontend Architecture
```
src/app        - Routes & pages  
src/components - Global, UI, icons, toast components  
src/hooks      - Cross-component logic  
src/store      - Zustand global store  
src/lib        - Utilities & WebSocket client  
src/styles     - Global CSS  
```

### Backend Architecture
The backend starts from `server.ts`:
- Bootstraps custom Node server
- Binds Next.js request handler
- Injects WebSocket server
- Provides a foundation for future modular APIs, services, or queues

### Database Layer (Prisma)
Prisma schema located at:
```
prisma/schema.prisma
```

---

## Getting Started

Install dependencies:
```
npm install
```

Push Prisma schema:
```
npm run db:push
```

Start development:
```
npm run dev
```

Build for production:
```
npm run build
```

Start production:
```
npm start
```

---

## Scripts

| Script         | Description                           |
|----------------|---------------------------------------|
| dev            | Start development server              |
| build          | Build Next.js for production          |
| start          | Run production server                 |
| db:push        | Sync schema to database               |
| db:migrate     | Create migration files                |
| db:reset       | Reset and reseed database             |

---

## WebSocket Example

A complete WebSocket sample is available at:

```
src/app/examples/websocket/page.tsx
```

This includes:
- Connection handling
- Message listening
- Sending payloads
- UI updates with Zustand

---

## Recommended Use Cases

FlowAI is suitable for:
- AI dashboards  
- Realtime monitoring systems  
- SaaS platforms  
- Multi-tenant apps  
- WebSocket-powered interfaces  
- Web3-enabled apps  
- Internal enterprise tools  

---

## License

Add your preferred license here (MIT recommended).

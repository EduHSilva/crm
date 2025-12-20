# 📊 CRM Platform – Frontend

Frontend application of a modular CRM platform focused on **sales pipelines, lead management and small businesses**.

This repository contains the **web client** responsible for user interaction, data visualization and communication with backend microservices.

---

## 🎯 Problem

Small businesses and service providers often rely on spreadsheets or generic tools that don’t reflect their real sales flow, making it difficult to:

- Visualize sales pipelines clearly  
- Track leads and opportunities  
- Manage customers and services  
- Understand business performance  

---

## 💡 Solution

This frontend provides a **clean, intuitive and scalable user interface** for managing sales and customer data, fully integrated with backend microservices.

Key principles:
- Simple and intuitive UX  
- Clear visualization of sales stages  
- API-driven communication  
- Modular and maintainable frontend architecture  

---

## 🚀 Main Features

- Sales pipeline visualization  
- Lead and customer management  
- Forms and workflows for business operations  
- Integration with backend APIs  
- Responsive layout  

---

## 🧱 Architecture

**Tech stack:**
- Nuxt 3  
- TypeScript  
- REST API integration  

**Architecture overview:**
  [ Web Client (Nuxt) ] <-> API Gateway <-> Backend Microservices <-> PostgreSQL

- The frontend is fully decoupled from backend services and communicates exclusively through APIs.

## ⚙️ Running locally

### Prerequisites
- Node.js 18+

### Steps
```bash
git clone https://github.com/your-user/crm-frontend.git
cd src
npm install
npm run dev
```
Application available at: http://localhost:3000

🔧 Environment variables

Create a .env file:
```NUXT_PUBLIC_API_URL=http://localhost:8080```

## 📚 Possible future expansions
- Mobile-friendly improvements
- Technical documentation and course material

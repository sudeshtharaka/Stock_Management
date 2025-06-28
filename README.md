
# 🧥 Clothing Shop Stock Management System

This is a full-stack application for managing stock in a clothing shop.  
Built with:

- **Backend:** Spring Boot (Java)
- **Frontend:** React.js
- **Database:** MySQL
- **Containerization:** Docker + Docker Compose

---

## ✅ Features

- Add new clothing items (BUY or OWN)
- Calculate selling price dynamically with custom percentage
- Auto-generate item codes based on buyer/material/type
- Mark items as **SALE** or **STOCK CLEARING**
- Filter/report items based on search criteria

---

## 📁 Project Structure

```
stock-management/
│
├── backend/                # Spring Boot Application
│   ├── Dockerfile
│   └── ...
│
├── frontend/               # React Application
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml      # Compose file for full stack
└── README.md
```

---

## 🛠️ Prerequisites

Make sure the following are installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop)

---

## 🚀 Running the App with Docker Compose

### 📦 Step 1: Build and Run Containers

In the root folder (where `docker-compose.yml` is located), run:

```bash
docker-compose up --build
```

This will:
- Build the backend and frontend Docker images
- Run both services on:
  - Backend → `http://localhost:8080`
  - Frontend → `http://localhost:3000`

> ⚠️ React app is preconfigured to call `localhost:8080` for API calls.  
> No extra configuration is needed if you’re running with Docker Compose.

---

## 🐳 Dockerfile Setup

### 🧩 Backend - `backend/Dockerfile`

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Make sure you’ve built your Spring Boot JAR first:

```bash
cd backend
./mvnw clean package
```

---

### 🎨 Frontend - `frontend/Dockerfile`

```dockerfile
# Build Phase
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Phase
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
```

---

## 🧰 Docker Compose File - `docker-compose.yml`

```yaml
version: '3'
services:
  backend:
    build: ./backend
    container_name: spring-backend
    ports:
      - "8080:8080"
    restart: always

  frontend:
    build: ./frontend
    container_name: react-frontend
    ports:
      - "3000:80"
    restart: always
    depends_on:
      - backend
```

---

## 📝 API Endpoints

| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| GET    | `/api/items`             | Get all items            |
| POST   | `/api/items`             | Add new item             |
| GET    | `/api/items/search`      | Filter items (with params like `buyerName`, `sourceType`, etc.)

---

## 🔍 Search Criteria Example

```
GET /api/items/search?buyerName=John&sourceType=SELLER&sale=true
```

---

## 🧹 Clean Up

To stop and remove all containers:

```bash
docker-compose down
```

To rebuild images from scratch:

```bash
docker-compose up --build --force-recreate
```

---

## 📬 Contact

Built by **Sudesh Tharaka**  
If you find issues or want to contribute, feel free to fork or open an issue.


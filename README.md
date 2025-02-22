# 🚀 Docker Compose Configuration Explanation

## 📝 Overview
This `docker-compose.yml` file defines a multi-container setup for an e-commerce platform. It consists of three main services: `backend`, `frontend`, and `db` (MySQL database). It also defines networks and volumes for proper communication and data persistence.

## 🏗️ Services

### 1. 🔧 Backend Service
```yaml
backend:
  image: mostafamedhat1/e-commerce-platform_backend
  restart: unless-stopped
  ports:
    - "8080:8080"
  networks:
    - frontend
    - backend
  depends_on:
    db:
      condition: service_healthy
```
- **🖼️ Image**: Uses a pre-built backend image from Docker Hub.
- **🔄 Restart Policy**: `unless-stopped` ensures the service restarts unless manually stopped.
- **📡 Ports**: Maps port `8080` of the container to `8080` on the host.
- **🔗 Networks**: Connects to both `frontend` and `backend` networks for communication.
- **⏳ Depends On**: Ensures the `db` service is healthy before starting the backend.

### 📜 Dockerfile Explanation
This `Dockerfile` defines a two-stage build process for the backend Java application.

### 🏗️ Step 1: Build the JAR using Maven
```dockerfile
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests
```
- **🛠️ Base Image**: Uses Maven 3.9.6 with Eclipse Temurin 17 as the build environment.
- **📂 Working Directory**: Sets `/app` as the working directory.
- **📄 Copy Files**: Copies `pom.xml` and `src` folder to the container.
- **⚙️ Build Command**: Runs `mvn clean install -DskipTests` to compile the project and create a JAR file.

### 🚀 Step 2: Run the Application Using Java
```dockerfile
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/shop-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "shop-0.0.1-SNAPSHOT.jar"]
```
- **🔧 Base Image**: Uses a lightweight Java 17 runtime (JRE) for running the application.
- **📂 Working Directory**: Sets `/app` as the working directory.
- **📄 Copy JAR**: Copies the built JAR file from the first stage.
- **🌍 Expose Port**: Opens port `8080` for the application.
- **🚀 Entry Point**: Runs the JAR using `java -jar`.

This multi-stage build ensures the final image is lightweight and optimized for production. 🏆

 

### 2. 🎨 Frontend Service
```yaml
frontend:
  image: mostafamedhat1/e-commerce-platform_frontend
  restart: unless-stopped
  ports:
    - "5174:5174"
  depends_on:
    - backend
  networks:
    - frontend
```
- **🖼️ Image**: Uses a pre-built frontend image from Docker Hub.
- **🔄 Restart Policy**: `unless-stopped` ensures the service restarts unless manually stopped.
- **📡 Ports**: Maps port `5174` of the container to `5174` on the host.
- **⏳ Depends On**: Ensures the `backend` service starts before the frontend.
- **🔗 Network**: Connects to the `frontend` network.

### 📜 Node.js Dockerfile Explanation
This `Dockerfile` sets up a Node.js environment for running a frontend application.

### 🏗️ Step 1: Use an Official Node.js Image
```dockerfile
FROM node:18
```
- **🛠️ Base Image**: Uses Node.js version 18 as the parent image.

### 📂 Step 2: Set Up Working Directory
```dockerfile
WORKDIR /app
```
- **📁 Working Directory**: Sets `/app` as the main directory inside the container.

### 📄 Step 3: Copy Package Files
```dockerfile
COPY package*.json ./
```
- **📜 Copy Dependencies**: Copies `package.json` and `package-lock.json` (or `yarn.lock`) to the container.

### 📦 Step 4: Install Dependencies
```dockerfile
RUN npm install
```
- **📦 Install Dependencies**: Runs `npm install` to install all required packages.

### 📝 Step 5: Copy Application Code
```dockerfile
COPY . .
```
- **📂 Copy Source Code**: Copies all application files to the container.

### 🔧 Step 6: Build the Application
```dockerfile
RUN npm run build
```
- **⚙️ Build Process**: Runs the build command to prepare the application for production.

### 🌍 Step 7: Expose Application Port
```dockerfile
EXPOSE 5174
```
- **🚪 Open Port**: Exposes port `5174` for the application.

### 🚀 Step 8: Run the Application
```dockerfile
CMD ["npm", "run", "dev"]
```
- **🎯 Start Command**: Runs the development server using `npm run dev`.

This setup ensures an optimized and efficient Node.js container for development and deployment. 🚀

### 3. 🗄️ Database (MySQL) Service
```yaml
db:
  image: mysql:8.0
  container_name: mysql_db
  restart: unless-stopped
  environment:
    MYSQL_ROOT_PASSWORD: my-secret-pw
    MYSQL_DATABASE: my_database
    MYSQL_USER: test
    MYSQL_PASSWORD: test
  ports:
    - "3306:3306"
  volumes:
    - mysql_data:/var/lib/mysql
  networks:
    backend:
      aliases:
        - mysql
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    interval: 10s
    timeout: 5s
    retries: 10
```
- **🖼️ Image**: Uses the official MySQL 8.0 image.
- **📦 Container Name**: Named `mysql_db` for easier reference.
- **🔄 Restart Policy**: `unless-stopped` ensures the service restarts unless manually stopped.
- **🔑 Environment Variables**: Sets up MySQL root password, database name, and user credentials.
- **📡 Ports**: Exposes MySQL on port `3306`.
- **💾 Volumes**: Uses `mysql_data` for persistent storage of database files.
- **🔗 Networks**: Connects to the `backend` network with the alias `mysql`.
- **✅ Healthcheck**: Verifies the database is running before allowing dependent services to start.

## 💾 Volumes
```yaml
volumes:
  mysql_data:
```
- Defines a named volume `mysql_data` to persist MySQL data across container restarts.

## 🌐 Networks
```yaml
networks:
  frontend:
  backend:
```
- **🌍 frontend**: Connects the `frontend` and `backend` services.
- **🔌 backend**: Connects the `backend` and `db` services.
  
## 🖼️ Screenshots

![e](https://github.com/user-attachments/assets/d34ed9d0-172b-4de4-ae1e-22a929b9a8d6)

![e2](https://github.com/user-attachments/assets/2e0e1542-8040-4feb-9a5f-0cd4e1443664)

After login

![login](https://github.com/user-attachments/assets/e0e52fb7-8a28-49df-acfd-a24d1736da3f)

Items in shopping cart

![cart](https://github.com/user-attachments/assets/9894e695-3969-4c68-a0b7-a8508ca55bda)


## 📌 Summary
- ✅ The backend depends on the database and will only start once the database is healthy.
- ✅ The frontend depends on the backend to ensure proper sequencing.
- ✅ The database service is set up with persistent storage and a health check to improve reliability.
- ✅ Separate networks are used to organize communication between services.

This setup ensures **modularity**, **scalability**, and **maintainability** for the e-commerce platform. 🚀


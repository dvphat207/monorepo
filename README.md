# How to Run the Monorepo Project

This guide will walk you through the steps to run Docker Compose.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Docker: [Download and install Docker](https://www.docker.com/get-started)

## Steps

### 1. Clone the repository to your local machine:

```bash
git clone https://github.com/dvphat207/monorepo.git
```

### 2. Navigate to the project directory:

```bash
cd monorepo
```

### 4. Start the containers:

```bash
docker-compose up -d --build
```

The `-d` flag runs the containers in detached mode.

### 5. Verify that the containers are running:

```bash
docker-compose ps
```
You should see a list of running containers.

### 6. Access to the application:

Please wait for the application to start, and once it's ready, open your web browser and navigate to `http://localhost:3000`.

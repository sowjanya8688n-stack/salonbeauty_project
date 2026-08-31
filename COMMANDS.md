# Salon Beauty Project - Important Commands

## Start React Frontend

```bash
npm run dev
```

Frontend:
http://localhost:5173

---

## Start JSON Server

```bash
npm run server
```

Backend:
http://localhost:5000

Services:
http://localhost:5000/services

Categories:
http://localhost:5000/categories

---

## Install Dependencies

After downloading/cloning the project:

```bash
npm install
```

---

## Git Status

Check changed files:

```bash
git status
```

---

## Push Changes to GitHub

```bash
git add .
git commit -m "Update project"
git push origin main
```

---

## Check GitHub Repository Connection

```bash
git remote -v
```

---

## Check Current Git Branch

```bash
git branch
```

---

## Pull Latest GitHub Changes

```bash
git pull origin main
```

---

## Port 5000 Already In Use Error

If you get:

EADDRINUSE: address already in use :::5000

First check whether the backend is already running:

http://localhost:5000/services

If it is working, DON'T run another server.

To find what is using port 5000:

```powershell
netstat -ano | findstr :5000
```

Then stop the process:

```powershell
taskkill /PID YOUR_PID_NUMBER /F
```

Example:

```powershell
taskkill /PID 12345 /F
```

Then:

```bash
npm run server
```

---

## Build React Project

```bash
npm run build
```

---

## Render Backend

Build Command:

```text
npm install
```

Start Command:

```text
npm start
```

---

## Render Frontend

Build Command:

```text
npm install && npm run build
```

Publish Directory:

```text
dist
```

---

## Normal Development

Open Terminal 1:

```bash
npm run server
```

Open Terminal 2:

```bash
npm run dev
```

Then open:

http://localhost:5173
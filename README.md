# 💇‍♀️ Salon Beauty Appointment Platform

A modern and responsive **Salon & Beauty Appointment Platform** built using React.js.

The application allows users to explore salon services, book appointments, register/login, and manage their bookings. It also provides an Admin Panel for managing services, bookings, users, professionals, categories, offers, payments, reviews, and reports.

## ✨ Features

### 👤 User Features

- User Registration
- User Login
- Browse Salon Services
- Search Services
- Filter Services by Category
- Book Appointments
- View My Bookings
- Responsive Navigation
- Attractive and Responsive UI

### 👩‍💼 Admin Features

- Admin Dashboard
- Manage Services
- Manage Bookings
- Manage Users
- Manage Professionals
- Manage Categories
- Manage Offers
- Manage Payments
- Manage Reviews
- View Reports

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- React.js
- React Router
- Redux Toolkit
- React Redux
- Axios
- Vite

### Backend / API

- JSON Server
- REST API

### Deployment & Tools

- Git
- GitHub
- Render
- Visual Studio Code

## 📁 Project Structure

```text
SalonBeauty_project/
│
├── data/
│   └── db.json
│
├── public/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   │   ├── admin/
│   │   └── users/
│   ├── redux/
│   ├── AllRoutes.jsx
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── README.md
└── vite.config.js
```

## 🚀 Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the project directory:

```bash
cd SalonBeauty_project
```

Install dependencies:

```bash
npm install
```

## ▶️ Run the Backend Locally

Start JSON Server:

```bash
npm run server
```

The backend will run on:

```text
http://localhost:5000
```

Example API:

```text
http://localhost:5000/services
```

## ▶️ Run the Frontend Locally

Open another terminal and run:

```bash
npm run dev
```

The React application will normally run on:

```text
http://localhost:5173
```

## 🌐 Deployment

The project is deployed using **Render**.

- Frontend: Render Static Site
- Backend: Render Web Service
- Source Code: GitHub

## 📌 Main API Resources

- `/services`
- `/users`
- `/bookings`
- `/professionals`
- `/categories`
- `/offers`
- `/payments`
- `/reviews`

## 🎯 Project Objective

The objective of this project is to provide an easy-to-use online platform where customers can explore salon and beauty services and book appointments while administrators can manage the platform through a dedicated admin panel.

## 👩‍💻 Author

Developed as a React.js project for learning and demonstrating frontend development, API integration, Redux state management, routing, CRUD operations, Git/GitHub, and deployment.
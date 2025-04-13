# Revisit - Category Management Dashboard

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Tailwind CSS for managing clothing categories for the Revisit e-commerce platform admin panel. It includes user authentication and CRUD functionality for categories.

## Table of Contents

*   [Tech Stack](#tech-stack)
*   [Features](#features)
*   [Screenshots](#screenshots)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation & Running](#installation--running)
    *   [Environment Variables](#environment-variables)

## Tech Stack

**Frontend:**

*   React.js (v18+) (using Vite)
*   React Router DOM (v6+)
*   Tailwind CSS
*   Axios

**Backend:**

*   Node.js
*   Express.js
*   MongoDB (with Mongoose ODM)
*   JSON Web Token (jsonwebtoken)
*   bcryptjs (for password hashing)
*   CORS
*   Dotenv
*   express-async-handler

**Database:**

*   MongoDB (Cloud instance like MongoDB Atlas recommended for deployment)

## Features

*   **Admin Authentication:** Secure signup and login for administrators using JWT. Passwords are securely hashed.
*   **Protected Routes:** Backend API routes and Frontend dashboard pages are protected, accessible only by authenticated users.
*   **Category Management (CRUD):**
    *   View all clothing categories in a responsive grid layout.
    *   Add new categories including name, item count, and image URL via a modal form.
    *   Edit existing category details (name, item count, image URL) via a modal form.
    *   Delete categories with a confirmation step.
*   **Dashboard Layout:** Includes a persistent sidebar for navigation and a header with logout functionality.
*   **API Integration:** Frontend communicates with the backend REST API using Axios.
*   **Basic Error Handling:** Displays feedback for invalid form submissions or API errors.

## Screenshots

*Provide clear screenshots of the following pages/components.*

### Login Page

<!-- Add Screenshot of the Login Page Here -->
<!-- Example: ![Login Page Screenshot](path/to/your/login_screenshot.png) -->

### Signup Page

<!-- Add Screenshot of the Signup Page Here -->
<!-- Example: ![Signup Page Screenshot](path/to/your/signup_screenshot.png) -->

### Dashboard (Category List View)

<!-- Add Screenshot of the Main Dashboard showing the Category Grid Here -->
<!-- Example: ![Dashboard Screenshot](path/to/your/dashboard_screenshot.png) -->

### Add Category Modal/Form

<!-- Add Screenshot of the 'Add Category' Modal Here -->
<!-- Example: ![Add Category Modal Screenshot](path/to/your/add_modal_screenshot.png) -->

### Edit Category Modal/Form

<!-- Add Screenshot of the 'Edit Category' Modal Here -->
<!-- Example: ![Edit Category Modal Screenshot](path/to/your/edit_modal_screenshot.png) -->


## Getting Started

Follow these below instructions to set up and run the project locally on your machine.

### Prerequisites

*   **Node.js:** v18.x or later recommended. Download from [nodejs.org](https://nodejs.org/).
*   **npm:** Usually comes bundled with Node.js.
*   **MongoDB:** You need a running MongoDB instance.
    *   **Option 1 (Recommended):** Use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (offers a free tier). Get your connection string.
    *   **Option 2:** Install and run MongoDB locally. Default connection string is usually `mongodb://localhost:27017`.
*   **Git:** For cloning the repository.

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd revisit-category-management
    ```

2.  **Setup Backend:**
    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Create the `.env` file (see [Environment Variables](#environment-variables) section below) in this `backend` directory.
    *   Install backend dependencies:
        ```bash
        npm install
        ```
    *   Start the backend server (uses nodemon for auto-restarts during development):
        ```bash
        npm run dev
        ```
    *   The backend server should now be running, typically on `http://localhost:5000` (or the port specified in your `.env`).

3.  **Setup Frontend:**
    *   Open a **new terminal window/tab**.
    *   Navigate to the frontend directory from the project root:
        ```bash
        cd frontend
        ```
    *   Create the `.env` file (see [Environment Variables](#environment-variables) section below) in this `frontend` directory.
    *   Install frontend dependencies:
        ```bash
        npm install
        ```
    *   Start the frontend development server (Vite):
        ```bash
        npm run dev
        ```
    *   The frontend application should now be running and accessible in your browser, typically at `http://localhost:5173`.

### Environment Variables

You need to create `.env` files in both the `backend` and `frontend` directories to store sensitive information and configuration settings. **These files should NOT be committed to Git.**

**1. Backend (`backend/.env`):**

Create a file named `.env` in the `/backend` directory and add the following variables, replacing the placeholder values:

```dotenv
# MongoDB Connection String (replace with your actual Atlas or local URI)
MONGO_URI=mongodb+srv://<username>:<password>@<your_cluster_url>/revisit-ecommerce?retryWrites=true&w=majority

# Port for the backend server
PORT=5000

# JWT Secret Key (replace with a long, random, secure string)
JWT_SECRET=your_very_secure_and_random_jwt_secret_key_123!@#

# JWT Token Expiry (e.g., 30d, 1h, 7d)
JWT_EXPIRES_IN=30d
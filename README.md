# 📈 SB Stocks

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

SB Stocks is a MERN stack paper trading platform that lets users practice stock trading in a risk-free environment. Users can create accounts, explore live stock data, place simulated buy/sell orders, manage a virtual portfolio, deposit or withdraw virtual funds, and review their trading history.

---

# 🚀 Overview

SB Stocks is designed for learners, hobby traders, and anyone interested in practicing stock trading without using real money. The platform combines a React-based frontend with an Express and MongoDB backend to deliver a simple yet functional trading experience driven by real stock market data.

The application includes both user and admin experiences:
- Users can register, log in, view market data, trade virtually, and manage funds.
- Admin users can review system-wide user, order, and transaction data.

---

# ✨ Features

## Authentication
- User registration with username, email, and password
- Secure login with JWT-based authentication
- Protected routes for authenticated users
- Role-based access for admin users
- Password hashing with bcryptjs

## Dashboard
- Landing page for product overview and call-to-action
- Personalized home dashboard with user balance and stock search
- Popular stocks section on the home page

## Stock Market
- Stock search by symbol or company name
- Current stock quote and market details
- Historical price data for multiple time ranges: 1 day, 1 week, 1 month, 3 months, and 1 year
- Admin stock chart analytics page for manual symbol lookup

## Trading
- Simulated buy and sell orders
- Virtual balance validation before trades
- Portfolio updates after completed trades
- Order history for each user

## Portfolio
- View current holdings
- See average buy price, invested amount, and current value
- Track unrealized profit and loss

## Transaction History
- User transaction log for deposits, withdrawals, buys, and sells
- Admin view of all system transactions

## User Profile
- View account details
- Deposit virtual funds
- Withdraw virtual funds

## Admin
- Admin dashboard with summary statistics
- View all registered users
- View all orders across the system
- View all transactions across the system
- Access stock analytics tools

## Security
- JWT authentication middleware
- Admin-only route protection
- CORS configuration for frontend access

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- React Router DOM
- Axios
- React Toastify
- Recharts
- React Icons

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication
- JSON Web Tokens (JWT)
- bcryptjs

## External APIs
- Yahoo Finance endpoints for stock search, quotes, and historical data

## Tools
- Git
- GitHub
- VS Code
- npm

---

# 📂 Project Structure

```text
sb-stocks-master/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── components/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Navbar.jsx
│       │   ├── axiosInstance.js
│       │   └── Auth.css
│       ├── context/
│       │   └── GeneralContext.jsx
│       └── pages/
│           ├── Admin.jsx
│           ├── AdminAllTransactions.jsx
│           ├── AdminStockChart.jsx
│           ├── AllOrders.jsx
│           ├── AllTransactions.jsx
│           ├── History.jsx
│           ├── Home.jsx
│           ├── Landing.jsx
│           ├── Portfolio.jsx
│           ├── Profile.jsx
│           ├── StockChart.jsx
│           └── Users.jsx
├── server/
│   ├── index.js
│   ├── package.json
│   ├── Schemas.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── orderController.js
│   │   ├── stockController.js
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── orderSchema.js
│   │   ├── stockSchema.js
│   │   ├── transactionModel.js
│   │   └── userModel.js
│   └── routes/
│       ├── orderRoute.js
│       ├── stockRoute.js
│       ├── transactionRoute.js
│       └── userRoute.js
└── package-lock.json
```

- client/: React frontend and UI pages
- server/: Express backend, routes, controllers, models, and database configuration
- server/config/: MongoDB connection logic
- server/controllers/: Business logic for users, stocks, orders, and transactions
- server/models/: Mongoose schemas for users, orders, portfolios, and transactions
- server/routes/: API route definitions
---


# ⚙ Installation

## 1. Clone the repository

```bash
git clone <repository-url>
cd sb-stocks-master
```

## 2. Install dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd ../server
npm install
```

## 3. Configure environment variables

Create a `.env` file inside the server folder based on the provided example values.

```env
PORT=5000
MONGODB_URI=YOUR MONGODB URL
JWT_SECRET=replace_with_a_long_random_string
FRONTEND_URL=http://localhost:5173
```

If you are using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

## 4. Start MongoDB

Make sure MongoDB is running locally before starting the backend.

## 5. Run the application

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

In a separate terminal:

```bash
cd client
npm run dev
```

The frontend will be available at:
- http://localhost:5173

The backend API will be available at:
- http://localhost:5000

---
# 👑 Creating an Admin User

This project does not create an administrator account by default.

## Step 1 — Register

Visit:

```text
http://localhost:5173/register
```

Create a new account.

## Step 2 — Promote the User

Run the following command inside the `server` folder:

```bash
node -e "require('dotenv').config(); const mongoose=require('mongoose'); const User=require('./models/userModel'); mongoose.connect(process.env.MONGODB_URI).then(async()=>{ await User.updateOne({email:'YOUR_EMAIL_HERE'},{role:'admin'}); console.log('Admin promoted!'); process.exit(); })"
```

Replace:

```text
YOUR_EMAIL_HERE
```

with the registered email.

## Step 3 — Login Again

Log out and log back in.

## Step 4 — Open Admin Panel

```text
http://localhost:5173/admin
```
# 🌐 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/users/register | Register a user |
| POST | /api/users/login | Login |
| GET | /api/stocks/search | Search stocks |
| GET | /api/stocks/:symbol | Stock details |
| POST | /api/orders | Buy or Sell stocks |
| GET | /api/orders | User orders |
| GET | /api/transactions | Transaction history |
---
# 🧪 Notes

- The current implementation uses a paper trading model with virtual funds and simulated trades.
- The app fetches stock data from Yahoo Finance endpoints for search, quote, and historical chart data.
- The repository currently includes user and admin flows, but no real brokerage or live-market execution is implemented.


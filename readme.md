# 🛍️ Apna Ecommerce Platform

A full-stack e-commerce platform built with React, Node.js, and MongoDB. This project includes a customer-facing store, admin dashboard, and comprehensive backend API.

## 🌐 Live Demo

- **Customer Store**: [https://mern-ecom-psi.vercel.app/](https://mern-ecom-psi.vercel.app/)
- **Admin Dashboard**: [https://apna-ecommerce.vercel.app/login](https://apna-ecommerce.vercel.app/login)

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🛒 Customer Features
- **User Authentication**: Secure login/signup with JWT tokens
- **Product Browsing**: Browse products with filtering and search
- **Shopping Cart**: Add/remove items with real-time updates
- **Wishlist**: Save favorite products for later
- **Order Management**: Place orders and track order history
- **Address Management**: Multiple shipping addresses
- **User Profile**: Comprehensive profile management
- **Responsive Design**: Mobile-first approach with Chakra UI

### 👨‍💼 Admin Features
- **Dashboard Analytics**: Real-time KPIs and statistics
- **Product Management**: Add, edit, delete products
- **Order Management**: View and manage customer orders
- **User Management**: Manage customer accounts
- **Inventory Tracking**: Monitor product stock and sales
- **Revenue Analytics**: Track sales performance and trends

### 🔧 Backend Features
- **RESTful API**: Well-structured API endpoints
- **Authentication & Authorization**: Secure JWT-based auth
- **Database Integration**: MongoDB with Mongoose ODM
- **Data Aggregation**: Advanced analytics with MongoDB aggregation
- **Error Handling**: Comprehensive error management
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Chakra UI** - Component library
- **Redux** - State management
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin support

### Development Tools
- **Nodemon** - Development server
- **React Scripts** - Build tools
- **ESLint** - Code linting

## 📁 Project Structure

```
Apna_Ecommerce/
├── client/                 # Customer-facing React app
│   ├── src/
│   │   ├── Components/     # Reusable components
│   │   ├── Pages/         # Page components
│   │   ├── Redux/         # State management
│   │   └── Routes/        # Routing configuration
│   └── package.json
├── admin_dashboard/        # Admin React dashboard
│   ├── src/
│   │   ├── components/    # Admin components
│   │   ├── pages/         # Admin pages
│   │   ├── redux/         # Admin state management
│   │   └── Routes/        # Admin routing
│   └── package.json
├── server/                 # Node.js backend
│   ├── Modal/             # Database models
│   ├── Routes/            # API routes
│   ├── Middleware/        # Custom middleware
│   └── config/            # Database configuration
└── Images/                # Project images
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Apna_Ecommerce
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd server
npm install
```

#### Frontend Setup
```bash
cd ../client
npm install
```

#### Admin Dashboard Setup
```bash
cd ../admin_dashboard
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/apna_ecommerce
JWT_SECRET=your_jwt_secret_key
PORT=8080
```

### 4. Database Setup
Make sure MongoDB is running on your system. The application will automatically create the necessary collections.

### 5. Start the Application

#### Start Backend Server
```bash
cd server
npm start
```
Server will run on `http://localhost:8080`

#### Start Customer Frontend
```bash
cd client
npm start
```
Customer app will run on `http://localhost:3000`

#### Start Admin Dashboard
```bash
cd admin_dashboard
npm start
```
Admin dashboard will run on `http://localhost:3001`

## 📚 API Documentation

### Authentication Endpoints
- `POST /userauth/register` - User registration
- `POST /userauth/login` - User login
- `POST /adminauth/login` - Admin login

### Product Endpoints
- `GET /admindashboard` - Get all products
- `POST /admindashboard/add` - Add new product
- `PUT /admindashboard/update/:id` - Update product
- `DELETE /admindashboard/delete/:id` - Delete product

### User Dashboard Endpoints
- `GET /userDashboard/cart` - Get user cart
- `POST /userDashboard/cart` - Add to cart
- `DELETE /userDashboard/cart/:id` - Remove from cart

### Address Management
- `GET /userDashboard/address` - Get user addresses
- `POST /userDashboard/address` - Add new address
- `PUT /userDashboard/address/:id` - Update address
- `DELETE /userDashboard/address/:id` - Delete address

### Order Management
- `GET /userDashboard/order` - Get user orders
- `POST /userDashboard/order` - Create new order
- `PUT /userDashboard/order/:id` - Update order status

### Wishlist Management
- `GET /userDashboard/wishlist` - Get user wishlist
- `POST /userDashboard/wishlist` - Add to wishlist
- `DELETE /userDashboard/wishlist/:id` - Remove from wishlist

### Dashboard Analytics
- `GET /dashboard/analytics` - Get detailed analytics
- `GET /dashboard/summary` - Get quick summary

## 📸 Screenshots

### Customer Interface
- **Homepage**: Modern landing page with product showcase
- **Product Catalog**: Grid view with filtering options
- **Shopping Cart**: Interactive cart with quantity management
- **Checkout**: Multi-step checkout process
- **User Profile**: Comprehensive profile management

### Admin Dashboard
- **Analytics Dashboard**: Real-time KPIs and charts
- **Product Management**: CRUD operations for products
- **Order Management**: Order tracking and status updates
- **User Management**: Customer account management

## 🎯 Usage

### For Customers
1. **Register/Login**: Create an account or sign in
2. **Browse Products**: Explore the product catalog
3. **Add to Cart**: Add desired items to shopping cart
4. **Manage Wishlist**: Save products for later purchase
5. **Checkout**: Complete purchase with address selection
6. **Track Orders**: Monitor order status and history

### For Administrators
1. **Login**: Access admin dashboard
2. **View Analytics**: Monitor platform performance
3. **Manage Products**: Add, edit, or remove products
4. **Process Orders**: Update order statuses
5. **User Management**: Handle customer accounts

## 🔧 Key Features Implementation

### State Management
- **Redux**: Centralized state management
- **Redux Thunk**: Async action handling
- **Persistent State**: Cart and user data persistence

### Authentication
- **JWT Tokens**: Secure authentication
- **Protected Routes**: Route-level security
- **Role-based Access**: Admin vs user permissions

### Database Design
- **MongoDB Collections**: Users, Products, Orders, Cart, Wishlist, Addresses
- **Aggregation Pipelines**: Complex data queries
- **Data Relationships**: Proper foreign key references

### UI/UX
- **Responsive Design**: Mobile-first approach
- **Chakra UI**: Consistent design system
- **Loading States**: User feedback during operations
- **Error Handling**: Graceful error management

## 🚀 Deployment

### Frontend Deployment
```bash
# Build production version
cd client
npm run build

# Deploy build folder to hosting service
```

### Backend Deployment
```bash
# Set production environment variables
# Deploy to cloud service (Heroku, AWS, etc.)
```

### Database
- Use MongoDB Atlas for cloud database
- Configure connection string in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Manish** - Full Stack Developer

## 🙏 Acknowledgments

- Chakra UI for the amazing component library
- React team for the excellent framework
- MongoDB for the flexible database solution
- All contributors who helped make this project better

---

**Happy Shopping! 🛍️**
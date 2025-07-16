# E-Commerce Application API Documentation

## Table of Contents
1. [Backend APIs](#backend-apis)
2. [Frontend Components](#frontend-components)
3. [Data Models](#data-models)
4. [Middleware & Authentication](#middleware--authentication)
5. [Redux State Management](#redux-state-management)
6. [Setup & Installation](#setup--installation)

---

## Backend APIs

### Base URL
```
http://localhost:8080
```

### Authentication APIs

#### 1. User Registration
**Endpoint:** `POST /user/register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "username": "johndoe",
  "mobile": "1234567890"
}
```

**Response:**
```json
{
  "message": "Registered Successfully"
}
```

**Example Usage:**
```javascript
const registerUser = async (userData) => {
  const response = await fetch('http://localhost:8080/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};
```

#### 2. User Login
**Endpoint:** `POST /user/login`

**Description:** Login user and receive JWT token

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1234567890abcdef",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

#### 3. Admin Registration
**Endpoint:** `POST /admin/register`

**Description:** Register a new admin account

**Request Body:**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "adminpass123"
}
```

#### 4. Admin Login
**Endpoint:** `POST /admin/login`

**Description:** Login admin and receive JWT token

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "adminpass123"
}
```

### Product APIs

#### 1. Get All Products
**Endpoint:** `GET /getAllProduct`

**Description:** Fetch products with filtering and sorting options

**Query Parameters:**
- `category` (string): Filter by product category
- `sortByRating` (string): Filter by rating ("low" for ≤3, "high" for ≥4)
- `sort` (string): Sort by price ("asc" for ascending, "desc" for descending)

**Example:**
```
GET /getAllProduct?params[category]=electronics&params[sort]=asc&params[sortByRating]=high
```

**Response:**
```json
[
  {
    "_id": "64f1234567890abcdef",
    "prod_name": "Smartphone",
    "prod_cat": "electronics",
    "prod_price": "599",
    "prod_rating": "4.5",
    "prod_desc": "Latest smartphone with advanced features",
    "prod_tag": "mobile, technology",
    "prod_image": "https://example.com/image.jpg"
  }
]
```

**Example Usage:**
```javascript
const fetchProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.category) queryParams.append('params[category]', filters.category);
  if (filters.sort) queryParams.append('params[sort]', filters.sort);
  if (filters.sortByRating) queryParams.append('params[sortByRating]', filters.sortByRating);
  
  const response = await fetch(`http://localhost:8080/getAllProduct?${queryParams}`);
  return response.json();
};
```

### User Dashboard APIs (Protected Routes)

**Headers Required:**
```
Authorization: <JWT_TOKEN>
```

#### 1. Get User Cart
**Endpoint:** `GET /userDashboard/cart`

**Description:** Get all cart items for authenticated user

**Response:**
```json
[
  {
    "_id": "64f1234567890abcdef",
    "prod_id": "64f1234567890abcdef",
    "userEmail": "john@example.com",
    "prod_name": "Smartphone",
    "prod_price": 599,
    "count": 2
  }
]
```

#### 2. Add to Cart
**Endpoint:** `POST /userDashboard/create`

**Description:** Add a product to user's cart

**Request Body:**
```json
{
  "_id": "64f1234567890abcdef",
  "prod_name": "Smartphone",
  "prod_cat": "electronics",
  "prod_price": "599",
  "prod_rating": "4.5",
  "prod_desc": "Latest smartphone",
  "prod_tag": "mobile",
  "prod_image": "https://example.com/image.jpg",
  "prod_discount": "10%"
}
```

#### 3. Remove from Cart
**Endpoint:** `DELETE /userDashboard/delete/:id`

**Description:** Remove a product from user's cart

**Parameters:**
- `id` (string): Product ID to remove

**Example:**
```
DELETE /userDashboard/delete/64f1234567890abcdef
```

### Admin Dashboard APIs (Protected Routes)

**Headers Required:**
```
Authorization: <ADMIN_JWT_TOKEN>
```

#### 1. Get All Products (Admin)
**Endpoint:** `GET /admindashboard`

**Description:** Get all products for admin management

#### 2. Get All Users
**Endpoint:** `GET /admindashboard/users`

**Description:** Get all registered users

#### 3. Create Product
**Endpoint:** `POST /admindashboard/create`

**Description:** Create a new product

**Request Body:**
```json
{
  "prod_name": "New Product",
  "prod_cat": "category",
  "prod_price": "199",
  "prod_rating": "4.0",
  "prod_desc": "Product description",
  "prod_tag": "tag1, tag2",
  "prod_image": "https://example.com/image.jpg"
}
```

#### 4. Update Product
**Endpoint:** `PATCH /admindashboard/edit/:prodId`

**Description:** Update an existing product

**Parameters:**
- `prodId` (string): Product ID to update

#### 5. Delete Product
**Endpoint:** `DELETE /admindashboard/delete/:id`

**Description:** Delete a product

**Parameters:**
- `id` (string): Product ID to delete

---

## Frontend Components

### Client Application Components

#### 1. Navbar Component
**File:** `client/src/Components/Navbar.jsx`

**Description:** Main navigation bar with user authentication, cart display, and navigation links

**Props:** None (uses Redux state)

**Features:**
- User authentication status display
- Cart item count
- Responsive hamburger menu
- User dropdown with logout functionality

**Usage:**
```jsx
import Navbar from './Components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      {/* Other components */}
    </div>
  );
}
```

#### 2. Filter Component
**File:** `client/src/Components/Filter.jsx`

**Description:** Product filtering sidebar with category, rating, and price filters

**Props:**
- `onFilterChange` (function): Callback for filter changes

**Features:**
- Category filtering
- Price range filtering
- Rating-based filtering
- Sort by price options

**Usage:**
```jsx
import Filter from './Components/Filter';

const ProductPage = () => {
  const handleFilterChange = (filters) => {
    // Handle filter changes
    console.log('Applied filters:', filters);
  };

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} />
    </div>
  );
};
```

#### 3. Products Component
**File:** `client/src/Pages/Product/Products.jsx`

**Description:** Main product listing page with search, filter, and display functionality

**Features:**
- Product grid display
- Search functionality
- Pagination
- Add to cart functionality
- Product details modal

**Redux Dependencies:**
- `productReducer` for product data
- `AuthReducer` for user authentication

#### 4. Cart Component
**File:** `client/src/Pages/Cart/Cart.jsx`

**Description:** Shopping cart page displaying user's selected items

**Features:**
- Cart item display
- Quantity modification
- Item removal
- Total price calculation
- Checkout navigation

**Usage:**
```jsx
import Cart from './Pages/Cart/Cart';

// Protected route example
<Route path="/cart" element={
  <ProtectedRoute>
    <Cart />
  </ProtectedRoute>
} />
```

#### 5. Homepage Component
**File:** `client/src/Pages/Homepage/Homepage.jsx`

**Description:** Landing page with featured products and banners

**Subcomponents:**
- `Banner.jsx`: Promotional banners
- `HomePageContainer.jsx`: Product showcase container

#### 6. Authentication Components

##### Login Component
**File:** `client/src/Pages/Login_Signup/Login.jsx`

**Features:**
- User login form
- Form validation
- JWT token handling
- Redirect after login

##### Signup Component
**File:** `client/src/Pages/Login_Signup/Signup.jsx`

**Features:**
- User registration form
- Form validation
- Password confirmation
- Automatic login after registration

### Admin Dashboard Components

#### 1. Sidebar Component
**File:** `admin_dashboard/src/components/Sidebar.jsx`

**Description:** Admin navigation sidebar

**Features:**
- Navigation menu
- Admin profile display
- Logout functionality

#### 2. Product Management Components

##### AddProduct Component
**File:** `admin_dashboard/src/pages/Products/AddProduct.jsx`

**Description:** Form for adding new products

**Features:**
- Product form with validation
- Image upload handling
- Category selection
- Submit to API

**Usage:**
```jsx
import AddProduct from './pages/Products/AddProduct';

const AdminRoutes = () => {
  return (
    <Route path="/admin/add-product" element={<AddProduct />} />
  );
};
```

##### EditProduct Component
**File:** `admin_dashboard/src/pages/Products/EditProduct.jsx`

**Description:** Form for editing existing products

**Features:**
- Pre-populated form with existing data
- Update functionality
- Validation

##### Product Component (Admin)
**File:** `admin_dashboard/src/pages/Products/Product.jsx`

**Description:** Admin product listing and management

**Features:**
- Product table display
- Edit/Delete actions
- Search and filter

#### 3. User Management Component
**File:** `admin_dashboard/src/pages/Users/User.jsx`

**Description:** Admin user management interface

**Features:**
- User list display
- User details view
- User management actions

---

## Data Models

### 1. User Model
**File:** `server/Modal/userauth.model.js`

```javascript
{
  name: String (required),
  email: String (required),
  password: String (required, hashed),
  username: String (required),
  mobile: String (required)
}
```

### 2. Product Model
**File:** `server/Modal/product.module.js`

```javascript
{
  prod_name: String,
  prod_cat: String,
  prod_price: String,
  prod_rating: String,
  prod_desc: String,
  prod_tag: String,
  prod_image: String
}
```

### 3. Cart Model
**File:** `server/Modal/Cart.module.js`

```javascript
{
  prod_id: String (required),
  userEmail: String (required),
  prod_name: String (required),
  prod_cat: String (required),
  prod_price: Number (required),
  prod_rating: String (required),
  prod_desc: String (required),
  prod_tag: String (required),
  prod_image: String,
  prod_discount: String,
  count: Number (default: 1)
}
```

### 4. Admin Model
**File:** `server/Modal/AdminAuth.model.js`

```javascript
{
  name: String (required),
  email: String (required),
  password: String (required, hashed)
}
```

---

## Middleware & Authentication

### 1. Authentication Middleware
**File:** `server/Middleware/authentication.js`

**Description:** Validates JWT tokens for user routes

**Usage:**
```javascript
app.use("/userDashboard", authentication, userProductController);
```

**Function:**
```javascript
const authentication = async (req, res, next) => {
  // Validates JWT token from Authorization header
  // Adds userEmail to req.body for authenticated requests
};
```

### 2. Authorization Middleware
**File:** `server/Middleware/authorization.js`

**Description:** Validates admin access for admin routes

**Usage:**
```javascript
app.use("/admindashboard", authorized, adminProductController);
```

**Function:**
```javascript
const authorized = async (req, res, next) => {
  // Validates admin JWT token
  // Checks for specific admin email
  // Grants access to admin-only routes
};
```

---

## Redux State Management

### Store Configuration
**File:** `client/src/Redux/store.js`

**Reducers:**
- `AuthReducer`: User authentication state
- `AppReducer`: General application state
- `productReducer`: Product data and filters
- `getCartReducer`: Cart data management

### 1. AuthReducer
**Purpose:** Manages user authentication state

**State Structure:**
```javascript
{
  isLoading: boolean,
  isError: boolean,
  token: string,
  user: {
    name: string,
    email: string,
    username: string
  }
}
```

### 2. Product Reducer
**Purpose:** Manages product data and filtering

**Actions:**
- `FETCH_PRODUCTS_REQUEST`
- `FETCH_PRODUCTS_SUCCESS`
- `FETCH_PRODUCTS_FAILURE`
- `APPLY_FILTERS`
- `CLEAR_FILTERS`

### 3. Cart Reducer
**Purpose:** Manages shopping cart state

**Actions:**
- `GET_CART_REQUEST`
- `GET_CART_SUCCESS`
- `ADD_TO_CART`
- `REMOVE_FROM_CART`
- `UPDATE_CART_QUANTITY`

**Example Usage:**
```javascript
import { getCartData } from '../Redux/AppReducer/action';
import { useDispatch, useSelector } from 'react-redux';

const CartComponent = () => {
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector(state => state.getCartReducer);
  
  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);
  
  return (
    <div>
      {isLoading ? 'Loading...' : cart.map(item => (
        <div key={item._id}>{item.prod_name}</div>
      ))}
    </div>
  );
};
```

---

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Server Setup
```bash
cd server
npm install
npm start
```

**Environment Variables (.env):**
```
PORT=8080
SECRET_KEY=your_secret_key
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

### Client Setup
```bash
cd client
npm install
npm start
```

### Admin Dashboard Setup
```bash
cd admin_dashboard
npm install
npm start
```

### API Testing Examples

#### Using cURL
```bash
# Register user
curl -X POST http://localhost:8080/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","username":"johndoe","mobile":"1234567890"}'

# Login user
curl -X POST http://localhost:8080/user/login \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"password123"}'

# Get products with filters
curl "http://localhost:8080/getAllProduct?params[category]=electronics&params[sort]=asc"

# Add to cart (with authentication)
curl -X POST http://localhost:8080/userDashboard/create \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_JWT_TOKEN" \
  -d '{"_id":"product_id","prod_name":"Smartphone","prod_cat":"electronics","prod_price":"599"}'
```

#### Using JavaScript/Axios
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Set up axios interceptor for authentication
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// API functions
export const authAPI = {
  login: (credentials) => axios.post(`${API_BASE_URL}/user/login`, credentials),
  register: (userData) => axios.post(`${API_BASE_URL}/user/register`, userData),
};

export const productAPI = {
  getAll: (filters) => axios.get(`${API_BASE_URL}/getAllProduct`, { params: filters }),
  addToCart: (product) => axios.post(`${API_BASE_URL}/userDashboard/create`, product),
  getCart: () => axios.get(`${API_BASE_URL}/userDashboard/cart`),
  removeFromCart: (id) => axios.delete(`${API_BASE_URL}/userDashboard/delete/${id}`),
};

export const adminAPI = {
  getProducts: () => axios.get(`${API_BASE_URL}/admindashboard`),
  createProduct: (product) => axios.post(`${API_BASE_URL}/admindashboard/create`, product),
  updateProduct: (id, product) => axios.patch(`${API_BASE_URL}/admindashboard/edit/${id}`, product),
  deleteProduct: (id) => axios.delete(`${API_BASE_URL}/admindashboard/delete/${id}`),
  getUsers: () => axios.get(`${API_BASE_URL}/admindashboard/users`),
};
```

---

## Error Handling

### Common Error Responses

**Authentication Errors:**
```json
{
  "message": "Please Login Again"
}
```

**Authorization Errors:**
```json
{
  "message": "You are not authorized to access this"
}
```

**Validation Errors:**
```json
{
  "message": "Already Registered"
}
```

**Server Errors:**
```json
{
  "error": "Internal Server Error"
}
```

### Frontend Error Handling Example
```javascript
const handleLogin = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    // Redirect to dashboard
  } catch (error) {
    if (error.response?.status === 406) {
      setError('Invalid credentials');
    } else {
      setError('Login failed. Please try again.');
    }
  }
};
```

---

## Security Considerations

1. **JWT Tokens:** All protected routes require valid JWT tokens
2. **Password Hashing:** User passwords are hashed using bcrypt
3. **CORS:** Cross-origin requests are handled properly
4. **Admin Authorization:** Admin routes have additional email-based authorization
5. **Input Validation:** All API endpoints should validate input data

---

## Performance Optimization

1. **Database Queries:** Use MongoDB indexing for better query performance
2. **Pagination:** Implement pagination for large product lists
3. **Caching:** Consider implementing Redis for session management
4. **Image Optimization:** Optimize product images for web delivery
5. **Bundle Optimization:** Use React code splitting for better load times

---

This documentation provides a comprehensive overview of all public APIs, components, and functions in the e-commerce application. Each section includes practical examples and usage instructions to help developers integrate with or extend the application functionality.
# Profile Page

A comprehensive user profile page that integrates with all existing e-commerce functionality.

## Features

### 📊 Dashboard Overview
- **User Information**: Name, email, account status
- **Quick Stats**: Total orders, amount spent, wishlist items, cart items
- **Visual Cards**: Clean, modern design with statistics

### 📦 Order Management
- **Recent Orders Table**: Last 5 orders with status, amount, date
- **Order Details Modal**: Click to view full order details
- **Order Statistics**: Total spent, average order value, last order date

### ❤️ Wishlist Integration
- **Wishlist Items**: Display with product images and details
- **Add to Cart**: Direct integration with cart functionality
- **Wishlist Analytics**: Categories, total value, item count
- **Remove Items**: Delete from wishlist functionality

### 🏠 Address Management
- **Saved Addresses**: View all saved addresses
- **Default Address**: Highlight default shipping address
- **Address Actions**: Edit, delete, add new addresses
- **Quick Add**: Direct link to checkout for new addresses

### ⚙️ Account Settings
- **Personal Information**: View and edit user details
- **Security Settings**: Change password, 2FA options
- **Preferences**: Notification settings, newsletter subscription

## Data Integration

### Redux State Used
- `AuthReducer`: User authentication and profile data
- `wishlistReducer`: Wishlist items and count
- `getCartReducer`: Current cart items
- `orderReducer`: Order history and statistics
- `addressReducer`: Saved addresses

### API Endpoints
- `GET /userDashboard/wishlist` - Fetch wishlist with product details
- `GET /userDashboard/cart` - Fetch current cart items
- `GET /userDashboard/order` - Fetch order history
- `GET /userDashboard/address` - Fetch saved addresses
- `POST /userDashboard/cart` - Add items to cart

## Navigation

### Route
- **Path**: `/profile`
- **Access**: Requires authentication
- **Redirect**: Redirects to `/login` if not authenticated

### Navbar Integration
- **Profile Link**: Available in user dropdown menu
- **Icon**: User icon (FiUser)
- **Navigation**: Uses `useNavigate` hook

## Components

### Main Components
- **Profile**: Main profile page component
- **Order Details Modal**: Modal for viewing order details
- **Statistics Cards**: Quick overview cards
- **Tabbed Interface**: Organized content sections

### UI Features
- **Responsive Design**: Works on mobile and desktop
- **Dark Mode Support**: Uses Chakra UI color mode
- **Loading States**: Spinners for data fetching
- **Error Handling**: Alerts for empty states
- **Toast Notifications**: Success/error messages

## Usage

### Accessing Profile
1. Login to the application
2. Click on user menu in navbar
3. Select "Profile" option
4. View all integrated data

### Features Available
- View order history and statistics
- Manage wishlist items
- View and manage addresses
- Update account settings
- Add items to cart from wishlist

## Future Enhancements

### Planned Features
- **Profile Picture Upload**: Add/change profile photos
- **Order Tracking**: Real-time order status updates
- **Loyalty Points**: Points system integration
- **Social Features**: Share wishlist, reviews
- **Analytics**: Detailed shopping analytics
- **Export Data**: Download personal data

### Technical Improvements
- **Caching**: Implement data caching for better performance
- **Real-time Updates**: WebSocket integration for live updates
- **Offline Support**: PWA features for offline access
- **Advanced Filtering**: Search and filter options
- **Bulk Actions**: Select multiple items for actions

## Dependencies

### Required Packages
- `@chakra-ui/react`: UI component library
- `react-redux`: State management
- `react-router-dom`: Navigation
- `react-icons/fi`: Feather icons

### Redux Actions
- `getWishlist()`: Fetch wishlist data
- `getCartData()`: Fetch cart data
- `getOrders()`: Fetch order history
- `getAddresses()`: Fetch saved addresses
- `postCartData()`: Add items to cart

## Error Handling

### Authentication Errors
- Redirects to login if not authenticated
- Shows loading spinner during auth check

### Data Loading Errors
- Displays appropriate error messages
- Graceful fallbacks for missing data
- Loading states for better UX

### API Errors
- Toast notifications for API failures
- Retry mechanisms for failed requests
- User-friendly error messages

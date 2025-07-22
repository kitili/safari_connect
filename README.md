# SafariConnect - Travel Companion Matching Platform

A full-stack web application that connects solo travelers with compatible travel companions for shared adventures across Kenya's most beautiful destinations.

## 🌟 Features

### 🔐 User Authentication & Profiles
- Secure user registration and login system
- Detailed user profiles with travel preferences
- Profile customization with interests and travel style
- JWT-based authentication

### 💕 Advanced Matchmaking System
- Sophisticated compatibility algorithm
- Date overlap matching for travel coordination
- Destination-based matching
- Interest and travel style compatibility scoring
- Real-time match suggestions

### 🗺️ Destination Exploration
- Comprehensive destination database
- Interactive destination browsing
- Search and filter functionality
- Detailed destination information and packages
- Booking system integration

### 💬 Real-time Communication
- Live chat system between matched users
- Real-time messaging with Socket.io
- Message read receipts
- File and location sharing capabilities
- Typing indicators

### 📊 Admin Dashboard
- Comprehensive user management
- Match analytics and monitoring
- System performance metrics
- Data export capabilities
- Content moderation tools

### ✈️ Trip Planning
- Trip creation and management
- Date coordination tools
- Destination planning features
- Travel itinerary management

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Socket.io-client** - Real-time communication
- **React Toastify** - User notifications
- **Tailwind CSS** - Styling framework

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.io** - Real-time server
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Database
- **MongoDB Atlas** - Cloud database
- **Mongoose Schemas** - Data modeling
- **Indexed queries** - Performance optimization

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kitili/safari_connect.git
   cd safari_connect
   ```

2. **Install backend dependencies**
   ```bash
   cd SafariConnect_Project/backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:3000
   ```

5. **Seed the database**
   ```bash
   cd ../backend
   node seedUsers.js
   node seedMatches.js
   ```

6. **Start the application**
   ```bash
   # Start backend (in backend directory)
   npm start
   
   # Start frontend (in frontend directory)
   npm start
   ```

## 📱 Usage

### For Travelers
1. **Register/Login** - Create your account
2. **Complete Profile** - Add your travel preferences
3. **Explore Destinations** - Browse available destinations
4. **Find Matches** - Get matched with compatible travelers
5. **Start Chatting** - Connect with your matches
6. **Plan Trips** - Coordinate travel plans

### For Administrators
1. **Login as Admin** - Use admin credentials
2. **Access Dashboard** - View system analytics
3. **Manage Users** - Monitor and control user accounts
4. **Review Matches** - Oversee matching system
5. **Export Data** - Generate reports

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/:id` - Get specific user

### Matchmaking
- `GET /api/match/suggestions` - Get match suggestions
- `POST /api/match/create` - Create new match
- `GET /api/match/user-matches` - Get user's matches

### Chat
- `GET /api/chat/` - Get user chats
- `GET /api/chat/match/:matchId` - Get specific chat
- `POST /api/chat/send` - Send message

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - All users
- `GET /api/admin/matches` - All matches
- `PUT /api/admin/users/:id/status` - Update user status

## 🎯 Key Features Explained

### Matchmaking Algorithm
The platform uses a sophisticated algorithm that considers:
- **Date Overlap** - Travel date compatibility
- **Destination Match** - Same travel destinations
- **Interest Compatibility** - Shared interests and hobbies
- **Travel Style** - Adventure level and preferences
- **Age Range** - Age compatibility
- **Language** - Communication preferences

### Real-time Features
- **Live Chat** - Instant messaging between matched users
- **Typing Indicators** - Real-time typing status
- **Read Receipts** - Message read confirmation
- **Location Sharing** - Share travel locations
- **File Sharing** - Share photos and documents

### Security Features
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt password encryption
- **Input Validation** - Server-side validation
- **CORS Protection** - Cross-origin security
- **Rate Limiting** - API protection

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  age: Number,
  gender: String,
  interests: [String],
  travelStyle: String,
  preferredDestinations: [String],
  profileImage: String,
  isAdmin: Boolean
}
```

### Matches Collection
```javascript
{
  user1: ObjectId,
  user2: ObjectId,
  destination: String,
  date: Date,
  compatibilityScore: Number,
  status: String,
  createdAt: Date
}
```

### Chats Collection
```javascript
{
  matchId: ObjectId,
  participants: [ObjectId],
  messages: [{
    senderId: ObjectId,
    message: String,
    timestamp: Date,
    read: Boolean
  }],
  lastMessage: Date
}
```

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create Heroku app
2. Set environment variables
3. Connect MongoDB Atlas
4. Deploy with Git

### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Set build settings
3. Configure environment variables
4. Deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

- **Developer**: Kitili
- **Project**: SafariConnect
- **Version**: 1.0.0

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**SafariConnect** - Connecting travelers, creating adventures! 🌍✈️

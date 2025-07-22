const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');

// Load environment variables from .env
dotenv.config();

// TEMP DEBUG: Ensure env values are loaded
console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET);
console.log('🌐 FRONTEND_URL:', process.env.FRONTEND_URL);

const app = express();
const server = createServer(app);

// ✅ CORS configuration to allow frontend communication
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // React frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Middleware
app.use(express.json());

// ✅ Optional: Logging during development
if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// ✅ Route imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');
const chatRoutes = require('./routes/chatRoutes');
const tripRoutes = require('./routes/tripRoutes');
const adminRoutes = require('./routes/adminRoutes');

// ✅ API route mounting
app.use('/api/auth', authRoutes);    // /api/auth/signup, /login
app.use('/api/users', userRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/admin', adminRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ Socket.io event handlers
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  // Join a chat room (for matched users)
  socket.on('join-chat', (data) => {
    const { matchId, userId } = data;
    const roomName = `match-${matchId}`;
    socket.join(roomName);
    console.log(`👥 User ${userId} joined chat room: ${roomName}`);
  });

  // Handle new messages
  socket.on('send-message', (data) => {
    const { matchId, senderId, message, messageType = 'text' } = data;
    const roomName = `match-${matchId}`;
    
    const messageData = {
      id: Date.now().toString(),
      matchId,
      senderId,
      message,
      messageType,
      timestamp: new Date(),
      read: false
    };

    // Broadcast to all users in the room
    io.to(roomName).emit('new-message', messageData);
    console.log(`💬 Message sent in room ${roomName}:`, messageData);
  });

  // Handle typing indicators
  socket.on('typing-start', (data) => {
    const { matchId, userId } = data;
    const roomName = `match-${matchId}`;
    socket.to(roomName).emit('user-typing', { userId, isTyping: true });
  });

  socket.on('typing-stop', (data) => {
    const { matchId, userId } = data;
    const roomName = `match-${matchId}`;
    socket.to(roomName).emit('user-typing', { userId, isTyping: false });
  });

  // Handle read receipts
  socket.on('mark-read', (data) => {
    const { matchId, messageId, userId } = data;
    const roomName = `match-${matchId}`;
    io.to(roomName).emit('message-read', { messageId, userId });
  });

  // Handle location sharing
  socket.on('share-location', (data) => {
    const { matchId, senderId, location } = data;
    const roomName = `match-${matchId}`;
    
    const locationData = {
      id: Date.now().toString(),
      matchId,
      senderId,
      messageType: 'location',
      location,
      timestamp: new Date()
    };

    io.to(roomName).emit('new-message', locationData);
    console.log(`📍 Location shared in room ${roomName}:`, locationData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('🔗 Signup route mounted at /api/auth/signup');
  console.log('💬 Socket.io server ready for live chat!');
});

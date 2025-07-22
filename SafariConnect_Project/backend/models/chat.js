const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  messageType: { 
    type: String, 
    enum: ['text', 'image', 'location', 'voice', 'file'], 
    default: 'text' 
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  fileUrl: String,
  fileName: String,
  fileSize: Number,
  read: { type: Boolean, default: false },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [messageSchema],
  lastMessage: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  unreadCount: {
    type: Map,
    of: Number,
    default: new Map()
  }
}, { timestamps: true });

// Index for efficient querying
chatSchema.index({ matchId: 1 });
chatSchema.index({ participants: 1 });
chatSchema.index({ lastMessage: -1 });

// Method to add a new message
chatSchema.methods.addMessage = function(senderId, message, messageType = 'text', location = null, fileData = null) {
  const newMessage = {
    senderId,
    message,
    messageType,
    timestamp: new Date()
  };

  if (location) {
    newMessage.location = location;
  }

  if (fileData) {
    newMessage.fileUrl = fileData.url;
    newMessage.fileName = fileData.name;
    newMessage.fileSize = fileData.size;
  }

  this.messages.push(newMessage);
  this.lastMessage = new Date();
  
  // Update unread count for other participants
  this.participants.forEach(participantId => {
    if (participantId.toString() !== senderId.toString()) {
      const currentCount = this.unreadCount.get(participantId.toString()) || 0;
      this.unreadCount.set(participantId.toString(), currentCount + 1);
    }
  });

  return this.save();
};

// Method to mark messages as read
chatSchema.methods.markAsRead = function(userId, messageIds = null) {
  if (messageIds) {
    // Mark specific messages as read
    this.messages.forEach(msg => {
      if (messageIds.includes(msg._id.toString()) && !msg.readBy.includes(userId)) {
        msg.readBy.push(userId);
        if (msg.readBy.length === this.participants.length) {
          msg.read = true;
        }
      }
    });
  } else {
    // Mark all unread messages as read
    this.messages.forEach(msg => {
      if (!msg.readBy.includes(userId)) {
        msg.readBy.push(userId);
        if (msg.readBy.length === this.participants.length) {
          msg.read = true;
        }
      }
    });
  }

  // Reset unread count for this user
  this.unreadCount.set(userId.toString(), 0);
  
  return this.save();
};

module.exports = mongoose.model('Chat', chatSchema); 
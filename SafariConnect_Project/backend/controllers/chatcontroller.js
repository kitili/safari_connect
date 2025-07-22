const Chat = require('../models/chat');
const Match = require('../models/Match');
const User = require('../models/user');

// Get or create chat for a match
exports.getOrCreateChat = async (req, res) => {
  try {
    const { matchId } = req.params;
    const userId = req.user.id;

    // Verify the match exists and user is a participant
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    if (!match.user1.equals(userId) && !match.user2.equals(userId)) {
      return res.status(403).json({ message: 'Not authorized to access this chat' });
    }

    // Find existing chat or create new one
    let chat = await Chat.findOne({ matchId }).populate('messages.senderId', 'name profileImage');
    
    if (!chat) {
      chat = new Chat({
        matchId,
        participants: [match.user1, match.user2],
        messages: []
      });
      await chat.save();
    }

    // Mark messages as read for this user
    await chat.markAsRead(userId);

    res.json(chat);
  } catch (error) {
    console.error('Error getting chat:', error);
    res.status(500).json({ message: 'Failed to get chat' });
  }
};

// Get all chats for a user
exports.getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({ 
      participants: userId,
      isActive: true 
    })
    .populate('matchId', 'destination date compatibilityScore')
    .populate('participants', 'name profileImage')
    .populate('messages.senderId', 'name profileImage')
    .sort({ lastMessage: -1 });

    // Format chat data for frontend
    const formattedChats = chats.map(chat => {
      const otherParticipant = chat.participants.find(p => p._id.toString() !== userId);
      const unreadCount = chat.unreadCount.get(userId.toString()) || 0;
      
      return {
        id: chat._id,
        matchId: chat.matchId._id,
        destination: chat.matchId.destination,
        matchDate: chat.matchId.date,
        compatibilityScore: chat.matchId.compatibilityScore,
        otherParticipant: {
          id: otherParticipant._id,
          name: otherParticipant.name,
          profileImage: otherParticipant.profileImage
        },
        lastMessage: chat.messages[chat.messages.length - 1] || null,
        unreadCount,
        lastMessageTime: chat.lastMessage
      };
    });

    res.json(formattedChats);
  } catch (error) {
    console.error('Error getting user chats:', error);
    res.status(500).json({ message: 'Failed to get chats' });
  }
};

// Send a message (for REST API fallback)
exports.sendMessage = async (req, res) => {
  try {
    const { matchId, message, messageType = 'text', location, fileData } = req.body;
    const senderId = req.user.id;

    // Verify the match exists and user is a participant
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }

    if (!match.user1.equals(senderId) && !match.user2.equals(senderId)) {
      return res.status(403).json({ message: 'Not authorized to send messages to this chat' });
    }

    // Get or create chat
    let chat = await Chat.findOne({ matchId });
    if (!chat) {
      chat = new Chat({
        matchId,
        participants: [match.user1, match.user2],
        messages: []
      });
    }

    // Add message
    await chat.addMessage(senderId, message, messageType, location, fileData);

    // Populate sender info for response
    await chat.populate('messages.senderId', 'name profileImage');

    const newMessage = chat.messages[chat.messages.length - 1];

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { messageIds } = req.body;
    const userId = req.user.id;

    const chat = await Chat.findOne({ matchId });
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    if (!chat.participants.includes(userId)) {
      return res.status(403).json({ message: 'Not authorized to access this chat' });
    }

    await chat.markAsRead(userId, messageIds);
    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ message: 'Failed to mark messages as read' });
  }
};

// Get chat statistics
exports.getChatStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalChats = await Chat.countDocuments({ 
      participants: userId,
      isActive: true 
    });

    const totalUnread = await Chat.aggregate([
      { $match: { participants: userId, isActive: true } },
      { $group: { _id: null, total: { $sum: { $arrayElemAt: [{ $objectToArray: '$unreadCount' }, 1] } } } }
    ]);

    const unreadCount = totalUnread.length > 0 ? totalUnread[0].total : 0;

    res.json({
      totalChats,
      totalUnread: unreadCount,
      activeChats: totalChats
    });
  } catch (error) {
    console.error('Error getting chat stats:', error);
    res.status(500).json({ message: 'Failed to get chat statistics' });
  }
};

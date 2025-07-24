import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCircle, FaMapMarkerAlt } from 'react-icons/fa';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalChats: 0, totalUnread: 0 });

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      // Load chats and stats in parallel for better performance
      const [chatsResponse, statsResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/chat', {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        }),
        axios.get('http://localhost:5000/api/chat/stats', {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        })
      ]);

      clearTimeout(timeoutId);
      setChats(chatsResponse.data);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error loading chats:', error);
      if (error.name === 'AbortError') {
        toast.error('Chat loading timed out. Please try again.');
      } else {
        toast.error('Failed to load chats');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatLastMessage = (message) => {
    if (!message) return 'No messages yet';
    
    if (message.messageType === 'location') {
      return '📍 Location shared';
    }
    
    return message.message.length > 50 
      ? message.message.substring(0, 50) + '...' 
      : message.message;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-safari-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-safari-200">
      {/* Header */}
      <div className="p-4 border-b border-safari-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">💬 Your Chats</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{stats.totalChats} active chats</span>
            {stats.totalUnread > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                {stats.totalUnread} unread
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="divide-y divide-safari-100">
        {chats.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-lg font-medium mb-2">No chats yet</p>
            <p className="text-sm">Start matching with travelers to begin chatting!</p>
            <Link
              to="/matchmaking"
              className="inline-block mt-4 px-6 py-2 bg-safari-500 text-white rounded-lg hover:bg-safari-600 transition-colors"
            >
              Find Matches
            </Link>
          </div>
        ) : (
          chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chat/${chat.matchId}`}
              className="block p-4 hover:bg-safari-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-safari-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {chat.otherParticipant.name.charAt(0).toUpperCase()}
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                      </span>
                    </div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.otherParticipant.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <FaMapMarkerAlt className="text-safari-500 text-xs" />
                      <span className="text-sm text-gray-600 truncate">
                        {chat.destination}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-safari-600 font-medium">
                      {chat.compatibilityScore}% match
                    </span>
                  </div>
                  
                  <p className={`text-sm mt-1 truncate ${
                    chat.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}>
                    {formatLastMessage(chat.lastMessage)}
                  </p>
                </div>

                {/* Status Indicators */}
                <div className="flex flex-col items-end space-y-1">
                  {chat.unreadCount > 0 && (
                    <FaCircle className="text-safari-500 text-xs" />
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList; 
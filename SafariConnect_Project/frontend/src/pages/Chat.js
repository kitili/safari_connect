import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaPaperPlane, FaMapMarkerAlt, FaImage, FaMicrophone, FaSmile } from 'react-icons/fa';

const Chat = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Socket.io connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('🔌 Connected to chat server');
      // Join the chat room
      newSocket.emit('join-chat', { 
        matchId, 
        userId: localStorage.getItem('userId') || 'anonymous' 
      });
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Disconnected from chat server');
    });

    newSocket.on('new-message', (messageData) => {
      setMessages(prev => [...prev, messageData]);
      // Mark message as read
      newSocket.emit('mark-read', { 
        matchId, 
        messageId: messageData.id, 
        userId: localStorage.getItem('userId') 
      });
    });

    newSocket.on('user-typing', ({ userId, isTyping }) => {
      if (userId !== localStorage.getItem('userId')) {
        setOtherUserTyping(isTyping);
      }
    });

    newSocket.on('message-read', ({ messageId, userId }) => {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, read: true }
          : msg
      ));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [matchId]);

  // Load chat history with timeout and error handling
  useEffect(() => {
    const loadChat = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await axios.get(`http://localhost:5000/api/chat/match/${matchId}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        setChatInfo(response.data);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error('Error loading chat:', error);
        if (error.name === 'AbortError') {
          toast.error('Chat loading timed out. Please try again.');
        } else {
          toast.error('Failed to load chat');
        }
        navigate('/matchmaking');
      } finally {
        setLoading(false);
      }
    };

    if (matchId) {
      loadChat();
    }
  }, [matchId, navigate]);

  // Handle typing indicator
  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing-start', { matchId, userId: localStorage.getItem('userId') });
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket?.emit('typing-stop', { matchId, userId: localStorage.getItem('userId') });
    }, 1000);
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    try {
      setSending(true);
      const messageData = {
        matchId,
        senderId: localStorage.getItem('userId'),
        message: newMessage.trim(),
        messageType: 'text'
      };

      // Send via Socket.io for real-time delivery
      socket?.emit('send-message', messageData);

      // Also save to database via REST API
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/chat/send', messageData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewMessage('');
      setIsTyping(false);
      socket?.emit('typing-stop', { matchId, userId: localStorage.getItem('userId') });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  // Share location
  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            matchId,
            senderId: localStorage.getItem('userId'),
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          };
          socket?.emit('share-location', locationData);
          toast.success('📍 Location shared!');
        },
        (error) => {
          toast.error('Failed to get location');
        }
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-safari-50 to-safari-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-safari-600 mx-auto"></div>
          <p className="mt-4 text-safari-700">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-safari-50 to-safari-100">
      {/* Chat Header */}
      <div className="bg-white shadow-sm border-b border-safari-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/matchmaking')}
                className="text-safari-600 hover:text-safari-700"
              >
                ← Back
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-safari-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {chatInfo?.participants?.find(p => p._id !== localStorage.getItem('userId'))?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {chatInfo?.participants?.find(p => p._id !== localStorage.getItem('userId'))?.name || 'Travel Companion'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {chatInfo?.matchId?.destination || 'Safari Adventure'}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                Compatibility: {chatInfo?.matchId?.compatibilityScore || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-sm border border-safari-200 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => {
                const isOwnMessage = message.senderId === localStorage.getItem('userId');
                
                return (
                  <div
                    key={message.id || message._id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isOwnMessage 
                        ? 'bg-safari-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.messageType === 'location' ? (
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <FaMapMarkerAlt className="text-red-500" />
                            <span className="font-medium">Location Shared</span>
                          </div>
                          <a
                            href={`https://maps.google.com/?q=${message.location.latitude},${message.location.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            View on Map
                          </a>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.message}</p>
                      )}
                      <div className={`text-xs mt-1 ${
                        isOwnMessage ? 'text-safari-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                        {isOwnMessage && (
                          <span className="ml-2">
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            
            {/* Typing Indicator */}
            {otherUserTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-safari-200 p-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={shareLocation}
                className="p-2 text-safari-600 hover:text-safari-700 hover:bg-safari-50 rounded-lg transition-colors"
                title="Share Location"
              >
                <FaMapMarkerAlt />
              </button>
              <button className="p-2 text-safari-600 hover:text-safari-700 hover:bg-safari-50 rounded-lg transition-colors" title="Attach Image">
                <FaImage />
              </button>
              <button className="p-2 text-safari-600 hover:text-safari-700 hover:bg-safari-50 rounded-lg transition-colors" title="Voice Message">
                <FaMicrophone />
              </button>
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border border-safari-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-safari-500 focus:border-transparent resize-none"
                  rows="1"
                  disabled={sending}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || sending}
                className="p-2 bg-safari-500 text-white rounded-lg hover:bg-safari-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Send Message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

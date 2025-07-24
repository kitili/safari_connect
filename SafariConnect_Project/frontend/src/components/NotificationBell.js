import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaCircle } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
    // Refresh notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return;

      // Get chat stats for unread count
      const statsResponse = await axios.get('http://localhost:5000/api/chat/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUnreadCount(statsResponse.data.totalUnread || 0);

      // Get recent chats for notifications
      const chatsResponse = await axios.get('http://localhost:5000/api/chat', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const recentChats = chatsResponse.data
        .filter(chat => chat.unreadCount > 0)
        .slice(0, 5) // Show only 5 most recent
        .map(chat => ({
          id: chat.id,
          type: 'chat',
          title: `New message from ${chat.otherParticipant.name}`,
          message: chat.lastMessage ? chat.lastMessage.message.substring(0, 50) + '...' : 'New message',
          time: chat.lastMessageTime,
          unreadCount: chat.unreadCount,
          matchId: chat.matchId
        }));

      setNotifications(recentChats);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = (now - messageTime) / (1000 * 60);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return messageTime.toLocaleDateString();
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'chat') {
      // Navigate to chat
      window.location.href = `/chat/${notification.matchId}`;
    }
    setIsOpen(false);
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await Promise.all(
        notifications.map(notification =>
          axios.put(`http://localhost:5000/api/chat/${notification.matchId}/read`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      );
      
      setUnreadCount(0);
      setNotifications([]);
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      toast.error('Failed to mark notifications as read');
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-safari-600 transition-colors"
        title="Notifications"
      >
        <FaBell className="text-xl" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </div>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-safari-600 hover:text-safari-700"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-safari-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <FaBell className="text-2xl mx-auto mb-2 text-gray-300" />
                <p>No new notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <FaCircle className="text-safari-500 text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTime(notification.time)}
                        </p>
                      </div>
                      {notification.unreadCount > 0 && (
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-safari-100 text-safari-800">
                            {notification.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <Link
                to="/chat"
                className="block text-center text-sm text-safari-600 hover:text-safari-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                View all chats
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell; 
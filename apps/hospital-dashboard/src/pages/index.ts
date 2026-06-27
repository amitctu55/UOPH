import React from 'react';

function StaffManagementPage() {
  return (
    <div className="page-container">
      <h1>Staff Management</h1>
      <div className="page-content">
        <p>Manage hospital staff schedules, credentials, and performance</p>
      </div>
    </div>
  );
}

function StaffDetailPage() {
  return (
    <div className="page-container">
      <h1>Staff Details</h1>
      <div className="page-content">
        <p>View and edit individual staff member details</p>
      </div>
    </div>
  );
}

function PatientManagementPage() {
  return (
    <div className="page-container">
      <h1>Patient Management</h1>
      <div className="page-content">
        <p>Manage patient admissions, transfers, and discharges</p>
      </div>
    </div>
  );
}

function PatientDetailPage() {
  return (
    <div className="page-container">
      <h1>Patient Details</h1>
      <div className="page-content">
        <p>View and edit individual patient information</p>
      </div>
    </div>
  );
}

function ResourceManagementPage() {
  return (
    <div className="page-container">
      <h1>Resource Management</h1>
      <div className="page-content">
        <p>Manage operating rooms, equipment, and bed allocation</p>
      </div>
    </div>
  );
}

function FinancePage() {
  return (
    <div className="page-container">
      <h1>Financial Management</h1>
      <div className="page-content">
        <p>Track revenue, expenses, and financial performance</p>
      </div>
    </div>
  );
}

function InventoryPage() {
  return (
    <div className="page-container">
      <h1>Inventory Management</h1>
      <div className="page-content">
        <p>Track medical supplies and pharmaceutical inventory</p>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="page-container">
      <h1>Analytics & Reporting</h1>
      <div className="page-content">
        <p>View performance metrics and generate reports</p>
      </div>
    </div>
  );
}

function NotificationsPage() {
  return (
    <div className="page-container">
      <h1>Notifications</h1>
      <div className="page-content">
        <p>View and manage system notifications</p>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page-container">
      <h1>Settings</h1>
      <div className="page-content">
        <p>Configure hospital settings and preferences</p>
      </div>
    </div>
  );
}

function ChatPage() {
  const [conversations, setConversations] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedConversationId, setSelectedConversationId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [typingUsers, setTypingUsers] = React.useState<string[]>([]);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    // Load conversations
    const loadConversations = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would call an API
        // For now, we'll simulate with mock data
        const mockConversations = [
          {
            id: '1',
            participants: [{ id: 'staff1', name: 'Dr. Smith', role: 'physician' }],
            lastMessage: 'Patient in room 305 needs immediate attention',
            lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
            unreadCount: 2
          },
          {
            id: '2',
            participants: [{ id: 'staff2', name: 'Nurse Johnson', role: 'nurse' }],
            lastMessage: 'Medication administered for patient in ICU',
            lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
            unreadCount: 0
          },
          {
            id: '3',
            participants: [{ id: 'staff3', name: 'Dr. Williams', role: 'surgeon' }],
            lastMessage: 'OR 2 is ready for the 3PM procedure',
            lastUpdated: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            unreadCount: 0
          }
        ];
        setConversations(mockConversations);
        if (mockConversations.length > 0) {
          setSelectedConversationId(mockConversations[0].id);
          loadMessages(mockConversations[0].id);
        }
      } catch (error) {
        console.error('Failed to load conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  React.useEffect(() => {
    if (selectedConversationId) {
      // Load messages for selected conversation
      const loadMessages = async (conversationId: string) => {
        setIsLoading(true);
        try {
          // In a real app, this would call an API
          // For now, we'll simulate with mock data
          const mockMessages = [
            {
              id: '1',
              conversationId: conversationId,
              senderId: 'staff1',
              content: 'Patient in room 305 needs immediate attention',
              timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString() // 10 minutes ago
            },
            {
              id: '2',
              conversationId: conversationId,
              senderId: 'user',
              content: 'On my way to check on them now',
              timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString() // 8 minutes ago
            },
            {
              id: '3',
              conversationId: conversationId,
              senderId: 'staff1',
              content: 'Thanks, they\'re experiencing chest pain',
              timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() // 5 minutes ago
            }
          ];
          setMessages(mockMessages);
        } catch (error) {
          console.error('Failed to load messages:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadMessages(selectedConversationId);
    }
  }, [selectedConversationId]);

  // Simulate typing indicator (would be replaced with real-time updates)
  React.useEffect(() => {
    if (selectedConversationId) {
      const typingInterval = setInterval(() => {
        // Simulate random typing indicators
        if (Math.random() > 0.7) {
          setTypingUsers(['Someone is typing...']);
        } else {
          setTypingUsers([]);
        }
      }, 3000);
      return () => clearInterval(typingInterval);
    }
  }, [selectedConversationId]);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedConversationId) return;

    try {
      // In a real app, this would call an API
      // For now, we'll simulate the message sending
      const newMessage = {
        id: Date.now().toString(),
        conversationId: selectedConversationId,
        senderId: 'user',
        content: inputValue,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      // Scroll to bottom after sending
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e); // Actually send the message when Enter is pressed
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <h1>Messages</h1>
        <div className="page-content">
          <div className="loading">Loading messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Messages</h1>
      <div className="page-content">
        <div className="chat-container">
          <div className="chat-sidebar">
            <h3>Conversations</h3>
            <button className="btn-primary" onClick={() => {
              // Start new conversation
              alert('Start new conversation functionality would go here');
            }}>
              New Message
            </button>
            <div className="conversations-list">
              {conversations.length > 0 ? (
                conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`conversation-item ${conversation.id === selectedConversationId ? 'active' : ''}`}
                    onClick={() => setSelectedConversationId(conversation.id)}
                  >
                    <div className="conversation-avatar">
                      {conversation.participants[0]?.name.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="conversation-info">
                      <h4>{conversation.participants[0]?.name || 'Unknown User'}</h4>
                      <p className="conversation-preview">{conversation.lastMessage || 'No messages yet'}</p>
                    </div>
                    <div className="conversation-meta">
                      <small>{conversation.lastUpdated ? new Date(conversation.lastUpdated).toLocaleTimeString() : ''}</small>
                      {conversation.unreadCount > 0 && (
                        <span className="unread-badge">{conversation.unreadCount}</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">No conversations yet. Start a new conversation!</p>
              )}
            </div>
          </div>
          <div className="chat-main">
            {!selectedConversationId ? (
              <div className="chat-empty">
                <h3>Select a conversation to get started</h3>
                <p>Choose a conversation from the list or start a new one.</p>
              </div>
            ) : (
              <div>
                <div className="chat-header">
                  <div className="chat-user-info">
                    <div className="chat-user-avatar">
                      {conversations.find(c => c.id === selectedConversationId)?.participants[0]?.name.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="chat-user-details">
                      <h4>{conversations.find(c => c.id === selectedConversationId)?.participants[0]?.name || 'Unknown User'}</h4>
                      <p className="chat-user-status">Online</p>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button className="btn-icon" onClick={() => {
                      // Video call
                      alert('Start video call');
                    }}>
                      📹
                    </button>
                    <button className="btn-icon" onClick={() => {
                      // Audio call
                      alert('Start audio call');
                    }}>
                      📞
                    </button>
                    <button className="btn-icon" onClick={() => {
                      // Contact info
                      alert('View contact info');
                    }}>
                      ℹ️
                    </button>
                  </div>
                </div>

                <div className="chat-window">
                  <div className="chat-messages">
                    {/* Group messages by date */}
                    {messages.reduce((groups, message) => {
                      const date = new Date(message.timestamp).toDateString();
                      if (!groups[date]) {
                        groups[date] = [];
                      }
                      groups[date].push(message);
                      return groups;
                    }, {} as Record<string, typeof messages>)}

                    {(Object.keys(groups) as string[]).map((date, dateIndex) => (
                      <>
                        {/* Date header */}
                        <div key={`date-${date}`} className="message-date-header">
                          <span>{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>

                        {/* Messages for this date */}
                        {groups[date].map((message, msgIndex) => (
                          <div key={`${date}-${msgIndex}`} className={`message ${message.senderId === 'user' ? 'message-sent' : 'message-received'}`}>
                            <div className="message-content">
                              <p>{message.content}</p>
                              <small className="message-time">{new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                            </div>
                          </div>
                        ))}
                      </>
                    ))}

                    {/* Typing indicator */}
                    {typingUsers.map((user, index) => (
                      <div key={index} className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <span>{user}</span>
                      </div>
                    ))}

                    {messages.length === 0 && typingUsers.length === 0 && (
                      <div ref={messagesEndRef} className="chat-empty">
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    )}
                  </div>

                  <form onSubmit={sendMessage} className="chat-input-form">
                    <div className="chat-input-wrapper">
                      <div className="chat-input-actions">
                        <button type="button" className="btn-icon" onClick={() => {
                          // Emoji picker
                          alert('Emoji picker would open here');
                        }}>
                          😊
                        </button>
                        <button type="button" className="btn-icon" onClick={() => {
                          // File attachment
                          alert('File picker would open here');
                        }}>
                          📎
                        </button>
                      </div>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="chat-input"
                      />
                      <button type="submit" className="btn-primary">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              )}
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export {
  StaffManagementPage,
  StaffDetailPage,
  PatientManagementPage,
  PatientDetailPage,
  ResourceManagementPage,
  FinancePage,
  InventoryPage,
  AnalyticsPage,
  NotificationsPage,
  SettingsPage,
  ChatPage
};
"use client";
import React, { useState } from 'react';
import { MESSAGES, CALLERS, CURRENT_USER } from '@/data/mockData';
import { 
  Search, 
  Send, 
  Star,
  AlertCircle,
  Check,
  CheckCheck,
  MoreVertical,
  Paperclip,
  Image,
  Smile,
  User,
  Clock,
  Phone,
  ExternalLink,
  Filter
} from 'lucide-react';

function ConversationList({ conversations, selectedId, onSelect }) {
  const getInitials = (conv) => {
    const name = conv.from?.name || conv.from || '';
    return name.split(' ').map(n => n[0]).join('');
  };

  const getName = (conv) => conv.from?.name || conv.from || 'Unknown';
  
  const getTime = (conv) => {
    if (conv.time) return conv.time;
    if (conv.timestamp) {
      const date = new Date(conv.timestamp);
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return '';
  };

  const getPreview = (conv) => conv.preview || conv.message?.substring(0, 60) + '...' || conv.subject || '';
  
  const isUnread = (conv) => conv.unread || !conv.read;

  const getPriority = (conv) => conv.priority === 'high' || conv.priority === 'urgent';

  return (
    <div className="conversation-list">
      <div className="list-header">
        <h3>Messages</h3>
        <span className="unread-count">
          {conversations.filter(c => isUnread(c)).length} new
        </span>
      </div>

      <div className="search-box">
        <Search size={14} className="search-icon" />
        <input type="text" placeholder="Search conversations..." className="search-input" />
      </div>

      <div className="filter-tabs">
        <button className="filter-tab active">All</button>
        <button className="filter-tab">Unread</button>
        <button className="filter-tab">Priority</button>
      </div>

      <div className="conversations">
        {conversations.map((conv) => (
          <div 
            key={conv.id}
            className={`conversation-item ${selectedId === conv.id ? 'active' : ''} ${isUnread(conv) ? 'unread' : ''}`}
            onClick={() => onSelect(conv)}
          >
            {getPriority(conv) && (
              <div className="priority-indicator">
                <AlertCircle size={12} />
              </div>
            )}
            <div className="conv-avatar">
              {conv.from?.avatar || getInitials(conv)}
            </div>
            <div className="conv-content">
              <div className="conv-header">
                <span className="conv-name">{getName(conv)}</span>
                <span className="conv-time">{getTime(conv)}</span>
              </div>
              <div className="conv-preview">
                {getPreview(conv)}
              </div>
              <div className="conv-meta">
                {conv.leadId && (
                  <span className="lead-tag">
                    <User size={10} />
                    Lead #{conv.leadId}
                  </span>
                )}
                {conv.callerRef && (
                  <span className="caller-tag">
                    <Phone size={10} />
                    {conv.callerRef}
                  </span>
                )}
              </div>
            </div>
            {isUnread(conv) && <span className="unread-dot" />}
          </div>
        ))}
      </div>

      <style jsx>{`
        .conversation-list {
          width: 340px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .list-header h3 {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .unread-count {
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 0.25rem 0.625rem;
          background: rgba(245, 158, 11, 0.1);
          color: #2563eb;
          border-radius: 9999px;
        }

        .search-box {
          position: relative;
          padding: 0 1rem;
          margin-bottom: 0.75rem;
        }

        :global(.search-icon) {
          position: absolute;
          left: 1.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .search-input {
          width: 100%;
          padding: 0.625rem 1rem 0.625rem 2.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.625rem;
          font-size: 0.8125rem;
          color: var(--text-primary);
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(59, 130, 246, 0.5);
        }

        .filter-tabs {
          display: flex;
          gap: 0.25rem;
          padding: 0 1rem 0.75rem;
        }

        .filter-tab {
          padding: 0.375rem 0.75rem;
          background: transparent;
          border: none;
          border-radius: 9999px;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-tab:hover {
          color: var(--text-secondary);
        }

        .filter-tab.active {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
        }

        .conversations {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .conversation-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .conversation-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .conversation-item.active {
          background: rgba(59, 130, 246, 0.12);
        }

        .conversation-item.unread {
          background: rgba(59, 130, 246, 0.08);
        }

        .priority-indicator {
          position: absolute;
          top: 8px;
          right: 8px;
          color: #ef4444;
        }

        .conv-avatar {
          width: 44px;
          height: 44px;
          border-radius: 0.875rem;
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.8125rem;
          flex-shrink: 0;
        }

        .conv-content {
          flex: 1;
          min-width: 0;
        }

        .conv-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.25rem;
        }

        .conv-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .conversation-item.unread .conv-name {
          font-weight: 700;
        }

        .conv-time {
          font-size: 0.6875rem;
          color: var(--text-tertiary);
        }

        .conv-preview {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0.375rem;
        }

        .conversation-item.unread .conv-preview {
          color: var(--text-primary);
          font-weight: 500;
        }

        .conv-meta {
          display: flex;
          gap: 0.5rem;
        }

        .lead-tag, .caller-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.625rem;
          font-weight: 600;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
        }

        .lead-tag {
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
        }

        .caller-tag {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          flex-shrink: 0;
          margin-top: 0.375rem;
        }
      `}</style>
    </div>
  );
}

function MessageThread({ conversation }) {
  const [newMessage, setNewMessage] = useState('');

  if (!conversation) {
    return (
      <div className="empty-thread glass-card">
        <div className="empty-icon">
          <Send size={48} />
        </div>
        <h3>Select a conversation</h3>
        <p>Choose a conversation from the list to view messages</p>

        <style jsx>{`
          .empty-thread {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            border-radius: 1.5rem;
          }

          .empty-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: rgba(245, 158, 11, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #3b82f6;
            margin-bottom: 1.25rem;
          }

          h3 {
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 0.375rem;
          }

          p {
            font-size: 0.875rem;
            color: var(--text-tertiary);
          }
        `}</style>
      </div>
    );
  }

  const getConvName = (conv) => conv?.from?.name || conv?.from || 'Unknown';
  const getConvAvatar = (conv) => conv?.from?.avatar || getConvName(conv).split(' ').map(n => n[0]).join('');
  const getPriorityFlag = (conv) => conv?.priority === 'high' || conv?.priority === 'urgent';
  
  // Transform conversation to messages array
  const getMessages = (conv) => {
    if (conv?.messages && Array.isArray(conv.messages)) return conv.messages;
    
    // Create messages from the conversation's message and thread
    const messages = [];
    if (conv?.message) {
      messages.push({
        sender: conv.from?.name || conv.from || 'Unknown',
        text: conv.message,
        time: conv.timestamp ? new Date(conv.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
        read: conv.read,
      });
    }
    if (conv?.thread && Array.isArray(conv.thread)) {
      messages.push(...conv.thread);
    }
    return messages;
  };

  return (
    <div className="message-thread glass-card">
      <div className="thread-header">
        <div className="header-left">
          <div className="thread-avatar">
            {getConvAvatar(conversation)}
          </div>
          <div className="thread-info">
            <h3>{getConvName(conversation)}</h3>
            <span className="online-status">
              <span className="status-dot" />
              Online
            </span>
          </div>
        </div>
        <div className="header-actions">
          {getPriorityFlag(conversation) && (
            <span className="priority-badge">
              <AlertCircle size={12} />
              High Priority
            </span>
          )}
          <button className="action-btn">
            <Star size={18} />
          </button>
          <button className="action-btn">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {(conversation.leadId || conversation.callerRef) && (
        <div className="context-bar">
          {conversation.leadId && (
            <div className="context-item">
              <User size={14} />
              <span>Linked Lead: <strong>Lead #{conversation.leadId}</strong></span>
              <button className="view-link">
                <ExternalLink size={12} />
              </button>
            </div>
          )}
          {conversation.callerRef && (
            <div className="context-item">
              <Phone size={14} />
              <span>Caller: <strong>{conversation.callerRef}</strong></span>
            </div>
          )}
        </div>
      )}

      <div className="messages-area">
        {getMessages(conversation).map((msg, i) => (
          <div 
            key={i} 
            className={`message ${msg.sender === CURRENT_USER.name ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p>{msg.text || msg.message}</p>
              <div className="message-meta">
                <span className="message-time">{msg.time || ''}</span>
                {msg.sender === CURRENT_USER.name && (
                  <span className="read-status">
                    {msg.read ? <CheckCheck size={14} /> : <Check size={14} />}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="compose-area">
        <div className="compose-actions">
          <button className="compose-btn">
            <Paperclip size={18} />
          </button>
          <button className="compose-btn">
            <Image size={18} />
          </button>
          <button className="compose-btn">
            <Smile size={18} />
          </button>
        </div>
        <div className="compose-input-wrapper">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="compose-input"
          />
        </div>
        <button className="send-btn">
          <Send size={18} />
        </button>
      </div>

      <style jsx>{`
        .message-thread {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-radius: 1.5rem;
          overflow: hidden;
        }

        .thread-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, transparent 100%);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }

        .thread-avatar {
          width: 48px;
          height: 48px;
          border-radius: 1rem;
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.9375rem;
        }

        .thread-info h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.125rem;
        }

        .online-status {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: #10b981;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .priority-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-right: 0.5rem;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 0.625rem;
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: rgba(0, 0, 0, 0.04);
          color: var(--text-primary);
        }

        .context-bar {
          display: flex;
          gap: 1rem;
          padding: 0.875rem 1.5rem;
          background: rgba(139, 92, 246, 0.04);
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .context-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .context-item strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .view-link {
          width: 24px;
          height: 24px;
          border-radius: 0.375rem;
          background: transparent;
          border: none;
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-link:hover {
          background: rgba(139, 92, 246, 0.1);
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message {
          display: flex;
          max-width: 70%;
        }

        .message.sent {
          align-self: flex-end;
        }

        .message.received {
          align-self: flex-start;
        }

        .message-content {
          padding: 0.875rem 1.125rem;
          border-radius: 1.25rem;
        }

        .message.sent .message-content {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border-bottom-right-radius: 0.375rem;
        }

        .message.received .message-content {
          background: rgba(0, 0, 0, 0.04);
          color: var(--text-primary);
          border-bottom-left-radius: 0.375rem;
        }

        .message-content p {
          font-size: 0.9375rem;
          line-height: 1.5;
          margin-bottom: 0.375rem;
        }

        .message-meta {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 0.375rem;
        }

        .message-time {
          font-size: 0.6875rem;
          opacity: 0.7;
        }

        .read-status {
          display: flex;
          align-items: center;
          opacity: 0.7;
        }

        .compose-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
          background: rgba(255, 255, 255, 0.5);
        }

        .compose-actions {
          display: flex;
          gap: 0.25rem;
        }

        .compose-btn {
          width: 36px;
          height: 36px;
          border-radius: 0.625rem;
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .compose-btn:hover {
          background: rgba(0, 0, 0, 0.04);
          color: var(--text-secondary);
        }

        .compose-input-wrapper {
          flex: 1;
        }

        .compose-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 1rem;
          font-size: 0.9375rem;
          color: var(--text-primary);
          outline: none;
          transition: all 0.2s ease;
        }

        .compose-input:focus {
          background: white;
          border-color: rgba(245, 158, 11, 0.3);
        }

        .compose-input::placeholder {
          color: var(--text-tertiary);
        }

        .send-btn {
          width: 44px;
          height: 44px;
          border-radius: 1rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .send-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45);
        }
      `}</style>
    </div>
  );
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="messages-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Messages</h1>
          <p className="page-subtitle">Team communication and lead discussions</p>
        </div>
        <div className="header-actions">
          <button className="new-message-btn">
            <Send size={16} />
            New Message
          </button>
        </div>
      </header>

      <div className="messages-container">
        <ConversationList
          conversations={MESSAGES}
          selectedId={selectedConversation?.id}
          onSelect={setSelectedConversation}
        />
        <MessageThread conversation={selectedConversation} />
      </div>

      <style jsx>{`
        .messages-page {
          padding-bottom: 2rem;
          height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.5rem;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }

        .page-subtitle {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .new-message-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 0.75rem;
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .new-message-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45);
        }

        .messages-container {
          flex: 1;
          display: flex;
          gap: 1.5rem;
          min-height: 0;
        }
      `}</style>
    </div>
  );
}

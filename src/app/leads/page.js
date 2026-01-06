"use client";
import React, { useState, useEffect } from 'react';
import { RECENT_LEADS, CRM_DELIVERY_LOG, SYSTEM_STATUS } from '@/data/mockData';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Send, 
  Trash2, 
  AlertCircle, 
  CheckCircle, 
  X,
  Phone,
  MapPin,
  User,
  Clock,
  Home,
  MessageSquare,
  Flag,
  RefreshCw,
  ExternalLink,
  PlayCircle,
  Zap,
  Calendar
} from 'lucide-react';

function CRMStatusBanner() {
  const { crmConnection } = SYSTEM_STATUS;
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className={`crm-status-banner glass-card ${mounted ? 'mounted' : ''}`}>
      <div className="status-indicator">
        <span className={`status-dot ${crmConnection.status}`} />
        <span className="status-text">CRM {crmConnection.status === 'connected' ? 'Connected' : 'Disconnected'}</span>
      </div>
      <div className="status-details">
        <span>Last sync: {new Date(crmConnection.lastSync).toLocaleTimeString()}</span>
        {crmConnection.pendingDeliveries > 0 && (
          <span className="pending-badge">{crmConnection.pendingDeliveries} pending</span>
        )}
      </div>

      <style jsx>{`
        .crm-status-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: 1.25rem;
          margin-bottom: 1.25rem;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .crm-status-banner.mounted {
          opacity: 1;
          transform: translateY(0);
        }
        
        .crm-status-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmerBanner 3s ease-in-out infinite;
        }
        
        @keyframes shimmerBanner {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          position: relative;
        }
        
        .status-dot::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .status-dot.connected {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.6);
        }
        
        .status-dot.connected::before {
          background: rgba(16, 185, 129, 0.3);
        }

        .status-dot.disconnected {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.6);
        }
        
        .status-dot.disconnected::before {
          background: rgba(239, 68, 68, 0.3);
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0; }
        }

        .status-text {
          font-size: 0.875rem;
          font-weight: 650;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .status-details {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .pending-badge {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%);
          color: #d97706;
          padding: 0.3rem 0.625rem;
          border-radius: 9999px;
          font-weight: 650;
          box-shadow: 0 2px 6px rgba(245, 158, 11, 0.15);
        }
      `}</style>
    </div>
  );
}

function LeadCard({ lead, isSelected, onClick }) {
  const interestColors = {
    Hot: { bg: 'rgba(239, 68, 68, 0.1)', text: '#dc2626' },
    Warm: { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706' },
    Cold: { bg: 'rgba(99, 102, 241, 0.1)', text: '#4f46e5' },
  };

  const statusColors = {
    Pending: { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706' },
    Accepted: { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669' },
    'Sent to CRM': { bg: 'rgba(59, 130, 246, 0.1)', text: '#2563eb' },
  };

  const interest = interestColors[lead.interest] || interestColors.Warm;
  const status = statusColors[lead.status] || statusColors.Pending;

  return (
    <div 
      className={`lead-card ${isSelected ? 'selected' : ''} ${lead.flagged ? 'flagged' : ''}`}
      onClick={onClick}
    >
      {lead.flagged && (
        <div className="flagged-indicator">
          <Flag size={12} />
        </div>
      )}
      
      <div className="lead-main">
        <div className="lead-avatar">
          {lead.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="lead-info">
          <h4 className="lead-name">{lead.name}</h4>
          <div className="lead-location">
            <MapPin size={12} />
            {lead.city}, {lead.state}
          </div>
        </div>
      </div>

      <div className="lead-meta">
        <span className="lead-interest" style={{ background: interest.bg, color: interest.text }}>
          {lead.interest}
        </span>
        <span className="lead-status" style={{ background: status.bg, color: status.text }}>
          {lead.status}
        </span>
      </div>

      <div className="lead-caller">
        <span className="caller-avatar">
          {lead.caller.split(' ').map(n => n[0]).join('')}
        </span>
        <span className="caller-name">{lead.caller}</span>
      </div>

      <div className="lead-time">
        <Clock size={12} />
        {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>

      <div className={`lead-chevron ${isSelected ? 'active' : ''}`}>
        <ChevronRight size={16} />
      </div>

      <style jsx>{`
        .lead-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .lead-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
        }

        .lead-card.selected {
          background: rgba(59, 130, 246, 0.12);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
        }

        .lead-card.flagged {
          border-left: 3px solid #3b82f6;
        }

        .flagged-indicator {
          position: absolute;
          top: -6px;
          right: -6px;
          width: 22px;
          height: 22px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
        }

        .lead-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 0;
        }

        .lead-avatar {
          width: 42px;
          height: 42px;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.8125rem;
          flex-shrink: 0;
        }

        .lead-info {
          min-width: 0;
        }

        .lead-name {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.125rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lead-location {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .lead-meta {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          align-items: flex-end;
        }

        .lead-interest, .lead-status {
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .lead-caller {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 120px;
        }

        .caller-avatar {
          width: 28px;
          height: 28px;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.625rem;
        }

        .caller-name {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .lead-time {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          min-width: 70px;
        }

        .lead-chevron {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          transition: all 0.2s ease;
        }

        .lead-chevron.active {
          background: #3b82f6;
          color: white;
        }

        /* Mobile responsive for LeadCard */
        @media (max-width: 768px) {
          .lead-card {
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .lead-main {
            flex: 1 1 100%;
            min-width: auto;
          }

          .lead-meta {
            flex-direction: row;
            gap: 0.5rem;
          }

          .lead-caller {
            display: none;
          }

          .lead-time {
            min-width: auto;
          }

          .lead-chevron {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .lead-card {
            padding: 0.875rem;
          }

          .lead-avatar {
            width: 36px;
            height: 36px;
            font-size: 0.75rem;
          }

          .lead-name {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}

function LeadDetailPanel({ lead, onClose, onAction }) {
  if (!lead) return null;

  return (
    <div className="lead-detail-panel glass-card">
      <div className="panel-header">
        <div className="header-top">
          <span className="detail-label">Lead Details</span>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <h2 className="lead-name">{lead.name}</h2>
        <p className="lead-address">
          <MapPin size={14} />
          {lead.address}, {lead.city}, {lead.state} {lead.zip}
        </p>
      </div>

      <div className="panel-actions">
        <button 
          className="action-btn success"
          onClick={() => onAction(lead.id, 'accept')}
        >
          <CheckCircle size={18} />
          Accept Lead
        </button>
        <button className="action-btn secondary">
          <Trash2 size={18} />
          Archive
        </button>
      </div>

      {lead.status === 'Pending' && lead.pendingSince && (
        <div className="pending-alert">
          <AlertCircle size={18} />
          <div>
            <span className="alert-title">Pending Review</span>
            <span className="alert-time">Since {lead.pendingSince}</span>
          </div>
        </div>
      )}

      <div className="info-grid">
        <div className="info-item">
          <span className="info-icon"><Phone size={16} /></span>
          <div>
            <span className="info-label">Phone</span>
            <span className="info-value">{lead.phone}</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon"><Home size={16} /></span>
          <div>
            <span className="info-label">Homeowner</span>
            <span className="info-value">{lead.isHomeowner ? 'Yes' : 'No'}</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon"><Calendar size={16} /></span>
          <div>
            <span className="info-label">Roof Age</span>
            <span className="info-value">{lead.roofAge}</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon"><Zap size={16} /></span>
          <div>
            <span className="info-label">Roof Type</span>
            <span className="info-value">{lead.roofType}</span>
          </div>
        </div>
      </div>

      <div className="notes-section">
        <h4>Caller Notes</h4>
        <div className="notes-content">
          "{lead.notes}"
        </div>
        <div className="call-info">
          <span className="call-duration">
            <Clock size={12} />
            Call: {lead.callDuration}
          </span>
          <button className="listen-btn">
            <PlayCircle size={14} />
            Listen
          </button>
        </div>
      </div>

      <div className="meta-section">
        <div className="meta-item">
          <span className="meta-label">Caller</span>
          <div className="meta-caller">
            <span className="caller-avatar">
              {lead.caller.split(' ').map(n => n[0]).join('')}
            </span>
            {lead.caller}
          </div>
        </div>
        <div className="meta-item">
          <span className="meta-label">Timestamp</span>
          <span className="meta-value">
            {new Date(lead.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="panel-footer">
        <button className="crm-btn">
          <Send size={18} />
          Push to Bison CRM
        </button>
      </div>

      <style jsx>{`
        .lead-detail-panel {
          width: 420px;
          display: flex;
          flex-direction: column;
          border-radius: 1.5rem;
          overflow-y: auto;
          overflow-x: hidden;
          max-height: calc(100vh - 280px);
          animation: slideInRight 0.3s ease;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .panel-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .detail-label {
          font-size: 0.6875rem;
          font-weight: 700;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: var(--text-primary);
        }

        .lead-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 0.375rem;
        }

        .lead-address {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .panel-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem;
          border-radius: 0.875rem;
          border: none;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn.success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
        }

        .action-btn.success:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .action-btn.secondary {
          background: rgba(0, 0, 0, 0.04);
          color: var(--text-secondary);
        }

        .action-btn.secondary:hover {
          background: rgba(0, 0, 0, 0.08);
        }

        .pending-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0 1.5rem 1rem;
          padding: 0.875rem 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 0.875rem;
          color: #d97706;
        }

        .alert-title {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .alert-time {
          display: block;
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          padding: 0 1.5rem 1.25rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.75rem;
        }

        .info-icon {
          width: 32px;
          height: 32px;
          border-radius: 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info-label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 500;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .info-value {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .notes-section {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .notes-section h4 {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.625rem;
        }

        .notes-content {
          padding: 1rem;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%);
          border-left: 3px solid #3b82f6;
          border-radius: 0 0.75rem 0.75rem 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-style: italic;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .call-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .call-duration {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }

        .listen-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: rgba(139, 92, 246, 0.1);
          border: none;
          border-radius: 9999px;
          color: #7c3aed;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .listen-btn:hover {
          background: rgba(139, 92, 246, 0.15);
        }

        .meta-section {
          display: flex;
          gap: 1.5rem;
          padding: 1.25rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .meta-item {
          flex: 1;
        }

        .meta-label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.375rem;
        }

        .meta-caller {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .caller-avatar {
          width: 24px;
          height: 24px;
          border-radius: 0.375rem;
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.5rem;
          font-weight: 700;
        }

        .meta-value {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .panel-footer {
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: auto;
        }

        .crm-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          padding: 1rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 0.875rem;
          color: white;
          font-size: 0.9375rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
        }

        .crm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
        }

        /* Mobile responsive for LeadDetailPanel */
        @media (max-width: 1024px) {
          .lead-detail-panel {
            width: 100%;
            max-height: 50vh;
          }
        }

        @media (max-width: 768px) {
          .lead-detail-panel {
            border-radius: 1.25rem;
          }

          .panel-header {
            padding: 1.25rem;
          }

          .lead-name {
            font-size: 1.25rem;
          }

          .lead-address {
            font-size: 0.8125rem;
          }

          .panel-actions {
            padding: 1rem;
            gap: 0.5rem;
          }

          .action-btn {
            padding: 0.75rem;
            font-size: 0.75rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
            padding: 0 1.25rem 1rem;
          }

          .meta-section {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState(RECENT_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAction = (id, action) => {
    if (action === 'accept') {
      const updated = leads.map(l => l.id === id ? { ...l, status: 'Accepted' } : l);
      setLeads(updated);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: 'Accepted' });
      }
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = leads.filter(l => l.status === 'Pending').length;

  return (
    <div className="leads-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Live Leads</h1>
          <p className="page-subtitle">Manage incoming leads and CRM delivery</p>
        </div>
        <div className="header-stats">
          <div className="stat-badge pending">
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-label">Pending Review</span>
          </div>
          <div className="stat-badge">
            <span className="stat-value">{leads.length}</span>
            <span className="stat-label">Total Today</span>
          </div>
        </div>
      </header>

      <CRMStatusBanner />

      <div className="leads-container">
        <div className={`leads-list-section ${selectedLead ? 'with-panel' : ''}`}>
          <div className="list-toolbar">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-group">
              {['all', 'Pending', 'Accepted', 'Sent to CRM'].map((status) => (
                <button
                  key={status}
                  className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                  onClick={() => setFilterStatus(status)}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>

          <div className="leads-list">
            {filteredLeads.map(lead => (
              <LeadCard
                key={lead.id}
                lead={lead}
                isSelected={selectedLead?.id === lead.id}
                onClick={() => setSelectedLead(lead)}
              />
            ))}
          </div>
        </div>

        {selectedLead && (
          <LeadDetailPanel
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onAction={handleAction}
          />
        )}
      </div>

      <style jsx>{`
        .leads-page {
          padding-bottom: 2rem;
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

        .header-stats {
          display: flex;
          gap: 0.75rem;
        }

        .stat-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.875rem;
        }

        .stat-badge.pending {
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.2);
        }

        .stat-badge .stat-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-badge.pending .stat-value {
          color: #d97706;
        }

        .stat-badge .stat-label {
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .leads-container {
          display: flex;
          gap: 1.5rem;
          height: calc(100vh - 280px);
          min-height: 500px;
        }

        .leads-list-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .leads-list-section.with-panel {
          flex: 1;
        }

        .list-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
        }

        .search-box {
          position: relative;
          width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-tertiary);
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-primary);
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .search-input::placeholder {
          color: var(--text-tertiary);
        }

        .filter-group {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.625rem;
          padding: 0.25rem;
        }

        .filter-btn {
          padding: 0.5rem 0.875rem;
          background: transparent;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn:hover {
          color: var(--text-primary);
        }

        .filter-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .leads-list {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
          .leads-container {
            flex-direction: column;
            height: auto;
            min-height: auto;
          }

          .leads-list-section {
            max-height: 60vh;
          }

          .leads-list-section.with-panel {
            max-height: 40vh;
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .header-stats {
            width: 100%;
            justify-content: space-between;
          }

          .stat-badge {
            flex: 1;
            padding: 0.625rem 0.75rem;
          }

          .list-toolbar {
            flex-direction: column;
            gap: 0.75rem;
            padding: 1rem;
          }

          .search-box {
            width: 100%;
          }

          .filter-group {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .filter-btn {
            padding: 0.5rem 0.625rem;
            font-size: 0.6875rem;
            white-space: nowrap;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.25rem;
          }

          .leads-list {
            padding: 0.75rem;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}

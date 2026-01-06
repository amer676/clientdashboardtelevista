"use client";
import React, { useState } from 'react';
import { SETTINGS, SLA_CONFIG, USER_ROLES, SYSTEM_STATUS } from '@/data/mockData';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Webhook,
  Clock,
  Users,
  Settings as SettingsIcon,
  ChevronRight,
  Check,
  Toggle,
  Globe,
  Mail,
  Smartphone,
  AlertCircle,
  Save,
  RefreshCw,
  ExternalLink,
  Lock,
  Eye,
  EyeOff,
  Zap
} from 'lucide-react';

function SettingsNav({ activeSection, onSectionChange }) {
  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'sla', label: 'SLA Configuration', icon: Clock },
    { id: 'crm', label: 'CRM Integration', icon: Webhook },
    { id: 'roles', label: 'Role Management', icon: Shield },
    { id: 'system', label: 'System', icon: Database },
  ];

  return (
    <div className="settings-nav">
      <div className="nav-header">
        <SettingsIcon size={18} className="nav-icon" />
        <h3>Settings</h3>
      </div>

      <div className="nav-items">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
          >
            <section.icon size={18} />
            <span>{section.label}</span>
            <ChevronRight size={14} className="chevron" />
          </button>
        ))}
      </div>

      <style jsx>{`
        .settings-nav {
          width: 280px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 1.5rem;
        }

        .nav-header {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        :global(.nav-icon) {
          color: #3b82f6;
        }

        .nav-header h3 {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .nav-items {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.875rem 1rem;
          background: transparent;
          border: none;
          border-radius: 0.875rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
        }

        .nav-item span {
          flex: 1;
        }

        .chevron {
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .nav-item.active .chevron {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .settings-nav {
            width: 240px;
            padding: 1.25rem;
          }

          .nav-item {
            padding: 0.75rem 0.875rem;
            font-size: 0.8125rem;
          }
        }

        @media (max-width: 768px) {
          .settings-nav {
            width: 100%;
            padding: 1rem;
          }

          .nav-items {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .nav-item {
            flex: 1;
            min-width: calc(50% - 0.25rem);
            justify-content: center;
            padding: 0.75rem 0.5rem;
          }

          .nav-item span {
            display: none;
          }

          .chevron {
            display: none;
          }

          .nav-header {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .nav-item {
            min-width: calc(33.333% - 0.35rem);
            padding: 0.625rem 0.375rem;
          }
        }
      `}</style>
    </div>
  );
}

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button 
      className={`toggle-switch ${enabled ? 'enabled' : ''}`}
      onClick={() => onChange(!enabled)}
    >
      <span className="toggle-thumb" />

      <style jsx>{`
        .toggle-switch {
          width: 48px;
          height: 28px;
          border-radius: 9999px;
          border: none;
          background: rgba(0, 0, 0, 0.1);
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .toggle-switch.enabled {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }

        .toggle-switch.enabled .toggle-thumb {
          left: 23px;
        }
      `}</style>
    </button>
  );
}

function ProfileSection() {
  return (
    <div className="section">
      <div className="section-header">
        <h2>Profile Settings</h2>
        <p>Manage your personal information and preferences</p>
      </div>

      <div className="form-group">
        <label>Full Name</label>
        <input type="text" defaultValue="Admin User" className="form-input" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input type="email" defaultValue="admin@televista.com" className="form-input" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" defaultValue="+1 (555) 123-4567" className="form-input" />
        </div>
      </div>

      <div className="form-group">
        <label>Role</label>
        <div className="role-display">
          <Shield size={16} />
          <span>Administrator</span>
          <span className="role-badge">Full Access</span>
        </div>
      </div>

      <div className="form-group">
        <label>Timezone</label>
        <select className="form-select">
          <option>America/New_York (EST)</option>
          <option>America/Chicago (CST)</option>
          <option>America/Denver (MST)</option>
          <option>America/Los_Angeles (PST)</option>
        </select>
      </div>

      <button className="save-btn">
        <Save size={16} />
        Save Changes
      </button>

      <style jsx>{`
        .section {
          flex: 1;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .section-header p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          font-size: 0.9375rem;
          color: var(--text-primary);
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input:focus, .form-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .role-display {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 0.75rem;
          font-size: 0.9375rem;
          color: #7c3aed;
          font-weight: 500;
        }

        .role-badge {
          margin-left: auto;
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          background: rgba(139, 92, 246, 0.1);
          border-radius: 9999px;
        }

        .save-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 0.75rem;
          color: white;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45);
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .section-header h2 {
            font-size: 1.125rem;
          }

          .save-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .form-input, .form-select {
            padding: 0.75rem 0.875rem;
            font-size: 0.875rem;
          }

          .role-display {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}

function NotificationsSection({ settings, onChange }) {
  return (
    <div className="section">
      <div className="section-header">
        <h2>Notification Preferences</h2>
        <p>Choose how you want to be notified</p>
      </div>

      <div className="notification-group">
        <h4>Email Notifications</h4>
        <div className="notification-items">
          {Object.entries(settings.emailNotifications).map(([key, value]) => (
            <div className="notification-item" key={key}>
              <div className="item-info">
                <span className="item-label">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
              <ToggleSwitch 
                enabled={value} 
                onChange={(v) => onChange('emailNotifications', key, v)} 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="notification-group">
        <h4>Push Notifications</h4>
        <div className="notification-items">
          {Object.entries(settings.pushNotifications).map(([key, value]) => (
            <div className="notification-item" key={key}>
              <div className="item-info">
                <span className="item-label">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
              <ToggleSwitch 
                enabled={value} 
                onChange={(v) => onChange('pushNotifications', key, v)} 
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .section {
          flex: 1;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .section-header p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .notification-group {
          margin-bottom: 2rem;
        }

        .notification-group h4 {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .notification-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.875rem;
        }

        .item-label {
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 1.125rem;
          }

          .notification-item {
            padding: 0.875rem 1rem;
          }

          .item-label {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}

function SLASection() {
  return (
    <div className="section">
      <div className="section-header">
        <h2>SLA Configuration</h2>
        <p>Set service level agreements for lead handling</p>
      </div>

      <div className="sla-grid">
        <div className="sla-card">
          <div className="sla-icon green">
            <Check size={20} />
          </div>
          <div className="sla-info">
            <span className="sla-label">Lead Response Time</span>
            <span className="sla-desc">Maximum time to first contact</span>
          </div>
          <div className="sla-value">
            <input type="number" defaultValue={SLA_CONFIG.leadResponseTime} className="sla-input" />
            <span className="sla-unit">minutes</span>
          </div>
        </div>

        <div className="sla-card">
          <div className="sla-icon blue">
            <Clock size={20} />
          </div>
          <div className="sla-info">
            <span className="sla-label">CRM Push Timeout</span>
            <span className="sla-desc">Time before auto-escalation</span>
          </div>
          <div className="sla-value">
            <input type="number" defaultValue={SLA_CONFIG.crmPushTimeout} className="sla-input" />
            <span className="sla-unit">minutes</span>
          </div>
        </div>

        <div className="sla-card">
          <div className="sla-icon orange">
            <AlertCircle size={20} />
          </div>
          <div className="sla-info">
            <span className="sla-label">Escalation Threshold</span>
            <span className="sla-desc">Missed SLAs before alert</span>
          </div>
          <div className="sla-value">
            <input type="number" defaultValue={SLA_CONFIG.escalationThreshold} className="sla-input" />
            <span className="sla-unit">misses</span>
          </div>
        </div>
      </div>

      <div className="compliance-target">
        <h4>Compliance Target</h4>
        <div className="target-slider">
          <input 
            type="range" 
            min="80" 
            max="100" 
            defaultValue={parseInt(SLA_CONFIG.complianceTarget)} 
            className="slider"
          />
          <span className="target-value">{SLA_CONFIG.complianceTarget}</span>
        </div>
      </div>

      <button className="save-btn">
        <Save size={16} />
        Save SLA Settings
      </button>

      <style jsx>{`
        .section {
          flex: 1;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .section-header p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .sla-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .sla-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }

        .sla-icon {
          width: 48px;
          height: 48px;
          border-radius: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sla-icon.green {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .sla-icon.blue {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .sla-icon.orange {
          background: rgba(245, 158, 11, 0.1);
          color: #3b82f6;
        }

        .sla-info {
          flex: 1;
        }

        .sla-label {
          display: block;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .sla-desc {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }

        .sla-value {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sla-input {
          width: 80px;
          padding: 0.625rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.625rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          text-align: center;
          outline: none;
        }

        .sla-input:focus {
          border-color: #3b82f6;
        }

        .sla-unit {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }

        .compliance-target {
          margin-bottom: 2rem;
        }

        .compliance-target h4 {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .target-slider {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .slider {
          flex: 1;
          height: 8px;
          -webkit-appearance: none;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          outline: none;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
        }

        .target-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: #3b82f6;
        }

        .save-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 0.75rem;
          color: white;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45);
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 1.125rem;
          }

          .sla-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .sla-value {
            width: 100%;
            justify-content: flex-end;
          }

          .save-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .sla-card {
            padding: 1rem;
          }

          .sla-icon {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
}

function CRMSection() {
  const [showApiKey, setShowApiKey] = useState(false);
  const { crmConnection } = SYSTEM_STATUS;

  return (
    <div className="section">
      <div className="section-header">
        <h2>CRM Integration</h2>
        <p>Configure webhook and API settings for Bison CRM</p>
      </div>

      <div className="connection-status">
        <div className="status-indicator">
          <span className={`status-dot ${crmConnection.status}`} />
          <span className="status-text">
            {crmConnection.status === 'connected' ? 'Connected to Bison CRM' : 'Disconnected'}
          </span>
        </div>
        <button className="test-btn">
          <RefreshCw size={14} />
          Test Connection
        </button>
      </div>

      <div className="form-group">
        <label>Webhook URL</label>
        <input 
          type="url" 
          defaultValue="https://api.bisoncrm.com/webhooks/leads" 
          className="form-input" 
        />
      </div>

      <div className="form-group">
        <label>API Key</label>
        <div className="api-key-wrapper">
          <input 
            type={showApiKey ? 'text' : 'password'} 
            defaultValue="bsn_live_xxxxxxxxxxxxxxxxxxxxxx" 
            className="form-input" 
          />
          <button 
            className="toggle-visibility"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Retry Attempts</label>
          <input type="number" defaultValue="3" className="form-input" />
        </div>
        <div className="form-group">
          <label>Timeout (seconds)</label>
          <input type="number" defaultValue="30" className="form-input" />
        </div>
      </div>

      <div className="webhook-events">
        <h4>Webhook Events</h4>
        <div className="event-grid">
          {['Lead Created', 'Lead Updated', 'Lead Accepted', 'Lead Archived'].map((event) => (
            <label className="event-item" key={event}>
              <input type="checkbox" defaultChecked className="event-checkbox" />
              <span>{event}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="save-btn">
        <Save size={16} />
        Save CRM Settings
      </button>

      <style jsx>{`
        .section {
          flex: 1;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .section-header p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .connection-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
          border-radius: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .status-dot.connected {
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }

        .status-text {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #059669;
        }

        .test-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          background: rgba(16, 185, 129, 0.1);
          border: none;
          border-radius: 0.5rem;
          color: #059669;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .test-btn:hover {
          background: rgba(16, 185, 129, 0.15);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          font-size: 0.9375rem;
          color: var(--text-primary);
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .api-key-wrapper {
          position: relative;
        }

        .api-key-wrapper .form-input {
          padding-right: 3rem;
        }

        .toggle-visibility {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          border-radius: 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-visibility:hover {
          background: rgba(0, 0, 0, 0.04);
          color: var(--text-secondary);
        }

        .webhook-events {
          margin-bottom: 2rem;
        }

        .webhook-events h4 {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .event-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .event-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.875rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .event-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .event-checkbox {
          width: 18px;
          height: 18px;
          accent-color: #3b82f6;
        }

        .event-item span {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .save-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          border-radius: 0.75rem;
          color: white;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
        }

        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.45);
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 1.125rem;
          }

          .connection-status {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .test-btn {
            width: 100%;
            justify-content: center;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .event-grid {
            grid-template-columns: 1fr;
          }

          .save-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

function RolesSection() {
  const roles = Object.entries(USER_ROLES);

  return (
    <div className="section">
      <div className="section-header">
        <h2>Role Management</h2>
        <p>Configure user roles and permissions</p>
      </div>

      <div className="roles-list">
        {roles.map(([key, role]) => (
          <div className="role-card" key={key}>
            <div className="role-header">
              <div className="role-icon">
                <Shield size={20} />
              </div>
              <div className="role-info">
                <span className="role-name">{role.label}</span>
                <span className="role-level">Level {role.level}</span>
              </div>
            </div>
            <div className="role-permissions">
              <span className="perm-label">Permissions:</span>
              <div className="perm-tags">
                {role.permissions.map((perm, i) => (
                  <span className="perm-tag" key={i}>{perm}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section {
          flex: 1;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .section-header p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .roles-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .role-card {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }

        .role-header {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          margin-bottom: 1rem;
        }

        .role-icon {
          width: 44px;
          height: 44px;
          border-radius: 0.875rem;
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .role-name {
          display: block;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .role-level {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .perm-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-tertiary);
          margin-bottom: 0.5rem;
          display: block;
        }

        .perm-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .perm-tag {
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border-radius: 0.375rem;
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 1.125rem;
          }

          .role-card {
            padding: 1rem;
          }

          .role-icon {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </div>
  );
}

function SystemSection() {
  return (
    <div className="section">
      <div className="section-header">
        <h2>System Settings</h2>
        <p>Application and display preferences</p>
      </div>

      <div className="system-options">
        <div className="option-item">
          <div className="option-info">
            <Globe size={18} />
            <div>
              <span className="option-label">Language</span>
              <span className="option-desc">Display language</span>
            </div>
          </div>
          <select className="option-select">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <div className="option-item">
          <div className="option-info">
            <Zap size={18} />
            <div>
              <span className="option-label">Theme</span>
              <span className="option-desc">Interface appearance</span>
            </div>
          </div>
          <select className="option-select">
            <option>Light (Liquid Glass)</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>

        <div className="option-item">
          <div className="option-info">
            <Database size={18} />
            <div>
              <span className="option-label">Data Refresh</span>
              <span className="option-desc">Auto-refresh interval</span>
            </div>
          </div>
          <select className="option-select">
            <option>30 seconds</option>
            <option>1 minute</option>
            <option>5 minutes</option>
            <option>Manual</option>
          </select>
        </div>
      </div>

      <style jsx>{`
        .section {
          flex: 1;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .section-header p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
        }

        .system-options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .option-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.875rem;
        }

        .option-info {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          color: var(--text-tertiary);
        }

        .option-label {
          display: block;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .option-desc {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
        }

        .option-select {
          padding: 0.625rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.625rem;
          font-size: 0.875rem;
          color: var(--text-primary);
          outline: none;
          cursor: pointer;
        }

        .option-select:focus {
          border-color: #3b82f6;
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 1.125rem;
          }

          .option-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .option-select {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .option-item {
            padding: 1rem;
          }

          .option-label {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState(SETTINGS);

  const handleNotificationChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'notifications':
        return <NotificationsSection settings={settings} onChange={handleNotificationChange} />;
      case 'sla':
        return <SLASection />;
      case 'crm':
        return <CRMSection />;
      case 'roles':
        return <RolesSection />;
      case 'system':
        return <SystemSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="settings-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account and system preferences</p>
        </div>
      </header>

      <div className="settings-container">
        <SettingsNav activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="settings-content glass-card">
          {renderSection()}
        </div>
      </div>

      <style jsx>{`
        .settings-page {
          padding-bottom: 2rem;
        }

        .page-header {
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

        .settings-container {
          display: flex;
          gap: 1.5rem;
          min-height: calc(100vh - 200px);
        }

        .settings-content {
          flex: 1;
          padding: 2rem;
          border-radius: 1.5rem;
        }

        @media (max-width: 1024px) {
          .settings-container {
            gap: 1rem;
          }

          .settings-content {
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 1.5rem;
          }

          .settings-container {
            flex-direction: column;
          }

          .settings-content {
            padding: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.25rem;
          }

          .settings-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

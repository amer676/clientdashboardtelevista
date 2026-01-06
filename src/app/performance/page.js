"use client";
import React, { useState, useEffect } from 'react';
import { CALLERS, SLA_TRACKING, SLA_CONFIG, LEADERBOARD } from '@/data/mockData';
import { 
  Trophy, 
  TrendingUp, 
  Clock, 
  Phone, 
  Star,
  Target,
  Award,
  Zap,
  CheckCircle,
  AlertTriangle,
  Crown,
  Flame,
  Medal
} from 'lucide-react';

function TopPerformerBanner({ performer }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className={`top-performer-banner glass-card ${mounted ? 'mounted' : ''}`}>
      <div className="banner-glow" />
      <div className="banner-shine" />
      <div className="banner-content">
        <div className="performer-avatar-wrapper">
          <div className="performer-avatar">
            {performer.avatar}
          </div>
          <div className="performer-badge">
            <Crown size={14} />
          </div>
          <div className="avatar-ring" />
        </div>
        
        <div className="performer-info">
          <div className="performer-stars">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={14} fill="#3b82f6" color="#3b82f6" style={{ animationDelay: `${i * 0.1}s` }} className="star-animate" />
            ))}
          </div>
          <h2 className="performer-name">{performer.name}</h2>
          <span className="performer-title">Top Performer Today</span>
          
          <div className="performer-stats">
            <div className="performer-stat">
              <span className="stat-value">{performer.leadsGenerated}</span>
              <span className="stat-label">Leads</span>
            </div>
            <div className="performer-stat">
              <span className="stat-value">{performer.conversionRate}</span>
              <span className="stat-label">Conversion</span>
            </div>
            <div className="performer-stat">
              <span className="stat-value">{performer.callsToday}</span>
              <span className="stat-label">Calls</span>
            </div>
            <div className="performer-stat">
              <span className="stat-value">{performer.qualityScore}</span>
              <span className="stat-label">Quality</span>
            </div>
          </div>
        </div>

        <div className="streak-badge">
          <Flame size={18} />
          <span>{performer.streak} Day Streak</span>
        </div>
      </div>

      <style jsx>{`
        .top-performer-banner {
          position: relative;
          padding: 2rem 2.5rem;
          border-radius: 1.75rem;
          overflow: hidden;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(20px) scale(0.98);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .top-performer-banner.mounted {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .banner-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 60%;
          height: 100%;
          background: radial-gradient(ellipse at 100% 50%, rgba(245, 158, 11, 0.2) 0%, transparent 70%);
          pointer-events: none;
          animation: glowPulse 4s ease-in-out infinite;
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .banner-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: bannerShine 5s ease-in-out infinite;
        }
        
        @keyframes bannerShine {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        .banner-content {
          display: flex;
          align-items: center;
          gap: 2rem;
          position: relative;
          z-index: 1;
        }

        .performer-avatar-wrapper {
          position: relative;
          flex-shrink: 0;
        }
        
        .avatar-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(245, 158, 11, 0.3);
          animation: ringPulse 3s ease-in-out infinite;
        }
        
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        .star-animate {
          animation: starPop 0.5s ease-out both;
        }
        
        @keyframes starPop {
          0% { transform: scale(0) rotate(-30deg); }
          50% { transform: scale(1.3) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        .performer-avatar {
          width: 100px;
          height: 100px;
          border-radius: 1.25rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          box-shadow: 0 12px 40px rgba(245, 158, 11, 0.35);
        }

        .performer-badge {
          position: absolute;
          bottom: -8px;
          right: -8px;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          border-radius: 0.625rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
          border: 3px solid white;
        }

        .performer-info {
          flex: 1;
        }

        .performer-stars {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
        }

        .performer-name {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }

        .performer-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .performer-stats {
          display: flex;
          gap: 2rem;
          margin-top: 1.25rem;
        }

        .performer-stat {
          text-align: center;
          background: rgba(0, 0, 0, 0.03);
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.125rem;
        }

        .streak-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
          padding: 0.625rem 1rem;
          border-radius: 9999px;
          color: #ea580c;
          font-weight: 700;
          font-size: 0.875rem;
          border: 1px solid rgba(249, 115, 22, 0.2);
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .top-performer-banner {
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .banner-content {
            flex-direction: column;
            gap: 1.25rem;
            text-align: center;
          }

          .performer-avatar-wrapper {
            margin: 0 auto;
          }

          .performer-avatar {
            width: 80px;
            height: 80px;
            font-size: 2rem;
          }

          .performer-name {
            font-size: 1.5rem;
          }

          .performer-stats {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .performer-stat {
            flex: 1 1 40%;
            min-width: 80px;
          }

          .streak-badge {
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .performer-avatar {
            width: 64px;
            height: 64px;
            font-size: 1.5rem;
          }

          .performer-name {
            font-size: 1.25rem;
          }

          .performer-stats {
            gap: 0.75rem;
          }

          .stat-value {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

function SLADashboard() {
  const sla = SLA_TRACKING.today;
  const callProgress = (sla.callsActual / sla.callsTarget) * 100;
  const leadProgress = (sla.leadsActual / sla.leadsTarget) * 100;

  return (
    <div className="sla-dashboard glass-card">
      <div className="sla-header">
        <div className="sla-title-row">
          <Target size={18} className="sla-icon" />
          <h3>SLA Compliance</h3>
        </div>
        <span className="sla-status compliant">
          <CheckCircle size={14} />
          On Track
        </span>
      </div>

      <div className="sla-metrics">
        <div className="sla-metric">
          <div className="metric-header">
            <span className="metric-label">Daily Calls</span>
            <span className="metric-value">{sla.callsActual} / {sla.callsTarget}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill green" 
              style={{ width: `${Math.min(callProgress, 100)}%` }} 
            />
          </div>
          <span className="metric-status">{callProgress >= 100 ? '✓ Target Met' : `${Math.round(100 - callProgress)}% remaining`}</span>
        </div>

        <div className="sla-metric">
          <div className="metric-header">
            <span className="metric-label">Daily Leads</span>
            <span className="metric-value">{sla.leadsActual} / {sla.leadsTarget}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill amber" 
              style={{ width: `${Math.min(leadProgress, 100)}%` }} 
            />
          </div>
          <span className="metric-status">{leadProgress >= 100 ? '✓ Target Exceeded!' : `${Math.round(100 - leadProgress)}% remaining`}</span>
        </div>

        <div className="sla-metric">
          <div className="metric-header">
            <span className="metric-label">Response Time</span>
            <span className="metric-value">{sla.avgResponseTime}</span>
          </div>
          <div className="response-status">
            <CheckCircle size={14} className="success-icon" />
            <span>Under {sla.targetResponseTime} target</span>
          </div>
        </div>
      </div>

      {sla.pendingLeadsOverdue > 0 && (
        <div className="sla-alert">
          <AlertTriangle size={16} />
          <span>{sla.pendingLeadsOverdue} lead(s) pending beyond SLA threshold</span>
        </div>
      )}

      <style jsx>{`
        .sla-dashboard {
          padding: 1.5rem;
          border-radius: 1.25rem;
        }

        .sla-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .sla-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sla-title-row h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .sla-icon {
          color: var(--brand-amber);
        }

        .sla-status {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
        }

        .sla-status.compliant {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .sla-metrics {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .sla-metric {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .metric-label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .metric-value {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .progress-bar {
          height: 8px;
          background: rgba(0, 0, 0, 0.06);
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 0.5s ease;
        }

        .progress-fill.green {
          background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
        }

        .progress-fill.amber {
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
        }

        .metric-status {
          font-size: 0.6875rem;
          font-weight: 500;
          color: var(--text-tertiary);
        }

        .response-status {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #059669;
        }

        .success-icon {
          color: #10b981;
        }

        .sla-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 0.75rem;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #2563eb;
        }
      `}</style>
    </div>
  );
}

function LeaderboardCard({ period, data }) {
  return (
    <div className="leaderboard-card glass-card">
      <div className="leaderboard-header">
        <h4>{period}</h4>
      </div>
      <div className="leaderboard-list">
        {data.map((entry, index) => (
          <div key={entry.callerId} className={`leaderboard-entry ${index === 0 ? 'first' : ''}`}>
            <div className="entry-rank">
              {index === 0 ? <Trophy size={16} className="trophy-icon" /> : `#${entry.rank}`}
            </div>
            <div className="entry-name">
              {entry.name}
              {entry.badge && <span className="entry-badge">{entry.badge}</span>}
            </div>
            <div className="entry-stats">
              <span className="entry-leads">{entry.leads} leads</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .leaderboard-card {
          padding: 1.25rem;
          border-radius: 1rem;
        }

        .leaderboard-header h4 {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .leaderboard-list {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .leaderboard-entry {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background 0.2s ease;
        }

        .leaderboard-entry:hover {
          background: rgba(0, 0, 0, 0.02);
        }

        .leaderboard-entry.first {
          background: rgba(245, 158, 11, 0.08);
        }

        .entry-rank {
          width: 24px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-align: center;
        }

        .trophy-icon {
          color: #3b82f6;
        }

        .entry-name {
          flex: 1;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .entry-badge {
          font-size: 0.875rem;
        }

        .entry-stats {
          text-align: right;
        }

        .entry-leads {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}

function CallerDetailCard({ caller, rank }) {
  const statusColors = {
    Active: { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669', dot: '#10b981' },
    Break: { bg: 'rgba(245, 158, 11, 0.1)', text: '#2563eb', dot: '#3b82f6' },
    Offline: { bg: 'rgba(148, 163, 184, 0.1)', text: '#64748b', dot: '#94a3b8' },
  };
  const status = statusColors[caller.status];
  
  const slaCompliance = SLA_TRACKING.callerCompliance.find(c => c.callerId === caller.id);

  return (
    <div className="caller-detail-card glass-card">
      <div className="card-header">
        <div className="caller-rank-badge">#{rank}</div>
        <div className="caller-main-info">
          <div className="caller-avatar">
            {caller.avatar}
            <span className="status-dot" style={{ background: status.dot }} />
          </div>
          <div>
            <h3 className="caller-name">{caller.name}</h3>
            <span className="caller-status" style={{ background: status.bg, color: status.text }}>
              {caller.status}
            </span>
          </div>
        </div>
        {caller.streak > 0 && (
          <div className="streak-indicator">
            <Flame size={14} />
            {caller.streak}
          </div>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <Phone size={16} className="stat-icon blue" />
          <div className="stat-content">
            <span className="stat-value">{caller.callsToday}</span>
            <span className="stat-label">Calls Today</span>
          </div>
        </div>
        <div className="stat-item">
          <Zap size={16} className="stat-icon amber" />
          <div className="stat-content">
            <span className="stat-value">{caller.leadsGenerated}</span>
            <span className="stat-label">Leads</span>
          </div>
        </div>
        <div className="stat-item">
          <TrendingUp size={16} className="stat-icon green" />
          <div className="stat-content">
            <span className="stat-value">{caller.conversionRate}</span>
            <span className="stat-label">Conversion</span>
          </div>
        </div>
        <div className="stat-item">
          <Clock size={16} className="stat-icon violet" />
          <div className="stat-content">
            <span className="stat-value">{caller.avgCallDuration}</span>
            <span className="stat-label">Avg Duration</span>
          </div>
        </div>
      </div>

      <div className="quality-bar">
        <div className="quality-header">
          <span>Quality Score</span>
          <span className="quality-value">{caller.qualityScore}/100</span>
        </div>
        <div className="quality-track">
          <div 
            className="quality-fill" 
            style={{ width: `${caller.qualityScore}%` }} 
          />
        </div>
      </div>

      <div className="card-footer">
        <div className={`sla-badge ${slaCompliance?.compliant ? 'compliant' : 'warning'}`}>
          {slaCompliance?.compliant ? (
            <>
              <CheckCircle size={12} />
              SLA Compliant
            </>
          ) : (
            <>
              <AlertTriangle size={12} />
              {slaCompliance?.reason}
            </>
          )}
        </div>
        <span className="last-active">Active {caller.lastActive}</span>
      </div>

      <style jsx>{`
        .caller-detail-card {
          padding: 1.5rem;
          border-radius: 1.25rem;
          transition: all 0.3s ease;
        }

        .caller-detail-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .caller-rank-badge {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 800;
          color: var(--text-tertiary);
        }

        .caller-main-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .caller-avatar {
          width: 48px;
          height: 48px;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          position: relative;
        }

        .status-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 3px solid white;
        }

        .caller-name {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .caller-status {
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.125rem 0.5rem;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .streak-indicator {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
          color: #ea580c;
          font-weight: 700;
          font-size: 0.8125rem;
          padding: 0.375rem 0.625rem;
          border-radius: 9999px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 0.75rem;
        }

        .stat-icon {
          flex-shrink: 0;
        }

        .stat-icon.blue { color: #3b82f6; }
        .stat-icon.amber { color: #3b82f6; }
        .stat-icon.green { color: #10b981; }
        .stat-icon.violet { color: #8b5cf6; }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.625rem;
          font-weight: 500;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .quality-bar {
          margin-bottom: 1rem;
        }

        .quality-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.375rem;
        }

        .quality-header span {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .quality-value {
          font-weight: 700;
          color: var(--text-primary);
        }

        .quality-track {
          height: 6px;
          background: rgba(0, 0, 0, 0.06);
          border-radius: 9999px;
          overflow: hidden;
        }

        .quality-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
          border-radius: 9999px;
          transition: width 0.5s ease;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
        }

        .sla-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 0.25rem 0.625rem;
          border-radius: 9999px;
        }

        .sla-badge.compliant {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .sla-badge.warning {
          background: rgba(245, 158, 11, 0.1);
          color: #2563eb;
        }

        .last-active {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
      `}</style>
    </div>
  );
}

export default function PerformancePage() {
  const [timeframe, setTimeframe] = useState('today');
  const sortedCallers = [...CALLERS].sort((a, b) => b.leadsGenerated - a.leadsGenerated);
  const topPerformer = sortedCallers[0];

  return (
    <div className="performance-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Caller Performance</h1>
          <p className="page-subtitle">Real-time metrics, SLA tracking, and team leaderboard</p>
        </div>
        <div className="timeframe-toggle">
          {['today', 'week', 'month'].map((tf) => (
            <button 
              key={tf}
              className={`toggle-btn ${timeframe === tf ? 'active' : ''}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <TopPerformerBanner performer={topPerformer} />

      <div className="content-grid">
        <div className="main-content">
          <h3 className="section-title">Team Overview</h3>
          <div className="callers-grid">
            {sortedCallers.map((caller, index) => (
              <CallerDetailCard key={caller.id} caller={caller} rank={index + 1} />
            ))}
          </div>
        </div>

        <div className="sidebar-content">
          <SLADashboard />
          
          <div className="leaderboards">
            <h3 className="section-title">
              <Award size={18} />
              Leaderboards
            </h3>
            <LeaderboardCard period="Today" data={LEADERBOARD.today} />
            <LeaderboardCard period="This Week" data={LEADERBOARD.week} />
            <LeaderboardCard period="This Month" data={LEADERBOARD.month} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .performance-page {
          padding-bottom: 2rem;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
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

        .timeframe-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 0.75rem;
          padding: 0.25rem;
        }

        .toggle-btn {
          padding: 0.5rem 1rem;
          border: none;
          background: transparent;
          border-radius: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-btn:hover {
          color: var(--text-primary);
        }

        .toggle-btn.active {
          background: white;
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 1.5rem;
        }

        @media (max-width: 1200px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .callers-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sidebar-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .leaderboards {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .timeframe-toggle {
            width: 100%;
            justify-content: space-around;
          }

          .toggle-btn {
            flex: 1;
            text-align: center;
            padding: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.25rem;
          }

          .toggle-btn {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}

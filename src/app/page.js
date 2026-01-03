"use client";
import React, { useState, useEffect } from 'react';
import { 
  KPI_DATA, 
  CALLERS, 
  ACTIVITY_LOG, 
  CURRENT_USER,
  WEEKLY_CALLS,
  FUNNEL_DATA,
  SLA_TRACKING,
  SYSTEM_STATUS
} from '@/data/mockData';
import { 
  Phone, 
  UserPlus, 
  Calendar, 
  Clock, 
  TrendingUp,
  TrendingDown, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  DollarSign,
  Users,
  Target,
  Zap,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

function LiveClock() {
  const [time, setTime] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Render placeholder on server to avoid hydration mismatch
  if (!mounted || !time) {
    return (
      <div className="live-clock glass-card">
        <div className="clock-label">Current Time</div>
        <div className="clock-time">--:--<span className="clock-seconds">--</span></div>
        <div className="clock-date">Loading...</div>
        <style jsx>{`
          .live-clock { padding: 1.25rem 1.5rem; border-radius: 1rem; text-align: right; }
          .clock-label { font-size: 0.625rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem; }
          .clock-time { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
          .clock-seconds { font-size: 0.875rem; color: var(--text-tertiary); margin-left: 0.25rem; font-weight: 500; }
          .clock-date { font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.125rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="live-clock glass-card">
      <div className="clock-label">Current Time</div>
      <div className="clock-time">
        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        <span className="clock-seconds">{time.toLocaleTimeString('en-US', { second: '2-digit' }).slice(-2)}</span>
      </div>
      <div className="clock-date">
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
      </div>

      <style jsx>{`
        .live-clock {
          padding: 1.25rem 1.5rem;
          border-radius: 1rem;
          text-align: right;
        }
        .clock-label {
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }
        .clock-time {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }
        .clock-seconds {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          margin-left: 0.25rem;
          font-weight: 500;
        }
        .clock-date {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 0.125rem;
        }
      `}</style>
    </div>
  );
}

function KPICard({ title, value, change, period, icon: Icon, color, subValue, index = 0 }) {
  const isPositive = change.startsWith('+') || change.startsWith('-$');
  const isNegativeGood = change.startsWith('-') && !change.includes('$');
  
  return (
    <div className="kpi-card glass-card">
      <div className="kpi-header">
        <div className="kpi-icon">
          <Icon size={18} strokeWidth={2} />
        </div>
        <div className={`kpi-change ${isPositive || isNegativeGood ? 'positive' : 'negative'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-title">{title}</div>
      {subValue && <div className="kpi-subvalue">{subValue}</div>}

      <style jsx>{`
        .kpi-card {
          padding: 1.25rem;
          border-radius: 1rem;
          position: relative;
        }
        
        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.875rem;
        }
        .kpi-icon {
          width: 40px;
          height: 40px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }
        
        .kpi-change {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.6875rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
        }
        .kpi-change.positive {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
        }
        .kpi-change.negative {
          background: rgba(239, 68, 68, 0.12);
          color: #dc2626;
        }
        .kpi-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .kpi-title {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .kpi-subvalue {
          font-size: 0.6875rem;
          color: var(--text-tertiary);
          margin-top: 0.375rem;
          padding-top: 0.375rem;
          border-top: 1px dashed rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </div>
  );
}

function CallerCard({ caller, rank }) {
  const statusColors = {
    Active: { bg: 'rgba(16, 185, 129, 0.12)', text: '#059669', dot: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
    Break: { bg: 'rgba(100, 116, 139, 0.12)', text: '#64748b', dot: '#64748b', glow: 'rgba(100, 116, 139, 0.4)' },
    Offline: { bg: 'rgba(148, 163, 184, 0.12)', text: '#64748b', dot: '#94a3b8', glow: 'rgba(148, 163, 184, 0.4)' },
  };
  const status = statusColors[caller.status];
  const rankColors = ['#3b82f6', '#64748b', '#475569', '#64748b', '#64748b'];

  return (
    <div className="caller-card glass-card">
      <div className="caller-rank" style={{ color: rankColors[rank - 1] || '#64748b' }}>#{rank}</div>
      <div className="caller-main">
        <div className="caller-avatar">
          {caller.avatar}
          <div className="caller-status-dot" style={{ background: status.dot, boxShadow: `0 0 8px ${status.glow}` }} />
        </div>
        <div className="caller-info">
          <h4 className="caller-name">{caller.name}</h4>
          <span className="caller-status" style={{ background: status.bg, color: status.text }}>
            {caller.status}
          </span>
        </div>
      </div>
      <div className="caller-stats">
        <div className="stat">
          <span className="stat-value">{caller.callsToday}</span>
          <span className="stat-label">Calls</span>
        </div>
        <div className="stat">
          <span className="stat-value">{caller.leadsGenerated}</span>
          <span className="stat-label">Leads</span>
        </div>
        <div className="stat">
          <span className="stat-value">{caller.conversionRate}</span>
          <span className="stat-label">Conv.</span>
        </div>
      </div>

      <style jsx>{`
        .caller-card {
          padding: 1rem 1.25rem;
          border-radius: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .caller-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.08) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .caller-card:hover::before {
          opacity: 1;
        }
        .caller-card:hover {
          transform: translateX(8px) scale(1.02);
          box-shadow: 
            0 12px 30px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        .caller-rank {
          font-size: 0.9rem;
          font-weight: 800;
          min-width: 28px;
          position: relative;
          z-index: 1;
        }
        .caller-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          position: relative;
          z-index: 1;
        }
        .caller-avatar {
          width: 46px;
          height: 46px;
          border-radius: 0.875rem;
          background: linear-gradient(135deg, #64748b 0%, #475569 50%, #334155 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.875rem;
          position: relative;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }
        .caller-card:hover .caller-avatar {
          transform: scale(1.08) rotate(-3deg);
        }
        .caller-status-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid white;
        }
        .caller-info {
          flex: 1;
        }
        .caller-name {
          font-size: 0.9375rem;
          font-weight: 600;
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
        .caller-stats {
          display: flex;
          gap: 1.25rem;
        }
        .stat {
          text-align: center;
        }
        .stat-value {
          display: block;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .stat-label {
          display: block;
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}

function MiniChart({ data }) {
  const max = Math.max(...data.map(d => d.calls));
  
  return (
    <div className="mini-chart">
      {data.map((item, i) => (
        <div key={i} className="chart-bar-container">
          <div 
            className="chart-bar" 
            style={{ height: `${(item.calls / max) * 100}%` }}
          >
            <div className="chart-bar-fill" />
          </div>
          <span className="chart-label">{item.day}</span>
        </div>
      ))}

      <style jsx>{`
        .mini-chart {
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          height: 120px;
          padding: 0.5rem 0;
        }
        .chart-bar-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }
        .chart-bar {
          width: 100%;
          min-height: 4px;
          border-radius: 0.375rem 0.375rem 0 0;
          position: relative;
          overflow: hidden;
        }
        .chart-bar-fill {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #3b82f6 0%, #60a5fa 100%);
          border-radius: 0.375rem 0.375rem 0 0;
        }
        .chart-label {
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--text-tertiary);
          margin-top: 0.5rem;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}

function ActivityItem({ log, isFirst }) {
  const typeIcons = {
    lead_generated: { icon: UserPlus, color: '#3b82f6' },
    appointment_set: { icon: Calendar, color: '#10b981' },
    lead_accepted: { icon: CheckCircle, color: '#3b82f6' },
    call_completed: { icon: Phone, color: '#6366f1' },
    caller_status: { icon: Users, color: '#64748b' },
    system: { icon: Activity, color: '#64748b' },
    crm_sync: { icon: RefreshCw, color: '#10b981' },
  };
  
  const { icon: Icon, color } = typeIcons[log.type] || typeIcons.system;

  return (
    <div className={`activity-item ${isFirst ? 'first' : ''}`}>
      <div className="activity-icon" style={{ background: `${color}15`, color }}>
        <Icon size={14} />
      </div>
      <div className="activity-content">
        <p className="activity-message">{log.message}</p>
        {log.details && <span className="activity-details">{log.details}</span>}
        <span className="activity-time">{log.time}</span>
      </div>

      <style jsx>{`
        .activity-item {
          display: flex;
          gap: 0.875rem;
          padding: 0.75rem 0;
          position: relative;
        }
        .activity-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 15px;
          top: 42px;
          bottom: -0.75rem;
          width: 2px;
          background: rgba(0, 0, 0, 0.04);
        }
        .activity-item.first .activity-icon {
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .activity-icon {
          width: 32px;
          height: 32px;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .activity-content {
          flex: 1;
          min-width: 0;
        }
        .activity-message {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 0.125rem;
        }
        .activity-details {
          display: block;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }
        .activity-time {
          font-size: 0.6875rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

function SystemStatus() {
  return (
    <div className="system-status glass-card">
      <div className="status-header">
        <Zap size={16} className="status-icon" />
        <span>System Status</span>
      </div>
      <div className="status-items">
        <div className="status-item">
          <span className="status-dot connected" />
          <span>CRM Connected</span>
        </div>
        <div className="status-item">
          <span className="status-dot connected" />
          <span>Dialer Active</span>
        </div>
        <div className="status-item">
          <span className="status-dot connected" />
          <span>Webhooks OK</span>
        </div>
      </div>

      <style jsx>{`
        .system-status {
          padding: 1rem 1.25rem;
          border-radius: 1rem;
        }
        .status-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .status-icon {
          color: #3b82f6;
        }
        .status-items {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .status-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .status-dot.connected {
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }
      `}</style>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="header-title">
            Welcome back, <span className="text-gradient">{CURRENT_USER.name.split(' ')[0]}</span>
          </h1>
          <p className="header-subtitle">
            Here's what's happening with <span className="brand-highlight">Televista</span> today
          </p>
        </div>
        <div className="header-right">
          <SystemStatus />
          <LiveClock />
        </div>
      </header>

      {/* KPI Grid */}
      <section className="kpi-grid animate-stagger">
        <KPICard
          title="Total Calls Today"
          value={KPI_DATA.totalCalls.value}
          change={KPI_DATA.totalCalls.change}
          period={KPI_DATA.totalCalls.period}
          icon={Phone}
          color="blue"
          subValue={`${KPI_DATA.totalCalls.week} this week`}
        />
        <KPICard
          title="Leads Generated"
          value={KPI_DATA.totalLeads.value}
          change={KPI_DATA.totalLeads.change}
          period={KPI_DATA.totalLeads.period}
          icon={UserPlus}
          color="amber"
          subValue={`${KPI_DATA.totalLeads.week} this week`}
        />
        <KPICard
          title="Appointments Set"
          value={KPI_DATA.appointments.value}
          change={KPI_DATA.appointments.change}
          period={KPI_DATA.appointments.period}
          icon={Calendar}
          color="emerald"
          subValue={`${KPI_DATA.appointments.week} this week`}
        />
        <KPICard
          title="Avg Call Duration"
          value={KPI_DATA.avgDuration.value}
          change={KPI_DATA.avgDuration.change}
          period={KPI_DATA.avgDuration.period}
          icon={Clock}
          color="violet"
        />
        <KPICard
          title="Conversion Rate"
          value={KPI_DATA.conversionRate.value}
          change={KPI_DATA.conversionRate.change}
          period={KPI_DATA.conversionRate.period}
          icon={TrendingUp}
          color="cyan"
        />
        <KPICard
          title="Cost Per Lead"
          value={KPI_DATA.costPerLead.value}
          change={KPI_DATA.costPerLead.change}
          period={KPI_DATA.costPerLead.period}
          icon={DollarSign}
          color="rose"
        />
      </section>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Chart Section */}
        <div className="chart-section glass-card">
          <div className="section-header">
            <div>
              <h3 className="section-title">Weekly Performance</h3>
              <p className="section-subtitle">Call volume over the past 7 days</p>
            </div>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-dot blue" /> Calls
              </span>
              <span className="legend-item">
                <span className="legend-dot green" /> Leads
              </span>
            </div>
          </div>
          <MiniChart data={WEEKLY_CALLS} />
          
          {/* Funnel Stats */}
          <div className="funnel-stats">
            <div className="funnel-stat">
              <span className="funnel-value">{FUNNEL_DATA.weekly.totalCalls}</span>
              <span className="funnel-label">Total Calls</span>
            </div>
            <div className="funnel-arrow">→</div>
            <div className="funnel-stat">
              <span className="funnel-value">{FUNNEL_DATA.weekly.contactsMade}</span>
              <span className="funnel-label">Contacts</span>
              <span className="funnel-rate">{FUNNEL_DATA.weekly.contactRate}</span>
            </div>
            <div className="funnel-arrow">→</div>
            <div className="funnel-stat">
              <span className="funnel-value">{FUNNEL_DATA.weekly.leadsGenerated}</span>
              <span className="funnel-label">Leads</span>
              <span className="funnel-rate">{FUNNEL_DATA.weekly.leadRate}</span>
            </div>
            <div className="funnel-arrow">→</div>
            <div className="funnel-stat highlight">
              <span className="funnel-value">{FUNNEL_DATA.weekly.appointmentsSet}</span>
              <span className="funnel-label">Appointments</span>
              <span className="funnel-rate">{FUNNEL_DATA.weekly.appointmentRate}</span>
            </div>
          </div>

          {/* Weekly Insights */}
          <div className="weekly-insights">
            <div className="insight-row">
              <div className="insight-card best">
                <div className="insight-icon">
                  <TrendingUp size={16} />
                </div>
                <div className="insight-content">
                  <span className="insight-label">Best Day</span>
                  <span className="insight-value">Sunday</span>
                  <span className="insight-detail">164 calls • 17 leads</span>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-icon low">
                  <TrendingDown size={16} />
                </div>
                <div className="insight-content">
                  <span className="insight-label">Slowest Day</span>
                  <span className="insight-value">Friday</span>
                  <span className="insight-detail">45 calls • 4 leads</span>
                </div>
              </div>
            </div>
            
            <div className="weekly-metrics">
              <div className="metric-item">
                <span className="metric-value">119</span>
                <span className="metric-label">Avg Daily Calls</span>
                <span className="metric-change positive">+12% vs last week</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">12</span>
                <span className="metric-label">Avg Daily Leads</span>
                <span className="metric-change positive">+8% vs last week</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">5.9</span>
                <span className="metric-label">Avg Daily Appts</span>
                <span className="metric-change positive">+15% vs last week</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">$10.50</span>
                <span className="metric-label">Avg Cost/Lead</span>
                <span className="metric-change positive">-$2.10 savings</span>
              </div>
            </div>

            <div className="week-comparison">
              <div className="comparison-header">
                <span className="comparison-title">Week-over-Week</span>
                <span className="comparison-period">Dec 28 - Jan 3 vs Dec 21 - 27</span>
              </div>
              <div className="comparison-bars">
                <div className="comparison-row">
                  <span className="comparison-label">Calls</span>
                  <div className="comparison-bar-container">
                    <div className="comparison-bar current" style={{width: '100%'}}></div>
                    <div className="comparison-bar previous" style={{width: '88%'}}></div>
                  </div>
                  <span className="comparison-value positive">+12%</span>
                </div>
                <div className="comparison-row">
                  <span className="comparison-label">Leads</span>
                  <div className="comparison-bar-container">
                    <div className="comparison-bar current" style={{width: '100%'}}></div>
                    <div className="comparison-bar previous" style={{width: '92%'}}></div>
                  </div>
                  <span className="comparison-value positive">+8%</span>
                </div>
                <div className="comparison-row">
                  <span className="comparison-label">Appts</span>
                  <div className="comparison-bar-container">
                    <div className="comparison-bar current" style={{width: '100%'}}></div>
                    <div className="comparison-bar previous" style={{width: '85%'}}></div>
                  </div>
                  <span className="comparison-value positive">+15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Active Callers */}
          <div className="callers-section glass-card">
            <div className="section-header">
              <div>
                <h3 className="section-title">
                  <span className="live-dot" />
                  Live Agents
                </h3>
              </div>
              <span className="caller-count">{CALLERS.filter(c => c.status === 'Active').length} Online</span>
            </div>
            <div className="callers-list">
              {CALLERS.map((caller, index) => (
                <CallerCard key={caller.id} caller={caller} rank={index + 1} />
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="activity-section glass-card">
            <div className="section-header">
              <h3 className="section-title">Recent Activity</h3>
            </div>
            <div className="activity-list">
              {ACTIVITY_LOG.slice(0, 5).map((log, index) => (
                <ActivityItem key={log.id} log={log} isFirst={index === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          padding-bottom: 2rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          gap: 2rem;
        }

        .header-left {
          flex: 1;
        }

        .header-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          margin-bottom: 0.375rem;
        }

        .text-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .brand-highlight {
          color: #3b82f6;
          font-weight: 600;
        }

        .header-right {
          display: flex;
          gap: 1rem;
          align-items: stretch;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 1400px) {
          .kpi-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 1.5rem;
        }

        @media (max-width: 1200px) {
          .main-grid {
            grid-template-columns: 1fr;
          }
        }

        .chart-section {
          padding: 1.5rem;
          border-radius: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
        }

        .section-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .section-subtitle {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          margin-top: 0.125rem;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
          animation: livePulse 2s infinite;
        }

        .chart-legend {
          display: flex;
          gap: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
        }

        .legend-dot.blue {
          background: #3b82f6;
        }

        .legend-dot.green {
          background: #10b981;
        }

        .funnel-stats {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 1.25rem;
          margin-top: 1rem;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 1rem;
        }

        .funnel-stat {
          text-align: center;
        }

        .funnel-stat.highlight {
          background: rgba(16, 185, 129, 0.08);
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
        }

        .funnel-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .funnel-label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .funnel-rate {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #10b981;
          margin-top: 0.25rem;
        }

        .funnel-arrow {
          color: var(--text-tertiary);
          font-size: 1.25rem;
        }

        .weekly-insights {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .insight-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .insight-card {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }

        .insight-card.best {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%);
          border-color: rgba(16, 185, 129, 0.15);
        }

        .insight-icon {
          width: 36px;
          height: 36px;
          border-radius: 0.625rem;
          background: rgba(16, 185, 129, 0.12);
          color: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .insight-icon.low {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .insight-content {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .insight-label {
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .insight-value {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .insight-detail {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .weekly-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 1rem;
        }

        .metric-item {
          text-align: center;
          padding: 0.5rem;
        }

        .metric-value {
          display: block;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .metric-label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-tertiary);
          margin-top: 0.125rem;
        }

        .metric-change {
          display: block;
          font-size: 0.6875rem;
          font-weight: 600;
          margin-top: 0.25rem;
        }

        .metric-change.positive {
          color: #10b981;
        }

        .metric-change.negative {
          color: #ef4444;
        }

        .week-comparison {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }

        .comparison-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .comparison-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .comparison-period {
          font-size: 0.6875rem;
          color: var(--text-tertiary);
        }

        .comparison-bars {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .comparison-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .comparison-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          width: 50px;
        }

        .comparison-bar-container {
          flex: 1;
          height: 8px;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        .comparison-bar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          border-radius: 4px;
        }

        .comparison-bar.current {
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%);
          z-index: 2;
          height: 4px;
          top: 0;
        }

        .comparison-bar.previous {
          background: rgba(0, 0, 0, 0.1);
          z-index: 1;
          height: 4px;
          top: 4px;
        }

        .comparison-value {
          font-size: 0.75rem;
          font-weight: 700;
          width: 45px;
          text-align: right;
        }

        .comparison-value.positive {
          color: #10b981;
        }

        .comparison-value.negative {
          color: #ef4444;
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .callers-section {
          padding: 1.5rem;
          border-radius: 1.5rem;
        }

        .caller-count {
          font-size: 0.75rem;
          font-weight: 600;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
        }

        .callers-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .activity-section {
          padding: 1.5rem;
          border-radius: 1.5rem;
          flex: 1;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
        }

        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>
    </div>
  );
}

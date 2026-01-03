"use client";
import React, { useState } from 'react';
import { 
  MONTHLY_TREND, 
  FUNNEL_DATA, 
  GEO_DATA, 
  WEEKLY_CALLS,
  REPORT_TEMPLATES,
  CALLERS 
} from '@/data/mockData';
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  FileText,
  Map,
  BarChart3,
  PieChart,
  ArrowRight,
  Clock,
  Target,
  Users,
  Phone,
  Zap,
  RefreshCw
} from 'lucide-react';

function ExecutiveSummary() {
  const weeklyTotal = WEEKLY_CALLS.reduce((sum, d) => sum + d.calls, 0);
  const lastMonthCalls = MONTHLY_TREND[MONTHLY_TREND.length - 2]?.calls || 0;
  const thisMonthCalls = MONTHLY_TREND[MONTHLY_TREND.length - 1]?.calls || 0;
  const monthlyGrowth = ((thisMonthCalls - lastMonthCalls) / lastMonthCalls * 100).toFixed(1);
  
  const conversionRate = ((FUNNEL_DATA[2]?.value / FUNNEL_DATA[0]?.value) * 100).toFixed(1);
  
  return (
    <div className="executive-summary glass-card">
      <div className="summary-header">
        <div className="header-content">
          <span className="label">Executive Summary</span>
          <h2 className="title">Weekly Performance Overview</h2>
        </div>
        <div className="date-range">
          <Calendar size={14} />
          <span>Jan 6 - Jan 12, 2025</span>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-stat">
          <div className="stat-icon blue">
            <Phone size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{weeklyTotal}</span>
            <span className="stat-label">Total Calls This Week</span>
          </div>
          <div className="stat-trend up">
            <TrendingUp size={14} />
            <span>+12%</span>
          </div>
        </div>

        <div className="summary-stat">
          <div className="stat-icon green">
            <Target size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{conversionRate}%</span>
            <span className="stat-label">Conversion Rate</span>
          </div>
          <div className="stat-trend up">
            <TrendingUp size={14} />
            <span>+3.2%</span>
          </div>
        </div>

        <div className="summary-stat">
          <div className="stat-icon orange">
            <Zap size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{thisMonthCalls}</span>
            <span className="stat-label">January Calls</span>
          </div>
          <div className="stat-trend up">
            <TrendingUp size={14} />
            <span>{monthlyGrowth}%</span>
          </div>
        </div>

        <div className="summary-stat">
          <div className="stat-icon purple">
            <Users size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{CALLERS.length}</span>
            <span className="stat-label">Active Callers</span>
          </div>
          <div className="stat-meta">100% On Schedule</div>
        </div>
      </div>

      <style jsx>{`
        .executive-summary {
          padding: 1.75rem;
          border-radius: 1.5rem;
          margin-bottom: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .label {
          font-size: 0.6875rem;
          font-weight: 700;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .title {
          font-size: 1.375rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-top: 0.25rem;
        }

        .date-range {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.875rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .summary-stat {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }

        .stat-icon {
          width: 42px;
          height: 42px;
          border-radius: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.blue {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .stat-icon.green {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .stat-icon.orange {
          background: rgba(245, 158, 11, 0.1);
          color: #3b82f6;
        }

        .stat-icon.purple {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .stat-trend {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          width: fit-content;
        }

        .stat-trend.up {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .stat-trend.down {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        }

        .stat-meta {
          font-size: 0.75rem;
          color: #059669;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

function MonthlyTrendChart() {
  const maxCalls = Math.max(...MONTHLY_TREND.map(d => d.calls));

  return (
    <div className="chart-card glass-card">
      <div className="chart-header">
        <div className="chart-title">
          <BarChart3 size={18} className="chart-icon" />
          <h3>Monthly Call Volume</h3>
        </div>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-dot blue" />
            Calls
          </span>
          <span className="legend-item">
            <span className="legend-dot green" />
            Leads
          </span>
        </div>
      </div>

      <div className="chart-body">
        {MONTHLY_TREND.map((month, i) => (
          <div className="bar-group" key={i}>
            <div className="bars">
              <div 
                className="bar calls" 
                style={{ height: `${(month.calls / maxCalls) * 100}%` }}
              >
                <span className="bar-value">{month.calls}</span>
              </div>
              <div 
                className="bar leads" 
                style={{ height: `${(month.leads / maxCalls) * 100}%` }}
              >
                <span className="bar-value">{month.leads}</span>
              </div>
            </div>
            <span className="bar-label">{month.month}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .chart-card {
          padding: 1.5rem;
          border-radius: 1.25rem;
          height: 100%;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .chart-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .chart-title h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        :global(.chart-icon) {
          color: #3b82f6;
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

        .chart-body {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 200px;
          padding-top: 1rem;
        }

        .bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .bars {
          display: flex;
          gap: 4px;
          align-items: flex-end;
          height: 160px;
        }

        .bar {
          width: 18px;
          border-radius: 4px 4px 0 0;
          position: relative;
          transition: all 0.3s ease;
          min-height: 20px;
        }

        .bar.calls {
          background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
        }

        .bar.leads {
          background: linear-gradient(180deg, #10b981 0%, #059669 100%);
        }

        .bar:hover {
          transform: scaleY(1.05);
        }

        .bar-value {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--text-tertiary);
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .bar:hover .bar-value {
          opacity: 1;
        }

        .bar-label {
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-tertiary);
        }
      `}</style>
    </div>
  );
}

function FunnelChart() {
  const funnelStages = FUNNEL_DATA.stages || FUNNEL_DATA;
  const maxValue = Math.max(...funnelStages.map(d => d.value));

  return (
    <div className="chart-card glass-card">
      <div className="chart-header">
        <div className="chart-title">
          <PieChart size={18} className="chart-icon" />
          <h3>Conversion Funnel</h3>
        </div>
      </div>

      <div className="funnel-body">
        {funnelStages.map((stage, i) => (
          <div className="funnel-stage" key={i}>
            <div className="stage-bar-container">
              <div 
                className="stage-bar"
                style={{ 
                  width: `${(stage.value / maxValue) * 100}%`,
                  background: stage.color
                }}
              />
            </div>
            <div className="stage-info">
              <span className="stage-label">{stage.stage}</span>
              <div className="stage-value-row">
                <span className="stage-value">{stage.value.toLocaleString()}</span>
                {i < funnelStages.length - 1 && (
                  <span className="conversion-rate">
                    <ArrowRight size={12} />
                    {((funnelStages[i + 1].value / stage.value) * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .chart-card {
          padding: 1.5rem;
          border-radius: 1.25rem;
          height: 100%;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .chart-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .chart-title h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        :global(.chart-icon) {
          color: #3b82f6;
        }

        .funnel-body {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .funnel-stage {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .stage-bar-container {
          height: 32px;
          background: rgba(0, 0, 0, 0.03);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .stage-bar {
          height: 100%;
          border-radius: 0.5rem;
          transition: width 0.5s ease;
        }

        .stage-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stage-label {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .stage-value-row {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .stage-value {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .conversion-rate {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.6875rem;
          font-weight: 600;
          color: #10b981;
          padding: 0.125rem 0.375rem;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}

function GeoHeatmap() {
  const cities = GEO_DATA.byCity;
  const maxLeads = Math.max(...cities.map(c => c.leads));

  return (
    <div className="geo-card glass-card">
      <div className="geo-header">
        <div className="geo-title">
          <Map size={18} className="geo-icon" />
          <h3>Geographic Distribution</h3>
        </div>
        <button className="view-map-btn">
          View Full Map
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="city-grid">
        {cities.map((city, i) => {
          const intensity = city.leads / maxLeads;
          const hue = 30 + (1 - intensity) * 15;
          
          return (
            <div className="city-item" key={i}>
              <div 
                className="city-heat"
                style={{ 
                  background: `hsla(${hue}, 90%, 55%, ${0.2 + intensity * 0.4})`,
                  borderColor: `hsla(${hue}, 90%, 55%, 0.3)`
                }}
              >
                <span className="heat-value">{city.leads}</span>
              </div>
              <div className="city-info">
                <span className="city-name">{city.city}</span>
                <span className="city-rate">{city.conversion}</span>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .geo-card {
          padding: 1.5rem;
          border-radius: 1.25rem;
        }

        .geo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .geo-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .geo-title h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        :global(.geo-icon) {
          color: #3b82f6;
        }

        .view-map-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          background: rgba(59, 130, 246, 0.1);
          border: none;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #3b82f6;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-map-btn:hover {
          background: rgba(59, 130, 246, 0.15);
        }

        .city-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .city-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .city-heat {
          width: 64px;
          height: 64px;
          border-radius: 1rem;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .city-item:hover .city-heat {
          transform: scale(1.05);
        }

        .heat-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .city-info {
          text-align: center;
        }

        .city-name {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .city-rate {
          font-size: 0.6875rem;
          color: var(--text-tertiary);
        }
      `}</style>
    </div>
  );
}

function ReportTemplates() {
  return (
    <div className="templates-card glass-card">
      <div className="templates-header">
        <div className="templates-title">
          <FileText size={18} className="templates-icon" />
          <h3>Export Reports</h3>
        </div>
      </div>

      <div className="templates-list">
        {REPORT_TEMPLATES.map((template, i) => (
          <div className="template-item" key={i}>
            <div className="template-info">
              <span className="template-name">{template.name}</span>
              <span className="template-desc">{template.description}</span>
            </div>
            <div className="template-actions">
              <span className="template-format">{template.format}</span>
              <button className="download-btn">
                <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="templates-footer">
        <button className="schedule-btn">
          <Clock size={14} />
          Schedule Reports
        </button>
        <button className="custom-btn">
          <RefreshCw size={14} />
          Custom Report
        </button>
      </div>

      <style jsx>{`
        .templates-card {
          padding: 1.5rem;
          border-radius: 1.25rem;
        }

        .templates-header {
          margin-bottom: 1.25rem;
        }

        .templates-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .templates-title h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        :global(.templates-icon) {
          color: #3b82f6;
        }

        .templates-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .template-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 0.875rem;
          transition: all 0.2s ease;
        }

        .template-item:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: translateX(4px);
        }

        .template-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .template-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .template-desc {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .template-actions {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        .template-format {
          font-size: 0.625rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
          border-radius: 0.375rem;
          text-transform: uppercase;
        }

        .download-btn {
          width: 32px;
          height: 32px;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .download-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .templates-footer {
          display: flex;
          gap: 0.75rem;
        }

        .schedule-btn, .custom-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .schedule-btn {
          background: rgba(0, 0, 0, 0.04);
          border: none;
          color: var(--text-secondary);
        }

        .schedule-btn:hover {
          background: rgba(0, 0, 0, 0.08);
        }

        .custom-btn {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          color: #d97706;
        }

        .custom-btn:hover {
          background: rgba(245, 158, 11, 0.15);
        }
      `}</style>
    </div>
  );
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('week');

  return (
    <div className="reports-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Track performance metrics and export insights</p>
        </div>
        <div className="header-actions">
          <div className="date-toggle">
            {['week', 'month', 'quarter'].map((range) => (
              <button
                key={range}
                className={`toggle-btn ${dateRange === range ? 'active' : ''}`}
                onClick={() => setDateRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      <ExecutiveSummary />

      <div className="charts-row">
        <div className="chart-col large">
          <MonthlyTrendChart />
        </div>
        <div className="chart-col">
          <FunnelChart />
        </div>
      </div>

      <div className="bottom-row">
        <div className="geo-col">
          <GeoHeatmap />
        </div>
        <div className="templates-col">
          <ReportTemplates />
        </div>
      </div>

      <style jsx>{`
        .reports-page {
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

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .date-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 0.75rem;
          padding: 0.25rem;
        }

        .toggle-btn {
          padding: 0.625rem 1rem;
          background: transparent;
          border: none;
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
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .charts-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .chart-col {
          min-height: 320px;
        }

        .bottom-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 1.5rem;
        }
      `}</style>
    </div>
  );
}

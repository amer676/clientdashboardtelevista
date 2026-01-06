"use client";
import React, { useState } from 'react';
import { GEO_DATA, CALLERS } from '@/data/mockData';
import { 
  Map, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Users,
  Phone,
  Target,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react';

function GeoSummaryCards() {
  const cities = GEO_DATA.byCity;
  const totalLeads = cities.reduce((sum, c) => sum + c.leads, 0);
  const avgConversion = (cities.reduce((sum, c) => sum + parseFloat(c.conversion), 0) / cities.length).toFixed(1);
  const topCity = cities.reduce((max, c) => c.leads > max.leads ? c : max, cities[0]);

  return (
    <div className="summary-cards">
      <div className="summary-card glass-card">
        <div className="card-icon blue">
          <MapPin size={20} />
        </div>
        <div className="card-content">
          <span className="card-value">{cities.length}</span>
          <span className="card-label">Active Markets</span>
        </div>
      </div>

      <div className="summary-card glass-card">
        <div className="card-icon green">
          <Users size={20} />
        </div>
        <div className="card-content">
          <span className="card-value">{totalLeads}</span>
          <span className="card-label">Total Leads</span>
        </div>
        <div className="card-trend up">
          <TrendingUp size={12} />
          +18%
        </div>
      </div>

      <div className="summary-card glass-card">
        <div className="card-icon orange">
          <Target size={20} />
        </div>
        <div className="card-content">
          <span className="card-value">{avgConversion}%</span>
          <span className="card-label">Avg Conversion</span>
        </div>
        <div className="card-trend up">
          <TrendingUp size={12} />
          +2.4%
        </div>
      </div>

      <div className="summary-card glass-card highlight">
        <div className="card-icon purple">
          <Zap size={20} />
        </div>
        <div className="card-content">
          <span className="card-value">{topCity.city}</span>
          <span className="card-label">Top Performing</span>
        </div>
        <span className="top-badge">{topCity.leads} leads</span>
      </div>

      <style jsx>{`
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .summary-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 1.25rem;
          position: relative;
        }

        .summary-card.highlight {
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 100%);
          border-color: rgba(139, 92, 246, 0.15);
        }

        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-icon.blue {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .card-icon.green {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .card-icon.orange {
          background: rgba(245, 158, 11, 0.1);
          color: #3b82f6;
        }

        .card-icon.purple {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .card-content {
          flex: 1;
        }

        .card-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .card-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .card-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
        }

        .card-trend.up {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
        }

        .top-badge {
          font-size: 0.6875rem;
          font-weight: 700;
          padding: 0.25rem 0.625rem;
          background: rgba(139, 92, 246, 0.1);
          color: #7c3aed;
          border-radius: 9999px;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
          .summary-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .summary-cards {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .summary-card {
            padding: 1rem;
          }

          .card-icon {
            width: 40px;
            height: 40px;
          }

          .card-value {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

function CityHeatmapGrid() {
  const cities = GEO_DATA.byCity;
  const maxLeads = Math.max(...cities.map(c => c.leads));

  return (
    <div className="heatmap-section glass-card">
      <div className="section-header">
        <div className="header-left">
          <Map size={18} className="section-icon" />
          <h3>City Performance Heatmap</h3>
        </div>
        <div className="header-actions">
          <button className="action-btn">
            <Filter size={14} />
            Filter
          </button>
          <button className="action-btn">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      <div className="heatmap-grid">
        {cities.map((city, i) => {
          const intensity = city.leads / maxLeads;
          const hue = 30 + (1 - intensity) * 15;
          
          return (
            <div className="city-tile" key={i}>
              <div 
                className="tile-heat"
                style={{ 
                  background: `hsla(${hue}, 90%, 55%, ${0.15 + intensity * 0.45})`,
                  borderColor: `hsla(${hue}, 90%, 55%, ${0.2 + intensity * 0.3})`
                }}
              >
                <span className="heat-number">{city.leads}</span>
                <span className="heat-label">leads</span>
              </div>
              <div className="tile-info">
                <span className="city-name">{city.city}</span>
                <div className="city-stats">
                  <span className="stat">
                    <Target size={10} />
                    {city.conversionRate}
                  </span>
                  <span className="stat">
                    <Phone size={10} />
                    {city.calls}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .heatmap-section {
          padding: 1.5rem;
          border-radius: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        :global(.section-icon) {
          color: #3b82f6;
        }

        .header-left h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 0.875rem;
          background: rgba(255, 255, 255, 0.08);
          border: none;
          border-radius: 0.625rem;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: var(--text-primary);
        }

        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .city-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          transition: all 0.2s ease;
        }

        .city-tile:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .tile-heat {
          width: 80px;
          height: 80px;
          border-radius: 1rem;
          border: 2px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .heat-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .heat-label {
          font-size: 0.625rem;
          font-weight: 600;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }

        .tile-info {
          text-align: center;
        }

        .city-name {
          display: block;
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .city-stats {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
          .heatmap-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .heatmap-section {
            padding: 1.25rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .header-actions {
            width: 100%;
          }

          .heatmap-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .city-tile {
            padding: 0.875rem;
          }

          .tile-heat {
            width: 60px;
            height: 60px;
          }

          .heat-number {
            font-size: 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .heatmap-grid {
            grid-template-columns: 1fr 1fr;
          }

          .tile-heat {
            width: 56px;
            height: 56px;
          }

          .city-name {
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  );
}

function ZipCodeTable() {
  const zips = GEO_DATA.byZip;
  const [sortBy, setSortBy] = useState('leads');

  const sortedZips = [...zips].sort((a, b) => {
    if (sortBy === 'leads') return b.leads - a.leads;
    if (sortBy === 'conversion') return parseFloat(b.conversionRate) - parseFloat(a.conversionRate);
    return 0;
  });

  return (
    <div className="zip-section glass-card">
      <div className="section-header">
        <div className="header-left">
          <BarChart3 size={18} className="section-icon" />
          <h3>Top Performing Zip Codes</h3>
        </div>
        <div className="sort-toggle">
          <button 
            className={`sort-btn ${sortBy === 'leads' ? 'active' : ''}`}
            onClick={() => setSortBy('leads')}
          >
            By Leads
          </button>
          <button 
            className={`sort-btn ${sortBy === 'conversion' ? 'active' : ''}`}
            onClick={() => setSortBy('conversion')}
          >
            By Conversion
          </button>
        </div>
      </div>

      <div className="zip-table">
        <div className="table-header">
          <span className="col-rank">#</span>
          <span className="col-zip">Zip Code</span>
          <span className="col-leads">Leads</span>
          <span className="col-conv">Conversion</span>
          <span className="col-bar">Performance</span>
        </div>
        {sortedZips.slice(0, 8).map((zip, i) => {
          const maxLeads = Math.max(...zips.map(z => z.leads));
          const barWidth = (zip.leads / maxLeads) * 100;
          
          return (
            <div className="table-row" key={zip.zip}>
              <span className="col-rank">
                <span className={`rank-badge ${i < 3 ? `top-${i + 1}` : ''}`}>
                  {i + 1}
                </span>
              </span>
              <span className="col-zip">
                <MapPin size={12} />
                {zip.zip}
              </span>
              <span className="col-leads">{zip.leads}</span>
              <span className="col-conv">{zip.conversionRate}</span>
              <span className="col-bar">
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .zip-section {
          padding: 1.5rem;
          border-radius: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        :global(.section-icon) {
          color: #3b82f6;
        }

        .header-left h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .sort-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          padding: 0.25rem;
        }

        .sort-btn {
          padding: 0.5rem 0.875rem;
          background: transparent;
          border: none;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sort-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .zip-table {
          display: flex;
          flex-direction: column;
        }

        .table-header {
          display: grid;
          grid-template-columns: 50px 120px 80px 100px 1fr;
          gap: 1rem;
          padding: 0.75rem 1rem;
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .table-row {
          display: grid;
          grid-template-columns: 50px 120px 80px 100px 1fr;
          gap: 1rem;
          padding: 1rem;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease;
        }

        .table-row:hover {
          background: rgba(59, 130, 246, 0.08);
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .rank-badge {
          width: 28px;
          height: 28px;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .rank-badge.top-1 {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          color: white;
        }

        .rank-badge.top-2 {
          background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
          color: white;
        }

        .rank-badge.top-3 {
          background: linear-gradient(135deg, #2563eb 0%, #b45309 100%);
          color: white;
        }

        .col-zip {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .col-leads {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .col-conv {
          font-size: 0.875rem;
          font-weight: 600;
          color: #10b981;
        }

        .bar-container {
          height: 8px;
          background: rgba(0, 0, 0, 0.04);
          border-radius: 9999px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 9999px;
          transition: width 0.5s ease;
        }
      `}</style>
    </div>
  );
}

function CallerGeoPerformance() {
  return (
    <div className="caller-geo glass-card">
      <div className="section-header">
        <div className="header-left">
          <Users size={18} className="section-icon" />
          <h3>Caller Performance by Region</h3>
        </div>
      </div>

      <div className="caller-grid">
        {CALLERS.map((caller) => (
          <div className="caller-region-card" key={caller.id}>
            <div className="caller-header">
              <div className="caller-avatar">
                {caller.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="caller-info">
                <span className="caller-name">{caller.name}</span>
                <span className="caller-status">
                  <span className={`status-dot ${caller.status}`} />
                  {caller.status}
                </span>
              </div>
            </div>
            <div className="region-stats">
              <div className="region-stat">
                <span className="stat-label">Top City</span>
                <span className="stat-value">Phoenix</span>
              </div>
              <div className="region-stat">
                <span className="stat-label">Coverage</span>
                <span className="stat-value">{caller.stats?.totalCalls || 0} calls</span>
              </div>
              <div className="region-stat">
                <span className="stat-label">Conv Rate</span>
                <span className="stat-value success">{caller.conversionRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .caller-geo {
          padding: 1.5rem;
          border-radius: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }

        :global(.section-icon) {
          color: #3b82f6;
        }

        .header-left h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .caller-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .caller-region-card {
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          transition: all 0.2s ease;
        }

        .caller-region-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .caller-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .caller-avatar {
          width: 40px;
          height: 40px;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.75rem;
        }

        .caller-name {
          display: block;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .caller-status {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .status-dot.active {
          background: #10b981;
        }

        .status-dot.break {
          background: #3b82f6;
        }

        .region-stats {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .region-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .stat-value {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .stat-value.success {
          color: #10b981;
        }
      `}</style>
    </div>
  );
}

export default function GeoPage() {
  return (
    <div className="geo-page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Geographic Insights</h1>
          <p className="page-subtitle">Analyze lead performance by location</p>
        </div>
        <div className="header-actions">
          <button className="refresh-btn">
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </div>
      </header>

      <GeoSummaryCards />
      <CityHeatmapGrid />

      <div className="bottom-grid">
        <ZipCodeTable />
        <CallerGeoPerformance />
      </div>

      <style jsx>{`
        .geo-page {
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
          gap: 0.75rem;
        }

        .refresh-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .refresh-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
          .bottom-grid {
            grid-template-columns: 1fr;
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

          .header-actions {
            width: 100%;
          }

          .refresh-btn {
            flex: 1;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  BarChart3, 
  MessageSquare, 
  Settings,
  MapPin,
  Bell,
  ChevronDown,
  LogOut,
  Zap,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { CURRENT_USER, QUICK_STATS } from '@/data/mockData';

const MENU_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Operations',
    items: [
      { name: 'Live Leads', path: '/leads', icon: Phone, badge: 3 },
      { name: 'Caller Performance', path: '/performance', icon: Users },
      { name: 'Geo Insights', path: '/geo', icon: MapPin },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { name: 'Reports', path: '/reports', icon: BarChart3 },
    ],
  },
  {
    title: 'Communication',
    items: [
      { name: 'Messages', path: '/messages', icon: MessageSquare, badge: 1 },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <div className="mobile-logo">
          <div className="mobile-logo-icon">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <span className="mobile-logo-text">Bison</span>
        </div>
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`sidebar-container ${mounted ? 'mounted' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      {/* Glass shine effect */}
      <div className="sidebar-shine" />
      
      {/* Logo Section */}
      <div className="logo-section">
        <div className="logo-icon">
          <Zap size={22} strokeWidth={2.5} />
          <div className="logo-glow" />
        </div>
        <div className="logo-text">
          <span className="logo-title">Bison</span>
          <span className="logo-subtitle">Solar & Roofing</span>
        </div>
        <div className="logo-sparkle">
          <Sparkles size={14} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-container">
        {MENU_SECTIONS.map((section, sectionIndex) => (
          <div 
            key={section.title} 
            className="nav-section"
            style={{ animationDelay: `${sectionIndex * 0.1}s` }}
          >
            <span className="nav-section-title">{section.title}</span>
            <div className="nav-items">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                const isHovered = hoveredItem === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{ animationDelay: `${(sectionIndex * 0.1) + (itemIndex * 0.05)}s` }}
                  >
                    <div className="nav-icon-wrapper">
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="nav-badge">
                        {item.badge}
                        <span className="badge-ping" />
                      </span>
                    )}
                    {isActive && <div className="active-indicator" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {/* Settings Link */}
        <Link 
          href="/settings" 
          className={`nav-item settings-link ${pathname === '/settings' ? 'active' : ''}`}
        >
          <div className="nav-icon-wrapper">
            <Settings size={20} />
          </div>
          <span>Settings</span>
        </Link>

        {/* User Profile */}
        <div className="profile-section">
          <button 
            className="profile-button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="profile-avatar">
              {CURRENT_USER.avatar}
              <div className="avatar-status" />
            </div>
            <div className="profile-info">
              <span className="profile-name">{CURRENT_USER.name}</span>
              <span className="profile-role">{CURRENT_USER.role?.label || CURRENT_USER.role}</span>
            </div>
            <ChevronDown 
              size={16} 
              className={`profile-chevron ${isProfileOpen ? 'open' : ''}`} 
            />
          </button>
          
          {isProfileOpen && (
            <div className="profile-dropdown">
              <button className="dropdown-item">
                <Bell size={16} />
                <span>Notifications</span>
                <span className="dropdown-badge">1</span>
              </button>
              <button className="dropdown-item logout">
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {/* Powered By */}
        <div className="powered-by">
          Powered by <span>Televista</span>
        </div>
      </div>

      <style jsx global>{`
        .sidebar-container {
          width: 260px;
          height: calc(100vh - 1.5rem);
          position: fixed;
          left: 0.75rem;
          top: 0.75rem;
          background: linear-gradient(
            165deg, 
            rgba(255, 255, 255, 0.08) 0%, 
            rgba(255, 255, 255, 0.04) 50%,
            rgba(255, 255, 255, 0.06) 100%
          );
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.25rem;
          box-shadow: 
            0 20px 60px -15px rgba(0, 0, 0, 0.4),
            0 8px 24px -8px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          z-index: 50;
          overflow: hidden;
          font-family: var(--font-sans), "Plus Jakarta Sans", "Inter", system-ui, -apple-system, sans-serif;
          opacity: 0;
          transform: translateX(-10px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }

        .sidebar-container.mounted {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .sidebar-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 100%);
          pointer-events: none;
          border-radius: 1.75rem 1.75rem 0 0;
        }

        .sidebar-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 42%,
            rgba(255, 255, 255, 0.03) 50%,
            transparent 58%
          );
          animation: sidebarShine 20s ease-in-out infinite;
          pointer-events: none;
          opacity: 0.5;
        }

        @keyframes sidebarShine {
          0%, 100% { transform: translateX(-100%) rotate(0deg); }
          50% { transform: translateX(100%) rotate(0deg); }
        }

        .sidebar-container * {
          font-family: inherit;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1rem 0.875rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          z-index: 1;
        }

        .logo-sparkle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #60a5fa;
          opacity: 0.5;
        }

        .logo-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          position: relative;
        }

        .logo-glow {
          display: none;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .logo-subtitle {
          font-size: 0.6rem;
          color: #64748b;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-top: 0.15rem;
        }

        .nav-container {
          flex: 1;
          padding: 0.75rem 0.5rem;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .nav-section {
          margin-bottom: 0.75rem;
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .nav-section-title {
          display: block;
          font-size: 0.55rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0 0.625rem;
          margin-bottom: 0.375rem;
        }

        .nav-items {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.5rem 0.625rem;
          border-radius: 0.625rem;
          color: #94a3b8;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.8rem;
          transition: all 0.2s ease;
          position: relative;
          border: 1px solid transparent;
        }

        .nav-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 0.5rem;
          background: transparent;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #e2e8f0;
        }

        .nav-item:hover .nav-icon-wrapper {
          background: rgba(59, 130, 246, 0.12);
          color: #60a5fa;
        }

        .nav-item.active {
          background: rgba(59, 130, 246, 0.12);
          color: #60a5fa;
          font-weight: 600;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .nav-item.active .nav-icon-wrapper {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
        }

        .active-indicator {
          position: absolute;
          right: 0.75rem;
          width: 6px;
          height: 6px;
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(34, 211, 238, 0.6);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }

        .nav-badge {
          margin-left: auto;
          background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          min-width: 18px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(244, 63, 94, 0.4);
          position: relative;
        }

        .badge-ping {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: #f43f5e;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        .sidebar-footer {
          padding: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .settings-link {
          margin-bottom: 0.25rem;
        }

        .profile-section {
          position: relative;
        }

        .profile-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 0.625rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-button:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 0.75rem;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
          position: relative;
        }

        .avatar-status {
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 10px;
          height: 10px;
          background: #10b981;
          border: 2px solid #111827;
          border-radius: 50%;
        }

        .profile-info {
          flex: 1;
          text-align: left;
        }

        .profile-name {
          display: block;
          font-size: 0.875rem;
          font-weight: 650;
          color: #f1f5f9;
          letter-spacing: -0.01em;
        }

        .profile-role {
          display: block;
          font-size: 0.7rem;
          color: #94a3b8;
          margin-top: 0.125rem;
          font-weight: 500;
        }

        .profile-chevron {
          color: #94a3b8;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .profile-chevron.open {
          transform: rotate(180deg);
        }

        .profile-dropdown {
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          background: linear-gradient(180deg, rgba(30, 41, 59, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%);
          backdrop-filter: blur(20px);
          border-radius: 0.875rem;
          box-shadow: 
            0 15px 50px rgba(0, 0, 0, 0.4),
            0 5px 15px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          animation: dropdownSlideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes dropdownSlideUp {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.7rem 0.875rem;
          border-radius: 0.625rem;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 0.8125rem;
          font-weight: 550;
          color: #cbd5e1;
          transition: all 0.2s ease;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
          transform: translateX(4px);
        }

        .dropdown-item.logout {
          color: #f87171;
        }

        .dropdown-item.logout:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        .dropdown-badge {
          margin-left: auto;
          background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          padding: 0.125rem 0.4rem;
          border-radius: 9999px;
          box-shadow: 0 2px 6px rgba(244, 63, 94, 0.3);
        }

        .powered-by {
          text-align: center;
          font-size: 0.6rem;
          color: #64748b;
          padding: 0.75rem 0 0.25rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .powered-by span {
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        @media (max-width: 1024px) {
          .sidebar-container {
            display: flex;
            position: fixed;
            left: -300px;
            top: 0;
            height: 100vh;
            width: 280px;
            border-radius: 0 1.25rem 1.25rem 0;
            z-index: 100;
            transition: left 0.3s ease;
          }

          .sidebar-container.mobile-open {
            left: 0;
          }
        }

        /* Mobile Header Styles */
        .mobile-header {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: rgba(10, 15, 26, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 90;
          padding: 0 1rem;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mobile-logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .mobile-logo-text {
          font-size: 1.125rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.02em;
        }

        .mobile-menu-btn {
          width: 44px;
          height: 44px;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 95;
        }

        @media (max-width: 1024px) {
          .mobile-header {
            display: flex;
          }

          .mobile-overlay {
            display: block;
          }
        }
      `}</style>
    </aside>
    </>
  );
}

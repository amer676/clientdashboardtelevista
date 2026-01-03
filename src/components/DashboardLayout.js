"use client";
import React, { useEffect, useState, lazy, Suspense } from 'react';
import Sidebar from './Sidebar';

// Lazy load the Three.js component for better performance
const LoadingAnimation = lazy(() => import('./LoadingAnimation'));

export default function DashboardLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setContentReady(true), 100);
  };

  return (
    <>
      {/* Three.js Loading Animation */}
      {showLoading && (
        <Suspense fallback={null}>
          <LoadingAnimation onComplete={handleLoadingComplete} />
        </Suspense>
      )}
      
      <div className={`dashboard-wrapper ${mounted && contentReady ? 'mounted' : ''}`}>
        {/* Premium aesthetic dark gradient background */}
        <div className="mesh-gradient-bg" />
        
        {/* Subtle noise texture */}
        <div className="noise-overlay" />
        
        {/* Ambient glow spots */}
        <div className="glow-spot glow-1" />
        <div className="glow-spot glow-2" />
        <div className="glow-spot glow-3" />
        
        <Sidebar />
        <main className="main-content">
          <div className="content-container">
            {children}
          </div>
          
          {/* Powered by Televista Footer */}
          <footer className="powered-by-footer">
            <div className="footer-content">
              <span className="footer-text">Powered by</span>
              <span className="footer-brand">Televista Lead Generation</span>
            </div>
          </footer>
        </main>

        <style jsx>{`
        .dashboard-wrapper {
          display: flex;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          opacity: 0;
          transition: opacity 0.6s ease-out;
        }

        .dashboard-wrapper.mounted {
          opacity: 1;
        }

        /* Premium aesthetic dark gradient - Pinterest inspired */
        .mesh-gradient-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: 
            /* Soft blue glow top-left */
            radial-gradient(ellipse 50% 40% at 10% 10%, rgba(59, 130, 246, 0.15) 0%, transparent 70%),
            /* Subtle purple accent top-right */
            radial-gradient(ellipse 40% 35% at 90% 15%, rgba(139, 92, 246, 0.1) 0%, transparent 70%),
            /* Warm accent bottom-left */
            radial-gradient(ellipse 45% 40% at 5% 90%, rgba(99, 102, 241, 0.12) 0%, transparent 70%),
            /* Cool blue bottom-right */
            radial-gradient(ellipse 50% 45% at 95% 85%, rgba(59, 130, 246, 0.1) 0%, transparent 70%),
            /* Center subtle glow */
            radial-gradient(ellipse 60% 50% at 50% 50%, rgba(71, 85, 105, 0.08) 0%, transparent 70%),
            /* Base gradient - deep charcoal to dark slate */
            linear-gradient(145deg, #0a0f1a 0%, #0f1419 25%, #111827 50%, #0f1419 75%, #0a0f1a 100%);
          background-attachment: fixed;
        }

        /* Subtle noise texture */
        .noise-overlay {
          position: fixed;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        /* Ambient glow spots */
        .glow-spot {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          filter: blur(100px);
        }
        
        .glow-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
          top: -100px;
          left: -100px;
          animation: glowPulse 8s ease-in-out infinite;
        }
        
        .glow-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
          bottom: -80px;
          right: -80px;
          animation: glowPulse 10s ease-in-out infinite 2s;
        }
        
        .glow-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: glowPulse 12s ease-in-out infinite 4s;
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        .glow-3 {
          animation: glowPulseCenter 12s ease-in-out infinite 4s;
        }
        
        @keyframes glowPulseCenter {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }

        .main-content {
          margin-left: 276px;
          width: calc(100% - 276px);
          min-height: 100vh;
          padding: 1.25rem 1.5rem 3.5rem 1rem;
          position: relative;
          z-index: 10;
        }

        .content-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .main-content {
            margin-left: 0;
            width: 100%;
            padding: 1rem;
          }
          
          .glow-spot {
            opacity: 0.5;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .glow-spot {
            animation: none;
          }
        }

        .powered-by-footer {
          position: fixed;
          bottom: 0;
          left: 276px;
          right: 0;
          padding: 0.75rem 1.5rem;
          text-align: center;
          z-index: 50;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: linear-gradient(to top, rgba(10, 15, 26, 0.95) 0%, rgba(10, 15, 26, 0.5) 60%, transparent 100%);
        }
        
        .footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .footer-text {
          font-size: 0.65rem;
          color: rgba(148, 163, 184, 0.5);
          font-weight: 500;
          letter-spacing: 0.05em;
        }
        
        .footer-brand {
          font-size: 0.7rem;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.02em;
        }

        @media (max-width: 1024px) {
          .powered-by-footer {
            left: 0;
          }
        }
      `}</style>
      </div>
    </>
  );
}

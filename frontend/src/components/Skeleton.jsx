import React from 'react';
import '../styles/animations.css';

/**
 * Skeleton Loading Components
 * Provides visual placeholders while content is loading
 */

// Base skeleton component
export const Skeleton = ({ 
  width = '100%', 
  height = '1rem', 
  borderRadius = '4px',
  className = '' 
}) => (
  <div 
    className={`skeleton ${className}`}
    style={{ width, height, borderRadius }}
  />
);

// Text skeleton
export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={className}>
    {[...Array(lines)].map((_, i) => (
      <div 
        key={i}
        className="skeleton skeleton-text"
        style={{ width: i === lines - 1 ? '60%' : '100%' }}
      />
    ))}
  </div>
);

// Avatar skeleton
export const SkeletonAvatar = ({ size = 48, className = '' }) => (
  <div 
    className={`skeleton ${className}`}
    style={{ 
      width: size, 
      height: size, 
      borderRadius: '50%',
      flexShrink: 0
    }}
  />
);

// Image skeleton
export const SkeletonImage = ({ height = 200, className = '' }) => (
  <div 
    className={`skeleton ${className}`}
    style={{ 
      width: '100%', 
      height, 
      borderRadius: '8px' 
    }}
  />
);

// Button skeleton
export const SkeletonButton = ({ width = 120, className = '' }) => (
  <div 
    className={`skeleton ${className}`}
    style={{ 
      width, 
      height: 44, 
      borderRadius: '8px' 
    }}
  />
);

// Card skeleton
export const SkeletonCard = ({ className = '' }) => (
  <div className={`skeleton-card ${className}`}>
    <SkeletonImage height={180} />
    <div style={{ padding: '1rem 0' }}>
      <Skeleton height="1.25rem" width="70%" style={{ marginBottom: '0.75rem' }} />
      <SkeletonText lines={2} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Skeleton width="30%" height="1rem" />
        <Skeleton width="25%" height="1rem" />
      </div>
    </div>
  </div>
);

// Hotel card skeleton
export const SkeletonHotelCard = ({ className = '' }) => (
  <div 
    className={`skeleton-card ${className}`}
    style={{ 
      background: 'white', 
      borderRadius: '12px', 
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
    }}
  >
    <SkeletonImage height={200} />
    <div style={{ padding: '1.25rem' }}>
      <Skeleton height="1.5rem" width="80%" />
      <div style={{ marginTop: '0.75rem' }}>
        <Skeleton height="0.875rem" width="50%" />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <SkeletonText lines={2} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
        <Skeleton width="80px" height="1.5rem" />
        <SkeletonButton width={100} />
      </div>
    </div>
  </div>
);

// Table row skeleton
export const SkeletonTableRow = ({ columns = 4, className = '' }) => (
  <tr className={className}>
    {[...Array(columns)].map((_, i) => (
      <td key={i} style={{ padding: '1rem 1.25rem' }}>
        <Skeleton 
          width={i === 0 ? '80%' : i === columns - 1 ? '100px' : '70%'} 
          height="1rem" 
        />
      </td>
    ))}
  </tr>
);

// Table skeleton
export const SkeletonTable = ({ rows = 5, columns = 4, className = '' }) => (
  <div className={className}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#f9fafb' }}>
          {[...Array(columns)].map((_, i) => (
            <th key={i} style={{ padding: '1rem 1.25rem', textAlign: 'left' }}>
              <Skeleton width="60%" height="0.875rem" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, i) => (
          <SkeletonTableRow key={i} columns={columns} />
        ))}
      </tbody>
    </table>
  </div>
);

// Form skeleton
export const SkeletonForm = ({ fields = 3, className = '' }) => (
  <div className={className}>
    {[...Array(fields)].map((_, i) => (
      <div key={i} style={{ marginBottom: '1.5rem' }}>
        <Skeleton width="30%" height="0.875rem" style={{ marginBottom: '0.5rem' }} />
        <Skeleton height="44px" borderRadius="8px" />
      </div>
    ))}
    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
      <SkeletonButton width={120} />
      <SkeletonButton width={100} />
    </div>
  </div>
);

// User list item skeleton
export const SkeletonUserItem = ({ className = '' }) => (
  <div 
    className={className}
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem',
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb'
    }}
  >
    <SkeletonAvatar size={40} />
    <div style={{ flex: 1 }}>
      <Skeleton width="40%" height="1rem" />
      <Skeleton width="60%" height="0.75rem" style={{ marginTop: '0.5rem' }} />
    </div>
    <Skeleton width="80px" height="32px" borderRadius="6px" />
  </div>
);

// Stats card skeleton
export const SkeletonStatsCard = ({ className = '' }) => (
  <div 
    className={className}
    style={{ 
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}
  >
    <Skeleton width={56} height={56} borderRadius="12px" />
    <div>
      <Skeleton width="60px" height="1.75rem" />
      <Skeleton width="80px" height="0.875rem" style={{ marginTop: '0.25rem' }} />
    </div>
  </div>
);

// Page loading skeleton
export const SkeletonPage = ({ className = '' }) => (
  <div className={className} style={{ padding: '2rem' }}>
    {/* Header */}
    <div style={{ marginBottom: '2rem' }}>
      <Skeleton width="200px" height="2rem" />
      <Skeleton width="300px" height="1rem" style={{ marginTop: '0.5rem' }} />
    </div>
    
    {/* Stats Grid */}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
      gap: '1.5rem',
      marginBottom: '2rem'
    }}>
      <SkeletonStatsCard />
      <SkeletonStatsCard />
      <SkeletonStatsCard />
    </div>
    
    {/* Content Card */}
    <div style={{ 
      background: 'white', 
      borderRadius: '16px', 
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{ 
        padding: '1.5rem 2rem', 
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Skeleton width="150px" height="1.25rem" />
        <Skeleton width="250px" height="40px" borderRadius="8px" />
      </div>
      <SkeletonTable rows={5} columns={4} />
    </div>
  </div>
);

// Loading overlay
export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <div style={{
    position: 'fixed',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  }}>
    <div className="loading-spinner loading-spinner-lg" />
    <p style={{ marginTop: '1rem', color: '#6b7280' }}>{message}</p>
  </div>
);

// Loading dots
export const LoadingDots = () => (
  <div className="loading-dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
);

const SkeletonComponents = {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonImage,
  SkeletonButton,
  SkeletonCard,
  SkeletonHotelCard,
  SkeletonTableRow,
  SkeletonTable,
  SkeletonForm,
  SkeletonUserItem,
  SkeletonStatsCard,
  SkeletonPage,
  LoadingOverlay,
  LoadingDots
};

export default SkeletonComponents;

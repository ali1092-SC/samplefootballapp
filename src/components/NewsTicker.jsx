import React from 'react';
import { breakingTicker } from '../data/newsData';

const NewsTicker = () => {
  const tickerContent = breakingTicker.join('   ●   ');

  return (
    <div style={{
      background: 'linear-gradient(90deg, #d4143c 0%, #a00e2b 100%)',
      overflow: 'hidden',
      position: 'relative',
      borderBottom: '2px solid rgba(201,168,76,0.4)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Breaking Label */}
        <div style={{
          background: '#000d2e',
          padding: '10px 20px',
          fontFamily: 'Bebas Neue, cursive',
          fontSize: '16px',
          letterSpacing: '2px',
          color: '#c9a84c',
          whiteSpace: 'nowrap',
          zIndex: 2,
          borderRight: '2px solid rgba(201,168,76,0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ animation: 'pulse 1.5s infinite', color: '#d4143c' }}>🔴</span>
          BREAKING
        </div>

        {/* Ticker Content */}
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{
            display: 'flex',
            animation: 'marquee 40s linear infinite',
            whiteSpace: 'nowrap',
            padding: '10px 0'
          }}>
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '13px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.5px',
              paddingLeft: '20px'
            }}>
              {tickerContent}   ●   {tickerContent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;

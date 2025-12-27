import React, { useState } from 'react';
import { X, Map as MapIcon, Ticket } from 'lucide-react';
import type { SkiResortFeature } from '../types';
import { TrailMapModal } from './TrailMapModal';

interface ResortDrawerProps {
  resort: SkiResortFeature | null;
  onClose: () => void;
}

export const ResortDrawer: React.FC<ResortDrawerProps> = ({ resort, onClose }) => {
  const [showTrailMap, setShowTrailMap] = useState(false);

  if (!resort) return null;

  const { name, category, ticketPrice, ticketPrice4h } = resort.properties;

  return (
    <>
      <div className="resort-card-container">
        <div className="resort-card">
          <button className="card-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
          
          <div className="card-header">
            <h2 className="card-title">{name}</h2>
            <span className={`tag ${category}`}>
              {category === 'major' ? '大規模リゾート' : 'ローカル'}
            </span>
          </div>

          <div className="card-body">
            <div className="price-row">
              <div className="price-item">
                <span className="price-label"><Ticket size={14} /> 1日券</span>
                <span className="price-value">
                  {ticketPrice === 0 ? '不明/無料' : `¥${ticketPrice.toLocaleString()}`}
                </span>
              </div>
              <div className="price-item sub">
                <span className="price-label">4時間</span>
                <span className="price-value">
                  {ticketPrice4h === 0 ? '-' : `¥${ticketPrice4h.toLocaleString()}`}
                </span>
              </div>
            </div>
            
            <button 
                className="action-btn"
                onClick={() => setShowTrailMap(true)}
            >
                <MapIcon size={16} />
                ゲレンデマップを見る
            </button>
          </div>
        </div>
      </div>

      {showTrailMap && (
        <TrailMapModal 
          resort={resort} 
          onClose={() => setShowTrailMap(false)} 
        />
      )}
    </>
  );
};

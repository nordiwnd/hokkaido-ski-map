import React from 'react';
import { X, ImageOff, Map as MapIcon } from 'lucide-react';
import type { SkiResortFeature } from '../types';

interface TrailMapModalProps {
  resort: SkiResortFeature;
  onClose: () => void;
}

export const TrailMapModal: React.FC<TrailMapModalProps> = ({ resort, onClose }) => {
  const { name, trailMapUrl } = resort.properties;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{name} ゲレンデマップ</h3>
          <button className="close-icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          {trailMapUrl ? (
            <img 
              src={trailMapUrl} 
              alt={`${name} Trail Map`} 
              className="trail-map-image" 
            />
          ) : (
            <div className="no-data-container">
              <div className="no-data-icon">
                <ImageOff size={64} />
              </div>
              <p>マップデータが登録されていません</p>
              <button 
                className="action-btn"
                style={{background: '#9ca3af', width: 'auto', marginTop: '10px'}}
                onClick={() => window.open(`https://www.google.com/search?q=${name} ゲレンデマップ`, '_blank')}
              >
                <MapIcon size={16} style={{marginRight:'5px'}}/>
                Google画像検索で探す
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

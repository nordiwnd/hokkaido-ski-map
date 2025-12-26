import React from 'react';
import { X, Map as MapIcon, Ticket } from 'lucide-react';
import type { SkiResortFeature } from '../types';

interface ResortDrawerProps {
  resort: SkiResortFeature | null;
  onClose: () => void;
}

export const ResortDrawer: React.FC<ResortDrawerProps> = ({ resort, onClose }) => {
  const isOpen = !!resort;
  
  if (!resort) return <div className="drawer" />;

  const { name, category, ticketPrice, ticketPrice4h } = resort.properties;

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <button className="close-btn" onClick={onClose} aria-label="Close"><X /></button>
        
        <h2>{name}</h2>
        
        <div style={{marginBottom: '15px'}}>
          <span className={`tag ${category}`}>
            {category === 'major' ? '大規模リゾート' : 'ローカルスキー場'}
          </span>
        </div>

        <div style={{display: 'grid', gap: '10px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Ticket size={20} />
            <div>
              <strong>1日券: </strong> 
              {ticketPrice === 0 ? '無料/不明' : `${ticketPrice.toLocaleString()}円`}
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#666'}}>
            <Ticket size={20} />
            <div>
              <strong>4時間券: </strong> 
              {ticketPrice4h === 0 ? '-' : `${ticketPrice4h.toLocaleString()}円`}
            </div>
          </div>
          
          <div style={{marginTop: '10px'}}>
            <button 
                style={{
                    width: '100%', 
                    padding: '10px', 
                    background: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                }}
                onClick={() => alert('今後ゲレンデマップ機能を追加予定')}
            >
                <MapIcon size={18} />
                ゲレンデマップを見る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
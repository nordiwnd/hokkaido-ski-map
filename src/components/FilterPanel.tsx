import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  count: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, updateFilter, count }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 閉じた状態：トグルボタンのみ表示
  if (!isOpen) {
    return (
      <button 
        className="filter-toggle-btn"
        onClick={() => setIsOpen(true)}
        aria-label="検索フィルターを開く"
      >
        <SlidersHorizontal size={20} />
      </button>
    );
  }

  // 開いた状態：パネル表示
  return (
    <div className="filter-panel-card">
      <div className="filter-header">
        <h3>条件検索 ({count}件)</h3>
        <button className="close-icon-btn" onClick={() => setIsOpen(false)}>
          <X size={20} />
        </button>
      </div>
      
      <div className="filter-content">
        <div className="filter-group">
          <label>
            <span>1日券予算: <span className="price-display">{filters.maxPrice >= 15000 ? '上限なし' : `~${filters.maxPrice.toLocaleString()}円`}</span></span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="15000" 
            step="500" 
            value={filters.maxPrice} 
            onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
            className="slider"
          />
        </div>

        <div className="filter-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.showNightSkiOnly}
              onChange={(e) => updateFilter('showNightSkiOnly', e.target.checked)}
            />
            ナイター営業あり
          </label>
        </div>
      </div>
    </div>
  );
};
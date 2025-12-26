import React from 'react';
import type { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  count: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, updateFilter, count }) => {
  return (
    <div className="ui-overlay">
      <h3>北海道スキー場マップ</h3>
      <p style={{fontSize: '0.8rem', color: '#666'}}>表示中: {count}件</p>
      
      <div className="filter-group">
        <label>
          一日券予算: {filters.maxPrice >= 15000 ? '上限なし' : `~${filters.maxPrice}円`}
        </label>
        <input 
          type="range" 
          min="0" 
          max="15000" 
          step="500" 
          value={filters.maxPrice} 
          onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
          style={{width: '100%'}}
        />
      </div>

      <div className="filter-group">
        <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
          <input 
            type="checkbox" 
            checked={filters.showNightSkiOnly}
            onChange={(e) => updateFilter('showNightSkiOnly', e.target.checked)}
            style={{marginRight: '8px'}}
          />
          ナイター営業あり
        </label>
      </div>
    </div>
  );
};
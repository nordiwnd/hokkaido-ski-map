import { useState, useMemo } from 'react';
import resortDataRaw from '../data/ski_resorts.json';
import type { SkiResortFeature, SkiResortCollection, FilterState } from '../types';

// JSONを型アサーションで読み込む
const resortData = resortDataRaw as unknown as SkiResortCollection;

export const useSkiResorts = () => {
  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 15000,
    showNightSkiOnly: false,
  });

  const [selectedResort, setSelectedResort] = useState<SkiResortFeature | null>(null);

  const filteredFeatures = useMemo(() => {
    return resortData.features.filter((feature) => {
      const { ticketPrice, hasNightSki } = feature.properties;
      
      const priceMatch = ticketPrice <= filters.maxPrice;
      const nightSkiMatch = filters.showNightSkiOnly ? hasNightSki : true;
      
      return priceMatch && nightSkiMatch;
    });
  }, [filters]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    resorts: filteredFeatures,
    allResortsCount: resortData.features.length,
    filters,
    updateFilter,
    selectedResort,
    setSelectedResort
  };
};
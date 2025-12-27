export type ResortCategory = 'major' | 'local';

export interface SkiResortProperties {
  id: string;
  name: string;
  category: ResortCategory;
  ticketPrice: number;
  ticketPrice4h: number;
  hasNightSki: boolean;
  trailMapUrl?: string | null; // Added field for trail map image URL
}

// GeoJSON Feature structure
export interface SkiResortFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lon, lat]
  };
  properties: SkiResortProperties;
}

export interface SkiResortCollection {
  type: 'FeatureCollection';
  features: SkiResortFeature[];
}

export interface FilterState {
  maxPrice: number;
  showNightSkiOnly: boolean;
}

import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { SkiResortFeature } from '../types';

interface MarkerHandlerProps {
  feature: SkiResortFeature;
  onSelect: (feature: SkiResortFeature) => void;
}

const MarkerHandler: React.FC<MarkerHandlerProps> = ({ feature, onSelect }) => {
  const map = useMap();
  
  // GeoJSON: [lon, lat] -> Leaflet: [lat, lon]
  const [lon, lat] = feature.geometry.coordinates;
  const category = feature.properties.category;

  // Create Custom DivIcon
  // Major = Red, Local = Blue (defined in CSS)
  const customIcon = L.divIcon({
    className: 'custom-pin-icon',
    html: `<div class="pin-marker ${category}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 20], // Bottom tip center
    popupAnchor: [0, -20],
  });
  
  const handleClick = () => {
    onSelect(feature);
    // Maintain current zoom level (scale) instead of forcing a specific zoom
    // Only center the map on the clicked pin
    map.flyTo([lat, lon], map.getZoom(), { duration: 1.0 });
  };

  return (
    <Marker 
      position={[lat, lon]} 
      icon={customIcon}
      eventHandlers={{ click: handleClick }}
    />
  );
};

interface MapBoardProps {
  resorts: SkiResortFeature[];
  onSelectResort: (feature: SkiResortFeature) => void;
}

export const MapBoard: React.FC<MapBoardProps> = ({ resorts, onSelectResort }) => {
  const center: [number, number] = [43.5, 142.5]; 
  const zoom = 7;

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {resorts.map((feature) => (
        <MarkerHandler 
          key={feature.properties.id} 
          feature={feature} 
          onSelect={onSelectResort} 
        />
      ))}
    </MapContainer>
  );
};

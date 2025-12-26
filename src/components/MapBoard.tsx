import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { SkiResortFeature } from '../types';

// アイコン設定
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: iconMarker,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MarkerHandlerProps {
  feature: SkiResortFeature;
  onSelect: (feature: SkiResortFeature) => void;
}

const MarkerHandler: React.FC<MarkerHandlerProps> = ({ feature, onSelect }) => {
  const map = useMap();
  
  // GeoJSON: [lon, lat] -> Leaflet: [lat, lon]
  const [lon, lat] = feature.geometry.coordinates;
  
  const handleClick = () => {
    onSelect(feature);
    map.flyTo([lat, lon], 10, { duration: 1.5 });
  };

  return (
    <Marker 
      position={[lat, lon]} 
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
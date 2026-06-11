import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Component to recenter map when position changes
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);
  return null;
};

const LiveTracking = ({ onLocationChange }) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 28.7041,
    lng: 77.1025,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        if (onLocationChange) onLocationChange({ lat: latitude, lng: longitude });
      },
      (err) => console.warn('Geolocation error:', err.message)
    );

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        if (onLocationChange) onLocationChange({ lat: latitude, lng: longitude });
      },
      (err) => console.warn('Watch error:', err.message)
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [onLocationChange]);

  return (
    <MapContainer
      center={[currentPosition.lat, currentPosition.lng]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[currentPosition.lat, currentPosition.lng]} />
      <RecenterMap position={currentPosition} />
    </MapContainer>
  );
};

export default LiveTracking;
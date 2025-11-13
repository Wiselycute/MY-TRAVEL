"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// fix for missing default icon in some setups
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export default function HotelsMap({ hotels = [] }) {
  // derive center from first hotel with coords
  const firstWithCoords = hotels.find(h => h.lat && h.lng);
  const center = firstWithCoords ? [firstWithCoords.lat, firstWithCoords.lng] : [6.5244, 3.3792]; // fallback Lagos

  return (
    <div className="w-full h-80 rounded-xl overflow-hidden mt-6 border">
      <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {hotels.map(h => (h.lat && h.lng) ? (
          <Marker key={h._id} position={[h.lat, h.lng]}>
            <Popup>
              <div>
                <strong>{h.hotel_name}</strong>
                <div className="text-sm">{h.location}</div>
                <div className="text-orange-500">${h.price_per_night}/night</div>
              </div>
            </Popup>
          </Marker>
        ) : null)}
      </MapContainer>
    </div>
  );
}

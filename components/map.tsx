"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import iconImg from "@/public/icon/icon.svg";



// delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface Props {
  center?: number[]
}
const myIcon = L.icon({
  iconUrl: iconImg.src,

  // Adjust icon size (good for marker pins)
  iconSize: [45, 45],        // width, height
  iconAnchor: [22, 45],      // where the “tip” of the pin is
  popupAnchor: [0, -45],     // popup should appear above the pin

  shadowSize: [50, 50],
  shadowAnchor: [20, 45],
});

export default function MapComponent({ center }: Props) {
  return (
    <MapContainer
      center={center as L.LatLngExpression || [51.505, -0.09]}
      zoom={center ? 4 : 2}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <Marker icon={myIcon} position={center as L.LatLngExpression} alt="mark" />
      )}
    </MapContainer>
  );
}

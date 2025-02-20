"use client";

import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

const customIcon = new L.Icon({
  iconUrl: "./assets/2e43ef7093427ceb8adf6de9dad09693.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -40],
});

const PopupOpener = ({ position }: { position: LatLngTuple }) => {
  const map = useMap();
  const { t } = useTranslation();

  useEffect(() => {
    L.popup()
      .setLatLng([position[0] + 0.00011, position[1]])
      .setContent(t("mapTitle"))
      .openOn(map);
  }, [map, position, t]);

  return null;
};

const Map = () => {
  const digiflyLocation: LatLngTuple = [30.061848084316193, 31.33683147116462];
  return (
    <MapContainer center={digiflyLocation} zoom={18} style={{ height: "500px", width: "100%" }} scrollWheelZoom={false} zoomControl={false} attributionControl={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={digiflyLocation} icon={customIcon} />
      <PopupOpener position={digiflyLocation} />
    </MapContainer>
  );
};

export default Map;

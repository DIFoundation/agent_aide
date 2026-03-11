"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Props {
  coordinates: { lat: number; lng: number };
  affected_radius_km: number;
  risk_level: "Low" | "Moderate" | "High" | "Critical";
}

export default function DisasterMap({
  coordinates,
  affected_radius_km,
  risk_level,
}: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: coordinates || [6.5244, 3.3792],
      zoom: 12,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [coordinates]);

  // Update incident location
  useEffect(() => {
    if (!mapRef.current || !coordinates) return;

    const map = mapRef.current;

    const center: [number, number] = [coordinates.lat, coordinates.lng];

    // const circleGeoJSON = {
    //   type: "Feature",
    //   geometry: {
    //     type: "Point",
    //     coordinates: center,
    //   },
    // };

    // const radiusMeters = affected_radius_km * 1000;

    // if (map.getSource("risk-circle")) {
    //   (map.getSource("risk-circle") as mapboxgl.GeoJSONSource).setData(
    //     circleGeoJSON as any
    //   );
    // } else {
    //   map.addSource("risk-circle", {
    //     type: "geojson",
    //     data: circleGeoJSON as any,
    //   });

    //   map.addLayer({
    //     id: "risk-circle-layer",
    //     type: "circle",
    //     source: "risk-circle",
    //     paint: {
    //       "circle-radius": radiusMeters / 50,
    //       "circle-color": "#ff3b30",
    //       "circle-opacity": 0.3,
    //     },
    //   });
    // }

    map.flyTo({
      center: center,
      zoom: 14,
      speed: 1.5,
      essential: true,
    });

    new mapboxgl.Marker({ color: "red" })
      .setLngLat(center)
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${risk_level}</h3>`))
      // .addTo(map);
  }, [coordinates, affected_radius_km, risk_level]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
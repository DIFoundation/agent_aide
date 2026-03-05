"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Props {
  center?: [number, number];
  radiusKm?: number;
}

export default function DisasterMap({ center, radiusKm }: Props) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: center || [3.3792, 6.5244], // Default: Lagos
      zoom: 10,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [center]);

  useEffect(() => {
    if (!mapRef.current || !center || !radiusKm) return;

    const map = mapRef.current;

    const circleGeoJSON = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: center,
      },
    };

    new mapboxgl.Marker({ color: "red" })
      .setLngLat(center)
      .addTo(map);

    // Convert km to meters
    const radiusMeters = radiusKm * 1000;

    map.addSource("risk-circle", {
      type: "geojson",
      data: circleGeoJSON as any,
    });

    map.addLayer({
      id: "risk-circle-layer",
      type: "circle",
      source: "risk-circle",
      paint: {
        "circle-radius": radiusMeters / 50, // visual scaling
        "circle-color": "#ff3b30",
        "circle-opacity": 0.3,
      },
    });

    map.flyTo({ center, zoom: 11 });

  }, [center, radiusKm]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
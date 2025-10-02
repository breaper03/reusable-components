"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

export const MapsInput = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initMap = async () => {
      const loader: Loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "quarterly",
        libraries: ["places"],
      });
      const { Map } = await loader.importLibrary("maps");
      const initLocation = {
        lat: 40.73061,
        lng: -73.935242,
      };

      const options: google.maps.MapOptions = {
        center: initLocation,
        zoom: 8,
        mapId: "custom-map",
      };
      new Map(mapRef.current as HTMLElement, options);
    };

    initMap();
  }, []);

  return <div ref={mapRef} />;
};

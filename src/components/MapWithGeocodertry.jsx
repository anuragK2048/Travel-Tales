// import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useMemo, useCallback } from "react";
import Map, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";

export default function MapWithGeocodertry() {
  const markerRef = useRef();

  const popup = new mapboxgl.Popup().setText("Hello world!");

  function togglePopup1() {
    if (markerRef.current) {
      markerRef.current.togglePopup();
    }
  }

  return (
    <>
      <Map mapboxAccessToken={import.meta.env.VITE_mapboxAccessToken}>
        <Marker
          longitude={-122.4}
          latitude={37.8}
          color="red"
          popup={popup}
          ref={markerRef}
        />
      </Map>
      <button onClick={togglePopup1}>Toggle popup</button>
    </>
  );
}

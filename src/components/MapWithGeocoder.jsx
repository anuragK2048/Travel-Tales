import * as React from "react";
import Map, {
  AttributionControl,
  FullscreenControl,
  Marker,
  Popup,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCities } from "../contexts/CitiesContext";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import mapboxgl from "mapbox-gl";
import { SearchBox } from "@mapbox/search-js-react";
import useParams from "../hooks/useParams";

function MapWithGeocoder({ mapPosition }) {
  const [markerOnClick, setMarkerOnClick] = useState(false);
  const mapRef = useRef(null);
  const popup = new mapboxgl.Popup().setText("hello world");
  const [markLat, markLng] = useParams("clickedlat", "clickedlng");

  const navigate = useNavigate();
  const { cities, mapSearchInputValue, setMapSearchInputValue } = useCities();
  const [viewPort, setViewPort] = useState({
    // longitude: cities[0]?.position?.lng || 79.216721,
    // latitude: cities[0]?.position?.lat || 23.6448,
    longitude: 79.216721,
    latitude: 23.6448,
    zoom: 4,
  });
  const [theme, setTheme] = useState("light");
  // const [mapSearchInputValue, setMapSearchInputValue] = useState("");

  useEffect(
    function () {
      if (mapPosition) flyToLocation(mapPosition[1], mapPosition[0], 8);
    },
    [mapPosition]
  );

  function changeTheme() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }
  function goToMemories() {
    navigate("/memories");
  }
  return (
    <div style={{ height: "inherit" }}>
      <div
        style={{
          position: "absolute",
          zIndex: "99",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <SearchBox
          style={{ width: "400px" }}
          options={{
            types: "country,city,place,region,district,locality",
          }}
          accessToken={import.meta.env.VITE_mapboxAccessToken}
          map={mapRef.current}
          mapboxgl={mapboxgl}
          value={mapSearchInputValue}
          onChange={(d) => {
            setMapSearchInputValue(d);
          }}
        />
        <Button
          type={theme === "light" ? "darktheme" : "lighttheme"}
          onClick={changeTheme}
        >
          {"Theme"}
        </Button>
        <Button type="memories" onClick={goToMemories}>
          &larr; Memories
        </Button>
      </div>
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_mapboxAccessToken}
        mapLib={import("mapbox-gl")}
        {...viewPort}
        onMove={(evt) => {
          return setViewPort(evt.viewPort);
        }}
        style={{ height: "inherit" }}
        mapStyle={
          theme === "light"
            ? "mapbox://styles/mapbox/outdoors-v12"
            : "mapbox://styles/mapbox/dark-v11"
        }
        onClick={onMapClick}
        attributionControl={false}
      >
        {cities?.map((city) => {
          return (
            <Marker
              longitude={city.position.lng}
              latitude={city.position.lat}
              key={city.id}
              popup={new mapboxgl.Popup({
                offset: 25,
                className: "popup",
              })
                .setHTML(
                  `<h2>${city.cityName}. <a
                href="https://en.wikipedia.org/wiki/${city.cityName}"
                target="_blank"
                rel="noreferrer"
              >Details</a></h2>`
                )
                .setMaxWidth("200px")}
            >
              <img
                style={{ height: "50px", width: "50px" }}
                src="../public/mapMarker.png"
                alt="marker"
              />
            </Marker>
          );
        })}
        {markerOnClick && markLat && markLat && (
          <Marker longitude={markLng} latitude={markLat}>
            <img
              style={{ height: "50px", width: "50px" }}
              src="../public/mapMarker.png"
              alt="marker"
            />
          </Marker>
        )}
        <FullscreenControl />
      </Map>
    </div>
  );
  function onMapClick(e) {
    if (e.originalEvent.target.nodeName === "IMG") return;
    navigate(`form?clickedlat=${e.lngLat.lat}&clickedlng=${e.lngLat.lng}`);
    setMarkerOnClick(true);
  }
  function flyToLocation(long, lat, zoom = 5) {
    mapRef.current?.flyTo({
      center: [long, lat],
      zoom: zoom,
      duration: 4000, // Duration of the animation in milliseconds
      essential: true,
    });
  }
}
export default MapWithGeocoder;

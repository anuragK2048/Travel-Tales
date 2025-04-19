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
import { CiDark } from "react-icons/ci";

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
          top: "20px",
          left: "20px",
          position: "absolute",
          zIndex: "99",
          display: "flex",
          justifyContent: "space-around",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button
          onClick={changeTheme}
          className={`theme-toggle ${
            theme === "light" ? "theme-toggle--dark" : "theme-toggle--light"
          }`}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="#e6e0d7"
              stroke="#000000"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-moon"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="transparent"
              stroke="#000000"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokLinejoin="round"
              className="feather feather-sun"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>
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
        <Button type="memories" onClick={goToMemories}>
          Memories &rarr;
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

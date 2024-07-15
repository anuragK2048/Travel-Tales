import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import MapWithGeocoder from "./MapWithGeocoder";
import useParams from "../hooks/useParams";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState(null);
  const { isLoading, position, getPosition, error } = useGeolocation();

  const [mapLat, mapLng] = useParams("lat", "lng");

  useEffect(
    function () {
      if (error) alert(error);
      if (position !== null) {
        setMapPosition([position.lat, position.lng]);
      }
    },
    [position, error]
  );

  useEffect(function () {
    if (cities.length > 0)
      setTimeout(function () {
        setMapPosition([cities[0].position?.lat, cities[0].position?.lng]);
      }, 1);
  }, []);

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "Loading..." : "Go to your position"}
        </Button>
      )}
      <MapWithGeocoder mapPosition={mapPosition} />
    </div>
  );
}

export default Map;

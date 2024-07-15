import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    setError(null);
    setIsLoading(true);
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        setError(error.message);
      }
    );
  }

  return { isLoading, position, error, getPosition, setIsLoading };
}

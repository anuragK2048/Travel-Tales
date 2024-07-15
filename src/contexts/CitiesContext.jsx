import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
// const BASE_URL = "http://localhost:3200";
const BASE_URL = import.meta.env.VITE_glitchJSONserver;

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [mapSearchInputValue, setMapSearchInputValue] = useState("");
  useEffect(
    function () {
      async function fetchCities() {
        try {
          setIsLoading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          if (res.status !== 200) throw new Error("Can't fetch cities");
          const data = await res.json();
          setCities(data);
        } catch (err) {
          alert(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    },
    [refetch]
  );

  async function getCities(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (res.status !== 200) throw new Error("Can't fetch city details");
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCity(cityObject) {
    const allCities = cities.map((city) => city.cityName);
    if (allCities.includes(cityObject.cityName)) {
      alert("city already present in list");
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cityObject),
      });
      const data = await res.json();
      // setCities((c) => [...c, cityObject]);
      setRefetch((cur) => !cur);
      setCurrentCity(data);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      // setCities((c) => [...c, cityObject]);
      setRefetch((cur) => !cur);
      // setCurrentCity(data);
    } catch (err) {
      alert(err);
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCities,
        addCity,
        removeCity,
        mapSearchInputValue,
        setMapSearchInputValue,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const cities1 = useContext(CitiesContext);
  if (cities1 === undefined) throw new Error("Context used beyond its scope");
  return cities1;
}

export { CitiesProvider, useCities };

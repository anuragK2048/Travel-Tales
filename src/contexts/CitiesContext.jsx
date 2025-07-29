import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [mapSearchInputValue, setMapSearchInputValue] = useState("");

  useEffect(
    function () {
      async function fetchCities() {
        try {
          setIsLoading(true);
          // Select all cities from the 'cities' table
          const { data, error } = await supabase.from("cities").select("*");

          if (error) {
            console.error(error);
            throw new Error("Could not fetch cities");
          }
          setCities(data);
        } catch (err) {
          alert(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    },
    [refetch]
  );

  async function getCities(id) {
    if (!id) return;
    try {
      setIsLoading(true);
      // Select a specific city by its id
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        throw new Error("Could not fetch the city details");
      }
      setCurrentCity(data);
    } catch (err) {
      alert(err.message);
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
      // Insert the new city object directly.
      // Supabase handles the mapping of the JS object to the table row.
      const { data, error } = await supabase
        .from("cities")
        .insert([cityObject])
        .select()
        .single();

      if (error) {
        console.error(error);
        throw new Error("Could not add the new city");
      }

      // Manually update state or refetch
      setCities((c) => [...c, data]);
      setCurrentCity(data);
      // Or you can refetch the whole list
      // setRefetch((cur) => !cur);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCity(id) {
    try {
      setIsLoading(true);
      // Delete a city by its id
      const { error } = await supabase.from("cities").delete().eq("id", id);

      if (error) {
        console.error(error);
        throw new Error("Could not remove the city");
      }

      // Manually update state to reflect removal
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
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
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };

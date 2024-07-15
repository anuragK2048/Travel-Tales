// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useNavigate } from "react-router-dom";
import useParams from "../hooks/useParams";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const olaMapsApiKey = import.meta.env.VITE_olaMapsApiKey;
  const mapboxAccessToken = import.meta.env.VITE_mapboxAccessToken;
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isValidCity, setIsValidCity] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [clickedlat, clickedlng] = useParams("clickedlat", "clickedlng");
  const { addCity, isLoading, setMapSearchInputValue } = useCities();
  useEffect(
    function () {
      try {
        setIsLoading2(true);
        setIsValidCity(true);
        // fetch(
        //   `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${clickedlat}%2C${clickedlng}&api_key=${olaMapsApiKey}`
        // ).then((res) => res.json().then((data) => console.log(data)));
        fetch(
          `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${clickedlng}&latitude=${clickedlat}&access_token=${mapboxAccessToken}`
        )
          .then((res) => res.json())
          .then((data) => {
            setIsLoading2(false);
            if (data.features.length === 0) {
              setIsValidCity(false);
              return;
            }
            if (data.features[0].properties.context.place?.name) {
              setCityName(
                data.features[data.features.length - 3].properties.name
              );
              setMapSearchInputValue(
                data.features[data.features.length - 3].properties.full_address
              );
            } else {
              setCityName(data.features[0].properties.context.region.name);
              setMapSearchInputValue(
                data.features[data.features.length - 2].properties.full_address
              );
            }
            setCountryCode(
              data.features[0].properties.context.country.country_code
            );
            setCountry(data.features[0].properties.context.country.name);
          });
      } catch (err) {
        alert("Problem fetching city details");
      }
    },
    [clickedlat, clickedlng]
  );

  async function handleFormSubmit(e) {
    e.preventDefault();
    const cityObject = {
      cityName,
      country,
      emoji: convertToEmoji(countryCode),
      date,
      notes,
      position: {
        lat: clickedlat,
        lng: clickedlng,
      },
    };
    if (!cityName) {
      alert("enter city name");
      return;
    }
    if (!country) {
      alert("invalid country");
      return;
    }
    await addCity(cityObject);
    setMapSearchInputValue("");
    // navigate("");
    navigate("/app");
  }

  if (!clickedlat && !clickedlng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (isLoading2) return <Spinner />;
  if (!isValidCity)
    return (
      <Message
        message={"Unable to fetch fish there 🙃... Please select other place"}
      ></Message>
    );
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleFormSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{convertToEmoji(countryCode)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="cancel"
          onClick={(e) => {
            e.preventDefault();
            navigate("../");
            setMapSearchInputValue("");
          }}
        >
          &#10006; Cancel
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;

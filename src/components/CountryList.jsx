import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  const country = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) return arr;
    else {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
  }, []);
  if (isLoading) return <Spinner />;
  if (country.length === 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.countryList}>
      {country.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;

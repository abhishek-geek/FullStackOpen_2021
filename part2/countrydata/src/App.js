import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [country, setCountry] = useState({
    name: "India",
    topLevelDomain: [".in"],
    alpha2Code: "IN",
    alpha3Code: "IND",
    callingCodes: ["91"],
    capital: "New Delhi",
    altSpellings: ["IN", "Bhārat", "Republic of India", "Bharat Ganrajya"],
    region: "Asia",
    subregion: "Southern Asia",
    population: 1295210000,
    latlng: [20, 77],
    demonym: "Indian",
    area: 3287590,
    gini: 33.4,
    timezones: ["UTC+05:30"],
    borders: ["AFG", "BGD", "BTN", "MMR", "CHN", "NPL", "PAK", "LKA"],
    nativeName: "भारत",
    numericCode: "356",
    currencies: [
      {
        code: "INR",
        name: "Indian rupee",
        symbol: "₹",
      },
    ],
    languages: [
      {
        iso639_1: "hi",
        iso639_2: "hin",
        name: "Hindi",
        nativeName: "हिन्दी",
      },
      {
        iso639_1: "en",
        iso639_2: "eng",
        name: "English",
        nativeName: "English",
      },
    ],
    translations: {
      de: "Indien",
      es: "India",
      fr: "Inde",
      ja: "インド",
      it: "India",
      br: "Índia",
      pt: "Índia",
      nl: "India",
      hr: "Indija",
      fa: "هند",
    },
    flag: "https://restcountries.eu/data/ind.svg",
    regionalBlocs: [
      {
        acronym: "SAARC",
        name: "South Asian Association for Regional Cooperation",
        otherAcronyms: [],
        otherNames: [],
      },
    ],
    cioc: "IND",
  });
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        const weather = response.data;
        console.log(weather);
        setWeather(weather);
      });
  }, [country]);

  const handleQuery = (e) => {
    const q = e.target.value.toLowerCase();
    if (q == "") setShowCountries([]);
    else {
      const sc = countries.filter((c) => c.name.toLowerCase().startsWith(q));
      setShowCountries(sc);
      if (showCountries.length === 1) setCountry(showCountries[0]);
    }
  };

  return (
    <div>
      <div>
        find country <input onChange={handleQuery} />
      </div>
      {showCountries.length > 1 &&
        showCountries.map((c) => (
          <div key={c.name}>
            {c.name} <button onClick={() => setCountry(c)}>show</button>
          </div>
        ))}
      {
        <div>
          <h1>{country.name}</h1>
          <div>capital {country.capital}</div>
          <div>population {country.population}</div>
          <h2>languages</h2>
          <ul>
            {country.languages.map((l) => (
              <li key={l.name}>{l.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt="flag" height="100" />
          <h2>Weather in {country.capital}</h2>
          <div>temperature: {weather.current.temperature} Celcius</div>
          <img src={weather.current.weather_icons} alt="weather icon" />
          <div>
            wind: {weather.current.wind_speed} mph direction{" "}
            {weather.current.wind_dir}
          </div>
        </div>
      }
    </div>
  );
};

export default App;

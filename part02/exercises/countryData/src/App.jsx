import { useState, useEffect } from "react";
import axios from "axios";

const App = ({ api_key }) => {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [countryList, setCountryList] = useState(null);
  const [countryWeather, setCountryWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const cl = response.data.map((country) => country.name.common);
        setCountryList(cl);
      })
      .catch(() => {
        console.log("failed at fetching country list");
      });
  }, []);

  useEffect(() => {
    if (country.localeCompare("") !== 0 && countryList) {
      const countriesToDisplay = countryList.filter((countryName) =>
        countryName.toLowerCase().includes(country)
      );
      if (countriesToDisplay.length === 1) {
        fetchCountryData(countriesToDisplay[0]);
      } else {
        setCountryData(null);
      }
    }
  }, [country]);

  const fetchCountryData = (country) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then((response) => {
        // console.log(response.data.capital);
        // console.log(response.data.capitalInfo.latlng);
        const countryObject = {
          name: response.data.name.common,
          capital: response.data.capital,
          area: response.data.area,
          languages: response.data.languages,
          flag: response.data.flags.png,
        };
        setCountryData(countryObject);
        fetchCountryWeather(
          response.data.capital,
          response.data.capitalInfo.latlng
        );
      })
      .catch(() => {
        console.log("failed to fetch country data");
      });
  };

  const fetchCountryWeather = (name, latlng) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`
      )
      .then((response) => {
        const countryWeatherObject = {
          name: name,
          temperature: response.data.main.temp,
          wind: response.data.wind.speed,
          icon: response.data.weather[0].icon,
        };
        setCountryWeather(countryWeatherObject);
        console.log(countryWeatherObject);
      })
      .catch(() => {
        console.log("failed to fetch weather data");
      });
  };

  const renderCountryData = () => {
    if (countryData !== null && countryWeather != null) {
      return (
        <div>
          <div>
            <h1>{countryData.name}</h1>
            <p>capital: {countryData.capital}</p>
            <p>area: {countryData.area}</p>
            <h4>languages:</h4>
            <ul>
              {Object.values(countryData.languages).map((language, idx) => {
                return <li key={idx}>{language}</li>;
              })}
            </ul>
            <img
              src={countryData.flag}
              alt={`${countryData.name}'s flag`}
            ></img>
          </div>
          <div>
            <h1>Weather in {countryWeather.name}</h1>
            <p>temperature {countryWeather.temperature} Celsius</p>
            <img
              src={`https://openweathermap.org/img/wn/${countryWeather.icon}@2x.png`}
            ></img>
            <p>wind {countryWeather.wind} m/s</p>
          </div>
        </div>
      );
    }

    if (country && countryList) {
      const countriesToDisplay = countryList.filter((countryName) =>
        countryName.toLowerCase().includes(country)
      );

      if (countriesToDisplay.length > 10) {
        return <p>Too many matches, specify another filter</p>;
      } else if (countriesToDisplay.length > 1) {
        return (
          <ul>
            {countriesToDisplay.map((country, idx) => (
              <p key={idx}>
                {country}{" "}
                <button onClick={() => fetchCountryData(country)}>show</button>
              </p>
            ))}
          </ul>
        );
      }
    }
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <div>
        find countries <input value={country} onChange={handleCountryChange} />
      </div>
      {renderCountryData()}
    </div>
  );
};

export default App;

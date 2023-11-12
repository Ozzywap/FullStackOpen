import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [countryList, setCountryList] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const cl = response.data.map((country) => country.name.common);
        setCountryList(cl);
        console.log("successfully fetched country list");
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
        axios
          .get(
            `https://studies.cs.helsinki.fi/restcountries/api/name/${countriesToDisplay[0]}`
          )
          .then((response) => {
            const countryObject = {
              name: response.data.name.common,
              capital: response.data.capital,
              area: response.data.area,
              languages: response.data.languages,
              flag: response.data.flags.png,
            };
            setCountryData(countryObject);
          })
          .catch(() => {
            console.log("failed at fetching country");
          });
      }
    }
  }, [country]);

  const renderCountryData = () => {
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
              <p key={idx}>{country}</p>
            ))}
          </ul>
        );
      }
    }

    if (countryData !== null) {
      return (
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
          <img src={countryData.flag} alt={`${countryData.name}'s flag`}></img>
        </div>
      );
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

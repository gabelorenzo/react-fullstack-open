import { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [shownCountry, setShownCountry] = useState(null);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const filterCountries = (event) => {
    const filtered = countries.filter(country =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );

    setShownCountry(null)
    setFilteredCountries(filtered)
  }

  const showCountry = (country) => {
    setShownCountry(country);
  }

  return (
    <div className="App">
      <div>
        <span>Find Countries: </span>
        <input onChange={filterCountries} />
      </div>
      { filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : filteredCountries.map(country =>
          <div key={country.name.common}>
            <span >{country.name.common}</span>
            <button onClick={() => showCountry(country)}>show</button>
          </div>
        )
      )}
      { shownCountry && <Country country={shownCountry} />}
    </div>
  );
}

export default App;

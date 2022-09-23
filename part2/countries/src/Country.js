import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
      .then(res => setWeather(res.data))
  }, [])

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>

      <h4>Languages: </h4>
      <ul>
        {
          Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)
        }
      </ul>
      <img src={country.flags.png} />
      <h3>Weather in {country.capital}</h3>
      <p>temperature { weather?.main?.temp } Celcius</p>
      <img src={ "http://openweathermap.org/img/wn/" + weather?.weather[0].icon + "@2x.png" } />
      <p>wind { weather?.wind?.speed } m/s </p>
    </>
  )
}

export default Country

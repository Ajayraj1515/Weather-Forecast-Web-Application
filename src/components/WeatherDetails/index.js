import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import './index.css'

const API_KEY = '2f0a06662b3716643e12ee09c15b864f'
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?q='

const WeatherDetails = () => {
  const {cityName} = useParams()
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `${WEATHER_API_URL}${cityName}&appid=${API_KEY}`,
        )
        setWeather(response.data)
      } catch (error) {
        setError('Error fetching weather data.')
      }
    }

    fetchWeather()
  }, [cityName])

  const getWeatherClass = () => {
    if (!weather) return 'default-background'

    const mainWeather = weather.weather[0].main.toLowerCase()
    switch (mainWeather) {
      case 'clear':
        return 'sunny'
      case 'rain':
        return 'rainy'
      case 'clouds':
        return 'cloudy'
      case 'snow':
        return 'snowy'
      default:
        return 'default-background'
    }
  }

  return (
    <div className={`weather-container ${getWeatherClass()}`}>
      <h1>Weather Details for {cityName}</h1>
      {weather ? (
        <div className="weather-details">
          <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default WeatherDetails

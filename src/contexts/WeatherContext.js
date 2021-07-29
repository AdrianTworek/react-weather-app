import { useState, createContext } from 'react'

export const WeatherContext = createContext()

export const WeatherContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const getWeather = async (city) => {
    setLoading(true)

    try {
      const BASE_WEATHER_URL = process.env.REACT_APP_BASE_WEATHER_URL
      const API_KEY = process.env.REACT_APP_API_KEY

      const query = `${BASE_WEATHER_URL}${city}&units=metric&appid=${API_KEY}`

      const response = await fetch(query)
      const data = await response.json()

      setTimeout(() => {
        setWeather(data)
        setLoading(false)
      }, 1000)
    } catch (err) {}
  }

  return (
    <WeatherContext.Provider value={{ weather, getWeather, loading }}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContextProvider

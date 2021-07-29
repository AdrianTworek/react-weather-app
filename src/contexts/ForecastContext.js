import { useState, createContext } from 'react'

export const ForecastContext = createContext()

const ForecastContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({})
  const [loading, setLoading] = useState(false)

  const getForecast = async (city) => {
    setLoading(true)

    try {
      const FORECAST_URL = process.env.REACT_APP_FORECAST_URL
      const API_KEY = process.env.REACT_APP_API_KEY

      const query = `${FORECAST_URL}${city}&units=metric&appid=${API_KEY}`

      const response = await fetch(query)
      const data = await response.json()

      setTimeout(() => {
        setForecast(data)
        setLoading(false)
      }, 1000)
    } catch (err) {}
  }

  return (
    <ForecastContext.Provider
      value={{ forecast, getForecast, setForecast, loading }}
    >
      {children}
    </ForecastContext.Provider>
  )
}

export default ForecastContextProvider

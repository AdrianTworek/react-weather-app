import { createContext } from 'react'

export const FormatContext = createContext()

const FormatContextProvider = ({ children }) => {
  const formatWeather = (weather) => {
    const city = weather.name
    const temperature = Math.ceil(weather.main.temp)
    const icon = weather.weather[0].icon
    const { humidity, pressure } = weather.main
    const wind = weather.wind.speed
    const { sunrise, sunset } = weather.sys
    let { timezone } = weather

    // Capitalize the first letter of conditions description
    let conditions = weather.weather[0].description
    conditions = conditions.charAt(0).toUpperCase() + conditions.slice(1)

    // Convert timestamps to actual hours considering timezone
    let sunriseHours = new Date((sunrise + timezone) * 1000).getUTCHours()
    let sunriseMinutes = new Date((sunrise + timezone) * 1000).getUTCMinutes()
    let sunsetHours = new Date((sunset + timezone) * 1000).getUTCHours()
    let sunsetMinutes = new Date((sunset + timezone) * 1000).getUTCMinutes()

    sunriseHours =
      parseInt(sunriseHours) < 10 ? `0${sunriseHours}` : sunriseHours
    sunriseMinutes =
      parseInt(sunriseMinutes) < 10 ? `0${sunriseMinutes}` : sunriseMinutes

    sunsetHours = parseInt(sunsetHours) < 10 ? `0${sunsetHours}` : sunsetHours
    sunsetMinutes =
      parseInt(sunsetMinutes) < 10 ? `0${sunsetMinutes}` : sunsetMinutes

    const sunriseDate = sunriseHours + ':' + sunriseMinutes
    const sunsetDate = sunsetHours + ':' + sunsetMinutes

    // Return object with prepared and formatted variables
    return {
      city,
      temperature,
      icon,
      humidity,
      pressure,
      wind,
      conditions,
      sunriseDate,
      sunsetDate,
    }
  }

  const formatForecast = (forecast) => {
    const list = forecast.list
    const dayTemperatures = []
    const icons = []
    const timezone = forecast.city.timezone * 1000
    const THREE_HOUR_STEP = 10800 * 1000
    const timestamps = []

    list.forEach((item, idx) => {
      // Store in helper array forecast timestamps with a 3-hour step
      // considering timezone, eg. 12:00:00 in Poland becomes 06:00:00 in
      // New York etc.
      timestamps.push(
        new Date(Date.now() + timezone + THREE_HOUR_STEP * idx)
          .getUTCHours()
          .toString()
      )

      timestamps[idx] =
        timestamps[idx] < 10 ? '0' + timestamps[idx] : timestamps[idx]

      if (
        timestamps[idx] === '14' ||
        timestamps[idx] === '15' ||
        timestamps[idx] === '16'
      ) {
        dayTemperatures.push(Math.ceil(item.main.temp))
        icons.push(item.weather[0].icon)
      }
    })

    // Return object with prepared and formatted variables
    return {
      dayTemperatures,
      icons,
    }
  }

  return (
    <FormatContext.Provider value={{ formatWeather, formatForecast }}>
      {children}
    </FormatContext.Provider>
  )
}

export default FormatContextProvider

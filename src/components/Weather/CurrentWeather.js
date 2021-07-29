import { useState, useEffect, useContext } from 'react'

// Components
import SkeletonWeather from '../Loaders/SkeletonWeather'
import Error from '../Exceptions/Error'

// Icons
import { RiHeartAddFill } from 'react-icons/ri'

// Contexts
import { WeatherContext } from '../../contexts/WeatherContext'
import { FormatContext } from '../../contexts/FormatContext'
import { FavoritesContext } from '../../contexts/FavoritesContext'
import { ErrorContext } from '../../contexts/ErrorContext'

const CurrentWeather = () => {
  const [currentWeather, setCurrentWeather] = useState({})

  const { weather, loading } = useContext(WeatherContext)
  const { formatWeather } = useContext(FormatContext)
  const { addToFavorites } = useContext(FavoritesContext)
  const { isError, errorOccured } = useContext(ErrorContext)

  useEffect(() => {
    // Check if "weather" state is empty
    if (JSON.stringify(weather) !== '{}') {
      try {
        setCurrentWeather(formatWeather(weather))
      } catch (err) {
        errorOccured(weather)

        // Clean previous weather data in case of input error to prevent
        // from displaying the city again
        setCurrentWeather({})
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather, formatWeather])

  const {
    city,
    temperature,
    icon,
    humidity,
    pressure,
    wind,
    conditions,
    sunriseDate,
    sunsetDate,
  } = currentWeather

  return (
    <>
      {loading ? (
        <SkeletonWeather />
      ) : (
        <>
          {!isError ? (
            <>
              {JSON.stringify(currentWeather) !== '{}' && (
                <section className="weather">
                  <div>
                    <p className="weather__city">{city}</p>
                    <h2 className="weather__temperature">{temperature}°</h2>
                  </div>
                  <div>
                    <div className="weather__icon">
                      <img
                        src={`http://openweathermap.org/img/w/${icon}.png`}
                        alt="Weather icon"
                      ></img>
                    </div>
                    <p className="weather__conditions">{conditions}</p>
                  </div>
                  <div className="weather__sub-conditions">
                    <div>
                      <p>Humidity</p>
                      <span>{humidity}%</span>
                    </div>

                    <div>
                      <p>Pressure</p>
                      <span>{pressure} hPa</span>
                    </div>

                    <div>
                      <p>Wind</p>
                      <span>{wind} m/s</span>
                    </div>
                  </div>
                  <div>
                    <div className="weather__sunrise">
                      <p>Sunrise </p>
                      <span>{sunriseDate}</span>
                    </div>
                    <div className="weather__sunset">
                      <p>Sunset</p>
                      <span>{sunsetDate}</span>
                    </div>
                  </div>
                  <button
                    className="weather__cta"
                    aria-label="Add to favorites"
                    onClick={() => addToFavorites(city)}
                  >
                    <RiHeartAddFill />
                  </button>
                </section>
              )}
            </>
          ) : (
            <Error />
          )}
        </>
      )}
    </>
  )
}

export default CurrentWeather

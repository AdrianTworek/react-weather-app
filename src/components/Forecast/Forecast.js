import { useState, useEffect, useContext } from 'react'

// Components
import ForecastItem from './ForecastItem'
import SkeletonForecast from '../Loaders/SkeletonForecast'

// Contexts
import { ForecastContext } from '../../contexts/ForecastContext'
import { FormatContext } from '../../contexts/FormatContext'
import { ErrorContext } from '../../contexts/ErrorContext'

const Forecast = () => {
  const [forecastData, setForecastData] = useState({})

  const { forecast, loading } = useContext(ForecastContext)
  const { formatForecast } = useContext(FormatContext)
  const { isError, errorOccured } = useContext(ErrorContext)

  useEffect(() => {
    // Check if "forecast" state is empty
    if (JSON.stringify(forecast) !== '{}') {
      try {
        setForecastData(formatForecast(forecast))
      } catch (err) {
        errorOccured()

        // Clean previous forecast data in case of input error to prevent
        // from displaying the city again
        setForecastData({})
      }
    }
    // eslint-disable-next-line
  }, [forecast, formatForecast])

  const { dayTemperatures, icons } = forecastData

  return (
    <>
      {loading ? (
        <SkeletonForecast />
      ) : (
        <>
          {!isError && JSON.stringify(forecastData) !== '{}' && (
            <section className="forecast">
              {dayTemperatures &&
                dayTemperatures.map((temp, idx) => (
                  <ForecastItem key={idx} dayTemp={temp} icon={icons[idx]} />
                ))}
            </section>
          )}
        </>
      )}
    </>
  )
}

export default Forecast

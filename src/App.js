import { lazy, Suspense } from 'react'

// Styles
import './sass/App.scss'

// Components
import Intro from './components/Intro/Intro'
import SearchCity from './components/Form/SearchCity'
const CurrentWeather = lazy(() => import('./components/Weather/CurrentWeather'))
const Forecast = lazy(() => import('./components/Forecast/Forecast'))
const Favorites = lazy(() => import('./components/Favorites/Favorites'))

// Context Providers
const WeatherContextProvider = lazy(() => import('./contexts/WeatherContext'))
const ForecastContextProvider = lazy(() => import('./contexts/ForecastContext'))
const FormatContextProvider = lazy(() => import('./contexts/FormatContext'))
const FavoritesContextProvider = lazy(() =>
  import('./contexts/FavoritesContext')
)
const ErrorContextProvider = lazy(() => import('./contexts/ErrorContext'))

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <WeatherContextProvider>
          <ForecastContextProvider>
            <FormatContextProvider>
              <FavoritesContextProvider>
                <ErrorContextProvider>
                  <Intro />
                  <SearchCity />
                  <CurrentWeather />
                  <Forecast />
                  <Favorites />
                </ErrorContextProvider>
              </FavoritesContextProvider>
            </FormatContextProvider>
          </ForecastContextProvider>
        </WeatherContextProvider>
      </Suspense>
    </div>
  )
}

export default App

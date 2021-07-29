import { useContext, useState, useEffect, useRef } from 'react'

// Icons
import { MdFavoriteBorder } from 'react-icons/md'
import { FaTimes } from 'react-icons/fa'

// Contexts
import { FavoritesContext } from '../../contexts/FavoritesContext'
import { ForecastContext } from '../../contexts/ForecastContext'
import { WeatherContext } from '../../contexts/WeatherContext'
import { ErrorContext } from '../../contexts/ErrorContext'

const Favorites = () => {
  const [isOpen, setIsOpen] = useState(false)
  const favoritesContainer = useRef()
  const cta = useRef()

  const { favorites, removeFromFavorites } = useContext(FavoritesContext)
  const { getWeather } = useContext(WeatherContext)
  const { getForecast } = useContext(ForecastContext)
  const { cleanErrors } = useContext(ErrorContext)

  useEffect(() => {
    // Handler keep track of closing cities list when we click
    // outside the list
    const handler = (e) => {
      if (!favoritesContainer.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)

    setTimeout(() => {
      favoritesContainer.current.style.opacity = '1'
    }, 3500)

    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleClick = (city) => {
    cleanErrors()
    getWeather(city)
    getForecast(city)
    setIsOpen(false)
  }

  return (
    <div className="favorites" ref={favoritesContainer}>
      {favorites.length > 0 && (
        <>
          <button
            className="favorites__cta"
            aria-label="Favorite cities button"
            id="cta"
            ref={cta}
            onClick={() => setIsOpen(!isOpen)}
          >
            <MdFavoriteBorder />
          </button>
          <label htmlFor="cta" className="favorites__number">
            {favorites.length}
          </label>

          {isOpen && (
            <ul>
              {favorites.map((city, idx) => (
                <li key={idx} className="favorites__item">
                  <span onClick={() => handleClick(city)}>{city}</span>
                  <button
                    className="favorites__delete"
                    onClick={() => removeFromFavorites(city)}
                  >
                    <FaTimes />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}

export default Favorites

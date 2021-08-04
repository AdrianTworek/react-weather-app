import { createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const FavoritesContext = createContext()

const FavoritesContextProvider = ({ children }) => {
  // Get data from local storage using custom hook
  const cities = useLocalStorage()

  // Set initial state with cities retrieved from local storage
  const [favorites, setFavorites] = useState(cities)

  const addToFavorites = (city) => {
    if (favorites.includes(city) || favorites.length > 9) return
    localStorage.setItem('cities', [...favorites, city])
    setFavorites([...favorites, city])
  }

  const removeFromFavorites = (cityToRemove) => {
    const filtered = favorites.filter((city) => city !== cityToRemove)
    localStorage.setItem('cities', filtered)
    setFavorites(filtered)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesContextProvider

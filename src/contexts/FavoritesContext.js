import { createContext, useState } from 'react'

export const FavoritesContext = createContext()

const FavoritesContextProvider = ({ children }) => {
  // Get city names from local storage
  let cities = localStorage.getItem('cities')
  cities = cities ? cities.split(',') : []
  // Limit favorite cities to 10
  cities = cities.length > 9 ? cities.splice(0, 10) : cities

  // Set initial state with cities retrieved from local storage
  const [favorites, setFavorites] = useState(cities)

  const addToFavorites = (city) => {
    if (favorites.includes(city)) return
    if (favorites.length > 9) return
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

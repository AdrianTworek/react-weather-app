const useLocalStorage = () => {
  // Get city names from local storage
  let cities = localStorage.getItem('cities')
  cities = cities ? cities.split(',') : []
  // Limit favorite cities to 10
  cities = cities.length > 9 ? cities.splice(0, 10) : cities

  return cities
}

export default useLocalStorage

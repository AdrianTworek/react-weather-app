const ForecastItem = ({ dayTemp, icon }) => {
  return (
    <div className="forecast__item">
      <img
        src={`https://openweathermap.org/img/w/${icon}.png`}
        alt="Weather icon"
      ></img>
      <p>{dayTemp}°</p>
    </div>
  )
}

export default ForecastItem

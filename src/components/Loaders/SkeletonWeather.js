const SkeletonWeather = () => {
  return (
    <div className="skeleton">
      <div className="skeleton__city"></div>
      <div className="skeleton__temperature"></div>
      <div className="skeleton__icon"></div>
      <div className="skeleton__conditions"></div>
      <div className="skeleton__sub-conditions">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="skeleton__sunrise"></div>
      <div className="skeleton__sunset"></div>
    </div>
  )
}

export default SkeletonWeather

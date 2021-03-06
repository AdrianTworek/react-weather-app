import { useEffect, useRef } from 'react'

const Intro = () => {
  const intro = useRef()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return setTimeout(() => {
      intro.current.remove()
      document.body.style.overflow = 'auto'
    }, 2999)
  }, [])

  return (
    <div className="intro" ref={intro}>
      <svg
        className="intro__logo"
        id="Layer_1"
        enableBackground="new 0 0 512 512"
        height="75"
        viewBox="0 0 512 512"
        width="75"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="m287.653 244.814c36.216-4.547 71.928 10.028 94.831 38.241 1.681 2.071 4.681 2.524 6.835.951 10.375-7.581 19.307-17.052 26.311-27.985 43.648-68.101-4.822-160.021-87.63-160.021-54.036 0-98.574 41.411-103.531 94.167-.2 2.131.977 4.166 2.935 5.031 22.605 9.998 41.917 26.471 55.483 47.414 1.028 1.589 2.889 2.437 4.766 2.202z" />
          <path d="m328 80c8.837 0 16-7.164 16-16v-32c0-8.836-7.163-16-16-16s-16 7.164-16 16v32c0 8.836 7.163 16 16 16z" />
          <path d="m496 184h-32c-8.837 0-16 7.164-16 16s7.163 16 16 16h32c8.837 0 16-7.164 16-16s-7.163-16-16-16z" />
          <path d="m435.48 284.853c-6.247-6.248-16.378-6.248-22.627 0-6.249 6.249-6.249 16.379 0 22.627l22.627 22.627c3.124 3.125 7.218 4.687 11.313 4.687 14.128 0 21.421-17.207 11.313-27.313z" />
          <path d="m220.52 115.147c6.248 6.249 16.378 6.249 22.627 0s6.249-16.379 0-22.627l-22.627-22.627c-6.246-6.248-16.377-6.248-22.627 0-6.249 6.249-6.249 16.379 0 22.627z" />
          <path d="m424.167 119.833c4.095 0 8.189-1.562 11.313-4.687l22.627-22.627c6.249-6.249 6.249-16.379 0-22.627-6.248-6.248-16.379-6.249-22.627 0l-22.626 22.628c-10.11 10.109-2.813 27.313 11.313 27.313z" />
          <path d="m372.53 364c12.335-60.774-51.311-107.63-105.285-79.934-11.863-39.149-48.223-67.649-91.245-67.649-55.834 0-99.914 47.819-94.95 103.856-45.352 3.543-81.05 41.465-81.05 87.727 0 48.466 39.265 88 88 88h286c36.451 0 66-29.549 66-66 0-34.838-27.413-66-67.47-66z" />
        </g>
      </svg>

      <h1 className="intro__heading">
        Weather <span className="intro__heading--small">App</span>
      </h1>
    </div>
  )
}

export default Intro

import { createContext, useState } from 'react'

export const ErrorContext = createContext()

const ErrorContextProvider = ({ children }) => {
  const [isError, setIsError] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const errorOccured = () => {
    setIsError(true)
    setTimeout(() => {
      setIsError(false)
    }, 4000)
  }

  const emptyInputError = () => {
    cleanErrors()
    setIsEmpty(true)
    setTimeout(() => {
      setIsEmpty(false)
    }, 2500)
  }

  const cleanErrors = () => {
    setIsError(false)
    setIsEmpty(false)
  }

  return (
    <ErrorContext.Provider
      value={{ isError, isEmpty, errorOccured, emptyInputError, cleanErrors }}
    >
      {children}
    </ErrorContext.Provider>
  )
}

export default ErrorContextProvider

import React from 'react';

export const useApi = (asyncFunction, options = {}) => {
  const { url, method, immediately, data } = options
  const [fetching, setFetching] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const [error, setError] = React.useState(null)


  React.useEffect(() => {
    if (immediately)
      makeRequest(options.params)
  }, [immediately])

  const requestFunction = (...rest) => {
    if (!url && !asyncFunction)
      return new Promise((res) => res('Отсутствует url или asyncFunction'))
    if (!url)
      return asyncFunction(...rest)
  }

  const makeRequest = async (...rest) => {
    setFetching(true)
    try {
      const res = await requestFunction(...rest)
      if (res)
        setResult(res)
      setFetching(false)
      return res
    }
    catch (e) {
      setFetching()
      setError(e)
    }
  }

  return { fetch: makeRequest, res: result, fetching, err: error }
}
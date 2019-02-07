/** source: https://github.com/FormidableLabs/react-live/tree/master/src/utils/transpile */

import React from 'react'

const errorBoundary = (Element, errorCallback) => {
  return class ErrorBoundary extends React.Component {
    componentDidCatch(error) {
      errorCallback(error)
    }

    render() {
      return typeof Element === 'function' ? <Element /> : Element
    }
  }
}

export default errorBoundary

import React, { useContext, useRef } from 'react'
import ReactDOM from 'react-dom'
import DataContext, {
  defaultContextState,
} from '../../DataContext/Context'
import WizardContext, {
  WizardContextState,
} from '../Context/WizardContext'

export function PrerenderFieldPropsOfOtherSteps({
  prerenderFieldPropsRef,
  stepsRef,
}: Pick<WizardContextState, 'prerenderFieldPropsRef' | 'stepsRef'>) {
  const hasRenderedRef = useRef(true)
  if (!hasRenderedRef.current) {
    return null
  }
  hasRenderedRef.current = false

  return (
    <PrerenderPortal>
      <PrerenderFieldPropsProvider>
        <iframe title="Wizard Prerender" hidden>
          {Object.values(prerenderFieldPropsRef.current).map(
            ({ index, fn: Fn }) => {
              const step = stepsRef.current.get(index)
              if (step?.keepInDOM === true) {
                return null
              }
              return <Fn key={index} />
            }
          )}
        </iframe>
      </PrerenderFieldPropsProvider>
    </PrerenderPortal>
  )
}

function PrerenderPortal({ children }) {
  if (typeof document !== 'undefined') {
    return ReactDOM.createPortal(children, document.body)
  }
}

function PrerenderFieldPropsProvider({ children }) {
  const { data, setFieldInternals, updateDataValue } =
    useContext(DataContext)

  return (
    <DataContext.Provider
      value={{
        ...defaultContextState,
        hasContext: true,
        prerenderFieldProps: true,

        // Only enable data and these methods
        data,
        setFieldInternals,
        updateDataValue,
      }}
    >
      <WizardContext.Provider value={{ prerenderFieldProps: true }}>
        {children}
      </WizardContext.Provider>
    </DataContext.Provider>
  )
}

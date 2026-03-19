/**
 * Web StepIndicator Context
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import type { ContextProps } from '../../shared/Context'
import Context from '../../shared/Context'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'
import { extendPropsWithContext } from '../../shared/component-helper'
import type {
  StepIndicatorData,
  StepIndicatorDataItem,
  StepIndicatorMode,
  StepIndicatorProps,
} from './StepIndicator'
import type { StepIndicatorItemProps } from './StepIndicatorItem'

// We use this array to filter out unwanted properties
const filterAttributes = Object.keys(stepIndicatorDefaultProps)
  .filter((item) => {
    return !['class', 'className'].includes(item)
  })
  .concat([
    'internalId',
    'mainTitle',
    'stepsLabel',
    'listOfReachedSteps',
    'setActiveStep',
    'activeStep',
    'countSteps',
    'open',
    'openHandler',
    'closeHandler',
    'ref',
    'hasSkeletonData',
    'filterAttributes',
  ])

type StepIndicatorContextValues = StepIndicatorProviderProps &
  StepIndicatorProviderStates &
  ContextProps

const StepIndicatorContext =
  React.createContext<StepIndicatorContextValues>(null)

export default StepIndicatorContext

export type StepIndicatorProviderProps = Omit<
  StepIndicatorProps,
  'mode' | 'data'
> & {
  /**
   * <em>(required)</em> defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,isCurrent}]`. See parameters and the example above.
   */
  data?: StepIndicatorData
  /**
   * <em>(required)</em> defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
   */
  mode?: StepIndicatorMode
  children: React.ReactNode
}

type StepIndicatorProviderStates = {
  data: (string | StepIndicatorItemProps)[]
  activeStep: number
  open: boolean
  listOfReachedSteps: number[]
  countSteps: number
  stepsLabel: string
  filterAttributes: string[]
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  openHandler: () => void
  closeHandler: () => void
}

export function StepIndicatorProvider(props: StepIndicatorProviderProps) {
  const data = useMemo(() => {
    if (typeof props.data === 'string') {
      return props.data[0] === '[' ? JSON.parse(props.data) : []
    }

    return props.data || []
  }, [props])

  const [open, setOpen] = useState<boolean>(props.expandedInitially)

  const openHandler = useCallback(() => {
    setOpen(true)
  }, [])

  const closeHandler = useCallback(() => {
    setOpen(false)
  }, [])

  const getActiveStepFromProps = useCallback(() => {
    if (typeof data[0] === 'string') {
      return props.currentStep
    }

    const dataWithItems = data as StepIndicatorDataItem[]

    const itemWithCurrentStep = dataWithItems.find(
      (item) => item.isCurrent
    )
    // Is current on data item has precedence(?) over currentStep prop
    return itemWithCurrentStep
      ? dataWithItems.indexOf(itemWithCurrentStep)
      : props.currentStep
  }, [data, props.currentStep])

  const countSteps = data.length
  const activeStepRef = useRef<number>(getActiveStepFromProps())
  const [, forceUpdate] = useReducer(() => ({}), {})
  const setActiveStep = useCallback((step: number) => {
    activeStepRef.current = step
    forceUpdate()
  }, [])
  const listOfReachedSteps = useRef(
    [activeStepRef.current].filter(Boolean)
  ).current
  const context = useContext(Context)

  const updateStepTitle = useCallback(
    (title: string) => {
      return title
        ?.replace('%step', String((activeStepRef.current || 0) + 1))
        .replace('%count', String(data?.length || 1))
    },
    [data?.length]
  )

  const makeContextValue = useCallback(() => {
    const globalContext = extendPropsWithContext(
      props,
      stepIndicatorDefaultProps,
      { skeleton: context?.skeleton },
      context.getTranslation(context).StepIndicator,
      context.StepIndicator
    )

    const value = extendSafe(
      { filterAttributes },
      globalContext,
      // Props
      {
        defaultProps: stepIndicatorDefaultProps,
        props,
      },
      // State
      {
        activeStep: activeStepRef.current,
        open,
        listOfReachedSteps,
        data,
        countSteps,
        stepsLabel: updateStepTitle(globalContext.stepTitle),
      },
      // Functions
      {
        setActiveStep,
        openHandler,
        closeHandler,
      }
    ) as StepIndicatorContextValues

    return value
  }, [
    closeHandler,
    context,
    countSteps,
    data,
    listOfReachedSteps,
    openHandler,
    open,
    props,
    setActiveStep,
    updateStepTitle,
  ])

  const contextValue = makeContextValue() as StepIndicatorContextValues

  // Keeps the activeStep state updated with changes to the currentStep and data props
  useEffect(() => {
    const currentStepFromProps = getActiveStepFromProps()

    if (currentStepFromProps !== activeStepRef.current) {
      setActiveStep(currentStepFromProps)
    }
  }, [props.currentStep, data, getActiveStepFromProps, setActiveStep])

  // Keeps the listOfReachedSteps state up to date with the activeStep state
  const activeStep = activeStepRef.current
  useEffect(() => {
    if (!listOfReachedSteps.includes(activeStep)) {
      listOfReachedSteps.push(activeStep)
    }
  }, [activeStep, listOfReachedSteps])

  if (
    typeof window !== 'undefined' &&
    (window as unknown as Record<string, unknown>)['IS_TEST']
  ) {
    ;(contextValue as Record<string, unknown>)['noAnimation'] = true
  }

  // Filter out unwanted HTML attributes
  // Cache Object.keys() result for performance
  const contextValueKeys = Object.keys(contextValue)
  contextValueKeys.forEach((key) => {
    if (key.startsWith('_')) {
      delete (contextValue as Record<string, unknown>)[key]
    }
  })

  return (
    <StepIndicatorContext value={contextValue}>
      {props.children}
    </StepIndicatorContext>
  )
}

/**
 * Like "Object.assign" – but safe
 * A new falsy value will not be used, if it exists already
 *
 * @param  {...object} objects
 * @returns object
 */
function extendSafe(
  ...objects: Array<Record<string, unknown>>
): Record<string, unknown> {
  const obj: Record<string, unknown> = {}

  objects.forEach((itm) => {
    const itmRecord = itm as Record<string, unknown>
    if (itmRecord.defaultProps && itmRecord.props) {
      const defaultPropsRecord = itmRecord.defaultProps as Record<
        string,
        unknown
      >
      const propsRecord = itmRecord.props as Record<string, unknown>
      itm = Object.entries(propsRecord).reduce(
        (acc, [k, v]) => {
          if (defaultPropsRecord[k] !== v) {
            acc[k] = v
          }
          return acc
        },
        {} as Record<string, unknown>
      )
    }

    Object.entries(itm).forEach(([k, v]) => {
      if (!obj[k] || (obj[k] && v)) {
        obj[k] = v
      }
    })
  })

  return obj
}

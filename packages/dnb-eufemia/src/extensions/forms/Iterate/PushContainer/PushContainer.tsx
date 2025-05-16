import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import classnames from 'classnames'
import Isolation from '../../Form/Isolation'
import useHandleStatus from '../../Form/Isolation/useHandleStatus'
import PushContainerContext from './PushContainerContext'
import IterateItemContext from '../IterateItemContext'
import DataContext from '../../DataContext/Context'
import VisibilityContext from '../../Form/Visibility/VisibilityContext'
import useDataValue from '../../hooks/useDataValue'
import EditContainer, {
  DoneButton,
  CancelButton,
  ResetButton,
  AllProps as EditContainerProps,
} from '../EditContainer'
import IterateArray, { ContainerMode } from '../Array'
import OpenButton from './OpenButton'
import { Flex, FormStatus, HeightAnimation } from '../../../../components'
import { OnCommit, Path } from '../../types'
import { SpacingProps } from '../../../../shared/types'
import {
  useArrayLimit,
  useItemPath,
  useSwitchContainerMode,
} from '../hooks'
import Toolbar from '../Toolbar'
import { useTranslation } from '../../hooks'
import { clearedData } from '../../DataContext/Provider'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So it's a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

type OnlyPathRequired = {
  /**
   * The path to the array to add the new item to.
   */
  path: Path

  /** The sub path to the array to add the new item to. */
  itemPath?: Path
}

type OnlyItemPathRequired = {
  /**
   * The path to the array to add the new item to.
   */
  path?: Path

  /** The sub path to the array to add the new item to. */
  itemPath: Path
}

export type Props = (OnlyPathRequired | OnlyItemPathRequired) & {
  /**
   * The title of the container.
   */
  title?: React.ReactNode

  /**
   * If the fields inside the container are required.
   */
  required?: boolean

  /**
   * The index to insert the new item at.
   */
  insertAt?: number

  /**
   * The button to open container.
   */
  openButton?: React.ReactNode

  /**
   * Define when the "open button" should be shown.
   * Should be a function that returns a boolean.
   */
  showOpenButtonWhen?: (list: unknown[]) => boolean

  /**
   * Prefilled data to add to the fields. The data will be put into this path: "/pushContainerItems/0".
   */
  data?: unknown | Record<string, unknown>

  /**
   * Prefilled data to add to the fields. The data will be put into this path: "/pushContainerItems/0".
   */
  defaultData?: unknown | Record<string, unknown>

  /**
   * Provide additional data that will be put into the root of the isolated data context (parallel to "/pushContainerItems/0").
   */
  isolatedData?: Record<string, unknown>

  /**
   * Prevent the form from being submitted when there are fields with errors inside the PushContainer.
   */
  bubbleValidation?: boolean

  /**
   * If the container should be committed before the form is submitted.
   */
  /**
   * @deprecated – Replaced with preventUncommitedChanges, requireCommit will be removed in v11.
   */
  requireCommit?: boolean

  /**
   * Prevents uncommited changes before the form is submitted. Will display an error message if user tries to submit without committing their changes.
   */
  preventUncommitedChanges?: boolean

  /**
   * Show a button to clear the PushContainer data.
   */
  showResetButton?: boolean

  /**
   * A custom toolbar to be shown below the container.
   */
  toolbar?: React.ReactNode

  /**
   * Will be called when the user clicks on the "Done" button.
   */
  onCommit?: OnCommit

  /**
   * The container contents.
   */
  children: React.ReactNode
}

export type AllProps = Props &
  SpacingProps &
  Omit<EditContainerProps, 'data'>

function PushContainer(props: AllProps) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const outerContext = useContext(DataContext)
  const { data: outerData, required: requiredInherited } = outerContext

  const {
    data: dataProp,
    defaultData: defaultDataProp,
    isolatedData,
    bubbleValidation,
    preventUncommitedChanges = props?.requireCommit,
    showResetButton,
    path,
    itemPath,
    insertAt,
    title,
    required = requiredInherited,
    children,
    openButton,
    showOpenButtonWhen,
    onCommit,
    ...rest
  } = props

  const { absolutePath } = useItemPath(itemPath)
  const commitHandleRef = useRef<() => void>()
  const switchContainerModeRef = useRef<(mode: ContainerMode) => void>()
  const containerModeRef = useRef<ContainerMode>()
  const {
    value: entries = [],
    moveValueToPath,
    getValueByPath,
  } = useDataValue<Array<unknown>>(path || itemPath)

  const { setNextContainerMode } = useSwitchContainerMode(
    path || absolutePath
  )
  const { hasReachedLimit, setShowStatus } = useArrayLimit(
    path || absolutePath
  )
  const cancelHandler = useCallback(() => {
    if (hasReachedLimit) {
      setShowStatus(false)
    }
  }, [hasReachedLimit, setShowStatus])

  const showOpenButton = showOpenButtonWhen?.(entries)
  const newItemContextProps: PushContainerContext = {
    path,
    itemPath,
    entries,
    commitHandleRef,
    switchContainerMode: switchContainerModeRef.current,
  }

  const data = useMemo(() => {
    if (defaultDataProp) {
      return // don't return a fallback, because we want to use the defaultData
    }
    return {
      ...isolatedData,
      pushContainerItems: [Object.freeze(dataProp) ?? clearedData],
    }
  }, [dataProp, defaultDataProp, isolatedData])

  if (outerData) {
    // Use assign to avoid mutating the original data object.
    // Because changes from outside should only silently be applied to the
    // data object, without triggering a rerender.
    // This way "pushContainerItems" will not clear/unset changed data.
    if (!Object.isFrozen(data)) {
      Object.assign(data || {}, outerData)
    }
  }

  const defaultData = useMemo(() => {
    return {
      ...(!dataProp ? isolatedData : null),
      pushContainerItems: [Object.freeze(defaultDataProp ?? clearedData)],
    }
  }, [dataProp, defaultDataProp, isolatedData])

  const emptyData = useCallback(
    (data: { pushContainerItems: unknown[] }) => {
      const firstItem = data.pushContainerItems?.[0]
      if (firstItem === null || typeof firstItem !== 'object') {
        return {
          ...isolatedData,
          pushContainerItems: [null],
        }
      }

      return {
        ...isolatedData,
        pushContainerItems: [dataProp ?? defaultDataProp ?? clearedData],
      }
    },
    [dataProp, defaultDataProp, isolatedData]
  )

  return (
    <Isolation
      data={data}
      defaultData={defaultData}
      required={required}
      emptyData={emptyData}
      bubbleValidation={
        containerModeRef.current === 'view' ? false : bubbleValidation
      }
      commitHandleRef={commitHandleRef}
      transformOnCommit={({ pushContainerItems }) => {
        return moveValueToPath(
          path || absolutePath,
          typeof insertAt === 'number'
            ? [
                ...entries.slice(0, insertAt),
                ...pushContainerItems,
                ...entries.slice(insertAt),
              ]
            : [...entries, ...pushContainerItems],
          absolutePath ? structuredClone(getValueByPath('/')) : {}
        )
      }}
      onCommit={(data, options) => {
        const { clearData, preventCommit } = options
        if (hasReachedLimit) {
          preventCommit()
          setShowStatus(true)
        } else {
          setNextContainerMode('view')
          switchContainerModeRef.current?.('view')
          clearData()
        }
        onCommit?.(data, options)
      }}
    >
      <PushContainerContext.Provider value={newItemContextProps}>
        <IterateArray
          path="/pushContainerItems"
          containerMode={showOpenButton ? 'view' : 'edit'}
          withoutFlex
        >
          <NewContainer
            title={title}
            openButton={openButton}
            switchContainerModeRef={switchContainerModeRef}
            showOpenButton={showOpenButton}
            cancelHandler={cancelHandler}
            containerModeRef={containerModeRef}
            rerenderPushContainer={forceUpdate}
            preventUncommitedChanges={preventUncommitedChanges}
            showResetButton={showResetButton}
            outerContext={outerContext}
            {...rest}
          >
            {children}
          </NewContainer>
        </IterateArray>
      </PushContainerContext.Provider>
    </Isolation>
  )
}

function NewContainer({
  title,
  openButton,
  showOpenButton,
  showResetButton,
  switchContainerModeRef,
  cancelHandler,
  containerModeRef,
  rerenderPushContainer,
  preventUncommitedChanges,
  outerContext,
  children,
  ...rest
}) {
  const { containerMode, switchContainerMode } =
    useContext(IterateItemContext) || {}
  containerModeRef.current = containerMode

  const { hasContentChanged, showStatus: showCommitStatus } =
    useHandleStatus({
      outerContext,
      preventUncommitedChanges,
      error: pushContainerError,
    })

  useEffect(() => {
    rerenderPushContainer()
  }, [containerMode, rerenderPushContainer])

  switchContainerModeRef.current = switchContainerMode
  const isVisible = Boolean(!showOpenButton || containerMode === 'edit')
  const { preventUncommitedChangesText } =
    useTranslation().IteratePushContainer
  const { createButton } = useTranslation().IteratePushContainer
  const { clearData } = useContext(DataContext) || {}
  const restoreOriginalValue = useCallback(() => {
    clearData?.()
  }, [clearData])

  const toolbar = (
    <Toolbar>
      <IterateItemContext.Consumer>
        {(context) => {
          const newItemContextProps = {
            ...context,
            restoreOriginalValue,
          }
          return (
            <IterateItemContext.Provider value={newItemContextProps}>
              <Flex.Horizontal gap="large">
                <DoneButton text={createButton} />
                {showOpenButton && (
                  <CancelButton onClick={cancelHandler} />
                )}
                {(preventUncommitedChanges || showResetButton) && (
                  <ResetButton
                    // Use hidden in order to render the useHasContentChanged hook
                    hidden={!(showResetButton || showCommitStatus)}
                  />
                )}
              </Flex.Horizontal>

              {preventUncommitedChanges && showCommitStatus && (
                <FormStatus no_animation={false} show={hasContentChanged}>
                  {preventUncommitedChangesText}
                </FormStatus>
              )}
            </IterateItemContext.Provider>
          )
        }}
      </IterateItemContext.Consumer>
    </Toolbar>
  )

  return (
    <VisibilityContext.Provider value={{ isVisible, keepInDOM: false }}>
      <EditContainer
        open={isVisible}
        title={title}
        toolbar={toolbar}
        {...rest}
        // Add the class by default, because we don't get a "hasSubmitError" trigger
        className={classnames(
          'dnb-forms-section-block--error',
          rest.className
        )}
      >
        {children}
      </EditContainer>

      {openButton && typeof showOpenButton === 'boolean' && (
        <HeightAnimation open={showOpenButton && containerMode === 'view'}>
          {openButton}
        </HeightAnimation>
      )}
    </VisibilityContext.Provider>
  )
}

const pushContainerError = new Error('Iterate.PushContainer')

PushContainer.OpenButton = OpenButton
PushContainer._supportsSpacingProps = true

export default PushContainer

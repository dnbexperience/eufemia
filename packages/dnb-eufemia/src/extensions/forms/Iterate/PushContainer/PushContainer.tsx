import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import Isolation from '../../Form/Isolation'
import PushContainerContext from './PushContainerContext'
import IterateItemContext from '../IterateItemContext'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import EditContainer, { CancelButton, DoneButton } from '../EditContainer'
import IterateArray, { ContainerMode } from '../Array'
import OpenButton from './OpenButton'
import { Flex, HeightAnimation } from '../../../../components'
import { OnCommit, Path } from '../../types'
import { SpacingProps } from '../../../../shared/types'
import {
  useArrayLimit,
  useSwitchContainerMode,
  useItemPath,
} from '../hooks'
import Toolbar from '../Toolbar'
import { useTranslation } from '../../hooks'
import { ArrayItemAreaProps } from '../Array/ArrayItemArea'
import { clearedData } from '../../DataContext/Provider'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So it's a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

type OnlyPath = {
  /**
   * The path to the array, to add the new item to.
   */
  path: Path

  /** The sub path to the array, to add the new item to. */
  itemPath?: Path
}

type OnlyItemPath = {
  /**
   * The path to the array, to add the new item to.
   */
  path?: Path

  /** The sub path to the array to add the new item to. */
  itemPath: Path
}

export type Props = (OnlyPath | OnlyItemPath) & {
  /**
   * The title of the container.
   */
  title?: React.ReactNode

  /**
   * If the fields inside the container are required.
   */
  required?: boolean

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

export type AllProps = Props & SpacingProps & ArrayItemAreaProps

function PushContainer(props: AllProps) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  const requiredInherited = useContext(DataContext)?.required

  const {
    data: dataProp,
    defaultData: defaultDataProp,
    isolatedData,
    bubbleValidation,
    path,
    itemPath: itemPathProp,
    title,
    required = requiredInherited,
    children,
    openButton,
    showOpenButtonWhen,
    onCommit,
    ...rest
  } = props

  const itemPath = useItemPath(itemPathProp)

  const commitHandleRef = useRef<() => void>()
  const switchContainerModeRef = useRef<(mode: ContainerMode) => void>()
  const containerModeRef = useRef<ContainerMode>()
  const {
    value: entries = [],
    moveValueToPath,
    getValueByPath,
  } = useDataValue<Array<unknown>>(path || itemPath)

  const { setNextContainerMode } = useSwitchContainerMode(path || itemPath)
  const { hasReachedLimit, setShowStatus } = useArrayLimit(
    path || itemPath
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
      pushContainerItems: [dataProp ?? clearedData],
    }
  }, [dataProp, defaultDataProp, isolatedData])

  const defaultData = useMemo(() => {
    return {
      ...(!dataProp ? isolatedData : null),
      pushContainerItems: [defaultDataProp ?? clearedData],
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
      return defaultData
    },
    [defaultData, isolatedData]
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
          path || itemPath,
          [...entries, ...pushContainerItems],
          itemPath ? structuredClone(getValueByPath('/')) : {}
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
  switchContainerModeRef,
  cancelHandler,
  containerModeRef,
  rerenderPushContainer,
  children,
  ...rest
}) {
  const { containerMode, switchContainerMode } =
    useContext(IterateItemContext) || {}
  containerModeRef.current = containerMode

  useEffect(() => {
    rerenderPushContainer()
  }, [containerMode, rerenderPushContainer])

  switchContainerModeRef.current = switchContainerMode
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
              </Flex.Horizontal>
            </IterateItemContext.Provider>
          )
        }}
      </IterateItemContext.Consumer>
    </Toolbar>
  )

  return (
    <>
      <EditContainer
        open={!showOpenButton || containerMode === 'edit'}
        title={title}
        toolbar={toolbar}
        {...rest}
      >
        {children}
      </EditContainer>

      {openButton && typeof showOpenButton === 'boolean' && (
        <HeightAnimation open={showOpenButton && containerMode === 'view'}>
          {openButton}
        </HeightAnimation>
      )}
    </>
  )
}

PushContainer.OpenButton = OpenButton
PushContainer._supportsSpacingProps = true

export default PushContainer

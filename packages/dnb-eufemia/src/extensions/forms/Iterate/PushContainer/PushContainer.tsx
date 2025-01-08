import React, { useCallback, useContext, useMemo, useRef } from 'react'
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
import { useArrayLimit, useSwitchContainerMode } from '../hooks'
import Toolbar from '../Toolbar'
import { useTranslation } from '../../hooks'
import { ArrayItemAreaProps } from '../Array/ArrayItemArea'
import { clearedData } from '../../DataContext/Provider'

export type Props = {
  /**
   * The path to the array to add the new item to.
   */
  path: Path

  /**
   * The title of the container.
   */
  title?: React.ReactNode

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
  const {
    data: dataProp,
    defaultData: defaultDataProp,
    isolatedData,
    bubbleValidation,
    path,
    title,
    children,
    openButton,
    showOpenButtonWhen,
    onCommit,
    ...rest
  } = props

  const commitHandleRef = useRef<() => void>()
  const switchContainerModeRef = useRef<(mode: ContainerMode) => void>()
  const { value: entries = [], moveValueToPath } = useDataValue<
    Array<unknown>
  >({ path })

  const { setNextContainerMode } = useSwitchContainerMode({ path })
  const { hasReachedLimit, setShowStatus } = useArrayLimit({
    path,
  })
  const cancelHandler = useCallback(() => {
    if (hasReachedLimit) {
      setShowStatus(false)
    }
  }, [hasReachedLimit, setShowStatus])

  const showOpenButton = showOpenButtonWhen?.(entries)
  const newItemContextProps: PushContainerContext = {
    path,
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
      emptyData={emptyData}
      bubbleValidation={bubbleValidation}
      commitHandleRef={commitHandleRef}
      transformOnCommit={({ pushContainerItems }) => {
        return moveValueToPath(path, [...entries, ...pushContainerItems])
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
  children,
  ...rest
}) {
  const { containerMode, switchContainerMode } =
    useContext(IterateItemContext) || {}
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

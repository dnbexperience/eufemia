import React, { useCallback, useContext, useMemo, useRef } from 'react'
import Isolation from '../../Form/Isolation'
import PushContainerContext from './PushContainerContext'
import IterateItemContext from '../IterateItemContext'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import EditContainer, { CancelButton, DoneButton } from '../EditContainer'
import IterateArray, { ContainerMode } from '../Array'
import OpenButton from './OpenButton'
import { HeightAnimation } from '../../../../components'
import { Path } from '../../types'
import { SpacingProps } from '../../../../shared/types'
import { useSwitchContainerMode } from '../hooks'
import Toolbar from '../Toolbar'
import { useTranslation } from '../../hooks'

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
   * Prefilled data to add to the fields.
   */
  data?: unknown | Record<string, unknown>

  /**
   * A custom toolbar to be shown below the container.
   */
  toolbar?: React.ReactNode

  /**
   * The container contents.
   */
  children: React.ReactNode
}

export type AllProps = Props & SpacingProps

function PushContainer(props: AllProps) {
  const {
    data = null,
    path,
    title,
    children,
    openButton,
    showOpenButtonWhen,
    ...rest
  } = props

  const commitHandleRef = useRef<() => void>()
  const switchContainerModeRef = useRef<(mode: ContainerMode) => void>()
  const { value: entries = [], moveValueToPath } = useDataValue<
    Array<unknown>
  >({ path })

  const { setNextContainerMode } = useSwitchContainerMode({ path })

  const showOpenButton = showOpenButtonWhen?.(entries)
  const newItemContextProps: PushContainerContext = {
    path,
    entries,
    commitHandleRef,
    switchContainerMode: switchContainerModeRef.current,
  }

  const defaultData = useMemo(() => {
    return { newItems: [data] }
  }, [data])

  return (
    <Isolation
      defaultData={defaultData}
      emptyData={defaultData}
      commitHandleRef={commitHandleRef}
      transformOnCommit={({ newItems }) => {
        return moveValueToPath(path, [...entries, ...newItems])
      }}
      onCommit={(data, { clearData }) => {
        setNextContainerMode('view')
        switchContainerModeRef.current?.('view')
        clearData()
      }}
    >
      <PushContainerContext.Provider value={newItemContextProps}>
        <IterateArray
          path="/newItems"
          containerMode={showOpenButton ? 'view' : 'edit'}
        >
          <NewContainer
            title={title}
            openButton={openButton}
            switchContainerModeRef={switchContainerModeRef}
            showOpenButton={showOpenButton}
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
    <IterateItemContext.Consumer>
      {(context) => {
        const newItemContextProps = {
          ...context,
          restoreOriginalValue,
        }
        return (
          <IterateItemContext.Provider value={newItemContextProps}>
            <Toolbar>
              <DoneButton text={createButton} />
              {showOpenButton && <CancelButton />}
            </Toolbar>
          </IterateItemContext.Provider>
        )
      }}
    </IterateItemContext.Consumer>
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

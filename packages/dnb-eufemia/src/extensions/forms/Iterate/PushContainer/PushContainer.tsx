import React, { useCallback, useContext, useRef } from 'react'
import Isolation from '../../Form/Isolation'
import PushContainerContext from './PushContainerContext'
import IterateItemContext from '../IterateItemContext'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import EditContainer from '../EditContainer'
import IterateArray, { ContainerMode, ContainerModeWhen } from '../Array'
import OpenButton from './OpenButton'
import { HeightAnimation } from '../../../../components'
import { Path } from '../../types'
import { SpacingProps } from '../../../../shared/types'

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
   * Define if the container should auto push when e.g. the first item (list is empty).
   * Should be a function that returns a boolean.
   */
  autoPushWhen?: (list: unknown[]) => boolean

  /**
   * Prefilled data to add to the fields.
   */
  data?: Record<string, unknown>

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
    autoPushWhen,
    ...rest
  } = props

  const { setFieldProps } = useContext(DataContext) || {}
  const commitHandleRef = useRef<() => void>()
  const switchContainerModeRef = useRef<(mode: ContainerMode) => void>()
  const { value: entries = [], moveValueToPath } = useDataValue<
    Array<unknown>
  >({ path })

  const showOpenButton = showOpenButtonWhen?.(entries)
  const autoPush = autoPushWhen?.(entries)

  const newItemContextProps: PushContainerContext = {
    path,
    entries,
    commitHandleRef,
    switchContainerMode: switchContainerModeRef.current,
  }

  const switchArrayContainerToViewMode = useCallback(() => {
    if (path) {
      const opts: { containerModeWhen: ContainerModeWhen } = {
        containerModeWhen: (isNew: boolean) => {
          return isNew ? 'view' : undefined
        },
      }
      setFieldProps?.(path + '/iterateProxy', opts)
    }
  }, [path, setFieldProps])

  if (autoPush && !rest.toolbar) {
    rest.toolbar = <></>
  }

  return (
    <Isolation
      commitHandleRef={commitHandleRef}
      transformOnCommit={({ newItems }) => {
        return moveValueToPath(path, [...entries, ...newItems])
      }}
      onCommit={(data, { clearData }) => {
        switchArrayContainerToViewMode()
        switchContainerModeRef.current?.('view')
        clearData()
      }}
      onPathChange={() => {
        if (autoPush) {
          commitHandleRef.current?.()
        }
      }}
    >
      <PushContainerContext.Provider value={newItemContextProps}>
        <IterateArray value={[data]} path="/newItems">
          <IterateItemContext.Consumer>
            {({ containerMode, switchContainerMode }) => {
              switchContainerModeRef.current = switchContainerMode

              return (
                <>
                  <EditContainer
                    open={!showOpenButton || containerMode === 'edit'}
                    title={title}
                    {...rest}
                  >
                    {children}
                  </EditContainer>

                  {openButton && typeof showOpenButton === 'boolean' && (
                    <HeightAnimation
                      open={showOpenButton && containerMode === 'view'}
                    >
                      {openButton}
                    </HeightAnimation>
                  )}
                </>
              )
            }}
          </IterateItemContext.Consumer>
        </IterateArray>
      </PushContainerContext.Provider>
    </Isolation>
  )
}

PushContainer.OpenButton = OpenButton
PushContainer._supportsSpacingProps = true

export default PushContainer

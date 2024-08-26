import React, { useRef } from 'react'
import Isolation from '../../Form/Isolation'
import PushContainerContext from './PushContainerContext'
import IterateItemContext from '../IterateItemContext'
import useDataValue from '../../hooks/useDataValue'
import EditContainer from '../EditContainer'
import IterateArray, { ContainerMode } from '../Array'
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
   * Prefilled data to add to the fields.
   */
  data?: Record<string, unknown>

  /**
   * The container contents.
   */
  children: React.ReactNode
}

export type AllProps = Props & SpacingProps

function PushContainer(props: AllProps) {
  const {
    data = {},
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

  const showOpenButton = showOpenButtonWhen?.(entries)
  const newItemContextProps: PushContainerContext = {
    path,
    entries,
    commitHandleRef,
    switchContainerMode: switchContainerModeRef.current,
  }

  return (
    <Isolation
      commitHandleRef={commitHandleRef}
      transformOnCommit={({ newItem }) => {
        return moveValueToPath(path, [
          ...entries,
          { ...newItem[0], __containerMode: 'view' },
        ])
      }}
      onCommit={(data, { clearData }) => {
        clearData()
        switchContainerModeRef.current?.('view')
      }}
    >
      <PushContainerContext.Provider value={newItemContextProps}>
        <IterateArray value={[data]} path="/newItem">
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

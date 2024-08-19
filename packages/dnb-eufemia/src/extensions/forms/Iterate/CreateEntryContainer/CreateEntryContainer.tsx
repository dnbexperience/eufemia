import React, { useRef } from 'react'
import pointer from 'json-pointer'
import Isolation from '../../Form/Isolation'
import CreateEntryContainerContext from './CreateEntryContainerContext'
import IterateElementContext from '../IterateElementContext'
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
  showButton?: React.ReactNode

  /**
   * Define when the "open button" should be shown.
   * Should be a function that returns a boolean.
   */
  showButtonWhen?: (list: unknown[]) => boolean

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

function CreateEntryContainer(props: AllProps) {
  const {
    data = {},
    path,
    title,
    children,
    showButton,
    showButtonWhen,
    ...rest
  } = props

  const commitHandleRef = useRef<() => void>()
  const switchContainerModeRef = useRef<(mode: ContainerMode) => void>()
  const { value: entries = [] } = useDataValue<Array<unknown>>({ path })

  const showOpenButton = showButtonWhen?.(entries)
  const newItemContextProps: CreateEntryContainerContext = {
    path,
    entries,
    commitHandleRef,
    switchContainerMode: switchContainerModeRef.current,
  }

  return (
    <Isolation
      commitHandleRef={commitHandleRef}
      transformOnCommit={({ newItem }) => {
        const obj = {}
        pointer.set(obj, path, [
          ...entries,
          { ...newItem[0], __containerMode: 'view' },
        ])

        return obj
      }}
      onCommit={(data, { clearData }) => {
        clearData()
        switchContainerModeRef.current?.('view')
      }}
    >
      <CreateEntryContainerContext.Provider value={newItemContextProps}>
        <IterateArray value={[data]} path="/newItem">
          <IterateElementContext.Consumer>
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

                  {showButton && typeof showOpenButton === 'boolean' && (
                    <HeightAnimation
                      open={showOpenButton && containerMode === 'view'}
                    >
                      {showButton}
                    </HeightAnimation>
                  )}
                </>
              )
            }}
          </IterateElementContext.Consumer>
        </IterateArray>
      </CreateEntryContainerContext.Provider>
    </Isolation>
  )
}

CreateEntryContainer.OpenButton = OpenButton
CreateEntryContainer._supportsSpacingProps = true

export default CreateEntryContainer

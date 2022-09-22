/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { useEventEmitter } from '../component-helper'
import ToggleButton from '../../components/toggle-button/ToggleButton'

export default {
  title: 'Eufemia/Hooks/EventEmitter',
}

const useMyHook = ({ storeId }) => {
  const {
    data: { myData },
    update,
  } = useEventEmitter(storeId)
  const setMyData = (myData: string) => {
    update({ myData })
  }

  return { myData, setMyData }
}

const MyComponent = ({ storeId }) => {
  const { data, update } = useEventEmitter(storeId)

  const onChangeHandler = ({ checked }) => {
    update({ myData: checked ? 'bar' : 'foo' })
  }

  React.useEffect(() => {
    update({ myData: 'foo' })
  }, [])

  return (
    <div>
      <ToggleButton
        right
        checked={data.myData === 'bar'}
        onChange={onChangeHandler}
      >
        Intern
      </ToggleButton>

      {JSON.stringify(data.myData)}
    </div>
  )
}

const MyApp = () => {
  const { myData, setMyData } = useMyHook({ storeId: 'unique' })

  const onChangeHandler = ({ checked }) => {
    setMyData(checked ? 'bar' : 'foo')
  }

  return (
    <>
      <MyComponent storeId="unique" />

      <ToggleButton
        top
        right
        checked={myData === 'bar'}
        onChange={onChangeHandler}
      >
        Extern
      </ToggleButton>

      {JSON.stringify(myData)}
    </>
  )
}

export const EventEmitter = () => {
  return <MyApp />
}

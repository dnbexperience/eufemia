import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { DataContext } from '@dnb/eufemia/src/extensions/forms'
import { defaultContextState } from '@dnb/eufemia/src/extensions/forms/DataContext/Context'

export const Default = () => {
  return (
    <ComponentBox scope={{ DataContext, defaultContextState }}>
      <DataContext.Context.Provider
        value={{
          ...defaultContextState,
          handleSubmit: () => console.log('handleSubmit'),
        }}
      >
        <DataContext.SubmitButton />
      </DataContext.Context.Provider>
    </ComponentBox>
  )
}

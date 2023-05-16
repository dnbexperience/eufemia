import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { DataContext, Visibility } from '@dnb/eufemia/src/extensions/forms'
import { defaultContextState } from '@dnb/eufemia/src/extensions/forms/DataContext/Context'

export const BasedOnBooleanTrue = () => {
  return (
    <ComponentBox
      scope={{
        Visibility,
      }}
    >
      <Visibility visible={true}>This is visible</Visibility>
    </ComponentBox>
  )
}

export const BasedOnBooleanFalse = () => {
  return (
    <ComponentBox
      scope={{
        Visibility,
      }}
    >
      <Visibility visible={{ foo: 'foo' }.foo === 'bar'}>
        This is not visible
      </Visibility>
    </ComponentBox>
  )
}

export const BasedOnContext = () => {
  return (
    <ComponentBox
      scope={{
        DataContext,
        Visibility,
        defaultContextState,
      }}
    >
      <DataContext.Context.Provider
        value={{
          ...defaultContextState,
          data: { toBe: true, notToBe: false },
        }}
      >
        <Visibility pathTrue="/toBe">
          <p>This will show, as long as `toBe` is true.</p>
        </Visibility>
        <Visibility pathTrue="/notToBe">
          <p>This will not show until `notToBe` is true.</p>
        </Visibility>
      </DataContext.Context.Provider>
    </ComponentBox>
  )
}

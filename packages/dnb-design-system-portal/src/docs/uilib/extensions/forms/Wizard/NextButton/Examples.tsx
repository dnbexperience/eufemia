import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Wizard } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Wizard.Provider
        value={{
          activeIndex: 0,
          handlePrevious: () => null,
          handleNext: () => console.log('handleNext'),
          setActiveIndex: () => null,
          setFormError: () => null,
        }}
      >
        <Wizard.NextButton />
      </Wizard.Provider>
    </ComponentBox>
  )
}

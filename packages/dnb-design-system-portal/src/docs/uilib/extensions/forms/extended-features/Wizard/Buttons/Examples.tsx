import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Wizard } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Wizard.Provider
        value={{
          activeIndex: 5,
          handlePrevious: () => console.log('handlePrevious'),
          handleNext: () => console.log('handleNext'),
          setActiveIndex: () => null,
          setFormError: () => null,
        }}
      >
        <Wizard.Buttons />
      </Wizard.Provider>
    </ComponentBox>
  )
}

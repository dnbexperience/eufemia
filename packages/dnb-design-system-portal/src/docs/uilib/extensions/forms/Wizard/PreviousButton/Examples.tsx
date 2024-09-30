import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Wizard } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Wizard.Provider
        value={{
          activeIndex: 5,
          handlePrevious: () => console.log('handlePrevious'),
          handleNext: () => null,
          setActiveIndex: () => null,
          setFormError: () => null,
        }}
      >
        <Wizard.PreviousButton />
      </Wizard.Provider>
    </ComponentBox>
  )
}

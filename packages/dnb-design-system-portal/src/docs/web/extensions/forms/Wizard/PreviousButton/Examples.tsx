import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Wizard } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <Wizard.Provider
      value={{
        activeIndex: 5,
        handlePrevious: () => console.log('handlePrevious'),
        handleNext: () => null,
        setActiveIndex: () => null,
        setFormError: () => null,
      }}
    >
      <ComponentBox>
        <Wizard.PreviousButton />
      </ComponentBox>
    </Wizard.Provider>
  )
}

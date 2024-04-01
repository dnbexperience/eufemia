import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Steps } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Steps.Provider
        value={{
          activeIndex: 5,
          handlePrevious: () => console.log('handlePrevious'),
          handleNext: () => console.log('handleNext'),
          setActiveIndex: () => null,
          setFormError: () => null,
        }}
      >
        <Steps.Buttons />
      </Steps.Provider>
    </ComponentBox>
  )
}

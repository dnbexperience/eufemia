import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Steps } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Steps.Provider
        value={{
          activeIndex: 5,
          handlePrevious: () => console.log('handlePrevious'),
          handleNext: () => null,
          setActiveIndex: () => null,
        }}
      >
        <Steps.PreviousButton />
      </Steps.Provider>
    </ComponentBox>
  )
}

import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Steps } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Steps.Provider
        value={{
          activeIndex: 0,
          handlePrevious: () => null,
          handleNext: () => console.log('handleNext'),
          setActiveIndex: () => null,
        }}
      >
        <Steps.NextButton />
      </Steps.Provider>
    </ComponentBox>
  )
}

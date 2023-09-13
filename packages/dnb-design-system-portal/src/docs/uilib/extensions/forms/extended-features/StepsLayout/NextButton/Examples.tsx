import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import {
  StepsLayout,
  StepsContext,
} from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ StepsLayout, StepsContext }}>
      <StepsContext.Provider
        value={{
          activeIndex: 0,
          handlePrevious: () => null,
          handleNext: () => console.log('handleNext'),
        }}
      >
        <StepsLayout.NextButton />
      </StepsContext.Provider>
    </ComponentBox>
  )
}

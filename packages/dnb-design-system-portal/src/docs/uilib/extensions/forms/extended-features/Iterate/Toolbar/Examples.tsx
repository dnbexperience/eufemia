import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Button } from '@dnb/eufemia/src'
import { Iterate } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Iterate }}>
      <Iterate.Array value={['foo']}>
        <Iterate.AnimatedContainer>
          Item Content
          <Iterate.Toolbar>
            <Button variant="tertiary">Your Tool</Button>
            <Iterate.RemoveButton />
          </Iterate.Toolbar>
        </Iterate.AnimatedContainer>
      </Iterate.Array>
    </ComponentBox>
  )
}

import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Button } from '@dnb/eufemia/src'
import { Iterate } from '@dnb/eufemia/src/extensions/forms'

export const AnimatedContainer = () => {
  return (
    <ComponentBox>
      <Iterate.Array value={['foo']}>
        <Iterate.AnimatedContainer>
          Item content
          <Iterate.Toolbar>
            <Button variant="tertiary">Your Tool</Button>
            <Iterate.RemoveButton />
          </Iterate.Toolbar>
        </Iterate.AnimatedContainer>
      </Iterate.Array>
    </ComponentBox>
  )
}

export const ViewAndEditContainer = () => {
  return (
    <ComponentBox>
      <Iterate.Array value={['foo']}>
        <Iterate.ViewContainer>
          Item view content
          <Iterate.Toolbar>
            <Button variant="tertiary">Your Tool</Button>
            <Iterate.ViewContainer.EditButton />
            <Iterate.ViewContainer.RemoveButton />
          </Iterate.Toolbar>
        </Iterate.ViewContainer>

        <Iterate.EditContainer>
          Item edit content
          <Iterate.Toolbar>
            <Button variant="tertiary">Your Tool</Button>
            <Iterate.EditContainer.DoneButton />
            <Iterate.EditContainer.CancelButton />
          </Iterate.Toolbar>
        </Iterate.EditContainer>
      </Iterate.Array>
    </ComponentBox>
  )
}

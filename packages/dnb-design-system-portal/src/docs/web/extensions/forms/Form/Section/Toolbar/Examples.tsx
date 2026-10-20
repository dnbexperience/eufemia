import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Button } from '@dnb/eufemia/src'
import { Form } from '@dnb/eufemia/src/extensions/forms'

export const ViewAndEditContainer = () => {
  return (
    <ComponentBox>
      <Form.Section>
        <Form.Section.ViewContainer>
          View content
          <Form.Section.Toolbar>
            <Button variant="tertiary">Your Tool</Button>
            <Form.Section.ViewContainer.EditButton />
          </Form.Section.Toolbar>
        </Form.Section.ViewContainer>

        <Form.Section.EditContainer>
          Edit content
          <Form.Section.Toolbar>
            <Button variant="tertiary">Your Tool</Button>
            <Form.Section.EditContainer.DoneButton />
            <Form.Section.EditContainer.CancelButton />
          </Form.Section.Toolbar>
        </Form.Section.EditContainer>
      </Form.Section>
    </ComponentBox>
  )
}

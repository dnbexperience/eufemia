import { Button, Flex, FormLabel } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, FieldBlock, Form } from '@dnb/eufemia/src/extensions/forms'
import { debounceAsync } from '@dnb/eufemia/src/shared/helpers/debounce'

export const Default = () => {
  return (
    <ComponentBox>
      <Form.SubmitIndicator state="pending" />
    </ComponentBox>
  )
}

export const SubmitButton = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Form.SubmitButton showIndicator />
      </Form.Handler>
    </ComponentBox>
  )
}

export const AsyncSubmitBehavior = () => {
  return (
    <ComponentBox scope={{ createRequest, debounceAsync }}>
      {() => {
        const delay = debounceAsync(async function () {
          try {
            const request = createRequest()
            await request(1000) // Simulate a request
          } catch (error) {
            return error
          }
        })

        return (
          <Form.Handler onSubmit={delay}>
            <Form.Card>
              <Field.String path="/myField" label="Short label" />
              <Form.ButtonRow>
                <Form.SubmitButton />
                <Button variant="tertiary">Cancel</Button>
              </Form.ButtonRow>
            </Form.Card>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const AsyncChangeBehavior = () => {
  return (
    <ComponentBox scope={{ createRequest, debounceAsync }}>
      {() => {
        const delay = debounceAsync(async function () {
          try {
            const request = createRequest()
            await request(1000) // Simulate a request
          } catch (error) {
            return error
          }
        })

        return (
          <Form.Handler onSubmit={delay} onChange={delay}>
            <Form.Card>
              <Field.String
                path="/myField1"
                label="Label (with async validation)"
                placeholder="Write something ..."
                onChangeValidator={delay}
              />
              <FieldBlock width="medium">
                <Field.String
                  path="/myField2"
                  width="stretch"
                  label="This is a long label"
                />
              </FieldBlock>
              <Form.ButtonRow>
                <Form.SubmitButton />
                <Button variant="tertiary">Cancel</Button>
              </Form.ButtonRow>
            </Form.Card>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

type CreateRequestReturn = Promise<{ hasError: boolean; cancel?: boolean }>

export const createRequest = () => {
  let timeout: NodeJS.Timeout | null
  let resolvePromise: ((value?: unknown) => void) | undefined

  const fn = (t: number): CreateRequestReturn => {
    return new Promise((resolve) => {
      // @ts-expect-error -- strictFunctionTypes
      resolvePromise = resolve
      timeout = setTimeout(() => {
        resolve({ hasError: false })
      }, t)
    })
  }

  fn.cancel = () => {
    resolvePromise?.({ hasError: true })
    clearTimeout(timeout)
    timeout = null
  }

  return fn
}

export const WithinOtherComponents = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Horizontal align="center">
          <Button variant="secondary" icon="chevron_right">
            Secondary
            <Form.SubmitIndicator state="pending" />
          </Button>
          <Button variant="tertiary">
            Tertiary
            <Form.SubmitIndicator state="pending" />
          </Button>
          <FormLabel bottom={0}>
            Label
            <Form.SubmitIndicator state="pending" />
          </FormLabel>
        </Flex.Horizontal>
      </Form.Handler>
    </ComponentBox>
  )
}

export const BorderGlow = () => {
  return (
    <ComponentBox>
      <Form.Handler onSubmit={async () => await new Promise(() => {})}>
        <Flex.Stack className="dnb-indicator-border-glow dnb-indicator-border-glow--active">
          <Field.String
            label="Field.String"
            path="/string"
            defaultValue="Ada"
          />
          <Field.Number
            label="Field.Number"
            path="/number"
            defaultValue={1000}
          />
          <Field.String
            label="Field.String (multiline)"
            path="/multiline"
            defaultValue="Hello world"
            multiline
          />
          <Field.Selection
            label="Field.Selection (dropdown)"
            path="/dropdown"
            defaultValue="no"
            variant="dropdown"
          >
            <Field.Option value="no" title="Norway" />
            <Field.Option value="se" title="Sweden" />
            <Field.Option value="dk" title="Denmark" />
          </Field.Selection>
          <Field.Selection
            label="Field.Selection (autocomplete)"
            path="/autocomplete"
            defaultValue="nb"
            variant="autocomplete"
          >
            <Field.Option value="nb" title="Norsk bokmål" />
            <Field.Option value="nn" title="Norsk nynorsk" />
            <Field.Option value="en" title="English" />
            <Field.Option value="sv" title="Svenska" />
          </Field.Selection>
          <Field.Toggle
            label="Field.Toggle (buttons)"
            path="/toggle"
            valueOn="yes"
            valueOff="no"
            defaultValue="yes"
            variant="buttons"
            textOn="On"
            textOff="Off"
          />
          <Field.Boolean
            label="Field.Boolean (checkbox)"
            path="/checkbox"
            defaultValue={true}
          />
          <Field.Boolean
            label="Field.Boolean (checkbox-button)"
            path="/checkboxButton"
            defaultValue={false}
            variant="checkbox-button"
          />
          <Field.Boolean
            label="Field.Boolean (switch)"
            path="/switch"
            defaultValue={false}
            variant="switch"
          />
          <Field.Selection
            label="Field.Selection (radio)"
            path="/radio"
            defaultValue="medium"
            variant="radio"
          >
            <Field.Option value="low" title="Low" />
            <Field.Option value="medium" title="Medium" />
            <Field.Option value="high" title="High" />
          </Field.Selection>
          <Field.Slider
            label="Field.Slider"
            path="/slider"
            defaultValue={50}
            min={0}
            max={100}
          />
          <Field.PhoneNumber
            label="Field.PhoneNumber"
            path="/phone"
            defaultValue="+47 12345678"
          />
          <Field.Date label="Field.Date" path="/date" />
          <Field.Expiry label="Field.Expiry" path="/expiry" />
          <Form.SubmitButton showIndicator />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

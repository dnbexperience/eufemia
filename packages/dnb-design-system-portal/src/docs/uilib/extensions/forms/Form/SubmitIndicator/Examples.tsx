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
          <Form.SubmitButton showIndicator />
          <Button variant="secondary" icon="chevron_right">
            Secondary
            <Form.SubmitIndicator state="pending" />
          </Button>
          <Button variant="tertiary">
            Tertiary
            <Form.SubmitIndicator state="pending" />
          </Button>
          <FormLabel>
            Label
            <Form.SubmitIndicator state="pending" />
          </FormLabel>
        </Flex.Horizontal>
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithinALabel = () => {
  return (
    <ComponentBox data-visual-test="submit-indicator-with-label">
      <Form.Handler>
        <Form.SubmitIndicator state="pending" showLabel />
      </Form.Handler>
    </ComponentBox>
  )
}

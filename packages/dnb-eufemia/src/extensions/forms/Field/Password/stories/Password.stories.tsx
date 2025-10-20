import { Field, Form } from '../../../'
import { Flex } from '../../../../../components'
import { Provider } from '../../../../../shared'

export default {
  title: 'Eufemia/Extensions/Forms/Password',
}

export const Password = () => {
  return (
    <Form.Handler>
      <Flex.Stack>
        <Field.Password
          onHidePassword={(e) => console.log('Gjemmer seg', e)}
          onShowPassword={(e) => console.log('Viser seg', e)}
        />
        <Provider
          locale="nb-NO"
          translations={{
            'nb-NO': {
              Password: {
                ariaLabelShow: 'Viser',
                ariaLabelHide: 'Gjemmer',
              },
            },
          }}
        >
          <Field.Password
            size="small"
            width="small"
            onChange={(e) => console.log('onChange', e)}
            onFocus={(e) => console.log('onBlur', e)}
            onBlur={(e) => console.log('onFocus', e)}
            onShowPassword={(e) => console.log('show camel', e)}
            onHidePassword={(e) => console.log('hide camel', e)}
          />
        </Provider>
        <Provider
          locale="en-GB"
          translations={{
            'en-GB': {
              Password: {
                ariaLabelShow: 'Showing',
                ariaLabelHide: 'Hiding',
              },
            },
          }}
        >
          <Field.Password
            size="medium"
            width="medium"
            required
            onChange={(e) => console.log('onChange', e)}
            onFocus={(e) => console.log('onBlur', e)}
            onBlur={(e) => console.log('onFocus', e)}
            onShowPassword={(e) => console.log('show camel', e)}
            onHidePassword={(e) => console.log('hide camel', e)}
          />
        </Provider>

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}

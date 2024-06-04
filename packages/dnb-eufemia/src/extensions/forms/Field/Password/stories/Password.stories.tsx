import { Field, Form } from '../../../'
import { Flex } from '../../../../../components'
import InputPassword from '../../../../../components/input/InputPassword'
import { Provider } from '../../../../../shared'

export default {
  title: 'Eufemia/Extensions/Forms/Password',
}

export const Password = () => {
  return (
    <Form.Handler>
      <Flex.Stack>
        <InputPassword
          hide_password="Gjem dykk!"
          show_password="Vis deg!"
          on_hide_password={(e) => console.log('Gjemmer seg', e)}
          on_show_password={(e) => console.log('Viser seg', e)}
        />
        <Provider locale="nb-NO">
          <Field.Password
            hide_password="Hiding"
            show_password="Showing"
            size="small"
            width="small"
            onChange={(e) => console.log('onChange', e)}
            onFocus={(e) => console.log('onBlur', e)}
            onBlur={(e) => console.log('onFocus', e)}
            onShowPassword={(e) => console.log('show camel', e)}
            onHidePassword={(e) => console.log('hide camel', e)}
            on_show_password={(e) => console.log('show snake', e)}
            on_hide_password={(e) => console.log('hide snake', e)}
          />
        </Provider>
        <Provider locale="en-GB">
          <Field.Password
            size="medium"
            width="medium"
            required
            hide_password="Hiding"
            show_password="Showing"
            onChange={(e) => console.log('onChange', e)}
            onFocus={(e) => console.log('onBlur', e)}
            onBlur={(e) => console.log('onFocus', e)}
            onShowPassword={(e) => console.log('show camel', e)}
            onHidePassword={(e) => console.log('hide camel', e)}
            on_show_password={(e) => console.log('show snake', e)}
            on_hide_password={(e) => console.log('hide snake', e)}
          />
        </Provider>

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}

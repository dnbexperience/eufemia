import { Field } from '../../../'
import InputPassword from '../../../../../components/input/InputPassword'
import { Provider } from '../../../../../shared'

export default {
  title: 'Eufemia/Extensions/Forms/Password',
}

export const Password = () => {
  return (
    <>
      <InputPassword
        hide_password="Gjem dykk!"
        show_password="Vis deg!"
        on_hide_password={(e) => console.log('Gjemmer seg', e)}
        on_show_password={(e) => console.log('Viser seg', e)}
      />
      <Provider locale="no-NB">
        <Field.Password
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
      <Provider locale="en-GB">
        <Field.Password
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
    </>
  )
}

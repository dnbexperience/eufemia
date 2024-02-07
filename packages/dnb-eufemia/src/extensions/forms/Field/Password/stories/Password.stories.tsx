import { Field } from '../../../'

export default {
  title: 'Eufemia/Extensions/Forms/Password',
}

export const Password = () => {
  return (
    <Field.Password
      // showPasswordLabel="Showing that passy"
      // hidePasswordLabel="Hiding that passy"
      // hide_password="Hiding"
      // show_password="Showing"
      onShowPassword={(e) => console.log('show camel', e)}
      onHidePassword={(e) => console.log('hide camel', e)}
      on_show_password={(e) => console.log('show snake', e)}
      on_hide_password={(e) => console.log('hide snake', e)}
      pattern="passord123"
    />
  )
}

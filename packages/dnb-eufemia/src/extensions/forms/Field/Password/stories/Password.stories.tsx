import { Field } from '../../../'

export default {
  title: 'Eufemia/Extensions/Forms/Password',
}

export const Password = () => {
  return (
    <Field.Password
      on_show_password={(e) => console.log('show', e)}
      on_hide_password={(e) => console.log('hide', e)}
    />
  )
}

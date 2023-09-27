import Expiry from '../Expiry'

import '../style'

export default {
  title: 'Eufemia/Extensions/Forms/Field',
}
export const ExpiryTest = () => {
  function onChange(e) {
    console.log(e)
  }

  return <Expiry onChange={onChange} />
}

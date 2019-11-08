/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
// import PropTypes from 'prop-types'
// import { ToggleButton, Space } from 'dnb-ui-lib/components'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="To showcase the 404 status component"
          data-dnb-test="global-error-404"
        >
          {/* @jsx */ `
<GlobalError status="404" />
           `}
        </ComponentBox>
        <ComponentBox
          caption="To showcase the 500 status component"
          data-dnb-test="global-error-500"
        >
          {/* @jsx */ `
<GlobalError status="500" />
           `}
        </ComponentBox>
      </Fragment>
    )
  }
}

// In case we want to make it interactive
// () => {
//   const [status, setErrorState] = React.useState(404)
//   return (
//     <>
//       <GlobalError
//         status={status}
//         data-dnb-test="global-error-404"
//       />
//       <ToggleStates
//         status={status}
//         onChange={setErrorState}
//       />
//     </>
//   )
// }
// const ToggleStates = ({ status, onChange, ...rest }) => {
//   return (
//     <Space top="large" align="center">
//       <ToggleButton.Group
//         label="Change the view to:"
//         value={status}
//         on_change={({ value }) => onChange(value)}
//         {...rest}
//       >
//         <ToggleButton text="404" value={404} />
//         <ToggleButton text="500" value={500} />
//       </ToggleButton.Group>
//     </Space>
//   )
// }
// ToggleStates.propTypes = {
//   status: PropTypes.number.isRequired,
//   onChange: PropTypes.func.isRequired
// }

export { Example }
export default () => <Example />

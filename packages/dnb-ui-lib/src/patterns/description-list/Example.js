/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import DescriptionList from './DescriptionList'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <DescriptionList
          info="* Du må alltid ta høyde for en renteøkning på 5%. Samtidig må du også vurdere hvordan lånekostnadene vil påvirke din økonomi."
          data={JSON.stringify([
            {
              title: 'Månedskostnad',
              value: '19 200 kr'
            },
            {
              title: 'Månedkostnad ved 5% renteøkning',
              value: '31 500 kr*'
            }
          ])}
        />
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />

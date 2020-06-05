/**
 * UI lib Component Example
 *
 */

import React from 'react'
import DescriptionList from './DescriptionList'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="example-box">
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
          <p className="example-caption">Description List</p>
        </div>
      </React.Fragment>
    )
  }
}

export { Example }
export default Example

/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Article from './Article'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <Article>
          <h2>Article header patterns</h2>
          <p>
            The following header pattern consists of an H1 with the first
            part wrapped in a 'small' tag. The small tag is displaying as a
            block. Following the h1 is a paragarph tag with class
            'dnb-lead' which is used here as an ingress or intro paragraph.
          </p>
          <p>
            The default bottom margin is removed from elements (H1, H2, p
            etc.) placed inside a 'header'.
          </p>
          <div className="typography-box">
            <header>
              <h1>
                <small>Ha finansieringsbeviset klart</small>
                Det tar bare noen minutter å søke og få svar på hvor mye du
                kan låne
              </h1>
              <p className="dnb-lead">
                Vivamus litora imperdiet placerat aenean venenatis congue
                nec porttitor risus
              </p>
            </header>
            <p>
              Spare er appen som samler alt om sparing på ett sted. Opprett
              sparemål og spar til de gode opplevelsene som du kan dele med
              de du er glad i. Last ned appen på mobilen din nå!
            </p>
          </div>

          <p>
            In these examples pattern, note the custom margin between the
            header and the last paragraph
          </p>
          <div className="typography-box">
            <header>
              <h1>
                Ha finansieringsbeviset klart
                <small>
                  Det tar bare noen minutter å søke og få svar på hvor mye
                  du kan låne
                </small>
              </h1>
              <p className="dnb-lead">
                Vivamus litora imperdiet placerat aenean venenatis congue
                nec porttitor risus
              </p>
            </header>
            <p>
              Spare er appen som samler alt om sparing på ett sted. Opprett
              sparemål og spar til de gode opplevelsene som du kan dele med
              de du er glad i. Last ned appen på mobilen din nå!
            </p>
          </div>
          <h2>An example subheader</h2>
          <div className="typography-box">
            <h2>A sub header (h2 with default margin bottom.)</h2>
            <p>
              Spare er appen som samler alt om sparing på ett sted. Opprett
              sparemål og spar til de gode opplevelsene som du kan dele med
              de du er glad i. Last ned appen på mobilen din nå!
            </p>
          </div>
        </Article>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />

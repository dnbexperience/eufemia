/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Grid from './Grid'
import { css } from '@emotion/core'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <Grid>
            <div className="dnb-grid dnb-grid--gutters">
              <div className="dnb-grid__cell">
                <div className="demo">1/2</div>
              </div>
              <div className="dnb-grid__cell">
                <div className="demo">1/2</div>
              </div>
            </div>

            <div className="dnb-grid dnb-grid--gutters">
              <div className="dnb-grid__cell">
                <div className="demo">1/3</div>
              </div>
              <div className="dnb-grid__cell">
                <div className="demo">1/3</div>
              </div>
              <div className="dnb-grid__cell">
                <div className="demo">1/3</div>
              </div>
            </div>

            <div className="dnb-grid dnb-grid--gutters">
              <div className="dnb-grid__cell">
                <div className="demo">1/4</div>
              </div>
              <div className="dnb-grid__cell">
                <div className="demo">1/4</div>
              </div>
              <div className="dnb-grid__cell">
                <div className="demo">1/4</div>
              </div>
              <div className="dnb-grid__cell">
                <div className="demo">1/4</div>
              </div>
            </div>

            <div className="dnb-grid dnb-grid--gutters dnb-grid--flex-cells">
              <div className="dnb-grid__cell">
                <div className="demo">
                  This cell matches the other cell's height
                </div>
              </div>
              <div className="dnb-grid__cell">
                <div className="demo">
                  Here is some lipsum content. It was popularised in the
                  1960s with the release of Letraset sheets containing
                  Lorem Ipsum passages, and more recently with desktop
                  publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.{' '}
                </div>
              </div>
            </div>

            <div className="grid-demo__item">
              <h2 className="grid-demo__item__title">Individual sizing</h2>
              <p className="grid-demo__item__description typo-light">
                When equal widths aren’t what you want, you can add sizing
                classes to individual cells. Cells without sizing classes
                simply divide up the remaining space as normal. The cells
                below labeled “auto” do not have sizing classes specified.
              </p>

              <div className="dnb-grid dnb-grid--gutters">
                <div className="dnb-grid__cell u-1of2">
                  <div className="demo">1/2</div>
                </div>
                <div className="dnb-grid__cell">
                  <div className="demo">auto</div>
                </div>
                <div className="dnb-grid__cell">
                  <div className="demo">auto</div>
                </div>
              </div>

              <div className="dnb-grid dnb-grid--gutters">
                <div className="dnb-grid__cell">
                  <div className="demo">auto</div>
                </div>
                <div className="dnb-grid__cell u-1of3">
                  <div className="demo">1/3</div>
                </div>
              </div>

              <div className="dnb-grid dnb-grid--gutters">
                <div className="dnb-grid__cell u-1of4">
                  <div className="demo">1/4</div>
                </div>
                <div className="dnb-grid__cell">
                  <div className="demo">auto</div>
                </div>
                <div className="dnb-grid__cell u-1of3">
                  <div className="demo">1/3</div>
                </div>
              </div>
            </div>

            <div className="grid-demo__item">
              <h2 className="grid-demo__item__title">Responsive</h2>
              <p className="grid-demo__item__description typo-light">
                Add responsiveness by adding classes to the grid cells or
                containers. When those media values are met, the grids
                automatically adjust accordingly. Resize your browser to
                see them in action.
              </p>

              <div className="dnb-grid dnb-grid--gutters dnb-grid--full dnb-med-grid--fit">
                <div className="dnb-grid__cell">
                  <div className="demo">Full / Halves</div>
                </div>
                <div className="dnb-grid__cell">
                  <div className="demo">Full / Halves</div>
                </div>
              </div>

              <div className="dnb-grid dnb-grid--gutters dnb-grid--full dnb-med-grid--fit">
                <div className="dnb-grid__cell">
                  <div className="demo">Full / Thirds</div>
                </div>
                <div className="dnb-grid__cell">
                  <div className="demo">Full / Thirds</div>
                </div>
                <div className="dnb-grid__cell">
                  <div className="demo">Full / Thirds</div>
                </div>
              </div>
            </div>

            <div className="grid-demo__item">
              <h2 className="grid-demo__item__title">Nesting</h2>
              <p className="grid-demo__item__description typo-light">
                The grid is infinitely nestable.
              </p>

              <div className="dnb-grid dnb-grid--gutters-xl dnb-grid--flex-cells">
                <div className="dnb-grid__cell">
                  <div className="demo">
                    <div className="dnb-grid dnb-grid--gutters">
                      <div className="dnb-grid__cell u-1of3">
                        <div className="demo">1/3</div>
                      </div>
                      <div className="dnb-grid__cell">
                        <div className="demo">
                          <div className="dnb-grid dnb-grid--gutters">
                            <div className="dnb-grid__cell">
                              <div className="demo">1/2</div>
                            </div>
                            <div className="dnb-grid__cell">
                              <div className="demo">1/2</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </Fragment>
    )
  }
}

export { Example }
export default () => (
  <div css={demoStyle}>
    <Example />
  </div>
)

const demoStyle = css`
  .demo {
    color: white;
    width: 100%;
    padding: 0.8em 1em 0;
    background: var(--color-sea-green);

    &::after {
      content: '\00a0';
      display: block;
      margin-top: 1em;
      height: 0;
      visibility: hidden;
    }
  }
  .grid-demo__item {
    margin: 0 0 6rem 0;
    position: relative;

    &::after {
      content: '. . .';
      position: absolute;
      bottom: -5rem;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .grid-demo__item__description {
    margin: 1rem 0 2rem 0;
  }
`

/**
 * Custom Demo Component
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { Modal } from 'dnb-ui-lib/src'

// Rename Colors
// \$dnb\-color\-(.*);
// var(--color-$1);

const style = css`
  &.dnb-loan-sausage {
    margin: 2rem 0;
    padding: 2rem 0;
    background: var(--color-light-grey);

    ${'' /* .dnb-loan-sausage__inner {
    } */};

    .dnb-loan-sausage__header {
      display: flex;
      justify-content: space-between;
    }
    .dnb-loan-sausage__title {
      display: flex;
      align-items: flex-end;
    }
    .dnb-loan-sausage__title__key {
      font-size: 1.125rem;
      margin-right: 0.5rem;
    }
    .dnb-loan-sausage__title__value,
    .dnb-loan-sausage__title__currency {
      font-size: 2rem;
    }

    ${'' /* .dnb-loan-sausage__title__value {
    }
    .dnb-loan-sausage__title__currency {
    } */};

    .dnb-loan-sausage__title__modal-container {
      margin-left: 0.5rem;
    }
    .dnb-loan-sausage__sausage {
      margin: 1rem 0 1rem 0;
      display: flex;
      border-radius: 2rem;
      background-color: var(--color-mint-green-alt);
      position: relative;
    }
    .dnb-loan-sausage__sausage__bar {
      width: 100%;
      height: 2rem;
    }
    .dnb-loan-sausage__sausage__item__description {
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      position: absolute;
      bottom: -1.75rem;
      width: 100%;
    }
    .dnb-loan-sausage__sausage__description-line {
      width: 100%;
      height: 1px;
      background: var(--color-summer-green);
    }
    .dnb-loan-sausage__sausage__description-text {
      margin: 0 0.5rem;
    }
  }
  .dnb-loan-sausage__sausage__item {
    text-align: center;
    border-radius: 0 2rem 2rem 0;
    position: relative;
    background-color: transparent;
  }
  .dnb-loan-sausage__sausage__item:first-child {
    background-color: var(--color-mint-green);
    border-radius: 2rem;
    z-index: 1;
    .dnb-loan-sausage__sausage__item__description {
      padding-right: calc(2rem / 2);
    }
  }
`

export default class LoanSausage extends Component {
  static propTypes = {
    equity: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    loan: PropTypes.string.isRequired
  }
  render() {
    const { equity, currency, loan } = this.props
    return (
      <div className="dnb-loan-sausage" css={style}>
        <div className="dnb-width-limit">
          <div className="dnb-loan-sausage__inner">
            <div className="dnb-loan-sausage__header">
              <div className="dnb-loan-sausage__title">
                <h3
                  className="dnb-loan-sausage__title__text typo-light"
                  aria-describedby="equity-modal-text"
                >
                  <span className="dnb-loan-sausage__title__key">
                    Egenkapital:
                  </span>
                  <span className="dnb-loan-sausage__title__value">
                    {equity}
                  </span>
                  <span className="dnb-loan-sausage__title__currency">
                    {currency}
                  </span>
                </h3>
                <div className="dnb-loan-sausage__title__modal-container">
                  <Modal
                    type="button"
                    modal_trigger_text="Trykk for mer info om egenkapital"
                    modal_content="Dette er litt ekstra informasjon om egenkapitalen."
                    content_id="equity-modal-text"
                  />
                </div>
              </div>

              <div className="dnb-loan-sausage__title">
                <h3
                  className="dnb-loan-sausage__title__text typo-light"
                  aria-describedby="loan-modal-text"
                >
                  <span className="dnb-loan-sausage__title__key">
                    Lån:
                  </span>
                  <span className="dnb-loan-sausage__title__value">
                    {loan}
                  </span>
                  <span className="dnb-loan-sausage__title__currency">
                    {currency}
                  </span>
                </h3>
                <div className="dnb-loan-sausage__title__modal-container">
                  <Modal
                    type="button"
                    modal_trigger_text="Trykk for mer info om lånbeløpet"
                    modal_content="Dette er litt ekstra informasjon om lånbeløpet."
                    content_id="loan-modal-text"
                  />
                </div>
              </div>
            </div>

            <div className="dnb-loan-sausage__sausage">
              <SausageItem percentage="25" title="Egenkapital" />
              <SausageItem percentage="75" title="Lånemulighet" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class SausageItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    percentage: PropTypes.string.isRequired
  }
  render() {
    const { title, percentage } = this.props
    return (
      <div
        className="dnb-loan-sausage__sausage__item"
        style={{
          flex: `0 0 ${percentage}%`
        }}
      >
        <div
          className="dnb-loan-sausage__sausage__bar"
          aria-describedby={title.toLowerCase()}
        />
        <div className="dnb-loan-sausage__sausage__item__description typo-demi">
          <span
            className="dnb-loan-sausage__sausage__description-line"
            aria-hidden="true"
          />
          <span
            className="dnb-loan-sausage__sausage__description-text"
            id={title.toLowerCase()}
          >
            {title}
          </span>
          <span
            className="dnb-loan-sausage__sausage__description-line"
            aria-hidden="true"
          />
        </div>
      </div>
    )
  }
}

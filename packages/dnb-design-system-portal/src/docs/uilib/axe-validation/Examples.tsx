import { useEffect, useState } from 'react'
import ComponentBox from '../../../shared/tags/ComponentBox'
import { Anchor, Button, Flex, P } from '@dnb/eufemia/src'

export const AxePassesAmbiguousLinks = () => {
  return (
    <ComponentBox hideCode>
      <nav aria-label="Account articles">
        <ul>
          <li>
            <Anchor href="/uilib/extensions/forms/about-forms/">
              Read more
            </Anchor>
            <span> about opening a savings account</span>
          </li>
          <li>
            <Anchor href="/uilib/extensions/forms/getting-started/">
              Read more
            </Anchor>
            <span> about changing a daily banking package</span>
          </li>
          <li>
            <Anchor href="/uilib/extensions/forms/best-practices-on-forms/">
              Read more
            </Anchor>
            <span> about documenting business ownership</span>
          </li>
        </ul>
      </nav>
    </ComponentBox>
  )
}

export const AxePassesMissingAutocomplete = () => {
  return (
    <ComponentBox hideCode>
      <form>
        <P>
          <strong>Delivery address</strong>
        </P>

        <P>
          <label htmlFor="axe-autocomplete-first-name">First name</label>
          <br />
          <input
            id="axe-autocomplete-first-name"
            name="field-1"
            type="text"
          />
        </P>

        <P>
          <label htmlFor="axe-autocomplete-family-name">Family name</label>
          <br />
          <input
            id="axe-autocomplete-family-name"
            name="field-2"
            type="text"
          />
        </P>

        <P>
          <label htmlFor="axe-autocomplete-postal-code">Postal code</label>
          <br />
          <input
            id="axe-autocomplete-postal-code"
            name="field-3"
            type="text"
            inputMode="numeric"
          />
        </P>

        <Button type="submit">Continue</Button>
      </form>
    </ComponentBox>
  )
}

export const AxePassesVagueErrorMessage = () => {
  return (
    <ComponentBox hideCode>
      <form noValidate>
        <P>
          <label htmlFor="axe-vague-error-nin">
            National identity number
          </label>
          <br />
          <input
            id="axe-vague-error-nin"
            name="nationalIdentityNumber"
            type="text"
            defaultValue="123"
            aria-invalid="true"
            aria-describedby="axe-vague-error-message"
          />
        </P>

        <P id="axe-vague-error-message">Invalid value.</P>

        <Button type="submit">Send</Button>
      </form>
    </ComponentBox>
  )
}

export const AxePassesColorOnlyStatus = () => {
  return (
    <ComponentBox hideCode>
      <ul aria-label="Payment status">
        <li>
          <span
            aria-hidden="true"
            style={{
              backgroundColor: '#007272',
              borderRadius: '50%',
              display: 'inline-block',
              height: '0.75rem',
              marginRight: '0.5rem',
              width: '0.75rem',
            }}
          />
          Invoice 1001
        </li>
        <li>
          <span
            aria-hidden="true"
            style={{
              backgroundColor: '#dc2a2a',
              borderRadius: '50%',
              display: 'inline-block',
              height: '0.75rem',
              marginRight: '0.5rem',
              width: '0.75rem',
            }}
          />
          Invoice 1002
        </li>
        <li>
          <span
            aria-hidden="true"
            style={{
              backgroundColor: '#f2b705',
              borderRadius: '50%',
              display: 'inline-block',
              height: '0.75rem',
              marginRight: '0.5rem',
              width: '0.75rem',
            }}
          />
          Invoice 1003
        </li>
      </ul>
    </ComponentBox>
  )
}

export const AxePassesVisualHeadingOnly = () => {
  return (
    <ComponentBox hideCode>
      <article>
        <P
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '1rem',
          }}
        >
          Payment details
        </P>

        <P>Choose which account should be used for the monthly fee.</P>

        <P>
          <label htmlFor="axe-visual-heading-account">Account</label>
          <br />
          <select id="axe-visual-heading-account" name="account">
            <option>Everyday account</option>
            <option>Savings account</option>
          </select>
        </P>
      </article>
    </ComponentBox>
  )
}

export const AxePassesVisualOrderMismatch = () => {
  return (
    <ComponentBox hideCode>
      <div>
        <P id="axe-visual-order-label">Steps to finish</P>

        <Flex.Horizontal
          role="group"
          aria-labelledby="axe-visual-order-label"
          gap="x-small"
          style={{
            flexWrap: 'wrap',
          }}
        >
          <Button type="button" style={{ order: 2 }}>
            1. Personal info
          </Button>
          <Button type="button" style={{ order: 1 }}>
            2. Signing
          </Button>
          <Button type="button" style={{ order: 3 }}>
            3. Receipt
          </Button>
        </Flex.Horizontal>
      </div>
    </ComponentBox>
  )
}

export const AxePassesDialogWithoutFocusManagement = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const DialogExample = () => {
          const [isOpen, setOpen] = useState(false)

          return (
            <>
              <Button type="button" onClick={() => setOpen(true)}>
                Open approval dialog
              </Button>

              {isOpen && (
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="axe-dialog-title"
                  aria-describedby="axe-dialog-description"
                  style={{
                    border: '0.0625rem solid #007272',
                    marginTop: '1rem',
                    padding: '1rem',
                  }}
                >
                  <P id="axe-dialog-title">
                    <strong>Approve transfer</strong>
                  </P>
                  <P id="axe-dialog-description">
                    Confirm that 12 000 kr should be moved today.
                  </P>

                  <Flex.Horizontal gap="x-small">
                    <Button type="button" onClick={() => setOpen(false)}>
                      Close
                    </Button>
                    <Button type="button" onClick={() => setOpen(false)}>
                      Approve
                    </Button>
                  </Flex.Horizontal>
                </div>
              )}
            </>
          )
        }

        return <DialogExample />
      }}
    </ComponentBox>
  )
}

export const AxePassesUnannouncedResult = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const FeeCalculator = () => {
          const [message, setMessage] = useState(
            'No fee has been calculated yet.'
          )

          return (
            <div>
              <Button
                type="button"
                onClick={() => setMessage('The monthly fee is 39 kr.')}
              >
                Calculate fee
              </Button>

              <P>{message}</P>
            </div>
          )
        }

        return <FeeCalculator />
      }}
    </ComponentBox>
  )
}

export const AxePassesCustomSliderMissingKeyboardSupport = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const PointerOnlySlider = () => {
          const [value, setValue] = useState(40)

          const updateValue = (
            element: HTMLDivElement,
            clientX: number
          ) => {
            const { left, width } = element.getBoundingClientRect()
            const nextValue = Math.round(((clientX - left) / width) * 100)

            setValue(Math.max(0, Math.min(100, nextValue)))
          }

          return (
            <div>
              <P id="axe-custom-slider-label">Risk level</P>

              <div
                role="slider"
                tabIndex={0}
                aria-labelledby="axe-custom-slider-label"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
                aria-valuetext={`${value} percent risk`}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId)
                  updateValue(event.currentTarget, event.clientX)
                }}
                onPointerMove={(event) => {
                  if (
                    event.currentTarget.hasPointerCapture(event.pointerId)
                  ) {
                    updateValue(event.currentTarget, event.clientX)
                  }
                }}
                onPointerUp={(event) => {
                  if (
                    event.currentTarget.hasPointerCapture(event.pointerId)
                  ) {
                    event.currentTarget.releasePointerCapture(
                      event.pointerId
                    )
                  }
                }}
                style={{
                  backgroundColor: '#d2f0e9',
                  borderRadius: '999rem',
                  cursor: 'pointer',
                  height: '1rem',
                  maxWidth: '18rem',
                  outlineOffset: '0.25rem',
                  position: 'relative',
                  touchAction: 'none',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    backgroundColor: '#007272',
                    borderRadius: '50%',
                    display: 'block',
                    height: '1.5rem',
                    left: `${value}%`,
                    position: 'absolute',
                    top: '-0.25rem',
                    transform: 'translateX(-50%)',
                    width: '1.5rem',
                  }}
                />
              </div>
            </div>
          )
        }

        return <PointerOnlySlider />
      }}
    </ComponentBox>
  )
}

export const AxePassesChartWithoutDataAlternative = () => {
  return (
    <ComponentBox hideCode>
      <figure>
        <svg
          role="img"
          aria-label="Monthly spending chart"
          viewBox="0 0 220 140"
          style={{ maxWidth: '22rem', width: '100%' }}
        >
          <rect width="220" height="140" fill="#f8f8f8" />
          <path
            d="M20 120 L20 20 M20 120 L205 120"
            fill="none"
            stroke="#333"
            strokeWidth="2"
          />
          <polyline
            points="25,96 65,72 105,86 145,42 190,60"
            fill="none"
            stroke="#007272"
            strokeWidth="4"
          />
          <circle cx="25" cy="96" r="4" fill="#007272" />
          <circle cx="65" cy="72" r="4" fill="#007272" />
          <circle cx="105" cy="86" r="4" fill="#007272" />
          <circle cx="145" cy="42" r="4" fill="#007272" />
          <circle cx="190" cy="60" r="4" fill="#007272" />
        </svg>

        <figcaption>Monthly spending</figcaption>
      </figure>
    </ComponentBox>
  )
}

export const AxePassesUnnamedSection = () => {
  return (
    <ComponentBox hideCode>
      <section>
        <P>
          <strong>Upcoming payments</strong>
        </P>

        <P>There are three payments waiting for approval.</P>

        <ul>
          <li>Rent, due tomorrow</li>
          <li>Credit card, due Friday</li>
          <li>Savings transfer, due Monday</li>
        </ul>
      </section>
    </ComponentBox>
  )
}

export const AxePassesRemoteToggleWithoutFocusHandling = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const RemoteToggleExample = () => {
          const [isOpen, setOpen] = useState(false)

          return (
            <div>
              <P>
                <strong>Transfer approval</strong>
              </P>

              <Button
                type="button"
                aria-expanded={isOpen}
                aria-controls="axe-remote-toggle-content"
                onClick={() => setOpen((isOpen) => !isOpen)}
              >
                {isOpen
                  ? 'Hide transfer details'
                  : 'Show transfer details'}
              </Button>

              <div
                id="axe-remote-toggle-content"
                hidden={!isOpen}
                style={{
                  border: '0.0625rem solid #007272',
                  marginTop: '2rem',
                  padding: '1rem',
                }}
              >
                <P>
                  <strong>Transfer details</strong>
                </P>

                <P>
                  12 000 kr will be transferred from Everyday account to
                  Savings account today.
                </P>
              </div>
            </div>
          )
        }

        return <RemoteToggleExample />
      }}
    </ComponentBox>
  )
}

export const AxePassesAccordionWithoutExpandedState = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const AccordionExample = () => {
          const [isOpen, setOpen] = useState(false)

          return (
            <div>
              <Button
                type="button"
                onClick={() => setOpen((isOpen) => !isOpen)}
              >
                Payment settings
              </Button>

              {isOpen && (
                <div
                  style={{
                    borderTop: '0.0625rem solid #d2f0e9',
                    marginTop: '1rem',
                    paddingTop: '1rem',
                  }}
                >
                  <P>Monthly payments are approved automatically.</P>
                  <Button type="button">Change approval limit</Button>
                </div>
              )}
            </div>
          )
        }

        return <AccordionExample />
      }}
    </ComponentBox>
  )
}

export const AxePassesAriaDisabledStillEditable = () => {
  return (
    <ComponentBox hideCode>
      <form>
        <P>
          <label htmlFor="axe-aria-disabled-input">
            Account number (appears disabled)
          </label>
          <br />
          <input
            id="axe-aria-disabled-input"
            name="accountNumber"
            defaultValue="1234.56.78901"
            aria-disabled="true"
            style={{
              opacity: 0.55,
            }}
          />
        </P>
      </form>
    </ComponentBox>
  )
}

export const AxePassesGenericIconButtonLabel = () => {
  return (
    <ComponentBox hideCode>
      <Button type="button" aria-label="Open">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
          <path
            d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18m-1 4h2v5h-2zm0 7h2v2h-2z"
            fill="currentColor"
          />
        </svg>
      </Button>
    </ComponentBox>
  )
}

export const AxePassesDuplicateLinkTextDifferentTargets = () => {
  return (
    <ComponentBox hideCode>
      <nav aria-label="Policies">
        <ul>
          <li>
            <Anchor href="/uilib/license/">Read policy</Anchor>
          </li>
          <li>
            <Anchor href="/uilib/security/">Read policy</Anchor>
          </li>
        </ul>
      </nav>
    </ComponentBox>
  )
}

export const AxePassesInstructionInPlaceholderOnly = () => {
  return (
    <ComponentBox hideCode>
      <form>
        <P>
          <label htmlFor="axe-placeholder-instruction">Reference</label>
          <br />
          <input
            id="axe-placeholder-instruction"
            name="reference"
            type="text"
            placeholder="Use format INV-2026-0000"
          />
        </P>
      </form>
    </ComponentBox>
  )
}

export const AxePassesNoisyLiveRegion = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const LiveRegionExample = () => {
          const [messages, setMessages] = useState<string[]>([])

          return (
            <div>
              <Button
                type="button"
                onClick={() => {
                  setMessages([
                    'Step 1 complete.',
                    'Step 2 complete.',
                    'Step 3 complete.',
                  ])
                }}
              >
                Run checks
              </Button>

              <div aria-live="assertive" style={{ marginTop: '0.75rem' }}>
                {messages.map((message, index) => (
                  <P key={`${message}-${index}`}>{message}</P>
                ))}
              </div>
            </div>
          )
        }

        return <LiveRegionExample />
      }}
    </ComponentBox>
  )
}

export const AxePassesComplexTableWithoutGuidance = () => {
  return (
    <ComponentBox hideCode>
      <table>
        <caption>Department budget overview</caption>
        <thead>
          <tr>
            <th rowSpan={2}>Department</th>
            <th colSpan={2}>Q1</th>
            <th colSpan={2}>Q2</th>
          </tr>
          <tr>
            <th>Income</th>
            <th>Cost</th>
            <th>Income</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Retail</th>
            <td>2.4M</td>
            <td>1.6M</td>
            <td>2.7M</td>
            <td>1.8M</td>
          </tr>
          <tr>
            <th scope="row">Corporate</th>
            <td>3.2M</td>
            <td>2.1M</td>
            <td>3.4M</td>
            <td>2.4M</td>
          </tr>
        </tbody>
      </table>
    </ComponentBox>
  )
}

export const AxePassesTransientStatusMessage = () => {
  return (
    <ComponentBox hideCode>
      {() => {
        const StatusMessageExample = () => {
          const [status, setStatus] = useState<string | null>(null)

          useEffect(() => {
            if (!status) {
              return
            }

            const timeout = setTimeout(() => {
              setStatus(null)
            }, 1200)

            return () => clearTimeout(timeout)
          }, [status])

          return (
            <div>
              <Button
                type="button"
                onClick={() => setStatus('Payment approved.')}
              >
                Approve payment
              </Button>

              {status && (
                <P role="status" style={{ marginTop: '0.75rem' }}>
                  {status}
                </P>
              )}
            </div>
          )
        }

        return <StatusMessageExample />
      }}
    </ComponentBox>
  )
}

import { useState } from 'react'
import { Flex, HelpButton } from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'
import GuidedTour from '@dnb/eufemia/src/extensions/guided-tour'
import '@dnb/eufemia/src/extensions/guided-tour/style'
import ComponentBox from '../../../../../shared/tags/ComponentBox'

export const PaymentTourDemo = () => {
  return (
    <ComponentBox hideCode scope={{ GuidedTour }}>
      {() => {
        const PaymentPage = () => {
          const [open, setOpen] = useState(false)

          return (
            <Form.Handler
              defaultData={{
                fromAccount: 'savings',
                amount: 1500,
                scheduled: false,
              }}
              onSubmit={(data) => console.log('onSubmit', data)}
            >
              <Flex.Horizontal align="center" gap="x-small">
                <Form.MainHeading>Pay</Form.MainHeading>
                <HelpButton
                  title="Take a tour"
                  onClick={() => setOpen(true)}
                />
              </Flex.Horizontal>

              <Flex.Container align="stretch">
                <Flex.Item span={{ small: 12, medium: 7 }}>
                  <Form.Card>
                    <div data-tour="from-account">
                      <Field.Selection
                        variant="dropdown"
                        label="From account"
                        path="/fromAccount"
                        width="stretch"
                      >
                        <Field.Option value="savings" title="Savings" />
                        <Field.Option value="checking" title="Checking" />
                      </Field.Selection>
                    </div>

                    <div data-tour="recipient">
                      <Field.BankAccountNumber
                        label="To account"
                        path="/toAccount"
                        required
                      />
                    </div>

                    <div data-tour="amount">
                      <Field.Currency
                        label="Amount"
                        path="/amount"
                        currency="NOK"
                        required
                      />
                    </div>

                    <div data-tour="message">
                      <Field.String
                        label="Message"
                        path="/message"
                        multiline
                        rows={1}
                        width="stretch"
                      />
                    </div>

                    <Field.Boolean
                      label="Schedule for later"
                      path="/scheduled"
                      variant="switch"
                    />

                    <Form.Visibility pathTrue="/scheduled">
                      <div data-tour="due-date">
                        <Field.Date label="Due date" path="/dueDate" />
                      </div>
                    </Form.Visibility>
                  </Form.Card>
                </Flex.Item>

                <Flex.Item span={{ small: 12, medium: 5 }}>
                  <Form.Card data-tour="summary">
                    <Form.SubHeading>Summary</Form.SubHeading>
                    <Value.Currency
                      label="Amount"
                      path="/amount"
                      currency="NOK"
                    />
                    <Value.BankAccountNumber
                      label="To account"
                      path="/toAccount"
                    />
                    <Value.String label="Message" path="/message" />
                    <div data-tour="submit">
                      <Form.SubmitButton text="Pay" />
                    </div>
                  </Form.Card>
                </Flex.Item>
              </Flex.Container>

              <GuidedTour
                open={open}
                onOpenChange={setOpen}
                intro={{
                  title: 'Welcome to payments',
                  content:
                    'We will show you the most important parts of a payment. Use Next and Back, the arrow keys, or Escape to close the tour.',
                }}
                steps={[
                  {
                    id: 'from-account',
                    target: '[data-tour="from-account"]',
                    title: 'From account',
                    content: 'Choose the account the money is taken from.',
                  },
                  {
                    id: 'recipient',
                    target: '[data-tour="recipient"]',
                    title: 'To account',
                    content: 'Enter the account number of the recipient.',
                  },
                  {
                    id: 'amount',
                    target: '[data-tour="amount"]',
                    title: 'Amount',
                    content: 'Enter how much you want to pay.',
                  },
                  {
                    id: 'message',
                    target: '[data-tour="message"]',
                    placement: 'top',
                    title: 'Message',
                    content: 'Add a short message for the recipient.',
                  },
                  {
                    id: 'due-date',
                    target: '[data-tour="due-date"]',
                    placement: 'top',
                    title: 'Due date',
                    content: 'Choose when the payment should be made.',
                  },
                  {
                    id: 'summary',
                    target: '[data-tour="summary"]',
                    placement: 'left',
                    title: 'Summary',
                    content: 'Check the details before you pay.',
                  },
                  {
                    id: 'submit',
                    target: '[data-tour="submit"]',
                    placement: 'top',
                    title: 'Pay',
                    content: 'When everything looks right, press Pay.',
                  },
                ]}
                outro={{
                  title: "That's it!",
                  content:
                    'You can start the tour again at any time with the help button.',
                }}
              />
            </Form.Handler>
          )
        }

        return <PaymentPage />
      }}
    </ComponentBox>
  )
}

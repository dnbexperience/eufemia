import { Fragment, useId, useState } from 'react'
import {
  Accordion,
  AriaLive,
  Badge,
  Card,
  Chip,
  DateFormat,
  Dropdown,
  Flex,
  Grid,
  H3,
  H4,
  HeightAnimation,
  HelpButton,
  Hr,
  Menu,
  NumberFormat,
  P,
  Section,
  Space,
  Stat,
  Table,
  Tabs,
  TermDefinition,
} from '@dnb/eufemia/src'
import { formatDate } from '@dnb/eufemia/src/components/date-format/DateFormatUtils'
import { useSharedContext } from '@dnb/eufemia/src/shared'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import './style.scss'

export const OperationalExample = () => (
  <ComponentBox hideCode background="plain" scope={{ useId }}>
    {() => {
      function Amount({
        value,
        currency = false,
      }: {
        value: number
        currency?: boolean
      }) {
        return currency ? (
          <NumberFormat.Currency
            value={value}
            currency="NOK"
            decimals={0}
          />
        ) : (
          <NumberFormat.Number value={value} decimals={0} />
        )
      }

      const failedPayments = [
        [
          'Invoice 1042',
          'Account number needs checking',
          1100,
          'operating',
        ],
        ['Invoice 1031', 'Insufficient funds', 2400, 'payroll'],
      ] satisfies [string, string, number, string][]

      const approvals = [
        ['Office supplies', 2400, 'operating'],
        ['Building services', 8500, 'operating'],
        ['Equipment rental', 8000, 'payroll'],
      ] satisfies [string, number, string][]

      const scheduledPayments = [
        ['Payroll payment', '2026-11-02', 84000, 'payroll'],
        ['Office rent', '2026-11-05', 12000, 'operating'],
      ] satisfies [string, string, number, string][]

      const accounts = [
        { selectedKey: 'all', content: 'All business accounts' },
        { selectedKey: 'operating', content: 'Operating account' },
        { selectedKey: 'payroll', content: 'Payroll account' },
      ]

      const paymentOrders = [
        { value: 'dueDate', label: 'Due date' },
        { value: 'highestAmount', label: 'Highest amount' },
        { value: 'lowestAmount', label: 'Lowest amount' },
      ] as const

      function OperationalDashboard() {
        const id = useId()
        const [account, setAccount] = useState('all')
        const [paymentOrder, setPaymentOrder] = useState<
          (typeof paymentOrders)[number]
        >(paymentOrders[0])
        const [announcement, setAnnouncement] = useState('')
        const failures = failedPayments.filter(
          ([, , , key]) => account === 'all' || key === account
        )
        const pending = approvals.filter(
          ([, , key]) => account === 'all' || key === account
        )
        const scheduled = scheduledPayments
          .filter(([, , , key]) => account === 'all' || key === account)
          .sort(([, dateA, amountA], [, dateB, amountB]) => {
            if (paymentOrder.value === 'highestAmount') {
              return amountB - amountA
            }
            if (paymentOrder.value === 'lowestAmount') {
              return amountA - amountB
            }
            return dateA.localeCompare(dateB)
          })
        const unpaidTotal = failures.reduce(
          (sum, [, , amount]) => sum + amount,
          0
        )
        const approvalTotal = pending.reduce(
          (sum, [, amount]) => sum + amount,
          0
        )
        const scheduledTotal = scheduled.reduce(
          (sum, [, , amount]) => sum + amount,
          0
        )

        return (
          <Flex.Stack
            layoutEngine="css"
            wrap={false}
            gap="large"
            stretch
            innerSpace="small"
            style={{
              inlineSize: '100%',
              maxInlineSize: 'var(--layout-large)',
              marginInline: 'auto',
            }}
          >
            <Section
              breakout
              backgroundColor="var(--token-color-background-neutral-subtle)"
              innerSpace={{ top: 'large', bottom: 'large' }}
              aria-label="Payment overview"
            >
              <Flex.Stack layoutEngine="css" gap="large">
                <Flex.Stack
                  element="header"
                  layoutEngine="css"
                  gap="x-small"
                >
                  <P space={0} size="small">
                    Northstar AS (sample data)
                  </P>
                  <H3 size="large" space={0}>
                    Payment follow-up
                  </H3>
                  <P space={0} size="small">
                    Open work as of <DateFormat value="2026-11-01" /> at
                    09:00 CET
                  </P>
                </Flex.Stack>
                <Dropdown
                  label="Account"
                  value={account}
                  data={accounts}
                  onChange={({ data }) => {
                    const selected = accounts.find(
                      ({ selectedKey }) => selectedKey === data.selectedKey
                    )
                    if (selected) {
                      setAccount(selected.selectedKey)
                      setAnnouncement('Showing ' + selected.content + '.')
                    }
                  }}
                />
                <AriaLive id={id + '-updates'}>{announcement}</AriaLive>
              </Flex.Stack>
            </Section>
            <Grid.Container
              columns={{ small: 1, medium: 3, large: 3 }}
              columnGap="large"
              rowGap="large"
              role="group"
              aria-label="Payment summary"
            >
              <Grid.Item
                span={{ small: 'full', medium: [1, 1], large: [1, 1] }}
              >
                <Stat.Root>
                  <Stat.Label>Failed payments</Stat.Label>
                  <Stat.Content direction="vertical">
                    <Stat.Number
                      value={failures.length}
                      mainSize="x-large"
                      animate
                    />
                    <Stat.Info>
                      <Stat.Currency
                        value={unpaidTotal}
                        currency="NOK"
                        animate
                      />{' '}
                      unpaid
                    </Stat.Info>
                  </Stat.Content>
                </Stat.Root>
              </Grid.Item>
              <Grid.Item
                span={{ small: 'full', medium: [2, 2], large: [2, 2] }}
              >
                <Stat.Root>
                  <Stat.Label>Awaiting approval</Stat.Label>
                  <Stat.Content direction="vertical">
                    <Stat.Number
                      value={pending.length}
                      mainSize="x-large"
                      animate
                    />
                    <Stat.Info>Due today at 14:00 CET</Stat.Info>
                  </Stat.Content>
                </Stat.Root>
              </Grid.Item>
              <Grid.Item
                span={{ small: 'full', medium: [3, 3], large: [3, 3] }}
              >
                <Stat.Root>
                  <Stat.Label>Scheduled next 7 days</Stat.Label>
                  <Stat.Content direction="vertical">
                    <Stat.Number
                      value={scheduled.length}
                      mainSize="x-large"
                      animate
                    />
                    <Stat.Info>
                      <Stat.Currency
                        value={scheduledTotal}
                        currency="NOK"
                        animate
                      />{' '}
                      in total
                    </Stat.Info>
                  </Stat.Content>
                </Stat.Root>
              </Grid.Item>
            </Grid.Container>
            <Hr space={0} />
            <Flex.Container layoutEngine="css" gap="large" rowGap="large">
              <Flex.Item
                element="section"
                style={{
                  flex: '2 1 24rem',
                  minWidth: 0,
                  maxInlineSize: '100%',
                }}
                aria-labelledby={id + '-attention'}
              >
                <H4 space={0} id={id + '-attention'}>
                  Needs attention
                </H4>
                <P space={0} top="x-small" size="small">
                  Ordered by urgency
                </P>
                <Flex.Stack
                  innerSpace={{ top: 'large', bottom: 'large' }}
                  layoutEngine="css"
                  gap="small"
                >
                  <Flex.Container
                    layoutEngine="css"
                    justify="space-between"
                    align="center"
                    gap="small"
                  >
                    <P space={0} weight="medium">
                      <Amount value={failures.length} /> failed{' '}
                      {failures.length === 1 ? 'payment' : 'payments'}
                    </P>
                    <Badge
                      status="negative"
                      subtle
                      content="Action needed"
                    />
                  </Flex.Container>
                  <P space={0}>
                    <Amount value={unpaidTotal} currency /> has not been
                    paid. Check the reasons before trying again.
                  </P>
                  <Accordion
                    variant="tertiary"
                    id={id + '-failed'}
                    title="Review payments"
                  />
                  <Accordion.Content
                    connectedTo={id + '-failed'}
                    title="Failed payments to review"
                  >
                    <Table.ScrollView>
                      <Table size="small">
                        <caption>
                          Failed payments as of{' '}
                          <DateFormat value="2026-11-01" />
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">Payment</th>
                            <th scope="col">Reason</th>
                            <th scope="col" align="right">
                              Amount (NOK)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {failures.map(([reference, reason, amount]) => (
                            <tr key={reference}>
                              <th scope="row">{reference}</th>
                              <td>{reason}</td>
                              <td align="right">
                                <Amount value={amount} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Table.ScrollView>
                  </Accordion.Content>
                </Flex.Stack>
                <Hr space={0} />
                <Flex.Stack
                  innerSpace={{ top: 'large', bottom: 'large' }}
                  layoutEngine="css"
                  gap="small"
                >
                  <Flex.Container
                    layoutEngine="css"
                    justify="space-between"
                    align="center"
                    gap="small"
                  >
                    <P space={0} weight="medium">
                      <Amount value={pending.length} />{' '}
                      {pending.length === 1 ? 'payment' : 'payments'} to
                      approve
                    </P>
                    <Badge status="warning" subtle content="Due today" />
                  </Flex.Container>
                  <P space={0}>
                    <Amount value={approvalTotal} currency /> in total.
                    Approve before 14:00 CET to meet the deadline.
                  </P>
                  <Accordion
                    variant="tertiary"
                    id={id + '-approvals'}
                    title="View approvals"
                  />
                  <Accordion.Content
                    connectedTo={id + '-approvals'}
                    title="Payments awaiting approval"
                  >
                    <Table.ScrollView>
                      <Table size="small">
                        <caption>
                          Awaiting approval, due{' '}
                          <DateFormat value="2026-11-01" /> at 14:00 CET
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">Payment</th>
                            <th scope="col" align="right">
                              Amount (NOK)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pending.map(([reference, amount]) => (
                            <tr key={reference}>
                              <th scope="row">{reference}</th>
                              <td align="right">
                                <Amount value={amount} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Table.ScrollView>
                  </Accordion.Content>
                </Flex.Stack>
              </Flex.Item>
              <Flex.Item style={{ flex: '1 1 14rem', minWidth: 0 }}>
                <Card
                  alignSelf="flex-start"
                  stack
                  layoutEngine="css"
                  gap={false}
                  aria-labelledby={id + '-upcoming'}
                >
                  <HeightAnimation showOverflow>
                    <Flex.Stack
                      element="div"
                      layoutEngine="css"
                      gap="medium"
                    >
                      <H4 space={0} id={id + '-upcoming'}>
                        Coming up
                      </H4>
                      <Menu.Root>
                        <Menu.Button
                          variant="tertiary"
                          icon="sort"
                          iconPosition="left"
                          aria-label={
                            'Order scheduled payments by ' +
                            paymentOrder.label.toLowerCase()
                          }
                          aria-describedby={id + '-upcoming'}
                          text={paymentOrder.label}
                        />
                        <Menu.List aria-label="Order scheduled payments">
                          {paymentOrders.map((order) => (
                            <Menu.Action
                              key={order.value}
                              text={order.label}
                              icon={
                                paymentOrder === order
                                  ? 'check'
                                  : undefined
                              }
                              onClick={() => {
                                setPaymentOrder(order)
                                setAnnouncement(
                                  'Scheduled payments ordered by ' +
                                    order.label.toLowerCase() +
                                    '.'
                                )
                              }}
                            />
                          ))}
                        </Menu.List>
                      </Menu.Root>
                      {scheduled.map(
                        ([reference, date, amount], index) => (
                          <Fragment key={reference}>
                            {index > 0 && <Hr space={0} />}
                            <Flex.Stack
                              element="div"
                              layoutEngine="css"
                              gap={false}
                            >
                              <P space={0} size="small">
                                <DateFormat value={date} />
                              </P>
                              <P space={0} weight="medium">
                                {reference}
                              </P>
                              <P space={0}>
                                <Amount value={amount} currency />
                              </P>
                              <P space={0} size="small">
                                Scheduled
                              </P>
                            </Flex.Stack>
                          </Fragment>
                        )
                      )}
                      <Accordion
                        variant="tertiary"
                        title="Payment details"
                      >
                        <P space={0} size="small">
                          Scheduled payments are planned, not booked. Check
                          available funds and payment details before the
                          due date.
                        </P>
                      </Accordion>
                    </Flex.Stack>
                  </HeightAnimation>
                </Card>
              </Flex.Item>
            </Flex.Container>
          </Flex.Stack>
        )
      }

      return <OperationalDashboard />
    }}
  </ComponentBox>
)

export const FinancialExample = () => (
  <ComponentBox
    hideCode
    background="plain"
    scope={{ useId, useSharedContext, formatDate }}
  >
    {() => {
      type DateRange = { start: string; end?: string }

      function Period({ value: { start, end } }: { value: DateRange }) {
        return (
          <>
            <DateFormat value={start} hideYear={Boolean(end)} />
            {end && (
              <>
                {' – '}
                <DateFormat value={end} />
              </>
            )}
          </>
        )
      }

      function Amount({
        value,
        currency = false,
      }: {
        value: number
        currency?: boolean
      }) {
        return currency ? (
          <NumberFormat.Currency
            value={value}
            currency="NOK"
            decimals={0}
          />
        ) : (
          <NumberFormat.Number value={value} decimals={0} />
        )
      }

      function Change({ value }: { value: number }) {
        return (
          <>
            <Amount value={Math.abs(value)} currency />{' '}
            {value < 0 ? 'less' : 'more'}
          </>
        )
      }

      const views = {
        day: {
          range: { start: '2026-10-31' },
          comparison: { start: '2026-10-30' },
          incomplete: false,
          grouping: 'Four-hour totals (Europe/Oslo).',
          netChange: 1000,
          incomeChange: 2000,
          expenseChange: 1000,
          summary:
            'Both money in and money out peaked between 12:00 and 16:00.',
          values: [
            ['00–04', 1000, 600],
            ['04–08', 2400, 1800],
            ['08–12', 4600, 3000],
            ['12–16', 6000, 4200],
            ['16–20', 2800, 1600],
            ['20–24', 1200, 800],
          ],
        },
        month: {
          range: { start: '2026-10-01', end: '2026-10-31' },
          comparison: { start: '2026-09-01', end: '2026-09-30' },
          incomplete: false,
          grouping: 'Seven-day totals. Final interval is three days.',
          netChange: 20000,
          incomeChange: 12000,
          expenseChange: -8000,
          summary: 'Money in exceeded money out in every interval.',
          values: [
            ['1–7', 33000, 24000],
            ['8–14', 40000, 30000],
            ['15–21', 28000, 20000],
            ['22–28', 42000, 32000],
            ['29–31', 25000, 18000],
          ],
        },
        year: {
          range: { start: '2026-01-01', end: '2026-10-31' },
          comparison: { start: '2025-01-01', end: '2025-10-31' },
          incomplete: true,
          grouping:
            'Monthly totals. November and December are not included.',
          netChange: 40000,
          incomeChange: 80000,
          expenseChange: 40000,
          summary:
            'August had the highest money in. The year is incomplete.',
          values: [
            ['2026-01-01', 130000, 102000],
            ['2026-02-01', 125000, 98000],
            ['2026-03-01', 158000, 124000],
            ['2026-04-01', 145000, 110000],
            ['2026-05-01', 162000, 132000],
            ['2026-06-01', 148000, 115000],
            ['2026-07-01', 120000, 95000],
            ['2026-08-01', 180000, 138000],
            ['2026-09-01', 172000, 132000],
            ['2026-10-01', 168000, 124000],
          ],
        },
      } satisfies Record<
        string,
        {
          range: DateRange
          comparison: DateRange
          incomplete: boolean
          grouping: string
          netChange: number
          incomeChange: number
          expenseChange: number
          summary: string
          values: [string, number, number][]
        }
      >

      function IntervalLabel({
        value,
        view,
      }: {
        value: string
        view: keyof typeof views
      }) {
        const { locale } = useSharedContext()

        return view === 'year' ? (
          <time dateTime={value.slice(0, 7)}>
            {formatDate(value, { locale, options: { month: 'short' } })}
          </time>
        ) : (
          <>{value}</>
        )
      }

      function FinancialDashboard() {
        const [view, setView] = useState<keyof typeof views>('month')
        const [announcement, setAnnouncement] = useState<DateRange | null>(
          null
        )
        const id = useId()
        const data = views[view]
        const income = data.values.reduce(
          (sum, [, value]) => sum + value,
          0
        )
        const expenses = data.values.reduce(
          (sum, [, , value]) => sum + value,
          0
        )
        const maximum =
          Math.ceil(
            Math.max(
              ...data.values.flatMap(([, moneyIn, moneyOut]) => [
                moneyIn,
                moneyOut,
              ])
            ) / 10000
          ) * 10000

        return (
          <Flex.Stack
            layoutEngine="css"
            wrap={false}
            gap="large"
            stretch
            innerSpace="small"
            style={{
              inlineSize: '100%',
              maxInlineSize: 'var(--layout-large)',
              marginInline: 'auto',
            }}
          >
            <Flex.Stack element="header" layoutEngine="css" gap="x-small">
              <P space={0} size="small">
                All business accounts (sample data)
              </P>
              <H3 size="large" space={0}>
                Money in and out
              </H3>
              <P space={0} size="small">
                Booked transactions as of <DateFormat value="2026-11-01" />{' '}
                at 09:00 CET
              </P>
              <P space={0} size="small">
                Excludes transfers between these accounts.
              </P>
            </Flex.Stack>
            <Section
              aria-label="Period and comparison"
              breakout={false}
              innerSpace="medium"
              roundedCorner
              backgroundColor="var(--token-color-background-neutral-subtle)"
            >
              <Flex.Container
                layoutEngine="css"
                align="center"
                justify="space-between"
                gap="medium"
              >
                <Flex.Stack element="div" layoutEngine="css" gap="x-small">
                  <Flex.Container
                    layoutEngine="css"
                    align="center"
                    gap="x-small"
                  >
                    <P space={0} weight="medium">
                      <Period value={data.range} />
                    </P>
                    {data.incomplete && <P space={0}>(incomplete year)</P>}
                  </Flex.Container>
                  <P space={0} size="small">
                    Compared with <Period value={data.comparison} />
                  </P>
                </Flex.Stack>
                <Chip.Group
                  label="Period"
                  value={view}
                  onChange={({ value }) => {
                    if (
                      value === 'day' ||
                      value === 'month' ||
                      value === 'year'
                    ) {
                      setView(value)
                      setAnnouncement(views[value].range)
                    }
                  }}
                >
                  <Chip value="day">Day</Chip>
                  <Chip value="month">Month</Chip>
                  <Chip value="year">Year</Chip>
                </Chip.Group>
              </Flex.Container>
            </Section>
            <AriaLive id={id + '-updates'}>
              {announcement && (
                <>
                  Showing <DateFormat value={announcement.start} />
                  {announcement.end && (
                    <>
                      {' to '}
                      <DateFormat value={announcement.end} />
                    </>
                  )}
                  {'. Metrics, comparison, and chart updated.'}
                </>
              )}
            </AriaLive>
            <Space
              className="dnb-dashboard-summary"
              role="group"
              aria-label="Cash movement summary"
            >
              <div className="dnb-dashboard-summary__cards">
                <Card
                  element="div"
                  responsive={false}
                  innerSpace="medium"
                  backgroundColor="#0000"
                >
                  <Stat.Root>
                    <Stat.Label>
                      <TermDefinition content="Money in minus money out. This is not your account balance or profit.">
                        Net movement
                      </TermDefinition>
                    </Stat.Label>
                    <Stat.Content direction="vertical">
                      <Stat.Currency
                        value={income - expenses}
                        animate
                        currency="NOK"
                        auxiliarySize="small"
                      />
                      <Stat.Trend
                        tone="neutral"
                        srLabel="Change from comparison period"
                      >
                        <Stat.Currency
                          value={data.netChange}
                          animate
                          currency="NOK"
                          signDisplay="always"
                        />
                      </Stat.Trend>
                    </Stat.Content>
                  </Stat.Root>
                </Card>
                <Card
                  element="div"
                  responsive={false}
                  innerSpace="medium"
                  backgroundColor="#0000"
                >
                  <Stat.Root>
                    <Stat.Label>Money in</Stat.Label>
                    <Stat.Content direction="vertical">
                      <Stat.Currency
                        value={income}
                        animate
                        currency="NOK"
                        auxiliarySize="small"
                      />
                      <Stat.Info>
                        <Change value={data.incomeChange} />
                      </Stat.Info>
                    </Stat.Content>
                  </Stat.Root>
                </Card>
                <Card
                  element="div"
                  responsive={false}
                  innerSpace="medium"
                  backgroundColor="#0000"
                >
                  <Stat.Root>
                    <Stat.Label>Money out</Stat.Label>
                    <Stat.Content direction="vertical">
                      <Stat.Currency
                        value={expenses}
                        animate
                        currency="NOK"
                        auxiliarySize="small"
                      />
                      <Stat.Info>
                        <Change value={data.expenseChange} />
                      </Stat.Info>
                    </Stat.Content>
                  </Stat.Root>
                </Card>
              </div>
            </Space>
            <Tabs label="Cash movement views" breakout={false} keepInDOM>
              <Tabs.Content title="Overview" key="overview">
                <Grid.Container
                  columns={{ small: 1, medium: 1, large: 3 }}
                  columnGap="large"
                  rowGap="large"
                >
                  <Grid.Item
                    span={{ small: 'full', medium: 'full', large: [1, 2] }}
                  >
                    <Section
                      aria-labelledby={id + '-movement'}
                      breakout={false}
                      innerSpace="medium"
                      roundedCorner
                      backgroundColor="var(--token-color-background-neutral-subtle)"
                    >
                      <Flex.Stack
                        element="div"
                        layoutEngine="css"
                        gap="x-small"
                      >
                        <H4 space={0} id={id + '-movement'}>
                          Cash movement
                        </H4>
                        <P space={0} size="small">
                          {data.grouping} Values in NOK.
                        </P>
                      </Flex.Stack>
                      <Accordion
                        top="small"
                        variant="tertiary"
                        id={id + '-chart-values'}
                        title="View chart values"
                      />
                      <Accordion.Content
                        connectedTo={id + '-chart-values'}
                        title="Cash movement values"
                      >
                        <MovementTable view={view} />
                      </Accordion.Content>
                      <Space
                        top="medium"
                        className="dnb-dashboard-chart"
                        aria-hidden="true"
                      >
                        <div className="dnb-dashboard-chart__legend">
                          <span>Money in</span>
                          <span>Money out</span>
                        </div>
                        <div className="dnb-dashboard-chart__unit">
                          NOK
                        </div>
                        <div className="dnb-dashboard-chart__frame">
                          <div className="dnb-dashboard-chart__scale">
                            {[maximum, maximum / 2, 0].map((value) => (
                              <span key={value}>
                                <Amount value={value} />
                              </span>
                            ))}
                          </div>
                          <div
                            className={
                              'dnb-dashboard-chart__plot' +
                              (data.values.length >= 6
                                ? ' dnb-dashboard-chart__plot--dense'
                                : '')
                            }
                          >
                            {data.values.map(
                              ([label, moneyIn, moneyOut]) => (
                                <div
                                  className="dnb-dashboard-chart__interval"
                                  key={label}
                                >
                                  <div className="dnb-dashboard-chart__bars">
                                    <div
                                      className="dnb-dashboard-chart__bar"
                                      style={{
                                        height:
                                          (moneyIn / maximum) * 100 + '%',
                                      }}
                                    />
                                    <div
                                      className="dnb-dashboard-chart__bar dnb-dashboard-chart__bar--out"
                                      style={{
                                        height:
                                          (moneyOut / maximum) * 100 + '%',
                                      }}
                                    />
                                  </div>
                                  <span>
                                    <IntervalLabel
                                      value={label}
                                      view={view}
                                    />
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </Space>
                      <P space={0} top="medium" size="small">
                        {data.summary}
                      </P>
                    </Section>
                  </Grid.Item>
                  <Grid.Item
                    span={{ small: 'full', medium: 'full', large: [3, 3] }}
                  >
                    <Card
                      alignSelf="flex-start"
                      stack
                      layoutEngine="css"
                      gap="small"
                      aria-labelledby={id + '-context'}
                    >
                      <Flex.Container
                        layoutEngine="css"
                        align="center"
                        justify="space-between"
                        gap="small"
                      >
                        <H4 space={0} id={id + '-context'}>
                          Comparison
                        </H4>
                        <HelpButton
                          title="About the comparison"
                          size="small"
                        >
                          <P space={0}>
                            The change compares the selected period with{' '}
                            <Period value={data.comparison} />. Payment
                            timing and the number of working days can
                            affect the result.
                          </P>
                        </HelpButton>
                      </Flex.Container>
                      <Stat.Root>
                        <Stat.Label>Previous net movement</Stat.Label>
                        <Stat.Content direction="vertical">
                          <Stat.Currency
                            value={income - expenses - data.netChange}
                            animate
                            currency="NOK"
                            auxiliarySize="small"
                          />
                          <HeightAnimation>
                            <Stat.Info element="div">
                              <Period value={data.comparison} />
                            </Stat.Info>
                          </HeightAnimation>
                        </Stat.Content>
                      </Stat.Root>
                      <Hr space={0} />
                      <Accordion
                        variant="tertiary"
                        title="What is included"
                      >
                        <P space={0} size="small">
                          Booked transactions across all business accounts.
                          Transfers between these accounts, scheduled
                          payments, and failed payments are excluded.
                        </P>
                      </Accordion>
                    </Card>
                  </Grid.Item>
                </Grid.Container>
              </Tabs.Content>
              <Tabs.Content title="Period breakdown" key="breakdown">
                <Flex.Stack layoutEngine="css" gap="medium">
                  <Flex.Stack
                    element="div"
                    layoutEngine="css"
                    gap="x-small"
                  >
                    <H4 space={0}>Cash movement by interval</H4>
                    <P space={0} size="small">
                      {data.grouping}
                    </P>
                  </Flex.Stack>
                  <MovementTable view={view} />
                </Flex.Stack>
              </Tabs.Content>
            </Tabs>
          </Flex.Stack>
        )
      }

      function MovementTable({ view }: { view: keyof typeof views }) {
        const data = views[view]

        return (
          <Table.ScrollView>
            <Table size="small">
              <caption>
                Booked cash movement (NOK), <Period value={data.range} />
                {data.incomplete && ' (incomplete year)'}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Interval</th>
                  <th scope="col" align="right">
                    Money in
                  </th>
                  <th scope="col" align="right">
                    Money out
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.values.map(([label, moneyIn, moneyOut]) => (
                  <tr key={label}>
                    <th scope="row">
                      <IntervalLabel value={label} view={view} />
                    </th>
                    <td align="right">
                      <Amount value={moneyIn} />
                    </td>
                    <td align="right">
                      <Amount value={moneyOut} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Table.ScrollView>
        )
      }

      return <FinancialDashboard />
    }}
  </ComponentBox>
)

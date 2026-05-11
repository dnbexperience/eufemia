import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";import{Lr as n}from"./index-DVm0MbGb.js";var r=e(),i=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`badge-variant-notification`,children:`<Badge content={1} label="Notifications" variant="notification" />
`}),a=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`badge-variant-notification-inline`,children:`<P>
  Text{' '}
  <Badge content={1234} label="Notifications" variant="notification" />{' '}
  Text
</P>
`}),o=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`badge-variant-notification-avatar`,children:`<Badge content={1234} label="Notifications" variant="notification">
  <Avatar.Group label="Persons">
    <Avatar size="large">A</Avatar>
  </Avatar.Group>
</Badge>
`}),s=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`badge-variant-default`,children:`<Badge content="New" />
`}),c=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`badge-variant-information-inline`,children:`<P>
  Text <Badge content="Info" variant="information" /> Text
</P>
`}),l=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`badge-variant-information-avatar`,children:`<Badge content="Ny" variant="information">
  <Avatar.Group label="Persons">
    <Avatar size="large" variant="secondary">
      A
    </Avatar>
  </Avatar.Group>
</Badge>
`}),u=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`badge-corner-position`,children:`<Flex.Container>
  <Badge
    content={66}
    label="Notifications"
    vertical="top"
    horizontal="left"
    variant="notification"
    data-visual-test="badge-top-left"
  >
    <Avatar.Group label="Persons">
      <Avatar size="large">A</Avatar>
    </Avatar.Group>
  </Badge>

  <Badge
    content={1234}
    label="Notifications"
    vertical="top"
    horizontal="right"
    variant="notification"
    data-visual-test="badge-top-right"
  >
    <Avatar.Group label="Persons">
      <Avatar size="large">B</Avatar>
    </Avatar.Group>
  </Badge>

  <Badge
    content={13}
    label="Notifications"
    vertical="bottom"
    horizontal="left"
    variant="notification"
    data-visual-test="badge-bottom-left"
  >
    <Avatar.Group label="Persons">
      <Avatar size="large">C</Avatar>
    </Avatar.Group>
  </Badge>

  <Badge
    content={58}
    label="Notifications"
    vertical="bottom"
    horizontal="right"
    variant="notification"
    data-visual-test="badge-bottom-right"
  >
    <Avatar.Group label="Persons">
      <Avatar size="large">D</Avatar>
    </Avatar.Group>
  </Badge>
</Flex.Container>
`}),d=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`badge-status`,children:`<Grid.Container
  rowGap
  columnGap
  style={{
    display: 'inline-grid',
    placeItems: 'start',
    gridTemplateColumns: 'repeat(2, auto)',
  }}
>
  <Badge content="default" status="default" />
  <Badge content="default (subtle)" status="default" subtle />
  <Badge content="neutral" status="neutral" />
  <Badge content="neutral (subtle)" status="neutral" subtle />
  <Badge content="positive" status="positive" />
  <Badge content="positive (subtle)" status="positive" subtle />
  <Badge content="warning" status="warning" />
  <Badge content="warning (subtle)" status="warning" subtle />
  <Badge content="negative" status="negative" />
  <Badge content="negative (subtle)" status="negative" subtle />
</Grid.Container>
`}),f=()=>(0,r.jsx)(t,{hideCode:!0,noInline:!0,children:`const Example = () => {
  type Data = {
    notifications: number
  }
  const { data } = Form.useData<Data>('badge-hide-example')
  const notifications = data?.notifications
  return (
    <Form.Handler id="badge-hide-example">
      <Form.Card>
        <Badge
          label="Notifications"
          variant="notification"
          content={notifications}
          hideBadge={notifications === 0}
        >
          <Avatar.Group label="Persons">
            <Avatar size="large">A</Avatar>
          </Avatar.Group>
        </Badge>

        <Field.Number
          label="Define number of notifications"
          width="small"
          path="/notifications"
          defaultValue={1}
          minimum={0}
          step={1}
          showStepControls
        />
      </Form.Card>
    </Form.Handler>
  )
}
render(<Example />)
`});function p(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsxs)(t.h3,{children:[`Setting the `,(0,r.jsx)(t.code,{children:`variant`}),` property`]}),`
`,(0,r.jsx)(t.h4,{children:`Information`}),`
`,(0,r.jsxs)(t.p,{children:[`The default variant. Equivalent to `,(0,r.jsx)(t.code,{children:`variant='information'`}),`.`]}),`
`,(0,r.jsx)(s,{}),`
`,(0,r.jsx)(c,{}),`
`,(0,r.jsx)(t.h4,{children:`Notification`}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:`variant='notification'`}),`.`]}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`Overlayed badge`}),`
`,(0,r.jsxs)(t.p,{children:[`You can overlay the badge on top of an element by wrapping the `,(0,r.jsx)(t.code,{children:`<Badge>`}),` component around it.`]}),`
`,(0,r.jsx)(l,{}),`
`,(0,r.jsx)(o,{}),`
`,(0,r.jsxs)(t.h4,{children:[`Setting property `,(0,r.jsx)(t.code,{children:`horizontal`}),` and `,(0,r.jsx)(t.code,{children:`vertical`})]}),`
`,(0,r.jsx)(t.p,{children:`When overlaying the badge you can control its position.`}),`
`,(0,r.jsx)(u,{}),`
`,(0,r.jsxs)(t.h3,{children:[`Setting the `,(0,r.jsx)(t.code,{children:`status`}),` and `,(0,r.jsx)(t.code,{children:`subtle`}),` properties`]}),`
`,(0,r.jsxs)(t.p,{children:[`The information variant has 5 possible `,(0,r.jsx)(t.code,{children:`status`}),` values, and two possible `,(0,r.jsx)(t.code,{children:`subtle`}),` values.`]}),`
`,(0,r.jsxs)(t.p,{children:[`The default state is equivalent to `,(0,r.jsx)(t.code,{children:`status='default'`}),` and `,(0,r.jsx)(t.code,{children:`subtle={false}`}),`.`]}),`
`,(0,r.jsx)(d,{}),`
`,(0,r.jsxs)(t.h3,{children:[`Hiding Badge with `,(0,r.jsx)(t.code,{children:`hideBadge`})]}),`
`,(0,r.jsxs)(t.p,{children:[`Sometimes you need to hide the badge without hiding the overlayed element. To make this less complicated you can use the `,(0,r.jsx)(t.code,{children:`hideBadge`}),` property.`]}),`
`,(0,r.jsx)(t.p,{children:`The example below hides the badge when there are no notifications. You can add or remove notifications with the "+" and "-" buttons.`}),`
`,(0,r.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}export{m as default};
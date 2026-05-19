import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{zr as r}from"./index-DqqByKA2.js";var i=e(t()),a=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`badge-variant-notification`,stableName:`BadgeNotification`,children:`<Badge content={1} label="Notifications" variant="notification" />
`}),o=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`badge-variant-notification-inline`,stableName:`BadgeNotificationInline`,children:`<P>
  Text{' '}
  <Badge content={1234} label="Notifications" variant="notification" />{' '}
  Text
</P>
`}),s=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`badge-variant-notification-avatar`,stableName:`BadgeNotificationAvatar`,children:`<Badge content={1234} label="Notifications" variant="notification">
  <Avatar.Group label="Persons">
    <Avatar size="large">A</Avatar>
  </Avatar.Group>
</Badge>
`}),c=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`badge-variant-default`,stableName:`BadgeDefault`,children:`<Badge content="New" />
`}),l=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`badge-variant-information-inline`,stableName:`BadgeInformationInline`,children:`<P>
  Text <Badge content="Info" variant="information" /> Text
</P>
`}),u=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`badge-variant-information-avatar`,stableName:`BadgeInformationAvatar`,children:`<Badge content="Ny" variant="information">
  <Avatar.Group label="Persons">
    <Avatar size="large" variant="secondary">
      A
    </Avatar>
  </Avatar.Group>
</Badge>
`}),d=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`badge-corner-position`,stableName:`BadgeCornerPosition`,children:`<Flex.Container>
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
`}),f=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`badge-status`,stableName:`BadgeStatus`,children:`<Grid.Container
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
`}),p=()=>(0,i.jsx)(n,{hideCode:!0,stableName:`BadgeHide`,noInline:!0,children:`const Example = () => {
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
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsxs)(t.h3,{children:[`Setting the `,(0,i.jsx)(t.code,{children:`variant`}),` property`]}),`
`,(0,i.jsx)(t.h4,{children:`Information`}),`
`,(0,i.jsxs)(t.p,{children:[`The default variant. Equivalent to `,(0,i.jsx)(t.code,{children:`variant='information'`}),`.`]}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsx)(l,{}),`
`,(0,i.jsx)(t.h4,{children:`Notification`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`variant='notification'`}),`.`]}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Overlayed badge`}),`
`,(0,i.jsxs)(t.p,{children:[`You can overlay the badge on top of an element by wrapping the `,(0,i.jsx)(t.code,{children:`<Badge>`}),` component around it.`]}),`
`,(0,i.jsx)(u,{}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsxs)(t.h4,{children:[`Setting property `,(0,i.jsx)(t.code,{children:`horizontal`}),` and `,(0,i.jsx)(t.code,{children:`vertical`})]}),`
`,(0,i.jsx)(t.p,{children:`When overlaying the badge you can control its position.`}),`
`,(0,i.jsx)(d,{}),`
`,(0,i.jsxs)(t.h3,{children:[`Setting the `,(0,i.jsx)(t.code,{children:`status`}),` and `,(0,i.jsx)(t.code,{children:`subtle`}),` properties`]}),`
`,(0,i.jsxs)(t.p,{children:[`The information variant has 5 possible `,(0,i.jsx)(t.code,{children:`status`}),` values, and two possible `,(0,i.jsx)(t.code,{children:`subtle`}),` values.`]}),`
`,(0,i.jsxs)(t.p,{children:[`The default state is equivalent to `,(0,i.jsx)(t.code,{children:`status='default'`}),` and `,(0,i.jsx)(t.code,{children:`subtle={false}`}),`.`]}),`
`,(0,i.jsx)(f,{}),`
`,(0,i.jsxs)(t.h3,{children:[`Hiding Badge with `,(0,i.jsx)(t.code,{children:`hideBadge`})]}),`
`,(0,i.jsxs)(t.p,{children:[`Sometimes you need to hide the badge without hiding the overlayed element. To make this less complicated you can use the `,(0,i.jsx)(t.code,{children:`hideBadge`}),` property.`]}),`
`,(0,i.jsx)(t.p,{children:`The example below hides the badge when there are no notifications. You can add or remove notifications with the "+" and "-" buttons.`}),`
`,(0,i.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}export{h as default};
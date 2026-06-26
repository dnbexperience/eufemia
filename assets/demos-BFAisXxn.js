import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{s as n}from"./ToggleButton-DM984GyO.js";import{j as r,w as i}from"./forms-CFi5-4x5.js";import{t as a}from"./Avatar-Bgi95aSv.js";import{t as o}from"./P-CtWu9WHu.js";import{t as s}from"./Card-Db-Q1D3Y.js";import{t as c}from"./export-2D5FXfgs.js";import{H as l,U as u}from"./index-kfZVC31v.js";import{t as d}from"./ComponentBox-qLaLt9T0.js";var f=e(t()),p=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`badge-variant-notification`,stableName:`BadgeNotification`,sourceImports:[`import { Badge, Avatar, Grid, Flex, P } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Badge:l},children:`<Badge content={1} label="Notifications" variant="notification" />
`}),m=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`badge-variant-notification-inline`,stableName:`BadgeNotificationInline`,sourceImports:[`import { Badge, Avatar, Grid, Flex, P } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:o,Badge:l},children:`<P>
  Text{' '}
  <Badge content={1234} label="Notifications" variant="notification" />{' '}
  Text
</P>
`}),h=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`badge-variant-notification-avatar`,stableName:`BadgeNotificationAvatar`,sourceImports:[`import { Badge, Avatar, Grid, Flex, P } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Badge:l,Avatar:a},children:`<Badge content={1234} label="Notifications" variant="notification">
  <Avatar.Group label="Persons">
    <Avatar size="large">A</Avatar>
  </Avatar.Group>
</Badge>
`}),g=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`badge-variant-default`,stableName:`BadgeDefault`,sourceImports:[`import { Badge, Avatar, Grid, Flex, P } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Badge:l},children:`<Badge content="New" />
`}),_=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`badge-variant-information-inline`,stableName:`BadgeInformationInline`,sourceImports:[`import { Badge, Avatar, Grid, Flex, P } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:o,Badge:l},children:`<P>
  Text <Badge content="Info" variant="information" /> Text
</P>
`}),v=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`badge-variant-information-avatar`,stableName:`BadgeInformationAvatar`,sourceImports:[`import { Badge, Avatar, Grid, Flex, P } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Badge:l,Avatar:a},children:`<Badge content="Ny" variant="information">
  <Avatar.Group label="Persons">
    <Avatar size="large" variant="secondary">
      A
    </Avatar>
  </Avatar.Group>
</Badge>
`}),y=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`badge-corner-position`,stableName:`BadgeCornerPosition`,sourceImports:[`import { Badge, Avatar, Grid, Flex, P } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:n,Badge:l,Avatar:a},children:`<Flex.Container>
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
`}),b=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`badge-status`,stableName:`BadgeStatus`,sourceImports:[`import { Badge, Avatar, Grid, Flex, P } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Grid:c,Badge:l},children:`<Grid.Container
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
`}),x=()=>(0,f.jsx)(d,{hideCode:!0,stableName:`BadgeHide`,sourceImports:[`import { Badge, Avatar, Grid, Flex, P } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:s,Badge:l,Avatar:a,Field:r},noInline:!0,children:`const Example = () => {
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
`});function S(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...u(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsxs)(t.h3,{children:[`Setting the `,(0,f.jsx)(t.code,{children:`variant`}),` property`]}),`
`,(0,f.jsx)(t.h4,{children:`Information`}),`
`,(0,f.jsxs)(t.p,{children:[`The default variant. Equivalent to `,(0,f.jsx)(t.code,{children:`variant='information'`}),`.`]}),`
`,(0,f.jsx)(g,{}),`
`,(0,f.jsx)(_,{}),`
`,(0,f.jsx)(t.h4,{children:`Notification`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`variant='notification'`}),`.`]}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`Overlayed badge`}),`
`,(0,f.jsxs)(t.p,{children:[`You can overlay the badge on top of an element by wrapping the `,(0,f.jsx)(t.code,{children:`<Badge>`}),` component around it.`]}),`
`,(0,f.jsx)(v,{}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsxs)(t.h4,{children:[`Setting property `,(0,f.jsx)(t.code,{children:`horizontal`}),` and `,(0,f.jsx)(t.code,{children:`vertical`})]}),`
`,(0,f.jsx)(t.p,{children:`When overlaying the badge you can control its position.`}),`
`,(0,f.jsx)(y,{}),`
`,(0,f.jsxs)(t.h3,{children:[`Setting the `,(0,f.jsx)(t.code,{children:`status`}),` and `,(0,f.jsx)(t.code,{children:`subtle`}),` properties`]}),`
`,(0,f.jsxs)(t.p,{children:[`The information variant has 5 possible `,(0,f.jsx)(t.code,{children:`status`}),` values, and two possible `,(0,f.jsx)(t.code,{children:`subtle`}),` values.`]}),`
`,(0,f.jsxs)(t.p,{children:[`The default state is equivalent to `,(0,f.jsx)(t.code,{children:`status='default'`}),` and `,(0,f.jsx)(t.code,{children:`subtle={false}`}),`.`]}),`
`,(0,f.jsx)(b,{}),`
`,(0,f.jsxs)(t.h3,{children:[`Hiding Badge with `,(0,f.jsx)(t.code,{children:`hideBadge`})]}),`
`,(0,f.jsxs)(t.p,{children:[`Sometimes you need to hide the badge without hiding the overlayed element. To make this less complicated you can use the `,(0,f.jsx)(t.code,{children:`hideBadge`}),` property.`]}),`
`,(0,f.jsx)(t.p,{children:`The example below hides the badge when there are no notifications. You can add or remove notifications with the "+" and "-" buttons.`}),`
`,(0,f.jsx)(x,{})]})}function C(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(S,{...e})}):S(e)}export{C as default};
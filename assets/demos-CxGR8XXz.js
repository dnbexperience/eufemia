import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{n,t as r}from"./bank-D_1AE9Q_.js";import{t as i}from"./bank_medium-DLNdpo20.js";import{t as a}from"./ComponentBox-xW2kV1s2.js";import{Jt as o,Kt as s,Lr as c,oi as l}from"./index-DVm0MbGb.js";var u=e({AvatarChildIcon:()=>C,AvatarCountryFlagBadge:()=>I,AvatarCustomColors:()=>F,AvatarDNBLogo:()=>T,AvatarIconSize:()=>x,AvatarIconType:()=>S,AvatarImageDNB:()=>E,AvatarImagePinnedTab:()=>D,AvatarImageProps:()=>k,AvatarImageTobias:()=>O,AvatarSizeDefault:()=>f,AvatarSizeLarge:()=>h,AvatarSizeMedium:()=>m,AvatarSizeSmall:()=>p,AvatarSizeXLarge:()=>g,AvatarVariantDefault:()=>_,AvatarVariantPrimary:()=>v,AvatarVariantSecondary:()=>y,AvatarVariantTertiary:()=>b,GroupedAvatarsImg:()=>P,GroupedAvatarsLarge:()=>M,GroupedAvatarsMedium:()=>j,GroupedAvatarsSmall:()=>A,GroupedAvatarsXLarge:()=>N}),d=t(),f=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-size-default`,children:`<Avatar.Group label="Persons">
  <Avatar>Ola Nordmann</Avatar>
</Avatar.Group>
`}),p=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-size-small`,children:`
Text{' '}
<Avatar.Group label="Animals">
  <Avatar size="small">Duck</Avatar>
</Avatar.Group>{' '}
Text

`}),m=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-size-medium`,children:`<Avatar.Group label="Stocks">
  <Avatar size="medium">NFLX</Avatar>
</Avatar.Group>
`}),h=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-size-large`,children:`<Avatar.Group label="Companies">
  <Avatar size="large">Amazon</Avatar>
</Avatar.Group>
`}),g=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-size-x-large`,children:`<Avatar.Group label="TV Shows">
  <Avatar size="x-large">Friends</Avatar>
</Avatar.Group>
`}),_=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-variant-default`,children:`<Avatar.Group label="Dogs">
  <Avatar>Kleiner münsterländer</Avatar>
</Avatar.Group>
`}),v=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-variant-primary`,children:`<Avatar.Group label="Cities">
  <Avatar variant="primary">Oslo</Avatar>
</Avatar.Group>
`}),y=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-variant-secondary`,children:`<Avatar.Group label="Countries">
  <Avatar variant="secondary">Spain</Avatar>
</Avatar.Group>
`}),b=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-variant-tertiary`,children:`<Avatar.Group label="Cars">
  <Avatar variant="tertiary">Tesla</Avatar>
</Avatar.Group>
`}),x=()=>(0,d.jsx)(a,{hideCode:!0,scope:{Bank:r,BankMedium:i},"data-visual-test":`avatar-children-icon-primary`,children:`
<Avatar icon={Bank} size="small" />
<Avatar icon={BankMedium} />
<Avatar icon={BankMedium} size="large" />
<Avatar icon={BankMedium} size="x-large" />

`}),S=()=>(0,d.jsx)(a,{hideCode:!0,scope:{CalendarMedium:l},"data-visual-test":`avatar-children-icon-secondary`,children:`<Avatar.Group label="Icons" variant="secondary">
  <Avatar icon={CalendarMedium} />
  <Avatar icon="calendar_medium" />
  <Avatar icon={<IconPrimary icon={CalendarMedium} />} />
  <Avatar icon={<Icon icon={CalendarMedium} />} />
</Avatar.Group>
`}),C=()=>(0,d.jsx)(a,{hideCode:!0,scope:{AccountCardMedium:n},"data-visual-test":`avatar-children-icon-tertiary`,children:`<Avatar.Group label="Icons">
  <Avatar variant="tertiary">
    <Icon icon={AccountCardMedium} />
  </Avatar>
</Avatar.Group>
`});function w(e){switch(e?.name){case`sbanken`:return o;default:return s}}var T=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-children-logo`,scope:{getLogoSvg:w},children:`<Avatar.Group label="Logos">
  <Avatar>
    <Logo inheritColor svg={getLogoSvg} />
  </Avatar>
</Avatar.Group>
`}),E=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-image-local-png`,children:`<Avatar.Group label="Banks">
  <Avatar
    src="/dnb/android-chrome-192x192.png"
    alt="DNB Logo"
    size="x-large"
  />
</Avatar.Group>
`}),D=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-image-local-svg`,children:`<Avatar.Group label="Icons">
  <Avatar
    variant="tertiary"
    src="/dnb/safari-pinned-tab.svg"
    alt="DNB Logo"
  />
</Avatar.Group>
`}),O=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-image-external`,children:`<Avatar.Group label="Profiles">
  <Avatar
    src="/images/avatars/1501870.jpg"
    alt="Profile picture"
    size="large"
  />
</Avatar.Group>
`}),k=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-image-props`,children:`<Avatar.Group label="Images of banks">
  <Avatar
    variant="secondary"
    size="large"
    imgProps={{
      width: '48',
      height: '48',
      src: '/dnb/android-chrome-192x192.png',
      alt: 'DNB Logo',
    }}
  />
</Avatar.Group>
`}),A=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-grouped-small`,children:`
Text{' '}
<Avatar.Group
  label="Friends"
  size="small"
  variant="primary"
  maxElements={6}
>
  <Avatar>Anders</Avatar>
  <Avatar>Bjørnar</Avatar>
  <Avatar>Cathrine</Avatar>
  <Avatar>Didrik</Avatar>
  <Avatar>Erlend</Avatar>
  <Avatar>Frida</Avatar>
  <Avatar>Gøril</Avatar>
</Avatar.Group>{' '}
Text

`}),j=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-grouped-medium`,children:`<Avatar.Group label="Employees" size="medium" maxElements={5}>
  <Avatar>Anders</Avatar>
  <Avatar>Bjørnar</Avatar>
  <Avatar>Cathrine</Avatar>
  <Avatar>Didrik</Avatar>
  <Avatar>Erlend</Avatar>
  <Avatar>Frida</Avatar>
  <Avatar>Gøril</Avatar>
</Avatar.Group>
`}),M=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-grouped-large`,children:`<Avatar.Group
  label="Borrowers"
  size="large"
  variant="tertiary"
  maxElements={4}
>
  <Avatar>Anders</Avatar>
  <Avatar>Bjørnar</Avatar>
  <Avatar>Cathrine</Avatar>
  <Avatar>Didrik</Avatar>
  <Avatar>Erlend</Avatar>
  <Avatar>Frida</Avatar>
  <Avatar>Gøril</Avatar>
</Avatar.Group>
`}),N=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-grouped-x-large`,children:`<Avatar.Group
  label="Enemies"
  size="x-large"
  variant="secondary"
  maxElements={3}
>
  <Avatar>Anders</Avatar>
  <Avatar>Bjørnar</Avatar>
  <Avatar>Cathrine</Avatar>
  <Avatar>Didrik</Avatar>
  <Avatar>Erlend</Avatar>
  <Avatar>Frida</Avatar>
  <Avatar>Gøril</Avatar>
</Avatar.Group>
`}),P=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-grouped-image`,children:`<Avatar.Group label="Eufemia contributors" size="large" maxElements={5}>
  <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
  <Avatar src="/images/avatars/35217511.jpg" alt="Profile picture" />
  <Avatar src="/images/avatars/21338570.jpg" alt="Profile picture" />
  <Avatar src="/images/avatars/1359205.jpg" alt="Profile picture" />
  <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
  <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
  <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
</Avatar.Group>
`}),F=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-custom-colors`,children:`<Avatar.Group label="Persons">
  <Avatar backgroundColor="fire-red" color="sky-blue">
    Ola Nordmann
  </Avatar>
</Avatar.Group>
`}),I=()=>(0,d.jsx)(a,{hideCode:!0,"data-visual-test":`avatar-country-flag-badge`,children:`
<Badge
  content={<CountryFlag iso="NO" size="xx-small" />}
  vertical="bottom"
  horizontal="right"
  variant="content"
>
  <Avatar.Group label="Persons">
    <Avatar size="small">A</Avatar>
  </Avatar.Group>
</Badge>
<Badge
  content={<CountryFlag iso="NO" size="x-small" />}
  vertical="bottom"
  horizontal="right"
  variant="content"
>
  <Avatar.Group label="Persons">
    <Avatar size="medium">A</Avatar>
  </Avatar.Group>
</Badge>
<Badge
  content={<CountryFlag iso="NO" size="medium" />}
  vertical="bottom"
  horizontal="right"
  variant="content"
>
  <Avatar.Group label="Persons">
    <Avatar size="large">A</Avatar>
  </Avatar.Group>
</Badge>
<Badge
  content={<CountryFlag iso="NO" size="large" />}
  vertical="bottom"
  horizontal="right"
  variant="content"
>
  <Avatar.Group label="Persons">
    <Avatar size="x-large">A</Avatar>
  </Avatar.Group>
</Badge>

`});function L(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...c(),...e.components};return u||z(`Examples`,!1),C||z(`Examples.AvatarChildIcon`,!0),I||z(`Examples.AvatarCountryFlagBadge`,!0),F||z(`Examples.AvatarCustomColors`,!0),T||z(`Examples.AvatarDNBLogo`,!0),x||z(`Examples.AvatarIconSize`,!0),S||z(`Examples.AvatarIconType`,!0),E||z(`Examples.AvatarImageDNB`,!0),D||z(`Examples.AvatarImagePinnedTab`,!0),k||z(`Examples.AvatarImageProps`,!0),O||z(`Examples.AvatarImageTobias`,!0),f||z(`Examples.AvatarSizeDefault`,!0),h||z(`Examples.AvatarSizeLarge`,!0),m||z(`Examples.AvatarSizeMedium`,!0),p||z(`Examples.AvatarSizeSmall`,!0),g||z(`Examples.AvatarSizeXLarge`,!0),_||z(`Examples.AvatarVariantDefault`,!0),v||z(`Examples.AvatarVariantPrimary`,!0),y||z(`Examples.AvatarVariantSecondary`,!0),b||z(`Examples.AvatarVariantTertiary`,!0),P||z(`Examples.GroupedAvatarsImg`,!0),M||z(`Examples.GroupedAvatarsLarge`,!0),j||z(`Examples.GroupedAvatarsMedium`,!0),A||z(`Examples.GroupedAvatarsSmall`,!0),N||z(`Examples.GroupedAvatarsXLarge`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Avatar`}),`
`,(0,d.jsxs)(t.p,{children:[`To ensure the correct use of Avatars, we require using a `,(0,d.jsx)(t.code,{children:`Avatar.Group`}),` with `,(0,d.jsx)(t.code,{children:`Avatar`}),`-components as children. `,(0,d.jsx)(`br`,{}),`
The required `,(0,d.jsx)(t.code,{children:`label`}),`-property in `,(0,d.jsx)(t.code,{children:`Avatar.Group`}),` will ensure the correct use of accessibility for screen readers. `,(0,d.jsx)(`br`,{}),`
See more examples below.`]}),`
`,(0,d.jsxs)(t.h3,{children:[`Setting property `,(0,d.jsx)(t.code,{children:`size`})]}),`
`,(0,d.jsxs)(t.h4,{children:[`default `,(0,d.jsx)(t.code,{children:`size`}),` is 'medium'`]}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsxs)(t.h4,{children:[(0,d.jsx)(t.code,{children:`size`}),` 'small'`]}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsxs)(t.h4,{children:[(0,d.jsx)(t.code,{children:`size`}),` 'medium'`]}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsxs)(t.h4,{children:[(0,d.jsx)(t.code,{children:`size`}),` 'large'`]}),`
`,(0,d.jsx)(h,{}),`
`,(0,d.jsxs)(t.h4,{children:[(0,d.jsx)(t.code,{children:`size`}),` 'x-large'`]}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsxs)(t.h3,{children:[`Setting property `,(0,d.jsx)(t.code,{children:`variant`})]}),`
`,(0,d.jsxs)(t.h4,{children:[`default `,(0,d.jsx)(t.code,{children:`variant`}),` is 'primary'`]}),`
`,(0,d.jsx)(_,{}),`
`,(0,d.jsxs)(t.h4,{children:[(0,d.jsx)(t.code,{children:`variant`}),` 'primary'`]}),`
`,(0,d.jsx)(v,{}),`
`,(0,d.jsxs)(t.h4,{children:[(0,d.jsx)(t.code,{children:`variant`}),` 'secondary'`]}),`
`,(0,d.jsx)(y,{}),`
`,(0,d.jsxs)(t.h4,{children:[(0,d.jsx)(t.code,{children:`variant`}),` 'tertiary'`]}),`
`,(0,d.jsx)(b,{}),`
`,(0,d.jsxs)(t.h3,{children:[`Passing `,(0,d.jsx)(t.code,{children:`icon`})]}),`
`,(0,d.jsx)(t.h4,{children:`Auto-size`}),`
`,(0,d.jsxs)(t.p,{children:[`An icon will automatically be given the correct size (`,(0,d.jsx)(t.code,{children:`size="auto"`}),`) unless the icon's `,(0,d.jsx)(t.code,{children:`size`}),` property is set.`]}),`
`,(0,d.jsx)(x,{}),`
`,(0,d.jsx)(t.h4,{children:`Accepted values`}),`
`,(0,d.jsxs)(t.p,{children:[`The `,(0,d.jsx)(t.code,{children:`icon`}),` property can accept either an imported icon, a primary icon string, or an `,(0,d.jsx)(t.code,{children:`<Icon>`}),` or `,(0,d.jsx)(t.code,{children:`<IconPrimary>`}),` component.`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{children:`import {
  calendar_medium as CalendarMedium,
} from '@dnb/eufemia/icons'
`})}),`
`,(0,d.jsx)(S,{}),`
`,(0,d.jsxs)(t.h3,{children:[`Passing `,(0,d.jsx)(t.code,{children:`children`})]}),`
`,(0,d.jsx)(T,{}),`
`,(0,d.jsx)(t.h4,{children:`Icon as child`}),`
`,(0,d.jsxs)(t.p,{children:[`A single `,(0,d.jsx)(t.code,{children:`<Icon>`}),` or `,(0,d.jsx)(t.code,{children:`<IconPrimary>`}),` component sent as a child will also follow the same auto sizing rules as the `,(0,d.jsx)(t.code,{children:`icon`}),` property.`]}),`
`,(0,d.jsx)(C,{}),`
`,(0,d.jsxs)(t.h3,{children:[`Passing image as `,(0,d.jsx)(t.code,{children:`src`})]}),`
`,(0,d.jsx)(D,{}),`
`,(0,d.jsx)(E,{}),`
`,(0,d.jsx)(O,{}),`
`,(0,d.jsx)(k,{}),`
`,(0,d.jsx)(t.h3,{children:`Grouping Avatars`}),`
`,(0,d.jsx)(A,{}),`
`,(0,d.jsx)(j,{}),`
`,(0,d.jsx)(M,{}),`
`,(0,d.jsx)(N,{}),`
`,(0,d.jsx)(P,{}),`
`,(0,d.jsx)(t.h3,{children:`Customizing colors`}),`
`,(0,d.jsx)(F,{}),`
`,(0,d.jsxs)(t.h3,{children:[`Avatar with a `,(0,d.jsx)(t.a,{href:`/uilib/components/country-flag`,children:`CountryFlag`}),` as a `,(0,d.jsx)(t.a,{href:`/uilib/components/badge`,children:`Badge`})]}),`
`,(0,d.jsx)(I,{})]})}function R(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(L,{...e})}):L(e)}function z(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{R as default};
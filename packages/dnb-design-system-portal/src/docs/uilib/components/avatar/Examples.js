/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import {
  card as Card,
  account_card as AccountCard,
  confetti as Confetti,
} from '@dnb/eufemia/src/icons'

export const AvatarSizeDefault = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-default">
    {() => /* jsx */ `
<Avatar.Group label="Persons:">
  <Avatar>Ola Nordmann</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarSizeSmall = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-small">
    {() => /* jsx */ `
<Avatar.Group label="Animals:">
  <Avatar size="small">Duck</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarSizeMedium = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-medium">
    {() => /* jsx */ `
<Avatar.Group label="Stocks:">
  <Avatar size="medium">NFLX</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarSizeLarge = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-large">
    {() => /* jsx */ `
<Avatar.Group label="Companies:">
  <Avatar size="large">Amazon</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarSizeXLarge = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-x-large">
    {() => /* jsx */ `
<Avatar.Group label="TV Shows:">
  <Avatar size="x-large">Friends</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarVariantDefault = () => (
  <ComponentBox hideCode data-visual-test="avatar-variant-default">
    {() => /* jsx */ `
<Avatar.Group label="Dogs:">
  <Avatar>Kleiner münsterländer</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarVariantPrimary = () => (
  <ComponentBox hideCode data-visual-test="avatar-variant-primary">
    {() => /* jsx */ `
<Avatar.Group label="Cities:">
  <Avatar variant="primary">Oslo</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarVariantSecondary = () => (
  <ComponentBox hideCode data-visual-test="avatar-variant-secondary">
    {() => /* jsx */ `
<Avatar.Group label="Countries:">
  <Avatar variant="secondary">Spain</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarVariantTertiary = () => (
  <ComponentBox hideCode data-visual-test="avatar-variant-tertiary">
    {() => /* jsx */ `
<Avatar.Group label="Cars:">
  <Avatar variant="tertiary">Tesla</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarConfettiIcon = () => (
  <ComponentBox
    hideCode
    scope={{ Confetti }}
    data-visual-test="avatar-children-icon-primary"
  >
    {() => /* jsx */ `
<Avatar.Group label="Icons:">
  <Avatar variant="primary">
    <Icon icon={Confetti} />
  </Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarCardIcon = () => (
  <ComponentBox
    hideCode
    scope={{ Card }}
    data-visual-test="avatar-children-icon-secondary"
  >
    {() => /* jsx */ `
<Avatar.Group label="Icons:">
  <Avatar variant="secondary">
    <Icon icon={Card} />
  </Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarAccountCardIcon = () => (
  <ComponentBox
    hideCode
    scope={{ AccountCard }}
    data-visual-test="avatar-children-icon-tertiary"
  >
    {() => /* jsx */ `
<Avatar.Group label="Icons:">
  <Avatar variant="tertiary">
    <Icon icon={AccountCard} />
  </Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarDNBLogo = () => (
  <ComponentBox hideCode data-visual-test="avatar-children-logo">
    {() => /* jsx */ `
<Avatar.Group label="Logos:">
  <Avatar>
    <Logo/>
  </Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarImageDNB = () => (
  <ComponentBox hideCode data-visual-test="avatar-image-local-png">
    {() => /* jsx */ `
<Avatar.Group label="Banks:">
  <Avatar 
    src="/android-chrome-192x192.png" 
    alt="DNB Logo" 
    size="x-large"
  />
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarImagePinnedTab = () => (
  <ComponentBox hideCode data-visual-test="avatar-image-local-svg">
    {() => /* jsx */ `
<Avatar.Group label="Icons:">
  <Avatar 
    variant="tertiary"
    src="/safari-pinned-tab.svg" 
    alt="DNB Logo" 
  />
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarImageTobias = () => (
  <ComponentBox hideCode data-visual-test="avatar-image-external">
    {() => /* jsx */ `
<Avatar.Group label="Profiles:">
  <Avatar 
    src="https://avatars.githubusercontent.com/u/1501870?v=4" 
    alt="Profile picture" 
    size="large"
  />
</Avatar.Group>
  `}
  </ComponentBox>
)

export const AvatarImageProps = () => (
  <ComponentBox
    hideCode
    noFragments={false}
    data-visual-test="avatar-image-props"
  >
    {() => /* jsx */ `
() => {
  const imgProps = {
    width: "48", 
    height: "48", 
    src: "/android-chrome-192x192.png" , 
    alt: "DNB Logo"
  };
  
  return (
    <Avatar.Group label="Images of banks:">
      <Avatar 
        variant="secondary"
        size="large" 
        imgProps={imgProps} 
      />
    </Avatar.Group>
  )
}
`}
  </ComponentBox>
)

export const GroupedAvatarsSmall = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-small">
    {() => /* jsx */ `
<Avatar.Group label="Friends:" size="small" variant="primary" maxElements={6}>
  <Avatar>Anders</Avatar>
  <Avatar>Bjørnar</Avatar>
  <Avatar>Cathrine</Avatar>
  <Avatar>Didrik</Avatar>
  <Avatar>Erlend</Avatar>
  <Avatar>Frida</Avatar>
  <Avatar>Gøril</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const GroupedAvatarsMedium = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-medium">
    {() => /* jsx */ `
<Avatar.Group label="Employees:" size="medium" maxElements={5}>
  <Avatar>Anders</Avatar>
  <Avatar>Bjørnar</Avatar>
  <Avatar>Cathrine</Avatar>
  <Avatar>Didrik</Avatar>
  <Avatar>Erlend</Avatar>
  <Avatar>Frida</Avatar>
  <Avatar>Gøril</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const GroupedAvatarsLarge = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-large">
    {() => /* jsx */ `
<Avatar.Group label="Borrowers:" size="large" variant="tertiary" maxElements={4}>
  <Avatar>Anders</Avatar>
  <Avatar>Bjørnar</Avatar>
  <Avatar>Cathrine</Avatar>
  <Avatar>Didrik</Avatar>
  <Avatar>Erlend</Avatar>
  <Avatar>Frida</Avatar>
  <Avatar>Gøril</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const GroupedAvatarsXLarge = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-x-large">
    {() => /* jsx */ `
<Avatar.Group label="Enemies:" size="x-large" variant="secondary" maxElements={3}>
  <Avatar>Anders</Avatar>
  <Avatar>Bjørnar</Avatar>
  <Avatar>Cathrine</Avatar>
  <Avatar>Didrik</Avatar>
  <Avatar>Erlend</Avatar>
  <Avatar>Frida</Avatar>
  <Avatar>Gøril</Avatar>
</Avatar.Group>
  `}
  </ComponentBox>
)

export const GroupedAvatarsImg = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-image">
    {() => /* jsx */ `
<Avatar.Group label="Eufemia contributors:" size="large" maxElements={5}>
  <Avatar src="https://avatars.githubusercontent.com/u/1501870?v=4" alt="Profile picture"/>
  <Avatar src="https://avatars.githubusercontent.com/u/35217511?v=4" alt="Profile picture"/>
  <Avatar src="https://avatars.githubusercontent.com/u/21338570?v=4" alt="Profile picture"/>
  <Avatar src="https://avatars.githubusercontent.com/u/1359205?v=4" alt="Profile picture"/>
  <Avatar src="https://avatars.githubusercontent.com/u/1501870?v=4" alt="Profile picture"/>
  <Avatar src="https://avatars.githubusercontent.com/u/1501870?v=4" alt="Profile picture"/>
  <Avatar src="https://avatars.githubusercontent.com/u/1501870?v=4" alt="Profile picture"/>
</Avatar.Group>
  `}
  </ComponentBox>
)

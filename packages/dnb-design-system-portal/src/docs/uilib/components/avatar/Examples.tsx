/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  card_medium as CardMedium,
  account_card_medium as AccountCardMedium,
  bank as Bank,
  bank_medium as BankMedium,
} from '@dnb/eufemia/src/icons'
import { Avatar, Icon, IconPrimary, Logo } from '@dnb/eufemia/src'

export const AvatarSizeDefault = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-default">
    <Avatar.Group label="Persons">
      <Avatar>Ola Nordmann</Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarSizeSmall = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-small">
    Text{' '}
    <Avatar.Group label="Animals">
      <Avatar size="small">Duck</Avatar>
    </Avatar.Group>{' '}
    Text
  </ComponentBox>
)

export const AvatarSizeMedium = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-medium">
    <Avatar.Group label="Stocks">
      <Avatar size="medium">NFLX</Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarSizeLarge = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-large">
    <Avatar.Group label="Companies">
      <Avatar size="large">Amazon</Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarSizeXLarge = () => (
  <ComponentBox hideCode data-visual-test="avatar-size-x-large">
    <Avatar.Group label="TV Shows">
      <Avatar size="x-large">Friends</Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarVariantDefault = () => (
  <ComponentBox hideCode data-visual-test="avatar-variant-default">
    <Avatar.Group label="Dogs">
      <Avatar>Kleiner münsterländer</Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarVariantPrimary = () => (
  <ComponentBox hideCode data-visual-test="avatar-variant-primary">
    <Avatar.Group label="Cities">
      <Avatar variant="primary">Oslo</Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarVariantSecondary = () => (
  <ComponentBox hideCode data-visual-test="avatar-variant-secondary">
    <Avatar.Group label="Countries">
      <Avatar variant="secondary">Spain</Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarVariantTertiary = () => (
  <ComponentBox hideCode data-visual-test="avatar-variant-tertiary">
    <Avatar.Group label="Cars">
      <Avatar variant="tertiary">Tesla</Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarBankIcon = () => (
  <ComponentBox
    hideCode
    scope={{ Bank, BankMedium }}
    data-visual-test="avatar-children-icon-primary"
  >
    <Avatar size="small" icon={Bank} />
    <Avatar icon={BankMedium} />
    <Avatar size="large" icon={<IconPrimary icon={BankMedium} />} />
    <Avatar size="x-large" icon={<Icon icon={BankMedium} />} />
  </ComponentBox>
)

export const AvatarCardIcon = () => (
  <ComponentBox
    hideCode
    scope={{ CardMedium }}
    data-visual-test="avatar-children-icon-secondary"
  >
    <Avatar.Group label="Icons">
      <Avatar
        variant="secondary"
        icon={<IconPrimary icon={CardMedium} />}
      />
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarAccountCardIcon = () => (
  <ComponentBox
    hideCode
    scope={{ AccountCardMedium }}
    data-visual-test="avatar-children-icon-tertiary"
  >
    <Avatar.Group label="Icons">
      <Avatar variant="tertiary">
        <Icon icon={AccountCardMedium} />
      </Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarDNBLogo = () => (
  <ComponentBox hideCode data-visual-test="avatar-children-logo">
    <Avatar.Group label="Logos">
      <Avatar>
        <Logo size="auto" inheritColor />
      </Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarImageDNB = () => (
  <ComponentBox hideCode data-visual-test="avatar-image-local-png">
    <Avatar.Group label="Banks">
      <Avatar
        src="/dnb/android-chrome-192x192.png"
        alt="DNB Logo"
        size="x-large"
      />
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarImagePinnedTab = () => (
  <ComponentBox hideCode data-visual-test="avatar-image-local-svg">
    <Avatar.Group label="Icons">
      <Avatar
        variant="tertiary"
        src="/dnb/safari-pinned-tab.svg"
        alt="DNB Logo"
      />
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarImageTobias = () => (
  <ComponentBox hideCode data-visual-test="avatar-image-external">
    <Avatar.Group label="Profiles">
      <Avatar
        src="/images/avatars/1501870.jpg"
        alt="Profile picture"
        size="large"
      />
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarImageProps = () => (
  <ComponentBox hideCode data-visual-test="avatar-image-props">
    <Avatar.Group label="Images of banks">
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
  </ComponentBox>
)

export const GroupedAvatarsSmall = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-small">
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
  </ComponentBox>
)

export const GroupedAvatarsMedium = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-medium">
    <Avatar.Group label="Employees" size="medium" maxElements={5}>
      <Avatar>Anders</Avatar>
      <Avatar>Bjørnar</Avatar>
      <Avatar>Cathrine</Avatar>
      <Avatar>Didrik</Avatar>
      <Avatar>Erlend</Avatar>
      <Avatar>Frida</Avatar>
      <Avatar>Gøril</Avatar>
    </Avatar.Group>
  </ComponentBox>
)

export const GroupedAvatarsLarge = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-large">
    <Avatar.Group
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
  </ComponentBox>
)

export const GroupedAvatarsXLarge = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-x-large">
    <Avatar.Group
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
  </ComponentBox>
)

export const GroupedAvatarsImg = () => (
  <ComponentBox hideCode data-visual-test="avatar-grouped-image">
    <Avatar.Group
      label="Eufemia contributors"
      size="large"
      maxElements={5}
    >
      <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
      <Avatar src="/images/avatars/35217511.jpg" alt="Profile picture" />
      <Avatar src="/images/avatars/21338570.jpg" alt="Profile picture" />
      <Avatar src="/images/avatars/1359205.jpg" alt="Profile picture" />
      <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
      <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
      <Avatar src="/images/avatars/1501870.jpg" alt="Profile picture" />
    </Avatar.Group>
  </ComponentBox>
)

export const AvatarCustomColors = () => (
  <ComponentBox hideCode data-visual-test="avatar-custom-colors">
    <Avatar.Group label="Persons">
      <Avatar backgroundColor="fire-red" color="sky-blue">
        Ola Nordmann
      </Avatar>
    </Avatar.Group>
  </ComponentBox>
)

---
showTabs: true
---

import {
AvatarSizeDefault,
AvatarSizeSmall,
AvatarSizeMedium,
AvatarSizeLarge,
AvatarSizeXLarge,
AvatarVariantDefault,
AvatarVariantPrimary,
AvatarVariantSecondary,
AvatarVariantTertiary,
AvatarConfettiIcon,
AvatarCardIcon,
AvatarAccountCardIcon,
AvatarDNBLogo,
AvatarImageDNB,
AvatarImageTobias,
AvatarImagePinnedTab,
AvatarImageProps,
GroupedAvatarsSmall,
GroupedAvatarsMedium,
GroupedAvatarsLarge,
GroupedAvatarsXLarge,
GroupedAvatarsImg
} from 'Docs/uilib/components/avatar/Examples'

## Demos

### Avatar

To ensure the correct use of Avatars, we require using a `Avatar.Group` with `Avatar`-components as children. <br/>
The required `label`-property in `Avatar.Group` will ensure the correct use of accessibility for screen readers. <br/>
See more examples below.

### Setting property `size`

#### default `size` is 'medium'

<AvatarSizeDefault />

#### `size` 'small'

<AvatarSizeSmall />

#### `size` 'medium'

<AvatarSizeMedium />

#### `size` 'large'

<AvatarSizeLarge />

#### `size` 'x-large'

<AvatarSizeXLarge />

### Setting property `variant`

#### default `variant` is 'primary'

<AvatarVariantDefault />

#### `variant` 'primary'

<AvatarVariantPrimary />

#### `variant` 'secondary'

<AvatarVariantSecondary />

#### `variant` 'tertiary'

<AvatarVariantTertiary />

### Passing icon as `children`

<AvatarConfettiIcon />
<AvatarCardIcon />
<AvatarAccountCardIcon />
<AvatarDNBLogo />

### Passing image as `src`

<AvatarImagePinnedTab />
<AvatarImageDNB />
<AvatarImageTobias />
<AvatarImageProps />

### Grouping Avatars

<GroupedAvatarsSmall />
<GroupedAvatarsMedium />
<GroupedAvatarsLarge />
<GroupedAvatarsXLarge />
<GroupedAvatarsImg />

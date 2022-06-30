---
showTabs: true
---

import {
BadgeNotification,
BadgeNotificationInline,
BadgeNotificationAvatar,
BadgeDefault,
BadgeInformationInline,
BadgeInformationAvatar,
BadgeTopLeft,
BadgeTopRight,
BadgeBottomLeft,
BadgeBottomRight,
BadgeImgWithIcon,
BadgeMailIcon
} from 'Docs/uilib/components/badge/Examples'

## Demos

### Setting property `variant`

#### default `variant` is 'information'

<BadgeDefault />
<BadgeInformationInline />
<BadgeInformationAvatar />

#### `variant` 'notification'

<BadgeNotification />
<BadgeNotificationInline />
<BadgeNotificationAvatar />

### Setting property `horizontal` and `vertical`

#### `vertical` 'top' `horizontal` 'left'

<BadgeTopLeft />

#### `vertical` 'top' `horizontal` 'right'

<BadgeTopRight />

#### `vertical` 'bottom' `horizontal` 'left'

<BadgeBottomLeft />

#### `vertical` 'bottom' `horizontal` 'right'

<BadgeBottomRight />

### Alternatives

<BadgeImgWithIcon />
<BadgeMailIcon />

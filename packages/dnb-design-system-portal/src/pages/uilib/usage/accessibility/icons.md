---
title: 'Icon'
draft: false
---

import ComponentBox from 'Tags/ComponentBox'
import Beach from 'Pages/uilib/usage/accessibility/assets/beach'

# Accessibility of Icons

If your icons are purely **decorative**, you’ll need to manually add an **aria-hidden** (results in `aria-hidden="true"`) attribute to each of your icons so Your app is "accessible".

<ComponentBox scope={{Beach}}>
{`
<Icon icon={Beach} size="60" title="Beach" aria-hidden />
`}
</ComponentBox>

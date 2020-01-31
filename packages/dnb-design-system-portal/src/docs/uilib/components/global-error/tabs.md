---
draft: true
---

import { Location, navigate } from '@reach/router'
import { Tabs } from 'dnb-ui-lib/components'

# GlobalError

<!-- prettier-ignore-start -->

<Location>
  {({ location: { pathname } }) => {
    return (
      <Tabs
        data={[
          { title: 'Info', key: '/uilib/components/global-error/info' },
          { title: 'Properties', key: '/uilib/components/global-error/properties' }
        ]}
        selected_key={pathname}
        on_change={({ key }) => navigate(key)}
        render={({ Wrapper, Content, TabsList, Tabs }) => {
          return (
            <Wrapper>
              <TabsList className="dnb-section">
                <Tabs />
              </TabsList>
              <Content />
            </Wrapper>
          )
        }}
      >
      </Tabs>
    )
  }}
</Location>

<!-- prettier-ignore-end -->

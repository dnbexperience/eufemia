---
title: 'Button'
draft: false
status: null
order: 1
---

import Tabs from 'Tags/Tabs'
import ComponentBox from 'Tags/ComponentBox'
import Description from 'Pages/uilib/components/button/description'
import Details from 'Pages/uilib/components/button/details'
import Demos from 'Pages/uilib/components/button/Examples'

# Button

<Tabs>
  <Tabs.Content>
    <Description />
    <h2>Demos</h2>
    <Demos />
  </Tabs.Content>
  <Tabs.Content>
    <Details />
    <ComponentBox caption="Test">
    {`
      <Button
        text="Secondary button with text only 2"
        variant="secondary"
        title="This is a button title"
      />
    `}
    </ComponentBox>
  </Tabs.Content>
  <Tabs.Content title="Markup">
    <h2>H2</h2>
  </Tabs.Content>
</Tabs>

<!-- import ButtonPage from 'Src/uilib/components/demos/Button' -->
<!-- <ButtonPage /> -->

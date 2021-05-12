/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Location, Router, navigate } from '@reach/router'

import { Tabs } from '@dnb/eufemia/src/components'

export default {
  title: 'Eufemia/Components/TabsNav',
}

export const TabsNavigation = () => (
  <Location>
    {({ location: { pathname } }) => {
      return (
        <Tabs
          data={[
            { title: 'Home', key: '/' },
            { title: 'Form #1', key: '/form-demo-01' },
            { title: 'Form #2', key: '/form-demo-02' },
            { title: 'Dynamic', key: '/dynamic' },
          ]}
          selected_key={pathname}
          on_change={({ key }) => navigate(key)}
          tabs_style="mint-green"
        >
          <React.Suspense fallback={<em>Loading ...</em>}>
            <Router>
              <Home path="/" default />
              <Form1 path="/form-demo-01" />
              <Form2 path="/form-demo-02" />
              <Dynamic path="/dynamic" />
            </Router>
          </React.Suspense>
        </Tabs>
      )
    }}
  </Location>
)

const Home = () => <>Home</>
const Form1 = () => <>Form1</>
const Form2 = () => <>Form2</>
const Dynamic = () => <>Dynamic</>

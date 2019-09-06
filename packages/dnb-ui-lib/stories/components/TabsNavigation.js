/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Location, Router, navigate } from '@reach/router'

import { Tabs } from '../../src/components'

// const rootUrl = '/iframe.html?id=components--tabs&path='
const rootUrl = ''

const TabsNavigation = () => (
  <>
    <Location>
      {({ location }) => {
        const { pathname, search } = location
        const selected_key = `${pathname}${search}`
        return (
          <Tabs
            data={[
              { title: 'Home', key: `${rootUrl}/` },
              { title: 'Form #1', key: `${rootUrl}/form-demo-01` },
              { title: 'Form #2', key: `${rootUrl}/form-demo-02` },
              { title: 'Dynamic', key: `${rootUrl}/dynamic` }
            ]}
            selected_key={selected_key}
            on_change={({ key }) => navigate(key)}
            section_style="mint-green"
          >
            <React.Suspense fallback={<em>Loading ...</em>}>
              <Router>
                <Home path={`${rootUrl}/`} default />
                <Form1 path={`${rootUrl}/form-demo-01`} />
                <Form2 path={`${rootUrl}/form-demo-02`} />
                <Dynamic path={`${rootUrl}/dynamic`} />
              </Router>
            </React.Suspense>
          </Tabs>
        )
      }}
    </Location>
  </>
)

export default TabsNavigation

const Home = () => <>Home</>
const Form1 = () => <>Form1</>
const Form2 = () => <>Form2</>
const Dynamic = () => <>Dynamic</>

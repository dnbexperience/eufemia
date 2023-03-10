/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import {
  Location,
  Router,
  navigate,
  RouteComponentProps,
} from '@reach/router'

import { Tabs } from '../..'

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
// eslint-disable-next-line no-empty-pattern
const Home = ({}: RouteComponentProps<any>) => <>Home</>
// eslint-disable-next-line no-empty-pattern
const Form1 = ({}: RouteComponentProps<any>) => <>Form1</>
// eslint-disable-next-line no-empty-pattern
const Form2 = ({}: RouteComponentProps<any>) => <>Form2</>
// eslint-disable-next-line no-empty-pattern
const Dynamic = ({}: RouteComponentProps<any>) => <>Dynamic</>

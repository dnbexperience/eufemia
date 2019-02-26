/**
 * To showcase legacy styling with the dnb-ui-lib
 *
 */

import React, { PureComponent, Suspense } from 'react'
import styled from '@emotion/styled'

// 1. Import Components and Elements
import { Button, Input, Icon } from 'dnb-ui-lib/components'
import { H2, H4, P, Code, Hr } from 'dnb-ui-lib/elements'
import { bell } from 'dnb-ui-lib/icons'

// 2. My App styles
import './App.css'

// 3. Custom Eufemia import
import 'dnb-ui-lib/style/basis'
import 'dnb-ui-lib/style/components'
import 'dnb-ui-lib/style/themes/ui'

// 4. We dont import this, as we will have controll
// import 'dnb-ui-lib/style'; // Import the global DNB stylesheet

// 5. We dont import this, as we will have controll
// import 'dnb-ui-lib/style/elements'

export default class App extends PureComponent {
  render() {
    return (
      <>
        <Legacy />
        <Cases />
      </>
    )
  }
}

const LegacyMenu = React.lazy(() => import('./legacy/LegacyMenu.jsx'))
const Legacy = () => {
  return (
    <Article1>
      <Code>Legacy code with own CSS reset from 2011 ↓</Code>
      <hr />

      {/* Legacy Menu */}
      <Suspense fallback={<span>Loading...</span>}>
        <LegacyMenu />
      </Suspense>
      <h1>
        Legacy h1 <Icon icon={bell} size="auto" />
      </h1>

      <h4 className="dnb-h4">
        I have a Eufemia Style (<code>.dnb-h4</code>) without a correct CSS
        reset, I'm only <b>20px</b> high!
      </h4>

      <Button text="Crying Button 😢" />
      <Input placeholder="Crying even more ..." />
    </Article1>
  )
}

const Cases = () => {
  return (
    <>
      {/* Use of core style reset */}
      <Article2 className="dnb-core-style">
        <Code>.dnb-core-style ↓</Code>
        <Hr />
        <H4>
          I'm using the Eufemia CSS reset, so I'm <b>24px</b> high!{' '}
        </H4>
        <P>Me as well {'😇'}</P>
        <H2>
          And I'm a h2 <Icon icon={bell} size="auto" />
        </H2>
        <Button text="I'm looking good" icon="chevron_right" />
      </Article2>

      {/* Use of spacing */}
      <Article3 className="dnb-core-style dnb-spacing">
        <Code>.dnb-core-style ↓ .dnb-spacing ↓</Code>
        <Hr />
        <H2>I'm a h2 in an Article, and have the defualt spacing!</H2>
        <P>
          I'm a Paragraph with spacing, written as <Code>{`<P>`}</Code>
        </P>
        <p className="dnb-p">
          Identical paragraph, written as{' '}
          <Code>{`<p className="dnb-p">`}</Code>
        </p>
        <Input placeholder="Type someting ..." />
      </Article3>
    </>
  )
}

const Article1 = styled.article`
  padding: 3rem 2rem 4rem;
  background-color: var(--color-mint-green-12);
`
const Article2 = styled.article`
  padding: 3rem 2rem 4rem;
  background-color: var(--color-sea-green-alt-30);
  hr:after {
    background-color: var(--color-mint-green-25);
  }
`
const Article3 = styled.article`
  padding: 3rem 2rem 4rem;
  background-color: var(--color-mint-green-50);
  hr:after {
    background-color: var(--color-mint-green-12);
  }
`

export { Cases, Article1 }

/**
 * To showcase legacy styling with the dnb-ui-lib
 *
 */

import React, { PureComponent } from 'react'
import styled from '@emotion/styled'

// 1. Import legacy code
import './legacy/reset.css'
import './legacy/dnb.css'
import LegacyMenu from './legacy/LegacyMenu.jsx'

// 2. Import Components and Elements
import { Button, Input, Icon } from 'dnb-ui-lib/components'
import { H2, H4, P, Code, Hr } from 'dnb-ui-lib/elements'
import { bell } from 'dnb-ui-lib/icons'

// 3. My App styles
import './App.css'

// 4. Custom Eufemia import
import 'dnb-ui-lib/src/style/basis'
import 'dnb-ui-lib/src/style/components'
import 'dnb-ui-lib/src/style/themes/ui'

// 5. We dont import this, as we will have controll
// import 'dnb-ui-lib/src/style'; // Import the global DNB stylesheet

// 6. We dont import this, as we will have controll
// import 'dnb-ui-lib/src/style/elements'

const Article1 = styled.article`
  padding: 3rem 2rem 4rem;
  background-color: var(--color-black-background);
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
const Article4 = styled.article`
  padding: 3rem 2rem 4rem;
  background-color: var(--color-mint-green-12);
  hr:after {
    background-color: var(--color-sea-green);
  }
`
const Article5 = styled.article`
  padding: 3rem 2rem 4rem;
  background-color: var(--color-sea-green);
`

export default class App extends PureComponent {
  render() {
    return (
      <>
        <Article1>
          <Code>Legacy code with own CSS reset from 2011 ↓</Code>
          <hr />

          {/* Legacy Menu */}
          <LegacyMenu />
          <h1>
            Legacy h1 <Icon icon={bell} size="auto" />
          </h1>

          <h4 className="dnb-h4">
            I have a Eufemia Style (<code>.dnb-h4</code>) without a correct
            CSS reset, I'm only <b>20px</b> high!
          </h4>

          <Button text="Crying Button 😢" />
          <Input placeholder="Crying even more ..." />
        </Article1>

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

        {/* Use of plain elements */}
        <Article3 className="dnb-core-style">
          <Code>.dnb-core-style ↓ .dnb-elements ↓</Code>
          <Hr />
          <article className="dnb-core-style dnb-elements">
            <h4>I'm a plain h4 element, but Eufemia styled</h4>
            <p>And I'm a plain paragraph</p>
            <blockquote>And I'm a plain blockquote</blockquote>
          </article>
        </Article3>

        {/* Use of spacing */}
        <Article4 className="dnb-core-style dnb-spacing">
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
        </Article4>

        {/* Use of helper classes */}
        <Article5 className="dnb-core-style dnb-app-content-inner">
          <Code>Helper Classes ↓</Code>
          <Hr />
          <div className="dnb-section dnb-section--spacing">
            <h2>
              I'm a h2 inside a <Code>.dnb-section</Code> with{' '}
              <Code>.dnb-section--spacing</Code>
            </h2>
          </div>
          <div className="dnb-section dnb-section--spacing dnb-section--white">
            <h4>
              And I'm white <Code>.dnb-section--white</Code>
            </h4>
          </div>
        </Article5>
      </>
    )
  }
}

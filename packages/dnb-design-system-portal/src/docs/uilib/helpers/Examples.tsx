/**
 * UI lib Component Example
 *
 */

import { useState } from 'react'
import styled from '@emotion/styled'
import ComponentBox from '../../../shared/tags/ComponentBox'
import {
  fieldsetReset,
  showWhenSmall,
  showWhenMedium,
  showWhenLarge,
  showWhenSmallOffset,
  showWhenMediumOffset,
  showWhenLargeOffset,
} from './Examples.module.scss'
import { Flex, Li, P, Switch, Ul, Button } from '@dnb/eufemia/src'
import { patchGoogleTranslateCrash } from '@dnb/eufemia/src/shared'

// have a limit because this page is used for screenshot tests
const Wrapper = styled.div`
  max-width: 40rem;
`

export function CoreStyle() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-core-style">
        <div className="dnb-core-style">
          <h3 className="dnb-h--medium">
            Wrapper with the DNB Body Style (CSS reset)
          </h3>
          <p className="dnb-p">
            Read more about{' '}
            <code className="dnb-code">.dnb-core-style</code> and{' '}
            <a
              href="/uilib/usage/customisation/styling#core-style"
              className="dnb-anchor"
            >
              Use Eufemia Styles elsewhere
            </a>
          </p>
        </div>
      </ComponentBox>
    </Wrapper>
  )
}

export function TabFocus() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-tap-focus">
        <details>
          <summary className="dnb-tab-focus">
            Try to focus me with the Tab key
          </summary>
          My main focus state has been removed and replaced by the helping
          class <code className="dnb-code">.dnb-tab-focus</code>
        </details>
      </ComponentBox>
    </Wrapper>
  )
}

export function UnstyledList() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-unstyled-list">
        <ul className="dnb-unstyled-list">
          <li>I'm an unstyled list item</li>
          <li>Me too!</li>
        </ul>
        <hr className="dnb-hr" />
        <ul className="dnb-ul">
          <li>But I'm not.</li>
        </ul>
      </ComponentBox>
    </Wrapper>
  )
}

export function ScreenReaderOnly() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-sr-only">
        <p className="dnb-p">
          Hidden text
          <span className="dnb-sr-only">
            I am only visible to screen readers, so you probably can't see
            me. Unless you're using a screen reader.
          </span>
          !
        </p>
      </ComponentBox>
    </Wrapper>
  )
}

export function Selection() {
  return (
    <Wrapper className="dnb-spacing">
      <ComponentBox hideCode data-visual-test="helper-selection">
        <p className="dnb-selection dnb-t__size--basis">
          If you select a part of this text, you will see the selection
          highlight is green.
        </p>
      </ComponentBox>
    </Wrapper>
  )
}

export function FieldsetReset() {
  return (
    <Wrapper className={fieldsetReset}>
      <ComponentBox hideCode data-visual-test="helper-fieldset-reset">
        <fieldset>I'm a fieldset without styling.</fieldset>
      </ComponentBox>
    </Wrapper>
  )
}

export function SkipLink() {
  return (
    <Wrapper className={fieldsetReset}>
      <ComponentBox hideCode data-visual-test="skip-link">
        <a href="#something" className="dnb-skip-link">
          I am a skip link
        </a>
      </ComponentBox>
    </Wrapper>
  )
}

export function MediaSizeOffset() {
  return (
    <ComponentBox
      hideCode
      data-visual-test="helper-media-offset"
      scope={{
        showWhenSmall,
        showWhenMedium,
        showWhenLarge,
        showWhenSmallOffset,
        showWhenMediumOffset,
        showWhenLargeOffset,
      }}
    >
      <Ul space={0}>
        <Li className={showWhenSmall}>
          Show me when "small"{' '}
          <span className={showWhenSmallOffset}>+ offset is active</span>
        </Li>
        <Li className={showWhenMedium}>
          Show me when "medium"{' '}
          <span className={showWhenMediumOffset}>+ offset is active</span>
        </Li>
        <Li className={showWhenLarge}>
          Show me when "large"{' '}
          <span className={showWhenLargeOffset}>+ offset is active</span>
        </Li>
      </Ul>
    </ComponentBox>
  )
}

export function GoogleTranslateDemo() {
  return (
    <ComponentBox hideCode scope={{ patchGoogleTranslateCrash }}>
      {() => {
        function Example() {
          const [patched, setPatched] = useState(false)
          const [enabled, setEnabled] = useState(false)

          return (
            <Flex.Stack>
              <Button
                text={patched ? 'Patch active' : 'Enable patch'}
                translate="no"
                disabled={patched}
                variant="secondary"
                onClick={() => {
                  patchGoogleTranslateCrash()
                  setPatched(true)
                }}
              />

              <P>
                Translate this page, then toggle the switch below.
                <br />
                Without the patch, the example/app will crash.
              </P>

              <Switch
                label="Toggle conditional text"
                translate="no"
                checked={enabled}
                onChange={({ checked }) => setEnabled(checked)}
              />

              <P>
                {enabled && 'This text is conditionally rendered.'}
                {!enabled && 'Now this text is rendered instead.'}
              </P>
            </Flex.Stack>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}

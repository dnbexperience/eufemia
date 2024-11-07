/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Provider } from '@dnb/eufemia/src/shared'
import { ListFormat, P, Badge, Anchor } from '@dnb/eufemia/src'
import { listFormat } from '@dnb/eufemia/src/components/list-format/ListFormat'

export const UsingListFormatFunction = () => {
  return (
    <ComponentBox
      data-visual-test="list-format-function"
      scope={{ listFormat }}
    >
      {listFormat(
        [
          <React.Fragment key="a">A</React.Fragment>,
          <>
            <b>B</b>
          </>,
          <>C</>,
          'D',
          123,
          <Anchor
            target="_blank"
            href="https://github.com/dnbexperience/eufemia"
            className="dnb-anchor"
            rel="noopener noreferrer"
            key="github"
          >
            Link to Eufemia's Github Repo
          </Anchor>,
          <>
            Text <Badge content="Info" variant="information" /> Text
          </>,
        ],
        {
          format: { type: 'disjunction' },
          locale: 'en-US',
        },
      )}
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox data-visual-test="list-format-default">
      <ListFormat
        value={[
          <React.Fragment key="a">A</React.Fragment>,
          <>
            <b>B</b>
          </>,
          <>C</>,
          'D',
          123,
          <a
            target="_blank"
            href="https://github.com/dnbexperience/eufemia"
            className="dnb-anchor"
            rel="noopener noreferrer"
            key="github"
          >
            Link to Eufemia's Github Repo
          </a>,
          <>
            Text <Badge content="Info" variant="information" /> Text
          </>,
        ]}
      />
    </ComponentBox>
  )
}

export const WithCustomFormat = () => {
  return (
    <ComponentBox data-visual-test="list-format-custom-format">
      <Provider locale="en-GB">
        <ListFormat
          value={[
            <React.Fragment key="a">A</React.Fragment>,
            <>
              <b>B</b>
            </>,
            <>C</>,
            'D',
            123,
            <Anchor
              target="_blank"
              href="https://github.com/dnbexperience/eufemia"
              className="dnb-anchor"
              rel="noopener noreferrer"
              key="github"
            >
              Link to Eufemia's Github Repo
            </Anchor>,
            <>
              Text <Badge content="Info" variant="information" /> Text
            </>,
          ]}
          format={{ type: 'disjunction' }}
        />
      </Provider>
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox data-visual-test="list-format-inline">
      <P>
        This is before the component{' '}
        <ListFormat
          value={[
            123,
            <Anchor
              target="_blank"
              href="https://github.com/dnbexperience/eufemia"
              className="dnb-anchor"
              rel="noopener noreferrer"
              key="github"
            >
              Link to Eufemia's Github Repo
            </Anchor>,
            <>
              Text <Badge content="Info" variant="information" /> Text
            </>,
          ]}
        />{' '}
        This is after the component
      </P>
    </ComponentBox>
  )
}

export const ListVariants = () => {
  return (
    <ComponentBox data-visual-test="list-format-variants">
      <P>Ordered List:</P>
      <ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" />
      <P>Unordered List:</P>
      <ListFormat value={['Foo', 'Bar', 'Baz']} variant="ul" />
    </ComponentBox>
  )
}

export const ListTypes = () => {
  return (
    <ComponentBox data-visual-test="list-format-types">
      <P>Ordered List a:</P>
      <ListFormat
        value={['Foo', 'Bar', 'Baz']}
        variant="ol"
        listType="a"
      />
      <P>Ordered List A:</P>
      <ListFormat
        value={['Foo', 'Bar', 'Baz']}
        variant="ol"
        listType="A"
      />
      <P>Ordered List i:</P>
      <ListFormat
        value={['Foo', 'Bar', 'Baz']}
        variant="ol"
        listType="i"
      />
      <P>Ordered List I:</P>
      <ListFormat
        value={['Foo', 'Bar', 'Baz']}
        variant="ol"
        listType="I"
      />
      <P>Unordered List square:</P>
      <ListFormat
        value={['Foo', 'Bar', 'Baz']}
        variant="ul"
        listType="square"
      />
      <P>Unordered List circle:</P>
      <ListFormat
        value={['Foo', 'Bar', 'Baz']}
        variant="ul"
        listType="circle"
      />
    </ComponentBox>
  )
}

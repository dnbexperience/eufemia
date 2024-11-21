import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import MediaQuery from '@dnb/eufemia/src/shared/MediaQuery'
import { Slider, Code, Button, Flex } from '@dnb/eufemia/src'
import {
  TestElement,
  Field,
  FieldBlock,
  Form,
} from '@dnb/eufemia/src/extensions/forms'
import { defaultBreakpoints } from '@dnb/eufemia/src/shared/MediaQueryUtils'
import { defaultQueries } from '@dnb/eufemia/src/shared/useMedia'
import { useMedia, useMediaQuery } from '@dnb/eufemia/src/shared'

export const LayoutComponents = () => {
  return (
    <ComponentBox
      scope={{
        Field,
        Form,
      }}
    >
      <Flex.Stack>
        <Form.MainHeading>Profile</Form.MainHeading>

        <Form.Card>
          <Form.SubHeading>Name</Form.SubHeading>

          <Field.String label="Fornavn" value="John" />
          <Field.String label="Etternavn" value="Smith" />
        </Form.Card>

        <Form.Card>
          <Form.SubHeading>More information</Form.SubHeading>

          <Field.NationalIdentityNumber value="20058512345" />
          <Field.Email value="john@smith.email" />
          <Field.PhoneNumber value="+47 98765432" />
        </Form.Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const colors = [
  { background: '#babeee' } as React.CSSProperties,
  { background: '#dfe0ee' } as React.CSSProperties,
  { background: '#90d2c3' } as React.CSSProperties,
  { background: '#ecf4be' } as React.CSSProperties,
]

export const HorizontalFlexItemResponsiveSize = () => {
  return (
    <ComponentBox
      scope={{ colors, TestElement }}
      data-visual-test="flex-item-size"
    >
      <Flex.Container>
        <Flex.Item size={8}>
          <TestElement style={colors[0]}>FlexItem (8)</TestElement>
        </Flex.Item>
        <Flex.Item size={4}>
          <TestElement style={colors[1]}>FlexItem (4)</TestElement>
        </Flex.Item>
        <Flex.Item size={{ small: 12, medium: 4 }}>
          <TestElement style={colors[2]}>
            FlexItem (small: 8, medium: 4)
          </TestElement>
        </Flex.Item>
        <Flex.Item size={{ small: 12, medium: 8 }}>
          <TestElement style={colors[3]}>
            FlexItem (small: 4, medium: 8)
          </TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalFlexItemResponsiveSizeCustomColumns = () => {
  return (
    <ComponentBox
      scope={{
        colors,
        TestElement,
        Field,
        defaultBreakpoints,
        defaultQueries,
      }}
    >
      {() => {
        const breakpoints = {
          ...defaultBreakpoints,
          xsmall: '30em',
        }

        const queries = {
          ...defaultQueries,
          xsmall: { min: 0, max: 'xsmall' },
          small: { min: 'xsmall', max: 'small' },
        }

        const CustomMediaQuery = styled.div`
          display: flex;
          flex-direction: column;
          .dnb-flex-container[data-media-key='xsmall']
            .dnb-flex-item--responsive {
            --size: var(--xsmall);
          }
        `

        return (
          <CustomMediaQuery>
            <Flex.Container
              direction="horizontal"
              sizeCount={4}
              breakpoints={breakpoints}
              queries={queries}
            >
              <Flex.Item size={{ small: 2, medium: 3, large: 1 }}>
                <TestElement style={colors[0]}>FlexItem</TestElement>
              </Flex.Item>
              <Flex.Item size={{ small: 2, medium: 1, large: 2 }}>
                <TestElement style={colors[1]}>FlexItem</TestElement>
              </Flex.Item>
              <Flex.Item
                size={{ xsmall: 4, small: 2, medium: 1, large: 1 }}
              >
                <TestElement style={colors[2]}>FlexItem</TestElement>
              </Flex.Item>
              <Flex.Item
                size={{ xsmall: 4, small: 2, medium: 3, large: 4 }}
              >
                <TestElement style={colors[3]}>FlexItem</TestElement>
              </Flex.Item>
            </Flex.Container>
          </CustomMediaQuery>
        )
      }}
    </ComponentBox>
  )
}

export const HorizontalAutoSize = () => {
  return (
    <ComponentBox
      scope={{
        Field,
        FieldBlock,
      }}
      hideCode
    >
      <FieldBlock label="Label">
        <Flex.Container>
          <Flex.Item size={{ small: 12, large: 'auto' }}>
            <Field.Name.First
              path="/firstName"
              width="medium"
              minLength={2}
            />
          </Flex.Item>
          <Flex.Item size={{ small: 12, large: 'auto' }}>
            <Field.Name.Last path="/lastName" width="medium" required />
          </Flex.Item>
          <Flex.Item size={{ small: 12, large: 'auto' }}>
            <FieldBlock width="large">
              <Slider
                min={1900}
                max={new Date().getFullYear()}
                step={1}
                value={2010}
                label="Birth year"
                label_direction="vertical"
                tooltip
                alwaysShowTooltip
              />
            </FieldBlock>
          </Flex.Item>
        </Flex.Container>
      </FieldBlock>
    </ComponentBox>
  )
}

const useWindowWidth = () => {
  const [innerWidth, setWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  )

  React.useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return { innerWidth }
}

export const MediaQueryUseMedia = () => (
  <ComponentBox scope={{ useMedia, useWindowWidth }} hideCode>
    {() => {
      const Playground = () => {
        const { isSmall, isMedium, isLarge, isSSR } = useMedia()
        const { innerWidth } = useWindowWidth()

        return (
          <Code>
            <pre>
              {JSON.stringify(
                { isSmall, isMedium, isLarge, isSSR, innerWidth },
                null,
                2,
              )}
            </pre>
          </Code>
        )
      }
      return <Playground />
    }}
  </ComponentBox>
)

export const MediaQueryLiveExample = () => (
  <ComponentBox scope={{ MediaQuery, useMediaQuery }} hideCode>
    {() => {
      const Playground = () => {
        const [query, updateQuery] = React.useState({
          screen: true,
          not: true,
          min: 'small',
          max: 'large',
        })

        const match1 = useMediaQuery({
          matchOnSSR: true,
          when: query,
        })
        const match2 = useMediaQuery({
          matchOnSSR: true,
          not: true,
          when: query,
        })

        React.useEffect(() => {
          console.log('mediaQuery:', match1, match2)
        }, [match1, match2])

        return (
          <>
            <Button
              onClick={() => {
                updateQuery({
                  ...query,
                  screen: !query.screen,
                })
              }}
              right
            >
              Switch
            </Button>
            <MediaQuery when={query}>
              <Code>when</Code>
            </MediaQuery>
            <MediaQuery not when={query}>
              <Code>not when</Code>
            </MediaQuery>
          </>
        )
      }
      return <Playground />
    }}
  </ComponentBox>
)

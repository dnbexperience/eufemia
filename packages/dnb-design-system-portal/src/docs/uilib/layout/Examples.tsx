import React from 'react'
import styled from '@emotion/styled'
import ComponentBox from '../../../shared/tags/ComponentBox'
import MediaQuery from '@dnb/eufemia/src/shared/MediaQuery'
import {
  Grid,
  Code,
  Button,
  Card,
  Flex,
  H2,
  FormSet,
  FormRow,
  Input,
} from '@dnb/eufemia/src'
import {
  TestElement,
  Field,
  Form,
  FieldBlock,
} from '@dnb/eufemia/src/extensions/forms'
import { defaultBreakpoints } from '@dnb/eufemia/src/shared/MediaQueryUtils'
import { defaultQueries } from '@dnb/eufemia/src/shared/useMedia'
import { Provider, useMedia, useMediaQuery } from '@dnb/eufemia/src/shared'

export const LayoutComponents = () => {
  return (
    <ComponentBox
      scope={{
        Field,
        Form,
      }}
      hideCode
    >
      <Flex.Stack>
        <Form.MainHeading>Profile</Form.MainHeading>

        <Card stack>
          <Form.SubHeading>Name</Form.SubHeading>

          <Field.String label="Fornavn" value="John" />
          <Field.String label="Etternavn" value="Smith" />
        </Card>

        <Card stack>
          <Form.SubHeading>More information</Form.SubHeading>

          <Field.NationalIdentityNumber value="20058512345" />
          <Field.Email value="john@smith.email" />
          <Field.PhoneNumber value="+47 98765432" />
        </Card>
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
      scope={{ colors, TestElement, Field }}
      hideCode
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
      hideCode
      scope={{
        colors,
        TestElement,
        Field,
        defaultBreakpoints,
        defaultQueries,
      }}
      data-visual-test="flex-item-custom-size"
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

export const ResponsiveGridContainer = () => {
  return (
    <ComponentBox hideCode scope={{ TestElement, colors }}>
      <Grid.Container rowGap columnGap>
        <Grid.Item
          span={{
            small: [1, 2],
            medium: [1, 3],
            large: [1, 12],
          }}
          style={colors[0]}
          element={TestElement}
        >
          Item A
        </Grid.Item>

        <Grid.Item
          span={{
            small: [3, 4],
            medium: [4, 6],
            large: [1, 4],
          }}
          style={colors[1]}
          element={TestElement}
        >
          Item B
        </Grid.Item>

        <Grid.Item
          span={{
            small: [2, 3],
            medium: [4, 6],
            large: [5, 8],
          }}
          style={colors[2]}
          element={TestElement}
        >
          Item C
        </Grid.Item>

        <Grid.Item
          span={{
            small: [1, 4],
            medium: [4, 6],
            large: [9, 12],
          }}
          style={colors[3]}
          element={TestElement}
        >
          Item D
        </Grid.Item>
      </Grid.Container>
    </ComponentBox>
  )
}

export const FormSetAlternativeBefore = () => (
  <ComponentBox>
    <FormSet label_direction="vertical">
      <H2 top={0}>Heading</H2>
      <FormRow label="Legend">
        <Input label="Label A" right />
        <Input label="Label B" />
      </FormRow>
    </FormSet>
  </ComponentBox>
)

export const FormSetAlternativeAfter = () => (
  <ComponentBox scope={{ Provider, Form, FieldBlock }}>
    <Provider Input={{ label_direction: 'vertical' }}>
      <Form.Handler>
        <Flex.Stack>
          <H2>Heading</H2>
          <FieldBlock label="Legend">
            <Flex.Horizontal>
              <Input label="Label A" />
              <Input label="Label B" />
            </Flex.Horizontal>
          </FieldBlock>
        </Flex.Stack>
      </Form.Handler>
    </Provider>
  </ComponentBox>
)

export const FormSetAlternativeForms = () => (
  <ComponentBox scope={{ Form, Field, FieldBlock }}>
    <Form.Handler>
      <Flex.Stack>
        <Form.MainHeading>Heading</Form.MainHeading>
        <FieldBlock label="Legend">
          <Flex.Horizontal>
            <Field.String label="Label A" width="medium" />
            <Field.String label="Label B" width="medium" />
          </Flex.Horizontal>
        </FieldBlock>
      </Flex.Stack>
    </Form.Handler>
  </ComponentBox>
)

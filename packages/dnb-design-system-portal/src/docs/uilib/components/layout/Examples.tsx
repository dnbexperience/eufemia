import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Layout, Slider } from '@dnb/eufemia/src'
import {
  TestElement,
  Field,
  FieldBlock,
  Form,
} from '@dnb/eufemia/src/extensions/forms'
import { defaultBreakpoints } from '@dnb/eufemia/src/shared/MediaQueryUtils'
import { defaultQueries } from '@dnb/eufemia/src/shared/useMedia'
import styled from '@emotion/styled'

export const LayoutComponents = () => {
  return (
    <ComponentBox
      scope={{
        Field,
        Form,
      }}
    >
      <Layout.Stack>
        <Form.MainHeading>Profile</Form.MainHeading>

        <Layout.Card stack>
          <Form.SubHeading>Name</Form.SubHeading>

          <Field.String label="Fornavn" value="John" />
          <Field.String label="Etternavn" value="Smith" />
        </Layout.Card>

        <Layout.Card stack>
          <Form.SubHeading>More information</Form.SubHeading>

          <Field.NationalIdentityNumber value="20058512345" />
          <Field.Email value="john@smith.email" />
          <Field.PhoneNumber value="+47 98765432" />
        </Layout.Card>
      </Layout.Stack>
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
      data-visual-test="layout-flex-item-size"
    >
      <Layout.FlexContainer>
        <Layout.FlexItem size={8}>
          <TestElement style={colors[0]}>FlexItem (8)</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem size={4}>
          <TestElement style={colors[1]}>FlexItem (4)</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem size={{ small: 12, medium: 4 }}>
          <TestElement style={colors[2]}>
            FlexItem (small: 8, medium: 4)
          </TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem size={{ small: 12, medium: 8 }}>
          <TestElement style={colors[3]}>
            FlexItem (small: 4, medium: 8)
          </TestElement>
        </Layout.FlexItem>
      </Layout.FlexContainer>
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
      data-visual-test="layout-flex-item-custom-size"
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
          .dnb-layout-flex-container[data-media-key='xsmall']
            .dnb-layout-flex-item--responsive {
            --size: var(--xsmall);
          }
        `

        return (
          <CustomMediaQuery>
            <Layout.FlexContainer
              direction="horizontal"
              sizeCount={4}
              breakpoints={breakpoints}
              queries={queries}
            >
              <Layout.FlexItem size={{ small: 2, medium: 3, large: 1 }}>
                <TestElement style={colors[0]}>FlexItem</TestElement>
              </Layout.FlexItem>
              <Layout.FlexItem size={{ small: 2, medium: 1, large: 2 }}>
                <TestElement style={colors[1]}>FlexItem</TestElement>
              </Layout.FlexItem>
              <Layout.FlexItem
                size={{ xsmall: 4, small: 2, medium: 1, large: 1 }}
              >
                <TestElement style={colors[2]}>FlexItem</TestElement>
              </Layout.FlexItem>
              <Layout.FlexItem
                size={{ xsmall: 4, small: 2, medium: 3, large: 4 }}
              >
                <TestElement style={colors[3]}>FlexItem</TestElement>
              </Layout.FlexItem>
            </Layout.FlexContainer>
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
        <Layout.FlexContainer>
          <Layout.FlexItem size={{ small: 12, large: 'auto' }}>
            <Field.String
              path="/firstName"
              label="First name"
              width="medium"
              minLength={2}
            />
          </Layout.FlexItem>
          <Layout.FlexItem size={{ small: 12, large: 'auto' }}>
            <Field.String
              path="/lastName"
              label="Last name"
              width="medium"
              required
            />
          </Layout.FlexItem>
          <Layout.FlexItem size={{ small: 12, large: 'auto' }}>
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
          </Layout.FlexItem>
        </Layout.FlexContainer>
      </FieldBlock>
    </ComponentBox>
  )
}

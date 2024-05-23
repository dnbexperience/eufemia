import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card, Flex, P } from '@dnb/eufemia/src'
import {
  Field,
  Form,
  TestElement,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export const BooleanExample = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Form.Handler>
        <Flex.Stack>
          <Field.Boolean
            label="Show content"
            variant="buttons"
            path="/toggleValue"
            value={false}
          />
          <Form.Visibility pathTrue="/toggleValue" animate>
            <TestElement>Item 1</TestElement>
            <TestElement>Item 2</TestElement>
          </Form.Visibility>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const PathValue = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Field.Toggle
          label="Show content"
          valueOn="checked"
          valueOff="unchecked"
          variant="buttons"
          path="/toggleValue"
          value="unchecked"
        />
        <Form.Visibility
          visibleWhen={{
            path: '/toggleValue',
            hasValue: 'checked',
          }}
          animate
        >
          <P>This is visible</P>
        </Form.Visibility>
      </Form.Handler>
    </ComponentBox>
  )
}

export const InferData = () => {
  return (
    <ComponentBox>
      {() => {
        const MyComponent = () => {
          const { data } = Form.useData('example-form', {
            toggleValue: false,
          })
          const inferDataFunc = React.useCallback(
            () => data.toggleValue,
            [data.toggleValue],
          )

          return (
            <Form.Handler id="example-form">
              <Flex.Stack>
                <Field.Boolean path="/toggleValue" label="Check me" />
                <Form.Visibility inferData={inferDataFunc} animate>
                  <P>This is visible</P>
                </Form.Visibility>
              </Flex.Stack>
            </Form.Handler>
          )
        }

        return <MyComponent />
      }}
    </ComponentBox>
  )
}

export const BasedOnBooleanTrue = () => {
  return (
    <ComponentBox>
      <Form.Visibility visible={true}>
        <P>This is visible</P>
      </Form.Visibility>
    </ComponentBox>
  )
}

export const BasedOnContext = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{
          toBe: true,
          notToBe: false,
        }}
      >
        <Form.Visibility pathTrue="/toBe">
          <P>This will show, as long as `toBe` is true.</P>
        </Form.Visibility>
        <Form.Visibility pathTrue="/notToBe">
          <P>This will not show until `notToBe` is true.</P>
        </Form.Visibility>
      </Form.Handler>
    </ComponentBox>
  )
}

export const NestedExample = () => {
  return (
    <ComponentBox>
      {() => {
        const filterDataHandler = ({ props }) =>
          !props['data-exclude-field']

        const MyForm = () => {
          return (
            <Form.Handler
              defaultData={{ isVisible: false, mySelection: 'less' }}
            >
              <Flex.Stack>
                <Field.Boolean
                  label="Visible"
                  variant="button"
                  path="/isVisible"
                  data-exclude-field
                />
                <Form.Visibility
                  pathTrue="/isVisible"
                  animate
                  keepInDOM
                  fieldPropsWhenHidden={{ 'data-exclude-field': true }}
                >
                  <Field.Selection
                    label="Choose"
                    variant="radio"
                    path="/mySelection"
                  >
                    <Field.Option value="less" title="Less" />
                    <Field.Option value="more" title="More" />
                  </Field.Selection>

                  <Form.Visibility
                    visibleWhen={{
                      path: '/mySelection',
                      hasValue: 'more',
                    }}
                    animate
                    keepInDOM
                    fieldPropsWhenHidden={{ 'data-exclude-field': true }}
                  >
                    <Field.String
                      label="My String"
                      path="/myString"
                      value="foo"
                    />
                  </Form.Visibility>
                </Form.Visibility>
              </Flex.Stack>
              <Log />
            </Form.Handler>
          )
        }

        const Log = () => {
          const { filterData } = Form.useData()
          console.log(filterData(filterDataHandler))
          return null
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const FilterData = () => {
  return (
    <ComponentBox>
      {() => {
        const filterDataPaths = {
          '/isVisible': false,
          '/mySelection': ({ data }) => data.isVisible,
          '/myString': ({ data }) => {
            return data.isVisible && data.mySelection === 'more'
          },
        }

        const MyForm = () => {
          return (
            <Form.Handler
              defaultData={{
                isVisible: false,
                mySelection: 'less',
                myString: 'foo',
              }}
            >
              <Flex.Stack>
                <Field.Boolean
                  label="Visible"
                  variant="button"
                  path="/isVisible"
                />
                <Form.Visibility visible pathTrue="/isVisible" animate>
                  <Field.Selection
                    label="Choose"
                    variant="radio"
                    path="/mySelection"
                  >
                    <Field.Option value="less" title="Less" />
                    <Field.Option value="more" title="More" />
                  </Field.Selection>

                  <Form.Visibility
                    visibleWhen={{
                      path: '/mySelection',
                      hasValue: 'more',
                    }}
                    animate
                  >
                    <Field.String label="My String" path="/myString" />
                  </Form.Visibility>
                </Form.Visibility>

                <Form.Visibility
                  pathDefined="/myString"
                  filterData={filterDataPaths}
                  animate
                >
                  <Card>
                    <P>
                      Result: <Value.String path="/myString" inline />
                    </P>
                  </Card>
                </Form.Visibility>
              </Flex.Stack>

              <Log />
            </Form.Handler>
          )
        }

        const Log = () => {
          const { filterData } = Form.useData()
          console.log(filterData(filterDataPaths))
          return null
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

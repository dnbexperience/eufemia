import React, { useCallback } from 'react'
import { Field, Form, Iterate, Value } from '../../..'
import { Flex, Section } from '../../../../../components'
import { P, Ul, Li } from '../../../../../elements'

export default {
  title: 'Eufemia/Extensions/Forms/Visibility',
}

const id = 'toggle-example'

export const Toggle = () => {
  const { data } = Form.useData(id, {
    showError: true,
    isVisible: true,
  })

  return (
    <Form.Handler id={id}>
      <Flex.Stack>
        <Field.Boolean label="Error" variant="button" path="/showError" />
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
        />
        {/* <Field.String
          path="/foo"
          label="Label"
          value={data.showError ? 'error' : 'valid'}
          pattern="^valid$"
          validateInitially
        /> */}
        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.String
            path="/foo"
            label="Label"
            value={data.showError ? 'error' : 'valid'}
            pattern="^valid$"
            validateInitially
          />
        </Form.Visibility>
        <span>bottom</span>
      </Flex.Stack>
    </Form.Handler>
  )
}

export const RadioDisabled = () => {
  return (
    <Form.Handler id={id}>
      <Flex.Stack>
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
          defaultValue={false}
        />
        <Form.Visibility pathTrue="/isVisible" animate keepInDOM>
          <Field.Selection
            label="Radio"
            variant="radio"
            path="/myValue"
            value="foo"
          >
            <Field.Option value="foo" title="Foo" />
            <Field.Option value="bar" title="Bar" />
          </Field.Selection>
        </Form.Visibility>
        <span>bottom</span>
      </Flex.Stack>
    </Form.Handler>
  )
}

export const filterDataHandler = ({ props }) => {
  return !props['data-exclude-field']
}

const OutputWithoutId = () => {
  const { data, filterData } = Form.useData<{
    myValue: string
  }>()
  return (
    <Section backgroundColor="sand-yellow" innerSpace>
      <pre>Filtered: {JSON.stringify(filterData(filterDataHandler))}</pre>
      <pre>All data: {JSON.stringify(data)}</pre>
    </Section>
  )
}

export const FilterData = () => {
  const { data, filterData } = Form.useData<{
    myValue: string
  }>('my-form')

  const OutputWithId = useCallback(() => {
    return (
      <Section backgroundColor="sand-yellow" innerSpace>
        <pre>
          Filtered: {JSON.stringify(filterData(filterDataHandler))}
        </pre>
        <pre>All data: {JSON.stringify(data)}</pre>
      </Section>
    )
  }, [data, filterData])

  return (
    <Form.Handler id="my-form">
      <Flex.Stack>
        <Field.Boolean
          label="Toggle visible"
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
            path="/myValue"
            value="less"
          >
            <Field.Option value="less" title="Less" />
            <Field.Option value="more" title="More" />
          </Field.Selection>

          <Form.Visibility
            visibleWhen={{ path: '/myValue', hasValue: 'more' }}
            animate
            keepInDOM
            fieldPropsWhenHidden={{ 'data-exclude-field': true }}
          >
            <Field.String label="My String" path="/myString" value="foo" />
          </Form.Visibility>
        </Form.Visibility>

        <OutputWithId />
        <OutputWithoutId />
      </Flex.Stack>
    </Form.Handler>
  )
}

export const KeepInDOM = () => {
  const { data } = Form.useData(id, {
    showError: true,
    isVisible: true,
  })

  return (
    <Form.Handler id={id}>
      <Flex.Stack>
        <Field.Boolean label="Error" variant="button" path="/showError" />
        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
        />
        <Form.Visibility pathTrue="/isVisible" keepInDOM>
          <Field.String
            path="/foo"
            label="Label"
            value={data.showError ? 'error' : 'valid'}
            pattern="^valid$"
            validateInitially
          />
        </Form.Visibility>
        <span>bottom</span>
      </Flex.Stack>
    </Form.Handler>
  )
}

export const wrappingVisibilityInFragmentAllVisible = () => {
  return (
    <Form.Handler
      id={'wrappingVisibilityInFragmentAllVisible'}
      data={{
        visible: true,
      }}
    >
      <Form.Card>
        <Form.SubHeading>Test heading</Form.SubHeading>
        <>
          <Form.Visibility
            visibleWhen={{ path: '/visible', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
        </>
        <>
          <Form.Visibility
            visibleWhen={{ path: '/visible', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
        </>
      </Form.Card>
    </Form.Handler>
  )
}

export const wrappingVisibilityInFragmentAllHidden = () => {
  return (
    <Form.Handler
      id={'wrappingVisibilityInFragmentAllHidden'}
      data={{
        visible: false,
      }}
    >
      <Form.Card>
        <Form.SubHeading>Test heading</Form.SubHeading>
        <>
          <Form.Visibility
            visibleWhen={{ path: '/visible', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
        </>
        <>
          <Form.Visibility
            visibleWhen={{ path: '/visible', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
        </>
      </Form.Card>
    </Form.Handler>
  )
}

export const wrappingVisibilityInFragments2Hidden = () => {
  return (
    <Form.Handler
      id={'wrappingVisibilityInFragments2Hidden'}
      data={{
        visible1: true,
        visible2: false,
        visible3: true,
        visible4: false,
        visible5: true,
      }}
    >
      <Form.Card>
        <Form.SubHeading>Test heading</Form.SubHeading>
        <>
          <Form.Visibility
            visibleWhen={{ path: '/visible1', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible2', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
        </>
        <>
          <Form.Visibility
            visibleWhen={{ path: '/visible3', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible4', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible5', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
        </>
      </Form.Card>
    </Form.Handler>
  )
}

export const wrappingVisibilityInFragments3Hidden = () => {
  return (
    <Form.Handler
      id={'wrappingVisibilityInFragments3Hidden'}
      data={{
        visible1: false,
        visible2: true,
        visible3: false,
        visible4: true,
        visible5: false,
      }}
    >
      <Form.Card>
        <Form.SubHeading>Test heading</Form.SubHeading>
        <>
          <Form.Visibility
            visibleWhen={{ path: '/visible1', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible2', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
        </>
        <>
          <Form.Visibility
            visibleWhen={{ path: '/visible3', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible4', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
          <Form.Visibility
            visibleWhen={{ path: '/visible5', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
        </>
      </Form.Card>
    </Form.Handler>
  )
}

export const wrappingVisibilityInFragment = () => {
  return (
    <Form.Handler
      id={'wrappingVisibilityInFragment'}
      data={{
        visible: false,
        visible2: false,
        visible3: true,
        visible4: false,
        visible5: false,
      }}
    >
      <Form.Card>
        <>
          <Form.SubHeading>Test heading</Form.SubHeading>
          <>
            <Form.Visibility
              visibleWhen={{ path: '/visible', hasValue: true }}
            >
              <P>Text</P>
              <P>Text</P>
              <P>Text</P>
              <P>Text</P>
              <Ul>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
              </Ul>
            </Form.Visibility>
            <Form.Visibility
              visibleWhen={{ path: '/visible2', hasValue: true }}
            >
              <P>Text</P>
              <P>Text</P>
              <P>Text</P>
              <P>Text</P>
              <P>Text</P>
              <P>Text</P>
              <Ul>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
              </Ul>
            </Form.Visibility>
            <Form.Visibility
              visibleWhen={{ path: '/visible3', hasValue: true }}
            >
              <P>Text</P>
              <P>Text</P>
              <Ul>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
              </Ul>
            </Form.Visibility>
            <Form.Visibility
              visibleWhen={{ path: '/visible4', hasValue: true }}
            >
              <P>Text</P>

              <Ul>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
              </Ul>
            </Form.Visibility>
            <Form.Visibility
              visibleWhen={{ path: '/visible5', hasValue: true }}
            >
              <P>Text</P>
              <P>Text</P>
              <P>Text</P>
              <Ul>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
                <Li>Li</Li>
              </Ul>
            </Form.Visibility>
          </>
          <Field.Boolean
            variant="buttons"
            path="/testPath"
            defaultValue={false}
            label="Yes no question"
          />
          <P>Text that should appear underneath</P>
        </>
      </Form.Card>
    </Form.Handler>
  )
}

export const wrappingSingleVisibilityInRootFragment = () => {
  return (
    <Form.Handler
      id="test"
      data={{
        visible1: false,
      }}
    >
      <Form.Card>
        <>
          <Form.Visibility
            visibleWhen={{ path: '/visible1', hasValue: true }}
          >
            <P>text</P>
          </Form.Visibility>
        </>
      </Form.Card>
    </Form.Handler>
  )
}

export function VisibilityOnValidation() {
  return (
    <Form.Handler>
      <Form.Card>
        <Field.Name.First path="/foo" required />

        <Form.Visibility
          visibleWhen={{
            path: '/foo',
            isValid: true,
          }}
          animate
        >
          <Value.Name.First path="/foo" />
        </Form.Visibility>
      </Form.Card>
    </Form.Handler>
  )
}

export function VisibilityInIterate() {
  return (
    <Form.Handler
      defaultData={{
        // pushContainerItems: [
        //   {
        //     goHide: undefined,
        //   },
        // ],
        myArray: [
          {
            goHide: undefined,
          },
        ],
      }}
    >
      {/* <Iterate.Array path="/myArray">
        <Form.Visibility withinIterate pathDefined="/goHide">
          <Field.String label="I'm visible when /iExist is undefined via pathUndefined! But /iExist is defined so I should not be visible?" />
        </Form.Visibility>
      </Iterate.Array> */}

      <Iterate.PushContainer
        top
        path="/myArray"
        // isolatedData={{ goHide: true }}
        defaultData={{ goHide: undefined }}
      >
        {/* <Field.String itemPath="/iExist" label="My path is /iExist" /> */}
        <Form.Visibility withinIterate pathDefined="/goHide">
          <Field.String label="I'm visible when /iExist is undefined via pathUndefined! But /iExist is defined so I should not be visible?" />
        </Form.Visibility>
        {/* We should show a field here, but it's not shown: */}
        {/* <Form.Visibility pathDefined="/iExist">
          <Field.String label="I'm visible when /iExist is defined via pathDefined! And /iExist is defined so I should be visible?" />
        </Form.Visibility> */}
        {/* And the next Visibility is seemingly not triggered, probably
        because /goHide is not defined, and visibleWhen only works on
        defined paths (which makes sense). */}
        {/* <Form.Visibility
          visibleWhen={{
            // path: '/goHide',
            itemPath: '/goHide',
            hasValue: (val) => {
              console.log(
                "🌟 this is never logged? Can't use visibleWhen to check a undefined item path."
              )
              return val === undefined
            },
          }}
        >
          <Field.String label="I'm visible when /goHide is undefined via visibleWhen! :( ..." />
        </Form.Visibility> */}
      </Iterate.PushContainer>
    </Form.Handler>
  )
}

import { Field, Form } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/MultiSelection',
}

export function Default() {
  const data = [
    { value: 'oslo', title: 'Oslo', text: 'Capital of Norway' },
    { value: 'stockholm', title: 'Stockholm', text: 'Capital of Sweden' },
    {
      value: 'copenhagen',
      title: 'Copenhagen',
      text: 'Capital of Denmark',
    },
    { value: 'helsinki', title: 'Helsinki', text: 'Capital of Finland' },
    { value: 'reykjavik', title: 'Reykjavik', text: 'Capital of Iceland' },
  ]

  return (
    <Form.Card>
      <Field.MultiSelection
        label="Select one or more cities"
        data={data}
        showSearchField
        showSelectedTags
      />
    </Form.Card>
  )
}

export function WithoutSearch() {
  const data = [
    { value: 'option1', title: 'Option 1', text: 'First option' },
    { value: 'option2', title: 'Option 2', text: 'Second option' },
    { value: 'option3', title: 'Option 3', text: 'Third option' },
  ]

  return (
    <Form.Card>
      <Field.MultiSelection
        label="Select options"
        data={data}
        showSearchField={false}
        showSelectedTags
      />
    </Form.Card>
  )
}

export function WithDisabledItems() {
  const data = [
    {
      value: 'nodejs',
      title: 'Node.js',
      text: 'JavaScript runtime',
    },
    {
      value: 'python',
      title: 'Python',
      text: 'General purpose language',
      disabled: true,
    },
    {
      value: 'rust',
      title: 'Rust',
      text: 'Systems programming language',
    },
    {
      value: 'golang',
      title: 'Go',
      text: 'Compiled language',
      disabled: true,
    },
    {
      value: 'java',
      title: 'Java',
      text: 'Enterprise language',
    },
  ]

  return (
    <Form.Card>
      <Field.MultiSelection
        label="Select available languages"
        data={data}
        showSearchField
        showSelectedTags
      />
    </Form.Card>
  )
}

export function WithoutSelectedItemsTags() {
  const data = [
    { value: 'item1', title: 'Item 1', text: 'Description for item 1' },
    { value: 'item2', title: 'Item 2', text: 'Description for item 2' },
    { value: 'item3', title: 'Item 3', text: 'Description for item 3' },
  ]

  return (
    <Form.Card>
      <Field.MultiSelection
        label="Select items"
        data={data}
        showSearchField
        showSelectedTags={false}
      />
    </Form.Card>
  )
}

export function Disabled() {
  const data = [
    { value: 'option1', title: 'Option 1' },
    { value: 'option2', title: 'Option 2' },
    { value: 'option3', title: 'Option 3' },
  ]

  return (
    <Form.Card>
      <Field.MultiSelection
        label="Disabled field"
        data={data}
        disabled
        showSearchField
        showSelectedTags
      />
    </Form.Card>
  )
}

export function WithDataPath() {
  return (
    <Form.Handler
      data={{
        cities: [
          { value: 'oslo', title: 'Oslo', text: 'Capital of Norway' },
          {
            value: 'stockholm',
            title: 'Stockholm',
            text: 'Capital of Sweden',
          },
          {
            value: 'copenhagen',
            title: 'Copenhagen',
            text: 'Capital of Denmark',
          },
          {
            value: 'helsinki',
            title: 'Helsinki',
            text: 'Capital of Finland',
          },
        ],
      }}
    >
      <Form.Card>
        <Field.MultiSelection
          label="Select cities from context"
          dataPath="/cities"
          showSearchField
          showSelectedTags
        />
      </Form.Card>
    </Form.Handler>
  )
}

export function WithMinItems() {
  const data = [
    { value: 'option1', title: 'Option 1' },
    { value: 'option2', title: 'Option 2' },
    { value: 'option3', title: 'Option 3' },
    { value: 'option4', title: 'Option 4' },
  ]

  return (
    <Form.Handler>
      <Form.Card>
        <Field.MultiSelection
          label="Select items"
          path="/items"
          minItems={2}
          data={data}
          showSearchField
          showSelectedTags
        />
        <Form.SubmitButton />
      </Form.Card>
    </Form.Handler>
  )
}

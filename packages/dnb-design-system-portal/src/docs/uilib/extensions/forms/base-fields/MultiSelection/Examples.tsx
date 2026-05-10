import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form } from '@dnb/eufemia/src/extensions/forms'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { NumberFormat } from '@dnb/eufemia/src'

export const Basic = () => (
  <ComponentBox>
    {() => {
      const cities = [
        {
          value: 'oslo',
          title: 'Oslo',
          description: 'Capital of Norway',
        },
        {
          value: 'stockholm',
          title: 'Stockholm',
          description: 'Capital of Sweden',
        },
        {
          value: 'copenhagen',
          title: 'Copenhagen',
          description: 'Capital of Denmark',
        },
        {
          value: 'helsinki',
          title: 'Helsinki',
          description: 'Capital of Finland',
        },
        {
          value: 'reykjavik',
          title: 'Reykjavik',
          description: 'Capital of Iceland',
        },
      ]
      return <Field.MultiSelection label="Select cities" data={cities} />
    }}
  </ComponentBox>
)

export const WithSelectAll = () => (
  <ComponentBox>
    {() => {
      const cities = [
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
        {
          value: 'reykjavik',
          title: 'Reykjavik',
          text: 'Capital of Iceland',
        },
      ]
      return (
        <Field.MultiSelection
          label="Select cities"
          data={cities}
          showSelectAll
          width="medium"
        />
      )
    }}
  </ComponentBox>
)

const listOfFruits = [
  {
    value: 'apple',
    title: 'Apple',
    text: 1.5,
    description: 'Red fruit',
  },
  {
    value: 'banana',
    title: 'Banana',
    text: 0.75,
    description: 'Yellow fruit',
  },
  {
    value: 'orange',
    title: 'Orange',
    text: 1.25,
    description: 'Orange fruit',
  },
  {
    value: 'grape',
    title: 'Grape',
    text: 2.0,
    description: 'Small green fruit',
  },
  {
    value: 'strawberry',
    title: 'Strawberry',
    text: 2.5,
    description: 'Red berry',
  },
  {
    value: 'blueberry',
    title: 'Blueberry',
    text: 3.0,
    description: 'Small blue fruit',
  },
  {
    value: 'raspberry',
    title: 'Raspberry',
    text: 3.5,
    description: 'Red berry',
  },
  {
    value: 'blackberry',
    title: 'Blackberry',
    text: 3.5,
    description: 'Dark berry',
  },
  {
    value: 'watermelon',
    title: 'Watermelon',
    text: 5.0,
    description: 'Large red fruit',
  },
  {
    value: 'mango',
    title: 'Mango',
    text: 2.75,
    description: 'Tropical fruit',
  },
  {
    value: 'pineapple',
    title: 'Pineapple',
    text: 3.5,
    description: 'Spiky tropical',
  },
  {
    value: 'papaya',
    title: 'Papaya',
    text: 2.25,
    description: 'Orange tropical',
  },
  {
    value: 'kiwi',
    title: 'Kiwi',
    text: 1.75,
    description: 'Green fruit',
  },
  {
    value: 'peach',
    title: 'Peach',
    text: 1.5,
    description: 'Fuzzy fruit',
  },
  {
    value: 'plum',
    title: 'Plum',
    text: 1.25,
    description: 'Purple fruit',
  },
  {
    value: 'cherry',
    title: 'Cherry',
    text: 4.0,
    description: 'Small red fruit',
  },
  {
    value: 'lemon',
    title: 'Lemon',
    text: 0.8,
    description: 'Yellow citrus',
  },
  {
    value: 'lime',
    title: 'Lime',
    text: 0.9,
    description: 'Green citrus',
  },
  {
    value: 'grapefruit',
    title: 'Grapefruit',
    text: 1.5,
    description: 'Large citrus',
  },
  {
    value: 'avocado',
    title: 'Avocado',
    text: 2.5,
    description: 'Green creamy',
  },
]
const fruits = listOfFruits.map((fruit) => ({
  ...fruit,
  text: <NumberFormat.Currency value={fruit.text} />,
}))
export const WithSearch = () => (
  <ComponentBox scope={{ fruits }}>
    {() => {
      return (
        <Field.MultiSelection
          label="Select fruits"
          data={fruits}
          showSearchField
        />
      )
    }}
  </ComponentBox>
)

export const WithConfirmCancel = () => (
  <ComponentBox>
    {() => {
      const cities = [
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
        {
          value: 'reykjavik',
          title: 'Reykjavik',
          text: 'Capital of Iceland',
        },
      ]
      return (
        <Field.MultiSelection
          label="Select cities"
          data={cities}
          showSearchField
          showSelectAll
          showConfirmButton
        />
      )
    }}
  </ComponentBox>
)

export const WithSelectedItems = () => (
  <ComponentBox>
    {() => {
      const cities = [
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
        {
          value: 'reykjavik',
          title: 'Reykjavik',
          text: 'Capital of Iceland',
        },
      ]
      return (
        <Field.MultiSelection
          label="Select cities"
          data={cities}
          value={['stockholm']}
          showSelectedTags
        />
      )
    }}
  </ComponentBox>
)

export const WithNestedItems = () => (
  <ComponentBox>
    <Field.MultiSelection
      label="Select regions"
      showSelectAll
      data={[
        {
          value: 'scandinavia',
          title: 'Scandinavia',
          children: [
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
          ],
        },
        {
          value: 'nordic',
          title: 'Other Nordic',
          children: [
            {
              value: 'helsinki',
              title: 'Helsinki',
              text: 'Capital of Finland',
            },
            {
              value: 'reykjavik',
              title: 'Reykjavik',
              text: 'Capital of Iceland',
            },
          ],
        },
      ]}
    />
  </ComponentBox>
)

export const WithDisabledItems = () => (
  <ComponentBox>
    <Field.MultiSelection
      label="Select available languages"
      data={[
        { value: 'nodejs', title: 'Node.js', text: 'JavaScript runtime' },
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
        { value: 'java', title: 'Java', text: 'Enterprise language' },
      ]}
    />
  </ComponentBox>
)

export const WithDataPath = () => (
  <ComponentBox>
    <Form.Handler
      data={{
        colors: [
          { value: 'red', title: 'Red', text: 'Primary color' },
          { value: 'green', title: 'Green', text: 'Secondary color' },
          { value: 'blue', title: 'Blue', text: 'Tertiary color' },
          { value: 'yellow', title: 'Yellow', text: 'Accent color' },
        ],
      }}
    >
      <Field.MultiSelection
        label="Select colors"
        dataPath="/colors"
        value={['red']}
        help={{
          title: 'Help text',
          content: 'Additional information about this field',
        }}
      />
    </Form.Handler>
  </ComponentBox>
)

export const Disabled = () => (
  <ComponentBox>
    {() => {
      const cities = [
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
        {
          value: 'reykjavik',
          title: 'Reykjavik',
          text: 'Capital of Iceland',
        },
      ]
      return (
        <Field.MultiSelection
          label="Disabled field"
          disabled
          data={cities}
        />
      )
    }}
  </ComponentBox>
)

export const WithError = () => (
  <ComponentBox>
    {() => {
      const cities = [
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
        {
          value: 'reykjavik',
          title: 'Reykjavik',
          text: 'Capital of Iceland',
        },
      ]
      return (
        <Form.Handler>
          <Form.Card>
            <Field.MultiSelection
              label="Select cities"
              path="/cities"
              required
              minItems={2}
              data={cities}
              showSearchField
              showSelectedTags
            />
            <Form.SubmitButton />
          </Form.Card>
        </Form.Handler>
      )
    }}
  </ComponentBox>
)

export const WithManySelectedItems = () => (
  <ComponentBox>
    {() => {
      const items = Array.from({ length: 30 }, (_, i) => ({
        value: `item${i + 1}`,
        title: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`,
      }))
      return (
        <Field.MultiSelection
          label="Select items"
          data={items}
          value={items.slice(0, 25).map((item) => item.value)}
          showSelectedTags
          showSelectAll
          showSearchField
        />
      )
    }}
  </ComponentBox>
)

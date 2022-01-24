/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import {
  funds as Funds,
  stocks as Stocks,
  equities_and_mutual_funds as Equities,
  send as Send,
  einvoice as EInvoice,
  ainvoice as AInvoice,
  digipost as DigiPost,
} from '@dnb/eufemia/src/icons'

export const TagDefault = () => (
  <ComponentBox data-visual-test="tag-default">
    {() => /* jsx */ `
<Tag.Group label="Payment types:">
  <Tag right="x-small">Digipost</Tag>
  <Tag right="x-small">AvtaleGiro</Tag>
</Tag.Group>
`}
  </ComponentBox>
)

export const TagWithIcon = () => (
  <ComponentBox
    data-visual-test="tag-icon"
    scope={{ Funds, Stocks, Equities }}
  >
    {() => /* jsx */ `
<Tag.Group label="Investments:">
  <Tag icon={Funds} text="Funds" right="x-small"/>
  <Tag icon={Stocks} text="Stocks" right="x-small"/>
  <Tag icon={Equities} text="Equities" right="x-small"/>
</Tag.Group>
`}
  </ComponentBox>
)

export const TagClickable = () => (
  <ComponentBox data-visual-test="tag-clickable" scope={{ Send }}>
    {() => /* jsx */ `
<Tag icon={Send} text="Send" onClick={() => { console.log("I was sent!") }}/>
`}
  </ComponentBox>
)

export const TagGroupWithData = () => (
  <ComponentBox
    data-visual-test="tag-group-with-data"
    scope={{ EInvoice, AInvoice, DigiPost }}
  >
    {() => /* jsx */ `
<Tag.Group label="Payment types:" data={[
  {
    icon: AInvoice,
    text: 'AvtaleGiro',
    right: 'x-small',
  },
  {
    icon: EInvoice,
    text: 'eFaktura',
    right: 'x-small',
  },
  {
    icon: DigiPost,
    text: 'DigiPost',
    right: 'x-small',
  },
]}/>
`}
  </ComponentBox>
)

export const TagRemovable = () => (
  <ComponentBox
    data-visual-test="tag-removable">
    {() => /* jsx */ `
<Tag.Group label="Files:" data={[
  {
    text: 'Eufemia.tsx',
    onDelete: () => { console.log("I was deleted!") },
  },
]}/>
`}
  </ComponentBox>
)

export const TagMultipleRemovable = () => (
  <ComponentBox data-visual-test="tag-removable-list" useRender>
    {() => /* jsx */ `
const Genres = () => {
  const [tagData, setTagData] = React.useState([
    { key: 0, text: 'Action' },
    { key: 1, text: 'Comedy' },
    { key: 2, text: 'Drama' },
    { key: 3, text: 'Horror' },
    { key: 4, text: 'Fantasy' },
  ]);

  const handleDelete = (tagToDelete) => () => {
    setTagData((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
  };
  
  return (
    <Tag.Group label="Genres:">
    {
      tagData.map((tag) => {
        return (
            <Tag
              key={tag.key}
              text={tag.text}
              onDelete={handleDelete(tag)}
              space={{right: 'x-small'}}
            />
        );
      })
    }
    </Tag.Group>
  )
}
render(<Genres />)
	`}
  </ComponentBox>
)
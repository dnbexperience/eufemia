import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{n,r,t as i}from"./einvoice-Bs3yeLfQ.js";import{t as a}from"./ComponentBox-geTEYZ7b.js";import{Rr as o}from"./index-CMgyXmp3.js";e();var s=t(),c=()=>(0,s.jsx)(a,{"data-visual-test":`tag-interactable`,children:`<Tag.Group label="Interactable tags">
  <Tag
    data-visual-test="tag-clickable"
    variant="clickable"
    onClick={() => 'click'}
  >
    Clickable
  </Tag>
  <Tag
    data-visual-test="tag-addable"
    variant="addable"
    onClick={() => 'click'}
  >
    Addable
  </Tag>
  <Tag
    data-visual-test="tag-removable"
    variant="removable"
    onClick={() => 'click'}
  >
    Removable
  </Tag>
</Tag.Group>
`}),l=()=>(0,s.jsx)(a,{hideCode:!0,"data-visual-test":`tag-default`,children:`<Tag.Group label="Payment types">
  <Tag>Digipost</Tag>
  <Tag>AvtaleGiro</Tag>
</Tag.Group>
`}),u=()=>(0,s.jsx)(a,{hideCode:!0,"data-visual-test":`tag-icon`,scope:{EInvoice:i,AInvoice:r,DigiPost:n},children:`<Tag.Group label="Betalingstyper">
  <Tag icon={AInvoice} text="AvtaleGiro" />
  <Tag icon={EInvoice} text="eFaktura" />
  <Tag icon={DigiPost} text="DigiPost" />
</Tag.Group>
`}),d=()=>(0,s.jsx)(a,{"data-visual-test":`tag-inline`,children:`
Text{' '}
<Tag.Group label="Inline">
  <Tag text="First" /> between
  <Tag text="Second" />
  <Tag text="Third" />
</Tag.Group>{' '}
Text

`}),f=()=>(0,s.jsx)(a,{"data-visual-test":`tag-removable-list`,noInline:!0,children:`const Genres = () => {
  const [tagsAdded, setTagsAdded] = React.useState([
    {
      key: 0,
      text: 'Action',
    },
    {
      key: 1,
      text: 'Comedy',
    },
    {
      key: 2,
      text: 'Drama',
    },
    {
      key: 3,
      text: 'Horror',
    },
  ])
  const [tagsRemoved, setTagsRemoved] = React.useState([
    {
      key: 4,
      text: 'Fantasy',
    },
  ])
  const handleRemove = React.useCallback(
    (tagToRemove) => () => {
      setTagsAdded(tagsAdded.filter((tag) => tag.key !== tagToRemove.key))
      setTagsRemoved([...tagsRemoved, tagToRemove])
    },
    [tagsAdded, tagsRemoved]
  )
  const handleAdd = React.useCallback(
    (tagToAdd) => () => {
      setTagsAdded([...tagsAdded, tagToAdd])
      setTagsRemoved(tagsRemoved.filter((tag) => tag.key !== tagToAdd.key))
    },
    [tagsAdded, tagsRemoved]
  )
  return (
    <Flex.Stack>
      <FieldBlock label="Selected">
        <Tag.Group label="Genres Selected">
          {tagsAdded.map((tag) => {
            return (
              <Tag
                key={tag.key}
                text={tag.text}
                variant="removable"
                onClick={handleRemove(tag)}
              />
            )
          })}
        </Tag.Group>
      </FieldBlock>
      <FieldBlock label="Removed">
        <Tag.Group label="Genres Available">
          {tagsRemoved.map((tag) => {
            return (
              <Tag
                key={tag.key}
                text={tag.text}
                variant="addable"
                onClick={handleAdd(tag)}
              />
            )
          })}
        </Tag.Group>
      </FieldBlock>
    </Flex.Stack>
  )
}
render(<Genres />)
`}),p=()=>(0,s.jsx)(a,{"data-visual-test":`tag-skeleton`,children:`<Tag.Group label="Skeletons">
  <Tag skeleton text="Skeleton" />
  <Tag skeleton text="Skeleton" />
  <Tag skeleton text="Skeleton" />
</Tag.Group>
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...o(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Tag`}),`
`,(0,s.jsx)(t.p,{children:`There are three interactive tag variants:`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`clickable`}),` (can also accept a custom icon as it does not have one of its own)`]}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.code,{children:`addable`})}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`removable`}),` (also triggers `,(0,s.jsx)(t.code,{children:`onClick`}),` when pressing the `,(0,s.jsx)(t.code,{children:`Delete`}),` or `,(0,s.jsx)(t.code,{children:`Backspace`}),` keyboard key (`,(0,s.jsx)(t.code,{children:`keyup`}),` event), can be disabled with the `,(0,s.jsx)(t.code,{children:`omitOnKeyUpDeleteEvent`}),` property)`]}),`
`]}),`
`,(0,s.jsxs)(t.p,{children:[`We require `,(0,s.jsx)(t.code,{children:`<Tag>`}),`-components to be wrapped by a `,(0,s.jsx)(t.code,{children:`<Tag.Group>`}),`-component. The required `,(0,s.jsx)(t.code,{children:`label`}),`-property in `,(0,s.jsx)(t.code,{children:`<Tag.Group>`}),` will ensure the correct use of accessibility for screen readers.`]}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Non-interactive tag`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:`Not interactable`}),`
`,(0,s.jsx)(t.li,{children:`Can have icon`}),`
`]}),`
`,(0,s.jsx)(t.p,{children:`Non-interactable tags are simply made by skipping all callback properties, and are the only type that can have an icon.`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Non-interactive tag with icon`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h2,{children:`Usage examples`}),`
`,(0,s.jsx)(t.h3,{children:`Multiple removable tags`}),`
`,(0,s.jsxs)(t.p,{children:[`Removable tags can for example be used in filter lists. This is a simple example on how to implement a filter list using removable `,(0,s.jsx)(t.code,{children:`Tags`}),`.`]}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Tag used inside text`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Tag used as skeleton`}),`
`,(0,s.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(m,{...e})}):m(e)}export{h as default};
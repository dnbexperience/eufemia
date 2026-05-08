import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{n as t,r as n,t as r}from"./einvoice-Co65aOZ6.js";import{t as i}from"./ComponentBox-C64JNWnl.js";import{Lr as a}from"./index-2AO2Cu5K.js";var o=e(),s=()=>(0,o.jsx)(i,{"data-visual-test":`tag-interactable`,children:`<Tag.Group label="Interactable tags">
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
`}),c=()=>(0,o.jsx)(i,{hideCode:!0,"data-visual-test":`tag-default`,children:`<Tag.Group label="Payment types">
  <Tag>Digipost</Tag>
  <Tag>AvtaleGiro</Tag>
</Tag.Group>
`}),l=()=>(0,o.jsx)(i,{hideCode:!0,"data-visual-test":`tag-icon`,scope:{EInvoice:r,AInvoice:n,DigiPost:t},children:`<Tag.Group label="Betalingstyper">
  <Tag icon={AInvoice} text="AvtaleGiro" />
  <Tag icon={EInvoice} text="eFaktura" />
  <Tag icon={DigiPost} text="DigiPost" />
</Tag.Group>
`}),u=()=>(0,o.jsx)(i,{"data-visual-test":`tag-inline`,children:`
Text{' '}
<Tag.Group label="Inline">
  <Tag text="First" /> between
  <Tag text="Second" />
  <Tag text="Third" />
</Tag.Group>{' '}
Text

`}),d=()=>(0,o.jsx)(i,{"data-visual-test":`tag-removable-list`,noInline:!0,children:`const Genres = () => {
  const [tagsAdded, setTagsAdded] = useState([
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
  const [tagsRemoved, setTagsRemoved] = useState([
    {
      key: 4,
      text: 'Fantasy',
    },
  ])
  const handleRemove = useCallback(
    (tagToRemove) => () => {
      setTagsAdded(tagsAdded.filter((tag) => tag.key !== tagToRemove.key))
      setTagsRemoved([...tagsRemoved, tagToRemove])
    },
    [tagsAdded, tagsRemoved]
  )
  const handleAdd = useCallback(
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
`}),f=()=>(0,o.jsx)(i,{"data-visual-test":`tag-skeleton`,children:`<Tag.Group label="Skeletons">
  <Tag skeleton text="Skeleton" />
  <Tag skeleton text="Skeleton" />
  <Tag skeleton text="Skeleton" />
</Tag.Group>
`});function p(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...a(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Tag`}),`
`,(0,o.jsx)(t.p,{children:`There are three interactive tag variants:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`clickable`}),` (can also accept a custom icon as it does not have one of its own)`]}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`addable`})}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`removable`}),` (also triggers `,(0,o.jsx)(t.code,{children:`onClick`}),` when pressing the `,(0,o.jsx)(t.code,{children:`Delete`}),` or `,(0,o.jsx)(t.code,{children:`Backspace`}),` keyboard key (`,(0,o.jsx)(t.code,{children:`keyup`}),` event), can be disabled with the `,(0,o.jsx)(t.code,{children:`omitOnKeyUpDeleteEvent`}),` property)`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`We require `,(0,o.jsx)(t.code,{children:`<Tag>`}),`-components to be wrapped by a `,(0,o.jsx)(t.code,{children:`<Tag.Group>`}),`-component. The required `,(0,o.jsx)(t.code,{children:`label`}),`-property in `,(0,o.jsx)(t.code,{children:`<Tag.Group>`}),` will ensure the correct use of accessibility for screen readers.`]}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Non-interactive tag`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Not interactable`}),`
`,(0,o.jsx)(t.li,{children:`Can have icon`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:`Non-interactable tags are simply made by skipping all callback properties, and are the only type that can have an icon.`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Non-interactive tag with icon`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h2,{children:`Usage examples`}),`
`,(0,o.jsx)(t.h3,{children:`Multiple removable tags`}),`
`,(0,o.jsxs)(t.p,{children:[`Removable tags can for example be used in filter lists. This is a simple example on how to implement a filter list using removable `,(0,o.jsx)(t.code,{children:`Tags`}),`.`]}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Tag used inside text`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Tag used as skeleton`}),`
`,(0,o.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}export{m as default};
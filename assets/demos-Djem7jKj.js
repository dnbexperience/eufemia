import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{n,r,t as i}from"./einvoice-BvIIYT4t.js";import{s as a}from"./ToggleButton-DM984GyO.js";import{ft as o,tt as s}from"./forms-CFi5-4x5.js";import{U as c}from"./index-kfZVC31v.js";import{t as l}from"./ComponentBox-qLaLt9T0.js";var u=e(t()),d=()=>(0,u.jsx)(l,{"data-visual-test":`tag-interactable`,stableName:`TagInteractable`,sourceImports:[`import { useCallback, useState } from 'react'`,`import { einvoice as EInvoice, ainvoice as AInvoice, digipost as DigiPost } from '@dnb/eufemia/icons'`,`import { Flex, Tag } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Tag:o},children:`<Tag.Group label="Interactable tags">
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
`}),f=()=>(0,u.jsx)(l,{hideCode:!0,"data-visual-test":`tag-default`,stableName:`TagDefault`,sourceImports:[`import { useCallback, useState } from 'react'`,`import { einvoice as EInvoice, ainvoice as AInvoice, digipost as DigiPost } from '@dnb/eufemia/icons'`,`import { Flex, Tag } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Tag:o},children:`<Tag.Group label="Payment types">
  <Tag>Digipost</Tag>
  <Tag>AvtaleGiro</Tag>
</Tag.Group>
`}),p=()=>(0,u.jsx)(l,{hideCode:!0,"data-visual-test":`tag-icon`,scope:{EInvoice:i,AInvoice:r,DigiPost:n},stableName:`TagWithIcon`,sourceImports:[`import { useCallback, useState } from 'react'`,`import { einvoice as EInvoice, ainvoice as AInvoice, digipost as DigiPost } from '@dnb/eufemia/icons'`,`import { Flex, Tag } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Tag:o},children:`<Tag.Group label="Betalingstyper">
  <Tag icon={AInvoice} text="AvtaleGiro" />
  <Tag icon={EInvoice} text="eFaktura" />
  <Tag icon={DigiPost} text="DigiPost" />
</Tag.Group>
`}),m=()=>(0,u.jsx)(l,{"data-visual-test":`tag-inline`,stableName:`TagInline`,sourceImports:[`import { useCallback, useState } from 'react'`,`import { einvoice as EInvoice, ainvoice as AInvoice, digipost as DigiPost } from '@dnb/eufemia/icons'`,`import { Flex, Tag } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Tag:o},children:`
Text{' '}
<Tag.Group label="Inline">
  <Tag text="First" /> between
  <Tag text="Second" />
  <Tag text="Third" />
</Tag.Group>{' '}
Text

`}),h=()=>(0,u.jsx)(l,{"data-visual-test":`tag-removable-list`,stableName:`TagMultipleRemovable`,sourceImports:[`import { useCallback, useState } from 'react'`,`import { einvoice as EInvoice, ainvoice as AInvoice, digipost as DigiPost } from '@dnb/eufemia/icons'`,`import { Flex, Tag } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:a,FieldBlock:s,Tag:o},noInline:!0,children:`const Genres = () => {
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
`}),g=()=>(0,u.jsx)(l,{"data-visual-test":`tag-skeleton`,stableName:`TagSkeleton`,sourceImports:[`import { useCallback, useState } from 'react'`,`import { einvoice as EInvoice, ainvoice as AInvoice, digipost as DigiPost } from '@dnb/eufemia/icons'`,`import { Flex, Tag } from '@dnb/eufemia'`,`import { FieldBlock } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Tag:o},children:`<Tag.Group label="Skeletons">
  <Tag skeleton text="Skeleton" />
  <Tag skeleton text="Skeleton" />
  <Tag skeleton text="Skeleton" />
</Tag.Group>
`});function _(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...c(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Tag`}),`
`,(0,u.jsx)(t.p,{children:`There are three interactive tag variants:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`clickable`}),` (can also accept a custom icon as it does not have one of its own)`]}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`addable`})}),`
`,(0,u.jsxs)(t.li,{children:[(0,u.jsx)(t.code,{children:`removable`}),` (also triggers `,(0,u.jsx)(t.code,{children:`onClick`}),` when pressing the `,(0,u.jsx)(t.code,{children:`Delete`}),` or `,(0,u.jsx)(t.code,{children:`Backspace`}),` keyboard key (`,(0,u.jsx)(t.code,{children:`keyup`}),` event), can be disabled with the `,(0,u.jsx)(t.code,{children:`omitOnKeyUpDeleteEvent`}),` property)`]}),`
`]}),`
`,(0,u.jsxs)(t.p,{children:[`We require `,(0,u.jsx)(t.code,{children:`<Tag>`}),`-components to be wrapped by a `,(0,u.jsx)(t.code,{children:`<Tag.Group>`}),`-component. The required `,(0,u.jsx)(t.code,{children:`label`}),`-property in `,(0,u.jsx)(t.code,{children:`<Tag.Group>`}),` will ensure the correct use of accessibility for screen readers.`]}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Non-interactive tag`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:`Not interactable`}),`
`,(0,u.jsx)(t.li,{children:`Can have icon`}),`
`]}),`
`,(0,u.jsx)(t.p,{children:`Non-interactable tags are simply made by skipping all callback properties, and are the only type that can have an icon.`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Non-interactive tag with icon`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h2,{children:`Usage examples`}),`
`,(0,u.jsx)(t.h3,{children:`Multiple removable tags`}),`
`,(0,u.jsxs)(t.p,{children:[`Removable tags can for example be used in filter lists. This is a simple example on how to implement a filter list using removable `,(0,u.jsx)(t.code,{children:`Tags`}),`.`]}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Tag used inside text`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Tag used as skeleton`}),`
`,(0,u.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_,{...e})}):_(e)}export{v as default};
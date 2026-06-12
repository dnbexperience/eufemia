import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{D as r,a as i}from"./Anchor-BqZ7Pm7_.js";import{r as a}from"./layout_grid-7sVq7Has.js";import{t as o}from"./edit-BY-5a6Yq.js";import{a as s,i as c,n as l,o as u,r as d,t as f}from"./scissors-CeWuMPXy.js";import{t as p}from"./folder-CyU4nhjO.js";import{t as m}from"./Button-DbtiL1rf.js";import{t as h}from"./ListExport-2kiUgtRC.js";import{t as g}from"./MenuExport-C8SdtNCi.js";import{G as _,K as v,Y as y}from"./index-CsG353ar.js";import{t as b}from"./ComponentBox-Cb1rLw_D.js";var x=e({MenuExampleAccordion:()=>E,MenuExampleDefault:()=>C,MenuExampleMaxVisibleListItems:()=>O,MenuExampleNested:()=>T,MenuExampleWithHeader:()=>D,MenuExampleWithLinks:()=>w}),S=t(n());function C(){return(0,S.jsx)(b,{stableName:`MenuExampleDefault`,sourceImports:[`import { Menu } from '@dnb/eufemia'`,`import { copy, edit, file, file_add, file_pdf, file_png, folder, home, launch, layout_card, save, scissors } from '@dnb/eufemia/icons'`],__buildScope:{Menu:g,Button:m,List:h},children:`<Menu.Root>
  <Menu.Button />
  <Menu.List>
    <Menu.Action text="Action" onClick={() => null} />
    <Menu.Action text="Link" href="https://www.dnb.no/" />
  </Menu.List>
</Menu.Root>
`})}function w(){return(0,S.jsx)(b,{scope:{home:y,layout_card:l,launch:i},stableName:`MenuExampleWithLinks`,sourceImports:[`import { Menu } from '@dnb/eufemia'`,`import { copy, edit, file, file_add, file_pdf, file_png, folder, home, launch, layout_card, save, scissors } from '@dnb/eufemia/icons'`],__buildScope:{Menu:g,Button:m,List:h},children:`<Menu.Root>
  <Menu.Button text="Navigate" icon="chevron_down" variant="tertiary" />
  <Menu.List>
    <Menu.Action icon={home} text="Home" href="/" />
    <Menu.Action icon={layout_card} text="Dashboard" href="/dashboard" />
    <Menu.Action
      icon={launch}
      text="External"
      href="https://example.com"
      target="_blank"
      rel="noopener noreferrer"
    />
  </Menu.List>
</Menu.Root>
`})}function T(){return(0,S.jsx)(b,{scope:{file_add:s,folder:p,file_pdf:c,file_png:d,file:u},"data-visual-test":`menu-accordion`,stableName:`MenuExampleNested`,sourceImports:[`import { Menu } from '@dnb/eufemia'`,`import { copy, edit, file, file_add, file_pdf, file_png, folder, home, launch, layout_card, save, scissors } from '@dnb/eufemia/icons'`],__buildScope:{Menu:g,Button:m,List:h},children:`<Menu.Root arrowPosition="left">
  <Menu.Button text="File" icon="chevron_down" />
  <Menu.List>
    <Menu.Action
      icon={file_add}
      text="New"
      onClick={() => console.log('new')}
    />
    <Menu.Action
      icon={folder}
      text="Open"
      onClick={() => console.log('open')}
    />
    <Menu.Divider />

    <Menu.Root placement="right" arrowPosition="top">
      <Menu.Action icon={folder} text="Export as" />
      <Menu.List>
        <Menu.Action
          icon={file_pdf}
          text="PDF"
          onClick={() => console.log('export pdf')}
        />
        <Menu.Action
          icon={file_png}
          text="PNG"
          onClick={() => console.log('export png')}
        />
        <Menu.Action
          icon={file}
          text="SVG"
          onClick={() => console.log('export svg')}
        />
      </Menu.List>
    </Menu.Root>

    <Menu.Divider />
    <Menu.Action
      icon="close"
      text="Close"
      onClick={() => console.log('close')}
    />
  </Menu.List>
</Menu.Root>
`})}function E(){return(0,S.jsx)(b,{scope:{file_add:s,folder:p,file_pdf:c,file_png:d,save:r},stableName:`MenuExampleAccordion`,sourceImports:[`import { Menu } from '@dnb/eufemia'`,`import { copy, edit, file, file_add, file_pdf, file_png, folder, home, launch, layout_card, save, scissors } from '@dnb/eufemia/icons'`],__buildScope:{Menu:g,Button:m,List:h,Accordion:_},children:`<Menu.Root>
  <Menu.Button text="File" icon="chevron_down" />
  <Menu.List>
    <Menu.Action
      icon={file_add}
      text="New"
      onClick={() => console.log('new')}
    />
    <Menu.Action
      icon={folder}
      text="Open"
      onClick={() => console.log('open')}
    />
    <Menu.Divider />

    <Menu.Accordion icon={folder} text="Export as">
      <Menu.Action
        icon={file_pdf}
        text="PDF"
        onClick={() => console.log('export pdf')}
      />
      <Menu.Action
        icon={file_png}
        text="PNG"
        onClick={() => console.log('export png')}
      />
    </Menu.Accordion>

    <Menu.Divider />
    <Menu.Action
      icon={save}
      text="Save"
      onClick={() => console.log('save')}
    />
  </Menu.List>
</Menu.Root>
`})}function D(){return(0,S.jsx)(b,{scope:{scissors:f,copy:a,edit:o},stableName:`MenuExampleWithHeader`,sourceImports:[`import { Menu } from '@dnb/eufemia'`,`import { copy, edit, file, file_add, file_pdf, file_png, folder, home, launch, layout_card, save, scissors } from '@dnb/eufemia/icons'`],__buildScope:{Menu:g,Button:m,List:h},children:`<Menu.Root>
  <Menu.Button text="Edit" icon="chevron_down" />
  <Menu.List>
    <Menu.Header text="Clipboard" />
    <Menu.Action
      icon={scissors}
      text="Cut"
      onClick={() => console.log('cut')}
    />
    <Menu.Action
      icon={copy}
      text="Copy"
      onClick={() => console.log('copy')}
    />
    <Menu.Action icon={edit} text="Paste" disabled />
    <Menu.Divider />
    <Menu.Header text="Selection" />
    <Menu.Action icon="check" text="Select All" />
  </Menu.List>
</Menu.Root>
`})}function O(){return(0,S.jsx)(b,{stableName:`MenuExampleMaxVisibleListItems`,sourceImports:[`import { Menu } from '@dnb/eufemia'`,`import { copy, edit, file, file_add, file_pdf, file_png, folder, home, launch, layout_card, save, scissors } from '@dnb/eufemia/icons'`],__buildScope:{Menu:g,Button:m,List:h},children:`<Menu.Root>
  <Menu.Button text="Long list" icon="chevron_down" />
  <Menu.List maxVisibleListItems={4}>
    <Menu.Action text="Item 1" />
    <Menu.Action text="Item 2" />
    <Menu.Action text="Item 3" />
    <Menu.Action text="Item 4" />
    <Menu.Action text="Item 5" />
    <Menu.Action text="Item 6" />
    <Menu.Action text="Item 7" />
    <Menu.Action text="Item 8" />
  </Menu.List>
</Menu.Root>
`})}function k(e){let t={h2:`h2`,h3:`h3`,...v(),...e.components};return x||j(`Examples`,!1),E||j(`Examples.MenuExampleAccordion`,!0),C||j(`Examples.MenuExampleDefault`,!0),O||j(`Examples.MenuExampleMaxVisibleListItems`,!0),T||j(`Examples.MenuExampleNested`,!0),D||j(`Examples.MenuExampleWithHeader`,!0),w||j(`Examples.MenuExampleWithLinks`,!0),(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(t.h2,{children:`Demos`}),`
`,(0,S.jsx)(t.h3,{children:`Basic Menu`}),`
`,(0,S.jsx)(C,{}),`
`,(0,S.jsx)(t.h3,{children:`Accordion`}),`
`,(0,S.jsx)(E,{}),`
`,(0,S.jsx)(t.h3,{children:`Nested Menu`}),`
`,(0,S.jsx)(T,{}),`
`,(0,S.jsx)(t.h3,{children:`With Links`}),`
`,(0,S.jsx)(w,{}),`
`,(0,S.jsx)(t.h3,{children:`Max Visible List Items`}),`
`,(0,S.jsx)(O,{}),`
`,(0,S.jsx)(t.h3,{children:`With Headers`}),`
`,(0,S.jsx)(D,{})]})}function A(e={}){let{wrapper:t}={...v(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(k,{...e})}):k(e)}function j(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{A as default};
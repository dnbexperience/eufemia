import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./copy-DpwG9VP-.js";import{l as i,x as a}from"./view_medium-BGCKigyJ.js";import{a as o,i as s,n as c,o as l,r as u,t as d}from"./scissors-2Ipx7B5f.js";import{t as f}from"./ComponentBox-a4aOn231.js";import{Hr as p,Wr as m,fi as h,zr as g}from"./index-DqqByKA2.js";var _=t({MenuExampleAccordion:()=>S,MenuExampleDefault:()=>y,MenuExampleMaxVisibleListItems:()=>w,MenuExampleNested:()=>x,MenuExampleWithHeader:()=>C,MenuExampleWithLinks:()=>b}),v=e(n());function y(){return(0,v.jsx)(f,{stableName:`MenuExampleDefault`,children:`<Menu.Root>
  <Menu.Button />
  <Menu.List>
    <Menu.Action text="Action" onClick={() => null} />
    <Menu.Action text="Link" href="https://www.dnb.no/" />
  </Menu.List>
</Menu.Root>
`})}function b(){return(0,v.jsx)(f,{scope:{home:m,layout_card:c,launch:p},stableName:`MenuExampleWithLinks`,children:`<Menu.Root>
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
`})}function x(){return(0,v.jsx)(f,{scope:{file_add:o,folder:i,file_pdf:s,file_png:u,file:l},"data-visual-test":`menu-accordion`,stableName:`MenuExampleNested`,children:`<Menu.Root arrowPosition="left">
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
`})}function S(){return(0,v.jsx)(f,{scope:{file_add:o,folder:i,file_pdf:s,file_png:u,save:h},stableName:`MenuExampleAccordion`,children:`<Menu.Root>
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
`})}function C(){return(0,v.jsx)(f,{scope:{scissors:d,copy:r,edit:a},stableName:`MenuExampleWithHeader`,children:`<Menu.Root>
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
`})}function w(){return(0,v.jsx)(f,{stableName:`MenuExampleMaxVisibleListItems`,children:`<Menu.Root>
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
`})}function T(e){let t={h2:`h2`,h3:`h3`,...g(),...e.components};return _||D(`Examples`,!1),S||D(`Examples.MenuExampleAccordion`,!0),y||D(`Examples.MenuExampleDefault`,!0),w||D(`Examples.MenuExampleMaxVisibleListItems`,!0),x||D(`Examples.MenuExampleNested`,!0),C||D(`Examples.MenuExampleWithHeader`,!0),b||D(`Examples.MenuExampleWithLinks`,!0),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(t.h2,{children:`Demos`}),`
`,(0,v.jsx)(t.h3,{children:`Basic Menu`}),`
`,(0,v.jsx)(y,{}),`
`,(0,v.jsx)(t.h3,{children:`Accordion`}),`
`,(0,v.jsx)(S,{}),`
`,(0,v.jsx)(t.h3,{children:`Nested Menu`}),`
`,(0,v.jsx)(x,{}),`
`,(0,v.jsx)(t.h3,{children:`With Links`}),`
`,(0,v.jsx)(b,{}),`
`,(0,v.jsx)(t.h3,{children:`Max Visible List Items`}),`
`,(0,v.jsx)(w,{}),`
`,(0,v.jsx)(t.h3,{children:`With Headers`}),`
`,(0,v.jsx)(C,{})]})}function E(e={}){let{wrapper:t}={...g(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(T,{...e})}):T(e)}function D(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{E as default};
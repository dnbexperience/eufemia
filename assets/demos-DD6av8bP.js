import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./copy-CYu5FDRM.js";import{l as r,x as i}from"./view_medium-Rb0zFYFk.js";import{a,i as o,n as s,o as c,r as l,t as u}from"./scissors-DkjiirxO.js";import{t as d}from"./ComponentBox-DPdYTeDv.js";import{Br as f,Hr as p,Lr as m,ui as h}from"./index--zEB_f_m.js";var g=e({MenuExampleAccordion:()=>x,MenuExampleDefault:()=>v,MenuExampleMaxVisibleListItems:()=>C,MenuExampleNested:()=>b,MenuExampleWithHeader:()=>S,MenuExampleWithLinks:()=>y}),_=t();function v(){return(0,_.jsx)(d,{children:`<Menu.Root>
  <Menu.Button />
  <Menu.List>
    <Menu.Action text="Action" onClick={() => null} />
    <Menu.Action text="Link" href="https://www.dnb.no/" />
  </Menu.List>
</Menu.Root>
`})}function y(){return(0,_.jsx)(d,{scope:{home:p,layout_card:s,launch:f},children:`<Menu.Root>
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
`})}function b(){return(0,_.jsx)(d,{scope:{file_add:a,folder:r,file_pdf:o,file_png:l,file:c},"data-visual-test":`menu-accordion`,children:`<Menu.Root arrowPosition="left">
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
`})}function x(){return(0,_.jsx)(d,{scope:{file_add:a,folder:r,file_pdf:o,file_png:l,save:h},children:`<Menu.Root>
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
`})}function S(){return(0,_.jsx)(d,{scope:{scissors:u,copy:n,edit:i},children:`<Menu.Root>
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
`})}function C(){return(0,_.jsx)(d,{children:`<Menu.Root>
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
`})}function w(e){let t={h2:`h2`,h3:`h3`,...m(),...e.components};return g||E(`Examples`,!1),x||E(`Examples.MenuExampleAccordion`,!0),v||E(`Examples.MenuExampleDefault`,!0),C||E(`Examples.MenuExampleMaxVisibleListItems`,!0),b||E(`Examples.MenuExampleNested`,!0),S||E(`Examples.MenuExampleWithHeader`,!0),y||E(`Examples.MenuExampleWithLinks`,!0),(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(t.h2,{children:`Demos`}),`
`,(0,_.jsx)(t.h3,{children:`Basic Menu`}),`
`,(0,_.jsx)(v,{}),`
`,(0,_.jsx)(t.h3,{children:`Accordion`}),`
`,(0,_.jsx)(x,{}),`
`,(0,_.jsx)(t.h3,{children:`Nested Menu`}),`
`,(0,_.jsx)(b,{}),`
`,(0,_.jsx)(t.h3,{children:`With Links`}),`
`,(0,_.jsx)(y,{}),`
`,(0,_.jsx)(t.h3,{children:`Max Visible List Items`}),`
`,(0,_.jsx)(C,{}),`
`,(0,_.jsx)(t.h3,{children:`With Headers`}),`
`,(0,_.jsx)(S,{})]})}function T(e={}){let{wrapper:t}={...m(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(w,{...e})}):w(e)}function E(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{T as default};
import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{y as r}from"./index-DVm0MbGb.js";var i=`_fieldsetReset_w08ow_4`,a=`_showWhenLarge_w08ow_21`,o=`_showWhenMedium_w08ow_22`,s=`_showWhenSmall_w08ow_23`,c=`_showWhenLargeOffset_w08ow_27`,l=`_showWhenMediumOffset_w08ow_28`,u=`_showWhenSmallOffset_w08ow_29`,d=e({CoreStyle:()=>m,FieldsetReset:()=>y,MediaSizeOffset:()=>x,ScreenReaderOnly:()=>_,Selection:()=>v,SkipLink:()=>b,TabFocus:()=>h,UnstyledList:()=>g}),f=t(),p=r.div`
  max-width: 40rem;
`;function m(){return(0,f.jsx)(p,{className:`dnb-spacing`,children:(0,f.jsx)(n,{hideCode:!0,"data-visual-test":`helper-core-style`,children:`<div className="dnb-core-style">
  <h3 className="dnb-h--medium">
    Wrapper with the DNB Body Style (CSS reset)
  </h3>
  <p className="dnb-p">
    Read more about <code className="dnb-code">.dnb-core-style</code> and{' '}
    <a
      href="/uilib/usage/customisation/styling#core-style"
      className="dnb-anchor"
    >
      Use Eufemia Styles elsewhere
    </a>
  </p>
</div>
`})})}function h(){return(0,f.jsx)(p,{className:`dnb-spacing`,children:(0,f.jsx)(n,{hideCode:!0,"data-visual-test":`helper-tap-focus`,children:`<details>
  <summary className="dnb-tab-focus">
    Try to focus me with the Tab key
  </summary>
  My main focus state has been removed and replaced by the helping class{' '}
  <code className="dnb-code">.dnb-tab-focus</code>
</details>
`})})}function g(){return(0,f.jsx)(p,{className:`dnb-spacing`,children:(0,f.jsx)(n,{hideCode:!0,"data-visual-test":`helper-unstyled-list`,children:`
<ul className="dnb-unstyled-list">
  <li>I'm an unstyled list item</li>
  <li>Me too!</li>
</ul>
<hr className="dnb-hr" />
<ul className="dnb-ul">
  <li>But I'm not.</li>
</ul>

`})})}function _(){return(0,f.jsx)(p,{className:`dnb-spacing`,children:(0,f.jsx)(n,{hideCode:!0,"data-visual-test":`helper-sr-only`,children:`<p className="dnb-p">
  Hidden text
  <span className="dnb-sr-only">
    I am only visible to screen readers, so you probably can't see me.
    Unless you're using a screen reader.
  </span>
  !
</p>
`})})}function v(){return(0,f.jsx)(p,{className:`dnb-spacing`,children:(0,f.jsx)(n,{hideCode:!0,"data-visual-test":`helper-selection`,children:`<p className="dnb-selection dnb-t__size--basis">
  If you select a part of this text, you will see the selection highlight
  is green.
</p>
`})})}function y(){return(0,f.jsx)(p,{className:i,children:(0,f.jsx)(n,{hideCode:!0,"data-visual-test":`helper-fieldset-reset`,children:`<fieldset>I'm a fieldset without styling.</fieldset>
`})})}function b(){return(0,f.jsx)(p,{className:i,children:(0,f.jsx)(n,{hideCode:!0,"data-visual-test":`skip-link`,children:`<a href="#something" className="dnb-skip-link">
  I am a skip link
</a>
`})})}function x(){return(0,f.jsx)(n,{hideCode:!0,"data-visual-test":`helper-media-offset`,scope:{showWhenSmall:s,showWhenMedium:o,showWhenLarge:a,showWhenSmallOffset:u,showWhenMediumOffset:l,showWhenLargeOffset:c},children:`<Ul space={0}>
  <Li className={showWhenSmall}>
    Show me when "small"{' '}
    <span className={showWhenSmallOffset}>+ offset is active</span>
  </Li>
  <Li className={showWhenMedium}>
    Show me when "medium"{' '}
    <span className={showWhenMediumOffset}>+ offset is active</span>
  </Li>
  <Li className={showWhenLarge}>
    Show me when "large"{' '}
    <span className={showWhenLargeOffset}>+ offset is active</span>
  </Li>
</Ul>
`})}export{v as a,_ as i,d as n,h as o,y as r,g as s,m as t};
import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{y as i}from"./index-DqqByKA2.js";var a=`_fieldsetReset_w08ow_4`,o=`_showWhenLarge_w08ow_21`,s=`_showWhenMedium_w08ow_22`,c=`_showWhenSmall_w08ow_23`,l=`_showWhenLargeOffset_w08ow_27`,u=`_showWhenMediumOffset_w08ow_28`,d=`_showWhenSmallOffset_w08ow_29`,f=t({CoreStyle:()=>h,FieldsetReset:()=>b,MediaSizeOffset:()=>S,ScreenReaderOnly:()=>v,Selection:()=>y,SkipLink:()=>x,TabFocus:()=>g,UnstyledList:()=>_}),p=e(n()),m=i.div`
  max-width: 40rem;
`;function h(){return(0,p.jsx)(m,{className:`dnb-spacing`,children:(0,p.jsx)(r,{hideCode:!0,"data-visual-test":`helper-core-style`,stableName:`CoreStyle`,children:`<div className="dnb-core-style">
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
`})})}function g(){return(0,p.jsx)(m,{className:`dnb-spacing`,children:(0,p.jsx)(r,{hideCode:!0,"data-visual-test":`helper-tap-focus`,stableName:`TabFocus`,children:`<details>
  <summary className="dnb-tab-focus">
    Try to focus me with the Tab key
  </summary>
  My main focus state has been removed and replaced by the helping class{' '}
  <code className="dnb-code">.dnb-tab-focus</code>
</details>
`})})}function _(){return(0,p.jsx)(m,{className:`dnb-spacing`,children:(0,p.jsx)(r,{hideCode:!0,"data-visual-test":`helper-unstyled-list`,stableName:`UnstyledList`,children:`
<ul className="dnb-unstyled-list">
  <li>I'm an unstyled list item</li>
  <li>Me too!</li>
</ul>
<hr className="dnb-hr" />
<ul className="dnb-ul">
  <li>But I'm not.</li>
</ul>

`})})}function v(){return(0,p.jsx)(m,{className:`dnb-spacing`,children:(0,p.jsx)(r,{hideCode:!0,"data-visual-test":`helper-sr-only`,stableName:`ScreenReaderOnly`,children:`<p className="dnb-p">
  Hidden text
  <span className="dnb-sr-only">
    I am only visible to screen readers, so you probably can't see me.
    Unless you're using a screen reader.
  </span>
  !
</p>
`})})}function y(){return(0,p.jsx)(m,{className:`dnb-spacing`,children:(0,p.jsx)(r,{hideCode:!0,"data-visual-test":`helper-selection`,stableName:`Selection`,children:`<p className="dnb-selection dnb-t__size--basis">
  If you select a part of this text, you will see the selection highlight
  is green.
</p>
`})})}function b(){return(0,p.jsx)(m,{className:a,children:(0,p.jsx)(r,{hideCode:!0,"data-visual-test":`helper-fieldset-reset`,stableName:`FieldsetReset`,children:`<fieldset>I'm a fieldset without styling.</fieldset>
`})})}function x(){return(0,p.jsx)(m,{className:a,children:(0,p.jsx)(r,{hideCode:!0,"data-visual-test":`skip-link`,stableName:`SkipLink`,children:`<a href="#something" className="dnb-skip-link">
  I am a skip link
</a>
`})})}function S(){return(0,p.jsx)(r,{hideCode:!0,"data-visual-test":`helper-media-offset`,scope:{showWhenSmall:c,showWhenMedium:s,showWhenLarge:o,showWhenSmallOffset:d,showWhenMediumOffset:u,showWhenLargeOffset:l},stableName:`MediaSizeOffset`,children:`<Ul space={0}>
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
`})}export{y as a,v as i,f as n,g as o,b as r,_ as s,h as t};
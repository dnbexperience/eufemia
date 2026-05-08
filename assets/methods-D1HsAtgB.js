import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as n}from"./index--zEB_f_m.js";var r=e({default:()=>o}),i=t();function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Dynamically change data`}),`
`,(0,i.jsxs)(t.p,{children:[`You can manipulate the used data dynamically, either by changing the `,(0,i.jsx)(t.code,{children:`data`}),` property or during user events like `,(0,i.jsx)(t.code,{children:`onType`}),` or `,(0,i.jsx)(t.code,{children:`onFocus`}),`. The following properties and methods are there to use:`]}),`
`,(0,i.jsx)(t.h3,{children:`Methods`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`updateData`}),` replace all data entries.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`emptyData`}),` remove all data entries.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`resetSelectedItem`}),` will invalidate the selected key.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`revalidateSelectedItem`}),` will re-validate the internal selected key on the given `,(0,i.jsx)(t.code,{children:`value`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`revalidateInputValue`}),` will re-validate the current input value and update it – based on the given `,(0,i.jsx)(t.code,{children:`value`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`setInputValue`}),` update the input value.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`clearInputValue`}),` will set the current input value to an empty string.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`focusInput`}),` will set focus on the input element.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`showIndicator`}),` shows a progress indicator instead of the icon (inside the input).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`hideIndicator`}),` hides the progress indicator inside the input.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`showIndicatorItem`}),` shows an item with a `,(0,i.jsx)(t.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`}),` status as an data option item.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`showNoOptionsItem`}),` shows the "no entries found" status as an data option item.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`setVisible`}),` shows the `,(0,i.jsx)(t.a,{href:`/uilib/components/fragments/drawer-list`,children:`DrawerList`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`setHidden`}),` hides the `,(0,i.jsx)(t.a,{href:`/uilib/components/fragments/drawer-list`,children:`DrawerList`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`showAllItems`}),` shows all `,(0,i.jsx)(t.a,{href:`/uilib/components/fragments/drawer-list`,children:`DrawerList`}),` items.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`setMode`}),` switch the mode during runtime.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`debounce`}),` a debounce method with a cancel invocation method on repeating calls. There is `,(0,i.jsx)(t.a,{href:`/uilib/helpers/functions/#debounce`,children:`more documentation`}),` about this method.`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Properties`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`dataList`}),` contains all the data entries.`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Example`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Autocomplete
  onFocus={({ updateData, showIndicator }) => {
    showIndicator()
    setTimeout(() => {
      updateData(topMovies)
    }, 1e3)
  }}
  onType={({ value /* updateData, ... */ }) => {
    console.log('onType', value)
  }}
/>
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{r as n,o as t};
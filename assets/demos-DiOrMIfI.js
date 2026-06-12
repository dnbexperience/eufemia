import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{A as i,M as a,c as o,j as s}from"./Anchor-BqZ7Pm7_.js";import{a as c,c as l,lt as u,s as d}from"./SpacingUtils-C8nnut4W.js";import{t as f}from"./withComponentMarkers-DweGwA_f.js";import{s as p,t as m}from"./Icon-HRQtcCxf.js";import{c as h}from"./Space-DGcLo0j5.js";import{n as g,r as _,t as v}from"./table-CTFyNtDp.js";import{u as y}from"./FormStatus-DiAc_h6C.js";import{a as b}from"./useSharedState-Bcjp-Zi_.js";import{t as x}from"./Button-DbtiL1rf.js";import{M as S,f as ee}from"./Autocomplete-6fC_p2_U.js";import{t as C}from"./P-D0SeNBSG.js";import{i as te}from"./HelpButton-B8IG5rB3.js";import{t as w}from"./Hr-BdU3w3bL.js";import{l as ne,s as re,t as T,u as E}from"./ToggleButton-T4E3Coih.js";import{n as D,t as O}from"./DateFormatUtils-wrrR-lz4.js";import{t as k}from"./DatePicker-R-DyipJt.js";import{mt as A,pt as j}from"./Selection-5ph0VyAS.js";import{t as M}from"./Tag-DGPgZhrQ.js";import{n as ie,r as N,t as P}from"./ListExport-2kiUgtRC.js";import{t as F}from"./MultiSelection-njDbLPWe.js";import{t as I}from"./export-CLcjsEdd.js";import{t as L}from"./Value-whMgauSk.js";import{G as R,K as z,M as ae,N as B}from"./index-CsG353ar.js";import{t as V}from"./ComponentBox-Cb1rLw_D.js";var H=n(t()),U=(0,H.createContext)(void 0),W=(0,H.createContext)(void 0),G=(0,H.createContext)(null),K=n(r()),oe={search:``,filters:{}};function q({search:e,filters:t}){return{search:e,filters:t}}function se(e){let t=new Set;for(let n of Object.keys(e)){let e=n.lastIndexOf(`/`);e>0&&t.add(n.slice(0,e))}let n={};for(let e of Array.from(t))n[e]=!0;return n}function J({id:e,behavior:t=`realtime`,defaultFilters:n,defaultPanelOpen:r,resultCount:i,resultLoading:a,onChange:o,className:s,style:u,children:f,...p}){let{ariaLabel:m}=(0,H.useContext)(l).getTranslation({}).Filter,h=(0,H.useRef)(o);h.current=o;let g=n&&Object.keys(n).length>0,_=(0,H.useMemo)(()=>g?se(n):{},[]),{data:v,extend:y}=b(e?`${e}__accordion`:void 0,_),x=(0,H.useRef)(v??_),S=(0,H.useMemo)(()=>n?{search:``,filters:n}:oe,[n]),{data:ee,get:C,extend:te}=b(e,S),w=t===`manual`,[ne,re]=(0,H.useState)(S),T=e?ee??S:ne,E=(0,H.useRef)(T);E.current=T;let D=(0,H.useCallback)(()=>e?C()??S:E.current,[S,C,e]),O=(0,H.useCallback)(t=>{if(e)te(t);else{let e={...E.current,...t};E.current=e,re(e)}},[te,e]),[k,A]=(0,H.useState)(()=>ee??S),j=(0,H.useRef)(k);j.current=k,(0,H.useEffect)(()=>{g&&O({filters:n})},[]),(0,H.useEffect)(()=>{let e={};a!==void 0&&(e.resultLoading=a),i!==void 0&&(e.resultCount=i),Object.keys(e).length>0&&O(e)},[a,i,O]);let M=w?k:T,ie=(0,H.useCallback)(e=>{if(w){let t=D().filters;A(t=>({...t,search:e})),O({search:e}),h.current?.({search:e,filters:t})}else{O({search:e});let t=D().filters;h.current?.({search:e,filters:t})}},[D,w,O]),N=(0,H.useCallback)((e,t)=>{if(w)A(n=>{let r={...n.filters};return t===void 0?delete r[e]:r[e]=t,{...n,filters:r}});else{let n=D(),r={...n.filters};t===void 0?delete r[e]:r[e]=t,O({filters:r}),h.current?.(q({...n,filters:r}))}},[D,w,O]),P=(0,H.useCallback)(e=>M.filters[e],[M.filters]),F=(0,H.useCallback)(e=>{let t=D(),n={...t.filters};delete n[e];let r=j.current,i={...r.filters};delete i[e];let a={...r,filters:i},o={search:t.search,filters:n};A(a),O(o),h.current?.(q(o))},[D,O]),I=(0,H.useCallback)(e=>{if(w){let t=D().filters;Object.hasOwn(t,e)?F(e):N(e,void 0)}else N(e,void 0)},[D,w,N,F]),L=(0,H.useCallback)(e=>{w?F(e):I(e)},[w,I,F]),R=(0,H.useCallback)(()=>{let e={...w?j.current:D(),filters:{}};w&&A(e),O({search:e.search,filters:e.filters}),h.current?.(q(e))},[D,w,O]),z=(0,H.useCallback)(e=>{if(w)A(t=>({...t,filters:e}));else{O({filters:e});let t=D();h.current?.(q({...t,filters:e}))}},[D,w,O]),ae=(0,H.useCallback)(()=>{let e={search:``,filters:{}};w&&A(e),O(e),h.current?.(e)},[w,O]),B=(0,H.useCallback)(()=>{let e=j.current;O({search:e.search,filters:e.filters}),h.current?.(q(e))},[O]),V=(0,H.useCallback)(()=>{let e=D();A({search:e.search,filters:e.filters})},[D]),W=M.search.length>0||Object.keys(M.filters).length>0,[G,J]=(0,H.useState)(r??!!g),ce=(0,H.useRef)(null);(0,H.useEffect)(()=>{if(r!==void 0||g)return;let e=D()?.filters??{};if(Object.keys(e).length>0){J(!0);let t=se(e);x.current={...x.current,...t},y(t)}},[]);let le=(0,H.useCallback)(e=>x.current[e],[]),ue=(0,H.useCallback)((e,t)=>{x.current[e]=t,y({[e]:t})},[y]),de=T,fe=i??T.resultCount,Y=a??T.resultLoading;return(0,K.jsx)(U,{value:(0,H.useMemo)(()=>({id:e,behavior:t,state:M,appliedState:de,setSearch:ie,setFilter:N,getFilter:P,removeFilter:I,removeAppliedFilter:L,clearFilters:R,replaceFilters:z,resetFilters:ae,commitFilters:B,revertFilters:V,hasActiveFilters:W,resultCount:fe,resultLoading:Y,panelOpen:G,setPanelOpen:J,panelButtonRef:ce,getAccordionOpen:le,setAccordionOpen:ue}),[e,t,M,de,ie,N,P,I,L,R,z,ae,B,V,W,fe,Y,G,J,ce,le,ue]),children:(0,K.jsx)(`div`,{...c(p,{className:d(`dnb-filter`,s),style:u}),role:`search`,"aria-label":m,children:f})})}f(J,{_supportsSpacingProps:!0});function ce({className:e,children:t}){return(0,K.jsx)(`div`,{className:d(`dnb-filter__header`,e),children:t})}function le({label:e,submitBehavior:t,onChange:n,className:r,...a}){let o=(0,H.useContext)(U);if(!o)throw Error(`Filter.Search must be used inside a Filter.Root.`);let s=t===`manual`,c=(0,H.useRef)(!1),[l,u]=(0,H.useState)(o.state.search),{setSearch:f}=o,p=(0,H.useCallback)(({value:e})=>{c.current=!0,s?(u(e),e===``&&f(e)):f(e),n?.(e)},[s,f,n]),m=(0,H.useCallback)(({value:e})=>{f(e)},[f]),h=(0,H.useCallback)(()=>{u(``),f(``)},[f]);(0,H.useEffect)(()=>{o.resultLoading||(c.current=!1)},[o.resultLoading]),(0,H.useEffect)(()=>{s?o.state.search===``&&u(``):u(o.state.search)},[s,o.state.search]);let g=o.resultLoading&&c.current;return(0,K.jsx)(`div`,{className:d(`dnb-filter__search`,g&&`dnb-filter__search--show-indicator`,r),children:(0,K.jsx)(S,{...a,type:`search`,label:e,labelDirection:`vertical`,value:s?l:o.state.search,onChange:p,...s?{onSubmit:m,onClear:h}:void 0,showSubmitButton:s,icon:g?(0,K.jsx)(ee,{type:`circular`,size:`small`}):i,stretch:!0,size:`medium`,showClearButton:!0,autoCapitalize:`none`,autoCorrect:`off`,spellCheck:!1})})}function ue({className:e,children:t}){let n=(0,H.useContext)(U),{hideFilterLabel:r,applyFilterLabel:i,cancelFilterLabel:o}=(0,H.useContext)(l).getTranslation({}).Filter;if(!n)throw Error(`Filter.Panel must be used inside a Filter.Root.`);let{panelOpen:s,setPanelOpen:c,behavior:u,panelButtonRef:f,revertFilters:p,commitFilters:m}=n,h=u===`manual`,g=(0,H.useCallback)(()=>{h&&p(),c(!1),f.current?.focus()},[h,p,c,f]),_=(0,H.useCallback)(()=>{m(),c(!1),f.current?.focus()},[m,c,f]),v=(0,H.useRef)(null);return(0,K.jsx)(y,{open:s,children:(0,K.jsx)(G,{value:(0,H.useMemo)(()=>({panelRef:v}),[]),children:(0,K.jsxs)(`div`,{ref:v,className:d(`dnb-filter__panel`,e),children:[t,(0,K.jsx)(w,{className:`dnb-filter__hr`,space:0}),h?(0,K.jsxs)(`div`,{className:`dnb-filter__panel-actions`,children:[(0,K.jsx)(x,{variant:`primary`,onClick:_,children:i}),(0,K.jsx)(x,{variant:`tertiary`,icon:!1,onClick:g,children:o})]}):(0,K.jsx)(x,{variant:`tertiary`,icon:a,iconPosition:`left`,onClick:g,className:`dnb-filter__panel-close`,children:r})]})})})}var de=m.transition({closed:_,open:a});function fe({children:e,onClick:t,...n}){let r=(0,H.useContext)(U),{panelButtonLabel:i}=(0,H.useContext)(l).getTranslation({}).Filter;if(!r)throw Error(`Filter.PanelButton must be used inside a Filter.Root.`);let{panelOpen:a,setPanelOpen:o,panelButtonRef:s}=r,c=(0,H.useRef)(null);(0,H.useEffect)(()=>{s.current=c.current},[s]);let u=(0,H.useCallback)(e=>{o(!a),t?.(e)},[a,o,t]);return(0,K.jsx)(x,{variant:`tertiary`,icon:de,iconPosition:`left`,transitionState:a?`open`:`closed`,"aria-expanded":a,ref:c,onClick:u,...n,children:e??i})}function Y({className:e,children:t}){return(0,K.jsx)(`div`,{className:d(`dnb-filter__toolbar`,e),children:t})}function pe({className:e,children:t}){return(0,K.jsx)(E,{gap:`small`,align:`center`,className:d(`dnb-filter__toolbar-actions`,e),children:t})}Y.Actions=pe;function me({label:e,showCategoryLabel:t,collapsibleThreshold:n,onRemove:r,className:i}){let{activeFiltersLabel:o,activeFiltersCountLabel:s,clearAllLabel:c}=(0,H.useContext)(l).getTranslation({}).Filter,u=e??o,f=(0,H.useContext)(U),p=(0,H.useId)();if(!f)throw Error(`Filter.ActiveFilters must be used inside a Filter.Root.`);let m=Object.entries(f.behavior===`manual`?f.appliedState.filters:f.state.filters),h=m.length>0,g=n!=null&&m.length>n,_=e=>{f.behavior===`manual`?f.removeAppliedFilter(e):f.removeFilter(e),r?.(e)},v=()=>{f.clearFilters(),f.setPanelOpen(!1),f.panelButtonRef.current?.focus()},b=(0,K.jsx)(M.Group,{label:u,children:m.map(([e,n])=>(0,K.jsx)(M,{variant:`removable`,onClick:()=>_(e),children:t&&n.categoryLabel?`${n.categoryLabel}: ${n.label}`:n.label},e))});return(0,K.jsx)(y,{children:h&&(0,K.jsx)(`div`,{className:d(`dnb-filter__active-filters`,i),children:g?(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(E,{className:`dnb-filter__active-filters__header`,justify:`space-between`,align:`center`,children:[(0,K.jsx)(R,{variant:`tertiary`,title:s.replace(`%s`,String(m.length)),id:p,iconPosition:`right`}),(0,K.jsx)(x,{variant:`tertiary`,icon:a,onClick:v,children:c})]}),(0,K.jsx)(R.Content,{id:p,children:(0,K.jsx)(te,{className:`dnb-filter__active-filters__scroll`,children:b})})]}):(0,K.jsxs)(K.Fragment,{children:[(0,K.jsxs)(E,{className:`dnb-filter__active-filters__header`,justify:`space-between`,align:`center`,children:[(0,K.jsx)(`span`,{className:`dnb-filter__active-filters__label`,"aria-hidden":!0,children:u}),(0,K.jsx)(x,{variant:`tertiary`,icon:a,onClick:v,children:c})]}),b]})})})}function he({connectedTo:e,className:t,children:n,...r}){let i=(0,H.useContext)(U),{resultCountMessage:a,noResultsMessage:s}=(0,H.useContext)(l).getTranslation({}).Filter,u=e??i?.id;if(!u&&!i)throw Error(`Filter.Content requires a connectedTo prop or must be used inside a Filter.Root.`);let{data:f}=b(u),p=f?.resultLoading??i?.resultLoading??!1,m=f?.resultCount??i?.resultCount,h=(0,H.useRef)(!1);p&&(h.current=!0);let g=p||m===void 0?``:m===0?s:a.replace(`%s`,String(m));return(0,K.jsxs)(W,{value:u,children:[(0,K.jsx)(B,{show:p,...c(r,{className:d(`dnb-filter__content`,t)}),children:h.current?(0,K.jsx)(y,{children:n}):n}),(0,K.jsx)(o,{priority:`high`,delay:1e3,children:g})]})}f(he,{_supportsSpacingProps:!0});function ge({connectedTo:e,resultCount:t,children:n,className:r,...i}){let{noResultsMessage:a}=(0,H.useContext)(l).getTranslation({}).Filter,o=(0,H.useContext)(U),s=(0,H.useContext)(W),{data:u}=b(e??s??o?.id),f=(0,H.useContext)(N),p=t??u?.resultCount??o?.resultCount,m=c(i,{className:d(`dnb-filter__no-results`,r)});if(p===void 0||p>0)return null;let h=n||a;return f?(0,K.jsx)(ie,{...m,title:h}):(0,K.jsx)(C,{...m,children:h})}f(ge,{_supportsSpacingProps:!0});function _e({connectedTo:e,resultCount:t,alwaysVisible:n,children:r,className:i,...a}){let{resultCountMessage:o}=(0,H.useContext)(l).getTranslation({}).Filter,s=(0,H.useContext)(U),u=(0,H.useContext)(W),{data:f}=b(e??u??s?.id),p=t??f?.resultCount??s?.resultCount,m=f?.resultLoading??s?.resultLoading??!1,h=s?.behavior===`manual`?s.appliedState.search.length>0||Object.keys(s.appliedState.filters).length>0:s?.hasActiveFilters??!!(f?.search||f?.filters&&Object.keys(f.filters).length>0),g=c(a,{className:d(`dnb-filter__result-count`,i)}),_=(p!==void 0||m)&&(n||h),v=(0,H.useRef)(void 0);_&&p!==void 0&&(v.current=p);let y=_?p:v.current??p,x=r||o.replace(`%s`,String(y??0));return(0,K.jsx)(j,{open:_,className:`dnb-filter__result-count-wrapper`,children:(0,K.jsx)(B,{show:m,children:(0,K.jsx)(C,{top:`small`,...g,children:x})})})}f(_e,{_supportsSpacingProps:!0});function X({label:e,filterKey:t,defaultOpen:n,className:r,onOpenChange:i,children:a}){let o=(0,H.useContext)(U);if(!o)throw Error(`Filter.Item must be used inside a Filter.Root.`);return(0,K.jsx)(R,{variant:`tertiary`,title:e,expanded:o.getAccordionOpen(t)??n??!1,onChange:(0,H.useCallback)(({expanded:e})=>{o.setAccordionOpen(t,e),i?.(e)},[o,t,i]),className:d(`dnb-filter__item`,r),children:(0,K.jsx)(`div`,{className:`dnb-filter__item-content`,children:a})})}function ve(e,t,n){if(!(!e&&!t))return e&&t&&t!==e?D({startDate:e,endDate:t},{locale:n,options:{dateStyle:`long`}}):O(e||t,{locale:n,options:{dateStyle:`long`}})}function ye({label:e,filterKey:t=`date`,defaultOpen:n,...r}){let i=(0,H.useContext)(U),a=(0,H.useContext)(l),{dateLabel:o}=a.getTranslation({}).Filter,s=e??o;if(!i)throw Error(`Filter.Date must be used inside a Filter.Root.`);let{removeFilter:c,setFilter:u,getFilter:d}=i,f=d(t)?.value,p=a.locale,m=(0,H.useContext)(G),g=(0,H.useCallback)(({startDate:e,endDate:n})=>{if(!e&&!n){m?u(t,void 0):c(t);return}u(t,{value:{from:e,to:n},label:ve(e,n,p),categoryLabel:s})},[m,c,u,t,s,p]),_={range:!0,...r,label:s,labelSrOnly:!0,startDate:f?.from??r.startDate??null,endDate:f?.to??r.endDate??null,onChange:g},{isSmall:v}=h(),y=(0,H.useMemo)(()=>ve(f?.from,f?.to,p),[f,p]),b={rangeSingleCalendar:!0,..._,triggerProps:{text:s,variant:`tertiary`,iconPosition:`left`,...r.triggerProps}};return m?(0,K.jsx)(X,{label:s,filterKey:t,defaultOpen:n,children:v?(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(k,{...b,triggerProps:void 0}),y]}):(0,K.jsx)(k,{showInput:!0,inline:!0,...b})}):(0,K.jsx)(k,{...b})}function be({label:e,filterKey:t,defaultOpen:n,data:r}){let i=(0,H.useContext)(U);if(!i)throw Error(`Filter.Selection must be used inside a Filter.Root.`);let{state:a,setFilter:o,removeFilter:s}=i,c=(0,H.useContext)(G),l=`${t}/`,u=(0,H.useMemo)(()=>Object.keys(a.filters).filter(e=>e.startsWith(l)).map(e=>e.slice(l.length)),[a.filters,l]),d=(0,H.useCallback)((t,n)=>{let i=`${l}${t}`;n?o(i,{value:t,label:r.find(e=>e.value===t)?.label??t,categoryLabel:e}):c?o(i,void 0):s(i)},[c,o,s,l,e,r]);return(0,K.jsx)(X,{label:e,filterKey:t,defaultOpen:n,children:(0,K.jsx)(ne,{gap:`small`,children:r.map(e=>(0,K.jsx)(re,{label:e.label,checked:u.includes(e.value),onChange:({checked:t})=>d(e.value,t)},e.value))})})}function xe({label:e,filterKey:t,defaultOpen:n,data:r}){let i=(0,H.useContext)(U);if(!i)throw Error(`Filter.MultiSelection must be used inside a Filter.Root.`);let{state:a,replaceFilters:o}=i,s=(0,H.useRef)(a.filters);s.current=a.filters;let c=`${t}/`;return(0,K.jsx)(X,{label:e,filterKey:t,defaultOpen:n,children:(0,K.jsx)(F,{label:e,labelSrOnly:!0,data:r,value:(0,H.useMemo)(()=>{let e=Object.keys(a.filters).filter(e=>e.startsWith(c)).map(e=>e.slice(c.length));return e.length>0?e:void 0},[a.filters,c]),onChange:(0,H.useCallback)(t=>{let n=Array.from(new Set((t??[]).map(e=>String(e)))),i={...s.current};for(let e of Object.keys(i))e.startsWith(c)&&delete i[e];for(let t of n){let n=`${c}${t}`,a=r.find(e=>String(e.value)===t);i[n]={value:t,label:a?String(a.title):t,categoryLabel:e}}o(i)},[o,c,e,r]),variant:`inline`,showSearchField:!0})})}function Se({className:e,children:t,...n}){return(0,K.jsx)(`div`,{...c(n,{className:d(`dnb-filter__quick-filters`,e)}),children:t})}function Ce({children:e,connectedTo:t}){let n=(0,H.useContext)(U),r=(0,H.useContext)(W),{data:i}=b(t??r??n?.id),a=i?.search??n?.state?.search??``;return(0,H.useMemo)(()=>we(e,a),[e,a])}function we(e,t){if(!t||!e)return e;let n=t.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),r=RegExp(`(${n})`,`gi`),i=e.split(r);return i.length===1?e:i.map((e,t)=>r.test(e)?(r.lastIndex=0,(0,K.jsx)(`mark`,{className:`dnb-filter__highlighting`,children:e},t)):e)}function Te({data:e,onChange:t,value:n,defaultValue:r,size:i=`medium`,...a}){let{sortButtonLabel:o}=(0,H.useContext)(l).getTranslation({}).Filter,{isSmall:s}=h(),c=(0,H.useMemo)(()=>Array.isArray(e)?e.map(e=>typeof e==`object`&&e?{...e,selectedValue:o}:{content:e,selectedValue:o}):e,[e,o]);return(0,K.jsx)(A,{variant:`tertiary`,icon:g,iconPosition:`left`,independentWidth:!0,align:s?`left`:`right`,title:o,data:c,value:n,defaultValue:r,onChange:t,size:i,...a})}var Z={search:``,filters:{}};function Ee(e){let{data:t,get:n,extend:r}=b(e,Z),i=t??Z,a=(0,H.useCallback)(()=>{r({search:``,filters:{}})},[r]),o=(0,H.useCallback)(e=>{let t={...(n()??Z).filters};delete t[e],r({filters:t})},[r,n]);return{filters:i.filters,search:i.search,hasActiveFilters:i.search.length>0||Object.keys(i.filters).length>0,resetFilters:a,removeFilter:o}}function De(){let e=(0,H.useContext)(U);if(!e)throw Error(`Filter.useFilterContext() must be used inside a Filter.Root.`);return{setFilter:e.setFilter,getFilter:e.getFilter,removeFilter:e.removeFilter,resetFilters:e.resetFilters,commitFilters:e.commitFilters,revertFilters:e.revertFilters,filters:e.state.filters,search:e.state.search,hasActiveFilters:e.hasActiveFilters}}function Oe(e,t,n){let{data:r,extend:i}=b(e,Z),a=r??Z,[o,s]=(0,H.useState)(n?.initialData),[c,l]=(0,H.useState)(void 0),d=(0,H.useRef)(0),f=(0,H.useRef)(t);f.current=t;let p=(0,H.useRef)(n?.initialData);p.current=n?.initialData;let m=n?.debounce??0,h=(0,H.useRef)(void 0);m>0&&!h.current&&(h.current=u(e=>f.current(e),m));let g=JSON.stringify(a.filters),_=a.search;return(0,H.useEffect)(()=>{let e=JSON.parse(g),t=++d.current,n=t===1,r=!1;(!n||!p.current)&&i({resultLoading:!0}),l(void 0);let a=m>0&&!n;return(a?h.current:f.current)({filters:e,search:_}).then(e=>{!r&&t===d.current&&(s(e),i({resultLoading:!1,resultCount:Array.isArray(e)?e.length:void 0}))}).catch(e=>{!r&&t===d.current&&(l(e instanceof Error?e:Error(String(e))),i({resultLoading:!1}))}),()=>{r=!0,a&&h.current?.cancel()}},[g,_,i,m]),{data:o,loading:a.resultLoading??!1,error:c}}var ke=new Set([`__proto__`,`constructor`,`prototype`]);function Ae(e){if(typeof e!=`object`||!e||Array.isArray(e))return{};let t={};for(let n of Object.keys(e)){if(ke.has(n))continue;let r=e[n];if(!je(r))continue;let i={value:r.value,label:r.label};r.categoryLabel!==void 0&&(i.categoryLabel=r.categoryLabel),t[n]=i}return t}function je(e){if(typeof e!=`object`||!e||Array.isArray(e))return!1;let t=e;if(typeof t.label!=`string`||t.categoryLabel!==void 0&&typeof t.categoryLabel!=`string`)return!1;let n=t.value;return!(typeof n!=`string`&&typeof n!=`number`&&typeof n!=`boolean`&&(typeof n!=`object`||!n||Array.isArray(n)))}var Me={search:``,filters:{}};function Ne(e,t){let{excludeSearch:n=!1}=t??{},r=`${e}-search`,i=`${e}-filters`,{extend:a}=b(e,Me),{filters:o,search:s}=Ee(e),c=(0,H.useRef)(!1),l=(0,H.useCallback)((e,t)=>{if(c.current)return;let a=new URL(window.location.href);n||(e?a.searchParams.set(r,e):a.searchParams.delete(r)),Object.keys(t).length>0?a.searchParams.set(i,JSON.stringify(t)):a.searchParams.delete(i),window.history.replaceState({},``,a.toString())},[r,i,n]),u=(0,H.useCallback)(()=>{let e=new URLSearchParams(window.location.search),t=n?``:e.get(r)??``,a={},o=e.get(i);if(o)try{a=Ae(JSON.parse(o))}catch{}return{search:t,filters:a}},[r,i,n]),d=(0,H.useCallback)(()=>{let{search:e,filters:t}=u();(e||Object.keys(t).length>0)&&(c.current=!0,a({search:e,filters:t}),c.current=!1)},[u,a]);p(()=>{d();let e=()=>{d()};return window.addEventListener(`popstate`,e),()=>window.removeEventListener(`popstate`,e)},[d]);let f=(0,H.useRef)({search:``,filters:{}});return p(()=>{let e=f.current,t=JSON.stringify(e.filters)!==JSON.stringify(o),n=e.search!==s;(t||n)&&(f.current={search:s,filters:o},l(s,o))},[s,o,l]),{readFromUrl:u}}var Pe={search:``,filters:{}};function Fe(e,{useSearchParams:t,excludeSearch:n=!1}){let r=`${e}-search`,i=`${e}-filters`,{extend:a}=b(e,Pe),{filters:o,search:s}=Ee(e),[c,l]=t(),u=(0,H.useRef)(!1),d=(0,H.useRef)(c);d.current=c;let f=(0,H.useCallback)((e,t)=>{if(u.current)return;let a=new URLSearchParams(d.current);n||(e?a.set(r,e):a.delete(r)),Object.keys(t).length>0?a.set(i,JSON.stringify(t)):a.delete(i),l(a,{replace:!0})},[r,i,l,n]),m=(0,H.useCallback)(()=>{let e=n?``:c.get(r)??``,t={},a=c.get(i);if(a)try{t=Ae(JSON.parse(a))}catch{}return{search:e,filters:t}},[c,r,i,n]);p(()=>{let{search:e,filters:t}=m();(e||Object.keys(t).length>0)&&(u.current=!0,a({search:e,filters:t}),u.current=!1)},[m,a]);let h=(0,H.useRef)({search:``,filters:{}});return p(()=>{let e=h.current,t=JSON.stringify(e.filters)!==JSON.stringify(o),n=e.search!==s;(t||n)&&(h.current={search:s,filters:o},f(s,o))},[s,o,f]),{readFromUrl:m}}var Ie={search:``,filters:{}};function Le(e,{useRouter:t,usePathname:n,useSearchParams:r,excludeSearch:i=!1}){let a=`${e}-search`,o=`${e}-filters`,{extend:s}=b(e,Ie),{filters:c,search:l}=Ee(e),u=t(),d=n(),f=r(),m=(0,H.useRef)(!1),h=(0,H.useCallback)((e,t)=>{if(m.current)return;let n=new URLSearchParams(f.toString());i||(e?n.set(a,e):n.delete(a)),Object.keys(t).length>0?n.set(o,JSON.stringify(t)):n.delete(o),u.replace(`${d}?${n.toString()}`)},[a,o,f,d,u,i]),g=(0,H.useCallback)(()=>{let e=i?``:f.get(a)??``,t={},n=f.get(o);if(n)try{t=Ae(JSON.parse(n))}catch{}return{search:e,filters:t}},[f,a,o,i]);p(()=>{let{search:e,filters:t}=g();(e||Object.keys(t).length>0)&&(m.current=!0,s({search:e,filters:t}),m.current=!1)},[g,s]);let _=(0,H.useRef)({search:``,filters:{}});return p(()=>{let e=_.current,t=JSON.stringify(e.filters)!==JSON.stringify(c),n=e.search!==l;(t||n)&&(_.current={search:l,filters:c},h(l,c))},[l,c,h]),{readFromUrl:g}}var Q=e({ActiveFilters:()=>me,Content:()=>he,Date:()=>ye,Header:()=>ce,Highlighting:()=>Ce,Item:()=>X,MultiSelection:()=>xe,NoResults:()=>ge,Panel:()=>ue,PanelButton:()=>fe,QuickFilters:()=>Se,ResultCount:()=>_e,Root:()=>J,Search:()=>le,Selection:()=>be,SortButton:()=>Te,Toolbar:()=>Y,useFilter:()=>Ee,useFilterAsync:()=>Oe,useFilterContext:()=>De,useNextRouter:()=>Le,useQueryLocator:()=>Ne,useReactRouter:()=>Fe}),Re=e({AsyncResults:()=>Ue,CustomFilter:()=>Ve,DecoupledHook:()=>He,ManualBehavior:()=>We,QuickFilters:()=>Ke,SearchOnly:()=>Je,ToolbarActionsOnly:()=>qe,WithDateAndSelection:()=>ze,WithMultiSelection:()=>Ge,WithPredefinedFilters:()=>Be,WithQueryLocator:()=>Xe,WithSortButton:()=>Ye}),ze=()=>(0,K.jsx)(V,{hideCode:!0,scope:{downloadIcon:s},"data-visual-test":`filter-date-selection`,stableName:`WithDateAndSelection`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,Button:x,List:P,Value:L},noInline:!0,children:`const Example = () => {
  const transactions = [
    {
      id: 1,
      name: 'Rema 1000',
      amount: -245,
      type: 'card',
    },
    {
      id: 2,
      name: 'DNB Salary',
      amount: 25000,
      type: 'transfer',
    },
    {
      id: 3,
      name: 'Elkjøp',
      amount: -3999,
      type: 'card',
    },
  ]
  const { filters, search } = Filter.useFilter('date-selection-demo')
  const filtered = transactions.filter((tx) => {
    if (
      search &&
      !tx.name.toLowerCase().includes(search.toLowerCase()) &&
      !String(tx.amount).includes(search)
    ) {
      return false
    }
    const selectedTypes = Object.keys(filters)
      .filter((key) => key.startsWith('/type/'))
      .map((key) => key.replace('/type/', ''))
    if (selectedTypes.length > 0 && !selectedTypes.includes(tx.type)) {
      return false
    }
    return true
  })
  return (
    <>
      <Filter.Root id="date-selection-demo" resultCount={filtered.length}>
        <Filter.Header>
          <Filter.Toolbar>
            <Filter.Search
              label="Label"
              placeholder="Store name, amount..."
            />
            <Filter.Toolbar.Actions>
              <Button
                variant="tertiary"
                icon={downloadIcon}
                iconPosition="left"
              >
                Download
              </Button>
              <Filter.PanelButton />
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>

          <Filter.Panel>
            <Filter.Date />
            <Filter.Selection
              label="Payment type"
              filterKey="/type"
              data={[
                {
                  value: 'card',
                  label: 'Card',
                },
                {
                  value: 'transfer',
                  label: 'Transfer',
                },
              ]}
            />
          </Filter.Panel>

          <Filter.ActiveFilters />
          <Filter.ResultCount />
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="date-selection-demo">
        <List.Container>
          <Filter.NoResults />
          {filtered.map((tx) => (
            <List.Item.Basic
              key={tx.id}
              title={<Filter.Highlighting>{tx.name}</Filter.Highlighting>}
            >
              <List.Cell.End>
                <Value.Currency value={tx.amount} />
              </List.Cell.End>
            </List.Item.Basic>
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`}),Be=()=>(0,K.jsx)(V,{hideCode:!0,scope:{downloadIcon:s},stableName:`WithPredefinedFilters`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,Button:x,List:P,Value:L},noInline:!0,children:`const Example = () => {
  const transactions = [
    {
      id: 1,
      name: 'Rema 1000',
      amount: -245,
      type: 'card',
    },
    {
      id: 2,
      name: 'DNB Salary',
      amount: 25000,
      type: 'transfer',
    },
    {
      id: 3,
      name: 'Elkjøp',
      amount: -3999,
      type: 'card',
    },
  ]
  const { filters, search } = Filter.useFilter('predefined-demo')
  const filtered = transactions.filter((tx) => {
    if (
      search &&
      !tx.name.toLowerCase().includes(search.toLowerCase()) &&
      !String(tx.amount).includes(search)
    ) {
      return false
    }
    const selectedTypes = Object.keys(filters)
      .filter((key) => key.startsWith('/type/'))
      .map((key) => key.replace('/type/', ''))
    if (selectedTypes.length > 0 && !selectedTypes.includes(tx.type)) {
      return false
    }
    return true
  })
  return (
    <>
      <Filter.Root
        id="predefined-demo"
        resultCount={filtered.length}
        defaultFilters={{
          '/type/card': {
            value: 'card',
            label: 'Card',
            categoryLabel: 'Payment type',
          },
          '/type/transfer': {
            value: 'transfer',
            label: 'Transfer',
            categoryLabel: 'Payment type',
          },
          '/status/pending': {
            value: 'pending',
            label: 'Pending',
            categoryLabel: 'Status',
          },
          '/status/completed': {
            value: 'completed',
            label: 'Completed',
            categoryLabel: 'Status',
          },
          '/status/failed': {
            value: 'failed',
            label: 'Failed',
            categoryLabel: 'Status',
          },
          '/region/oslo': {
            value: 'oslo',
            label: 'Oslo',
            categoryLabel: 'Region',
          },
          '/region/bergen': {
            value: 'bergen',
            label: 'Bergen',
            categoryLabel: 'Region',
          },
          '/region/trondheim': {
            value: 'trondheim',
            label: 'Trondheim',
            categoryLabel: 'Region',
          },
          '/category/groceries': {
            value: 'groceries',
            label: 'Groceries',
            categoryLabel: 'Category',
          },
          '/category/electronics': {
            value: 'electronics',
            label: 'Electronics',
            categoryLabel: 'Category',
          },
          '/category/salary': {
            value: 'salary',
            label: 'Salary',
            categoryLabel: 'Category',
          },
          '/category/subscription': {
            value: 'subscription',
            label: 'Subscription',
            categoryLabel: 'Category',
          },
        }}
      >
        <Filter.Header>
          <Filter.Toolbar>
            <Filter.Search
              label="Label"
              placeholder="Store name, amount..."
            />
            <Filter.Toolbar.Actions>
              <Button
                variant="tertiary"
                icon={downloadIcon}
                iconPosition="left"
              >
                Download
              </Button>
              <Filter.PanelButton />
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>

          <Filter.Panel>
            <Filter.Date />
            <Filter.Selection
              label="Payment type"
              filterKey="/type"
              data={[
                {
                  value: 'card',
                  label: 'Card',
                },
                {
                  value: 'transfer',
                  label: 'Transfer',
                },
              ]}
            />
          </Filter.Panel>

          <Filter.ActiveFilters
            showCategoryLabel
            collapsibleThreshold={5}
          />
          <Filter.ResultCount />
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="predefined-demo">
        <List.Container>
          <Filter.NoResults />
          {filtered.map((tx) => (
            <List.Item.Basic
              key={tx.id}
              title={<Filter.Highlighting>{tx.name}</Filter.Highlighting>}
            >
              <List.Cell.End>
                <Value.Currency value={tx.amount} />
              </List.Cell.End>
            </List.Item.Basic>
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`}),Ve=()=>(0,K.jsx)(V,{hideCode:!0,stableName:`CustomFilter`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,ToggleButton:T,List:P},noInline:!0,children:`function ToggleFilter({ label, filterKey }) {
  const { setFilter, getFilter } = Filter.useFilterContext()
  const isActive = !!getFilter(filterKey)
  return (
    <Filter.Item label={label} filterKey={filterKey}>
      <ToggleButton
        checked={isActive}
        onChange={({ checked }) => {
          if (checked) {
            setFilter(filterKey, {
              value: true,
              label,
            })
          } else {
            setFilter(filterKey, undefined)
          }
        }}
      >
        {label}
      </ToggleButton>
    </Filter.Item>
  )
}
const Example = () => {
  const places = [
    {
      id: 1,
      name: 'Olivia Restaurant',
      category: 'restaurant',
      favorite: true,
    },
    {
      id: 2,
      name: 'Grand Hotel',
      category: 'hotel',
      favorite: false,
    },
    {
      id: 3,
      name: 'Kaffebrenneriet',
      category: 'cafe',
      favorite: true,
    },
    {
      id: 4,
      name: 'Maaemo',
      category: 'restaurant',
      favorite: false,
    },
  ]
  const { filters, search } = Filter.useFilter('custom-demo')
  const selectedCategories = Object.keys(filters)
    .filter((key) => key.startsWith('/category/'))
    .map((key) => key.replace('/category/', ''))
  const favoritesOnly = !!filters['/favorites']
  const filtered = places.filter((place) => {
    if (
      search &&
      !place.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return false
    }
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(place.category)
    ) {
      return false
    }
    if (favoritesOnly && !place.favorite) {
      return false
    }
    return true
  })
  return (
    <>
      <Filter.Root id="custom-demo" resultCount={filtered.length}>
        <Filter.Header>
          <Filter.Toolbar>
            <Filter.Search label="Search" placeholder="Search..." />
            <Filter.Toolbar.Actions>
              <Filter.PanelButton />
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>
          <Filter.Panel>
            <Filter.Selection
              label="Category"
              filterKey="/category"
              data={[
                {
                  value: 'restaurant',
                  label: 'Restaurant',
                },
                {
                  value: 'hotel',
                  label: 'Hotel',
                },
                {
                  value: 'cafe',
                  label: 'Cafe',
                },
              ]}
            />
            <ToggleFilter label="Favorites only" filterKey="/favorites" />
          </Filter.Panel>
          <Filter.ActiveFilters />
          <Filter.ResultCount />
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="custom-demo">
        <List.Container>
          <Filter.NoResults />
          {filtered.map((place) => (
            <List.Item.Basic
              key={place.id}
              title={
                <Filter.Highlighting>{place.name}</Filter.Highlighting>
              }
            />
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`}),He=()=>(0,K.jsx)(V,{hideCode:!0,stableName:`DecoupledHook`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,P:C,List:P,Value:L},noInline:!0,children:`function TransactionList() {
  const { search } = Filter.useFilter('decoupled-demo')
  const data = [
    {
      id: 1,
      name: 'Rema 1000',
      amount: -245,
    },
    {
      id: 2,
      name: 'Kiwi',
      amount: -189,
    },
    {
      id: 3,
      name: 'Salary',
      amount: 35000,
    },
  ]
  const filtered = data.filter((item) => {
    if (
      search &&
      !item.name.toLowerCase().includes(search.toLowerCase()) &&
      !String(item.amount).includes(search)
    ) {
      return false
    }
    return true
  })
  return (
    <Filter.Content connectedTo="decoupled-demo">
      <P space>
        {filtered.length > 0 && <P>Antall: {filtered.length}</P>}
      </P>
      {filtered.length > 0 && (
        <List.Container>
          <Filter.NoResults />
          {filtered.map((item) => (
            <List.Item.Basic
              key={item.id}
              title={
                <Filter.Highlighting>{item.name}</Filter.Highlighting>
              }
            >
              <List.Cell.End>
                <Value.Currency value={item.amount} />
              </List.Cell.End>
            </List.Item.Basic>
          ))}
        </List.Container>
      )}
    </Filter.Content>
  )
}
render(
  <>
    <Filter.Root id="decoupled-demo">
      <Filter.Search label="Search" placeholder="Search results..." />
      <Filter.ActiveFilters />
      <Filter.NoResults />
    </Filter.Root>

    <TransactionList />
  </>
)
`}),Ue=()=>(0,K.jsx)(V,{hideCode:!0,stableName:`AsyncResults`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:P,Value:L},noInline:!0,children:`const allTransactions = [
  {
    id: 1,
    name: 'Rema 1000',
    amount: -245,
    status: 'active',
  },
  {
    id: 2,
    name: 'DNB Salary',
    amount: 25000,
    status: 'active',
  },
  {
    id: 3,
    name: 'Elkjøp',
    amount: -3999,
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Kiwi',
    amount: -189,
    status: 'active',
  },
  {
    id: 5,
    name: 'Spotify',
    amount: -119,
    status: 'inactive',
  },
]

// Simulates an API call with a delay
function fetchFiltered(filters, search) {
  return new Promise<typeof allTransactions>((resolve) => {
    setTimeout(() => {
      const result = allTransactions.filter((tx) => {
        if (
          search &&
          !tx.name.toLowerCase().includes(search.toLowerCase()) &&
          !String(tx.amount).includes(search)
        ) {
          return false
        }
        const selectedStatuses = Object.keys(filters)
          .filter((key) => key.startsWith('/status/'))
          .map((key) => key.replace('/status/', ''))
        if (
          selectedStatuses.length > 0 &&
          !selectedStatuses.includes(tx.status)
        ) {
          return false
        }
        return true
      })
      resolve(result)
    }, 1000)
  })
}
const Example = () => {
  const { data: filtered } = Filter.useFilterAsync(
    'async-demo',
    ({ filters, search }) => fetchFiltered(filters, search),
    {
      initialData: allTransactions,
      debounce: 300,
    }
  )
  return (
    <>
      <Filter.Root id="async-demo">
        <Filter.Header>
          <Filter.Toolbar>
            <Filter.Search
              label="Search"
              placeholder="Search for something..."
            />
            <Filter.Toolbar.Actions>
              <Filter.Date />
              <Filter.PanelButton />
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>
          <Filter.Panel>
            <Filter.Selection
              label="Status"
              filterKey="/status"
              defaultOpen
              data={[
                {
                  value: 'active',
                  label: 'Active',
                },
                {
                  value: 'inactive',
                  label: 'Inactive',
                },
              ]}
            />
          </Filter.Panel>
          <Filter.ActiveFilters />
          <Filter.ResultCount />
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="async-demo">
        <List.Container>
          <Filter.NoResults />
          {filtered.map((tx) => (
            <List.Item.Basic
              key={tx.id}
              title={<Filter.Highlighting>{tx.name}</Filter.Highlighting>}
            >
              <List.Cell.End>
                <Value.Currency value={tx.amount} />
              </List.Cell.End>
            </List.Item.Basic>
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`}),We=()=>(0,K.jsx)(V,{hideCode:!0,"data-visual-test":`filter-manual-behavior`,stableName:`ManualBehavior`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:P,Value:L},noInline:!0,children:`const allTransactions = [
  {
    id: 1,
    name: 'Rema 1000',
    amount: -245,
    status: 'active',
  },
  {
    id: 2,
    name: 'DNB Salary',
    amount: 25000,
    status: 'active',
  },
  {
    id: 3,
    name: 'Elkjøp',
    amount: -3999,
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Kiwi',
    amount: -189,
    status: 'active',
  },
  {
    id: 5,
    name: 'Spotify',
    amount: -119,
    status: 'inactive',
  },
]
function fetchFiltered(filters, search) {
  return new Promise<typeof allTransactions>((resolve) => {
    setTimeout(() => {
      const result = allTransactions.filter((tx) => {
        if (
          search &&
          !tx.name.toLowerCase().includes(search.toLowerCase()) &&
          !String(tx.amount).includes(search)
        ) {
          return false
        }
        const selectedStatuses = Object.keys(filters)
          .filter((key) => key.startsWith('/status/'))
          .map((key) => key.replace('/status/', ''))
        if (
          selectedStatuses.length > 0 &&
          !selectedStatuses.includes(tx.status)
        ) {
          return false
        }
        return true
      })
      resolve(result)
    }, 1000)
  })
}
const Example = () => {
  const { data: filtered } = Filter.useFilterAsync(
    'manual-demo',
    ({ filters, search }) => fetchFiltered(filters, search),
    {
      initialData: allTransactions,
    }
  )
  return (
    <>
      <Filter.Root id="manual-demo" behavior="manual">
        <Filter.Header>
          <Filter.Toolbar>
            <Filter.Search
              label="Search"
              placeholder="Search for something..."
            />
            <Filter.Toolbar.Actions>
              <Filter.PanelButton />
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>
          <Filter.Panel>
            <Filter.Selection
              label="Status"
              filterKey="/status"
              defaultOpen
              data={[
                {
                  value: 'active',
                  label: 'Active',
                },
                {
                  value: 'inactive',
                  label: 'Inactive',
                },
              ]}
            />
          </Filter.Panel>
          <Filter.ActiveFilters />
          <Filter.ResultCount />
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="manual-demo">
        <List.Container>
          <Filter.NoResults />
          {filtered.map((tx) => (
            <List.Item.Basic
              key={tx.id}
              title={<Filter.Highlighting>{tx.name}</Filter.Highlighting>}
            >
              <List.Cell.End>
                <Value.Currency value={tx.amount} />
              </List.Cell.End>
            </List.Item.Basic>
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`}),Ge=()=>(0,K.jsx)(V,{hideCode:!0,"data-visual-test":`filter-multi-selection-grid`,stableName:`WithMultiSelection`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,Grid:I,Heading:ae,List:P,Value:L},noInline:!0,children:`const clients = [
  {
    value: 'acme',
    title: 'Acme Corp',
  },
  {
    value: 'globex',
    title: 'Globex Inc',
  },
  {
    value: 'initech',
    title: 'Initech Ltd',
  },
  {
    value: 'umbrella',
    title: 'Umbrella Group',
  },
]
const transactions = [
  {
    id: 1,
    name: 'Invoice #1012',
    amount: 45000,
    client: 'acme',
  },
  {
    id: 2,
    name: 'Invoice #1013',
    amount: 12500,
    client: 'globex',
  },
  {
    id: 3,
    name: 'Credit note #204',
    amount: -3200,
    client: 'acme',
  },
  {
    id: 4,
    name: 'Invoice #1014',
    amount: 78000,
    client: 'initech',
  },
  {
    id: 5,
    name: 'Invoice #1015',
    amount: 9400,
    client: 'umbrella',
  },
  {
    id: 6,
    name: 'Invoice #1016',
    amount: 23000,
    client: 'globex',
  },
]
const Example = () => {
  const { filters, search } = Filter.useFilter('multi-selection-demo')
  const selectedClients = Object.keys(filters)
    .filter((key) => key.startsWith('/client/'))
    .map((key) => key.replace('/client/', ''))
  const filtered = transactions.filter((tx) => {
    if (
      search &&
      !tx.name.toLowerCase().includes(search.toLowerCase()) &&
      !String(tx.amount).includes(search)
    ) {
      return false
    }
    if (
      selectedClients.length > 0 &&
      !selectedClients.includes(tx.client)
    ) {
      return false
    }
    return true
  })
  return (
    <Grid.Container
      columnGap="large"
      rowGap="large"
      style={{
        marginInline: 'auto',
        maxInlineSize: 'var(--layout-medium)',
      }}
    >
      <Grid.Item
        span={{
          small: 'full',
          large: [1, 4],
        }}
      >
        <Heading size="large" top={false}>
          Filter
        </Heading>
        <Filter.Root
          id="multi-selection-demo"
          resultCount={filtered.length}
        >
          <Filter.Toolbar>
            <Filter.Search
              label="Search"
              placeholder="Invoice number..."
            />
            <Filter.Toolbar.Actions>
              <Filter.Date />
              <Filter.PanelButton />
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>
          <Filter.Panel>
            <Filter.MultiSelection
              label="Client"
              filterKey="/client"
              data={clients}
            />
          </Filter.Panel>
          <Filter.ActiveFilters />
          <Filter.ResultCount />
        </Filter.Root>
      </Grid.Item>

      <Grid.Item
        span={{
          small: 'full',
          large: [5, 12],
        }}
      >
        <Filter.Content connectedTo="multi-selection-demo">
          <Heading size="large" top={false}>
            Transactions
          </Heading>
          <List.Container>
            <Filter.NoResults />
            {filtered.map((tx) => (
              <List.Item.Basic
                key={tx.id}
                title={
                  <Filter.Highlighting>{tx.name}</Filter.Highlighting>
                }
              >
                <List.Cell.End>
                  <Value.Currency value={tx.amount} />
                </List.Cell.End>
              </List.Item.Basic>
            ))}
          </List.Container>
        </Filter.Content>
      </Grid.Item>
    </Grid.Container>
  )
}
render(<Example />)
`}),Ke=()=>(0,K.jsx)(V,{hideCode:!0,stableName:`QuickFilters`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,ToggleButton:T,List:P,Value:L},noInline:!0,children:`function QuickFilter({ label, filterKey }) {
  const { setFilter, getFilter } = Filter.useFilterContext()
  const isActive = !!getFilter(filterKey)
  return (
    <ToggleButton
      checked={isActive}
      onChange={({ checked }) => {
        if (checked) {
          setFilter(filterKey, {
            value: true,
            label,
          })
        } else {
          setFilter(filterKey, undefined)
        }
      }}
    >
      {label}
    </ToggleButton>
  )
}
const Example = () => {
  const transactions = [
    {
      id: 1,
      name: 'Rema 1000',
      amount: -245,
      type: 'card',
    },
    {
      id: 2,
      name: 'DNB Salary',
      amount: 25000,
      type: 'transfer',
    },
    {
      id: 3,
      name: 'Elkjøp',
      amount: -3999,
      type: 'card',
    },
    {
      id: 4,
      name: 'Kiwi',
      amount: -189,
      type: 'card',
    },
  ]
  const { filters, search } = Filter.useFilter('quick-filters-demo')
  const showCards = !!filters['/card']
  const showTransfers = !!filters['/transfer']
  const filtered = transactions.filter((tx) => {
    if (
      search &&
      !tx.name.toLowerCase().includes(search.toLowerCase()) &&
      !String(tx.amount).includes(search)
    ) {
      return false
    }
    if (showCards && tx.type !== 'card') {
      return false
    }
    if (showTransfers && tx.type !== 'transfer') {
      return false
    }
    return true
  })
  return (
    <>
      <Filter.Root id="quick-filters-demo" resultCount={filtered.length}>
        <Filter.Header>
          <Filter.QuickFilters>
            <QuickFilter label="Card" filterKey="/card" />
            <QuickFilter label="Transfer" filterKey="/transfer" />
          </Filter.QuickFilters>
          <Filter.ResultCount />
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="quick-filters-demo">
        <List.Container>
          <Filter.NoResults />
          {filtered.map((tx) => (
            <List.Item.Action
              key={tx.id}
              title={<Filter.Highlighting>{tx.name}</Filter.Highlighting>}
            >
              <List.Cell.End>
                <Value.Currency value={tx.amount} />
              </List.Cell.End>
            </List.Item.Action>
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`}),qe=()=>(0,K.jsx)(V,{hideCode:!0,scope:{tableIcon:v,downloadIcon:s},stableName:`ToolbarActionsOnly`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,Button:x,List:P,Value:L},noInline:!0,children:`const Example = () => {
  const items = [
    {
      id: 1,
      name: 'Report Q1',
      amount: 12000,
    },
    {
      id: 2,
      name: 'Report Q2',
      amount: 15000,
    },
    {
      id: 3,
      name: 'Report Q3',
      amount: 9800,
    },
  ]
  return (
    <>
      <Filter.Root id="actions-only-demo">
        <Filter.Header>
          <Filter.Toolbar>
            <Filter.Toolbar.Actions>
              <Button
                variant="tertiary"
                icon={tableIcon}
                iconPosition="left"
              >
                Layout
              </Button>
              <Button
                variant="tertiary"
                icon={downloadIcon}
                iconPosition="left"
              >
                Download
              </Button>
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="actions-only-demo">
        <List.Container>
          {items.map((item) => (
            <List.Item.Action
              key={item.id}
              title={
                <Filter.Highlighting>{item.name}</Filter.Highlighting>
              }
            >
              <List.Cell.End>
                <Value.Currency value={item.amount} />
              </List.Cell.End>
            </List.Item.Action>
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`}),Je=()=>(0,K.jsx)(V,{hideCode:!0,stableName:`SearchOnly`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:P,Value:L},noInline:!0,children:`const Example = () => {
  const items = [
    {
      id: 1,
      name: 'Rema 1000',
      amount: -245,
    },
    {
      id: 2,
      name: 'Kiwi',
      amount: -189,
    },
    {
      id: 3,
      name: 'Salary',
      amount: 35000,
    },
  ]
  const { search } = Filter.useFilter('search-only-demo')
  const filtered = items.filter((item) => {
    if (
      search &&
      !item.name.toLowerCase().includes(search.toLowerCase()) &&
      !String(item.amount).includes(search)
    ) {
      return false
    }
    return true
  })
  return (
    <>
      <Filter.Root id="search-only-demo" resultCount={filtered.length}>
        <Filter.Header>
          <Filter.Toolbar>
            <Filter.Search
              submitBehavior="manual"
              label="Search"
              placeholder="Search..."
            />
          </Filter.Toolbar>
          <Filter.ResultCount />
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="search-only-demo">
        <List.Container>
          <Filter.NoResults />
          {filtered.map((item) => (
            <List.Item.Action
              key={item.id}
              title={
                <Filter.Highlighting>{item.name}</Filter.Highlighting>
              }
            >
              <List.Cell.End>
                <Value.Currency value={item.amount} />
              </List.Cell.End>
            </List.Item.Action>
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`}),Ye=()=>(0,K.jsx)(V,{hideCode:!0,stableName:`WithSortButton`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:P,Value:L},noInline:!0,children:`const Example = () => {
  const transactions = [
    {
      id: 1,
      name: 'Rema 1000',
      amount: -245,
    },
    {
      id: 2,
      name: 'DNB Salary',
      amount: 25000,
    },
    {
      id: 3,
      name: 'Elkjøp',
      amount: -3999,
    },
    {
      id: 4,
      name: 'Kiwi',
      amount: -189,
    },
  ]
  const sortOptions = [
    {
      selectedKey: 'newest',
      content: 'Newest first',
    },
    {
      selectedKey: 'oldest',
      content: 'Oldest first',
    },
    {
      selectedKey: 'amount-high',
      content: 'Amount high–low',
    },
    {
      selectedKey: 'amount-low',
      content: 'Amount low–high',
    },
  ]
  const [sortKey, setSortKey] = useState('newest')
  const { search } = Filter.useFilter('sort-demo')
  const filtered = transactions
    .filter((tx) => {
      if (
        search &&
        !tx.name.toLowerCase().includes(search.toLowerCase()) &&
        !String(tx.amount).includes(search)
      ) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      switch (sortKey) {
        case 'oldest':
          return a.id - b.id
        case 'amount-high':
          return b.amount - a.amount
        case 'amount-low':
          return a.amount - b.amount
        default:
          return b.id - a.id
      }
    })
  return (
    <>
      <Filter.Root id="sort-demo" resultCount={filtered.length}>
        <Filter.Header>
          <Filter.Toolbar>
            <Filter.Search label="Search" placeholder="Store name..." />
            <Filter.Toolbar.Actions>
              <Filter.SortButton
                data={sortOptions}
                value={sortKey}
                onChange={({ data: { selectedKey } }) => {
                  setSortKey(String(selectedKey))
                }}
              />
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>
          <Filter.ResultCount />
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="sort-demo">
        <List.Container>
          <Filter.NoResults />
          {filtered.map((tx) => (
            <List.Item.Basic
              key={tx.id}
              title={<Filter.Highlighting>{tx.name}</Filter.Highlighting>}
            >
              <List.Cell.End>
                <Value.Currency value={tx.amount} />
              </List.Cell.End>
            </List.Item.Basic>
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`}),Xe=()=>(0,K.jsx)(V,{hideCode:!0,stableName:`WithQueryLocator`,sourceImports:[`import { useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:P,Value:L},noInline:!0,children:`const transactions = [
  {
    id: 1,
    name: 'Rema 1000',
    amount: -245,
    status: 'active',
  },
  {
    id: 2,
    name: 'DNB Salary',
    amount: 25000,
    status: 'active',
  },
  {
    id: 3,
    name: 'Elkjøp',
    amount: -3999,
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Kiwi',
    amount: -189,
    status: 'active',
  },
]
const Example = () => {
  // Syncs filter state to/from URL query parameters
  Filter.useQueryLocator('query-locator-demo', {
    // excludeSearch: true, // You can exclude search from the URL if you want, by default it is included
  })
  const { filters, search } = Filter.useFilter('query-locator-demo')
  const selectedStatuses = Object.keys(filters)
    .filter((key) => key.startsWith('/status/'))
    .map((key) => key.replace('/status/', ''))
  const filtered = transactions.filter((tx) => {
    if (
      search &&
      !tx.name.toLowerCase().includes(search.toLowerCase()) &&
      !String(tx.amount).includes(search)
    ) {
      return false
    }
    if (
      selectedStatuses.length > 0 &&
      !selectedStatuses.includes(tx.status)
    ) {
      return false
    }
    return true
  })
  return (
    <>
      <Filter.Root id="query-locator-demo" resultCount={filtered.length}>
        <Filter.Header>
          <Filter.Toolbar>
            <Filter.Search label="Search" placeholder="Store name..." />
            <Filter.Toolbar.Actions>
              <Filter.PanelButton />
            </Filter.Toolbar.Actions>
          </Filter.Toolbar>
          <Filter.Panel>
            <Filter.Selection
              label="Status"
              filterKey="/status"
              data={[
                {
                  value: 'active',
                  label: 'Active',
                },
                {
                  value: 'inactive',
                  label: 'Inactive',
                },
              ]}
            />
          </Filter.Panel>
          <Filter.ActiveFilters />
          <Filter.ResultCount />
        </Filter.Header>
      </Filter.Root>

      <Filter.Content connectedTo="query-locator-demo">
        <List.Container>
          <Filter.NoResults />
          {filtered.map((tx) => (
            <List.Item.Basic
              key={tx.id}
              title={<Filter.Highlighting>{tx.name}</Filter.Highlighting>}
            >
              <List.Cell.End>
                <Value.Currency value={tx.amount} />
              </List.Cell.End>
            </List.Item.Basic>
          ))}
        </List.Container>
      </Filter.Content>
    </>
  )
}
render(<Example />)
`});function Ze(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...z(),...e.components};return Re||$(`Examples`,!1),Ue||$(`Examples.AsyncResults`,!0),Ve||$(`Examples.CustomFilter`,!0),He||$(`Examples.DecoupledHook`,!0),We||$(`Examples.ManualBehavior`,!0),Ke||$(`Examples.QuickFilters`,!0),Je||$(`Examples.SearchOnly`,!0),qe||$(`Examples.ToolbarActionsOnly`,!0),ze||$(`Examples.WithDateAndSelection`,!0),Ge||$(`Examples.WithMultiSelection`,!0),Be||$(`Examples.WithPredefinedFilters`,!0),Xe||$(`Examples.WithQueryLocator`,!0),Ye||$(`Examples.WithSortButton`,!0),(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(t.h2,{children:`Demos`}),`
`,(0,K.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,K.jsxs)(t.p,{children:[`Combines `,(0,K.jsx)(t.code,{children:`Filter.Date`}),` and `,(0,K.jsx)(t.code,{children:`Filter.Selection`}),` inside `,(0,K.jsx)(t.code,{children:`Filter.Panel`}),`, with search, toolbar tools, and `,(0,K.jsx)(t.code,{children:`resultCount`}),` for the number of matching transactions. Uses the list layout pattern.`]}),`
`,(0,K.jsx)(ze,{}),`
`,(0,K.jsx)(t.h3,{children:`Custom filter type`}),`
`,(0,K.jsxs)(t.p,{children:[`Build your own filter using `,(0,K.jsx)(t.code,{children:`Filter.useFilterContext()`}),` and `,(0,K.jsx)(t.code,{children:`Filter.Item`}),`. This example shows a toggle filter alongside the built-in `,(0,K.jsx)(t.code,{children:`Filter.Selection`}),`.`]}),`
`,(0,K.jsx)(Ve,{}),`
`,(0,K.jsx)(t.h3,{children:`Async result count`}),`
`,(0,K.jsxs)(t.p,{children:[`When the result count comes from an API, use `,(0,K.jsx)(t.code,{children:`resultLoading`}),` to show a loading state while the request is in progress. Open the filter panel and change a filter to see the skeleton effect. This example uses `,(0,K.jsx)(t.code,{children:`debounce: 300`}),` to delay the API call while the user is typing.`]}),`
`,(0,K.jsx)(Ue,{}),`
`,(0,K.jsx)(t.h3,{children:`Manual behavior`}),`
`,(0,K.jsxs)(t.p,{children:[`With `,(0,K.jsx)(t.code,{children:`behavior="manual"`}),`, panel filter changes are buffered internally and not emitted until the user clicks "Apply filter". Search input is still emitted in real time. The panel shows an Apply button and a Cancel button that reverts unsaved changes.`]}),`
`,(0,K.jsx)(We,{}),`
`,(0,K.jsx)(t.h3,{children:`Predefined filters`}),`
`,(0,K.jsxs)(t.p,{children:[`Use `,(0,K.jsx)(t.code,{children:`defaultFilters`}),` to pre-select filters on mount. The panel and relevant filter accordions open automatically.`]}),`
`,(0,K.jsx)(Be,{}),`
`,(0,K.jsx)(t.h3,{children:`URL sync with router hooks`}),`
`,(0,K.jsx)(t.p,{children:`Three hooks sync filter state with URL query parameters so users can share or bookmark filtered views. Back/forward navigation restores the previous filter state.`}),`
`,(0,K.jsxs)(t.ul,{children:[`
`,(0,K.jsxs)(t.li,{children:[(0,K.jsx)(t.strong,{children:(0,K.jsx)(t.code,{children:`Filter.useQueryLocator(id, options?)`})}),` — Uses the History API directly. Works without any router dependency. Pass `,(0,K.jsx)(t.code,{children:`{ excludeSearch: true }`}),` to exclude the search string from URL sync.`]}),`
`,(0,K.jsxs)(t.li,{children:[(0,K.jsx)(t.strong,{children:(0,K.jsx)(t.code,{children:`Filter.useReactRouter(id, { useSearchParams, excludeSearch? })`})}),` — Uses React Router's `,(0,K.jsx)(t.code,{children:`useSearchParams`}),`.`]}),`
`,(0,K.jsxs)(t.li,{children:[(0,K.jsx)(t.strong,{children:(0,K.jsx)(t.code,{children:`Filter.useNextRouter(id, { useRouter, usePathname, useSearchParams, excludeSearch? })`})}),` — Uses Next.js navigation hooks.`]}),`
`]}),`
`,(0,K.jsx)(Xe,{}),`
`,(0,K.jsx)(t.h3,{children:`With sort button`}),`
`,(0,K.jsxs)(t.p,{children:[`Use `,(0,K.jsx)(t.code,{children:`Filter.SortButton`}),` to add a sort dropdown to the toolbar. It renders a tertiary Dropdown with a sort icon and independent width. The sort state is managed outside the filter.`]}),`
`,(0,K.jsx)(Ye,{}),`
`,(0,K.jsx)(t.h3,{children:`Quick filters`}),`
`,(0,K.jsx)(t.p,{children:`Quick filters are toggle buttons placed directly below the toolbar, outside the panel. They let users apply common filters without opening the panel.`}),`
`,(0,K.jsx)(Ke,{}),`
`,(0,K.jsx)(t.h3,{children:`Toolbar with actions only`}),`
`,(0,K.jsx)(t.p,{children:`A toolbar with only action buttons and no search field.`}),`
`,(0,K.jsx)(qe,{}),`
`,(0,K.jsx)(t.h3,{children:`Search only`}),`
`,(0,K.jsx)(t.p,{children:`A simple search field with a secondary search button.`}),`
`,(0,K.jsx)(Je,{}),`
`,(0,K.jsx)(t.h3,{children:`Multi-selection filter with grid layout`}),`
`,(0,K.jsxs)(t.p,{children:[`Use `,(0,K.jsx)(t.code,{children:`Filter.MultiSelection`}),` inside `,(0,K.jsx)(t.code,{children:`Filter.Panel`}),` to let users select one or more clients. This example uses a `,(0,K.jsx)(t.code,{children:`Grid`}),` layout to place the filter and results side by side.`]}),`
`,(0,K.jsx)(Ge,{}),`
`,(0,K.jsx)(t.h3,{children:`Decoupled hook`}),`
`,(0,K.jsxs)(t.p,{children:[(0,K.jsx)(t.code,{children:`Filter.useFilter(id)`}),` can be called anywhere in the tree — the filter UI and data consumer can live in completely separate components.`]}),`
`,(0,K.jsx)(He,{})]})}function Qe(e={}){let{wrapper:t}={...z(),...e.components};return t?(0,K.jsx)(t,{...e,children:(0,K.jsx)(Ze,{...e})}):Ze(e)}function $(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{Qe as default};
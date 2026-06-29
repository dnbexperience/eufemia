import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{A as i,c as a,j as o}from"./Anchor-BPx9fjvj.js";import{a as s,c,s as l,ut as u}from"./SpacingUtils-Bo00Pdpx.js";import{t as d}from"./withComponentMarkers-ClZmq6eb.js";import{s as f,t as p}from"./Icon-C5IFEhlK.js";import{c as m}from"./Space-Dj8ZZAch.js";import{c as h,l as g,o as _,t as v}from"./ToggleButton-DfKpi57X.js";import{n as y,r as b,t as x}from"./table-CTFyNtDp.js";import{dt as ee,et as te,ft as S,gt as C,ht as ne,mt as w,pt as T,v as E}from"./forms-D54jfDKN.js";import{o as D,t as O}from"./Accordion-j22KWkR9.js";import{u as k}from"./FormStatus-82f84R4x.js";import{t as A}from"./Button-kSqfAUVR.js";import{F as j,f as M}from"./Autocomplete-eAFtuLbJ.js";import{t as N}from"./P-CVKBz4XO.js";import{u as re}from"./Table-DeLWJx8P.js";import{t as P}from"./Hr-CmqtZuzG.js";import{n as ie,r as F,t as I}from"./ListExport-BvrqCQ3d.js";import{t as ae}from"./Heading-OwOHsD1e.js";import{t as oe}from"./export-D2BP5X_D.js";import{L,U as R}from"./index-BsJ3GLEw.js";import{t as z}from"./ComponentBox-sLMgHvLi.js";var B=n(t()),V=(0,B.createContext)(void 0),H=(0,B.createContext)(void 0),U=(0,B.createContext)(null),W=n(r()),se={search:``,filters:{}};function G({search:e,filters:t}){return{search:e,filters:t}}function ce(e){let t=new Set;for(let n of Object.keys(e)){let e=n.lastIndexOf(`/`);e>0&&t.add(n.slice(0,e))}let n={};for(let e of Array.from(t))n[e]=!0;return n}function K({id:e,behavior:t=`realtime`,defaultFilters:n,defaultPanelOpen:r,resultCount:i,resultLoading:a,onChange:o,className:u,style:d,children:f,...p}){let{ariaLabel:m}=(0,B.useContext)(c).getTranslation({}).Filter,h=(0,B.useRef)(o);h.current=o;let g=n&&Object.keys(n).length>0,_=(0,B.useMemo)(()=>g?ce(n):{},[]),{data:v,extend:y}=D(e?`${e}__accordion`:void 0,_),b=(0,B.useRef)(v??_),x=(0,B.useMemo)(()=>n?{search:``,filters:n}:se,[n]),{data:ee,get:te,extend:S}=D(e,x),C=t===`manual`,[ne,w]=(0,B.useState)(x),T=e?ee??x:ne,E=(0,B.useRef)(T);E.current=T;let O=(0,B.useCallback)(()=>e?te()??x:E.current,[x,te,e]),k=(0,B.useCallback)(t=>{if(e)S(t);else{let e={...E.current,...t};E.current=e,w(e)}},[S,e]),[A,j]=(0,B.useState)(()=>ee??x),M=(0,B.useRef)(A);M.current=A,(0,B.useEffect)(()=>{g&&k({filters:n})},[]),(0,B.useEffect)(()=>{let e={};a!==void 0&&(e.resultLoading=a),i!==void 0&&(e.resultCount=i),Object.keys(e).length>0&&k(e)},[a,i,k]);let N=C?A:T,re=(0,B.useCallback)(e=>{if(C){let t=O().filters;j(t=>({...t,search:e})),k({search:e}),h.current?.({search:e,filters:t})}else{k({search:e});let t=O().filters;h.current?.({search:e,filters:t})}},[O,C,k]),P=(0,B.useCallback)((e,t)=>{if(C)j(n=>{let r={...n.filters};return t===void 0?delete r[e]:r[e]=t,{...n,filters:r}});else{let n=O(),r={...n.filters};t===void 0?delete r[e]:r[e]=t,k({filters:r}),h.current?.(G({...n,filters:r}))}},[O,C,k]),ie=(0,B.useCallback)(e=>N.filters[e],[N.filters]),F=(0,B.useCallback)(e=>{let t=O(),n={...t.filters};delete n[e];let r=M.current,i={...r.filters};delete i[e];let a={...r,filters:i},o={search:t.search,filters:n};j(a),k(o),h.current?.(G(o))},[O,k]),I=(0,B.useCallback)(e=>{if(C){let t=O().filters;Object.hasOwn(t,e)?F(e):P(e,void 0)}else P(e,void 0)},[O,C,P,F]),ae=(0,B.useCallback)(e=>{C?F(e):I(e)},[C,I,F]),oe=(0,B.useCallback)(()=>{let e={...C?M.current:O(),filters:{}};C&&j(e),k({search:e.search,filters:e.filters}),h.current?.(G(e))},[O,C,k]),L=(0,B.useCallback)(e=>{if(C)j(t=>({...t,filters:e}));else{k({filters:e});let t=O();h.current?.(G({...t,filters:e}))}},[O,C,k]),R=(0,B.useCallback)(()=>{let e={search:``,filters:{}};C&&j(e),k(e),h.current?.(e)},[C,k]),z=(0,B.useCallback)(()=>{let e=M.current;k({search:e.search,filters:e.filters}),h.current?.(G(e))},[k]),H=(0,B.useCallback)(()=>{let e=O();j({search:e.search,filters:e.filters})},[O]),U=N.search.length>0||Object.keys(N.filters).length>0,[K,q]=(0,B.useState)(r??!!g),le=(0,B.useRef)(null);(0,B.useEffect)(()=>{if(r!==void 0||g)return;let e=O()?.filters??{};if(Object.keys(e).length>0){q(!0);let t=ce(e);b.current={...b.current,...t},y(t)}},[]);let ue=(0,B.useCallback)(e=>b.current[e],[]),de=(0,B.useCallback)((e,t)=>{b.current[e]=t,y({[e]:t})},[y]),fe=T,J=i??T.resultCount,pe=a??T.resultLoading;return(0,W.jsx)(V,{value:(0,B.useMemo)(()=>({id:e,behavior:t,state:N,appliedState:fe,setSearch:re,setFilter:P,getFilter:ie,removeFilter:I,removeAppliedFilter:ae,clearFilters:oe,replaceFilters:L,resetFilters:R,commitFilters:z,revertFilters:H,hasActiveFilters:U,resultCount:J,resultLoading:pe,panelOpen:K,setPanelOpen:q,panelButtonRef:le,getAccordionOpen:ue,setAccordionOpen:de}),[e,t,N,fe,re,P,ie,I,ae,oe,L,R,z,H,U,J,pe,K,q,le,ue,de]),children:(0,W.jsx)(`div`,{...s(p,{className:l(`dnb-filter`,u),style:d}),role:`search`,"aria-label":m,children:f})})}d(K,{_supportsSpacingProps:!0});function q({className:e,children:t}){return(0,W.jsx)(`div`,{className:l(`dnb-filter__header`,e),children:t})}function le({label:e,submitBehavior:t,onChange:n,className:r,...i}){let a=(0,B.useContext)(V);if(!a)throw Error(`Filter.Search must be used inside a Filter.Root.`);let o=t===`manual`,s=(0,B.useRef)(!1),[c,u]=(0,B.useState)(a.state.search),{setSearch:d}=a,f=(0,B.useCallback)(({value:e})=>{s.current=!0,o?(u(e),e===``&&d(e)):d(e),n?.(e)},[o,d,n]),p=(0,B.useCallback)(({value:e})=>{d(e)},[d]),m=(0,B.useCallback)(()=>{u(``),d(``)},[d]);(0,B.useEffect)(()=>{a.resultLoading||(s.current=!1)},[a.resultLoading]),(0,B.useEffect)(()=>{o?a.state.search===``&&u(``):u(a.state.search)},[o,a.state.search]);let h=a.resultLoading&&s.current;return(0,W.jsx)(`div`,{className:l(`dnb-filter__search`,h&&`dnb-filter__search--show-indicator`,r),children:(0,W.jsx)(j,{...i,type:`search`,label:e,labelDirection:`vertical`,value:o?c:a.state.search,onChange:f,...o?{onSubmit:p,onClear:m}:void 0,showSubmitButton:o,icon:h?(0,W.jsx)(M,{type:`circular`,size:`small`}):void 0,stretch:!0,size:`medium`,showClearButton:!0,autoCapitalize:`none`,autoCorrect:`off`,spellCheck:!1})})}function ue({className:e,children:t}){let n=(0,B.useContext)(V),{hideFilterLabel:r,applyFilterLabel:i,cancelFilterLabel:a}=(0,B.useContext)(c).getTranslation({}).Filter;if(!n)throw Error(`Filter.Panel must be used inside a Filter.Root.`);let{panelOpen:s,setPanelOpen:u,behavior:d,panelButtonRef:f,revertFilters:p,commitFilters:m}=n,h=d===`manual`,g=(0,B.useCallback)(()=>{h&&p(),u(!1),f.current?.focus()},[h,p,u,f]),_=(0,B.useCallback)(()=>{m(),u(!1),f.current?.focus()},[m,u,f]),v=(0,B.useRef)(null);return(0,W.jsx)(k,{open:s,children:(0,W.jsx)(U,{value:(0,B.useMemo)(()=>({panelRef:v}),[]),children:(0,W.jsxs)(`div`,{ref:v,className:l(`dnb-filter__panel`,e),children:[t,(0,W.jsx)(P,{className:`dnb-filter__hr`,space:0}),h?(0,W.jsxs)(`div`,{className:`dnb-filter__panel-actions`,children:[(0,W.jsx)(A,{variant:`primary`,onClick:_,children:i}),(0,W.jsx)(A,{variant:`tertiary`,icon:!1,onClick:g,children:a})]}):(0,W.jsx)(A,{variant:`tertiary`,icon:o,iconPosition:`left`,onClick:g,className:`dnb-filter__panel-close`,children:r})]})})})}var de=p.transition({closed:b,open:o});function fe({children:e,onClick:t,...n}){let r=(0,B.useContext)(V),{panelButtonLabel:i}=(0,B.useContext)(c).getTranslation({}).Filter;if(!r)throw Error(`Filter.PanelButton must be used inside a Filter.Root.`);let{panelOpen:a,setPanelOpen:o,panelButtonRef:s}=r,l=(0,B.useRef)(null);(0,B.useEffect)(()=>{s.current=l.current},[s]);let u=(0,B.useCallback)(e=>{o(!a),t?.(e)},[a,o,t]);return(0,W.jsx)(A,{variant:`tertiary`,icon:de,iconPosition:`left`,transitionState:a?`open`:`closed`,"aria-expanded":a,ref:l,onClick:u,...n,children:e??i})}function J({className:e,children:t}){return(0,W.jsx)(`div`,{className:l(`dnb-filter__toolbar`,e),children:t})}function pe({className:e,children:t}){return(0,W.jsx)(g,{gap:`small`,align:`center`,className:l(`dnb-filter__toolbar-actions`,e),children:t})}J.Actions=pe;function me({label:e,showCategoryLabel:t,collapsibleThreshold:n,onRemove:r,className:i}){let{activeFiltersLabel:a,activeFiltersCountLabel:s,clearAllLabel:u}=(0,B.useContext)(c).getTranslation({}).Filter,d=e??a,f=(0,B.useContext)(V),p=(0,B.useId)();if(!f)throw Error(`Filter.ActiveFilters must be used inside a Filter.Root.`);let m=Object.entries(f.behavior===`manual`?f.appliedState.filters:f.state.filters),h=m.length>0,_=n!=null&&m.length>n,v=e=>{f.behavior===`manual`?f.removeAppliedFilter(e):f.removeFilter(e),r?.(e)},y=()=>{f.clearFilters(),f.setPanelOpen(!1),f.panelButtonRef.current?.focus()},b=(0,W.jsx)(S.Group,{label:d,children:m.map(([e,n])=>(0,W.jsx)(S,{variant:`removable`,onClick:()=>v(e),children:t&&n.categoryLabel?`${n.categoryLabel}: ${n.label}`:n.label},e))});return(0,W.jsx)(k,{children:h&&(0,W.jsx)(`div`,{className:l(`dnb-filter__active-filters`,i),children:_?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsxs)(g,{className:`dnb-filter__active-filters__header`,justify:`space-between`,align:`center`,children:[(0,W.jsx)(O,{variant:`tertiary`,title:s.replace(`%s`,String(m.length)),id:p,iconPosition:`right`}),(0,W.jsx)(A,{variant:`tertiary`,icon:o,onClick:y,children:u})]}),(0,W.jsx)(O.Content,{id:p,children:(0,W.jsx)(re,{className:`dnb-filter__active-filters__scroll`,children:b})})]}):(0,W.jsxs)(W.Fragment,{children:[(0,W.jsxs)(g,{className:`dnb-filter__active-filters__header`,justify:`space-between`,align:`center`,children:[(0,W.jsx)(`span`,{className:`dnb-filter__active-filters__label`,"aria-hidden":!0,children:d}),(0,W.jsx)(A,{variant:`tertiary`,icon:o,onClick:y,children:u})]}),b]})})})}function he({connectedTo:e,className:t,children:n,...r}){let i=(0,B.useContext)(V),{resultCountMessage:o,noResultsMessage:u}=(0,B.useContext)(c).getTranslation({}).Filter,d=e??i?.id;if(!d&&!i)throw Error(`Filter.Content requires a connectedTo prop or must be used inside a Filter.Root.`);let{data:f}=D(d),p=f?.resultLoading??i?.resultLoading??!1,m=f?.resultCount??i?.resultCount,h=(0,B.useRef)(!1);p&&(h.current=!0);let g=p||m===void 0?``:m===0?u:o.replace(`%s`,String(m));return(0,W.jsxs)(H,{value:d,children:[(0,W.jsx)(L,{show:p,...s(r,{className:l(`dnb-filter__content`,t)}),children:h.current?(0,W.jsx)(k,{children:n}):n}),(0,W.jsx)(a,{priority:`high`,delay:1e3,children:g})]})}d(he,{_supportsSpacingProps:!0});function ge({connectedTo:e,resultCount:t,children:n,className:r,...i}){let{noResultsMessage:a}=(0,B.useContext)(c).getTranslation({}).Filter,o=(0,B.useContext)(V),u=(0,B.useContext)(H),{data:d}=D(e??u??o?.id),f=(0,B.useContext)(F),p=t??d?.resultCount??o?.resultCount,m=s(i,{className:l(`dnb-filter__no-results`,r)});if(p===void 0||p>0)return null;let h=n||a;return f?(0,W.jsx)(ie,{...m,title:h}):(0,W.jsx)(N,{...m,children:h})}d(ge,{_supportsSpacingProps:!0});function _e({connectedTo:e,resultCount:t,alwaysVisible:n,children:r,className:i,...a}){let{resultCountMessage:o}=(0,B.useContext)(c).getTranslation({}).Filter,u=(0,B.useContext)(V),d=(0,B.useContext)(H),{data:f}=D(e??d??u?.id),p=t??f?.resultCount??u?.resultCount,m=f?.resultLoading??u?.resultLoading??!1,h=u?.behavior===`manual`?u.appliedState.search.length>0||Object.keys(u.appliedState.filters).length>0:u?.hasActiveFilters??!!(f?.search||f?.filters&&Object.keys(f.filters).length>0),g=s(a,{className:l(`dnb-filter__result-count`,i)}),_=(p!==void 0||m)&&(n||h),v=(0,B.useRef)(void 0);_&&p!==void 0&&(v.current=p);let y=_?p:v.current??p,b=r||o.replace(`%s`,String(y??0));return(0,W.jsx)(ee,{open:_,className:`dnb-filter__result-count-wrapper`,children:(0,W.jsx)(L,{show:m,children:(0,W.jsx)(N,{top:`small`,...g,children:b})})})}d(_e,{_supportsSpacingProps:!0});function Y({label:e,filterKey:t,defaultOpen:n,className:r,onOpenChange:i,children:a}){let o=(0,B.useContext)(V);if(!o)throw Error(`Filter.Item must be used inside a Filter.Root.`);return(0,W.jsx)(O,{variant:`tertiary`,title:e,expanded:o.getAccordionOpen(t)??n??!1,onChange:(0,B.useCallback)(({expanded:e})=>{o.setAccordionOpen(t,e),i?.(e)},[o,t,i]),className:l(`dnb-filter__item`,r),children:(0,W.jsx)(`div`,{className:`dnb-filter__item-content`,children:a})})}function ve(e,t,n){if(!(!e&&!t))return e&&t&&t!==e?C({startDate:e,endDate:t},{locale:n,options:{dateStyle:`long`}}):ne(e||t,{locale:n,options:{dateStyle:`long`}})}function ye({label:e,filterKey:t=`date`,defaultOpen:n,...r}){let i=(0,B.useContext)(V),a=(0,B.useContext)(c),{dateLabel:o}=a.getTranslation({}).Filter,s=e??o;if(!i)throw Error(`Filter.Date must be used inside a Filter.Root.`);let{removeFilter:l,setFilter:u,getFilter:d}=i,f=d(t)?.value,p=a.locale,h=(0,B.useContext)(U),g=(0,B.useCallback)(({startDate:e,endDate:n})=>{if(!e&&!n){h?u(t,void 0):l(t);return}u(t,{value:{from:e,to:n},label:ve(e,n,p),categoryLabel:s})},[h,l,u,t,s,p]),_={range:!0,...r,label:s,labelSrOnly:!0,startDate:f?.from??r.startDate??null,endDate:f?.to??r.endDate??null,onChange:g},{isSmall:v}=m(),y=(0,B.useMemo)(()=>ve(f?.from,f?.to,p),[f,p]),b={rangeSingleCalendar:!0,..._,triggerProps:{text:s,variant:`tertiary`,iconPosition:`left`,...r.triggerProps}};return h?(0,W.jsx)(Y,{label:s,filterKey:t,defaultOpen:n,children:v?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(w,{...b,triggerProps:void 0}),y]}):(0,W.jsx)(w,{showInput:!0,inline:!0,...b})}):(0,W.jsx)(w,{...b})}function be({label:e,filterKey:t,defaultOpen:n,data:r}){let i=(0,B.useContext)(V);if(!i)throw Error(`Filter.Selection must be used inside a Filter.Root.`);let{state:a,setFilter:o,removeFilter:s}=i,c=(0,B.useContext)(U),l=`${t}/`,u=(0,B.useMemo)(()=>Object.keys(a.filters).filter(e=>e.startsWith(l)).map(e=>e.slice(l.length)),[a.filters,l]),d=(0,B.useCallback)((t,n)=>{let i=`${l}${t}`;n?o(i,{value:t,label:r.find(e=>e.value===t)?.label??t,categoryLabel:e}):c?o(i,void 0):s(i)},[c,o,s,l,e,r]);return(0,W.jsx)(Y,{label:e,filterKey:t,defaultOpen:n,children:(0,W.jsx)(h,{gap:`small`,children:r.map(e=>(0,W.jsx)(_,{label:e.label,checked:u.includes(e.value),onChange:({checked:t})=>d(e.value,t)},e.value))})})}function xe({label:e,filterKey:t,defaultOpen:n,data:r}){let i=(0,B.useContext)(V);if(!i)throw Error(`Filter.MultiSelection must be used inside a Filter.Root.`);let{state:a,replaceFilters:o}=i,s=(0,B.useRef)(a.filters);s.current=a.filters;let c=`${t}/`;return(0,W.jsx)(Y,{label:e,filterKey:t,defaultOpen:n,children:(0,W.jsx)(te,{label:e,labelSrOnly:!0,data:r,value:(0,B.useMemo)(()=>{let e=Object.keys(a.filters).filter(e=>e.startsWith(c)).map(e=>e.slice(c.length));return e.length>0?e:void 0},[a.filters,c]),onChange:(0,B.useCallback)(t=>{let n=Array.from(new Set((t??[]).map(e=>String(e)))),i={...s.current};for(let e of Object.keys(i))e.startsWith(c)&&delete i[e];for(let t of n){let n=`${c}${t}`,a=r.find(e=>String(e.value)===t);i[n]={value:t,label:a?String(a.title):t,categoryLabel:e}}o(i)},[o,c,e,r]),variant:`inline`,showSearchField:!0})})}function Se({className:e,children:t,...n}){return(0,W.jsx)(`div`,{...s(n,{className:l(`dnb-filter__quick-filters`,e)}),children:t})}function Ce({children:e,connectedTo:t}){let n=(0,B.useContext)(V),r=(0,B.useContext)(H),{data:i}=D(t??r??n?.id),a=i?.search??n?.state?.search??``;return(0,B.useMemo)(()=>we(e,a),[e,a])}function we(e,t){if(!t||!e)return e;let n=t.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),r=RegExp(`(${n})`,`gi`),i=e.split(r);return i.length===1?e:i.map((e,t)=>r.test(e)?(r.lastIndex=0,(0,W.jsx)(`mark`,{className:`dnb-filter__highlighting`,children:e},t)):e)}function Te({data:e,onChange:t,value:n,defaultValue:r,size:i=`medium`,...a}){let{sortButtonLabel:o}=(0,B.useContext)(c).getTranslation({}).Filter,{isSmall:s}=m(),l=(0,B.useMemo)(()=>Array.isArray(e)?e.map(e=>typeof e==`object`&&e?{...e,selectedValue:o}:{content:e,selectedValue:o}):e,[e,o]);return(0,W.jsx)(T,{variant:`tertiary`,icon:y,iconPosition:`left`,independentWidth:!0,align:s?`left`:`right`,title:o,data:l,value:n,defaultValue:r,onChange:t,size:i,...a})}var X={search:``,filters:{}};function Z(e){let{data:t,get:n,extend:r}=D(e,X),i=t??X,a=(0,B.useCallback)(()=>{r({search:``,filters:{}})},[r]),o=(0,B.useCallback)(e=>{let t={...(n()??X).filters};delete t[e],r({filters:t})},[r,n]);return{filters:i.filters,search:i.search,hasActiveFilters:i.search.length>0||Object.keys(i.filters).length>0,resetFilters:a,removeFilter:o}}function Ee(){let e=(0,B.useContext)(V);if(!e)throw Error(`Filter.useFilterContext() must be used inside a Filter.Root.`);return{setFilter:e.setFilter,getFilter:e.getFilter,removeFilter:e.removeFilter,resetFilters:e.resetFilters,commitFilters:e.commitFilters,revertFilters:e.revertFilters,filters:e.state.filters,search:e.state.search,hasActiveFilters:e.hasActiveFilters}}function De(e,t,n){let{data:r,extend:i}=D(e,X),a=r??X,[o,s]=(0,B.useState)(n?.initialData),[c,l]=(0,B.useState)(void 0),d=(0,B.useRef)(0),f=(0,B.useRef)(t);f.current=t;let p=(0,B.useRef)(n?.initialData);p.current=n?.initialData;let m=n?.debounce??0,h=(0,B.useRef)(void 0);m>0&&!h.current&&(h.current=u(e=>f.current(e),m));let g=JSON.stringify(a.filters),_=a.search;return(0,B.useEffect)(()=>{let e=JSON.parse(g),t=++d.current,n=t===1,r=!1;(!n||!p.current)&&i({resultLoading:!0}),l(void 0);let a=m>0&&!n;return(a?h.current:f.current)({filters:e,search:_}).then(e=>{!r&&t===d.current&&(s(e),i({resultLoading:!1,resultCount:Array.isArray(e)?e.length:void 0}))}).catch(e=>{!r&&t===d.current&&(l(e instanceof Error?e:Error(String(e))),i({resultLoading:!1}))}),()=>{r=!0,a&&h.current?.cancel()}},[g,_,i,m]),{data:o,loading:a.resultLoading??!1,error:c}}var Oe=new Set([`__proto__`,`constructor`,`prototype`]);function ke(e){if(typeof e!=`object`||!e||Array.isArray(e))return{};let t={};for(let n of Object.keys(e)){if(Oe.has(n))continue;let r=e[n];if(!Ae(r))continue;let i={value:r.value,label:r.label};r.categoryLabel!==void 0&&(i.categoryLabel=r.categoryLabel),t[n]=i}return t}function Ae(e){if(typeof e!=`object`||!e||Array.isArray(e))return!1;let t=e;if(typeof t.label!=`string`||t.categoryLabel!==void 0&&typeof t.categoryLabel!=`string`)return!1;let n=t.value;return!(typeof n!=`string`&&typeof n!=`number`&&typeof n!=`boolean`&&(typeof n!=`object`||!n||Array.isArray(n)))}var je={search:``,filters:{}};function Me(e,t){let{excludeSearch:n=!1}=t??{},r=`${e}-search`,i=`${e}-filters`,{extend:a}=D(e,je),{filters:o,search:s}=Z(e),c=(0,B.useRef)(!1),l=(0,B.useCallback)((e,t)=>{if(c.current)return;let a=new URL(window.location.href);n||(e?a.searchParams.set(r,e):a.searchParams.delete(r)),Object.keys(t).length>0?a.searchParams.set(i,JSON.stringify(t)):a.searchParams.delete(i),window.history.replaceState({},``,a.toString())},[r,i,n]),u=(0,B.useCallback)(()=>{let e=new URLSearchParams(window.location.search),t=n?``:e.get(r)??``,a={},o=e.get(i);if(o)try{a=ke(JSON.parse(o))}catch{}return{search:t,filters:a}},[r,i,n]),d=(0,B.useCallback)(()=>{let{search:e,filters:t}=u();(e||Object.keys(t).length>0)&&(c.current=!0,a({search:e,filters:t}),c.current=!1)},[u,a]);f(()=>{d();let e=()=>{d()};return window.addEventListener(`popstate`,e),()=>window.removeEventListener(`popstate`,e)},[d]);let p=(0,B.useRef)({search:``,filters:{}});return f(()=>{let e=p.current,t=JSON.stringify(e.filters)!==JSON.stringify(o),n=e.search!==s;(t||n)&&(p.current={search:s,filters:o},l(s,o))},[s,o,l]),{readFromUrl:u}}var Ne={search:``,filters:{}};function Pe(e,{useSearchParams:t,excludeSearch:n=!1}){let r=`${e}-search`,i=`${e}-filters`,{extend:a}=D(e,Ne),{filters:o,search:s}=Z(e),[c,l]=t(),u=(0,B.useRef)(!1),d=(0,B.useRef)(c);d.current=c;let p=(0,B.useCallback)((e,t)=>{if(u.current)return;let a=new URLSearchParams(d.current);n||(e?a.set(r,e):a.delete(r)),Object.keys(t).length>0?a.set(i,JSON.stringify(t)):a.delete(i),l(a,{replace:!0})},[r,i,l,n]),m=(0,B.useCallback)(()=>{let e=n?``:c.get(r)??``,t={},a=c.get(i);if(a)try{t=ke(JSON.parse(a))}catch{}return{search:e,filters:t}},[c,r,i,n]);f(()=>{let{search:e,filters:t}=m();(e||Object.keys(t).length>0)&&(u.current=!0,a({search:e,filters:t}),u.current=!1)},[m,a]);let h=(0,B.useRef)({search:``,filters:{}});return f(()=>{let e=h.current,t=JSON.stringify(e.filters)!==JSON.stringify(o),n=e.search!==s;(t||n)&&(h.current={search:s,filters:o},p(s,o))},[s,o,p]),{readFromUrl:m}}var Fe={search:``,filters:{}};function Ie(e,{useRouter:t,usePathname:n,useSearchParams:r,excludeSearch:i=!1}){let a=`${e}-search`,o=`${e}-filters`,{extend:s}=D(e,Fe),{filters:c,search:l}=Z(e),u=t(),d=n(),p=r(),m=(0,B.useRef)(!1),h=(0,B.useCallback)((e,t)=>{if(m.current)return;let n=new URLSearchParams(p.toString());i||(e?n.set(a,e):n.delete(a)),Object.keys(t).length>0?n.set(o,JSON.stringify(t)):n.delete(o),u.replace(`${d}?${n.toString()}`)},[a,o,p,d,u,i]),g=(0,B.useCallback)(()=>{let e=i?``:p.get(a)??``,t={},n=p.get(o);if(n)try{t=ke(JSON.parse(n))}catch{}return{search:e,filters:t}},[p,a,o,i]);f(()=>{let{search:e,filters:t}=g();(e||Object.keys(t).length>0)&&(m.current=!0,s({search:e,filters:t}),m.current=!1)},[g,s]);let _=(0,B.useRef)({search:``,filters:{}});return f(()=>{let e=_.current,t=JSON.stringify(e.filters)!==JSON.stringify(c),n=e.search!==l;(t||n)&&(_.current={search:l,filters:c},h(l,c))},[l,c,h]),{readFromUrl:g}}var Q=e({ActiveFilters:()=>me,Content:()=>he,Date:()=>ye,Header:()=>q,Highlighting:()=>Ce,Item:()=>Y,MultiSelection:()=>xe,NoResults:()=>ge,Panel:()=>ue,PanelButton:()=>fe,QuickFilters:()=>Se,ResultCount:()=>_e,Root:()=>K,Search:()=>le,Selection:()=>be,SortButton:()=>Te,Toolbar:()=>J,useFilter:()=>Z,useFilterAsync:()=>De,useFilterContext:()=>Ee,useNextRouter:()=>Ie,useQueryLocator:()=>Me,useReactRouter:()=>Pe}),Le=e({AsyncResults:()=>He,CustomFilter:()=>Be,DecoupledHook:()=>Ve,ManualBehavior:()=>Ue,QuickFilters:()=>Ge,SearchOnly:()=>qe,ToolbarActionsOnly:()=>Ke,WithDateAndSelection:()=>Re,WithMultiSelection:()=>We,WithPredefinedFilters:()=>ze,WithQueryLocator:()=>Ye,WithSortButton:()=>Je}),Re=()=>(0,W.jsx)(z,{hideCode:!0,scope:{downloadIcon:i},"data-visual-test":`filter-date-selection`,stableName:`WithDateAndSelection`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,Button:A,List:I,Value:E},noInline:!0,children:`const Example = () => {
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
`}),ze=()=>(0,W.jsx)(z,{hideCode:!0,scope:{downloadIcon:i},stableName:`WithPredefinedFilters`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,Button:A,List:I,Value:E},noInline:!0,children:`const Example = () => {
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
`}),Be=()=>(0,W.jsx)(z,{hideCode:!0,stableName:`CustomFilter`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,ToggleButton:v,List:I},noInline:!0,children:`function ToggleFilter({ label, filterKey }) {
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
`}),Ve=()=>(0,W.jsx)(z,{hideCode:!0,stableName:`DecoupledHook`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,P:N,List:I,Value:E},noInline:!0,children:`function TransactionList() {
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
`}),He=()=>(0,W.jsx)(z,{hideCode:!0,stableName:`AsyncResults`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:I,Value:E},noInline:!0,children:`const allTransactions = [
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
`}),Ue=()=>(0,W.jsx)(z,{hideCode:!0,"data-visual-test":`filter-manual-behavior`,stableName:`ManualBehavior`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:I,Value:E},noInline:!0,children:`const allTransactions = [
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
`}),We=()=>(0,W.jsx)(z,{hideCode:!0,"data-visual-test":`filter-multi-selection-grid`,stableName:`WithMultiSelection`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,Grid:oe,Heading:ae,List:I,Value:E},noInline:!0,children:`const clients = [
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
`}),Ge=()=>(0,W.jsx)(z,{hideCode:!0,stableName:`QuickFilters`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,ToggleButton:v,List:I,Value:E},noInline:!0,children:`function QuickFilter({ label, filterKey }) {
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
`}),Ke=()=>(0,W.jsx)(z,{hideCode:!0,scope:{tableIcon:x,downloadIcon:i},stableName:`ToolbarActionsOnly`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,Button:A,List:I,Value:E},noInline:!0,children:`const Example = () => {
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
`}),qe=()=>(0,W.jsx)(z,{hideCode:!0,stableName:`SearchOnly`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:I,Value:E},noInline:!0,children:`const Example = () => {
  const items = useMemo(
    () => [
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
    ],
    []
  )
  const getFilteredItems = useCallback(
    (searchValue: string) => {
      return items.filter((item) => {
        if (
          searchValue &&
          !item.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          !String(item.amount).includes(searchValue)
        ) {
          return false
        }
        return true
      })
    },
    [items]
  )
  const { search } = Filter.useFilter('search-only-demo')
  const previousSearchRef = useRef(search)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const [filtered, setFiltered] = useState(() => getFilteredItems(search))
  useEffect(() => {
    if (previousSearchRef.current === search) {
      return // stop here
    }

    previousSearchRef.current = search
    setShowSkeleton(true)
    const timeout = setTimeout(() => {
      setFiltered(getFilteredItems(search))
      setShowSkeleton(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [getFilteredItems, search])
  const visibleItems = showSkeleton ? items : filtered
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
        <List.Container skeleton={showSkeleton}>
          {!showSkeleton && <Filter.NoResults />}
          {visibleItems.map((item) => (
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
`}),Je=()=>(0,W.jsx)(z,{hideCode:!0,stableName:`WithSortButton`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:I,Value:E},noInline:!0,children:`const Example = () => {
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
`}),Ye=()=>(0,W.jsx)(z,{hideCode:!0,stableName:`WithQueryLocator`,sourceImports:[`import { useCallback, useEffect, useMemo, useRef, useState } from 'react'`,`import { Button, Filter, Grid, Heading, List, P, ToggleButton } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`,`import { download as downloadIcon, table as tableIcon } from '@dnb/eufemia/icons'`],__buildScope:{Filter:Q,List:I,Value:E},noInline:!0,children:`const transactions = [
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
`});function Xe(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...R(),...e.components};return Le||$(`Examples`,!1),He||$(`Examples.AsyncResults`,!0),Be||$(`Examples.CustomFilter`,!0),Ve||$(`Examples.DecoupledHook`,!0),Ue||$(`Examples.ManualBehavior`,!0),Ge||$(`Examples.QuickFilters`,!0),qe||$(`Examples.SearchOnly`,!0),Ke||$(`Examples.ToolbarActionsOnly`,!0),Re||$(`Examples.WithDateAndSelection`,!0),We||$(`Examples.WithMultiSelection`,!0),ze||$(`Examples.WithPredefinedFilters`,!0),Ye||$(`Examples.WithQueryLocator`,!0),Je||$(`Examples.WithSortButton`,!0),(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(t.h2,{children:`Demos`}),`
`,(0,W.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,W.jsxs)(t.p,{children:[`Combines `,(0,W.jsx)(t.code,{children:`Filter.Date`}),` and `,(0,W.jsx)(t.code,{children:`Filter.Selection`}),` inside `,(0,W.jsx)(t.code,{children:`Filter.Panel`}),`, with search, toolbar tools, and `,(0,W.jsx)(t.code,{children:`resultCount`}),` for the number of matching transactions. Uses the list layout pattern.`]}),`
`,(0,W.jsx)(Re,{}),`
`,(0,W.jsx)(t.h3,{children:`Custom filter type`}),`
`,(0,W.jsxs)(t.p,{children:[`Build your own filter using `,(0,W.jsx)(t.code,{children:`Filter.useFilterContext()`}),` and `,(0,W.jsx)(t.code,{children:`Filter.Item`}),`. This example shows a toggle filter alongside the built-in `,(0,W.jsx)(t.code,{children:`Filter.Selection`}),`.`]}),`
`,(0,W.jsx)(Be,{}),`
`,(0,W.jsx)(t.h3,{children:`Async result count`}),`
`,(0,W.jsxs)(t.p,{children:[`When the result count comes from an API, use `,(0,W.jsx)(t.code,{children:`resultLoading`}),` to show a loading state while the request is in progress. Open the filter panel and change a filter to see the skeleton effect. This example uses `,(0,W.jsx)(t.code,{children:`debounce: 300`}),` to delay the API call while the user is typing.`]}),`
`,(0,W.jsx)(He,{}),`
`,(0,W.jsx)(t.h3,{children:`Manual behavior`}),`
`,(0,W.jsxs)(t.p,{children:[`With `,(0,W.jsx)(t.code,{children:`behavior="manual"`}),`, panel filter changes are buffered internally and not emitted until the user clicks "Apply filter". Search input is still emitted in real time. The panel shows an Apply button and a Cancel button that reverts unsaved changes.`]}),`
`,(0,W.jsx)(Ue,{}),`
`,(0,W.jsx)(t.h3,{children:`Predefined filters`}),`
`,(0,W.jsxs)(t.p,{children:[`Use `,(0,W.jsx)(t.code,{children:`defaultFilters`}),` to pre-select filters on mount. The panel and relevant filter accordions open automatically.`]}),`
`,(0,W.jsx)(ze,{}),`
`,(0,W.jsx)(t.h3,{children:`URL sync with router hooks`}),`
`,(0,W.jsx)(t.p,{children:`Three hooks sync filter state with URL query parameters so users can share or bookmark filtered views. Back/forward navigation restores the previous filter state.`}),`
`,(0,W.jsxs)(t.ul,{children:[`
`,(0,W.jsxs)(t.li,{children:[(0,W.jsx)(t.strong,{children:(0,W.jsx)(t.code,{children:`Filter.useQueryLocator(id, options?)`})}),` — Uses the History API directly. Works without any router dependency. Pass `,(0,W.jsx)(t.code,{children:`{ excludeSearch: true }`}),` to exclude the search string from URL sync.`]}),`
`,(0,W.jsxs)(t.li,{children:[(0,W.jsx)(t.strong,{children:(0,W.jsx)(t.code,{children:`Filter.useReactRouter(id, { useSearchParams, excludeSearch? })`})}),` — Uses React Router's `,(0,W.jsx)(t.code,{children:`useSearchParams`}),`.`]}),`
`,(0,W.jsxs)(t.li,{children:[(0,W.jsx)(t.strong,{children:(0,W.jsx)(t.code,{children:`Filter.useNextRouter(id, { useRouter, usePathname, useSearchParams, excludeSearch? })`})}),` — Uses Next.js navigation hooks.`]}),`
`]}),`
`,(0,W.jsx)(Ye,{}),`
`,(0,W.jsx)(t.h3,{children:`With sort button`}),`
`,(0,W.jsxs)(t.p,{children:[`Use `,(0,W.jsx)(t.code,{children:`Filter.SortButton`}),` to add a sort dropdown to the toolbar. It renders a tertiary Dropdown with a sort icon and independent width. The sort state is managed outside the filter.`]}),`
`,(0,W.jsx)(Je,{}),`
`,(0,W.jsx)(t.h3,{children:`Quick filters`}),`
`,(0,W.jsx)(t.p,{children:`Quick filters are toggle buttons placed directly below the toolbar, outside the panel. They let users apply common filters without opening the panel.`}),`
`,(0,W.jsx)(Ge,{}),`
`,(0,W.jsx)(t.h3,{children:`Toolbar with actions only`}),`
`,(0,W.jsx)(t.p,{children:`A toolbar with only action buttons and no search field.`}),`
`,(0,W.jsx)(Ke,{}),`
`,(0,W.jsx)(t.h3,{children:`Search only`}),`
`,(0,W.jsx)(t.p,{children:`A simple search field with a secondary search button.`}),`
`,(0,W.jsx)(qe,{}),`
`,(0,W.jsx)(t.h3,{children:`Multi-selection filter with grid layout`}),`
`,(0,W.jsxs)(t.p,{children:[`Use `,(0,W.jsx)(t.code,{children:`Filter.MultiSelection`}),` inside `,(0,W.jsx)(t.code,{children:`Filter.Panel`}),` to let users select one or more clients. This example uses a `,(0,W.jsx)(t.code,{children:`Grid`}),` layout to place the filter and results side by side.`]}),`
`,(0,W.jsx)(We,{}),`
`,(0,W.jsx)(t.h3,{children:`Decoupled hook`}),`
`,(0,W.jsxs)(t.p,{children:[(0,W.jsx)(t.code,{children:`Filter.useFilter(id)`}),` can be called anywhere in the tree — the filter UI and data consumer can live in completely separate components.`]}),`
`,(0,W.jsx)(Ve,{})]})}function Ze(e={}){let{wrapper:t}={...R(),...e.components};return t?(0,W.jsx)(t,{...e,children:(0,W.jsx)(Xe,{...e})}):Xe(e)}function $(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{Ze as default};
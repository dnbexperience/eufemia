"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[94841,86078],{50527:function(e,t,s){s.r(t);var n=s(52322),i=s(45392),d=s(58890);function l(e){const t=Object.assign({h2:"h2",p:"p",a:"a",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",em:"em",pre:"pre"},(0,i.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{children:"Properties"}),"\n",(0,n.jsxs)(t.p,{children:["You may check out the ",(0,n.jsx)(t.a,{href:"#drawerlist-properties",children:"DrawerList Properties"})," down below as well as the ",(0,n.jsx)(t.a,{href:"#data-structure",children:"Data structure examples"}),"."]}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Properties"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"mode"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"async"}),', it prevents showing the "no options" message during typing / filtering. Defaults to ',(0,n.jsx)(t.code,{children:"sync"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"input_value"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," lets you define a custom input value."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.code,{children:"placeholder"})," or ",(0,n.jsx)(t.code,{children:"title"})]}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use this to define the pre-filled placeholder text in the input. Defaults to ",(0,n.jsx)(t.code,{children:'title="Skriv og velg"'}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"disable_filter"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"true"}),", word highlighting will still be active, but no options will be filtered out. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"disable_highlighting"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"true"}),", word highlighting will be disabled, but the options will still get filtered. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"disable_reorder"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"true"}),", reordering of search results will be disabled. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"search_numbers"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"true"})," and ",(0,n.jsx)(t.code,{children:"search_in_word_index"})," is not set, the user will be able to more easily search and filter e.g. bank account numbers. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"search_in_word_index"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"}),' this gives you the possibility to change the threshold number, which defines from what word on we search "inside words". Defaults to ',(0,n.jsx)(t.code,{children:"3"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"keep_value"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use ",(0,n.jsx)(t.code,{children:"true"})," to not remove the typed value on input blur, if it is invalid. By default, the typed value will disappear / replaced by a selected value from the data list during the input field blur."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"keep_value_and_selection"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," like ",(0,n.jsx)(t.code,{children:"keep_value"})," – but would not reset to the selected value during input field blur. Also, the selected value would still be kept."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"prevent_selection"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"true"}),", no permanent selection will be made. Also, the typed value will not disappear on input blur (like ",(0,n.jsx)(t.code,{children:"keep_value"}),"). Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"show_clear_button"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"true"}),", a clear button is shown inside the input field. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"icon"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," to be included in the autocomplete input."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"icon_size"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," change the size of the icon pragmatically."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"icon_position"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," position of the icon inside the autocomplete. Set to ",(0,n.jsx)(t.code,{children:"left"})," or ",(0,n.jsx)(t.code,{children:"right"}),". Defaults to ",(0,n.jsx)(t.code,{children:"left"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"input_icon"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," same as ",(0,n.jsx)(t.code,{children:"icon"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"triangle_position"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," position of icon arrow / triangle the drawer. Set to ",(0,n.jsx)(t.code,{children:"left"})," or ",(0,n.jsx)(t.code,{children:"right"}),". Defaults to ",(0,n.jsx)(t.code,{children:"left"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"size"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," define the height of the Autocomplete. Can be set to ",(0,n.jsx)(t.code,{children:"small"}),", ",(0,n.jsx)(t.code,{children:"default"}),", ",(0,n.jsx)(t.code,{children:"medium"})," and ",(0,n.jsx)(t.code,{children:"large"}),". Defaults to ",(0,n.jsx)(t.code,{children:"default"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"drawer_class"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," define a custom class for the internal drawer-list. This makes it possible more easily customize the drawer-list style with styled-components and the ",(0,n.jsx)(t.code,{children:"css"})," style method. Defaults to ",(0,n.jsx)(t.code,{children:"null"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"show_submit_button"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use ",(0,n.jsx)(t.code,{children:"true"})," to show a Autocomplete button to toggle the ",(0,n.jsx)(t.a,{href:"/uilib/components/fragments/drawer-list",children:"DrawerList"}),". Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"title"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," give a title to let the user know what they have to do. Defaults to ",(0,n.jsx)(t.code,{children:"Skriv og få alternativer"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"align_autocomplete"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use ",(0,n.jsx)(t.code,{children:"right"})," to change the options alignment direction. Defaults to ",(0,n.jsx)(t.code,{children:"left"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"no_options"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"}),' text show in the "no options" item. Defaults to ',(0,n.jsx)(t.code,{children:"Ingen alternativer"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"aria_live_options"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," text read out by screen readers. This way users with screen readers know how many options they got during typing. Defaults to ",(0,n.jsx)(t.code,{children:"%s alternativer"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"show_all"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," text that lets a user unravel all the available options. Defaults to ",(0,n.jsx)(t.code,{children:"Vis alt"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"indicator_label"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"}),' text show on indicator "options" item. Defaults to ',(0,n.jsx)(t.code,{children:"Henter data ..."}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"show_options_sr"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," only for screen readers. Title of the button to show the suggestions / options. It is always present and when activating, it opens the DrawerList and sets the focus on it. Defaults to ",(0,n.jsx)(t.code,{children:"Bla gjennom alternativer"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"selected_sr"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," only for screen readers (VoiceOver). The label used to announce the selected item. Defaults to ",(0,n.jsx)(t.code,{children:"Valgt:"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"submit_button_title"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," title on submit button. Defaults to ",(0,n.jsx)(t.code,{children:"Vis alternativer"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"submit_button_icon"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," the icon used in the submit button. Defaults to ",(0,n.jsx)(t.code,{children:"chevron_down"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"submit_element"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," replace the dropdown / submit button with a custom React element. Defaults to the input SubmitButton ",(0,n.jsx)(t.code,{children:"import { SubmitButton } from '@dnb/eufemia/components/input/Input'"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"opened"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"true"}),", the Autocomplete will be rendered initially with a visible and accessible data list / options."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"open_on_focus"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use ",(0,n.jsx)(t.code,{children:"true"})," to auto open the list once the user is entering the input field with the keyboard."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"stretch"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"true"}),", then the autocomplete will be 100% in available ",(0,n.jsx)(t.code,{children:"width"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"skip_portal"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," set to ",(0,n.jsx)(t.code,{children:"true"})," to disable the React Portal behavior. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"status"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," text with a status message. The style defaults to an error message. You can use ",(0,n.jsx)(t.code,{children:"true"})," to only get the status color, without a message."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"status_state"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," defines the state of the status. Currently, there are two statuses ",(0,n.jsx)(t.code,{children:"[error, info]"}),". Defaults to ",(0,n.jsx)(t.code,{children:"error"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"status_props"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use an object to define additional FormStatus properties."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"globalStatus"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," the ",(0,n.jsx)(t.a,{href:"/uilib/components/global-status/properties/#configuration-object",children:"configuration"})," used for the target ",(0,n.jsx)(t.a,{href:"/uilib/components/global-status",children:"GlobalStatus"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"label"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," prepends the Form Label component. If no ID is provided, a random ID is created."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"label_direction"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use ",(0,n.jsx)(t.code,{children:'label_direction="vertical"'})," to change the label layout direction. Defaults to ",(0,n.jsx)(t.code,{children:"horizontal"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"label_sr_only"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use ",(0,n.jsx)(t.code,{children:"true"})," to make the label only readable by screen readers."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"suffix"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," text describing the content of the Autocomplete more than the label. You can also send in a React component, so it gets wrapped inside the Autocomplete component."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"skeleton"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if set to ",(0,n.jsx)(t.code,{children:"true"}),", an overlaying skeleton with animation will be shown."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"input_ref"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use a React.Ref to get access to the ",(0,n.jsx)(t.code,{children:"input"})," DOM element."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"input_element"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," lets you provide a custom React element as the input HTML element."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.a,{href:"/uilib/components/fragments/drawer-list/properties",children:"DrawerList"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," all DrawerList properties."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.a,{href:"/uilib/layout/space/properties",children:"Space"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," spacing properties like ",(0,n.jsx)(t.code,{children:"top"})," or ",(0,n.jsx)(t.code,{children:"bottom"})," are supported."]})]})]})]}),"\n",(0,n.jsx)(d.default,{}),"\n",(0,n.jsx)(t.h2,{children:"Data structure"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"// 1. as array\nconst data = [\n  // Every data item can, beside \"content\" - contain what ever\n  {\n    // (optional) can be what ever\n    selected_key: 'key_0',\n\n    // (optional) is show instead of \"content\", once selected\n    selected_value: 'Item 1 Value',\n    suffix_value: 'Addition 1',\n\n    // Item content as a string, array or React Element\n    content: 'Item 1 Content',\n  },\n\n  // more items ...\n  {\n    selected_key: 'key_1',\n    content: (\n      <>\n        <IconPrimary icon=\"bell\" />\n        <span className=\"dnb-typo-bold\">Searchable content</span>\n      </>\n    ),\n  },\n  {\n    selected_key: 'key_2',\n    selected_value: 'Item 3 Value',\n    suffix_value: 'Addition 3',\n    content: (\n      <Autocomplete.HorizontalItem>\n        <IconPrimary icon=\"bell\" />\n        <span className=\"dnb-typo-bold\">Searchable content</span>\n      </Autocomplete.HorizontalItem>\n    ),\n  },\n  {\n    selected_key: 'key_3',\n    selected_value: 'Item 4 Value',\n    suffix_value: 'Addition 4',\n    content: ['Item 4 Content A', <>Custom Component</>],\n  },\n]\n\n// 2. as object\nconst data = {\n  a: 'A',\n  b: 'B',\n}\n"})})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,i.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(l,e)})):l(e)}},58890:function(e,t,s){s.r(t);var n=s(52322),i=s(45392);function d(e){const t=Object.assign({h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",em:"em",a:"a"},(0,i.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{children:"DrawerList Properties"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Properties"}),(0,n.jsx)(t.th,{children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.code,{children:"data"})," or ",(0,n.jsx)(t.code,{children:"children"})]}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(required)"})," the data we want to fill the list with. Provide the data as a ",(0,n.jsx)(t.code,{children:"JSON string"}),", ",(0,n.jsx)(t.code,{children:"array"})," or ",(0,n.jsx)(t.code,{children:"object"})," in these ",(0,n.jsx)(t.a,{href:"/uilib/components/fragments/drawer-list/info#data-structure",children:"data structure"}),". ",(0,n.jsx)("br",{})," If you don't have to define a ",(0,n.jsx)(t.code,{children:"value"}),", you can also send in a ",(0,n.jsx)(t.code,{children:"function"})," which will be called once the user opens the DrawerList."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"value"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," define a preselected data entry (index). Should either be an index (integer) of the data array or a key – defined by ",(0,n.jsx)(t.code,{children:"selectedKey"})," (the deprecated ",(0,n.jsx)(t.code,{children:"selected_key"})," should not start with a number) inside an array item. Or if ",(0,n.jsx)(t.code,{children:"data"})," is an object, use the object key as the ",(0,n.jsx)(t.code,{children:"value"})," to define the selected item. Can be a string or integer."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"default_value"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," if you want to define only a startup value (integer) or have to handle a re-render without handling the state during the re-render by yourself, then using ",(0,n.jsx)(t.code,{children:"default_value"})," is a good choice. Defaults to ",(0,n.jsx)(t.code,{children:"null"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"triangle_position"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," position of arrow icon/triangle inside the drawer-list. Set to ",(0,n.jsx)(t.code,{children:"left"})," or ",(0,n.jsx)(t.code,{children:"right"}),". Defaults to ",(0,n.jsx)(t.code,{children:"left"})," if not set."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"direction"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," defines the direction of how the drawer-list shows the options list. Can be ",(0,n.jsx)(t.code,{children:"bottom"})," or ",(0,n.jsx)(t.code,{children:"top"}),". Defaults to ",(0,n.jsx)(t.code,{children:"auto"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"prevent_selection"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," If set to ",(0,n.jsx)(t.code,{children:"true"}),", the DrawerList will then not make any permanent selection. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"focusable"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," If set to ",(0,n.jsx)(t.code,{children:"true"}),", the element is then focusable by assertive technologies."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"prevent_close"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," If set to ",(0,n.jsx)(t.code,{children:"true"}),", the DrawerList will not close on any events. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"keep_open"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," If set to ",(0,n.jsx)(t.code,{children:"true"}),", the DrawerList will close on outside clicks, but not on selection. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"independent_width"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," If set to ",(0,n.jsx)(t.code,{children:"true"}),", the DrawerList will handle it's width and position handling independent to the parent/mother element. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"fixed_position"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," If set to ",(0,n.jsx)(t.code,{children:"true"}),", the DrawerList will be fixed in it's scroll position by using CSS ",(0,n.jsx)(t.code,{children:"position: fixed;"}),". Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"enable_body_lock"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," If set to ",(0,n.jsx)(t.code,{children:"true"}),", the HTML body will get locked from scrolling when the Dropdown is open. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"skip_keysearch"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," If set to ",(0,n.jsx)(t.code,{children:"true"}),", search items by the first key will be ignored. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"ignore_events"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," If set to ",(0,n.jsx)(t.code,{children:"true"}),", all keyboard and mouse events will be ignored. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"align_drawer"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," use ",(0,n.jsx)(t.code,{children:"right"})," to change the options alignment direction. Makes only sense to use in combination with ",(0,n.jsx)(t.code,{children:"prevent_selection"})," or ",(0,n.jsx)(t.code,{children:"more_menu"})," - or if a independent width is used. Defaults to ",(0,n.jsx)(t.code,{children:"left"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"list_class"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," define a HTML class that will be set on the list, beside ",(0,n.jsx)(t.code,{children:"dnb-drawer-list__list"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"portal_class"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," define a HTML class that will be set on the DOM portal beside ",(0,n.jsx)(t.code,{children:"dnb-drawer-list__portal__style"}),". Can be useful to handle e.g. a custom ",(0,n.jsx)(t.code,{children:"z-index"})," in relation to a header."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"scrollable"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," defines if the options list should be scrollable (the ",(0,n.jsx)(t.code,{children:"max-height"})," is set by default to ",(0,n.jsx)(t.code,{children:"50vh"}),"). Defaults to ",(0,n.jsx)(t.code,{children:"true"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"no_scroll_animation"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," to disable scrolling animation. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"no_animation"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," to disable appear/disappear (show/hide) animation. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"skip_portal"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," to disable the React Portal behavior. Defaults to ",(0,n.jsx)(t.code,{children:"false"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"min_height"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," defines if the minimum height (in ",(0,n.jsx)(t.code,{children:"rem"}),") of the options list. Defaults to ",(0,n.jsx)(t.code,{children:"10rem"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"max_height"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," defines if the maximum height (in ",(0,n.jsx)(t.code,{children:"rem"}),") of the options list. Defaults to ",(0,n.jsx)(t.code,{children:"null"}),", as this is set automatically by default."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"page_offset"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," defines if the available scrollable height. If scrolling not should change the height of the drawer-list, then set it to ",(0,n.jsx)(t.code,{children:"0"})," (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content). Defaults to ",(0,n.jsx)(t.code,{children:"window.pageYOffset"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"observer_element"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the ",(0,n.jsx)(t.em,{children:"direction calculation"})," on."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"cache_hash"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," set a ",(0,n.jsx)(t.code,{children:"cache_hash"})," as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete is using this because of the huge data changes due to search and reorder. Defaults to ",(0,n.jsx)(t.code,{children:"null"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"wrapper_element"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"}),' has to be a HTML Element, ideal a mother element, used to calculate sizes and distances. Also used for the "click outside" detection. Clicking on the ',(0,n.jsx)(t.code,{children:"wrapper_element"})," will not be anymore triggered as an outside click."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"options_render"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," has to be a function, returning the items again. See ",(0,n.jsx)(t.a,{href:"/uilib/components/fragments/drawer-list#example-usage-of-options_render",children:"example"}),". This can be used to add additional options above the actual rendered list."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.a,{href:"/uilib/layout/space/properties",children:"Space"})}),(0,n.jsxs)(t.td,{children:[(0,n.jsx)(t.em,{children:"(optional)"})," spacing properties like ",(0,n.jsx)(t.code,{children:"top"})," or ",(0,n.jsx)(t.code,{children:"bottom"})," are supported."]})]})]})]})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,i.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(d,e)})):d(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-autocomplete-properties-mdx-0c9b3e6fadbc1474a964.js.map
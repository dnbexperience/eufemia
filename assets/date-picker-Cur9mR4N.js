import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{d as n,i as r}from"./Examples-C3t63LMM.js";import{W as i}from"./index-D7e1avVt.js";import a from"./demos-DOVzspXF.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components},{VisibleWhenNotVisualTest:a}=t;return a||l(`VisibleWhenNotVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { DatePicker } from '@dnb/eufemia'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsx)(t.p,{children:`The DatePicker component should be used whenever the user is to enter a single date or a date range/period with a start and end date.`}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1497`,children:`Figma`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/date-picker`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/date-picker`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(t.h3,{children:`Date Object`}),`
`,(0,o.jsxs)(t.p,{children:[`The DatePicker operates with a default JavaScript Date instance as well as a string (ISO 8601) like `,(0,o.jsx)(t.code,{children:`date="2019-05-05"`}),` (yyyy-MM-dd).`]}),`
`,(0,o.jsx)(t.h3,{children:`Handling time zones`}),`
`,(0,o.jsx)(t.p,{children:`The DatePicker component has no built-in time zone support because it only deals with dates (not time).`}),`
`,(0,o.jsxs)(t.p,{children:[`Ensure you do not create Date objects with time information (`,(0,o.jsx)(t.code,{children:`new Date()`}),`), as that will introduce time zone issues.`]}),`
`,(0,o.jsxs)(t.p,{children:[`If you need to use a `,(0,o.jsx)(t.code,{children:`Date`}),` object but want the same date everywhere, regardless of runtime timezone, you have to normalize it first.`]}),`
`,(0,o.jsx)(t.p,{children:`Use an ISO string with an explicit offset:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`const isoDate = '2025-01-01T00:00:00Z'
`})}),`
`,(0,o.jsx)(t.p,{children:`Or use UTC constructors:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`const utcDate = new Date(Date.UTC(2025, 0, 1))
`})}),`
`,(0,o.jsx)(t.h3,{children:`Root Element (React Portal)`}),`
`,(0,o.jsxs)(t.p,{children:[`The DatePicker component uses `,(0,o.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot`}),` internally to render its calendar. See the `,(0,o.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot documentation`}),` for information on how to control where the portal content appears in the DOM.`]}),`
`,(0,o.jsx)(t.h3,{children:`Manipulate the days in the calendar view`}),`
`,(0,o.jsxs)(t.p,{children:[`The callback event `,(0,o.jsx)(t.code,{children:`onDaysRender`}),` gives you the possibility to manipulate the "day" object before it gets rendered. This callback will be called many times, both on the first render and on every user interaction, like hover and selection. This means you have to ensure a performant date calculation.`]}),`
`,(0,o.jsxs)(t.p,{children:[`Please use `,(0,o.jsx)(t.a,{href:`https://date-fns.org`,children:`date-fns`}),` to make the calculations.`]}),`
`,(0,o.jsx)(a,{children:(0,o.jsx)(r,{})}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`dayObject`}),` object contains:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`[
    {
      date: Date,// Vanilla JavaScript Date object
      className: // define your custom css classes
      isInactive: boolean,// shows it as disabled only
      isDisabled: boolean,// shows it as disabled and with a strikethrough
      isPreview: boolean,// date is between startDate (exclusive) and hoverDate (inclusive)
      isSelectable: boolean,// if not last and next month and not disabled – handles z-index
      isStartDate: boolean,// date selected is start date
      isEndDate: boolean,// date selected is end date
      isToday: boolean,
      isWithinSelection: boolean,// date is between selection range
      isNextMonth: boolean,// used for selection and inactive calculation
      isLastMonth: boolean,// used for selection and inactive calculation
    },
    ...
]
`})}),`
`,(0,o.jsx)(t.h4,{children:`Highlighting "today"`}),`
`,(0,o.jsx)(t.p,{children:`By default, the DatePicker highlights the "today" date based on the user's local time zone.`}),`
`,(0,o.jsxs)(t.p,{children:[`If you need to treat another time zone as "today", mutate the `,(0,o.jsx)(t.code,{children:`dayObject.isToday`}),` flag inside the `,(0,o.jsx)(t.code,{children:`onDaysRender`}),` callback. The example below demonstrates how to compare every day against `,(0,o.jsx)(t.code,{children:`getOsloDate()`}),` and keep the highlight in sync with Oslo time.`]}),`
`,(0,o.jsx)(a,{children:(0,o.jsx)(n,{})}),`
`,(0,o.jsx)(t.p,{children:`Here is how to import the required helper:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { isSameDay } from 'date-fns'
import { DatePicker } from '@dnb/eufemia'
import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'
`})}),`
`,(0,o.jsx)(t.h3,{children:`Min & Max date`}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`minDate`}),` and `,(0,o.jsx)(t.code,{children:`maxDate`}),` props restrict which dates can be selected in the calendar view. Dates outside the given range will be disabled, both for single dates and ranges. However, the user can still type a date outside these limits directly in the input field — `,(0,o.jsx)(t.code,{children:`minDate`}),` and `,(0,o.jsx)(t.code,{children:`maxDate`}),` do `,(0,o.jsx)(t.strong,{children:`not`}),` validate typed input.`]}),`
`,(0,o.jsxs)(t.p,{children:[`If `,(0,o.jsx)(t.code,{children:`minDate`}),` or `,(0,o.jsx)(t.code,{children:`maxDate`}),` is given, the return object also contains information about whether the date is within the given limits:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`{
  isValidStartDate: boolean,
  isValidEndDate: boolean,
  ...
}
`})}),`
`,(0,o.jsxs)(t.h3,{children:[`Validation for `,(0,o.jsx)(t.code,{children:`minDate`}),`, `,(0,o.jsx)(t.code,{children:`maxDate`}),`, and invalid dates`]}),`
`,(0,o.jsxs)(t.p,{children:[`If you need validation of typed input against `,(0,o.jsx)(t.code,{children:`minDate`}),` and `,(0,o.jsx)(t.code,{children:`maxDate`}),`, use `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`}),` instead. It has `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/#date-limit-validation`,children:`built-in validation`}),` for `,(0,o.jsx)(t.code,{children:`minDate`}),`, `,(0,o.jsx)(t.code,{children:`maxDate`}),`, and invalid dates, and will show the user an error message when the entered date is outside the allowed range.`]}),`
`,(0,o.jsx)(t.p,{children:`Automatically changing the user input leads to worse UX and confusion, as the user might not understand why the date changed. It's best practice to tell the user what is wrong and let them correct it.`}),`
`,(0,o.jsx)(t.h3,{children:`Validation during input changes`}),`
`,(0,o.jsxs)(t.p,{children:[`In order to validate dates during typing, you can make use of `,(0,o.jsx)(t.code,{children:`isValid`}),` or `,(0,o.jsx)(t.code,{children:`isValidStartDate`}),` and `,(0,o.jsx)(t.code,{children:`isValidEndDate`}),`. Because the user can change a date in the input field, and the `,(0,o.jsx)(t.code,{children:`onType`}),` event will then return a falsy `,(0,o.jsx)(t.code,{children:`isValid`}),`.`]}),`
`,(0,o.jsx)(t.p,{children:`Additional event return object properties:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:"{\n  isValid: boolean, /* Available if `range` is `false` */\n  isValidStartDate: boolean, /* Available if `range` is `true` */\n  isValidEndDate: boolean, /* Available if `range` is `true` */\n}\n"})})]})}function c(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function u(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(a,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};
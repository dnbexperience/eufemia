import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Change log`}),`
`,(0,r.jsx)(t.p,{children:`Change log for the Eufemia Forms extension.`}),`
`,(0,r.jsxs)(t.p,{children:[`Get more `,(0,r.jsx)(t.a,{href:`/uilib/about-the-lib/releases`,children:`details about releases`}),` or have a look on all `,(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/releases`,children:`release notes on GitHub`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`v11.4.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Time/`,children:`Field.Time`}),` for time input (hours and minutes, optionally seconds).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/MultiSelection/`,children:`Field.MultiSelection`}),` for selecting multiple options from a fixed set.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v11.0.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`bankAccountType`}),` prop to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/BankAccountNumber/`,children:`Field.BankAccountNumber`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/BankAccountNumber/`,children:`Value.BankAccountNumber`}),` with support for Swedish BBAN, Swedish Bankgiro, Swedish Plusgiro, and IBAN.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/PhoneNumber/`,children:`Field.PhoneNumber`}),` now emits values in E.164 format (e.g. `,(0,r.jsx)(t.code,{children:`+4712345678`}),` instead of `,(0,r.jsx)(t.code,{children:`+47 12345678`}),`). Auto-detects country codes from E.164 and `,(0,r.jsx)(t.code,{children:`00`}),`-prefixed values. Patterns and schemas must be updated to match.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`detectCountryCode`}),` utility, exported from `,(0,r.jsx)(t.code,{children:`@dnb/eufemia/extensions/forms`}),`, for detecting E.164 country codes from phone number strings.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`preventDefaultOnSubmit`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`, allowing native browser form submission such as `,(0,r.jsx)(t.code,{children:`POST`}),` to a form `,(0,r.jsx)(t.code,{children:`action`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Removed automatic horizontal card-coupled outset alignment for `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/MainHeading/`,children:`Form.MainHeading`}),`, `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubHeading/`,children:`Form.SubHeading`}),`, `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/ButtonRow/`,children:`Form.ButtonRow`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Card/`,children:`Form.Card`}),` no longer enables `,(0,r.jsx)(t.code,{children:`outset`}),` by default.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/card/`,children:`Card.Provider`}),` / `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Card/`,children:`Form.Card.Provider`}),` has been removed (including `,(0,r.jsx)(t.code,{children:`disableCardBreakout`}),`).`]}),`
`,(0,r.jsxs)(t.li,{children:[`All `,(0,r.jsx)(t.code,{children:`export type Props`}),` in Field, Value, Form, Iterate, Wizard, and DataContext modules have been renamed to use a component-prefixed name (e.g. `,(0,r.jsx)(t.code,{children:`FieldStringProps`}),`, `,(0,r.jsx)(t.code,{children:`ValueNumberProps`}),`, `,(0,r.jsx)(t.code,{children:`FormHandlerProps`}),`). An ESLint rule now enforces this convention.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.100.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`totalSteps`}),` in `,(0,r.jsx)(t.code,{children:`onStepChange`}),` options for `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.96`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useSubmit/`,children:`Form.useSubmit`}),` to trigger form submit from outside `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.83.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed so data handling via `,(0,r.jsx)(t.code,{children:`path`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/DateOfBirth/`,children:`Field.DateOfBirth`}),` works as expected.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.82.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed spacing above the legend/label of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/DateOfBirth/`,children:`Field.DateOfBirth`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed widths of fields in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/DateOfBirth/`,children:`Field.DateOfBirth`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.82.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.a,{href:`https://zod.dev/`,children:`Zod`}),` schemas (along with Ajv).`]}),`
`,(0,r.jsxs)(t.li,{children:[`When using JSON Schema (Ajv) it is recommended to explicitly providing an `,(0,r.jsx)(t.code,{children:`ajvInstance`}),` to `,(0,r.jsx)(t.code,{children:`Form.Handler`}),`:`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.81.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/DateOfBirth/`,children:`Field.DateOfBirth`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/DateOfBirth/`,children:`Value.DateOfBirth`}),` component to select a date of birth.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.80.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`da-DK`}),` translations to Eufemia and Eufemia Forms.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.76.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added variant `,(0,r.jsx)(t.code,{children:`radio`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Boolean/`,children:`Field.Boolean`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Toggle/`,children:`Field.Toggle`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added variant `,(0,r.jsx)(t.code,{children:`switch`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Boolean/`,children:`Field.Boolean`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Toggle/`,children:`Field.Toggle`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added variant `,(0,r.jsx)(t.code,{children:`compact`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added address suggestions and autofill to the `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Connectors/Bring/`,children:`Bring API Connector`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so the value of the phone number is truncated to 8 digits when changing country code to `,(0,r.jsx)(t.code,{children:`NO`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/PhoneNumber/`,children:`Field.PhoneNumber`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Indeterminate`,children:`Field.Indeterminate`}),` supports the `,(0,r.jsx)(t.code,{children:`required`}),` property.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.75.3`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`required`}),` is working correctly together with date ranges like `,(0,r.jsx)(t.code,{children:`value=2023-12-07|2023-12-14`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.75.2`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed so maximum children can be 9 in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/blocks/ChildrenWithAge/`,children:`Block.ChildrenWithAge`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`disabled`}),` is correctly supported in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`onStepChange`}),` assigned to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/useStep/`,children:`Wizard.useStep`}),` is called every time.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`preventUncommittedChanges`}),` works properly within a `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.75.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`{itemNo}`}),` support in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/RemoveButton/`,children:`Iterate.RemoveButton`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` does work within a `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Ensured `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` with `,(0,r.jsx)(t.code,{children:`required`}),` property removes error in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Ensured `,(0,r.jsx)(t.code,{children:`reduceToVisibleFields`}),` works properly within `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.74.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`preventDefault`}),` in `,(0,r.jsx)(t.code,{children:`onClick`}),` for checkbox variants in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Toggle/`,children:`Field.Toggle`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Boolean/`,children:`Field.Boolean`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`resetDataAfterCommit`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Isolation/`,children:`Form.Isolation`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`preventUncommittedChanges`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Isolation/`,children:`Form.Isolation`}),` to show error during submit after user input.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Renamed `,(0,r.jsx)(t.code,{children:`requireCommit`}),` to `,(0,r.jsx)(t.code,{children:`preventUncommittedChanges`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Isolation/`,children:`Form.Isolation`}),` does work within a `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.73.2`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`labelSrOnly`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/PhoneNumber/`,children:`Field.PhoneNumber`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`labelSrOnly`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Toggle/`,children:`Field.Toggle`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.73.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed required validation when only country code was given in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/PhoneNumber/`,children:`Field.PhoneNumber`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.73.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Show error in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` on submit or in next step after user input.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Animate chevron on expand/collapse in the newly redesigned `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`labelSize`}),` to all `,(0,r.jsx)(t.code,{children:`Field.*`}),` components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`labelSrOnly`}),` to all `,(0,r.jsx)(t.code,{children:`Field.*`}),` components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`requireCommit`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` to show error during submit or next step after user input.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added variant `,(0,r.jsx)(t.code,{children:`radio-list`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Always validate fields in all `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),`(without keepInDOM).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed handling of invalid ISO code value in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SelectCountry/`,children:`Value.SelectCountry`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed handling of invalid ISO code value in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SelectCurrency/`,children:`Value.SelectCurrency`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/BankAccountNumber/`,children:`Value.BankAccountNumber`}),` does not render when value is empty.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/OrganizationNumber/`,children:`Value.OrganizationNumber`}),` does not render when value is empty.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/PhoneNumber/`,children:`Value.PhoneNumber`}),` does not render when value is empty.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/NationalIdentityNumber/`,children:`Value.NationalIdentityNumber`}),` does not render when value is empty.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),` does not pre-render step when `,(0,r.jsx)(t.code,{children:`keepInDOM`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`labelDescription`}),` when rendered without `,(0,r.jsx)(t.code,{children:`label`}),` will not have additional spacing above, in all `,(0,r.jsx)(t.code,{children:`Field.*`}),` components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`width="large"`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/PhoneNumber/`,children:`Field.PhoneNumber`}),` will be correct.`]}),`
`,(0,r.jsx)(t.li,{children:`Fixed so fields do not overflow in width on certain screen sizes.`}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),` gracefully handles `,(0,r.jsx)(t.code,{children:`undefined`}),` file inputs/values.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Card/`,children:`Form.Card`}),` used in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),` has a default outline color.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),` shows red border on submit errors.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Composition/`,children:`Field.Composition`}),` sets correct `,(0,r.jsx)(t.code,{children:`width`}),` if given.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed a11y issue when using `,(0,r.jsx)(t.code,{children:`required`}),` property in a `,(0,r.jsx)(t.code,{children:`button`}),` variant of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.72.3`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Ensure `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Composition/`,children:`Field.Composition`}),` with horizontal layout will still wrap.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Ensure `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),` with the autocomplete variant receives `,(0,r.jsx)(t.code,{children:`showIndicator`}),` in the first onType parameter object.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.72.2`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Ensure `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` schema validation.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.72.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed anchor alignment in the redesigned `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed font size of items in the redesigned `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.72.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`New design for `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Deprecated `,(0,r.jsx)(t.code,{children:`variant`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),`, as it no longer has any variants.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Deprecated `,(0,r.jsx)(t.code,{children:`sidebarId`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),`, as it no longer has any sidebar. If an id is needed, use the `,(0,r.jsx)(t.code,{children:`id`}),` property.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.71.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`disableDragAndDrop`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),` to disable file drag and drop.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`description`}),` in Upload's `,(0,r.jsx)(t.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`fileItem`}),` to add description for a given file.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`removeDeleteButton`}),` in Upload's `,(0,r.jsx)(t.a,{href:`/uilib/components/upload/properties/#fileitem`,children:`fileItem`}),` to hide the remove button for a given file.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`iso`}),` (country) to additional args in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/PhoneNumber/`,children:`Field.PhoneNumber`}),` events.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.70.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed so form cannot be submitted when `,(0,r.jsx)(t.code,{children:`error`}),` property is set in `,(0,r.jsx)(t.code,{children:`Field.*`}),` components.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.70.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added default `,(0,r.jsx)(t.code,{children:`autoComplete`}),` of `,(0,r.jsx)(t.code,{children:`current-password`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Password/`,children:`Field.Password`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`allowDuplicates`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),` to allow uploading duplicate files.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so only comparing existing properties of file's `,(0,r.jsx)(t.code,{children:`name`}),`, `,(0,r.jsx)(t.code,{children:`size`}),` and `,(0,r.jsx)(t.code,{children:`lastModified`}),` when determining if file is a duplicate in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`hasValue`}),` runs in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` when path is missing.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed error reporting during `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),` navigation with async event handlers and/or field validators.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.69.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed so error message in the step menu of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),` is removed when unmounted.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed the rendering routine of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so async removal of file in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),` with same file name as an other file will not display spinner/loading for both files, but only the file where remove was clicked.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.69.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`CountryISO`}),` as the `,(0,r.jsx)(t.code,{children:`value`}),` type to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry/`,children:`Field.SelectCountry`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCurrency/`,children:`Field.SelectCurrency`}),` component to select a currency value.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SelectCurrency/`,children:`Value.SelectCurrency`}),` component to render a currency value.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added possibility to set `,(0,r.jsx)(t.code,{children:`autoComplete`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry/`,children:`Field.SelectCountry`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so there's no error message in the step menu of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),` for the active/current step, on small screens.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),` does not show invalid error.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed typing for `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.68.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`sv-SE`}),` translations to Eufemia and Eufemia Forms.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added rendering of `,(0,r.jsx)(t.code,{children:`labelDescription`}),` beneath `,(0,r.jsx)(t.code,{children:`label`}),` and placed help button after `,(0,r.jsx)(t.code,{children:`label`}),` in all `,(0,r.jsx)(t.code,{children:`Field.*`}),` components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`countryCode`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for showing error messages on invalid date in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Adjusted the label width of `,(0,r.jsx)(t.code,{children:`Field.*`}),` components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Adjusted the width of `,(0,r.jsx)(t.code,{children:`Value.*`}),` components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`minDate`}),` and `,(0,r.jsx)(t.code,{children:`maxDate`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`}),` does not interrupt first form submit.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so value `,(0,r.jsx)(t.code,{children:`000 000 000`}),` should be invalid in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/OrganizationNumber/`,children:`Field.OrganizationNumber`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so value `,(0,r.jsx)(t.code,{children:`0000 00 00000`}),` should be invalid in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/BankAccountNumber/`,children:`Field.BankAccountNumber`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Name/`,children:`Field.Name.Company`}),` must consist of at least 3 letters.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so there's no error message in the step menu of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),` after user has entered required data.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so there's no error message in the step menu of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),` for the active/current step.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Composition/`,children:`Value.Composition`}),` inherits properties defined in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Provider/`,children:`Value.Provider`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.67.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`minDate`}),` and `,(0,r.jsx)(t.code,{children:`maxDate`}),` is validated by the start of the day (00:00) in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.67.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added support for async Autocomplete to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.66.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed styling of help button in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed spacing of help button in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList/`,children:`Value.SummaryList`}),` when used in a `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/InfoOverlay/`,children:`Form.InfoOverlay`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Composition/`,children:`Field.Composition`}),` always renders a `,(0,r.jsx)(t.code,{children:`fieldset`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`skipPortal`}),` can be used in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`aria-required`}),` and `,(0,r.jsx)(t.code,{children:`required`}),` properties are set in the `,(0,r.jsx)(t.code,{children:`input`}),` element for `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.66.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added inline help button (`,(0,r.jsx)(t.code,{children:`help`}),`) to all `,(0,r.jsx)(t.code,{children:`Value.*`}),` components as default (with option to open in Dialog).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`validationMode`}),` property with `,(0,r.jsx)(t.code,{children:`bypassOnNavigation`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`keepInDOM`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added existing errors in `,(0,r.jsx)(t.code,{children:`onSubmitRequest`}),` before `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` submit or `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),` change.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed showing error in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard(StepIndicator)`}),` menu and prevent submission if previous steps contain errors or have an unknown state.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so validation always run on `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),` changes.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.64.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Address/`,children:`Field.Address.Street`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Address/`,children:`Field.Address.Postal`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Connectors/Bring/`,children:`Bring API Connector`}),` to verify a postal code or autofill a street name, using Bring's `,(0,r.jsx)(t.a,{href:`https://developer.bring.com/api/postal-code/`,children:`Postal Code API`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added month and year validation in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Expiry/`,children:`Field.Expiry`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/NationalIdentityNumber/info/#createminimumageverifier`,children:`createMinimumAgeVerifier`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/NationalIdentityNumber/`,children:`Field.NationalIdentityNumber`}),` to make a customizable minimum age verifier function.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed displaying `,(0,r.jsx)(t.code,{children:`title`}),` as aria-label in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),` when wrapped in a `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.63.0`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added support for nesting `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` inside of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added showing field errors during submit inside `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` when `,(0,r.jsx)(t.code,{children:`bubbleValidation`}),` is `,(0,r.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for conditional function based `,(0,r.jsx)(t.code,{children:`info`}),`, `,(0,r.jsx)(t.code,{children:`warning`}),` and `,(0,r.jsx)(t.code,{children:`error`}),` properties to all `,(0,r.jsx)(t.code,{children:`Field.*`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Visibility/`,children:`Iterate.Visibility`}),` to be used within `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` (relative paths).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`transformSelection`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`required`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`required`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`itemPath`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for inline `,(0,r.jsx)(t.code,{children:`style`}),` property to options in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for arrays with errors for `,(0,r.jsx)(t.code,{children:`onChangeValidator`}),` and `,(0,r.jsx)(t.code,{children:`onBlurValidator`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for property `,(0,r.jsx)(t.code,{children:`connectWithItemPath`}),` to `,(0,r.jsx)(t.code,{children:`onBlurValidator`}),` and `,(0,r.jsx)(t.code,{children:`onChangeValidator`}),` to be used within `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate`,children:`Iterate`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added the internal array as a third parameter to the callback function’s children in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`displayValue`}),` and `,(0,r.jsx)(t.code,{children:`label`}),` to `,(0,r.jsx)(t.code,{children:`transformData`}),` from fields inside `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate`,children:`Iterate`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so wizard step changes scroll so the `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard(StepIndicator)`}),` is included at the top.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry/`,children:`Field.SelectCountry`}),` does not open when `,(0,r.jsx)(t.code,{children:`defaultValue`}),` is given.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed typing of `,(0,r.jsx)(t.code,{children:`connectWithPath`}),` in validators.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`fileHandler`}),` will not execute when validation errors in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`{itemNo}`}),` in `,(0,r.jsx)(t.code,{children:`label`}),` will work in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Toggle/`,children:`Field.Toggle`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed inactive `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` blocking `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),` navigation when `,(0,r.jsx)(t.code,{children:`bubbleValidation`}),` is `,(0,r.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed animation for `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` when used inside `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList/`,children:`Value.SummaryList`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Deprecated `,(0,r.jsx)(t.code,{children:`continuousValidation`}),` in favor of `,(0,r.jsx)(t.code,{children:`validateContinuously`}),` in all `,(0,r.jsx)(t.code,{children:`Field.*`}),` components and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.62.4`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed so divider line is displayed when setting `,(0,r.jsx)(t.code,{children:`divider="line"`}),` in `,(0,r.jsx)(t.code,{children:`Iterate.*`}),` components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Ensured `,(0,r.jsx)(t.code,{children:`setFormError`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useValidation/`,children:`Form.useValidation`}),` accepts `,(0,r.jsx)(t.code,{children:`undefined`}),` or `,(0,r.jsx)(t.code,{children:`null`}),` as value.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Prioritized `,(0,r.jsx)(t.code,{children:`gap`}),` over `,(0,r.jsx)(t.code,{children:`stack`}),` spacing in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Card/`,children:`Form.Card`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.62.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed font-size of non-clickable Field.Upload item in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed support for `,(0,r.jsx)(t.code,{children:`sessionStorageId`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.62`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`label`}),` and `,(0,r.jsx)(t.code,{children:`showLabel`}),` properties to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitIndicator/`,children:`Form.SubmitIndicator`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`update`}),` method to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/setData/`,children:`Form.setData`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.61`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added support for async `,(0,r.jsx)(t.code,{children:`onFileClick`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Upload/`,children:`Value.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`transformIn`}),` and `,(0,r.jsx)(t.code,{children:`transformOut`}),` supports changed array and object instances.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed issue where label did not stretch when providing `,(0,r.jsx)(t.code,{children:`width="stretch"`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` which is used in most `,(0,r.jsx)(t.code,{children:`Field.*`}),` components.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.60.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Fixed so there's a gap between file and remove button in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so there's no scrolling when removing file in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed handling of multiple chained async actions using `,(0,r.jsx)(t.code,{children:`fileHandler`}),`, `,(0,r.jsx)(t.code,{children:`onFileClick`}),`, and `,(0,r.jsx)(t.code,{children:`onFileDelete`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.60`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/InfoOverlay/`,children:`Form.InfoOverlay`}),` to display error, success (receipt), or custom messages to users.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added async `,(0,r.jsx)(t.code,{children:`onFileDelete`}),` support to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added async `,(0,r.jsx)(t.code,{children:`onFileClick`}),` support to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`onFileClick`}),` support to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Upload/`,children:`Value.Upload`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`onVisible`}),` property in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`onAnimationEnd`}),` property in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed unnecessary rerenders in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed handling of multiple file upload actions when using async `,(0,r.jsx)(t.code,{children:`fileHandler`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.58`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`variant="filled"`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer/`,children:`Iterate.ViewContainer`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),`, to render with a background color.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`toolbarVariant="custom"`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer/`,children:`Iterate.ViewContainer`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),`, to render the given toolbar without any spacing so it can be customized to your needs.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`showConfirmDialog`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/RemoveButton/`,children:`Iterate.RemoveButton`}),`, to open a confirmation dialog before removing the item.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`decoupleForm`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`, to be able to use the data context in a more flexible way.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for using function reference instead of a string based `,(0,r.jsx)(t.code,{children:`id`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`sessionStorageId`}),` support to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),` with empty file list rendering.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#typescript-support`,children:`docs on how to deal with TypeScript types`}),`, and enhanced typings.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so there is no outline when using `,(0,r.jsx)(t.code,{children:`variant="basic"`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` containers when used in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed formatting of country prefixes in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/PhoneNumber/`,children:`Value.PhoneNumber`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.57`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added possibility for disabling individual options in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/ArraySelection/`,children:`Field.ArraySelection`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`labelSrOnly`}),` to Value.* components, to be able to provide a label that is not visible.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Card/`,children:`Form.Card`}),` component to make it easier to use `,(0,r.jsx)(t.a,{href:`/uilib/components/card/`,children:`Card`}),` inside a form.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`outset`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Card/`,children:`Form.Card`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/components/card/`,children:`Card`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Deprecated `,(0,r.jsx)(t.code,{children:`validator`}),` property in favor of `,(0,r.jsx)(t.code,{children:`onChangeValidator`}),` in Field.* components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Renamed `,(0,r.jsx)(t.code,{children:`asyncFileHandler`}),` to `,(0,r.jsx)(t.code,{children:`fileHandler`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`, to support both async and sync file handling.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed displaying indicator with async `,(0,r.jsx)(t.code,{children:`onBlurValidator`}),` call when `,(0,r.jsx)(t.code,{children:`validateInitially`}),` is used.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed sharing submit indicator for fields inside `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Composition/`,children:`Field.Composition`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`errorMessages`}),` will not result in infinite loops when not wrapped in `,(0,r.jsx)(t.code,{children:`useMemo`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed alignment issue in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList/`,children:`Value.SummaryList`}),`, when providing a field without label.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.56`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added inline help button (`,(0,r.jsx)(t.code,{children:`help`}),`) to all `,(0,r.jsx)(t.code,{children:`Field.*`}),` components as default (with option to open in Dialog).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`asyncFileHandler`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),`, to support async file handling during upload.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.a,{href:`/uilib/components/date-picker/properties/`,children:`DatePicker properties`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for multiple `,(0,r.jsx)(t.code,{children:`info`}),`, `,(0,r.jsx)(t.code,{children:`warning`}),` and `,(0,r.jsx)(t.code,{children:`error`}),` messages by making it possible to provide an array of messages.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`info`}),` and `,(0,r.jsx)(t.code,{children:`warning`}),` properties renders given elements.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.55.1`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`console.log`}),` warning when using invalid child in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList/`,children:`Value.SummaryList`}),` component.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),` error when using `,(0,r.jsx)(t.code,{children:`required`}),`, when navigating between Wizard step changes.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.55`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`transformLabel`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Composition/`,children:`Value.Composition`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Upload/`,children:`Value.Upload`}),` component to render file values.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added Iterate support for `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/PostalCodeAndCity/`,children:`Field.PostalCodeAndCity`}),` when using `,(0,r.jsx)(t.code,{children:`country`}),` with a path.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`layoutOptions`}),` for enhanced horizontal label layout in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Provider/`,children:`Field.Provider`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`EditButton`}),`, `,(0,r.jsx)(t.code,{children:`CancelButton`}),` and `,(0,r.jsx)(t.code,{children:`DoneButton`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` containers.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added maximum possible value to joint-responsibility & daycare fields in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/blocks/ChildrenWithAge/`,children:`Block.ChildrenWithAge`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed vertical gap between `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/ArraySelection/`,children:`Field.ArraySelection`}),` toggle buttons with checkbox variant.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Number/`,children:`Field.Number`}),` with `,(0,r.jsx)(t.code,{children:`percent`}),` and without a value renders correctly.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so components having `,(0,r.jsx)(t.code,{children:`fieldset`}),` inside still can use spacing.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so there's no extra space from Value.* components when using `,(0,r.jsx)(t.code,{children:`inline`}),` property.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so errors display underneath fields when nested inside `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),` or `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/ArraySelection/`,children:`Field.ArraySelection`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.54`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Deprecated Ajv `,(0,r.jsx)(t.code,{children:`validationRule`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/error-messages/`,children:`FormError`}),` and deprecated `,(0,r.jsx)(t.code,{children:`errorMessages`}),` keys like `,(0,r.jsx)(t.code,{children:`pattern`}),` in favor of Eufemia translation keys like `,(0,r.jsx)(t.code,{children:`Field.errorPattern`}),`. For a migration guide, take a look at `,(0,r.jsx)(t.a,{href:`/uilib/about-the-lib/releases/eufemia/v11-info/#error-handling`,children:`release notes for the future major release, v11`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/about-fields/#empty-value`,children:`docs`}),` about `,(0,r.jsx)(t.code,{children:`emptyValue`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`transformData`}),` to the `,(0,r.jsx)(t.code,{children:`onSubmit`}),` event listener of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`onDone`}),`, `,(0,r.jsx)(t.code,{children:`onCancel`}),` and `,(0,r.jsx)(t.code,{children:`onEdit`}),` events to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` containers.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Updated country names in list of countries used in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry/`,children:`Field.SelectCountry`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`decimalLimit={0}`}),` together with `,(0,r.jsx)(t.code,{children:`currency`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Number/`,children:`Field.Number`}),`, and `,(0,r.jsx)(t.code,{children:`decimalLimit={0}`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Currency/`,children:`Field.Currency`}),`, will not allow input of decimals.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so it's possible to render multiple (combined) Ajv errors with translated messages, in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`onBlurValidator`}),` only runs when no other errors(like required, etc.) are present, in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`autocomplete="off"`}),` is correctly set when setting `,(0,r.jsx)(t.code,{children:`autoComplete={false}`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed alignment of status message (error, warning, info) in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`,(0,r.jsx)(t.li,{children:`Fixed schema validation for required paths with matching name.`}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed correct sorting of countries in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry/`,children:`Field.SelectCountry`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.53`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added validation of Norwegian bank account numbers to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/BankAccountNumber/`,children:`Field.BankAccountNumber`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useTranslation/`,children:`Form.useTranslation`}),` that returns the translations for the current locale.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`renderMessage`}),` function in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useTranslation/`,children:`Form.useTranslation`}),` to render a string with line-breaks.`]}),`
`,(0,r.jsx)(t.li,{children:`Added console warning when a field path is declared more than one time.`}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`country`}),` property in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/PostalCodeAndCity/`,children:`Field.PostalCodeAndCity`}),`, to support different countries than only Norway.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed UI alignments in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/blocks/ChildrenWithAge/`,children:`Block.ChildrenWithAge`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` is in sync with the data context, and call `,(0,r.jsx)(t.code,{children:`onChange`}),` when `,(0,r.jsx)(t.code,{children:`countPath`}),` changes.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.52`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`transformLabel`}),` to all `,(0,r.jsx)(t.code,{children:`Value.*`}),` components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`bubbleValidation`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Isolation/`,children:`Form.Isolation`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),`, to prevent the form from being submitted when there are fields with errors.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/NationalIdentityNumber/info/#createminimumagevalidator`,children:`createMinimumAgeValidator`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/NationalIdentityNumber/`,children:`Field.NationalIdentityNumber`}),` to make a customizable minimum age validator.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useSnapshot/`,children:`Form.useSnapshot`}),` hook to handle snapshots of data.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`id`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),` for when using dynamic steps with `,(0,r.jsx)(t.code,{children:`activeWhen`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/ItemNo/`,children:`Iterate.ItemNo`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`Form.SubmitConfirmation`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`isolatedData`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added displaying phone numbers in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/PhoneNumber/`,children:`Value.PhoneNumber`}),` using prefix `,(0,r.jsx)(t.code,{children:`+`}),` instead of `,(0,r.jsx)(t.code,{children:`00`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`defaultValue`}),` (and `,(0,r.jsx)(t.code,{children:`value`}),`) for fields used in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added support for `,(0,r.jsx)(t.code,{children:`isValid`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` for showing content based on the validation of a field.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Removed the internal `,(0,r.jsx)(t.code,{children:`pattern`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/OrganizationNumber/`,children:`Field.OrganizationNumber`}),`, rather using the internal validator.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Removed the internal `,(0,r.jsx)(t.code,{children:`pattern`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/NationalIdentityNumber/`,children:`Field.NationalIdentityNumber`}),`, rather using the internal validator.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/clearData/`,children:`Form.clearData`}),` works in `,(0,r.jsx)(t.code,{children:`React.StrictMode`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed use of unpolyfilled structuredClone in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`}),` hook.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`onBlurValidator`}),` works with `,(0,r.jsx)(t.code,{children:`validateInitially`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),` keeps open when falsy value or empty object was given as the iterate value.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so all errors on every value change is displayed when using exported validators from `,(0,r.jsx)(t.code,{children:`exportValidators`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`exportValidators`}),` is not called when not exported as an array.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.code,{children:`emptyValue`}),` is set in the data context when defined.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry/`,children:`Field.SelectCountry`}),` has a fallback locale (nb-NO).`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.51`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`rounding`}),` property with support for `,(0,r.jsx)(t.code,{children:`half-even`}),` rounding to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Number/`,children:`Value.Number`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Currency/`,children:`Value.Currency`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`inheritLabel`}),` and `,(0,r.jsx)(t.code,{children:`inheritVisibility`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList/`,children:`Value.SummaryList`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`setFieldStatus`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useValidation/`,children:`Form.useValidation`}),` to handle/set the status (error) of a single field.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added displaying of `,(0,r.jsx)(t.code,{children:`hasChildren`}),` value in summary of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/blocks/ChildrenWithAge/`,children:`Block.ChildrenWithAge`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`range`}),` for date range functionality in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/`,children:`Field.Date`}),`, and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Date/`,children:`Value.Date`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitConfirmation/`,children:`Form.SubmitConfirmation`}),` to confirm a submit during or before sending.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Provider/`,children:`Value.Provider`}),` to propagate value properties down to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/components/`,children:`Value components`}),` (e.g. `,(0,r.jsx)(t.code,{children:`inheritVisibility`}),`).`]}),`
`,(0,r.jsxs)(t.li,{children:[`Deprecated `,(0,r.jsx)(t.code,{children:`Form.useError`}),` and replaced with `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useValidation/`,children:`Form.useValidation`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Deprecated `,(0,r.jsx)(t.code,{children:`omit_rounding`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Number/`,children:`Value.Number`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Currency/`,children:`Value.Currency`}),`, replaced with `,(0,r.jsx)(t.code,{children:`rounding="omit"`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Deprecated Form.FieldProps and replaced with `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Provider/`,children:`Field.Provider`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed error throwing when using `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Count/`,children:`Iterate.useCount hook`}),` or `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`useData hook`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),` without form id.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so the deprecated `,(0,r.jsx)(t.code,{children:`itemNr`}),` still works in the `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer/`,children:`Iterate.ViewContainer`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Toggle/`,children:`Field.Toggle`}),` does not render invisible label when not providing any label.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed CSS `,(0,r.jsx)(t.code,{children:`max-width`}),` of card in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard(StepIndicator)`}),` by removing the `,(0,r.jsx)(t.code,{children:`max-width`}),` attribute.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Fixed so that we keep field state during a `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),` step change when used inside `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` (which used `,(0,r.jsx)(t.code,{children:`defaultValue`}),` as the data source).`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.50`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`reduceToVisibleFields`}),` to the `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`}),` hook and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` `,(0,r.jsx)(t.code,{children:`onSubmit`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`inheritVisibility`}),` to each `,(0,r.jsx)(t.code,{children:`Value.*`}),` component.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`variant`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/ArraySelection/`,children:`Value.ArraySelection`}),`, to allow for list layout.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added validation of Norwegian organization number to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/OrganizationNumber/`,children:`Field.OrganizationNumber`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`filterCountries`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/PhoneNumber/`,children:`Field.PhoneNumber`}),`, to be able to filter out countries.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`filterCountries`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/SelectCountry/`,children:`Field.SelectCountry`}),`, to be able to filter out countries.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`limit`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`remove`}),` method to the `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`}),` hook.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Deprecated `,(0,r.jsx)(t.code,{children:`itemNr`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`}),` and replaced with `,(0,r.jsx)(t.code,{children:`itemNo`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.48`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Make `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Toolbar/`,children:`Iterate.Toolbar`}),` customizable.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added new property `,(0,r.jsx)(t.code,{children:`toolbarVariant`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/ViewContainer/`,children:`Iterate.ViewContainer`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/EditContainer/`,children:`Iterate.EditContainer`}),` for hiding toolbar buttons when there is only one item in the array.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.46`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SelectCountry/`,children:`Value.SelectCountry`}),` component to render a country value.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.45`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/PushContainer/`,children:`Iterate.PushContainer`}),` to create new items in an array.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/ArraySelection/`,children:`Value.ArraySelection`}),` component to render an array of values.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Selection/`,children:`Value.Selection`}),` component to render a selection value.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.43`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Isolation/`,children:`Form.Isolation`}),` data provide.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Deprecated `,(0,r.jsx)(t.code,{children:`withValue`}),` in `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` and replaced it with `,(0,r.jsx)(t.code,{children:`hasValue`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.41`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Upload/`,children:`Field.Upload`}),` component.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.38`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added support for nesting fields inside of `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/ArraySelection/`,children:`Form.ArraySelection`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.36`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added support for dynamic Wizard steps with the `,(0,r.jsx)(t.code,{children:`active`}),` and `,(0,r.jsx)(t.code,{children:`activeWhen`}),` property (`,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),`).`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.35`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added view and edit containers to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.34`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/EditButton/`,children:`Wizard.EditButton`}),` component.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added a first block (ChildrenWithAge) to the `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/blocks/`,children:`list of blocks`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.33`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` that contains components and functionality for composing blocks of fields and values to be reused in different contexts.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.32`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Slider/`,children:`Field.Slider`}),` component.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.31`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Indeterminate`,children:`Field.Indeterminate`}),` component to handle checkbox indeterminate (partial) states.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.30`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`Form.FieldProps`}),` (which got renamed to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Provider/`,children:`Field.Provider`}),`) component to forward field properties, such as `,(0,r.jsx)(t.code,{children:`required`}),` or `,(0,r.jsx)(t.code,{children:`disabled`}),` to all nested field components.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`locale`}),` and `,(0,r.jsx)(t.code,{children:`translations`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` component to support custom translations.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`disabled`}),` and `,(0,r.jsx)(t.code,{children:`required`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` component and pass these properties to the children fields.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`fieldPropsWhenHidden`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` component to pass properties to the children when visibility is hidden.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.29`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Name/`,children:`Field.Name`}),` component.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Name/`,children:`Value.Name`}),` component.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/OrganizationNumber/`,children:`Value.OrganizationNumber`}),` component.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Value/PostalCodeAndCity/`,children:`Value.PostalCodeAndCity`}),` component.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`autocomplete`}),` variant to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),` with `,(0,r.jsx)(t.code,{children:`autocompleteProps`}),` support.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`transformIn`}),` and `,(0,r.jsx)(t.code,{children:`transformOut`}),` to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added step transition (animation) to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),`.`]}),`
`,(0,r.jsx)(t.li,{children:`Enhanced session data storage performance by debouncing.`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.28`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`getValue`}),` method to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/#filter-data`,children:`Form.useData`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/getData/#filter-data`,children:`Form.getData`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Added `,(0,r.jsx)(t.code,{children:`keepInDOM`}),` property to `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`v10.27`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Stable release of the Eufemia Forms extension 🎉`}),`
`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};
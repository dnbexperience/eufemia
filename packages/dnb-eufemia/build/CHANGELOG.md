# Changelog

All notable changes to @dnb/eufemia will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [10.58.0](https://github.com/dnbexperience/eufemia/compare/v10.57.1...v10.58.0) (2024-11-29)


### :sparkles: Features

* **Forms:** add `showConfirmDialog` to Iterate.RemoveButton ([#4330](https://github.com/dnbexperience/eufemia/issues/4330)) ([76bddf0](https://github.com/dnbexperience/eufemia/commit/76bddf0adb7e673c608526de2e6f70195a98a8fd))
* **Forms:** add `variant="filled"` and `toolbarVariant="custom"` to Iterate.EditContainer and Iterate.ViewContainer ([#4329](https://github.com/dnbexperience/eufemia/issues/4329)) ([b2b9eef](https://github.com/dnbexperience/eufemia/commit/b2b9eef82084185fdc693dba9320f95383aba7e2))
* **Forms:** add support for using a function references instead of a string based id ([#4331](https://github.com/dnbexperience/eufemia/issues/4331)) ([a6e3bc3](https://github.com/dnbexperience/eufemia/commit/a6e3bc31009dd3f3af944b2fd6657b036fe5cbf0))
* **Forms:** enhance typing and add docs on how to deal with TypeScript types ([#4343](https://github.com/dnbexperience/eufemia/issues/4343)) ([10b199b](https://github.com/dnbexperience/eufemia/commit/10b199bfab4a040bd39e12a06df74385286d7c66))
* **Forms:** introduce `decoupleForm` prop to Form.Handler ([#4332](https://github.com/dnbexperience/eufemia/issues/4332)) ([0b02b6e](https://github.com/dnbexperience/eufemia/commit/0b02b6e84687c8e44f44a935c009e1c8e5c42519))


### :bug: Bug Fixes

* **DatePicker:** make sure the picker and input only reacts to the props that have changed ([#4342](https://github.com/dnbexperience/eufemia/issues/4342)) ([4cd52a3](https://github.com/dnbexperience/eufemia/commit/4cd52a3ac3e4c1e53332de7d920e104a68d87d7f))
* **Forms.Card:** remove outline when variant="basic" on Section containers when used in Wizard ([#4336](https://github.com/dnbexperience/eufemia/issues/4336)) ([ebad212](https://github.com/dnbexperience/eufemia/commit/ebad212df87cf2cd207fc18d885ff5b7b6e3d0fc))
* **forms:** add `sessionStorageId` support to Field.Upload with empty file list rendering ([#4339](https://github.com/dnbexperience/eufemia/issues/4339)) ([d02a0af](https://github.com/dnbexperience/eufemia/commit/d02a0afa838e3eb0816d0d8a9d026f707c692c1a))
* **NumberFormat:** improve regex for parsing phone numbers with country codes ([#4340](https://github.com/dnbexperience/eufemia/issues/4340)) ([96613ed](https://github.com/dnbexperience/eufemia/commit/96613ed769d80bcd0d51fed6e739ef0c405a3cd6)), closes [#4337](https://github.com/dnbexperience/eufemia/issues/4337)

## [10.57.1](https://github.com/dnbexperience/eufemia/compare/v10.57.0...v10.57.1) (2024-11-22)


### :repeat: CI

* only run GitHub Actions on git commits ([#4327](https://github.com/dnbexperience/eufemia/issues/4327)) ([8a07477](https://github.com/dnbexperience/eufemia/commit/8a07477954de68a0e2b16306cb9bfdd707b36499))


### :bug: Bug Fixes

* **CountryFlag:** include flag icons in repo instead of via dependency ([#4324](https://github.com/dnbexperience/eufemia/issues/4324)) ([69dc60a](https://github.com/dnbexperience/eufemia/commit/69dc60a9a58141e5939b1bd8b78c9f9b87035823)), closes [#4307](https://github.com/dnbexperience/eufemia/issues/4307)
* **Forms:** ensure Form.Card supports spacing props ([#4328](https://github.com/dnbexperience/eufemia/issues/4328)) ([f981b42](https://github.com/dnbexperience/eufemia/commit/f981b4233bec7997da6c142490cbbbedd6be19aa))

## [10.57.0](https://github.com/dnbexperience/eufemia/compare/v10.56.0...v10.57.0) (2024-11-22)


### :memo: Documentation

* **Field.Upload:** adds `asyncFileHandler` property ([#4288](https://github.com/dnbexperience/eufemia/issues/4288)) ([fb09758](https://github.com/dnbexperience/eufemia/commit/fb09758333ed979b00019688fa120871548281f8))
* **Field.Upload:** adds asyncFileHandler property ([7ccdabd](https://github.com/dnbexperience/eufemia/commit/7ccdabdf81c8a0a9d01d4062067a29b2ea834b48))


### :bug: Bug Fixes

* **Forms:** align Value.SummaryList when Value.* has no label ([#4311](https://github.com/dnbexperience/eufemia/issues/4311)) ([b6621c2](https://github.com/dnbexperience/eufemia/commit/b6621c286b03ee20e627a6f2b505cae4a2715a64))
* **Forms:** ensure fields inside composition share submit indicator ([#4309](https://github.com/dnbexperience/eufemia/issues/4309)) ([e726e20](https://github.com/dnbexperience/eufemia/commit/e726e20283c8770db79e183cccacfa65da533c7f))
* **Forms:** safeguard errorMessages to avoid infinite loops when not wrapped in useMemo ([#4305](https://github.com/dnbexperience/eufemia/issues/4305)) ([f14bacc](https://github.com/dnbexperience/eufemia/commit/f14bacc798e583e7ba917be9a89c75375d23c655))
* **Forms:** show indicator with async onBlurValidator call when `validateInitially` is used ([#4303](https://github.com/dnbexperience/eufemia/issues/4303)) ([c585491](https://github.com/dnbexperience/eufemia/commit/c585491618fa504d4762d5f947ff05c1c73f3c24))
* **Icon:** ensure icon name is rendered as `data-testid` ([#4304](https://github.com/dnbexperience/eufemia/issues/4304)) ([235b823](https://github.com/dnbexperience/eufemia/commit/235b823f3daeca826594a5ea29a23e83e8636b1c))


### :sparkles: Features

* **Card, Section:** add `outset` property for moderate layout breakout ([#4317](https://github.com/dnbexperience/eufemia/issues/4317)) ([6008d9a](https://github.com/dnbexperience/eufemia/commit/6008d9a521116754b193a22dac6c2d15142c1897))
* **DrawerList, Dropdown, Autocomplete, Field.Selection, Field.ArraySelection:** disabled options ([#4154](https://github.com/dnbexperience/eufemia/issues/4154)) ([8786d5d](https://github.com/dnbexperience/eufemia/commit/8786d5d59c349cb13e2f2fb851417a39a4d89b8d))
* **Field.Upload:** adds support for async and sync fn in `fileHandler` ([#4294](https://github.com/dnbexperience/eufemia/issues/4294)) ([2cc816a](https://github.com/dnbexperience/eufemia/commit/2cc816ae92c536b1b87c6a216a2b0c3555e40a58))
* **Forms:** add `Form.Card` with different default appearance than Card (use `Form.Card` in forms instead of Card) ([#4318](https://github.com/dnbexperience/eufemia/issues/4318)) ([7bbc0ca](https://github.com/dnbexperience/eufemia/commit/7bbc0ca48afe745df51b0a63357f120b0c66d3f6))
* **Forms:** add `labelSrOnly` to Value.* components ([#4319](https://github.com/dnbexperience/eufemia/issues/4319)) ([46f68ae](https://github.com/dnbexperience/eufemia/commit/46f68aebe829083f6062b1ed31514026f0c103da)), closes [#4311](https://github.com/dnbexperience/eufemia/issues/4311)
* **Forms:** deprecate `validator` in favor of `onChangeValidator` ([#4314](https://github.com/dnbexperience/eufemia/issues/4314)) ([5a06b2e](https://github.com/dnbexperience/eufemia/commit/5a06b2e68f4f2ce71f743dff9e849cadf8c9b4ac))
* **Typography:** add general `.dnb-t` helper classes and add typography props to Span ([#4235](https://github.com/dnbexperience/eufemia/issues/4235)) ([9dfe66d](https://github.com/dnbexperience/eufemia/commit/9dfe66d8bba5dda147f7d66e9b3f757ff4cb17eb))

## [10.56.0](https://github.com/dnbexperience/eufemia/compare/v10.55.1...v10.56.0) (2024-11-18)


### :bug: Bug Fixes

* **DatePicker:** ensure that `endMonth` does not fallback to `startMonth` when `endMonth` prop is defined ([#4254](https://github.com/dnbexperience/eufemia/issues/4254)) ([5281257](https://github.com/dnbexperience/eufemia/commit/5281257c6240f57061bbe1d17ce1ea80434097ea))
* **Forms:** render given elements to `warning` and `info` properties ([#4261](https://github.com/dnbexperience/eufemia/issues/4261)) ([d60de25](https://github.com/dnbexperience/eufemia/commit/d60de2515b7286dc47724c5cd8f387d6069c29d5))


### :zap: Refactoring

* **DatePicker:** convert properties to camel case and deprecate those with snake case ([#4273](https://github.com/dnbexperience/eufemia/issues/4273)) ([a69a8aa](https://github.com/dnbexperience/eufemia/commit/a69a8aa8101eb497606e68649533511548f53258))


### :sparkles: Features

* **Field.Date:** add DatePickerProps ([#4160](https://github.com/dnbexperience/eufemia/issues/4160)) ([6a3765b](https://github.com/dnbexperience/eufemia/commit/6a3765b09f6f357c66d0f15b81627aee903c04a3))
* **Forms:** add `asyncFileHandler` to Field.Upload to support async file handling during upload ([#4281](https://github.com/dnbexperience/eufemia/issues/4281)) ([030a09c](https://github.com/dnbexperience/eufemia/commit/030a09cc5a58f83f64ffaa9f3d189aa37509fadb))
* **Forms:** add inline HelpButton to all Field.* components as default (with option to open in Dialog) ([#4282](https://github.com/dnbexperience/eufemia/issues/4282)) ([e869a60](https://github.com/dnbexperience/eufemia/commit/e869a6018e808735b70ce092419de5c23729ce8d))
* **Forms:** add support for multiple info, warning and error messages given by an array ([#4284](https://github.com/dnbexperience/eufemia/issues/4284)) ([78f2fe8](https://github.com/dnbexperience/eufemia/commit/78f2fe8316670d47783758164acaa0da58f09e94))
* **ListFormat:** adds spacing properties ([#4255](https://github.com/dnbexperience/eufemia/issues/4255)) ([c72d999](https://github.com/dnbexperience/eufemia/commit/c72d999bd8a433803a2042d3161d037ddd44627a))
* **Paragraph:** handle nested paragraphs (to be `span`'s) ([#4251](https://github.com/dnbexperience/eufemia/issues/4251)) ([ca3bbde](https://github.com/dnbexperience/eufemia/commit/ca3bbde4c0ef1a5191bb646da862b1dfe3c01ab4))

## [10.55.1](https://github.com/dnbexperience/eufemia/compare/v10.55.0...v10.55.1) (2024-11-11)


### :bug: Bug Fixes

* **Forms:** console log a warning when Value.SummaryList gets an invalid child ([#4249](https://github.com/dnbexperience/eufemia/issues/4249)) ([011e9eb](https://github.com/dnbexperience/eufemia/commit/011e9ebdbc2a624840d67b2ea22e1a5228b0af98))
* **Forms:** ensure Field.Upload handles `required` logic between Wizard step changes ([#4248](https://github.com/dnbexperience/eufemia/issues/4248)) ([505dbc1](https://github.com/dnbexperience/eufemia/commit/505dbc10e15611f7b4b4b2a706b4cfde3dd4816f))

## [10.55.0](https://github.com/dnbexperience/eufemia/compare/v10.54.1...v10.55.0) (2024-11-08)


### :zap: Refactoring

* center cards on ultra-wide monitors and fix capitalization typo ([#4214](https://github.com/dnbexperience/eufemia/issues/4214)) ([0ec1388](https://github.com/dnbexperience/eufemia/commit/0ec1388d8a4472155206afb2320bf4320cebd552))


### :memo: Documentation

* **CountryFlag:** `iso` defaults to `NO` ([#4234](https://github.com/dnbexperience/eufemia/issues/4234)) ([cab3c32](https://github.com/dnbexperience/eufemia/commit/cab3c32419a68281a6802fdbf3dea5ffacc89349))
* display all Value components in the Value menu ([#4231](https://github.com/dnbexperience/eufemia/issues/4231)) ([d260a9c](https://github.com/dnbexperience/eufemia/commit/d260a9cd7ade53520648dfc1d570cd2fd2b9edbe))


### :bug: Bug Fixes

* ensure components having `fieldset` inside still can use spacing ([#4236](https://github.com/dnbexperience/eufemia/issues/4236)) ([d4e4334](https://github.com/dnbexperience/eufemia/commit/d4e4334180326aa089a3e842150243a87f17354c))
* **Forms:** add Iterate support for Field.PostalCodeAndCity when using `country` with a path ([#4215](https://github.com/dnbexperience/eufemia/issues/4215)) ([6f80ed9](https://github.com/dnbexperience/eufemia/commit/6f80ed9f83e163c203b5a5792a413870e67c24be)), closes [#4200](https://github.com/dnbexperience/eufemia/issues/4200)
* **Forms:** ensure `Field.Number` with `percent` and without a value renders correctly ([#4230](https://github.com/dnbexperience/eufemia/issues/4230)) ([96fa2a5](https://github.com/dnbexperience/eufemia/commit/96fa2a5eaeab87f2017a33bc7414fa834a8e08f8)), closes [#4228](https://github.com/dnbexperience/eufemia/issues/4228)
* **Forms:** fix vertical gap between Field.ArraySelection toggle buttons with checkbox variant ([#4217](https://github.com/dnbexperience/eufemia/issues/4217)) ([83f0b37](https://github.com/dnbexperience/eufemia/commit/83f0b370ac6974774ea356987a8b3e22f22cb99c))
* **Forms:** remove extra space from Value.* components with `inline` property ([#4246](https://github.com/dnbexperience/eufemia/issues/4246)) ([8b96fd1](https://github.com/dnbexperience/eufemia/commit/8b96fd1d1c9b8be220f47d8d5027d3a7a7adf964))
* **Forms:** should display error underneath fields when nested inside Field.Selection or Field.ArraySelection   ([#4225](https://github.com/dnbexperience/eufemia/issues/4225)) ([c0f1a02](https://github.com/dnbexperience/eufemia/commit/c0f1a0203434e9e1cb69558f209b1b38ddd4aa0d))
* remove legacy `fieldset` reset ([#4237](https://github.com/dnbexperience/eufemia/issues/4237)) ([a2f368b](https://github.com/dnbexperience/eufemia/commit/a2f368bda20e82faac14357e206bac4cda1a5a00))
* **Upload:** alignment when displaying single DL item ([#4210](https://github.com/dnbexperience/eufemia/issues/4210)) ([5f745f5](https://github.com/dnbexperience/eufemia/commit/5f745f581ec9ee98d7d03d6c990f56c76a681b3c))
* **Upload:** fix `UploadFile` type to include `id` as required ([#4218](https://github.com/dnbexperience/eufemia/issues/4218)) ([b24fdfd](https://github.com/dnbexperience/eufemia/commit/b24fdfdfcfd8b169c5eb295c0c2b805754403457))


### :sparkles: Features

* **Card:** add style for nested cards ([#4244](https://github.com/dnbexperience/eufemia/issues/4244)) ([f45aa4a](https://github.com/dnbexperience/eufemia/commit/f45aa4a6cd7c2654bf40e68600ecf27641f70b52))
* **Card:** remove `beta` badge ([#4211](https://github.com/dnbexperience/eufemia/issues/4211)) ([67a4fbd](https://github.com/dnbexperience/eufemia/commit/67a4fbd4fb4ddf43b8304b4e7f162a2d01ed1704))
* **ChildrenWithAge:** add maximum possible value to joint-responsibility & daycare ([#4219](https://github.com/dnbexperience/eufemia/issues/4219)) ([9b9c517](https://github.com/dnbexperience/eufemia/commit/9b9c517ee82f47343319aadd0898589559e3d38e))
* **CountryFlag:** add iso to properties table ([#4232](https://github.com/dnbexperience/eufemia/issues/4232)) ([9dc57cb](https://github.com/dnbexperience/eufemia/commit/9dc57cb6a9d9d526628147d2ee9e4efdceaff51e))
* **DatePicker:** Convert to functional components with typescript and hooks ([#2799](https://github.com/dnbexperience/eufemia/issues/2799)) ([45687ea](https://github.com/dnbexperience/eufemia/commit/45687ea9e69c5e2575de614ce8ee09505f7b8e64))
* **Forms:** add `layoutOptions` for enhanced horizontal label layout ([#4208](https://github.com/dnbexperience/eufemia/issues/4208)) ([8d84d97](https://github.com/dnbexperience/eufemia/commit/8d84d97a52ce193dc1849f2700761ed051425c9b))
* **Forms:** add `transformLabel` to Value.Composition ([#4207](https://github.com/dnbexperience/eufemia/issues/4207)) ([c966bc1](https://github.com/dnbexperience/eufemia/commit/c966bc1927af8d371a6138e8d455824ebc454023))
* **Forms:** add `Value.Upload` component ([#4233](https://github.com/dnbexperience/eufemia/issues/4233)) ([3adddac](https://github.com/dnbexperience/eufemia/commit/3adddac906848dc6f7c1648136785be845dec362))
* **Forms:** add EditButton, CancelButton and DoneButton to Form.Section containers ([#4223](https://github.com/dnbexperience/eufemia/issues/4223)) ([092abcd](https://github.com/dnbexperience/eufemia/commit/092abcd5ad5c43b5970f191af39307d9324851f3))
* **ListFormat:** add `ListFormat` component ([#4238](https://github.com/dnbexperience/eufemia/issues/4238)) ([63613f1](https://github.com/dnbexperience/eufemia/commit/63613f163216cb2fa99c4b83b14cb2848de9b680))
* **Upload:** add `download` prop to enable file downloads instead of opening in a new tab ([#4213](https://github.com/dnbexperience/eufemia/issues/4213)) ([3e92934](https://github.com/dnbexperience/eufemia/commit/3e929344c5b3c00eadc8ef6adf40814b5d9ad974))

## [10.54.1](https://github.com/dnbexperience/eufemia/compare/v10.54.0...v10.54.1) (2024-10-31)


### :bug: Bug Fixes

* **Upload:** unnecessary spacing when not providing `title` and `text` ([#4205](https://github.com/dnbexperience/eufemia/issues/4205)) ([59845d0](https://github.com/dnbexperience/eufemia/commit/59845d0a3db0ce9a078dd0f14f3e114ff6c17acd))

## [10.54.0](https://github.com/dnbexperience/eufemia/compare/v10.53.0...v10.54.0) (2024-10-30)


### :memo: Documentation

* add documentation about `emptyValue` ([#4174](https://github.com/dnbexperience/eufemia/issues/4174)) ([52457ba](https://github.com/dnbexperience/eufemia/commit/52457ba075398183220382c8ea7b092cdab9091f)), closes [#4070](https://github.com/dnbexperience/eufemia/issues/4070)


### :bug: Bug Fixes

* **Field.Number:** `decimalLimit={0}` when `currency` should work ([#4167](https://github.com/dnbexperience/eufemia/issues/4167)) ([68123ea](https://github.com/dnbexperience/eufemia/commit/68123ea1c62619fe8e8a13e0bd6faf191ae70b7f))
* **Forms:** correct alignment of Wizard status message (error, warning, info) ([#4185](https://github.com/dnbexperience/eufemia/issues/4185)) ([a307cda](https://github.com/dnbexperience/eufemia/commit/a307cdae0c6dd287f470eed228384fdc8ec367ec))
* **Forms:** ensure autocomplete="off" when autoComplete on Form.Handler is false ([#4184](https://github.com/dnbexperience/eufemia/issues/4184)) ([6795b9f](https://github.com/dnbexperience/eufemia/commit/6795b9f3ef62e7ee7eecd8a35d9eed311ee05475))
* **Forms:** ensure correct sorting in Field.SelectCountry ([#4196](https://github.com/dnbexperience/eufemia/issues/4196)) ([8db7720](https://github.com/dnbexperience/eufemia/commit/8db7720a0b89870851caade482eeb5e81e017f27)), closes [#4195](https://github.com/dnbexperience/eufemia/issues/4195)
* **Forms:** fix schema validation for required paths with matching name ([#4189](https://github.com/dnbexperience/eufemia/issues/4189)) ([04caf61](https://github.com/dnbexperience/eufemia/commit/04caf617eeadc2e6ed311b23f245c5a4e8cdf1fb)), closes [#4179](https://github.com/dnbexperience/eufemia/issues/4179)
* **Forms:** only run onBlurValidator when no other errors are present ([#4172](https://github.com/dnbexperience/eufemia/issues/4172)) ([d2797f1](https://github.com/dnbexperience/eufemia/commit/d2797f137e4b745679af97c9c0633d461091b249)), closes [#4074](https://github.com/dnbexperience/eufemia/issues/4074)
* **Forms:** render multiple (combined) Ajv errors with translated messages ([#4176](https://github.com/dnbexperience/eufemia/issues/4176)) ([2b62ef7](https://github.com/dnbexperience/eufemia/commit/2b62ef7284e151658e508d39c1b36762dd6aed21)), closes [#4052](https://github.com/dnbexperience/eufemia/issues/4052)
* **Forms:** updates country names in SelectCountry ([#4187](https://github.com/dnbexperience/eufemia/issues/4187)) ([bb1b67c](https://github.com/dnbexperience/eufemia/commit/bb1b67c9d85682dfcff78e51d60285c75422ba5c))
* **NumberFormat:** should not throw exception when providing an invalid currency ([#4192](https://github.com/dnbexperience/eufemia/issues/4192)) ([a0700cd](https://github.com/dnbexperience/eufemia/commit/a0700cdfe3fb01808d0fe22155708ec124df4662))
* **Table:** fix visible hidden rows for additional expandable table rows ([#4188](https://github.com/dnbexperience/eufemia/issues/4188)) ([16b6101](https://github.com/dnbexperience/eufemia/commit/16b6101a02535adb0a07e290e9bb6a45659a6dcd))


### :sparkles: Features

* add CountryFlag component ([#4181](https://github.com/dnbexperience/eufemia/issues/4181)) ([76a0c47](https://github.com/dnbexperience/eufemia/commit/76a0c47a2e6df2db9e4e905a5e3119e7ed7acbb0))
* **Dialog:** add `verticalAlignment` property with `top` alignment support ([#4190](https://github.com/dnbexperience/eufemia/issues/4190)) ([3ace8b0](https://github.com/dnbexperience/eufemia/commit/3ace8b051437ea787f342b7f4a08d17b5a4352fa))
* **Forms:** add `onDone`, `onCancel` and `onEdit` to Form.Section containers ([#4199](https://github.com/dnbexperience/eufemia/issues/4199)) ([2f27ad0](https://github.com/dnbexperience/eufemia/commit/2f27ad0dccd8fb839044f66ec7b0ac7cd398bc7d))
* **Forms:** add `transformData` to the onSubmit event of Form.Handler ([#4183](https://github.com/dnbexperience/eufemia/issues/4183)) ([748b604](https://github.com/dnbexperience/eufemia/commit/748b60464f2bacb66311f2bf94c2295cb0e210eb))
* **Forms:** deprecate `useErrorMessage` hook for when creating your own fields ([#4177](https://github.com/dnbexperience/eufemia/issues/4177)) ([2ae86f2](https://github.com/dnbexperience/eufemia/commit/2ae86f2e95fe66a09977db9cd1dcfc0796d8589f)), closes [#4162](https://github.com/dnbexperience/eufemia/issues/4162)
* **Forms:** deprecate Ajv `validationRule` in FormError and deprecate `errorMessages` keys like `pattern` in favor of Eufemia translation keys like `Field.errorPattern` ([#4162](https://github.com/dnbexperience/eufemia/issues/4162)) ([b50387a](https://github.com/dnbexperience/eufemia/commit/b50387a5ede7a2503eb73a0c9c007e3c4ecba255))
* **Keyboard navigation:** add support for `key` property (useful for fire events like {ArrowDown} during tests) ([#4182](https://github.com/dnbexperience/eufemia/issues/4182)) ([cc1ffa8](https://github.com/dnbexperience/eufemia/commit/cc1ffa8b7cbbe5fb20b6db9e24a97697bfef6cf5))
* **Upload:** `text` and `title` is possible to remove ([#4163](https://github.com/dnbexperience/eufemia/issues/4163)) ([b6db4a4](https://github.com/dnbexperience/eufemia/commit/b6db4a4548d565e38b59c92610ef4648c6847e9d))
* **Upload:** removes subtitle displaying file extension ([#4156](https://github.com/dnbexperience/eufemia/issues/4156)) ([9bf9b9e](https://github.com/dnbexperience/eufemia/commit/9bf9b9e47c15417c3d2850818c048dc183b6b7af))
* **Upload:** updates drag and drop texts in Norwegian ([#4170](https://github.com/dnbexperience/eufemia/issues/4170)) ([ad5bbec](https://github.com/dnbexperience/eufemia/commit/ad5bbecd79df422339e08b28821411e8c806ce21))

## [10.53.0](https://github.com/dnbexperience/eufemia/compare/v10.52.1...v10.53.0) (2024-10-18)


### :bug: Bug Fixes

* **Forms:** keep Iterate.Array in sync with the data context and call onChange when `countPath` changes ([#4147](https://github.com/dnbexperience/eufemia/issues/4147)) ([095ddaa](https://github.com/dnbexperience/eufemia/commit/095ddaa0965a68dbc25f151118c73841741e7a0c))
* **Forms:** UI alignments of the ChildrenWithAge block ([#4137](https://github.com/dnbexperience/eufemia/issues/4137)) ([3db7201](https://github.com/dnbexperience/eufemia/commit/3db7201dac13422a8a79d6415634f63fa2c9371b))
* **Upload:** handle file extensions with case insensitivity ([#4138](https://github.com/dnbexperience/eufemia/issues/4138)) ([fd9d9ba](https://github.com/dnbexperience/eufemia/commit/fd9d9ba2eb708184eb863917accc4d9838d8da91))


### :sparkles: Features

* add `renderMessage` to useTranslation hook for line-break support ([#4125](https://github.com/dnbexperience/eufemia/issues/4125)) ([5b07bec](https://github.com/dnbexperience/eufemia/commit/5b07becb992b27b4e8bced2a8c6b716efcae9bd9))
* **Forms:** add `country` prop to Field.PostalCodeAndCity to support other countries than Norway ([#4109](https://github.com/dnbexperience/eufemia/issues/4109)) ([5095bea](https://github.com/dnbexperience/eufemia/commit/5095beadfc1d65aa87e91128792e360d804c4eff))
* **Forms:** add `Form.useTranslation` hook ([#4123](https://github.com/dnbexperience/eufemia/issues/4123)) ([6f40922](https://github.com/dnbexperience/eufemia/commit/6f409226bf9b1f7185ab39ac895ed76431df6e05)), closes [#4121](https://github.com/dnbexperience/eufemia/issues/4121)
* **Forms:** add support for `minItems`/`maxItems` error messages to Field.ArraySelection ([#4120](https://github.com/dnbexperience/eufemia/issues/4120)) ([29ebe55](https://github.com/dnbexperience/eufemia/commit/29ebe55a02e2e3cb957fd988493c9cb238c2396e))
* **Forms:** add support to set a custom `width` to fields and values ([#4142](https://github.com/dnbexperience/eufemia/issues/4142)) ([07b257f](https://github.com/dnbexperience/eufemia/commit/07b257f39110fb5e4ec83906fa59077644a8550f))
* **Forms:** add validation to Field.BankAccountNumber ([#4119](https://github.com/dnbexperience/eufemia/issues/4119)) ([f70ba3d](https://github.com/dnbexperience/eufemia/commit/f70ba3d59db7625bde9570addc06da91353fdd1b))
* **Forms:** warn when a field path is declared more than one time ([#4127](https://github.com/dnbexperience/eufemia/issues/4127)) ([ca15887](https://github.com/dnbexperience/eufemia/commit/ca1588786b0c6f39af97a26ec41aa7acbec9d2cb))

## [10.52.1](https://github.com/dnbexperience/eufemia/compare/v10.52.0...v10.52.1) (2024-10-15)


### :memo: Documentation

* **OrganizationNumber:** adds docs about validation ([1dbe8f0](https://github.com/dnbexperience/eufemia/commit/1dbe8f083f10d143e9344e65905426f8e448cbf9))
* **OrganizationNumber:** adds docs about validation ([#4122](https://github.com/dnbexperience/eufemia/issues/4122)) ([0c3eae7](https://github.com/dnbexperience/eufemia/commit/0c3eae79c32cb54fb3625cfdc6ccea4a754afbe9))


### :bug: Bug Fixes

* **Forms:** add support for Form.SubmitConfirmation inside Wizard (renderWithState) ([2d2de53](https://github.com/dnbexperience/eufemia/commit/2d2de53a0e41d6f566bfff6b4cb14b8e56bb7a14))
* **Forms:** add support for Form.SubmitConfirmation inside Wizard (renderWithState) ([#4128](https://github.com/dnbexperience/eufemia/issues/4128)) ([63878cc](https://github.com/dnbexperience/eufemia/commit/63878ccf709b62b93b49f7e0840a0df20683dae1)), closes [#4086](https://github.com/dnbexperience/eufemia/issues/4086)
* **Forms:** UI aligments of the ChildrenWithAge block ([#4126](https://github.com/dnbexperience/eufemia/issues/4126)) ([f2193f0](https://github.com/dnbexperience/eufemia/commit/f2193f044c6c8344807acd8ab73858ee9587c520))

## [10.52.0](https://github.com/dnbexperience/eufemia/compare/v10.51.2...v10.52.0) (2024-10-11)


### :memo: Documentation

* **NationalIdentityNumber:** add docs about validation ([#4077](https://github.com/dnbexperience/eufemia/issues/4077)) ([51bfd80](https://github.com/dnbexperience/eufemia/commit/51bfd803a49738815b5325f65f4d54f41ed47e02))
* **OrganizationNumber:** adds docs about validation ([#4078](https://github.com/dnbexperience/eufemia/issues/4078)) ([c785c51](https://github.com/dnbexperience/eufemia/commit/c785c51da4294c34fef8d4d874bb890544533fc6))


### :bug: Bug Fixes

* **Autocomplete:** Show whole suggestion list after item selection ([#4060](https://github.com/dnbexperience/eufemia/issues/4060)) ([0acf061](https://github.com/dnbexperience/eufemia/commit/0acf061aab86ef09ece0afe89df51019de838a00))
* **Field.NationalIdentityNumber:** validate on all digits(not only 11 digits) ([#4079](https://github.com/dnbexperience/eufemia/issues/4079)) ([7c34fc9](https://github.com/dnbexperience/eufemia/commit/7c34fc9a42aea2af1ca8ca42425f3c1cc5468e64))
* **Field.OrganizationNumber:** should validate on all digits(not only when 9) ([#4071](https://github.com/dnbexperience/eufemia/issues/4071)) ([08a4b51](https://github.com/dnbexperience/eufemia/commit/08a4b51610118cc464b4d8712724524263133b1a))
* **Forms:** add support for `Form.SubmitConfirmation` inside Wizard ([#4088](https://github.com/dnbexperience/eufemia/issues/4088)) ([e1167a4](https://github.com/dnbexperience/eufemia/commit/e1167a40d5e75bc8f350b790ba04b824202fe08b)), closes [#4086](https://github.com/dnbexperience/eufemia/issues/4086)
* **Forms:** don't call internal `exportValidators` when they not are exported as an array ([#4113](https://github.com/dnbexperience/eufemia/issues/4113)) ([cd54ed0](https://github.com/dnbexperience/eufemia/commit/cd54ed0d590eb03def53f0f7cb4a97494600ee27)), closes [#4106](https://github.com/dnbexperience/eufemia/issues/4106)
* **Forms:** ensure `emptyValue` is set in the data context when defined ([#4111](https://github.com/dnbexperience/eufemia/issues/4111)) ([dcc5694](https://github.com/dnbexperience/eufemia/commit/dcc569487e3c663f5f61aa9d7f259e58dab59708)), closes [#4070](https://github.com/dnbexperience/eufemia/issues/4070)
* **Forms:** ensure `onBlurValidator` gets called when `validateInitially` is true ([#4069](https://github.com/dnbexperience/eufemia/issues/4069)) ([59cf6c5](https://github.com/dnbexperience/eufemia/commit/59cf6c55acf34c3f561b136c7821b7120ef4cd24)), closes [#4068](https://github.com/dnbexperience/eufemia/issues/4068) [#4066](https://github.com/dnbexperience/eufemia/issues/4066)
* **Forms:** ensure Field.SelectCountry has a fallback locale (nb-NO) ([#4114](https://github.com/dnbexperience/eufemia/issues/4114)) ([568229a](https://github.com/dnbexperience/eufemia/commit/568229a641220b33bf4ff4d0ad6b2eaa03ad95dc))
* **Forms:** ensure Form.clearData works in React.StrictMode ([#4053](https://github.com/dnbexperience/eufemia/issues/4053)) ([da0c93a](https://github.com/dnbexperience/eufemia/commit/da0c93a70c0124690fcd63d4fafa4a92d2174c28)), closes [#4048](https://github.com/dnbexperience/eufemia/issues/4048)
* **Forms:** Fix use of unpolyfilled structuredClone in useData hook ([#4108](https://github.com/dnbexperience/eufemia/issues/4108)) ([1f59f10](https://github.com/dnbexperience/eufemia/commit/1f59f10fd1e8d9ae1c1ba832e780d3e2cc6b413a))
* **Forms:** keep `Iterate.EditContainer` open when falsy value or empty object was given as the iterate value ([#4087](https://github.com/dnbexperience/eufemia/issues/4087)) ([e932059](https://github.com/dnbexperience/eufemia/commit/e932059f81c9f64a98a413e9bacf2d0e78b5d40c)), closes [#4046](https://github.com/dnbexperience/eufemia/issues/4046)
* **Forms:** show error on every value change when using exported validators ([#4068](https://github.com/dnbexperience/eufemia/issues/4068)) ([cab6d01](https://github.com/dnbexperience/eufemia/commit/cab6d01d78d733d479510e608bb71ec76445eca2)), closes [#4067](https://github.com/dnbexperience/eufemia/issues/4067)
* **Icon:** icon property typing should accept FormStatus icons ([#4091](https://github.com/dnbexperience/eufemia/issues/4091)) ([f49eb34](https://github.com/dnbexperience/eufemia/commit/f49eb344ea0038071275ea2e9cb173e5ff0418c3))
* **NationalIdentityNumber:** use `onBlurValidator` instead of `validator` ([#3982](https://github.com/dnbexperience/eufemia/issues/3982)) ([0a93755](https://github.com/dnbexperience/eufemia/commit/0a93755b981a767d2b2a0f23bdf22d4e26a30c4b))
* **Typography:** match medium heading font size in Sbanken theme ([#4039](https://github.com/dnbexperience/eufemia/issues/4039)) ([ce50529](https://github.com/dnbexperience/eufemia/commit/ce505298084a217b45b931880b45e59832b614e2))


### :sparkles: Features

* **Forms:** add `bubbleValidation` to Form.Isolation and Iterate.PushContainer to prevent the form from being submitted when there are fields with errors ([#4103](https://github.com/dnbexperience/eufemia/issues/4103)) ([880f870](https://github.com/dnbexperience/eufemia/commit/880f870ace8789f12d532acfc48c7fe389cdcbe4)), closes [#4072](https://github.com/dnbexperience/eufemia/issues/4072)
* **Forms:** add `createMinimumAgeValidator` to Field.NationalIdentityNumber make a customizable `adultValidator` ([#4057](https://github.com/dnbexperience/eufemia/issues/4057)) ([6c20ba2](https://github.com/dnbexperience/eufemia/commit/6c20ba27e287683db376fc5f69d48cee2a6632d1))
* **Forms:** add `Form.useSnapshot` hook to handle snapshots of data ([#4102](https://github.com/dnbexperience/eufemia/issues/4102)) ([d451793](https://github.com/dnbexperience/eufemia/commit/d45179312c33201b2b84c63c9a06ab19d195e122))
* **Forms:** add `isolatedData` prop to `Iterate.PushContainer` ([#4076](https://github.com/dnbexperience/eufemia/issues/4076)) ([ede5f8e](https://github.com/dnbexperience/eufemia/commit/ede5f8e5c6588997d1f34ec6439bde66183aa068))
* **Forms:** add `isValid` to Form.Visibility for showing content based on the validation of a field ([#4038](https://github.com/dnbexperience/eufemia/issues/4038)) ([7536752](https://github.com/dnbexperience/eufemia/commit/75367528ca5da533cf795aecb2cdb813046cffc8))
* **Forms:** add `Iterate.ItemNo` component ([#4095](https://github.com/dnbexperience/eufemia/issues/4095)) ([c736c9e](https://github.com/dnbexperience/eufemia/commit/c736c9e2726082ee70449e6d1128f07fcb33eca7))
* **Forms:** add `transformLabel` to all Value.* component ([#4056](https://github.com/dnbexperience/eufemia/issues/4056)) ([d63e472](https://github.com/dnbexperience/eufemia/commit/d63e4727d70c34d5b9cdaad950a5ed9ef5bddff7))
* **Forms:** add support for `defaultValue` (and `value`) for fields used in `Iterate.Array` ([#3987](https://github.com/dnbexperience/eufemia/issues/3987)) ([afbdddf](https://github.com/dnbexperience/eufemia/commit/afbdddf299289f80777c5af13e060f5f692be1d1)), closes [#3882](https://github.com/dnbexperience/eufemia/issues/3882)
* **Forms:** add support for `id` for when using dynamic steps with `activeWhen` ([#4093](https://github.com/dnbexperience/eufemia/issues/4093)) ([248da92](https://github.com/dnbexperience/eufemia/commit/248da926003166fa3cfc47f0b46bc5f7e8ea3d52))
* **Forms:** remove internal pattern from `Field.NationalIdentityNumber` in favor of the internal validator ([#4098](https://github.com/dnbexperience/eufemia/issues/4098)) ([fb35722](https://github.com/dnbexperience/eufemia/commit/fb3572284e839d820b7cffb1fdf0204ad1ef5867))
* **Forms:** remove internal pattern from `Field.OrganizationNumber` in favor of the internal validator ([#4092](https://github.com/dnbexperience/eufemia/issues/4092)) ([e829f8b](https://github.com/dnbexperience/eufemia/commit/e829f8b3345c4863d80eee9990c4d0cf2d085486)), closes [#4073](https://github.com/dnbexperience/eufemia/issues/4073)
* **Skeleton:** stop animation after 30 seconds ([#3479](https://github.com/dnbexperience/eufemia/issues/3479)) ([f67b3bb](https://github.com/dnbexperience/eufemia/commit/f67b3bbd099ecb9e3ca3017c1d8f8530d84ad8f1))
* **Value.PhoneNumber and NumberFormat:** displays country code using prefix `+` instead of `00` ([#4051](https://github.com/dnbexperience/eufemia/issues/4051)) ([fb363d0](https://github.com/dnbexperience/eufemia/commit/fb363d0cfa57153a27ab50d9253b3c0369b26194))

## [10.51.2](https://github.com/dnbexperience/eufemia/compare/v10.51.1...v10.51.2) (2024-10-03)


### :bug: Bug Fixes

* **Badge:** prevents unwanted re-rendering ([#4049](https://github.com/dnbexperience/eufemia/issues/4049)) ([1e51e7a](https://github.com/dnbexperience/eufemia/commit/1e51e7aee28a6cc2ef1607226fc2c1463b9e4b48))
* **Field.Selection:** prevent `radio` re-render onClick to enable keyboard navigation ([#4037](https://github.com/dnbexperience/eufemia/issues/4037)) ([d122f98](https://github.com/dnbexperience/eufemia/commit/d122f98c9fd31c3e7dafde5bfc91d231e7884e62))
* **Forms:** support validation when using object based `transformOut` and `transformIn` on fields ([#4042](https://github.com/dnbexperience/eufemia/issues/4042)) ([5554525](https://github.com/dnbexperience/eufemia/commit/5554525e0272917084798aad7567773eac8e42ed)), closes [#3997](https://github.com/dnbexperience/eufemia/issues/3997)
* **Timeline:** alt label complete -> completed ([#4044](https://github.com/dnbexperience/eufemia/issues/4044)) ([4a6828d](https://github.com/dnbexperience/eufemia/commit/4a6828d29c8a7bbfb7ddd102ef672f365a6e3fab))

## [10.51.1](https://github.com/dnbexperience/eufemia/compare/v10.51.0...v10.51.1) (2024-09-30)


### :memo: Documentation

* **Icon:** removes string as a icon type ([#4034](https://github.com/dnbexperience/eufemia/issues/4034)) ([4c53199](https://github.com/dnbexperience/eufemia/commit/4c53199d6aa16c0c36ea19824e73053c6872fcef))


### :bug: Bug Fixes

* **Dropdown:** align tertiary dropdown triangle icon with button ([#4023](https://github.com/dnbexperience/eufemia/issues/4023)) ([1527d70](https://github.com/dnbexperience/eufemia/commit/1527d70b8073323b2e3f2dfae4347e3a84e3f427))
* **Form.UseData:** getValue returns any instead of unknown ([#4035](https://github.com/dnbexperience/eufemia/issues/4035)) ([8434de9](https://github.com/dnbexperience/eufemia/commit/8434de9e94d630dadb274365020991daa2dedf85))

## [10.51.0](https://github.com/dnbexperience/eufemia/compare/v10.50.0...v10.51.0) (2024-09-30)


### :bug: Bug Fixes

* **Field.Toggle:** removes invisible label when label not provided ([#3984](https://github.com/dnbexperience/eufemia/issues/3984)) ([c945d5b](https://github.com/dnbexperience/eufemia/commit/c945d5b1bbf49d70bc06c722f73d5ecf573d4038))
* **Forms:** `Form.useData` should not throw error when used in Wizard ([#4001](https://github.com/dnbexperience/eufemia/issues/4001)) ([aac721b](https://github.com/dnbexperience/eufemia/commit/aac721b63daadb9cf8dbf39baf5fbe7d3717eb1f))
* **Forms:** ensure `itemNr` still works in the Iterate.ViewContainer ([#4002](https://github.com/dnbexperience/eufemia/issues/4002)) ([6f8bfb3](https://github.com/dnbexperience/eufemia/commit/6f8bfb34b645d32edfdee96120c448e99840d31c))
* **Forms:** keep field state during a Wizard step change when used inside Iterate.Array (which used defualtValue as the data source) ([#4025](https://github.com/dnbexperience/eufemia/issues/4025)) ([595cfd5](https://github.com/dnbexperience/eufemia/commit/595cfd55997ceaf3f0da63908f1b7042d6ce56c1))
* **Forms:** removes cards max-width in Wizard (StepIndicator) ([#4011](https://github.com/dnbexperience/eufemia/issues/4011)) ([2bc8812](https://github.com/dnbexperience/eufemia/commit/2bc8812b091331ff35902d0fbbddabd9599b2114))
* **Tabs:** fix align property with value center ([#3991](https://github.com/dnbexperience/eufemia/issues/3991)) ([8483df8](https://github.com/dnbexperience/eufemia/commit/8483df8a27521c19417655c329eff332a422ec7e))


### :sparkles: Features

* **ChildrenWithAge:** display hasChildren value in summary ([#3993](https://github.com/dnbexperience/eufemia/issues/3993)) ([9ab9de5](https://github.com/dnbexperience/eufemia/commit/9ab9de53df5c239bdffa29f5529ad83174328c86))
* **Field.Date:** add date range functionality ([#4006](https://github.com/dnbexperience/eufemia/issues/4006)) ([12081c3](https://github.com/dnbexperience/eufemia/commit/12081c3be7bdcf1d858e6097b17b9c263e4b0e57))
* **Forms:** add `Form.SubmitConfirmation` to confirm a submit during or before sent ([#4019](https://github.com/dnbexperience/eufemia/issues/4019)) ([dfce4e4](https://github.com/dnbexperience/eufemia/commit/dfce4e468bd4894b7d1484c1edd7bed6edfa6c1c))
* **Forms:** add `inheritVisibility` to Value.SummaryList ([#4003](https://github.com/dnbexperience/eufemia/issues/4003)) ([9849516](https://github.com/dnbexperience/eufemia/commit/9849516cf2e3ef7059fc5b3a1fbb1060d5401d45))
* **Forms:** add inheritLabel to Value.SummaryList ([#4009](https://github.com/dnbexperience/eufemia/issues/4009)) ([1715a6a](https://github.com/dnbexperience/eufemia/commit/1715a6adfbc39f341bb29cd6a278b9c88412a3ea))
* **Forms:** add Value.Provider to propagate value props down to Value.* components (e.g. `inheritVisibility`) ([#4005](https://github.com/dnbexperience/eufemia/issues/4005)) ([c3f10e3](https://github.com/dnbexperience/eufemia/commit/c3f10e3e50512b3660dd7d9b5b469f5bce7569fa)), closes [#4003](https://github.com/dnbexperience/eufemia/issues/4003)
* **Forms:** deprecate `Form.FieldProps` in favor of `Field.Provider` ([#4020](https://github.com/dnbexperience/eufemia/issues/4020)) ([d549870](https://github.com/dnbexperience/eufemia/commit/d5498704b2f3529a13f79f8da437070ea1edce96))
* **Forms:** deprecate Form.useError in favor of `Form.useValidation` featuring `setFieldStatus` to handle the status (error) of a single field ([#3986](https://github.com/dnbexperience/eufemia/issues/3986)) ([dd39eef](https://github.com/dnbexperience/eufemia/commit/dd39eefbb8aa17d22d16b70d417b5cd75c57f5d4))
* **Forms:** implement TypeScript version of `json-pointer` ([#4000](https://github.com/dnbexperience/eufemia/issues/4000)) ([f3caa4b](https://github.com/dnbexperience/eufemia/commit/f3caa4b97867500a111e1643f180c0854d49d7ab))
* **NumberFormat:** add `half-even` rounding and deprecated `omit_rounding` in favor of `rounding="omit"` ([#3988](https://github.com/dnbexperience/eufemia/issues/3988)) ([0c121f1](https://github.com/dnbexperience/eufemia/commit/0c121f145bee840cea5daf545ce9727dfe0bb1bf))
* **SASS mixins:** media queries mixins now uses 0.1px instead of 1px to avoid overlap ([#3985](https://github.com/dnbexperience/eufemia/issues/3985)) ([1cb495a](https://github.com/dnbexperience/eufemia/commit/1cb495a5894c53f57fa02adf6c72fc63bc5cac3d)), closes [media#sect2](https://github.com/dnbexperience/media/issues/sect2)
* **Switch:** refactor to typescript ([#3727](https://github.com/dnbexperience/eufemia/issues/3727)) ([4833c42](https://github.com/dnbexperience/eufemia/commit/4833c42e922755eaed1923873265d5bfdb808929))


### :memo: Documentation

* adds import statement to info doc for layout ([#4018](https://github.com/dnbexperience/eufemia/issues/4018)) ([0508c4b](https://github.com/dnbexperience/eufemia/commit/0508c4b00038e1fbcbb2cd91b56b03ac06f1af4b))
* **Forms:** improves docs for Value.Number & Value.Currency ([#4008](https://github.com/dnbexperience/eufemia/issues/4008)) ([cc1c365](https://github.com/dnbexperience/eufemia/commit/cc1c365936b5bee94fe37129e744726a6f58e7da))
* **Portal:** add accordion to side menu ([#3794](https://github.com/dnbexperience/eufemia/issues/3794)) ([e2604f6](https://github.com/dnbexperience/eufemia/commit/e2604f68ae48a8a964b87ce8ceb3af6b801e5742))
* prop -> property, and props -> properties ([#3990](https://github.com/dnbexperience/eufemia/issues/3990)) ([a122fa2](https://github.com/dnbexperience/eufemia/commit/a122fa24462eb456507de9fca2781c05480eb528))
* **Value.Currency:** improve documented properties ([#4022](https://github.com/dnbexperience/eufemia/issues/4022)) ([d392901](https://github.com/dnbexperience/eufemia/commit/d3929016120f254c4e18f056f3aa41901bd656fa)), closes [/github.com/dnbexperience/eufemia/pull/4008#discussion_r1776864819](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/4008/issues/discussion_r1776864819)

## [10.50.0](https://github.com/dnbexperience/eufemia/compare/v10.49.0...v10.50.0) (2024-09-23)


### :memo: Documentation

* adds import statement to info doc for components ([#3966](https://github.com/dnbexperience/eufemia/issues/3966)) ([8034c44](https://github.com/dnbexperience/eufemia/commit/8034c4448f794958de57771941e6402817086014))
* adds import statement to info doc for elements ([#3972](https://github.com/dnbexperience/eufemia/issues/3972)) ([55ba97d](https://github.com/dnbexperience/eufemia/commit/55ba97dc9956adaed291d9bafdaadbed5519157a))
* adds tabs to elements docs ([#3967](https://github.com/dnbexperience/eufemia/issues/3967)) ([8305ce3](https://github.com/dnbexperience/eufemia/commit/8305ce3dad911e3a840f73c2096205313d8e9d9d))
* fix markdown link to text counter component ([4fb5485](https://github.com/dnbexperience/eufemia/commit/4fb5485a9b950650d7ebbdd59e17a662a22b2ccf))
* fix markdown link to text counter component ([#3958](https://github.com/dnbexperience/eufemia/issues/3958)) ([2671ed4](https://github.com/dnbexperience/eufemia/commit/2671ed452bcab6554c1ba4a7650a8ab40dbd67a4))


### :bug: Bug Fixes

* **ChildrenWithAge:** sync summary and edit container ([#3950](https://github.com/dnbexperience/eufemia/issues/3950)) ([52ca0fb](https://github.com/dnbexperience/eufemia/commit/52ca0fb8b24864d3ee72970a4ce0b32cc6ef85d4))
* **Forms:** add support for `transformIn` and `transformOut` to Field.SelectCountry ([#3975](https://github.com/dnbexperience/eufemia/issues/3975)) ([d1c44c8](https://github.com/dnbexperience/eufemia/commit/d1c44c88a3401f4cd6d7884416287ca827137b9d)), closes [#3974](https://github.com/dnbexperience/eufemia/issues/3974)
* **Forms:** deprecate and rename `{itemNr}` in favor of `{itemNo}` ([#3969](https://github.com/dnbexperience/eufemia/issues/3969)) ([594f967](https://github.com/dnbexperience/eufemia/commit/594f9675c0cf2888ebc6a222ebd20d9d36003b03))
* **Forms:** enhance defaultValue routine during mounting of fields ([#3962](https://github.com/dnbexperience/eufemia/issues/3962)) ([68bcbcb](https://github.com/dnbexperience/eufemia/commit/68bcbcbfcd74623e31e31dde8dcde35cdd1d2fcd))
* **Forms:** enhance reset routine of ChildrenWithAge block ([#3961](https://github.com/dnbexperience/eufemia/issues/3961)) ([2ae6a5f](https://github.com/dnbexperience/eufemia/commit/2ae6a5f373b4e07f0b1b75855c6fb4b701837e28))
* **Forms:** ensure `defaultValue` works in React.StrictMode ([#3959](https://github.com/dnbexperience/eufemia/issues/3959)) ([fb71a48](https://github.com/dnbexperience/eufemia/commit/fb71a48561001e968a555b7e3477354e8f91ab5b))
* **Forms:** ensure `Value.*` component's `transformIn` can changes its value ([#3965](https://github.com/dnbexperience/eufemia/issues/3965)) ([0698741](https://github.com/dnbexperience/eufemia/commit/069874197569ec8996ed66eaa6ee274e1c892116))
* **Forms:** execute `transformOut` when value or defaultValue is given ([#3974](https://github.com/dnbexperience/eufemia/issues/3974)) ([77eab0c](https://github.com/dnbexperience/eufemia/commit/77eab0c2a9a71222565722835c3a02508c89eb7f))
* **Forms:** make `exportValidators` work with the same validator as given in `validator` or `onBlurValidator` ([#3977](https://github.com/dnbexperience/eufemia/issues/3977)) ([52a5e69](https://github.com/dnbexperience/eufemia/commit/52a5e69ca6e7f09e01dda0bf975897ab00471a09))
* **Visibility:** prioritize `visible` with a booean over other path assetion ([#3949](https://github.com/dnbexperience/eufemia/issues/3949)) ([c74ee1d](https://github.com/dnbexperience/eufemia/commit/c74ee1d4abf6a0772b09539f302a34049ffc914b))


### :sparkles: Features

* **Forms:** add `filterCountries` prop to Field.SelectCountry to filter out certain countries ([#3979](https://github.com/dnbexperience/eufemia/issues/3979)) ([56dfe4f](https://github.com/dnbexperience/eufemia/commit/56dfe4fbbd03c5a3baee15f104d6d43a95b6128e))
* **Forms:** add `filterCountries` to Field.PhoneNumber ([#3981](https://github.com/dnbexperience/eufemia/issues/3981)) ([8041541](https://github.com/dnbexperience/eufemia/commit/80415413cd4b2cdcd0aca86961f7eab6987741d4))
* **Forms:** add `inheritVisibility` to each `Value.*` component ([#3948](https://github.com/dnbexperience/eufemia/issues/3948)) ([367889b](https://github.com/dnbexperience/eufemia/commit/367889b38d498f5721869d57cfd5b7006fa5c339))
* **Forms:** add `limit` prop to Iterate.Array ([#3964](https://github.com/dnbexperience/eufemia/issues/3964)) ([c29b477](https://github.com/dnbexperience/eufemia/commit/c29b4770672fc95402bd98921184c57b50efda82))
* **Forms:** add `reduceToVisibleFields` to the `useData` hook and Form.Handler `onSubmit` ([#3957](https://github.com/dnbexperience/eufemia/issues/3957)) ([db24256](https://github.com/dnbexperience/eufemia/commit/db24256211116d8f7bc65e88913575eede07d6c6))
* **Forms:** add `remove` method to Form.useData ([#3960](https://github.com/dnbexperience/eufemia/issues/3960)) ([950e6a3](https://github.com/dnbexperience/eufemia/commit/950e6a3c8da3672810fd5abb70167dce3c5c7937))
* **Forms:** add `useCountry` with `getCountryNameByIso` to Value.SelectCountry ([#3953](https://github.com/dnbexperience/eufemia/issues/3953)) ([350c060](https://github.com/dnbexperience/eufemia/commit/350c060d69e2694edaee8cf1f6da38f80a8471b4))
* **OrganizationNumber:** adds organization number validation ([#3976](https://github.com/dnbexperience/eufemia/issues/3976)) ([6f344c2](https://github.com/dnbexperience/eufemia/commit/6f344c2a54e784fe08a5557698e449accdbb246f))
* **Value.ArraySelection:** add `variant` prop to allow for list layout ([#3947](https://github.com/dnbexperience/eufemia/issues/3947)) ([1aff360](https://github.com/dnbexperience/eufemia/commit/1aff360bc316847082bd656e4e8c54a99c9137b8))

## [10.49.0](https://github.com/dnbexperience/eufemia/compare/v10.48.0...v10.49.0) (2024-09-16)


### :sparkles: Features

* **Forms:** add `{nextItemNo}` support to Iterate.PushButton ([#3936](https://github.com/dnbexperience/eufemia/issues/3936)) ([c1445a3](https://github.com/dnbexperience/eufemia/commit/c1445a3db8b4ddd343d4093510e2b70ac94dddf7))
* **Forms:** add `{nextItemNo}` support to Iterate.PushContainer open button ([#3937](https://github.com/dnbexperience/eufemia/issues/3937)) ([84e8281](https://github.com/dnbexperience/eufemia/commit/84e82817637bdd2392841d484a4c564e6f670618))
* **Forms:** add `animate` prop to Iterate.Array ([#3928](https://github.com/dnbexperience/eufemia/issues/3928)) ([1d9f3e4](https://github.com/dnbexperience/eufemia/commit/1d9f3e43e98faf5ba3663129eb6b7fa0ac73df8b))


### :bug: Bug Fixes

* **ChildrenWithAge:** fixes spacing issue above 1st child ([#3942](https://github.com/dnbexperience/eufemia/issues/3942)) ([0f9dff3](https://github.com/dnbexperience/eufemia/commit/0f9dff3c90a3e8d0b4f002fdb30d2e076f1e323e))
* **Forms:** enhance container boundary error handling ([#3939](https://github.com/dnbexperience/eufemia/issues/3939)) ([e4691a0](https://github.com/dnbexperience/eufemia/commit/e4691a0e5361c801e9551d3073fad551428acb0d))
* **Forms:** remove unwanted Iterate.EditContainer error confirmation when using required on Form.Handler ([#3938](https://github.com/dnbexperience/eufemia/issues/3938)) ([4523e35](https://github.com/dnbexperience/eufemia/commit/4523e350f01536bf909a13d737fa0b6423405510))
* **Forms:** Wizard.Step JSX component TypeScript fix ([#3935](https://github.com/dnbexperience/eufemia/issues/3935)) ([5556182](https://github.com/dnbexperience/eufemia/commit/5556182a0983a11fe952cba9fb34f188d22b60dc))
* **HeightAnimation:** enhance adjusting the height to 0 ([#3929](https://github.com/dnbexperience/eufemia/issues/3929)) ([a1f6129](https://github.com/dnbexperience/eufemia/commit/a1f6129d0342d8870db7bd07ddab0556cf926c09))
* **PushContainer:** Add missing variant type ([#3931](https://github.com/dnbexperience/eufemia/issues/3931)) ([32d41b9](https://github.com/dnbexperience/eufemia/commit/32d41b93c4f7f4a65e4bcde4c56e4d335aa65a1f))

## [10.48.0](https://github.com/dnbexperience/eufemia/compare/v10.47.0...v10.48.0) (2024-09-12)


### :bug: Bug Fixes

* **countries:** Fixes wrong country code for Martinique [#3915](https://github.com/dnbexperience/eufemia/issues/3915) ([a9f86e4](https://github.com/dnbexperience/eufemia/commit/a9f86e4ed9c0d84f7b580a8567b5c6f18f5a9053))
* **countries:** Remove outdated countries [#3915](https://github.com/dnbexperience/eufemia/issues/3915) ([36ef5cf](https://github.com/dnbexperience/eufemia/commit/36ef5cfb88b288399b2ef8fcc57fb34d05f2efd2))
* **Forms:** rename 'Macedonia' to 'North Macedonia' ([#3918](https://github.com/dnbexperience/eufemia/issues/3918)) ([a4eb8a4](https://github.com/dnbexperience/eufemia/commit/a4eb8a4f8eac8ac50410f5c1099fe91bceb94b1b))
* **Forms:** rename "Hviterussland" to "Belarus" ([#3917](https://github.com/dnbexperience/eufemia/issues/3917)) ([702118a](https://github.com/dnbexperience/eufemia/commit/702118a966858e73f3e7bae77ab5e026f083fd54))
* removes outdated countries based on ISO 3166-1 alpha-2 ([#3916](https://github.com/dnbexperience/eufemia/issues/3916)) ([a045acd](https://github.com/dnbexperience/eufemia/commit/a045acdb5e89e1834cf3a59b4ae671bad209c0e5))


### :sparkles: Features

* **Forms:** add `toolbarVariant="minimumOneItem"` to Iterate.Toolbar for hiding buttons when there is only one item in the array ([#3919](https://github.com/dnbexperience/eufemia/issues/3919)) ([3367a77](https://github.com/dnbexperience/eufemia/commit/3367a774f79916f3a7ed785b38680fc40f82cf1f)), closes [#3877](https://github.com/dnbexperience/eufemia/issues/3877)
* **Forms:** add `validator` support to Iterate.Array ([#3926](https://github.com/dnbexperience/eufemia/issues/3926)) ([6fd439e](https://github.com/dnbexperience/eufemia/commit/6fd439e4133a96838434c2d6989c9b33f45f8b1a))
* **Forms:** auto-open Form.Section container when fields have errors and add `validateInitially` prop  ([#3878](https://github.com/dnbexperience/eufemia/issues/3878)) ([9b49006](https://github.com/dnbexperience/eufemia/commit/9b49006d3d60bde2904facde28d070867f3c8e80))
* **Forms:** auto-open iterate containers when validation errors and make `Iterate.Toolbar` fully customizable ([#3877](https://github.com/dnbexperience/eufemia/issues/3877)) ([52326bf](https://github.com/dnbexperience/eufemia/commit/52326bf136ea3d26c835accf8932cb0e93259e98)), closes [#3919](https://github.com/dnbexperience/eufemia/issues/3919)
* **Forms:** show optional label when a field uses `required={false}` and add `labelSuffix` prop to each field ([#3921](https://github.com/dnbexperience/eufemia/issues/3921)) ([60e440a](https://github.com/dnbexperience/eufemia/commit/60e440a4f07becf01e4ffa25c6f9bf4684160f6d))
* **Wizard:** add `preventNavigation` callback function to `onStepChange` ([#3924](https://github.com/dnbexperience/eufemia/issues/3924)) ([5ec2772](https://github.com/dnbexperience/eufemia/commit/5ec27728a257707e0a463a8df68d4bf321790a84))

## [10.47.0](https://github.com/dnbexperience/eufemia/compare/v10.46.0...v10.47.0) (2024-09-10)


### :memo: Documentation

* add component translations table to properties docs ([#3902](https://github.com/dnbexperience/eufemia/issues/3902)) ([66dd12e](https://github.com/dnbexperience/eufemia/commit/66dd12e5434876168a5cd9b31601b9e8b866f077))
* **useTheme:** updates docs to match TS type definitions ([#3901](https://github.com/dnbexperience/eufemia/issues/3901)) ([52aaab3](https://github.com/dnbexperience/eufemia/commit/52aaab379bfe6cae216ce9742d1aa2cb4e4c456a))


### :sparkles: Features

* **Button:** rewise documented `title` prop with aria-label documentation ([#3863](https://github.com/dnbexperience/eufemia/issues/3863)) ([ea444c0](https://github.com/dnbexperience/eufemia/commit/ea444c0f925f08d48bd2af9c94617a3025b775ef))
* **CopyOnClick:** adds copyContent prop ([e5a91b6](https://github.com/dnbexperience/eufemia/commit/e5a91b6ea999f70f43a92dd7511a10be808f6898))
* **countries:** Added missing countries from ISO 3166 [#3894](https://github.com/dnbexperience/eufemia/issues/3894) ([2992084](https://github.com/dnbexperience/eufemia/commit/29920848f3fc459ac7469c8896a77cb728f5c8c2))
* **countries:** Added missing countries from ISO 3166 [#3894](https://github.com/dnbexperience/eufemia/issues/3894) ([#3899](https://github.com/dnbexperience/eufemia/issues/3899)) ([ada0e92](https://github.com/dnbexperience/eufemia/commit/ada0e92f5745af037145df70ee336606dae2ad1d))
* **Forms:** extend validations in `Field.NationalIdentityNumber` ([#3888](https://github.com/dnbexperience/eufemia/issues/3888)) ([50cc26b](https://github.com/dnbexperience/eufemia/commit/50cc26bc2491b75857a3740e7bce4b5e497f0d28))
* **Forms:** make it possible to reuse and extend internal validators ([#3908](https://github.com/dnbexperience/eufemia/issues/3908)) ([7c97bf5](https://github.com/dnbexperience/eufemia/commit/7c97bf55df887d5fb7e9e6390bf0adaa706c3667))
* **Forms:** provide `connectWithPath` in the validator and onBlurValidator to get values from other fields/paths ([#3895](https://github.com/dnbexperience/eufemia/issues/3895)) ([f4cf06f](https://github.com/dnbexperience/eufemia/commit/f4cf06ffa53a5467ce323c6dc7b279c531079134))
* **Value.Date:** adds numeric variant ([#3907](https://github.com/dnbexperience/eufemia/issues/3907)) ([b03e199](https://github.com/dnbexperience/eufemia/commit/b03e1993588cb62e4c6c14e3ebc617e44e04cf0a))


### :bug: Bug Fixes

* **Accordion:** deprecate (rename) expandBehaviour in favor of expandBehavior ([#3905](https://github.com/dnbexperience/eufemia/issues/3905)) ([76143b0](https://github.com/dnbexperience/eufemia/commit/76143b0401eb50e158cc017b2acce18ff75f277b))
* **Breakpoint:** ensure matching breakpoint ranges in mixins with docs & hooks ([#3896](https://github.com/dnbexperience/eufemia/issues/3896)) ([260fcaf](https://github.com/dnbexperience/eufemia/commit/260fcafac9e6d22ba160f6d8ec8d2383cd7f849f))
* **Flex:** enhance handling of React fragments ([#3892](https://github.com/dnbexperience/eufemia/issues/3892)) ([156c805](https://github.com/dnbexperience/eufemia/commit/156c805f6cf6adaceb97b4011003dc1c668c15d3))
* **Forms:** enhance cleanup routine of fields ([#3885](https://github.com/dnbexperience/eufemia/issues/3885)) ([388e0b2](https://github.com/dnbexperience/eufemia/commit/388e0b2f2b63968cd60e3c1007b66b31de80ff03)), closes [#3877](https://github.com/dnbexperience/eufemia/issues/3877)
* **Forms:** ensure label supports HTML formatting ([#3911](https://github.com/dnbexperience/eufemia/issues/3911)) ([227569c](https://github.com/dnbexperience/eufemia/commit/227569cb43f86ccfcafcd5675eb139e320c176f6))
* **Forms:** ensure labels do update when they change (async fields) ([#3910](https://github.com/dnbexperience/eufemia/issues/3910)) ([bc40449](https://github.com/dnbexperience/eufemia/commit/bc404495356babf5b99d7d4481c13dcbd29861a0))
* **Forms:** warn on value prop usage on fields inside iterate with itemPath ([#3886](https://github.com/dnbexperience/eufemia/issues/3886)) ([116820d](https://github.com/dnbexperience/eufemia/commit/116820dd7547b0880ae4d442254dbe61be056e4f)), closes [#3877](https://github.com/dnbexperience/eufemia/issues/3877) [#3882](https://github.com/dnbexperience/eufemia/issues/3882)
* **LabelDescription:** nothing was returned ([#3898](https://github.com/dnbexperience/eufemia/issues/3898)) ([3452855](https://github.com/dnbexperience/eufemia/commit/3452855fd48f1d3ea5d28f7cccdf1aa00eca1a05))

## [10.46.0](https://github.com/dnbexperience/eufemia/compare/v10.45.0...v10.46.0) (2024-09-02)


### :memo: Documentation

* **Selection:** value should be string when variant is radio or button ([#3869](https://github.com/dnbexperience/eufemia/issues/3869)) ([aab8f5b](https://github.com/dnbexperience/eufemia/commit/aab8f5b9e1a40c2fc09812cb3cf8f4850fdca467))


### :sparkles: Features

* **Blocks.ChildrenWithAge:** removes step controls in age field ([#3867](https://github.com/dnbexperience/eufemia/issues/3867)) ([3b02e45](https://github.com/dnbexperience/eufemia/commit/3b02e45b4cb7d413202d136cf412d1f3215fafc9))
* **CopyOnClick:** add new component ([#3834](https://github.com/dnbexperience/eufemia/issues/3834)) ([07ba09d](https://github.com/dnbexperience/eufemia/commit/07ba09d8334388586853d54e221076609c9c5cb9))
* **Field.ArraySelection:** add dataPath prop ([#3872](https://github.com/dnbexperience/eufemia/issues/3872)) ([35427d7](https://github.com/dnbexperience/eufemia/commit/35427d70ab71660cb5a274068ec17d3890aacffa))
* **Forms:** add `Value.SelectCountry` component ([#3875](https://github.com/dnbexperience/eufemia/issues/3875)) ([416df35](https://github.com/dnbexperience/eufemia/commit/416df35d64e37c1cbbbe400d368721041dc02374))
* **Forms:** add function support for the `prefix` or `suffix` props in `Field.Number` ([#3880](https://github.com/dnbexperience/eufemia/issues/3880)) ([652448c](https://github.com/dnbexperience/eufemia/commit/652448c0e07b476d0573b9acafe0904a939c33fd))
* **Forms:** add validation for dnr and fnr in `Field.NationalIdentityNumber` ([#3771](https://github.com/dnbexperience/eufemia/issues/3771)) ([8a2da43](https://github.com/dnbexperience/eufemia/commit/8a2da43f0e82d4d09c8a472771e6eb286275a2be))
* **Forms:** deprecate filterSubmitData in Form.Handler and return `filterData` in onSubmit and onChange instead ([#3873](https://github.com/dnbexperience/eufemia/issues/3873)) ([f05bdd2](https://github.com/dnbexperience/eufemia/commit/f05bdd2d8f35fbc37580c5089ee00d6812fe2572))


### :bug: Bug Fixes

* **Forms:** add support for `gap={false}` to Value.Composition (ValueBlock) ([#3884](https://github.com/dnbexperience/eufemia/issues/3884)) ([413c568](https://github.com/dnbexperience/eufemia/commit/413c568758d27a938f3c7133fbfc01d520ef296d))
* **Forms:** enhance `Field.Email` validation pattern ([#3874](https://github.com/dnbexperience/eufemia/issues/3874)) ([aee005f](https://github.com/dnbexperience/eufemia/commit/aee005f901e00423aebf675454d4604ef2118379))
* **Forms:** fallback to use default locale for translations when providing a non-existent locale ([#3817](https://github.com/dnbexperience/eufemia/issues/3817)) ([f768613](https://github.com/dnbexperience/eufemia/commit/f7686138161ffc87c96dfb1389e3a8f16b2ea0ca))
* **InfinityScroller:** forward load button props ([#3737](https://github.com/dnbexperience/eufemia/issues/3737)) ([645a7b3](https://github.com/dnbexperience/eufemia/commit/645a7b3a96c551ba927ecbb2e824a9d71db67130))

## [10.45.0](https://github.com/dnbexperience/eufemia/compare/v10.44.0...v10.45.0) (2024-08-26)


### :memo: Documentation

* **Upload:** adds `false` as a file max size type ([#3846](https://github.com/dnbexperience/eufemia/issues/3846)) ([8747e74](https://github.com/dnbexperience/eufemia/commit/8747e74e0606d176e312fac16b5651ccb1eb3000))


### :bug: Bug Fixes

* **forms:** enhance `Field.Name` validation rule ([#3849](https://github.com/dnbexperience/eufemia/issues/3849)) ([9c9142d](https://github.com/dnbexperience/eufemia/commit/9c9142d99e73764f8742a3e21d7ffbae933dabd0))
* **forms:** ensure `Iterate.Array` can handle an array given in the data context ([#3842](https://github.com/dnbexperience/eufemia/issues/3842)) ([263f4c7](https://github.com/dnbexperience/eufemia/commit/263f4c7e52d60fdebcf294068744cd6973388ac7)), closes [#3759](https://github.com/dnbexperience/eufemia/issues/3759)
* **forms:** ensure `Section.EditContainer` cancel restores data when path is given ([#3853](https://github.com/dnbexperience/eufemia/issues/3853)) ([eabc583](https://github.com/dnbexperience/eufemia/commit/eabc583f3d75b28b1ee228bb40e8ac316b05c9aa)), closes [#3797](https://github.com/dnbexperience/eufemia/issues/3797)
* **forms:** ensure pressing enter in an input field inside Wizard does trigger next step ([#3852](https://github.com/dnbexperience/eufemia/issues/3852)) ([fd35828](https://github.com/dnbexperience/eufemia/commit/fd35828d295891744e1c3efd48ee62a013049705))
* **forms:** make `Form.Isolation`s data flow "from outside" stricter ([#3847](https://github.com/dnbexperience/eufemia/issues/3847)) ([977962b](https://github.com/dnbexperience/eufemia/commit/977962b70277b03d743e617b16d2df46d25d22aa)), closes [#3844](https://github.com/dnbexperience/eufemia/issues/3844)
* **forms:** validate fields inside `Iterate.EditContainer` when done button is pressed ([#3850](https://github.com/dnbexperience/eufemia/issues/3850)) ([2a2272e](https://github.com/dnbexperience/eufemia/commit/2a2272ef4b279d35bf9c28f138ec3741bb3384e6))
* **forms:** validate fields inside `Section.EditContainer` when done button is pressed ([#3851](https://github.com/dnbexperience/eufemia/issues/3851)) ([1c34980](https://github.com/dnbexperience/eufemia/commit/1c34980980f8369a434a93b41a448e092e85e09b))
* **useTheme:** define the return type of `null` as a possible return ([#3861](https://github.com/dnbexperience/eufemia/issues/3861)) ([8d0cf61](https://github.com/dnbexperience/eufemia/commit/8d0cf618a9620e7de00bfac8bde834846bff3b84))


### :sparkles: Features

* **forms:** add `inheritLabel` prop to value components ([#3858](https://github.com/dnbexperience/eufemia/issues/3858)) ([01e0976](https://github.com/dnbexperience/eufemia/commit/01e09761b2aca1d78b6517668ff35e857499cd24))
* **forms:** add `Iterate.PushContainer` to support an "initially open" container ([#3843](https://github.com/dnbexperience/eufemia/issues/3843)) ([0fe23a9](https://github.com/dnbexperience/eufemia/commit/0fe23a969f6957fef4316dc4527277bf7f5d5b5b))
* **forms:** add `Value.ArraySelection` component ([#3854](https://github.com/dnbexperience/eufemia/issues/3854)) ([bc55cc2](https://github.com/dnbexperience/eufemia/commit/bc55cc29af6b902795a83d8c4eee65ffa1db0b5d))
* **forms:** add `Value.Selection` component ([#3857](https://github.com/dnbexperience/eufemia/issues/3857)) ([7432986](https://github.com/dnbexperience/eufemia/commit/74329864b8cecf31fccdfc356786b43575e5c256))
* **forms:** add support for `{itemNr}` to the iterate container title + add `useItem` hook ([#3848](https://github.com/dnbexperience/eufemia/issues/3848)) ([0d50272](https://github.com/dnbexperience/eufemia/commit/0d50272c7a5c02d0e5d149432eb54927c327db9c))
* **Upload:** define max file size for file type ([#3859](https://github.com/dnbexperience/eufemia/issues/3859)) ([13fc1a8](https://github.com/dnbexperience/eufemia/commit/13fc1a864c1a5f2add1e9eb3afd5f6ea5967cb27))

## [10.44.0](https://github.com/dnbexperience/eufemia/compare/v10.43.0...v10.44.0) (2024-08-19)


### :memo: Documentation

* **Field.Expiry:** display translation props ([#3815](https://github.com/dnbexperience/eufemia/issues/3815)) ([1efbbd0](https://github.com/dnbexperience/eufemia/commit/1efbbd0ec737644d2cd7f7af74e72ea620f09e94))
* **Field.PhoneNumber:** document onChange event args ([#3807](https://github.com/dnbexperience/eufemia/issues/3807)) ([2b5f55e](https://github.com/dnbexperience/eufemia/commit/2b5f55ea50f3dd11b29264cb45ea47a291aae737))
* **Form.Isolation:** add real world examples ([#3808](https://github.com/dnbexperience/eufemia/issues/3808)) ([daec2fa](https://github.com/dnbexperience/eufemia/commit/daec2fae01230aeb3b3fa87b423208efb105b564))


### :bug: Bug Fixes

* **Button:** onClick can now be set using context provider ([#3781](https://github.com/dnbexperience/eufemia/issues/3781)) ([0d2f525](https://github.com/dnbexperience/eufemia/commit/0d2f525098169d65ec358652fb0252f483f88bc6))
* **forms:** add `Form.Isolation` path support when used inside `Form.Section` ([#3829](https://github.com/dnbexperience/eufemia/issues/3829)) ([d836c18](https://github.com/dnbexperience/eufemia/commit/d836c18adf061737b27f5487915c1040768056ad))
* **forms:** ensure correct spacing between `Iterate.Array` items ([#3838](https://github.com/dnbexperience/eufemia/issues/3838)) ([250aec0](https://github.com/dnbexperience/eufemia/commit/250aec065db5ba1b98d64678dc2dc76ccc843072))
* **forms:** ensure Form.Isolated does merge data properly ([#3811](https://github.com/dnbexperience/eufemia/issues/3811)) ([8c90cb8](https://github.com/dnbexperience/eufemia/commit/8c90cb81d447f3c3982f9982ef5f4efd0081747b)), closes [#3806](https://github.com/dnbexperience/eufemia/issues/3806)
* **forms:** ensure Form.Isolation with commitHandleRef triggers field errors ([#3810](https://github.com/dnbexperience/eufemia/issues/3810)) ([204396d](https://github.com/dnbexperience/eufemia/commit/204396d85cba48b0bd445c69c9a6d01985af517b))
* **forms:** show error when entered `Field.Currency` or `Field.Number` value exceeds maximum possible amount ([#3821](https://github.com/dnbexperience/eufemia/issues/3821)) ([e9cdd68](https://github.com/dnbexperience/eufemia/commit/e9cdd687a3147573288f7d74a47f6d1a87d2f29d))


### :sparkles: Features

* **Field.PhoneNumber, Field.SelectCountry:** additional event args for onFocus and onBlur ([#3820](https://github.com/dnbexperience/eufemia/issues/3820)) ([1da5d4f](https://github.com/dnbexperience/eufemia/commit/1da5d4fb8ec40cbe17657061e8278f636776fbe5))
* **Field:** adds typing for event callbacks ([#3830](https://github.com/dnbexperience/eufemia/issues/3830)) ([2275002](https://github.com/dnbexperience/eufemia/commit/2275002c2a8f44a102bf53e7edeb52c09ca49df3))
* **Form:** continuousValidation did not update error state correctly ([#3804](https://github.com/dnbexperience/eufemia/issues/3804)) ([5ff74bd](https://github.com/dnbexperience/eufemia/commit/5ff74bd14d6ece306c400328dfad349af7fa55f1))
* **forms:** add `dataPath` prop to Field.Selection ([#3816](https://github.com/dnbexperience/eufemia/issues/3816)) ([e43ad59](https://github.com/dnbexperience/eufemia/commit/e43ad59e9a2deaa3a6bed1db86f608191920a4e5))
* **forms:** add `Form.clearData` method to remove existing/shared data forms with an id ([#3809](https://github.com/dnbexperience/eufemia/issues/3809)) ([acf4c7f](https://github.com/dnbexperience/eufemia/commit/acf4c7f94bf378cef0bdccb3f471dc9a2ee8d7fe)), closes [#3803](https://github.com/dnbexperience/eufemia/issues/3803) [/github.com/dnbexperience/eufemia/issues/3803#issuecomment-2283661946](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/issues/3803/issues/issuecomment-2283661946)
* **forms:** add `transformOnCommit` to Form.Isolation ([#3813](https://github.com/dnbexperience/eufemia/issues/3813)) ([21eca1a](https://github.com/dnbexperience/eufemia/commit/21eca1ab6bc33c460d7989e3cd84a29cac10a165)), closes [#3812](https://github.com/dnbexperience/eufemia/issues/3812) [#3808](https://github.com/dnbexperience/eufemia/issues/3808)
* **forms:** add path prop support to Form.Isolation ([#3812](https://github.com/dnbexperience/eufemia/issues/3812)) ([a16d782](https://github.com/dnbexperience/eufemia/commit/a16d7822288e5f146b2a20b42104243eef03ef26)), closes [#3811](https://github.com/dnbexperience/eufemia/issues/3811)
* **Forms:** seperate translations for Boolean and Toggle ([#3819](https://github.com/dnbexperience/eufemia/issues/3819)) ([fa0827b](https://github.com/dnbexperience/eufemia/commit/fa0827b25a498fabfe1d31a5b56a97aa3c7dbae3))
* **Upload:** enables disabling of fileMaxSize ([#3835](https://github.com/dnbexperience/eufemia/issues/3835)) ([f2eff23](https://github.com/dnbexperience/eufemia/commit/f2eff23e121ee1e647fb63fa868f60229ceddc4b))

## [10.43.0](https://github.com/dnbexperience/eufemia/compare/v10.42.0...v10.43.0) (2024-08-08)


### :memo: Documentation

* **Typography:** improve font-weights table ([#3790](https://github.com/dnbexperience/eufemia/issues/3790)) ([a6af760](https://github.com/dnbexperience/eufemia/commit/a6af760b963a9d9c6dddf11c494d09e4b54c48d1))


### :sparkles: Features

* **forms:** add `itemPath` to Visibility for when using `visibleWhen` ([#3798](https://github.com/dnbexperience/eufemia/issues/3798)) ([2e0663e](https://github.com/dnbexperience/eufemia/commit/2e0663e3234f82faed72836800cf8962fc85f91d))
* **forms:** add Form.Isolation to isolate data context temporarily ([#3796](https://github.com/dnbexperience/eufemia/issues/3796)) ([9ea241f](https://github.com/dnbexperience/eufemia/commit/9ea241fb8350d647d41df5e99ff437dee868c5bf))
* **forms:** Form.Visibility – deprecate `withValue` in favor of `hasValue` ([#3799](https://github.com/dnbexperience/eufemia/issues/3799)) ([e9e51e0](https://github.com/dnbexperience/eufemia/commit/e9e51e02d52c49191d0d526b94a245b9b1dc2f43))


### :bug: Bug Fixes

* **Button:** Allow `react-router` Link as `element` ([#3801](https://github.com/dnbexperience/eufemia/issues/3801)) ([eebbf11](https://github.com/dnbexperience/eufemia/commit/eebbf11bde7cc7a023e2209afcab7d9ed15c70bb))
* **Card:** fix `title` type error that occurs when using jsx as value ([#3795](https://github.com/dnbexperience/eufemia/issues/3795)) ([3553ed2](https://github.com/dnbexperience/eufemia/commit/3553ed257b82f4c9e159b219647a55e2b0e9e3d2))
* **Tabs:** make sure props data key is used if defined ([#3802](https://github.com/dnbexperience/eufemia/issues/3802)) ([49f1c05](https://github.com/dnbexperience/eufemia/commit/49f1c05f69099cf88fcbad0906e0db1d580aed4e))

## [10.42.0](https://github.com/dnbexperience/eufemia/compare/v10.41.0...v10.42.0) (2024-07-25)


### :bug: Bug Fixes

* **forms:** add support for horizontal layout in SummaryList and adjust spacing and alignment ([#3782](https://github.com/dnbexperience/eufemia/issues/3782)) ([59c2839](https://github.com/dnbexperience/eufemia/commit/59c2839b11abce92e9d733d52ee59af8f4e1ee64))


### :sparkles: Features

* **Field. ArraySelection:** adds `checkbox-button` variant ([#3783](https://github.com/dnbexperience/eufemia/issues/3783)) ([9deace8](https://github.com/dnbexperience/eufemia/commit/9deace837177ce3127b9e04acb8a49dfe13230fd))
* **Img:** add support for loading-prop ([#3778](https://github.com/dnbexperience/eufemia/issues/3778)) ([fe339bf](https://github.com/dnbexperience/eufemia/commit/fe339bf0b6eef991b9095887520d1a4f9148010e))

## [10.41.0](https://github.com/dnbexperience/eufemia/compare/v10.40.1...v10.41.0) (2024-07-23)


### :memo: Documentation

* **Blocks:** correct import paths ChildrenWithAge  ([#3769](https://github.com/dnbexperience/eufemia/issues/3769)) ([43ffe16](https://github.com/dnbexperience/eufemia/commit/43ffe161223b9dcbe73123289970380d88666e42))
* **Field.Email:** fix link to input docs ([#3770](https://github.com/dnbexperience/eufemia/issues/3770)) ([75bb560](https://github.com/dnbexperience/eufemia/commit/75bb56000d70d9b560fe0d73e9c2ffefbd4936e1))


### :bug: Bug Fixes

* **Translation:** ensure correct jsx type support ([c70cbeb](https://github.com/dnbexperience/eufemia/commit/c70cbeba75b92a145baaf57add4928890c4eb955))


### :sparkles: Features

* **Field.Selection:** allow all props for dropdown and autocomplete ([#3776](https://github.com/dnbexperience/eufemia/issues/3776)) ([951c67d](https://github.com/dnbexperience/eufemia/commit/951c67df6522e201d9df4582d2ae56685c5e3711))
* **FieldBlock:** add `labelSrOnly` prop ([ebf50c6](https://github.com/dnbexperience/eufemia/commit/ebf50c63d21dc9c10f689764beb92a6422b30571))
* **Field:** changed field help button types to ReactNode ([#3777](https://github.com/dnbexperience/eufemia/issues/3777)) ([6506934](https://github.com/dnbexperience/eufemia/commit/6506934a332eed1ce9e80a4197014bc07ffbeecc))
* **forms:** add Upload field ([048bfc7](https://github.com/dnbexperience/eufemia/commit/048bfc70c1ffcf3e887b79bf6a45ea157e783616))
* **forms:** add Upload field ([#3742](https://github.com/dnbexperience/eufemia/issues/3742)) ([4ea8933](https://github.com/dnbexperience/eufemia/commit/4ea89334326d1246a3e4aaa2d436cc26b57a6810))

## [10.40.1](https://github.com/dnbexperience/eufemia/compare/v10.40.0...v10.40.1) (2024-07-09)


### :bug: Bug Fixes

* **Dropdown:** NVDA navigation issue when no items are selected ([#3766](https://github.com/dnbexperience/eufemia/issues/3766)) ([6dd4a9f](https://github.com/dnbexperience/eufemia/commit/6dd4a9fefb4c8bcdde583e25b0b91e194a7bcce4))

## [10.40.0](https://github.com/dnbexperience/eufemia/compare/v10.39.0...v10.40.0) (2024-07-08)


### :sparkles: Features

* **Forms.Wizard:** separate translations for buttons ([#3762](https://github.com/dnbexperience/eufemia/issues/3762)) ([d07a3ef](https://github.com/dnbexperience/eufemia/commit/d07a3ef0f8d52ecc63d6b6d3a92d40aa0f3ab857))
* **Forms:** translations EditContainer, ViewContainer, RemoveButton ([#3760](https://github.com/dnbexperience/eufemia/issues/3760)) ([d173de2](https://github.com/dnbexperience/eufemia/commit/d173de294e45958bbc787a3c6238cbfa4446f549))


### :bug: Bug Fixes

* **Badge:** fix vertical alignment support when used inline ([#3761](https://github.com/dnbexperience/eufemia/issues/3761)) ([5d10fa9](https://github.com/dnbexperience/eufemia/commit/5d10fa90f64a904fe86cf4fd9e96a5ea5396cf2a))
* **Forms.Handler:** onSubmit support async fn @babel/plugin-transform-async-to-generator ([#3764](https://github.com/dnbexperience/eufemia/issues/3764)) ([340ce12](https://github.com/dnbexperience/eufemia/commit/340ce12b0e50b23bc7047f49ea808221f2059117))

## [10.39.0](https://github.com/dnbexperience/eufemia/compare/v10.38.0...v10.39.0) (2024-07-05)


### :bug: Bug Fixes

* deprecate `class` prop in Button, Drawer, Dialog and Modal components ([#3745](https://github.com/dnbexperience/eufemia/issues/3745)) ([2aea682](https://github.com/dnbexperience/eufemia/commit/2aea682d39f220826a1c9da7c364e16cd798860b)), closes [#3634](https://github.com/dnbexperience/eufemia/issues/3634)
* **Forms:** update `emptyValue` documentation and type to reflect how it's used internally  ([#3729](https://github.com/dnbexperience/eufemia/issues/3729)) ([ff755e7](https://github.com/dnbexperience/eufemia/commit/ff755e70a27d6c798be7dd63d9cda3fe64100904))
* **PaymentCard:** change SBanken to Sbanken ([#3747](https://github.com/dnbexperience/eufemia/issues/3747)) ([bfe8a9d](https://github.com/dnbexperience/eufemia/commit/bfe8a9d5ff5f7496de2b4937cf499367ede9384f))
* **PaymentCard:** set sbanken MC code to P103 ([#3746](https://github.com/dnbexperience/eufemia/issues/3746)) ([1e97a41](https://github.com/dnbexperience/eufemia/commit/1e97a41da548e892a78e8c8edffdaec3bb654117))


### :memo: Documentation

* **Field.Number:** add `allowNegative` demo/example ([#3754](https://github.com/dnbexperience/eufemia/issues/3754)) ([d6d3dbd](https://github.com/dnbexperience/eufemia/commit/d6d3dbd4397880d854b2109440038ff359cc990e))
* **Field.Number:** fix `percent` demo/example ([#3755](https://github.com/dnbexperience/eufemia/issues/3755)) ([c1a0839](https://github.com/dnbexperience/eufemia/commit/c1a083927e571c8b1d751673046ddc94f127a3be))


### :sparkles: Features

* **Field.Number:** add `allowNegative` mask prop ([#3753](https://github.com/dnbexperience/eufemia/issues/3753)) ([9dc1358](https://github.com/dnbexperience/eufemia/commit/9dc1358eea68e6bdc095a4cd4291ec2914566d44))
* **Field.Number:** add `disallowLeadingZeroes` prop ([#3756](https://github.com/dnbexperience/eufemia/issues/3756)) ([d49cad9](https://github.com/dnbexperience/eufemia/commit/d49cad9f428102b86fd06de3976d46c51cb47fda))
* **Table:** add navigation mode ([#3752](https://github.com/dnbexperience/eufemia/issues/3752)) ([b3a6db9](https://github.com/dnbexperience/eufemia/commit/b3a6db91c10591db061ec8bbac16d5cf6a987866))

## [10.38.0](https://github.com/dnbexperience/eufemia/compare/v10.37.0...v10.38.0) (2024-06-26)


### :bug: Bug Fixes

* **Accordion:** add missing bottom border on hover ([#3723](https://github.com/dnbexperience/eufemia/issues/3723)) ([41fb027](https://github.com/dnbexperience/eufemia/commit/41fb0275a8a1661afd5c5fd279b5a4c54a23d661))


### :memo: Documentation

* **Button:** add 'small' button size as supported ([#3735](https://github.com/dnbexperience/eufemia/issues/3735)) ([686cb90](https://github.com/dnbexperience/eufemia/commit/686cb908c1de1ac4c31eabfe6c859a35b69ecb46))


### :sparkles: Features

* **Accordion:** allow multiple accordions inside a group to be expanded at the same time ([#3726](https://github.com/dnbexperience/eufemia/issues/3726)) ([68d3b0b](https://github.com/dnbexperience/eufemia/commit/68d3b0b8c7a8d56dff1fa67b1df0aebb9292e355))
* **Card:** add support for nesting a Section with breakout until edge of card ([#3728](https://github.com/dnbexperience/eufemia/issues/3728)) ([97e92c2](https://github.com/dnbexperience/eufemia/commit/97e92c257cf4e0a3a4a16ad336bc5151bc8d66b4))
* **forms:** add property compensateForGap to Visibility ([#3733](https://github.com/dnbexperience/eufemia/issues/3733)) ([3094b18](https://github.com/dnbexperience/eufemia/commit/3094b1889457205ae6cc5fb2d74e0e9dbcfa2976)), closes [#3732](https://github.com/dnbexperience/eufemia/issues/3732)
* **forms:** add support for nested `Section` and `ArraySelection` fields ([#3734](https://github.com/dnbexperience/eufemia/issues/3734)) ([d4b3bb4](https://github.com/dnbexperience/eufemia/commit/d4b3bb4c6a1ad2a5acd860acd42d24e04ca9f4b9)), closes [#3733](https://github.com/dnbexperience/eufemia/issues/3733)
* **HeightAnimation:** add property `compensateForGap` ([#3732](https://github.com/dnbexperience/eufemia/issues/3732)) ([b0c4199](https://github.com/dnbexperience/eufemia/commit/b0c4199515e5642ac8bb3dd068ea1d2022dbdec0))

## [10.37.0](https://github.com/dnbexperience/eufemia/compare/v10.36.0...v10.37.0) (2024-06-18)


### :sparkles: Features

* **Accordion:** close all `Accordions` in `Accordion.Group` ([#3712](https://github.com/dnbexperience/eufemia/issues/3712)) ([2db669f](https://github.com/dnbexperience/eufemia/commit/2db669f8a6aea1add012bb4ba35ba9cc867535f4))


### :bug: Bug Fixes

* **forms:** use corrct date formatting for Value.Date ([#3715](https://github.com/dnbexperience/eufemia/issues/3715)) ([5029f43](https://github.com/dnbexperience/eufemia/commit/5029f435d297fe549c7bff97324a96dc69a51176)), closes [#3711](https://github.com/dnbexperience/eufemia/issues/3711)
* **StepIndicator:** lower flickering for when there are less than 4 steps ([#3713](https://github.com/dnbexperience/eufemia/issues/3713)) ([8e14587](https://github.com/dnbexperience/eufemia/commit/8e14587f4a9b5fc5fed854dc9aa365c88ada23b8))
* **toCapitalized:** remove lookbehind regular expression in order to support iOS Safari <v16  ([#3721](https://github.com/dnbexperience/eufemia/issues/3721)) ([eb53409](https://github.com/dnbexperience/eufemia/commit/eb53409bfb15c68b8e2ae121b43d36f9d8494172))

## [10.36.0](https://github.com/dnbexperience/eufemia/compare/v10.35.0...v10.36.0) (2024-06-14)


### :sparkles: Features

* **Anchor:** add helper classes as props ([#3701](https://github.com/dnbexperience/eufemia/issues/3701)) ([62b23e8](https://github.com/dnbexperience/eufemia/commit/62b23e8fbf626f795a129e4dcb2f21d5b65b14a1))
* **forms:** add `activeWhen` prop to Wizard.Step ([#3705](https://github.com/dnbexperience/eufemia/issues/3705)) ([edd6214](https://github.com/dnbexperience/eufemia/commit/edd6214e79c153f5557b9c6c7554c0d5afb03056))
* **Icon:** rewrite to TypeScript and hooks ([#3703](https://github.com/dnbexperience/eufemia/issues/3703)) ([70b1f8b](https://github.com/dnbexperience/eufemia/commit/70b1f8ba5129bcdf9860ed967db3d0919fb9ccc3)), closes [#3699](https://github.com/dnbexperience/eufemia/issues/3699)
* **Table:** refactoring of types, documentation, and accordion file structure ([#3683](https://github.com/dnbexperience/eufemia/issues/3683)) ([6045e42](https://github.com/dnbexperience/eufemia/commit/6045e42ee4c61059da8159ec1bc7a94dae6f8971))


### :bug: Bug Fixes

* **Autocomplete:** make `input_value` react to prop change ([#3706](https://github.com/dnbexperience/eufemia/issues/3706)) ([641e5e7](https://github.com/dnbexperience/eufemia/commit/641e5e79f22e20dc647b250be3f8ce98e7e9751f))
* **Autocomplete:** make inputValue update on data prop changes ([#3581](https://github.com/dnbexperience/eufemia/issues/3581)) ([83b05cf](https://github.com/dnbexperience/eufemia/commit/83b05cfeeb3cc9a88f0e710c35fdb65d8f39c81d))
* **forms:** ensure useReactRouter to handle initial data given by url ([#3708](https://github.com/dnbexperience/eufemia/issues/3708)) ([a16f1f7](https://github.com/dnbexperience/eufemia/commit/a16f1f7d4d313f4b8d497a754ea025558141d970)), closes [#3702](https://github.com/dnbexperience/eufemia/issues/3702)
* **StepIndicator:** avoid re-assigning functions that can cause titles to be not in sync ([#3697](https://github.com/dnbexperience/eufemia/issues/3697)) ([d8d740c](https://github.com/dnbexperience/eufemia/commit/d8d740cd129e4027bf94936f8898f7018c8f86f6)), closes [#3685](https://github.com/dnbexperience/eufemia/issues/3685)


### :memo: Documentation

* **forms:** add translations table ([#3693](https://github.com/dnbexperience/eufemia/issues/3693)) ([84605b7](https://github.com/dnbexperience/eufemia/commit/84605b70bd922bede930185aed7c981cf5ae2a48))
* **Tabs:** fix the title of Tabs breakout example ([#3696](https://github.com/dnbexperience/eufemia/issues/3696)) ([7747e06](https://github.com/dnbexperience/eufemia/commit/7747e0639482a8541fe6013844b00375653cd1b9))
* **Tabs:** improve property docs ([#3665](https://github.com/dnbexperience/eufemia/issues/3665)) ([7849cba](https://github.com/dnbexperience/eufemia/commit/7849cbac776b14bf0250843f160b593367457692))
* update grid layout example without responsive sidebar ([#3709](https://github.com/dnbexperience/eufemia/issues/3709)) ([f4363c2](https://github.com/dnbexperience/eufemia/commit/f4363c260d0f6537fc457916625f6ed61c335a27))

## [10.35.0](https://github.com/dnbexperience/eufemia/compare/v10.34.1...v10.35.0) (2024-06-11)


### :memo: Documentation

* add link to Eufemia's GitHub repository in menu bar ([#3670](https://github.com/dnbexperience/eufemia/issues/3670)) ([cdecbb3](https://github.com/dnbexperience/eufemia/commit/cdecbb38ef5e189cb41998ca1b1f990406d72c3c))
* fix heading levels ([#3660](https://github.com/dnbexperience/eufemia/issues/3660)) ([d0bb28d](https://github.com/dnbexperience/eufemia/commit/d0bb28d19cbf3fea0d270fd651036974b65f2f4b))
* **Forms:** fix broken link to forms/Wizard/Container ([#3656](https://github.com/dnbexperience/eufemia/issues/3656)) ([53cb041](https://github.com/dnbexperience/eufemia/commit/53cb041bce4dfcb7064f4daa3e05d6ceeb18dbcc))
* **Forms:** reqruied -> required ([#3655](https://github.com/dnbexperience/eufemia/issues/3655)) ([be82a51](https://github.com/dnbexperience/eufemia/commit/be82a519680a8ef1dbdf99e1aa1c44910830769a))
* remove demos ([#3668](https://github.com/dnbexperience/eufemia/issues/3668)) ([90638ce](https://github.com/dnbexperience/eufemia/commit/90638ce12d34f72ddbc87f2111bb46e985f20af2))


### :bug: Bug Fixes

* add support for ::selection color for Chromium based browsers ([#3689](https://github.com/dnbexperience/eufemia/issues/3689)) ([6e49a9b](https://github.com/dnbexperience/eufemia/commit/6e49a9b1ca57b0f3ca1e2ffb91612cb3f3f53f01))
* **forms:** add help button to Field.Option ([#3678](https://github.com/dnbexperience/eufemia/issues/3678)) ([9210281](https://github.com/dnbexperience/eufemia/commit/921028122fc43739d0ada14fd7b0fb0346d466ea))
* **forms:** ensure help button is rendered only once in Toggle and Boolean fields ([#3675](https://github.com/dnbexperience/eufemia/issues/3675)) ([d9e9478](https://github.com/dnbexperience/eufemia/commit/d9e947892a87ee7d227cd478aa7e9535df5e7ce5))
* **forms:** solve issue when schema is used in Wizard ([#3680](https://github.com/dnbexperience/eufemia/issues/3680)) ([8699b0c](https://github.com/dnbexperience/eufemia/commit/8699b0c728fb7e7555a2b2925ca15a563a65cb11))
* **TextCounter:** exceeded message when variant up ([#3688](https://github.com/dnbexperience/eufemia/issues/3688)) ([22f1507](https://github.com/dnbexperience/eufemia/commit/22f1507df97ac74089eab53bbb5ae0ba95e474e2))


### :sparkles: Features

* **assets:** add sbanken logo svgs ([#3674](https://github.com/dnbexperience/eufemia/issues/3674)) ([1d7bcc0](https://github.com/dnbexperience/eufemia/commit/1d7bcc0c51fac997bc10a99bc87e209526218e14))
* **filter:** add support to filter array data based on wildcard `*` ([#3679](https://github.com/dnbexperience/eufemia/issues/3679)) ([1d93ac4](https://github.com/dnbexperience/eufemia/commit/1d93ac4ffff5c1808f28ed4139cb6ceb36413adb))
* **forms:** add edit and view containers to `Form.Section` ([#3652](https://github.com/dnbexperience/eufemia/issues/3652)) ([51bf7a2](https://github.com/dnbexperience/eufemia/commit/51bf7a236f1193cae47ad8adba825709c277713d))
* **forms:** add help property to ArraySelection field ([#3694](https://github.com/dnbexperience/eufemia/issues/3694)) ([f6b1224](https://github.com/dnbexperience/eufemia/commit/f6b1224e757e83e7fa7b9ed70f4bef5d1ed749cd))
* **HelpButton:** ensure larger bounding area when size is set to small ([#3677](https://github.com/dnbexperience/eufemia/issues/3677)) ([97ca056](https://github.com/dnbexperience/eufemia/commit/97ca056025259cc48ce57db50dc6c163f40e668c))
* **Logo:** Refactor Logo to ts ([#3611](https://github.com/dnbexperience/eufemia/issues/3611)) ([b1ca771](https://github.com/dnbexperience/eufemia/commit/b1ca771603c74b003365ebf7b1daee09f7edad96))
* **NumberFormat:** add monospace support ([#3669](https://github.com/dnbexperience/eufemia/issues/3669)) ([940ddb6](https://github.com/dnbexperience/eufemia/commit/940ddb6c1a67c665cc7cb2e3c393f8de79b01806))
* refactor internal translation logic to not mutate the root context ([#3691](https://github.com/dnbexperience/eufemia/issues/3691)) ([49b0b45](https://github.com/dnbexperience/eufemia/commit/49b0b4589c113799ddd28bdd3cbef6e7181b580a))
* **Table:** added handle to collapse all accordion rows ([#3666](https://github.com/dnbexperience/eufemia/issues/3666)) ([c09a697](https://github.com/dnbexperience/eufemia/commit/c09a6976c24fb082f66062e5018d7d2b00323cf7))
* **Translation:** add support for type-safe keys ([#3681](https://github.com/dnbexperience/eufemia/issues/3681)) ([437ba83](https://github.com/dnbexperience/eufemia/commit/437ba8371910691d4908b0001fb3fa2409792548))

## [10.34.1](https://github.com/dnbexperience/eufemia/compare/v10.34.0...v10.34.1) (2024-06-05)


### :memo: Documentation

* ensure anchor #hash links to scroll to target ([#3643](https://github.com/dnbexperience/eufemia/issues/3643)) ([d04d893](https://github.com/dnbexperience/eufemia/commit/d04d893798bb2a018734623a9d09da5b4ff5602b))


### :bug: Bug Fixes

* **forms:** add Flex layout support to `Form.FieldProps` and `Form.Section` ([#3642](https://github.com/dnbexperience/eufemia/issues/3642)) ([032ca4e](https://github.com/dnbexperience/eufemia/commit/032ca4e2fe7166b9d6daa27e2e45866c975d0e06))
* **forms:** add help prop to Boolean and Toggle fields ([#3645](https://github.com/dnbexperience/eufemia/issues/3645)) ([8c3c36f](https://github.com/dnbexperience/eufemia/commit/8c3c36fbf3577d501fc8498b705a530516f3bff5))
* **forms:** ensure active prop in Wizard.Step is resolving correctly on internal re-renders  ([#3644](https://github.com/dnbexperience/eufemia/issues/3644)) ([2433a8b](https://github.com/dnbexperience/eufemia/commit/2433a8ba6410f35155532fad48771417a17c6447))
* **forms:** ensure Field.Number with showStepControls can stretch when defined ([#3648](https://github.com/dnbexperience/eufemia/issues/3648)) ([231d8a7](https://github.com/dnbexperience/eufemia/commit/231d8a7b341fb79563522430898b864f38aa06da))
* **forms:** ensure Field.Password supports size prop ([#3647](https://github.com/dnbexperience/eufemia/issues/3647)) ([da1f25a](https://github.com/dnbexperience/eufemia/commit/da1f25a6863ad362dfa9f17f6871f424d033ab0a))

## [10.34.0](https://github.com/dnbexperience/eufemia/compare/v10.33.0...v10.34.0) (2024-06-03)


### :bug: Bug Fixes

* **DrawerList:** prevent call attempt for word if not function ([#3613](https://github.com/dnbexperience/eufemia/issues/3613)) ([66e04ba](https://github.com/dnbexperience/eufemia/commit/66e04babd088da6792ebabd171e680a517b1702d))
* **forms:** add align prop to Field.Composition ([#3622](https://github.com/dnbexperience/eufemia/issues/3622)) ([b8cfcd4](https://github.com/dnbexperience/eufemia/commit/b8cfcd44d179c681c2b66f363a4dc554a6da68e7))
* **forms:** enhance handling of schema TypeScript support ([#3635](https://github.com/dnbexperience/eufemia/issues/3635)) ([8e09651](https://github.com/dnbexperience/eufemia/commit/8e096512252c26e3244c91009f0bb70c7adf69f1)), closes [#3621](https://github.com/dnbexperience/eufemia/issues/3621)
* **forms:** ensure Value.Number renders with 0 ([#3620](https://github.com/dnbexperience/eufemia/issues/3620)) ([9f4a4d3](https://github.com/dnbexperience/eufemia/commit/9f4a4d3e1c1290cf8df362b857b22af6a272ec90))
* **TableContainer:** take full width when inside `Card` ([#3630](https://github.com/dnbexperience/eufemia/issues/3630)) ([c4d5c14](https://github.com/dnbexperience/eufemia/commit/c4d5c143bae9c6d89df1bf976e1233f25e8af6df))


### :sparkles: Features

* **Autocomplete:** preliminary sbanken colors ([#3604](https://github.com/dnbexperience/eufemia/issues/3604)) ([fe42538](https://github.com/dnbexperience/eufemia/commit/fe425385f04d17dcbac27f29d02ac5f80150c739))
* **Blocks:** add ChildrenWithAge block ([#3619](https://github.com/dnbexperience/eufemia/issues/3619)) ([118932c](https://github.com/dnbexperience/eufemia/commit/118932c43b1a39dbc64c625c7dad90a6766bc85d))
* **Card:** stretch content inside when `stack` is true ([#3633](https://github.com/dnbexperience/eufemia/issues/3633)) ([d9177e9](https://github.com/dnbexperience/eufemia/commit/d9177e9ccd93f87604581eda46bb92a09bffc54d))
* **Checkbox, Radio:** fix border width for Sbanken brand ([#3612](https://github.com/dnbexperience/eufemia/issues/3612)) ([624ecf2](https://github.com/dnbexperience/eufemia/commit/624ecf215a96565161e7be0211767345836a2f8a))
* **forms:** add `active` prop to Wizard.Step ([#3639](https://github.com/dnbexperience/eufemia/issues/3639)) ([2804041](https://github.com/dnbexperience/eufemia/commit/2804041a43be9500cd3835a9c76023c26d469514))
* **forms:** add `countPath` prop to Iterate.Array ([#3615](https://github.com/dnbexperience/eufemia/issues/3615)) ([dfe96f5](https://github.com/dnbexperience/eufemia/commit/dfe96f560fa70aac45a465f7bcc707a9523d3200))
* **forms:** add `defaultValue` to all `Value.*` components ([#3627](https://github.com/dnbexperience/eufemia/issues/3627)) ([4fdc778](https://github.com/dnbexperience/eufemia/commit/4fdc778fb52e597e9b5b92f75574cc4c3e9ba8d1))
* **forms:** add `defaultValue` to all fields ([#3616](https://github.com/dnbexperience/eufemia/issues/3616)) ([58d698a](https://github.com/dnbexperience/eufemia/commit/58d698ad18a7e44c5e4a5e1afe2b0dab285e9136)), closes [#3615](https://github.com/dnbexperience/eufemia/issues/3615)
* **forms:** add `trueText` and `falseText` to Value.Boolean ([#3624](https://github.com/dnbexperience/eufemia/issues/3624)) ([c9cae37](https://github.com/dnbexperience/eufemia/commit/c9cae372a51fc8ef387626a50560e4f778b32ef1))
* **forms:** add hr to Wizard.EditButton ([#3637](https://github.com/dnbexperience/eufemia/issues/3637)) ([2018d16](https://github.com/dnbexperience/eufemia/commit/2018d16921a5a4d7179b04f52f27a4f7eb8eaff5))
* **forms:** add minimum and maximum to Value.Number ([#3636](https://github.com/dnbexperience/eufemia/issues/3636)) ([bbe3b2b](https://github.com/dnbexperience/eufemia/commit/bbe3b2bc66d6c82ce9a74ee42d0f2ab1e34dcd21))
* **forms:** add startWith prop to Field.Number ([#3632](https://github.com/dnbexperience/eufemia/issues/3632)) ([b6d177a](https://github.com/dnbexperience/eufemia/commit/b6d177a5593090bc3d10ce6599b24bdbad6fa0b1))
* **FormStatus, Section:** change sbanken info color to purple ([#3589](https://github.com/dnbexperience/eufemia/issues/3589)) ([5356eb8](https://github.com/dnbexperience/eufemia/commit/5356eb8acbfb8fa62626e99fcc4e4b051a89f47f))

## [10.33.0](https://github.com/dnbexperience/eufemia/compare/v10.32.0...v10.33.0) (2024-05-27)


### :memo: Documentation

* add Accordion in Grid columns example ([#3601](https://github.com/dnbexperience/eufemia/issues/3601)) ([8e695ff](https://github.com/dnbexperience/eufemia/commit/8e695ff252f85a4629107b4d9722c3219b718fe8))


### :sparkles: Features

* **forms:** add `Composite.Block` to compose reusable blocks of fields and values ([#3594](https://github.com/dnbexperience/eufemia/issues/3594)) ([67d1538](https://github.com/dnbexperience/eufemia/commit/67d1538a7480e72444a644e3e747d6eb193af0d0))
* **forms:** add `Form.Section` to compose reusable blocks of fields and values ([#3609](https://github.com/dnbexperience/eufemia/issues/3609)) ([32848e2](https://github.com/dnbexperience/eufemia/commit/32848e2b2080c8eadf24caee4f65fe95ebfa3133)), closes [#3594](https://github.com/dnbexperience/eufemia/issues/3594)
* **forms:** add Field.Slider ([#3597](https://github.com/dnbexperience/eufemia/issues/3597)) ([d94f691](https://github.com/dnbexperience/eufemia/commit/d94f691d26c1559ec24451684d46254a16fa3a6e))


### :bug: Bug Fixes

* **ArraySelection:** make explicit type of value can be undefined ([#3610](https://github.com/dnbexperience/eufemia/issues/3610)) ([cd4add9](https://github.com/dnbexperience/eufemia/commit/cd4add9f7c7f749951e561aec18919325aee6946))
* **DrawerList:** check if string converted jsx is of type function ([#3606](https://github.com/dnbexperience/eufemia/issues/3606)) ([6a59d6c](https://github.com/dnbexperience/eufemia/commit/6a59d6c8ed4b15e727ea89312b3d51ba2ff9b0b8))
* **FieldBlock:** make it possible to be used in horizontal flex layout when width="stretch" is used ([#3596](https://github.com/dnbexperience/eufemia/issues/3596)) ([fde04b5](https://github.com/dnbexperience/eufemia/commit/fde04b5e7b3dccb76cd9b1f86bd4879df89f58a5))
* **forms:** add support for `trueText` and `falseText` to Boolean checkbox variant ([#3607](https://github.com/dnbexperience/eufemia/issues/3607)) ([198164a](https://github.com/dnbexperience/eufemia/commit/198164a2137d55f912d5d18827787fad5228aca4))
* **SelectCountry:** use given path value ([#3598](https://github.com/dnbexperience/eufemia/issues/3598)) ([9ca7953](https://github.com/dnbexperience/eufemia/commit/9ca7953cb4dee7c7f9c482d1e184e0f9dce859ae))

## [10.32.0](https://github.com/dnbexperience/eufemia/compare/v10.31.0...v10.32.0) (2024-05-23)


### :memo: Documentation

* add more details about media query breakpoint ranges ([#3584](https://github.com/dnbexperience/eufemia/issues/3584)) ([4364436](https://github.com/dnbexperience/eufemia/commit/43644362c94b69c932d60583ee92ff9f441f87fb))


### :bug: Bug Fixes

* **Anchor:** add TypeScript (strict) support for react-router-dom Link used as `element` ([#3559](https://github.com/dnbexperience/eufemia/issues/3559)) ([8f83e2a](https://github.com/dnbexperience/eufemia/commit/8f83e2a224eae02f7feb3d9bd0030cab380a5a20))
* **Autocomplete:** fix issue where `React.Element` would not render when used as `selected_value`  ([#3505](https://github.com/dnbexperience/eufemia/issues/3505)) ([6e39785](https://github.com/dnbexperience/eufemia/commit/6e39785e36f20199111915efe01335f1666d66d8))
* **Breakpoint:** ensure correct breakpoint ranges when using useMedia, useMediaQuery or MediaQuery ([#3588](https://github.com/dnbexperience/eufemia/issues/3588)) ([1b0e4d6](https://github.com/dnbexperience/eufemia/commit/1b0e4d69b2a1ad59eec1cbedc6232d46f5543243))
* **Checkbox:** ensure correct disabled state ([#3587](https://github.com/dnbexperience/eufemia/issues/3587)) ([7017c50](https://github.com/dnbexperience/eufemia/commit/7017c50904f20af17049f9fecc14366bbc36b486))
* **Field.PhoneNumber:** make country code show all relevant countries on click after phonenumber is entered ([#3567](https://github.com/dnbexperience/eufemia/issues/3567)) ([6287526](https://github.com/dnbexperience/eufemia/commit/62875265aa767c68ddea45b8ad748af8d66637ab))
* **FieldBlock:** avoid 100% width when not needed ([#3561](https://github.com/dnbexperience/eufemia/issues/3561)) ([10cfdf7](https://github.com/dnbexperience/eufemia/commit/10cfdf7034e14eae2a4f26c0bbd9c3ca126538de))
* **forms:** add schema `required` support to Field.Composition ([#3571](https://github.com/dnbexperience/eufemia/issues/3571)) ([bd21cd8](https://github.com/dnbexperience/eufemia/commit/bd21cd83bf61a2a60def3981a6e3ea136b7ef64a)), closes [#3554](https://github.com/dnbexperience/eufemia/issues/3554)
* **forms:** add support for `filterData` with existing data when used inside Wizard ([#3568](https://github.com/dnbexperience/eufemia/issues/3568)) ([d22544d](https://github.com/dnbexperience/eufemia/commit/d22544d40b1a38e45a0edb659358ee411bb2824f))
* **forms:** set focus back on existing element after async submission ([#3585](https://github.com/dnbexperience/eufemia/issues/3585)) ([b2f5620](https://github.com/dnbexperience/eufemia/commit/b2f5620e5773396dc2a469d1970b68190fc19286))
* **Space:** ensure `false` yields to 0 (not to 1rem) ([#3562](https://github.com/dnbexperience/eufemia/issues/3562)) ([5f93866](https://github.com/dnbexperience/eufemia/commit/5f93866f8455993b3bcddfb5cef539183dc99aef))


### :sparkles: Features

* **Card:** preliminary sbanken theme ([#3582](https://github.com/dnbexperience/eufemia/issues/3582)) ([38cd6f8](https://github.com/dnbexperience/eufemia/commit/38cd6f817f1c092af57ea796ce7aa010aa4ae7b9))
* **Flex:** deprecate `spacing` in favor of `gap` ([#3565](https://github.com/dnbexperience/eufemia/issues/3565)) ([39e2cf5](https://github.com/dnbexperience/eufemia/commit/39e2cf5aec0fba72a67cfb63cbc71c484f70bfc0))
* **forms:** add `variant` prop to Iterate ViewContainer and EditContainer ([#3569](https://github.com/dnbexperience/eufemia/issues/3569)) ([f683aa0](https://github.com/dnbexperience/eufemia/commit/f683aa0f7fc79959f4a026e1ec4dbd7cd029052d)), closes [#3566](https://github.com/dnbexperience/eufemia/issues/3566)
* **forms:** add filterData prop to Visibility component ([#3574](https://github.com/dnbexperience/eufemia/issues/3574)) ([447eaec](https://github.com/dnbexperience/eufemia/commit/447eaec4d8b2eb67d0ab08886d708a9bc4a7f2ae)), closes [#3572](https://github.com/dnbexperience/eufemia/issues/3572)
* **forms:** add hasFieldError to useError ([#3586](https://github.com/dnbexperience/eufemia/issues/3586)) ([1edef36](https://github.com/dnbexperience/eufemia/commit/1edef36a180be7508a3b3eccbd451254ea6ec801))
* **forms:** add path based `filterData` support ([#3576](https://github.com/dnbexperience/eufemia/issues/3576)) ([467b744](https://github.com/dnbexperience/eufemia/commit/467b744837b2d33c8856fa7938113139e974bbbc)), closes [#3574](https://github.com/dnbexperience/eufemia/issues/3574)
* **forms:** change `filterData` method to return object based parameters `{ path, value, data, props, internal }` ([#3577](https://github.com/dnbexperience/eufemia/issues/3577)) ([05106ac](https://github.com/dnbexperience/eufemia/commit/05106ac9b397cc62d5689c6787eb0e167037670a)), closes [#3576](https://github.com/dnbexperience/eufemia/issues/3576)
* **StepIndicator:** preliminary sbanken colors ([#3580](https://github.com/dnbexperience/eufemia/issues/3580)) ([733be8c](https://github.com/dnbexperience/eufemia/commit/733be8c7d5a23d0c579db30cf19bceb4c2042b21))
* **Visibility:** deprecate `pathValue` in favour of `visibleWhen` ([#3572](https://github.com/dnbexperience/eufemia/issues/3572)) ([277d15c](https://github.com/dnbexperience/eufemia/commit/277d15c4b33b007130b0e3335aa737ed0635e0e1))

## [10.31.0](https://github.com/dnbexperience/eufemia/compare/v10.30.2...v10.31.0) (2024-05-15)


### :memo: Documentation

* **Checkbox:** update props to camelCase ([#3555](https://github.com/dnbexperience/eufemia/issues/3555)) ([22accc9](https://github.com/dnbexperience/eufemia/commit/22accc989bc3bb4cad692c86d4372e32be40945d))


### :bug: Bug Fixes

* **Drawer:** prevent `auto-focus` from triggering in inital mount when `openState` is `false` ([#3534](https://github.com/dnbexperience/eufemia/issues/3534)) ([07c741f](https://github.com/dnbexperience/eufemia/commit/07c741f826cbb300f63048f3de788d82f56e93aa))
* **forms:** keep field props in memory during Wizard step change ([#3553](https://github.com/dnbexperience/eufemia/issues/3553)) ([02329dd](https://github.com/dnbexperience/eufemia/commit/02329dd34d5fc7ba84fce8a85d2e79acfdafe322))
* **HeightAnimation:** set width during height calculation ([#3557](https://github.com/dnbexperience/eufemia/issues/3557)) ([8e59eaf](https://github.com/dnbexperience/eufemia/commit/8e59eaf3a6aa64603d4c73a68f7cdad00087390f))


### :sparkles: Features

* **Checkbox:** add indeterminate state ([#3515](https://github.com/dnbexperience/eufemia/issues/3515)) ([d1ba274](https://github.com/dnbexperience/eufemia/commit/d1ba274338ca46ae4ae40be6af5f695e59889f13))
* **forms:** add `required` prop to Wizard.Step ([#3556](https://github.com/dnbexperience/eufemia/issues/3556)) ([fbb47e4](https://github.com/dnbexperience/eufemia/commit/fbb47e40383539257fb6af77003797c3c9238f05))
* **forms:** add Field.Indeterminate ([#3513](https://github.com/dnbexperience/eufemia/issues/3513)) ([7e84a11](https://github.com/dnbexperience/eufemia/commit/7e84a11aa0cda6c1187b3aa29c14e6a876ad2686))

## [10.30.2](https://github.com/dnbexperience/eufemia/compare/v10.30.1...v10.30.2) (2024-05-10)


### :bug: Bug Fixes

* **forms:** fix wrong TypeScript JSX return type ([#3550](https://github.com/dnbexperience/eufemia/issues/3550)) ([bdd68aa](https://github.com/dnbexperience/eufemia/commit/bdd68aacfa23bcaf89431a76e0952e892237f1a3))

## [10.30.1](https://github.com/dnbexperience/eufemia/compare/v10.30.0...v10.30.1) (2024-05-10)


### :memo: Documentation

* **Portal:** updates css import documentation ([#3542](https://github.com/dnbexperience/eufemia/issues/3542)) ([0b80110](https://github.com/dnbexperience/eufemia/commit/0b801103d40b4e6c43ea3270dfdb7914ebc9d7da))


### :bug: Bug Fixes

* **Checkbox:** fix types issues ([#3540](https://github.com/dnbexperience/eufemia/issues/3540)) ([ed7b1cd](https://github.com/dnbexperience/eufemia/commit/ed7b1cd3f5a3c5012f18dbc16994102bcc8c5466))
* **Flex.Stack:** align Button to not stretch ([#3544](https://github.com/dnbexperience/eufemia/issues/3544)) ([931d80e](https://github.com/dnbexperience/eufemia/commit/931d80e438f66a988ce9de7457d943c01952f018))
* **forms:** add `filterData` support to Visibility ([#3543](https://github.com/dnbexperience/eufemia/issues/3543)) ([7ee3f25](https://github.com/dnbexperience/eufemia/commit/7ee3f259c89007d3756c28b8f7e132c93232a16a))
* **forms:** make id of Wizard location hooks optional ([#3545](https://github.com/dnbexperience/eufemia/issues/3545)) ([91f1026](https://github.com/dnbexperience/eufemia/commit/91f102649a65f30f98e6e8a7e94e317e91efd24b))
* **forms:** warn when Value component should be wrapped within Value.SummaryList ([#3547](https://github.com/dnbexperience/eufemia/issues/3547)) ([7691eb9](https://github.com/dnbexperience/eufemia/commit/7691eb99889f30baa614e9a732624e828314f15e))
* **HeightAnimation:** overcome flickering issue due to false height pre-calculation ([#3546](https://github.com/dnbexperience/eufemia/issues/3546)) ([62c08a3](https://github.com/dnbexperience/eufemia/commit/62c08a30b13faa6d4fc56d5fa9f776066540af89))

## [10.30.0](https://github.com/dnbexperience/eufemia/compare/v10.29.0...v10.30.0) (2024-05-08)


### :bug: Bug Fixes

* **Eufemia:** enhance CSS version check for dnb-core-style ([#3522](https://github.com/dnbexperience/eufemia/issues/3522)) ([eac2bcf](https://github.com/dnbexperience/eufemia/commit/eac2bcf6f0296d3b44277332847d0bb589627fff))


### :sparkles: Features

* **forms:** add `fieldPropsWhenHidden` to Visibility ([#3539](https://github.com/dnbexperience/eufemia/issues/3539)) ([5d8d6db](https://github.com/dnbexperience/eufemia/commit/5d8d6dba4c0c6b3e85b8b03a6a563d8384e20c08))
* **forms:** add `Form.FieldProps` provider to forward a certain props to all fields ([#3536](https://github.com/dnbexperience/eufemia/issues/3536)) ([0f875bd](https://github.com/dnbexperience/eufemia/commit/0f875bdc722f929d609956c75cac3eea82eae5bf))
* **forms:** add `locale`, `translations`, `required` and `disabled` prop support to `Form.Handler` ([#3537](https://github.com/dnbexperience/eufemia/issues/3537)) ([b95f215](https://github.com/dnbexperience/eufemia/commit/b95f215823f781a13f3ca468f635fa27104fdfee))

## [10.29.0](https://github.com/dnbexperience/eufemia/compare/v10.28.0...v10.29.0) (2024-05-07)


### :memo: Documentation

* **InputMasked:** fix import path of MultiInputMask ([#3469](https://github.com/dnbexperience/eufemia/issues/3469)) ([b678412](https://github.com/dnbexperience/eufemia/commit/b678412efc9552d66d8068bb136818a3334e9753))


### :sparkles: Features

* **forms:** add `autocomplete` variant to Field.Selection with `autocompleteProps` support ([#3521](https://github.com/dnbexperience/eufemia/issues/3521)) ([f79dd16](https://github.com/dnbexperience/eufemia/commit/f79dd16fb28015e27893e3f952188b5bd06f4f4d))
* **forms:** add `Field.Name` and `Value.Name` ([#3528](https://github.com/dnbexperience/eufemia/issues/3528)) ([84fcce1](https://github.com/dnbexperience/eufemia/commit/84fcce1d93e448b79b8106f7590dc6cdacaa3287)), closes [#3529](https://github.com/dnbexperience/eufemia/issues/3529)
* **forms:** add `transformIn` and `transformOut` to Form.Handler ([#3511](https://github.com/dnbexperience/eufemia/issues/3511)) ([48959b2](https://github.com/dnbexperience/eufemia/commit/48959b2b45d1f1ba1cfed6ccae4c9f1c5ab399bd))
* **forms:** add `Value.OrganizationNumber` ([#3525](https://github.com/dnbexperience/eufemia/issues/3525)) ([46ff116](https://github.com/dnbexperience/eufemia/commit/46ff1162696b23d184f6d3d189d92b062b78b11b))
* **forms:** add `Value.PostalCodeAndCity` ([#3527](https://github.com/dnbexperience/eufemia/issues/3527)) ([adb4cf5](https://github.com/dnbexperience/eufemia/commit/adb4cf59303ae6f1564acd80596d7c4d43c41771))
* **forms:** add Wizard transition animation ([#3517](https://github.com/dnbexperience/eufemia/issues/3517)) ([c42dab7](https://github.com/dnbexperience/eufemia/commit/c42dab747952946ee394539384b71af6dedec34e))
* **forms:** debounce session data storing to enhance performance ([#3508](https://github.com/dnbexperience/eufemia/issues/3508)) ([6aeaa96](https://github.com/dnbexperience/eufemia/commit/6aeaa96c4c982f1408fbb400269937209e57a98d))
* **forms:** rename Form.Handler property `filterData` to `filterSubmitData` (deprecate) ([#3507](https://github.com/dnbexperience/eufemia/issues/3507)) ([b7aa69b](https://github.com/dnbexperience/eufemia/commit/b7aa69b94c257dfd849bb6d3b0e201d4f952b1ec))
* **ProgressIndicator:** add `countdown` type, center label, and customization options ([#3487](https://github.com/dnbexperience/eufemia/issues/3487)) ([c29be5e](https://github.com/dnbexperience/eufemia/commit/c29be5ebc0638e419c3fe62f345b648df688e60b))


### :bug: Bug Fixes

* **forms:** (TypeScript) ensure `data` type is inherited in onSubmit ([#3530](https://github.com/dnbexperience/eufemia/issues/3530)) ([a5e63ad](https://github.com/dnbexperience/eufemia/commit/a5e63ad0df8b81b248372674d825fe0118d9e548))
* **forms:** align form error when Wizard Sidebar is visible ([#3518](https://github.com/dnbexperience/eufemia/issues/3518)) ([bb6feab](https://github.com/dnbexperience/eufemia/commit/bb6feab96438a82aaae68528a1c5ba8572ec0529))
* **forms:** enhance Radio buttons disabled state handling ([#3533](https://github.com/dnbexperience/eufemia/issues/3533)) ([1932143](https://github.com/dnbexperience/eufemia/commit/1932143c7a985033dca79cfca66a6926b8d254a7))
* **forms:** ensure inline values don't show labels ([#3529](https://github.com/dnbexperience/eufemia/issues/3529)) ([b4dff2b](https://github.com/dnbexperience/eufemia/commit/b4dff2bc032963df17b2e88e6261e42ae8160bdd))
* **forms:** fix spacing between checkboxes when in horizontal layout with vertical options ([#3531](https://github.com/dnbexperience/eufemia/issues/3531)) ([193d94f](https://github.com/dnbexperience/eufemia/commit/193d94f5e77f57c824425df9f1ea12ed9c32c0cf))
* **HeightAnimation:** ensure Radio buttons persist their state ([#3535](https://github.com/dnbexperience/eufemia/issues/3535)) ([3e78976](https://github.com/dnbexperience/eufemia/commit/3e78976b496348d3b745cd070270f3faa4cae4e9))
* **Locale:** revert to less strict local types (`string`) ([#3526](https://github.com/dnbexperience/eufemia/issues/3526)) ([aa79867](https://github.com/dnbexperience/eufemia/commit/aa79867c4bcd98be02bf776d56509b5e47c72ed1))

## [10.28.0](https://github.com/dnbexperience/eufemia/compare/v10.27.0...v10.28.0) (2024-04-29)


### :memo: Documentation

* **contribution guide:** update title and move sandbox starter ([#3489](https://github.com/dnbexperience/eufemia/issues/3489)) ([efdf710](https://github.com/dnbexperience/eufemia/commit/efdf7100a6f2e94cd82fdc47df4450af7476435b))


### :bug: Bug Fixes

* **Anchor:** icon position when line-height increased by another element ([#3470](https://github.com/dnbexperience/eufemia/issues/3470)) ([bf24102](https://github.com/dnbexperience/eufemia/commit/bf2410298e2dfa482ea0e12bc54bcf88843c72ac))
* **forms:** iterate EditContainer error switch ([#3503](https://github.com/dnbexperience/eufemia/issues/3503)) ([366a662](https://github.com/dnbexperience/eufemia/commit/366a66292f8af08b694b3c31871b6c527f0eaa35))


### :sparkles: Features

* **Checkbox:** refactor to TypeScript ([#3443](https://github.com/dnbexperience/eufemia/issues/3443)) ([3487cd6](https://github.com/dnbexperience/eufemia/commit/3487cd60b46207a99d11609a7a2a23daacfd9f0d))
* **forms:** add `getValue` method to useData and getData ([#3502](https://github.com/dnbexperience/eufemia/issues/3502)) ([d5887c3](https://github.com/dnbexperience/eufemia/commit/d5887c33c1180892a2a9342b36f5424875e60b6b))
* **PaymentCard:** add sbanken cards ([#3473](https://github.com/dnbexperience/eufemia/issues/3473)) ([1a8c769](https://github.com/dnbexperience/eufemia/commit/1a8c7694ab6bdefe949e3e6e54f35c6cc0e746e7))

## [10.27.0](https://github.com/dnbexperience/eufemia/compare/v10.26.0...v10.27.0) (2024-04-26)


### :bug: Bug Fixes

* **Card:** ensure 100% width does only apply when ScrollView is used ([#3450](https://github.com/dnbexperience/eufemia/issues/3450)) ([6dac9c6](https://github.com/dnbexperience/eufemia/commit/6dac9c686d0ce9a01b15b00f44cf3b574ace1710))
* **Card:** use basis inner-space for small screens when `responsive=false` is set ([#3455](https://github.com/dnbexperience/eufemia/issues/3455)) ([9a2baea](https://github.com/dnbexperience/eufemia/commit/9a2baead0753649e30ab0c5eff97ffa402639a91))
* **FormLabel:** remove undeclared `FormLabelText` type ([#3449](https://github.com/dnbexperience/eufemia/issues/3449)) ([3e4782b](https://github.com/dnbexperience/eufemia/commit/3e4782b4b27b3ca8090be4bce03c36db53de17c8))
* **forms:** change Wizard default scroll behaviour to be active ([#3481](https://github.com/dnbexperience/eufemia/issues/3481)) ([f7b11cc](https://github.com/dnbexperience/eufemia/commit/f7b11cca7837f250f79b3f549bf9d50218818f01))
* **forms:** ensure proper `Iterate` data context and `filterData` support ([#3463](https://github.com/dnbexperience/eufemia/issues/3463)) ([d015bc8](https://github.com/dnbexperience/eufemia/commit/d015bc8fa28b00a5914780ef68bb4915a9cfceee))
* **forms:** set focus on Wizard step change ([#3475](https://github.com/dnbexperience/eufemia/issues/3475)) ([265dade](https://github.com/dnbexperience/eufemia/commit/265dadef1a5ff9a496adf5c77c2fcfbcf1581a9c))
* **GlobalStatus:** Symmetric horizontal padding on smaller screens (Sbanken) ([#3454](https://github.com/dnbexperience/eufemia/issues/3454)) ([59576b2](https://github.com/dnbexperience/eufemia/commit/59576b2e359978cd0e8c859de233a1fa4360697c))
* **Input:** hide placeholder by default on input focus (Sbanken) ([#3461](https://github.com/dnbexperience/eufemia/issues/3461)) ([5328210](https://github.com/dnbexperience/eufemia/commit/532821088b821f56669b7875983a9539171e6edb))
* **MultiInputMask:** prevent focus and blur from firing when navigating between inputs ([#3480](https://github.com/dnbexperience/eufemia/issues/3480)) ([bec1ffd](https://github.com/dnbexperience/eufemia/commit/bec1ffd247db1535b57b9eb8f48285f34ded475c))
* **NumberFormat:** ensure support for screen reader "speak text under mouse" mode ([#3438](https://github.com/dnbexperience/eufemia/issues/3438)) ([93fbd1d](https://github.com/dnbexperience/eufemia/commit/93fbd1d576165d3b18a91d770a0ddd5ff391d57e))
* **OrganizationNumber:** add missing full stop for `en-US` error messages ([#3465](https://github.com/dnbexperience/eufemia/issues/3465)) ([fd1cf10](https://github.com/dnbexperience/eufemia/commit/fd1cf10962d51a20d413f8daa881dc5bd94561a4))
* **Radio.Group:** replace margin spacing with Flex gap ([#3468](https://github.com/dnbexperience/eufemia/issues/3468)) ([33257b2](https://github.com/dnbexperience/eufemia/commit/33257b2996ef9f176f5adcc0506a51130838d1c9))
* **Selection:** filter out empty options from dropdown variant ([#3444](https://github.com/dnbexperience/eufemia/issues/3444)) ([60ac548](https://github.com/dnbexperience/eufemia/commit/60ac548ed25ea67793d611a8ff9b86b7c932c89d))


### :memo: Documentation

* **Checkbox:** update to typed docs ([#3439](https://github.com/dnbexperience/eufemia/issues/3439)) ([c849439](https://github.com/dnbexperience/eufemia/commit/c849439b11a0b4e8ecb025a2aa8e55ec0d06ecf2))
* document all colors ([#3441](https://github.com/dnbexperience/eufemia/issues/3441)) ([03d7580](https://github.com/dnbexperience/eufemia/commit/03d7580bed42f61d5613129b10b722059ff7be14))
* **forms:** improve structure ([#3488](https://github.com/dnbexperience/eufemia/issues/3488)) ([a240239](https://github.com/dnbexperience/eufemia/commit/a240239b824d8b908048e84a1e4d310765934713))
* **Portal:** properties table with colors and default value (progressive enhancement) ([#3471](https://github.com/dnbexperience/eufemia/issues/3471)) ([4f1c16c](https://github.com/dnbexperience/eufemia/commit/4f1c16c331ff027e25731599993839654bbefefe))


### :sparkles: Features

* **Flex.Stack:** change default vertical spacing (gap) from small to medium (effects Card with stack as well) ([#3483](https://github.com/dnbexperience/eufemia/issues/3483)) ([7bf380f](https://github.com/dnbexperience/eufemia/commit/7bf380fc15229a6314ca0cdd145e18fd1f6ef8fc))
* **FormLabel:** add support for nested instances ([#3466](https://github.com/dnbexperience/eufemia/issues/3466)) ([f0cd388](https://github.com/dnbexperience/eufemia/commit/f0cd388541a51a1433f0fa3e7ca82db825d5c0cc))
* **forms:** add `Iterate.Count` along with `Iterate.useCount` ([#3492](https://github.com/dnbexperience/eufemia/issues/3492)) ([f1574a2](https://github.com/dnbexperience/eufemia/commit/f1574a2be93c8789f2e03c3b56f48027bd615631))
* **forms:** add `Iterate` view and edit container as well as animated container ([#3474](https://github.com/dnbexperience/eufemia/issues/3474)) ([6b68020](https://github.com/dnbexperience/eufemia/commit/6b680201952123ca241a07249de4c25b13585c1b))
* **forms:** add `useValueProps` hook for handling Value components and their props ([#3498](https://github.com/dnbexperience/eufemia/issues/3498)) ([1a62545](https://github.com/dnbexperience/eufemia/commit/1a62545bd585289438d9373b85342ff8f93759bc))
* **forms:** add `Value.Composition` component ([#3494](https://github.com/dnbexperience/eufemia/issues/3494)) ([b7976ca](https://github.com/dnbexperience/eufemia/commit/b7976ca38d47629d6df6dbd56625398d7d4fbcdb))
* **forms:** add EditButton to Wizard ([#3445](https://github.com/dnbexperience/eufemia/issues/3445)) ([ec4a0a6](https://github.com/dnbexperience/eufemia/commit/ec4a0a6b7cfa7caa32a201c378978041092efda8))
* **forms:** add send variant prop to SubmitButton ([#3446](https://github.com/dnbexperience/eufemia/issues/3446)) ([17bea62](https://github.com/dnbexperience/eufemia/commit/17bea62e460e23102cd3667d88b45dc4526188bb))
* **forms:** add support for GlobalStatus handling including custom `globalStatusId` ([#3457](https://github.com/dnbexperience/eufemia/issues/3457)) ([3fd0b96](https://github.com/dnbexperience/eufemia/commit/3fd0b968323524d34be81d317f28dc86c3421d2f))
* **forms:** release stable version ([#3043](https://github.com/dnbexperience/eufemia/issues/3043)) ([03b89b2](https://github.com/dnbexperience/eufemia/commit/03b89b27bcd93e3135ec348b8a65e9a86ff2412d))
* **forms:** rename useLocale to useTranslation ([#3447](https://github.com/dnbexperience/eufemia/issues/3447)) ([c223e0e](https://github.com/dnbexperience/eufemia/commit/c223e0e3a5eb3e311e72be3d18efe64fcad29e99))
* **Hr:** change color from black-80 to black-8 and add `dashed` line option ([#3490](https://github.com/dnbexperience/eufemia/issues/3490)) ([8142182](https://github.com/dnbexperience/eufemia/commit/8142182332852534a55aa83f63ccd2703bf3c1f6))
* **Input & Textarea:** allow React Element as placeholder prop ([#3467](https://github.com/dnbexperience/eufemia/issues/3467)) ([2bbd24b](https://github.com/dnbexperience/eufemia/commit/2bbd24bb4f8fe797c03f1a8b905e3ae84b9605f8))
* **Input:** refactor and correct border outline ([#3440](https://github.com/dnbexperience/eufemia/issues/3440)) ([6a96665](https://github.com/dnbexperience/eufemia/commit/6a9666504a1c49292b72096f93bfa8e7832fb4e7))
* **Iterate:** deprecate `ArrayPushButton` in favor of `PushButton` and deprecate `ArrayRemoveElementButton` in favor of `RemoveButton` ([#3478](https://github.com/dnbexperience/eufemia/issues/3478)) ([e5145d4](https://github.com/dnbexperience/eufemia/commit/e5145d4e7edb9d562382fe0dbfb25040095692f5))
* **ProgressIndicator:** refactor to TypeScript and camelCase props ([#3458](https://github.com/dnbexperience/eufemia/issues/3458)) ([4fa895f](https://github.com/dnbexperience/eufemia/commit/4fa895fae01b5195a0edc0c662dcb726d39d9b97))
* **Tabs:** add `breakout` prop for Tabs ([#3384](https://github.com/dnbexperience/eufemia/issues/3384)) ([48882cb](https://github.com/dnbexperience/eufemia/commit/48882cbfe52f0f4e9cbeaf5a93d2f10af9608e32))
* **Typography:** Replace inline font with font files (Sbanken) ([#3459](https://github.com/dnbexperience/eufemia/issues/3459)) ([97d060d](https://github.com/dnbexperience/eufemia/commit/97d060da305c2b5265dc8f489309e06bec80e4cb))
* **useTranslation:** add support for custom translations and `formatMessage` method ([#3442](https://github.com/dnbexperience/eufemia/issues/3442)) ([d3c4ec4](https://github.com/dnbexperience/eufemia/commit/d3c4ec49e1f89fdd0e49399bcd92fc8e07b8c14f)), closes [#3271](https://github.com/dnbexperience/eufemia/issues/3271)
* **Visibility:** add `keepInDOM` prop ([#3495](https://github.com/dnbexperience/eufemia/issues/3495)) ([b750588](https://github.com/dnbexperience/eufemia/commit/b7505886a88ca1fc4607f3cde10443b8c07a1d6d))

## [10.26.0](https://github.com/dnbexperience/eufemia/compare/v10.25.0...v10.26.0) (2024-04-05)


### :sparkles: Features

* **forms:** add `Field.Composition` to combine fields instead of using FieldBlock ([#3418](https://github.com/dnbexperience/eufemia/issues/3418)) ([c0607e1](https://github.com/dnbexperience/eufemia/commit/c0607e193e57e597c5cab7984118f9a6e7a47d34))
* **forms:** add `transformIn` and `transformOut` to fields for value transformation ([#3428](https://github.com/dnbexperience/eufemia/issues/3428)) ([f07aee7](https://github.com/dnbexperience/eufemia/commit/f07aee79381e09c6dc5b24d091658fe8ee589c62))
* **forms:** add max width to Card when used in forms ([#3416](https://github.com/dnbexperience/eufemia/issues/3416)) ([28e89c8](https://github.com/dnbexperience/eufemia/commit/28e89c8cda9962a44e1034a93b2e27302cc77e29))
* **forms:** add router support ([#3427](https://github.com/dnbexperience/eufemia/issues/3427)) ([8b9a20a](https://github.com/dnbexperience/eufemia/commit/8b9a20a3ccd4fbe768fb4de3fc78f706a304cd57))
* **forms:** group from translations by components and add `useLocale` hook ([#3332](https://github.com/dnbexperience/eufemia/issues/3332)) ([9bc9ee2](https://github.com/dnbexperience/eufemia/commit/9bc9ee27671feb5b859700bfa66ed17b590e546c))
* **forms:** make `Wizard.Buttons` interactive (use it in favor of NextButton and PreviousButton) ([#3437](https://github.com/dnbexperience/eufemia/issues/3437)) ([5967a6d](https://github.com/dnbexperience/eufemia/commit/5967a6dbf8b3605469917aa1fa5de73a93f3b452))
* **forms:** refactor API from StepsLayout to Steps.Layout ([#3426](https://github.com/dnbexperience/eufemia/issues/3426)) ([9bb72e7](https://github.com/dnbexperience/eufemia/commit/9bb72e749d05c0b4e5112256a0a8d91085f396d0))
* **forms:** refactor API from StepsLayout to Wizard.Container ([#3433](https://github.com/dnbexperience/eufemia/issues/3433)) ([1f0184d](https://github.com/dnbexperience/eufemia/commit/1f0184d82ccf81907aafa4c8313a31197eeeea6b)), closes [/github.com/dnbexperience/eufemia/pull/3426#issuecomment-2034150647](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/3426/issues/issuecomment-2034150647) [#3426](https://github.com/dnbexperience/eufemia/issues/3426)


### :memo: Documentation

* enhance breakpoints and media query docs ([#3435](https://github.com/dnbexperience/eufemia/issues/3435)) ([aea624f](https://github.com/dnbexperience/eufemia/commit/aea624fffac917e59faca219c880a77d6a47a518))


### :bug: Bug Fixes

* **Autocomplete:** use current value to filter changed data ([#3407](https://github.com/dnbexperience/eufemia/issues/3407)) ([7a778c7](https://github.com/dnbexperience/eufemia/commit/7a778c7f25dfdf31c85ff60b94fe243d25974939)), closes [#3355](https://github.com/dnbexperience/eufemia/issues/3355)
* **Card:** ensure "spacing" children do stretch by default ([#3422](https://github.com/dnbexperience/eufemia/issues/3422)) ([c0259bc](https://github.com/dnbexperience/eufemia/commit/c0259bc7b9fcb9161c12a176e2108a5a10d9084b))
* **forms:** add pattern requirement for city in PostalCodeAndCity ([#3431](https://github.com/dnbexperience/eufemia/issues/3431)) ([080bbee](https://github.com/dnbexperience/eufemia/commit/080bbee2e5cf58860b389423712544895d6da0d4))
* **forms:** align locale strings and translations ([#3429](https://github.com/dnbexperience/eufemia/issues/3429)) ([369bed0](https://github.com/dnbexperience/eufemia/commit/369bed0136f2fae06aa5398d84a3113602e771db))
* **InputMasked:** ensure decimal value update does format correctly  ([#3420](https://github.com/dnbexperience/eufemia/issues/3420)) ([335a86b](https://github.com/dnbexperience/eufemia/commit/335a86be803bc4fc8de0bcc5215d5cc74553fc6d))
* **Table:** ensure tables with one td align the th width ([#3430](https://github.com/dnbexperience/eufemia/issues/3430)) ([3e5ee98](https://github.com/dnbexperience/eufemia/commit/3e5ee987d9e65aae1b237f2d16d67ff75b41234c))
* **Textarea:** forward all props via provider (including `autoresize`) ([#3436](https://github.com/dnbexperience/eufemia/issues/3436)) ([a9260fd](https://github.com/dnbexperience/eufemia/commit/a9260fd41ba9752f87aca914f0804573a215eed9))
* **TextCounter:** update text/translation for when limit exceeded ([#3434](https://github.com/dnbexperience/eufemia/issues/3434)) ([8b881f3](https://github.com/dnbexperience/eufemia/commit/8b881f32969a66fd176dcb29e7d1a42f639c23f0))
* **useStep:** fix possibly undefined type message ([#3415](https://github.com/dnbexperience/eufemia/issues/3415)) ([95ab0b1](https://github.com/dnbexperience/eufemia/commit/95ab0b1b1a7723613f5e486ae5d778026e9282fa))

## [10.25.0](https://github.com/dnbexperience/eufemia/compare/v10.24.0...v10.25.0) (2024-03-25)


### :bug: Bug Fixes

* **forms:** ensure content in Card will wrap ([#3411](https://github.com/dnbexperience/eufemia/issues/3411)) ([47eb967](https://github.com/dnbexperience/eufemia/commit/47eb967f6c9e5c50da161f7e3e3ad99cc7a145ba))
* **forms:** ensure context support ([#3409](https://github.com/dnbexperience/eufemia/issues/3409)) ([34b4adb](https://github.com/dnbexperience/eufemia/commit/34b4adb106f79d8b60d684d964feef7ed5789968))
* show error in console when Eufemia CSS and JS versions do not match ([#3410](https://github.com/dnbexperience/eufemia/issues/3410)) ([3d7bcbf](https://github.com/dnbexperience/eufemia/commit/3d7bcbf4f86e249db41e0249df16e04bac04777a))


### :sparkles: Features

* **Accordion:** add additional Sbanken styling variables ([#3406](https://github.com/dnbexperience/eufemia/issues/3406)) ([dfa8479](https://github.com/dnbexperience/eufemia/commit/dfa8479a94f3e64aa9fbcee9e7192aad38ecc36d))
* **Form.Handler:** enhance async behaviour ([#3405](https://github.com/dnbexperience/eufemia/issues/3405)) ([78b4895](https://github.com/dnbexperience/eufemia/commit/78b4895922fe5b68da7c9c20a700b6be857303aa))
* **forms:** add internal field state to `filterData` as a fourth parameter ([#3414](https://github.com/dnbexperience/eufemia/issues/3414)) ([4a6a1ae](https://github.com/dnbexperience/eufemia/commit/4a6a1ae7721439dd7a22ca29289148c7703ff811))
* **Theme:** update sbanken theme color variables ([#3400](https://github.com/dnbexperience/eufemia/issues/3400)) ([05607cf](https://github.com/dnbexperience/eufemia/commit/05607cffa8a1a1651000bcbf7c05a78fca62495b))

## [10.24.0](https://github.com/dnbexperience/eufemia/compare/v10.23.0...v10.24.0) (2024-03-22)


### :bug: Bug Fixes

* **Accordion:** Sbanken theme tweaks ([#3399](https://github.com/dnbexperience/eufemia/issues/3399)) ([68da48b](https://github.com/dnbexperience/eufemia/commit/68da48bd37f582e1e925116e1c61ee4650c04f29))
* **ToggleButton:** use 25% of the color when checked and disabled ([#3402](https://github.com/dnbexperience/eufemia/issues/3402)) ([3886802](https://github.com/dnbexperience/eufemia/commit/3886802c33a57b4f1abaef1b9929c7ea4113cb48))


### :sparkles: Features

* **Anchor:** use inline icon ([#3387](https://github.com/dnbexperience/eufemia/issues/3387)) ([6c2860a](https://github.com/dnbexperience/eufemia/commit/6c2860a73e507da1d98138e586794044756e2e12))
* **forms:** add support for `errorMessage` inside a schema (JSONSchema4) ([#3398](https://github.com/dnbexperience/eufemia/issues/3398)) ([310ec4e](https://github.com/dnbexperience/eufemia/commit/310ec4e0a9ed91cd10920d139ab2eae46e2a7b1f))
* **StepsLayout:** add hook useSteps to handle the state outside of the form ([affb110](https://github.com/dnbexperience/eufemia/commit/affb1106e68c300461f20d4c3f6a6b844ec3eded))
* **StepsLayout:** support `StepsLayout.Step` to be in its own component ([80d8424](https://github.com/dnbexperience/eufemia/commit/80d842431f6e9893a32a758bcf09550f2f2ff868))
* **Table:** add support for scope="row" with odd/even background color ([#3397](https://github.com/dnbexperience/eufemia/issues/3397)) ([2dc9e3d](https://github.com/dnbexperience/eufemia/commit/2dc9e3d5e926f047293022776642ec7887338944))
* **Textarea:** add keepPlaceholder prop ([#3396](https://github.com/dnbexperience/eufemia/issues/3396)) ([6d55d2a](https://github.com/dnbexperience/eufemia/commit/6d55d2a2ddc5f5e333f18113411ebe5e07d55eca)), closes [#3395](https://github.com/dnbexperience/eufemia/issues/3395)
* **Textarea:** add several sizes and change default size to small + add a custom resize gfx ([#3395](https://github.com/dnbexperience/eufemia/issues/3395)) ([0071bbb](https://github.com/dnbexperience/eufemia/commit/0071bbb0fc1b7a7682702fbf67c4db4b3d928d51))

## [10.23.0](https://github.com/dnbexperience/eufemia/compare/v10.22.0...v10.23.0) (2024-03-19)


### :memo: Documentation

* **a11y:** add additions related to forms and best practices ([#3385](https://github.com/dnbexperience/eufemia/issues/3385)) ([416bc21](https://github.com/dnbexperience/eufemia/commit/416bc219f96fc092853fec8becd900e4d9c5b703))
* **Field.Number:** add info about accessibility regarding step controls ([#3369](https://github.com/dnbexperience/eufemia/issues/3369)) ([9ee99dd](https://github.com/dnbexperience/eufemia/commit/9ee99dda8a9581d69cbf24b242c589a3e475bb1f))
* **forms:** list all sub-components and API in extended features ([#3382](https://github.com/dnbexperience/eufemia/issues/3382)) ([938bf88](https://github.com/dnbexperience/eufemia/commit/938bf88da304f8cb7ea9979c4e7653765c443b7a))
* minor spelling improvements ([#3361](https://github.com/dnbexperience/eufemia/issues/3361)) ([8ab1a92](https://github.com/dnbexperience/eufemia/commit/8ab1a922a0a755419ad8c2ff47fd594456f4f5c4))


### :bug: Bug Fixes

* **Field.Selection:** add error styling to `button` and `radio` variant ([#3389](https://github.com/dnbexperience/eufemia/issues/3389)) ([b8093c3](https://github.com/dnbexperience/eufemia/commit/b8093c3fe6f6a72ff16376cb5af162ed13c203cc))
* **PhoneNumber:** fix `must be string` message ([#3362](https://github.com/dnbexperience/eufemia/issues/3362)) ([c92d061](https://github.com/dnbexperience/eufemia/commit/c92d061fcc8b62d85dd0ef4235e9d6d9da55bdfe))
* **Table:** fix type error when using array of elements ([#3372](https://github.com/dnbexperience/eufemia/issues/3372)) ([a4d3126](https://github.com/dnbexperience/eufemia/commit/a4d312653005eec1fbaef32c1221462f75da3a38))
* **Tag:** delete and backspace key press for removable tag ([#3375](https://github.com/dnbexperience/eufemia/issues/3375)) ([96e6bbf](https://github.com/dnbexperience/eufemia/commit/96e6bbf6396ef9727aed5fbe173677c33aefed81))


### :sparkles: Features

* **Anchor:** Sbanken style based on icon ([#3377](https://github.com/dnbexperience/eufemia/issues/3377)) ([7cf88a3](https://github.com/dnbexperience/eufemia/commit/7cf88a3cd1cc92badca8541ede2435bb451086d9))
* **Breadcrumb:** implement new styles and swap out Button with Anchor for the DNB UI ([#3368](https://github.com/dnbexperience/eufemia/issues/3368)) ([c182230](https://github.com/dnbexperience/eufemia/commit/c18223052e1cb92e25c088afb2e1a850aadfb66b))
* **Button:** refactor button css ([#3359](https://github.com/dnbexperience/eufemia/issues/3359)) ([78258c9](https://github.com/dnbexperience/eufemia/commit/78258c91ca408e78e3da3c6a63728c0c1828334f))
* **Card:** add `filled`, `responsive` and `title` props to support a Table and a ScrollView as a child ([#3380](https://github.com/dnbexperience/eufemia/issues/3380)) ([0a419cc](https://github.com/dnbexperience/eufemia/commit/0a419cc085921c20a18efab6e153b004d5d0fa57))
* **DatePicker:** Add partial dates ([#3346](https://github.com/dnbexperience/eufemia/issues/3346)) ([0f6a7d5](https://github.com/dnbexperience/eufemia/commit/0f6a7d55dd6981418d769d3b5f6b0fcf2d854b21))
* **debounce:** enhance TypeScript support by returning the given function type ([#3379](https://github.com/dnbexperience/eufemia/issues/3379)) ([d689f09](https://github.com/dnbexperience/eufemia/commit/d689f0927a70b2f4aeaefe780d4a669c0937a859))
* **debounce:** return async function if one was given as the input ([#3366](https://github.com/dnbexperience/eufemia/issues/3366)) ([00cd860](https://github.com/dnbexperience/eufemia/commit/00cd860726830327e3cc52fe9f05e3faac839822))
* **Form.SubmitButton:** add submit indicator support ([#3370](https://github.com/dnbexperience/eufemia/issues/3370)) ([5f3101d](https://github.com/dnbexperience/eufemia/commit/5f3101df3ad9ddfca6fb2c9b9785bf0614ed396e))
* **Form.SubmitIndicator:** add indicator for async operations ([#3367](https://github.com/dnbexperience/eufemia/issues/3367)) ([e32ea40](https://github.com/dnbexperience/eufemia/commit/e32ea408a896f9fa08c34219065c0a6c4edeb542))
* **forms:** implement support for async form submission and autosave feature ([c023c32](https://github.com/dnbexperience/eufemia/commit/c023c32aabc710b8fbcbbbf0db6a01b474bd4fed))
* **forms:** implement support for async form submission and autosave feature ([#3378](https://github.com/dnbexperience/eufemia/issues/3378)) ([5bfbe30](https://github.com/dnbexperience/eufemia/commit/5bfbe30d65f1d5a2acfdf4c2ec360050018ece97))
* **FormStatus:** remove hover color, so it does not change its color anymore ([#3351](https://github.com/dnbexperience/eufemia/issues/3351)) ([245f327](https://github.com/dnbexperience/eufemia/commit/245f327f5d3797817f1f9da30681ae77efef6916))
* **Radio, Checkbox:** enlarge bounding area (clickable/touchable area) ([#3352](https://github.com/dnbexperience/eufemia/issues/3352)) ([667726b](https://github.com/dnbexperience/eufemia/commit/667726bf7e357ada7cc52c194d7c4a5560a897da))
* show error in console when Eufemia CSS and JS versions do not match ([#3371](https://github.com/dnbexperience/eufemia/issues/3371)) ([a5ef0bd](https://github.com/dnbexperience/eufemia/commit/a5ef0bd158d3381cc7b34949820556efe5e5282a))
* **Tag:** add variants clickable, addable and removable (deprecate `onDelete`) ([#3364](https://github.com/dnbexperience/eufemia/issues/3364)) ([6131139](https://github.com/dnbexperience/eufemia/commit/61311390d29304e897b21849077bad8fa86f44bc))
* **useData:** enhance data update and sync logic ([a947ffa](https://github.com/dnbexperience/eufemia/commit/a947ffa660caeca789e08c1adf823d89d9f0506f))
* **useData:** support data handling without id when nested inside Form.Handler ([#3393](https://github.com/dnbexperience/eufemia/issues/3393)) ([4eecc5e](https://github.com/dnbexperience/eufemia/commit/4eecc5e7ce9421fa0c40d1aee1db10571f6cc112))
* **useError:** add support to use it without an id when nested inside Form.Handler ([#3394](https://github.com/dnbexperience/eufemia/issues/3394)) ([02b95d1](https://github.com/dnbexperience/eufemia/commit/02b95d127cf2c453804e7d708226c7ba04d74c96))
* **useFieldProps:** add support for data-attributes and replace `ariaAttributes` with `htmlAttributes` ([#3383](https://github.com/dnbexperience/eufemia/issues/3383)) ([55bb817](https://github.com/dnbexperience/eufemia/commit/55bb81736152f5bbfa48fdbbeac1152fea92198f))
* **useFieldProps:** rename useDataValue to useFieldProps ([#3381](https://github.com/dnbexperience/eufemia/issues/3381)) ([123a543](https://github.com/dnbexperience/eufemia/commit/123a54322cc61b74a8ba211896f47b59c8abcbe0))

## [10.22.0](https://github.com/dnbexperience/eufemia/compare/v10.21.0...v10.22.0) (2024-02-28)


### :memo: Documentation

* **GlobalStatus:** update number of statuses ([#3334](https://github.com/dnbexperience/eufemia/issues/3334)) ([092aa25](https://github.com/dnbexperience/eufemia/commit/092aa259f0d180c188f8035d0c88ed9185e51292))


### :bug: Bug Fixes

* **Blockquote:** Reduce padding-bottom for tablet and desktop (Sbanken) ([#3340](https://github.com/dnbexperience/eufemia/issues/3340)) ([af0d901](https://github.com/dnbexperience/eufemia/commit/af0d901fd0ef9c16370a3a180fce2e1a7b5f4b43))
* **Breadcrumb:** variant multiple no longer same as default ([#3345](https://github.com/dnbexperience/eufemia/issues/3345)) ([ac708e0](https://github.com/dnbexperience/eufemia/commit/ac708e0ad92b63bfad90daa7b4b9c3ff0f9fe0e1))
* **Card:** fix overflow/scroll issue on small screen widths ([#3341](https://github.com/dnbexperience/eufemia/issues/3341)) ([a0d4a10](https://github.com/dnbexperience/eufemia/commit/a0d4a101f3508a06d1badd7178be5aad57032fc4))
* **Form.ButtonRow:** add support for correct auto placement below a Card ([#3337](https://github.com/dnbexperience/eufemia/issues/3337)) ([ced0bd7](https://github.com/dnbexperience/eufemia/commit/ced0bd76e8f888c22e046a3888728f46f17fb6bd))
* **Form.useData:** add support for StrictMode ([#3348](https://github.com/dnbexperience/eufemia/issues/3348)) ([d905e54](https://github.com/dnbexperience/eufemia/commit/d905e54dab83b67a531de3d756e77a39c95ce810))
* **FormLabel:** align width to fit content instead of being stretched 100% on clickable labels ([#3338](https://github.com/dnbexperience/eufemia/issues/3338)) ([c7f1a4a](https://github.com/dnbexperience/eufemia/commit/c7f1a4a21a6d66540de4944a632797094fbea5dc))
* **HeightAnimation:** enhance calculation of height ([#3335](https://github.com/dnbexperience/eufemia/issues/3335)) ([e1a9859](https://github.com/dnbexperience/eufemia/commit/e1a98590a9278f9f7e7956f3865f315208a88de9))
* **ProgressIndicator:** align label spacing when size is `small` and use span instead of divs to support inline elements ([#3344](https://github.com/dnbexperience/eufemia/issues/3344)) ([196bc7f](https://github.com/dnbexperience/eufemia/commit/196bc7fae184c5a9177a38893556bbd23b2c3b48))


### :sparkles: Features

* **Button, Theme:** style on dark background ([#3339](https://github.com/dnbexperience/eufemia/issues/3339)) ([29e6549](https://github.com/dnbexperience/eufemia/commit/29e654922cb0faeed384ae363ef33b5031370d17))
* **debounceAsync:** add async debounce function support ([#3343](https://github.com/dnbexperience/eufemia/issues/3343)) ([9759275](https://github.com/dnbexperience/eufemia/commit/9759275aab427876a2ecaf3d362254febb6f64cc))
* **Table:** accordion multiple rows and Sbanken styling ([#3289](https://github.com/dnbexperience/eufemia/issues/3289)) ([e7b7c5f](https://github.com/dnbexperience/eufemia/commit/e7b7c5fcc1d527c5d343ce5590c9afc838326d5f))
* **TypeScript:** upgrade internal TypeScript version with a few alignments ([#3350](https://github.com/dnbexperience/eufemia/issues/3350)) ([047f81a](https://github.com/dnbexperience/eufemia/commit/047f81a7e0d33c3d5ad6b84a5aa1b9b3054e0937))

## [10.21.0](https://github.com/dnbexperience/eufemia/compare/v10.20.0...v10.21.0) (2024-02-21)


### :bug: Bug Fixes

* **Field.Boolean:** make it possible to reset the value by providing `undefined` ([#3319](https://github.com/dnbexperience/eufemia/issues/3319)) ([ee545ad](https://github.com/dnbexperience/eufemia/commit/ee545ad35803dd9be868fce9838b92cdde0aeef5))
* **Form.useData:** provide data on first render ([2b38ee7](https://github.com/dnbexperience/eufemia/commit/2b38ee762adb1499cb386fb555af4818992763dc)), closes [#3313](https://github.com/dnbexperience/eufemia/issues/3313)
* **FormLabel:** make labels selectable (accessible) ([#3311](https://github.com/dnbexperience/eufemia/issues/3311)) ([dbb8415](https://github.com/dnbexperience/eufemia/commit/dbb8415b113b0663e3be677e26e64aafad6beb08))
* **Table:** refactor and bug fixes ([#3294](https://github.com/dnbexperience/eufemia/issues/3294)) ([281b2d3](https://github.com/dnbexperience/eufemia/commit/281b2d3b96f14397003d708293a550ca24d01d71))
* **Textarea:** make element shrink and stay inside boundaries on smaller screen sizes ([#3329](https://github.com/dnbexperience/eufemia/issues/3329)) ([6e5eb2d](https://github.com/dnbexperience/eufemia/commit/6e5eb2d0cec27a5a8c0dddd5016d3ef15c19490f))


### :sparkles: Features

* **DatePicker:** add support for tooltip and tabIndex ([#3323](https://github.com/dnbexperience/eufemia/issues/3323)) ([1a048ee](https://github.com/dnbexperience/eufemia/commit/1a048ee0b9949507ed4227c80818915d031b0135))
* **Dl:** add grid layout to definition lists ([85fb33d](https://github.com/dnbexperience/eufemia/commit/85fb33d8ed452634b77f68e5d7d3b3b21af413ba))
* **Field.String:** add support for all input and textarea properties in camelCase ([#3321](https://github.com/dnbexperience/eufemia/issues/3321)) ([0789d76](https://github.com/dnbexperience/eufemia/commit/0789d769d0a4d915fa2e9144e27f63d196d34625)), closes [#3322](https://github.com/dnbexperience/eufemia/issues/3322)
* **FieldBlock:** enhance support for composition fields ([53f5113](https://github.com/dnbexperience/eufemia/commit/53f51132fed6b52af78062da6d9e87e6b076a763))
* **FieldBlock:** enhance support for composition fields ([#3306](https://github.com/dnbexperience/eufemia/issues/3306)) ([7c5b236](https://github.com/dnbexperience/eufemia/commit/7c5b2362794fd4f8c2e034607f23efdd7baedd31))
* **Form.Appearance:** add theme to control size of input fields ([#3325](https://github.com/dnbexperience/eufemia/issues/3325)) ([632574b](https://github.com/dnbexperience/eufemia/commit/632574bc156e09082c55a6c0a41ebd9b4b66ee06))
* **forms:** add `Value.SummaryList` to make accessible form summaries ([1a61b65](https://github.com/dnbexperience/eufemia/commit/1a61b65a72215a7146a14578d6b8f06a0a643bf2))
* **forms:** add `Value.SummaryList` to make accessible form summaries ([#3320](https://github.com/dnbexperience/eufemia/issues/3320)) ([6d795a7](https://github.com/dnbexperience/eufemia/commit/6d795a77887abdca87e6d952bcbd90c90a15238a))
* **InfoCard:** add optional dropShadow-prop ([#3312](https://github.com/dnbexperience/eufemia/issues/3312)) ([1b76cc4](https://github.com/dnbexperience/eufemia/commit/1b76cc4a2f0c6b2642159ece0e79599716aecc97))
* **NumberFormat:** align currency display of "name" to be displayed without Norwegian ([#3317](https://github.com/dnbexperience/eufemia/issues/3317)) ([2d8b8cf](https://github.com/dnbexperience/eufemia/commit/2d8b8cf58e65aee1cda297d5c75e169b5f95f694))
* **Password:** move `InputPassword` to `Field.Password` ([#3300](https://github.com/dnbexperience/eufemia/issues/3300)) ([32f5463](https://github.com/dnbexperience/eufemia/commit/32f546317004e1f98e876fed6d9ca9f8147b6bf5))
* **Slider:** Add marker functionality ([#3295](https://github.com/dnbexperience/eufemia/issues/3295)) ([acb1143](https://github.com/dnbexperience/eufemia/commit/acb11432f7f525b29bb173e0c7453404876ff416))

## [10.20.0](https://github.com/dnbexperience/eufemia/compare/v10.19.0...v10.20.0) (2024-02-08)


### :memo: Documentation

* **forms:** add docs about localisation and validation ([#3266](https://github.com/dnbexperience/eufemia/issues/3266)) ([29fd613](https://github.com/dnbexperience/eufemia/commit/29fd61327d0ad9965717149a08ae5a857738ea43)), closes [#3164](https://github.com/dnbexperience/eufemia/issues/3164)


### :bug: Bug Fixes

* **Accordion:** remove unneeded css due to the HeightAnimation renewal ([7859fe7](https://github.com/dnbexperience/eufemia/commit/7859fe7d88aa44cddcbe8bda953251978c71c6ff))
* **Breadcrumb:** fix icon render issue ([4c2e514](https://github.com/dnbexperience/eufemia/commit/4c2e5143efd9de02c31813a2fd74f1b46f98c4c2))
* **DatePicker:** make return object have corrected value ([#3296](https://github.com/dnbexperience/eufemia/issues/3296)) ([2205977](https://github.com/dnbexperience/eufemia/commit/2205977715cebf6cd25c5b3c79743dea30b487e7))
* **Flex.Container:** enhance children parsing to support fragments and wrappers with `withChildren` ([#3272](https://github.com/dnbexperience/eufemia/issues/3272)) ([f23bd2e](https://github.com/dnbexperience/eufemia/commit/f23bd2ef51e81bd9207322f7d044f239b528d3ec))
* **forms:** correct supported props for Field.Number and Value.Number ([#3304](https://github.com/dnbexperience/eufemia/issues/3304)) ([f55f9f8](https://github.com/dnbexperience/eufemia/commit/f55f9f8f30d4aa5d985cbb0e55f36eb80e732dfa))
* **forms:** enhance validation/submit handling ([#3280](https://github.com/dnbexperience/eufemia/issues/3280)) ([35804db](https://github.com/dnbexperience/eufemia/commit/35804db1949f6573dd0593c3edc602a01cce3e8c))
* **forms:** support 200% in font-size ([#3284](https://github.com/dnbexperience/eufemia/issues/3284)) ([d1dd8a5](https://github.com/dnbexperience/eufemia/commit/d1dd8a51f7d56057701f85ae34a596c449f8c64c))
* **FormStatus:** use HeightAnimation component instead of hook to reduce code ([dd669d0](https://github.com/dnbexperience/eufemia/commit/dd669d002594c24365fddac5851f32daabeee36c))
* **forms:** validate schema when given data structure not matches ([#3282](https://github.com/dnbexperience/eufemia/issues/3282)) ([b596ec3](https://github.com/dnbexperience/eufemia/commit/b596ec35c95ccfec90a56c01f94d9e05e4b60063)), closes [#3273](https://github.com/dnbexperience/eufemia/issues/3273)
* **GlobalStatus:** use HeightAnimation component instead of hook to reduce code ([391f14d](https://github.com/dnbexperience/eufemia/commit/391f14ddc8d52aeeebb640c38cc5a0793da504cd))
* **HeightAnimation:** avoid animation when not needed ([93ba1f5](https://github.com/dnbexperience/eufemia/commit/93ba1f54dab6f168c5a86f3138985273542b9882))
* **StepIndicator:** use HeightAnimation component instead of hook to reduce code ([a69e3e9](https://github.com/dnbexperience/eufemia/commit/a69e3e9bcd4d2affb50c7661614fbf9a8f50c274))
* **StepsLayout:** ensure space between step indicator and content ([#3281](https://github.com/dnbexperience/eufemia/issues/3281)) ([55793ad](https://github.com/dnbexperience/eufemia/commit/55793ad3fbb36f91bbd8be0d4be1134c25d0c6b6))
* **Table:** fix animation flickering ([75a6aab](https://github.com/dnbexperience/eufemia/commit/75a6aaba2097dd2374a3a2bf397d61df912cdcac))
* **Tabs:** animate when `prerender` is enabled ([6036b36](https://github.com/dnbexperience/eufemia/commit/6036b3662300da03ee012f446dd38f2ac607c9b3))
* **Upload:** make it work in React.StrictMode ([0625f21](https://github.com/dnbexperience/eufemia/commit/0625f21693646da50e063833941be888d0267f5a))


### :sparkles: Features

* **Card:** enhance flexibility and support horizontal Cards in Flex and Grid ([#3267](https://github.com/dnbexperience/eufemia/issues/3267)) ([f3b9d6e](https://github.com/dnbexperience/eufemia/commit/f3b9d6eae2424c73d072eb515009fc9ca932a4cb))
* **Form.Visibility:** add animate property ([#3302](https://github.com/dnbexperience/eufemia/issues/3302)) ([f22a3e9](https://github.com/dnbexperience/eufemia/commit/f22a3e9df06d7baecd47b212215397498b9de8f6))
* **FormLabel:** add shellSpace property for inner margin spacing ([455c92f](https://github.com/dnbexperience/eufemia/commit/455c92fa55a1242dc9b1d3b14915296c508ff0f1))
* **forms:** add filterData to `Form.Handler` and ignore disabled fields for validation ([#3290](https://github.com/dnbexperience/eufemia/issues/3290)) ([6e7513b](https://github.com/dnbexperience/eufemia/commit/6e7513bb192468a85d4f52d9be787e9112dac52b))
* **forms:** add setData and getData handlers ([#3305](https://github.com/dnbexperience/eufemia/issues/3305)) ([b260677](https://github.com/dnbexperience/eufemia/commit/b260677d71e9f0493f2fd426d98f30dbe8f8b542))
* **forms:** add support for a custom Ajv instance ([#3283](https://github.com/dnbexperience/eufemia/issues/3283)) ([6617c09](https://github.com/dnbexperience/eufemia/commit/6617c09f78ea6cf010f76aac993953c1064784dd)), closes [#3282](https://github.com/dnbexperience/eufemia/issues/3282) [#3276](https://github.com/dnbexperience/eufemia/issues/3276)
* **forms:** enable animation for status messages (experimental) ([2f1df47](https://github.com/dnbexperience/eufemia/commit/2f1df47ab6a42a80e92dc3e6ce4eaffafbe69554))
* **forms:** extend the possibilities on how to set error messages ([#3285](https://github.com/dnbexperience/eufemia/issues/3285)) ([1b66941](https://github.com/dnbexperience/eufemia/commit/1b6694125e23f6668357dc11aa3a8e60c96dc140))
* **StepsLayout:** add drawer variant ([#3288](https://github.com/dnbexperience/eufemia/issues/3288)) ([d713f4f](https://github.com/dnbexperience/eufemia/commit/d713f4f8beb020efd6563efacdb053009c081eb7))

## [10.19.0](https://github.com/dnbexperience/eufemia/compare/v10.18.0...v10.19.0) (2024-01-22)


### :bug: Bug Fixes

* **Autocomplete:** replace existing aria-live handling with the AriaLive component  ([#3258](https://github.com/dnbexperience/eufemia/issues/3258)) ([0ec06ca](https://github.com/dnbexperience/eufemia/commit/0ec06cad6f190bcf2ade94685da91160b66bdb01))
* **Breadcrumb:** fix rehydration disturbance ([#3254](https://github.com/dnbexperience/eufemia/issues/3254)) ([dcf3a8b](https://github.com/dnbexperience/eufemia/commit/dcf3a8b18840114c90dd9b11ed0b7a914c79337a)), closes [#2762](https://github.com/dnbexperience/eufemia/issues/2762) [#2671](https://github.com/dnbexperience/eufemia/issues/2671)
* **DrawerList:** update original data when data prop changes ([#3247](https://github.com/dnbexperience/eufemia/issues/3247)) ([d1b03c2](https://github.com/dnbexperience/eufemia/commit/d1b03c24b9feb9c616047b89c3ede60d53c11de0))
* **Field:** show error state without error object if parent FieldBlock has error ([#3225](https://github.com/dnbexperience/eufemia/issues/3225)) ([35fe238](https://github.com/dnbexperience/eufemia/commit/35fe2386d5886ae23fd38636ae7908fb4b530b51)), closes [#2958](https://github.com/dnbexperience/eufemia/issues/2958)
* **Flex.Container:** ensure rowGap=false has effect ([#3242](https://github.com/dnbexperience/eufemia/issues/3242)) ([e18ddfd](https://github.com/dnbexperience/eufemia/commit/e18ddfda8f204c8292b35bd8dd909ad475111d80))
* **forms:** rename `contents` to `content` ([#3257](https://github.com/dnbexperience/eufemia/issues/3257)) ([2c9a397](https://github.com/dnbexperience/eufemia/commit/2c9a3975571e5bd8652f0fe40d5d93bebb67db4f))
* **Input:** should not clear input value with escape key ([#3235](https://github.com/dnbexperience/eufemia/issues/3235)) ([979b3e3](https://github.com/dnbexperience/eufemia/commit/979b3e3306d9e00cabf15cac8ae0c231c86b4c81))
* **PhoneNumber:** handle pattern, schema and validator with country code ([#3249](https://github.com/dnbexperience/eufemia/issues/3249)) ([ed115d5](https://github.com/dnbexperience/eufemia/commit/ed115d508f58008318a88ff2d0837b9076f3024a))
* **Table.Accordion:** prevent accordion from opening on label click ([#3228](https://github.com/dnbexperience/eufemia/issues/3228)) ([ee5014f](https://github.com/dnbexperience/eufemia/commit/ee5014fd7eadfa0635cc2abd07ba5cc138bd4b92))
* **Textarea:** correct outline to be inset ([#3237](https://github.com/dnbexperience/eufemia/issues/3237)) ([6433470](https://github.com/dnbexperience/eufemia/commit/64334705a9b5e947caef97237b114003ce2ee883))


### :sparkles: Features

* **AriaLive:** add new component ([#3217](https://github.com/dnbexperience/eufemia/issues/3217)) ([7c79a54](https://github.com/dnbexperience/eufemia/commit/7c79a54539f1b31b69dd312fdf066664c357ec3f))
* **Flex:** add `line-framed` to divider ([#3244](https://github.com/dnbexperience/eufemia/issues/3244)) ([1aa3338](https://github.com/dnbexperience/eufemia/commit/1aa33382984a168b60d16d19928d12e639da3db4)), closes [#3242](https://github.com/dnbexperience/eufemia/issues/3242) [#3245](https://github.com/dnbexperience/eufemia/issues/3245)
* **forms:** add labelDescription prop to fields (`labelSecondary` got removed) ([#3251](https://github.com/dnbexperience/eufemia/issues/3251)) ([00c278c](https://github.com/dnbexperience/eufemia/commit/00c278ca73b1e97415942dd1d18a349155d8e018)), closes [#3209](https://github.com/dnbexperience/eufemia/issues/3209) [#3252](https://github.com/dnbexperience/eufemia/issues/3252)
* **NumberUtils.format:** Only return object if returnAria: true ([#3262](https://github.com/dnbexperience/eufemia/issues/3262)) ([ca4315f](https://github.com/dnbexperience/eufemia/commit/ca4315f604df347a1b81c658eac1a7cc237bac11))
* **Section:** add support for backgroundColor=transparent ([#3255](https://github.com/dnbexperience/eufemia/issues/3255)) ([07e1545](https://github.com/dnbexperience/eufemia/commit/07e1545aabcd457e62de2f130f3f9b038318f4c7))
* **Textarea:** add characterCounter ([#3210](https://github.com/dnbexperience/eufemia/issues/3210)) ([5c9dde9](https://github.com/dnbexperience/eufemia/commit/5c9dde938cf6d5eaf6eae3e924a07a48f81a7887)), closes [#3217](https://github.com/dnbexperience/eufemia/issues/3217)
* **TextCounter:** add new fragment used in Textarea ([#3250](https://github.com/dnbexperience/eufemia/issues/3250)) ([3093c28](https://github.com/dnbexperience/eufemia/commit/3093c28700d6aec7b12de779e53a9b4c475c3cd0)), closes [#3210](https://github.com/dnbexperience/eufemia/issues/3210)

## [10.18.0](https://github.com/dnbexperience/eufemia/compare/v10.17.0...v10.18.0) (2024-01-16)


### :sparkles: Features

* **Form.useData:** add hook to get forms data outside of the context ([#3218](https://github.com/dnbexperience/eufemia/issues/3218)) ([58c77cd](https://github.com/dnbexperience/eufemia/commit/58c77cdbb7c29427bcee890607a3596970f55277))


### :bug: Bug Fixes

* **Expiry:** validation logic ([#3216](https://github.com/dnbexperience/eufemia/issues/3216)) ([beff8e8](https://github.com/dnbexperience/eufemia/commit/beff8e8ad4b9dc41daa0737e2d5ed6d2afcd7685))
* **Field.Expiry:** correct disabled styling ([#3215](https://github.com/dnbexperience/eufemia/issues/3215)) ([2a0651a](https://github.com/dnbexperience/eufemia/commit/2a0651a82bf34248274fbc0e8d9abf6eac5fea76))
* **Field.Number:** use default size ([#3229](https://github.com/dnbexperience/eufemia/issues/3229)) ([348f3cb](https://github.com/dnbexperience/eufemia/commit/348f3cb79eae0f4bc5929a6c2276489c352c0074))
* **Field.PhoneNumber:** ensure data value is used when given ([#3222](https://github.com/dnbexperience/eufemia/issues/3222)) ([1e37cf6](https://github.com/dnbexperience/eufemia/commit/1e37cf6c3ecfcf30ea866a173ee026cf2d6890ec))
* **NumberFormat:** setting selectall to false will no longer select all ([#3213](https://github.com/dnbexperience/eufemia/issues/3213)) ([ab5cea2](https://github.com/dnbexperience/eufemia/commit/ab5cea28fab36e21f79566209b038dc744fdb997))
* **ToggleButton:** add checked disabled style ([#3224](https://github.com/dnbexperience/eufemia/issues/3224)) ([c3ea6a6](https://github.com/dnbexperience/eufemia/commit/c3ea6a6293903b2db73990714ee921dfc5644a96))
* **VisuallyHidden:** remove flex support ([#3219](https://github.com/dnbexperience/eufemia/issues/3219)) ([2fd5c41](https://github.com/dnbexperience/eufemia/commit/2fd5c41e424b3d586f32e5767e51bcdc981bcc04))

## [10.17.0](https://github.com/dnbexperience/eufemia/compare/v10.16.0...v10.17.0) (2024-01-11)


### :memo: Documentation

* refactor custom field component docs and example ([#3193](https://github.com/dnbexperience/eufemia/issues/3193)) ([3871079](https://github.com/dnbexperience/eufemia/commit/387107984aeed4431fd3f87bbb800caf76c7499e))


### :sparkles: Features

* **Anchor:** blank target icon styling  ([#3172](https://github.com/dnbexperience/eufemia/issues/3172)) ([2ca216a](https://github.com/dnbexperience/eufemia/commit/2ca216aa4b37034d536361aca02752d9b035eda4))
* **DatePicker:** add onFocus event ([#3188](https://github.com/dnbexperience/eufemia/issues/3188)) ([2062213](https://github.com/dnbexperience/eufemia/commit/2062213180f578e81f9b7fba1e06a3b437d6a9f7))
* **Field.Number:** add step control functionality ([#3140](https://github.com/dnbexperience/eufemia/issues/3140)) ([a9e1697](https://github.com/dnbexperience/eufemia/commit/a9e16970612afdf20dcc6522b3b60f6813af044a))
* **Form.Visibility:** add `pathValue` and `whenValue` ([#3206](https://github.com/dnbexperience/eufemia/issues/3206)) ([8a547ae](https://github.com/dnbexperience/eufemia/commit/8a547aeb5a1d9ad0815a8bf2e2f735b36ac38fe4))


### :bug: Bug Fixes

* **Autocomplete:** only set aria-controls attribute when expanded ([#3180](https://github.com/dnbexperience/eufemia/issues/3180)) ([a16a7ba](https://github.com/dnbexperience/eufemia/commit/a16a7ba1571be1371c099014704345bb5126049d))
* **DatePicker:** add return object for onBlur ([#3178](https://github.com/dnbexperience/eufemia/issues/3178)) ([18b3889](https://github.com/dnbexperience/eufemia/commit/18b38895273c2a5cf8e8d1682e5d3cabee0bdab3))
* **DatePicker:** fix bug where minDate set to today is disabled ([#3176](https://github.com/dnbexperience/eufemia/issues/3176)) ([ef65676](https://github.com/dnbexperience/eufemia/commit/ef65676336098a5fcf998df1c6dde7fcd86cefae))
* **Dropdown:** correct aria-controls target element ([#3181](https://github.com/dnbexperience/eufemia/issues/3181)) ([bc26101](https://github.com/dnbexperience/eufemia/commit/bc261012cd5f5d1dc29ee047a1468328e3c5d28e))
* **Field.Currency:** handle big numbers ([#3184](https://github.com/dnbexperience/eufemia/issues/3184)) ([b856a46](https://github.com/dnbexperience/eufemia/commit/b856a4699dbc4cf18777a1ebd6d7b361c0ff7e20)), closes [#3124](https://github.com/dnbexperience/eufemia/issues/3124) [#3185](https://github.com/dnbexperience/eufemia/issues/3185)
* **Field.Number:** replace `rightAligned` prop with `align` ([#3175](https://github.com/dnbexperience/eufemia/issues/3175)) ([ba130ba](https://github.com/dnbexperience/eufemia/commit/ba130bab2dee27c07a7725e8487e12c0e3fe667d))
* **FieldBlock:** ensure extra spacing of labels when on small screens ([#3187](https://github.com/dnbexperience/eufemia/issues/3187)) ([c86c857](https://github.com/dnbexperience/eufemia/commit/c86c857129efa9a7895526eb0abd8673a68b0948)), closes [#3102](https://github.com/dnbexperience/eufemia/issues/3102)
* **FieldBlock:** label can be clicked after focusing input ([#3190](https://github.com/dnbexperience/eufemia/issues/3190)) ([95b37e7](https://github.com/dnbexperience/eufemia/commit/95b37e72a5eb74fa28c19b7bf4f7957901872974)), closes [#2979](https://github.com/dnbexperience/eufemia/issues/2979)
* **Flex.Container:** add `Flex.withChildren` HOC for handling wrapped children with spacing ([#3200](https://github.com/dnbexperience/eufemia/issues/3200)) ([93df77c](https://github.com/dnbexperience/eufemia/commit/93df77caffd2349c0f94ee27b91a25d4ddd6743e))
* **Flex.Container:** show line divider even when heading is present ([#3198](https://github.com/dnbexperience/eufemia/issues/3198)) ([d135b47](https://github.com/dnbexperience/eufemia/commit/d135b4719ef4dcdb485a845c64a1942555927f2b))
* **Form.Visibility:** move Visibility to Form.Visibility ([#3205](https://github.com/dnbexperience/eufemia/issues/3205)) ([d3b766f](https://github.com/dnbexperience/eufemia/commit/d3b766f2dce48b82f3455713d191bb3c84917b3d))
* **InputMasked:** correct cursor position when navigating using keyboard ([#3160](https://github.com/dnbexperience/eufemia/issues/3160)) ([9143b38](https://github.com/dnbexperience/eufemia/commit/9143b3847a1c9f5f4840b77f8ef63810c27a06ad))
* **InputMasked:** extend reliability on cursor position correction ([#3194](https://github.com/dnbexperience/eufemia/issues/3194)) ([cbc27ac](https://github.com/dnbexperience/eufemia/commit/cbc27ac772ce85591f3d54147048f6e28535ab06)), closes [#3160](https://github.com/dnbexperience/eufemia/issues/3160)
* **MultiInputMask:** enhance handling of right, left and backspace key usage ([#3192](https://github.com/dnbexperience/eufemia/issues/3192)) ([f3ce934](https://github.com/dnbexperience/eufemia/commit/f3ce934f29e77b15cababe01d1d5a86ed813598f))
* **PhoneNumber:** show read outline on both fields in error state ([#3196](https://github.com/dnbexperience/eufemia/issues/3196)) ([16ed821](https://github.com/dnbexperience/eufemia/commit/16ed8214ec099ca4ddb4d21416031866f03a6daf))
* **Textarea:** ensure correct height based on rows for Firefox browser ([#3207](https://github.com/dnbexperience/eufemia/issues/3207)) ([75f754e](https://github.com/dnbexperience/eufemia/commit/75f754e3058431eee108b54e18cc5bcb3ba74563))
* **Visibility:** add support for being used in Flex.Container ([#3203](https://github.com/dnbexperience/eufemia/issues/3203)) ([7a72fa6](https://github.com/dnbexperience/eufemia/commit/7a72fa6abc28b600773974713915ed98c3b071e6))

## [10.16.0](https://github.com/dnbexperience/eufemia/compare/v10.15.1...v10.16.0) (2024-01-04)


### :memo: Documentation

* **Field.PhoneNumber:** document event handlers argument value ([#3063](https://github.com/dnbexperience/eufemia/issues/3063)) ([b6baeb7](https://github.com/dnbexperience/eufemia/commit/b6baeb72a8445046b87562c09c13278d25406c16))
* remove colon in examples and add info about colon usage in labels for form elements ([#3167](https://github.com/dnbexperience/eufemia/issues/3167)) ([04d1e64](https://github.com/dnbexperience/eufemia/commit/04d1e64718cdec95d36e79fac6e199d489daa6ec))


### :bug: Bug Fixes

* **Anchor:** dnb-anchor--no-hover and dnb-anchor--contrast ([#3139](https://github.com/dnbexperience/eufemia/issues/3139)) ([b718350](https://github.com/dnbexperience/eufemia/commit/b718350fe20659e1ecfdb37a3175886f91059e4f))
* **Anchor:** remove icon when dnb-anchor--no-icon ([#3138](https://github.com/dnbexperience/eufemia/issues/3138)) ([83c1b47](https://github.com/dnbexperience/eufemia/commit/83c1b47860d8f92d6e8454ebb91cf354cd534da4))
* **DatePicker:** make sure calendar shows correct date on date prop update ([#3112](https://github.com/dnbexperience/eufemia/issues/3112)) ([b571962](https://github.com/dnbexperience/eufemia/commit/b5719625ff0568172f63c09f88000ff5748d3e1d))
* **Field.Date:** define empty value to trigger required error ([#3017](https://github.com/dnbexperience/eufemia/issues/3017)) ([45b4667](https://github.com/dnbexperience/eufemia/commit/45b46676ca2bf847896da2feb61e29f0dee5353f))
* **Field.Expiry:** handles value as null ([#3143](https://github.com/dnbexperience/eufemia/issues/3143)) ([2a5fd66](https://github.com/dnbexperience/eufemia/commit/2a5fd66799e10fa3acf8e017e7b26e02c72f1ec9))
* **Field.Expiry:** should handle values of non existing months ([#3144](https://github.com/dnbexperience/eufemia/issues/3144)) ([13cdc9f](https://github.com/dnbexperience/eufemia/commit/13cdc9f414b4da9600800f3ecf60dd8546c1386b))
* **Field.PhoneNumber:** make country code only search for country name based on chosen locale ([#3156](https://github.com/dnbexperience/eufemia/issues/3156)) ([26c4f20](https://github.com/dnbexperience/eufemia/commit/26c4f20ad993c691ec9d52a02532e116d4f47c91))
* **Field.PhoneNumber:** renders an validation error initially when it is required and only country code is provided ([#3081](https://github.com/dnbexperience/eufemia/issues/3081)) ([0d1063a](https://github.com/dnbexperience/eufemia/commit/0d1063aad64a57dce24d397548ec5db27e920abe))
* **Field.Selection:** add error state and message ([#3077](https://github.com/dnbexperience/eufemia/issues/3077)) ([06de7c9](https://github.com/dnbexperience/eufemia/commit/06de7c958ac93dd259c0e05a20301fc5156b3136))
* **Field.Selection:** fix Dropdown width ([#3136](https://github.com/dnbexperience/eufemia/issues/3136)) ([2fb7e47](https://github.com/dnbexperience/eufemia/commit/2fb7e471390c12d1549d4dc78c9bd2350979b3f6))
* **Field.Selection:** make it possible to disable radio variants ([#3086](https://github.com/dnbexperience/eufemia/issues/3086)) ([980cabd](https://github.com/dnbexperience/eufemia/commit/980cabddcf524819ef224bdcae9055466aad4b92))
* **Field.String:** validated empty value when required ([#3125](https://github.com/dnbexperience/eufemia/issues/3125)) ([541c9b1](https://github.com/dnbexperience/eufemia/commit/541c9b142a0f1520f88898bace7a1beda1a54211))
* **forms:** update data context with initially given field value ([#3135](https://github.com/dnbexperience/eufemia/issues/3135)) ([93d08e6](https://github.com/dnbexperience/eufemia/commit/93d08e687f0800fae5f814784e82ad5fbf08fff8))
* **PhoneNumber:** make long labels wrap nicely ([#3066](https://github.com/dnbexperience/eufemia/issues/3066)) ([d12850d](https://github.com/dnbexperience/eufemia/commit/d12850d44d9336e8ce621a09d591f3530b89bf4b))
* **Radio:** fix correct spacing between label/legend and fieldset ([#3115](https://github.com/dnbexperience/eufemia/issues/3115)) ([9dc7d9e](https://github.com/dnbexperience/eufemia/commit/9dc7d9ee65dcf90e53208a07b0237eaba316a7f9))
* **Section:** ensure overlay is behind content ([#3141](https://github.com/dnbexperience/eufemia/issues/3141)) ([53346ec](https://github.com/dnbexperience/eufemia/commit/53346eccb9d48efc36994b067019e670ae134e2d))
* **StepsLayout:** mode defaults to strict ([#3145](https://github.com/dnbexperience/eufemia/issues/3145)) ([eef4744](https://github.com/dnbexperience/eufemia/commit/eef4744704fd422bb75920086222babb7bc82e2e))
* **StepsLayout:** prevent component adjust to screen size on mobile ([#3146](https://github.com/dnbexperience/eufemia/issues/3146)) ([20d92d2](https://github.com/dnbexperience/eufemia/commit/20d92d29903554c06b3b1111bc0212635d631453))
* **ToggleButton:** align label position ([#3169](https://github.com/dnbexperience/eufemia/issues/3169)) ([22f587d](https://github.com/dnbexperience/eufemia/commit/22f587dace68d17ca8f899f7468e92b4c6226d3e))
* **Tooltip:** text alignment for short text ([#3084](https://github.com/dnbexperience/eufemia/issues/3084)) ([7b83a7a](https://github.com/dnbexperience/eufemia/commit/7b83a7a68198fd322b9c89d995d4db8032bd2f70))
* **Upload:** omit FormEvent onChange type ([#3113](https://github.com/dnbexperience/eufemia/issues/3113)) ([52e42c2](https://github.com/dnbexperience/eufemia/commit/52e42c291295bb12bde7182deb9cb21d4480b8ae))


### :sparkles: Features

* **Card:** responsive breakout on small screens ([#3163](https://github.com/dnbexperience/eufemia/issues/3163)) ([da88ac9](https://github.com/dnbexperience/eufemia/commit/da88ac9902c66b7664aee0ce7cd9289b3d9eaa73))
* **Email:** trim value ([#3170](https://github.com/dnbexperience/eufemia/issues/3170)) ([ea56957](https://github.com/dnbexperience/eufemia/commit/ea569579ffb1549a4687caee7c30a1a785478a0a)), closes [#3165](https://github.com/dnbexperience/eufemia/issues/3165)
* **Icons:** add browser, digipass, envelope_open, laptop, mobile, money_left, teenager ([#3064](https://github.com/dnbexperience/eufemia/issues/3064)) ([b503e36](https://github.com/dnbexperience/eufemia/commit/b503e36925e6021b4ee085fa691cb81e3bc4dac5))
* **InputMasked:** enhance inputMode for better support of showing correct soft keyboards ([#3108](https://github.com/dnbexperience/eufemia/issues/3108)) ([e95ef1f](https://github.com/dnbexperience/eufemia/commit/e95ef1f250f34cdecfa7e8d4f15c0a97471020e9)), closes [#3097](https://github.com/dnbexperience/eufemia/issues/3097)
* **String:** add `capitalize` prop ([#3159](https://github.com/dnbexperience/eufemia/issues/3159)) ([3dce145](https://github.com/dnbexperience/eufemia/commit/3dce145d865693a13cfd9570863036e1bce3d2d2))
* **useDataValue:** add toOutput, fromExternal and validateRequired ([#3109](https://github.com/dnbexperience/eufemia/issues/3109)) ([cf04125](https://github.com/dnbexperience/eufemia/commit/cf041259c49b18b40d31904ec6d545ea9c42dc5a))

## [10.15.1](https://github.com/dnbexperience/eufemia/compare/v10.15.0...v10.15.1) (2023-12-14)


### :bug: Bug Fixes

* correctly compile CSS functional :has() ([#3070](https://github.com/dnbexperience/eufemia/issues/3070)) ([5d2b4cf](https://github.com/dnbexperience/eufemia/commit/5d2b4cf7018b6f4391d4a16b1966d4712a7e406d))
* **forms:** add Faroe islands and Greenland to Nordics in countrylist ([#3069](https://github.com/dnbexperience/eufemia/issues/3069)) ([1f7fc83](https://github.com/dnbexperience/eufemia/commit/1f7fc83badf97b6cf51dc51462b493bba77d90d4))
* **Section:** ensure cornerRadius does work together with dropShadow ([#3060](https://github.com/dnbexperience/eufemia/issues/3060)) ([e5207a1](https://github.com/dnbexperience/eufemia/commit/e5207a165f6dd212191440bca67373745ded25b2))
* **Textarea:** suffix spacing ([#3074](https://github.com/dnbexperience/eufemia/issues/3074)) ([ce28f3e](https://github.com/dnbexperience/eufemia/commit/ce28f3e6f2009bc3ca08b572819a17f9af26c70b))

## [10.15.0](https://github.com/dnbexperience/eufemia/compare/v10.14.0...v10.15.0) (2023-12-12)


### :memo: Documentation

* **Card:** adds horizontal fields example ([#2907](https://github.com/dnbexperience/eufemia/issues/2907)) ([661db7a](https://github.com/dnbexperience/eufemia/commit/661db7a5583ab0add0a67625bec152a2eec4afec))
* **FAQ:** change version of yarn to v4 ([#2944](https://github.com/dnbexperience/eufemia/issues/2944)) ([5151fd9](https://github.com/dnbexperience/eufemia/commit/5151fd99acb839e40bda586542971d7804871bdf))
* **FAQ:** removes stylelint as dependency issue ([#2943](https://github.com/dnbexperience/eufemia/issues/2943)) ([64ffd13](https://github.com/dnbexperience/eufemia/commit/64ffd13ea3809c7d1676d6eae2c378b567c9c914))
* **Field.SelectCountry:** select component -> selection component ([#3003](https://github.com/dnbexperience/eufemia/issues/3003)) ([b098c6b](https://github.com/dnbexperience/eufemia/commit/b098c6bf7d597981d4a5b19b61109ae7b6819a5d))
* **FormLabel:** document disabled property ([#3004](https://github.com/dnbexperience/eufemia/issues/3004)) ([d276bf6](https://github.com/dnbexperience/eufemia/commit/d276bf6d262e5aca093ca191d13c4aaafece9fba))
* **Layout:** fix import of ux-layout-spacing.png ([#2921](https://github.com/dnbexperience/eufemia/issues/2921)) ([910bcb4](https://github.com/dnbexperience/eufemia/commit/910bcb498b24e06d15373dea1e6238dfcf8156dd))
* **Number:** add info about when to use and not to use ([#2955](https://github.com/dnbexperience/eufemia/issues/2955)) ([55b3447](https://github.com/dnbexperience/eufemia/commit/55b34479083c206aea1de4322b32a8350fd2f5c1))
* **SelectCountry:** replace bar as value in examples ([#2990](https://github.com/dnbexperience/eufemia/issues/2990)) ([8fd9f0e](https://github.com/dnbexperience/eufemia/commit/8fd9f0e83362ef4f1c9cebc96b5c2b039f7e0077))


### :bug: Bug Fixes

* **Autocomplete:** enhance reactivity by value change from outside ([#2922](https://github.com/dnbexperience/eufemia/issues/2922)) ([e4fd9f9](https://github.com/dnbexperience/eufemia/commit/e4fd9f964d3a598e873be1b484aa1dba124cd324))
* **Card:** add support for small screen sizes ([#3051](https://github.com/dnbexperience/eufemia/issues/3051)) ([62daa1a](https://github.com/dnbexperience/eufemia/commit/62daa1a7b21ecbd687f4e61a4130b7796824f522))
* **DatePicker:** renders mask_placeholder from locale w/o provider ([#2947](https://github.com/dnbexperience/eufemia/issues/2947)) ([b522bd7](https://github.com/dnbexperience/eufemia/commit/b522bd768eb6cde1450a0b1138fbf27c605c1811))
* **Dropdown:** error message when passing a function to innerRef ([#2932](https://github.com/dnbexperience/eufemia/issues/2932)) ([c362a4a](https://github.com/dnbexperience/eufemia/commit/c362a4a32002f3e8ebfeb86ed1b5b3bda10ad163))
* **Expiry:** correct class placement and CSS specificity issue ([#2915](https://github.com/dnbexperience/eufemia/issues/2915)) ([ae1154d](https://github.com/dnbexperience/eufemia/commit/ae1154dca1e8c779a6b209fbe18851dbf713122c)), closes [#2914](https://github.com/dnbexperience/eufemia/issues/2914)
* **FieldBlock:** fix support for stretch alignment ([#2913](https://github.com/dnbexperience/eufemia/issues/2913)) ([2fdbd4b](https://github.com/dnbexperience/eufemia/commit/2fdbd4b6706c369895a537cc4ef5af96c46287a3)), closes [#2907](https://github.com/dnbexperience/eufemia/issues/2907)
* **FormLabel:** don't apply margin-right when no content was given ([#2927](https://github.com/dnbexperience/eufemia/issues/2927)) ([057f957](https://github.com/dnbexperience/eufemia/commit/057f957f9b7bdabdd19c1476d7020f6a5473c158))
* **forms:** Fix bug on replacing error message values ([#2971](https://github.com/dnbexperience/eufemia/issues/2971)) ([b24ddb5](https://github.com/dnbexperience/eufemia/commit/b24ddb51e5b85f3f43b26a0b9f08fd5620746061))
* **forms:** Fix data context provider path and error state handling ([#2926](https://github.com/dnbexperience/eufemia/issues/2926)) ([01a01f4](https://github.com/dnbexperience/eufemia/commit/01a01f41c2f6bf76c48fff3de3c3e8c6ff1feb2f))
* **GlobalStatus:** remove z-index to enhance flexibility ([#2952](https://github.com/dnbexperience/eufemia/issues/2952)) ([13a9d6e](https://github.com/dnbexperience/eufemia/commit/13a9d6e8ecfc29309285bfcabce1d0d0d484d034)), closes [/github.com/dnbexperience/eufemia/commit/1fb638b12df290533e6a89e7f8135a7e23c0797e#diff-4d582f82c1661d8de20042e6e65250a4d2710c2b31f8955fcd6eda14097a0b4](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/commit/1fb638b12df290533e6a89e7f8135a7e23c0797e/issues/diff-4d582f82c1661d8de20042e6e65250a4d2710c2b31f8955fcd6eda14097a0b4)
* **Hr:** remove overflow causing a scrollbar ([#2945](https://github.com/dnbexperience/eufemia/issues/2945)) ([dc989ff](https://github.com/dnbexperience/eufemia/commit/dc989ff5dda412a3feee961e264d752817536ca2))
* **PhoneNumber:** ensure correct alignment on smaller screens ([#2957](https://github.com/dnbexperience/eufemia/issues/2957)) ([ae9913b](https://github.com/dnbexperience/eufemia/commit/ae9913b65c51c8390400f056a1805d831cb4a20b))
* **PhoneNumber:** return country code only when a number is given ([#2920](https://github.com/dnbexperience/eufemia/issues/2920)) ([5b1a9b0](https://github.com/dnbexperience/eufemia/commit/5b1a9b05341e93f6bb7e90c3d8c6d9c5accc47e1)), closes [#2922](https://github.com/dnbexperience/eufemia/issues/2922) [#2923](https://github.com/dnbexperience/eufemia/issues/2923)
* **RadioGroup:** omit rendering label when not given ([#2928](https://github.com/dnbexperience/eufemia/issues/2928)) ([693f9d4](https://github.com/dnbexperience/eufemia/commit/693f9d4b70a053536cbd190ce0095c4306f9ce91))
* **Selection:** correctly link id with label ([#2911](https://github.com/dnbexperience/eufemia/issues/2911)) ([71ad30d](https://github.com/dnbexperience/eufemia/commit/71ad30d4b0eba89194c61548070fe9f654933bcc)), closes [#2842](https://github.com/dnbexperience/eufemia/issues/2842)
* **ToggleButtonGroup:** omit rendering label when not given ([#2929](https://github.com/dnbexperience/eufemia/issues/2929)) ([26f683e](https://github.com/dnbexperience/eufemia/commit/26f683edc4f940b29f09c3d8f456a8d282afd127))


### :sparkles: Features

* **Accordion:** new filled variant + style refactoring ([#2896](https://github.com/dnbexperience/eufemia/issues/2896)) ([a4c1fb0](https://github.com/dnbexperience/eufemia/commit/a4c1fb01389455e8d33a1f7b5adfb2f51de4220a))
* add support for functional refs to various form components ([#2946](https://github.com/dnbexperience/eufemia/issues/2946)) ([cecad75](https://github.com/dnbexperience/eufemia/commit/cecad758321cd6c76b4b16d83fbe09f36183be68))
* **Breadcrumb:** correct gap between items and fix overlapping focus ring ([#2917](https://github.com/dnbexperience/eufemia/issues/2917)) ([6252458](https://github.com/dnbexperience/eufemia/commit/6252458e6696b2f74fef4cc81f86ed827c34b1cd))
* **Button, Anchor:** fix launch icon for _blank button links ([#2930](https://github.com/dnbexperience/eufemia/issues/2930)) ([37a65dc](https://github.com/dnbexperience/eufemia/commit/37a65dc8306a3bb72e01c134fd44a5a25d641815))
* **Checkbox:** Sbanken styling ([#2904](https://github.com/dnbexperience/eufemia/issues/2904)) ([b2dbd44](https://github.com/dnbexperience/eufemia/commit/b2dbd44a051e056a40f211b0f4918d6c51948a87)), closes [#2888](https://github.com/dnbexperience/eufemia/issues/2888)
* **Currency:** add automatic locale and alignment support ([#2956](https://github.com/dnbexperience/eufemia/issues/2956)) ([3c64d4d](https://github.com/dnbexperience/eufemia/commit/3c64d4d147d5df9f4f9dbaa3523e8257cc54baeb))
* **forms:** include styles by default ([#2918](https://github.com/dnbexperience/eufemia/issues/2918)) ([e2f4c1e](https://github.com/dnbexperience/eufemia/commit/e2f4c1e82748a0d5f11aca3941d2da7b0e301950))
* **MultiInputMask:** Add stretch property ([#2914](https://github.com/dnbexperience/eufemia/issues/2914)) ([706beb3](https://github.com/dnbexperience/eufemia/commit/706beb3d477af31fcd11b6d9dda489925387836e))
* **PaymentCard:** adds card_status unknown ([#2934](https://github.com/dnbexperience/eufemia/issues/2934)) ([a36ffa7](https://github.com/dnbexperience/eufemia/commit/a36ffa719eb529abd80c22ab79cfa43df79f9d0b))
* **PhoneNumber:** add `pattern` property ([#2962](https://github.com/dnbexperience/eufemia/issues/2962)) ([86cb6e0](https://github.com/dnbexperience/eufemia/commit/86cb6e04db44dd9baea3fd62cb331ab99f7c2706))
* **PhoneNumber:** add filter for showing e.g. only Scandinavia countries ([#2959](https://github.com/dnbexperience/eufemia/issues/2959)) ([995c43d](https://github.com/dnbexperience/eufemia/commit/995c43d997de8496e391bed968d0ea7c7f38467c))
* **PhoneNumber:** add prioritized sort option ([#3034](https://github.com/dnbexperience/eufemia/issues/3034)) ([5fe0e41](https://github.com/dnbexperience/eufemia/commit/5fe0e41568d444df9bbb97bf41cf17a76e760331)), closes [#3023](https://github.com/dnbexperience/eufemia/issues/3023)
* **PhoneNumber:** add property `omitCountryCodeField` ([#2961](https://github.com/dnbexperience/eufemia/issues/2961)) ([4a3c7e2](https://github.com/dnbexperience/eufemia/commit/4a3c7e25d0b94e09bf2fbc8d66092145a6ef96fd))
* **PhoneNumber:** remove structure and format when number is not +47 ([#2958](https://github.com/dnbexperience/eufemia/issues/2958)) ([56e2f08](https://github.com/dnbexperience/eufemia/commit/56e2f084de2fceb91d1b36915c6f2b44863a0e11))
* **Section:** add dropShadow support ([#3053](https://github.com/dnbexperience/eufemia/issues/3053)) ([040a92b](https://github.com/dnbexperience/eufemia/commit/040a92be43b10ca5bf137a4542b28df795fe2d52))
* **SelectCountry:** use autocomplete instead of dropdown ([#3023](https://github.com/dnbexperience/eufemia/issues/3023)) ([0f2990c](https://github.com/dnbexperience/eufemia/commit/0f2990c90412b02be40246bc8aa7ca29b31f2a46)), closes [#2993](https://github.com/dnbexperience/eufemia/issues/2993)
* **Switch:** Sbanken styling ([#2939](https://github.com/dnbexperience/eufemia/issues/2939)) ([46c5506](https://github.com/dnbexperience/eufemia/commit/46c55066aed42b3073f095d7392b056a4a3b6681))
* **ToggleButton:** Sbanken styling ([#2936](https://github.com/dnbexperience/eufemia/issues/2936)) ([5370376](https://github.com/dnbexperience/eufemia/commit/53703768972db3fcf44a9c62c160a7235866c0ad)), closes [#2931](https://github.com/dnbexperience/eufemia/issues/2931) [#2904](https://github.com/dnbexperience/eufemia/issues/2904) [#2888](https://github.com/dnbexperience/eufemia/issues/2888)
* Updated Sbanken theming + improved screenshot test coverage for Radio+Checkbox ([#2931](https://github.com/dnbexperience/eufemia/issues/2931)) ([e42c81e](https://github.com/dnbexperience/eufemia/commit/e42c81e8e15f42ee410ea208d4c9ee3d7a0083dc))

## [10.14.0](https://github.com/dnbexperience/eufemia/compare/v10.13.0...v10.14.0) (2023-11-16)


### :memo: Documentation

* **Forms:** lists component specific props 1st ([#2892](https://github.com/dnbexperience/eufemia/issues/2892)) ([c05740c](https://github.com/dnbexperience/eufemia/commit/c05740cbd6905558f3c69e97571b85fe23ee2e37))
* **PhoneNumber:** remove unsupported props ([#2894](https://github.com/dnbexperience/eufemia/issues/2894)) ([4800a8e](https://github.com/dnbexperience/eufemia/commit/4800a8e0d6a63fe2ed701f32b1b77449bd00cd95))
* **PostalCodeAndCity:** remove unsupported props ([#2890](https://github.com/dnbexperience/eufemia/issues/2890)) ([fe1ee9e](https://github.com/dnbexperience/eufemia/commit/fe1ee9e77cb30995542c54f04cf0d3acdf626287))


### :sparkles: Features

* **Forms:** expiry field ([#2660](https://github.com/dnbexperience/eufemia/issues/2660)) ([af5aa61](https://github.com/dnbexperience/eufemia/commit/af5aa61f939bcc5ffd891ad99ef19a4d123b0e3f))
* **forms:** improved state management and reacting to more changed props ([#2882](https://github.com/dnbexperience/eufemia/issues/2882)) ([0ca9533](https://github.com/dnbexperience/eufemia/commit/0ca9533deaff48d2e714e8a04a04c97d0a8958c8))
* **Input:** add clear button event "on_clear" ([#2898](https://github.com/dnbexperience/eufemia/issues/2898)) ([eb6b722](https://github.com/dnbexperience/eufemia/commit/eb6b722b09861c809f5f8afacf31f655fe7d95ac))
* **Radio:** Sbanken styling ([#2888](https://github.com/dnbexperience/eufemia/issues/2888)) ([d7ffcf8](https://github.com/dnbexperience/eufemia/commit/d7ffcf80384d54f5268d99346b2832d634dd687f))


### :bug: Bug Fixes

* add "use client" to non hook components like the Button ([#2895](https://github.com/dnbexperience/eufemia/issues/2895)) ([2d54a13](https://github.com/dnbexperience/eufemia/commit/2d54a131b23e44d967270e4d54fd66fcb098e38c))
* **Autocomplete:** enhance logic for when to blur ([#2886](https://github.com/dnbexperience/eufemia/issues/2886)) ([ce5c3fa](https://github.com/dnbexperience/eufemia/commit/ce5c3fa9ab811f0f66a654bf9f1712a40f887b8f))
* **Autocomplete:** make clear button work with enter key ([#2901](https://github.com/dnbexperience/eufemia/issues/2901)) ([30007c4](https://github.com/dnbexperience/eufemia/commit/30007c4737105dcff9b64675d4b7528108b4e3c6)), closes [#2185](https://github.com/dnbexperience/eufemia/issues/2185)
* **FieldBlock:** enhance fieldset/legend detection ([#2902](https://github.com/dnbexperience/eufemia/issues/2902)) ([4c62052](https://github.com/dnbexperience/eufemia/commit/4c62052549b5e1e5e6311f8e330f0462b508741a)), closes [#2893](https://github.com/dnbexperience/eufemia/issues/2893)
* fix Flex and Grid export to work with Vite.js ([#2905](https://github.com/dnbexperience/eufemia/issues/2905)) ([ef83713](https://github.com/dnbexperience/eufemia/commit/ef837139425ab4427efb18dfb209330ec1aa33f6))
* fix vertical label_direction support for Radio group and ToggleButton group ([#2899](https://github.com/dnbexperience/eufemia/issues/2899)) ([d650c66](https://github.com/dnbexperience/eufemia/commit/d650c66743c8f02d83f28c0f1e2ac0dfee8b324d))
* **forms:** Field block error handling ([#2900](https://github.com/dnbexperience/eufemia/issues/2900)) ([9582c64](https://github.com/dnbexperience/eufemia/commit/9582c6498bd80619fb03920f40586d5f834d1fa4))
* **forms:** Improved message value replacements ([#2903](https://github.com/dnbexperience/eufemia/issues/2903)) ([a61140b](https://github.com/dnbexperience/eufemia/commit/a61140b247e98cd6338f21382f1916f91d937b64))
* **PhoneNumber:** keep selected countryCode value on blur ([#2869](https://github.com/dnbexperience/eufemia/issues/2869)) ([7e0f9c5](https://github.com/dnbexperience/eufemia/commit/7e0f9c55ccc07ac6dfeb2fa887adf66e6b61fe39))

## [10.13.0](https://github.com/dnbexperience/eufemia/compare/v10.12.0...v10.13.0) (2023-11-12)


### :bug: Bug Fixes

* **Autocomplete:** ensure correct value selection during data change ([#2863](https://github.com/dnbexperience/eufemia/issues/2863)) ([d229ec2](https://github.com/dnbexperience/eufemia/commit/d229ec212c3b1c6f01139cbbdf4a4403cee919c9))
* **Autocomplete:** ensure on_change is firered during dataset update ([266ab6a](https://github.com/dnbexperience/eufemia/commit/266ab6a92d462b0f0367e7dc1baf8ceb35fa7ccc))
* **PhoneNumber:** ensure correct selection of value ([#2852](https://github.com/dnbexperience/eufemia/issues/2852)) ([a20a764](https://github.com/dnbexperience/eufemia/commit/a20a76465f177c3912f4266f4dc8211846a4b8be))
* remove nullish operator to support Storybook v6 ([#2873](https://github.com/dnbexperience/eufemia/issues/2873)) ([f0bab63](https://github.com/dnbexperience/eufemia/commit/f0bab63cce5c52d6156ce6dc27e198f6b9250f8f))
* typescript react type resolution in monorepos ([#2866](https://github.com/dnbexperience/eufemia/issues/2866)) ([44f04f3](https://github.com/dnbexperience/eufemia/commit/44f04f3155ff45238c00a176280d6aaf1db3746b))


### :sparkles: Features

* **Accordion:** change sbanken expand icon to chevron ([#2854](https://github.com/dnbexperience/eufemia/issues/2854)) ([a7cb8b9](https://github.com/dnbexperience/eufemia/commit/a7cb8b929fadaa0c9a0fce78d0af1823a74b4aed))
* add "use client" to components that use client side only React APIs (support for RSC) ([#2874](https://github.com/dnbexperience/eufemia/issues/2874)) ([a84e962](https://github.com/dnbexperience/eufemia/commit/a84e962e0cf0ef9e9049088cd16563071a162962))
* **Button:** change sbanken primary button text color to white ([#2855](https://github.com/dnbexperience/eufemia/issues/2855)) ([1571138](https://github.com/dnbexperience/eufemia/commit/1571138a66cabb462bfc1279e660369a8683514b))
* **Typography:** change sbanken bold to medium ([#2808](https://github.com/dnbexperience/eufemia/issues/2808)) ([4b0f930](https://github.com/dnbexperience/eufemia/commit/4b0f9304e8e8deb8e542470221310e0b08f1a889))


### :memo: Documentation

* **About:** add Snorre/Henrik/Ynge as contributors ([#2885](https://github.com/dnbexperience/eufemia/issues/2885)) ([fff72da](https://github.com/dnbexperience/eufemia/commit/fff72da50bdb76aae1e62efa34b0124d5ae92343))
* **Autocomplete:** adds default value to keep_value props ([#2867](https://github.com/dnbexperience/eufemia/issues/2867)) ([7cae1fd](https://github.com/dnbexperience/eufemia/commit/7cae1fd75733bc7655f1138972f190fb768925a9))
* fix font docs ([#2849](https://github.com/dnbexperience/eufemia/issues/2849)) ([13beec9](https://github.com/dnbexperience/eufemia/commit/13beec964afadd8f19cc7e810b027cb40475fadc))
* **Ingress:** adds Ingress to docs ([#2879](https://github.com/dnbexperience/eufemia/issues/2879)) ([f771f3d](https://github.com/dnbexperience/eufemia/commit/f771f3d754f491e0e55c028a9d592e4fe68ced8d))
* **Lead:** adds Lead to docs ([#2877](https://github.com/dnbexperience/eufemia/issues/2877)) ([0c0da7f](https://github.com/dnbexperience/eufemia/commit/0c0da7fe8371944a97be8e44b99a067758876025))

## [10.12.0](https://github.com/dnbexperience/eufemia/compare/v10.11.0...v10.12.0) (2023-11-07)


### :sparkles: Features

* **MultiInputMask:** add support for multiple inputs ([#2736](https://github.com/dnbexperience/eufemia/issues/2736)) ([099c823](https://github.com/dnbexperience/eufemia/commit/099c823abd1094836d7d6b1f637d3cb4d5e7f273))
* **useTheme:** return boolean constants: isUi, isSbanken and isEiendom ([#2845](https://github.com/dnbexperience/eufemia/issues/2845)) ([d3bb9be](https://github.com/dnbexperience/eufemia/commit/d3bb9be507588ac4596e793b316238de94e7ca15))


### :memo: Documentation

* fix heading evels in contribution guide ([e67a05a](https://github.com/dnbexperience/eufemia/commit/e67a05a3ae8361279f6b5890bfa15ee0551863b6))
* fix heading levels in contribution guide ([#2853](https://github.com/dnbexperience/eufemia/issues/2853)) ([4c01854](https://github.com/dnbexperience/eufemia/commit/4c018545111243fc1a7a539ae4589321ef0c9add))
* **Theme:** enhance info about using the shared theme provider ([#2860](https://github.com/dnbexperience/eufemia/issues/2860)) ([dec0664](https://github.com/dnbexperience/eufemia/commit/dec066463a06965cbca67d5532d8f96c67bbbc38))


### :bug: Bug Fixes

* **Button:** element's type supports Link of react-router-dom ([#2858](https://github.com/dnbexperience/eufemia/issues/2858)) ([b90acdb](https://github.com/dnbexperience/eufemia/commit/b90acdba6528d8eff9befce6bc93ae0fdd87c5bb))
* **DrawerList:** Add focus style for Sbanken theme ([#2856](https://github.com/dnbexperience/eufemia/issues/2856)) ([1815342](https://github.com/dnbexperience/eufemia/commit/181534223feaa091573251ba3fb320462bffab34))
* **FormLabel:** move hover color logic to act on properties forId and onClick ([#2848](https://github.com/dnbexperience/eufemia/issues/2848)) ([43723ab](https://github.com/dnbexperience/eufemia/commit/43723ab8c143e36119a4a9a5a87f7d9b419876e8))
* **MultiInputMask:** incorrect legend hover and focus within effect ([#2861](https://github.com/dnbexperience/eufemia/issues/2861)) ([1cd6be4](https://github.com/dnbexperience/eufemia/commit/1cd6be4fdd39c9424365e2d9b394ecf0e34d2740))
* **PaymentCard:** overlay icon fill color ([#2846](https://github.com/dnbexperience/eufemia/issues/2846)) ([712a227](https://github.com/dnbexperience/eufemia/commit/712a2278094039a27a9df5c3739a053281c3ca8a))

## [10.11.0](https://github.com/dnbexperience/eufemia/compare/v10.10.0...v10.11.0) (2023-11-03)


### :sparkles: Features

* **breakpoints:** media query mixin offset options ([#2773](https://github.com/dnbexperience/eufemia/issues/2773)) ([d0c4c6d](https://github.com/dnbexperience/eufemia/commit/d0c4c6da965610b399eb9aa7d7a397b75670709e))
* **Dropdown:** add Drawerlist theme for Sbanken ([#2649](https://github.com/dnbexperience/eufemia/issues/2649)) ([3a69d7c](https://github.com/dnbexperience/eufemia/commit/3a69d7c6112158bbf9ff25ae39f34520aabde852))
* **FormLabel:** rewrite to TypeScript ([#2818](https://github.com/dnbexperience/eufemia/issues/2818)) ([2b3e419](https://github.com/dnbexperience/eufemia/commit/2b3e41997339be1e6a00be0c9220a9bc7e949492))
* **forms:** add autocomplete (autofill) support ([#2811](https://github.com/dnbexperience/eufemia/issues/2811)) ([342556c](https://github.com/dnbexperience/eufemia/commit/342556c88e376e1ff75bbcf61e352ed9f37ef2d1))
* **forms:** add Norwegian translation to country list ([#2814](https://github.com/dnbexperience/eufemia/issues/2814)) ([6073ab7](https://github.com/dnbexperience/eufemia/commit/6073ab793e521642587b7268c395c5f14849e049))
* **forms:** reset `sessionStorageId` on submit ([#2812](https://github.com/dnbexperience/eufemia/issues/2812)) ([cbbd9e5](https://github.com/dnbexperience/eufemia/commit/cbbd9e5d2510a534b472d860947e6a0a1bee72a3))
* **PaymentCard:** add styling for other card statuses ([#2777](https://github.com/dnbexperience/eufemia/issues/2777)) ([#2822](https://github.com/dnbexperience/eufemia/issues/2822)) ([195b083](https://github.com/dnbexperience/eufemia/commit/195b0835a89f3118befb9548f453bacd27c914cb))
* **SASS:** add allBetween media query breakpoint mixin ([#2779](https://github.com/dnbexperience/eufemia/issues/2779)) ([1c8e8ef](https://github.com/dnbexperience/eufemia/commit/1c8e8ef526177ed84d045e30a000de0b3ee14110))
* **Section:** add responsive props: breakout, outline, cornerRadius, backgroundColor, textColor and innerSpace ([#2791](https://github.com/dnbexperience/eufemia/issues/2791)) ([ed3ca99](https://github.com/dnbexperience/eufemia/commit/ed3ca9971c6e2b4533a391bc466590a6147bd160))
* **skip-link:** sbanken styling ([#2785](https://github.com/dnbexperience/eufemia/issues/2785)) ([f6d9ea3](https://github.com/dnbexperience/eufemia/commit/f6d9ea34944d0ef0d373d8114020e8cf90665f52))
* **Space:** add innerSpace prop with media query breakpoints support ([#2790](https://github.com/dnbexperience/eufemia/issues/2790)) ([3dffb90](https://github.com/dnbexperience/eufemia/commit/3dffb902132ea9bae3919c24b04783b15f474da9))
* **Upload:** singular texts when uploading single file ([#2783](https://github.com/dnbexperience/eufemia/issues/2783)) ([cbf1cb9](https://github.com/dnbexperience/eufemia/commit/cbf1cb98e5f13bbae18e99fae11b92c0565471c9))


### :bug: Bug Fixes

* **Anchor:** position icon left with target blank sbanken ([#2797](https://github.com/dnbexperience/eufemia/issues/2797)) ([d2d1779](https://github.com/dnbexperience/eufemia/commit/d2d177974489f85e5dc5af888a1b255d6c39e4f1))
* BreadcrumbItem when using to and element props ([#2813](https://github.com/dnbexperience/eufemia/issues/2813)) ([e7eff2d](https://github.com/dnbexperience/eufemia/commit/e7eff2d6767a746d699258175c19f0915e63c013))
* **Breadcrumb:** Pass rest props to item when not interactive ([#2798](https://github.com/dnbexperience/eufemia/issues/2798)) ([72de227](https://github.com/dnbexperience/eufemia/commit/72de227ab05be94ef514f1f2fe78a34847203417)), closes [/github.com/dnbexperience/eufemia/pull/2676/files#r1368576095](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/2676/files/issues/r1368576095)
* **FieldBlock:** add asFieldset property to force use fieldset/legend ([#2780](https://github.com/dnbexperience/eufemia/issues/2780)) ([bd1faed](https://github.com/dnbexperience/eufemia/commit/bd1faedb30e4e29987d8fa35e41b6d6fb3fe73dc))
* **FieldBlock:** fix alignment issue when element is fieldset ([#2786](https://github.com/dnbexperience/eufemia/issues/2786)) ([544424b](https://github.com/dnbexperience/eufemia/commit/544424bddb7d245aeb6179f186e68a0e648ad621))
* **forms:** enhance accessibility by using toggle buttons ([#2781](https://github.com/dnbexperience/eufemia/issues/2781)) ([aee0113](https://github.com/dnbexperience/eufemia/commit/aee0113382a216861e6c65ca08a15a834150b765))
* **forms:** fix Form.Element type ([#2796](https://github.com/dnbexperience/eufemia/issues/2796)) ([0b5dfa7](https://github.com/dnbexperience/eufemia/commit/0b5dfa7807b11752bc197e2a8e512801b4bce398))
* **forms:** Selection accessibility enhancement by using toggle buttons ([#2795](https://github.com/dnbexperience/eufemia/issues/2795)) ([6bc6062](https://github.com/dnbexperience/eufemia/commit/6bc6062cd107c4490e81bc5e121a47dbc65c115e))
* **forms:** Support undefined in toggle and button fields ([#2775](https://github.com/dnbexperience/eufemia/issues/2775)) ([a22fad5](https://github.com/dnbexperience/eufemia/commit/a22fad521d60a41dac298f6e9fa1e4acf457e20e))
* **GlobalStatus:** remove paragraph tag around title to allow children paragraphs ([#2800](https://github.com/dnbexperience/eufemia/issues/2800)) ([c0657bb](https://github.com/dnbexperience/eufemia/commit/c0657bb440cfaa9f65f657ae38391a493b91b892))
* **NumberFormat:** show em dash instead of NaN ([#2784](https://github.com/dnbexperience/eufemia/issues/2784)) ([ca65f4a](https://github.com/dnbexperience/eufemia/commit/ca65f4a272a13ec21dd80c9c67a951bcae9c71b7))
* **NumberMask:** as_number should default to locally given decimalSymbol ([#2810](https://github.com/dnbexperience/eufemia/issues/2810)) ([833f422](https://github.com/dnbexperience/eufemia/commit/833f422ef782a84e41932c09b6be082f8819b7c9))
* **PhoneNumber:** fix spacing prop support ([#2815](https://github.com/dnbexperience/eufemia/issues/2815)) ([c57e7d1](https://github.com/dnbexperience/eufemia/commit/c57e7d1c324b1429700705ae9674e31602a3140f)), closes [#2807](https://github.com/dnbexperience/eufemia/issues/2807)
* **TypeScript:** fix Grid and Flex export ([#2819](https://github.com/dnbexperience/eufemia/issues/2819)) ([5316fc0](https://github.com/dnbexperience/eufemia/commit/5316fc0d94af0f7384f2bd5793e001a0860cf5fb))
* **TypeScript:** make dynamic element prop compatible with e.g. Styled Component elements ([#2778](https://github.com/dnbexperience/eufemia/issues/2778)) ([8a6b766](https://github.com/dnbexperience/eufemia/commit/8a6b7661c7e8e5c1c1eb6fc039f117839d9eb210))
* **useMedia:** enhance SSR support by setting state during component mount ([#2774](https://github.com/dnbexperience/eufemia/issues/2774)) ([d72aa2b](https://github.com/dnbexperience/eufemia/commit/d72aa2b19bbbdaf4fbdde25269474d8c58037829))


### :memo: Documentation

* display anchors with icons using Anchor's icon prop ([#2801](https://github.com/dnbexperience/eufemia/issues/2801)) ([57e75ac](https://github.com/dnbexperience/eufemia/commit/57e75ac0833b3a19e011eee471efb5f8ea91709f))
* **FieldBlock:** removes excessive properties header ([e5d9cbe](https://github.com/dnbexperience/eufemia/commit/e5d9cbe95c8be4589708e1ea93fac0bb943cff65))
* **FieldBlock:** removes excessive properties header ([#2788](https://github.com/dnbexperience/eufemia/issues/2788)) ([bb739ea](https://github.com/dnbexperience/eufemia/commit/bb739eafd128bf77fbd7bc55085e18df42a8f49d))
* **FormSet:** spelling in deprecation docs ([#2827](https://github.com/dnbexperience/eufemia/issues/2827)) ([1bcbf60](https://github.com/dnbexperience/eufemia/commit/1bcbf60f5c71cef2489046280b20e12a98f6c63a))
* **PaymentCard:** sets card_number as required ([#2841](https://github.com/dnbexperience/eufemia/issues/2841)) ([b58978e](https://github.com/dnbexperience/eufemia/commit/b58978ed0a17335c98fec5e6fe09f8d5bd29a469))

## [10.10.0](https://github.com/dnbexperience/eufemia/compare/v10.9.0...v10.10.0) (2023-10-19)


### :memo: Documentation

* add info about how to find out what Eufemia version is used ([#2722](https://github.com/dnbexperience/eufemia/issues/2722)) ([0740b4c](https://github.com/dnbexperience/eufemia/commit/0740b4cc34f3d34f8bb5f085bde9e7e91377c55d))
* **ArraySelection:** removes redundant/circular link ([94ca03a](https://github.com/dnbexperience/eufemia/commit/94ca03a6930cd27c6572c94293942c1379d57638))
* **ArraySelection:** removes redundant/circular link ([#2735](https://github.com/dnbexperience/eufemia/issues/2735)) ([800589f](https://github.com/dnbexperience/eufemia/commit/800589fb7fcf90f20f0b3f67bd3dbbca4a85eef5))
* formats value prop as code ([#2692](https://github.com/dnbexperience/eufemia/issues/2692)) ([7c3b81e](https://github.com/dnbexperience/eufemia/commit/7c3b81e1d9855f3fdb8efffb51dc24f82fe00875))
* **Intro:** add breadcrumb for mitigate lack of orientation ([#2709](https://github.com/dnbexperience/eufemia/issues/2709)) ([69c3f16](https://github.com/dnbexperience/eufemia/commit/69c3f165da7e2d7c775dff96e01902e77f9b5e2b))
* **Layout:** fix import of ux-layout-spacing.png ([53db314](https://github.com/dnbexperience/eufemia/commit/53db314e37395e39f8e856f89deda23f76037829))
* **Layout:** fix import of ux-layout-spacing.png ([#2733](https://github.com/dnbexperience/eufemia/issues/2733)) ([60067b7](https://github.com/dnbexperience/eufemia/commit/60067b7b788813e0eb646658e01596a0c30b1891))
* **Layout:** move layout (spacing and media query) docs to layout component docs ([#2724](https://github.com/dnbexperience/eufemia/issues/2724)) ([3f1f809](https://github.com/dnbexperience/eufemia/commit/3f1f80989898d0ff5b7a70a8189ca4ffbaa6ad63))
* **Pagination:** Updated links to GitHub examples ([#2732](https://github.com/dnbexperience/eufemia/issues/2732)) ([3ced434](https://github.com/dnbexperience/eufemia/commit/3ced4349344d0f5f1ee66b5110be54ee4fda9ae7))
* **PaymentCard:** adds docs for formatCardNumber function ([c271cb6](https://github.com/dnbexperience/eufemia/commit/c271cb636f6d2e3ca9d8346761ffee655a078e33))
* **PaymentCard:** adds docs for formatCardNumber function ([#2702](https://github.com/dnbexperience/eufemia/issues/2702)) ([976c19f](https://github.com/dnbexperience/eufemia/commit/976c19f10f8f5fda87db72560aafbc94d4ec6fff))
* **PhoneNumber:** updates Component-specific props docs ([0265689](https://github.com/dnbexperience/eufemia/commit/0265689d81a774e2a09455c669c0526eb68ff3a8))
* **PhoneNumber:** updates Component-specific props docs ([#2688](https://github.com/dnbexperience/eufemia/issues/2688)) ([751c5b2](https://github.com/dnbexperience/eufemia/commit/751c5b2a8c5ba9d9f36dec91f28a87afaa82b4a3))
* **Portal:** add View Transition ([#2675](https://github.com/dnbexperience/eufemia/issues/2675)) ([4636276](https://github.com/dnbexperience/eufemia/commit/4636276bc5c3f0316fa400f464aa9b3c11bc2d7c))
* **Portal:** fix anchor hash highlighting ([#2705](https://github.com/dnbexperience/eufemia/issues/2705)) ([9c6299e](https://github.com/dnbexperience/eufemia/commit/9c6299e16b912e2fcbf6ff2fee387996e658f399))
* update docs about `gatsby-plugin-eufemia-theme-handler` ([#2740](https://github.com/dnbexperience/eufemia/issues/2740)) ([61074a7](https://github.com/dnbexperience/eufemia/commit/61074a78dadb69b41c81bdc2c9bccc421679b90a))


### :sparkles: Features

* **Anchor:** add correct icon padding + embed target blank icon for Sbanken compatibility ([#2770](https://github.com/dnbexperience/eufemia/issues/2770)) ([24cb49d](https://github.com/dnbexperience/eufemia/commit/24cb49d2ce92d8543d440a99795a1e3b5c5e0d46))
* **Anchor:** fix no-style and no-hover ([#2739](https://github.com/dnbexperience/eufemia/issues/2739)) ([3965e3c](https://github.com/dnbexperience/eufemia/commit/3965e3c5038557e159e583e9427c2c6de4016bc0))
* **Anchor:** hide anchor protocol icon ([#2749](https://github.com/dnbexperience/eufemia/issues/2749)) ([7472265](https://github.com/dnbexperience/eufemia/commit/7472265515c405e602695ad255b3dbd0a084a7a2))
* **Card:** add new Card component (beta) ([#2744](https://github.com/dnbexperience/eufemia/issues/2744)) ([cf0d5b6](https://github.com/dnbexperience/eufemia/commit/cf0d5b69940c44b0017fd4d1456f5b5e0d234552))
* deprecate FormRow and FormSet in favor of Flex layout and Forms Extension ([#2753](https://github.com/dnbexperience/eufemia/issues/2753)) ([6e392f9](https://github.com/dnbexperience/eufemia/commit/6e392f953edb9a30d76c73d8594abd38b423d721))
* **Dialog:** sbanken theme ([#2626](https://github.com/dnbexperience/eufemia/issues/2626)) ([f1781c1](https://github.com/dnbexperience/eufemia/commit/f1781c153e345bb8eb379a80a522bd19bf132c9a))
* **Dropdown:** add support for numeric values by using selectedKey or object based data entries ([#2666](https://github.com/dnbexperience/eufemia/issues/2666)) ([06281e4](https://github.com/dnbexperience/eufemia/commit/06281e4ce964c7e18c6307f7995befc2c74aa960))
* **Dropdown:** provide React refs support with the innerRef and buttonRef props ([#2665](https://github.com/dnbexperience/eufemia/issues/2665)) ([1d8d206](https://github.com/dnbexperience/eufemia/commit/1d8d206e30701737e56c2726e1d32c9a07f830f6))
* **fieldset:** add SASS mix-in `fieldsetReset` ([#2759](https://github.com/dnbexperience/eufemia/issues/2759)) ([c16be9b](https://github.com/dnbexperience/eufemia/commit/c16be9b40510d81535f95c9863b0bcc7542ac692))
* **Flex:** add new Flex layout component ([#2748](https://github.com/dnbexperience/eufemia/issues/2748)) ([def1ad1](https://github.com/dnbexperience/eufemia/commit/def1ad17fddb793fb0e9c1e24d86f4c268459713))
* **Form.Handler:** call reset on form submit ([#2765](https://github.com/dnbexperience/eufemia/issues/2765)) ([4356b0f](https://github.com/dnbexperience/eufemia/commit/4356b0f0ab6720804e18470457ddaba2095efda5))
* **FormLabel and FieldBlock:** add heading typography size prop ([#2758](https://github.com/dnbexperience/eufemia/issues/2758)) ([3916fc2](https://github.com/dnbexperience/eufemia/commit/3916fc2191d646e0f95a40a2205ed0261288a0cd))
* **Forms:** add innerRef to Field.String for React.ref support ([#2679](https://github.com/dnbexperience/eufemia/issues/2679)) ([930b89d](https://github.com/dnbexperience/eufemia/commit/930b89d88c8bb53e2fd9af633a658734285fdd8f))
* **Forms:** alignSelf on Flex components ([#2662](https://github.com/dnbexperience/eufemia/issues/2662)) ([0c46e36](https://github.com/dnbexperience/eufemia/commit/0c46e36dc2fa08be9505dd07e4654f4f8a1832a8))
* **Forms:** enable tree-shaking compatibility ([#2713](https://github.com/dnbexperience/eufemia/issues/2713)) ([711bde7](https://github.com/dnbexperience/eufemia/commit/711bde7e5722db8e83d582e2622757f8ee241ed4))
* **forms:** Session storage on Provider and add defaultData prop ([62413f0](https://github.com/dnbexperience/eufemia/commit/62413f0ff727492011dec6677d625c612ab4e69d))
* **Layout:** add css Grid component ([#2731](https://github.com/dnbexperience/eufemia/issues/2731)) ([25ffbf8](https://github.com/dnbexperience/eufemia/commit/25ffbf8de970e4c52014629487fbbcbfc69aab02))
* **Layout:** release Layout component ([#2628](https://github.com/dnbexperience/eufemia/issues/2628)) ([47f0018](https://github.com/dnbexperience/eufemia/commit/47f00188f7d080cff7b4e1e1336d1c62c88d49d7))
* **Slider:** Sbanken styling ([#2716](https://github.com/dnbexperience/eufemia/issues/2716)) ([b8751bd](https://github.com/dnbexperience/eufemia/commit/b8751bd86c1ad52046c9489f8a6a08ecdded391b))
* **Tabs:** Sbanken styling ([#2682](https://github.com/dnbexperience/eufemia/issues/2682)) ([68da886](https://github.com/dnbexperience/eufemia/commit/68da8869d561b18d880769d4b7d862464085b3e2)), closes [#2640](https://github.com/dnbexperience/eufemia/issues/2640) [#2631](https://github.com/dnbexperience/eufemia/issues/2631) [#2622](https://github.com/dnbexperience/eufemia/issues/2622)
* **Theme:** generate all properties in javascript file ([#2658](https://github.com/dnbexperience/eufemia/issues/2658)) ([6c70c63](https://github.com/dnbexperience/eufemia/commit/6c70c635dfc32aa9bea7b7d1d95a187a5d7ef7f3))
* **Theming:** refactor the internal structure + align DNB Eiendom theme and Anchor styles ([#2653](https://github.com/dnbexperience/eufemia/issues/2653)) ([c46caed](https://github.com/dnbexperience/eufemia/commit/c46caed1c1a4ed71a4187c8e0d27b47b78c384a0))
* **Upload:** Sbanken styling ([#2693](https://github.com/dnbexperience/eufemia/issues/2693)) ([992e10c](https://github.com/dnbexperience/eufemia/commit/992e10c05c813a21cebb9f8635c002ee707a9f8b))
* **useMedia:** add new props: queries and breakpoints ([#2661](https://github.com/dnbexperience/eufemia/issues/2661)) ([a59633f](https://github.com/dnbexperience/eufemia/commit/a59633fb8aa1e7419420a52b9ff33d3e385077f2))


### :bug: Bug Fixes

* **Anchor:** add --anchor-background-gutter ([#2721](https://github.com/dnbexperience/eufemia/issues/2721)) ([48a6084](https://github.com/dnbexperience/eufemia/commit/48a6084b091c1ffe5ddb47200cfa6fd5f2050ea5))
* **Autocomplete:** fix rehydration disturbance ([#2761](https://github.com/dnbexperience/eufemia/issues/2761)) ([9ac6a4d](https://github.com/dnbexperience/eufemia/commit/9ac6a4da21eef36102dd636998a12239e458eb70))
* **Breadcrumb:** allow Button props on Breadcrumb.Item ([#2676](https://github.com/dnbexperience/eufemia/issues/2676)) ([ed95f6b](https://github.com/dnbexperience/eufemia/commit/ed95f6b608aa39ac9bf7d8356749047000bedc0e))
* **Breadcrumb:** avoid React warning about duplication of key ([#2687](https://github.com/dnbexperience/eufemia/issues/2687)) ([1e7d100](https://github.com/dnbexperience/eufemia/commit/1e7d100db6a95bed45c714de9b01e4c0d2429f74))
* **DrawerList:** ensure links do wrap to new line ([#2700](https://github.com/dnbexperience/eufemia/issues/2700)) ([c994df4](https://github.com/dnbexperience/eufemia/commit/c994df45325aa8c153eeed65a7b79a7499bbf807)), closes [#2698](https://github.com/dnbexperience/eufemia/issues/2698)
* **FieldBlock:** automate label in label detection ([#2668](https://github.com/dnbexperience/eufemia/issues/2668)) ([5902824](https://github.com/dnbexperience/eufemia/commit/59028240b905671cf6eebfd1c489f742adfbe411))
* **Forms:** ensure error shows correct border and text colors ([#2717](https://github.com/dnbexperience/eufemia/issues/2717)) ([f1bc34d](https://github.com/dnbexperience/eufemia/commit/f1bc34d713105c893d95aa6f339131cb33124e13))
* **forms:** Handle error display when no focus and blur events is called ([#2737](https://github.com/dnbexperience/eufemia/issues/2737)) ([63f6e87](https://github.com/dnbexperience/eufemia/commit/63f6e870bfe86226eba13225f8bbbd95b4aad293))
* **forms:** Phone number merged with country code, bugfixes ([#2755](https://github.com/dnbexperience/eufemia/issues/2755)) ([5e13b6c](https://github.com/dnbexperience/eufemia/commit/5e13b6c4f808423bedb820b20f98a29ec0d79f95))
* **Forms:** precede children over title in Selection ([#2664](https://github.com/dnbexperience/eufemia/issues/2664)) ([52e8d49](https://github.com/dnbexperience/eufemia/commit/52e8d49be5e973c4e864b9653d5135c53c7a6b56))
* **GlobalStatus:** error state not applied on prop change ([#2768](https://github.com/dnbexperience/eufemia/issues/2768)) ([8864c4c](https://github.com/dnbexperience/eufemia/commit/8864c4c7583bea0c7a3db897a017cb71d4ccb2ff))
* **Lead:** can now accept className prop without losing styling ([#2741](https://github.com/dnbexperience/eufemia/issues/2741)) ([3d68caa](https://github.com/dnbexperience/eufemia/commit/3d68caa64e2e178c3a250fe9f5a66d842961ab2e))
* **PaymentCard:** correctly export type for getCardData function ([cfaacdb](https://github.com/dnbexperience/eufemia/commit/cfaacdb70869bd995b5e3120decf2d801aea8bef))
* **PaymentCard:** correctly export type for getCardData function ([#2704](https://github.com/dnbexperience/eufemia/issues/2704)) ([288de11](https://github.com/dnbexperience/eufemia/commit/288de110f12fb6df032bd82c061a184f81059630))
* **PaymentCard:** removes excess space when formatting card number ([f079fa6](https://github.com/dnbexperience/eufemia/commit/f079fa6d2c6be2c3773f8e489d7048ae7811e0d5))
* **PaymentCard:** removes excess space when formatting card number ([#2703](https://github.com/dnbexperience/eufemia/issues/2703)) ([4e35d27](https://github.com/dnbexperience/eufemia/commit/4e35d27b8f4a4690ff902f735098acefb2575b13))
* **Slider:** allow negative values ([#2697](https://github.com/dnbexperience/eufemia/issues/2697)) ([380bb51](https://github.com/dnbexperience/eufemia/commit/380bb513e9589ae4a0b9c844cffbeb6b5159be71))
* **Slider:** make key navigation work when swapping position ([#2729](https://github.com/dnbexperience/eufemia/issues/2729)) ([b19a41e](https://github.com/dnbexperience/eufemia/commit/b19a41e3ef48f0e49caf93b4c540446cc2757215))
* **StepIndicator:** react on changes to `is_current` data property ([#2757](https://github.com/dnbexperience/eufemia/issues/2757)) ([b3a1a0f](https://github.com/dnbexperience/eufemia/commit/b3a1a0f413313e341595f3a78ea6b02107202187))

## [10.9.0](https://github.com/dnbexperience/eufemia/compare/v10.8.0...v10.9.0) (2023-09-13)


### :memo: Documentation

* **Dialog:** Dialog.Actions to Dialog.Action ([#2621](https://github.com/dnbexperience/eufemia/issues/2621)) ([9292305](https://github.com/dnbexperience/eufemia/commit/9292305260ee0a4771fc11ee3cbf77b2d2be5f67))
* **Forms:** restructure docs ([#2615](https://github.com/dnbexperience/eufemia/issues/2615)) ([ee24eba](https://github.com/dnbexperience/eufemia/commit/ee24ebaa73fd544e647b19413c1022bcf0a8256c))
* **Modal:** updates components that inherits ModalPropTypes as camel case ([#2618](https://github.com/dnbexperience/eufemia/issues/2618)) ([beacaba](https://github.com/dnbexperience/eufemia/commit/beacaba96257f8469e94a437c48ce2b15bb0eb29))
* **PaymentCard:** removes unused maker docs ([#2619](https://github.com/dnbexperience/eufemia/issues/2619)) ([dfeb6d5](https://github.com/dnbexperience/eufemia/commit/dfeb6d52e7547c4e77c795c410528b5621467c51))
* **v10:** changes to PaymentCard's height & width ([#2643](https://github.com/dnbexperience/eufemia/issues/2643)) ([6985287](https://github.com/dnbexperience/eufemia/commit/69852877a0ace540969ff15ea9b41a1f416c87ad))


### :sparkles: Features

* **Blockquote:** fix sbanken styling, added small screen version ([#2639](https://github.com/dnbexperience/eufemia/issues/2639)) ([d63d30d](https://github.com/dnbexperience/eufemia/commit/d63d30d6f584788c7ce9fb16ccad5f9bcc7558ed))
* **Forms:** add `Form.Handler` component ([#2644](https://github.com/dnbexperience/eufemia/issues/2644)) ([82873c7](https://github.com/dnbexperience/eufemia/commit/82873c7881023327287dd59d3540b23aa7d94649))
* **Forms:** add Iterate.Array feature and merge useField and useValue to one hook useDataValue ([#2635](https://github.com/dnbexperience/eufemia/issues/2635)) ([b056994](https://github.com/dnbexperience/eufemia/commit/b056994251e0925d852e6d50fa3c9cbb90f2ec4e))
* **Forms:** merge FieldGroup into FieldBlock ([#2645](https://github.com/dnbexperience/eufemia/issues/2645)) ([56a1867](https://github.com/dnbexperience/eufemia/commit/56a18673e626bd893cf81da14347cab97d2ee10d))
* **Heading:** remove font ligatures for sbanken headings ([#2614](https://github.com/dnbexperience/eufemia/issues/2614)) ([06c126f](https://github.com/dnbexperience/eufemia/commit/06c126f144766a89a691c563075bb34d6eb91998))
* **PaymentCard:** updates height and weight to reflect Figma sketches ([#2617](https://github.com/dnbexperience/eufemia/issues/2617)) ([418fd2e](https://github.com/dnbexperience/eufemia/commit/418fd2ec927152d3b61e95d9ed0312eabb3f3080))
* **ProgressIndicator:** Sbanken styling ([#2631](https://github.com/dnbexperience/eufemia/issues/2631)) ([03de0e3](https://github.com/dnbexperience/eufemia/commit/03de0e3f9d1b4d24e044566883bb49529c61988b))
* **Skeleton:** Sbanken styling ([#2622](https://github.com/dnbexperience/eufemia/issues/2622)) ([fbc0083](https://github.com/dnbexperience/eufemia/commit/fbc0083783abc4baf69db86bf67696dad0f81c12))
* **Tooltip:** Sbanken styling ([#2640](https://github.com/dnbexperience/eufemia/issues/2640)) ([f358b0a](https://github.com/dnbexperience/eufemia/commit/f358b0a2239e0109145d514571e6d85a9001d76b)), closes [#2622](https://github.com/dnbexperience/eufemia/issues/2622) [#2631](https://github.com/dnbexperience/eufemia/issues/2631)


### :bug: Bug Fixes

* **Dialog:** select whole input on focus given by focusSelector ([#2655](https://github.com/dnbexperience/eufemia/issues/2655)) ([a04f99a](https://github.com/dnbexperience/eufemia/commit/a04f99a033f13deeafe259104acfa41bf1b96e23)), closes [#2652](https://github.com/dnbexperience/eufemia/issues/2652)
* **Forms:** add polyfill for structuredClone ([#2636](https://github.com/dnbexperience/eufemia/issues/2636)) ([f00da48](https://github.com/dnbexperience/eufemia/commit/f00da4879ee9df40fb32ac8d14768e98b7833472))
* **Forms:** focus InputMasked when clicking label ([#2632](https://github.com/dnbexperience/eufemia/issues/2632)) ([3233326](https://github.com/dnbexperience/eufemia/commit/323332643b3899c43bb03b21662c012295c75c61))
* **Forms:** remove FirstName, LastName and InfoCardSection ([#2627](https://github.com/dnbexperience/eufemia/issues/2627)) ([a2106cc](https://github.com/dnbexperience/eufemia/commit/a2106cc8e7a7c242a5fcff77aa03372da3d45755))
* **MaskedInput:** make cleanedValue contain leading zeroes ([#2610](https://github.com/dnbexperience/eufemia/issues/2610)) ([86ad122](https://github.com/dnbexperience/eufemia/commit/86ad122eabac2e7d58fa04a43e622e162a5baae1))
* **ProgressIndicator:** ensure correct positioning inside its boundary ([#2623](https://github.com/dnbexperience/eufemia/issues/2623)) ([0592961](https://github.com/dnbexperience/eufemia/commit/05929618640f27b0a253bdaffd853acb154a09a5))
* **Section:** omit usage of nullish operator (??) to still support Storybook v4 ([#2646](https://github.com/dnbexperience/eufemia/issues/2646)) ([9a2e52f](https://github.com/dnbexperience/eufemia/commit/9a2e52fcf6d2a0c76a8a06cceb99524e16c2beb9))
* **useMedia:** ensure this hook works in StrictMode ([#2630](https://github.com/dnbexperience/eufemia/issues/2630)) ([74ebed9](https://github.com/dnbexperience/eufemia/commit/74ebed91690a8305854916ee8adccc69b2bd7e02))

## [10.8.0](https://github.com/dnbexperience/eufemia/compare/v10.7.0...v10.8.0) (2023-09-06)


### :memo: Documentation

* **NumberFormat:** add source for number formatting in documentation ([#2596](https://github.com/dnbexperience/eufemia/issues/2596)) ([74415a9](https://github.com/dnbexperience/eufemia/commit/74415a948afbafb7eda749bc3c8db5ee3287ee4d))
* **Section:** move deprecated styles into a seperate docs page ([#2585](https://github.com/dnbexperience/eufemia/issues/2585)) ([d36a4fb](https://github.com/dnbexperience/eufemia/commit/d36a4fb9476ee5865512f4f3dd45ebe88a1a3941)), closes [#2582](https://github.com/dnbexperience/eufemia/issues/2582)
* **StepIndicator:** fix link to drawer docs ([#2593](https://github.com/dnbexperience/eufemia/issues/2593)) ([31c17eb](https://github.com/dnbexperience/eufemia/commit/31c17eb6908dfd886e4689f1b35fdca871fd3a30))


### :sparkles: Features

* **Accordion:** sbanken theme ([#2586](https://github.com/dnbexperience/eufemia/issues/2586)) ([90cc4ac](https://github.com/dnbexperience/eufemia/commit/90cc4acfa4c489d7325c137034b8c2a6da70bd2c))
* **Breadcrumb:** Add Sbanken style ([#2601](https://github.com/dnbexperience/eufemia/issues/2601)) ([8efbf4a](https://github.com/dnbexperience/eufemia/commit/8efbf4a74420bfc4bf7f7bff2fa4cd5d23a0bc9e))
* **Checkbox:** add innerRef prop to link a React Ref to the input element ([#2595](https://github.com/dnbexperience/eufemia/issues/2595)) ([095ee6d](https://github.com/dnbexperience/eufemia/commit/095ee6d450ab1019c02e8539cca7d6965d9569d4))
* **Forms:** improvements ([#2603](https://github.com/dnbexperience/eufemia/issues/2603)) ([2a86a4a](https://github.com/dnbexperience/eufemia/commit/2a86a4adfccf520d71cf5a225a7fb763b0faec34))
* **FormStatus:** Add Sbanken styles ([#2605](https://github.com/dnbexperience/eufemia/issues/2605)) ([79dfaee](https://github.com/dnbexperience/eufemia/commit/79dfaee03282af010c0698c301cd208131543d4b))
* **GlobalStatus:** Add warning and success states and Sbanken style ([#2584](https://github.com/dnbexperience/eufemia/issues/2584)) ([33ba995](https://github.com/dnbexperience/eufemia/commit/33ba995a251bd679a09780cbd2cfca9706c79fc4))
* **Radio:** add innerRef prop to link a React Ref to the input element ([#2598](https://github.com/dnbexperience/eufemia/issues/2598)) ([348ad80](https://github.com/dnbexperience/eufemia/commit/348ad8062776e1f89a48f41139ba1cd5682a3688))
* **Switch:** add innerRef prop to link a React Ref to the input element ([#2597](https://github.com/dnbexperience/eufemia/issues/2597)) ([efa7733](https://github.com/dnbexperience/eufemia/commit/efa77330040cbb7281b8e6552efe559f45d5dd3c))
* **Typography, Heading:** change font sizes and added small screen sizes for sbanken ([#2599](https://github.com/dnbexperience/eufemia/issues/2599)) ([96974ab](https://github.com/dnbexperience/eufemia/commit/96974ab1c23c5b6e2066ed4d95135611433faa79))


### :bug: Bug Fixes

* add external link icon to anchor with element as children ([#2520](https://github.com/dnbexperience/eufemia/issues/2520)) ([2566dae](https://github.com/dnbexperience/eufemia/commit/2566dae67e203b0b624a89891d95638dac02dc0a))
* **Autocomplete:** make independent_width work properly ([#2589](https://github.com/dnbexperience/eufemia/issues/2589)) ([90cfc58](https://github.com/dnbexperience/eufemia/commit/90cfc58efe39e4aae20bc6cbb84735427d3eab7c))
* **Drawer:** add support for closeButtonAttributes ([#2616](https://github.com/dnbexperience/eufemia/issues/2616)) ([d01d2fe](https://github.com/dnbexperience/eufemia/commit/d01d2fe618c109632523c8db00432db94fbbd1ca))
* **Drawer:** render Drawer.Navigation when hideCloseButton is true ([#2613](https://github.com/dnbexperience/eufemia/issues/2613)) ([fb8b031](https://github.com/dnbexperience/eufemia/commit/fb8b0318930d285e5c71c149b7491bd9db4e5e8a))
* **Forms:** align card border ([#2588](https://github.com/dnbexperience/eufemia/issues/2588)) ([cd5f695](https://github.com/dnbexperience/eufemia/commit/cd5f6956ffa21d4abfd79a9da7dff11436960a23)), closes [#2587](https://github.com/dnbexperience/eufemia/issues/2587)
* **Forms:** make PhoneNumber country code searchable by numbers ([#2590](https://github.com/dnbexperience/eufemia/issues/2590)) ([6bdb62f](https://github.com/dnbexperience/eufemia/commit/6bdb62fe95eb9fb43095c0bad9fbb2ffd23761bd))
* **Forms:** use rem unit over px ([#2587](https://github.com/dnbexperience/eufemia/issues/2587)) ([fe9aee4](https://github.com/dnbexperience/eufemia/commit/fe9aee41a7f4ec249a5bb4961185c46f54ac5972))
* **InputMasked:** ensure a value with null does not remove the placeholder ([#2594](https://github.com/dnbexperience/eufemia/issues/2594)) ([3d13453](https://github.com/dnbexperience/eufemia/commit/3d1345306e290a88afb8ba208484f5e04bbf063c))
* **MaskedInput:** correct keep_placeholder css selector ([#2608](https://github.com/dnbexperience/eufemia/issues/2608)) ([509c740](https://github.com/dnbexperience/eufemia/commit/509c740408fd8f6d45922a4b3f96bf60e6a8396f))
* **TimeLine:** make it possible to update state of subtitle from another subtitle ([#2600](https://github.com/dnbexperience/eufemia/issues/2600)) ([50302dd](https://github.com/dnbexperience/eufemia/commit/50302dd077254d26da00a4a96c57e38c48cc069d))

## [10.7.0](https://github.com/dnbexperience/eufemia/compare/v10.6.0...v10.7.0) (2023-08-23)


### :bug: Bug Fixes

* **Forms:** Fix provider rerender issue and FlexContainer spacing issue ([#2570](https://github.com/dnbexperience/eufemia/issues/2570)) ([aafdbc1](https://github.com/dnbexperience/eufemia/commit/aafdbc1f24893861d53b359ac589314a8e262156))
* **Forms:** sets SubHeading's size to medium ([#2581](https://github.com/dnbexperience/eufemia/issues/2581)) ([7e2ccbf](https://github.com/dnbexperience/eufemia/commit/7e2ccbfee047627e794896848c0d4f6ffe073310))


### :sparkles: Features

* **Button:** sbanken css refactoring ([#2565](https://github.com/dnbexperience/eufemia/issues/2565)) ([3b9d6b0](https://github.com/dnbexperience/eufemia/commit/3b9d6b0bbc40d3319edd372d14c55278d20f8bbd))
* **FormLabel:** sbanken ([#2563](https://github.com/dnbexperience/eufemia/issues/2563)) ([308a0b6](https://github.com/dnbexperience/eufemia/commit/308a0b6f08a4f5e346c744b0790deb5b96f4c064))
* **FormRow:** sbanken theme ([#2564](https://github.com/dnbexperience/eufemia/issues/2564)) ([968efdd](https://github.com/dnbexperience/eufemia/commit/968efdd12584d76b0ee83d66e47531aa33bc733b))
* **Forms:** Field width features upgraded ([#2580](https://github.com/dnbexperience/eufemia/issues/2580)) ([73b1650](https://github.com/dnbexperience/eufemia/commit/73b1650254cc4c997ad5e81f5e8b8a1bc16b40f5))
* **Pagination:** sbanken theme ([#2569](https://github.com/dnbexperience/eufemia/issues/2569)) ([d08a492](https://github.com/dnbexperience/eufemia/commit/d08a49241f61aa8c5b08d353881597d6f17b907d))
* **PaymentCard:** adds card_status not_active ([#2578](https://github.com/dnbexperience/eufemia/issues/2578)) ([03469e6](https://github.com/dnbexperience/eufemia/commit/03469e6b83d9faa16b6d61e1116f7e559602891a))
* **Section:** Sbanken styling and new variant prop ([#2582](https://github.com/dnbexperience/eufemia/issues/2582)) ([416db6d](https://github.com/dnbexperience/eufemia/commit/416db6d8d05e319f4571731696d23f3267e61457))

## [10.6.0](https://github.com/dnbexperience/eufemia/compare/v10.5.0...v10.6.0) (2023-08-17)


### :memo: Documentation

* add "Messageboxes" to FormStatus for the equivalent Figma name ([#2560](https://github.com/dnbexperience/eufemia/issues/2560)) ([bf6a19f](https://github.com/dnbexperience/eufemia/commit/bf6a19f2a0c33019b50907d1d56e76868ad5e670))
* add docs on how to link to a specific theme ([#2555](https://github.com/dnbexperience/eufemia/issues/2555)) ([54b9f1b](https://github.com/dnbexperience/eufemia/commit/54b9f1b5fe9c715d133849282bdcfd6c497d6f9e)), closes [#2374](https://github.com/dnbexperience/eufemia/issues/2374)
* add theming link to the contribution guide ([#2558](https://github.com/dnbexperience/eufemia/issues/2558)) ([e88bd72](https://github.com/dnbexperience/eufemia/commit/e88bd72f46231fc1c7b5dc52ff6d4aa9bee05b31))


### :sparkles: Features

* **Anchor:** inline style sbanken ([#2550](https://github.com/dnbexperience/eufemia/issues/2550)) ([3511f09](https://github.com/dnbexperience/eufemia/commit/3511f093ea803d5e93ccb066ca79f9827a4b7354))
* **Button:** sbanken hover and error ([#2523](https://github.com/dnbexperience/eufemia/issues/2523)) ([3ea2850](https://github.com/dnbexperience/eufemia/commit/3ea28508d6e6010e5b8b3aa98f8b1a9bb17e81c0))
* **Forms:** Extension (beta) for simplified implementation of web forms through tailored functionality for layout and data handling ([#2420](https://github.com/dnbexperience/eufemia/issues/2420)) ([74700c0](https://github.com/dnbexperience/eufemia/commit/74700c00486e35ea97661f4a7013bd4f02ee504c))
* **Input:** sbanken styling ([#2540](https://github.com/dnbexperience/eufemia/issues/2540)) ([db36f09](https://github.com/dnbexperience/eufemia/commit/db36f09b31bb559cd3b39290ac15fca8334e9353))
* **Textarea:** sbanken theme ([#2551](https://github.com/dnbexperience/eufemia/issues/2551)) ([d8cfb1c](https://github.com/dnbexperience/eufemia/commit/d8cfb1cf48c86b845dc63d5bbd80f3bc5de61137))


### :bug: Bug Fixes

* **Forms:** fix circular imports issue ([#2566](https://github.com/dnbexperience/eufemia/issues/2566)) ([3ac4276](https://github.com/dnbexperience/eufemia/commit/3ac427679afff41ce3be183b501aa587477494a0))
* **NumberFormat:** accept options like maximumFractionDigits ([#2557](https://github.com/dnbexperience/eufemia/issues/2557)) ([2e09e80](https://github.com/dnbexperience/eufemia/commit/2e09e8004806ff207ac6b844b787614d32ebf9fe))

## [10.5.0](https://github.com/dnbexperience/eufemia/compare/v10.4.2...v10.5.0) (2023-08-10)


### :bug: Bug Fixes

* **Modal:** removes attr data-dnb-modal-active from document.body ([#2547](https://github.com/dnbexperience/eufemia/issues/2547)) ([b831454](https://github.com/dnbexperience/eufemia/commit/b8314545b4fbd132d97a1c6b0a701ff1b4a5dda7))


### :sparkles: Features

* **Anchor:** focus-visible and test coverage ([#2521](https://github.com/dnbexperience/eufemia/issues/2521)) ([d07e9b0](https://github.com/dnbexperience/eufemia/commit/d07e9b04f07f00a86ec3a99b87c03499a0735c69))
* **Dialog:** add hideConfirm-prop ([5029982](https://github.com/dnbexperience/eufemia/commit/50299824a4370243921b1cc0d3a378dea2146e54))

## [10.4.2](https://github.com/dnbexperience/eufemia/compare/v10.4.1...v10.4.2) (2023-07-27)


### :bug: Bug Fixes

* **Tabs:** fix error with a single Tabs.Content as children ([#2534](https://github.com/dnbexperience/eufemia/issues/2534)) ([215e52c](https://github.com/dnbexperience/eufemia/commit/215e52c7eb1e4c4cd2c2cdf5a4f1b9b8e1f2adfc))

## [10.4.1](https://github.com/dnbexperience/eufemia/compare/v10.4.0...v10.4.1) (2023-07-25)


### :bug: Bug Fixes

* **Tabs:** fix error when using StrictMode ([7f1e807](https://github.com/dnbexperience/eufemia/commit/7f1e807fe1df00caf51f1bc59914d121f956d3c9))

## [10.4.0](https://github.com/dnbexperience/eufemia/compare/v10.3.0...v10.4.0) (2023-07-06)


### :bug: Bug Fixes

* fix various types in tests and examples to prepare for React v18 ([#2507](https://github.com/dnbexperience/eufemia/issues/2507)) ([06c3202](https://github.com/dnbexperience/eufemia/commit/06c32026484148552c4f7f5deb42a960734a1617))


### :sparkles: Features

* add support for React v18 ([#2481](https://github.com/dnbexperience/eufemia/issues/2481)) ([31a2d2b](https://github.com/dnbexperience/eufemia/commit/31a2d2b3c0cc458d5573599ab8779c731fc6a84c)), closes [/github.com/dnbexperience/eufemia/pull/2481#issuecomment-1601630753](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/2481/issues/issuecomment-1601630753) [/github.com/dnbexperience/eufemia/pull/2481#issuecomment-1601606984](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/2481/issues/issuecomment-1601606984) [/github.com/dnbexperience/eufemia/blob/1e8021ccea7b03f9a60c78cc6760388ac36b55b1/packages/dnb-eufemia/src/components/tooltip/TooltipPortal.tsx#L8](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/blob/1e8021ccea7b03f9a60c78cc6760388ac36b55b1/packages/dnb-eufemia/src/components/tooltip/TooltipPortal.tsx/issues/L8) [#2511](https://github.com/dnbexperience/eufemia/issues/2511)
* **Avatar:** sbanken styling ([#2510](https://github.com/dnbexperience/eufemia/issues/2510)) ([389ccc0](https://github.com/dnbexperience/eufemia/commit/389ccc0ddb76d972875ce200ff98a84f17632c34))
* **Button:** sbanken tertiary icon button hover and focus ([#2512](https://github.com/dnbexperience/eufemia/issues/2512)) ([23b3935](https://github.com/dnbexperience/eufemia/commit/23b393578c508515d3ab99802f6883c6554b22e4))
* **ScrollView:** add sbanken styling to scrollbar ([#2514](https://github.com/dnbexperience/eufemia/issues/2514)) ([5d2011e](https://github.com/dnbexperience/eufemia/commit/5d2011ef4a2e0d4bfd29838313d85991e744cc18))
* **Table:** Sbanken styling ([#2513](https://github.com/dnbexperience/eufemia/issues/2513)) ([bd0ae68](https://github.com/dnbexperience/eufemia/commit/bd0ae683a18e210d28882ef4b88d57b1a6d696c2))
* **Tooltip:** remove group property to add React v18 compatibility ([#2511](https://github.com/dnbexperience/eufemia/issues/2511)) ([4e882eb](https://github.com/dnbexperience/eufemia/commit/4e882eb0634f7877272f52d355dcc44ec13a4633))

## [10.3.0](https://github.com/dnbexperience/eufemia/compare/v10.2.0...v10.3.0) (2023-06-27)


### :barber: Style Changes

* **Typography:** added css variables needed for heading theming ([#2348](https://github.com/dnbexperience/eufemia/issues/2348)) ([224d8b2](https://github.com/dnbexperience/eufemia/commit/224d8b2f56691ad1832ceb2fdf9ebafc18bdb223))


### :sparkles: Features

* upgrade babel runtime to latest ([#2503](https://github.com/dnbexperience/eufemia/issues/2503)) ([d5daeb7](https://github.com/dnbexperience/eufemia/commit/d5daeb714eb8831b61100d43c3085a000f1172b5)), closes [#2481](https://github.com/dnbexperience/eufemia/issues/2481)


### :memo: Documentation

* minor improvement in intro ([c686ab5](https://github.com/dnbexperience/eufemia/commit/c686ab57f311f00ee33ab9e9e8df6d3beb8a6e77))
* minor improvement in intro ([#2506](https://github.com/dnbexperience/eufemia/issues/2506)) ([521e89f](https://github.com/dnbexperience/eufemia/commit/521e89fae4be2b174fcfe05e5f81dd3b97221dc4))
* show license in /license page ([#2500](https://github.com/dnbexperience/eufemia/issues/2500)) ([217bcd8](https://github.com/dnbexperience/eufemia/commit/217bcd8b8c2a955bdd755e7f54e02718950e54cd))

## [10.2.0](https://github.com/dnbexperience/eufemia/compare/v10.1.0...v10.2.0) (2023-06-23)


### :sparkles: Features

* **Heading:** rewrite to TypeScript with React Hooks ([#2492](https://github.com/dnbexperience/eufemia/issues/2492)) ([3780036](https://github.com/dnbexperience/eufemia/commit/37800368179456168f397f151521cfea6584b3c2))


### :memo: Documentation

* **Accordion:** correct description ([#2484](https://github.com/dnbexperience/eufemia/issues/2484)) ([aa491ca](https://github.com/dnbexperience/eufemia/commit/aa491cad1581c5ae434218314bffdbd090c565e3))
* add example on how to import styles from within CSS ([#2495](https://github.com/dnbexperience/eufemia/issues/2495)) ([c2a98b1](https://github.com/dnbexperience/eufemia/commit/c2a98b1cb138e10217af3b551548e0b4eedc838a))
* **DatePicker:** removes disabled from example description ([#2491](https://github.com/dnbexperience/eufemia/issues/2491)) ([fc0b2e1](https://github.com/dnbexperience/eufemia/commit/fc0b2e1c5abb97a4ef3f843853b1b32b00b584ca))
* **GlobalStatus:** false is not an accepted value for title prop ([#2479](https://github.com/dnbexperience/eufemia/issues/2479)) ([a71cbde](https://github.com/dnbexperience/eufemia/commit/a71cbdee4a7dc14943730c6e5df31ef81f3cc8c3))


### :bug: Bug Fixes

* **Button:** disabled DatePicker button ([#2490](https://github.com/dnbexperience/eufemia/issues/2490)) ([cd02bbf](https://github.com/dnbexperience/eufemia/commit/cd02bbf987b2342f3887fdee786ceda971d34023))
* **InfoCard:** set max-width on text content ([#2493](https://github.com/dnbexperience/eufemia/issues/2493)) ([df0c870](https://github.com/dnbexperience/eufemia/commit/df0c870f542e9dfeefb4cc2ad94184da64933921))

## [10.1.0](https://github.com/dnbexperience/eufemia/compare/v10.0.0...v10.1.0) (2023-06-16)


### :barber: Style Changes

* **Button:** remove tertiary button padding sbanken ([#2422](https://github.com/dnbexperience/eufemia/issues/2422)) ([cc9a18b](https://github.com/dnbexperience/eufemia/commit/cc9a18b4d2664c81aacb3d9ae017d8ecb8bff14f))


### :sparkles: Features

* added icons accounting, candle_stick, fortune_ball and scan ([#2424](https://github.com/dnbexperience/eufemia/issues/2424)) ([47ef4b0](https://github.com/dnbexperience/eufemia/commit/47ef4b03efaab3f974f8516d8f7a171776672b78))
* **Portal:** copy color values to the clipboard ([#2427](https://github.com/dnbexperience/eufemia/issues/2427)) ([c570e51](https://github.com/dnbexperience/eufemia/commit/c570e519d5fd8b2c59d1de0909d1f93b0d63530e))
* **Portal:** copy icon name to clipboard ([3c1944c](https://github.com/dnbexperience/eufemia/commit/3c1944ce9a5ccccc1b1a0a72cf03d139db7ba45b))


### :memo: Documentation

* **v10:** improves docs of Modal migration ([#2446](https://github.com/dnbexperience/eufemia/issues/2446)) ([d78d940](https://github.com/dnbexperience/eufemia/commit/d78d940d759c90062c1782109f8c3de4915bee27))


### :bug: Bug Fixes

* **Autocomplete:** fix stretched form status when using suffix ([#2455](https://github.com/dnbexperience/eufemia/issues/2455)) ([5518728](https://github.com/dnbexperience/eufemia/commit/5518728c857f5b9ac92eb522b89700da91efa3be))
* **Icons:** fix broken Android icons ([#2391](https://github.com/dnbexperience/eufemia/issues/2391)) ([ea12f23](https://github.com/dnbexperience/eufemia/commit/ea12f2348b2cbb5dba935f79aac4bf61eb1c1049))
* **Icons:** remove left-over icon types (TypeScript) ([#2476](https://github.com/dnbexperience/eufemia/issues/2476)) ([80d3dac](https://github.com/dnbexperience/eufemia/commit/80d3dac502229fb8aca79aaa214432dac9b92065))
* include themed style in `ui-theme-tags` CSS package ([#2383](https://github.com/dnbexperience/eufemia/issues/2383)) ([d24c10d](https://github.com/dnbexperience/eufemia/commit/d24c10d4032c6138db01f4e3fce5c552a31061ac))
* **InputMasked:** make `inner_ref` work when provided as a function ([#2461](https://github.com/dnbexperience/eufemia/issues/2461)) ([5f59c50](https://github.com/dnbexperience/eufemia/commit/5f59c504eade4f43be226a2d7f1cbee2da9b45f6))

## [10.0.0](https://github.com/dnbexperience/eufemia/compare/v9.47.6...v10.0.0) (2023-06-01)


### ⚠ BREAKING CHANGES

* **Anchor:** Anchor was moved form `/elements` to `/components`
* **StylisPlugin:** Stylis plugin, `import stylisPlugin from '@dnb/eufemia/style/stylis'`, has been removed.
* - The package dnb-theme-ui was renamed to ui-theme-basis.
- The package dnb-ui-components was renamed and moved inside a theme /style/themes/theme-ui/ui-theme-components.*.
- dnb-ui-tags was renamed and moved form /style/dnb-ui-tags.* to /style/themes/theme-ui/ui-theme-tags.*.
* SCSS mixin was renamed from `fakeFocus` to `focusRing` as well as `removeFakeFocus` to `removeFocusRing`.
* 
* - CSS Packages such as `dnb-ui-basis` and `dnb-ui-core` do not contain the fonts anymore. Fonts are now only a part of a theme file, such as: `/style/themes/theme-ui/dnb-theme-ui.*`.
- The CSS package `dnb-ui-fonts` is moved inside a theme folder `/themes/theme-ui`
* The DNB font is moved inside a subfolder in /assets/fonts/dnb/...
* **Modal:** - Modal: Remove deprecated `mode` prop – it will default to `custom` mode. Use rather the `Dialog` or the `Drawer` component.
* Remove support for Web Components and Vue
* re-define Media Query Breakpoints and layout width
* Read the docs about migration: https://eufemia.dnb.no/uilib/about-the-lib/releases/eufemia/v10-info

* remove web components and vue support (#1946) ([ab7379e](https://github.com/dnbexperience/eufemia/commit/ab7379e44eca7649c14512b2e74e34bd04123abc)), closes [#1946](https://github.com/dnbexperience/eufemia/issues/1946)
* re-define Media Query Breakpoints and layout width (#1373) ([e0a11ce](https://github.com/dnbexperience/eufemia/commit/e0a11ce472a1802e5df7edc104f906385bb586ac)), closes [#1373](https://github.com/dnbexperience/eufemia/issues/1373)
* v10 ([b7d6348](https://github.com/dnbexperience/eufemia/commit/b7d63488f970c424a42f8a7ca68fe27a654727c8))


### :barber: Style Changes

* **Button:** smaller tertiary button focus effect for Sbanken ([#2319](https://github.com/dnbexperience/eufemia/issues/2319)) ([aa3ab7d](https://github.com/dnbexperience/eufemia/commit/aa3ab7d5c80ab014a4a191599756b7f1a735ab17))
* move :root vars into their component itself ([#2102](https://github.com/dnbexperience/eufemia/issues/2102)) ([60a53fe](https://github.com/dnbexperience/eufemia/commit/60a53fe8b336b3f141ffe016d0f4e84db5c23403))


### :bug: Bug Fixes

* **Accordion:** enhance TypeScript type definitions ([035c0fb](https://github.com/dnbexperience/eufemia/commit/035c0fb43016950479c1c70bed06f861d4d730e1))
* **Anchor:** comments Anchor's inner_ref usage ([#1919](https://github.com/dnbexperience/eufemia/issues/1919)) ([b3623e9](https://github.com/dnbexperience/eufemia/commit/b3623e970a76ec057a49c34ba250a173e5c343a2))
* **Anchor:** ensure id is passed down ([#2016](https://github.com/dnbexperience/eufemia/issues/2016)) ([e8efd09](https://github.com/dnbexperience/eufemia/commit/e8efd09940440aa081a1cf7d4f6f5ace925b18aa))
* **Autocomplete:** add HorizontalItem TypeScript type definition ([f97f6ea](https://github.com/dnbexperience/eufemia/commit/f97f6eabb0e61de0513be7c40d2afdee7b000541))
* **Badge:** enhance semantic / accessibility and inherit skeleton from provider ([#1967](https://github.com/dnbexperience/eufemia/issues/1967)) ([42e20a7](https://github.com/dnbexperience/eufemia/commit/42e20a7f24c39a1d6f35ad5a7acaa56959f376b6))
* **Button:** align large icon size to be same as in Figma ([#2239](https://github.com/dnbexperience/eufemia/issues/2239)) ([33e41e7](https://github.com/dnbexperience/eufemia/commit/33e41e743d720a862698031e2653eb88b8b12477))
* **Button:** fix icon alignment issue when left positioned ([#2371](https://github.com/dnbexperience/eufemia/issues/2371)) ([9250f15](https://github.com/dnbexperience/eufemia/commit/9250f1512632547ccb5fac1815706ee1ead03fad))
* **Button:** remove left and right padding of tertiary button ([88bec0c](https://github.com/dnbexperience/eufemia/commit/88bec0c722e0cc190eefdc471ab0fd1e898b09d4))
* **DatePicker:** fix text prop for submit and cancel buttons ([#2254](https://github.com/dnbexperience/eufemia/issues/2254)) ([b5f1bfa](https://github.com/dnbexperience/eufemia/commit/b5f1bfae6838930cd301463cd7ed10abee2cdcdc))
* **DatePicker:** make focus handling on input work on second click ([#2039](https://github.com/dnbexperience/eufemia/issues/2039)) ([7a66806](https://github.com/dnbexperience/eufemia/commit/7a668065dedff86f3acc524ec1f4c820cd74bb61))
* **Datepicker:** reset and cancel button gap ([6056009](https://github.com/dnbexperience/eufemia/commit/6056009eb8330698430e177d5448329f5dc05d76))
* **DatePicker:** shortcut buttons ([#2266](https://github.com/dnbexperience/eufemia/issues/2266)) ([eb79f77](https://github.com/dnbexperience/eufemia/commit/eb79f779d766db3acf286b3cb3fa3c06f6d01513))
* **Dialog:** make action buttons responsive ([#2373](https://github.com/dnbexperience/eufemia/issues/2373)) ([3e1f146](https://github.com/dnbexperience/eufemia/commit/3e1f14632905709164ed141aa88a60f0fb5c7f6b))
* **Dl:** ensure horizontal wrap no matter what available space ([#1965](https://github.com/dnbexperience/eufemia/issues/1965)) ([8e5729a](https://github.com/dnbexperience/eufemia/commit/8e5729ab4f3683d6dd72242c5f09f8ef617fc483))
* **DrawerList:** enhance TypeScript definition types ([5f7fd54](https://github.com/dnbexperience/eufemia/commit/5f7fd54cf0dd1c945ac500a0474fa6943581f179))
* **Dropdown:** enhance TypeScript definition types ([514f6fa](https://github.com/dnbexperience/eufemia/commit/514f6fac7fc2b27136a66285e203ac0f2c86ece9))
* enhance scrollbar appearance ([#2046](https://github.com/dnbexperience/eufemia/issues/2046)) ([237331a](https://github.com/dnbexperience/eufemia/commit/237331a22db4ea964bf0c13a2916f34be24035d4))
* fix breadcumb alignment after tertiary button changes ([9f4a9a6](https://github.com/dnbexperience/eufemia/commit/9f4a9a655b57d8d00a4104a23e04ad78a17c2829))
* fix pagination alignment after tertiary button changes ([037a391](https://github.com/dnbexperience/eufemia/commit/037a391d7f70f82ee338e12b9f7147b657094d36))
* **GlobalStatus:** enhance TypeScript definition types ([dc58836](https://github.com/dnbexperience/eufemia/commit/dc58836b1405a1044847d134468b2daecfd35e30))
* **Heading:** enhance TypeScript definition types ([c3c736b](https://github.com/dnbexperience/eufemia/commit/c3c736b37d535f0cc5d9c48a1790b54a20749fb6))
* **Icon:** enhance alignment when used in paragraphs ([#2368](https://github.com/dnbexperience/eufemia/issues/2368)) ([78cc1e4](https://github.com/dnbexperience/eufemia/commit/78cc1e413b899decae168772f620172d66fd09e9))
* **IconPrimary:** correct ts file extension usage ([#2289](https://github.com/dnbexperience/eufemia/issues/2289)) ([ad485bc](https://github.com/dnbexperience/eufemia/commit/ad485bc28254eba15594ad4cc06844edcb34ab1e))
* **InfoCard:** enhance accessibility + set max width of 60ch ([#1977](https://github.com/dnbexperience/eufemia/issues/1977)) ([e2075f3](https://github.com/dnbexperience/eufemia/commit/e2075f3e7c3d563c8c2dafb042a3eca93fea869a))
* **InputMasked:** expose inner_ref input element when useRef is used ([#2042](https://github.com/dnbexperience/eufemia/issues/2042)) ([b52bbe0](https://github.com/dnbexperience/eufemia/commit/b52bbe03255a0e025c06058c6394539e7afdddc3))
* **InputMasked:** fix integerLimit issue when combined with decimals ([#2338](https://github.com/dnbexperience/eufemia/issues/2338)) ([04c30e9](https://github.com/dnbexperience/eufemia/commit/04c30e9064907b6f6d34d6ce5ac63a20e8a6e2de))
* **InputMasked:** on custom mask – avoid interaction stall after focus ([#2269](https://github.com/dnbexperience/eufemia/issues/2269)) ([aa0300f](https://github.com/dnbexperience/eufemia/commit/aa0300ff3d7685fc36f7fa5aea5856969582e311))
* make docs/portal Windows compatible by properly handle backslashes and newlines ([#2038](https://github.com/dnbexperience/eufemia/issues/2038)) ([1196819](https://github.com/dnbexperience/eufemia/commit/11968199a050ca9221dca8fe6848319ac87aa371))
* **MediaQuery:** enhance TypeScript types ([d93bd54](https://github.com/dnbexperience/eufemia/commit/d93bd543335fe2d5c99ba26351a50dcae36c9e31))
* **Modal:** make children accept function with close method in parameters ([#2015](https://github.com/dnbexperience/eufemia/issues/2015)) ([bacc1f1](https://github.com/dnbexperience/eufemia/commit/bacc1f15308ec0601b8f6e609994c0a154e2e024))
* **NumberFormat:** fix tooltip theme inheritance ([#2354](https://github.com/dnbexperience/eufemia/issues/2354)) ([ddffa58](https://github.com/dnbexperience/eufemia/commit/ddffa58c6873ef26dffdb9e89c190444285a567b))
* **NumberFormat:** hide screen reader only text from being copied as HTML ([#2240](https://github.com/dnbexperience/eufemia/issues/2240)) ([26b6039](https://github.com/dnbexperience/eufemia/commit/26b6039d2f2a5419da13ba6b37411a7bbd2ea69b))
* omit showing Tooltip after Dialog or Drawer got closed ([#2375](https://github.com/dnbexperience/eufemia/issues/2375)) ([1c41dfe](https://github.com/dnbexperience/eufemia/commit/1c41dfe1da4b9270dd22aba84f30a6c27edd953c))
* **Pagination:** enhance Pagination and InfinityScroller TypeScript definitions ([5a7de9d](https://github.com/dnbexperience/eufemia/commit/5a7de9dd0aff0f8548eb4257c3b98753a8e97be8))
* **Pagination:** fix hover style state after click to be emerald-green ([#2032](https://github.com/dnbexperience/eufemia/issues/2032)) ([2c399e8](https://github.com/dnbexperience/eufemia/commit/2c399e87459a17e4455bcfc50924c360bd1534d7))
* remove `maintained node versions` from .browserslistrc ([#1917](https://github.com/dnbexperience/eufemia/issues/1917)) ([3e9b0d8](https://github.com/dnbexperience/eufemia/commit/3e9b0d8928da4c4ee9c6a3c08de63dac3228b5e0)), closes [#1912](https://github.com/dnbexperience/eufemia/issues/1912)
* remove FormRow context support from /elements ([#2031](https://github.com/dnbexperience/eufemia/issues/2031)) ([6560a80](https://github.com/dnbexperience/eufemia/commit/6560a80ebc2923a8eb9f239046b058790bb4fa73))
* **ScrollView:** avoid usage of useLayoutEffect during SSR ([#2012](https://github.com/dnbexperience/eufemia/issues/2012)) ([6246afc](https://github.com/dnbexperience/eufemia/commit/6246afc2818f7182619c50ac825761cc3ce9eed3))
* **Skeleton:** add Skeleton.Exclude types ([b9512ff](https://github.com/dnbexperience/eufemia/commit/b9512ffb5657c0042cf15dcd9be94318d90740c3))
* **StepIndicator:** fix TypeScript spacing types ([c304d47](https://github.com/dnbexperience/eufemia/commit/c304d47dae56a154239a48858ea923c7450b4ff5))
* **Timeline:** use ordered list element ([#1962](https://github.com/dnbexperience/eufemia/issues/1962)) ([bfc3004](https://github.com/dnbexperience/eufemia/commit/bfc3004209babb1040d378b1fb09032ce6c501c0))
* **ToggleButton:** fixes error when pressing enter ([#2183](https://github.com/dnbexperience/eufemia/issues/2183)) ([da95ee4](https://github.com/dnbexperience/eufemia/commit/da95ee4057d9eca5176673b9053ee3bee2508b66))
* upgrade Stylelint from v13 to v15 ([#1995](https://github.com/dnbexperience/eufemia/issues/1995)) ([b4ca07c](https://github.com/dnbexperience/eufemia/commit/b4ca07c12653294ad8695f33eb4d07c11eb6dd62))
* **VisuallyHidden:** force properties to overcome unwanted CSS specificity ([#2366](https://github.com/dnbexperience/eufemia/issues/2366)) ([ed088de](https://github.com/dnbexperience/eufemia/commit/ed088debc0aecc40040c07080914ff4ec9cb84b0))


### :sparkles: Features

* **Accordion:** export type AccordionIconPosition ([ff05f9f](https://github.com/dnbexperience/eufemia/commit/ff05f9f27568e40b39614715053ab2fd90709cee))
* add shared Theme component and useTheme hook ([#2112](https://github.com/dnbexperience/eufemia/issues/2112)) ([9f88b71](https://github.com/dnbexperience/eufemia/commit/9f88b71240029a13571e2a721868907b6a5e9bb8))
* **Anchor:** add `scrollToHash` feature ([#2290](https://github.com/dnbexperience/eufemia/issues/2290)) ([246eaa9](https://github.com/dnbexperience/eufemia/commit/246eaa9d47d4b149b2fecced09d7c3dc7c70edfe)), closes [#2286](https://github.com/dnbexperience/eufemia/issues/2286)
* **Anchor:** always show focus when `dnb-anchor--focus` is used ([#2364](https://github.com/dnbexperience/eufemia/issues/2364)) ([541e889](https://github.com/dnbexperience/eufemia/commit/541e889e817e7d2efd6b478dfcc26aad39e51a17))
* **Anchor:** create styles for Sbanken ([#2250](https://github.com/dnbexperience/eufemia/issues/2250)) ([208e891](https://github.com/dnbexperience/eufemia/commit/208e89135859bd82427b475008d7f3799619f299))
* **Anchor:** deprecate property target_blank_title ([#1882](https://github.com/dnbexperience/eufemia/issues/1882)) ([065321e](https://github.com/dnbexperience/eufemia/commit/065321eca3933e72a9f045414d30086b11c02db2))
* **Anchor:** move from elements to components ([#2275](https://github.com/dnbexperience/eufemia/issues/2275)) ([fdb5680](https://github.com/dnbexperience/eufemia/commit/fdb568089fee0c10914709a55e93424c5c7eb862))
* **Anchor:** remove horizontal padding ([#2365](https://github.com/dnbexperience/eufemia/issues/2365)) ([106c02f](https://github.com/dnbexperience/eufemia/commit/106c02f0cebdbdacbbd43b3fea8e0c325e08f9ca))
* **Anchor:** Sbanken styling, added icon props ([#2318](https://github.com/dnbexperience/eufemia/issues/2318)) ([c6dcd03](https://github.com/dnbexperience/eufemia/commit/c6dcd03608a4de06f11d741b4aaf6cad7bf7ae18))
* **Autocomplete:** export AutocompleteData type ([#2299](https://github.com/dnbexperience/eufemia/issues/2299)) ([0315b14](https://github.com/dnbexperience/eufemia/commit/0315b14960480823f2937a67e2a8b769192cfbae))
* **Autocomplete:** export AutocompleteOptionsRender type ([#2300](https://github.com/dnbexperience/eufemia/issues/2300)) ([becf345](https://github.com/dnbexperience/eufemia/commit/becf3451b6a788087b0822054a67e69d4293168c))
* build pure component css packages (without deps) ([#1928](https://github.com/dnbexperience/eufemia/issues/1928)) ([0af6b60](https://github.com/dnbexperience/eufemia/commit/0af6b607c72dd96ea16debc63cb703310f0ebb4d))
* **build:** replace node-sass with dart-sass ([#1934](https://github.com/dnbexperience/eufemia/issues/1934)) ([87f918f](https://github.com/dnbexperience/eufemia/commit/87f918f763ab5c33af2cb2b66c5fc98f5e623038))
* **Button:** export type ButtonIcon ([bb4d70e](https://github.com/dnbexperience/eufemia/commit/bb4d70e974ff01694dceac760adcc5722a9b9241))
* **Button:** sbanken styling ([#2273](https://github.com/dnbexperience/eufemia/issues/2273)) ([f53faa0](https://github.com/dnbexperience/eufemia/commit/f53faa0b032559a16785f9cd217c6bbe6b910b98))
* **Checkbox:** deprecate default_state property ([#1863](https://github.com/dnbexperience/eufemia/issues/1863)) ([a022de3](https://github.com/dnbexperience/eufemia/commit/a022de37661dcfec3df09638cfbb01986fa7d853))
* deprecate StepIndicator v1 ([#1840](https://github.com/dnbexperience/eufemia/issues/1840)) ([33d6fc2](https://github.com/dnbexperience/eufemia/commit/33d6fc28d959da3ec3bc267684de6e96b291600b))
* **Dialog:** adds ReactNode as type for texts ([#2294](https://github.com/dnbexperience/eufemia/issues/2294)) ([5a18768](https://github.com/dnbexperience/eufemia/commit/5a18768f25bb41aa75b152786c9532f5de0bd932))
* **DrawerList:** remove use_drawer_on_mobile & enable_closest_observer ([#1879](https://github.com/dnbexperience/eufemia/issues/1879)) ([e1bcfb0](https://github.com/dnbexperience/eufemia/commit/e1bcfb02f3a0d58a7acd09fb5d1c9b23c03df736))
* **Dropdown:** export DropdownData type ([#2298](https://github.com/dnbexperience/eufemia/issues/2298)) ([81a0619](https://github.com/dnbexperience/eufemia/commit/81a0619590e94a6965dbee028c46ae065a2165fd))
* **Dropdown:** remove deprecated selected_item property ([#1870](https://github.com/dnbexperience/eufemia/issues/1870)) ([ac509ca](https://github.com/dnbexperience/eufemia/commit/ac509cab7927a491fc1777d6e4c8d245d8e8caaf))
* **Element:** deprecate css, class, inner_ref, skeleton_method ([#1859](https://github.com/dnbexperience/eufemia/issues/1859)) ([5ef5292](https://github.com/dnbexperience/eufemia/commit/5ef52927f12e3717796296cb7a2b4e661f868a72))
* expose package version ([#2327](https://github.com/dnbexperience/eufemia/issues/2327)) ([2a51dfc](https://github.com/dnbexperience/eufemia/commit/2a51dfce9551761aa380137e95e937688a12a3dd))
* **FormRow:** remove indent feature ([#1975](https://github.com/dnbexperience/eufemia/issues/1975)) ([9c69439](https://github.com/dnbexperience/eufemia/commit/9c69439749ad5dc7a9c08e09f511323a8c1a438d))
* **FormStatus:** remove deprecated status property ([#1914](https://github.com/dnbexperience/eufemia/issues/1914)) ([75fe76c](https://github.com/dnbexperience/eufemia/commit/75fe76cc04baed994f4c3697f16bedeb817d9142))
* **GlobalError:** add new styles (no illustrations anymore) ([#2381](https://github.com/dnbexperience/eufemia/issues/2381)) ([cf18ccd](https://github.com/dnbexperience/eufemia/commit/cf18ccd8319533b16366e410c61a4bdbf33b060d))
* **GlobalStatus:** add possibility for a custom message (replace `global_status_id` with `globalStatus` prop) ([#2351](https://github.com/dnbexperience/eufemia/issues/2351)) ([551d87e](https://github.com/dnbexperience/eufemia/commit/551d87e74ad3f480219c09edf8263bf2b956fbf1))
* **GlobalStatus:** deprecate AddStatus & Set ([#1891](https://github.com/dnbexperience/eufemia/issues/1891)) ([680b2c8](https://github.com/dnbexperience/eufemia/commit/680b2c8e7fb5bc20e6e50cadd43f272b98caaaaa))
* **H:** deprecate is and style_type properties ([#1856](https://github.com/dnbexperience/eufemia/issues/1856)) ([41c2ae8](https://github.com/dnbexperience/eufemia/commit/41c2ae8d124a305929eb90009ff20bef9e00f12a))
* **HelpButton:** remove `modal_props` in favour of `render` ([#2333](https://github.com/dnbexperience/eufemia/issues/2333)) ([f95e249](https://github.com/dnbexperience/eufemia/commit/f95e249ed870771d769cd5fdd3ab382733367a1b))
* **Helpers:** deprecate .dnb-sr-only--inline & .dnb-not-sr-only ([#1865](https://github.com/dnbexperience/eufemia/issues/1865)) ([7789778](https://github.com/dnbexperience/eufemia/commit/77897787183dba721a85d2b3ba0929b0c659c7b4))
* **Icons:** add new icons `handshake`, `heavy_equipment`, `id_card`, `investment_account`, `keyfigures`, `portfolio_analytics`, `sea_transport`, `shield_lock`, `file_zip`, `bus`, `building_shopping`, `handshake`, `heavy_equipment` ([#2178](https://github.com/dnbexperience/eufemia/issues/2178)) ([5e57d0d](https://github.com/dnbexperience/eufemia/commit/5e57d0dbff74c42d0155581766162ffd428283b0))
* **Icons:** move all icons assets to `dnb` subfolder: assets/icons/dnb/*.svg ([#2187](https://github.com/dnbexperience/eufemia/issues/2187)) ([15b19b7](https://github.com/dnbexperience/eufemia/commit/15b19b703f9d21fa4499e9a661b00ead0a3750c1))
* **Icons:** remove iOS (PDF) icons library support ([#2170](https://github.com/dnbexperience/eufemia/issues/2170)) ([6063ff3](https://github.com/dnbexperience/eufemia/commit/6063ff3ab40b9942012a081f1b3fb164f0fac840))
* include all type definitions in repo ([#1996](https://github.com/dnbexperience/eufemia/issues/1996)) ([a5d07fe](https://github.com/dnbexperience/eufemia/commit/a5d07fe0071c45243edd20bc739bbd3d51fc312a))
* **InputMasked:** ATTENTION! make allowLeadingZeroes default to true ([#1126](https://github.com/dnbexperience/eufemia/issues/1126)) ([dfddc3a](https://github.com/dnbexperience/eufemia/commit/dfddc3abfbd65a85ef0e96be92fb22cfbc347043))
* **Logo:** Add brand and variant params for Sbanken logo ([#2271](https://github.com/dnbexperience/eufemia/issues/2271)) ([577e9b4](https://github.com/dnbexperience/eufemia/commit/577e9b44ee88fc187a26c41cf29e771bd2c3fed7))
* **Modal, Dialog, Drawer:** remove closeButtonAttributes ([#1926](https://github.com/dnbexperience/eufemia/issues/1926)) ([80c69ee](https://github.com/dnbexperience/eufemia/commit/80c69ee4b1b7d4d4ce8acd0ab289a246f23dbe1e))
* **Modal:** remove deprecated mode prop ([#1993](https://github.com/dnbexperience/eufemia/issues/1993)) ([7769b77](https://github.com/dnbexperience/eufemia/commit/7769b772a04f53b435fb7f8ca7be32601b5feac6))
* **Modal:** remove deprecated trigger_ props ([#1918](https://github.com/dnbexperience/eufemia/issues/1918)) ([0582254](https://github.com/dnbexperience/eufemia/commit/0582254159e0d44818fefd953718751549a55038))
* move `dnb-ui-fonts` package inside `/style/themes/theme-ui/` ([9dfa3d6](https://github.com/dnbexperience/eufemia/commit/9dfa3d6969a98b32db12181828706ec7f8fb6078))
* move `dnb-ui-tags` to themes ([#2140](https://github.com/dnbexperience/eufemia/issues/2140)) ([0a49595](https://github.com/dnbexperience/eufemia/commit/0a49595b9995f380464c5bc7b4e9dd152f0f45ee))
* move `properties.scss` into theme ui ([#2035](https://github.com/dnbexperience/eufemia/issues/2035)) ([dce2a3a](https://github.com/dnbexperience/eufemia/commit/dce2a3a430397ffec5650a3c1458e045cc303a8f))
* move browser assets to dnb subfolder ([#2083](https://github.com/dnbexperience/eufemia/issues/2083)) ([e0cf868](https://github.com/dnbexperience/eufemia/commit/e0cf868ce8c2dfa6e1c46807693b12251ab2d909))
* move DNB font in subfolder ([fdb05f3](https://github.com/dnbexperience/eufemia/commit/fdb05f35040feb84d57c406ce2f39408cd4d7bb1))
* move DNB icons to subfolder (with v9 compatibility) ([#2200](https://github.com/dnbexperience/eufemia/issues/2200)) ([fd23310](https://github.com/dnbexperience/eufemia/commit/fd2331007333ba712f8e8ef1ac0d5e49647e7780))
* move dnb image assets to own subfolder ([#2099](https://github.com/dnbexperience/eufemia/issues/2099)) ([4101cca](https://github.com/dnbexperience/eufemia/commit/4101cca8977da6dfbd3403e4e3c4d98733deae99))
* new browserslist config for es6 builds ([#1833](https://github.com/dnbexperience/eufemia/issues/1833)) ([0f02859](https://github.com/dnbexperience/eufemia/commit/0f028594d1f59972e671b82e79fc40c68aa22b6f))
* **Number:** Removes component ([#1924](https://github.com/dnbexperience/eufemia/issues/1924)) ([5ecb3aa](https://github.com/dnbexperience/eufemia/commit/5ecb3aa325b97fbe89f5a38cb003bbe4c32c2758))
* **Pagination:** replace `page` with `pageNumber` ([3d538da](https://github.com/dnbexperience/eufemia/commit/3d538dae5b318cd9395924f1ba6717e9a3b409d6))
* **PaymentCard:** new card designs & new products ([#2264](https://github.com/dnbexperience/eufemia/issues/2264)) ([2e3d790](https://github.com/dnbexperience/eufemia/commit/2e3d790c6e75e7e260764be7e18c5dfa0a40b448))
* **PaymentCard:** rename type Metalic to Metallic ([#2226](https://github.com/dnbexperience/eufemia/issues/2226)) ([00c30ea](https://github.com/dnbexperience/eufemia/commit/00c30ea88afd4e070199ac8412197f9a5e888cbd))
* **P:** deprecate style_type property ([#1855](https://github.com/dnbexperience/eufemia/issues/1855)) ([f45e60c](https://github.com/dnbexperience/eufemia/commit/f45e60c9181f4b68b2219537162a4269010a3b7c))
* **P:** remove deprecated class dnb-p--ingress ([#1872](https://github.com/dnbexperience/eufemia/issues/1872)) ([2837e8e](https://github.com/dnbexperience/eufemia/commit/2837e8e5e49e4583d09fe115bc3ac5c4e3a8017b))
* remove support for internet explorer ([#1807](https://github.com/dnbexperience/eufemia/issues/1807)) ([44b3803](https://github.com/dnbexperience/eufemia/commit/44b380385d66fa8cb258923d4b3f17d632ae5a5e))
* rename SCSS mixin `fakeFocus` to `focusRing` ([#2110](https://github.com/dnbexperience/eufemia/issues/2110)) ([47b5e47](https://github.com/dnbexperience/eufemia/commit/47b5e47ab2ceeabef887d05ac48702cf46e749f9))
* replace visual test driver to jest-image-snapshot and Firefox (Playwright) ([#1945](https://github.com/dnbexperience/eufemia/issues/1945)) ([6402aa5](https://github.com/dnbexperience/eufemia/commit/6402aa5224acc53140a0e2509bd9335e4b601227)), closes [/github.com/puppeteer/puppeteer/issues/7514#issuecomment-1005917527](https://github.com/dnbexperience//github.com/puppeteer/puppeteer/issues/7514/issues/issuecomment-1005917527) [/github.com/dnbexperience/eufemia/blob/88279d1e6903497fce40d6c4322dd9b7c7b9ac3b/packages/dnb-eufemia/src/core/jest/jestSetupScreenshots.js#L39](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/blob/88279d1e6903497fce40d6c4322dd9b7c7b9ac3b/packages/dnb-eufemia/src/core/jest/jestSetupScreenshots.js/issues/L39)
* **ScrollView:** add interactive=auto to observe the content ([#1984](https://github.com/dnbexperience/eufemia/issues/1984)) ([cc8d37a](https://github.com/dnbexperience/eufemia/commit/cc8d37a05ab5b4f704709f7d34f66afe6e23e59b))
* **Section:** deprecate style_type signal-orange ([#1886](https://github.com/dnbexperience/eufemia/issues/1886)) ([9e8dd3f](https://github.com/dnbexperience/eufemia/commit/9e8dd3f4eb3ba3704c28cd55a1421e01a88d94e7))
* simplify CSS packages/themes structure ([c1a7894](https://github.com/dnbexperience/eufemia/commit/c1a7894f757d2c76036d575cc809cb280c572280))
* **Skeleton:** removes style_type prop ([#2095](https://github.com/dnbexperience/eufemia/issues/2095)) ([3e0f4ce](https://github.com/dnbexperience/eufemia/commit/3e0f4ce4a3e474655144e648535a885c8852b3ac))
* **SkipContent:** add new component to skip large contents when using tab key ([#1981](https://github.com/dnbexperience/eufemia/issues/1981)) ([78dd384](https://github.com/dnbexperience/eufemia/commit/78dd3840fc69e05691a1c82f20087b9936512ecc))
* **Slider:** deprecate use_scrollwheel ([#1889](https://github.com/dnbexperience/eufemia/issues/1889)) ([ead0a49](https://github.com/dnbexperience/eufemia/commit/ead0a4985175b375ab16031dbd46e649313e0f51))
* **Slider:** remove deprecated onInit prop ([#1909](https://github.com/dnbexperience/eufemia/issues/1909)) ([3b72e9b](https://github.com/dnbexperience/eufemia/commit/3b72e9b9a4575e05c6ddd8b5d785d37cb3680a2d))
* **Slider:** remove dnb-range styling ([#1890](https://github.com/dnbexperience/eufemia/issues/1890)) ([839edd5](https://github.com/dnbexperience/eufemia/commit/839edd5cbbe31860055f5d225c13b15c2777744c))
* **Space:** add conditional reset class: `dnb-space__reset` ([#1961](https://github.com/dnbexperience/eufemia/issues/1961)) ([0de26fe](https://github.com/dnbexperience/eufemia/commit/0de26fe822ffe95f449ae9d7cb176efbe39b7ac7))
* **SpacingUtils:** deprecate createStyleObject ([#1892](https://github.com/dnbexperience/eufemia/issues/1892)) ([385d6d3](https://github.com/dnbexperience/eufemia/commit/385d6d3ad771a5b2c138e27d35eda9eb57c3db55))
* **StylisPlugin:** removes stylis plugin ([#2156](https://github.com/dnbexperience/eufemia/issues/2156)) ([8c96969](https://github.com/dnbexperience/eufemia/commit/8c96969a4c4069f3f693c0e6da0076cb3018f3c0))
* **Switch:** deprecate default_state property ([#1864](https://github.com/dnbexperience/eufemia/issues/1864)) ([03a6bd0](https://github.com/dnbexperience/eufemia/commit/03a6bd04ed68e5ba7cbe8b5ca17983200a6a83fb))
* **Table:** deprecate sticky_offset ([#1883](https://github.com/dnbexperience/eufemia/issues/1883)) ([57c10d0](https://github.com/dnbexperience/eufemia/commit/57c10d065844df85b22bc1381288f2d323efb9cd))
* **Tags:** removed deprecated comments ([#1857](https://github.com/dnbexperience/eufemia/issues/1857)) ([9c17d75](https://github.com/dnbexperience/eufemia/commit/9c17d75af4c6ce284ad8e2e27075ea90512cc279))
* **Theme:** add `darkMode` and `contrastMode` props ([#2355](https://github.com/dnbexperience/eufemia/issues/2355)) ([04b350e](https://github.com/dnbexperience/eufemia/commit/04b350ec5210c7830d863d6c1bca2d4da7128506))
* **Theming:** add `VisibilityByTheme` as a shared component ([#2280](https://github.com/dnbexperience/eufemia/issues/2280)) ([2592658](https://github.com/dnbexperience/eufemia/commit/25926585d86111fece097b32aca1feeeb48a61d3))
* **Timeline:** deprecate name and date props ([#1884](https://github.com/dnbexperience/eufemia/issues/1884)) ([74f56b1](https://github.com/dnbexperience/eufemia/commit/74f56b1058172a9ec48b502169b33cd7eefb6a2a))
* **Typography:** add `--line-height-lead` property ([#2237](https://github.com/dnbexperience/eufemia/issues/2237)) ([8dc9ed8](https://github.com/dnbexperience/eufemia/commit/8dc9ed88136655fbea18d5ca30fc105cd6c8be47))
* **Typography:** remove small prop from paragraph (p) ([#2234](https://github.com/dnbexperience/eufemia/issues/2234)) ([06c5ba5](https://github.com/dnbexperience/eufemia/commit/06c5ba5db14df490f74ddc30df52718668b82350))
* **Typography:** removed deprecated comments ([#1858](https://github.com/dnbexperience/eufemia/issues/1858)) ([0916cde](https://github.com/dnbexperience/eufemia/commit/0916cde171892cda77234703c23cbb317b56cf3a))
* **Typography:** Use text color on typography for Sbanken ([#2363](https://github.com/dnbexperience/eufemia/issues/2363)) ([f06291a](https://github.com/dnbexperience/eufemia/commit/f06291a60fe4560dbc04778c0c57784b3237f506))
* use CSS vars in focus-ring (`fakeFocus`) ([#2109](https://github.com/dnbexperience/eufemia/issues/2109)) ([b0649d5](https://github.com/dnbexperience/eufemia/commit/b0649d54ab8f57aa41beebefa72a9bd07b8750c9))


### :memo: Documentation

* **Accordion:** improve docs of group & allow_close_all ([#2070](https://github.com/dnbexperience/eufemia/issues/2070)) ([2790302](https://github.com/dnbexperience/eufemia/commit/2790302b01edbe486b062c82924b78d11a43ae47))
* add change log about v10 ([bdba81b](https://github.com/dnbexperience/eufemia/commit/bdba81bf58dddfca57ef47021b7683b8f33a1f2a))
* add docs about how to maintain theming ([#2097](https://github.com/dnbexperience/eufemia/issues/2097)) ([8bdfdb1](https://github.com/dnbexperience/eufemia/commit/8bdfdb1863b672299c26771dfc4373e08f691c3d))
* add info about the tertiary button "visual" breaking change ([24bf0e7](https://github.com/dnbexperience/eufemia/commit/24bf0e7bd40b1d2a25c38af923125bc14bb1338d))
* add link to new Payment Card Figma file ([#2117](https://github.com/dnbexperience/eufemia/issues/2117)) ([239c239](https://github.com/dnbexperience/eufemia/commit/239c2399db847da737090d869446573e45c2d2fe))
* add new styles flow diagram ([21e3b3c](https://github.com/dnbexperience/eufemia/commit/21e3b3c602d840aad3dc471f65f2194d47cf0707))
* Add Sbanken color table and -documentation ([#2332](https://github.com/dnbexperience/eufemia/issues/2332)) ([e4324f8](https://github.com/dnbexperience/eufemia/commit/e4324f8725fcb595e87437099a743fad4169e4f9))
* adds a dot to quick guide - designers ([#2157](https://github.com/dnbexperience/eufemia/issues/2157)) ([3ba8a2e](https://github.com/dnbexperience/eufemia/commit/3ba8a2e023544ce7f41aec13d2500940e342a938))
* adds missing accents to values in docs ([#2041](https://github.com/dnbexperience/eufemia/issues/2041)) ([cc7460f](https://github.com/dnbexperience/eufemia/commit/cc7460f17bb8601b4b578b5342843b055804ebdd))
* **Anchor:** fix console warning when using class ([#2125](https://github.com/dnbexperience/eufemia/issues/2125)) ([85be7d5](https://github.com/dnbexperience/eufemia/commit/85be7d598ac23d1950614e99df6ee585aaf25b6d))
* **Autocomplete:** minor spelling improvement in title ([#2069](https://github.com/dnbexperience/eufemia/issues/2069)) ([6be0a77](https://github.com/dnbexperience/eufemia/commit/6be0a77f17067b6992cb2a9caf41cdeadf907c64))
* **Autocomplete:** minor spelling improvements ([#2197](https://github.com/dnbexperience/eufemia/issues/2197)) ([3aa19a3](https://github.com/dnbexperience/eufemia/commit/3aa19a3bebe1ec78d50b8c139fd0f2cb5a6265c5))
* **Autocomplete:** refactor jsx examples to tsx ([#2198](https://github.com/dnbexperience/eufemia/issues/2198)) ([6775dfb](https://github.com/dnbexperience/eufemia/commit/6775dfb0b0f72a48a77d215c0921fc6f9f57ece8))
* **Autocomplete:** update docs about the debounce method ([#2138](https://github.com/dnbexperience/eufemia/issues/2138)) ([e4e4865](https://github.com/dnbexperience/eufemia/commit/e4e4865678e340fd26309277fdf92fcb65e15b4a))
* **Avatar:** fixes broken properties table ([#2030](https://github.com/dnbexperience/eufemia/issues/2030)) ([b8c9ed4](https://github.com/dnbexperience/eufemia/commit/b8c9ed4e417cb28f5f4566835da5f594ffd67222))
* **Best Practices:** adds a dot ([#2151](https://github.com/dnbexperience/eufemia/issues/2151)) ([97e44aa](https://github.com/dnbexperience/eufemia/commit/97e44aa8c69af5bbfd0252aee443b94abcaffc4b))
* **Best Practices:** adds links to children pages ([#2161](https://github.com/dnbexperience/eufemia/issues/2161)) ([27d09a1](https://github.com/dnbexperience/eufemia/commit/27d09a1c17b32bcb8c9a0c234484813981f3d9b1))
* **Breadcrumb:** improve event docs ([66aad32](https://github.com/dnbexperience/eufemia/commit/66aad3216f8f2daa1018b2338086051c0da1184f))
* capitalize component names in descriptions ([#2162](https://github.com/dnbexperience/eufemia/issues/2162)) ([80fb3b2](https://github.com/dnbexperience/eufemia/commit/80fb3b2d6eb567d8ad2a9a58ec9619070684422c))
* **ColorsTable:** fixes color and hover effect ([#2122](https://github.com/dnbexperience/eufemia/issues/2122)) ([c82f570](https://github.com/dnbexperience/eufemia/commit/c82f57074d9059608b3512eb6879aefddd869454))
* **Contact:** adds Joakim as contact ([#2023](https://github.com/dnbexperience/eufemia/issues/2023)) ([43f9f47](https://github.com/dnbexperience/eufemia/commit/43f9f47193a1def8132ce05edadb61cb674332e1))
* **Contribution Guide:** update legacy type definition handling ([#2048](https://github.com/dnbexperience/eufemia/issues/2048)) ([2c16fd6](https://github.com/dnbexperience/eufemia/commit/2c16fd6d713da69c258e8187997dff4c6ca079a1))
* crate main doc for how to deal with brand ([#2100](https://github.com/dnbexperience/eufemia/issues/2100)) ([ae2416a](https://github.com/dnbexperience/eufemia/commit/ae2416adbc33883117f6a31d2f22c3f45d236af2))
* **CSS Styles:** fix console warning when using class ([#2127](https://github.com/dnbexperience/eufemia/issues/2127)) ([e903d69](https://github.com/dnbexperience/eufemia/commit/e903d697c8f95f0c0aa1d397f8c3b2be0795bd24))
* **Customization:** adds link to provider/context ([#2160](https://github.com/dnbexperience/eufemia/issues/2160)) ([009e056](https://github.com/dnbexperience/eufemia/commit/009e0567bcfad7a3e8ee82e745ba38c5c4987060))
* **DatePicker:** refactor jsx examples to tsx ([#2204](https://github.com/dnbexperience/eufemia/issues/2204)) ([d2f1b42](https://github.com/dnbexperience/eufemia/commit/d2f1b42de0b26212ad5ed23f6fb7a1a374fdf294))
* **Demo Apps:** fix console warning when using class ([#2126](https://github.com/dnbexperience/eufemia/issues/2126)) ([74142e8](https://github.com/dnbexperience/eufemia/commit/74142e8e24ae14038ad19738955d6d8aa7d5e737))
* **DrawerList:** prevents change of direction when scrolling ([#2233](https://github.com/dnbexperience/eufemia/issues/2233)) ([cb4cbbd](https://github.com/dnbexperience/eufemia/commit/cb4cbbd79dde892ae0d4f3f8c19195d58dc20788))
* **DrawerList:** refactor jsx examples to tsx ([#2209](https://github.com/dnbexperience/eufemia/issues/2209)) ([65dff60](https://github.com/dnbexperience/eufemia/commit/65dff60abf451b6341f3c221fba55154fd219a32))
* **DrawerList:** renamse fixedPosition to fixed_position ([#2093](https://github.com/dnbexperience/eufemia/issues/2093)) ([8e9ae76](https://github.com/dnbexperience/eufemia/commit/8e9ae76d17ef1e4a3e65f1866840039c9e441bf4))
* **Extension:** convert md to mdx files ([#2026](https://github.com/dnbexperience/eufemia/issues/2026)) ([ebc7988](https://github.com/dnbexperience/eufemia/commit/ebc798815b96d35d3a4c49f16f1f42d2cebfbd45))
* fix outdated boolean usage ([#2013](https://github.com/dnbexperience/eufemia/issues/2013)) ([99b816c](https://github.com/dnbexperience/eufemia/commit/99b816c98873d47d31b7bace21547f09f3f9be27))
* fix wrong Heading example about margin collapse ([eb866a8](https://github.com/dnbexperience/eufemia/commit/eb866a855c0cd6a51c984c71af4033845928c640))
* **Font Weights:** fix console warning when using class ([#2132](https://github.com/dnbexperience/eufemia/issues/2132)) ([0fd9aa1](https://github.com/dnbexperience/eufemia/commit/0fd9aa1c1746d0d0ad771ea7efacfb11088ad007))
* **FormLabel:** improve description of vertical prop ([#2098](https://github.com/dnbexperience/eufemia/issues/2098)) ([32020bd](https://github.com/dnbexperience/eufemia/commit/32020bddb00005cfa01da531964d113e12bd5905))
* **FormRow:** refactor jsx examples to tsx ([#2219](https://github.com/dnbexperience/eufemia/issues/2219)) ([38fd221](https://github.com/dnbexperience/eufemia/commit/38fd2213d3fc1d953cc17f8ab2dc0d5eaa5fff4b))
* **FormSet:** refactor jsx examples to tsx ([#2208](https://github.com/dnbexperience/eufemia/issues/2208)) ([db32e5f](https://github.com/dnbexperience/eufemia/commit/db32e5fd17db4e3cbc40a79a557a2d1f16e3c2a9))
* **Fragments:** minor docs improvement ([#2232](https://github.com/dnbexperience/eufemia/issues/2232)) ([151a800](https://github.com/dnbexperience/eufemia/commit/151a8009f13c2a34475a8d89d6a94f5b9678a433))
* **Front Page:** minor text improvements ([#2139](https://github.com/dnbexperience/eufemia/issues/2139)) ([5d9ad4d](https://github.com/dnbexperience/eufemia/commit/5d9ad4d7abb43b961c910cdda458a1993f7346ed))
* **getOffsetTop:** fix wrong docs and console.log usage ([#2018](https://github.com/dnbexperience/eufemia/issues/2018)) ([9ba16b5](https://github.com/dnbexperience/eufemia/commit/9ba16b5b6ad6116ae7b34345a6409dcca3dfcbed))
* **GlobalStatus:** improve docs for id prop ([#2067](https://github.com/dnbexperience/eufemia/issues/2067)) ([06e3ab1](https://github.com/dnbexperience/eufemia/commit/06e3ab11e8062342f8a37f45117a3ce40cb15423))
* **GlobalStatus:** refactor jsx examples to tsx ([#2202](https://github.com/dnbexperience/eufemia/issues/2202)) ([91e4c05](https://github.com/dnbexperience/eufemia/commit/91e4c05582ecd19fa973e154da1cfb8f62f49cef))
* **Grid:** removes WIP ([350321c](https://github.com/dnbexperience/eufemia/commit/350321ca3096db012ea3b79b556eada17d931c4a))
* **Heading:** refactor jsx examples to tsx ([#2205](https://github.com/dnbexperience/eufemia/issues/2205)) ([534294e](https://github.com/dnbexperience/eufemia/commit/534294e48c13150f09a5300b2fd698bbbf735081))
* **Helpers:** Adds info about dnb-unstyled-list in info page ([#2171](https://github.com/dnbexperience/eufemia/issues/2171)) ([37251b5](https://github.com/dnbexperience/eufemia/commit/37251b5e1a838109b74e76e4d2690834bdecb8ba))
* **HTML Elements:** move mdx of unstyled and unsupported to elements.mdx ([#2154](https://github.com/dnbexperience/eufemia/issues/2154)) ([0982c3e](https://github.com/dnbexperience/eufemia/commit/0982c3e3f34c16b4a088ed54a38d2f8dbbe982e8))
* **Icon Details:** fix console warning when using class ([#2128](https://github.com/dnbexperience/eufemia/issues/2128)) ([79760c5](https://github.com/dnbexperience/eufemia/commit/79760c58865013fa8ce054cf0a8f3059710c0519))
* **Icons:** link to v10 docs ([#2182](https://github.com/dnbexperience/eufemia/issues/2182)) ([34c7184](https://github.com/dnbexperience/eufemia/commit/34c7184acf6fdb058982eb780ecf0215b64f9a71))
* **Input:** adds on_key_down event ([#2062](https://github.com/dnbexperience/eufemia/issues/2062)) ([ddbdff6](https://github.com/dnbexperience/eufemia/commit/ddbdff65fa630e617912d319bd27e30d6c0792ba))
* **InputMasked:** refactor jsx examples to tsx ([#2207](https://github.com/dnbexperience/eufemia/issues/2207)) ([1253896](https://github.com/dnbexperience/eufemia/commit/1253896c75559e56f71d6d15b813fbd0c74921b5))
* **Logos:** fix console warning in console ([#2123](https://github.com/dnbexperience/eufemia/issues/2123)) ([d4b5c4c](https://github.com/dnbexperience/eufemia/commit/d4b5c4c4b14966ef4cbf626621aaa625aad0ae4b))
* make click on anchor with hash work on first click ([#2019](https://github.com/dnbexperience/eufemia/issues/2019)) ([85caef3](https://github.com/dnbexperience/eufemia/commit/85caef363bdcff06b5fa9dd0e8ee029975d49548))
* minor doc improvements ([#2283](https://github.com/dnbexperience/eufemia/issues/2283)) ([654ae82](https://github.com/dnbexperience/eufemia/commit/654ae829e9631493293310639afdfbf25262097b))
* **Modal:** refactor jsx examples to tsx ([#2218](https://github.com/dnbexperience/eufemia/issues/2218)) ([532a58f](https://github.com/dnbexperience/eufemia/commit/532a58fa84d37fca75a3c8937c70622289be400f))
* Move Modal to Dialog/Drawer conversion docs to v10 migration ([#1921](https://github.com/dnbexperience/eufemia/issues/1921)) ([9c6eed7](https://github.com/dnbexperience/eufemia/commit/9c6eed7db717f5df5705014fb18e1e9aa1fdc3b4))
* **Naming conventions:** fix console warning when using class ([#2129](https://github.com/dnbexperience/eufemia/issues/2129)) ([46031d0](https://github.com/dnbexperience/eufemia/commit/46031d0169ce12c66e5383d12b2bbc6b4368d37f))
* **NumberFormat:** fix info docs ([#2009](https://github.com/dnbexperience/eufemia/issues/2009)) ([af0e889](https://github.com/dnbexperience/eufemia/commit/af0e889ab553ee9758e1e874d7b0337f3cedc47d))
* **PaymentCard:** change imports of types to /payment-card ([41dc3ce](https://github.com/dnbexperience/eufemia/commit/41dc3ce0cefbd7b22969fdcdb0964eef4a0f42ad))
* **Portal:** removes Modal's new status ([#2312](https://github.com/dnbexperience/eufemia/issues/2312)) ([c9d98dd](https://github.com/dnbexperience/eufemia/commit/c9d98ddef163b01d319798c7a494c152ce77b51a))
* **ProgressIndicator:** removes props min_time and variant ([#1997](https://github.com/dnbexperience/eufemia/issues/1997)) ([26cce3f](https://github.com/dnbexperience/eufemia/commit/26cce3f52b18312e2bbab41ad8ec270bfad8b91d))
* **ProgressIndicator:** Update size properties ([a02a8fe](https://github.com/dnbexperience/eufemia/commit/a02a8fea8982c24817dc63145c6cf56d4434ac13))
* **Radio:** improve event docs ([9383afb](https://github.com/dnbexperience/eufemia/commit/9383afb6c8f27cea71994b5006caf75d67029c53))
* refactor contribution guide getting started ([#2008](https://github.com/dnbexperience/eufemia/issues/2008)) ([0a7cfdd](https://github.com/dnbexperience/eufemia/commit/0a7cfddd9e1fd895cc5376aa85f058650f037631))
* remove `smoothscroll-polyfill` as a recommendation ([#2020](https://github.com/dnbexperience/eufemia/issues/2020)) ([bae2e89](https://github.com/dnbexperience/eufemia/commit/bae2e899755159c924788e5e378dd0dabcf2319b))
* remove docs about CSS vars polyfills ([#2145](https://github.com/dnbexperience/eufemia/issues/2145)) ([e423d2d](https://github.com/dnbexperience/eufemia/commit/e423d2d032e9b0e9f9d659068221ea90566e322f))
* remove docs about importing from @dnb/eufemia/elements ([#2173](https://github.com/dnbexperience/eufemia/issues/2173)) ([6d0bfed](https://github.com/dnbexperience/eufemia/commit/6d0bfed559ab2d9ed7abb250275f00bd77b00044))
* remove outdated info ([#1940](https://github.com/dnbexperience/eufemia/issues/1940)) ([0f77115](https://github.com/dnbexperience/eufemia/commit/0f77115f869fc9dc279148e170af852af6cba5bc))
* remove properties import from docs ([#2034](https://github.com/dnbexperience/eufemia/issues/2034)) ([a0aaffc](https://github.com/dnbexperience/eufemia/commit/a0aaffcc2a57aae6d449659fc06950f46e4e1fcb))
* removes cards and spaceholder indicator ([#2061](https://github.com/dnbexperience/eufemia/issues/2061)) ([f8abfb6](https://github.com/dnbexperience/eufemia/commit/f8abfb6432fdf6784c4538bbddea85bb05b386fc))
* **ScrollView:** controll -> control ([#2225](https://github.com/dnbexperience/eufemia/issues/2225)) ([17db885](https://github.com/dnbexperience/eufemia/commit/17db88531cd43d43635cc52174d2be2506d5bb11))
* **ScrollView:** refactor jsx examples to tsx ([#2210](https://github.com/dnbexperience/eufemia/issues/2210)) ([1f97545](https://github.com/dnbexperience/eufemia/commit/1f97545d1f12c928a8a9bf0c0496eb1280ac7bff))
* **ScrollView:** sets Description as header in docs ([#2168](https://github.com/dnbexperience/eufemia/issues/2168)) ([2d05405](https://github.com/dnbexperience/eufemia/commit/2d05405adb6f1464af5a42c7b5f333954fd5b0d7))
* **Skeleton:** refactor jsx examples to tsx ([#2203](https://github.com/dnbexperience/eufemia/issues/2203)) ([dabdba6](https://github.com/dnbexperience/eufemia/commit/dabdba608a0b924bbf0033d766a1f0f482fe4b45))
* **SkipContent:** hide Events tab ([#2282](https://github.com/dnbexperience/eufemia/issues/2282)) ([fcbe37b](https://github.com/dnbexperience/eufemia/commit/fcbe37b53dcbdfa55a5f1103c8041440b31f3864))
* **SkipContent:** refactor jsx examples to tsx ([#2211](https://github.com/dnbexperience/eufemia/issues/2211)) ([df34f0c](https://github.com/dnbexperience/eufemia/commit/df34f0c96a756f2db396c3e1d26a58b1d05bceca))
* **Space:** refactor jsx examples to tsx ([#2199](https://github.com/dnbexperience/eufemia/issues/2199)) ([de7645c](https://github.com/dnbexperience/eufemia/commit/de7645c8753770dee18a3de95e114115fe5c3790))
* **Space:** refactor jsx properties to tsx ([#2216](https://github.com/dnbexperience/eufemia/issues/2216)) ([ecb941e](https://github.com/dnbexperience/eufemia/commit/ecb941e3dcc809947c6912f1eabc477c956e348e))
* **StepIndicator:** format Steps Parameters table ([#2284](https://github.com/dnbexperience/eufemia/issues/2284)) ([884a09e](https://github.com/dnbexperience/eufemia/commit/884a09e89e4742312904cedb05390b44511e75f9))
* **Table:** add info about the needed CSS class in v10 ([#1923](https://github.com/dnbexperience/eufemia/issues/1923)) ([407977e](https://github.com/dnbexperience/eufemia/commit/407977e45781ea34ec443a8e1edb2ab75b298b2e))
* **Table:** enhance info about the component and possibilities ([#2336](https://github.com/dnbexperience/eufemia/issues/2336)) ([f376d1d](https://github.com/dnbexperience/eufemia/commit/f376d1dd44915caa9babbb60d166113c3f40f398))
* **Table:** improve event docs ([e025745](https://github.com/dnbexperience/eufemia/commit/e025745b32f11815fd651488650c014119884624))
* **Table:** refactor jsx examples to tsx ([#2206](https://github.com/dnbexperience/eufemia/issues/2206)) ([f2d1c72](https://github.com/dnbexperience/eufemia/commit/f2d1c72d9cb150be5eaca3a593ddcd702bf9056b))
* **Tag:** improve event docs ([4a01c08](https://github.com/dnbexperience/eufemia/commit/4a01c08dffcdf913cfb7d4b4a1eb788c44b385af))
* **Timeline:** fix broken link to example ([#2241](https://github.com/dnbexperience/eufemia/issues/2241)) ([418979b](https://github.com/dnbexperience/eufemia/commit/418979b5d27de0415bfd25067352f175de43d69d))
* **ToggleButton:** improve event docs ([a351019](https://github.com/dnbexperience/eufemia/commit/a35101921c94c6c5a9ecc855a03d8bd5d3740c73))
* **ToggleButton:** removes outdated label_position docs ([#2141](https://github.com/dnbexperience/eufemia/issues/2141)) ([a067f31](https://github.com/dnbexperience/eufemia/commit/a067f310302d8042f2e6a6ec2d9c88d195d8d334))
* **TypeScript:** remove outdated docs ([#2124](https://github.com/dnbexperience/eufemia/issues/2124)) ([497b3c3](https://github.com/dnbexperience/eufemia/commit/497b3c33403b67d10e4b2a6314b2dd86c4cac45e))
* **Typography:** fix console warning when using class ([#2133](https://github.com/dnbexperience/eufemia/issues/2133)) ([3088447](https://github.com/dnbexperience/eufemia/commit/308844762dde469d643821fb1c8174b4d8183e3c))
* **Typography:** hast -> has ([#2221](https://github.com/dnbexperience/eufemia/issues/2221)) ([3ae59d5](https://github.com/dnbexperience/eufemia/commit/3ae59d53028e128a93d7be49a135ae3925718564))
* update docs about CSS formatting and styling ([#1964](https://github.com/dnbexperience/eufemia/issues/1964)) ([9b85816](https://github.com/dnbexperience/eufemia/commit/9b858166408312ee5869e35cc176659f03d047ba))
* update v10 change log ([#1983](https://github.com/dnbexperience/eufemia/issues/1983)) ([8235f50](https://github.com/dnbexperience/eufemia/commit/8235f50f15946909b335c2e7c0f9fba5f1fe1405))
* update v10-info ([#1998](https://github.com/dnbexperience/eufemia/issues/1998)) ([47fa420](https://github.com/dnbexperience/eufemia/commit/47fa4209a2f55d6b6de593b7ff1b35609b9aa059))
* **v10:** add docs for HelpButton's modal_props ([#2314](https://github.com/dnbexperience/eufemia/issues/2314)) ([4e825ee](https://github.com/dnbexperience/eufemia/commit/4e825eef7a749acddd8e6a97dc36e616bab31c5e))
* **v10:** add example for updating import of properties ([#2313](https://github.com/dnbexperience/eufemia/issues/2313)) ([fdee6c3](https://github.com/dnbexperience/eufemia/commit/fdee6c3d969d6d31c03092531c3c94c37503ec3c))
* **v10:** adds examples for updating import of boolean props ([47f31f1](https://github.com/dnbexperience/eufemia/commit/47f31f1716c38d1674c329ed8576b34e967a65e2))
* **v10:** adds examples for updating imports to assets and fonts ([f6adcef](https://github.com/dnbexperience/eufemia/commit/f6adcef84042bc27b79f95a7d3bd66817d36555f))
* **v10:** adds explicit examples for props that's changes type to boolean ([#2292](https://github.com/dnbexperience/eufemia/issues/2292)) ([6b23682](https://github.com/dnbexperience/eufemia/commit/6b236826a04f725b4b5f565ac6633b7f17ada4dd))
* **v10:** adds info about removal of closeButtonAttributes ([#2296](https://github.com/dnbexperience/eufemia/issues/2296)) ([8859256](https://github.com/dnbexperience/eufemia/commit/88592562b01f26a935c4935ec90371182a3cd1d4))
* **v10:** adds info about removal of closeButtonAttributes ([#2296](https://github.com/dnbexperience/eufemia/issues/2296)) ([b68b5bd](https://github.com/dnbexperience/eufemia/commit/b68b5bd976d490343ad7cf2a297b94a50fb1c0bb))
* **v10:** adds info about replacing white with default ([#2295](https://github.com/dnbexperience/eufemia/issues/2295)) ([c938f4d](https://github.com/dnbexperience/eufemia/commit/c938f4dcae219d972c1fd393fe039e4265e53151))
* **v10:** improve docs for EufemiaStyleImporter files ([#2302](https://github.com/dnbexperience/eufemia/issues/2302)) ([9c0d692](https://github.com/dnbexperience/eufemia/commit/9c0d692daee69dc962e274225c6528505b29406d))
* **v10:** improves docs of browser assets ([c0c0a3c](https://github.com/dnbexperience/eufemia/commit/c0c0a3cb951a3d29e3e9cd54addf60200013edfe))
* **v10:** minor spelling improvement ([#2301](https://github.com/dnbexperience/eufemia/issues/2301)) ([8105026](https://github.com/dnbexperience/eufemia/commit/8105026440ca4aef0037ec42b35d2ba269919d57))
* **v10:** prop change for FormStatus of status to state ([#2293](https://github.com/dnbexperience/eufemia/issues/2293)) ([0cc65be](https://github.com/dnbexperience/eufemia/commit/0cc65bea3bcdc4d5c3eb872c8d09a46e5eb1c0ad))
* **v10:** where -> was ([44eeeb8](https://github.com/dnbexperience/eufemia/commit/44eeeb8586e4a1d7a64bb87dfe892bba2f3241ea))

## [9.47.6](https://github.com/dnbexperience/eufemia/compare/v9.47.5...v9.47.6) (2023-05-31)


### Bug Fixes

* **Radio:** prevent radio button from shrinking ([#2389](https://github.com/dnbexperience/eufemia/issues/2389)) ([a47934d](https://github.com/dnbexperience/eufemia/commit/a47934dafd13d7223a65151d90daca3cdb75a9bb))

## [9.47.5](https://github.com/dnbexperience/eufemia/compare/v9.47.4...v9.47.5) (2023-05-15)


### Bug Fixes

* **InputMasked:** duplicate decimal number when typing ([#2344](https://github.com/dnbexperience/eufemia/issues/2344)) ([0d66dc0](https://github.com/dnbexperience/eufemia/commit/0d66dc06a9dab2eb9d91f93948337dff78f9346b))

## [9.47.4](https://github.com/dnbexperience/eufemia/compare/v9.47.3...v9.47.4) (2023-05-03)


### Bug Fixes

* **InputMasked:** on custom mask – avoid interaction stall after focus ([#2270](https://github.com/dnbexperience/eufemia/issues/2270)) ([2201ea9](https://github.com/dnbexperience/eufemia/commit/2201ea9e2e764e8ff7a98d591d2916fd3cb37814))

## [9.47.3](https://github.com/dnbexperience/eufemia/compare/v9.47.2...v9.47.3) (2023-03-27)


### Bug Fixes

* **Button:** support for FormRow and FormSet ([#2147](https://github.com/dnbexperience/eufemia/issues/2147)) ([59f0a22](https://github.com/dnbexperience/eufemia/commit/59f0a2244021b7ebd78192f7b5e2d657bd3021aa))

## [9.47.2](https://github.com/dnbexperience/eufemia/compare/v9.47.1...v9.47.2) (2023-03-16)


### Bug Fixes

* **Autocomplete:** pass status props to SubmitButton ([#2004](https://github.com/dnbexperience/eufemia/issues/2004)) ([fb89114](https://github.com/dnbexperience/eufemia/commit/fb89114e75ff4111640bc367a10d6faa339c4fe3))
* **Button:** support rel property ([#1990](https://github.com/dnbexperience/eufemia/issues/1990)) ([ad029f2](https://github.com/dnbexperience/eufemia/commit/ad029f20f21154df40975a82b9b4f7019e373ebf))
* remove FormRow context support from components not using FormRow ([#2103](https://github.com/dnbexperience/eufemia/issues/2103)) ([3a39134](https://github.com/dnbexperience/eufemia/commit/3a39134c883e70daf6ef374c85ea8ddbce317776))

## [9.47.1](https://github.com/dnbexperience/eufemia/compare/v9.47.0...v9.47.1) (2023-02-13)


### Bug Fixes

* **InputMasked:** avoid inherit mask options and types when custom mask is used ([#1988](https://github.com/dnbexperience/eufemia/issues/1988)) ([8937bcc](https://github.com/dnbexperience/eufemia/commit/8937bcc7842ba079318215c23d5e47c38fc91aeb))
* **InputMasked:** fix negative value updates (number mask) ([#1792](https://github.com/dnbexperience/eufemia/issues/1792)) ([e2b9482](https://github.com/dnbexperience/eufemia/commit/e2b94826d08572cb3008cb837658186644b8d0ba))
* **Upload:** fix handling of file types in combination with file extension ([#1986](https://github.com/dnbexperience/eufemia/issues/1986)) ([3fd9bfa](https://github.com/dnbexperience/eufemia/commit/3fd9bfab541dba28980edb1ef00c403723d8b4e7))

# [9.47.0](https://github.com/dnbexperience/eufemia/compare/v9.46.2...v9.47.0) (2023-02-05)


### Bug Fixes

* **TableContainer:** enhance handling of empty head and foot area ([#1970](https://github.com/dnbexperience/eufemia/issues/1970)) ([762c667](https://github.com/dnbexperience/eufemia/commit/762c667f48c3039d23dd9c66901fe0776bd77f57))
* **TableContainer:** ensure bottom border on all tables ([#1969](https://github.com/dnbexperience/eufemia/issues/1969)) ([4583ba8](https://github.com/dnbexperience/eufemia/commit/4583ba83f1ff8144851770219333a74d535efbce))


### Features

* **Table:** add support for row scope only header ([#1971](https://github.com/dnbexperience/eufemia/issues/1971)) ([aff2e40](https://github.com/dnbexperience/eufemia/commit/aff2e403b991c8ec53d4eccfbed9a92234c47e13))

## [9.46.2](https://github.com/dnbexperience/eufemia/compare/v9.46.1...v9.46.2) (2023-01-29)


### Bug Fixes

* **Breadcrumb:** ensure focus state is not partially hidden ([#1949](https://github.com/dnbexperience/eufemia/issues/1949)) ([954d570](https://github.com/dnbexperience/eufemia/commit/954d570bc58a3b26a4a7cacba3a32f05a547d12a)), closes [#1860](https://github.com/dnbexperience/eufemia/issues/1860)
* **Table:** fix fist border on rowSpan={2} is used in first column ([#1956](https://github.com/dnbexperience/eufemia/issues/1956)) ([48ff543](https://github.com/dnbexperience/eufemia/commit/48ff543b468e6c697e1ab6ce0bd34cf27a55accf))
* **Table:** fix sticky table when in iFrame ([#1954](https://github.com/dnbexperience/eufemia/issues/1954)) ([ac4f254](https://github.com/dnbexperience/eufemia/commit/ac4f254973a517faced6edbcb3bf01ca5e672d52))

## [9.46.1](https://github.com/dnbexperience/eufemia/compare/v9.46.0...v9.46.1) (2023-01-20)


### Bug Fixes

* **GlobalStatus:** use existing slugify ([#1936](https://github.com/dnbexperience/eufemia/issues/1936)) ([f57f9fe](https://github.com/dnbexperience/eufemia/commit/f57f9fe7d421e73fc4d6d0b64b3f886e551c6ff9))
* **Upload:** support special file extensions like .dat ([#1938](https://github.com/dnbexperience/eufemia/issues/1938)) ([1f07d0c](https://github.com/dnbexperience/eufemia/commit/1f07d0cd568d9d6cc63222752df4cff8e462da4d))

# [9.46.0](https://github.com/dnbexperience/eufemia/compare/v9.45.4...v9.46.0) (2023-01-16)


### Bug Fixes

* **Table:** keep paragraph font-size when table size is medium or small ([#1922](https://github.com/dnbexperience/eufemia/issues/1922)) ([a3d678e](https://github.com/dnbexperience/eufemia/commit/a3d678e96aead2b3c4ca55fb4ad7a94fdadf6316))


### Features

* **SpacingUtils:** add caching to `calc` method ([#1910](https://github.com/dnbexperience/eufemia/issues/1910)) ([b48941a](https://github.com/dnbexperience/eufemia/commit/b48941ac61cc14968e991acea0e6df9ccafc3f1a))

## [9.45.4](https://github.com/dnbexperience/eufemia/compare/v9.45.3...v9.45.4) (2023-01-11)


### Bug Fixes

* **Table:** correct with on medium and small accordion chevron icon cell ([#1901](https://github.com/dnbexperience/eufemia/issues/1901)) ([3df6e40](https://github.com/dnbexperience/eufemia/commit/3df6e40ddac14539d11e44c7a44069e43c10b582))

## [9.45.3](https://github.com/dnbexperience/eufemia/compare/v9.45.2...v9.45.3) (2023-01-09)


### Bug Fixes

* **InputMasked:** add replace decimal in parseFloat ([#1854](https://github.com/dnbexperience/eufemia/issues/1854)) ([b3446cc](https://github.com/dnbexperience/eufemia/commit/b3446cc77888f51cbb39a060a7ee310d7ac4ce44)), closes [#1853](https://github.com/dnbexperience/eufemia/issues/1853)

## [9.45.2](https://github.com/dnbexperience/eufemia/compare/v9.45.1...v9.45.2) (2023-01-09)


### Bug Fixes

* **useHandleSortState:** fix correct direction when switching from other active column ([#1876](https://github.com/dnbexperience/eufemia/issues/1876)) ([126a2fa](https://github.com/dnbexperience/eufemia/commit/126a2fa5d7f82fe72c9dbaa716c7043a32ddf7a8))

## [9.45.1](https://github.com/dnbexperience/eufemia/compare/v9.45.0...v9.45.1) (2023-01-04)


### Bug Fixes

* **Anchor:** allow rel property in TS ([#1849](https://github.com/dnbexperience/eufemia/issues/1849)) ([e3b1be1](https://github.com/dnbexperience/eufemia/commit/e3b1be10a986e5789de48814ffdabbc5363f7494))

# [9.45.0](https://github.com/dnbexperience/eufemia/compare/v9.44.0...v9.45.0) (2022-12-21)


### Bug Fixes

* **Anchor:** use text-decoration instead of box-shadow for chromium breaking underline support ([#1841](https://github.com/dnbexperience/eufemia/issues/1841)) ([eba73da](https://github.com/dnbexperience/eufemia/commit/eba73daf984cb811439a3c0d12748c38dc81efc8))


### Features

* **Spacing:** add calc helper ([#1845](https://github.com/dnbexperience/eufemia/issues/1845)) ([0e7f99e](https://github.com/dnbexperience/eufemia/commit/0e7f99ea4580a51e77d168954825cc6fde8139e7))

# [9.44.0](https://github.com/dnbexperience/eufemia/compare/v9.43.0...v9.44.0) (2022-12-20)


### Bug Fixes

* **Table:** inherit Tr noWrap to Th.SortButton ([#1836](https://github.com/dnbexperience/eufemia/issues/1836)) ([0ce4763](https://github.com/dnbexperience/eufemia/commit/0ce4763d1baf687d6d71f16b0732f5480b747342))
* **Table:** make sticky header work when used in combination with accordion rows ([#1835](https://github.com/dnbexperience/eufemia/issues/1835)) ([dec1ddb](https://github.com/dnbexperience/eufemia/commit/dec1ddb9e87632a3e9c478b836ea8b6111f52061))


### Features

* **Table:** add accordion row events ([#1834](https://github.com/dnbexperience/eufemia/issues/1834)) ([c7be834](https://github.com/dnbexperience/eufemia/commit/c7be834f7daf7708cec25906a03caef1a1366554))

# [9.43.0](https://github.com/dnbexperience/eufemia/compare/v9.42.0...v9.43.0) (2022-12-19)


### Bug Fixes

* **Button:** support target property ([#1817](https://github.com/dnbexperience/eufemia/issues/1817)) ([71f5ee3](https://github.com/dnbexperience/eufemia/commit/71f5ee3746f6381eeb72221bac013126a5ea84ad))
* **TableContainer:** align always visible scrollbar ([#1819](https://github.com/dnbexperience/eufemia/issues/1819)) ([c16519d](https://github.com/dnbexperience/eufemia/commit/c16519d136228e0ec9e246b13e4aba4c9972329d))
* **TableContainer:** no space on empty foot + clip scrollbar ([#1827](https://github.com/dnbexperience/eufemia/issues/1827)) ([04dd93b](https://github.com/dnbexperience/eufemia/commit/04dd93bba6c7d92778b2c3a16e4046263edbb5f0))
* **Table:** prevent expanded row to not change column width ([#1816](https://github.com/dnbexperience/eufemia/issues/1816)) ([bbf94a8](https://github.com/dnbexperience/eufemia/commit/bbf94a86850b09fb7bf028c8d5365a2df2b43ad2))
* **useHandleSortState:** change default direction from asc to off ([#1826](https://github.com/dnbexperience/eufemia/issues/1826)) ([c7e4d6f](https://github.com/dnbexperience/eufemia/commit/c7e4d6f44be68a139ff59b6520a4a6da95533264))
* **useHandleSortState:** fix import issue ([#1823](https://github.com/dnbexperience/eufemia/issues/1823)) ([c595ff1](https://github.com/dnbexperience/eufemia/commit/c595ff1c51b59cc0ec275b571fbbbee3b0c02910))


### Features

* **Scrollbar:** add new look to scrollbars ([#1815](https://github.com/dnbexperience/eufemia/issues/1815)) ([a590b50](https://github.com/dnbexperience/eufemia/commit/a590b5081fae29140846e054d4a2d4bbebf2eccd))

# [9.42.0](https://github.com/dnbexperience/eufemia/compare/v9.41.0...v9.42.0) (2022-12-14)


### Bug Fixes

* **ScrollView:** ensure an ancestor scroll area (body) can still be scrolled with mouse wheel ([#1812](https://github.com/dnbexperience/eufemia/issues/1812)) ([f35fbee](https://github.com/dnbexperience/eufemia/commit/f35fbee13123966766b41d73806935dd546b0716))
* **TableContainer:** adjust sizes according to design updates ([#1811](https://github.com/dnbexperience/eufemia/issues/1811)) ([911680a](https://github.com/dnbexperience/eufemia/commit/911680af1d7411980a4b4d8a88c617e1bd7b317a))
* **TableContainer:** adjust sizes according to design updates ([#1811](https://github.com/dnbexperience/eufemia/issues/1811)) ([70e8cbe](https://github.com/dnbexperience/eufemia/commit/70e8cbeee575c68778b67f53f00298b9c5339b86))
* **Table:** ensure accordion column has always a fixed width ([#1806](https://github.com/dnbexperience/eufemia/issues/1806)) ([1b951ef](https://github.com/dnbexperience/eufemia/commit/1b951efce38786aa77c7b11a865ede8f524f9c4a))
* **Table:** ensure accordion row content does not change table layout calculation ([#1804](https://github.com/dnbexperience/eufemia/issues/1804)) ([32fd800](https://github.com/dnbexperience/eufemia/commit/32fd80060d2c73ded75fffb54cca21c98bf563a0))
* **Table:** fix locale support for SR accordion texts ([#1805](https://github.com/dnbexperience/eufemia/issues/1805)) ([0460280](https://github.com/dnbexperience/eufemia/commit/0460280546463e2ec84e5abc213498e7852711a1))


### Features

* **Table:** add useHandleSortState hook ([#1809](https://github.com/dnbexperience/eufemia/issues/1809)) ([6f5e93c](https://github.com/dnbexperience/eufemia/commit/6f5e93c7596ff7bbefe2dba84d07c03879586a7e))

# [9.41.0](https://github.com/dnbexperience/eufemia/compare/v9.40.0...v9.41.0) (2022-12-12)


### Bug Fixes

* **FormLabel:** ensure sr_only prop will eliminate label height ([#1798](https://github.com/dnbexperience/eufemia/issues/1798)) ([e79057e](https://github.com/dnbexperience/eufemia/commit/e79057ecc043b8d47b55393097f39bda15085eec))
* **InputPassword:** hide password reveal in Edge ([#1794](https://github.com/dnbexperience/eufemia/issues/1794)) ([1fcc541](https://github.com/dnbexperience/eufemia/commit/1fcc5418d5935f19b481b3d6b4e53a1e9d5c6236))
* **scrollToLocationHashId:** omit calling scrollTo when element is not found ([#1796](https://github.com/dnbexperience/eufemia/issues/1796)) ([cb497de](https://github.com/dnbexperience/eufemia/commit/cb497def8f2062cdccc1783abee8ebefaa7e821d))
* **Table:** fix odd/even re-oder and StrictMode support ([#1797](https://github.com/dnbexperience/eufemia/issues/1797)) ([d7804f0](https://github.com/dnbexperience/eufemia/commit/d7804f00b0818d20ee0c1b6c2a979066720c18ae))
* **Table:** make Table.ScrollView accessible with keyboard navigation ([#1801](https://github.com/dnbexperience/eufemia/issues/1801)) ([0239978](https://github.com/dnbexperience/eufemia/commit/0239978ff3497e69ddbe2e16d074f7353bc9dd01))


### Features

* **ScrollView:** add `interactive` prop to support for keyboard control (accessible) ([#1791](https://github.com/dnbexperience/eufemia/issues/1791)) ([e265e4a](https://github.com/dnbexperience/eufemia/commit/e265e4a00e3fc5adb55fc9f6e2df47821a7ca955))
* **Table:** add accordion feature to table rows ([#1737](https://github.com/dnbexperience/eufemia/issues/1737)) ([fe41e55](https://github.com/dnbexperience/eufemia/commit/fe41e554d62867091af8b546fb9cd9a3bc9a9be4))
* **Th:** include by default aria-sort for assistive technology ([#1789](https://github.com/dnbexperience/eufemia/issues/1789)) ([23f821b](https://github.com/dnbexperience/eufemia/commit/23f821bde3e544f38ad4c49249bbd6bd42a5cbab))

# [9.40.0](https://github.com/dnbexperience/eufemia/compare/v9.39.1...v9.40.0) (2022-12-06)


### Bug Fixes

*  deprecate `.dnb-not-sr-only` and `.dnb-sr-only--inline` ([#1755](https://github.com/dnbexperience/eufemia/issues/1755)) ([01a3e70](https://github.com/dnbexperience/eufemia/commit/01a3e70af193e34a1bcc778d424d34a61de9492e))
* **Dialog:** align Dialog.Action to left when used in information variant ([#1761](https://github.com/dnbexperience/eufemia/issues/1761)) ([efd92d8](https://github.com/dnbexperience/eufemia/commit/efd92d88bd6c866f9b01bd1e3cff6fa5f013d6ab))
* **Drawer:** ensure nav bar is aligned to left when content is wider than Drawer ([#1766](https://github.com/dnbexperience/eufemia/issues/1766)) ([533177d](https://github.com/dnbexperience/eufemia/commit/533177d6ec7a85aae63bd07c3b8fcf3bdab3b871))
* **NumberFormat:** use `dnb-sr-only` instead of `dnb-sr-only--inline` ([#1754](https://github.com/dnbexperience/eufemia/issues/1754)) ([c49e516](https://github.com/dnbexperience/eufemia/commit/c49e516e6aa2911ec86433642326191ee7b1bbd1))
* **Table:** enhance borders ([#1753](https://github.com/dnbexperience/eufemia/issues/1753)) ([3872c8e](https://github.com/dnbexperience/eufemia/commit/3872c8eec5edfd1c853519b4722a2a8d11d34e74))
* **Table:** fix line-height of sorting buttons in smaller table sizes ([#1752](https://github.com/dnbexperience/eufemia/issues/1752)) ([97f0019](https://github.com/dnbexperience/eufemia/commit/97f0019b542e7bd5a47bdc7f0a9f2969bbbd4bde))
* **VisuallyHidden:** enhance space used on the underlying class .dnb-sr-only ([#1751](https://github.com/dnbexperience/eufemia/issues/1751)) ([11d6f33](https://github.com/dnbexperience/eufemia/commit/11d6f33616c2edaba3fb6688de4a8bc95920e0a8))


### Features

* **Table:** add row header style for scope="row" ([#1757](https://github.com/dnbexperience/eufemia/issues/1757)) ([34dd5c7](https://github.com/dnbexperience/eufemia/commit/34dd5c7214bdb677fa53a9fad9cd8621897d0617))
* **Table:** add sticky header support for overflow hidden on parent elements ([#1756](https://github.com/dnbexperience/eufemia/issues/1756)) ([48cd66b](https://github.com/dnbexperience/eufemia/commit/48cd66b34292cbd48b4e79ee907e7f0729f5aab4))
* **Th:** set scope by default to col and handle correct role ([#1764](https://github.com/dnbexperience/eufemia/issues/1764)) ([73613d6](https://github.com/dnbexperience/eufemia/commit/73613d645bc89559cf772b69fb04a51d89dc2bce))

## [9.39.1](https://github.com/dnbexperience/eufemia/compare/v9.39.0...v9.39.1) (2022-11-24)


### Bug Fixes

* **HeightAnimation:** avoid usage of useLayoutEffect during SSR ([#1749](https://github.com/dnbexperience/eufemia/issues/1749)) ([667059b](https://github.com/dnbexperience/eufemia/commit/667059b41652a0c92db958a019d19949c9c08655))

# [9.39.0](https://github.com/dnbexperience/eufemia/compare/v9.38.0...v9.39.0) (2022-11-22)


### Features

* **Table:** set new basis Table styles including medium and small size ([#1742](https://github.com/dnbexperience/eufemia/issues/1742)) ([d541377](https://github.com/dnbexperience/eufemia/commit/d541377c5805474c0a575edbb0bac2f30c267a2b)), closes [#1743](https://github.com/dnbexperience/eufemia/issues/1743)

# [9.38.0](https://github.com/dnbexperience/eufemia/compare/v9.37.0...v9.38.0) (2022-11-22)


### Bug Fixes

* add support to IS_SAFARI_DESKTOP for Safari v16 on macOS ([#1718](https://github.com/dnbexperience/eufemia/issues/1718)) ([54e2cba](https://github.com/dnbexperience/eufemia/commit/54e2cba903c07b8a137db84f19f4e07f8814e2b7))
* **Anchor:** export types as AnchorAllProps and original instance ([#1715](https://github.com/dnbexperience/eufemia/issues/1715)) ([92ec784](https://github.com/dnbexperience/eufemia/commit/92ec7840e06331d77ad8eee312210b3a2b78e534))
* **Icons:** prevent icons from having same IDs (duplicate-id violation) ([#1714](https://github.com/dnbexperience/eufemia/issues/1714)) ([5e4079d](https://github.com/dnbexperience/eufemia/commit/5e4079d8d9fe44be3eef9f4e94adaed7da22ef7f))
* **Provider:** rewrite to functional component ([#1731](https://github.com/dnbexperience/eufemia/issues/1731)) ([b504d06](https://github.com/dnbexperience/eufemia/commit/b504d061b8cefbd14879fbda72710cca834da34b))
* **Table:** align odd/even modifiers with CSS nth ([#1724](https://github.com/dnbexperience/eufemia/issues/1724)) ([8bdad07](https://github.com/dnbexperience/eufemia/commit/8bdad07b2c7269c77b00ee920245d4d729363092))


### Features

* **Table:** add "fixed" prop for fixed table layouts ([#1708](https://github.com/dnbexperience/eufemia/issues/1708)) ([241ee0f](https://github.com/dnbexperience/eufemia/commit/241ee0f77bc48c0dd9ac84d0035971c784ba3a8b))
* **Table:** add table "border" and "outline" property ([#1739](https://github.com/dnbexperience/eufemia/issues/1739)) ([ad63ffb](https://github.com/dnbexperience/eufemia/commit/ad63ffbda03b6a72f9567df6d8d02033f0d4434c))
* **Table:** add Table.ScrolView to support horizontal scroll ([#1735](https://github.com/dnbexperience/eufemia/issues/1735)) ([85a4d86](https://github.com/dnbexperience/eufemia/commit/85a4d86afa20ea775d89c2bfcef56dd32a2e6004))
* **Table:** add Table.SortButton ([#1709](https://github.com/dnbexperience/eufemia/issues/1709)) ([288a8db](https://github.com/dnbexperience/eufemia/commit/288a8dbaf2e0622208d567b62302e5b668bd90b7))
* **Table:** add TableContainer to stack tables with an outline ([#1740](https://github.com/dnbexperience/eufemia/issues/1740)) ([376ac06](https://github.com/dnbexperience/eufemia/commit/376ac063518d8741223b39d87197d207b939c008))
* **Table:** add Th.HelpButton to be used in Table Headers ([#1711](https://github.com/dnbexperience/eufemia/issues/1711)) ([c142323](https://github.com/dnbexperience/eufemia/commit/c142323b56389218b5f2451c55fc7282dec5d0c4))
* **Table:** support rowSpan ([#1733](https://github.com/dnbexperience/eufemia/issues/1733)) ([463692d](https://github.com/dnbexperience/eufemia/commit/463692db1e803903a93c32a1028689f3f9e55afc))
* **Th:** add table header sortable props ([#1706](https://github.com/dnbexperience/eufemia/issues/1706)) ([c40393a](https://github.com/dnbexperience/eufemia/commit/c40393addb8bc75fc84320ad21f5c0f1c5c42bc0))
* **Tr:** automate odd/even and make it overridable ([#1705](https://github.com/dnbexperience/eufemia/issues/1705)) ([d73d3cb](https://github.com/dnbexperience/eufemia/commit/d73d3cbdc115ceb5b9e9609a719ff58b919d9c69))
* **Typography:** support styles for superscript and subscript elements ([#1721](https://github.com/dnbexperience/eufemia/issues/1721)) ([c2b043d](https://github.com/dnbexperience/eufemia/commit/c2b043db0bfddb9678e526f4eb2a9a0b1ca16d9d))
* **Upload:** support files dropped on the document body ([#1719](https://github.com/dnbexperience/eufemia/issues/1719)) ([f206243](https://github.com/dnbexperience/eufemia/commit/f20624303468789b89a907cb5157e5a975ac43a7))

# [9.37.0](https://github.com/dnbexperience/eufemia/compare/v9.36.0...v9.37.0) (2022-11-07)


### Bug Fixes

* **InputMasked:** fix integerLimit to work during typing ([#1694](https://github.com/dnbexperience/eufemia/issues/1694)) ([0fb697d](https://github.com/dnbexperience/eufemia/commit/0fb697df82f8717312f484b42ab14a28da6c7665))
* **Table:** remove usage of pseudo elements inside table rows ([#1704](https://github.com/dnbexperience/eufemia/issues/1704)) ([3f678bd](https://github.com/dnbexperience/eufemia/commit/3f678bd5de334a4743f08f8801ba8d2b84e43c3d))
* **Td:** fix children and add tests ([#1703](https://github.com/dnbexperience/eufemia/issues/1703)) ([060e84f](https://github.com/dnbexperience/eufemia/commit/060e84f4dc32427271c3159a3e3c207c40f59d5f))


### Features

* add e_scooter icon ([#1701](https://github.com/dnbexperience/eufemia/issues/1701)) ([c7024e2](https://github.com/dnbexperience/eufemia/commit/c7024e2c31a4ab1c0fe5467be5a4c46184f020f1))

# [9.36.0](https://github.com/dnbexperience/eufemia/compare/v9.35.0...v9.36.0) (2022-11-02)


### Bug Fixes

* **Section:** add official support for x-large and xx-large spacing ([#1672](https://github.com/dnbexperience/eufemia/issues/1672)) ([0c0e7c2](https://github.com/dnbexperience/eufemia/commit/0c0e7c2936b029d9b919619b1667ed4eb310e98d))
* **StepIndicator:** add example on how to use it with a router (browser location) ([9e7e708](https://github.com/dnbexperience/eufemia/commit/9e7e708ea6f34c72a821e53ce1865db294a6f542))
* **StepIndicator:** support spacing in Sidebar ([#1681](https://github.com/dnbexperience/eufemia/issues/1681)) ([de9735f](https://github.com/dnbexperience/eufemia/commit/de9735fab1bb4ad6a2086c6f848a104a2f1b3024))
* **Tabs:** align styles to properly function side by side with Section component in content ([#1671](https://github.com/dnbexperience/eufemia/issues/1671)) ([a607b5f](https://github.com/dnbexperience/eufemia/commit/a607b5ff70e39644e2640674a0322eac55914a32))
* **useMediaQuery:**  remove warning and handle environments without breaking ([#1685](https://github.com/dnbexperience/eufemia/issues/1685)) ([480c509](https://github.com/dnbexperience/eufemia/commit/480c5096f21bafb932c74af4df91f530278ff374))


### Features

* **Tabs:** make tabs content animate its height ([#1667](https://github.com/dnbexperience/eufemia/issues/1667)) ([3f1bf5e](https://github.com/dnbexperience/eufemia/commit/3f1bf5e81aa1520cb5363c5ec26c9dba7b43949f))
* **Upload:** accept jpeg when only jpg is defined ([#1677](https://github.com/dnbexperience/eufemia/issues/1677)) ([b5eb00b](https://github.com/dnbexperience/eufemia/commit/b5eb00bf63592e69ebbc864c3f053f18a19d6adc))
* **Upload:** highlight existing files visually ([#1657](https://github.com/dnbexperience/eufemia/issues/1657)) ([e17f66d](https://github.com/dnbexperience/eufemia/commit/e17f66d918860c6e529f44267b628e9ec901f800))

# [9.35.0](https://github.com/dnbexperience/eufemia/compare/v9.34.3...v9.35.0) (2022-10-28)


### Bug Fixes

* **Section:** add official support for x-large and xx-large spacing ([#1672](https://github.com/dnbexperience/eufemia/issues/1672)) ([0c0e7c2](https://github.com/dnbexperience/eufemia/commit/0c0e7c2936b029d9b919619b1667ed4eb310e98d))
* **Tabs:** align styles to properly function side by side with Section component in content ([#1671](https://github.com/dnbexperience/eufemia/issues/1671)) ([a607b5f](https://github.com/dnbexperience/eufemia/commit/a607b5ff70e39644e2640674a0322eac55914a32))


### Features

* **Tabs:** make tabs content animate its height ([#1667](https://github.com/dnbexperience/eufemia/issues/1667)) ([3f1bf5e](https://github.com/dnbexperience/eufemia/commit/3f1bf5e81aa1520cb5363c5ec26c9dba7b43949f))
* **Upload:** accept jpeg when only jpg is defined ([#1677](https://github.com/dnbexperience/eufemia/issues/1677)) ([b5eb00b](https://github.com/dnbexperience/eufemia/commit/b5eb00bf63592e69ebbc864c3f053f18a19d6adc))
* **Upload:** highlight existing files visually ([#1657](https://github.com/dnbexperience/eufemia/issues/1657)) ([e17f66d](https://github.com/dnbexperience/eufemia/commit/e17f66d918860c6e529f44267b628e9ec901f800))

## [9.34.3](https://github.com/dnbexperience/eufemia/compare/v9.34.2...v9.34.3) (2022-10-25)


### Bug Fixes

* **Breadcrumb:** support a single child ([#1668](https://github.com/dnbexperience/eufemia/issues/1668)) ([bbb22d2](https://github.com/dnbexperience/eufemia/commit/bbb22d2e778a2ba7c612d2955d97ed1e9bd76c4f))
* **Table Tr:** support a single child ([#1669](https://github.com/dnbexperience/eufemia/issues/1669)) ([52added](https://github.com/dnbexperience/eufemia/commit/52added81e10c21b388c72b435d82a62e793867c))

## [9.34.2](https://github.com/dnbexperience/eufemia/compare/v9.34.1...v9.34.2) (2022-10-25)


### Bug Fixes

* **extendPropsWithContext:** check for invalid/null sources ([#1664](https://github.com/dnbexperience/eufemia/issues/1664)) ([38a0595](https://github.com/dnbexperience/eufemia/commit/38a05952b9ac35eaa6fd4be32d64d06b173707a8))

## [9.34.1](https://github.com/dnbexperience/eufemia/compare/v9.34.0...v9.34.1) (2022-10-24)


### Bug Fixes

* **Breadcrumb:** support null as children ([#1661](https://github.com/dnbexperience/eufemia/issues/1661)) ([c459ca1](https://github.com/dnbexperience/eufemia/commit/c459ca1f6e48ecd06ae2899ecf50c8b7c90497b4))

# [9.34.0](https://github.com/dnbexperience/eufemia/compare/v9.33.0...v9.34.0) (2022-10-24)


### Bug Fixes

* **Upload:** make import paths valid in released version ([#1659](https://github.com/dnbexperience/eufemia/issues/1659)) ([4eb622a](https://github.com/dnbexperience/eufemia/commit/4eb622a01bf4c8727057e84af380033c332fc480))


### Features

* **useMedia:** add React Hook to handle Eufemia layout breakpoints ([#1650](https://github.com/dnbexperience/eufemia/issues/1650)) ([d41f7dd](https://github.com/dnbexperience/eufemia/commit/d41f7dda7a6c803a6578b5021a405141608f39e8))

# [9.33.0](https://github.com/dnbexperience/eufemia/compare/v9.32.1...v9.33.0) (2022-10-23)


### Bug Fixes

* **Accordion:** replace internal animation with HeightAnimation component ([#1619](https://github.com/dnbexperience/eufemia/issues/1619)) ([2cb2d48](https://github.com/dnbexperience/eufemia/commit/2cb2d48df457bcf13838b126b6fc197feb04d453))
* **Dl:** ensure correct spacing ([#1626](https://github.com/dnbexperience/eufemia/issues/1626)) ([5330e6d](https://github.com/dnbexperience/eufemia/commit/5330e6dc1c313ce7f3e72f0e6d57b41450e5ac47))
* **Dl:** remove span as direct sibling for horizontal direction ([#1625](https://github.com/dnbexperience/eufemia/issues/1625)) ([6845219](https://github.com/dnbexperience/eufemia/commit/6845219f3568b1b943199ff63bcfba7820899913))
* **Drawer:** ensure ScrollView is used for scrollable content ([#1632](https://github.com/dnbexperience/eufemia/issues/1632)) ([fea2358](https://github.com/dnbexperience/eufemia/commit/fea23585869e830d2f5c2095d5ed18a26cc635de))
* **DrawerList:** fix auto sizing when used in Drawer component ([#1634](https://github.com/dnbexperience/eufemia/issues/1634)) ([f19d58b](https://github.com/dnbexperience/eufemia/commit/f19d58bcad58226373722e7c3cbf5529bd58e730)), closes [#1632](https://github.com/dnbexperience/eufemia/issues/1632) [#1633](https://github.com/dnbexperience/eufemia/issues/1633) [#1631](https://github.com/dnbexperience/eufemia/issues/1631)
* **DrawerList:** reset "enable_body_lock" handlers after closing ([#1629](https://github.com/dnbexperience/eufemia/issues/1629)) ([1a90c72](https://github.com/dnbexperience/eufemia/commit/1a90c729d091074c18c807f799d83853c36eed7e))
* **Drawer:** make spacing of header and nav robust ([#1641](https://github.com/dnbexperience/eufemia/issues/1641)) ([5454ded](https://github.com/dnbexperience/eufemia/commit/5454ded078b972de35d4942c29367845a56d8e32))
* **FormStatus:** fix stretch when used in Dropdown and Autocomplete ([#1618](https://github.com/dnbexperience/eufemia/issues/1618)) ([a961feb](https://github.com/dnbexperience/eufemia/commit/a961feb1b06c7ddba10b3d5423c57e045e9e52b5))
* **gatsby-plugin-eufemia-theme-handler:** support Gatsby > v4.24 ([#1623](https://github.com/dnbexperience/eufemia/issues/1623)) ([34d0f6c](https://github.com/dnbexperience/eufemia/commit/34d0f6cafa3793bd9b4763d7aad05c39201d2443))
* **Icon:** fix override of data-testid property when provided ([#1637](https://github.com/dnbexperience/eufemia/issues/1637)) ([d335a14](https://github.com/dnbexperience/eufemia/commit/d335a14873bed46922ed9accd3e6c0d79f2e7c18))
* **Pagination:** fix locale support ([#1651](https://github.com/dnbexperience/eufemia/issues/1651)) ([01b93ce](https://github.com/dnbexperience/eufemia/commit/01b93ce55513dcecc1fc012973a194e7e2c8f218))
* **Section:** make style_type property accept any string ([#1636](https://github.com/dnbexperience/eufemia/issues/1636)) ([9e51565](https://github.com/dnbexperience/eufemia/commit/9e5156531b614558836ed77dcaafb9e649b69606))
* **Section:** rename AllSectionProps to SectionAllProps ([#1640](https://github.com/dnbexperience/eufemia/issues/1640)) ([23de874](https://github.com/dnbexperience/eufemia/commit/23de87451a6a59223cbc91dd2f094cf65af6e9bc))
* **Space:** rewrite Space component to TypeScript ([#1644](https://github.com/dnbexperience/eufemia/issues/1644)) ([c59f732](https://github.com/dnbexperience/eufemia/commit/c59f7329dfcb748240200f0d79995a47eba876ad))
* **Tooltip:** ensure timers cleanup on unmount ([#1642](https://github.com/dnbexperience/eufemia/issues/1642)) ([6dd4b7b](https://github.com/dnbexperience/eufemia/commit/6dd4b7ba11ffc7edfe0e5640702763dc9b6e5e86))


### Features

* **DrawerList:** animate max-height when changed during scrolling ([#1631](https://github.com/dnbexperience/eufemia/issues/1631)) ([cf302f7](https://github.com/dnbexperience/eufemia/commit/cf302f7d9c04ad0cb019401ddebd268599be5275))
* **DrawerList:** animate position when used inside dnb-scroll-view ([#1633](https://github.com/dnbexperience/eufemia/issues/1633)) ([7ed9550](https://github.com/dnbexperience/eufemia/commit/7ed9550513e8ff7a8d18c009c0023e646b187c31))
* **HeightAnimation:** add showOverflow property ([#1627](https://github.com/dnbexperience/eufemia/issues/1627)) ([a9bbce4](https://github.com/dnbexperience/eufemia/commit/a9bbce415e8ddb4bbe2ae3935402c2347ee1d854))
* **HeightAnimation:** make the view open by default ([#1646](https://github.com/dnbexperience/eufemia/issues/1646)) ([32aa0eb](https://github.com/dnbexperience/eufemia/commit/32aa0eb76d03a81e653c6a99c40b621813767238))
* **icons:** hierarchy, layout_card and unlock ([#1654](https://github.com/dnbexperience/eufemia/issues/1654)) ([d8d37ba](https://github.com/dnbexperience/eufemia/commit/d8d37bacaf76e7d70c04f9447bffa63ef8b6c4f3))
* **Upload:** add new Upload component ([#1581](https://github.com/dnbexperience/eufemia/issues/1581)) ([3304347](https://github.com/dnbexperience/eufemia/commit/330434709ddf31e3916f6fdf96d082986f0f0503)), closes [#1626](https://github.com/dnbexperience/eufemia/issues/1626)

## [9.32.1](https://github.com/dnbexperience/eufemia/compare/v9.32.0...v9.32.1) (2022-10-09)


### Bug Fixes

* **Tooltip:** make skipPortal properly inline and accessible to screen readers ([#1613](https://github.com/dnbexperience/eufemia/issues/1613)) ([0d32910](https://github.com/dnbexperience/eufemia/commit/0d32910fe64a541b6b6b99bc04f01bacdf558b0f))
* **Tooltip:** remove left over DOM elements when component unmounts ([#1612](https://github.com/dnbexperience/eufemia/issues/1612)) ([ddd26ed](https://github.com/dnbexperience/eufemia/commit/ddd26ed9dd5ab3c858c843def8598a486d3212ea))

# [9.32.0](https://github.com/dnbexperience/eufemia/compare/v9.31.0...v9.32.0) (2022-10-06)


### Bug Fixes

* **Accordion:** change icon color from emerald-green to sea-green ([#1600](https://github.com/dnbexperience/eufemia/issues/1600)) ([4206dfa](https://github.com/dnbexperience/eufemia/commit/4206dfa9628f993e775169d311ef908131ae342b))
* **Breadcrumb:** ensure correct spacing when collapsed ([#1606](https://github.com/dnbexperience/eufemia/issues/1606)) ([39d53f6](https://github.com/dnbexperience/eufemia/commit/39d53f68c8a956011aad5e012c97bd50f1067f79))
* **Breadcrumb:** make animation work when declarative declared ([#1605](https://github.com/dnbexperience/eufemia/issues/1605)) ([ab1d8eb](https://github.com/dnbexperience/eufemia/commit/ab1d8ebe791d1ddb49a201c2710ccd5772d6fb7a))
* **Interfaces:** refactor /shared/interfaces and move to /shared/types ([#1601](https://github.com/dnbexperience/eufemia/issues/1601)) ([e10ac34](https://github.com/dnbexperience/eufemia/commit/e10ac3468a441786c87c93135263174c3b63659c))
* **Lists:** rewrite Dl, Ol and Ul (and Li) to TypeScript ([#1610](https://github.com/dnbexperience/eufemia/issues/1610)) ([4646775](https://github.com/dnbexperience/eufemia/commit/464677598809e6a601214eeadf6c916dd6de64a7))


### Features

* **HeightAnimation:** add --hidden class when closed and keepInDOM is true ([#1607](https://github.com/dnbexperience/eufemia/issues/1607)) ([3d9313e](https://github.com/dnbexperience/eufemia/commit/3d9313e258fc00692d94e3c17bff27174d17b7d6))

# [9.31.0](https://github.com/dnbexperience/eufemia/compare/v9.30.0...v9.31.0) (2022-10-03)


### Bug Fixes

* **Accordion:** support nested accordions ([#1595](https://github.com/dnbexperience/eufemia/issues/1595)) ([dc14a79](https://github.com/dnbexperience/eufemia/commit/dc14a79a5f51aa12821b0369c506e06dacacbc35))
* **AnimateHeight:** [internal] rewrite to TypeScript ([#1570](https://github.com/dnbexperience/eufemia/issues/1570)) ([e2f0f0d](https://github.com/dnbexperience/eufemia/commit/e2f0f0d6b9c18bf2d708eb04682889444ebf8156))
* **Autocomplete:** ensure value is not visible behind the trigger button ([#1543](https://github.com/dnbexperience/eufemia/issues/1543)) ([de65acb](https://github.com/dnbexperience/eufemia/commit/de65acb353fe697c81f18f082ce5562fc1eb56a6))
* **Autocomplete:** make DrawerList direction observer work ([#1535](https://github.com/dnbexperience/eufemia/issues/1535)) ([fcdf9f8](https://github.com/dnbexperience/eufemia/commit/fcdf9f858d6fb196b5001ed5e4550b338b65c03a))
* **Autocomplete:** touch device issue: ensure focus is set after second input focus ([#1540](https://github.com/dnbexperience/eufemia/issues/1540)) ([2f3b82e](https://github.com/dnbexperience/eufemia/commit/2f3b82e29624cbfc7026fc496f88cfe196d900f9))
* **Avatar:** don't overwrite SVG color ([#1579](https://github.com/dnbexperience/eufemia/issues/1579)) ([a6b3f50](https://github.com/dnbexperience/eufemia/commit/a6b3f5031fd73b4de77e8d0dcd225e2c937a0465))
* **DrawerList:** remove unused white area on the right side ([#1542](https://github.com/dnbexperience/eufemia/issues/1542)) ([b5575e7](https://github.com/dnbexperience/eufemia/commit/b5575e74a6402576e78b28dfb8cc72be2ee4b320)), closes [#1531](https://github.com/dnbexperience/eufemia/issues/1531)
* **Input:** ensure dnb-input--null class will not be set ([#1544](https://github.com/dnbexperience/eufemia/issues/1544)) ([885d2d1](https://github.com/dnbexperience/eufemia/commit/885d2d1d962a9875dc6c3e0701505cc37bd1615b))
* **Modal:** Safari Desktop fullscreen video issue ([#1582](https://github.com/dnbexperience/eufemia/issues/1582)) ([5219ccd](https://github.com/dnbexperience/eufemia/commit/5219ccd37d3423d0ee76c61f8a7b1cd879637dd0))
* **PaginationInfinity:** ensure the load button does not appear when current_page decreases ([#1147](https://github.com/dnbexperience/eufemia/issues/1147)) ([e19a377](https://github.com/dnbexperience/eufemia/commit/e19a3779aed256fd60171f6502dd023b9ba0e534))
* **Section:** fix spacing + rewrite to TypeScript ([#1573](https://github.com/dnbexperience/eufemia/issues/1573)) ([4352495](https://github.com/dnbexperience/eufemia/commit/4352495343436aa931151ee92190c34ae118ec62))
* **Slider:** enhance Safari (desktop) UX ([#1539](https://github.com/dnbexperience/eufemia/issues/1539)) ([6ca785f](https://github.com/dnbexperience/eufemia/commit/6ca785f6cfb17d7b4be8cc97217fb85dcd5668c9))
* **Slider:** make it optional to provide an updated prop value ([#1537](https://github.com/dnbexperience/eufemia/issues/1537)) ([ff1f3b7](https://github.com/dnbexperience/eufemia/commit/ff1f3b7b3f6e70eac60f2d410642eb5fd9c1fd44))
* **StepIndicator:** change chevron icon to pointing to the right ([#1541](https://github.com/dnbexperience/eufemia/issues/1541)) ([8529d8c](https://github.com/dnbexperience/eufemia/commit/8529d8cc183767ea47af4779f8f9bf8a98a73baa))
* **Tooltip:** convert to camelCase props with backwards compatibility ([#1557](https://github.com/dnbexperience/eufemia/issues/1557)) ([24285cb](https://github.com/dnbexperience/eufemia/commit/24285cb399baef9971e6274146b51d1a144aae8a))
* **Tooltip:** convert to TypeScript ([#1549](https://github.com/dnbexperience/eufemia/issues/1549)) ([9789ec6](https://github.com/dnbexperience/eufemia/commit/9789ec69f9161d63e8ad85a257c96eaeb0a216ba))
* **Tooltip:** ensure controlled active prop takes presence ([#1547](https://github.com/dnbexperience/eufemia/issues/1547)) ([ac28883](https://github.com/dnbexperience/eufemia/commit/ac28883c2fba4ac4255457d0f6c5fe2fac6c5830)), closes [#1411](https://github.com/dnbexperience/eufemia/issues/1411)
* **Tooltip:** fix React Portal handling ([#1588](https://github.com/dnbexperience/eufemia/issues/1588)) ([26f4c61](https://github.com/dnbexperience/eufemia/commit/26f4c6185cf67cc4d0a1e78d18c59b1be5b95851))
* **Tooltip:** merge style property with internal ([#1591](https://github.com/dnbexperience/eufemia/issues/1591)) ([b3e3901](https://github.com/dnbexperience/eufemia/commit/b3e39016ce61f256ef0e3808d065170fc9635692))
* **Tooltip:** refactor tests from Enzyme to TestingLib ([#1553](https://github.com/dnbexperience/eufemia/issues/1553)) ([dde8576](https://github.com/dnbexperience/eufemia/commit/dde8576befcbc4c9eebf87586823e646b27dde5a))
* **Tooltip:** remove unused FormRow integration ([#1589](https://github.com/dnbexperience/eufemia/issues/1589)) ([be37918](https://github.com/dnbexperience/eufemia/commit/be37918edd455f895fc705bf8bc42d79b932fcbe))
* **Tooltip:** rewrite to functional components with React Hooks ([#1555](https://github.com/dnbexperience/eufemia/issues/1555)) ([8b04fc2](https://github.com/dnbexperience/eufemia/commit/8b04fc2924a318a259c41aa624a4473fd12d6e58))
* **Tooltip:** use Eufemia cubic-bezier for animations ([#1552](https://github.com/dnbexperience/eufemia/issues/1552)) ([c60b3a6](https://github.com/dnbexperience/eufemia/commit/c60b3a6eb146ab26bf61cc44bbc286fcfc7dff9b))


### Features

* **Breadcrumb:** add animation when in collapse mode ([#1563](https://github.com/dnbexperience/eufemia/issues/1563)) ([ded90c2](https://github.com/dnbexperience/eufemia/commit/ded90c202ad0bce6e5601d451c46f672cfeddab5))
* **Breadcumb:** align spacing and add small, medium and large ([#1574](https://github.com/dnbexperience/eufemia/issues/1574)) ([cf4c312](https://github.com/dnbexperience/eufemia/commit/cf4c31200e9d79110181e7c9c41746ed84154b0f))
* **DefinitionList:** add horizontal direction (inline) support ([#1536](https://github.com/dnbexperience/eufemia/issues/1536)) ([59ec706](https://github.com/dnbexperience/eufemia/commit/59ec706c5fb9ae111e4b8f495c6f034370aac507))
* **Easing:** expose default CSS easing with --easing-default ([#1562](https://github.com/dnbexperience/eufemia/issues/1562)) ([c18b021](https://github.com/dnbexperience/eufemia/commit/c18b0212df7d4bf985ecb071d6e928c83e0b4b90))
* **HeightAnimation:** add new height animation component ([#1566](https://github.com/dnbexperience/eufemia/issues/1566)) ([72b1da5](https://github.com/dnbexperience/eufemia/commit/72b1da504ee814e8afaf8dcefda15577ca29b0d0))
* **HeightAnimation:** add onInit to get animation instance ([#1597](https://github.com/dnbexperience/eufemia/issues/1597)) ([bf4e656](https://github.com/dnbexperience/eufemia/commit/bf4e65673654c5a6add3d234d0395c9e8bae9297))
* **HeightAnimation:** adjust height with animation when content changes ([#1569](https://github.com/dnbexperience/eufemia/issues/1569)) ([f0779c2](https://github.com/dnbexperience/eufemia/commit/f0779c294313d8f26f0af637135004a2b15de27a))
* **HelpButton:** rewrite to TypeScript ([#1565](https://github.com/dnbexperience/eufemia/issues/1565)) ([d4f26c3](https://github.com/dnbexperience/eufemia/commit/d4f26c3acf1f64fdcd3c0c4d0e9b2f833e39d267))
* **icons:** add "file_jpg, file_png, fish, newspaper, sort" icon ([#1575](https://github.com/dnbexperience/eufemia/issues/1575)) ([bf3769f](https://github.com/dnbexperience/eufemia/commit/bf3769f8d6dc8bd38f672ac99fa6525e5092204d))
* **InteractionInvalidation:** add options for partial invalidation (tabIndex and ariaHidden) ([#1559](https://github.com/dnbexperience/eufemia/issues/1559)) ([6cfc235](https://github.com/dnbexperience/eufemia/commit/6cfc2352d3d0b2012c66f535ca869b4bd75253b4))
* **Logo:** add inherit_color prop ([#1578](https://github.com/dnbexperience/eufemia/issues/1578)) ([0983343](https://github.com/dnbexperience/eufemia/commit/09833436f9e6313dd823859fde882ff141ef60b3))
* **Slider:** add tooltip on active thumb button ([#1529](https://github.com/dnbexperience/eufemia/issues/1529)) ([437f81c](https://github.com/dnbexperience/eufemia/commit/437f81c7fb957f39c65ac1ab2a21aeff5a2d7ef1))
* **Tooltip:** add skip_portal property ([#1545](https://github.com/dnbexperience/eufemia/issues/1545)) ([7f492a5](https://github.com/dnbexperience/eufemia/commit/7f492a52019101fd98e72fec6c9ef3dbf8eefe98))
* **useMediaQuery:** add disable as an option ([#1572](https://github.com/dnbexperience/eufemia/issues/1572)) ([6078cb4](https://github.com/dnbexperience/eufemia/commit/6078cb42206bb9c5552e76b72457027a9a8b20dc))

# [9.30.0](https://github.com/dnbexperience/eufemia/compare/v9.29.0...v9.30.0) (2022-08-29)


### Bug Fixes

* **Slider:** fix reverse with min and max defiend ([#1533](https://github.com/dnbexperience/eufemia/issues/1533)) ([6c169b4](https://github.com/dnbexperience/eufemia/commit/6c169b4c557ace9662f634eef8c5d3259dfae9fe))
* **Slider:** prevent onChange being called with same value ([#1528](https://github.com/dnbexperience/eufemia/issues/1528)) ([115b056](https://github.com/dnbexperience/eufemia/commit/115b056e0564b526edeaf879d98a936b5eb20e58))
* **Slider:** use numbers instead of css reverse when reversing slider ([#1532](https://github.com/dnbexperience/eufemia/issues/1532)) ([e2e83a0](https://github.com/dnbexperience/eufemia/commit/e2e83a03ba4b99defd45b017ba7480b1f1dd647d))
* **Theme:** correct DNB Eiendom state colors mint-green-50 to pistachio ([#1527](https://github.com/dnbexperience/eufemia/issues/1527)) ([b7f532e](https://github.com/dnbexperience/eufemia/commit/b7f532e29a5a0a333024d466ea4a6dd9714b4d5e))
* **withCamelCaseProps:** make exception for className ([#1534](https://github.com/dnbexperience/eufemia/issues/1534)) ([a0a0082](https://github.com/dnbexperience/eufemia/commit/a0a0082d2ed32b3436baefdc7e4f2e3b967cbca8))


### Features

* **Slider:** add multiThumbBehavior property ([#1526](https://github.com/dnbexperience/eufemia/issues/1526)) ([f835651](https://github.com/dnbexperience/eufemia/commit/f8356511cade71f0944a36dc13e24f67fb8ba154))

# [9.29.0](https://github.com/dnbexperience/eufemia/compare/v9.28.0...v9.29.0) (2022-08-24)


### Bug Fixes

* **Anchor:** fix Link class no-underline when used in DNB Section ([#1507](https://github.com/dnbexperience/eufemia/issues/1507)) ([a78c23b](https://github.com/dnbexperience/eufemia/commit/a78c23bd454e34a7da67007eb4fec41e84656b2b)), closes [#1505](https://github.com/dnbexperience/eufemia/issues/1505)
* **Drawer:** fix possible Safari selection causing selection scroll (horizontal) issue ([#1522](https://github.com/dnbexperience/eufemia/issues/1522)) ([7e481b2](https://github.com/dnbexperience/eufemia/commit/7e481b24cf205b6dbc25c34faaf7fd65af326427))
* **Slider:** (multi-thumbs) ensure correct index is set when thumb positions changes ([#1523](https://github.com/dnbexperience/eufemia/issues/1523)) ([0a4055d](https://github.com/dnbexperience/eufemia/commit/0a4055d31c937388a52fc4abd90e7ebec9db0ce9))
* **Slider:** internal re-write to camelCase props ([012573a](https://github.com/dnbexperience/eufemia/commit/012573a9bb75687a66c0b9e3c7b452e6126014f6))
* **Suffix:** make skeleton work ([#1519](https://github.com/dnbexperience/eufemia/issues/1519)) ([4871565](https://github.com/dnbexperience/eufemia/commit/4871565ec0ee4d6a550cfe6caef9d1be2cb021ff))


### Features

* **Anchor:** rewrite to TypeScript ([#1518](https://github.com/dnbexperience/eufemia/issues/1518)) ([30c919f](https://github.com/dnbexperience/eufemia/commit/30c919fd8a362dc79a421384641ea39c2742b992)), closes [#1516](https://github.com/dnbexperience/eufemia/issues/1516)
* **Slider:** add multi thumb button support ([#1517](https://github.com/dnbexperience/eufemia/issues/1517)) ([ddd0ea7](https://github.com/dnbexperience/eufemia/commit/ddd0ea7d8d199702125c721c7a1990b9957cc7d9))

# [9.28.0](https://github.com/dnbexperience/eufemia/compare/v9.27.0...v9.28.0) (2022-08-17)


### Bug Fixes

* **Autocomplete:** ensure the data suffix-value elements do not appear in the DOM when unused ([#1514](https://github.com/dnbexperience/eufemia/issues/1514)) ([a0d9571](https://github.com/dnbexperience/eufemia/commit/a0d9571b549ae8e55a14bdf5ea30834ce0ea356e))
* **Autocomplete:** make click on data suffix-element opening the drawer-list ([#1509](https://github.com/dnbexperience/eufemia/issues/1509)) ([03384b8](https://github.com/dnbexperience/eufemia/commit/03384b8cf79ad4d94f59160c4c9491a2693d52f2))
* **Autocomplete:** make disabled state look properly + center suffix value ([#1512](https://github.com/dnbexperience/eufemia/issues/1512)) ([e10e8bb](https://github.com/dnbexperience/eufemia/commit/e10e8bbba5f70be67cb903db6774a1e847fdb035))
* **Drawer:** ensure it removes scroll possibility when opened ([#1501](https://github.com/dnbexperience/eufemia/issues/1501)) ([6f4c383](https://github.com/dnbexperience/eufemia/commit/6f4c383af38f8d7999742f8c1f9faf47703d7023))
* **Drawer:** fix Safari text selection + drag/scroll issue ([afc77e8](https://github.com/dnbexperience/eufemia/commit/afc77e82cdd264eb8f5a4cd1899ff678539b4401))
* **Internal:** avoid running componentDidMount twice ([#1496](https://github.com/dnbexperience/eufemia/issues/1496)) ([1bd3c8a](https://github.com/dnbexperience/eufemia/commit/1bd3c8a2cc8dafc8184f9942db84b30f2a8f94b0))
* **Slider:** convert Slider from Class to Function component ([#1503](https://github.com/dnbexperience/eufemia/issues/1503)) ([9a8ca8b](https://github.com/dnbexperience/eufemia/commit/9a8ca8b3bc67e26a0cf76324f411c7e6e6d81298))
* **Slider:** rename prop thump_title to thumb_title ([#1500](https://github.com/dnbexperience/eufemia/issues/1500)) ([5818ee7](https://github.com/dnbexperience/eufemia/commit/5818ee744fe0f323741043564d6d1b80812d8a61))


### Features

* add Badge component ([#1194](https://github.com/dnbexperience/eufemia/issues/1194)) ([3dab13c](https://github.com/dnbexperience/eufemia/commit/3dab13c3bbd81ea344f37781f72fd21e952e3c2a))
* **Timeline:** add fullwidth to info message ([#1486](https://github.com/dnbexperience/eufemia/issues/1486)) ([4ef386b](https://github.com/dnbexperience/eufemia/commit/4ef386b0543033d6111b66132bd9ff7eedfb83a5))

# [9.27.0](https://github.com/dnbexperience/eufemia/compare/v9.26.1...v9.27.0) (2022-06-23)


### Bug Fixes

* always hide content from DOM when Accordion is collapsed ([41cbd9b](https://github.com/dnbexperience/eufemia/commit/41cbd9b634b17bd4f8c066b6ff9d1259c1e87b96))
* **Autocomplete:** enhance VoiceOver support ([#1472](https://github.com/dnbexperience/eufemia/issues/1472)) ([f469dd8](https://github.com/dnbexperience/eufemia/commit/f469dd86d697e625b2680ba99e4a3482b9704a6c))
* **Autocomplete:** ensure "no options" is read out in aria-live ([#1471](https://github.com/dnbexperience/eufemia/issues/1471)) ([254303f](https://github.com/dnbexperience/eufemia/commit/254303fe0466c63873f1363f4a4f09fe90b5607d))
* **Autocomplete:** fix using tab + write issue ([#1473](https://github.com/dnbexperience/eufemia/issues/1473)) ([73f9655](https://github.com/dnbexperience/eufemia/commit/73f96555990cf21bd8095f3eac7b778979d10298))
* **Autocomplete:** make VoiceOver announce first if a certain item is selected ([#1479](https://github.com/dnbexperience/eufemia/issues/1479)) ([d32e980](https://github.com/dnbexperience/eufemia/commit/d32e9803e403373696b0a65f18943fae714555c6))
* **Autocomplete:** touch device issue on first focus ([#1476](https://github.com/dnbexperience/eufemia/issues/1476)) ([5fcbf17](https://github.com/dnbexperience/eufemia/commit/5fcbf173836545641a3aca4da642750905ae5a7b))
* **Avatar:** properly handle spacing props ([5841990](https://github.com/dnbexperience/eufemia/commit/584199032ddf586ef03fddd1baf4b7c213980113))
* **Breadcrumb:** properly handle spacing props ([b713dad](https://github.com/dnbexperience/eufemia/commit/b713dadc30db630913928d13a9082a439fb2e273))
* **DatePicker:** make keyboard usage in input not throw ([#1475](https://github.com/dnbexperience/eufemia/issues/1475)) ([d0756e2](https://github.com/dnbexperience/eufemia/commit/d0756e217b9cfdba58948873a0a08992d7516399))
* **DatePicker:** rename testing attributes to data-testid ([2e1e285](https://github.com/dnbexperience/eufemia/commit/2e1e285e5430ebd5ce1d0dd788bdc1e2b4564d6a))
* **Dialog:** fix Modal backdrop / overlay false-positive click issue while e.g. selecting ([#1463](https://github.com/dnbexperience/eufemia/issues/1463)) ([91e69a8](https://github.com/dnbexperience/eufemia/commit/91e69a8b12fb1d21fb30222c9cf5e695e633c974))
* **Dialog:** fix Safari issue not able to scroll ([3f6fb31](https://github.com/dnbexperience/eufemia/commit/3f6fb31e0f506f522e7fa8cd99ee41d95b9faf7c))
* **Dialog:** make Dialog not overflow iOS Safari viewport ([764e487](https://github.com/dnbexperience/eufemia/commit/764e487758a0f3611558470c96234b09a0af5a78))
* **Dropdown:** Missing properties in PropTypes ([#1384](https://github.com/dnbexperience/eufemia/issues/1384)) ([7a83b38](https://github.com/dnbexperience/eufemia/commit/7a83b385d996f0bbbab7fffe88b47094705c46b6))
* **HeightAnimation:** ensure quick state changes to react without animating from start to finish ([886b4cd](https://github.com/dnbexperience/eufemia/commit/886b4cd15f7575df56714ea581fcf51e5edea9b2))
* **HelpButton:** Adds test when used inside texts ([#1404](https://github.com/dnbexperience/eufemia/issues/1404)) ([f8a7795](https://github.com/dnbexperience/eufemia/commit/f8a7795852c350d9a3a59367b255c8e2eb760c13))
* **Icon:** fix stopwatch icon (16px) ([d57c617](https://github.com/dnbexperience/eufemia/commit/d57c617a8249779ad7fe2888f178f53652e974a7))
* **Input:** add missing Input test for icon and clear button ([#1465](https://github.com/dnbexperience/eufemia/issues/1465)) ([be2b4a0](https://github.com/dnbexperience/eufemia/commit/be2b4a0536362717aae0e8dd96f53246155b6fd5))
* **Input:** enhance vertical centering for Safari (mainly iOS) ([#1469](https://github.com/dnbexperience/eufemia/issues/1469)) ([dadb5f8](https://github.com/dnbexperience/eufemia/commit/dadb5f8c15f5db468c266d588a759646f9f5a308))
* **InputMasked:** fix integerLimit option when used with decimals ([14fe5d9](https://github.com/dnbexperience/eufemia/commit/14fe5d91b1d398d623be725eef09dd85cc96f0b3))
* **Modal:** fix data-testid usage in object defined props ([e023f13](https://github.com/dnbexperience/eufemia/commit/e023f1330c8e1cee867394fb846bdeca2c4e8b95))
* **Modal:** fix flaky overlay opacity color issue happening in Chrome browser ([86d875d](https://github.com/dnbexperience/eufemia/commit/86d875dd6ac0a71a230b8936528507dd3718f4d8))
* **Radio:** fix radio button disabled issue when inside of group ([#1477](https://github.com/dnbexperience/eufemia/issues/1477)) ([e775792](https://github.com/dnbexperience/eufemia/commit/e7757921f6040b9859013aa417aaaa69b174425c))
* **Table:** align HTML/CSS classes and types ([ff0be8d](https://github.com/dnbexperience/eufemia/commit/ff0be8db491c00ee06794e15934d72040f3dda66))
* **Table:** fix sticky Table when no offset is given ([888564d](https://github.com/dnbexperience/eufemia/commit/888564d4380b9c7a771dbbe4ed299767c5d469a3))
* **Table:** simplify sticky table hook ([f1e7e3b](https://github.com/dnbexperience/eufemia/commit/f1e7e3bfab577e73ed6e23b49cdf30891e4e76b1))
* **Tag:** properly handle spacing props ([d7129d8](https://github.com/dnbexperience/eufemia/commit/d7129d8fbcc5b05ddff56eb017d3384e5eb9b566))
* **Timeline:** properly handle spacing props ([e823c6e](https://github.com/dnbexperience/eufemia/commit/e823c6e328bd1157560679e26801362039ad8e04))


### Features

* **Autocomplete:** add support for data suffix_value ([#1467](https://github.com/dnbexperience/eufemia/issues/1467)) ([fe6fbb7](https://github.com/dnbexperience/eufemia/commit/fe6fbb73fdba4ebf2166710d6ff48bfba36a5876))
* **DatePicker:** add size property to component ([#1438](https://github.com/dnbexperience/eufemia/issues/1438)) ([749a118](https://github.com/dnbexperience/eufemia/commit/749a1188a17998e690c22708f624c1e5a73ac05a))
* **DrawerList:** use CSS Grid for placing list content to enhance flexibility ([#1470](https://github.com/dnbexperience/eufemia/issues/1470)) ([93fac6b](https://github.com/dnbexperience/eufemia/commit/93fac6ba5728b38f347b35f48b0af5e3fda1ca2a))
* **Icons:** add calendar and bookmark icon ([#1449](https://github.com/dnbexperience/eufemia/issues/1449)) ([61c9c11](https://github.com/dnbexperience/eufemia/commit/61c9c119085c380227bf6546ee51f8273a7529a6))
* **Input:** add inner_element property for internal usage (as of now) ([#1466](https://github.com/dnbexperience/eufemia/issues/1466)) ([d1b1b19](https://github.com/dnbexperience/eufemia/commit/d1b1b19ed79f22393d3bb8b68cfd0eeb5dee5b13))
* **MediaQuery:** convert to TypeScript ([1a23e4f](https://github.com/dnbexperience/eufemia/commit/1a23e4f52740be5c05d2e6157709511b739349ec))
* **Modal:** add "bypass_invalidation_selectors" property to omit element invalidation ([d9cb392](https://github.com/dnbexperience/eufemia/commit/d9cb39208706283588d37def643233fa2301201c))
* **NumberFormat:** add srLabel property to enhance more easily a11y for screen reader users ([#1480](https://github.com/dnbexperience/eufemia/issues/1480)) ([004d675](https://github.com/dnbexperience/eufemia/commit/004d675eb074e7f269e2a9a31f8af17266eaf84a))
* **Provider:** rewrite to TypeScript ([#1436](https://github.com/dnbexperience/eufemia/issues/1436)) ([66416d9](https://github.com/dnbexperience/eufemia/commit/66416d94e56168cba181376c6580228077950012))
* **Table:** change colors of table ([1f3687f](https://github.com/dnbexperience/eufemia/commit/1f3687ff22e7694c2bfbb3fbaca1c430f2833c11))
* **Table:** move to components and rewrite to TypeScript ([562940a](https://github.com/dnbexperience/eufemia/commit/562940a5a6ef5670f69e73fb1923102e67413b13))
* **Timeline:** date supports a list of dates ([#1464](https://github.com/dnbexperience/eufemia/issues/1464)) ([a5c1dcd](https://github.com/dnbexperience/eufemia/commit/a5c1dcde05a673c632cc000e0112c42c54bb654e))
* **Timeline:** rename name to title & date to subtitle with backwards compatibility ([#1468](https://github.com/dnbexperience/eufemia/issues/1468)) ([6607963](https://github.com/dnbexperience/eufemia/commit/66079637a40b3c29727d1f7e64962d5a4668a9e8))

## [9.26.1](https://github.com/dnbexperience/eufemia/compare/v9.26.0...v9.26.1) (2022-06-10)


### Bug Fixes

* **Modal:** fix flaky overlay opacity color issue happening in Chrome browser ([21e8f90](https://github.com/dnbexperience/eufemia/commit/21e8f9089c20a479f5a8eca8c5d648f781ed8c24))

# [9.26.0](https://github.com/dnbexperience/eufemia/compare/v9.25.0...v9.26.0) (2022-04-27)


### Bug Fixes

* **Autocomplete:** Missing properties in PropTypes ([#1383](https://github.com/dnbexperience/eufemia/issues/1383)) ([1256009](https://github.com/dnbexperience/eufemia/commit/125600991434f15b3c5d85b8c9ad28e1c2bfcc00))
* **HelpButton:** ensure Drawer/Dialog/Modal trigger button gets a label ([4b52c98](https://github.com/dnbexperience/eufemia/commit/4b52c988904433ae3819b12709985ea0602462fa))


### Features

* add "plain" variant to Accordion ([#1398](https://github.com/dnbexperience/eufemia/issues/1398)) ([105d9ae](https://github.com/dnbexperience/eufemia/commit/105d9aed9e803aa0a3bd5d44686ccde4d64effb8))
* make Accordion support a separate icon for the expanded state ([58ac1d3](https://github.com/dnbexperience/eufemia/commit/58ac1d385fcd497313067422123173766a0d739a))

# [9.25.0](https://github.com/dnbexperience/eufemia/compare/v9.24.0...v9.25.0) (2022-04-05)


### Bug Fixes

* **Anchor:** Missing properties in PropTypes ([#1382](https://github.com/dnbexperience/eufemia/issues/1382)) ([92b6615](https://github.com/dnbexperience/eufemia/commit/92b66151af5a9b18a3034813ed3bbd8dea57ef57))
* **Avatar:** Allow Avatar to get skeleton prop from context ([#1347](https://github.com/dnbexperience/eufemia/issues/1347)) ([386616b](https://github.com/dnbexperience/eufemia/commit/386616b44810b2c1fbcffe06cec976fbc9d3cd40))
* **Avatar:** Allow Avatar.Group to set skeleton prop ([#1350](https://github.com/dnbexperience/eufemia/issues/1350)) ([a0d4e8a](https://github.com/dnbexperience/eufemia/commit/a0d4e8a3be68b4e98603b3131428f400f92f61aa))
* **Breadcrumb:** Allow Breadcrumb to get skeleton prop from context ([#1349](https://github.com/dnbexperience/eufemia/issues/1349)) ([b46f83b](https://github.com/dnbexperience/eufemia/commit/b46f83bbdcd4e836fbef7d5154d92289bd501584))
* **Button:** make tertiary button icon inherit button height property ([04111d5](https://github.com/dnbexperience/eufemia/commit/04111d5dbcb32fc02f96f4b30d3515b16d45c66e))
* **Button:** remove outline when button goes from enabled to disabled state when activeElement ([8f40076](https://github.com/dnbexperience/eufemia/commit/8f400763b65de830828d387e292d765f35c6879d))
* declare v17 as Eufemias peer dependency ([b14d237](https://github.com/dnbexperience/eufemia/commit/b14d237e6f0c9df7b7b5d948a3943685c11e1c31))
* **Dialog:** prevent close confirmation dialog on outside click ([d391285](https://github.com/dnbexperience/eufemia/commit/d3912851584b54c571a555d26970eeed590aa7cc))
* **Dropdown:** ensure the ellipsis text overflow works again ([640bdf9](https://github.com/dnbexperience/eufemia/commit/640bdf95e79386ddb599583d61a557aa897fa408))
* **FormStatus:** wider the min-width to 30rem and react on window width change ([adb2f3f](https://github.com/dnbexperience/eufemia/commit/adb2f3f8ac963ee0384b0562e68ed5b65dda9ff5))
* **Hr:** ensure the hr element does not causing a scrollbar ([cca94ff](https://github.com/dnbexperience/eufemia/commit/cca94ff2cc581df822c8e600d79ba54c81a9972d))
* **InfoCard:** Allow InfoCard to get skeleton prop from context ([#1348](https://github.com/dnbexperience/eufemia/issues/1348)) ([e2290c2](https://github.com/dnbexperience/eufemia/commit/e2290c2db1ae29b858999c6da19dc68f2c01ff1e))
* **Modal:** containerPlacement bug for top ([5864004](https://github.com/dnbexperience/eufemia/commit/58640049218d65417055e78a3d36cffeda1fd4ca))
* **Pagination:** add better experience for small viewports ([28ad651](https://github.com/dnbexperience/eufemia/commit/28ad65161c056935eeb41908e2ae71ebefb90cdc))
* **Pagination:** handle unknown / undefined page_count ([acc9c81](https://github.com/dnbexperience/eufemia/commit/acc9c81011e464acb7b13ab9d2f21b008d607bdb))
* **Pagination:** updated media query calculation ([35344ea](https://github.com/dnbexperience/eufemia/commit/35344ea1ea81ae0995e4308aefe2d03883d412f4))
* **Pagination:** use primary-icon instead of secondary import ([6944863](https://github.com/dnbexperience/eufemia/commit/69448637601d50d46a5ffa1e6f54c58c4e811467))
* remove alignment helpers from a11y tree (NVDA & Firefox) ([f31be33](https://github.com/dnbexperience/eufemia/commit/f31be3317c7d8e25254a6653a37adab47b186f9c))
* **Skeleton:** Missing properties in PropTypes ([#1381](https://github.com/dnbexperience/eufemia/issues/1381)) ([9abc790](https://github.com/dnbexperience/eufemia/commit/9abc790f59afb589c5475690bb96bc1090fe768f))
* **Tag:** Allow Tag to get skeleton prop from context ([3723421](https://github.com/dnbexperience/eufemia/commit/3723421c6fd6c378b40c2b392a23c13e4714ab47))
* **Tag:** Allow Tag.Group to set skeleton prop ([#1351](https://github.com/dnbexperience/eufemia/issues/1351)) ([844e215](https://github.com/dnbexperience/eufemia/commit/844e2156bf057dfe2a385195557718aed5160500))
* **Tag:** avoid inheriting spacing props when set on Tag.Group ([fbb7ad1](https://github.com/dnbexperience/eufemia/commit/fbb7ad1155aea1050d6778d5e652f4fd5560eefa))
* **Theming:** simplify the theming logic ([9b50082](https://github.com/dnbexperience/eufemia/commit/9b50082b57365a6a6fd44696e1c2d8e3f56134ca))
* **Timeline:** Allow Timeline to get skeleton prop from context ([#1346](https://github.com/dnbexperience/eufemia/issues/1346)) ([b87a59a](https://github.com/dnbexperience/eufemia/commit/b87a59a8f9a620eb71b4661b961ab6fec64e7055))
* **Tooltip:** ensure portal element does not occupy space in body ([4b05280](https://github.com/dnbexperience/eufemia/commit/4b052808940edcb6aa8a322a2eb48d12666256a5))
* **Tooltip:** fix premature removal of portal and prevent zombies ([fb0fe33](https://github.com/dnbexperience/eufemia/commit/fb0fe332ee05c5ee6bee66b9b401106f96066b1f))
* **Typography:** fix lead element and update docs ([3274dfe](https://github.com/dnbexperience/eufemia/commit/3274dfe6884e4ec4a6bd4184fa435cf2bf17d3c7))
* **VisuallyHidden:** use span as default element so it can be used inside paragraphs ([8dbc8a3](https://github.com/dnbexperience/eufemia/commit/8dbc8a3069d10a46b41e718975c82957f1320943))


### Features

* add useNumberFormat hook ([b218d27](https://github.com/dnbexperience/eufemia/commit/b218d272e0e81230d701ec9272f2ed4151dff86f))
* **Drawer:** less spacing in new styles ([c4faaf2](https://github.com/dnbexperience/eufemia/commit/c4faaf245ab2f8effc2498e2f9f4fd7b7e391786))
* **Eiendom:** apply theme styles ([447ccd6](https://github.com/dnbexperience/eufemia/commit/447ccd6cc5ab4a9755940cc7e2bb23b2a5f35d9f))
* **helpers:** add cancel method to debounce ([19cb3e0](https://github.com/dnbexperience/eufemia/commit/19cb3e0adbcf5c08f9fdf5d8255e7309dfa9fa50))
* **Icons:** add account_percent, news, podcast, user_feedback ([8695f57](https://github.com/dnbexperience/eufemia/commit/8695f57b3f6f0c86bfa73ecaf016657769a19362))
* **Icons:** rebuild all icons from refactored Figma lib source ([fc952bb](https://github.com/dnbexperience/eufemia/commit/fc952bbb253cd82617d8efdaf66f32771a1e2132))
* **Modal:** add property omitTriggerButton for hiding default trigger ([26e90fb](https://github.com/dnbexperience/eufemia/commit/26e90fb193e2041f517be27757ab1ca9beaa76ba))
* **Modal:** add property omitTriggerButton for hiding default trigger ([d02bbdd](https://github.com/dnbexperience/eufemia/commit/d02bbdd1bf36911c0a7053689e0687ecbd074972))
* **Pagination:** enhance accessibility and align styles to UX ([6fdba78](https://github.com/dnbexperience/eufemia/commit/6fdba7874bab5dac8cecbf9f7ac996de2d89db6c))
* **Pagination:** moved next buttons in new design ([d516264](https://github.com/dnbexperience/eufemia/commit/d516264cdae54d952f002b77b64ac0693139e79c))
* **Portal:** Suffix page titles with "| Eufemia" ([#1333](https://github.com/dnbexperience/eufemia/issues/1333)) ([788a58b](https://github.com/dnbexperience/eufemia/commit/788a58bf678de324e92388df07bf32fa3ab8ecae))
* **Theme:** add visual test example for Eiendom theme ([dcf918b](https://github.com/dnbexperience/eufemia/commit/dcf918b11494d32c4ff47c08f5cbaa25861112ec))
* **Theme:** create Eufemia Theme handler (Gatsby Plugin) ([d257a55](https://github.com/dnbexperience/eufemia/commit/d257a555d696cc2d7af2a048324eef8cd58a951b))

# [9.24.0](https://github.com/dnbexperience/eufemia/compare/v9.23.1...v9.24.0) (2022-03-02)


### Bug Fixes

* **Dialog:** set role alertdialog for confirmation variant ([8ec99af](https://github.com/dnbexperience/eufemia/commit/8ec99afb5f8ea385aae45e25880c6a71e04e6579))
* **Dropdown:** fix empty data entry handling ([4e4762b](https://github.com/dnbexperience/eufemia/commit/4e4762be4c6c4f1ebdc1c122922d44ef620bb3dc))


### Features

* **Avatar:** add hasLabel to omit group warning ([#1318](https://github.com/dnbexperience/eufemia/issues/1318)) ([ed43481](https://github.com/dnbexperience/eufemia/commit/ed434810ae0cefdb6ae943a2b463fee90756dc55))
* **Dialog:** add new variant confirmation ([#1302](https://github.com/dnbexperience/eufemia/issues/1302)) ([bdb7bb4](https://github.com/dnbexperience/eufemia/commit/bdb7bb4275f2c6f95e8448f85219be3637f2fa7b))
* **FormStatus:** add new marketing state/status ([#1317](https://github.com/dnbexperience/eufemia/issues/1317)) ([f5e63a9](https://github.com/dnbexperience/eufemia/commit/f5e63a9897cbc62f035ede523a99b3198eecd501))
* **NumberFormat:** add "compact" property – format a number compact with an abbreviation ([0e26449](https://github.com/dnbexperience/eufemia/commit/0e26449fee5c1f4fdf02b619d5a46080829a64be))
* **Tag:** omit non-existing group warning with new prop: hasLabel ([079cdcd](https://github.com/dnbexperience/eufemia/commit/079cdcd2cca2185620cf07a49c581f55fdf4d204))

## [9.23.1](https://github.com/dnbexperience/eufemia/compare/v9.23.0...v9.23.1) (2022-02-23)


### Bug Fixes

* **docs:** add more information on converting from Modal ([#1308](https://github.com/dnbexperience/eufemia/issues/1308)) ([1cce729](https://github.com/dnbexperience/eufemia/commit/1cce729391811c78a683127992bc0ee103fef993))
* **docs:** fix event docs of InfoCard ([2ccd670](https://github.com/dnbexperience/eufemia/commit/2ccd670b70bd581f3478eccb1d34bdc0a5cfa11a))
* **InfoCard:** issue on smaller screens ([9512980](https://github.com/dnbexperience/eufemia/commit/95129808576c62ad341f7dd4cf422b6f23eadc76))
* **Internal:** ensure usePropsWithContext will use context regardless ([0a7e9c6](https://github.com/dnbexperience/eufemia/commit/0a7e9c688498ffca2ec4c05a0f79fc7c2563fe13))
* **Modal:** containerPlacement bug for left side ([15c0442](https://github.com/dnbexperience/eufemia/commit/15c0442bd36e51342caf539707289b4533ee51d7))

# [9.23.0](https://github.com/dnbexperience/eufemia/compare/v9.22.0...v9.23.0) (2022-02-22)


### Bug Fixes

* **Dropdown:** disabled tertiary dropdown ([c1b4c4b](https://github.com/dnbexperience/eufemia/commit/c1b4c4b58511a7055e95ac32e0ed849e1838f075))
* **Modal:** add possibility for camelcase props ([4127452](https://github.com/dnbexperience/eufemia/commit/4127452540c0a822f6a0c59d9dfeb4d2925d39f4))
* **ProgressIndicator:** css change to fix aliasing artifacts for ProgressIndicator ([ab8859e](https://github.com/dnbexperience/eufemia/commit/ab8859e5b5ec4cf728312edf87e60715a864c61f))
* set Eufemia.version during release ([e74d441](https://github.com/dnbexperience/eufemia/commit/e74d4412b395fe5b02cecdc9d1d962d1af73f41d))
* **Styles:** ensure independent styling packages have declared their dependencies ([8b3c230](https://github.com/dnbexperience/eufemia/commit/8b3c230b4e0c91d96695791731b61a6b8641c9db))
* **Tabs:** align to new UX designs ([794bf70](https://github.com/dnbexperience/eufemia/commit/794bf70f001feb10936c20c5023f270f34d69dfd))
* **Tag:** fix Tag.Group spacing ([d7b77a2](https://github.com/dnbexperience/eufemia/commit/d7b77a29c2fc368d2c05c1466a93b54e7d9c7730))


### Features

* **esm:** remove esm directory in package build ([f189b62](https://github.com/dnbexperience/eufemia/commit/f189b62dfcb620f0d0f7f8673c781c3e08060d32))
* **Icon:** add examples for color property ([#1275](https://github.com/dnbexperience/eufemia/issues/1275)) ([67f8121](https://github.com/dnbexperience/eufemia/commit/67f8121485bbb419c6cc5f104023ccb619aeac73))
* Separate Drawer and Dialog from Modal ([ebe8e6a](https://github.com/dnbexperience/eufemia/commit/ebe8e6a597c87885c081fcdfd76339780e90befc))
* **Tabs:** Enhance parent width handling and remove auto edge detection ([99ed393](https://github.com/dnbexperience/eufemia/commit/99ed3938bcfe6303162250cae1982af13df18744))
* **TypeScript:** remove original ts/tsx files and only leave type definition files ([#1292](https://github.com/dnbexperience/eufemia/issues/1292)) ([79bdfb4](https://github.com/dnbexperience/eufemia/commit/79bdfb404dd9ebd484fff4770e849e16b6bbff2e))

# [9.22.0](https://github.com/dnbexperience/eufemia/compare/v9.21.0...v9.22.0) (2022-02-09)


### Bug Fixes

* **Avatar:** make the radius 100% round ([06e4133](https://github.com/dnbexperience/eufemia/commit/06e41339407bb9c0f3e0ff21d6e43c00115ea7fb))
* avoid Modal (dialog) from being omitted in accessibility tree ([#1205](https://github.com/dnbexperience/eufemia/issues/1205)) ([1d4d6f1](https://github.com/dnbexperience/eufemia/commit/1d4d6f11ac9b75a1bfe4e7812b3bd45ff653547a))
* fix InputMasked delete key usage ([0e13054](https://github.com/dnbexperience/eufemia/commit/0e1305490391ac3c97c48ddf7e05c8fa833094be)), closes [#1113](https://github.com/dnbexperience/eufemia/issues/1113)
* **Icons:** fix svgo config ([e9326ee](https://github.com/dnbexperience/eufemia/commit/e9326ee0280bc811eb74bd3842e4e6e22081f54f))
* **Icons:** lower icon size ([5e86696](https://github.com/dnbexperience/eufemia/commit/5e86696c2016be27207d0125b8d03ec7b6e012f1))
* **Logo:** center logo in bounding box by using flex ([2a9eed7](https://github.com/dnbexperience/eufemia/commit/2a9eed7988d2d01b9144d3445a9b58feaa768190))
* **Modal:** ensure IE11 is placing the close button to the right side ([1aab80f](https://github.com/dnbexperience/eufemia/commit/1aab80f28a4129ae55d6777252d539cd4afd5ee2))
* **Modal:** make revalidation after Modal close work on IE11 ([c00c489](https://github.com/dnbexperience/eufemia/commit/c00c489e95f47e19bba2de8d3f2ee245b2794c33))
* **NumberUtils:** enhance missing types ([5e46814](https://github.com/dnbexperience/eufemia/commit/5e46814402345a9b4d8ed0be582bfb0a1773781a))
* **NumberUtils:** fix IE11 issue with ([6225b9a](https://github.com/dnbexperience/eufemia/commit/6225b9a8ec548436ab3612389e713706c28205c6))


### Features

* **Tabs:** add no_border prop ([#1279](https://github.com/dnbexperience/eufemia/issues/1279)) ([47826fd](https://github.com/dnbexperience/eufemia/commit/47826fd28a78cdfd1baf90b9bf8061c8cb5bc9b5))
* update icons: credit_note, deleted_invoice, speedometer, travel ([3b91772](https://github.com/dnbexperience/eufemia/commit/3b917724ad939f7edbe6adb39c7c30ef978b7aee))
* **Version:** run Eufemia.version in your browser console ([06e8658](https://github.com/dnbexperience/eufemia/commit/06e8658c8bcbc7d0633665f71dbdbed43a3ec0c5))
* **VisuallyHidden:** Add VisuallyHidden component ([#1246](https://github.com/dnbexperience/eufemia/issues/1246)) ([48819d4](https://github.com/dnbexperience/eufemia/commit/48819d4833b0afe41223ef260a52814bcfe3b907))

# [9.21.0](https://github.com/dnbexperience/eufemia/compare/v9.20.0...v9.21.0) (2022-02-04)


### Bug Fixes

* **Breadcrumb:** fix typo in snapshot test ([#1258](https://github.com/dnbexperience/eufemia/issues/1258)) ([df4e17c](https://github.com/dnbexperience/eufemia/commit/df4e17c44269581574efdadd9c1625ab7daedf68))
* **Tag:** add default spacing 8px between tags ([#1266](https://github.com/dnbexperience/eufemia/issues/1266)) ([740afeb](https://github.com/dnbexperience/eufemia/commit/740afeb4c37875107cf747571fa34dd408104f0c))


### Features

* **Tag:** add skeleton example ([#1263](https://github.com/dnbexperience/eufemia/issues/1263)) ([52e05d8](https://github.com/dnbexperience/eufemia/commit/52e05d800e47c9d9ff2e140a1a3696cf9afaf893))

# [9.20.0](https://github.com/dnbexperience/eufemia/compare/v9.19.0...v9.20.0) (2022-02-02)


### Bug Fixes

* add stylis plugin TS Type definitions ([4c8210c](https://github.com/dnbexperience/eufemia/commit/4c8210c4f84a98a2a2c1aec5ca9893aa8a389007))
* **AvatarGroup:** remove left border from first avatar ([#1254](https://github.com/dnbexperience/eufemia/issues/1254)) ([bc1a870](https://github.com/dnbexperience/eufemia/commit/bc1a870a82997183858829854621a7c6d442d19a))
* **Breadcrumb:** fix React Node usage in aria-label ([1c921fa](https://github.com/dnbexperience/eufemia/commit/1c921fa99c436a5c3cfe40608a4488c80fd91f44))
* **BreadCrumb:** make isCollapsed prop typing strict to only use boolean ([392e6eb](https://github.com/dnbexperience/eufemia/commit/392e6ebd37711918abb2abb620367bad3f6bff6f))
* **CodeHighlighting:** ensure a scrollbar is shown when not enough space is available (pre tag) ([#1230](https://github.com/dnbexperience/eufemia/issues/1230)) ([4bd2930](https://github.com/dnbexperience/eufemia/commit/4bd2930727fb0dd96fbcaf1b86bb1e24f09cfbc9))
* **InfoCard:** change text props to React.ReactNode ([#1253](https://github.com/dnbexperience/eufemia/issues/1253)) ([79c37af](https://github.com/dnbexperience/eufemia/commit/79c37af0f9e2a91d565d3c8e66ab4d30714c3ae6))
* label of avatar group to be react node ([#1244](https://github.com/dnbexperience/eufemia/issues/1244)) ([04df401](https://github.com/dnbexperience/eufemia/commit/04df401149d100f667512bbc23d8be52c2794ddd))
* label of tag group to be react node ([#1245](https://github.com/dnbexperience/eufemia/issues/1245)) ([4949d85](https://github.com/dnbexperience/eufemia/commit/4949d85cf0e19ddc1b296ebae1e205028d47743f))
* make Eufemia "warn" log better recognizable ([#1231](https://github.com/dnbexperience/eufemia/issues/1231)) ([c917b94](https://github.com/dnbexperience/eufemia/commit/c917b9409c810b5ea53bb97364a3a6be6b655b6b))
* **StepIndicator:** fix height animation issue when CSS is loaded too slow ([#1221](https://github.com/dnbexperience/eufemia/issues/1221)) ([8dfdd7e](https://github.com/dnbexperience/eufemia/commit/8dfdd7ef5e6d8984179a669402589fda6f83b816))
* **TagGroup:** make TagGroup component inline, so it can be used in body text / paragraphs ([#1229](https://github.com/dnbexperience/eufemia/issues/1229)) ([b64f5d3](https://github.com/dnbexperience/eufemia/commit/b64f5d348093928b4267bcc8bbd41479dab17b61))
* **TimeLine:** display skeleton when items is passed as children ([#1255](https://github.com/dnbexperience/eufemia/issues/1255)) ([4eaea6b](https://github.com/dnbexperience/eufemia/commit/4eaea6b3e2989c6a965d2d037c57a28108b59c1c))
* **Timeline:** fix TypeScript issue when using children ([0a9571c](https://github.com/dnbexperience/eufemia/commit/0a9571c1010226990e4d4ff3cd68db492e65ae2d))
* **Types:** correct usage of icon types inside Button and BreadcrumbItem ([85dee9c](https://github.com/dnbexperience/eufemia/commit/85dee9c0f2316efff1e53869ed5a1a9f138cb579))
* **Types:** correct usage of title and size attributes along side with some other colliding props ([540998a](https://github.com/dnbexperience/eufemia/commit/540998a5ecc82780a01260be5f52b3e287d86f98))
* **Types:** fix SkeletonShow type usage ([03c8525](https://github.com/dnbexperience/eufemia/commit/03c85256f24389aec96dc62e38e8865eb66a94e9))


### Features

* add usePropsWithContext hook for hook based components ([#1234](https://github.com/dnbexperience/eufemia/issues/1234)) ([d60feeb](https://github.com/dnbexperience/eufemia/commit/d60feeb90cc2f0b51a4525f844b10afef0b0729c))
* remove type="module" in order omit the "fullySpecified" spec ([bc3f12a](https://github.com/dnbexperience/eufemia/commit/bc3f12a24d3912ccbe3cf4593508c3e5ebd2c8d5))
* **TypeScript:** enhance overall typing and add verify check ([608bede](https://github.com/dnbexperience/eufemia/commit/608bede9675f6d4c0a0b710566ae010a560cc8aa))

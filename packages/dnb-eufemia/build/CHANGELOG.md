# Changelog

All notable changes to @dnb/eufemia will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

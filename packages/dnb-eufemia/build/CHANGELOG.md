# Changelog

All notable changes to @dnb/eufemia will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [11.0.4](https://github.com/dnbexperience/eufemia/compare/v11.0.3...v11.0.4) (2026-04-29)


### :zap: Refactoring

* add border radius tokens to components ([#7851](https://github.com/dnbexperience/eufemia/issues/7851)) ([00a0333](https://github.com/dnbexperience/eufemia/commit/00a033300a3aadc92b134fab275ea09858dda14d))


### :bug: Bug Fixes

* **Dialog, Drawer, ScrollView:** handle content movement when scrollbar appears and add `scrollbarGutter` property ([#7862](https://github.com/dnbexperience/eufemia/issues/7862)) ([430fac8](https://github.com/dnbexperience/eufemia/commit/430fac8a31dd1ac7b68f66f8712669737d427d89))
* **Dropdown, Autocomplete:** improve outline (border) of DrawerList ([#7863](https://github.com/dnbexperience/eufemia/issues/7863)) ([c216d8b](https://github.com/dnbexperience/eufemia/commit/c216d8bc33cf98f57e8232a7cb7f16b2804a1c11)), closes [#7759](https://github.com/dnbexperience/eufemia/issues/7759) [#7854](https://github.com/dnbexperience/eufemia/issues/7854)
* **Icon:** return stable reference from prerenderIcon for function icons ([#7847](https://github.com/dnbexperience/eufemia/issues/7847)) ([669407f](https://github.com/dnbexperience/eufemia/commit/669407fe3ec85a686de5750f9feef5a4ef170a5d))
* **Tools.Log:** use variant prop instead of backgroundColor for dark mode support ([#7852](https://github.com/dnbexperience/eufemia/issues/7852)) ([d884843](https://github.com/dnbexperience/eufemia/commit/d88484319eb9638d58714c15df8a21ff9eff9232))


### :memo: Documentation

* **DatePicker:** clarify minDate/maxDate behavior and reference Field.Date for input validation ([#7866](https://github.com/dnbexperience/eufemia/issues/7866)) ([bcb1b21](https://github.com/dnbexperience/eufemia/commit/bcb1b21a8eba9be0eba71a83a4628307feb5022c))
* enable dark/light mode switch in code examples ([#7843](https://github.com/dnbexperience/eufemia/issues/7843)) ([bb297b1](https://github.com/dnbexperience/eufemia/commit/bb297b1813d468315c2427f5a3fd4086081609b3))
* **Forms:** add rationale for optional-by-default and optional label convention ([#7868](https://github.com/dnbexperience/eufemia/issues/7868)) ([dc5792f](https://github.com/dnbexperience/eufemia/commit/dc5792f83d1e804d80eb74cdcad22d733b8cb026))

## [11.0.3](https://github.com/dnbexperience/eufemia/compare/v11.0.2...v11.0.3) (2026-04-28)


### :barber: Style Changes

* **Portal:** enable dark mode ☀️🌑 ([#7808](https://github.com/dnbexperience/eufemia/issues/7808)) ([3a9ac2a](https://github.com/dnbexperience/eufemia/commit/3a9ac2a8892feb937ce1397ac685a21178e9ec96))


### :bug: Bug Fixes

* **PhoneNumber:** prevent dashed country code digits from leaking into number field ([#7828](https://github.com/dnbexperience/eufemia/issues/7828)) ([92552ca](https://github.com/dnbexperience/eufemia/commit/92552cac05bacd5070651c888e47ebc3d0139338))
* **ScrollView:** support callback refs in useInteractive ([#7836](https://github.com/dnbexperience/eufemia/issues/7836)) ([28a989e](https://github.com/dnbexperience/eufemia/commit/28a989eed85596d252a5bd5870b1b59760342363))
* **Table:** recalculate sticky header offset on scroll for dynamic layouts ([#7815](https://github.com/dnbexperience/eufemia/issues/7815)) ([5a4f31b](https://github.com/dnbexperience/eufemia/commit/5a4f31b59e54c712a0d4f7b5e02ab785c911e854))


### :zap: Refactoring

* **DatePicker:** use design tokens ([#7822](https://github.com/dnbexperience/eufemia/issues/7822)) ([574d037](https://github.com/dnbexperience/eufemia/commit/574d037363b7cff466440cb9e9b1ade57dbf454f))
* **SkipLink:** use design tokens ([#7824](https://github.com/dnbexperience/eufemia/issues/7824)) ([28aebf3](https://github.com/dnbexperience/eufemia/commit/28aebf3e53106ef9c516306d908e372c1fa87118))
* **StepIndicator:** use design tokens ([#7816](https://github.com/dnbexperience/eufemia/issues/7816)) ([51a3a91](https://github.com/dnbexperience/eufemia/commit/51a3a91de58b49192c4078433aea1ec0a4997826))
* use design tokens for ::selection styles ([#7838](https://github.com/dnbexperience/eufemia/issues/7838)) ([b6c6cfc](https://github.com/dnbexperience/eufemia/commit/b6c6cfcec095a72bc23e799afc671fa9b2fba893))

## [11.0.2](https://github.com/dnbexperience/eufemia/compare/v11.0.1...v11.0.2) (2026-04-28)


### :memo: Documentation

* add design tokens guide ([#7777](https://github.com/dnbexperience/eufemia/issues/7777)) ([938e4c9](https://github.com/dnbexperience/eufemia/commit/938e4c9a9bb660a91f415e904ebc7cb7b27c5045))
* **Portal:** add missing syntax highlighting and support brand colors ([#7775](https://github.com/dnbexperience/eufemia/issues/7775)) ([453acba](https://github.com/dnbexperience/eufemia/commit/453acbaf33b85fbbca3cacb9bf1345d62184a4c0))


### :bug: Bug Fixes

* add missing `dnb-page-background` helper class ([#7757](https://github.com/dnbexperience/eufemia/issues/7757)) ([7d745ff](https://github.com/dnbexperience/eufemia/commit/7d745ff48e25db960ebc30aa2551ba514050f8dc))
* **Button:** accept ReactNode title and convert to string internally ([#7756](https://github.com/dnbexperience/eufemia/issues/7756)) ([f438537](https://github.com/dnbexperience/eufemia/commit/f4385371194419197276c7aec061acd5d6852568))
* **DatePicker:** use span instead of label for calendar header title ([#7747](https://github.com/dnbexperience/eufemia/issues/7747)) ([fe72486](https://github.com/dnbexperience/eufemia/commit/fe7248678978d0f84f84322bfd4020a2edd8dc03))
* **Dropdown, Autocomplete, Dialog, Drawer, Popover:** remove theming classes into `PortalRoot` ([#7764](https://github.com/dnbexperience/eufemia/issues/7764)) ([491f6b6](https://github.com/dnbexperience/eufemia/commit/491f6b64f0f54b83816c3fe867a68cd008a1a658))
* **Dropdown, Autocomplete:** add outline (border) to DrawerList ([#7759](https://github.com/dnbexperience/eufemia/issues/7759)) ([4e57341](https://github.com/dnbexperience/eufemia/commit/4e57341e3936ed81a932be673a0b919cb7c71f12))
* **FieldBlock:** render label as span when not associated with a form field ([#7746](https://github.com/dnbexperience/eufemia/issues/7746)) ([80058a4](https://github.com/dnbexperience/eufemia/commit/80058a4a5275817b729db597000c4e24e964b72a))
* **HelpButtonInline:** pass ReactNode title for tooltip rendering ([#7801](https://github.com/dnbexperience/eufemia/issues/7801)) ([8cb6f1d](https://github.com/dnbexperience/eufemia/commit/8cb6f1d290ceadc3977072169ccf691b5f0a3a7c)), closes [#7752](https://github.com/dnbexperience/eufemia/issues/7752)
* **MCP:** make @modelcontextprotocol/sdk a devDependency — ⚠️ install it yourself to use the MCP server (beta) ([#7769](https://github.com/dnbexperience/eufemia/issues/7769)) ([28ca92c](https://github.com/dnbexperience/eufemia/commit/28ca92c4c9283296c52423d7e22aa621924e2a46))
* **Popover:** clamp arrow at border-radius boundary to avoid rounded corner gap ([#7765](https://github.com/dnbexperience/eufemia/issues/7765)) ([7651a8e](https://github.com/dnbexperience/eufemia/commit/7651a8e9780b6c52d470c3b9da9f13005cad205b))
* prevent useMediaQuery hydration mismatch ([#7773](https://github.com/dnbexperience/eufemia/issues/7773)) ([c7b0fc5](https://github.com/dnbexperience/eufemia/commit/c7b0fc5bc2f97dc71d39549db4b69584e6c341ba))
* read key from element instead of props for React 19 compatibility ([#7793](https://github.com/dnbexperience/eufemia/issues/7793)) ([59bf60d](https://github.com/dnbexperience/eufemia/commit/59bf60df4fe4fb1e98871084ea142f6911ca130f))
* scope :root sibling selectors in PostCSS isolation plugin ([#7772](https://github.com/dnbexperience/eufemia/issues/7772)) ([2f0ed8c](https://github.com/dnbexperience/eufemia/commit/2f0ed8cbfac11b69dd767a49497a3b3495ad026f))
* **StepIndicator:** render trigger label as span instead of label element ([#7748](https://github.com/dnbexperience/eufemia/issues/7748)) ([045889e](https://github.com/dnbexperience/eufemia/commit/045889e5053e6328f70d966db772edecfb9342d4))
* support React component titles in help button aria-label  ([#7755](https://github.com/dnbexperience/eufemia/issues/7755)) ([fa2043f](https://github.com/dnbexperience/eufemia/commit/fa2043f8cc9cd5359ab258ee57fb9ebfcb8d20ff))


### :zap: Refactoring

* **Avatar:** use design tokens ([#7794](https://github.com/dnbexperience/eufemia/issues/7794)) ([db1d8ba](https://github.com/dnbexperience/eufemia/commit/db1d8ba44d409c91923450e7c745dcd63e7b6623))
* **Forms:** use design tokens ([#7802](https://github.com/dnbexperience/eufemia/issues/7802)) ([de88a6b](https://github.com/dnbexperience/eufemia/commit/de88a6b78df660f9155fd13278f40820bde8473b))
* **Portal:** use design tokens and implement new Eufemia logo ([#7742](https://github.com/dnbexperience/eufemia/issues/7742)) ([cc2c1c8](https://github.com/dnbexperience/eufemia/commit/cc2c1c8b5e5a99d51c9d6c58c06cdee4ae691a9b))
* **ProgressIndicator:** use design tokens ([#7797](https://github.com/dnbexperience/eufemia/issues/7797)) ([0fb42b7](https://github.com/dnbexperience/eufemia/commit/0fb42b7e1e0ce516fed91e66c476ac04cbfdeb63))
* **Timeline:** use design tokens ([#7766](https://github.com/dnbexperience/eufemia/issues/7766)) ([6395264](https://github.com/dnbexperience/eufemia/commit/6395264d78efc8fb90e08f99ca7f5ac4c976238f))
* **Upload:** use design tokens ([#7754](https://github.com/dnbexperience/eufemia/issues/7754)) ([d1d79b8](https://github.com/dnbexperience/eufemia/commit/d1d79b8ed019cec3c53b8ef2215981236dd8706d))

## [11.0.1](https://github.com/dnbexperience/eufemia/compare/v11.0.0...v11.0.1) (2026-04-24)


### :bug: Bug Fixes

* **Anchor:** add missing style.ts entry ([#7664](https://github.com/dnbexperience/eufemia/issues/7664)) ([08d6fdb](https://github.com/dnbexperience/eufemia/commit/08d6fdbd698320efa20c632bf4575be58b8467fa))
* **Button, Tabs, PaymentCard:** remove legacy class prop ([#7657](https://github.com/dnbexperience/eufemia/issues/7657)) ([a805f45](https://github.com/dnbexperience/eufemia/commit/a805f45c6345831220543605f067c231ceb3174a))
* **Card:** allow `outlineWidth` to work on nested Cards ([#7659](https://github.com/dnbexperience/eufemia/issues/7659)) ([2878f55](https://github.com/dnbexperience/eufemia/commit/2878f55761e5ade3e00b8f0e4126c0ad06e157f0)), closes [#7655](https://github.com/dnbexperience/eufemia/issues/7655)
* **DrawerList:** use overflow hidden instead of clip-path for arrow --run-all ([#7668](https://github.com/dnbexperience/eufemia/issues/7668)) ([be20a28](https://github.com/dnbexperience/eufemia/commit/be20a28ae9863d081017ddc677b7e0c3daa8ca1d))
* **Field.Upload:** align help background ([#7717](https://github.com/dnbexperience/eufemia/issues/7717)) ([9c7c1a6](https://github.com/dnbexperience/eufemia/commit/9c7c1a607e4e88a8c013b0819363d3219da5bc85))
* **List:** improve a11y for `List.Item.Action` ([#7723](https://github.com/dnbexperience/eufemia/issues/7723)) ([b77992b](https://github.com/dnbexperience/eufemia/commit/b77992be2cf0b6acc2dac2ce703c746b59c82256))
* **Stat:** add `en-GB` currency spacing ([#7660](https://github.com/dnbexperience/eufemia/issues/7660)) ([908fab1](https://github.com/dnbexperience/eufemia/commit/908fab1fc87d3fd1287d368d768c7cf2e7c8b2e1))
* **StyleIsolation:** handle `:root` in multi-selector rules ([#7733](https://github.com/dnbexperience/eufemia/issues/7733)) ([444949c](https://github.com/dnbexperience/eufemia/commit/444949c19fe04c2e7928cdc087f9a529385b3916))
* **Upload:** ensure valid `key` in list items ([#7718](https://github.com/dnbexperience/eufemia/issues/7718)) ([4d602fb](https://github.com/dnbexperience/eufemia/commit/4d602fb5706d57272ac78ba94bbff643600c4f1a))


### :memo: Documentation

* **Design Tokens:** add `radius` ([#7720](https://github.com/dnbexperience/eufemia/issues/7720)) ([68f65de](https://github.com/dnbexperience/eufemia/commit/68f65defc17f1cf16f9233b2099b715b49a6acf2))


### :zap: Refactoring

* **Badge:** use design tokens for notification ([#7590](https://github.com/dnbexperience/eufemia/issues/7590)) ([495e8af](https://github.com/dnbexperience/eufemia/commit/495e8af6837cbfe7a3e4061f917ec8ec0aa3774f))
* **Field.Password:** use design tokens ([#7591](https://github.com/dnbexperience/eufemia/issues/7591)) ([b78415d](https://github.com/dnbexperience/eufemia/commit/b78415dc14489dcd1dc5b34b95a331b580053f77))
* **HelpButtonInline:** use design tokens ([#7696](https://github.com/dnbexperience/eufemia/issues/7696)) ([053345b](https://github.com/dnbexperience/eufemia/commit/053345b6ea5b6824a7bf32dc0cd6ebf826fdaf4a))
* **Hr:** use design tokens ([#7587](https://github.com/dnbexperience/eufemia/issues/7587)) ([1447c30](https://github.com/dnbexperience/eufemia/commit/1447c3035ac36737e1456304ae3469acf5d3fd25))
* **InfoCard:** use design tokens ([#7593](https://github.com/dnbexperience/eufemia/issues/7593)) ([3233ad6](https://github.com/dnbexperience/eufemia/commit/3233ad6b7431dfd3848244091c0a7306c707900a))
* replace React.FC type aliases with explicit function types ([#7665](https://github.com/dnbexperience/eufemia/issues/7665)) ([c163fc0](https://github.com/dnbexperience/eufemia/commit/c163fc028f782abafc699bb86d54dae65eef4bf6))
* **Scrollbar:** use design tokens ([#7699](https://github.com/dnbexperience/eufemia/issues/7699)) ([4b59d22](https://github.com/dnbexperience/eufemia/commit/4b59d22d4afb4acee7f7e269001c03ba264dd5e3))
* **Skeleton:** use design tokens ([#7701](https://github.com/dnbexperience/eufemia/issues/7701)) ([ff99369](https://github.com/dnbexperience/eufemia/commit/ff99369d0b07b2792c9f9156a6269113e717224a))
* **Slider:** use design tokens ([#7738](https://github.com/dnbexperience/eufemia/issues/7738)) ([8b4a3df](https://github.com/dnbexperience/eufemia/commit/8b4a3dfc07cdd869b84358085a4bbe25fe4e0df1)), closes [#7599](https://github.com/dnbexperience/eufemia/issues/7599)
* standardize icon import aliases to PascalCase ([#7666](https://github.com/dnbexperience/eufemia/issues/7666)) ([6d09ca1](https://github.com/dnbexperience/eufemia/commit/6d09ca1f7fbd64b6279d0b8a466dbcf86b98032a))
* **Table:** use design tokens ([#7687](https://github.com/dnbexperience/eufemia/issues/7687)) ([12b6bed](https://github.com/dnbexperience/eufemia/commit/12b6bed9603ce3c269bf3d385137dc205ebe9106))
* **Tabs:** use design tokens ([#7740](https://github.com/dnbexperience/eufemia/issues/7740)) ([ae32c52](https://github.com/dnbexperience/eufemia/commit/ae32c5206f319d5b676a397850dbc4e4ac85ac7e))
* **Tag:** use design tokens ([#7644](https://github.com/dnbexperience/eufemia/issues/7644)) ([e88f179](https://github.com/dnbexperience/eufemia/commit/e88f17999f62663f23b95935e608cf35820614e2))
* **Value.Block:** use design tokens ([#7589](https://github.com/dnbexperience/eufemia/issues/7589)) ([4e9baa9](https://github.com/dnbexperience/eufemia/commit/4e9baa9905be60a2ddd2fc61736d9e777fce8b88))

## [11.0.0](https://github.com/dnbexperience/eufemia/compare/v10.104.1...v11.0.0) (2026-04-21)


### ⚠ BREAKING CHANGES

* **Space:** enhace with responsive margin support (replace createSpacingClasses with applySpacing) (#7557)
* **NumberFormat:** use detectCountryCode for E.164 phone formatting (#7504)
* **NumberFormat:** split into sub components including `format` utility (#7542)
* **Theme:** remove `propMapping` (#7507)
* **PaymentCard:** PaymentCard types (DNB, Visa, Mastercard, CardType,
BankAxept, Saga, PB, ProductType, BankAxeptType) are now plain
TypeScript discriminated unions with a `tag` property instead of daggy
tagged sums.

- Removed `.cata()` method — use `switch (value.tag)` instead
- Removed `@@tag` property — use `.tag` instead
- Removed `.is()` method — use `.tag` comparison instead
- Removed `.toString()` — use `.tag` for the variant name
- Reference equality no longer works for unit variants — use `.tag`
comparison
- Removed ~180 lines of daggy runtime implementation
* **PhoneNumber:** E.164 default output, auto-detect country codes (#7419)
* **Dropdown:** remove actionMenu and moreMenu in favor of the Menu component (#7421)
* **FormLabel:** default to vertical direction (#7384)
* **ui-theme-fonts:** remove fonts only package (#7397)
* **ui-theme-tags:** remove tags only styles support (#7395)
* **Components:** default labelDirection to vertical `labelDirection="vertical"` (#7349)
* _innerRef is removed from InputProps and
InputMaskedProps. Use the standard ref prop instead.
* **Stat:** Stat.Amount has been removed. Use Stat.Number instead.
Stat.Currency and Stat.Percent are not affected.
* **Stat:** Stat.Info and Stat.Label no longer accept
variant="default". Use variant="plain" instead.
* **Section:** remove deprecated color variants (#7273)
* **Anchor:** remove deprecated --contrast CSS modifier (#7272)
* **InputMasked, Textarea:** remove React.forwardRef (React 19) (#7261)
* **Section:** remove deprecated inner_ref prop (#7260)
* **Section:** remove `spacing` property (#6594)
* The string value `'info'` used as a state, variant, or
status value across components has been renamed to `'information'`.
Affected props include:

- **FormStatus:** `state="info"` → `state="information"`
- **GlobalStatus:** `state="info"` → `state="information"`
- **Section:** `variant="info"` → `variant="information"`
- **StepIndicator:** `statusState="info"` → `statusState="information"`
- **Dialog:** `confirmType="info"` → `confirmType="information"`
- **Slider:** `statusState="info"` → `statusState="information"`
- **Forms FieldBlock/FieldState:** `'info'` → `'information'`

There is **no backward compatibility mapping** — passing `'info'` as a
state/variant value will silently produce an unmatched CSS class with no
styling. This is a clean break for v11, consistent with the `warn` →
* **DatePicker, Expiry:** refactor input to work without text cursor (#7028)
* **Button:** Button variant="signal" has been removed. Use
variant="primary" or variant="secondary" instead.
* prefix all bare Props type exports with component name (#7200)
* **helpers:** remove unused combineDetails function (#7196)
* **Section:** remove deprecated inner_ref prop (#7191)
* **Section, Tabs, Drawer.Body, Dialog.Body, Breadcrumb:** remove `style_type`/`styleType` property (#5619)
* **Tabs, Accordion:** rename prerender prop to keepInDOM (#7182)
* **Breadcrumb:** The `isCollapsed` prop on Breadcrumb has been renamed
to `collapsed` to align with the bare-name convention used by all other
components (open, expanded, disabled, etc.).

The `onToggle` callback parameter is unchanged (still receives a
boolean).
* **H:** The 'as' prop on the H heading element has been
removed.
Use the 'element' prop instead: <H element="h2"> instead of <H as="h2">.
* **Input, Textarea:** The `inputClass` prop on Input and InputMasked has been
renamed to `inputClassName` to align with the naming convention used in
Forms fields.
* **H:** rename 'as' prop to 'element' for consistency with other components (#7163)
* **Input:** Input clear prop renamed to showClearButton.
* **Autocomplete:** remove inputIcon prop, use icon instead (#7062)
* **Upload:** rename fileListAriaLabel to listAriaLabel (#7061)
* **Tooltip:** remove forceOpen prop, unify with open (#7060)
* **Table:** Table accordionChevronPlacement values changed. Replace
'start' with 'left' and 'end' with 'right'.
* replace untyped event handlers with proper TypeScript signatures (#7045)
* **Theme:** rename `Theme.Provider` to `Theme.Context` as well as `darkBackground` to `surface="dark"` (#7030)
* add component prefix to non-prefixed exported types (#7036)
* Several exported types with plural `Types` suffix have
been renamed to singular form. Update imports if you reference these
types directly.
* Several exported types with redundant words in their
names have been renamed. Update imports if you reference these directly.
* **InputMasked:** replace masking with new Maskito dependency (#6658)
* Exported context value types have been renamed to use a
consistent ...ContextValue suffix. Update imports if you reference these
types directly.
* standardize TS naming and convert `interface` to `type` (#6778)
* rename SCSS mixins to camelCase (#7021)
* **InputMasked:** remove `MultiInputMask` as a public component (#7017)
* **Flex:** replace `size` with `span`  (#6974)
* **Tooltip:** replace `position` with `placement` to match Popover API (#6975)
* **Card:** remove `Card.Provider` and `Form.Card.Provider` (#6940)
* **Forms:** remove default `outset` from Form.Card, Wizard, and inline help; remove heading auto-indent (#6929)
* **Card:** adjust outline thickness and border radius to new design (#6897)
* **Sass:** migrate from `@import` to `@use` (#6816)
* All components that previously accepted an `innerRef`
prop
now use the standard React `ref` prop instead.

- Migrate ~20 function components from innerRef to ref
- Add function wrappers for class components (Button, Input, Textarea,
  Radio, Dropdown) that convert ref → _innerRef internally
- Update .d.ts declarations from ComponentClass to function signatures
  so TypeScript treats ref as a regular prop
- Fix focus/ref bugs in Autocomplete, DatePicker, Modal, Popover,
Dropdown
- Fix Field.String/Number displayValue to use getElementById
- Update all consumer JSX, docs, test, and story files
- Add innerRef → ref migration guide to v11 docs
- Update inline snapshots and test assertions
* remove `IS_EDGE`/`isEdge` detection (#6760)
* remove `isTrue` helper function (#6757)
* add support for React v19 (#6201)
* remove `convertStatusToStateOnly` helper (#6759)
* remove `insertElementBeforeSelection` helper (#6756)
* remove `matchAll` polyfill (#6758)
* remove `toCamelCase` & `toSnakeCase` (#6745)
* **Textarea:** replace `autoresize` with `autoResize` and `autoresizeMaxRows` with `autoResizeMaxRows` (#6737)
* **GlobalStatus:** replace `autoclose` with `autoClose` and `autoscroll` with `autoScroll` (#6736)
* **ToggleButton:** remove deprecated `onStateUpdate` and `attributes` props (#6720)
* **Textarea:** remove deprecated `onStateUpdate` and `textareaAttributes` props (#6719)
* **Autocomplete, Input, NumberFormat, InputMasked, Field.*:** replace `selectall` with `selectAll` (#6704)
* **DrawerList:** remove deprecated `onStateUpdate` prop (#6721)
* **Radio:** remove deprecated `onStateUpdate` and `attributes` props (#6722)
* **InputMasked:** remove deprecated `onStateUpdate` prop (#6724)
* **Input:** remove deprecated `onStateUpdate` prop (#6725)
* **Checkbox:** remove deprecated `attributes` prop (#6727)
* **Accordion:** remove deprecated `onStateUpdate` and `attributes` props (#6729)
* **Switch:** remove deprecated `onStateUpdate` prop (#6717)
* **Dropdown:** remove deprecated `onStateUpdate` prop (#6726)
* **Autocomplete:** remove deprecated `onStateUpdate` prop (#6728)
* **FormStatus:** rename `variant="flat"` to `variant="plain"` (#6665)
* **Tooltip:** rename `size="basis"` to `size="default"` (#6663)
* **Field.Selection:** remove `variant="radio-list"` (#6661)
* **Upload:** rename `variant="normal"` to `variant="default"` (#6664)
* **ProgressIndicator:** replace `visible` with `show` (#6648)
* **Tooltip:** replace `active` with `open`, and `forceActive` with `forceOpen` (#6645)
* **Themes:** Files in `style/themes/theme-ui` have been moved to the
`style/themes/ui` folder so we no longer have two different paths for
theme imports.

How to update:
- Rename all imports from `@dnb/eufemia/style/themes/theme-ui/...` to
`@dnb/eufemia/style/themes/ui/...`. (Replacing `ui` with the name of the
theme for other themes.)
- If using the `gatsby-plugin-eufemia-theme-handler`: update to the
newest version
* **Modal:** remove `rootId` property (#6598)
* **Provider:** remove `filterSubmitData` (#6578)
* **DatePicker:** remove support for YYYY-MM-DD as the `dateFormat` or `returnFormat` (#6519)
* **Autocomplete, Dropdown, DrawerList:** replace `trianglePosition` with `arrowPosition` (#6508)
* replace `warning` with `warn` for `state` and `statusState` properties (#6522)
* **Autocomplete, Dropdown:** replace `alignAutocomplete` and `alignDropdown` with `align` (#6502)
* standardize `open` property across components (#6358)
* **Table:** rename event `onOpened` -> `onOpen` (#6368)
* **DatePicker:** change `onShow` to `onOpen`, and `onHide` to `onClose` (#6364)
* **Table:** rename event `onClosed` -> `onClose` (#6367)
* **HelpButtonInline:** remove `focusWhenOpen` (#6359)
* **Field.Date:** remove `onType` event properties `start_date`, `end_date `, `is_valid ` (#6353)
* **DrawerList:** remove `prepared_data` (#6355)
* **ModalHeaderBar, Dialog.Navigation, Drawer.Navigation:** remove `shadow_class` (#6352)
* **Modal.Header, Dialog.Header, Drawer.Header:** remove `title_class` (#6350)
* remove support for IE and Edge (EdgeHTML) (#6340)
* **reset.scss:** remove support for IE and Edge (EdgeHTML) (#6339)
* **Logo:** fix brand svg import color (#6042)
* **Dropdown, Autocomplete, DrawerList:** remove events (#5788)
* **Input, InputMasked:** remove snake_case events (#5931)
* **Button:** remove `on_click` event (#5932)
* **GlobalStatus:** remove `on_adjust`, `on_open`, `on_show`, `on_hide` & `on_close` (#5930)
* **Textarea:** remove `on_change`, `on_blur`, `on_focus` & `on_key_down` (#5929)
* **Pagination:** remove `on_change`, `on_startup`, `on_load` & `on_end` events (#5926)
* **ToggleButton:** remove `on_change` & `on_state_update` (#5928)
* **Radio:** remove `on_change` & `on_state_update` (#5927)
* **StepIndicator:** remove `on_change` & `on_click` event (#5924)
* **Field.PhoneNumber:** replace `label` translation with `numberLabel` (#5910)
* **Pagination:** remove `loadButtonText` property (#5908)
* **FormRow, FormSet:** remove FormRow & FormSet (#5616)
* **Logo:** ⚠️ Sbanken logo has been removed. You need to import it manually if
needed.
* **DatePicker:** remove `shortcuts`’s `close_on_select` property (#5887)
* **PaymentCard:** replace  `cardStatus`'s `snake_case` values with `camelCase` (#5870)
* **Timeline:** replace `snake_case` translations with `camelCase` (#5869)
* **PaymentCard:** replace `snake_case` translations with `camelCase` (#5865)
* **HelpButton:** replace `snake_case` translations with `camelCase` (#5866)
* **CopyOnClick:** replace `snake_case` translations with `camelCase` (#5867)
* **NumberFormat:** replace `snake_case` translations with `camelCase` (#5868)
* **Paragraph:** remove `medium`, `bold`, `modifier` (#5715)
* **Space:** remove `on_collapse` property (#5852)
* **PaymentCard:** replace `snake_case` properties with `camelCase` (#5851)
* **GlobalStatus:** remove `remove-on-unmount` property (#5848)
* **Forms:** Ajv no longer shipped by default. Read more about it in the migration
guide.
* **PrimaryComponent:** replace `snake_case` properties with `camelCase` (#5846)
* **Skeleton:** replace `snake_case` properties with `camelCase` (#5842)
* **Button, Input, InputMasked:** replace `snake_case` properties with `camelCase` (#5841)
* **DatePicker:** replace `snake_case` properties with `camelCase` (#5836)
* **Modal:** replace `snake_case` properties with `camelCase` (#5839)
* **StepIndicator:** replace `snake_case` properties with `camelCase` (#5837)
* **Autocomplete, DrawerList:** replace `snake_case` properties with `camelCase` (#5834)
* **Dropdown:** replace `snake_case` properties with `camelCase` (#5835)
* **Dropdown, Autocomplete, Input, InputMasked, MultiInputMasked:** remove `label_direction` property (#5776)
* **NumberFormat:** replace `snake_case` properties with `camelCase` (#5821)
* **Radio:** replace `snake_case` properties with `camelCase` (#5820)
* **ToggleButton:** replace `snake_case` properties with `camelCase` (#5819)
* **Heading:** replace `snake_case` properties with `camelCase` (#5815)
* **Pagination:** replace `snake_case` properties with `camelCase` (#5814)
* **GlobalStatus:** replace `snake_case` properties with `camelCase` (#5810)
* **Textarea:** replace `snake_case` properties with `camelCase` (#5811)
* **FormStatus:** remove `no_animation`, `icon_size`, `text_id`, `width_selector`, `width_element` (#5809)
* **Accordion:** remove `no_animation` property  (#5806)
* **Accordion.Group:** remove `allow_close_all` & `expanded_id` properties (#5805)
* **Accordion:** remove `prevent_rerender` property (#5798)
* **Accordion:** remove `on_change` event (#5804)
* **Accordion:** remove `icon_position` property (#5802)
* **Accordion:** remove `prevent_rerender_conditional` property (#5797)
* **Accordion:** remove `remember_state` property (#5796)
* **Accordion:** remove `on_state_update` event (#5803)
* **Accordion:** remove `expanded_ssr` property (#5799)
* **Accordion:** remove `heading_level` property (#5800)
* **Accordion:** remove `icon_size` property (#5801)
* **Accordion:** remove `single_container` property (#5795)
* **Accordion:** remove `left_component` property (#5794)
* **Accordion:** remove `flush_remembered_state` property (#5793)
* **DatePicker:** remove `correctInvalidDate` property (#5660)
* **Dropdown, Autocomplete, DrawerList:** remove `no_animation` property (#5785)
* **Dropdown, Autocomplete, DrawerList:** remove `selected_value`, `suffix_value`, `search_content`, `class_name` (#5786)
* **Form.Iterate:** remove `pathValue` & `whenValue` properties (#5751)
* **Breadcrumb:** remove passing down props to span (#5747)
* **Forms:** remove `prepareFormRowContext` (#5792)
* **Forms:** remove `includeValidProps` (#5748)
* **Anchor:** remove `inner_ref property` (#5745)
* **Dropdown, Autocomplete, DrawerList:** remove `ignore_events` property (#5775)
* **Dropdown, Autocomplete, DrawerList:** remove `skip_keysearch` property (#5773)
* **Dropdown, Autocomplete, DrawerList:** remove `triangle_position` property (#5772)
* **Dropdown, Autocomplete, DrawerList:** remove `options_render` property (#5771)
* **Dropdown, Autocomplete, DrawerList:** remove `wrapper_element` property (#5770)
* **Dropdown, Autocomplete, DrawerList:** remove `cache_hash` property (#5769)
* **Dropdown, Autocomplete, DrawerList:** remove `observer_element` property (#5768)
* **Dropdown, Autocomplete, DrawerList:** remove `max_height` property (#5767)
* **Dropdown, Autocomplete, DrawerList:** remove `min_height` property (#5766)
* **Dropdown, Autocomplete, DrawerList:** remove `skip_portal` property (#5765)
* **Dropdown, Autocomplete, DrawerList:** remove `no_scroll_animation`property (#5764)
* **Dropdown, Autocomplete, DrawerList:** remove `portal_class` property (#5763)
* **Dropdown, Autocomplete, DrawerList:** remove `list_class` property (#5762)
* **Dropdown, Autocomplete, DrawerList:** remove `align_drawer` property (#5761)
* **Dropdown, Autocomplete, DrawerList:** remove `enable_body_lock` property (#5760)
* **Dropdown, Autocomplete, DrawerList:** remove `fixed_postion` property (#5759)
* **Dropdown, Autocomplete, DrawerList:** remove `independent_width` property (#5758)
* **Dropdown, Autocomplete, DrawerList:** remove `prevent_close` property (#5757)
* **Dropdown, Autocomplete, DrawerList:** remove `prevent_selection` property (#5756)
* **Dropdown, Autocomplete, DrawerList:** remove `default_value` property (#5755)
* **Iterate.ArrayRemoveElementButton:** remove component (#5750)
* **Iterate.ArrayPushButton:** remove component (#5749)
* **Tabs:** remove `focus_key` property (#5741)
* **Tabs:** remove `on_focus` property (#5740)
* **Tabs:** remove `on_click` property (#5737)
* **Tabs:** remove `on_change` property (#5736)
* **Tabs:** remove `prevent_rerender` property (#5735)
* **Tabs:** remove `no_border` property (#5734)
* **Tabs:** remove `nav_button_edge` property (#5733)
* **Tabs:** remove `tabs_style` property (#5731)
* **Tabs:** remove `tab_element` property (#5730)
* **InputPassword:** component is removed (#5718)
* **Tabs:** remove `content_spacing` property (#5728)
* **Tabs:** remove `content_style` property (#5729)
* **Tabs:** rewrite `selected_key` property (#5726)
* **Accordion:** remove `expandBehaviour` property (#5719)
* **DrawerList:** remove `selected_key` property (#5708)
* **ProgressIndicator:** remove `indicator_label` property (#5705)
* **Field.Password:** remove `on_show_password`, `on_hide_password`, `show_password`, `hide_password` (#5714)
* **Forms:** remove StepsLayout (#5721)
* **Autocomplete:** remove `selected_key` property (#5706)
* **Dropdown:** remove `selected_key` property (#5707)
* **Form.Visibility:** remove `withValue` property (#5633)
* **Section:** remove `inner_ref` property (#5623)
* **FormLabel:** remove `for_id` property (#5625)
* **FormLabel:** remove `label_direction` property (#5627)
* **FormLabel:** remove `sr_only` property (#5626)
* **Tag:** remove `onDelete` event (#5617)
* **PaymentCard:** remove `text_card_number` translation (#5629)
* **Dl:** remove `direction` property (#5628)
* **NumberFormat:** remove `omit_rounding` property (#5634)
* **ProgressIndicator:** remove `label_direction` property (#5637)
* **Hr:** remove `light` property (#5632)
* **Hr:** remove `medium` property (#5630)
* **Hr:** remove `fullscreen` property (#5631)
* **Anchor:** remove `scrollToHashHandler` function (#5635)
* **Pagination:** remove `place_maker_before_content` property (#5659)
* **ProgressIndicator:** remove `show_label` property (#5638)
* **ProgressIndicator:** remove `no_animation` property (#5636)
* **ProgressIndicator:** remove `on_complete` event (#5639)
* **ProgressIndicator:** remove `children` property (#5640)
* **Checkbox:** remove `status_no_animation` property (#5642)
* **Checkbox:** remove `children` property (#5644)
* **Checkbox:** remove `status_state` property (#5646)
* **Checkbox:** remove `label_position` property (#5648)
* **Checkbox:** remove `on_change` event (#5643)
* **Checkbox:** remove `status_props` property (#5645)
* **Checkbox:** remove `label_sr_only` property (#5647)
* **Switch:** remove `label_position` property (#5650)
* **Switch:** remove `status_no_animation` property (#5651)
* **Switch:** remove `label_sr_only` property (#5657)
* **Switch:** remove `on_change` event (#5656)
* **Switch:** remove `status_props` property (#5655)
* **Switch:** remove `status_state` property (#5654)
* **Switch:** remove `on_change_end` event (#5653)
* **Switch:** remove `on_state_update` event (#5652)
* **StepIndicator:** remove `StepIndicatorRenderCallback` type (#5700)
* **Wizard.Step:** remove `activeWhen` property (#5670)
* **StepIndicator:** remove `step_title_extended` property (#5698)
* **Forms:** remove `continuousValidation` property from all Field.* (#5676)
* **DrawerList:** remove `DrawerListDataObjectUnion` type (#5693)
* **StepIndicator:** remove `on_item_render` property (#5696)
* **StepIndicator:** remove `on_render` property (#5697)
* **StepIndicator:** remove `sidebar_id` property (#5699)
* **Flex:** remove `spacing` property (#5690)
* **Wizard.Step:** remove `active` property (#5669)
* **Iterate.PushContainer:** remove `requireCommit` property (#5674)
* **Field.PostalCodeAndCity:** remove `country` property (#5675)
* **GlobalError:** remove `status` and `code` property (#5664)
* **Wizard.Container:** remove `scrollTopOnStepChange` property (#5673)
* **Wizard.Container:** remove `variant` property (#5671)
* **Modal, Dialog, Drawer:** remove `class` property (#5663)
* **Table:** remove `accordion` property (#5661)
* **StepIndicator.Sidebar:** remove component (#5668)
* **Forms:** remove `Form.useError` hook (#5683)
* **Form.ButtonRow:** remove styling as we have outset (#5688)
* **Flex:** remove value true from `rowGap` (#5689)
* **Forms:** remove `Form.useErrorMessage` hook (#5691)
* **Logo:** remove `size`, `ratio`, `alt`, `inherit_color` (#5701)
* **Field.*:** remove `validator` property (#5686)
* **FormError:** remove `validationRule` (#5685)
* **Iterate:** remove `{itemNr}` (#5684)
* **Forms:** remove `Form.FieldProps` (#5682)
* **Forms:** remove `Form.useLocale` hook (#5681)
* **Button:** remove `class` property (#5680)
* **Icon:** remove `inherit_color` property (#5679)
* **Logo:** remove `inherit_color` property (#5678)
* **Form.Visibility:** remove `continuousValidation` property (#5677)

### :sparkles: Features

* add support for React v19 ([#6201](https://github.com/dnbexperience/eufemia/issues/6201)) ([4c66389](https://github.com/dnbexperience/eufemia/commit/4c66389046b62f78eed0545147dcf56e16ed9458))
* apply consistent AllProps pattern to Badge, Avatar, AvatarGroup, Breadcrumb, TermDefinition ([#7033](https://github.com/dnbexperience/eufemia/issues/7033)) ([7fe6e64](https://github.com/dnbexperience/eufemia/commit/7fe6e647d8385e7f73d2372be9118d0d7cd77757))
* **Autocomplete:** add onItemMouseEnter event for dropdown items ([#7249](https://github.com/dnbexperience/eufemia/issues/7249)) ([e15b932](https://github.com/dnbexperience/eufemia/commit/e15b932f385ede37628b4510d383166ff679dca1))
* **Autocomplete:** add onSubmit event for Enter key without selection ([#7248](https://github.com/dnbexperience/eufemia/issues/7248)) ([7c976ae](https://github.com/dnbexperience/eufemia/commit/7c976ae58b549f27c1feea6785aaccc4e64c45c0))
* **Card:** adjust outline thickness and border radius to new design ([#6897](https://github.com/dnbexperience/eufemia/issues/6897)) ([4373225](https://github.com/dnbexperience/eufemia/commit/4373225fa54b57f1fab99d04d0b80adcd18e7fa8))
* **DatePicker, Expiry:** refactor input to work without text cursor ([#7028](https://github.com/dnbexperience/eufemia/issues/7028)) ([ffdccc8](https://github.com/dnbexperience/eufemia/commit/ffdccc8f029b55b8b9fe27e82adbdaecd6e13275)), closes [#6658](https://github.com/dnbexperience/eufemia/issues/6658)
* **DrawerList:** improve typing ([#6679](https://github.com/dnbexperience/eufemia/issues/6679)) ([8e576b6](https://github.com/dnbexperience/eufemia/commit/8e576b661be17f5e77f416cf441030c6266277e3))
* **Forms:** add id prop support to Form.SubmitIndicator ([#7235](https://github.com/dnbexperience/eufemia/issues/7235)) ([255779f](https://github.com/dnbexperience/eufemia/commit/255779f0cad720926c1a43636af177ab602091df))
* **Forms:** add id prop support to Form.Visibility ([#7228](https://github.com/dnbexperience/eufemia/issues/7228)) ([f1f0c0f](https://github.com/dnbexperience/eufemia/commit/f1f0c0ff0c92618291d9012cfa5af6552924512e))
* **Forms:** add id prop support to Iterate.Array ([#7234](https://github.com/dnbexperience/eufemia/issues/7234)) ([5ab6315](https://github.com/dnbexperience/eufemia/commit/5ab6315bceab1aed19a6efffea5b2485ec540bf5))
* **Forms:** add support for Swedish bank account numbers and IBAN in BankAccountNumber ([#7246](https://github.com/dnbexperience/eufemia/issues/7246)) ([d0c3036](https://github.com/dnbexperience/eufemia/commit/d0c303652f847c4b8f0e683f503af13aa54fe349))
* **Forms:** remove default `outset` from Form.Card, Wizard, and inline help; remove heading auto-indent ([#6929](https://github.com/dnbexperience/eufemia/issues/6929)) ([5c1ef39](https://github.com/dnbexperience/eufemia/commit/5c1ef397ad8dfa3ab145b70cbd934dc98c66c1b6))
* **Forms:** remove included Ajv instance creation from Form.Handler and fields ([#5618](https://github.com/dnbexperience/eufemia/issues/5618)) ([e393bbe](https://github.com/dnbexperience/eufemia/commit/e393bbe498138234a7d805d396244453ea3ddad8))
* **Forms:** support native form submit in `Form.Handler` ([#6987](https://github.com/dnbexperience/eufemia/issues/6987)) ([746d3d1](https://github.com/dnbexperience/eufemia/commit/746d3d1a42735af0db135ffef289f69079ad75ae))
* generate `tokens-tailwind.css` for design tokens ([#7225](https://github.com/dnbexperience/eufemia/issues/7225)) ([e3d0767](https://github.com/dnbexperience/eufemia/commit/e3d07671e2812b76724dc4ae9b0830a6f9ef52ca))
* **InputMasked:** replace masking with new Maskito dependency ([#6658](https://github.com/dnbexperience/eufemia/issues/6658)) ([9ff04cb](https://github.com/dnbexperience/eufemia/commit/9ff04cb13d843408476f151a1cadcddfd431c13a))
* **List:** add `List.ShowMoreButton` to toggle items visibility ([#7513](https://github.com/dnbexperience/eufemia/issues/7513)) ([d0854ad](https://github.com/dnbexperience/eufemia/commit/d0854ad413013e9ef42c163a258d947ececdfa37))
* **Logo:** remove `brand` and `variant` and make Sbanken opt-in ([#5882](https://github.com/dnbexperience/eufemia/issues/5882)) ([25202ed](https://github.com/dnbexperience/eufemia/commit/25202edfab29168054bce0a8d6cf5ccc5d1b7398))
* **Menu:** add new context menu component ([#7380](https://github.com/dnbexperience/eufemia/issues/7380)) ([0683e61](https://github.com/dnbexperience/eufemia/commit/0683e61820c302b245adab6834494a41f2009d69)), closes [#6372](https://github.com/dnbexperience/eufemia/issues/6372) [#7378](https://github.com/dnbexperience/eufemia/issues/7378)
* **PhoneNumber:** E.164 default output, auto-detect country codes ([#7419](https://github.com/dnbexperience/eufemia/issues/7419)) ([89cd42f](https://github.com/dnbexperience/eufemia/commit/89cd42ff95c31a6ff6a87042084e68baf7eddf78))
* **Sass:** migrate from `[@import](https://github.com/import)` to `[@use](https://github.com/use)` ([#6816](https://github.com/dnbexperience/eufemia/issues/6816)) ([edf521b](https://github.com/dnbexperience/eufemia/commit/edf521b5f329d853c24040f3afa9b5aebbf6b7c8))
* **Section:** add surface prop and provide it via Theme provider ([#7424](https://github.com/dnbexperience/eufemia/issues/7424)) ([17be9c4](https://github.com/dnbexperience/eufemia/commit/17be9c4fe138967f135881e6cfcde7cf047784d3))


### break

* **Accordion.Group:** remove `allow_close_all` & `expanded_id` properties ([#5805](https://github.com/dnbexperience/eufemia/issues/5805)) ([9eeb35a](https://github.com/dnbexperience/eufemia/commit/9eeb35a48cbb061a1dcf006d318b7feab29c48ba))
* **Accordion:** remove `expandBehaviour` property ([#5719](https://github.com/dnbexperience/eufemia/issues/5719)) ([9c8032c](https://github.com/dnbexperience/eufemia/commit/9c8032c9842a80dc962e2f31215083d81bdf3d25))
* **Accordion:** remove `expanded_ssr` property ([#5799](https://github.com/dnbexperience/eufemia/issues/5799)) ([16a0ead](https://github.com/dnbexperience/eufemia/commit/16a0ead497f9f6e67cc6c254ebc3456a57854010))
* **Accordion:** remove `flush_remembered_state` property ([#5793](https://github.com/dnbexperience/eufemia/issues/5793)) ([00e954e](https://github.com/dnbexperience/eufemia/commit/00e954e292c4cf25e86a572f9450c94e209260c6))
* **Accordion:** remove `heading_level` property ([#5800](https://github.com/dnbexperience/eufemia/issues/5800)) ([ef64682](https://github.com/dnbexperience/eufemia/commit/ef6468257eaece488b99da260530bfa5b6ccfa65))
* **Accordion:** remove `icon_position` property ([#5802](https://github.com/dnbexperience/eufemia/issues/5802)) ([4913afe](https://github.com/dnbexperience/eufemia/commit/4913afe7afa8cf8a1227e19058bac19b2d956313))
* **Accordion:** remove `icon_size` property ([#5801](https://github.com/dnbexperience/eufemia/issues/5801)) ([a6c7894](https://github.com/dnbexperience/eufemia/commit/a6c789428b2c28c5eb5f3ecde711db6bf10bbab5))
* **Accordion:** remove `left_component` property ([#5794](https://github.com/dnbexperience/eufemia/issues/5794)) ([64251b8](https://github.com/dnbexperience/eufemia/commit/64251b8babd78d99f9d836470e4c25cb35a39eab))
* **Accordion:** remove `no_animation` property  ([#5806](https://github.com/dnbexperience/eufemia/issues/5806)) ([576415b](https://github.com/dnbexperience/eufemia/commit/576415b5234b36e3090fac8fb26bfbb29a723727))
* **Accordion:** remove `on_change` event ([#5804](https://github.com/dnbexperience/eufemia/issues/5804)) ([912369b](https://github.com/dnbexperience/eufemia/commit/912369b56b3637a48aaf060689ec41fe9ef7ad95))
* **Accordion:** remove `on_state_update` event ([#5803](https://github.com/dnbexperience/eufemia/issues/5803)) ([00c388c](https://github.com/dnbexperience/eufemia/commit/00c388cee94736cf8545cad16a0ac927b494f131))
* **Accordion:** remove `prevent_rerender_conditional` property ([#5797](https://github.com/dnbexperience/eufemia/issues/5797)) ([2af5993](https://github.com/dnbexperience/eufemia/commit/2af5993c7b763fc394dbc7b41e55782167e6a738))
* **Accordion:** remove `prevent_rerender` property ([#5798](https://github.com/dnbexperience/eufemia/issues/5798)) ([35d720e](https://github.com/dnbexperience/eufemia/commit/35d720edf876d7e24936eded3e971ea8c630ef76))
* **Accordion:** remove `remember_state` property ([#5796](https://github.com/dnbexperience/eufemia/issues/5796)) ([9e413d5](https://github.com/dnbexperience/eufemia/commit/9e413d5da421bd7c2ad3db651920e2c1ff0149d4))
* **Accordion:** remove `single_container` property ([#5795](https://github.com/dnbexperience/eufemia/issues/5795)) ([7cc1411](https://github.com/dnbexperience/eufemia/commit/7cc141198dc9d260030d700280328fc223a2e1f7))
* **Accordion:** remove deprecated `onStateUpdate` and `attributes` props ([#6729](https://github.com/dnbexperience/eufemia/issues/6729)) ([a2664fd](https://github.com/dnbexperience/eufemia/commit/a2664fde5da80b1ce07452c94e2a6e2cc053c557))
* add component prefix to non-prefixed exported types ([#7036](https://github.com/dnbexperience/eufemia/issues/7036)) ([ee5430c](https://github.com/dnbexperience/eufemia/commit/ee5430c5902b685713a48dc917d840808a1be6d9))
* **Anchor:** remove `inner_ref property` ([#5745](https://github.com/dnbexperience/eufemia/issues/5745)) ([6d3b490](https://github.com/dnbexperience/eufemia/commit/6d3b490f98fa83d6bd2f69110db5221b2df51eae))
* **Anchor:** remove `scrollToHashHandler` function ([#5635](https://github.com/dnbexperience/eufemia/issues/5635)) ([fbe2f9a](https://github.com/dnbexperience/eufemia/commit/fbe2f9a84f86c5f01775dcfbe25af66d3e8e71cb))
* **Anchor:** remove deprecated --contrast CSS modifier ([#7272](https://github.com/dnbexperience/eufemia/issues/7272)) ([9f78a7a](https://github.com/dnbexperience/eufemia/commit/9f78a7a910bb415e09ef3a98f46fa55b1a8149eb))
* **Autocomplete, DrawerList:** replace `snake_case` properties with `camelCase` ([#5834](https://github.com/dnbexperience/eufemia/issues/5834)) ([9f1333a](https://github.com/dnbexperience/eufemia/commit/9f1333a597671f0a9dfbb69300ac0e64fb2aa1f5))
* **Autocomplete, Dropdown, DrawerList:** replace `trianglePosition` with `arrowPosition` ([#6508](https://github.com/dnbexperience/eufemia/issues/6508)) ([1630685](https://github.com/dnbexperience/eufemia/commit/163068549474b6a7089a029e39f2a52f739a56e8))
* **Autocomplete, Dropdown:** replace `alignAutocomplete` and `alignDropdown` with `align` ([#6502](https://github.com/dnbexperience/eufemia/issues/6502)) ([4abbff7](https://github.com/dnbexperience/eufemia/commit/4abbff7df5a9fa4c7229fccd350d85fa2ebe42b5))
* **Autocomplete, Input, NumberFormat, InputMasked, Field.*:** replace `selectall` with `selectAll` ([#6704](https://github.com/dnbexperience/eufemia/issues/6704)) ([72bb994](https://github.com/dnbexperience/eufemia/commit/72bb9946b5a6daf17de10c814002ed7bbe4e45dd))
* **Autocomplete:** remove `selected_key` property ([#5706](https://github.com/dnbexperience/eufemia/issues/5706)) ([2dd02fb](https://github.com/dnbexperience/eufemia/commit/2dd02fb1b40fbbdc5342196c9d36518a9044f34f))
* **Autocomplete:** remove deprecated `onStateUpdate` prop ([#6728](https://github.com/dnbexperience/eufemia/issues/6728)) ([cbfa823](https://github.com/dnbexperience/eufemia/commit/cbfa82345e431845dcc86d5f3274963b190f488e))
* **Autocomplete:** remove inputIcon prop, use icon instead ([#7062](https://github.com/dnbexperience/eufemia/issues/7062)) ([6523a4b](https://github.com/dnbexperience/eufemia/commit/6523a4b9962e18542236f637081314c538ff533e))
* **Breadcrumb:** remove passing down props to span ([#5747](https://github.com/dnbexperience/eufemia/issues/5747)) ([54bdade](https://github.com/dnbexperience/eufemia/commit/54bdadedc266ec35ff8d6f9f4a06da451768695d))
* **Breadcrumb:** rename isCollapsed prop to collapsed ([#7165](https://github.com/dnbexperience/eufemia/issues/7165)) ([ff9e876](https://github.com/dnbexperience/eufemia/commit/ff9e87624719020437fd258e965258b6735f8030))
* **Button, Input, InputMasked:** replace `snake_case` properties with `camelCase` ([#5841](https://github.com/dnbexperience/eufemia/issues/5841)) ([6fb1815](https://github.com/dnbexperience/eufemia/commit/6fb1815f2219d18a9b146b1e30db7f75e1a757b6))
* **Button:** remove `class` property ([#5680](https://github.com/dnbexperience/eufemia/issues/5680)) ([aba2705](https://github.com/dnbexperience/eufemia/commit/aba27054b1e5bf12e537b9f60e0e1cfc2c0a7ab3))
* **Button:** remove `on_click` event ([#5932](https://github.com/dnbexperience/eufemia/issues/5932)) ([8a2e39a](https://github.com/dnbexperience/eufemia/commit/8a2e39aa1ae28eca7f6953b53a22608a6eb8b970))
* **Button:** remove variant="signal" ([#7211](https://github.com/dnbexperience/eufemia/issues/7211)) ([6465d5e](https://github.com/dnbexperience/eufemia/commit/6465d5ec0af6d35e2e78e62ec587b12e40608b00))
* **Card:** remove `Card.Provider` and `Form.Card.Provider` ([#6940](https://github.com/dnbexperience/eufemia/issues/6940)) ([af6bcc4](https://github.com/dnbexperience/eufemia/commit/af6bcc411eb3a58bf6c411c4e52005731d306c97)), closes [#6929](https://github.com/dnbexperience/eufemia/issues/6929)
* **Checkbox:** remove `children` property ([#5644](https://github.com/dnbexperience/eufemia/issues/5644)) ([f447e9b](https://github.com/dnbexperience/eufemia/commit/f447e9beaaccdd9af8fcefb456f81e6a623484bd))
* **Checkbox:** remove `label_position` property ([#5648](https://github.com/dnbexperience/eufemia/issues/5648)) ([83ba2d4](https://github.com/dnbexperience/eufemia/commit/83ba2d489d1c1e35ed64d9a4ebf35691546a3c1a))
* **Checkbox:** remove `label_sr_only` property ([#5647](https://github.com/dnbexperience/eufemia/issues/5647)) ([2f4ca83](https://github.com/dnbexperience/eufemia/commit/2f4ca83b117957ad48d6bd9ee85918749336f549))
* **Checkbox:** remove `on_change` event ([#5643](https://github.com/dnbexperience/eufemia/issues/5643)) ([42c27e0](https://github.com/dnbexperience/eufemia/commit/42c27e00ed138216b245f31d2d95a13d67ca29c5))
* **Checkbox:** remove `status_no_animation` property ([#5642](https://github.com/dnbexperience/eufemia/issues/5642)) ([773b414](https://github.com/dnbexperience/eufemia/commit/773b41443fee7640729a4a6cde1990eed2b27cd6))
* **Checkbox:** remove `status_props` property ([#5645](https://github.com/dnbexperience/eufemia/issues/5645)) ([26f553a](https://github.com/dnbexperience/eufemia/commit/26f553addc1aa64405ed9ae03aefd3b0ff6962a4))
* **Checkbox:** remove `status_state` property ([#5646](https://github.com/dnbexperience/eufemia/issues/5646)) ([56fda6e](https://github.com/dnbexperience/eufemia/commit/56fda6e6290b176b2daee39b9372e594845fd068))
* **Checkbox:** remove deprecated `attributes` prop ([#6727](https://github.com/dnbexperience/eufemia/issues/6727)) ([220d3b5](https://github.com/dnbexperience/eufemia/commit/220d3b58777ec6dd4f0d64779d6944ffa1685441))
* **Components:** default labelDirection to vertical `labelDirection="vertical"` ([#7349](https://github.com/dnbexperience/eufemia/issues/7349)) ([45d76c8](https://github.com/dnbexperience/eufemia/commit/45d76c8ce9c87a809c822ad4cdd57c6b0b337801))
* **CopyOnClick:** replace `snake_case` translations with `camelCase` ([#5867](https://github.com/dnbexperience/eufemia/issues/5867)) ([91c5e0c](https://github.com/dnbexperience/eufemia/commit/91c5e0cd9da68e4764d3f21cd166397408a6aa06))
* **DatePicker:** change `onShow` to `onOpen`, and `onHide` to `onClose` ([#6364](https://github.com/dnbexperience/eufemia/issues/6364)) ([0ffb144](https://github.com/dnbexperience/eufemia/commit/0ffb1444034d593765053b9490f2909e1d154ef5))
* **DatePicker:** remove `correctInvalidDate` property ([#5660](https://github.com/dnbexperience/eufemia/issues/5660)) ([98e96f7](https://github.com/dnbexperience/eufemia/commit/98e96f728028b4c235ee80cd5ec78fa7f31f0a66))
* **DatePicker:** remove `shortcuts`’s `close_on_select` property ([#5887](https://github.com/dnbexperience/eufemia/issues/5887)) ([1d0432e](https://github.com/dnbexperience/eufemia/commit/1d0432e973f88534e47a0aa7aae999ed9236c8d0))
* **DatePicker:** remove support for YYYY-MM-DD as the `dateFormat` or `returnFormat` ([#6519](https://github.com/dnbexperience/eufemia/issues/6519)) ([b3887e2](https://github.com/dnbexperience/eufemia/commit/b3887e219c94497d59aac82e2fb55f33381cd6d0))
* **DatePicker:** replace `snake_case` properties with `camelCase` ([#5836](https://github.com/dnbexperience/eufemia/issues/5836)) ([48a33e4](https://github.com/dnbexperience/eufemia/commit/48a33e4772cd7137da61471556351691f4aece27))
* **Dl:** remove `direction` property ([#5628](https://github.com/dnbexperience/eufemia/issues/5628)) ([9d6e020](https://github.com/dnbexperience/eufemia/commit/9d6e020ececc37031a71132a0f0ba7b4c2431b67))
* **DrawerList:** remove `DrawerListDataObjectUnion` type ([#5693](https://github.com/dnbexperience/eufemia/issues/5693)) ([25361c8](https://github.com/dnbexperience/eufemia/commit/25361c8b21cd3671683d950237cb7f65fac187f1))
* **DrawerList:** remove `prepared_data` ([#6355](https://github.com/dnbexperience/eufemia/issues/6355)) ([0c4831a](https://github.com/dnbexperience/eufemia/commit/0c4831a3ca81b8965d1a446152fd8901f4ead82b))
* **DrawerList:** remove `selected_key` property ([#5708](https://github.com/dnbexperience/eufemia/issues/5708)) ([f71e262](https://github.com/dnbexperience/eufemia/commit/f71e262b59c3b0b46ffa6baebfbfbb59f7e7efc9))
* **DrawerList:** remove deprecated `onStateUpdate` prop ([#6721](https://github.com/dnbexperience/eufemia/issues/6721)) ([e9dbba2](https://github.com/dnbexperience/eufemia/commit/e9dbba21c85b7ce34ff9fd1ba85a89f563446b9c))
* **Dropdown, Autocomplete, DrawerList:** remove `align_drawer` property ([#5761](https://github.com/dnbexperience/eufemia/issues/5761)) ([056f112](https://github.com/dnbexperience/eufemia/commit/056f1129d88183046e213f68a19e5c888cdd496d))
* **Dropdown, Autocomplete, DrawerList:** remove `cache_hash` property ([#5769](https://github.com/dnbexperience/eufemia/issues/5769)) ([5c2f5b1](https://github.com/dnbexperience/eufemia/commit/5c2f5b181ae0401542879bad7d8746369f402981))
* **Dropdown, Autocomplete, DrawerList:** remove `default_value` property ([#5755](https://github.com/dnbexperience/eufemia/issues/5755)) ([4875a2e](https://github.com/dnbexperience/eufemia/commit/4875a2e3587c2e467228fec16d581b2f0b6f9e79))
* **Dropdown, Autocomplete, DrawerList:** remove `enable_body_lock` property ([#5760](https://github.com/dnbexperience/eufemia/issues/5760)) ([4bb430a](https://github.com/dnbexperience/eufemia/commit/4bb430a3d2f7fd3ade89d081ef4c8bd7a3517458))
* **Dropdown, Autocomplete, DrawerList:** remove `fixed_postion` property ([#5759](https://github.com/dnbexperience/eufemia/issues/5759)) ([c46a60f](https://github.com/dnbexperience/eufemia/commit/c46a60fb899a7aef0a33471e4cb415e284ea1b84))
* **Dropdown, Autocomplete, DrawerList:** remove `ignore_events` property ([#5775](https://github.com/dnbexperience/eufemia/issues/5775)) ([d161bec](https://github.com/dnbexperience/eufemia/commit/d161becf403cde657cc098242043885db827333f))
* **Dropdown, Autocomplete, DrawerList:** remove `independent_width` property ([#5758](https://github.com/dnbexperience/eufemia/issues/5758)) ([f9b016e](https://github.com/dnbexperience/eufemia/commit/f9b016e132e993842aec2cb2504125f5d9313644))
* **Dropdown, Autocomplete, DrawerList:** remove `list_class` property ([#5762](https://github.com/dnbexperience/eufemia/issues/5762)) ([e0a00e3](https://github.com/dnbexperience/eufemia/commit/e0a00e37fb199dccd0a48f71d8da29e65f063bfc))
* **Dropdown, Autocomplete, DrawerList:** remove `max_height` property ([#5767](https://github.com/dnbexperience/eufemia/issues/5767)) ([ad880ea](https://github.com/dnbexperience/eufemia/commit/ad880ea6c82d0c2593e541b80c9eda5e8aee683d))
* **Dropdown, Autocomplete, DrawerList:** remove `min_height` property ([#5766](https://github.com/dnbexperience/eufemia/issues/5766)) ([eab7786](https://github.com/dnbexperience/eufemia/commit/eab7786070dcb8cefafae06a3479c6e0995a3749))
* **Dropdown, Autocomplete, DrawerList:** remove `no_animation` property ([#5785](https://github.com/dnbexperience/eufemia/issues/5785)) ([cfd9a57](https://github.com/dnbexperience/eufemia/commit/cfd9a57eec67b6b56f3b4680ffef47573423953d))
* **Dropdown, Autocomplete, DrawerList:** remove `no_scroll_animation`property ([#5764](https://github.com/dnbexperience/eufemia/issues/5764)) ([8f7d1f2](https://github.com/dnbexperience/eufemia/commit/8f7d1f2ffe2987ca35bbde4178c7b41405ca8b97))
* **Dropdown, Autocomplete, DrawerList:** remove `observer_element` property ([#5768](https://github.com/dnbexperience/eufemia/issues/5768)) ([b190516](https://github.com/dnbexperience/eufemia/commit/b1905161b342b76b42d0cbf5acc36065048e4f08))
* **Dropdown, Autocomplete, DrawerList:** remove `options_render` property ([#5771](https://github.com/dnbexperience/eufemia/issues/5771)) ([f2d7710](https://github.com/dnbexperience/eufemia/commit/f2d77107e5fd51de10b4040962e01a16f79822cd))
* **Dropdown, Autocomplete, DrawerList:** remove `portal_class` property ([#5763](https://github.com/dnbexperience/eufemia/issues/5763)) ([8dcf788](https://github.com/dnbexperience/eufemia/commit/8dcf788865e829e13d8a0c314889750255ac6cff))
* **Dropdown, Autocomplete, DrawerList:** remove `prevent_close` property ([#5757](https://github.com/dnbexperience/eufemia/issues/5757)) ([0c78c54](https://github.com/dnbexperience/eufemia/commit/0c78c549061520baa2ac61f78434ab03bd374ebd))
* **Dropdown, Autocomplete, DrawerList:** remove `prevent_selection` property ([#5756](https://github.com/dnbexperience/eufemia/issues/5756)) ([f92c9b8](https://github.com/dnbexperience/eufemia/commit/f92c9b8215285138efb762336e27edfb2daf4aa2))
* **Dropdown, Autocomplete, DrawerList:** remove `selected_value`, `suffix_value`, `search_content`, `class_name` ([#5786](https://github.com/dnbexperience/eufemia/issues/5786)) ([011e2db](https://github.com/dnbexperience/eufemia/commit/011e2dbee476d742123da06e0dc71996f2ab3d0c))
* **Dropdown, Autocomplete, DrawerList:** remove `skip_keysearch` property ([#5773](https://github.com/dnbexperience/eufemia/issues/5773)) ([02eb3af](https://github.com/dnbexperience/eufemia/commit/02eb3af43aa79ffc77a97b91d7eabcc282b020da))
* **Dropdown, Autocomplete, DrawerList:** remove `skip_portal` property ([#5765](https://github.com/dnbexperience/eufemia/issues/5765)) ([e5ac02e](https://github.com/dnbexperience/eufemia/commit/e5ac02e094496f33c9e6c3365fbf7bbbb6fc1c2d))
* **Dropdown, Autocomplete, DrawerList:** remove `triangle_position` property ([#5772](https://github.com/dnbexperience/eufemia/issues/5772)) ([f8f3d9f](https://github.com/dnbexperience/eufemia/commit/f8f3d9ff201c4ae4cd1f61f36e3ea212d909e94f))
* **Dropdown, Autocomplete, DrawerList:** remove `wrapper_element` property ([#5770](https://github.com/dnbexperience/eufemia/issues/5770)) ([3fd54e2](https://github.com/dnbexperience/eufemia/commit/3fd54e296f4bd61c875baf022a67b4c9b2dfbf92))
* **Dropdown, Autocomplete, DrawerList:** remove events ([#5788](https://github.com/dnbexperience/eufemia/issues/5788)) ([dee4ee7](https://github.com/dnbexperience/eufemia/commit/dee4ee76d1a65ae27d21fa55c0b8b7089815faae))
* **Dropdown, Autocomplete, Input, InputMasked, MultiInputMasked:** remove `label_direction` property ([#5776](https://github.com/dnbexperience/eufemia/issues/5776)) ([d9ec2e5](https://github.com/dnbexperience/eufemia/commit/d9ec2e5fdaa099feb5bfe263fcf5f76acac2fc54))
* **Dropdown:** remove `selected_key` property ([#5707](https://github.com/dnbexperience/eufemia/issues/5707)) ([d6e8d67](https://github.com/dnbexperience/eufemia/commit/d6e8d673c8f8a95050f592025f807786232c9f35))
* **Dropdown:** remove actionMenu and moreMenu in favor of the Menu component ([#7421](https://github.com/dnbexperience/eufemia/issues/7421)) ([b888277](https://github.com/dnbexperience/eufemia/commit/b8882777ba7a851c03612cde2492f9f03b91cfd6)), closes [#7380](https://github.com/dnbexperience/eufemia/issues/7380)
* **Dropdown:** remove deprecated `onStateUpdate` prop ([#6726](https://github.com/dnbexperience/eufemia/issues/6726)) ([8883a4c](https://github.com/dnbexperience/eufemia/commit/8883a4c0c353e893285fe364acb6f9f1a86a5d3b))
* **Dropdown:** replace `snake_case` properties with `camelCase` ([#5835](https://github.com/dnbexperience/eufemia/issues/5835)) ([a3f0c59](https://github.com/dnbexperience/eufemia/commit/a3f0c5905a7dfca1b842816cbcf9be39a4beede8))
* **Field.*:** remove `validator` property ([#5686](https://github.com/dnbexperience/eufemia/issues/5686)) ([d72fdc4](https://github.com/dnbexperience/eufemia/commit/d72fdc4240bf5929953b94f23053806bd1e41319))
* **Field.Date:** remove `onType` event properties `start_date`, `end_date `, `is_valid ` ([#6353](https://github.com/dnbexperience/eufemia/issues/6353)) ([119fbd9](https://github.com/dnbexperience/eufemia/commit/119fbd98a8ab01e50ec8bf03f71964facd002566))
* **Field.Password:** remove `on_show_password`, `on_hide_password`, `show_password`, `hide_password` ([#5714](https://github.com/dnbexperience/eufemia/issues/5714)) ([d83777b](https://github.com/dnbexperience/eufemia/commit/d83777b6bdcbbdc47c4b154f4f101e5c45d9cf5f))
* **Field.PhoneNumber:** replace `label` translation with `numberLabel` ([#5910](https://github.com/dnbexperience/eufemia/issues/5910)) ([371eb51](https://github.com/dnbexperience/eufemia/commit/371eb510e2b0cf41865d0570aedd616d46842e59))
* **Field.PostalCodeAndCity:** remove `country` property ([#5675](https://github.com/dnbexperience/eufemia/issues/5675)) ([c18f4f8](https://github.com/dnbexperience/eufemia/commit/c18f4f8241791a77aac0691e64d67ee2d559e05f))
* **Field.Selection:** remove `variant="radio-list"` ([#6661](https://github.com/dnbexperience/eufemia/issues/6661)) ([7960897](https://github.com/dnbexperience/eufemia/commit/796089796bd1366ac1f25d9029fb7a759f80de2c))
* fix stuttering/redundant type names ([#7035](https://github.com/dnbexperience/eufemia/issues/7035)) ([31c54a9](https://github.com/dnbexperience/eufemia/commit/31c54a9ecaaac8b6b0403cdc57e7cf1fb0343538))
* **Flex:** remove `spacing` property ([#5690](https://github.com/dnbexperience/eufemia/issues/5690)) ([78e2172](https://github.com/dnbexperience/eufemia/commit/78e2172577a991b48ce912d203393140d3a726c3))
* **Flex:** remove value true from `rowGap` ([#5689](https://github.com/dnbexperience/eufemia/issues/5689)) ([7c5848c](https://github.com/dnbexperience/eufemia/commit/7c5848c0fff38c1e955a15cf63f78ca6d00ba4a8))
* **Flex:** replace `size` with `span`  ([#6974](https://github.com/dnbexperience/eufemia/issues/6974)) ([61972e0](https://github.com/dnbexperience/eufemia/commit/61972e085f8051e6329cbb5b247d5cd1caf15f2e))
* **Form.ButtonRow:** remove styling as we have outset ([#5688](https://github.com/dnbexperience/eufemia/issues/5688)) ([da29d8a](https://github.com/dnbexperience/eufemia/commit/da29d8aff57f7e0571c1e7d46608dd3d9a4cda78))
* **Form.Iterate:** remove `pathValue` & `whenValue` properties ([#5751](https://github.com/dnbexperience/eufemia/issues/5751)) ([eb7f192](https://github.com/dnbexperience/eufemia/commit/eb7f192f0f5be5afccc07b38ed6dde58609c95e4))
* **Form.Visibility:** remove `continuousValidation` property ([#5677](https://github.com/dnbexperience/eufemia/issues/5677)) ([84fb1a2](https://github.com/dnbexperience/eufemia/commit/84fb1a2632ba6aa6a861f8d8efabdb0c7fb0f140))
* **Form.Visibility:** remove `withValue` property ([#5633](https://github.com/dnbexperience/eufemia/issues/5633)) ([a9a5c26](https://github.com/dnbexperience/eufemia/commit/a9a5c26540d8818d6b076c115a191479256f7166))
* **FormError:** remove `validationRule` ([#5685](https://github.com/dnbexperience/eufemia/issues/5685)) ([5a93ac9](https://github.com/dnbexperience/eufemia/commit/5a93ac94eeecf7621213a7b849a4734f690e985a))
* **FormLabel:** default to vertical direction ([#7384](https://github.com/dnbexperience/eufemia/issues/7384)) ([a7b27c2](https://github.com/dnbexperience/eufemia/commit/a7b27c29c4434e5ea29d36bc9cf8825c4c4bfe95))
* **FormLabel:** remove `for_id` property ([#5625](https://github.com/dnbexperience/eufemia/issues/5625)) ([1d9356c](https://github.com/dnbexperience/eufemia/commit/1d9356cb5cf2fe9064d1f3a54c819956e8506afe))
* **FormLabel:** remove `label_direction` property ([#5627](https://github.com/dnbexperience/eufemia/issues/5627)) ([6f5591c](https://github.com/dnbexperience/eufemia/commit/6f5591cd4273bb46f0b27f6a614db89cb8a5b918))
* **FormLabel:** remove `sr_only` property ([#5626](https://github.com/dnbexperience/eufemia/issues/5626)) ([25bcd38](https://github.com/dnbexperience/eufemia/commit/25bcd3818ad8646acce3ef7991955b422729bf4f))
* **FormRow, FormSet:** remove FormRow & FormSet ([#5616](https://github.com/dnbexperience/eufemia/issues/5616)) ([9fc14b4](https://github.com/dnbexperience/eufemia/commit/9fc14b46aa4d13bb40904b51b58961a98fe05880))
* **Forms:** remove `continuousValidation` property from all Field.* ([#5676](https://github.com/dnbexperience/eufemia/issues/5676)) ([6e7cfbc](https://github.com/dnbexperience/eufemia/commit/6e7cfbcd1c494fb118df53aec5f03f63f76d917e))
* **Forms:** remove `Form.FieldProps` ([#5682](https://github.com/dnbexperience/eufemia/issues/5682)) ([e67996c](https://github.com/dnbexperience/eufemia/commit/e67996c61b7d029ad2f41c86c79781ec0fb621cd))
* **Forms:** remove `Form.useError` hook ([#5683](https://github.com/dnbexperience/eufemia/issues/5683)) ([2e60d08](https://github.com/dnbexperience/eufemia/commit/2e60d08c28f7a2d0346f1aa7ebd785add33521f6))
* **Forms:** remove `Form.useErrorMessage` hook ([#5691](https://github.com/dnbexperience/eufemia/issues/5691)) ([021b977](https://github.com/dnbexperience/eufemia/commit/021b9777459727a0ff5161685c4da24190be3d77))
* **Forms:** remove `Form.useLocale` hook ([#5681](https://github.com/dnbexperience/eufemia/issues/5681)) ([06b313d](https://github.com/dnbexperience/eufemia/commit/06b313d30eda68f08a5f203f18cce8f2ce79d7a3))
* **Forms:** remove `includeValidProps` ([#5748](https://github.com/dnbexperience/eufemia/issues/5748)) ([dc6de0f](https://github.com/dnbexperience/eufemia/commit/dc6de0f0741a9e0bfc094b23ddf625edc7eb76da))
* **Forms:** remove `prepareFormRowContext` ([#5792](https://github.com/dnbexperience/eufemia/issues/5792)) ([0f795b9](https://github.com/dnbexperience/eufemia/commit/0f795b9b3dbbfef57738671922a4f199d127c9de))
* **Forms:** remove StepsLayout ([#5721](https://github.com/dnbexperience/eufemia/issues/5721)) ([83e1866](https://github.com/dnbexperience/eufemia/commit/83e1866431594392889051b196c7214c355f73dc))
* **FormStatus:** remove `no_animation`, `icon_size`, `text_id`, `width_selector`, `width_element` ([#5809](https://github.com/dnbexperience/eufemia/issues/5809)) ([ef646f3](https://github.com/dnbexperience/eufemia/commit/ef646f3720de1bdd480ce4ca9512ac0fda064b08))
* **FormStatus:** rename `variant="flat"` to `variant="plain"` ([#6665](https://github.com/dnbexperience/eufemia/issues/6665)) ([8be6adb](https://github.com/dnbexperience/eufemia/commit/8be6adb9efa35443fc19a8dabe33e21f078b8705))
* **GlobalError:** remove `status` and `code` property ([#5664](https://github.com/dnbexperience/eufemia/issues/5664)) ([3f947a3](https://github.com/dnbexperience/eufemia/commit/3f947a3779baf435702abba6589e19561e3703fa))
* **GlobalStatus:** remove `on_adjust`, `on_open`, `on_show`, `on_hide` & `on_close` ([#5930](https://github.com/dnbexperience/eufemia/issues/5930)) ([08ee287](https://github.com/dnbexperience/eufemia/commit/08ee287bfa8e7193d0ef1fbc83f3d76a3eef63c7))
* **GlobalStatus:** remove `remove-on-unmount` property ([#5848](https://github.com/dnbexperience/eufemia/issues/5848)) ([c36c33c](https://github.com/dnbexperience/eufemia/commit/c36c33c25d2e8b973a4df2f2afbd03edbbdab0e8))
* **GlobalStatus:** replace `autoclose` with `autoClose` and `autoscroll` with `autoScroll` ([#6736](https://github.com/dnbexperience/eufemia/issues/6736)) ([101cca0](https://github.com/dnbexperience/eufemia/commit/101cca0abc0d166cadda0929209d75f0620dcaaa))
* **GlobalStatus:** replace `snake_case` properties with `camelCase` ([#5810](https://github.com/dnbexperience/eufemia/issues/5810)) ([bd8ed49](https://github.com/dnbexperience/eufemia/commit/bd8ed4995a2fb98eab01cd5ed80a950f126b94c4))
* **Heading:** replace `snake_case` properties with `camelCase` ([#5815](https://github.com/dnbexperience/eufemia/issues/5815)) ([5810c4c](https://github.com/dnbexperience/eufemia/commit/5810c4c5e6a0499af5e849f6626e1f681936fac5))
* **HelpButtonInline:** remove `focusWhenOpen` ([#6359](https://github.com/dnbexperience/eufemia/issues/6359)) ([066781c](https://github.com/dnbexperience/eufemia/commit/066781cb8d3f3d28f687cd0abf33f6cef6b56a58))
* **HelpButton:** replace `snake_case` translations with `camelCase` ([#5866](https://github.com/dnbexperience/eufemia/issues/5866)) ([2c6c026](https://github.com/dnbexperience/eufemia/commit/2c6c0265f105a3cca474ceb6f1d74af9c6ba53ab))
* **helpers:** remove unused combineDetails function ([#7196](https://github.com/dnbexperience/eufemia/issues/7196)) ([98a6ab2](https://github.com/dnbexperience/eufemia/commit/98a6ab29e71b97900f44efe04c858b696d833396))
* **H:** remove deprecated 'as' prop in favor of 'element' ([#7175](https://github.com/dnbexperience/eufemia/issues/7175)) ([758d8c4](https://github.com/dnbexperience/eufemia/commit/758d8c4fe831d1fd9496482697b421c72c34731e))
* **H:** rename 'as' prop to 'element' for consistency with other components ([#7163](https://github.com/dnbexperience/eufemia/issues/7163)) ([eb31bb6](https://github.com/dnbexperience/eufemia/commit/eb31bb6c24fc774177b9925af5f20f0be28a4262))
* **Hr:** remove `fullscreen` property ([#5631](https://github.com/dnbexperience/eufemia/issues/5631)) ([ff0034b](https://github.com/dnbexperience/eufemia/commit/ff0034b514611ebe1bd052626c799eaeedb416d2))
* **Hr:** remove `light` property ([#5632](https://github.com/dnbexperience/eufemia/issues/5632)) ([f124ed2](https://github.com/dnbexperience/eufemia/commit/f124ed2fdc51b97208d6cdd844431fdda75c5f23))
* **Hr:** remove `medium` property ([#5630](https://github.com/dnbexperience/eufemia/issues/5630)) ([6f73bb7](https://github.com/dnbexperience/eufemia/commit/6f73bb78336f2ba13e2d8ec9b9aa504b1f26542d))
* **Icon:** remove `inherit_color` property ([#5679](https://github.com/dnbexperience/eufemia/issues/5679)) ([085eaa6](https://github.com/dnbexperience/eufemia/commit/085eaa6a76266b4fc969c21e304fb96a19db93da))
* **Input, InputMasked:** remove snake_case events ([#5931](https://github.com/dnbexperience/eufemia/issues/5931)) ([dc3de63](https://github.com/dnbexperience/eufemia/commit/dc3de63265361a516242eee98a2e43a2c30021a4))
* **Input, Textarea:** rename inputClass to inputClassName and textareaClass to textareaClassName ([#7167](https://github.com/dnbexperience/eufemia/issues/7167)) ([a6cfb6e](https://github.com/dnbexperience/eufemia/commit/a6cfb6e3932f8ecad99d6260b545edf0a14d8c22))
* **InputMasked, Textarea:** remove React.forwardRef (React 19) ([#7261](https://github.com/dnbexperience/eufemia/issues/7261)) ([dece4a7](https://github.com/dnbexperience/eufemia/commit/dece4a7bedd26a2875348b77a9becc4ae3b0ae62))
* **InputMasked:** remove `MultiInputMask` as a public component ([#7017](https://github.com/dnbexperience/eufemia/issues/7017)) ([c88efbb](https://github.com/dnbexperience/eufemia/commit/c88efbbdb73cb19a17e9edd7626afc9e08127115))
* **InputMasked:** remove deprecated `onStateUpdate` prop ([#6724](https://github.com/dnbexperience/eufemia/issues/6724)) ([7d08569](https://github.com/dnbexperience/eufemia/commit/7d08569bc5092a54b8302e047769b0605a52a444))
* **InputPassword:** component is removed ([#5718](https://github.com/dnbexperience/eufemia/issues/5718)) ([d0c61a4](https://github.com/dnbexperience/eufemia/commit/d0c61a43334fa44241b17f97cfe5511f9f450217))
* **Input:** remove deprecated `onStateUpdate` prop ([#6725](https://github.com/dnbexperience/eufemia/issues/6725)) ([21f5c86](https://github.com/dnbexperience/eufemia/commit/21f5c86b5c71b55cebf6d5703ac767b563ff7623))
* **Input:** rename clear prop to showClearButton ([#7069](https://github.com/dnbexperience/eufemia/issues/7069)) ([7758b86](https://github.com/dnbexperience/eufemia/commit/7758b867a89fa963f8b72876f1e4c4f6c838000b))
* **Iterate.ArrayPushButton:** remove component ([#5749](https://github.com/dnbexperience/eufemia/issues/5749)) ([69de3a8](https://github.com/dnbexperience/eufemia/commit/69de3a8fece4ed3f4d0ed8d820cb3e29d3fb47f0))
* **Iterate.ArrayRemoveElementButton:** remove component ([#5750](https://github.com/dnbexperience/eufemia/issues/5750)) ([c937288](https://github.com/dnbexperience/eufemia/commit/c93728896582513dbad3a69594b8c7686658ee95))
* **Iterate.PushContainer:** remove `requireCommit` property ([#5674](https://github.com/dnbexperience/eufemia/issues/5674)) ([ac0d212](https://github.com/dnbexperience/eufemia/commit/ac0d212634d8af8d6f4e6caf407bb92157ec90a1))
* **Iterate:** remove `{itemNr}` ([#5684](https://github.com/dnbexperience/eufemia/issues/5684)) ([6861929](https://github.com/dnbexperience/eufemia/commit/6861929bf8925e2b84d487ff90b37808071dfb94))
* **Logo:** fix brand svg import color ([#6042](https://github.com/dnbexperience/eufemia/issues/6042)) ([875b76c](https://github.com/dnbexperience/eufemia/commit/875b76c8bd769bf0379e9df196cc3f302ade60cd))
* **Logo:** remove `inherit_color` property ([#5678](https://github.com/dnbexperience/eufemia/issues/5678)) ([2027fd7](https://github.com/dnbexperience/eufemia/commit/2027fd772f27a2b248946726f2c2c78258730b98))
* **Logo:** remove `size`, `ratio`, `alt`, `inherit_color` ([#5701](https://github.com/dnbexperience/eufemia/issues/5701)) ([6c4ff4e](https://github.com/dnbexperience/eufemia/commit/6c4ff4ea7963cfee4a7ffde5e77dfbf07e69352c))
* **Modal, Dialog, Drawer:** remove `class` property ([#5663](https://github.com/dnbexperience/eufemia/issues/5663)) ([b909c15](https://github.com/dnbexperience/eufemia/commit/b909c1501540d32faaedeb62f61dc0b58c162dda))
* **Modal.Header, Dialog.Header, Drawer.Header:** remove `title_class` ([#6350](https://github.com/dnbexperience/eufemia/issues/6350)) ([a334217](https://github.com/dnbexperience/eufemia/commit/a3342173fb0590a566dc119d98a004a727147dec))
* **ModalHeaderBar, Dialog.Navigation, Drawer.Navigation:** remove `shadow_class` ([#6352](https://github.com/dnbexperience/eufemia/issues/6352)) ([ccd9903](https://github.com/dnbexperience/eufemia/commit/ccd9903fc612fff2668003e8371c0205c7905335))
* **Modal:** remove `rootId` property ([#6598](https://github.com/dnbexperience/eufemia/issues/6598)) ([895ddc7](https://github.com/dnbexperience/eufemia/commit/895ddc79138cf74696bad27b6693fdf099ec4f47))
* **Modal:** replace `snake_case` properties with `camelCase` ([#5839](https://github.com/dnbexperience/eufemia/issues/5839)) ([c136390](https://github.com/dnbexperience/eufemia/commit/c136390f3ef40e7c308383e32635dbc000eb7d31))
* **NumberFormat:** remove `omit_rounding` property ([#5634](https://github.com/dnbexperience/eufemia/issues/5634)) ([dec8354](https://github.com/dnbexperience/eufemia/commit/dec8354c84fc1f4357d7cc9a53f6826dfffbb5ae))
* **NumberFormat:** replace `snake_case` properties with `camelCase` ([#5821](https://github.com/dnbexperience/eufemia/issues/5821)) ([37cc9fd](https://github.com/dnbexperience/eufemia/commit/37cc9fd2dce6d980ef9591897a17b1a7c9b501af))
* **NumberFormat:** replace `snake_case` translations with `camelCase` ([#5868](https://github.com/dnbexperience/eufemia/issues/5868)) ([4e7d207](https://github.com/dnbexperience/eufemia/commit/4e7d2076b927b20cf936961011dbf65b0151d8c5))
* **NumberFormat:** split into sub components including `format` utility ([#7542](https://github.com/dnbexperience/eufemia/issues/7542)) ([a78ba41](https://github.com/dnbexperience/eufemia/commit/a78ba412834e63ff5c5dbe2d65eadc423dacf9f2))
* **NumberFormat:** use detectCountryCode for E.164 phone formatting ([#7504](https://github.com/dnbexperience/eufemia/issues/7504)) ([a185586](https://github.com/dnbexperience/eufemia/commit/a185586cb7af2d17265fc78945acd40728e2eb58))
* **Pagination:** remove `loadButtonText` property ([#5908](https://github.com/dnbexperience/eufemia/issues/5908)) ([c7c34dd](https://github.com/dnbexperience/eufemia/commit/c7c34dd770512fc7e3b823e5189f00b74841dbff))
* **Pagination:** remove `on_change`, `on_startup`, `on_load` & `on_end` events ([#5926](https://github.com/dnbexperience/eufemia/issues/5926)) ([2cac9dd](https://github.com/dnbexperience/eufemia/commit/2cac9dd04b970f831096347258176365e5e215a1))
* **Pagination:** remove `place_maker_before_content` property ([#5659](https://github.com/dnbexperience/eufemia/issues/5659)) ([1b585aa](https://github.com/dnbexperience/eufemia/commit/1b585aa3e8c751e106b21573592ebd6909ae2215))
* **Pagination:** replace `snake_case` properties with `camelCase` ([#5814](https://github.com/dnbexperience/eufemia/issues/5814)) ([cfb5171](https://github.com/dnbexperience/eufemia/commit/cfb5171ef87a837d8447d2c1428e7c3c80a64477))
* **Paragraph:** remove `medium`, `bold`, `modifier` ([#5715](https://github.com/dnbexperience/eufemia/issues/5715)) ([927b236](https://github.com/dnbexperience/eufemia/commit/927b23688ced7ee1c82621282fafd48d066c6fe9))
* **PaymentCard:** remove `text_card_number` translation ([#5629](https://github.com/dnbexperience/eufemia/issues/5629)) ([cb9662e](https://github.com/dnbexperience/eufemia/commit/cb9662e85c52e3b39003a5024a2b91f0670a109f))
* **PaymentCard:** replace  `cardStatus`'s `snake_case` values with `camelCase` ([#5870](https://github.com/dnbexperience/eufemia/issues/5870)) ([04c414c](https://github.com/dnbexperience/eufemia/commit/04c414c0383b3f1ae6b19a11d3a5de66d9c83f93))
* **PaymentCard:** replace `snake_case` properties with `camelCase` ([#5851](https://github.com/dnbexperience/eufemia/issues/5851)) ([2d2f441](https://github.com/dnbexperience/eufemia/commit/2d2f4411c366f79561d02c95600289f1a66ef8ea))
* **PaymentCard:** replace `snake_case` translations with `camelCase` ([#5865](https://github.com/dnbexperience/eufemia/issues/5865)) ([235ee1c](https://github.com/dnbexperience/eufemia/commit/235ee1cc989fae6bf1cefe03d86143c3f5bb0798))
* prefix all bare Props type exports with component name ([#7200](https://github.com/dnbexperience/eufemia/issues/7200)) ([5877caa](https://github.com/dnbexperience/eufemia/commit/5877caa6b7e53461c2f658c98e948fb9501a3d99))
* **PrimaryComponent:** replace `snake_case` properties with `camelCase` ([#5846](https://github.com/dnbexperience/eufemia/issues/5846)) ([ee68a97](https://github.com/dnbexperience/eufemia/commit/ee68a97600c69f5a4e5a9202713b5efd02b538d0))
* **ProgressIndicator:** remove `children` property ([#5640](https://github.com/dnbexperience/eufemia/issues/5640)) ([1ecb9e1](https://github.com/dnbexperience/eufemia/commit/1ecb9e1cf813e0c1db74f1c6f983ba1c2337c01b))
* **ProgressIndicator:** remove `indicator_label` property ([#5705](https://github.com/dnbexperience/eufemia/issues/5705)) ([41269cf](https://github.com/dnbexperience/eufemia/commit/41269cf62acd77dbb2bb4e8a81bfd1450fe4399e))
* **ProgressIndicator:** remove `label_direction` property ([#5637](https://github.com/dnbexperience/eufemia/issues/5637)) ([8f165bf](https://github.com/dnbexperience/eufemia/commit/8f165bf25e61a2715a15cdee04edcdb3cbc68025))
* **ProgressIndicator:** remove `no_animation` property ([#5636](https://github.com/dnbexperience/eufemia/issues/5636)) ([3aa0fdd](https://github.com/dnbexperience/eufemia/commit/3aa0fdd180ce048aceef28683a4d6dcb90abcc4b))
* **ProgressIndicator:** remove `on_complete` event ([#5639](https://github.com/dnbexperience/eufemia/issues/5639)) ([f611cd2](https://github.com/dnbexperience/eufemia/commit/f611cd25002163e910f186ea79d7056f6798cd28))
* **ProgressIndicator:** remove `show_label` property ([#5638](https://github.com/dnbexperience/eufemia/issues/5638)) ([d623b5e](https://github.com/dnbexperience/eufemia/commit/d623b5e7550782def821d8207b49b9ad0220b01d))
* **ProgressIndicator:** replace `visible` with `show` ([#6648](https://github.com/dnbexperience/eufemia/issues/6648)) ([16e28fc](https://github.com/dnbexperience/eufemia/commit/16e28fcd2273dbc7673691606e7d29953258d9b1))
* **Provider:** remove `filterSubmitData` ([#6578](https://github.com/dnbexperience/eufemia/issues/6578)) ([30f747b](https://github.com/dnbexperience/eufemia/commit/30f747b83cb6628fe161af6bb972f63c2710e1ba))
* **Radio:** remove `on_change` & `on_state_update` ([#5927](https://github.com/dnbexperience/eufemia/issues/5927)) ([8c2ae75](https://github.com/dnbexperience/eufemia/commit/8c2ae75e2d1460e6e07b8246a53572aed7bcc39c))
* **Radio:** remove deprecated `onStateUpdate` and `attributes` props ([#6722](https://github.com/dnbexperience/eufemia/issues/6722)) ([9bf8aca](https://github.com/dnbexperience/eufemia/commit/9bf8acaf5ab200f4b0ac170aea12504ed68cee6e))
* **Radio:** replace `snake_case` properties with `camelCase` ([#5820](https://github.com/dnbexperience/eufemia/issues/5820)) ([8831c95](https://github.com/dnbexperience/eufemia/commit/8831c953504222e97ac490e69635b6835d7f73c6))
* remove `convertStatusToStateOnly` helper ([#6759](https://github.com/dnbexperience/eufemia/issues/6759)) ([5df9ac8](https://github.com/dnbexperience/eufemia/commit/5df9ac8fcbdcc8b5f6d0c868ce850c2ccdf2d19c))
* remove `insertElementBeforeSelection` helper ([#6756](https://github.com/dnbexperience/eufemia/issues/6756)) ([7b31670](https://github.com/dnbexperience/eufemia/commit/7b31670c1d5965755f0769174a8efab08a271724))
* remove `IS_EDGE`/`isEdge` detection ([#6760](https://github.com/dnbexperience/eufemia/issues/6760)) ([c868950](https://github.com/dnbexperience/eufemia/commit/c868950b8fa2764fd435007c46b61e057d4ded54))
* remove `isTrue` helper function ([#6757](https://github.com/dnbexperience/eufemia/issues/6757)) ([3504d2e](https://github.com/dnbexperience/eufemia/commit/3504d2e9c40c9882d118e033ba1d051c7237d92a))
* remove `matchAll` polyfill ([#6758](https://github.com/dnbexperience/eufemia/issues/6758)) ([f855b67](https://github.com/dnbexperience/eufemia/commit/f855b676a0bb1cd83e8477e8782d474d70988f49))
* remove `toCamelCase` & `toSnakeCase` ([#6745](https://github.com/dnbexperience/eufemia/issues/6745)) ([f1cfb36](https://github.com/dnbexperience/eufemia/commit/f1cfb363cf7ebfe16f849c35a068ba8b7fdcfe7e))
* remove internal _innerRef prop, use native ref ([#7345](https://github.com/dnbexperience/eufemia/issues/7345)) ([300e167](https://github.com/dnbexperience/eufemia/commit/300e167ab5ccb9705c009da1edf5e5961562e425))
* remove support for IE and Edge (EdgeHTML) ([#6340](https://github.com/dnbexperience/eufemia/issues/6340)) ([13ee8e1](https://github.com/dnbexperience/eufemia/commit/13ee8e11b3a53d2a2d53c511cddbfdeb048b1395))
* rename SCSS mixins to camelCase ([#7021](https://github.com/dnbexperience/eufemia/issues/7021)) ([604a696](https://github.com/dnbexperience/eufemia/commit/604a696fa0d6c20e339256fd2898bc35ed4f0fb2))
* replace `innerRef` with native `ref` across all components ([#6806](https://github.com/dnbexperience/eufemia/issues/6806)) ([149fa9d](https://github.com/dnbexperience/eufemia/commit/149fa9d6511043800bb9779566cf0d79968f49fa))
* replace `warning` with `warn` for `state` and `statusState` properties ([#6522](https://github.com/dnbexperience/eufemia/issues/6522)) ([e7cb138](https://github.com/dnbexperience/eufemia/commit/e7cb1381b62788b1ebd701c5a08156b5fde28941))
* replace untyped event handlers with proper TypeScript signatures ([#7045](https://github.com/dnbexperience/eufemia/issues/7045)) ([6be5b74](https://github.com/dnbexperience/eufemia/commit/6be5b7483ddd4d230e40dda88cac9c64694c7c26))
* **reset.scss:** remove support for IE and Edge (EdgeHTML) ([#6339](https://github.com/dnbexperience/eufemia/issues/6339)) ([88b540a](https://github.com/dnbexperience/eufemia/commit/88b540aafa646ab5d749f3448be028d4f0ca44fa))
* **Section, Tabs, Drawer.Body, Dialog.Body, Breadcrumb:** remove `style_type`/`styleType` property ([#5619](https://github.com/dnbexperience/eufemia/issues/5619)) ([e3dcc3a](https://github.com/dnbexperience/eufemia/commit/e3dcc3aa3afbeab7549609e08b0bd23a5e4e9bb1))
* **Section:** remove `inner_ref` property ([#5623](https://github.com/dnbexperience/eufemia/issues/5623)) ([cecb77c](https://github.com/dnbexperience/eufemia/commit/cecb77cc9091f134f9286787636d910e3d933c5a))
* **Section:** remove `spacing` property ([#6594](https://github.com/dnbexperience/eufemia/issues/6594)) ([7c4ebee](https://github.com/dnbexperience/eufemia/commit/7c4ebeebe6d7f940fea3b58c19fe21842956b232))
* **Section:** remove deprecated color variants ([#7273](https://github.com/dnbexperience/eufemia/issues/7273)) ([f17644a](https://github.com/dnbexperience/eufemia/commit/f17644adb0c0625fd48c3c3925004661ead5e68f))
* **Section:** remove deprecated inner_ref prop ([#7191](https://github.com/dnbexperience/eufemia/issues/7191)) ([2a35318](https://github.com/dnbexperience/eufemia/commit/2a35318c5aae6b4893e7f4706ceb0571804fea56))
* **Section:** remove deprecated inner_ref prop ([#7260](https://github.com/dnbexperience/eufemia/issues/7260)) ([1e18b40](https://github.com/dnbexperience/eufemia/commit/1e18b40711ef968f010aec9fd6816a2ca6ca0a98))
* **Skeleton:** replace `snake_case` properties with `camelCase` ([#5842](https://github.com/dnbexperience/eufemia/issues/5842)) ([714a908](https://github.com/dnbexperience/eufemia/commit/714a908c32ed455929fd6d15858a4c4362003709))
* **Space:** enhace with responsive margin support (replace createSpacingClasses with applySpacing) ([#7557](https://github.com/dnbexperience/eufemia/issues/7557)) ([7016c6e](https://github.com/dnbexperience/eufemia/commit/7016c6efafb770b1ad61c0da0810072238eb20b9))
* **Space:** remove `on_collapse` property ([#5852](https://github.com/dnbexperience/eufemia/issues/5852)) ([b2115f4](https://github.com/dnbexperience/eufemia/commit/b2115f48830a1cc6017a1c28ac752353c508a384))
* standardize 'info' state/variant value to 'information' ([#7174](https://github.com/dnbexperience/eufemia/issues/7174)) ([bd18f42](https://github.com/dnbexperience/eufemia/commit/bd18f4269e2e96f037c5437f3ad14d255edf22d5)), closes [#6522](https://github.com/dnbexperience/eufemia/issues/6522)
* standardize `open` property across components ([#6358](https://github.com/dnbexperience/eufemia/issues/6358)) ([aaa4d48](https://github.com/dnbexperience/eufemia/commit/aaa4d48f72be970bac0257391a7e51903c635fea))
* standardize context type names to ...ContextValue suffix ([#7032](https://github.com/dnbexperience/eufemia/issues/7032)) ([5b6d2af](https://github.com/dnbexperience/eufemia/commit/5b6d2af6f1d6a5e7a5d0bdf9773c1f8ac76a58f7))
* standardize plural Types suffix to singular ([#7037](https://github.com/dnbexperience/eufemia/issues/7037)) ([d81679b](https://github.com/dnbexperience/eufemia/commit/d81679bd9c9991761d43b14529a1318d8796a573))
* standardize TS naming and convert `interface` to `type` ([#6778](https://github.com/dnbexperience/eufemia/issues/6778)) ([44b5024](https://github.com/dnbexperience/eufemia/commit/44b5024e92ebd8037ef9b54526ea74138b4769d5))
* **Stat:** remove deprecated Stat.Amount, Stat.Info/Stat.Label variant="default" ([#7324](https://github.com/dnbexperience/eufemia/issues/7324)) ([30a64ad](https://github.com/dnbexperience/eufemia/commit/30a64adaf16be7fa49c32b229eeda16c0d739cd5))
* **StepIndicator.Sidebar:** remove component ([#5668](https://github.com/dnbexperience/eufemia/issues/5668)) ([fadc1c8](https://github.com/dnbexperience/eufemia/commit/fadc1c8cb1bfbfe24dac7bc7435b33f85c56f7e6))
* **StepIndicator:** remove `on_change` & `on_click` event ([#5924](https://github.com/dnbexperience/eufemia/issues/5924)) ([328d40f](https://github.com/dnbexperience/eufemia/commit/328d40f4c6328b9170d27f96563b4983918dd2d2))
* **StepIndicator:** remove `on_item_render` property ([#5696](https://github.com/dnbexperience/eufemia/issues/5696)) ([ef904cb](https://github.com/dnbexperience/eufemia/commit/ef904cba4599d5c785523d277c273dc959b4b141))
* **StepIndicator:** remove `on_render` property ([#5697](https://github.com/dnbexperience/eufemia/issues/5697)) ([4c33195](https://github.com/dnbexperience/eufemia/commit/4c3319580a1bdb6bc577b719e60171a3ca79e98a))
* **StepIndicator:** remove `sidebar_id` property ([#5699](https://github.com/dnbexperience/eufemia/issues/5699)) ([6875e7d](https://github.com/dnbexperience/eufemia/commit/6875e7de992318c67861bc83050281e1646a3f28))
* **StepIndicator:** remove `step_title_extended` property ([#5698](https://github.com/dnbexperience/eufemia/issues/5698)) ([9dd82dd](https://github.com/dnbexperience/eufemia/commit/9dd82dd2fd78c90cc668e92c933c565b431653f0))
* **StepIndicator:** remove `StepIndicatorRenderCallback` type ([#5700](https://github.com/dnbexperience/eufemia/issues/5700)) ([5f18997](https://github.com/dnbexperience/eufemia/commit/5f18997445f00b2c59e800f7b5a37fecb29a1edd))
* **StepIndicator:** replace `snake_case` properties with `camelCase` ([#5837](https://github.com/dnbexperience/eufemia/issues/5837)) ([339139e](https://github.com/dnbexperience/eufemia/commit/339139ecd9169201a7e07f6a393b76eaf1fb620c))
* **Switch:** remove `label_position` property ([#5650](https://github.com/dnbexperience/eufemia/issues/5650)) ([a01eaae](https://github.com/dnbexperience/eufemia/commit/a01eaae4aa45ac6f9e2f65407e59c9c6036c9c2e))
* **Switch:** remove `label_sr_only` property ([#5657](https://github.com/dnbexperience/eufemia/issues/5657)) ([e8f5891](https://github.com/dnbexperience/eufemia/commit/e8f5891dac25d528160b32a4fb820d1b4e5f353c))
* **Switch:** remove `on_change_end` event ([#5653](https://github.com/dnbexperience/eufemia/issues/5653)) ([473bd65](https://github.com/dnbexperience/eufemia/commit/473bd6585776aff3b467b46cbd5cb328046fb794))
* **Switch:** remove `on_change` event ([#5656](https://github.com/dnbexperience/eufemia/issues/5656)) ([1e08348](https://github.com/dnbexperience/eufemia/commit/1e08348228bd59d663394e8b0e9441460d1a33fc))
* **Switch:** remove `on_state_update` event ([#5652](https://github.com/dnbexperience/eufemia/issues/5652)) ([92f530d](https://github.com/dnbexperience/eufemia/commit/92f530d012f60bd46f834376eb36cea9919837fd))
* **Switch:** remove `status_no_animation` property ([#5651](https://github.com/dnbexperience/eufemia/issues/5651)) ([809fc13](https://github.com/dnbexperience/eufemia/commit/809fc130b1de2cf73652e506328f1c52c6925467))
* **Switch:** remove `status_props` property ([#5655](https://github.com/dnbexperience/eufemia/issues/5655)) ([3c6847b](https://github.com/dnbexperience/eufemia/commit/3c6847b4fa3c5e74d6859c40f25482d74a772fc3))
* **Switch:** remove `status_state` property ([#5654](https://github.com/dnbexperience/eufemia/issues/5654)) ([fc30b7d](https://github.com/dnbexperience/eufemia/commit/fc30b7d03f9f511a16b08e9143821eaed83b7851))
* **Switch:** remove deprecated `onStateUpdate` prop ([#6717](https://github.com/dnbexperience/eufemia/issues/6717)) ([bbd61df](https://github.com/dnbexperience/eufemia/commit/bbd61df8dd9f7a38fdbe63eb671bdfea0deca8e3))
* **Table:** change accordionChevronPlacement values from 'start'/'end' to 'left'/'right' ([#7059](https://github.com/dnbexperience/eufemia/issues/7059)) ([4c3be73](https://github.com/dnbexperience/eufemia/commit/4c3be73868d71a1318827a2fa8d429b3ab6a2ae2))
* **Table:** remove `accordion` property ([#5661](https://github.com/dnbexperience/eufemia/issues/5661)) ([335ba75](https://github.com/dnbexperience/eufemia/commit/335ba75d933fab66a3fa88fbe4199a180a3cbf9f))
* **Table:** rename event `onClosed` -> `onClose` ([#6367](https://github.com/dnbexperience/eufemia/issues/6367)) ([2342c97](https://github.com/dnbexperience/eufemia/commit/2342c975c85db81838d04c6859782856e2c707af))
* **Table:** rename event `onOpened` -> `onOpen` ([#6368](https://github.com/dnbexperience/eufemia/issues/6368)) ([3d62a55](https://github.com/dnbexperience/eufemia/commit/3d62a55df3ef274d886956547af54b320d65ad67))
* **Tabs, Accordion:** rename prerender prop to keepInDOM ([#7182](https://github.com/dnbexperience/eufemia/issues/7182)) ([f48dea6](https://github.com/dnbexperience/eufemia/commit/f48dea6e54cfd10fbe33d88ab0523a7058d7d05a))
* **Tabs:** remove `content_spacing` property ([#5728](https://github.com/dnbexperience/eufemia/issues/5728)) ([3ce2139](https://github.com/dnbexperience/eufemia/commit/3ce213934120f46be3cc459b8df014de6c8ead8c))
* **Tabs:** remove `content_style` property ([#5729](https://github.com/dnbexperience/eufemia/issues/5729)) ([86383fa](https://github.com/dnbexperience/eufemia/commit/86383fa0128fed14774de04a7800b6f5b87965f8))
* **Tabs:** remove `focus_key` property ([#5741](https://github.com/dnbexperience/eufemia/issues/5741)) ([e26517f](https://github.com/dnbexperience/eufemia/commit/e26517fc73b6984571bedf5570cd66ef7f00c11c))
* **Tabs:** remove `nav_button_edge` property ([#5733](https://github.com/dnbexperience/eufemia/issues/5733)) ([3bac916](https://github.com/dnbexperience/eufemia/commit/3bac9165696624f92dfa5f4bbcbff2820310cf66))
* **Tabs:** remove `no_border` property ([#5734](https://github.com/dnbexperience/eufemia/issues/5734)) ([85263ca](https://github.com/dnbexperience/eufemia/commit/85263ca97ab844de9b954e54d03f510262ee05ec))
* **Tabs:** remove `on_change` property ([#5736](https://github.com/dnbexperience/eufemia/issues/5736)) ([914bafd](https://github.com/dnbexperience/eufemia/commit/914bafd3940f5f6169c1b2ede5c21d32d78726c8))
* **Tabs:** remove `on_click` property ([#5737](https://github.com/dnbexperience/eufemia/issues/5737)) ([dbb46dd](https://github.com/dnbexperience/eufemia/commit/dbb46dd8c74b189848e5a762622c911c69871230))
* **Tabs:** remove `on_focus` property ([#5740](https://github.com/dnbexperience/eufemia/issues/5740)) ([7e8ebd3](https://github.com/dnbexperience/eufemia/commit/7e8ebd30cd03472d4849a6376c6e67761f0bd14f))
* **Tabs:** remove `prevent_rerender` property ([#5735](https://github.com/dnbexperience/eufemia/issues/5735)) ([81ec4a7](https://github.com/dnbexperience/eufemia/commit/81ec4a78036689a328d33803aa9c2f6970ae8541))
* **Tabs:** remove `tab_element` property ([#5730](https://github.com/dnbexperience/eufemia/issues/5730)) ([52eb006](https://github.com/dnbexperience/eufemia/commit/52eb006729c6caccf992f58379b7b00d45fd2cb7))
* **Tabs:** remove `tabs_style` property ([#5731](https://github.com/dnbexperience/eufemia/issues/5731)) ([a71f0f9](https://github.com/dnbexperience/eufemia/commit/a71f0f96a8cd9cb2451530ba12edace1623c3bb4))
* **Tabs:** rewrite `selected_key` property ([#5726](https://github.com/dnbexperience/eufemia/issues/5726)) ([338f298](https://github.com/dnbexperience/eufemia/commit/338f298ac167f0e503d5710fa7ba05ff6cc7fdd6))
* **Tag:** remove `onDelete` event ([#5617](https://github.com/dnbexperience/eufemia/issues/5617)) ([9fa854a](https://github.com/dnbexperience/eufemia/commit/9fa854a4461ba16f7c92775c2e69a60b2c6e372a))
* **Textarea:** remove `on_change`, `on_blur`, `on_focus` & `on_key_down` ([#5929](https://github.com/dnbexperience/eufemia/issues/5929)) ([7e27f4f](https://github.com/dnbexperience/eufemia/commit/7e27f4fd97a24a13b71ec4369a32948fa67149ae))
* **Textarea:** remove deprecated `onStateUpdate` and `textareaAttributes` props ([#6719](https://github.com/dnbexperience/eufemia/issues/6719)) ([55dcbae](https://github.com/dnbexperience/eufemia/commit/55dcbaebf2bf0be8e87336810d3bd28aacac3de5))
* **Textarea:** replace `autoresize` with `autoResize` and `autoresizeMaxRows` with `autoResizeMaxRows` ([#6737](https://github.com/dnbexperience/eufemia/issues/6737)) ([c30d3f4](https://github.com/dnbexperience/eufemia/commit/c30d3f4e43fc70bfd767412dd24ce23028cf7fba))
* **Textarea:** replace `snake_case` properties with `camelCase` ([#5811](https://github.com/dnbexperience/eufemia/issues/5811)) ([e20e858](https://github.com/dnbexperience/eufemia/commit/e20e8585867165a7bc44e18ed0a6e391ab63b172))
* **Theme:** remove `propMapping` ([#7507](https://github.com/dnbexperience/eufemia/issues/7507)) ([a6fa2a9](https://github.com/dnbexperience/eufemia/commit/a6fa2a98799031a8b99c8f7f729e791d7035d275))
* **Themes:** main theme files moved from `/theme-[NAME]`  to `/[NAME]` ([#6534](https://github.com/dnbexperience/eufemia/issues/6534)) ([d7d80ac](https://github.com/dnbexperience/eufemia/commit/d7d80ac24908fa8a69600b3c6726b72f1857edec))
* **Timeline:** replace `snake_case` translations with `camelCase` ([#5869](https://github.com/dnbexperience/eufemia/issues/5869)) ([12c7c28](https://github.com/dnbexperience/eufemia/commit/12c7c283d76c2fb2edbcb345af211746e455053a))
* **ToggleButton:** remove `on_change` & `on_state_update` ([#5928](https://github.com/dnbexperience/eufemia/issues/5928)) ([4aa9068](https://github.com/dnbexperience/eufemia/commit/4aa906828f45527ff2bea4fac668b99a8f9cc308))
* **ToggleButton:** remove deprecated `onStateUpdate` and `attributes` props ([#6720](https://github.com/dnbexperience/eufemia/issues/6720)) ([ddfbf9a](https://github.com/dnbexperience/eufemia/commit/ddfbf9a026664901b347c483f6d79f0b025c0fd2))
* **ToggleButton:** replace `snake_case` properties with `camelCase` ([#5819](https://github.com/dnbexperience/eufemia/issues/5819)) ([43b2cfb](https://github.com/dnbexperience/eufemia/commit/43b2cfb3af9d20208afc1d1dc81fce2c736459cc))
* **Tooltip:** remove forceOpen prop, unify with open ([#7060](https://github.com/dnbexperience/eufemia/issues/7060)) ([c974b9b](https://github.com/dnbexperience/eufemia/commit/c974b9b6356facbaeb5debf5bed9a20dd6728ea2))
* **Tooltip:** rename `size="basis"` to `size="default"` ([#6663](https://github.com/dnbexperience/eufemia/issues/6663)) ([18162a0](https://github.com/dnbexperience/eufemia/commit/18162a022f38b302ed795e6ec96e61a63c9a3515))
* **Tooltip:** replace `active` with `open`, and `forceActive` with `forceOpen` ([#6645](https://github.com/dnbexperience/eufemia/issues/6645)) ([a623de0](https://github.com/dnbexperience/eufemia/commit/a623de0e59880289a2051bb2567effa2b6fcd976))
* **Tooltip:** replace `position` with `placement` to match Popover API ([#6975](https://github.com/dnbexperience/eufemia/issues/6975)) ([b126bad](https://github.com/dnbexperience/eufemia/commit/b126bade293632ae52f05ec437fa281a8b8de6d8))
* **ui-theme-fonts:** remove fonts only package ([#7397](https://github.com/dnbexperience/eufemia/issues/7397)) ([ee18905](https://github.com/dnbexperience/eufemia/commit/ee189050b0f5be77158b1ca263bba2f2e8e86917))
* **ui-theme-tags:** remove tags only styles support ([#7395](https://github.com/dnbexperience/eufemia/issues/7395)) ([97c097f](https://github.com/dnbexperience/eufemia/commit/97c097ff896ffde17005a45b3c0a7d2a033bc2fe))
* **Upload:** rename `variant="normal"` to `variant="default"` ([#6664](https://github.com/dnbexperience/eufemia/issues/6664)) ([0ce1e2c](https://github.com/dnbexperience/eufemia/commit/0ce1e2c3af0d5b2fdf3865114c68278fa62ef703))
* **Upload:** rename fileListAriaLabel to listAriaLabel ([#7061](https://github.com/dnbexperience/eufemia/issues/7061)) ([e87c425](https://github.com/dnbexperience/eufemia/commit/e87c4252d28a89816cd460859386966cfe1e4bdd))
* **Wizard.Container:** remove `scrollTopOnStepChange` property ([#5673](https://github.com/dnbexperience/eufemia/issues/5673)) ([dbcbe31](https://github.com/dnbexperience/eufemia/commit/dbcbe315f16ef9277e23320c30be1b89392c8d90))
* **Wizard.Container:** remove `variant` property ([#5671](https://github.com/dnbexperience/eufemia/issues/5671)) ([d3622dd](https://github.com/dnbexperience/eufemia/commit/d3622dd47317c7c238c36fac1a00b5c5bd57f164))
* **Wizard.Step:** remove `active` property ([#5669](https://github.com/dnbexperience/eufemia/issues/5669)) ([bd4ba54](https://github.com/dnbexperience/eufemia/commit/bd4ba542aba9ebd04226b3893214b0d1bb6e6dcb))
* **Wizard.Step:** remove `activeWhen` property ([#5670](https://github.com/dnbexperience/eufemia/issues/5670)) ([77394ab](https://github.com/dnbexperience/eufemia/commit/77394aba29349e925ae0745b8d27cc9bf4697472))


### :memo: Documentation

* add TSDoc to undocumented public prop interfaces ([#7387](https://github.com/dnbexperience/eufemia/issues/7387)) ([25fc866](https://github.com/dnbexperience/eufemia/commit/25fc86621931f605fda0f2eab1883d7592aee4b9))
* **AriaLive:** fix variant and priority types to use union types ([#7486](https://github.com/dnbexperience/eufemia/issues/7486)) ([af8c893](https://github.com/dnbexperience/eufemia/commit/af8c89313983f51b50a7c6073bf60d4fa5cd4500))
* **ArraySelection:** fix quoting inconsistencies in type arrays ([#7495](https://github.com/dnbexperience/eufemia/issues/7495)) ([5f21e3a](https://github.com/dnbexperience/eufemia/commit/5f21e3afc9878f1cb43a80e16240cec0675c4e4a))
* **DatePicker:** fix statusState type to use union type ([#7487](https://github.com/dnbexperience/eufemia/issues/7487)) ([611407e](https://github.com/dnbexperience/eufemia/commit/611407e3aaed1e10f3a1381f2cc12fb00776b76d))
* **Form.Section:** fix containerMode type to use union type ([#7488](https://github.com/dnbexperience/eufemia/issues/7488)) ([9a63a52](https://github.com/dnbexperience/eufemia/commit/9a63a525115b318d95044ba577e96cf7a4eb7551))
* **GlobalError:** fix statusCode quoting in type array ([#7493](https://github.com/dnbexperience/eufemia/issues/7493)) ([3f6becd](https://github.com/dnbexperience/eufemia/commit/3f6becd83241791fbbc527a4a738fcf2237eeb8a))
* order align values in a consistent manner  ([#6521](https://github.com/dnbexperience/eufemia/issues/6521)) ([8e5c291](https://github.com/dnbexperience/eufemia/commit/8e5c29176192fdbede710007496e2d204834716b))
* order sizes in a consistent manner ([#6504](https://github.com/dnbexperience/eufemia/issues/6504)) ([fb67ef2](https://github.com/dnbexperience/eufemia/commit/fb67ef29711a46175ad49faf25d9e9b264d98dc4))
* page title should match component name ([#6512](https://github.com/dnbexperience/eufemia/issues/6512)) ([729b876](https://github.com/dnbexperience/eufemia/commit/729b87605fe8079bcad63767561a2520d720fcc5))
* **ProgressIndicator:** fix quoting inconsistencies in type arrays ([#7492](https://github.com/dnbexperience/eufemia/issues/7492)) ([f6e0d82](https://github.com/dnbexperience/eufemia/commit/f6e0d8284444a08913eeef5d594056f89a985e21))
* **PushButton:** fix path status from required to optional ([#7496](https://github.com/dnbexperience/eufemia/issues/7496)) ([b73dcb5](https://github.com/dnbexperience/eufemia/commit/b73dcb58e1c37294ae89874ecc4e35db1b54e5ef))
* remove `en-NO` documentation ([#7538](https://github.com/dnbexperience/eufemia/issues/7538)) ([ae57e1b](https://github.com/dnbexperience/eufemia/commit/ae57e1b8a29d905ff622bc0956f7e509971b7cb2))
* remove duplicated step in v11 migration guide ([#7517](https://github.com/dnbexperience/eufemia/issues/7517)) ([964e886](https://github.com/dnbexperience/eufemia/commit/964e886f26bad920d7a41180b901f2406bee626c))
* remove snake_case references ([#6501](https://github.com/dnbexperience/eufemia/issues/6501)) ([d80d743](https://github.com/dnbexperience/eufemia/commit/d80d743b89120be30ac00a6a1f6d411bf4e90d36))
* rename `React.Node` to `React.ReactNode` ([#5915](https://github.com/dnbexperience/eufemia/issues/5915)) ([a17494f](https://github.com/dnbexperience/eufemia/commit/a17494f9731c95b876a380687bd1430a2b61ad75))
* **SelectCountry:** fix countries type to use union type ([#7491](https://github.com/dnbexperience/eufemia/issues/7491)) ([9b01d35](https://github.com/dnbexperience/eufemia/commit/9b01d357eb247cbda5e696bb1cce0ee0ab16acc0))
* **SubmitButton:** fix variant type to use union type ([#7494](https://github.com/dnbexperience/eufemia/issues/7494)) ([993f579](https://github.com/dnbexperience/eufemia/commit/993f579130ad3d00790f604f63d7ce4cc80a82bb))
* **v11:** improve migration guide readability and accuracy ([#7596](https://github.com/dnbexperience/eufemia/issues/7596)) ([c4c5610](https://github.com/dnbexperience/eufemia/commit/c4c561019d70fd1b2b86000ad9becaa9530ee20f))
* **v11:** improve migration guide structure and add missing content ([#7401](https://github.com/dnbexperience/eufemia/issues/7401)) ([964fda3](https://github.com/dnbexperience/eufemia/commit/964fda3472c5b31c048ac8117a394758f0a16963))
* **v11:** improve v11-info.mdx readability for migration ([#7388](https://github.com/dnbexperience/eufemia/issues/7388)) ([2a1e914](https://github.com/dnbexperience/eufemia/commit/2a1e9142c713188d4094d9cb17b03df480e79df7))
* **Value.Composition:** fix maxWidth and gap types to use union types ([#7490](https://github.com/dnbexperience/eufemia/issues/7490)) ([fe6ff06](https://github.com/dnbexperience/eufemia/commit/fe6ff06b10dfc32404ab1cbb9104341319703fe5))
* **Value.Date:** fix variant type to use union type ([#7489](https://github.com/dnbexperience/eufemia/issues/7489)) ([57074dc](https://github.com/dnbexperience/eufemia/commit/57074dc535ff916be0125e59ef713088afd68801))


### :zap: Refactoring

* **Accordion:** design tokens for dnb and carnegie ([#7529](https://github.com/dnbexperience/eufemia/issues/7529)) ([706a501](https://github.com/dnbexperience/eufemia/commit/706a50110a991667c77c2b04d369d012d948daaa))
* **Accordion:** type callOnChange and callOnChangeHandler params ([#7410](https://github.com/dnbexperience/eufemia/issues/7410)) ([2f64153](https://github.com/dnbexperience/eufemia/commit/2f64153fde5e0ea25fe83e58a99a4980fb089c90))
* **Accordion:** type onInit callback with AccordionInstance ([#7405](https://github.com/dnbexperience/eufemia/issues/7405)) ([9eabca0](https://github.com/dnbexperience/eufemia/commit/9eabca0493b7e4bae4095adfc3fcc2d9436ef05a))
* add explicit radix to parseInt calls ([#7300](https://github.com/dnbexperience/eufemia/issues/7300)) ([c14dbab](https://github.com/dnbexperience/eufemia/commit/c14dbab7c267709f5501d12639f0c2f0e8aef143))
* align Input and Textarea index.ts export patterns ([#7296](https://github.com/dnbexperience/eufemia/issues/7296)) ([82112db](https://github.com/dnbexperience/eufemia/commit/82112db29ce707d407a8c8aa11daf209844ce721))
* **Anchor:** use design tokens ([#6874](https://github.com/dnbexperience/eufemia/issues/6874)) ([3efb393](https://github.com/dnbexperience/eufemia/commit/3efb393ad5c5d12d77f6d6956984a7ee1e8f5266))
* **Autocomplete:** rewrite to TypeScript ([#6617](https://github.com/dnbexperience/eufemia/issues/6617)) ([b1376a1](https://github.com/dnbexperience/eufemia/commit/b1376a17f57897a748089382544d0d1740664811))
* **Autocomplete:** type onSelect internal handler with DrawerListSelectEvent ([#7402](https://github.com/dnbexperience/eufemia/issues/7402)) ([bc2f1ef](https://github.com/dnbexperience/eufemia/commit/bc2f1efcb9d83541a12e0445acb86d8cdc9f8afe))
* **Badge:** use design tokens ([#6688](https://github.com/dnbexperience/eufemia/issues/6688)) ([7dd6c6b](https://github.com/dnbexperience/eufemia/commit/7dd6c6b8e8667dad943959ddddae886f54b47489)), closes [#6386](https://github.com/dnbexperience/eufemia/issues/6386)
* **Blockquote:** use design tokens ([#7581](https://github.com/dnbexperience/eufemia/issues/7581)) ([f11e483](https://github.com/dnbexperience/eufemia/commit/f11e483f2ce45e9faa7f4b336d1bbf5e8ecf38c4))
* **Button:** convert to TypeScript and remove propTypes ([#6848](https://github.com/dnbexperience/eufemia/issues/6848)) ([332ebca](https://github.com/dnbexperience/eufemia/commit/332ebcaf85816ab2e70b9c0d4214c13ea7ba9771))
* **Button:** improve TypeScript types ([#6887](https://github.com/dnbexperience/eufemia/issues/6887)) ([00a0e22](https://github.com/dnbexperience/eufemia/commit/00a0e221bdd499744428f1167cdcb6d14c3e07d3))
* **Button:** use design tokens ([#6916](https://github.com/dnbexperience/eufemia/issues/6916)) ([247730f](https://github.com/dnbexperience/eufemia/commit/247730fccdbddf416c448d250db119d27d4be134))
* **Card:** add support for scoped dark mode ([#7576](https://github.com/dnbexperience/eufemia/issues/7576)) ([7904dc6](https://github.com/dnbexperience/eufemia/commit/7904dc6ac5d010165413bbd60edf2a2b87aa0c49))
* **Card:** use design tokens ([#7253](https://github.com/dnbexperience/eufemia/issues/7253)) ([d555469](https://github.com/dnbexperience/eufemia/commit/d5554698d42724e607ced3296d90d0eca75dc47d))
* centralize z-index scale with CSS custom properties ([#7356](https://github.com/dnbexperience/eufemia/issues/7356)) ([73c6c95](https://github.com/dnbexperience/eufemia/commit/73c6c952aa6900014344b20137a706e336ac04cd))
* **Checkbox:** use design tokens ([#7515](https://github.com/dnbexperience/eufemia/issues/7515)) ([c2a5b7f](https://github.com/dnbexperience/eufemia/commit/c2a5b7f2a0f3a253921b2c517e2a7768cd37eb34))
* convert bodyScrollLock.js to TypeScript ([#6902](https://github.com/dnbexperience/eufemia/issues/6902)) ([4a3fa75](https://github.com/dnbexperience/eufemia/commit/4a3fa7516e6e3da70d6e61b2fedd7061a593b995))
* convert BuildInfo and BuildInfoData to TypeScript ([#6906](https://github.com/dnbexperience/eufemia/issues/6906)) ([a154493](https://github.com/dnbexperience/eufemia/commit/a1544931f0d67e7c0bfa60dd84a65ff9085453a3))
* convert component-helper-legacy.js to TypeScript ([#6909](https://github.com/dnbexperience/eufemia/issues/6909)) ([baa2909](https://github.com/dnbexperience/eufemia/commit/baa29095eb8a565917b533b580c1bd4917d3b3cf))
* convert DrawerList from class to functional component ([#7018](https://github.com/dnbexperience/eufemia/issues/7018)) ([93e059b](https://github.com/dnbexperience/eufemia/commit/93e059b50049f2c338683f52ab43324e41091f63))
* convert Dropdown from class to functional component ([#6918](https://github.com/dnbexperience/eufemia/issues/6918)) ([d4f7037](https://github.com/dnbexperience/eufemia/commit/d4f7037e06cb4a3f3301be1b243fdb3fc01ba8d8))
* convert FormStatus from class to functional component ([#6935](https://github.com/dnbexperience/eufemia/issues/6935)) ([5d1b472](https://github.com/dnbexperience/eufemia/commit/5d1b472022175a84839da21459dc12bc2a461443))
* convert GlobalStatusProvider.js to TypeScript ([#6908](https://github.com/dnbexperience/eufemia/issues/6908)) ([edbb010](https://github.com/dnbexperience/eufemia/commit/edbb0101f3d08bc7e1ac66c72e6c35e14f0db267))
* convert helper & error-helper.js to TypeScript  ([#6900](https://github.com/dnbexperience/eufemia/issues/6900)) ([9ad2ef3](https://github.com/dnbexperience/eufemia/commit/9ad2ef325d1755e4bc392cb7c5bb2c919184c819))
* convert Modal and ModalContent to functional components ([#6938](https://github.com/dnbexperience/eufemia/issues/6938)) ([772fb33](https://github.com/dnbexperience/eufemia/commit/772fb337b34377a3ef45ddd0d35b8e467e3cab6f))
* convert NumberFormat from class to functional component ([#6919](https://github.com/dnbexperience/eufemia/issues/6919)) ([7342c55](https://github.com/dnbexperience/eufemia/commit/7342c55b543aca7c53f38af496a7ffbfe9a64ecd))
* convert Pagination class components to functional components ([#6917](https://github.com/dnbexperience/eufemia/issues/6917)) ([86d4cad](https://github.com/dnbexperience/eufemia/commit/86d4cadf0a375c4b6ad805130b6971c2f41d65e9))
* convert PaginationContext and InfinityScroller to TypeScript  ([#6907](https://github.com/dnbexperience/eufemia/issues/6907)) ([a52acd1](https://github.com/dnbexperience/eufemia/commit/a52acd14bad370c6c128f9d73f9c0bd3f110e5b5))
* convert payment-card icon files to TypeScript ([#6903](https://github.com/dnbexperience/eufemia/issues/6903)) ([bc7e5ad](https://github.com/dnbexperience/eufemia/commit/bc7e5ad9e968bf79581e6ed6599d7a65b8a11af7))
* convert payment-card util files to TypeScript ([#6915](https://github.com/dnbexperience/eufemia/issues/6915)) ([d186cba](https://github.com/dnbexperience/eufemia/commit/d186cba4efef2122ffd88cb2b029f8337936d337))
* convert Radio and RadioGroup to functional components ([#6914](https://github.com/dnbexperience/eufemia/issues/6914)) ([65f6f19](https://github.com/dnbexperience/eufemia/commit/65f6f19375400475827cfe57f67031219b304bbe))
* convert stub re-export files to TypeScript ([#6905](https://github.com/dnbexperience/eufemia/issues/6905)) ([e58210a](https://github.com/dnbexperience/eufemia/commit/e58210a1c1b70a09afc7384a26280a77340b8c2c))
* convert Textarea from class to functional component ([#6937](https://github.com/dnbexperience/eufemia/issues/6937)) ([60b9acb](https://github.com/dnbexperience/eufemia/commit/60b9acbd91ec18a6798f4438770085242cc078f6))
* convert ToggleButton and ToggleButtonGroup to functional components ([#6913](https://github.com/dnbexperience/eufemia/issues/6913)) ([5c166e0](https://github.com/dnbexperience/eufemia/commit/5c166e0493b7a42a1f13cd2284e3a8880b45c213))
* **css:** remove deprecated vendor prefixes and replace clip with clip-path ([#6954](https://github.com/dnbexperience/eufemia/issues/6954)) ([686c147](https://github.com/dnbexperience/eufemia/commit/686c1476f1a87211e210900dd6951c2a8c5ed00c))
* **Dialog:** use design tokens and add Carnegie theme ([#7357](https://github.com/dnbexperience/eufemia/issues/7357)) ([eae114e](https://github.com/dnbexperience/eufemia/commit/eae114e2a06cace8dc045a8cd940078f7ccd5ac2))
* **DrawerListHelpers:** remove propTypes exports ([#6841](https://github.com/dnbexperience/eufemia/issues/6841)) ([bc38302](https://github.com/dnbexperience/eufemia/commit/bc38302204334ec31951f3e170b3e0b7ace19c62))
* **DrawerListProvider:** convert from class to functional component ([#7309](https://github.com/dnbexperience/eufemia/issues/7309)) ([886e112](https://github.com/dnbexperience/eufemia/commit/886e1123dc5b517ebf876fe27818c582e9c3f002))
* **Dropdown, Autocomplete:** use design tokens ([#7533](https://github.com/dnbexperience/eufemia/issues/7533)) ([29b04dc](https://github.com/dnbexperience/eufemia/commit/29b04dc01310909f9482dda610fed14adc250899))
* **Dropdown:** convert to TypeScript and remove propTypes ([#6847](https://github.com/dnbexperience/eufemia/issues/6847)) ([095ca7a](https://github.com/dnbexperience/eufemia/commit/095ca7af621066bc990f79f98eacacaf57ee3744))
* **Dropdown:** improve TypeScript types ([#6888](https://github.com/dnbexperience/eufemia/issues/6888)) ([a81b396](https://github.com/dnbexperience/eufemia/commit/a81b396def1a5480d5ddf90a5e49d0c1af173a9c))
* **Dropdown:** type onOpen and onClose event callbacks ([#7400](https://github.com/dnbexperience/eufemia/issues/7400)) ([27059d2](https://github.com/dnbexperience/eufemia/commit/27059d24a6ef243350ad7f48983a24c05c616d79))
* extract shared `FormStatusBaseProps` type to replace duplicated status prop definitions ([#6823](https://github.com/dnbexperience/eufemia/issues/6823)) ([dbf26b5](https://github.com/dnbexperience/eufemia/commit/dbf26b5e267796428b565ce9cf6448896f2009bc))
* extract useCombinedRef hook to deduplicate ref-combining pattern ([#7328](https://github.com/dnbexperience/eufemia/issues/7328)) ([f4bee59](https://github.com/dnbexperience/eufemia/commit/f4bee591eaf3ed31fe014e5d2c5a5bc4c924dfda))
* **FormLabel:** use design tokens ([#7363](https://github.com/dnbexperience/eufemia/issues/7363)) ([11846f4](https://github.com/dnbexperience/eufemia/commit/11846f459c78d2fefbfc13586aca0e4e3b897c0b))
* **forms:** prefix bare AllProps type exports with component name ([#7319](https://github.com/dnbexperience/eufemia/issues/7319)) ([34f6468](https://github.com/dnbexperience/eufemia/commit/34f6468777d0f5a55ce0aea431f1122c0ef531ab))
* **Forms:** split useFieldProps into sub-hooks ([#7042](https://github.com/dnbexperience/eufemia/issues/7042)) ([63eb485](https://github.com/dnbexperience/eufemia/commit/63eb485606d9cdf25e47a861b16a2a5acd9de2f0)), closes [#6942](https://github.com/dnbexperience/eufemia/issues/6942)
* **FormStatus:** convert to TypeScript and remove propTypes ([#6849](https://github.com/dnbexperience/eufemia/issues/6849)) ([398c516](https://github.com/dnbexperience/eufemia/commit/398c51661ba047d3752cf7c3d3c5ca73dfb9cb59))
* **FormStatus:** improve TypeScript types ([#6886](https://github.com/dnbexperience/eufemia/issues/6886)) ([fb397ca](https://github.com/dnbexperience/eufemia/commit/fb397ca12db2e8c7f37d9ae9b3ff840035826d5a))
* **FormStatus:** type icon props with React.SVGProps ([#7414](https://github.com/dnbexperience/eufemia/issues/7414)) ([3322aa1](https://github.com/dnbexperience/eufemia/commit/3322aa1997d3d41e8509e3a1df201421fbd3e751))
* **FormStatus:** use design tokens ([#7049](https://github.com/dnbexperience/eufemia/issues/7049)) ([b426649](https://github.com/dnbexperience/eufemia/commit/b426649e0cc913ad6b1e84084235bcc4546aeaf5))
* **GlobalError:** use design tokens ([#7259](https://github.com/dnbexperience/eufemia/issues/7259)) ([66a7257](https://github.com/dnbexperience/eufemia/commit/66a72572307f530b49e9fff673b7b73a2140ad02))
* **GlobalStatus, GlobalStatusController:** convert to TypeScript and remove propTypes ([#6850](https://github.com/dnbexperience/eufemia/issues/6850)) ([f269963](https://github.com/dnbexperience/eufemia/commit/f2699630a9ec458cb218c1512ba2192635688b98))
* **GlobalStatus:** convert from class to functional component ([#7311](https://github.com/dnbexperience/eufemia/issues/7311)) ([0fe7691](https://github.com/dnbexperience/eufemia/commit/0fe76919a5968b82a1c4c1b3a04ba4fafe9fa189))
* **GlobalStatus:** improve TypeScript types ([#6889](https://github.com/dnbexperience/eufemia/issues/6889)) ([4f5313e](https://github.com/dnbexperience/eufemia/commit/4f5313e940a676dfd324aaea7dfd99565662cf0e))
* **GlobalStatusProvider:** replace [key: string]: any with unknown ([#7420](https://github.com/dnbexperience/eufemia/issues/7420)) ([289168e](https://github.com/dnbexperience/eufemia/commit/289168e9c81dc775be889928a73d459fbc401c19))
* **GlobalStatus:** type event callbacks with GlobalStatusResult ([#7404](https://github.com/dnbexperience/eufemia/issues/7404)) ([87ad9d8](https://github.com/dnbexperience/eufemia/commit/87ad9d8c3ecbb601a922f88beaa2ef709eded5c2))
* **GlobalStatus:** use design tokens ([#7054](https://github.com/dnbexperience/eufemia/issues/7054)) ([d8e9c4b](https://github.com/dnbexperience/eufemia/commit/d8e9c4b8aa4e5c3b8ce42a7507726fb5073e9888))
* **Img:** use design tokens ([#7584](https://github.com/dnbexperience/eufemia/issues/7584)) ([0b8fd4e](https://github.com/dnbexperience/eufemia/commit/0b8fd4e92655b9173ebcff695c0268332b642e5a))
* **InfinityMarker:** convert from class to function component ([#6862](https://github.com/dnbexperience/eufemia/issues/6862)) ([fe4e974](https://github.com/dnbexperience/eufemia/commit/fe4e9748741d9f4a96bf1b0c53fbd3537c765dab))
* **Input:** convert from class to functional components (including InputSubmitButton) ([#6936](https://github.com/dnbexperience/eufemia/issues/6936)) ([01c166c](https://github.com/dnbexperience/eufemia/commit/01c166c2b4e0974c8df5cac413e826860fce1d34))
* **Input:** convert to TypeScript and remove propTypes ([#6851](https://github.com/dnbexperience/eufemia/issues/6851)) ([02fbad3](https://github.com/dnbexperience/eufemia/commit/02fbad35e0cd78b0ac6847809e639243cefa0157))
* **Input:** design tokens and carnegie theme ([#7254](https://github.com/dnbexperience/eufemia/issues/7254)) ([3dfc1fe](https://github.com/dnbexperience/eufemia/commit/3dfc1fed1f21232e58e63d9a0fafd35d60c411ea))
* **Input:** improve TypeScript types ([#6883](https://github.com/dnbexperience/eufemia/issues/6883)) ([8ca78ad](https://github.com/dnbexperience/eufemia/commit/8ca78ada5f036b01dbec6dd44cdd63ba21d2dfc9))
* **Label:** use design tokens ([#7586](https://github.com/dnbexperience/eufemia/issues/7586)) ([22a871c](https://github.com/dnbexperience/eufemia/commit/22a871cc4657e53200cae4ee155d404effd074ce))
* **Lists:** add support for design tokens ([#7535](https://github.com/dnbexperience/eufemia/issues/7535)) ([1a36988](https://github.com/dnbexperience/eufemia/commit/1a369885f2df2329b52e6e2faa402de24c439127))
* **List:** use design tokens ([#7631](https://github.com/dnbexperience/eufemia/issues/7631)) ([350739b](https://github.com/dnbexperience/eufemia/commit/350739b5a3a74dec8797aab2f2ad741d257e9cea))
* migrate Autocomplete from class to functional component ([#6944](https://github.com/dnbexperience/eufemia/issues/6944)) ([a9dfae7](https://github.com/dnbexperience/eufemia/commit/a9dfae71b03d92ce6919d9d9bb88366f3316e09d))
* migrate Autocomplete wrapper from class to functional component ([#6911](https://github.com/dnbexperience/eufemia/issues/6911)) ([b1c4a38](https://github.com/dnbexperience/eufemia/commit/b1c4a38380da3fdf1fa287a2d75f00b343761e56))
* migrate Button from class component to functional component ([#6912](https://github.com/dnbexperience/eufemia/issues/6912)) ([97a740d](https://github.com/dnbexperience/eufemia/commit/97a740d5a879df74362c544b344ceaad31046e2f))
* migrate GlobalStatusController and GlobalStatusRemove to functional components ([#6934](https://github.com/dnbexperience/eufemia/issues/6934)) ([6f0dbc0](https://github.com/dnbexperience/eufemia/commit/6f0dbc0584737bcf4cef4fd630c68a6f38540bb1))
* migrate simple Pagination components to functional components ([#6910](https://github.com/dnbexperience/eufemia/issues/6910)) ([fc14b19](https://github.com/dnbexperience/eufemia/commit/fc14b19c3d8cb1bd10df7bbf81b22eafd55a6844))
* **Modal, Dialog, Drawer:** add support for design tokens ([#7518](https://github.com/dnbexperience/eufemia/issues/7518)) ([cabc30a](https://github.com/dnbexperience/eufemia/commit/cabc30a4d7aa7c7374c2a3acfd1c55d775505479))
* **ModalHeaderBar:** convert from class to function component ([#6856](https://github.com/dnbexperience/eufemia/issues/6856)) ([40b7248](https://github.com/dnbexperience/eufemia/commit/40b72489f4073ebde08ea638b75eec2c2a0bbc27))
* **ModalHeader:** convert from class to function component ([#6853](https://github.com/dnbexperience/eufemia/issues/6853)) ([24473ea](https://github.com/dnbexperience/eufemia/commit/24473eafd36212c4a9dc99902ad90e9034b5e568))
* **ModalRoot:** convert from class to function component ([#6854](https://github.com/dnbexperience/eufemia/issues/6854)) ([52bda4c](https://github.com/dnbexperience/eufemia/commit/52bda4cb8c721d99f1b227d0f52404a1f423be49))
* **Modal:** type modal stack entries and callback instances ([#7408](https://github.com/dnbexperience/eufemia/issues/7408)) ([b7b11ae](https://github.com/dnbexperience/eufemia/commit/b7b11aecf47aa852609e06ab63756500ae4b82b1))
* modernize ref handling for React 19 compatibility ([#6797](https://github.com/dnbexperience/eufemia/issues/6797)) ([0bd3517](https://github.com/dnbexperience/eufemia/commit/0bd3517a68815cec14a670bf64ad9b24af567c50))
* **Pagination:** convert from class to function component ([#6861](https://github.com/dnbexperience/eufemia/issues/6861)) ([ac85831](https://github.com/dnbexperience/eufemia/commit/ac8583167d9de76bd498d3575829c07b3cef41f2))
* **Pagination:** convert to TypeScript and remove propTypes ([#6852](https://github.com/dnbexperience/eufemia/issues/6852)) ([e4900e2](https://github.com/dnbexperience/eufemia/commit/e4900e254b5648fba67ffdc8e734a228f1e5b5f4))
* **PaginationHelpers:** convert to TypeScript and remove propTypes ([#6845](https://github.com/dnbexperience/eufemia/issues/6845)) ([f35b65a](https://github.com/dnbexperience/eufemia/commit/f35b65aefd2b2c5074ddd563567bc9fe0b0b5cf7))
* **Pagination:** improve TypeScript types ([#6882](https://github.com/dnbexperience/eufemia/issues/6882)) ([5d35932](https://github.com/dnbexperience/eufemia/commit/5d35932e6b0393a0eb1c2d71a2cb9ebd423fe357))
* **Pagination:** type internal CallbackBufferEntry params ([#7406](https://github.com/dnbexperience/eufemia/issues/7406)) ([f22e380](https://github.com/dnbexperience/eufemia/commit/f22e380c922f0ef92f3a46fabd1807c552618742))
* **PaymentCard:** convert to TypeScript and remove propTypes ([#6842](https://github.com/dnbexperience/eufemia/issues/6842)) ([2626a65](https://github.com/dnbexperience/eufemia/commit/2626a6583ffc7c7958098d24691f82d6ef77ca25))
* **PaymentCard:** replace daggy tagged sums with TypeScript discriminated unions ([#7430](https://github.com/dnbexperience/eufemia/issues/7430)) ([08c32bd](https://github.com/dnbexperience/eufemia/commit/08c32bd18cf182aaf1d4f5d436f6a4090884d052))
* **portal:** convert .js files to .ts/.tsx in dnb-design-system-portal/src ([#6899](https://github.com/dnbexperience/eufemia/issues/6899)) ([e140ad9](https://github.com/dnbexperience/eufemia/commit/e140ad944c9f886cbc60722b22f3f57064ca155b))
* **Radio, RadioGroup:** convert to TypeScript and remove propTypes ([#6855](https://github.com/dnbexperience/eufemia/issues/6855)) ([b5e014c](https://github.com/dnbexperience/eufemia/commit/b5e014cdf8dd443db9dcec9b8fbe362aae48f1d3))
* **Radio:** improve TypeScript types ([#6884](https://github.com/dnbexperience/eufemia/issues/6884)) ([2df450c](https://github.com/dnbexperience/eufemia/commit/2df450c44e9cf9abcd5f090ea9bb69934aca87e2))
* **Radio:** use design tokens ([#7394](https://github.com/dnbexperience/eufemia/issues/7394)) ([6f0e6d5](https://github.com/dnbexperience/eufemia/commit/6f0e6d5f38e9c33718ae2daabd235270a2092fc6))
* remove [@ts-nocheck](https://github.com/ts-nocheck) and add proper TypeScript types to NumberUtils ([#7514](https://github.com/dnbexperience/eufemia/issues/7514)) ([2dab50c](https://github.com/dnbexperience/eufemia/commit/2dab50c661df013eeaffdf6323b11ea9a9e8d067))
* remove `_innerRef` internal pattern from class components ([#6835](https://github.com/dnbexperience/eufemia/issues/6835)) ([6cbc542](https://github.com/dnbexperience/eufemia/commit/6cbc542a9148ee4be8a4121babfe1be80414639a))
* remove forwardRef from FormStatus (React 19) ([#7317](https://github.com/dnbexperience/eufemia/issues/7317)) ([80428a5](https://github.com/dnbexperience/eufemia/commit/80428a56a88fd24b4fa36890a8dec32a33659b36))
* remove InputMaskedHooks backward-compat re-export shim ([#7325](https://github.com/dnbexperience/eufemia/issues/7325)) ([f15585c](https://github.com/dnbexperience/eufemia/commit/f15585c02d0cee199fa59de623e6468fdf3a528d))
* remove unused SCSS mixins extendFocusRing and componentReset ([#7293](https://github.com/dnbexperience/eufemia/issues/7293)) ([49971c7](https://github.com/dnbexperience/eufemia/commit/49971c73e4f5de2fc5a6d6c6009110a5f573a47b))
* rename extendPropsWithContextInClassComponent to extendExistingPropsWithContext ([#7485](https://github.com/dnbexperience/eufemia/issues/7485)) ([7ce1f78](https://github.com/dnbexperience/eufemia/commit/7ce1f789adadf9c4732d0c5de4c3e37e5038e9d1))
* replace `as any` type assertions with specific types and add typed useRef ([#6824](https://github.com/dnbexperience/eufemia/issues/6824)) ([69c7e0d](https://github.com/dnbexperience/eufemia/commit/69c7e0db0c74ac60c932e870b85adffe13640f00))
* replace Context.Consumer with useContext hook ([#7347](https://github.com/dnbexperience/eufemia/issues/7347)) ([0e686e4](https://github.com/dnbexperience/eufemia/commit/0e686e4b6cc0fb746cae7bfc7ad86d696251af9a))
* replace Context.Provider with Context (React 19) ([#7327](https://github.com/dnbexperience/eufemia/issues/7327)) ([35bfe85](https://github.com/dnbexperience/eufemia/commit/35bfe854213b35bb54d22a3124e06679f0dc1fac))
* replace deprecated Context.Provider with direct Context rendering ([#6817](https://github.com/dnbexperience/eufemia/issues/6817)) ([640b225](https://github.com/dnbexperience/eufemia/commit/640b225027b9f926c08d8f161975dac5b0b6b4f2))
* replace gulp with plain Node.js scripts in build pipeline ([#6956](https://github.com/dnbexperience/eufemia/issues/6956)) ([0e23255](https://github.com/dnbexperience/eufemia/commit/0e232551a363bd88af240db8effeec69886b86e9))
* replace React.Children with array patterns where safe ([#7308](https://github.com/dnbexperience/eufemia/issues/7308)) ([be20c42](https://github.com/dnbexperience/eufemia/commit/be20c42f56103ed9bf0a6a140ce04b1d299f8ba5))
* replace React.cloneElement with composition patterns ([#6810](https://github.com/dnbexperience/eufemia/issues/6810)) ([5d7149b](https://github.com/dnbexperience/eufemia/commit/5d7149ba7869ea9355a09ade5a63faa82e0725fc))
* **Section:** use design tokens ([#7188](https://github.com/dnbexperience/eufemia/issues/7188)) ([5ca031a](https://github.com/dnbexperience/eufemia/commit/5ca031ac690dbcdbfccc45f2e37645bf9a395c55))
* **Skeleton:** convert to TypeScript and remove propTypes ([#6843](https://github.com/dnbexperience/eufemia/issues/6843)) ([64a3fb9](https://github.com/dnbexperience/eufemia/commit/64a3fb998804df148247f34bcbcb05ce2796c371))
* **SpacingHelper:** convert to TypeScript and remove spacingPropTypes ([#6844](https://github.com/dnbexperience/eufemia/issues/6844)) ([d0aca24](https://github.com/dnbexperience/eufemia/commit/d0aca246c8f019bbbd92b21e257dbce2d005b417))
* **Stat:** use design tokens ([#7638](https://github.com/dnbexperience/eufemia/issues/7638)) ([3979d83](https://github.com/dnbexperience/eufemia/commit/3979d83284b3ac7cf00c481470013fb14a22d069))
* **Switch:** use design tokens ([#7386](https://github.com/dnbexperience/eufemia/issues/7386)) ([267c520](https://github.com/dnbexperience/eufemia/commit/267c520005ed20c60ea8fe8c82e5c4c2f10a209d))
* **TabsContentWrapper:** convert from class to function component ([#6859](https://github.com/dnbexperience/eufemia/issues/6859)) ([41951c8](https://github.com/dnbexperience/eufemia/commit/41951c85da43177d7921d1291de8348f55cf282c))
* **Tabs:** convert from class to functional component ([#7310](https://github.com/dnbexperience/eufemia/issues/7310)) ([f600bf0](https://github.com/dnbexperience/eufemia/commit/f600bf0963b2428a8a387bb21ea0207d9411b4a0))
* **Tabs:** type event handler parameters ([#7413](https://github.com/dnbexperience/eufemia/issues/7413)) ([19e0fa8](https://github.com/dnbexperience/eufemia/commit/19e0fa8f4fc7535e8729cf5de04ff99407ad5d8a))
* **Textarea:** convert to TypeScript and remove propTypes ([#6857](https://github.com/dnbexperience/eufemia/issues/6857)) ([3a15ef3](https://github.com/dnbexperience/eufemia/commit/3a15ef356b43a0862dd3324835d110bdfebb4f68))
* **Textarea:** improve TypeScript types ([#6885](https://github.com/dnbexperience/eufemia/issues/6885)) ([23b6ab2](https://github.com/dnbexperience/eufemia/commit/23b6ab2ee873e4f223bcbb3f01b4341cb4290a14))
* **Textarea:** use design tokens ([#7031](https://github.com/dnbexperience/eufemia/issues/7031)) ([ca4760f](https://github.com/dnbexperience/eufemia/commit/ca4760f3cd8dd673d4a8b36d98966aabf8a9dc99))
* **TextCounter:** use design tokens ([#7396](https://github.com/dnbexperience/eufemia/issues/7396)) ([914e1a7](https://github.com/dnbexperience/eufemia/commit/914e1a7bcfbb8d3a89434764b60a0688769fda13))
* **TextMask:** convert from class to function component ([#6858](https://github.com/dnbexperience/eufemia/issues/6858)) ([999c3c3](https://github.com/dnbexperience/eufemia/commit/999c3c3ce7b6c6747ba189cc1cc8d4943aa06a32))
* **Theme:** rename `Theme.Provider` to `Theme.Context` as well as `darkBackground` to `surface="dark"` ([#7030](https://github.com/dnbexperience/eufemia/issues/7030)) ([3151a9a](https://github.com/dnbexperience/eufemia/commit/3151a9a87fcd22174efe559548b6cb14a59f90f2))
* **ToggleButton:** type group context values with ToggleButtonValue ([#7409](https://github.com/dnbexperience/eufemia/issues/7409)) ([62a2b14](https://github.com/dnbexperience/eufemia/commit/62a2b14b9a5f136bd5bdf265f924f2c13a3e2c71))
* **Tooltip:** use design tokens ([#7378](https://github.com/dnbexperience/eufemia/issues/7378)) ([0849be6](https://github.com/dnbexperience/eufemia/commit/0849be65199900ebaa49f1fce9c2ae5d8d3072f9)), closes [#7381](https://github.com/dnbexperience/eufemia/issues/7381)
* **Typography:** use design tokens for headings and paragraphs ([#7403](https://github.com/dnbexperience/eufemia/issues/7403)) ([c9bb2cb](https://github.com/dnbexperience/eufemia/commit/c9bb2cb48a54c7e95eef56e4d5e30d0ba9123062)), closes [#7393](https://github.com/dnbexperience/eufemia/issues/7393)
* unify component marker pattern with `withComponentMarkers` helper ([#6923](https://github.com/dnbexperience/eufemia/issues/6923)) ([2f00961](https://github.com/dnbexperience/eufemia/commit/2f009610b131be5658ae85a7aa53de9a517bcc39))
* unify duplicate NumberFormatCurrencyPosition type ([#7039](https://github.com/dnbexperience/eufemia/issues/7039)) ([98e2a2e](https://github.com/dnbexperience/eufemia/commit/98e2a2e641f801b421aa4ac4d592e2b624a4181f))


### :bug: Bug Fixes

* add `| null` to useRef type params for React 19 compatibility ([#6795](https://github.com/dnbexperience/eufemia/issues/6795)) ([dee7508](https://github.com/dnbexperience/eufemia/commit/dee750835125253c5d681dc318b2c128221ae701))
* **Autocomplete:** prevent dropdown from reopening after Enter key selection ([#7628](https://github.com/dnbexperience/eufemia/issues/7628)) ([2f23c13](https://github.com/dnbexperience/eufemia/commit/2f23c132d0d2447b847e18311c7039557f4e047e))
* broken icon size detection in production builds ([#6881](https://github.com/dnbexperience/eufemia/issues/6881)) ([aff06bb](https://github.com/dnbexperience/eufemia/commit/aff06bb344012d8dfb00f9c4cdaaf228871eacae))
* **Button, Skeleton, PaymentCard, Pagination:** preserve defaultProps behavior for undefined values ([#6880](https://github.com/dnbexperience/eufemia/issues/6880)) ([9699f96](https://github.com/dnbexperience/eufemia/commit/9699f96b15a28c9ba0a9b22b4f6086e94364b257)), closes [#6792](https://github.com/dnbexperience/eufemia/issues/6792)
* **DatePicker, Field.Date:** align cancel behavior with DatePicker ([#7641](https://github.com/dnbexperience/eufemia/issues/7641)) ([b862f99](https://github.com/dnbexperience/eufemia/commit/b862f9965d6a20d861d59cd4599b1e87982c3649))
* **DatePicker:** align popover arrow styling with DatePicker container ([#7625](https://github.com/dnbexperience/eufemia/issues/7625)) ([2d3f683](https://github.com/dnbexperience/eufemia/commit/2d3f683d8c85a4419a90cf9610b6bedabdaa46d7))
* **DrawerList:** prevent value reset on blur for lazy-loaded data ([#7624](https://github.com/dnbexperience/eufemia/issues/7624)) ([1f3749e](https://github.com/dnbexperience/eufemia/commit/1f3749eba19126aa29128666a64904356f3f14e2))
* **DrawerList:** replace global isOpen variable with per-instance ref ([#7645](https://github.com/dnbexperience/eufemia/issues/7645)) ([f59ac2a](https://github.com/dnbexperience/eufemia/commit/f59ac2a35cca277739a5af5ab2313a7265f0438f))
* **DrawerList:** should refresh scroll observer on direction change or search results change ([#6397](https://github.com/dnbexperience/eufemia/issues/6397)) ([ae6c789](https://github.com/dnbexperience/eufemia/commit/ae6c78947141d7f123b9a30e1758afeeeb1fff39))
* **Dropdown:** correct outline padding on focus and error state ([#7003](https://github.com/dnbexperience/eufemia/issues/7003)) ([c92f532](https://github.com/dnbexperience/eufemia/commit/c92f5320851417fc70957ab5df329e92e1829bb2))
* **FormStatus:** remove loose string/boolean from FormStatusState type ([#7399](https://github.com/dnbexperience/eufemia/issues/7399)) ([6ab75cb](https://github.com/dnbexperience/eufemia/commit/6ab75cbf5bb8f37ff6e0cbbb79943ae5ddad52e9))
* **getTranslation:** prevent context corruption after unmounting ([#6769](https://github.com/dnbexperience/eufemia/issues/6769)) ([36299c0](https://github.com/dnbexperience/eufemia/commit/36299c04caff6b80b001e962b277d7330059b5c7))
* **GlobalStatus:** prevent unintended visibility when show defaults to auto ([#7502](https://github.com/dnbexperience/eufemia/issues/7502)) ([8513c25](https://github.com/dnbexperience/eufemia/commit/8513c25c5b56a039ba17dfece57a2843f227e948))
* **Icon:** replace alt='no-alt' with empty string for data:image icons ([#7353](https://github.com/dnbexperience/eufemia/issues/7353)) ([743e3bc](https://github.com/dnbexperience/eufemia/commit/743e3bc9851922c0f82fbdc9a32fae3e5029d461))
* **InfoCard:** add context.InfoCard merge to extendPropsWithContext ([#6713](https://github.com/dnbexperience/eufemia/issues/6713)) ([57176e2](https://github.com/dnbexperience/eufemia/commit/57176e220b4a868bccb71f8e87c49f792ad6c3eb))
* **List:** inherit card border-radius on first/last items when used in Card without scroll view ([#7348](https://github.com/dnbexperience/eufemia/issues/7348)) ([986c3cd](https://github.com/dnbexperience/eufemia/commit/986c3cde071c78b90a4d0e80c458aff60b69e224))
* **Portal:** replace hardcoded [#222](https://github.com/dnbexperience/eufemia/issues/222) with --color-black-80 token in CodeBlock ([#7374](https://github.com/dnbexperience/eufemia/issues/7374)) ([636b9d6](https://github.com/dnbexperience/eufemia/commit/636b9d6400b667a583543a5268a48e22a04727cc))
* **Portal:** replace hardcoded box-shadow color with token in ListAllIcons ([#7372](https://github.com/dnbexperience/eufemia/issues/7372)) ([c82da7d](https://github.com/dnbexperience/eufemia/commit/c82da7d8407074d433926196e8eb0f69115cdf3f))
* **Portal:** replace hardcoded white with --color-white token in SearchBar ([#7368](https://github.com/dnbexperience/eufemia/issues/7368)) ([43405d8](https://github.com/dnbexperience/eufemia/commit/43405d8041dfb2ed37eac33ced61ba8e9159ecd7))
* **Portal:** replace hardcoded white with --color-white token in SidebarMenu badge ([#7373](https://github.com/dnbexperience/eufemia/issues/7373)) ([9f4963c](https://github.com/dnbexperience/eufemia/commit/9f4963ca1e85c82535ea991261a9238f68092c7b))
* **Portal:** replace hardcoded white with --color-white token in SidebarMenu expand button ([#7375](https://github.com/dnbexperience/eufemia/issues/7375)) ([d496854](https://github.com/dnbexperience/eufemia/commit/d49685479beed4b873067ea5e815302de6f4b86a))
* preserve function refs in validateDOMAttributes ([#6811](https://github.com/dnbexperience/eufemia/issues/6811)) ([09d8214](https://github.com/dnbexperience/eufemia/commit/09d821454e154e5a72490813c98a30f00c6a13be))
* rename remaining warn→warning and info→information status references ([#7218](https://github.com/dnbexperience/eufemia/issues/7218)) ([52d7838](https://github.com/dnbexperience/eufemia/commit/52d7838046655a36a415298360ca31098664019b)), closes [#6522](https://github.com/dnbexperience/eufemia/issues/6522) [#7174](https://github.com/dnbexperience/eufemia/issues/7174)
* replace ansi-html with ansi-html-community (CVE-2021-23424) ([#6783](https://github.com/dnbexperience/eufemia/issues/6783)) ([ba8003e](https://github.com/dnbexperience/eufemia/commit/ba8003e53b372d2f11dc370df739370121573522))
* replace any with proper Daggy types in payment-card ([#7415](https://github.com/dnbexperience/eufemia/issues/7415)) ([9f4cb38](https://github.com/dnbexperience/eufemia/commit/9f4cb388acc39803407ade1cd3141be515210548))
* replace any[] callback with React.ElementType in Autocomplete ([#7422](https://github.com/dnbexperience/eufemia/issues/7422)) ([6375e8c](https://github.com/dnbexperience/eufemia/commit/6375e8cfa38ac0bb2700a435c830c7e2f0b29e9e))
* replace Map<string, any> with proper self-referential type in IsolatedStyleScope ([#7423](https://github.com/dnbexperience/eufemia/issues/7423)) ([4c2026d](https://github.com/dnbexperience/eufemia/commit/4c2026d40e8f5807ae5ac6d7b0712dd05404bb27))
* standardize value formatting in JSDoc and Docs.ts files ([#7510](https://github.com/dnbexperience/eufemia/issues/7510)) ([8497e88](https://github.com/dnbexperience/eufemia/commit/8497e8888dfa1c0bd547935da28a65a58da0bad3))
* **StyleIsolation:** handle `:global(html[attr]) &` when used in CSS module ([#7483](https://github.com/dnbexperience/eufemia/issues/7483)) ([e20ea53](https://github.com/dnbexperience/eufemia/commit/e20ea531f5e4003332d5fe9a24e5029adb979e1c)), closes [#7429](https://github.com/dnbexperience/eufemia/issues/7429)
* **SubmitIndicator:** replace innerHTML with safe DOM API ([#6955](https://github.com/dnbexperience/eufemia/issues/6955)) ([336a4f2](https://github.com/dnbexperience/eufemia/commit/336a4f24bd26f67be3e627d967d7478c0a6ca159))
* **Switch, DatePicker:** add missing `_formElement` ([#6711](https://github.com/dnbexperience/eufemia/issues/6711)) ([b8cbcb6](https://github.com/dnbexperience/eufemia/commit/b8cbcb655e33dcd960d40f967b39170767286e87))
* **Tabs:** fix false overflow detection when tab title contains extra elements ([#7508](https://github.com/dnbexperience/eufemia/issues/7508)) ([37e2e28](https://github.com/dnbexperience/eufemia/commit/37e2e28ddb6bca4d15c5ba47abb5ed88429b7f02))
* **TermDefinition:** add `extendPropsWithContext` ([#6714](https://github.com/dnbexperience/eufemia/issues/6714)) ([89dc267](https://github.com/dnbexperience/eufemia/commit/89dc267f2a80a4063905ab73aa787aa1d3961ee0))
* **Upload:** add pickFormElementProps to context extension ([#6712](https://github.com/dnbexperience/eufemia/issues/6712)) ([f531665](https://github.com/dnbexperience/eufemia/commit/f53166528905545b21e05edbf17e23829755d7c4))

## [10.104.1](https://github.com/dnbexperience/eufemia/compare/v10.104.0...v10.104.1) (2026-04-20)


### :bug: Bug Fixes

* **List:** align grid-template-areas column count with grid columns ([#7578](https://github.com/dnbexperience/eufemia/issues/7578)) ([0f02685](https://github.com/dnbexperience/eufemia/commit/0f02685427c8a85d3bad33ab0cc3d8e0d15306b7))

## [10.104.0](https://github.com/dnbexperience/eufemia/compare/v10.103.0...v10.104.0) (2026-04-17)


### :sparkles: Features

* **List:** add `to`, `element`and `elementProps` to List.Item.Action ([#7337](https://github.com/dnbexperience/eufemia/issues/7337)) ([f904f56](https://github.com/dnbexperience/eufemia/commit/f904f563fa1321d57183060e2a978024875bb806))


### :bug: Bug Fixes

* **Field.Provider:** avoid overwriting parent translations with undefined ([#7303](https://github.com/dnbexperience/eufemia/issues/7303)) ([593890c](https://github.com/dnbexperience/eufemia/commit/593890c2a8f58d1ee5884343c2415f052cd6b6ba)), closes [#7220](https://github.com/dnbexperience/eufemia/issues/7220)
* **List:** prevent space-between gaps in accordion items ([#7525](https://github.com/dnbexperience/eufemia/issues/7525)) ([f701c4b](https://github.com/dnbexperience/eufemia/commit/f701c4b4b197ba63b8d13f58e533c1f5230073ca))

## [10.103.0](https://github.com/dnbexperience/eufemia/compare/v10.102.0...v10.103.0) (2026-03-31)


### :memo: Documentation

* add StackBlitz starter to /issue page ([#7250](https://github.com/dnbexperience/eufemia/issues/7250)) ([74e765a](https://github.com/dnbexperience/eufemia/commit/74e765a30843ea41f0a645f1b4f8b82e9c35f839))


### :bug: Bug Fixes

* **Selection, ArraySelection:** unique ids and correct fieldset/legend for radio groups ([#7251](https://github.com/dnbexperience/eufemia/issues/7251)) ([6bbdb33](https://github.com/dnbexperience/eufemia/commit/6bbdb3381fae84e28097348bf655dc79e9ed7d9d))


### :sparkles: Features

* **Table:** add `variant="subtle"` to `Th` ([#7252](https://github.com/dnbexperience/eufemia/issues/7252)) ([481aaf9](https://github.com/dnbexperience/eufemia/commit/481aaf97b9e4d48f5f4680e49d33fbc25f0a31e4))

## [10.102.0](https://github.com/dnbexperience/eufemia/compare/v10.101.2...v10.102.0) (2026-03-26)


### :zap: Refactoring

* move Form.Section test and fix formatting ([#7236](https://github.com/dnbexperience/eufemia/issues/7236)) ([80c663e](https://github.com/dnbexperience/eufemia/commit/80c663eaf6693c6033e6d55d49877575cb1c0d28))


### :sparkles: Features

* **List:** add explicit aria-label and aria-labelledby props ([#7231](https://github.com/dnbexperience/eufemia/issues/7231)) ([2fcb88c](https://github.com/dnbexperience/eufemia/commit/2fcb88c1a8db997dd49ebad6301f00b6aea9d9dd))
* **List:** add explicit id prop to List sub-components ([#7239](https://github.com/dnbexperience/eufemia/issues/7239)) ([c042750](https://github.com/dnbexperience/eufemia/commit/c0427501fd97734ad17c9c938c61cb2ab1e4e570))
* **List:** add onChange callback to ItemAccordion ([#7100](https://github.com/dnbexperience/eufemia/issues/7100)) ([ea8c457](https://github.com/dnbexperience/eufemia/commit/ea8c4577d5d1710923777d500e1e395d8e04787a))
* **Stat:** add `Stat.Text` for custom text with `colorizeBySign`, `fontSize`, `fontWeight` ([#7224](https://github.com/dnbexperience/eufemia/issues/7224)) ([b96adb1](https://github.com/dnbexperience/eufemia/commit/b96adb15f9fa9cf0d8ff135a8e4479bf02837a1d)), closes [#7215](https://github.com/dnbexperience/eufemia/issues/7215)
* **Stat:** add ariaLive prop to Stat.Content ([#7230](https://github.com/dnbexperience/eufemia/issues/7230)) ([9380bf6](https://github.com/dnbexperience/eufemia/commit/9380bf64c2001c7b0696ba0328d7bd4b3e5c5d27))
* **Stat:** add explicit id prop to Stat.Inline ([#7237](https://github.com/dnbexperience/eufemia/issues/7237)) ([893ef1b](https://github.com/dnbexperience/eufemia/commit/893ef1b37df1787afa4db9f013d14b87c51ba1ef))


### :memo: Documentation

* **Stat:** add example using AriaLive for announcement during stat changes ([#7242](https://github.com/dnbexperience/eufemia/issues/7242)) ([c4af73d](https://github.com/dnbexperience/eufemia/commit/c4af73d68128cdcd73a1b780a6b089c3cbb7f6a7))


### :bug: Bug Fixes

* **Field.Email:** add default maxLength of 254 ([#7244](https://github.com/dnbexperience/eufemia/issues/7244)) ([465f1e7](https://github.com/dnbexperience/eufemia/commit/465f1e7134c0a622083c008ee30dceedb2fbe057))
* **Field.Upload:** clear shared upload state on unmount to prevent file leaks ([#7223](https://github.com/dnbexperience/eufemia/issues/7223)) ([a2658fb](https://github.com/dnbexperience/eufemia/commit/a2658fbbf0319e41c2de5eb6891d86782720d3d3)), closes [#6684](https://github.com/dnbexperience/eufemia/issues/6684)
* **Form.Section:** prevent repeated translation injection ([#7220](https://github.com/dnbexperience/eufemia/issues/7220)) ([1688710](https://github.com/dnbexperience/eufemia/commit/1688710a8479fc19ae97737e2a086dd957cf0a68))
* **List:** remove redundant borders on List items inside List.Card ([#7226](https://github.com/dnbexperience/eufemia/issues/7226)) ([31625af](https://github.com/dnbexperience/eufemia/commit/31625afdc7d14449b087c8baf9e31b6acd6096d6))

## [10.101.2](https://github.com/dnbexperience/eufemia/compare/v10.101.1...v10.101.2) (2026-03-25)


### :bug: Bug Fixes

* add fontWeight prop to ItemTitle for API consistency with sibling components ([#7178](https://github.com/dnbexperience/eufemia/issues/7178)) ([855de28](https://github.com/dnbexperience/eufemia/commit/855de28dd24cb2a7842ff60d4888c00be49cf19b))
* **List.Item.Accordion:** guard AccordionHeader and AccordionContent against usage outside ItemAccordion ([#7169](https://github.com/dnbexperience/eufemia/issues/7169)) ([9989d4c](https://github.com/dnbexperience/eufemia/commit/9989d4cd800f8ce6d91803a87571ebed38bf16f0))
* **List:** add missing style.ts entry point for per-component style imports ([#7199](https://github.com/dnbexperience/eufemia/issues/7199)) ([9a3bfc0](https://github.com/dnbexperience/eufemia/commit/9a3bfc02bedcf5c7bc469eb6b5037955776b420a))
* **List:** call onClick on mouse click when href is provided in ItemAction ([#7201](https://github.com/dnbexperience/eufemia/issues/7201)) ([eacd563](https://github.com/dnbexperience/eufemia/commit/eacd56341f244d185b5da7eb3627ad8c339a6e32))
* **List:** remove incorrect aria-expanded from accordion content panel ([#7198](https://github.com/dnbexperience/eufemia/issues/7198)) ([2148e38](https://github.com/dnbexperience/eufemia/commit/2148e38500988bccb03076a9ffdd6374814ca571))
* **List:** remove stale open prop from ItemAccordionContext ([#7187](https://github.com/dnbexperience/eufemia/issues/7187)) ([6088815](https://github.com/dnbexperience/eufemia/commit/6088815100c4249cc5e5acb3c6469b9790a0f2e4))
* pass appliedDisabled instead of raw disabled prop to ItemContent in ItemAction ([#7176](https://github.com/dnbexperience/eufemia/issues/7176)) ([9df50b3](https://github.com/dnbexperience/eufemia/commit/9df50b3185b5bed9cf6090e6e49640fe183dbef8))
* remove unused open prop from AccordionHeaderProps ([#7170](https://github.com/dnbexperience/eufemia/issues/7170)) ([cf8b32c](https://github.com/dnbexperience/eufemia/commit/cf8b32c4e7641f5c2c476fec451b9618ce9d89fc))
* **Stat.Amount:** clarify deprecation message ([#7173](https://github.com/dnbexperience/eufemia/issues/7173)) ([cd3a07b](https://github.com/dnbexperience/eufemia/commit/cd3a07b47ccf3ac25e0abab5c61450a7cfdc9ff1))
* **Stat.Amount:** display -0 instead of +0 for negative zero with signDisplay always ([#7179](https://github.com/dnbexperience/eufemia/issues/7179)) ([f6e3be6](https://github.com/dnbexperience/eufemia/commit/f6e3be6bf5eb6936baab47ec77cd1908ea238ea9))
* **Stat.Amount:** handle negative zero in colorizeBySign ([#7172](https://github.com/dnbexperience/eufemia/issues/7172)) ([7f5bda2](https://github.com/dnbexperience/eufemia/commit/7f5bda2f2b51120caf5222783771394020545458))
* **Stat.Inline:** add warning if used outside Stat.Root ([#7171](https://github.com/dnbexperience/eufemia/issues/7171)) ([6f0b834](https://github.com/dnbexperience/eufemia/commit/6f0b83460a16c43790c3d98afcb92f6cd8a3e10d))
* **Stat.Trend:** treat sign-only string values as neutral ([#7177](https://github.com/dnbexperience/eufemia/issues/7177)) ([ac192ca](https://github.com/dnbexperience/eufemia/commit/ac192caaa1fc474997a32a08a884ea12d24d325d))
* **Stat:** add inRoot warning to Info component ([#7186](https://github.com/dnbexperience/eufemia/issues/7186)) ([540a04b](https://github.com/dnbexperience/eufemia/commit/540a04bc16aed8c43af11e74b15cf72baffd00ff))
* **Stat:** align Rating aria-label precision with visual fill ([#7190](https://github.com/dnbexperience/eufemia/issues/7190)) ([131e726](https://github.com/dnbexperience/eufemia/commit/131e72697126ef8824ae553b8c02b32347c311c2))
* **Stat:** handle sign-only strings consistently in Trend ([#7183](https://github.com/dnbexperience/eufemia/issues/7183)) ([a92f0d9](https://github.com/dnbexperience/eufemia/commit/a92f0d9f24d1e015ffdd34556b14af7886f9494c))
* **Stat:** improve skeleton handling ([#7166](https://github.com/dnbexperience/eufemia/issues/7166)) ([b6d5a4d](https://github.com/dnbexperience/eufemia/commit/b6d5a4d01081250d8e8543ede3d1c1a89177b4a8))
* **Stat:** prevent Label from shadowing Root skeleton context ([#7185](https://github.com/dnbexperience/eufemia/issues/7185)) ([60cc42d](https://github.com/dnbexperience/eufemia/commit/60cc42d277acf563a97100e06193aea6aeb84570))
* **Stat:** propagate skeleton to non-Stat children via Provider in Label and Inline ([#7189](https://github.com/dnbexperience/eufemia/issues/7189)) ([3135bb8](https://github.com/dnbexperience/eufemia/commit/3135bb8c953f4f32a198ba8f2ff4b414a718ae37))
* **Stat:** warn when Trend cannot resolve value from children ([#7184](https://github.com/dnbexperience/eufemia/issues/7184)) ([22a51be](https://github.com/dnbexperience/eufemia/commit/22a51be409ddca855df840eb8e01660e413d53d9))


### :memo: Documentation

* **List:** add ItemAccordion onClick event to events tab ([#7206](https://github.com/dnbexperience/eufemia/issues/7206)) ([85d95d5](https://github.com/dnbexperience/eufemia/commit/85d95d538ce843b96575fea051929f9fe4532753))
* **List:** fix AccordionHeader inheritance note ([#7209](https://github.com/dnbexperience/eufemia/issues/7209)) ([5711e38](https://github.com/dnbexperience/eufemia/commit/5711e380efe36dcfadcc042d4c9689852990f14e))
* **Stat:** add relevant links section to stat info page ([#7204](https://github.com/dnbexperience/eufemia/issues/7204)) ([e9847a7](https://github.com/dnbexperience/eufemia/commit/e9847a78796273159866b79932b9060aa0024c93))
* **Stat:** document deprecated 'default' variant in Label and Info ([#7205](https://github.com/dnbexperience/eufemia/issues/7205)) ([eb98b7b](https://github.com/dnbexperience/eufemia/commit/eb98b7b2a241063c0eef0370b9e232d663e04879))
* **Stat:** use relative tab key paths in stat.mdx ([#7208](https://github.com/dnbexperience/eufemia/issues/7208)) ([b5b82a0](https://github.com/dnbexperience/eufemia/commit/b5b82a0640e4108ebd17812a30222c1f52c48022))

## [10.101.1](https://github.com/dnbexperience/eufemia/compare/v10.101.0...v10.101.1) (2026-03-23)


### :zap: Refactoring

* **List:** use distinct class for ItemFooter separator ([#7144](https://github.com/dnbexperience/eufemia/issues/7144)) ([1a4ed68](https://github.com/dnbexperience/eufemia/commit/1a4ed682f70576dc9db794b950e6626723296d1b))


### :white_check_mark: Tests

* **Stat:** add Inline skeleton propagation edge case tests ([#7149](https://github.com/dnbexperience/eufemia/issues/7149)) ([6bd3611](https://github.com/dnbexperience/eufemia/commit/6bd3611854499c6cd810e39d52c653bc86c48bcc))
* **Stat:** add NaN and Infinity edge case tests for Stat.Number ([#7107](https://github.com/dnbexperience/eufemia/issues/7107)) ([76b178f](https://github.com/dnbexperience/eufemia/commit/76b178fd3316f9dbe659906d10a6d1ce7214b3a6))


### :memo: Documentation

* **List:** add fontSize and fontWeight props to ItemCenter properties table ([#7159](https://github.com/dnbexperience/eufemia/issues/7159)) ([9e2d4ab](https://github.com/dnbexperience/eufemia/commit/9e2d4ab681eb774fc01e1a1f90f298103121ab58)), closes [#7157](https://github.com/dnbexperience/eufemia/issues/7157)
* **List:** add fontWeight prop to ItemStart properties table ([#7158](https://github.com/dnbexperience/eufemia/issues/7158)) ([2e71467](https://github.com/dnbexperience/eufemia/commit/2e714674f71d1d34a92648f21b387d7e0b2975eb)), closes [#7156](https://github.com/dnbexperience/eufemia/issues/7156)
* **List:** improve ListCard documentation ([#7082](https://github.com/dnbexperience/eufemia/issues/7082)) ([21e5454](https://github.com/dnbexperience/eufemia/commit/21e5454f029f0253a943f805bbe046681dfc2d58))
* **Stat:** add Inline description and Amount deprecation note ([#7103](https://github.com/dnbexperience/eufemia/issues/7103)) ([3c84b96](https://github.com/dnbexperience/eufemia/commit/3c84b966166c34ca954db22ccc34d727cb9bc438))
* **Stat:** add value prop to Trend documentation ([#7120](https://github.com/dnbexperience/eufemia/issues/7120)) ([4dce0d3](https://github.com/dnbexperience/eufemia/commit/4dce0d32b72912968885133a63049808926079d9))


### :bug: Bug Fixes

* **List.Container:** propagate skeleton to child items via context ([#7101](https://github.com/dnbexperience/eufemia/issues/7101)) ([715f2a4](https://github.com/dnbexperience/eufemia/commit/715f2a4d858bac11b15d02dd9fe1092d47bac017))
* **List.ScrollView:** propagate skeleton to child items ([#7104](https://github.com/dnbexperience/eufemia/issues/7104)) ([0792d2e](https://github.com/dnbexperience/eufemia/commit/0792d2e4ee0ce0a90549bebd64dcacdc78c17382))
* **List:** add disabled color overrides to Sbanken theme ([#7155](https://github.com/dnbexperience/eufemia/issues/7155)) ([cf20fcd](https://github.com/dnbexperience/eufemia/commit/cf20fcdf18648917be46b7e435d66174678393f6))
* **List:** add disabled prop to interactive items ([#7105](https://github.com/dnbexperience/eufemia/issues/7105)) ([d6d35a2](https://github.com/dnbexperience/eufemia/commit/d6d35a277efdab1909c33e2669f008eb83485b33))
* **List:** add disabled prop to ItemAccordion via context ([#7127](https://github.com/dnbexperience/eufemia/issues/7127)) ([3317e19](https://github.com/dnbexperience/eufemia/commit/3317e1997bce2c703868d9457570e81b020753e4))
* **List:** add fontSize and fontWeight props to ItemCenter for consistency with ItemEnd ([#7157](https://github.com/dnbexperience/eufemia/issues/7157)) ([0a6fd70](https://github.com/dnbexperience/eufemia/commit/0a6fd702d28ed3f6174cf1ae8121ccbd7d1be1ac))
* **List:** add fontWeight prop to ItemStart for consistency with ItemEnd ([#7156](https://github.com/dnbexperience/eufemia/issues/7156)) ([3189bc1](https://github.com/dnbexperience/eufemia/commit/3189bc1273719c8fb4b7e728b73e1b0c015580d1))
* **List:** add skeleton support to all cell components ([#7128](https://github.com/dnbexperience/eufemia/issues/7128)) ([020f2e8](https://github.com/dnbexperience/eufemia/commit/020f2e8dbfe2773423ddaa57b63689bcc3f388ab))
* **List:** always propagate skeleton and disabled through ScrollView context ([#7160](https://github.com/dnbexperience/eufemia/issues/7160)) ([e412612](https://github.com/dnbexperience/eufemia/commit/e41261270fcd2f174cccc24d4eb0b11521d76dd0))
* **List:** apply skeleton class to AccordionHeader ([#7143](https://github.com/dnbexperience/eufemia/issues/7143)) ([1c1cdc4](https://github.com/dnbexperience/eufemia/commit/1c1cdc48c08bcf012322c2e25a47d112c922d14b))
* **List:** correct Sbanken theme variable name to --item-background-color ([#7131](https://github.com/dnbexperience/eufemia/issues/7131)) ([6302dc4](https://github.com/dnbexperience/eufemia/commit/6302dc4c976427e29a1b18333fa184503add5b69))
* **List:** default separated to false in Container ([#7125](https://github.com/dnbexperience/eufemia/issues/7125)) ([cde4a39](https://github.com/dnbexperience/eufemia/commit/cde4a393881f8ef429b3bd53bd7554418e0cbffa))
* **List:** explicitly forward skeleton prop in ItemAccordion ([#7140](https://github.com/dnbexperience/eufemia/issues/7140)) ([b73bf1c](https://github.com/dnbexperience/eufemia/commit/b73bf1c908295636d74eaaac2ff48c4cab33693b))
* **List:** forward selected, variant and skeleton props in ItemAction ([#7139](https://github.com/dnbexperience/eufemia/issues/7139)) ([3eacdd0](https://github.com/dnbexperience/eufemia/commit/3eacdd0e17ad9357c78d2cd08b51b33f45539000))
* **List:** inherit parent context values in ScrollView skeleton provider ([#7117](https://github.com/dnbexperience/eufemia/issues/7117)) ([c3bf34c](https://github.com/dnbexperience/eufemia/commit/c3bf34c1fd8969d34b9ddb49e86d1c9861230dc9))
* **List:** inherit skeleton from context in AccordionContent ([#7135](https://github.com/dnbexperience/eufemia/issues/7135)) ([07e1daa](https://github.com/dnbexperience/eufemia/commit/07e1daa611324c432efe02c1ffd7b526ec000043))
* **List:** inherit skeleton from SharedContext Provider ([#7132](https://github.com/dnbexperience/eufemia/issues/7132)) ([b587cfc](https://github.com/dnbexperience/eufemia/commit/b587cfc3041ac875553f2527964c94e39689d5c3))
* **List:** propagate skeleton property to children via shared Context ([#7161](https://github.com/dnbexperience/eufemia/issues/7161)) ([4f96fda](https://github.com/dnbexperience/eufemia/commit/4f96fda56d05e1c933e28b54ba5aa0b85272c924))
* **List:** remove redundant HTMLDivElement type from Container and ItemContent props ([#7109](https://github.com/dnbexperience/eufemia/issues/7109)) ([4496ae0](https://github.com/dnbexperience/eufemia/commit/4496ae0610faa7ba24921c9b2326e644dec08776))
* **List:** remove redundant variant resolution from ItemBasic ([#7111](https://github.com/dnbexperience/eufemia/issues/7111)) ([150e23c](https://github.com/dnbexperience/eufemia/commit/150e23ce3eb4920100f3981f00d3c3bf23b2ed33))
* **List:** remove trailing comma from CSS var() fallback ([#7134](https://github.com/dnbexperience/eufemia/issues/7134)) ([7d2e9a4](https://github.com/dnbexperience/eufemia/commit/7d2e9a4d275bc32d25194d2c791b99c30dabd9f2))
* **List:** support disabled prop on Container to disable all child items ([#7142](https://github.com/dnbexperience/eufemia/issues/7142)) ([af504ac](https://github.com/dnbexperience/eufemia/commit/af504ac3bd44ebe503f85a818ddfa44eb30ec910))
* **List:** use FlexItem props for ItemIcon instead of ItemContentProps ([#7115](https://github.com/dnbexperience/eufemia/issues/7115)) ([83cd047](https://github.com/dnbexperience/eufemia/commit/83cd0477a20d887931feb0b047aca34d5631e955))
* **List:** use FlexItemProps for cell components instead of ItemContentProps ([#7121](https://github.com/dnbexperience/eufemia/issues/7121)) ([87a2501](https://github.com/dnbexperience/eufemia/commit/87a25011d262d1db75a3cd271d3a0374a68ce6d1))
* **List:** use FlexItemProps for ItemSubline instead of ItemContentProps ([#7126](https://github.com/dnbexperience/eufemia/issues/7126)) ([33b2add](https://github.com/dnbexperience/eufemia/commit/33b2add46bdd3b87a9ebbad77a42095637be3179))
* **Stat:** add explicit id prop to Label, Content, Trend, Rating, and Info ([#7114](https://github.com/dnbexperience/eufemia/issues/7114)) ([653b83f](https://github.com/dnbexperience/eufemia/commit/653b83fa5bfc877c07978be127be982fb843c2b3))
* **Stat:** add id and style props to Root type and documentation ([#7130](https://github.com/dnbexperience/eufemia/issues/7130)) ([31e88c2](https://github.com/dnbexperience/eufemia/commit/31e88c201ef8e77054fa52aaa2d5853d136fe299))
* **Stat:** add NumberExport.ts for standalone import ([#7091](https://github.com/dnbexperience/eufemia/issues/7091)) ([4d21ea0](https://github.com/dnbexperience/eufemia/commit/4d21ea01d5dbd02ed4e128738d6cbb1569ff8250))
* **Stat:** add runtime deprecation warning for Stat.Amount ([#7138](https://github.com/dnbexperience/eufemia/issues/7138)) ([771bd13](https://github.com/dnbexperience/eufemia/commit/771bd13c27be9e27c045d1827a0e12da8f2663bc))
* **Stat:** add skeleton support to Stat.Inline ([#7099](https://github.com/dnbexperience/eufemia/issues/7099)) ([71a0014](https://github.com/dnbexperience/eufemia/commit/71a001443a9ac05422fcdd6bc29fcfe3ca60cd4d))
* **Stat:** add style prop to Trend, Rating, Info, and Content types ([#7085](https://github.com/dnbexperience/eufemia/issues/7085)) ([d77f674](https://github.com/dnbexperience/eufemia/commit/d77f674a3c8bbf4ee60a85853e78ff45f6b55e9d))
* **Stat:** apply skeleton class and aria-disabled to Content element ([#7090](https://github.com/dnbexperience/eufemia/issues/7090)) ([ce459b3](https://github.com/dnbexperience/eufemia/commit/ce459b3d691e2c996ade30dacf3b7feccced2183))
* **Stat:** colorizeBySign works without signDisplay ([962c09f](https://github.com/dnbexperience/eufemia/commit/962c09f49b17aaba6a933e75d3afcf7f0fe42920))
* **Stat:** default Content to span element when used outside Root ([#7147](https://github.com/dnbexperience/eufemia/issues/7147)) ([9bf77ff](https://github.com/dnbexperience/eufemia/commit/9bf77ffca26dabad6090161146583ae486a24a8f))
* **Stat:** default Label to span element when used outside Root ([#7146](https://github.com/dnbexperience/eufemia/issues/7146)) ([a739107](https://github.com/dnbexperience/eufemia/commit/a7391075e1b8ee34015e6cc268d3956a1c10c1ff))
* **Stat:** explicitly destructure and pass style prop in Info ([#7136](https://github.com/dnbexperience/eufemia/issues/7136)) ([4c6579d](https://github.com/dnbexperience/eufemia/commit/4c6579d72d09500fb880d10c12a68a890d7f3831))
* **Stat:** explicitly destructure and pass style prop in Rating ([#7118](https://github.com/dnbexperience/eufemia/issues/7118)) ([cb8b2f5](https://github.com/dnbexperience/eufemia/commit/cb8b2f5adef379a3026b5c2731d929482b606a54))
* **Stat:** explicitly destructure and pass style prop in Trend ([#7119](https://github.com/dnbexperience/eufemia/issues/7119)) ([729b4da](https://github.com/dnbexperience/eufemia/commit/729b4dab68dcc468183ff43d704b72f0e06f0894))
* **Stat:** propagate skeleton context from Inline to children ([#7137](https://github.com/dnbexperience/eufemia/issues/7137)) ([186b98f](https://github.com/dnbexperience/eufemia/commit/186b98fd00102953747d9d3c38882c7f7c970081))
* **Stat:** render NaN and Infinity as em dash in Trend ([#7092](https://github.com/dnbexperience/eufemia/issues/7092)) ([a30024a](https://github.com/dnbexperience/eufemia/commit/a30024a288fc930a51b5981d27fa2622686df66c))
* **Stat:** warn when Content appears before Label in Root ([#7089](https://github.com/dnbexperience/eufemia/issues/7089)) ([47bdb29](https://github.com/dnbexperience/eufemia/commit/47bdb294e3c3f4b4ddcca08f258fb2857f8239ae))

## [10.101.0](https://github.com/dnbexperience/eufemia/compare/v10.100.1...v10.101.0) (2026-03-20)


### :memo: Documentation

* improve naming docs ([#7020](https://github.com/dnbexperience/eufemia/issues/7020)) ([b398e5a](https://github.com/dnbexperience/eufemia/commit/b398e5a15cb1d3a4b8b50162b00b268bedf4cf90))


### :bug: Bug Fixes

* **Field.Date:** add validation error when range start date is after end date ([#7019](https://github.com/dnbexperience/eufemia/issues/7019)) ([3142120](https://github.com/dnbexperience/eufemia/commit/31421209bb69a31a37428a9c0303847105907872))
* **Field.Email:** improve error message ([#7034](https://github.com/dnbexperience/eufemia/issues/7034)) ([7446b9c](https://github.com/dnbexperience/eufemia/commit/7446b9caf41de3d74083821b5ce0926321c44f46))
* **Input, Autocomplete:** memoize `icon` for ProgressIndicator ([#7027](https://github.com/dnbexperience/eufemia/issues/7027)) ([5b69748](https://github.com/dnbexperience/eufemia/commit/5b697487cfc6786fc7753292f34c81bb2a8219c6)), closes [#6449](https://github.com/dnbexperience/eufemia/issues/6449)
* **List:** preserve direct li children in `List.Container` ([#7079](https://github.com/dnbexperience/eufemia/issues/7079)) ([d86275a](https://github.com/dnbexperience/eufemia/commit/d86275aaa7c58a7c1e0e4c4cf7b5b022aecfe381))
* **Stat.Number:** add missing Number export to barrel index ([#7024](https://github.com/dnbexperience/eufemia/issues/7024)) ([069e9d0](https://github.com/dnbexperience/eufemia/commit/069e9d0599f10cdc02922e8ff5ba701b2632e620))
* **Stat:** ensure amounts are accessible to screen readers ([#7022](https://github.com/dnbexperience/eufemia/issues/7022)) ([3131116](https://github.com/dnbexperience/eufemia/commit/3131116a394faf4fa56e4b0df79053d9bb2fe604))
* update forms validation messages across all locales ([#7043](https://github.com/dnbexperience/eufemia/issues/7043)) ([7557016](https://github.com/dnbexperience/eufemia/commit/7557016c7e20708615babe878574dbfb0fc4fa2e))


### :sparkles: Features

* **Forms:** support return messages from onSubmitRequest ([#7078](https://github.com/dnbexperience/eufemia/issues/7078)) ([b63b9fe](https://github.com/dnbexperience/eufemia/commit/b63b9fe97ceee8f18e7a2f1acab7154603ef23f9))
* **List:** add `List.Card` and `List.ScrollView` ([#7080](https://github.com/dnbexperience/eufemia/issues/7080)) ([91a04d2](https://github.com/dnbexperience/eufemia/commit/91a04d2350eb8bb509f90b4cb0933679aae85702))

## [10.100.1](https://github.com/dnbexperience/eufemia/compare/v10.100.0...v10.100.1) (2026-03-12)


### :zap: Refactoring

* **Stat.Amount:** replace React.cloneElement with span wrapper in renderAffix ([#7014](https://github.com/dnbexperience/eufemia/issues/7014)) ([c3d19d2](https://github.com/dnbexperience/eufemia/commit/c3d19d29a79f448a7362fb577425f1939e9db907))


### :bug: Bug Fixes

* **DatePicker:** preserve digit order when overwriting selected input values ([#7015](https://github.com/dnbexperience/eufemia/issues/7015)) ([babb42d](https://github.com/dnbexperience/eufemia/commit/babb42d18af6d9bef3b17d8a78cd50fb4885b2a3))
* **List:** add support to be wrapped in Flex.Stack ([#7009](https://github.com/dnbexperience/eufemia/issues/7009)) ([4831397](https://github.com/dnbexperience/eufemia/commit/4831397ea41e7f30cb2c9733f927d21f452baab0))
* **Stat.Amount:** rename to `Stat.Number` ([#6999](https://github.com/dnbexperience/eufemia/issues/6999)) ([5ca798a](https://github.com/dnbexperience/eufemia/commit/5ca798aaf89303450c027ebfc056c37201063698))
* **Stat.Info:** rename variant "default" to "plain" ([#7005](https://github.com/dnbexperience/eufemia/issues/7005)) ([0fa047f](https://github.com/dnbexperience/eufemia/commit/0fa047f8720af366b3117e77323f3be3f1e096c9))
* **Stat.Label:** rename variant `'default'` to `'plain'` ([#7008](https://github.com/dnbexperience/eufemia/issues/7008)) ([9d46532](https://github.com/dnbexperience/eufemia/commit/9d46532abccda974bc408148af7aa664416ff209))
* **Stat.Rating:** clamp max and warn for large values ([#7001](https://github.com/dnbexperience/eufemia/issues/7001)) ([4ebdcdd](https://github.com/dnbexperience/eufemia/commit/4ebdcdd1c568050f4dd1d35200749bcdc33e93f8))
* **Stat.Rating:** compute progressive heights dynamically ([#7000](https://github.com/dnbexperience/eufemia/issues/7000)) ([778cf0e](https://github.com/dnbexperience/eufemia/commit/778cf0e9fbd3b224e5205066fe0c216098fb2752))
* **Stat:** ensure all sub-components support skeleton ([#7007](https://github.com/dnbexperience/eufemia/issues/7007)) ([b0f7d9f](https://github.com/dnbexperience/eufemia/commit/b0f7d9f1f104c4852c9902d8ecd2c29fff6e4113))

## [10.100.0](https://github.com/dnbexperience/eufemia/compare/v10.99.0...v10.100.0) (2026-03-11)


### :sparkles: Features

* **Forms:** add `totalSteps` to `WizardContainer.onStepChange` ([#6878](https://github.com/dnbexperience/eufemia/issues/6878)) ([a0f2acd](https://github.com/dnbexperience/eufemia/commit/a0f2acd54fc1eccacd1ef97f1110b58c5903d84a))
* **NumberFormat:** add new `useNumberFormatWithParts` hook ([#6807](https://github.com/dnbexperience/eufemia/issues/6807)) ([83369c0](https://github.com/dnbexperience/eufemia/commit/83369c0bd53e63421b4afa584754a773cbf9b5e9)), closes [#6755](https://github.com/dnbexperience/eufemia/issues/6755)
* **Stat:** add new component for hero amounts with composition, rating and trend ([#6755](https://github.com/dnbexperience/eufemia/issues/6755)) ([dc4ba5d](https://github.com/dnbexperience/eufemia/commit/dc4ba5d2a4cacd505f4d219d6e48f297c77acde4))
* **VippsWalletButton:** add pending state with SubmitIndicator ([#6932](https://github.com/dnbexperience/eufemia/issues/6932)) ([c1c670e](https://github.com/dnbexperience/eufemia/commit/c1c670ec4623369a086bb687c87ffa24837399de))


### :bug: Bug Fixes

* **Field.Currency:** allow typing minus sign ([#6984](https://github.com/dnbexperience/eufemia/issues/6984)) ([ba0cab6](https://github.com/dnbexperience/eufemia/commit/ba0cab69f890c10922301c940199bce18c9fd23b))
* **Field.Date:** forward `tooltip` prop from DatePicker ([#6967](https://github.com/dnbexperience/eufemia/issues/6967)) ([0641068](https://github.com/dnbexperience/eufemia/commit/0641068c1946af0f7701d8e2ee00388ba4a08f4a))
* **Field.Date:** should not display error message when clearing range ([#6960](https://github.com/dnbexperience/eufemia/issues/6960)) ([c38f89c](https://github.com/dnbexperience/eufemia/commit/c38f89ce1da3ec20039d85da917ca2ac2c16b255))
* **Field.Date:** should reset to initial value when clicking reset button ([#6962](https://github.com/dnbexperience/eufemia/issues/6962)) ([6392bde](https://github.com/dnbexperience/eufemia/commit/6392bde55a49ffbb8347b26bf472421c51925b00))
* **Field.Upload:** display required message when removing files ([#5535](https://github.com/dnbexperience/eufemia/issues/5535)) ([9128b3f](https://github.com/dnbexperience/eufemia/commit/9128b3fee4ca5225769c6c3d79925a56540fe379))
* **Forms:** `errorSummaryTitle` translation should override GlobalStatus title ([#5951](https://github.com/dnbexperience/eufemia/issues/5951)) ([ce2bc75](https://github.com/dnbexperience/eufemia/commit/ce2bc75a2dcd910123c33421fd59e2e4bf5cbe16))
* **Forms:** ensure consistent cursor in `Form.SubmitButton` ([#6945](https://github.com/dnbexperience/eufemia/issues/6945)) ([9a1d024](https://github.com/dnbexperience/eufemia/commit/9a1d024f4f104b74ec5ea5e3158fe78b856dd804)), closes [#6931](https://github.com/dnbexperience/eufemia/issues/6931)
* **Forms:** ensure consistent cursor in `Form.SubmitButton` ([#6948](https://github.com/dnbexperience/eufemia/issues/6948)) ([c8abe64](https://github.com/dnbexperience/eufemia/commit/c8abe643c54cff902cb24e0ca031c1614d7a4eeb))
* **Forms:** omit double import of styles ([#6860](https://github.com/dnbexperience/eufemia/issues/6860)) ([f3aaeea](https://github.com/dnbexperience/eufemia/commit/f3aaeeabf8918608a957e1efd4226bd54df79400)), closes [#6816](https://github.com/dnbexperience/eufemia/issues/6816)
* **GlobalStatus:** reduce spacing when not using `text` property ([#6963](https://github.com/dnbexperience/eufemia/issues/6963)) ([c19d011](https://github.com/dnbexperience/eufemia/commit/c19d011914be2bb9fc713f539840c62357853e8e))
* **List:** only make form elements full-row clickable in basic items when `selected` is defined ([#6966](https://github.com/dnbexperience/eufemia/issues/6966)) ([61c04ef](https://github.com/dnbexperience/eufemia/commit/61c04efd26fb8d5ecc017f868da6d75e7312307f))
* **Table:** prevent cross-fade morphing on accordion content rows ([#6965](https://github.com/dnbexperience/eufemia/issues/6965)) ([5e503ea](https://github.com/dnbexperience/eufemia/commit/5e503ea450260985d9ccb104fde3754b980fda25))

## [10.99.0](https://github.com/dnbexperience/eufemia/compare/v10.98.0...v10.99.0) (2026-02-26)


### :bug: Bug Fixes

* **Forms:** safeguard Form.clearData when id is invalid ([#6774](https://github.com/dnbexperience/eufemia/issues/6774)) ([f6c45f0](https://github.com/dnbexperience/eufemia/commit/f6c45f04d145c0be9406351fd8528bee210ef565))
* **Tabs:** fix overflow when using Badge in tab title ([#6734](https://github.com/dnbexperience/eufemia/issues/6734)) ([c32730e](https://github.com/dnbexperience/eufemia/commit/c32730eb3f34d9e8a76be3cdfd42b00116ef9955))


### :sparkles: Features

* **List.Item.Accordion:** add `keepInDOM` property to keep content in the DOM when closed ([#6735](https://github.com/dnbexperience/eufemia/issues/6735)) ([565e525](https://github.com/dnbexperience/eufemia/commit/565e525c757714f9943a77888c1ad84f7218514a))
* **NumberFormat:** omit space before suffix when it starts with slash ([#6744](https://github.com/dnbexperience/eufemia/issues/6744)) ([e2d74a6](https://github.com/dnbexperience/eufemia/commit/e2d74a6fd109e877f094537e0c1e8a95f4b43b76))
* **Table:** for accordion mode – add `keepInDOM` property to keep content in the DOM when closed ([#6790](https://github.com/dnbexperience/eufemia/issues/6790)) ([d40a2af](https://github.com/dnbexperience/eufemia/commit/d40a2afa647d4000a7252ff95f33b2ff5477c25d))

## [10.98.0](https://github.com/dnbexperience/eufemia/compare/v10.97.0...v10.98.0) (2026-02-19)


### :memo: Documentation

* **Accordion:** improve `on_change` ([#6696](https://github.com/dnbexperience/eufemia/issues/6696)) ([0a701f1](https://github.com/dnbexperience/eufemia/commit/0a701f1f3cd39f95fd28da360773f0a77b757cd1))
* add `en-NO` with examples to relevant documentation ([#6644](https://github.com/dnbexperience/eufemia/issues/6644)) ([0a86c43](https://github.com/dnbexperience/eufemia/commit/0a86c4380ed0f824199c52f5daadd84cd041c05f))
* **Badge:** correct status values ([#6670](https://github.com/dnbexperience/eufemia/issues/6670)) ([8631989](https://github.com/dnbexperience/eufemia/commit/863198941c07a115ee31d2e110bacad502fbe04a))
* **Button:** add example using SVG inside a button ([#6647](https://github.com/dnbexperience/eufemia/issues/6647)) ([a73e63a](https://github.com/dnbexperience/eufemia/commit/a73e63a30cd8edb5990e24c59cf4b68fbd2faf8d))
* **Forms:** improve documentation on forms best practices and getting started ([#6659](https://github.com/dnbexperience/eufemia/issues/6659)) ([2625a7f](https://github.com/dnbexperience/eufemia/commit/2625a7ff447cc901ea34b1900f42ae0ca865e516))
* improve translation docs on how to use `sv_SE` ([#6620](https://github.com/dnbexperience/eufemia/issues/6620)) ([5a48fcb](https://github.com/dnbexperience/eufemia/commit/5a48fcbed5ed31be382af604a19c158bc95c930b))
* **Slider:** improve docs for `onDragStart` & `onDragEnd` ([#6695](https://github.com/dnbexperience/eufemia/issues/6695)) ([00db3c2](https://github.com/dnbexperience/eufemia/commit/00db3c22a07cea23a29bcb85cd063a58b9561716))
* **Switch:** improve `onChange` & `onChangeEnd` ([#6693](https://github.com/dnbexperience/eufemia/issues/6693)) ([74529a5](https://github.com/dnbexperience/eufemia/commit/74529a52a5a11707cbfcefc4a05f183b8a665f0d))
* **Tabs:** improve `on_change`, `on_click` & `on_focus` ([#6692](https://github.com/dnbexperience/eufemia/issues/6692)) ([842b4d2](https://github.com/dnbexperience/eufemia/commit/842b4d2abb49dc9bc898b85710196a94eefd8907))


### :bug: Bug Fixes

* **Autocomplete:** make `showNoOptionsItem` callable during async mode ([#6646](https://github.com/dnbexperience/eufemia/issues/6646)) ([ca7549e](https://github.com/dnbexperience/eufemia/commit/ca7549e4707a0419d75b53df3549f165d16dd4cf))
* **Drawer:** improve sticky header on iPhone ([#6703](https://github.com/dnbexperience/eufemia/issues/6703)) ([30f3422](https://github.com/dnbexperience/eufemia/commit/30f342235bbdd16171c04ab1aa8442600ce5d79d))
* **Field.Upload:** async `fileHandler` and `onFileDelete` should work in `Iterate.Array` ([#6684](https://github.com/dnbexperience/eufemia/issues/6684)) ([faf7930](https://github.com/dnbexperience/eufemia/commit/faf7930d50dcc93781c57a497b6abea0e5f79d34)), closes [#6156](https://github.com/dnbexperience/eufemia/issues/6156)
* **Field.Upload:** prevents async delete from having their loading states overwritten ([#6689](https://github.com/dnbexperience/eufemia/issues/6689)) ([4ab6657](https://github.com/dnbexperience/eufemia/commit/4ab66577612ee152d468724996901b5a48f8187e))
* **Forms:** upgrade ajv from to v8.18.0 ([#6636](https://github.com/dnbexperience/eufemia/issues/6636)) ([40b4ea9](https://github.com/dnbexperience/eufemia/commit/40b4ea9212b36341bf175b954e981c44f28f4021))
* **GlobalStatus:** improve event types ([#6694](https://github.com/dnbexperience/eufemia/issues/6694)) ([1ee4f07](https://github.com/dnbexperience/eufemia/commit/1ee4f07449a0e3093a2598c4bfff73283796910a))
* **List:** ensure Item.End flex column alignmnet ([#6634](https://github.com/dnbexperience/eufemia/issues/6634)) ([69131d5](https://github.com/dnbexperience/eufemia/commit/69131d54fa7823b268e6a17dd7db773d0cbdea13))
* **Space:** support `inline` and `block` for responsive `innerSpace` ([#6621](https://github.com/dnbexperience/eufemia/issues/6621)) ([1979458](https://github.com/dnbexperience/eufemia/commit/1979458be35f607916bad7b689aeb4b2aed264f5)), closes [#6595](https://github.com/dnbexperience/eufemia/issues/6595)


### :sparkles: Features

* add `VippsWalletButton` extension ([#6690](https://github.com/dnbexperience/eufemia/issues/6690)) ([1ad467e](https://github.com/dnbexperience/eufemia/commit/1ad467ea1cd08627281f4823202b5a415d4b4672))
* **Autocomplete:** type events ([#6687](https://github.com/dnbexperience/eufemia/issues/6687)) ([747e909](https://github.com/dnbexperience/eufemia/commit/747e9090dd334f3ef53766d9fae7e74e58de61ec))
* **Autocomplete:** type events ([#6691](https://github.com/dnbexperience/eufemia/issues/6691)) ([158f311](https://github.com/dnbexperience/eufemia/commit/158f311ff7420c433b16d6573aa582fae6668e31))
* **Eufemia:** warn when old version is used ([#6639](https://github.com/dnbexperience/eufemia/issues/6639)) ([f224978](https://github.com/dnbexperience/eufemia/commit/f224978c5aabe7c7b9724ffc77ef865905ac224a))
* **Field.Upload:** add `onValidationError` event ([#6616](https://github.com/dnbexperience/eufemia/issues/6616)) ([e9cc4d2](https://github.com/dnbexperience/eufemia/commit/e9cc4d25cf50d1b5803b2c658effc414565ef53b))
* **Forms:** add `statusPosition="above"` to all Field.* components ([#6666](https://github.com/dnbexperience/eufemia/issues/6666)) ([d5a4b92](https://github.com/dnbexperience/eufemia/commit/d5a4b92c9ba3a9e1a78bf6d378d086d08e9b121c))
* improve translations ([#6674](https://github.com/dnbexperience/eufemia/issues/6674)) ([c67e8b0](https://github.com/dnbexperience/eufemia/commit/c67e8b0e57e9fc63893a806d46f95ee06f2c401d))
* **Modal, Dialog, Drawer:** add sticky close button for Dialog component ([#6649](https://github.com/dnbexperience/eufemia/issues/6649)) ([1cc5ebb](https://github.com/dnbexperience/eufemia/commit/1cc5ebb51845c208e70120d5636fdbd68afe0c2b))
* **PaymentCard:** use stop icon for `not_active`, reset icon for `renewed` ([#6622](https://github.com/dnbexperience/eufemia/issues/6622)) ([f67b88d](https://github.com/dnbexperience/eufemia/commit/f67b88d7add9140783d2288f42fafbf16298a7e4))
* **Tag:** improve typing of `onClick` & `onDelete` events ([#6698](https://github.com/dnbexperience/eufemia/issues/6698)) ([731d13b](https://github.com/dnbexperience/eufemia/commit/731d13b78d6b7f425fb5e754422d97f80771410d))

## [10.97.0](https://github.com/dnbexperience/eufemia/compare/v10.96.0...v10.97.0) (2026-02-12)


### :memo: Documentation

* add best practices page for number formatting ([#6564](https://github.com/dnbexperience/eufemia/issues/6564)) ([f808ad3](https://github.com/dnbexperience/eufemia/commit/f808ad350313edc36680b0e9ae69047c4a90bab9))


### :zap: Refactoring

* **Form.useValidation:** prevent faulty status when changing locale ([#6603](https://github.com/dnbexperience/eufemia/issues/6603)) ([9423aab](https://github.com/dnbexperience/eufemia/commit/9423aab9d3f1798a55c7770306d94e2425b39e30)), closes [#6601](https://github.com/dnbexperience/eufemia/issues/6601)


### :bug: Bug Fixes

* **Form.useSubmit:** make it work properly outside of Form.Handler ([#6592](https://github.com/dnbexperience/eufemia/issues/6592)) ([40e691d](https://github.com/dnbexperience/eufemia/commit/40e691d76d7b6622deb3fffdee87ecc369c4ed00))
* **Form.useValidation:** make hook reactive ([#6599](https://github.com/dnbexperience/eufemia/issues/6599)) ([0d7e165](https://github.com/dnbexperience/eufemia/commit/0d7e16532bec334f6828ef59ba4e74ffee7be7ea))
* **Form.useValidation:** prevent faulty status when changing locale ([#6601](https://github.com/dnbexperience/eufemia/issues/6601)) ([d2cfb45](https://github.com/dnbexperience/eufemia/commit/d2cfb45611b40e5f64e77e7770fa72f93b552eeb))
* **Forms:** should update required error message when locale changes ([#6602](https://github.com/dnbexperience/eufemia/issues/6602)) ([7d35900](https://github.com/dnbexperience/eufemia/commit/7d359009e5d330fcf883d61387a528e2353b065f))
* **List:** reset browser given margin on ul element ([#6567](https://github.com/dnbexperience/eufemia/issues/6567)) ([299c344](https://github.com/dnbexperience/eufemia/commit/299c34406409e41d3badaa3e99471223bc5880b7))
* **Tabs:** ensure Badge styles do not effect content styles ([#6606](https://github.com/dnbexperience/eufemia/issues/6606)) ([f285b0f](https://github.com/dnbexperience/eufemia/commit/f285b0f21dd439b363de64fb9b921ac37a7e57ff))
* **Upload:** stop loading spinner when rejecting promise ([#6607](https://github.com/dnbexperience/eufemia/issues/6607)) ([2869a1e](https://github.com/dnbexperience/eufemia/commit/2869a1e33e4823a382a92ddd70d99ec28e1621c4))
* **Value.Currency:** fix correct empty placeholder when locale is en-GB ([#6565](https://github.com/dnbexperience/eufemia/issues/6565)) ([e9e33d0](https://github.com/dnbexperience/eufemia/commit/e9e33d0dee48d76350fb62a7df46a81f4a11f032))


### :sparkles: Features

* **Field.Selection:** deprecate `radio-list` in favor of the new List component ([#6570](https://github.com/dnbexperience/eufemia/issues/6570)) ([ff77078](https://github.com/dnbexperience/eufemia/commit/ff770784d4a460cddb3b171b9a9de2a76b4221eb))
* **Forms:** add support for children given in a function to `Field.Selection` and `Field.ArraySelection` ([#6568](https://github.com/dnbexperience/eufemia/issues/6568)) ([8df1fd2](https://github.com/dnbexperience/eufemia/commit/8df1fd28259193f4d262b963f72cd58951ac6bb3))
* **NumberFormat:** add when to display the sign for the number (`signDisplay`) ([#6604](https://github.com/dnbexperience/eufemia/issues/6604)) ([cfc4479](https://github.com/dnbexperience/eufemia/commit/cfc44798a22693702aff20f63b71b2bced1741f8))
* **Space:** add `inline` and `block` support to `innerSpace` ([#6595](https://github.com/dnbexperience/eufemia/issues/6595)) ([91ae029](https://github.com/dnbexperience/eufemia/commit/91ae02903edeb844d76a9ff386e81d9e56eae329))
* **Upload:** remove link for files by using `removeLink` ([#6608](https://github.com/dnbexperience/eufemia/issues/6608)) ([ef29eeb](https://github.com/dnbexperience/eufemia/commit/ef29eeb5cb0bc5cfab5569f0c0d224e7b0b228b7))

## [10.96.0](https://github.com/dnbexperience/eufemia/compare/v10.95.2...v10.96.0) (2026-02-05)


### :memo: Documentation

* **Forms:** document where styles are imported ([#6531](https://github.com/dnbexperience/eufemia/issues/6531)) ([16f0981](https://github.com/dnbexperience/eufemia/commit/16f0981f89bbdf33246cd9efcf3d14c31a16bfeb))
* remove new badge for components older than a year ([#6528](https://github.com/dnbexperience/eufemia/issues/6528)) ([66e87f1](https://github.com/dnbexperience/eufemia/commit/66e87f1a454ec9547871d7ff3b3413efdc2fff7e))


### :bug: Bug Fixes

* **Field.Email:** support unicode in the local part (before @) ([#6543](https://github.com/dnbexperience/eufemia/issues/6543)) ([5149cfc](https://github.com/dnbexperience/eufemia/commit/5149cfc5bc7f3954c30b5b0f15bbf619ce8056bd))
* **Upload:** reduce `description` size and filename hover width ([#6498](https://github.com/dnbexperience/eufemia/issues/6498)) ([fef4011](https://github.com/dnbexperience/eufemia/commit/fef40112e78f6f7da79964ef692f19494233bd2c))
* **Wizard.useStep:** ensure `setActiveIndex` can always be called ([#6546](https://github.com/dnbexperience/eufemia/issues/6546)) ([86a3e8f](https://github.com/dnbexperience/eufemia/commit/86a3e8f0dfc66b30d26367e672409cbc7a88cc1c))


### :sparkles: Features

* **DateFormat:** add `hideCurrentYear` and `hideYear` property ([#6536](https://github.com/dnbexperience/eufemia/issues/6536)) ([f7fe82d](https://github.com/dnbexperience/eufemia/commit/f7fe82dc10816e2ee5c2d34672564cdbef0d7d18)), closes [#6520](https://github.com/dnbexperience/eufemia/issues/6520)
* **DateFormat:** show Tooltip with more information ([#6545](https://github.com/dnbexperience/eufemia/issues/6545)) ([b8a6175](https://github.com/dnbexperience/eufemia/commit/b8a617555fcf47c573eeb8c41b05256b0d81dde0))
* **Forms:** add `Form.useSubmit` for easy submit outside the context ([#6533](https://github.com/dnbexperience/eufemia/issues/6533)) ([164ad1d](https://github.com/dnbexperience/eufemia/commit/164ad1d0fe1a36f6e312b31b49ff76bb83b525c0))
* **List:** add new component for displaying rows of content ([#6520](https://github.com/dnbexperience/eufemia/issues/6520)) ([eb3b31f](https://github.com/dnbexperience/eufemia/commit/eb3b31f1e2d9d69f0690e2f46760f9d57af7f0bf))

## [10.95.2](https://github.com/dnbexperience/eufemia/compare/v10.95.1...v10.95.2) (2026-01-29)


### :bug: Bug Fixes

* **Forms:** improve `Field.Email` validation to catch more invalid emails ([6328745](https://github.com/dnbexperience/eufemia/commit/6328745064901b68a3a465dad24d9dfd1b71ade2))

## [10.95.1](https://github.com/dnbexperience/eufemia/compare/v10.95.0...v10.95.1) (2026-01-27)


### :bug: Bug Fixes

* **AI:** improve initial docs guidance for MCP Server ([#6459](https://github.com/dnbexperience/eufemia/issues/6459)) ([e38e314](https://github.com/dnbexperience/eufemia/commit/e38e31481bb70205dbd235266024a1194ab11395))
* **DateFormat:** add support for timezones ([#6457](https://github.com/dnbexperience/eufemia/issues/6457)) ([187fc65](https://github.com/dnbexperience/eufemia/commit/187fc6529b871598885ae8e09f5a2f8186599887))
* **Forms:** minor locale improvements for PostalCode, Upload and Email fields ([#6455](https://github.com/dnbexperience/eufemia/issues/6455)) ([27f0d2b](https://github.com/dnbexperience/eufemia/commit/27f0d2bd702ff1dfc6e6da8fd9c69d46daabccbe))
* **Iterate:** fix redundant rendering of `ItemNo` ([#6470](https://github.com/dnbexperience/eufemia/issues/6470)) ([62569a4](https://github.com/dnbexperience/eufemia/commit/62569a466366986e259780b76b808978938efdf0))
* **PaymentCard:** add `/style/isolated` for style isolation import ([#6458](https://github.com/dnbexperience/eufemia/issues/6458)) ([64e644d](https://github.com/dnbexperience/eufemia/commit/64e644db3f9dc4dadacadbae363894d6c6da8ed8))

## [10.95.0](https://github.com/dnbexperience/eufemia/compare/v10.94.3...v10.95.0) (2026-01-26)


### :memo: Documentation

* **Forms:** improve title of pages and search results ([#6371](https://github.com/dnbexperience/eufemia/issues/6371)) ([83bf555](https://github.com/dnbexperience/eufemia/commit/83bf555a2e61ddfbe77ae74c9ef98b7766f16b97))


### :sparkles: Features

* add reduced motion support ([#6446](https://github.com/dnbexperience/eufemia/issues/6446)) ([7b53563](https://github.com/dnbexperience/eufemia/commit/7b53563e8ecfa967c3ce35a1485ef3e05f82aeaa))
* **AI:** include MCP Server with Eufemia documentation ([#6437](https://github.com/dnbexperience/eufemia/issues/6437)) ([028e751](https://github.com/dnbexperience/eufemia/commit/028e7517b9f3ae102e320258f348857388ab25c5))
* **Badge:** add `hideBadge` prop ([#6311](https://github.com/dnbexperience/eufemia/issues/6311)) ([90ae62a](https://github.com/dnbexperience/eufemia/commit/90ae62a415ff4ac64979e83002f80ecd44a79fde))


### :bug: Bug Fixes

* **Autocomplete:** ensure better results when `search_numbers` is used ([#6436](https://github.com/dnbexperience/eufemia/issues/6436)) ([309eff8](https://github.com/dnbexperience/eufemia/commit/309eff864cc005449fa4d7af166b60b84f3dfd32))
* **Autocomplete:** ensure stricter `searchMatch="starts-with"` to allow a strict matching search ([#6362](https://github.com/dnbexperience/eufemia/issues/6362)) ([fd85631](https://github.com/dnbexperience/eufemia/commit/fd85631c2fc86387acd997fc70acc35c4118a3ec))
* **Badge:** ensure number formatting gets not inherited ([#6444](https://github.com/dnbexperience/eufemia/issues/6444)) ([f53c8c7](https://github.com/dnbexperience/eufemia/commit/f53c8c7db51d500daf9dbdade25d58b0225872a3))
* **Forms:** improve typing for `setFieldStatus` ([#6435](https://github.com/dnbexperience/eufemia/issues/6435)) ([6be4843](https://github.com/dnbexperience/eufemia/commit/6be4843112ab7c8c9a06759fed1b3df58f01e960))
* improve llms.txt and metadata.json output ([#6370](https://github.com/dnbexperience/eufemia/issues/6370)) ([1f81129](https://github.com/dnbexperience/eufemia/commit/1f811295b3d389b397836714b7960f5d35f30e63))
* **Input:** only memoize `icon` for ProgressIndicator ([#6449](https://github.com/dnbexperience/eufemia/issues/6449)) ([18454a7](https://github.com/dnbexperience/eufemia/commit/18454a74ae968512f48459811ddf81f1e59f8888))

## [10.94.3](https://github.com/dnbexperience/eufemia/compare/v10.94.2...v10.94.3) (2026-01-16)


### :memo: Documentation

* **llms.txt:** add markdown files as source ([#6341](https://github.com/dnbexperience/eufemia/issues/6341)) ([3bfe222](https://github.com/dnbexperience/eufemia/commit/3bfe222980dde23349ccd59ddff2ce1e941a502d))


### :bug: Bug Fixes

* **Bundle:** prevent circular dependency ([#6342](https://github.com/dnbexperience/eufemia/issues/6342)) ([702fe82](https://github.com/dnbexperience/eufemia/commit/702fe8242b1a433ae1c2e78a5e7f735fb6f7fcdf))

## [10.94.2](https://github.com/dnbexperience/eufemia/compare/v10.94.1...v10.94.2) (2026-01-16)


### :bug: Bug Fixes

* **Bundle:** remove `exports` field to ensure running Vite builds ([#6334](https://github.com/dnbexperience/eufemia/issues/6334)) ([9ff30bc](https://github.com/dnbexperience/eufemia/commit/9ff30bcd5bfa66e5eeb10c74a986eda67cb56cc0))

## [10.94.1](https://github.com/dnbexperience/eufemia/compare/v10.94.0...v10.94.1) (2026-01-15)


### :bug: Bug Fixes

* **Bundle:** refactor exports field of package.json to improve Vitest performance ([#6332](https://github.com/dnbexperience/eufemia/issues/6332)) ([122d172](https://github.com/dnbexperience/eufemia/commit/122d1722ee2121b7ba1bdaabfcf4faa00c6bf0a7))

## [10.94.0](https://github.com/dnbexperience/eufemia/compare/v10.93.1...v10.94.0) (2026-01-15)


### :sparkles: Features

* **Autocomplete:** add `searchMatch="starts-with"` to allow a strict matching search ([#6277](https://github.com/dnbexperience/eufemia/issues/6277)) ([909c72c](https://github.com/dnbexperience/eufemia/commit/909c72cc55e626e76c0e0c1d471563d1f3d638f3))
* **Badge:** implement new default design and features with `status` (neutral, positive, warning, negative) and `subtle` ([#6240](https://github.com/dnbexperience/eufemia/issues/6240)) ([38af5b6](https://github.com/dnbexperience/eufemia/commit/38af5b6c0da62a3fe302db86e111d8dd8bd221b9))
* **Bundle:** add exports field in package.json ([#6271](https://github.com/dnbexperience/eufemia/issues/6271)) ([42582ea](https://github.com/dnbexperience/eufemia/commit/42582eacac23db9f2ae9059fb9316b16d087ac0e)), closes [#6270](https://github.com/dnbexperience/eufemia/issues/6270)
* **Bundle:** ensure fully specified ESM bundle with type=module  ([#6270](https://github.com/dnbexperience/eufemia/issues/6270)) ([d5c97c6](https://github.com/dnbexperience/eufemia/commit/d5c97c6e0114d986190302651e674c6e85724de5)), closes [#6248](https://github.com/dnbexperience/eufemia/issues/6248)
* **Bundle:** ensure fully specified file extensions ([#6248](https://github.com/dnbexperience/eufemia/issues/6248)) ([468a234](https://github.com/dnbexperience/eufemia/commit/468a2344899a79d9d76fbae343a6ce0d88f64d84))
* **DateFormat:** add `relativeTimeStyle` to control relative time formatting ([#6283](https://github.com/dnbexperience/eufemia/issues/6283)) ([9525054](https://github.com/dnbexperience/eufemia/commit/952505445680396aa48d2687a40687a0383bf9ac)), closes [#6279](https://github.com/dnbexperience/eufemia/issues/6279)
* **DateFormat:** add `timeStyle` including `dateTimeSeparator` ([#6279](https://github.com/dnbexperience/eufemia/issues/6279)) ([0545a32](https://github.com/dnbexperience/eufemia/commit/0545a32125607cf8aad814496161addc3afa895c))
* ensure Browserslist targets are fully supported in the bundle with needed polyfills ([#6242](https://github.com/dnbexperience/eufemia/issues/6242)) ([6c62def](https://github.com/dnbexperience/eufemia/commit/6c62defc0b3a9f158c8c8b96d48999043326a23d))
* **Forms:** support parent data access using dot paths `../myPath` ([#6219](https://github.com/dnbexperience/eufemia/issues/6219)) ([1b03121](https://github.com/dnbexperience/eufemia/commit/1b031216fd4317b1c9802c5f9b6f545ee50856b1)), closes [#6206](https://github.com/dnbexperience/eufemia/issues/6206)
* **Tabs:** add support for Badge notification inside a tab ([#6123](https://github.com/dnbexperience/eufemia/issues/6123)) ([908b193](https://github.com/dnbexperience/eufemia/commit/908b193505a73777df1327747bd8d4537f9e3046))


### :bug: Bug Fixes

* **Anchor:** ensure the `disabled` property does disable the anchor ([#6303](https://github.com/dnbexperience/eufemia/issues/6303)) ([61d7eaf](https://github.com/dnbexperience/eufemia/commit/61d7eaf4a52ef1e981dc8a01b9523f8a1a5c2939))
* **Button:** ensure correct `disabled` style when `href` is given ([#6325](https://github.com/dnbexperience/eufemia/issues/6325)) ([d2bd6ba](https://github.com/dnbexperience/eufemia/commit/d2bd6ba19c478545667a3c47cd4d8aac060c468a))
* **Provider:** should cascade translations from parent to nested provider ([#6309](https://github.com/dnbexperience/eufemia/issues/6309)) ([04ed8f9](https://github.com/dnbexperience/eufemia/commit/04ed8f99b85dc14bb1bec6c16e09e19f2059dc70))
* replace `Object.prototype.hasOwnProperty.call` -> `Object.hasOwn` ([#6220](https://github.com/dnbexperience/eufemia/issues/6220)) ([c35e571](https://github.com/dnbexperience/eufemia/commit/c35e57125599606956b34b0109927c45120e6c6a))

## [10.93.1](https://github.com/dnbexperience/eufemia/compare/v10.93.0...v10.93.1) (2026-01-09)


### :bug: Bug Fixes

* **Anchor:** prevent reverse tabnabbing ([#6223](https://github.com/dnbexperience/eufemia/issues/6223)) ([867de87](https://github.com/dnbexperience/eufemia/commit/867de87c8e9b30ba9003b53d8781779f309767f7))
* **Autocomplete:** XSS prevention ([#6238](https://github.com/dnbexperience/eufemia/issues/6238)) ([206dc70](https://github.com/dnbexperience/eufemia/commit/206dc708286aa9dd49854a2b65cc8514091d471c))
* **Field.Email:** add support for leading underscore among several more characters (atext) ([#6252](https://github.com/dnbexperience/eufemia/issues/6252)) ([6fa0ecf](https://github.com/dnbexperience/eufemia/commit/6fa0ecf543019fb849c5cbc397227934c0d6cca5))
* **Form.SubmitButton:** add `secondary` variant option ([#6251](https://github.com/dnbexperience/eufemia/issues/6251)) ([d949953](https://github.com/dnbexperience/eufemia/commit/d949953a809ff4d863f64e2b62501ea085a85f85)), closes [#6250](https://github.com/dnbexperience/eufemia/issues/6250)
* **Form.SubmitButton:** show indicator only on current button ([#6250](https://github.com/dnbexperience/eufemia/issues/6250)) ([750d7f4](https://github.com/dnbexperience/eufemia/commit/750d7f4113f7308c9efdb796dd78ff8846233006))
* **GlobalError:** remove redundant spacing classes ([#6221](https://github.com/dnbexperience/eufemia/issues/6221)) ([78fd9dc](https://github.com/dnbexperience/eufemia/commit/78fd9dc113143ac0036b3d0a769ed824653ba21b))
* **GlobalError:** remove usage of `dangerouslySetInnerHTML` ([#6218](https://github.com/dnbexperience/eufemia/issues/6218)) ([0004654](https://github.com/dnbexperience/eufemia/commit/0004654c59e14643ea533027b7dd121a26511134))
* **PaymentCard:** remove import of non-existent `cardDataPropTypes` ([#6253](https://github.com/dnbexperience/eufemia/issues/6253)) ([e38aed1](https://github.com/dnbexperience/eufemia/commit/e38aed188382871fe4c51797aa9f204a47bd6bea))
* **Provider:** clear corrupted session storage data and use defaultData when parsing error ([#6225](https://github.com/dnbexperience/eufemia/issues/6225)) ([a674ac2](https://github.com/dnbexperience/eufemia/commit/a674ac26d67d4053dc87aef6c714e4e0b6f755fb))
* **validateDOMAttributes:** prevent prototype pollution ([#6226](https://github.com/dnbexperience/eufemia/issues/6226)) ([2f72669](https://github.com/dnbexperience/eufemia/commit/2f72669c18221605aec4180a1e470f137234561e))
* **Wizard:** prevent navigation when ongoing async `fileHandler` in Field.Upload in a Iterate.Array ([#6159](https://github.com/dnbexperience/eufemia/issues/6159)) ([b05145f](https://github.com/dnbexperience/eufemia/commit/b05145fcd5bf054961309e0483bdae0acc97c372))

## [10.93.0](https://github.com/dnbexperience/eufemia/compare/v10.92.1...v10.93.0) (2026-01-06)


### :bug: Bug Fixes

* **Field.DateOfBirth:** support `labelSize` ([#6135](https://github.com/dnbexperience/eufemia/issues/6135)) ([47701fc](https://github.com/dnbexperience/eufemia/commit/47701fcf93baa1cb37e27fb03c270ebbd309e374))
* **Field.DateOfBirth:** support `labelSrOnly` ([#6136](https://github.com/dnbexperience/eufemia/issues/6136)) ([3d158a0](https://github.com/dnbexperience/eufemia/commit/3d158a0915ac61069e27c22f05fd5a2afc6a796d))
* **Field.Expiry:** adjust required message ([#6143](https://github.com/dnbexperience/eufemia/issues/6143)) ([c6fe7e0](https://github.com/dnbexperience/eufemia/commit/c6fe7e0af2af654e10712f68efa7a429741e8ab9))
* **Field.Expiry:** should not display error borders when providing `info` or `warning` ([#6138](https://github.com/dnbexperience/eufemia/issues/6138)) ([4a8ade7](https://github.com/dnbexperience/eufemia/commit/4a8ade7e41e864986e805b64f3b11b6eec33d55f))
* **Field.Password:** adjust required message ([#6144](https://github.com/dnbexperience/eufemia/issues/6144)) ([c49ac98](https://github.com/dnbexperience/eufemia/commit/c49ac9872472095e2c8493506c35e2555f8063df))
* **Form.InfoOverlay:** should work correctly with `reduceToVisibleFields` ([#6146](https://github.com/dnbexperience/eufemia/issues/6146)) ([86e3eff](https://github.com/dnbexperience/eufemia/commit/86e3eff5f85ff27313e5e489f7af94071387cde5))
* **Forms:** improve type safety for custom validators for `Field.BankAccountNumber` ([#6134](https://github.com/dnbexperience/eufemia/issues/6134)) ([81540dd](https://github.com/dnbexperience/eufemia/commit/81540dde9aa281153420434718778065b835d044)), closes [#6127](https://github.com/dnbexperience/eufemia/issues/6127)
* **Forms:** improve type safety for custom validators for `Field.Date` ([#6133](https://github.com/dnbexperience/eufemia/issues/6133)) ([2380aaf](https://github.com/dnbexperience/eufemia/commit/2380aafddbda90bc1f19aff2ef060726e979ead6)), closes [#6127](https://github.com/dnbexperience/eufemia/issues/6127)
* **Forms:** improve type safety for custom validators for `Field.DateOfBirth` ([#6132](https://github.com/dnbexperience/eufemia/issues/6132)) ([24a3bf6](https://github.com/dnbexperience/eufemia/commit/24a3bf62bd1fd4fc3b4f03f50b836ed07755590e)), closes [#6127](https://github.com/dnbexperience/eufemia/issues/6127)
* **Forms:** improve type safety for custom validators for `Field.Expiry` ([#6131](https://github.com/dnbexperience/eufemia/issues/6131)) ([c11914f](https://github.com/dnbexperience/eufemia/commit/c11914fcd0482f62a2b3b8ed558721ec0e211db0)), closes [#6127](https://github.com/dnbexperience/eufemia/issues/6127)
* **Forms:** improve type safety for custom validators for `Field.Name` ([#6130](https://github.com/dnbexperience/eufemia/issues/6130)) ([cba32bb](https://github.com/dnbexperience/eufemia/commit/cba32bb17967ff527fe2b96ca4b32af4169352ad)), closes [#6127](https://github.com/dnbexperience/eufemia/issues/6127)
* **Forms:** improve type safety for custom validators for `Field.NationalIdentityNumber` ([#6129](https://github.com/dnbexperience/eufemia/issues/6129)) ([ad0cc50](https://github.com/dnbexperience/eufemia/commit/ad0cc504d005c54133ade315b9f1bd8149e807fa)), closes [#6127](https://github.com/dnbexperience/eufemia/issues/6127)
* **Forms:** improve type safety for custom validators for `Field.OrganizationNumber` ([#6128](https://github.com/dnbexperience/eufemia/issues/6128)) ([d428979](https://github.com/dnbexperience/eufemia/commit/d428979cbb3bef445f770a0845e8db8bccb73d37)), closes [#6127](https://github.com/dnbexperience/eufemia/issues/6127)
* **InputMasked:** fix events argument type ([#6122](https://github.com/dnbexperience/eufemia/issues/6122)) ([c6fa08e](https://github.com/dnbexperience/eufemia/commit/c6fa08ea0764921a73f969b322115dff6def5380)), closes [/github.com/dnbexperience/eufemia/pull/5581#discussion_r2619387062](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/5581/issues/discussion_r2619387062)


### :memo: Documentation

* **Portal:** optimize a11y for search results ([#6157](https://github.com/dnbexperience/eufemia/issues/6157)) ([a8560e4](https://github.com/dnbexperience/eufemia/commit/a8560e4db861fc08d658fc5e236952246fadadc6))


### :sparkles: Features

* **CardFigure:** rewrite to TypeScript ([#6200](https://github.com/dnbexperience/eufemia/issues/6200)) ([4a98bc3](https://github.com/dnbexperience/eufemia/commit/4a98bc397b31a5e6224b0ba3a9f6b584d1dbe472))
* **ChildrenWithAge:** remove 0 as placeholder for age of children ([#6207](https://github.com/dnbexperience/eufemia/issues/6207)) ([dc61dcb](https://github.com/dnbexperience/eufemia/commit/dc61dcbdf3ca78c3081efd5d83f309258940e1f1))
* **Form.Section.EditButton:** add support for custom properties ([#6155](https://github.com/dnbexperience/eufemia/issues/6155)) ([2884106](https://github.com/dnbexperience/eufemia/commit/288410602fdaf22a09024f535dd991eb9df2ca13))
* **Forms:** access root data by using double slash `//myPath` path ([#6206](https://github.com/dnbexperience/eufemia/issues/6206)) ([d2949fc](https://github.com/dnbexperience/eufemia/commit/d2949fcd67201c0bac8cb7cec76493f231cd121a))
* **Img:** rewrite to TypeScript ([#6198](https://github.com/dnbexperience/eufemia/issues/6198)) ([5023eb5](https://github.com/dnbexperience/eufemia/commit/5023eb52b369dba59b4b4e702ca1644461e2b345))
* **Skeleton:** rewrite Article figure to TypeScript ([#6196](https://github.com/dnbexperience/eufemia/issues/6196)) ([dc3c540](https://github.com/dnbexperience/eufemia/commit/dc3c540ee66a70dbd09d85dce32732e2588ced1e))
* **Skeleton:** rewrite Circle figure to TypeScript ([#6195](https://github.com/dnbexperience/eufemia/issues/6195)) ([37d0036](https://github.com/dnbexperience/eufemia/commit/37d003659b1e069be91b0391b594582f7f7dee11))
* **Skeleton:** rewrite Product figure to TypeScript ([#6194](https://github.com/dnbexperience/eufemia/issues/6194)) ([eea4b93](https://github.com/dnbexperience/eufemia/commit/eea4b9320209567d6f85dde284d3e68f94cc3979))
* **Skeleton:** rewrite SkeletonHelper to TypeScript ([#6197](https://github.com/dnbexperience/eufemia/issues/6197)) ([2f3b0fe](https://github.com/dnbexperience/eufemia/commit/2f3b0fe8c5af78db6561565f7626d090293c60d3))
* **Skeleton:** rewrite Table figure to TypeScript ([#6193](https://github.com/dnbexperience/eufemia/issues/6193)) ([75447cd](https://github.com/dnbexperience/eufemia/commit/75447cdd19ddf176a5951c22d5b8db47ec5d0c8c))
* **SkipContent:** add `aria-live"polite"` when visible ([#6212](https://github.com/dnbexperience/eufemia/issues/6212)) ([2630322](https://github.com/dnbexperience/eufemia/commit/26303228e1b182cf0ebb3ac7565f19f2747010af))

## [10.92.1](https://github.com/dnbexperience/eufemia/compare/v10.92.0...v10.92.1) (2025-12-16)


### :memo: Documentation

* **Field.DateOfBirth:** remove unsupported props `layout`, `layoutOptions` & `labelSize` ([#6100](https://github.com/dnbexperience/eufemia/issues/6100)) ([870f00e](https://github.com/dnbexperience/eufemia/commit/870f00e0b5c86e069ddf6e5a2bd38ac5a422567e))


### :bug: Bug Fixes

* **Button:** ensure tooltip is rendered when initially active ([#6109](https://github.com/dnbexperience/eufemia/issues/6109)) ([5403fe4](https://github.com/dnbexperience/eufemia/commit/5403fe4ba1023503fecab895c901f1501f34d596))
* **DatePicker, TermDefinition:** add translated string to "focus trap" buttons ([#6099](https://github.com/dnbexperience/eufemia/issues/6099)) ([ffc6c10](https://github.com/dnbexperience/eufemia/commit/ffc6c1009cef63809e4ed7391fbc6b77f9f18b41))
* **Field.DateOfBirth:** adjust sizing of month and year fields ([#6080](https://github.com/dnbexperience/eufemia/issues/6080)) ([9ff21bb](https://github.com/dnbexperience/eufemia/commit/9ff21bb4e22ab1f511c3c761be96f9916fffad91)), closes [#6064](https://github.com/dnbexperience/eufemia/issues/6064)
* **Field.DateOfBirth:** width in horizontal layout ([#6106](https://github.com/dnbexperience/eufemia/issues/6106)) ([fc1bb0f](https://github.com/dnbexperience/eufemia/commit/fc1bb0fdd74e788ba7c7f2e9d1e21ad31d5c614a))
* **Field.PhoneNumber:** support `labelDescriptionInline` property ([#6101](https://github.com/dnbexperience/eufemia/issues/6101)) ([3d03336](https://github.com/dnbexperience/eufemia/commit/3d03336c7d6d0416bfa6950912026b3973802bd6))
* **Field.PhoneNumber:** width in horizontal layout ([#6105](https://github.com/dnbexperience/eufemia/issues/6105)) ([448b53a](https://github.com/dnbexperience/eufemia/commit/448b53a4f29be66d7b7905433221956974fd7c32))
* **Field.PostalCodeAndCity:** width in horizontal layout ([#6104](https://github.com/dnbexperience/eufemia/issues/6104)) ([9b4f5cb](https://github.com/dnbexperience/eufemia/commit/9b4f5cb85c1ff416f31e47e4edf1c05b063ebf37))
* **Field.Upload:** correctly handle `fileMaxSize` error using async `fileHandler` ([#6107](https://github.com/dnbexperience/eufemia/issues/6107)) ([afc5ffe](https://github.com/dnbexperience/eufemia/commit/afc5ffe27033bb7ccc45545a6e22452ca88f59f7))
* **Portal:** append sub-page to page title ([#6110](https://github.com/dnbexperience/eufemia/issues/6110)) ([95f95d9](https://github.com/dnbexperience/eufemia/commit/95f95d936a8e46efcb72f5fbb298302ce14037d0))
* **Portal:** improve search results for sub-pages ([#6111](https://github.com/dnbexperience/eufemia/issues/6111)) ([7c6ad10](https://github.com/dnbexperience/eufemia/commit/7c6ad105b39923dee37f7f7af7e369d693c43b65))
* **TermDefinition:** improve performance by disabling keepInDOM ([#6096](https://github.com/dnbexperience/eufemia/issues/6096)) ([c0cbf78](https://github.com/dnbexperience/eufemia/commit/c0cbf789c996f39cf6501dac457b15445385c2fd))

## [10.92.0](https://github.com/dnbexperience/eufemia/compare/v10.91.1...v10.92.0) (2025-12-11)


### :memo: Documentation

* **Avatar:** add example using `CountryFlag` in `Badge` of `Avatar` ([#6078](https://github.com/dnbexperience/eufemia/issues/6078)) ([f275842](https://github.com/dnbexperience/eufemia/commit/f275842ef68e8c2fd649a1b64df9ab5494cd579a))
* **Badge:** add notification badge info ([#6067](https://github.com/dnbexperience/eufemia/issues/6067)) ([663230f](https://github.com/dnbexperience/eufemia/commit/663230f259d71da45b33d4d9218e20668fc2b6f7))
* **Badge:** remove unused alternatives ([#6055](https://github.com/dnbexperience/eufemia/issues/6055)) ([558d72b](https://github.com/dnbexperience/eufemia/commit/558d72bf412aaffab7d2c0b010997462057a1d81))


### :sparkles: Features

* **Badge:** add variant `content` ([#6079](https://github.com/dnbexperience/eufemia/issues/6079)) ([9c4cb1f](https://github.com/dnbexperience/eufemia/commit/9c4cb1f2c247d5ea3f43c025721317db103e85c0))
* **Badge:** align to latest UX and render numbers as given (without 9+) ([#6053](https://github.com/dnbexperience/eufemia/issues/6053)) ([ec64de1](https://github.com/dnbexperience/eufemia/commit/ec64de1ca011cae869bdf6cb5be3263ad64d16b1))
* **CountryFlag:** add sizes `xx-small` & `x-small` ([#6071](https://github.com/dnbexperience/eufemia/issues/6071)) ([6744856](https://github.com/dnbexperience/eufemia/commit/674485670f95f91af433b3ef5262e28f1ec6359f))
* **Field.Expiry:** export `expiryValidator` ([#6065](https://github.com/dnbexperience/eufemia/issues/6065)) ([d019ad5](https://github.com/dnbexperience/eufemia/commit/d019ad5b22e38ec451c70b66570046ea287c65cf))
* **Field.Upload:** add `labelSuffix` property ([#6077](https://github.com/dnbexperience/eufemia/issues/6077)) ([3f0dea2](https://github.com/dnbexperience/eufemia/commit/3f0dea22fafd41310a6e7c6cf73d4faad41991c0))
* **Form.Section:** add `schema` support ([#6068](https://github.com/dnbexperience/eufemia/issues/6068)) ([6afc552](https://github.com/dnbexperience/eufemia/commit/6afc55297a888f69dc1c7ee79472765e6cab5f34))
* **Forms:** add `onStatusChange` event to all Field.* components ([#6076](https://github.com/dnbexperience/eufemia/issues/6076)) ([66a7a99](https://github.com/dnbexperience/eufemia/commit/66a7a990736af796e7d367f40a6f1948a2bfa17d))


### :bug: Bug Fixes

* **DatePicker:** remove incorrect aria-hidden from popover container ([#6090](https://github.com/dnbexperience/eufemia/issues/6090)) ([5dcef90](https://github.com/dnbexperience/eufemia/commit/5dcef9099527f16c5953e1ff2cc55628d37b37e4))
* **Dialog, Drawer:** add translation support for title ([#6092](https://github.com/dnbexperience/eufemia/issues/6092)) ([eb2347e](https://github.com/dnbexperience/eufemia/commit/eb2347e19c5e8acff00dcf18935fd5e80660cd08))
* **Field.DateOfBirth:** display optional label when `required={false}` ([#6073](https://github.com/dnbexperience/eufemia/issues/6073)) ([8479892](https://github.com/dnbexperience/eufemia/commit/8479892b7f1deb440287adb300fda2bc36ca7fdb))
* **Field.PhoneNumber:** phone number label should overflow its field ([#6081](https://github.com/dnbexperience/eufemia/issues/6081)) ([0278ca8](https://github.com/dnbexperience/eufemia/commit/0278ca8b43a46728598555641e50a29f00f939df))
* **Field.Upload:** display optional label when `required={false}` ([#6072](https://github.com/dnbexperience/eufemia/issues/6072)) ([eff7a46](https://github.com/dnbexperience/eufemia/commit/eff7a46f7eb0ec3087f4f2f3f21f6813a4f99c12))
* **Forms:** automatically use `onBlurValidator` as `onChangeValidator` when `validateContinuously` is enabled ([#6087](https://github.com/dnbexperience/eufemia/issues/6087)) ([074a7cb](https://github.com/dnbexperience/eufemia/commit/074a7cba3b3eaf9dc460c1b060b184ca59a5a3b4))
* **Forms:** improve pattern and length of Field.Name and handle validation with `onBlurValidator` ([#6082](https://github.com/dnbexperience/eufemia/issues/6082)) ([2b69d25](https://github.com/dnbexperience/eufemia/commit/2b69d25a376b812936e4f89522ccbe6bd0ad0e26))
* **Icon:** render large icons with correct stroke width ([#6069](https://github.com/dnbexperience/eufemia/issues/6069)) ([1e9f2bf](https://github.com/dnbexperience/eufemia/commit/1e9f2bf0d125a321b007df71ff9813ce30d4d081))
* **Tooltip:** remove flickering while positioning ([#6093](https://github.com/dnbexperience/eufemia/issues/6093)) ([39c92e5](https://github.com/dnbexperience/eufemia/commit/39c92e53e7d28b39fe88066f6693fde0e1404877))

## [10.91.1](https://github.com/dnbexperience/eufemia/compare/v10.91.0...v10.91.1) (2025-12-09)


### :memo: Documentation

* **DatePicker:** automatically alignment of calendar using `alignPicker` ([#6017](https://github.com/dnbexperience/eufemia/issues/6017)) ([a2270b3](https://github.com/dnbexperience/eufemia/commit/a2270b30a2cab0833a604aecb95b6086173b9db0))
* **Forms:** add example for dependent Ajv schema ([#6043](https://github.com/dnbexperience/eufemia/issues/6043)) ([e854266](https://github.com/dnbexperience/eufemia/commit/e8542661eb13436765a03ca19fd549aaac411ae3))
* **TermDefinition:** add examples of how to use inside label and help text ([#6028](https://github.com/dnbexperience/eufemia/issues/6028)) ([b908569](https://github.com/dnbexperience/eufemia/commit/b908569146f59d728c7c92cdab56cbb7ad9829c4))


### :bug: Bug Fixes

* **Checkbox:** improve focus handling when clicking ([#6040](https://github.com/dnbexperience/eufemia/issues/6040)) ([2caad7a](https://github.com/dnbexperience/eufemia/commit/2caad7a3d1153306fbe8be76306239867845bc47))
* **DatePicker:** ensure backwards compatibility for when used inside Nucleus ([#6024](https://github.com/dnbexperience/eufemia/issues/6024)) ([5f81914](https://github.com/dnbexperience/eufemia/commit/5f8191419103ee2b2b20522740e6d5b46b309da8))
* **DatePicker:** improve "today" highlight styling ([#6015](https://github.com/dnbexperience/eufemia/issues/6015)) ([c7670e5](https://github.com/dnbexperience/eufemia/commit/c7670e57c3ac96af3acdb57a7003bc4a711f801a))
* **Field.Upload:** should not display error removing file using async `fileHandler` ([#6025](https://github.com/dnbexperience/eufemia/issues/6025)) ([57418f1](https://github.com/dnbexperience/eufemia/commit/57418f166ec6893475728ed38cbc47f16049b42d))
* **Forms:** ensure help property works in Field.Boolean when variant is `checkbox` ([#6034](https://github.com/dnbexperience/eufemia/issues/6034)) ([76be2f7](https://github.com/dnbexperience/eufemia/commit/76be2f74f9892e35a9e4e09fdf8f193cb6d4eeef))
* **Forms:** improve async validator detection and behavior ([#6045](https://github.com/dnbexperience/eufemia/issues/6045)) ([b1ba42f](https://github.com/dnbexperience/eufemia/commit/b1ba42f6d2b8e017328c388986802e7155e29ae3)), closes [#6032](https://github.com/dnbexperience/eufemia/issues/6032)
* **Forms:** prevent Wizard step navigation during pending validation ([#6044](https://github.com/dnbexperience/eufemia/issues/6044)) ([d713f6f](https://github.com/dnbexperience/eufemia/commit/d713f6fca118f4a72ecad3371a87ab3febec43ad)), closes [#6032](https://github.com/dnbexperience/eufemia/issues/6032) [#6045](https://github.com/dnbexperience/eufemia/issues/6045)
* **HelpButtonInline:** improve focus handling when opening and closing ([#6038](https://github.com/dnbexperience/eufemia/issues/6038)) ([a182d0c](https://github.com/dnbexperience/eufemia/commit/a182d0c7da2987383e9bb9a515235543051a93e7)), closes [#6036](https://github.com/dnbexperience/eufemia/issues/6036)
* **Iterate.Array:** set data context value to `undefined` when no value was given ([#6050](https://github.com/dnbexperience/eufemia/issues/6050)) ([21be4b0](https://github.com/dnbexperience/eufemia/commit/21be4b093ef3859f48b9f864f69edc9184912af5))
* **NumberFormat:** improve focus handling when selecting ([#6039](https://github.com/dnbexperience/eufemia/issues/6039)) ([7d6fbad](https://github.com/dnbexperience/eufemia/commit/7d6fbad6df87409bea7aa10a176205c4c5ae3dbe)), closes [#6036](https://github.com/dnbexperience/eufemia/issues/6036)
* **NumberFormat:** omit select & copy helper on touch devices ([#6041](https://github.com/dnbexperience/eufemia/issues/6041)) ([1d4e782](https://github.com/dnbexperience/eufemia/commit/1d4e782916445931b45d1ef0845942efc613bf53)), closes [#6033](https://github.com/dnbexperience/eufemia/issues/6033)
* **NumberFormat:** show Tooltip on user copy action ([#6027](https://github.com/dnbexperience/eufemia/issues/6027)) ([16091ea](https://github.com/dnbexperience/eufemia/commit/16091ea97436fa442d49b83cb2527729366c3bc4))
* **Popover:** make VoiceOver focus handling reliable ([#6030](https://github.com/dnbexperience/eufemia/issues/6030)) ([57a3c57](https://github.com/dnbexperience/eufemia/commit/57a3c570bc500d713d81bff0901355297e355bb8))
* **Slider:** adjust Tooltip position when value changes ([#6060](https://github.com/dnbexperience/eufemia/issues/6060)) ([6a8bf15](https://github.com/dnbexperience/eufemia/commit/6a8bf150df5a6f1f46c93bf8e3a54fb47d247ad2)), closes [#6059](https://github.com/dnbexperience/eufemia/issues/6059)
* **TermDefinition:** improve focus handling when closing ([#6036](https://github.com/dnbexperience/eufemia/issues/6036)) ([3f15653](https://github.com/dnbexperience/eufemia/commit/3f156534e74f407a271b49178b03d56bf8c08582))
* **TermDefinition:** prevent hover when inside FormLabel ([#6029](https://github.com/dnbexperience/eufemia/issues/6029)) ([eb51459](https://github.com/dnbexperience/eufemia/commit/eb51459de599580e2fe684f864234fb09d712d26))
* **Tooltip,TermDefinition,DatePicker:** improve handling of screen-reader focus when navigating out of content ([#6019](https://github.com/dnbexperience/eufemia/issues/6019)) ([71b17d5](https://github.com/dnbexperience/eufemia/commit/71b17d5bee80fac92c829cb48a80e19446595be0))
* **Tooltip:** improve element validity check ([#6012](https://github.com/dnbexperience/eufemia/issues/6012)) ([f39dc69](https://github.com/dnbexperience/eufemia/commit/f39dc6972ae5b33fc9e304d33beb317661ded220))
* **Tooltip:** improve performance by disabling keepInDOM ([#6026](https://github.com/dnbexperience/eufemia/issues/6026)) ([cec63e3](https://github.com/dnbexperience/eufemia/commit/cec63e377fea13b630e2a1bd0691c8771bb90ca2)), closes [#6011](https://github.com/dnbexperience/eufemia/issues/6011)
* **Wizard:** prevent navigation when there's an ongoing async `fileHandler` in Field.Upload ([#6032](https://github.com/dnbexperience/eufemia/issues/6032)) ([381b6e2](https://github.com/dnbexperience/eufemia/commit/381b6e266cc1cd7e692d1e84f7641f4e45e884e0)), closes [#6044](https://github.com/dnbexperience/eufemia/issues/6044) [#6045](https://github.com/dnbexperience/eufemia/issues/6045)

## [10.91.0](https://github.com/dnbexperience/eufemia/compare/v10.90.1...v10.91.0) (2025-11-28)


### :memo: Documentation

* **DatePicker:** add example how to define "today" highlighting ([#5983](https://github.com/dnbexperience/eufemia/issues/5983)) ([fac4567](https://github.com/dnbexperience/eufemia/commit/fac45674a8098021a04f46b3d2bccd9f9be3c74f)), closes [#5982](https://github.com/dnbexperience/eufemia/issues/5982)
* **Form.clearData:** display in side menu ([#5997](https://github.com/dnbexperience/eufemia/issues/5997)) ([f83bf3a](https://github.com/dnbexperience/eufemia/commit/f83bf3a3fad334b986d5c7348b4ce0a1ac2a4966))


### :bug: Bug Fixes

* **Autocomplete:** add `onClear` event ([#6004](https://github.com/dnbexperience/eufemia/issues/6004)) ([6df5aad](https://github.com/dnbexperience/eufemia/commit/6df5aad3dec80d3fdb15c8fa5033c1f2ddbeebe1))
* **Currency formatting:** place currency sign before value when `currencyDisplay` is `code` ([#6002](https://github.com/dnbexperience/eufemia/issues/6002)) ([9867ecb](https://github.com/dnbexperience/eufemia/commit/9867ecb69cd6a6ab8fea73ddb5b2f547478c3996))
* **Field.DateOfBirth:** `onChange` should return `undefined` after removing input ([#5991](https://github.com/dnbexperience/eufemia/issues/5991)) ([75f01cd](https://github.com/dnbexperience/eufemia/commit/75f01cdf528ce3ba84389949bc8ac4b2134a389f))
* **Field.Expiry:** `onChange` should return `undefined` after removing input ([#5992](https://github.com/dnbexperience/eufemia/issues/5992)) ([4d803e7](https://github.com/dnbexperience/eufemia/commit/4d803e7d98070030cdeff9df26133a388cafba7a))
* **Field.PhoneNumber:** should set `undefined` in Form.Handler when phoneNumber is not set ([#5993](https://github.com/dnbexperience/eufemia/issues/5993)) ([e63fef0](https://github.com/dnbexperience/eufemia/commit/e63fef0f13d17284a8f380caedee75fb288ff9e9))
* **Field.Upload:** `onChange` should return `undefined` after removing input ([#5998](https://github.com/dnbexperience/eufemia/issues/5998)) ([79ee68f](https://github.com/dnbexperience/eufemia/commit/79ee68f86835630292b1304ec690825c7cdede68))
* **Logo:** ensure support of `ui` as the brand value ([#6005](https://github.com/dnbexperience/eufemia/issues/6005)) ([b3de26f](https://github.com/dnbexperience/eufemia/commit/b3de26f6e55342165c986d0de78fdf43beea3a35))


### :sparkles: Features

* **DateFormat:** add `getOsloDate` ([#5982](https://github.com/dnbexperience/eufemia/issues/5982)) ([f7205cb](https://github.com/dnbexperience/eufemia/commit/f7205cbb31fcb87d9cc2753d8c85194f78e2e32f))
* **DateFormat:** add `relativeTimeReference` property to handle relative time reference ([#5971](https://github.com/dnbexperience/eufemia/issues/5971)) ([47dd1ec](https://github.com/dnbexperience/eufemia/commit/47dd1ec99d34218f177786007abe9acb2cb2ad1a))
* **DatePicker:** auto align position if needed (implement Popover) ([#5969](https://github.com/dnbexperience/eufemia/issues/5969)) ([52022fd](https://github.com/dnbexperience/eufemia/commit/52022fd31f909724007c00001b3e1c7defa765b6))
* **NumberFormat:** TypeScript improvements for spacing props ([#5955](https://github.com/dnbexperience/eufemia/issues/5955)) ([97734bb](https://github.com/dnbexperience/eufemia/commit/97734bbd08918ce19f2ff79641d4d12d6bae84fc))
* **Paragraph:** add `abbr` example ([#5996](https://github.com/dnbexperience/eufemia/issues/5996)) ([b5b391a](https://github.com/dnbexperience/eufemia/commit/b5b391aea4157d0a5b7932842a86ea52d81919e7))
* **Popover:** add new component (for internal use only) ([#5966](https://github.com/dnbexperience/eufemia/issues/5966)) ([11ed174](https://github.com/dnbexperience/eufemia/commit/11ed1748a12a80bef0300ba8595ab3ab293e61b9))
* **TermDefinition:** add new component ([#5970](https://github.com/dnbexperience/eufemia/issues/5970)) ([1089136](https://github.com/dnbexperience/eufemia/commit/108913642fc0c622299ab1bcd6dc78c416a7e443))
* **Tooltip:** implement Popover ([#5968](https://github.com/dnbexperience/eufemia/issues/5968)) ([bbe7e72](https://github.com/dnbexperience/eufemia/commit/bbe7e7281c4613c9edfaae4e753b69fc06a35a5c)), closes [#5966](https://github.com/dnbexperience/eufemia/issues/5966)
* **useSharedContext:** add hook for easier typing and usage ([#5965](https://github.com/dnbexperience/eufemia/issues/5965)) ([1817ea6](https://github.com/dnbexperience/eufemia/commit/1817ea6aa935c41512b7d0a8c3a61669d658effe))

## [10.90.1](https://github.com/dnbexperience/eufemia/compare/v10.90.0...v10.90.1) (2025-11-25)


### :memo: Documentation

* **Tailwind:** update usage for alignment utilities ([#5953](https://github.com/dnbexperience/eufemia/issues/5953)) ([a13e91f](https://github.com/dnbexperience/eufemia/commit/a13e91f01e2e7214c7ce908283653c792fefe36c))


### :bug: Bug Fixes

* **Autocomplete:** prevent closing Modal/Dialog/Drawer when escape key is pressed ([#5975](https://github.com/dnbexperience/eufemia/issues/5975)) ([4fa6948](https://github.com/dnbexperience/eufemia/commit/4fa694807ec998eca8af9c13f5c1e2f99fa58c7d)), closes [#5974](https://github.com/dnbexperience/eufemia/issues/5974)
* **DrawerList:** prevent closing Modal/Dialog/Drawer when escape key is pressed ([#5974](https://github.com/dnbexperience/eufemia/issues/5974)) ([e015e94](https://github.com/dnbexperience/eufemia/commit/e015e94956256fc6c60d028f99bb9bd261185dd8))
* **Dropdown:** prevent closing Modal/Dialog/Drawer when escape key is pressed ([#5973](https://github.com/dnbexperience/eufemia/issues/5973)) ([d688c5e](https://github.com/dnbexperience/eufemia/commit/d688c5e341ff6dbbaa189382e18674358f0c0f51)), closes [#5974](https://github.com/dnbexperience/eufemia/issues/5974)
* **Field.Number:** only display default max/min errors when no exceeding maximum/minimum errors exist ([#5987](https://github.com/dnbexperience/eufemia/issues/5987)) ([8a2e122](https://github.com/dnbexperience/eufemia/commit/8a2e1220950dde0af52ea0cd4200687815f4a0f3))
* **GlobalStatus:** `title` should override title in Eufemia Forms ([#5950](https://github.com/dnbexperience/eufemia/issues/5950)) ([21fa3d5](https://github.com/dnbexperience/eufemia/commit/21fa3d53774bd560018365563a08bd4a1e22a8cf))
* **GlobalStatus:** add escape case alongside esc case ([#5976](https://github.com/dnbexperience/eufemia/issues/5976)) ([30f6639](https://github.com/dnbexperience/eufemia/commit/30f663951b9a22fa39008ff2b79e8588d4845fbc))
* **HelpButtonInline:** prevent closing Modal/Dialog/Drawer when escape key is pressed ([#5972](https://github.com/dnbexperience/eufemia/issues/5972)) ([44cbe4b](https://github.com/dnbexperience/eufemia/commit/44cbe4bc2af6e787fa77b236a9db534146eba144))
* **Modal:** ensure the user can always select text ([#5967](https://github.com/dnbexperience/eufemia/issues/5967)) ([575f817](https://github.com/dnbexperience/eufemia/commit/575f8172c572c4046d717be803055541e4c996e9))
* **Modal:** ensure using `open_state` works with React v19 ([#5959](https://github.com/dnbexperience/eufemia/issues/5959)) ([3828bd0](https://github.com/dnbexperience/eufemia/commit/3828bd0d749d5ca5639d825f7e87b203fb28ebea))
* **P:** reset nesting inside Dialog, Drawer and Modal (render p instead of span) ([#5985](https://github.com/dnbexperience/eufemia/issues/5985)) ([dca9b47](https://github.com/dnbexperience/eufemia/commit/dca9b47986a99124db1e755f55eeb495a5f9fc1b))
* **Tabs:** Tabs.Content in React v19 ([#5962](https://github.com/dnbexperience/eufemia/issues/5962)) ([82d2b24](https://github.com/dnbexperience/eufemia/commit/82d2b248352be20e968ee8816e211d4eb117d82c))

## [10.90.0](https://github.com/dnbexperience/eufemia/compare/v10.89.0...v10.90.0) (2025-11-20)


### :memo: Documentation

* **Contribution Guide:** add "How to structure components" ([#5922](https://github.com/dnbexperience/eufemia/issues/5922)) ([6187d04](https://github.com/dnbexperience/eufemia/commit/6187d0493e6381246f3ce62fa4fd943e6bbbd8f4))


### :bug: Bug Fixes

* **Button:** styling of error state in `variant="tertiary"` ([#5935](https://github.com/dnbexperience/eufemia/issues/5935)) ([443f4d3](https://github.com/dnbexperience/eufemia/commit/443f4d32a6cc29e6cf448b6dabac33c2cfd77273))
* **DatePicker:** only render border when there's a footer ([#5949](https://github.com/dnbexperience/eufemia/issues/5949)) ([8883874](https://github.com/dnbexperience/eufemia/commit/8883874b8b5060f39a333690d291e95c5fa610ee))
* **Dialog, Drawer and Modal:** correct usage and documentation about `rootId` and `root_id` ([#5933](https://github.com/dnbexperience/eufemia/issues/5933)) ([a54997f](https://github.com/dnbexperience/eufemia/commit/a54997fcf5e2909d38356017c77ab64752c59ca8))
* **Field.PostalCodeAndCity:** TypeScript issues for spacing properties ([#5956](https://github.com/dnbexperience/eufemia/issues/5956)) ([7979d29](https://github.com/dnbexperience/eufemia/commit/7979d29a07daad1123fdb5f802577f4a1374f354))
* **Pagination:** remove usage of findDOMNode ([#5960](https://github.com/dnbexperience/eufemia/issues/5960)) ([b2d1467](https://github.com/dnbexperience/eufemia/commit/b2d14674ede3d6d66796cbbc0148ba48fc6cfc4a))
* **Value.Number:** TypeScript issues for spacing props ([#5954](https://github.com/dnbexperience/eufemia/issues/5954)) ([2657a36](https://github.com/dnbexperience/eufemia/commit/2657a36dc4325ed997804797f473de587d515879))


### :sparkles: Features

* **Forms:** add `disableEditing` to Form.Section ([#5945](https://github.com/dnbexperience/eufemia/issues/5945)) ([df61abc](https://github.com/dnbexperience/eufemia/commit/df61abcc4735020821b5c55391e16c9c5923f4b7))
* **GlobalStatus:** redesign spacing ([#5946](https://github.com/dnbexperience/eufemia/issues/5946)) ([e08fe7e](https://github.com/dnbexperience/eufemia/commit/e08fe7ed37fcfafdc651290f80399fdd59f1c5dd))
* **PortalRoot:** allow custom portal root placement with `id`, `beforeSelector`, `insideSelector` and `PortalRoot.Provider` ([#5923](https://github.com/dnbexperience/eufemia/issues/5923)) ([9dd9e66](https://github.com/dnbexperience/eufemia/commit/9dd9e66661018a50956ba28e668ab6fb1d02aa66))
* **Upload:** add `deleteButtonProps` to `FileItem` ([#5952](https://github.com/dnbexperience/eufemia/issues/5952)) ([88144a3](https://github.com/dnbexperience/eufemia/commit/88144a33ec90ce3ec84c0be860dcca10d1ed454d))

## [10.89.0](https://github.com/dnbexperience/eufemia/compare/v10.88.0...v10.89.0) (2025-11-05)


### :memo: Documentation

* **Autocomplete:** correct type of `showAll` to be React.Node ([#5914](https://github.com/dnbexperience/eufemia/issues/5914)) ([a26101c](https://github.com/dnbexperience/eufemia/commit/a26101cd10559d3b8665af194a69845527eb17b8))


### :sparkles: Features

* **Field.PhoneNumber:** add `numberLabel` and forward `label` to the field block (legend/fieldset) ([#5888](https://github.com/dnbexperience/eufemia/issues/5888)) ([ec2a11a](https://github.com/dnbexperience/eufemia/commit/ec2a11a5a5c74b4ec663158321bcccd606625496))
* **Logo:** add DNB Eiendom ([#5881](https://github.com/dnbexperience/eufemia/issues/5881)) ([1689f37](https://github.com/dnbexperience/eufemia/commit/1689f3710f90de46d015d8a78833b5d9bcaa1db6))
* **Pagination:** swap navigation buttons with page number buttons ([#5916](https://github.com/dnbexperience/eufemia/issues/5916)) ([1be0b6d](https://github.com/dnbexperience/eufemia/commit/1be0b6d998727a1d0bd6048576440ab0c3c27efe))
* **Typography:** add support for `proseMaxWidth` (for default width) to P and H2 etc. ([#5885](https://github.com/dnbexperience/eufemia/issues/5885)) ([ea5cf6b](https://github.com/dnbexperience/eufemia/commit/ea5cf6b550f6ab1ad900f591c4bfa77b10691797)), closes [#5857](https://github.com/dnbexperience/eufemia/issues/5857)


### :bug: Bug Fixes

* **Dropdown, Autocomplete:** keyboard navigation fixes ([#5444](https://github.com/dnbexperience/eufemia/issues/5444)) ([96b6e3a](https://github.com/dnbexperience/eufemia/commit/96b6e3ab04e6dde8b50446876b5f61a841e0397d))
* **Field.DateOfBirth:** support `labelDescription` ([#5893](https://github.com/dnbexperience/eufemia/issues/5893)) ([2f53eff](https://github.com/dnbexperience/eufemia/commit/2f53eff29cb4ca467251d413b342be99c2b28aaf))
* **Field.Date:** should reset value when pressing reset button ([#5898](https://github.com/dnbexperience/eufemia/issues/5898)) ([b8a2ba2](https://github.com/dnbexperience/eufemia/commit/b8a2ba279415a725457cd449e350f6fdc806cf47))
* **InfoOverlay:** should not bleed `content` property to data ([#5897](https://github.com/dnbexperience/eufemia/issues/5897)) ([e39e9ae](https://github.com/dnbexperience/eufemia/commit/e39e9aeafecfb9d7a54745d4d5249b1c62f3bd3f))
* **Modal:** should only render one `title` text content at the time ([#5917](https://github.com/dnbexperience/eufemia/issues/5917)) ([51a02af](https://github.com/dnbexperience/eufemia/commit/51a02af2a373c3e844f6b9b3b72c241e4b67124a))

## [10.88.0](https://github.com/dnbexperience/eufemia/compare/v10.87.0...v10.88.0) (2025-10-29)


### :memo: Documentation

* **Field.Upload:** add example of how to validate custom file sizes ([#5856](https://github.com/dnbexperience/eufemia/issues/5856)) ([2622d1b](https://github.com/dnbexperience/eufemia/commit/2622d1b3539234941daff453e1fa184b6ae1ef11))
* **Upload:** button is rendered when `onFileClick` ([#5859](https://github.com/dnbexperience/eufemia/issues/5859)) ([3a97516](https://github.com/dnbexperience/eufemia/commit/3a975162494919bb04c5218bffc0fa87aba90043))


### :bug: Bug Fixes

* **Upload:** error message when `acceptedFileTypes` is `AcceptedFileType[]` ([#5861](https://github.com/dnbexperience/eufemia/issues/5861)) ([ae09090](https://github.com/dnbexperience/eufemia/commit/ae090905c2ed9e15af471cde4a98a18bba9debbc))
* **Upload:** left align button when `onFileClick` ([#5860](https://github.com/dnbexperience/eufemia/issues/5860)) ([00b2b15](https://github.com/dnbexperience/eufemia/commit/00b2b154223cf4c1d1885ca72adbbb1cce9c2e1b))
* **Upload:** should not call `setInternalFiles` on `setFiles` ([#5873](https://github.com/dnbexperience/eufemia/issues/5873)) ([fd1e388](https://github.com/dnbexperience/eufemia/commit/fd1e3885ec4ba5a21f17c90e877a8ceed95bcc6d))


### :sparkles: Features

* **Typography:** introduce `--prose-max-width` for CSS and `proseMaxWidth` for Headings and the P paragraph element ([#5857](https://github.com/dnbexperience/eufemia/issues/5857)) ([1bd08ad](https://github.com/dnbexperience/eufemia/commit/1bd08ad7f5da2f270ec79ab6efccc2a3b01b939a))
* **Upload:** add `clearFiles` to clear files of Upload component ([#5864](https://github.com/dnbexperience/eufemia/issues/5864)) ([8d83ff2](https://github.com/dnbexperience/eufemia/commit/8d83ff2b728a6bb5cbe6f232b50b5ebe7d2b9fd7))

## [10.87.0](https://github.com/dnbexperience/eufemia/compare/v10.86.0...v10.87.0) (2025-10-24)


### :bug: Bug Fixes

* **Form.Iterate:** preserve JSX when replacing `{itemNo}` in labels ([#5725](https://github.com/dnbexperience/eufemia/issues/5725)) ([eb388b2](https://github.com/dnbexperience/eufemia/commit/eb388b26662b221ea87bf1dac60a6bb3144bd31b))
* **renderWithFormatting:** enhance performance ([#5742](https://github.com/dnbexperience/eufemia/issues/5742)) ([6d52a07](https://github.com/dnbexperience/eufemia/commit/6d52a075e09d8d7b9278e67ace1764b2d8714ed7)), closes [#5744](https://github.com/dnbexperience/eufemia/issues/5744)


### :memo: Documentation

* generate per-page metadata.json + llms.txt ([#5825](https://github.com/dnbexperience/eufemia/issues/5825)) ([cc42ad2](https://github.com/dnbexperience/eufemia/commit/cc42ad2530b114b32186b1bb393410e427d94a05))
* rewrite Getting Started ([#5816](https://github.com/dnbexperience/eufemia/issues/5816)) ([654216c](https://github.com/dnbexperience/eufemia/commit/654216c540defe1625e56bebba3cc6dc9497d9c5))


### :sparkles: Features

* add support for DNB Carnegie ([#5817](https://github.com/dnbexperience/eufemia/issues/5817)) ([a2ad34a](https://github.com/dnbexperience/eufemia/commit/a2ad34a5405d27df670141d0e6d59e68bff9a046))
* **Logo:** add `svg` property for providing a custom (imported) logo ([#5783](https://github.com/dnbexperience/eufemia/issues/5783)) ([8cc170f](https://github.com/dnbexperience/eufemia/commit/8cc170ff71360c1bc0661c3eddbc8d7c03c83c18))
* **Translation:** add support for formatted text (simple markdown like) by using `renderWithFormatting` ([#5744](https://github.com/dnbexperience/eufemia/issues/5744)) ([4e19327](https://github.com/dnbexperience/eufemia/commit/4e19327f14e83e6684a39bef1faa76b394a93d41)), closes [#5727](https://github.com/dnbexperience/eufemia/issues/5727)
* **Translation:** enhance support for typing via generic `<Translation<SupportedTypes> id={(t) => t.my.string} />` ([#5727](https://github.com/dnbexperience/eufemia/issues/5727)) ([44e872f](https://github.com/dnbexperience/eufemia/commit/44e872f4337cdde97833e41ea3ab02b9e1e71fa3))

## [10.86.0](https://github.com/dnbexperience/eufemia/compare/v10.85.1...v10.86.0) (2025-10-17)


### :memo: Documentation

* use `makeAjvInstance` to create an Ajv instance ([#5614](https://github.com/dnbexperience/eufemia/issues/5614)) ([304e8eb](https://github.com/dnbexperience/eufemia/commit/304e8eb467f2d355330d6f17b81c83f6e04371d6))


### :bug: Bug Fixes

* **Autocomplete:** skip unnecessary render of AriaLive ([#5667](https://github.com/dnbexperience/eufemia/issues/5667)) ([754a1e0](https://github.com/dnbexperience/eufemia/commit/754a1e008c643dc9773663375be646c2129d9c81))
* **Field.DateOfBirth:** ensure smart autofill when tabbing out of day and month ([#5603](https://github.com/dnbexperience/eufemia/issues/5603)) ([ac85b76](https://github.com/dnbexperience/eufemia/commit/ac85b7648ef4217b57c44dfdf26ca0103a635838))
* **Field.Expiry:** ensure support for `transformIn` and `transformOut` ([#5591](https://github.com/dnbexperience/eufemia/issues/5591)) ([2e32e65](https://github.com/dnbexperience/eufemia/commit/2e32e65b8c0e8cc8fff5f7b1600cd0acb6b9be7d))
* **Field.Slider:** ensure support for `transformIn` and `transformOut` ([#5592](https://github.com/dnbexperience/eufemia/issues/5592)) ([1b953ef](https://github.com/dnbexperience/eufemia/commit/1b953ef122bf8fa3d266d73b900530ebaa4160d7))
* **HeightAnimation:** resolve stale height issue when adjusting to content changes ([#5621](https://github.com/dnbexperience/eufemia/issues/5621)) ([56abab6](https://github.com/dnbexperience/eufemia/commit/56abab68aebb27c899a52829c99afb7699daee5a))
* **NumberFormat:** address TypeScript issues introduced in recent changes ([#5600](https://github.com/dnbexperience/eufemia/issues/5600)) ([7eff844](https://github.com/dnbexperience/eufemia/commit/7eff8440154f71c09ac0c83676339d05cd14ba3b))
* **Tooltip:** enhance performance ([#5666](https://github.com/dnbexperience/eufemia/issues/5666)) ([864796e](https://github.com/dnbexperience/eufemia/commit/864796e7202e1c5c8c7f3d19e09abbdb1fd9f651))


### :sparkles: Features

* **properties-tailwind.css:** generate predefined properties file to be used with Tailwind ([#5583](https://github.com/dnbexperience/eufemia/issues/5583)) ([79bb858](https://github.com/dnbexperience/eufemia/commit/79bb858b3f61e4f518496c4a8650eb23321832d7)), closes [#5527](https://github.com/dnbexperience/eufemia/issues/5527)
* **renderWithFormatting:** add new text formatter (simple markdown like) to shared tools ([#5702](https://github.com/dnbexperience/eufemia/issues/5702)) ([35aa0d2](https://github.com/dnbexperience/eufemia/commit/35aa0d24e561f94ecc9341c757bb7c7f64c5d1c6))
* **useTranslation:** fallback to translation key and log warning on missing entries ([#5577](https://github.com/dnbexperience/eufemia/issues/5577)) ([eee83fb](https://github.com/dnbexperience/eufemia/commit/eee83fb4ecbcbe26936d98580e957cf107a514d3)), closes [#5563](https://github.com/dnbexperience/eufemia/issues/5563)

## [10.85.1](https://github.com/dnbexperience/eufemia/compare/v10.85.0...v10.85.1) (2025-10-14)


### :bug: Bug Fixes

* **Field.DateOfBirth:** ensure support for `transformIn` and `transformOut` ([#5586](https://github.com/dnbexperience/eufemia/issues/5586)) ([208e605](https://github.com/dnbexperience/eufemia/commit/208e60541e4cdeefe4dbd5d446a4a7109713ba69))
* **Tabs:** address TypeScript issues introduced in recent changes ([#5597](https://github.com/dnbexperience/eufemia/issues/5597)) ([f7760dd](https://github.com/dnbexperience/eufemia/commit/f7760dd42d95581b612b83a8454336cd97ad23a7))

## [10.85.0](https://github.com/dnbexperience/eufemia/compare/v10.84.0...v10.85.0) (2025-10-10)


### :memo: Documentation

* **DateFormat:** document `formatDate` helper function ([#5568](https://github.com/dnbexperience/eufemia/issues/5568)) ([fb4f44c](https://github.com/dnbexperience/eufemia/commit/fb4f44c00ddea2da10530d666decb893aed34fca))
* **Forms:** add import statement to info docs ([#5562](https://github.com/dnbexperience/eufemia/issues/5562)) ([4a6adb4](https://github.com/dnbexperience/eufemia/commit/4a6adb44f647519e445c89335cb8486d64d49ef5))


### :sparkles: Features

* **Form.Isolation:** inherit schema from Form.Handler ([#5567](https://github.com/dnbexperience/eufemia/issues/5567)) ([d83184d](https://github.com/dnbexperience/eufemia/commit/d83184d070b9622ecfd998e9394bc6210e9da2f3))
* **Forms:** enhance typing for complex additional arguments in `transformIn` and `transformOut` ([#5587](https://github.com/dnbexperience/eufemia/issues/5587)) ([ec7e572](https://github.com/dnbexperience/eufemia/commit/ec7e57250d216162d45b4570c119968e218e2ed6)), closes [#5584](https://github.com/dnbexperience/eufemia/issues/5584)
* **InputMasked:** rewrite to TypeScript (part 2 of 2) ([#5581](https://github.com/dnbexperience/eufemia/issues/5581)) ([25a7112](https://github.com/dnbexperience/eufemia/commit/25a7112ed4f1b8dbffea980c5395e9de59ef4a2a)), closes [#5520](https://github.com/dnbexperience/eufemia/issues/5520)
* **Iterate.PushContainer:** inherit schema from Form.Handler ([#5570](https://github.com/dnbexperience/eufemia/issues/5570)) ([79bba2d](https://github.com/dnbexperience/eufemia/commit/79bba2db683f27d437ea2658110c6d85dd5fe36d)), closes [#5567](https://github.com/dnbexperience/eufemia/issues/5567)


### :bug: Bug Fixes

* **ChildrenWithAge:** add translations for locale `da-DK` & `sv-SE` ([#5563](https://github.com/dnbexperience/eufemia/issues/5563)) ([718be47](https://github.com/dnbexperience/eufemia/commit/718be47fad2157c21cbe0e5262a215bf5da1200f))
* **Field.Email:** crashes when validating long values ([#5582](https://github.com/dnbexperience/eufemia/issues/5582)) ([092f155](https://github.com/dnbexperience/eufemia/commit/092f15591450ce32c3e84537470b5acb630b93de)), closes [/github.com/dnbexperience/eufemia/blob/e656eb518d03ab06d4534ed46358abd167aca96b/packages/dnb-eufemia/src/extensions/forms/Field/Email/Email.tsx#L23-L34](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/blob/e656eb518d03ab06d4534ed46358abd167aca96b/packages/dnb-eufemia/src/extensions/forms/Field/Email/Email.tsx/issues/L23-L34)
* **Field.PhoneNumber:** ensure support for `transformIn` and `transformOut` ([#5588](https://github.com/dnbexperience/eufemia/issues/5588)) ([95aa9c7](https://github.com/dnbexperience/eufemia/commit/95aa9c7192c8822aad62c92e7631ed0d938e0cae)), closes [#5584](https://github.com/dnbexperience/eufemia/issues/5584) [#5587](https://github.com/dnbexperience/eufemia/issues/5587)
* **Forms:** add Zod schema translations support ([#5572](https://github.com/dnbexperience/eufemia/issues/5572)) ([8b3aa2e](https://github.com/dnbexperience/eufemia/commit/8b3aa2e722421e5196bbaac40c6fbfe7615d4e75))
* **Forms:** enhance schema prioritization when using Zod schema ([#5566](https://github.com/dnbexperience/eufemia/issues/5566)) ([43d82a0](https://github.com/dnbexperience/eufemia/commit/43d82a070d7565030a763d07697866aaf4b4587a))
* **Upload:** call `setInternalFiles` on `setFiles` ([#5571](https://github.com/dnbexperience/eufemia/issues/5571)) ([ae170ca](https://github.com/dnbexperience/eufemia/commit/ae170caac0bc6c31b940b416a7b36a3f80b47290)), closes [/github.com/dnbexperience/eufemia/blob/d83184d070b9622ecfd998e9394bc6210e9da2f3/packages/dnb-eufemia/src/components/upload/UploadStatus.tsx#L11](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/blob/d83184d070b9622ecfd998e9394bc6210e9da2f3/packages/dnb-eufemia/src/components/upload/UploadStatus.tsx/issues/L11)

## [10.84.0](https://github.com/dnbexperience/eufemia/compare/v10.83.0...v10.84.0) (2025-10-02)


### :sparkles: Features

* **Dropdown,Autocomplete:** add `groups` in lists ([#5415](https://github.com/dnbexperience/eufemia/issues/5415)) ([6cee965](https://github.com/dnbexperience/eufemia/commit/6cee9656f1bd2b0bed9a7d5927584c4380ee6f72))


### :bug: Bug Fixes

* **DatePicker:** improve Swedish: Återställa -> Återställ  ([#5555](https://github.com/dnbexperience/eufemia/issues/5555)) ([fb89a2a](https://github.com/dnbexperience/eufemia/commit/fb89a2afbf10b7d445d26596a8e17dac808ab588))
* **DatePicker:** improve Swedish: Stänga -> Stäng ([#5554](https://github.com/dnbexperience/eufemia/issues/5554)) ([f76a20d](https://github.com/dnbexperience/eufemia/commit/f76a20dc7c23531d93532c3cc2cd62d9cb7bd705))
* **GlobalStatus:** scroll into view on Firefox ([#5550](https://github.com/dnbexperience/eufemia/issues/5550)) ([c8235a7](https://github.com/dnbexperience/eufemia/commit/c8235a778d2c5d86c958e138f1cbcf87261f153f))

## [10.83.0](https://github.com/dnbexperience/eufemia/compare/v10.82.1...v10.83.0) (2025-09-26)


### :memo: Documentation

* how to use Tailwind with Eufemia ([#5527](https://github.com/dnbexperience/eufemia/issues/5527)) ([16fd835](https://github.com/dnbexperience/eufemia/commit/16fd8357d48330e72b9ba6db48020c0a5fec1b91))


### :sparkles: Features

* attach `scopeElement` when calling `Eufemia.versions` ([#5496](https://github.com/dnbexperience/eufemia/issues/5496)) ([6bb01f1](https://github.com/dnbexperience/eufemia/commit/6bb01f178872e0b874856cdfad3fce610485c2ac))


### :bug: Bug Fixes

* **Field.DateOfBirth:** add support for data handling via `path="/myPath"` ([#5539](https://github.com/dnbexperience/eufemia/issues/5539)) ([3097364](https://github.com/dnbexperience/eufemia/commit/30973647ef5212a7ba86d4855c3a1c23c8052cc7))

## [10.82.1](https://github.com/dnbexperience/eufemia/compare/v10.82.0...v10.82.1) (2025-09-25)


### :bug: Bug Fixes

* **Dialog:** gracefully handle focus during async submit ([#5492](https://github.com/dnbexperience/eufemia/issues/5492)) ([a0ae155](https://github.com/dnbexperience/eufemia/commit/a0ae1559daaac4447edd0943ca76ddae8aaa7785))
* **Dropdown:** default `align_dropdown="right"` for `independent_width` ([#5524](https://github.com/dnbexperience/eufemia/issues/5524)) ([1ca9a88](https://github.com/dnbexperience/eufemia/commit/1ca9a887b5aa9e60ac7416a17ba263aa43367ed6))
* **Field.DateOfBirth:** adjust widths of fields ([#5511](https://github.com/dnbexperience/eufemia/issues/5511)) ([a14f46f](https://github.com/dnbexperience/eufemia/commit/a14f46f5f5afd14a5a11978f2486ae3aa342310c))
* **Field.DateOfBirth:** space above legend ([#5502](https://github.com/dnbexperience/eufemia/issues/5502)) ([c7bf2f5](https://github.com/dnbexperience/eufemia/commit/c7bf2f56338fb5af76a67593b60e249f4b472f86))
* **Field.Number:** ensure the field reacts on `locale` without currency variant ([#5503](https://github.com/dnbexperience/eufemia/issues/5503)) ([bc6b96c](https://github.com/dnbexperience/eufemia/commit/bc6b96ca40adcb9b867f880c12dfa218d23849da))
* **Field.Number:** show error immediately when the input exceeds the maximum possible number ([#5498](https://github.com/dnbexperience/eufemia/issues/5498)) ([c2e5222](https://github.com/dnbexperience/eufemia/commit/c2e522291960988ca30a311ccef1b0b05277dc8f))
* **Field.Number:** show formatted numbers in error messages ([#5510](https://github.com/dnbexperience/eufemia/issues/5510)) ([8b5d878](https://github.com/dnbexperience/eufemia/commit/8b5d878ff38333d2132cdab22808040936bd2598))
* **Input:** use browser autofill background color ([#5526](https://github.com/dnbexperience/eufemia/issues/5526)) ([32113fa](https://github.com/dnbexperience/eufemia/commit/32113fa7b5009da59351765c37b81f165b5499ff))
* use `en-GB` translation strings when `en-US` is given ([#5507](https://github.com/dnbexperience/eufemia/issues/5507)) ([f547c8f](https://github.com/dnbexperience/eufemia/commit/f547c8ff0281f3f7399f7ef97d59da4a73d8745a))

## [10.82.0](https://github.com/dnbexperience/eufemia/compare/v10.81.0...v10.82.0) (2025-09-19)


### :sparkles: Features

* **Forms:** add Zod support and use it internally ([#5471](https://github.com/dnbexperience/eufemia/issues/5471)) ([547f952](https://github.com/dnbexperience/eufemia/commit/547f9523576a90f377a7caee7536023e4b29dfc4))

## [10.81.0](https://github.com/dnbexperience/eufemia/compare/v10.80.1...v10.81.0) (2025-09-19)


### :memo: Documentation

* **NumberFormat:** add source and reasons for using `en-GB` ([#5474](https://github.com/dnbexperience/eufemia/issues/5474)) ([137d5a8](https://github.com/dnbexperience/eufemia/commit/137d5a8187482745a4c11cd32c7c17b0769a54f0))


### :sparkles: Features

* **Card:** add `backgroundColor` and `outline` property support ([#5473](https://github.com/dnbexperience/eufemia/issues/5473)) ([8932b90](https://github.com/dnbexperience/eufemia/commit/8932b9079a1d50316a6fd407d1437a513f2203be))
* **Forms:** add `Field.DateOfBirth` for selecting date of birth ([#5019](https://github.com/dnbexperience/eufemia/issues/5019)) ([3449904](https://github.com/dnbexperience/eufemia/commit/3449904132000b0d7682026686fe48ae07442606))
* **Forms:** ask user for confirmation when cancel button is pressed in Form.Iterate and Form.Section ([#5472](https://github.com/dnbexperience/eufemia/issues/5472)) ([632f904](https://github.com/dnbexperience/eufemia/commit/632f9049fe5d80f9bbea3ef965a40b81f4134877))
* **Upload:** add `buttonProps` property ([#5452](https://github.com/dnbexperience/eufemia/issues/5452)) ([bb8a741](https://github.com/dnbexperience/eufemia/commit/bb8a7414c647c93b1c1f4c5aae1d366048befc7f))


### :bug: Bug Fixes

* **Dialog, Drawer:** enhance screen reader support and focus management ([#5491](https://github.com/dnbexperience/eufemia/issues/5491)) ([00289ae](https://github.com/dnbexperience/eufemia/commit/00289ae8240c45241cd73ea29e35da02718395fb))
* **Field.BankAccountNumber:** danish translations ([#5475](https://github.com/dnbexperience/eufemia/issues/5475)) ([571a26b](https://github.com/dnbexperience/eufemia/commit/571a26bab703f947b3a6d0d62d699efcb756623d))
* **Field.Date:** should not display error when clearing the value ([#5464](https://github.com/dnbexperience/eufemia/issues/5464)) ([dd809e8](https://github.com/dnbexperience/eufemia/commit/dd809e812a9ae9fe065e4e61b9ac06356cb1495c))
* **Field.Expiry:** should not display error when clearing the value ([#5465](https://github.com/dnbexperience/eufemia/issues/5465)) ([c654b81](https://github.com/dnbexperience/eufemia/commit/c654b8145611a3c31989ef57d5f1babdb6a98b75))
* **Field.NationalIdentityNumber:** danish translations ([#5477](https://github.com/dnbexperience/eufemia/issues/5477)) ([7aa7dd7](https://github.com/dnbexperience/eufemia/commit/7aa7dd7a4cbced795f67b07b8586da0938dbed9c))
* **Field.OrganizationNumber:** danish translations ([#5476](https://github.com/dnbexperience/eufemia/issues/5476)) ([1f55851](https://github.com/dnbexperience/eufemia/commit/1f55851cc55a6e499eaf5e4c7472e73b2ac69a5d))
* **Field.Selection, Field.ArraySelection, Field.Toggle, Field.Boolean:** enhance accessibility for radio and button variants ([#5489](https://github.com/dnbexperience/eufemia/issues/5489)) ([f13ac84](https://github.com/dnbexperience/eufemia/commit/f13ac84a3f8569ed8727f90b5c777215cc26c181))
* **Field.Selection:** support `search_content` in data for variant="autocomplete" ([#5487](https://github.com/dnbexperience/eufemia/issues/5487)) ([a39eac5](https://github.com/dnbexperience/eufemia/commit/a39eac5d4486822ccb6ad1b7a531b7e084ee7c64))
* **Lists:** support UL inside OL ([#5488](https://github.com/dnbexperience/eufemia/issues/5488)) ([5de61a0](https://github.com/dnbexperience/eufemia/commit/5de61a0dcadf39d17d9ec100f8da2bce449cfeda))
* **Table:** ensure smooth animation when Td.AccordionContent or Tr.AccordionContent is used ([#5490](https://github.com/dnbexperience/eufemia/issues/5490)) ([bcce7d3](https://github.com/dnbexperience/eufemia/commit/bcce7d3dcfe19b97ab2985c7d3585e0fd83eef11))

## [10.80.1](https://github.com/dnbexperience/eufemia/compare/v10.80.0...v10.80.1) (2025-09-10)


### :bug: Bug Fixes

* **Autocomplete:** ensure list shows up after input has cleared ([#5457](https://github.com/dnbexperience/eufemia/issues/5457)) ([9d8841b](https://github.com/dnbexperience/eufemia/commit/9d8841be52e67d3a5cf7d03885596625b1e2fb1f))
* **Button:** prevent navigation when disabled with `href` prop ([#5447](https://github.com/dnbexperience/eufemia/issues/5447)) ([f207d09](https://github.com/dnbexperience/eufemia/commit/f207d095f526f7bdfeeb050bfd64ea23015eb9b6))
* **Button:** remove `disabled` attribute when disabled with `href` ([#5454](https://github.com/dnbexperience/eufemia/issues/5454)) ([105c744](https://github.com/dnbexperience/eufemia/commit/105c7441b0d115d0495fdb308b9a3ce4bdc2adfe)), closes [#5447](https://github.com/dnbexperience/eufemia/issues/5447)
* **CopyOnClick:** use original Tooltip component to show tooltip for better support ([#5449](https://github.com/dnbexperience/eufemia/issues/5449)) ([80c0a56](https://github.com/dnbexperience/eufemia/commit/80c0a567cd7952352f9ccf5af5d3f670d42473d1))
* **Form.Section:** avoid showing view and edit container at the same time ([#5455](https://github.com/dnbexperience/eufemia/issues/5455)) ([2c07e30](https://github.com/dnbexperience/eufemia/commit/2c07e30c7d5283f5318d6e152a5de1587a02668f)), closes [#5431](https://github.com/dnbexperience/eufemia/issues/5431)
* **Forms:** ensure Form.Iterate and Form.Section runs validation when cancel button is pressed ([#5463](https://github.com/dnbexperience/eufemia/issues/5463)) ([516d71a](https://github.com/dnbexperience/eufemia/commit/516d71a814ddd4c8545ecb24b737b7b50f26147f)), closes [#5431](https://github.com/dnbexperience/eufemia/issues/5431)
* **Tooltip:** make Tooltip controlled when `active` prop is set ([#5446](https://github.com/dnbexperience/eufemia/issues/5446)) ([3a6656b](https://github.com/dnbexperience/eufemia/commit/3a6656b981ed6ed1f6118b9a519617cb577db7dc))
* **Upload:** input element overflow ([#5458](https://github.com/dnbexperience/eufemia/issues/5458)) ([633bc68](https://github.com/dnbexperience/eufemia/commit/633bc687302f1dec721fcb793343573bf223a1a2))

## [10.80.0](https://github.com/dnbexperience/eufemia/compare/v10.79.0...v10.80.0) (2025-09-05)


### :sparkles: Features

* add support for locale `da-DK` ([#5432](https://github.com/dnbexperience/eufemia/issues/5432)) ([d4a94a2](https://github.com/dnbexperience/eufemia/commit/d4a94a27153ca5241fc500383e4355b18b1e28fc))
* **DateFormat:** show Tooltip on hover when rendering `relativeTime` ([#5425](https://github.com/dnbexperience/eufemia/issues/5425)) ([25c0b11](https://github.com/dnbexperience/eufemia/commit/25c0b11c7ff1ee97537bab9331a5d6ed2ba6bb6f))


### :bug: Bug Fixes

* **Button:** make button text selectable ([#5429](https://github.com/dnbexperience/eufemia/issues/5429)) ([22f4ad8](https://github.com/dnbexperience/eufemia/commit/22f4ad826b94733545f1c6817089efbab0561b3d))
* **CopyOnClick:** show Tooltip after copy ([#5442](https://github.com/dnbexperience/eufemia/issues/5442)) ([2629e83](https://github.com/dnbexperience/eufemia/commit/2629e8389345ec32d841971fee8025de3d0bf988))
* **DrawerList:** swap aria-selected and aria-current ([#5435](https://github.com/dnbexperience/eufemia/issues/5435)) ([8b818bd](https://github.com/dnbexperience/eufemia/commit/8b818bd4cd18a2047eb6d8f51d3a382af7365de1))
* **Input:** correct `value` in `on_submit` events ([#5434](https://github.com/dnbexperience/eufemia/issues/5434)) ([bedf377](https://github.com/dnbexperience/eufemia/commit/bedf377182fbd684cf0f0400884c3125106f30e5))
* **Input:** ensure error, focus, and hover states work with autofilled content ([#5424](https://github.com/dnbexperience/eufemia/issues/5424)) ([484f341](https://github.com/dnbexperience/eufemia/commit/484f341285e4d0ca8527d6b3c6f2d76612adbba5)), closes [#5217](https://github.com/dnbexperience/eufemia/issues/5217)
* Norwegian translation of Christmas Island ([#5433](https://github.com/dnbexperience/eufemia/issues/5433)) ([4625f54](https://github.com/dnbexperience/eufemia/commit/4625f543956ebd0d02619c371761526c0f3b4ebd))
* **Table:** style table inside of an accordion mode table ([#5428](https://github.com/dnbexperience/eufemia/issues/5428)) ([3a77c0e](https://github.com/dnbexperience/eufemia/commit/3a77c0e72e8bab186af632acd57accdaaa0c399d))
* **Tooltip:** remove click event to make screen reader not read out "clickable" ([#5426](https://github.com/dnbexperience/eufemia/issues/5426)) ([4e13600](https://github.com/dnbexperience/eufemia/commit/4e136004f93a9fffbf0980b9297596c6528270ee))

## [10.79.0](https://github.com/dnbexperience/eufemia/compare/v10.78.0...v10.79.0) (2025-08-28)


### :memo: Documentation

* update change log of Eufemia ([#5409](https://github.com/dnbexperience/eufemia/issues/5409)) ([3ce9fd9](https://github.com/dnbexperience/eufemia/commit/3ce9fd90dae00d347710613e966388b7c82dff15))


### :bug: Bug Fixes

* **Autocomplete:** input icon should be red when opened in error state ([#5419](https://github.com/dnbexperience/eufemia/issues/5419)) ([91357d6](https://github.com/dnbexperience/eufemia/commit/91357d6233004f7388a79d47fd8d528022b584dd))
* correct mismatched style index imports ([#5414](https://github.com/dnbexperience/eufemia/issues/5414)) ([a31f930](https://github.com/dnbexperience/eufemia/commit/a31f9301c2364bd34bd2ec447e6ad5d327a3e79d))
* **Field.Date:** properly handle required error ([#5412](https://github.com/dnbexperience/eufemia/issues/5412)) ([642fc0d](https://github.com/dnbexperience/eufemia/commit/642fc0d6acd96cc453ad67cf9b716ce7bbf99ce4))
* **Field.Date:** valid range value should not display required error ([#5410](https://github.com/dnbexperience/eufemia/issues/5410)) ([69a1b00](https://github.com/dnbexperience/eufemia/commit/69a1b00ee987e3e30142b6ace089f877e94dd045))
* **Forms:** add type for `innerRef` to Form.Handler ([#5408](https://github.com/dnbexperience/eufemia/issues/5408)) ([a2a7ca6](https://github.com/dnbexperience/eufemia/commit/a2a7ca6405615478b31e3546dec9e106198c71ef))


### :sparkles: Features

* add sharp shadow ([#5401](https://github.com/dnbexperience/eufemia/issues/5401)) ([e578ada](https://github.com/dnbexperience/eufemia/commit/e578ada2f019ac616878ebbef26676dd5bef3223))
* replace rollup with tsdown for UMD and ESM bundles ([#5417](https://github.com/dnbexperience/eufemia/issues/5417)) ([7ef926c](https://github.com/dnbexperience/eufemia/commit/7ef926c20a2652f998d7e4c2438a1f7b41d1c78f)), closes [#5411](https://github.com/dnbexperience/eufemia/issues/5411) [#5411](https://github.com/dnbexperience/eufemia/issues/5411) [#5413](https://github.com/dnbexperience/eufemia/issues/5413) [#5411](https://github.com/dnbexperience/eufemia/issues/5411)
* **SelectCurrency:** make country names searchable ([#5405](https://github.com/dnbexperience/eufemia/issues/5405)) ([929cccd](https://github.com/dnbexperience/eufemia/commit/929cccd879e2f1acdd1005aaa328ffc2c61b1832))
* upgrade date-fns to latest version (v4) – ⚠️ It may effect your direct usage of date-fns ([#5413](https://github.com/dnbexperience/eufemia/issues/5413)) ([3ddb89c](https://github.com/dnbexperience/eufemia/commit/3ddb89c0636c8c1e7b3589126f53c3f075a3202c))

## [10.78.0](https://github.com/dnbexperience/eufemia/compare/v10.77.9...v10.78.0) (2025-08-20)


### :memo: Documentation

* add links to Figma, docs, and source code ([#5319](https://github.com/dnbexperience/eufemia/issues/5319)) ([f874a9a](https://github.com/dnbexperience/eufemia/commit/f874a9a2eb4f40ff33577010b497e6cb14878fcf))
* **Forms:** add docs about unique paths ([#5197](https://github.com/dnbexperience/eufemia/issues/5197)) ([f1511e0](https://github.com/dnbexperience/eufemia/commit/f1511e00abf0e3a7989ad52173392dc7647b8a01))


### :sparkles: Features

* add support for Eufemia.versions ([#5322](https://github.com/dnbexperience/eufemia/issues/5322)) ([e4c1530](https://github.com/dnbexperience/eufemia/commit/e4c153008c23636ff6311feb4de529d1ac56a89b))
* **Anchor:** add `noIcon` and `noLaunchIcon` ([#5256](https://github.com/dnbexperience/eufemia/issues/5256)) ([5b5d644](https://github.com/dnbexperience/eufemia/commit/5b5d64440ed87df8ccd7fc6c1e92a006f711a86e))
* **Avatar:** add icon prop and auto size icons ([#5390](https://github.com/dnbexperience/eufemia/issues/5390)) ([6d7e1c9](https://github.com/dnbexperience/eufemia/commit/6d7e1c9ed4cb72667586b0bb2fcd6b1024cc23cf))
* **DateFormat:** add support for relative time (auto updated) ([#5326](https://github.com/dnbexperience/eufemia/issues/5326)) ([7e3c404](https://github.com/dnbexperience/eufemia/commit/7e3c4041a5716626f515b44b781a6196eff7c49f))
* **DNB Carnegie:** add ArizonaFlare font to CDN ([#5397](https://github.com/dnbexperience/eufemia/issues/5397)) ([7baf1db](https://github.com/dnbexperience/eufemia/commit/7baf1db26907ec79dd2a9464f2147850178be256))
* upgrade internal Node.js version to latest LTS ([#5400](https://github.com/dnbexperience/eufemia/issues/5400)) ([7a6762f](https://github.com/dnbexperience/eufemia/commit/7a6762f7cbbe93d9f6d75964c3e8c60fb7c83a7c))

## [10.77.9](https://github.com/dnbexperience/eufemia/compare/v10.77.8...v10.77.9) (2025-08-15)


### :bug: Bug Fixes

* **Forms:** ensure labels from `Value.*` components can be served from a `Value.*` component itself ([#5398](https://github.com/dnbexperience/eufemia/issues/5398)) ([bc7bd39](https://github.com/dnbexperience/eufemia/commit/bc7bd395bc79a520ec649329b7d7591066ae2637))
* **NumberFormat:** ensure `en-GB` locale uses comma for thousand separator ([#5393](https://github.com/dnbexperience/eufemia/issues/5393)) ([202236e](https://github.com/dnbexperience/eufemia/commit/202236e1c7bbe22cf75b6a53f3bb09618a12274b))
* **NumberFormat:** remove `role="text"` ([#5386](https://github.com/dnbexperience/eufemia/issues/5386)) ([019bd3e](https://github.com/dnbexperience/eufemia/commit/019bd3eef6fa0108e1621bc122cd4808871a34d2))
* **StepIndicator, Wizard:** screen reader improvements ([#5388](https://github.com/dnbexperience/eufemia/issues/5388)) ([e247409](https://github.com/dnbexperience/eufemia/commit/e2474097131008dc683b4e3518c009058b30f53a))

## [10.77.8](https://github.com/dnbexperience/eufemia/compare/v10.77.7...v10.77.8) (2025-08-13)


### :memo: Documentation

* **Field.Upload:** add how to use `transformIn` ([#5387](https://github.com/dnbexperience/eufemia/issues/5387)) ([f4e8463](https://github.com/dnbexperience/eufemia/commit/f4e8463ad1bc8492aa19699b0e78210249b42c05))


### :bug: Bug Fixes

* **Autocomplete:** highlight letters inside words when filter is disabled with `disable_filter` ([#5385](https://github.com/dnbexperience/eufemia/issues/5385)) ([dee31c9](https://github.com/dnbexperience/eufemia/commit/dee31c922bfc41879d6ec680a843b92b7421d742))
* **Forms:** ensure error is not shown in Wizard when Iterate.Array is required in next step ([#5389](https://github.com/dnbexperience/eufemia/issues/5389)) ([69d8cf9](https://github.com/dnbexperience/eufemia/commit/69d8cf91b8019ec587020206c85d5ccccd9fd4f0))
* **Iterate.Array:** cannot delete from array when initial data is incomplete ([#5365](https://github.com/dnbexperience/eufemia/issues/5365)) ([b5b6601](https://github.com/dnbexperience/eufemia/commit/b5b66018bbc7ac5a959ad1f6453fa580bdfcf733))
* **PushContainer:** styling of variant filled in error state on small screen ([#5376](https://github.com/dnbexperience/eufemia/issues/5376)) ([5a1347b](https://github.com/dnbexperience/eufemia/commit/5a1347b303c3968e0299e4b6d7c87ec8413bd182))

## [10.77.7](https://github.com/dnbexperience/eufemia/compare/v10.77.6...v10.77.7) (2025-08-12)


### :bug: Bug Fixes

* **PushContainer:** should not open when error exists in other fields in step ([#5364](https://github.com/dnbexperience/eufemia/issues/5364)) ([d6cd11b](https://github.com/dnbexperience/eufemia/commit/d6cd11b81f5859b1d766b86e5aa133d65abbb18e))
* remove unused CSS reset `input-placeholder` ([#5370](https://github.com/dnbexperience/eufemia/issues/5370)) ([5766c6c](https://github.com/dnbexperience/eufemia/commit/5766c6c030223d3509a0e2cd0b103e150561539a))
* **Wizard:** should not report a change when comparing files/objects ([#5363](https://github.com/dnbexperience/eufemia/issues/5363)) ([90349e2](https://github.com/dnbexperience/eufemia/commit/90349e2aef7061ca3bc18d3de689308fffce7a30))

## [10.77.6](https://github.com/dnbexperience/eufemia/compare/v10.77.5...v10.77.6) (2025-08-07)


### :memo: Documentation

* **Form.Section.Toolbar:** add events and properties ([#5358](https://github.com/dnbexperience/eufemia/issues/5358)) ([2ffc3ff](https://github.com/dnbexperience/eufemia/commit/2ffc3ffc425fdb7a560663beb183a1f2ea1378b2))


### :bug: Bug Fixes

* **Drawer:** adjust shadow when updating navigation header ([#5357](https://github.com/dnbexperience/eufemia/issues/5357)) ([d701844](https://github.com/dnbexperience/eufemia/commit/d70184400fe104915ef821486f6147552895c37f))
* **Dropdown:** support CountryFlag in `selected_value`  ([#5362](https://github.com/dnbexperience/eufemia/issues/5362)) ([e9d7890](https://github.com/dnbexperience/eufemia/commit/e9d78905c4887ea1ec42d6cb717c438bd5d35966))
* ensure media queries with `xx-small` max-width do work ([#5366](https://github.com/dnbexperience/eufemia/issues/5366)) ([aa38320](https://github.com/dnbexperience/eufemia/commit/aa3832046ca9af45972e4bf889915094e55bdd25))

## [10.77.5](https://github.com/dnbexperience/eufemia/compare/v10.77.4...v10.77.5) (2025-07-30)


### :memo: Documentation

* **Field.String:** add demo example using `TextCounter` together with `maxLength` property ([#5335](https://github.com/dnbexperience/eufemia/issues/5335)) ([bf1510c](https://github.com/dnbexperience/eufemia/commit/bf1510cf4e00446be7e24b9186378caf05ac8de4))


### :bug: Bug Fixes

* **DatePicker:** make reset button clear the date value if the `date` props is `undefined` ([#5336](https://github.com/dnbexperience/eufemia/issues/5336)) ([f19fd34](https://github.com/dnbexperience/eufemia/commit/f19fd3463ca27656ca9e50ec2780bfeb3da4d7c4))
* **GlobalStatus:** color contrast of close button in success state ([#5354](https://github.com/dnbexperience/eufemia/issues/5354)) ([2d8a19b](https://github.com/dnbexperience/eufemia/commit/2d8a19b663bbf1c0d25ca318fe03ad31fe623aef))
* **NumberFormat:** display dash `-` for values `null`, `undefined`, and `''` ([#5351](https://github.com/dnbexperience/eufemia/issues/5351)) ([7fb3244](https://github.com/dnbexperience/eufemia/commit/7fb3244028d991353c3134361f1aa3d18b68f0ca))
* skip-link styling ([#5334](https://github.com/dnbexperience/eufemia/issues/5334)) ([1351090](https://github.com/dnbexperience/eufemia/commit/1351090531d68ba68de5e241187ac11815c8ad5b))
* **StyleIsolation:** change font base path ([#5333](https://github.com/dnbexperience/eufemia/issues/5333)) ([2e0d68a](https://github.com/dnbexperience/eufemia/commit/2e0d68afebece59d2a59c3070284a3ece17975ab))
* **Table:** allow expand and close by keydown when text is selected ([#5344](https://github.com/dnbexperience/eufemia/issues/5344)) ([ad6049f](https://github.com/dnbexperience/eufemia/commit/ad6049f93fd1ee7e8aefb20fd205cf794cafd4d7))
* **Table:** allow expanding by chevron when text is selected ([#5343](https://github.com/dnbexperience/eufemia/issues/5343)) ([aff2e1d](https://github.com/dnbexperience/eufemia/commit/aff2e1d0b9d44c0e1e14c4b94d22c3b7cb5f0af9))

## [10.77.4](https://github.com/dnbexperience/eufemia/compare/v10.77.3...v10.77.4) (2025-07-16)


### :bug: Bug Fixes

* **Autocomplete:** list is hidden when there are no results and `no_options` is set to `false` ([#5327](https://github.com/dnbexperience/eufemia/issues/5327)) ([90cef0b](https://github.com/dnbexperience/eufemia/commit/90cef0b9c65921804af823a688a8e0e9a1e15708))

## [10.77.3](https://github.com/dnbexperience/eufemia/compare/v10.77.2...v10.77.3) (2025-07-14)


### :bug: Bug Fixes

* **Field.Number:** ensure custom mask support ([#5323](https://github.com/dnbexperience/eufemia/issues/5323)) ([a3c29a5](https://github.com/dnbexperience/eufemia/commit/a3c29a5e43f14229e9620c67760ce4efa74072f1))

## [10.77.2](https://github.com/dnbexperience/eufemia/compare/v10.77.1...v10.77.2) (2025-07-04)


### :memo: Documentation

* **a11y:** add info about 320px screen width ([#5310](https://github.com/dnbexperience/eufemia/issues/5310)) ([86e6d05](https://github.com/dnbexperience/eufemia/commit/86e6d05cddcf009d8b4a78a9a879d76e96790c38))
* add link to Eufemia's Figma file in menu bar ([#5318](https://github.com/dnbexperience/eufemia/issues/5318)) ([4956115](https://github.com/dnbexperience/eufemia/commit/495611500336c46076aa17c39d3464c19efb75bb))


### :bug: Bug Fixes

* **FieldBlock:** alignment helper when used in HTML v4 limited-quirks ([#5321](https://github.com/dnbexperience/eufemia/issues/5321)) ([15f4105](https://github.com/dnbexperience/eufemia/commit/15f4105d6ba81554619f253b232c79bb7e594a4b))
* **Table:** allow outline in Card with inner space ([#5320](https://github.com/dnbexperience/eufemia/issues/5320)) ([4e0ca02](https://github.com/dnbexperience/eufemia/commit/4e0ca02c9d8af80dd02b3370e63fd7d915646875))

## [10.77.1](https://github.com/dnbexperience/eufemia/compare/v10.77.0...v10.77.1) (2025-06-30)


### :bug: Bug Fixes

* **Field.PostalCodeAndCity:** `postalCode` and `city` should override existing props ([#5300](https://github.com/dnbexperience/eufemia/issues/5300)) ([875d903](https://github.com/dnbexperience/eufemia/commit/875d90348fba39c6d1fcd86cd3c5e1b56ac98aab))
* **isolated-style-scope-plugin:** enhance handling of global selectors ([#5306](https://github.com/dnbexperience/eufemia/issues/5306)) ([b76da83](https://github.com/dnbexperience/eufemia/commit/b76da83bf824879e1aa5aaa7d04a710f28b0e5f0)), closes [/github.com/dnbexperience/eufemia/pull/5267/files#diff-8340e54205c44e8ff3c7985e33afe76d2ff212b5cdf38eebcc9d307f7b9e80f4](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/5267/files/issues/diff-8340e54205c44e8ff3c7985e33afe76d2ff212b5cdf38eebcc9d307f7b9e80f4)
* **isolated-style-scope-plugin:** ensure CJS support ([#5307](https://github.com/dnbexperience/eufemia/issues/5307)) ([503f00a](https://github.com/dnbexperience/eufemia/commit/503f00a93ab37448c46f4e0d54301f441ffe2751))
* **IsolatedStyleScope:** enhance typing for `getStyleScopeHash` ([#5281](https://github.com/dnbexperience/eufemia/issues/5281)) ([dbe62ad](https://github.com/dnbexperience/eufemia/commit/dbe62ad4d142cd5a41e206cb508e35f7d18d2dcb))

## [10.77.0](https://github.com/dnbexperience/eufemia/compare/v10.76.1...v10.77.0) (2025-06-20)


### :sparkles: Features

* add style isolation support ([#5267](https://github.com/dnbexperience/eufemia/issues/5267)) ([53bbf04](https://github.com/dnbexperience/eufemia/commit/53bbf04aaf9a1917ab0c908eb6e0194424a0409c))

## [10.76.1](https://github.com/dnbexperience/eufemia/compare/v10.76.0...v10.76.1) (2025-06-20)


### :bug: Bug Fixes

* **Button:** fix alignment helper to support HTML v4 limited-quirks ([#5276](https://github.com/dnbexperience/eufemia/issues/5276)) ([02d45a6](https://github.com/dnbexperience/eufemia/commit/02d45a69c21388dc53292699c1889d773d980ef3))
* **DrawerList:** move width and height style handling to local component styles ([#5275](https://github.com/dnbexperience/eufemia/issues/5275)) ([8988f3f](https://github.com/dnbexperience/eufemia/commit/8988f3f9ce3b4a0dc31a8fb6ae2c4a552ebfd0b3))

## [10.76.0](https://github.com/dnbexperience/eufemia/compare/v10.75.4...v10.76.0) (2025-06-19)


### :memo: Documentation

* **Upload:** support `children` ([#5259](https://github.com/dnbexperience/eufemia/issues/5259)) ([a3f0c16](https://github.com/dnbexperience/eufemia/commit/a3f0c160b4e7e8843b6481a596792351a8411afd))


### :bug: Bug Fixes

* **Field.Indeterminate:** add support for `required` property ([#5155](https://github.com/dnbexperience/eufemia/issues/5155)) ([d451ae9](https://github.com/dnbexperience/eufemia/commit/d451ae9b5cd16cd68bb680f4f83fb42d5f7948a0))
* **Field.PhoneNumber:** truncate to 8 digits when changing country code to `NO` ([#5266](https://github.com/dnbexperience/eufemia/issues/5266)) ([f8cb9d1](https://github.com/dnbexperience/eufemia/commit/f8cb9d178d10258d29b536ef482e09ad056ddad4))
* **InfoCard:** align max character width ([#5262](https://github.com/dnbexperience/eufemia/issues/5262)) ([daf9e4e](https://github.com/dnbexperience/eufemia/commit/daf9e4e0c3b34690eba914c40c72f16439665a8b))
* **Tooltip:** enhance handling of z-index when behind Dialog or Drawer ([#5268](https://github.com/dnbexperience/eufemia/issues/5268)) ([cacd8ca](https://github.com/dnbexperience/eufemia/commit/cacd8ca72ca29be13db442d2973a1de08078681d))


### :sparkles: Features

* add PortalRoot (React Portal) component and use it for Dialog, Drawer, Modal, DrawerList, DatePicker and Tooltip ([#5261](https://github.com/dnbexperience/eufemia/issues/5261)) ([45a61f7](https://github.com/dnbexperience/eufemia/commit/45a61f7a651064d152f2bbc30978fda91933f8ef))
* **Breadcrumbs:** add `onToggle` property ([#5253](https://github.com/dnbexperience/eufemia/issues/5253)) ([a010a9c](https://github.com/dnbexperience/eufemia/commit/a010a9cce62341ccfff6dc20999ddedeb00ab240))
* **DateFormat:** add date formatting component ([#5167](https://github.com/dnbexperience/eufemia/issues/5167)) ([b72aaae](https://github.com/dnbexperience/eufemia/commit/b72aaae8a51d76fb7e6e585e2ca6793720257068))
* **Field.Upload:** support `children` ([#5260](https://github.com/dnbexperience/eufemia/issues/5260)) ([895ce25](https://github.com/dnbexperience/eufemia/commit/895ce25dc240ffb435d036b0fc83023591ece0d0))
* **Forms:** add address suggestions and autofill to the Bring API connector ([#4575](https://github.com/dnbexperience/eufemia/issues/4575)) ([25ea537](https://github.com/dnbexperience/eufemia/commit/25ea537f60d35424717103847336f37166be1167)), closes [#4554](https://github.com/dnbexperience/eufemia/issues/4554)
* **Forms:** add variant `radio` to Field.Boolean & Field.Toggle ([#5251](https://github.com/dnbexperience/eufemia/issues/5251)) ([17ce8d6](https://github.com/dnbexperience/eufemia/commit/17ce8d633d531556b4b749271341f2d3d8bb3b53))
* **Forms:** add variant `switch` to Field.Boolean & Field.Toggle ([#5247](https://github.com/dnbexperience/eufemia/issues/5247)) ([1042fde](https://github.com/dnbexperience/eufemia/commit/1042fde33cc120e93c2982d714447574fc262cb3))
* **Section, FormStatus, GlobalStatus:** update sbanken info color to green ([#5190](https://github.com/dnbexperience/eufemia/issues/5190)) ([f9fa0b0](https://github.com/dnbexperience/eufemia/commit/f9fa0b07dc13309a4cebf36b776e88269c277a30))
* **Upload:** add `compact` variant ([#5254](https://github.com/dnbexperience/eufemia/issues/5254)) ([54e8cbb](https://github.com/dnbexperience/eufemia/commit/54e8cbb0cbe8f9b5680dce63ee50802371d2960d))
* **Upload:** hide upload button when `filesAmountLimit` is met ([#5240](https://github.com/dnbexperience/eufemia/issues/5240)) ([2bec964](https://github.com/dnbexperience/eufemia/commit/2bec9645abbfadd1e1183eb2cbc5984bc7d3d538))
* **Wizard:** add option to gracefully handle layout edge cases for nested cards ([#5157](https://github.com/dnbexperience/eufemia/issues/5157)) ([610ac1b](https://github.com/dnbexperience/eufemia/commit/610ac1bf3e95926ae3b6a2baf36cb9272e84471c))

## [10.75.4](https://github.com/dnbexperience/eufemia/compare/v10.75.3...v10.75.4) (2025-06-11)


### :bug: Bug Fixes

* **DrawerList:** add & export DrawerListSize-type ([#5248](https://github.com/dnbexperience/eufemia/issues/5248)) ([a7f547b](https://github.com/dnbexperience/eufemia/commit/a7f547bd47b12edb9df2dbc6a7101fb4850d26db))
* **Field.Selection:** hover state in variant `radio-list` ([#5245](https://github.com/dnbexperience/eufemia/issues/5245)) ([0ebcf02](https://github.com/dnbexperience/eufemia/commit/0ebcf02b4687dd2b409069ce899f032b037b63e9))
* issue with CJS files used in the build (BuildInfo.cjs) ([#5246](https://github.com/dnbexperience/eufemia/issues/5246)) ([a293947](https://github.com/dnbexperience/eufemia/commit/a293947334ebfd9be2ece57a0e8de913660d48be))

## [10.75.3](https://github.com/dnbexperience/eufemia/compare/v10.75.2...v10.75.3) (2025-06-06)


### :bug: Bug Fixes

* **Accordion:** allow for text selection in Firefox ([#5225](https://github.com/dnbexperience/eufemia/issues/5225)) ([033f51e](https://github.com/dnbexperience/eufemia/commit/033f51e415cc6caa7010aef1918598181fbc2042))
* **Accordion:** fix Accordion toggle behavior when not used inside an `Accordion.Group` ([#5224](https://github.com/dnbexperience/eufemia/issues/5224)) ([25056b5](https://github.com/dnbexperience/eufemia/commit/25056b58253ef72d7c369ee5910e76f765c76e24))
* **Autocomplete:** empty string `input_value` should clear the input value ([#5237](https://github.com/dnbexperience/eufemia/issues/5237)) ([144af33](https://github.com/dnbexperience/eufemia/commit/144af3365a7b3b06f20e0a2fb2293ac5e7bdcb84))
* **Button, Input:** update alignment helper to use a more widely supported zero-width character ([#5223](https://github.com/dnbexperience/eufemia/issues/5223)) ([2b1dba0](https://github.com/dnbexperience/eufemia/commit/2b1dba0b23cf3f5da41dff8759e4d6b30606860f))
* **Field.Date:** required validation with date ranges ([#5231](https://github.com/dnbexperience/eufemia/issues/5231)) ([a8e854a](https://github.com/dnbexperience/eufemia/commit/a8e854af33e1dc29b586a3bb144b98fa4cc324d6))
* **Field.Indeterminate:** set `aria-controls` ([#5226](https://github.com/dnbexperience/eufemia/issues/5226)) ([e9c0ffb](https://github.com/dnbexperience/eufemia/commit/e9c0ffb27a18ff319e54caf2b1051745f6066c67))
* **Field.Selection & Field.ArraySelection:** remove error border when info or warning message text ([#5232](https://github.com/dnbexperience/eufemia/issues/5232)) ([8e59d01](https://github.com/dnbexperience/eufemia/commit/8e59d018a44d02225f93feb61c508593d040c136))
* **PaymentCard:** export `formatCardNumber` from PaymentCard ([#5227](https://github.com/dnbexperience/eufemia/issues/5227)) ([04b0491](https://github.com/dnbexperience/eufemia/commit/04b049128a97f382f01015fc86f886fe731f6188)), closes [/github.com/dnbexperience/eufemia/pull/5085/files#diff-cd973396bf87032377f68be76ef20ff81ea8a3c68086b9de38bb4f490f49b820L191](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/5085/files/issues/diff-cd973396bf87032377f68be76ef20ff81ea8a3c68086b9de38bb4f490f49b820L191)
* **useMedia:** fix re-render and wrong initial value issue ([#5213](https://github.com/dnbexperience/eufemia/issues/5213)) ([61099b9](https://github.com/dnbexperience/eufemia/commit/61099b940e0201c8698ce5902bba5536901bf47e))

## [10.75.2](https://github.com/dnbexperience/eufemia/compare/v10.75.1...v10.75.2) (2025-05-28)


### :memo: Documentation

* **Field.BankAccountNumber:** list string and field props correctly ([#5210](https://github.com/dnbexperience/eufemia/issues/5210)) ([e192972](https://github.com/dnbexperience/eufemia/commit/e1929720f80f269da097929ea7fd5077851ed2f3))
* **Field.NationalIdentityNumber:** list string and field props correctly ([#5209](https://github.com/dnbexperience/eufemia/issues/5209)) ([2f1afa1](https://github.com/dnbexperience/eufemia/commit/2f1afa1ae2529573eab230edb31805990350e689))
* **Field.OrganizationNumber:** list string and field props correctly ([#5208](https://github.com/dnbexperience/eufemia/issues/5208)) ([0f67a95](https://github.com/dnbexperience/eufemia/commit/0f67a9549642074686f9a844d0c1ccfdf71d1c57))
* **Field.Password:** list string and field props correctly ([#5207](https://github.com/dnbexperience/eufemia/issues/5207)) ([ec1ce2d](https://github.com/dnbexperience/eufemia/commit/ec1ce2d6b6726b355d52393887c74f281cba1110))
* **Forms:** document `Tools.Errors` and `Tools.Log` for debugging ([#5192](https://github.com/dnbexperience/eufemia/issues/5192)) ([3209dd5](https://github.com/dnbexperience/eufemia/commit/3209dd546fd1ec7a9d597c617be2146c4dddf4e2))


### :bug: Bug Fixes

* **ChildrenWithAge:** set 9 as maximum amount of children  ([#5183](https://github.com/dnbexperience/eufemia/issues/5183)) ([74b7343](https://github.com/dnbexperience/eufemia/commit/74b7343fd5236fa56c57721684c06380b7b64ff2))
* **Dropdown:** `title="[object Object]"` ([#5173](https://github.com/dnbexperience/eufemia/issues/5173)) ([1b61cec](https://github.com/dnbexperience/eufemia/commit/1b61cec0ee23bc2823045726de8661b761475346))
* **Dropdown:** support Icon in `selected_value`  ([#5172](https://github.com/dnbexperience/eufemia/issues/5172)) ([8eaa44e](https://github.com/dnbexperience/eufemia/commit/8eaa44ea8dc30a8360cd7cbe80f5d1c8418838aa))
* ensure `line-height-lead` has correct value when consumed via JavaScirpt in DNB Eiendom ([#5212](https://github.com/dnbexperience/eufemia/issues/5212)) ([c4c92ad](https://github.com/dnbexperience/eufemia/commit/c4c92adf671a25c7f27cc684ac7532617f47976c))
* **Field.PhoneNumber:** remove unsupported label properties ([#5206](https://github.com/dnbexperience/eufemia/issues/5206)) ([a214eba](https://github.com/dnbexperience/eufemia/commit/a214eba0947b173286c26c45fdc7144965109b44))
* **Field.Upload:** remove support for props not supported ([#5187](https://github.com/dnbexperience/eufemia/issues/5187)) ([178d74f](https://github.com/dnbexperience/eufemia/commit/178d74fc23f356cb5cd8983ad78a9de7b0719676))
* **Field.Upload:** support disabled property ([#5189](https://github.com/dnbexperience/eufemia/issues/5189)) ([65189a5](https://github.com/dnbexperience/eufemia/commit/65189a5a95ff76c39a96a6c5b7df91c616d3753f))
* **FieldBlock:** should not render boolean values as `labelSuffix` ([#5196](https://github.com/dnbexperience/eufemia/issues/5196)) ([7a27c79](https://github.com/dnbexperience/eufemia/commit/7a27c79787941e49ca758ce347eb252bc1ae025f))
* **Forms:** call every `onStepChange` assigned to Wizard.useStep ([#5181](https://github.com/dnbexperience/eufemia/issues/5181)) ([118f444](https://github.com/dnbexperience/eufemia/commit/118f444fb56e1cf5ec8b4e2197427b56306407b8))
* **Forms:** ensure `preventUncommittedChanges` with handler schema does not prevent Wizard navigation ([#5193](https://github.com/dnbexperience/eufemia/issues/5193)) ([0536de4](https://github.com/dnbexperience/eufemia/commit/0536de41f55a0b171399115631f0a92f7b5bbe57))
* **Upload:** style disabled state ([#5188](https://github.com/dnbexperience/eufemia/issues/5188)) ([6596a42](https://github.com/dnbexperience/eufemia/commit/6596a4250c1ec9f9608bd62d889ecddffa0572df))

## [10.75.1](https://github.com/dnbexperience/eufemia/compare/v10.75.0...v10.75.1) (2025-05-22)


### :bug: Bug Fixes

* **Forms:** enhance change detection when using `preventUncommittedChanges` on a Iterate.PushContainer ([#5177](https://github.com/dnbexperience/eufemia/issues/5177)) ([30e5bf9](https://github.com/dnbexperience/eufemia/commit/30e5bf97a4678ab5a1270d87c4b48f8bd6a3f333))
* **Forms:** ensure fields don't report errors when hidden inside Visibility ([#5176](https://github.com/dnbexperience/eufemia/issues/5176)) ([cb84095](https://github.com/dnbexperience/eufemia/commit/cb84095a478a2e1b416243b04d740e58ec719824))
* **Forms:** run `filterData` on every data entry, not only on mounted fields ([#5175](https://github.com/dnbexperience/eufemia/issues/5175)) ([c9124fc](https://github.com/dnbexperience/eufemia/commit/c9124fcb613b63f5b8cd7640f058fbb95c88ca62))

## [10.75.0](https://github.com/dnbexperience/eufemia/compare/v10.74.0...v10.75.0) (2025-05-22)


### :memo: Documentation

* **CountryFlag:** list available countries ([#5170](https://github.com/dnbexperience/eufemia/issues/5170)) ([00081e2](https://github.com/dnbexperience/eufemia/commit/00081e2ad31097ae37340ce20b0edeb18323a545))
* **Field.PhoneNumber:** list available countries ([#5171](https://github.com/dnbexperience/eufemia/issues/5171)) ([fd9adc2](https://github.com/dnbexperience/eufemia/commit/fd9adc2272703831cfb9793aee20157360dcd48b))
* **Value.SelectCountry:** list available countries ([#5169](https://github.com/dnbexperience/eufemia/issues/5169)) ([636cf32](https://github.com/dnbexperience/eufemia/commit/636cf3233e1bf4c2fddcb2e961c87e0da46ab551))


### :bug: Bug Fixes

* **DatePicker:** show month label when `onlyMonth` is `true` ([#5166](https://github.com/dnbexperience/eufemia/issues/5166)) ([5bc6a0e](https://github.com/dnbexperience/eufemia/commit/5bc6a0e74836d45c690ae91356ad5d369efc946e))
* **Forms:** add support for Iterate.Array in a Form.Section with a path ([#5156](https://github.com/dnbexperience/eufemia/issues/5156)) ([33f0ac4](https://github.com/dnbexperience/eufemia/commit/33f0ac41430c7e02dc5a25740a976fdf76f6086f)), closes [#3995](https://github.com/dnbexperience/eufemia/issues/3995)
* **Forms:** ensure `reduceToVisibleFields` works properly within Wizard ([#5174](https://github.com/dnbexperience/eufemia/issues/5174)) ([3f74b9d](https://github.com/dnbexperience/eufemia/commit/3f74b9d8f337de791b4bf34caf8a574b4b14aba7))
* **Forms:** ensure Iterate.Array with `required` prop removes error in Wizard step ([#5162](https://github.com/dnbexperience/eufemia/issues/5162)) ([e38027c](https://github.com/dnbexperience/eufemia/commit/e38027cf495d635f66ea4448ea0c60fdc38f28c3)), closes [#5159](https://github.com/dnbexperience/eufemia/issues/5159)
* **Provider:** enhance handling of translations with potential to be overwritten ([#4827](https://github.com/dnbexperience/eufemia/issues/4827)) ([f45bc93](https://github.com/dnbexperience/eufemia/commit/f45bc93f60dc8b2070961a1ea50a188066b9917c))
* **useTranslation:** ensure correct TypeScript typing support ([#5148](https://github.com/dnbexperience/eufemia/issues/5148)) ([db95526](https://github.com/dnbexperience/eufemia/commit/db9552671c0fb1a8f9a07920226cdc0d3328068b))


### :sparkles: Features

* **DatePicker:** deprecate `correctInvalidDate` ([#4916](https://github.com/dnbexperience/eufemia/issues/4916)) ([eced11b](https://github.com/dnbexperience/eufemia/commit/eced11b1c82df2de9490fda5880324cb7b2fcb36))
* **Forms:** add support for country names in `sv-SE` locale ([#5168](https://github.com/dnbexperience/eufemia/issues/5168)) ([1383d7a](https://github.com/dnbexperience/eufemia/commit/1383d7a821e107805a89f8bfa6518e4dd98d8b01)), closes [#4769](https://github.com/dnbexperience/eufemia/issues/4769)
* **Froms:** add `minItems` and `maxItems` properties to Iterate.Array ([#5164](https://github.com/dnbexperience/eufemia/issues/5164)) ([85d2e7e](https://github.com/dnbexperience/eufemia/commit/85d2e7e700406a0d3609e027c0a8d0f52bfd3198))
* **Iterate.RemoveButton:** add support for `itemNo` ([#5158](https://github.com/dnbexperience/eufemia/issues/5158)) ([681c549](https://github.com/dnbexperience/eufemia/commit/681c54914928d6a9b91a82dc3bdc0dff7514fb3c))
* **PaymentCard:** update PaymentCard designs  ([#5085](https://github.com/dnbexperience/eufemia/issues/5085)) ([91947b1](https://github.com/dnbexperience/eufemia/commit/91947b110a0b3a55580a5c1339cb5907b6aa0d7a))

## [10.74.0](https://github.com/dnbexperience/eufemia/compare/v10.73.2...v10.74.0) (2025-05-19)


### :sparkles: Features

* **DatePicker:** add year navigation to calendar ([#4978](https://github.com/dnbexperience/eufemia/issues/4978)) ([b927430](https://github.com/dnbexperience/eufemia/commit/b927430a73cf340d28676f4f111e5f0f56ff224d))
* **Field.Date:** add `yearNavigation` ([#5121](https://github.com/dnbexperience/eufemia/issues/5121)) ([65928d0](https://github.com/dnbexperience/eufemia/commit/65928d0cf45af334b239854b66f4db98a43ecce0))
* **Forms:** add `preventUncommittedChanges` in Form.Isolation to show error during submit after user input ([#5102](https://github.com/dnbexperience/eufemia/issues/5102)) ([fbc5402](https://github.com/dnbexperience/eufemia/commit/fbc5402d8dbf67f50e8bfcb95f8a62232f41c936)), closes [#5005](https://github.com/dnbexperience/eufemia/issues/5005) [#5127](https://github.com/dnbexperience/eufemia/issues/5127)
* **Forms:** add `resetAfterCommit` to Form.Isolation ([#5127](https://github.com/dnbexperience/eufemia/issues/5127)) ([353271d](https://github.com/dnbexperience/eufemia/commit/353271d3bcc4d33e2d248a4699b0928dcd54f69f))
* **Iterate.PushContainer:** deprecate `requireCommit` in favor of `preventUncommitedChanges` ([#5134](https://github.com/dnbexperience/eufemia/issues/5134)) ([9596abb](https://github.com/dnbexperience/eufemia/commit/9596abb3b65402769b13cd871b767626ad16f5ad))


### :bug: Bug Fixes

* **Button:** bold font weight issue when `type="submit"` on iPhone ([#5147](https://github.com/dnbexperience/eufemia/issues/5147)) ([ac12151](https://github.com/dnbexperience/eufemia/commit/ac1215193b3477aa6424f8d25a12acca42b1e9c9))
* **Checkbox:** add support for `preventDefault` in onClick ([#4768](https://github.com/dnbexperience/eufemia/issues/4768)) ([c03a930](https://github.com/dnbexperience/eufemia/commit/c03a93096e8273cf490651ff288b45989aa0f1e8))
* **DatePicker:** cancel and reset functionality ([#5021](https://github.com/dnbexperience/eufemia/issues/5021)) ([3db9c0e](https://github.com/dnbexperience/eufemia/commit/3db9c0e6dc6e9b2ed825ed948233eb1f2d0da530))
* **Drawer:** bottom containerPlacement on small screen ([#5123](https://github.com/dnbexperience/eufemia/issues/5123)) ([1afada9](https://github.com/dnbexperience/eufemia/commit/1afada95ae7cd04be0b769eeb631112cabd504e9))
* **DrawerList:** refactor TypeScript ([#4687](https://github.com/dnbexperience/eufemia/issues/4687)) ([5697c2c](https://github.com/dnbexperience/eufemia/commit/5697c2cc0bb686a111c6918dd80183735c328a04))
* **Dropdown:** fix `React.ReactNode` support for `title` prop ([#5124](https://github.com/dnbexperience/eufemia/issues/5124)) ([9d2b653](https://github.com/dnbexperience/eufemia/commit/9d2b653d52e83a4fdd5d10fa49a288596f40d290))
* **Field.Selection:** apply correct `width` to prevent label wrapping ([#5120](https://github.com/dnbexperience/eufemia/issues/5120)) ([a2d7928](https://github.com/dnbexperience/eufemia/commit/a2d79280c492fa92af3845461737718a07e5af2e))
* **Field.Toggle, Field.Boolean:** add support for `preventDefault` in onClick for `checkbox` variant ([#5117](https://github.com/dnbexperience/eufemia/issues/5117)) ([a34700f](https://github.com/dnbexperience/eufemia/commit/a34700f8b6fcd32dc14bb731178c2e8b03effafc)), closes [#4768](https://github.com/dnbexperience/eufemia/issues/4768)
* **Forms:** ensure Form.Isolation does work within a Form.Section ([#5142](https://github.com/dnbexperience/eufemia/issues/5142)) ([0db7aa3](https://github.com/dnbexperience/eufemia/commit/0db7aa3b9f28201fd7f0998926feb0697521bb94))
* **Forms:** support `required` in Field.Selection with `dropdown` variant ([#5106](https://github.com/dnbexperience/eufemia/issues/5106)) ([d1202b9](https://github.com/dnbexperience/eufemia/commit/d1202b911e401a01f828629bc8de534c19bd2e05))
* **Heading:** warning when increasing heading to be `h2` when previous sibling is `h1` ([#4914](https://github.com/dnbexperience/eufemia/issues/4914)) ([393e765](https://github.com/dnbexperience/eufemia/commit/393e765c163ade166ea2516702377efcce2a8576))
* **InputMasked:** allow value 0 when `disallowLeadingZeroes` is set ([#4918](https://github.com/dnbexperience/eufemia/issues/4918)) ([c08e51a](https://github.com/dnbexperience/eufemia/commit/c08e51a0983c4f1b19832b11e3507481d303a268)), closes [/github.com/dnbexperience/eufemia/blob/a564953ecd7d7aeb25f9dc603456ba52ea91049f/packages/dnb-eufemia/src/components/input-masked/InputMaskedHooks.js#L348](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/blob/a564953ecd7d7aeb25f9dc603456ba52ea91049f/packages/dnb-eufemia/src/components/input-masked/InputMaskedHooks.js/issues/L348)
* **NumberFormat:** render minus sign correctly for negative decimal values ([#5116](https://github.com/dnbexperience/eufemia/issues/5116)) ([b1b31d4](https://github.com/dnbexperience/eufemia/commit/b1b31d452a5b6d667024b01c1b97e8ed848dc79a)), closes [#4788](https://github.com/dnbexperience/eufemia/issues/4788)

## [10.73.2](https://github.com/dnbexperience/eufemia/compare/v10.73.1...v10.73.2) (2025-05-12)


### :bug: Bug Fixes

* **Forms:** ensure support for `labelSrOnly` in Field.PhoneNumber ([#5108](https://github.com/dnbexperience/eufemia/issues/5108)) ([d58ca56](https://github.com/dnbexperience/eufemia/commit/d58ca563f882e682d279fa5543507b684b18e259))
* **Forms:** ensure support for `labelSrOnly` in Field.Toggle ([#5109](https://github.com/dnbexperience/eufemia/issues/5109)) ([a0d2031](https://github.com/dnbexperience/eufemia/commit/a0d2031936798f67acc71a97fec584e288361fec))
* **Forms:** support `required` in Field.ArraySelection with `button` & `checkbox-button` variant ([#5074](https://github.com/dnbexperience/eufemia/issues/5074)) ([1daab13](https://github.com/dnbexperience/eufemia/commit/1daab134acc868863ef2fdb50a290115f61fef91))
* **Forms:** support `required` in Field.Toggle with `button` & `checkbox-button` variant ([#5104](https://github.com/dnbexperience/eufemia/issues/5104)) ([be31978](https://github.com/dnbexperience/eufemia/commit/be3197891a806e0f44f8670e589e5f9e0ec3601e))
* **Forms:** support `required` in Field.Toggle with `buttons` variant ([#5105](https://github.com/dnbexperience/eufemia/issues/5105)) ([3147d17](https://github.com/dnbexperience/eufemia/commit/3147d1780078a9a4742681469e8908afba413974))
* **Upload:** display files amount message as warning ([#5110](https://github.com/dnbexperience/eufemia/issues/5110)) ([7da42cb](https://github.com/dnbexperience/eufemia/commit/7da42cb07c27cb426fdb8496c3d314d9e572f5ed))

## [10.73.1](https://github.com/dnbexperience/eufemia/compare/v10.73.0...v10.73.1) (2025-05-09)


### :memo: Documentation

* **Drawer, Dialog:** display Modal translations in properties docs ([#5083](https://github.com/dnbexperience/eufemia/issues/5083)) ([ab3fae7](https://github.com/dnbexperience/eufemia/commit/ab3fae7053fc084e6fa13b7b08499c936c210a64))
* **Modal:** `closeTitle`, `hideCloseButton`, `spacing` is not deprecated ([#5082](https://github.com/dnbexperience/eufemia/issues/5082)) ([4753910](https://github.com/dnbexperience/eufemia/commit/47539103a9ed8e375d0aeb0c24d3a45206d38466)), closes [/github.com/dnbexperience/eufemia/commit/ebe8e6a597c87885c081fcdfd76339780e90befc#diff-f1c94bc3bf35a0cb7181e56dab45c760dfa612539ab3fcd8c903e3c76b6b9f6](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/commit/ebe8e6a597c87885c081fcdfd76339780e90befc/issues/diff-f1c94bc3bf35a0cb7181e56dab45c760dfa612539ab3fcd8c903e3c76b6b9f6)


### :bug: Bug Fixes

* **Field.PhoneNumber:** list country code beneath country name ([#5097](https://github.com/dnbexperience/eufemia/issues/5097)) ([070c9ce](https://github.com/dnbexperience/eufemia/commit/070c9ce6d3f00c8534d46a2e8db9841e0fc64026))
* **Field.PhoneNumber:** select country  code input value on single click ([#5086](https://github.com/dnbexperience/eufemia/issues/5086)) ([4027fc1](https://github.com/dnbexperience/eufemia/commit/4027fc1b9c4292d41765e62e10200d8b00b1df62))
* **Field.PhoneNumber:** validate field as required even if country code was given ([#5088](https://github.com/dnbexperience/eufemia/issues/5088)) ([a8bbd45](https://github.com/dnbexperience/eufemia/commit/a8bbd453115d682972858ab23e17378135ea7bf7))
* **Field.SelectCountry:** select country input value on single click ([#5094](https://github.com/dnbexperience/eufemia/issues/5094)) ([6462f8c](https://github.com/dnbexperience/eufemia/commit/6462f8cc603f1792e5a16ee942198f0458830696))
* **Field.SelectCurrency:** select currency input value on single click ([#5093](https://github.com/dnbexperience/eufemia/issues/5093)) ([fa66807](https://github.com/dnbexperience/eufemia/commit/fa66807bff9c5b996bad249f90967cd5a825a43a))
* **Field.Selection:** select input value on single click ([#5095](https://github.com/dnbexperience/eufemia/issues/5095)) ([d6181fc](https://github.com/dnbexperience/eufemia/commit/d6181fc0f56cf22bc22d842629e8f9354caa9a2d))
* **Forms:** don't show red border on errors when EditContainer or PushContainer use the `basic` variant ([#5092](https://github.com/dnbexperience/eufemia/issues/5092)) ([c3362e6](https://github.com/dnbexperience/eufemia/commit/c3362e6ccc9dd1151f8fdb7e64f4de9cac7a1f78)), closes [#4985](https://github.com/dnbexperience/eufemia/issues/4985) [/github.com/dnbexperience/eufemia/issues/4985#issuecomment-2862757367](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/issues/4985/issues/issuecomment-2862757367) [#5051](https://github.com/dnbexperience/eufemia/issues/5051)
* **Forms:** help button on Field.* components should not wrap alone ([#5096](https://github.com/dnbexperience/eufemia/issues/5096)) ([e07b8e6](https://github.com/dnbexperience/eufemia/commit/e07b8e609f385a1e6d1fbbf2eb706fec955106c6))
* **Forms:** help button on Value.* components should not wrap alone ([#5091](https://github.com/dnbexperience/eufemia/issues/5091)) ([7d342c3](https://github.com/dnbexperience/eufemia/commit/7d342c3687d94f7bd0199440949cbad317b6d46d))
* **Upload:** remove file by id or file equality ([#5087](https://github.com/dnbexperience/eufemia/issues/5087)) ([eb051a1](https://github.com/dnbexperience/eufemia/commit/eb051a18f237b02dc2c8598a821e6368e2842cd9))
* **Value.SummaryList:** support `maxWidth` in nested Value.* components ([#5068](https://github.com/dnbexperience/eufemia/issues/5068)) ([dbc3be6](https://github.com/dnbexperience/eufemia/commit/dbc3be6e03939b8155cdba774641304ae69e4ed5))

## [10.73.0](https://github.com/dnbexperience/eufemia/compare/v10.72.3...v10.73.0) (2025-05-08)


### :sparkles: Features

* **CopyOnClick:** add `tooltipContent` to be displayed when text has been copied ([#5008](https://github.com/dnbexperience/eufemia/issues/5008)) ([d68a031](https://github.com/dnbexperience/eufemia/commit/d68a03118fd3d365183de21d56106256f006bf5d))
* **CountryFlag:** update country-flags to v7.3.2 ([#5063](https://github.com/dnbexperience/eufemia/issues/5063)) ([680bfbe](https://github.com/dnbexperience/eufemia/commit/680bfbe9d4939559f55631ae377f1d8c356d80ab))
* **DatePicker:** add `labelAlignment` ([#4994](https://github.com/dnbexperience/eufemia/issues/4994)) ([171edd6](https://github.com/dnbexperience/eufemia/commit/171edd671d6250e3e072b34e10d1b8951910a6ec))
* **DatePicker:** copy whole formatted date when coping from input field ([#5053](https://github.com/dnbexperience/eufemia/issues/5053)) ([9eb9bda](https://github.com/dnbexperience/eufemia/commit/9eb9bda61caa0b263ad94f9057da08b6c7a6e846))
* **DatePicker:** replace locale based `date-fns` formatting with `Intl` ([#4766](https://github.com/dnbexperience/eufemia/issues/4766)) ([c44d58d](https://github.com/dnbexperience/eufemia/commit/c44d58de977d403d943c9fc6980c9fb9bdaf563b))
* **Field.Composition:** support `help` property ([#5070](https://github.com/dnbexperience/eufemia/issues/5070)) ([4b91598](https://github.com/dnbexperience/eufemia/commit/4b9159866a66692ef77a8a7dfaaae919075d72ef))
* **Field.Expiry:** remove `width` & `contentWidth` properties ([#5057](https://github.com/dnbexperience/eufemia/issues/5057)) ([5a6a9f9](https://github.com/dnbexperience/eufemia/commit/5a6a9f92aaaaea18a9c92a25ed563e29a11c4edc))
* **Forms:** add `radio-list` variant to Field.Selection ([#5015](https://github.com/dnbexperience/eufemia/issues/5015)) ([ad68737](https://github.com/dnbexperience/eufemia/commit/ad687376abd43b1851e73cfe47e1a0c7dd665dea))
* **Forms:** add `requireCommit` property to Iterate.PushContainer to show error during submit or next step after user input ([#5005](https://github.com/dnbexperience/eufemia/issues/5005)) ([37b8d6f](https://github.com/dnbexperience/eufemia/commit/37b8d6f3da3d226fde1730fac9077a8e8d46945d)), closes [#4985](https://github.com/dnbexperience/eufemia/issues/4985) [#4072](https://github.com/dnbexperience/eufemia/issues/4072)
* **Forms:** add support for `labelSize` to all Field.* ([#5029](https://github.com/dnbexperience/eufemia/issues/5029)) ([58119ec](https://github.com/dnbexperience/eufemia/commit/58119ec80b7734b17de561a0aba311a54405c16d))
* **Forms:** always validate fields in all Wizard steps (without keepInDOM) ([#5041](https://github.com/dnbexperience/eufemia/issues/5041)) ([e6af499](https://github.com/dnbexperience/eufemia/commit/e6af499a00c34255a51228646cb433902e974d83))
* **Icons:** add `digital_advise`, `aino`, `lightningstrike` ([#5059](https://github.com/dnbexperience/eufemia/issues/5059)) ([bf080e4](https://github.com/dnbexperience/eufemia/commit/bf080e4b39dc8ed1e70f2967496cfec75bef7588))
* **Pagination:** add support for horizontal `paginationBarLayout` ([#5072](https://github.com/dnbexperience/eufemia/issues/5072)) ([20a8458](https://github.com/dnbexperience/eufemia/commit/20a8458b48097724409af89d8b79920acc6653f6))
* **StepIndicator:** animate chevron on expand/collapse ([#4987](https://github.com/dnbexperience/eufemia/issues/4987)) ([f409073](https://github.com/dnbexperience/eufemia/commit/f40907336f1daad687f182ac2e6db9bdc9393e0c))


### :bug: Bug Fixes

* **CopyOnClick:** copy `textContent` when given children is empty ([#5014](https://github.com/dnbexperience/eufemia/issues/5014)) ([d7f6992](https://github.com/dnbexperience/eufemia/commit/d7f6992681342d9c9457bf527fe58e06385ea5f6))
* **CopyOnClick:** display copy cursor for all children ([#5011](https://github.com/dnbexperience/eufemia/issues/5011)) ([536b114](https://github.com/dnbexperience/eufemia/commit/536b114e728e9f5f22540bac15241d90426f867f))
* **DatePicker:** prevent selection of invalid dates when navigating the calendar with arrow keys ([#5006](https://github.com/dnbexperience/eufemia/issues/5006)) ([549a1b5](https://github.com/dnbexperience/eufemia/commit/549a1b51ab9c99a21f650531052c32aa025196b8))
* **Field.Block:** render `labelDescription` without spacing above ([#5025](https://github.com/dnbexperience/eufemia/issues/5025)) ([05879e9](https://github.com/dnbexperience/eufemia/commit/05879e952071cf001c07218f5a6fb5e7f388e619))
* **Field.Date:** support width ([#5038](https://github.com/dnbexperience/eufemia/issues/5038)) ([8ba70cc](https://github.com/dnbexperience/eufemia/commit/8ba70cc2b7ee42bea5c8767ab24b8f95c7f1234b))
* **Field.PhoneNumber:** ensure large width has correct size ([#5042](https://github.com/dnbexperience/eufemia/issues/5042)) ([1e2f5bd](https://github.com/dnbexperience/eufemia/commit/1e2f5bd051b35cfae51d43ee79f47eba1fdb2a70))
* **Field.PhoneNumber:** support width ([#5036](https://github.com/dnbexperience/eufemia/issues/5036)) ([cbe360c](https://github.com/dnbexperience/eufemia/commit/cbe360c350dd773848a51637761359c6e759672c))
* **Field.Upload:** support width ([#5033](https://github.com/dnbexperience/eufemia/issues/5033)) ([877d355](https://github.com/dnbexperience/eufemia/commit/877d355219a3ff411578bbd3d06cfdaf82bf0d43))
* **Forms:** ensure edit containers for Iterate and Section shows red border on submit errors ([#5051](https://github.com/dnbexperience/eufemia/issues/5051)) ([7dc34cc](https://github.com/dnbexperience/eufemia/commit/7dc34ccb37876ebe5b924e9d91500832370983ac))
* **Forms:** ensure Field.Composition sets correct `width` if given ([#5071](https://github.com/dnbexperience/eufemia/issues/5071)) ([07dd346](https://github.com/dnbexperience/eufemia/commit/07dd3469654831268d107620e5005b478b3bf245))
* **Forms:** ensure Field.Composition with horizontal layout will still wrap ([#5007](https://github.com/dnbexperience/eufemia/issues/5007)) ([3500dd4](https://github.com/dnbexperience/eufemia/commit/3500dd4ffd715000589c92055dd8034fca5836db))
* **Forms:** ensure Field.Selection with the autocomplete variant receives showIndicator in the first onType parameter object ([#5012](https://github.com/dnbexperience/eufemia/issues/5012)) ([98b6a5a](https://github.com/dnbexperience/eufemia/commit/98b6a5af1f386bc1418db040f96e2247d33cd88d))
* **Forms:** ensure fields do not overflow in width on a certain screen size ([#5049](https://github.com/dnbexperience/eufemia/issues/5049)) ([cacd703](https://github.com/dnbexperience/eufemia/commit/cacd70335bcbafbaf04885c8c89cd4cbc208452c))
* **Forms:** ensure Iterate.Array schema validation ([#4986](https://github.com/dnbexperience/eufemia/issues/4986)) ([7b1f250](https://github.com/dnbexperience/eufemia/commit/7b1f2505d187737ccab2115791bc3e6ee6518f0a)), closes [#4956](https://github.com/dnbexperience/eufemia/issues/4956)
* **Forms:** ensure keepInDOM in Wizard step does not pre-render step ([#5002](https://github.com/dnbexperience/eufemia/issues/5002)) ([3969a15](https://github.com/dnbexperience/eufemia/commit/3969a15c6467066040e4cf9d784d76b325ef60de))
* **Forms:** ensure support for `labelSrOnly` for all fields ([#5050](https://github.com/dnbexperience/eufemia/issues/5050)) ([948d6bc](https://github.com/dnbexperience/eufemia/commit/948d6bc4bf82081790ffed3a735040d7dfdc7007))
* **Forms:** ensure values of fields inside Form.Isolation write their initial value to the isolated data context ([#5056](https://github.com/dnbexperience/eufemia/issues/5056)) ([583a55c](https://github.com/dnbexperience/eufemia/commit/583a55c59cf9898bb3861fb673cadc590a28ad34))
* **Forms:** support `required` in Field.Selection with `button` variant ([#5064](https://github.com/dnbexperience/eufemia/issues/5064)) ([55be79d](https://github.com/dnbexperience/eufemia/commit/55be79d09f1135a6ad08597efa21b129a8801b51))
* **FormStatus:** always render with a max-width to enhance readability ([#5039](https://github.com/dnbexperience/eufemia/issues/5039)) ([3271021](https://github.com/dnbexperience/eufemia/commit/3271021d493d409c648a48b1ff2d61543499a99b)), closes [/github.com/dnbexperience/eufemia/pull/5039/files#diff-9205ae17277da7b891bb7d4ee2b32336046e4f3376537a44a65cf0279f5bb582](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/5039/files/issues/diff-9205ae17277da7b891bb7d4ee2b32336046e4f3376537a44a65cf0279f5bb582)
* **Forms:** use default outline color on Cards used inside Wizard ([#5054](https://github.com/dnbexperience/eufemia/issues/5054)) ([b7cb237](https://github.com/dnbexperience/eufemia/commit/b7cb2374f51927df5d90619fcc6ff92e21ef7579)), closes [#4462](https://github.com/dnbexperience/eufemia/issues/4462)
* **HeightAnimation:** always end animation properly when animation has finished ([#5028](https://github.com/dnbexperience/eufemia/issues/5028)) ([b1287ba](https://github.com/dnbexperience/eufemia/commit/b1287ba163a285a670f1bbc55a0ee09f02d2e53e)), closes [#4493](https://github.com/dnbexperience/eufemia/issues/4493)
* **Lead:** correct line height ([#5055](https://github.com/dnbexperience/eufemia/issues/5055)) ([3e6dd43](https://github.com/dnbexperience/eufemia/commit/3e6dd439a84b833c7f7560783bb5fce070b2d399))
* **Selection:** support `undefined` value from data context ([#5027](https://github.com/dnbexperience/eufemia/issues/5027)) ([a3129f1](https://github.com/dnbexperience/eufemia/commit/a3129f1b2b627eafca9ab8077e8d6be4ee3e5317)), closes [#4584](https://github.com/dnbexperience/eufemia/issues/4584)
* **StepIndicator:** align trigger button ([#4981](https://github.com/dnbexperience/eufemia/issues/4981)) ([b79a5ad](https://github.com/dnbexperience/eufemia/commit/b79a5ad644445496e512582782bda0fed63c9c46))
* **StepIndicator:** font size of step items ([#4982](https://github.com/dnbexperience/eufemia/issues/4982)) ([1a81286](https://github.com/dnbexperience/eufemia/commit/1a81286aec820612fd2666ded1995b0af4b577cc))
* **Upload:** gracefully handle `undefined` file input ([#5045](https://github.com/dnbexperience/eufemia/issues/5045)) ([d1dea57](https://github.com/dnbexperience/eufemia/commit/d1dea57a33496003b7e78f23067073235fc4dcdb))
* **Value.BankAccountNumber:** should not render when value is empty ([#4998](https://github.com/dnbexperience/eufemia/issues/4998)) ([2d694a6](https://github.com/dnbexperience/eufemia/commit/2d694a674217da0647249788a1edeb4bca24ebd5))
* **Value.NationalIdentityNumber:** should not render when value is empty ([#4995](https://github.com/dnbexperience/eufemia/issues/4995)) ([7982070](https://github.com/dnbexperience/eufemia/commit/7982070b26253f33866b977e18a6c9aaa28a720a))
* **Value.OrganizationNumber:** should not render when value is empty ([#4997](https://github.com/dnbexperience/eufemia/issues/4997)) ([fb8987c](https://github.com/dnbexperience/eufemia/commit/fb8987c41ffa7634fd3e511237dfc0b62bd07e60))
* **Value.PhoneNumber:** should not render when value is empty ([#4996](https://github.com/dnbexperience/eufemia/issues/4996)) ([dbc1cbf](https://github.com/dnbexperience/eufemia/commit/dbc1cbf837daabfc2c875a16beba87c195fb7b6b))
* **Value.SelectCountry:** handle invalid iso code values ([#4992](https://github.com/dnbexperience/eufemia/issues/4992)) ([5f87e61](https://github.com/dnbexperience/eufemia/commit/5f87e612a6c4f19854f4864cade19d647fbc0b44))
* **Value.SelectCurrency:** handle invalid iso code values ([#4993](https://github.com/dnbexperience/eufemia/issues/4993)) ([09a12f2](https://github.com/dnbexperience/eufemia/commit/09a12f2f2346459d1105878845f7573cf4ffb9ea))

## [10.72.3](https://github.com/dnbexperience/eufemia/compare/v10.72.2...v10.72.3) (2025-04-28)


### :bug: Bug Fixes

* **CopyOnClick:** copy `textContent` when given children is empty ([#5014](https://github.com/dnbexperience/eufemia/issues/5014)) ([9b59d56](https://github.com/dnbexperience/eufemia/commit/9b59d567adad307ab83d0870c2d523780e0ffe7d))
* **CopyOnClick:** display copy cursor for all children ([#5011](https://github.com/dnbexperience/eufemia/issues/5011)) ([cbff90c](https://github.com/dnbexperience/eufemia/commit/cbff90cdc23bf1bdce4aacd693b457a03c467919))
* **Forms:** ensure Field.Composition with horizontal layout will still wrap ([#5007](https://github.com/dnbexperience/eufemia/issues/5007)) ([29c3055](https://github.com/dnbexperience/eufemia/commit/29c30551514b899d41a3b836d6aff8d7fde37dca))
* **Forms:** ensure Field.Selection with the autocomplete variant receives showIndicator in the first onType parameter object ([#5012](https://github.com/dnbexperience/eufemia/issues/5012)) ([ed8a5d1](https://github.com/dnbexperience/eufemia/commit/ed8a5d13b03212b55cc592dfa268950b3f7fa049))

## [10.72.2](https://github.com/dnbexperience/eufemia/compare/v10.72.1...v10.72.2) (2025-04-22)


### :bug: Bug Fixes

* **Forms:** ensure Iterate.Array schema validation ([#4986](https://github.com/dnbexperience/eufemia/issues/4986)) ([7e10a4a](https://github.com/dnbexperience/eufemia/commit/7e10a4a5baffdb6b87c6fc8447a8477a583f6136)), closes [#4956](https://github.com/dnbexperience/eufemia/issues/4956)

## [10.72.1](https://github.com/dnbexperience/eufemia/compare/v10.72.0...v10.72.1) (2025-04-22)


### :bug: Bug Fixes

* **StepIndicator:** align trigger button ([#4981](https://github.com/dnbexperience/eufemia/issues/4981)) ([80e05aa](https://github.com/dnbexperience/eufemia/commit/80e05aa8bcc9225e9301f556a07e18dd8974d823))
* **StepIndicator:** font size of step items ([#4982](https://github.com/dnbexperience/eufemia/issues/4982)) ([6d0d266](https://github.com/dnbexperience/eufemia/commit/6d0d2668228a3890bf5496916e523ab4fc2630d5))

## [10.72.0](https://github.com/dnbexperience/eufemia/compare/v10.71.2...v10.72.0) (2025-04-15)


### :sparkles: Features

* **StepIndicator:** redesign ([#4462](https://github.com/dnbexperience/eufemia/issues/4462)) ([b541600](https://github.com/dnbexperience/eufemia/commit/b541600f5c77472dfae6679800edc8f52d33d8cf))

## [10.71.2](https://github.com/dnbexperience/eufemia/compare/v10.71.1...v10.71.2) (2025-04-15)


### :bug: Bug Fixes

* **Tooltip:** improve alignment of tooltip with long texts ([#4970](https://github.com/dnbexperience/eufemia/issues/4970)) ([b728c6a](https://github.com/dnbexperience/eufemia/commit/b728c6aefe64d8f476bd80da167b43911676c2be))

## [10.71.1](https://github.com/dnbexperience/eufemia/compare/v10.71.0...v10.71.1) (2025-04-15)


### :bug: Bug Fixes

* **DatePicker:** display correct dates when props are updated with `useLayoutEffect` in `React.StrictMode`  ([#4950](https://github.com/dnbexperience/eufemia/issues/4950)) ([b57392d](https://github.com/dnbexperience/eufemia/commit/b57392d712b7c56e7d57a092e3334993a12933c7))
* **Tooltip:** alignment issues ([#4968](https://github.com/dnbexperience/eufemia/issues/4968)) ([1e528e3](https://github.com/dnbexperience/eufemia/commit/1e528e333ead9e14b9e7d4209147ce60544a1299)), closes [/github.com/dnbexperience/eufemia/pull/1613/files#diff-b2805e65ae4b7b277abc5b023aae4c0962edf5c86c8fd5dcdcbdf7350f1ed536R224](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/1613/files/issues/diff-b2805e65ae4b7b277abc5b023aae4c0962edf5c86c8fd5dcdcbdf7350f1ed536R224)

## [10.71.0](https://github.com/dnbexperience/eufemia/compare/v10.70.1...v10.71.0) (2025-04-11)


### :bug: Bug Fixes

* **DatePicker:** display correct dates when props are updated with `useLayoutEffect` ([#4937](https://github.com/dnbexperience/eufemia/issues/4937)) ([cbaf535](https://github.com/dnbexperience/eufemia/commit/cbaf535a8fc12ba6933efddd08d2d10c02f213c5))
* **InputMasked:** ensure correct cursor position when suffix changes during typing ([#4939](https://github.com/dnbexperience/eufemia/issues/4939)) ([17d5da5](https://github.com/dnbexperience/eufemia/commit/17d5da53c30221d397dd0733107b11e143970116))


### :sparkles: Features

* **DatePicker:** remove stepped date change on `ArrowUp` a `ArrowDown` key press ([#4917](https://github.com/dnbexperience/eufemia/issues/4917)) ([9569617](https://github.com/dnbexperience/eufemia/commit/95696172a18242216a29f37d729814b11d9a8ff3))
* **Forms:** add `iso` (country) to additional args in PhoneNumber field ([#4929](https://github.com/dnbexperience/eufemia/issues/4929)) ([6ee934a](https://github.com/dnbexperience/eufemia/commit/6ee934aab4b99f99099c66dc31ad69ef84c548b8))
* **Forms:** add support for string and JSX format to Field.* `error` prop and validators ([#4928](https://github.com/dnbexperience/eufemia/issues/4928)) ([ee0183f](https://github.com/dnbexperience/eufemia/commit/ee0183f91ad11232ba29294040664cbfff75f319))
* **Upload:** add `description` to fileItem ([#4935](https://github.com/dnbexperience/eufemia/issues/4935)) ([688e340](https://github.com/dnbexperience/eufemia/commit/688e340d4d76ed8c96ab71e78afbb91cbb56b0de))
* **Upload:** add `disableDragAndDrop` ([#4905](https://github.com/dnbexperience/eufemia/issues/4905)) ([7205f96](https://github.com/dnbexperience/eufemia/commit/7205f96755ff492fdde9ccd79a7c86615dfe52c1))
* **Upload:** add `removeDeleteButton` to fileItem ([#4936](https://github.com/dnbexperience/eufemia/issues/4936)) ([00e7b81](https://github.com/dnbexperience/eufemia/commit/00e7b81d70e0ba7c030c5ece55a343fb9ea3ef7c))

## [10.70.1](https://github.com/dnbexperience/eufemia/compare/v10.70.0...v10.70.1) (2025-04-10)


### :bug: Bug Fixes

* **DatePicker:** enhance typing in input ([#4893](https://github.com/dnbexperience/eufemia/issues/4893)) ([1162c72](https://github.com/dnbexperience/eufemia/commit/1162c72842286e0383a15406a02f7e3846d275f4))
* **Forms:** prevent form submit when `error` prop is set on a `Field.*` ([#4908](https://github.com/dnbexperience/eufemia/issues/4908)) ([687c249](https://github.com/dnbexperience/eufemia/commit/687c2493ab5f463163cb947aef162890f50153cd))

## [10.70.0](https://github.com/dnbexperience/eufemia/compare/v10.69.1...v10.70.0) (2025-04-04)


### :sparkles: Features

* **Avatar:** add properties `color` & `backgroundColor` ([#4897](https://github.com/dnbexperience/eufemia/issues/4897)) ([2d1a675](https://github.com/dnbexperience/eufemia/commit/2d1a675e6d7d3ec679380dd2bfcc492de5da87de))
* **Field.Password:** set default autocomplete attribute to `current-password` ([#4874](https://github.com/dnbexperience/eufemia/issues/4874)) ([c6b1454](https://github.com/dnbexperience/eufemia/commit/c6b1454980848a46ebc23ab56bd05be371cc7b4e))
* **GlobalError:** deprecate `code` in favor of `errorMessageCode` ([#4872](https://github.com/dnbexperience/eufemia/issues/4872)) ([3634bce](https://github.com/dnbexperience/eufemia/commit/3634bce6ca174904b6921b0bc549a457f21e6a64))
* **GlobalError:** deprecate `status` in favor of `statusCode` ([#4819](https://github.com/dnbexperience/eufemia/issues/4819)) ([6aeca86](https://github.com/dnbexperience/eufemia/commit/6aeca86b942855072d112b2ed719fe2c0c966216))
* **InfoCard:** add `children` property ([#4831](https://github.com/dnbexperience/eufemia/issues/4831)) ([7d61f14](https://github.com/dnbexperience/eufemia/commit/7d61f14c921a40f35ca6a0fbee5e10528933d6d9))
* **Pagination:** rename `place_maker_before_content` to `place_marker_before_content` ([#4875](https://github.com/dnbexperience/eufemia/issues/4875)) ([51974fa](https://github.com/dnbexperience/eufemia/commit/51974faf9872dafae1709daf7091de1427c540be))
* **Upload:** add property `allowDuplicates` ([#4880](https://github.com/dnbexperience/eufemia/issues/4880)) ([192d98b](https://github.com/dnbexperience/eufemia/commit/192d98bce249e4fa936cf12435450659c9b0ec37))


### :bug: Bug Fixes

* **Avatar.Group:** forward `size`, `variant`, `color`, `backgroundColor` to single child ([#4903](https://github.com/dnbexperience/eufemia/issues/4903)) ([f4ad737](https://github.com/dnbexperience/eufemia/commit/f4ad737fa6a5e2c0f040ebd2a434d8c6db96c080))
* **DatePicker:** update calendar views based on input value when `range` is `true` ([#4859](https://github.com/dnbexperience/eufemia/issues/4859)) ([99d7c72](https://github.com/dnbexperience/eufemia/commit/99d7c72e6493ccf551f832f7875a5c5a9711a134))
* **Forms:** correctly report error during Wizard step navigation with async event handler or field validator ([#4899](https://github.com/dnbexperience/eufemia/issues/4899)) ([995aff6](https://github.com/dnbexperience/eufemia/commit/995aff653dd70e496e1e02ba13c7f858c98ea11b)), closes [#4892](https://github.com/dnbexperience/eufemia/issues/4892)
* **Forms:** ensure `hasValue` runs in Form.Visibility when path is missing ([#4870](https://github.com/dnbexperience/eufemia/issues/4870)) ([01cd306](https://github.com/dnbexperience/eufemia/commit/01cd30613583a4dd370493fc3531eb27605248ef)), closes [#4864](https://github.com/dnbexperience/eufemia/issues/4864)
* **Upload:** compare existing properties to determine duplicate ([#4895](https://github.com/dnbexperience/eufemia/issues/4895)) ([7286a33](https://github.com/dnbexperience/eufemia/commit/7286a332d749c8be16a037bda68db666b79858e8))
* **Upload:** correct displaying of only text ([#4896](https://github.com/dnbexperience/eufemia/issues/4896)) ([ef9c565](https://github.com/dnbexperience/eufemia/commit/ef9c5652e784290a1d3c74b180e34ad665fa3936))

## [10.69.1](https://github.com/dnbexperience/eufemia/compare/v10.69.0...v10.69.1) (2025-04-01)


### :memo: Documentation

* **Contribute:** remove outdated Slack channels in Contact ([#4808](https://github.com/dnbexperience/eufemia/issues/4808)) ([f94fea3](https://github.com/dnbexperience/eufemia/commit/f94fea35c925a07bf245fb9e58bea426f3faff97))
* **Field.SelectCountry:** add link to list of countries ([#4809](https://github.com/dnbexperience/eufemia/issues/4809)) ([c663a6a](https://github.com/dnbexperience/eufemia/commit/c663a6ae3f428362e128c2c89cc01cf736b791e3))
* **Field.SelectCountry:** display list of available countries ([#4813](https://github.com/dnbexperience/eufemia/issues/4813)) ([bdbce5b](https://github.com/dnbexperience/eufemia/commit/bdbce5b850c4cdf8d7415aba972640287b1c0f5b))
* **Field.SelectCurrency:** add link to list of currencies ([#4810](https://github.com/dnbexperience/eufemia/issues/4810)) ([3f70c3b](https://github.com/dnbexperience/eufemia/commit/3f70c3b08fb96ac6d372a0a796c15389faa6c32e))
* **Field.SelectCurrency:** Amerikansk dollar -> United States dollar ([#4795](https://github.com/dnbexperience/eufemia/issues/4795)) ([747e73c](https://github.com/dnbexperience/eufemia/commit/747e73c09ff3352ec573597af03efcae64ca7af3))
* **Field.SelectCurrency:** display list of available currencies ([#4814](https://github.com/dnbexperience/eufemia/issues/4814)) ([9e4ce2a](https://github.com/dnbexperience/eufemia/commit/9e4ce2adb613fce888b764c023062d8200059f54))
* **GlobalError:** improve properties docs ([#4817](https://github.com/dnbexperience/eufemia/issues/4817)) ([db8ae99](https://github.com/dnbexperience/eufemia/commit/db8ae9908a6b8a95db6614bdb2f5206887cc258b))
* update `onInput` example (prevent typing of invalid characters) ([#4799](https://github.com/dnbexperience/eufemia/issues/4799)) ([93edff0](https://github.com/dnbexperience/eufemia/commit/93edff01d7c43319520ce283bde1ee456e95373e))
* **Value.SelectCurrency:** add regions to docs ([#4797](https://github.com/dnbexperience/eufemia/issues/4797)) ([2ba9d11](https://github.com/dnbexperience/eufemia/commit/2ba9d1108c5df30c923295d6fa672828498c4cab))
* **Value.SelectCurrency:** better describe the display name ([#4796](https://github.com/dnbexperience/eufemia/issues/4796)) ([79739a5](https://github.com/dnbexperience/eufemia/commit/79739a5f990c75049b2aabd04e75fe8762ddbc89))


### :bug: Bug Fixes

* **Field.Upload:** async removal of file with same file name as other file ([#4834](https://github.com/dnbexperience/eufemia/issues/4834)) ([9381ac2](https://github.com/dnbexperience/eufemia/commit/9381ac2517344cb57f6b4d064fa643e2a1532384))
* **Forms:** enhance Wizard Step rendering routine ([#4811](https://github.com/dnbexperience/eufemia/issues/4811)) ([e8b8277](https://github.com/dnbexperience/eufemia/commit/e8b82774f4a761c159d0641c3bee4ec44e519c20)), closes [#4789](https://github.com/dnbexperience/eufemia/issues/4789)
* **Forms:** remove error from Wizard menu when field gets unmounted ([#4812](https://github.com/dnbexperience/eufemia/issues/4812)) ([7ecde87](https://github.com/dnbexperience/eufemia/commit/7ecde877cb1366314038af3f5b6673dc53974a40)), closes [#4811](https://github.com/dnbexperience/eufemia/issues/4811) [#4804](https://github.com/dnbexperience/eufemia/issues/4804)
* **Tabs:** conditional render Tabs.Content ([#4835](https://github.com/dnbexperience/eufemia/issues/4835)) ([906173e](https://github.com/dnbexperience/eufemia/commit/906173e58f526afc4e1629f19d3d4160314ddf1c))

## [10.69.0](https://github.com/dnbexperience/eufemia/compare/v10.68.1...v10.69.0) (2025-03-21)


### :sparkles: Features

* **Field.SelectCountry:** add `autoComplete` support ([#4781](https://github.com/dnbexperience/eufemia/issues/4781)) ([176760b](https://github.com/dnbexperience/eufemia/commit/176760b42ce4b6ca21ec97961de24ab6c0c37868))
* **Field.SelectCountry:** enhance value type ([#4782](https://github.com/dnbexperience/eufemia/issues/4782)) ([a51ec61](https://github.com/dnbexperience/eufemia/commit/a51ec614345a87b584c7f1502e32d81199ee41db))
* **Forms:** add `CountryISO` as the value type to Field.SelectCountry ([#4791](https://github.com/dnbexperience/eufemia/issues/4791)) ([b8491ed](https://github.com/dnbexperience/eufemia/commit/b8491ed99cbf44107584aa10e77e178e56ebaca9))
* **Forms:** add `Field.SelectCurrency` and `Value.SelectCurrency` ([#4770](https://github.com/dnbexperience/eufemia/issues/4770)) ([279d03e](https://github.com/dnbexperience/eufemia/commit/279d03e81531b0a7f7799ff2ace86c94401ca105))
* **InfoCard:** add `stretch` property and don't stretch by default ([#4765](https://github.com/dnbexperience/eufemia/issues/4765)) ([d7c850d](https://github.com/dnbexperience/eufemia/commit/d7c850d598f7e2f83a76d560ff637f5b826a1fe4))
* **NumberFormat:** use component's translation for invalid aria text ([#4763](https://github.com/dnbexperience/eufemia/issues/4763)) ([f446639](https://github.com/dnbexperience/eufemia/commit/f446639386c97a32c4df1205a0c4b435088245f1))
* **Table:** add view transition support to inserted table rows (accordion) ([#4764](https://github.com/dnbexperience/eufemia/issues/4764)) ([29273c8](https://github.com/dnbexperience/eufemia/commit/29273c83abd5f1b71f7beed91681b4852c542969))


### :memo: Documentation

* add link to localization docs in portal tools menu ([#4762](https://github.com/dnbexperience/eufemia/issues/4762)) ([d39353b](https://github.com/dnbexperience/eufemia/commit/d39353bf162d29713ed4c8973410fe2152ac5e94))
* **DatePicker:** add rationale behind why `correctInvalidDate` is not on by default ([#4776](https://github.com/dnbexperience/eufemia/issues/4776)) ([c414463](https://github.com/dnbexperience/eufemia/commit/c414463ea297a5437b7e1d826d4f6f134ae9589d))
* **Field.SelectCountry:** improve event arguments ([#4784](https://github.com/dnbexperience/eufemia/issues/4784)) ([644f9e8](https://github.com/dnbexperience/eufemia/commit/644f9e8581836108bdd442799613a4cae443f46f))
* **Forms:** add example on how to use `onInput` ([#4792](https://github.com/dnbexperience/eufemia/issues/4792)) ([2294b68](https://github.com/dnbexperience/eufemia/commit/2294b68dd59a412f2918be6f430d5863b1397141))


### :bug: Bug Fixes

* **Forms:** don't show Wizard step error on small screens for the same step ([#4774](https://github.com/dnbexperience/eufemia/issues/4774)) ([74afa5e](https://github.com/dnbexperience/eufemia/commit/74afa5ebf559c2b4d004220bc448ad80d27dd087))
* **Forms:** enhance typing for `FieldBlock` and `useFieldProps` ([#4785](https://github.com/dnbexperience/eufemia/issues/4785)) ([64070a6](https://github.com/dnbexperience/eufemia/commit/64070a6a2e01ba546ee6d3dd432cdddb8ca82f4b))
* **Forms:** ensure Wizard does not show invalid error ([#4786](https://github.com/dnbexperience/eufemia/issues/4786)) ([e5f913c](https://github.com/dnbexperience/eufemia/commit/e5f913c91f798a469dfabf5b5fece5a079811995))
* **NumberFormat:** ensure -0 is displayed as 0 when formatted as currency ([#4788](https://github.com/dnbexperience/eufemia/issues/4788)) ([aa02d37](https://github.com/dnbexperience/eufemia/commit/aa02d371154ac2b0cd0e25e68da3b1f29eba75c2)), closes [#4691](https://github.com/dnbexperience/eufemia/issues/4691)

## [10.68.1](https://github.com/dnbexperience/eufemia/compare/v10.68.0...v10.68.1) (2025-03-17)


### :bug: Bug Fixes

* **mergeTranslations:** add support for nested objects ([#4756](https://github.com/dnbexperience/eufemia/issues/4756)) ([7dc074b](https://github.com/dnbexperience/eufemia/commit/7dc074b23347ca28a584b6ab0f5fbb94349379da)), closes [#4752](https://github.com/dnbexperience/eufemia/issues/4752) [#4754](https://github.com/dnbexperience/eufemia/issues/4754)
* **NumberFormat:** render properly when `sv-SE` locale is given ([#4760](https://github.com/dnbexperience/eufemia/issues/4760)) ([a71ab73](https://github.com/dnbexperience/eufemia/commit/a71ab7331a922b3ca307d4fbfce92a59512fe071))

## [10.68.0](https://github.com/dnbexperience/eufemia/compare/v10.67.1...v10.68.0) (2025-03-14)


### :memo: Documentation

* **Field.PostalCodeAndCity:** add link to ISO 3166-1 alpha-2 code ([#4736](https://github.com/dnbexperience/eufemia/issues/4736)) ([eaccd44](https://github.com/dnbexperience/eufemia/commit/eaccd447f8b396423425613050ea894d6829f2bb))
* **Localization:** list available translations ([#4746](https://github.com/dnbexperience/eufemia/issues/4746)) ([f3cf554](https://github.com/dnbexperience/eufemia/commit/f3cf554ec828f8ecd213fda168eb9faf46499102))
* **Value:** add help button to example ([#4728](https://github.com/dnbexperience/eufemia/issues/4728)) ([dee0bd3](https://github.com/dnbexperience/eufemia/commit/dee0bd3bafb35736733aca172d146858956e3449))


### :sparkles: Features

* add Swedish translation (beta) ([#4719](https://github.com/dnbexperience/eufemia/issues/4719)) ([cec1b24](https://github.com/dnbexperience/eufemia/commit/cec1b24880d35c10c9fedbb7e123bd21f938a0f9))
* **Field.Date:** show error messages on invalid date ([#4508](https://github.com/dnbexperience/eufemia/issues/4508)) ([83fbb92](https://github.com/dnbexperience/eufemia/commit/83fbb92c51cb0c86d299227ba8c4385885b3eebf))
* **Forms:** add `countryCode` property to Form.Handler ([#4735](https://github.com/dnbexperience/eufemia/issues/4735)) ([7679a95](https://github.com/dnbexperience/eufemia/commit/7679a95cdec0a0f4c3d6bd499787717d00a59675))
* **Forms:** adjust the "widths" of `Value.*` components ([#4745](https://github.com/dnbexperience/eufemia/issues/4745)) ([602fc0f](https://github.com/dnbexperience/eufemia/commit/602fc0fafc5664c31bfcc27f816f2450dd9bfd4c))
* **Forms:** adjust the label "widths" of `Field.*` components ([#4748](https://github.com/dnbexperience/eufemia/issues/4748)) ([2488e7c](https://github.com/dnbexperience/eufemia/commit/2488e7c8e871fdfc2e892fca2e2428f39e13fa4c)), closes [#4745](https://github.com/dnbexperience/eufemia/issues/4745)
* **Forms:** render `labelDescription` beneath `label` and place HelpButton after `label` ([#4705](https://github.com/dnbexperience/eufemia/issues/4705)) ([64a7ca9](https://github.com/dnbexperience/eufemia/commit/64a7ca9a3b092c0d7dcc93f219b7453b9f36d219)), closes [#4693](https://github.com/dnbexperience/eufemia/issues/4693)


### :bug: Bug Fixes

* **Dialog, Drawer, Modal:** ensure `onClose` is not called in React.StrictMode ([#4729](https://github.com/dnbexperience/eufemia/issues/4729)) ([22628c7](https://github.com/dnbexperience/eufemia/commit/22628c76353a0caca7f7fb766a87e2130c073322)), closes [#4525](https://github.com/dnbexperience/eufemia/issues/4525)
* **Field.BankAccountNumber:** `0000 00 00000` should be invalid ([#4733](https://github.com/dnbexperience/eufemia/issues/4733)) ([b9955e3](https://github.com/dnbexperience/eufemia/commit/b9955e381ea1a9e08151396b8420d1e3545b293a))
* **Field.Name.Company:** must consist of at least 3 norwegian letters ([#4734](https://github.com/dnbexperience/eufemia/issues/4734)) ([9e3708f](https://github.com/dnbexperience/eufemia/commit/9e3708fc6e0857c07a1ea4be0cad3bf3949fbf3a))
* **Field.OrganizationNumber:** `000 000 000` should be invalid ([#4732](https://github.com/dnbexperience/eufemia/issues/4732)) ([55032db](https://github.com/dnbexperience/eufemia/commit/55032db3dad355962f9c3a3fa6c30996cecc35b3))
* **Forms:** don't show error in Wizard step menu for the active/current step ([#4751](https://github.com/dnbexperience/eufemia/issues/4751)) ([e2b4a7d](https://github.com/dnbexperience/eufemia/commit/e2b4a7dafe0b571d9507299b0b4281fc51e2397a))
* **Forms:** ensure `minDate`/`maxDate` does not interrupt first form submit ([#4726](https://github.com/dnbexperience/eufemia/issues/4726)) ([061e41e](https://github.com/dnbexperience/eufemia/commit/061e41e55443324285fd1b93965058c89f163d06))
* **Forms:** ensure Value.Composition inherits props defined i Value.Provider ([#4747](https://github.com/dnbexperience/eufemia/issues/4747)) ([05f9f92](https://github.com/dnbexperience/eufemia/commit/05f9f927edd100fc43c23611726e4f3d0a4f7609))
* **Value.SummaryList:** styling `Value.*` components with help button ([#4727](https://github.com/dnbexperience/eufemia/issues/4727)) ([fb17aa4](https://github.com/dnbexperience/eufemia/commit/fb17aa49f1cc2ee304649dacc82dfa976302043d))
* **Wizard.Container:** not displaying error when user enters required data ([#4742](https://github.com/dnbexperience/eufemia/issues/4742)) ([5cf20ee](https://github.com/dnbexperience/eufemia/commit/5cf20ee043ec856d99f4c17104a09dae2aacd757))

## [10.67.1](https://github.com/dnbexperience/eufemia/compare/v10.67.0...v10.67.1) (2025-03-11)


### :memo: Documentation

* correct broken link to uutilsynet about WCAG ([34f4001](https://github.com/dnbexperience/eufemia/commit/34f40013afb0d3040687fc52e06bafc0275c77a1))
* **Field.Date:** remove `date` property ([#4718](https://github.com/dnbexperience/eufemia/issues/4718)) ([b0e34a0](https://github.com/dnbexperience/eufemia/commit/b0e34a070b73d23c27e619a6bc0bb0998dc6606d))
* **Field.Date:** remove `startDate` property ([#4720](https://github.com/dnbexperience/eufemia/issues/4720)) ([4181d04](https://github.com/dnbexperience/eufemia/commit/4181d049f4c906c832f1b741f8db757d0e9c15ac))
* **Field.Date:** remove date property ([243f141](https://github.com/dnbexperience/eufemia/commit/243f1415f03e179975682d111bae117ec5597da0))
* **Field.Date:** remove endDate property ([f617677](https://github.com/dnbexperience/eufemia/commit/f6176773b9c9437181faefad29f6a3afb985759a))
* **Field.Date:** remove endDate property ([#4721](https://github.com/dnbexperience/eufemia/issues/4721)) ([f1fa1cd](https://github.com/dnbexperience/eufemia/commit/f1fa1cd53157720dbd4b5623bcbb369ce4ff5500))
* **Field.Date:** remove startDate property ([81fedcd](https://github.com/dnbexperience/eufemia/commit/81fedcdb0bcae6cf3e806e9f143ca57de9a92ac4))
* **PushContainer:** move events docs to events tab ([c35d2c8](https://github.com/dnbexperience/eufemia/commit/c35d2c8d5f7d5ac0b321028d3c6348876a756854))
* **PushContainer:** move events docs to events tab ([#4717](https://github.com/dnbexperience/eufemia/issues/4717)) ([86dfa3f](https://github.com/dnbexperience/eufemia/commit/86dfa3fc9f831d26e0503cfb643fb24867017e3e))


### :bug: Bug Fixes

* **Field.Date:** validate `minDate` & `maxDate` by the start of the day (00:00)  ([#4716](https://github.com/dnbexperience/eufemia/issues/4716)) ([98996bd](https://github.com/dnbexperience/eufemia/commit/98996bdb91680e65572c1db0538492ab7f962410))
* **Input:** remove `value` attribute (use element.value for getting the value in tests) ([f1711a8](https://github.com/dnbexperience/eufemia/commit/f1711a853573a2494e7a574ee7e959cb18dc121b))
* **Input:** remove value attribute (⚠️ Use element.value instead in e.g. tests) ([#4713](https://github.com/dnbexperience/eufemia/issues/4713)) ([dd2ae1a](https://github.com/dnbexperience/eufemia/commit/dd2ae1a6c48e7cd7c51c9b9c82b84a312ed7b53e))

## [10.67.0](https://github.com/dnbexperience/eufemia/compare/v10.66.1...v10.67.0) (2025-03-10)


### :memo: Documentation

* **Autocomplete:** correct link to data property ([#4677](https://github.com/dnbexperience/eufemia/issues/4677)) ([e124b6c](https://github.com/dnbexperience/eufemia/commit/e124b6c5f79aca6f067d9a5651f139f2f2413e90))
* **Breadcrumb:** move `onClick` from properties to events doc ([#4675](https://github.com/dnbexperience/eufemia/issues/4675)) ([09b4463](https://github.com/dnbexperience/eufemia/commit/09b4463da688fc9a32357e1db6282044499d99d0))
* **DatePicker:** correct `range` description ([#4697](https://github.com/dnbexperience/eufemia/issues/4697)) ([3aa057a](https://github.com/dnbexperience/eufemia/commit/3aa057aaea2016bfc1dcc14eb13cf2163412d5e7))
* **Dialog:** removes double properties heading ([#4676](https://github.com/dnbexperience/eufemia/issues/4676)) ([6cb9ee3](https://github.com/dnbexperience/eufemia/commit/6cb9ee3cf7e06296df744a6c31d8f20c5b069132))
* **Dropdown:** correct link to data property ([#4678](https://github.com/dnbexperience/eufemia/issues/4678)) ([7081e79](https://github.com/dnbexperience/eufemia/commit/7081e7945509513bd0498ea550d122ce8caa347c))
* **Form.Section.EditContainer:** move events to events tab ([#4682](https://github.com/dnbexperience/eufemia/issues/4682)) ([fbaa6b5](https://github.com/dnbexperience/eufemia/commit/fbaa6b5c0ea95bb0708976c19ff47f21d7f0aa7d))
* **Form.Section.ViewContainer:** move events to events tab ([#4683](https://github.com/dnbexperience/eufemia/issues/4683)) ([c85296f](https://github.com/dnbexperience/eufemia/commit/c85296f157433e815758952f4204c1a56a558e16))
* **Form.SubmitConfirmation:** move events to events tab ([#4684](https://github.com/dnbexperience/eufemia/issues/4684)) ([d4829d8](https://github.com/dnbexperience/eufemia/commit/d4829d8d82511670ec4f821cb4f30bd8d32fd36f))
* **HeightAnimation:** remove properties heading from events doc ([#4679](https://github.com/dnbexperience/eufemia/issues/4679)) ([ea80698](https://github.com/dnbexperience/eufemia/commit/ea806989b2ac88a62869b4528c0f1eef4d86340f))
* **InfoCard:** remove events from properties ([#4680](https://github.com/dnbexperience/eufemia/issues/4680)) ([787118b](https://github.com/dnbexperience/eufemia/commit/787118be9271cb452c2d122412109b2ec39ff4b0))
* **Timeline:** correct import example ([#4681](https://github.com/dnbexperience/eufemia/issues/4681)) ([1d6a755](https://github.com/dnbexperience/eufemia/commit/1d6a755b144aab047349788860cee38344b71ecc))
* **Wizard.EditButton:** add properties docs ([#4685](https://github.com/dnbexperience/eufemia/issues/4685)) ([25f6474](https://github.com/dnbexperience/eufemia/commit/25f647428a594c6aec743bd8c94424d4c80e8390))


### :bug: Bug Fixes

* **Anchor:** deprecate `scrollToHashHandler` ([#4671](https://github.com/dnbexperience/eufemia/issues/4671)) ([cd2df7c](https://github.com/dnbexperience/eufemia/commit/cd2df7c53a1a64131d8180a8ac742e8492ec1948))
* **DatePicker:** remove input validation (use Field.Date for included validation) ([#4688](https://github.com/dnbexperience/eufemia/issues/4688)) ([2e66cda](https://github.com/dnbexperience/eufemia/commit/2e66cdad5caf880460dc1ce8efa46b816b182796))
* **DatePicker:** using custom locale `sv-SE` breaks calendar ([#4698](https://github.com/dnbexperience/eufemia/issues/4698)) ([3108de0](https://github.com/dnbexperience/eufemia/commit/3108de0c519749fcfa2fa77477d8ae8d0d852b5a))
* **Forms:** ensure to update status message when validator returns different array ([#4690](https://github.com/dnbexperience/eufemia/issues/4690)) ([f8868c5](https://github.com/dnbexperience/eufemia/commit/f8868c5838e1425942246c7341cda7ab82858479))
* **NumberFormat:** ensure -0 is displayed as 0 ([#4691](https://github.com/dnbexperience/eufemia/issues/4691)) ([8fab366](https://github.com/dnbexperience/eufemia/commit/8fab366f82c5193ee718987ec895a433c1046130))
* **Value.SummaryList:** use `span` when wrapped inside Form.Visibility ([#4669](https://github.com/dnbexperience/eufemia/issues/4669)) ([00d7386](https://github.com/dnbexperience/eufemia/commit/00d738629c3da50dce8d07f106ff608ef203aaf3))


### :sparkles: Features

* **DatePicker:** add support for swedish translations ([#4706](https://github.com/dnbexperience/eufemia/issues/4706)) ([0e57c76](https://github.com/dnbexperience/eufemia/commit/0e57c765db1f1356dd4bbbeaf26bcbc653a2f798))
* **Field.Address:** add `element` property ([#4670](https://github.com/dnbexperience/eufemia/issues/4670)) ([1aae5d0](https://github.com/dnbexperience/eufemia/commit/1aae5d0b7642740b084974fefd67c4127dd71b62))
* **Field.NationalIdentityNumber:** bump internally used @navikt/fnrvalidator to v2.1.5 ([#4695](https://github.com/dnbexperience/eufemia/issues/4695)) ([b640c17](https://github.com/dnbexperience/eufemia/commit/b640c17c14cb42e3a0980322b1638529ac353898))
* **Forms:** add async Autocomplete support to Field.Selection ([#4664](https://github.com/dnbexperience/eufemia/issues/4664)) ([ac8d58c](https://github.com/dnbexperience/eufemia/commit/ac8d58ccfadf9beb6bd404e5b793a133fd5032a7)), closes [#4657](https://github.com/dnbexperience/eufemia/issues/4657)
* use @dnb/browserslist-config for when creating the bundle ([#4704](https://github.com/dnbexperience/eufemia/issues/4704)) ([dde596b](https://github.com/dnbexperience/eufemia/commit/dde596bec8747f5c43b6baa212e2cd399ff01edf))

## [10.66.1](https://github.com/dnbexperience/eufemia/compare/v10.66.0...v10.66.1) (2025-03-05)


### :bug: Bug Fixes

* **DatePicker:** clear internal date when passing null ([#4656](https://github.com/dnbexperience/eufemia/issues/4656)) ([3ba3b26](https://github.com/dnbexperience/eufemia/commit/3ba3b26e7d948efee1e98d160f9587574e10a2b2))
* **Field.Date:** add missing support for `skipPortal` ([#4666](https://github.com/dnbexperience/eufemia/issues/4666)) ([975f3ea](https://github.com/dnbexperience/eufemia/commit/975f3ea8f5b8e8e8cb0adcdab32b84289a026af7))
* **Field.Upload:** improve styling of `help` button ([#4659](https://github.com/dnbexperience/eufemia/issues/4659)) ([8a10d7c](https://github.com/dnbexperience/eufemia/commit/8a10d7c9db7f155d6502f78f11c5a6140693c5be))
* **Field.Upload:** set `aria-required` and `required` props in input rather than div ([#4655](https://github.com/dnbexperience/eufemia/issues/4655)) ([7db1f04](https://github.com/dnbexperience/eufemia/commit/7db1f0431679872765d5716e2a85bab645918c4b))
* **Forms:** always render Field.Composition with a `fieldset` ([#4661](https://github.com/dnbexperience/eufemia/issues/4661)) ([a3991a1](https://github.com/dnbexperience/eufemia/commit/a3991a1eedae31a1413ce974182f20efa5ea59ab))
* **Value.SummaryList:** spacing of `help` when wrapped in `Form.InfoOverlay` ([#4667](https://github.com/dnbexperience/eufemia/issues/4667)) ([b7a2702](https://github.com/dnbexperience/eufemia/commit/b7a2702ce0afbf4d2d88c9a528dbd5cc4a28b939)), closes [/github.com/dnbexperience/eufemia/pull/4667/files#diff-281ca53e6a78ae24056e8fc94bf0274576aef89044ddcc613fb09b0844023e13R50](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/4667/files/issues/diff-281ca53e6a78ae24056e8fc94bf0274576aef89044ddcc613fb09b0844023e13R50)

## [10.66.0](https://github.com/dnbexperience/eufemia/compare/v10.65.1...v10.66.0) (2025-03-04)


### :bug: Bug Fixes

* **Field.Slider:** correct default values and validate with ARIA rules ([#4650](https://github.com/dnbexperience/eufemia/issues/4650)) ([bf2d9fe](https://github.com/dnbexperience/eufemia/commit/bf2d9fe565b251bc2a66fe921aba95a7c572b074))
* **Forms:** always run validation on Wizard step changes ([#4626](https://github.com/dnbexperience/eufemia/issues/4626)) ([57577ce](https://github.com/dnbexperience/eufemia/commit/57577ce148f0a2183c3f237adc8842305a118004))
* **Forms:** enhance a11y of inline help button ([#4649](https://github.com/dnbexperience/eufemia/issues/4649)) ([6908095](https://github.com/dnbexperience/eufemia/commit/6908095a02c62a61c84d0d154bd0df5116f1af1d))
* **Forms:** hide `info`, `warning` or `error` prop when `undefined` is given to a Field ([#4634](https://github.com/dnbexperience/eufemia/issues/4634)) ([f953cf9](https://github.com/dnbexperience/eufemia/commit/f953cf95301befd673a2facc525b22d825cc5c7c)), closes [#4611](https://github.com/dnbexperience/eufemia/issues/4611)
* **Forms:** show error in Wizard menu and prevent submission if previous steps contain errors or have an unknown state ([#4638](https://github.com/dnbexperience/eufemia/issues/4638)) ([05e30b6](https://github.com/dnbexperience/eufemia/commit/05e30b6814d2e956efcf35f0ef05e7ba7479a4b1))
* **ToggleButton:** add `tooltip` type and docs ([#4647](https://github.com/dnbexperience/eufemia/issues/4647)) ([e6495e5](https://github.com/dnbexperience/eufemia/commit/e6495e558f0e2c273ea3c68a4ea35dcd33a42f92))


### :sparkles: Features

* **DatePicker:** add invalid dates to return object ([#4637](https://github.com/dnbexperience/eufemia/issues/4637)) ([082e4b8](https://github.com/dnbexperience/eufemia/commit/082e4b806042b549f968397fb5b6da7a8c46fea3))
* **Flex:** improve `gap` and `rowGap` behaviour ([#4496](https://github.com/dnbexperience/eufemia/issues/4496)) ([7685609](https://github.com/dnbexperience/eufemia/commit/7685609efa8efd6e477053cd5be952b3b1fd4ad2))
* **Forms:** `row wrap` Values without label when used inside Value.Compositon ([#4641](https://github.com/dnbexperience/eufemia/issues/4641)) ([2203fc7](https://github.com/dnbexperience/eufemia/commit/2203fc705b8aac9ada6a7f04179593bb45b8cf51))
* **Forms:** add `help` property to all Value.* components ([#4607](https://github.com/dnbexperience/eufemia/issues/4607)) ([9c1aa46](https://github.com/dnbexperience/eufemia/commit/9c1aa4621f359cb19fd62fc1ae46214af7f58caf))
* **Forms:** add `keepInDOM` to Wizard ([#4652](https://github.com/dnbexperience/eufemia/issues/4652)) ([dec3fd6](https://github.com/dnbexperience/eufemia/commit/dec3fd66bd66ea6d23d69b308dd797f2c6dd3621)), closes [#4629](https://github.com/dnbexperience/eufemia/issues/4629) [#4642](https://github.com/dnbexperience/eufemia/issues/4642)
* **Forms:** add `validationMode` property with `bypassOnNavigation` to Wizard.Container ([#4631](https://github.com/dnbexperience/eufemia/issues/4631)) ([f47294b](https://github.com/dnbexperience/eufemia/commit/f47294bb15eade33c39e3c44ec98d91e612cc48d))
* **Forms:** return existing errors in `onSubmitRequest` before Form.Handler submit or Wizard step change ([#4625](https://github.com/dnbexperience/eufemia/issues/4625)) ([3b02fc3](https://github.com/dnbexperience/eufemia/commit/3b02fc3a36415708a2d046b8f1df1f6faaeb701d))


### :memo: Documentation

* **DatePicker:** document partial dates ([#4644](https://github.com/dnbexperience/eufemia/issues/4644)) ([090cda8](https://github.com/dnbexperience/eufemia/commit/090cda8d5c72840b70cb2dfe74d0b79d2c90d570))
* **Form:** adds demos to root doc ([#4643](https://github.com/dnbexperience/eufemia/issues/4643)) ([f4c2ce7](https://github.com/dnbexperience/eufemia/commit/f4c2ce7929dff51e154408cfc3c447bf02f5303c))
* **Forms:** changelog for v10.66.0 ([#4642](https://github.com/dnbexperience/eufemia/issues/4642)) ([303081e](https://github.com/dnbexperience/eufemia/commit/303081e929df69fd6c49fdde281de8fd582d0169))
* **Name:** remove Field.SummaryList from example ([#4635](https://github.com/dnbexperience/eufemia/issues/4635)) ([685f298](https://github.com/dnbexperience/eufemia/commit/685f298fc3be27864483a956ee1eee21931b29f5))

## [10.65.1](https://github.com/dnbexperience/eufemia/compare/v10.65.0...v10.65.1) (2025-02-25)


### :bug: Bug Fixes

* **DatePicker:** correct focus behaviour when picker has closed ([#4622](https://github.com/dnbexperience/eufemia/issues/4622)) ([b20ed69](https://github.com/dnbexperience/eufemia/commit/b20ed69acb621a2d42ce0097f483c1e958f0c8b3))
* **Forms:** add support for using Visibility inside PushContainer ([#4623](https://github.com/dnbexperience/eufemia/issues/4623)) ([d333f38](https://github.com/dnbexperience/eufemia/commit/d333f38e0e7ab93a6299d4bf99334673a07d78ac))

## [10.65.0](https://github.com/dnbexperience/eufemia/compare/v10.64.1...v10.65.0) (2025-02-25)


### :bug: Bug Fixes

* **DatePicker:** `opened` prop listener `useEffect` no longer removes on outside click detector ([#4608](https://github.com/dnbexperience/eufemia/issues/4608)) ([9d2bd61](https://github.com/dnbexperience/eufemia/commit/9d2bd616d3dad9edcaf89289305e5ff6d8194f7b))
* **Skeleton:** move CSS variables for Skeleton from a global scope to themed skeleton files ([#4520](https://github.com/dnbexperience/eufemia/issues/4520)) ([8ff1007](https://github.com/dnbexperience/eufemia/commit/8ff10078f0de78e44afa19a31bef15e71c0916e7))


### :memo: Documentation

* **Fields:** add info about `Form.Appearance` in `size` property ([#4609](https://github.com/dnbexperience/eufemia/issues/4609)) ([e8ae85b](https://github.com/dnbexperience/eufemia/commit/e8ae85b3d6e8141733e4ec3d8579c0637bb0755c))
* show Form.Isolation in menu ([#4610](https://github.com/dnbexperience/eufemia/issues/4610)) ([cd50c82](https://github.com/dnbexperience/eufemia/commit/cd50c824e6984409919c7b47dad429df16114d89))


### :sparkles: Features

* **ArraySelection:** add `size` property ([#4603](https://github.com/dnbexperience/eufemia/issues/4603)) ([12d319d](https://github.com/dnbexperience/eufemia/commit/12d319db19087b51ce391b475b64c6ec4c3c4587))
* **Boolean:** add `size` property ([#4602](https://github.com/dnbexperience/eufemia/issues/4602)) ([c8b57b0](https://github.com/dnbexperience/eufemia/commit/c8b57b0df9f81a12615dbde50cf4b4f1e7d1fd85))
* **Date:** add `size` property ([#4598](https://github.com/dnbexperience/eufemia/issues/4598)) ([b82ffff](https://github.com/dnbexperience/eufemia/commit/b82ffffe45e144fe62b27abcfe6ad123fc1e022c))
* **Expiry:** add `size` property ([#4604](https://github.com/dnbexperience/eufemia/issues/4604)) ([cb0505e](https://github.com/dnbexperience/eufemia/commit/cb0505e098cd66f2936d98a8bad6aafef321c689))
* **Field.Date:** add built in error messaging for min and max dates ([#4469](https://github.com/dnbexperience/eufemia/issues/4469)) ([fbfdd5e](https://github.com/dnbexperience/eufemia/commit/fbfdd5e2edccfa07fc094015549f92edbe87a7e5))
* **PhoneNumber:** add `size` property ([#4596](https://github.com/dnbexperience/eufemia/issues/4596)) ([58a45a6](https://github.com/dnbexperience/eufemia/commit/58a45a66b7219a5e520baf3f379bb869a01590e4))
* **PostalCodeAndCity:** add `size` property ([#4597](https://github.com/dnbexperience/eufemia/issues/4597)) ([545d3d9](https://github.com/dnbexperience/eufemia/commit/545d3d9c246ef19cd03cc9bcb725f244f87be2a1))
* **SelectCountry:** add `size` property ([#4595](https://github.com/dnbexperience/eufemia/issues/4595)) ([18d23d4](https://github.com/dnbexperience/eufemia/commit/18d23d4cde8460d0aad3f9e98328590068993e18))
* **Selection:** add `size` property ([#4599](https://github.com/dnbexperience/eufemia/issues/4599)) ([6c32b26](https://github.com/dnbexperience/eufemia/commit/6c32b26fa37ca7362b14c9bfe2f6637e603475d4))
* **Toggle:** add `size` property ([#4601](https://github.com/dnbexperience/eufemia/issues/4601)) ([f77a6c8](https://github.com/dnbexperience/eufemia/commit/f77a6c8f8a4b53a49250f2a577cdce89c2456f02))
* **Wizard.Step:** add inactive prop to handle a step as inactive ([#4606](https://github.com/dnbexperience/eufemia/issues/4606)) ([07d032a](https://github.com/dnbexperience/eufemia/commit/07d032a71e0ee57ef9d0f72b2931d957d215c987))
* **Wizard.Step:** deprecate `active` and `activeWhen` in favor of `include` and `includeWhen` ([#4612](https://github.com/dnbexperience/eufemia/issues/4612)) ([4236efd](https://github.com/dnbexperience/eufemia/commit/4236efdc00938bec1ae89ef18fc3460c302c7228))

## [10.64.1](https://github.com/dnbexperience/eufemia/compare/v10.64.0...v10.64.1) (2025-02-20)


### :bug: Bug Fixes

* **DatePicker:** portal will properly unmount when 'onShow' and 'onHide' callbacks are used to set a state ([#4587](https://github.com/dnbexperience/eufemia/issues/4587)) ([35211b0](https://github.com/dnbexperience/eufemia/commit/35211b0dafaa8b2a1a1112c3a0ba29f1c8dcce1c))
* **Logo:** change Sbanken logo color ([#4586](https://github.com/dnbexperience/eufemia/issues/4586)) ([420c553](https://github.com/dnbexperience/eufemia/commit/420c55347d60623019be107c5c588f1f7a0f6273))
* **Selection:** select item using enter and space key in radio variant ([#4584](https://github.com/dnbexperience/eufemia/issues/4584)) ([68b2cff](https://github.com/dnbexperience/eufemia/commit/68b2cff2ba2403fe2667e5c2dd17f31a4d4d99c4))


### :memo: Documentation

* **Address:** improve properties docs ([#4590](https://github.com/dnbexperience/eufemia/issues/4590)) ([4675c71](https://github.com/dnbexperience/eufemia/commit/4675c7179e26382b5ab57f952914258bfd3aefd2))
* **Email:** improve properties docs ([#4591](https://github.com/dnbexperience/eufemia/issues/4591)) ([64becf0](https://github.com/dnbexperience/eufemia/commit/64becf09b7ae24117f6246d17ef55cf55f05a6e2))
* **Name:** improve properties docs ([#4592](https://github.com/dnbexperience/eufemia/issues/4592)) ([9f30547](https://github.com/dnbexperience/eufemia/commit/9f3054769fa54e3ed53ec7a0c5661ae278dec3ec))
* **NationalIdentityNumber:** improve properties docs ([#4594](https://github.com/dnbexperience/eufemia/issues/4594)) ([b849953](https://github.com/dnbexperience/eufemia/commit/b849953eaec2e8004ec28b68605257209fcebf9a))
* **OrganizationNumber:** improve properties docs  ([#4593](https://github.com/dnbexperience/eufemia/issues/4593)) ([bc730b7](https://github.com/dnbexperience/eufemia/commit/bc730b795360edd8dfa728998f4ff0deef772bca))
* **Password:** improve properties docs for `size` ([#4600](https://github.com/dnbexperience/eufemia/issues/4600)) ([499fbef](https://github.com/dnbexperience/eufemia/commit/499fbef9f4155626735b2addb199c7374c2a6560))
* **PostalCodeAndCity:** replace country with countryCode ([e89b2a5](https://github.com/dnbexperience/eufemia/commit/e89b2a50b0ea1b879e73f3debd5cde6fdc30d376))
* **v11:** replace `country` with `countryCode` in `Field.PostalCodeAndCity` ([#4583](https://github.com/dnbexperience/eufemia/issues/4583)) ([f70cb4e](https://github.com/dnbexperience/eufemia/commit/f70cb4ede1ccaeffc27dd1ca720e6b2c577f5190))

## [10.64.0](https://github.com/dnbexperience/eufemia/compare/v10.63.4...v10.64.0) (2025-02-17)


### :sparkles: Features

* **Field.Expiry:** add month and year validation ([#4571](https://github.com/dnbexperience/eufemia/issues/4571)) ([bc4fff9](https://github.com/dnbexperience/eufemia/commit/bc4fff9ce83ac96351eb9f824386885324b0e892))
* **Forms:** add `createMinimumAgeVerifier` to Field.NationalIdentityNumber ([#4542](https://github.com/dnbexperience/eufemia/issues/4542)) ([ceb8c2d](https://github.com/dnbexperience/eufemia/commit/ceb8c2df3693b6dcbb6951d21383cd0c85da2c20))
* **Forms:** add `insertAt` to Iterate.PushContainer ([#4555](https://github.com/dnbexperience/eufemia/issues/4555)) ([6160d78](https://github.com/dnbexperience/eufemia/commit/6160d780d1cbc1cced6a8e8c710c02fd5058e4e2))
* **Forms:** add `reverse` to Iterate.Array ([#4556](https://github.com/dnbexperience/eufemia/issues/4556)) ([0b9ba79](https://github.com/dnbexperience/eufemia/commit/0b9ba796d3f4376d0b4c69d850c495a0d205589f))
* **Forms:** add Bring API connector for postal code validation and autofill city ([#4554](https://github.com/dnbexperience/eufemia/issues/4554)) ([f2ccd5d](https://github.com/dnbexperience/eufemia/commit/f2ccd5df97909af52e22f8d44cb6f9c662b84f47))
* **Forms:** add feature fields Field.Address.Street & Field.Address.Postal ([#4562](https://github.com/dnbexperience/eufemia/issues/4562)) ([c546009](https://github.com/dnbexperience/eufemia/commit/c54600973e5de3a76e29d494307da7e560dbc97f))
* **Forms:** provide `{ props }` to the second `onChange`, `onFocus` and `onBlur` event parameter ([#4550](https://github.com/dnbexperience/eufemia/issues/4550)) ([374ff0e](https://github.com/dnbexperience/eufemia/commit/374ff0e9d58c5604f4a5d518531bc8f81a99d89c)), closes [#4344](https://github.com/dnbexperience/eufemia/issues/4344)
* **Forms:** show field indicator inline without shifting content below ([#4553](https://github.com/dnbexperience/eufemia/issues/4553)) ([45347a3](https://github.com/dnbexperience/eufemia/commit/45347a3e49a74d25fc87b9530d84b6f55456f986))
* **icons:** add digipass_corporate, digipass_private, calendar_add, investor, goal, layout_grid, table, show_pin ([#4522](https://github.com/dnbexperience/eufemia/issues/4522)) ([c5db964](https://github.com/dnbexperience/eufemia/commit/c5db96406b8a5585061323ae4842b6dd2a89d6c8)), closes [#4527](https://github.com/dnbexperience/eufemia/issues/4527)
* **PostalCodeAndCity:** deprecate `country` in favor of `countryCode` ([#4572](https://github.com/dnbexperience/eufemia/issues/4572)) ([8d0d980](https://github.com/dnbexperience/eufemia/commit/8d0d98020bcac20fd784858ed01fad279d30edd7))


### :memo: Documentation

* **InfoOverlay:** display fallback content when `undefined` ([#4580](https://github.com/dnbexperience/eufemia/issues/4580)) ([9879149](https://github.com/dnbexperience/eufemia/commit/9879149cc9ef67b8febb950255f37bb68070df96))
* link to base fields from their respective value components ([#4564](https://github.com/dnbexperience/eufemia/issues/4564)) ([3d71c19](https://github.com/dnbexperience/eufemia/commit/3d71c19998a48b226e59b23bb4b50f2e5a8cb1e7))
* link to feature fields from their respective value components ([#4563](https://github.com/dnbexperience/eufemia/issues/4563)) ([45d0e3d](https://github.com/dnbexperience/eufemia/commit/45d0e3db7bea992a06ff477f56f6a93abb2554d5))
* removes duplicated docs for help prop ([#4568](https://github.com/dnbexperience/eufemia/issues/4568)) ([ae46e71](https://github.com/dnbexperience/eufemia/commit/ae46e717897b18e32bc52058d6198e8b8336e990))


### :bug: Bug Fixes

* **DatePicker:** compare `date` and `maxDate` at same time of day so `is_valid_end_date` is `true` when `date` and `maxDate` are the same date ([#4565](https://github.com/dnbexperience/eufemia/issues/4565)) ([c52a40b](https://github.com/dnbexperience/eufemia/commit/c52a40be0acc3194fc93bc29169153f886a64f6b))
* **Drawer:** ensure content on very small screen sizes doesn't get cut off ([#4567](https://github.com/dnbexperience/eufemia/issues/4567)) ([1dd405f](https://github.com/dnbexperience/eufemia/commit/1dd405f08eebf0f68dcde0066621d4a6b3d08196))
* **ePlatform:** adjust ul list style and wrapper style (`max-width` and `padding`) ([#4552](https://github.com/dnbexperience/eufemia/issues/4552)) ([44f551e](https://github.com/dnbexperience/eufemia/commit/44f551efb00cc306535faeb523795fb2028df8b8))
* **Forms:** ensure city in PostalCodeAndCity accepts non-Norwegian characters when using other country ([#4569](https://github.com/dnbexperience/eufemia/issues/4569)) ([af1bdc8](https://github.com/dnbexperience/eufemia/commit/af1bdc8e1ad7ed14fd0d31932e110813082709ba))
* **Forms:** reveal error only when onChangeValidator is actually the initiator ([#4570](https://github.com/dnbexperience/eufemia/issues/4570)) ([4d962df](https://github.com/dnbexperience/eufemia/commit/4d962df0fcdd4a80ff63dbbfc0471078ae7a359d))
* **Name:** support spacing props ([eb6a412](https://github.com/dnbexperience/eufemia/commit/eb6a412e3f49504d5f45012deaef3fb5a15eb479))
* **TextArea:** ResizeObserver loop completed with undelivered notifications ([#4582](https://github.com/dnbexperience/eufemia/issues/4582)) ([f2f97e3](https://github.com/dnbexperience/eufemia/commit/f2f97e3492feb95b19224a64aea5eb4014b498ac))
* **Wizard.Step:** use `title` as aria-label when wrapped in `Wizard.Container` ([#4573](https://github.com/dnbexperience/eufemia/issues/4573)) ([de095e7](https://github.com/dnbexperience/eufemia/commit/de095e7ff2bf898a4dd0abf2d707b4738762765d))

## [10.63.4](https://github.com/dnbexperience/eufemia/compare/v10.63.3...v10.63.4) (2025-02-07)


### :memo: Documentation

* **Flex:** clarify difference between Flex.Vertical and Flex.Stack (stretching behavior) ([#4544](https://github.com/dnbexperience/eufemia/issues/4544)) ([de9f811](https://github.com/dnbexperience/eufemia/commit/de9f8113d8ea9fd29a2ea5301163a2c85bb18425))
* remove events tab for components who don't have it ([#4546](https://github.com/dnbexperience/eufemia/issues/4546)) ([f2feee7](https://github.com/dnbexperience/eufemia/commit/f2feee7f0e83b9c1932121a13474f83466acbcd0))


### :bug: Bug Fixes

* **Forms:** only execute `transformData` from fields with a path and not Iterate ([#4549](https://github.com/dnbexperience/eufemia/issues/4549)) ([474b881](https://github.com/dnbexperience/eufemia/commit/474b8818ce9992f82950463eb734a4bb0e772ae4)), closes [#4526](https://github.com/dnbexperience/eufemia/issues/4526)
* **FormStatus:** ensure content given as `children` will be displayed in linked GlobalStatus ([#4547](https://github.com/dnbexperience/eufemia/issues/4547)) ([bc8f89d](https://github.com/dnbexperience/eufemia/commit/bc8f89d6fa96a448a8a67141fb51e84227a9516f))

## [10.63.3](https://github.com/dnbexperience/eufemia/compare/v10.63.2...v10.63.3) (2025-02-06)


### :memo: Documentation

* **Portal:** wrap text of property table description ([#4543](https://github.com/dnbexperience/eufemia/issues/4543)) ([b0ba974](https://github.com/dnbexperience/eufemia/commit/b0ba974723bc6b3d665c902298167292702365a0))


### :bug: Bug Fixes

* **Forms:** enhance Form.useData to update and render in sync when `id` is used ([#4536](https://github.com/dnbexperience/eufemia/issues/4536)) ([bb12d70](https://github.com/dnbexperience/eufemia/commit/bb12d707fd393c42f8008936c4ad87dd07883763)), closes [#4461](https://github.com/dnbexperience/eufemia/issues/4461)
* **Forms:** ensure `pathDefined` on Form.Visibility does not render when value is `undefined` ([#4539](https://github.com/dnbexperience/eufemia/issues/4539)) ([4f99680](https://github.com/dnbexperience/eufemia/commit/4f9968006ec2dc5088845da399d34f175e9fab2e))
* **Forms:** ensure `pathUndefined` on Form.Visibility does render when value is `undefined` ([#4540](https://github.com/dnbexperience/eufemia/issues/4540)) ([9d165e3](https://github.com/dnbexperience/eufemia/commit/9d165e35a76df881f1f584cc10ec3b3fdf444220))

## [10.63.2](https://github.com/dnbexperience/eufemia/compare/v10.63.1...v10.63.2) (2025-02-04)


### :bug: Bug Fixes

* **Dialog:** prevent `onClose` event from firing in StrictMode when opening a new dialog ([#4525](https://github.com/dnbexperience/eufemia/issues/4525)) ([d24c0d3](https://github.com/dnbexperience/eufemia/commit/d24c0d35bd3fc83a81b4037b883423e0c4a1fc65))
* **Forms:** always revalidate on submit when data context changes ([#4532](https://github.com/dnbexperience/eufemia/issues/4532)) ([e0692d6](https://github.com/dnbexperience/eufemia/commit/e0692d633f629ec958b2ec4d187e3533b21d113d))
* **Forms:** ensure `setFieldStatus` by useValidation does not throw when used without id ([#4529](https://github.com/dnbexperience/eufemia/issues/4529)) ([1a92512](https://github.com/dnbexperience/eufemia/commit/1a9251205b2b2914500ef93864bb1a37e159e8b0))
* **Forms:** ensure `update('/path', undefined)` does not show error message ([#4531](https://github.com/dnbexperience/eufemia/issues/4531)) ([2dfd44a](https://github.com/dnbexperience/eufemia/commit/2dfd44acb00bdbb9512916e8d3d767cfa9f5d53e))

## [10.63.1](https://github.com/dnbexperience/eufemia/compare/v10.63.0...v10.63.1) (2025-02-04)


### :bug: Bug Fixes

* **Forms:** ensure `transformData` contains `displayValue` from fields inside Iterate ([#4526](https://github.com/dnbexperience/eufemia/issues/4526)) ([cc67a19](https://github.com/dnbexperience/eufemia/commit/cc67a19a224d4b5215cbd42f6acc8bae5d1c392c)), closes [#4510](https://github.com/dnbexperience/eufemia/issues/4510)

## [10.63.0](https://github.com/dnbexperience/eufemia/compare/v10.62.4...v10.63.0) (2025-01-29)


### :memo: Documentation

* **DrawerList:** fix dead link to data prop ([#4489](https://github.com/dnbexperience/eufemia/issues/4489)) ([612634f](https://github.com/dnbexperience/eufemia/commit/612634f29627c10e9a5b5eb9c1d8186c7f22af8e))
* **DrawerList:** minor doc improvement ([#4490](https://github.com/dnbexperience/eufemia/issues/4490)) ([ef3a816](https://github.com/dnbexperience/eufemia/commit/ef3a8161a0f61ac18da0ed89ef7ca709f4db6823))
* **Extensions:** extend description ([#4456](https://github.com/dnbexperience/eufemia/issues/4456)) ([ffa0453](https://github.com/dnbexperience/eufemia/commit/ffa0453be160db9993b207b7db871f344e9308dd))
* **Form.MainHeading, Form.SubHeading:** add `help` property to properties tabs ([#4442](https://github.com/dnbexperience/eufemia/issues/4442)) ([2148916](https://github.com/dnbexperience/eufemia/commit/21489163a1875da6b4bb9dd2d76663f45bf97e9b))
* **Forms:** improve documentation on TypeScript type handling ([#4444](https://github.com/dnbexperience/eufemia/issues/4444)) ([b7639cb](https://github.com/dnbexperience/eufemia/commit/b7639cb258f99cd0644897fa98c4e0406a584c74)), closes [#4443](https://github.com/dnbexperience/eufemia/issues/4443)
* **GlobalStatus:** add example on how to add custom icon ([#4457](https://github.com/dnbexperience/eufemia/issues/4457)) ([f434a8e](https://github.com/dnbexperience/eufemia/commit/f434a8eec5a454b4ec572ac29920fc9e7d06d1f8))


### :bug: Bug Fixes

* **Autocomplete:** does not fail when clicking show all button ([#4445](https://github.com/dnbexperience/eufemia/issues/4445)) ([744781b](https://github.com/dnbexperience/eufemia/commit/744781b611473b87acb45d7c2d4cc9fba6270fa3))
* **Autocomplete:** focus issue when no valid data ([#4458](https://github.com/dnbexperience/eufemia/issues/4458)) ([1f2bba1](https://github.com/dnbexperience/eufemia/commit/1f2bba18aca1de8482eaa7ed6eff99a79386dac6))
* **Blockquote:** contrast font color of code as child ([#4453](https://github.com/dnbexperience/eufemia/issues/4453)) ([9dfd6b4](https://github.com/dnbexperience/eufemia/commit/9dfd6b49eaf4d1c4db07bfed16fdb4b8d55409f0))
* **Field.Upload:** prevent `fileHandler` to run when it is validation errors  ([#4506](https://github.com/dnbexperience/eufemia/issues/4506)) ([feb0217](https://github.com/dnbexperience/eufemia/commit/feb02175246435211d0086b89ccf8dc4ffff4afc))
* **Forms:** add animation support to Form.Visibility when used inside Value.SummaryList ([#4482](https://github.com/dnbexperience/eufemia/issues/4482)) ([c547f1a](https://github.com/dnbexperience/eufemia/commit/c547f1a4f97c52b02721c97494ee7a8d17f8fe6e))
* **Forms:** don't open Field.SelectCountry when `defaultValue` was given ([#4477](https://github.com/dnbexperience/eufemia/issues/4477)) ([e9bc230](https://github.com/dnbexperience/eufemia/commit/e9bc23027ad417de112e450af663f8176a4eb177))
* **Forms:** ensure `connectWithPath` type is given ([#4501](https://github.com/dnbexperience/eufemia/issues/4501)) ([64e7b41](https://github.com/dnbexperience/eufemia/commit/64e7b416723e60ea7bf54b474970f64e0dd58b22))
* **Forms:** ensure Field.Toggle supports iterate `{itemNo}` in label ([#4507](https://github.com/dnbexperience/eufemia/issues/4507)) ([dbbfa49](https://github.com/dnbexperience/eufemia/commit/dbbfa49a9ad6761cc31a58ac58fbfd99048ddf2b))
* **Forms:** ensure wizard step changes scroll so the StepIndicator is included at the top ([#4464](https://github.com/dnbexperience/eufemia/issues/4464)) ([352ad63](https://github.com/dnbexperience/eufemia/commit/352ad63a805f757ed3177b070489e93e65d9f0f0))
* **Forms:** provide `displayValue` and `label` to `transformData` from fields inside Iterate ([#4510](https://github.com/dnbexperience/eufemia/issues/4510)) ([f22b4c3](https://github.com/dnbexperience/eufemia/commit/f22b4c39893a12d2c3524f53c40589574d308ffa))
* **HeightAnimation:** ensure height does not lock during animation when nested ([#4493](https://github.com/dnbexperience/eufemia/issues/4493)) ([93974b5](https://github.com/dnbexperience/eufemia/commit/93974b5abeb5325decd06865cd971fe438e49e50))
* **InputMasked:** should work without any properties ([#4446](https://github.com/dnbexperience/eufemia/issues/4446)) ([2efc623](https://github.com/dnbexperience/eufemia/commit/2efc62315ee800b1b8b410f2d1c2b3d15494eb6d))
* refactor defaultProps to ES6 default parameters ([#4448](https://github.com/dnbexperience/eufemia/issues/4448)) ([34d109e](https://github.com/dnbexperience/eufemia/commit/34d109ef2e3cac9e0669c6970c15a69964a2ce2f)), closes [#4447](https://github.com/dnbexperience/eufemia/issues/4447)
* **Spacing:** ensure HTML elements like h1 use always a spacing reset ([#4463](https://github.com/dnbexperience/eufemia/issues/4463)) ([5ff0126](https://github.com/dnbexperience/eufemia/commit/5ff01263091dec747134976a67686913e673b6d3))
* **ToggleButton:** add type for the `size` property ([#4459](https://github.com/dnbexperience/eufemia/issues/4459)) ([33ca39c](https://github.com/dnbexperience/eufemia/commit/33ca39c3bb9ff47e7c735bb9fe9dd7d94ab38546))


### :sparkles: Features

* **DatePicker:** render calendar in a react portal ([#4347](https://github.com/dnbexperience/eufemia/issues/4347)) ([e5de516](https://github.com/dnbexperience/eufemia/commit/e5de51649105c5307f1eb53eec9c308a5d4f4305))
* **Forms:** add `connectWithItemPath` to `onBlurValidator` and `onChangeValidator` to be used within Iterate ([#4518](https://github.com/dnbexperience/eufemia/issues/4518)) ([321550f](https://github.com/dnbexperience/eufemia/commit/321550f704767553b16b19a53f977a744e01eae2))
* **Forms:** add `itemPath` property support to `Iterate.Array` ([#4479](https://github.com/dnbexperience/eufemia/issues/4479)) ([0cc8ff6](https://github.com/dnbexperience/eufemia/commit/0cc8ff6f96715affed5221e9e575c81ae9f1ab2c)), closes [#4417](https://github.com/dnbexperience/eufemia/issues/4417)
* **Forms:** add `itemPath` property support to `Iterate.PushButton` and `Iterate.PushContainer` ([#4499](https://github.com/dnbexperience/eufemia/issues/4499)) ([673d55c](https://github.com/dnbexperience/eufemia/commit/673d55c435d49869f8f675f29090df9a14a46e55)), closes [#4417](https://github.com/dnbexperience/eufemia/issues/4417)
* **Forms:** add `Iterate.Visibility` to be used within `Iterate.Array` (relative paths) ([#4502](https://github.com/dnbexperience/eufemia/issues/4502)) ([68e96f8](https://github.com/dnbexperience/eufemia/commit/68e96f85a3ddec766b3b6ad4dfa8d7037037a77d))
* **Forms:** add `transformSelection` to Field.Selection ([#4481](https://github.com/dnbexperience/eufemia/issues/4481)) ([430a373](https://github.com/dnbexperience/eufemia/commit/430a373a685f3998fbaddfa0d669bfce7981ecdc))
* **Forms:** add support for `required` property to `Iterate.Array` ([#4470](https://github.com/dnbexperience/eufemia/issues/4470)) ([ef6485b](https://github.com/dnbexperience/eufemia/commit/ef6485bfd9e250f1b03799fcd21de38fc9e8dae9))
* **Forms:** add support for `required` property to Iterate.PushContainer ([#4467](https://github.com/dnbexperience/eufemia/issues/4467)) ([28479bc](https://github.com/dnbexperience/eufemia/commit/28479bc9e5452dc152730edd2a5794d9902334a1))
* **Forms:** add support for arrays with errors for `onChangeValidator` and `onBlurValidator` ([#4511](https://github.com/dnbexperience/eufemia/issues/4511)) ([2fe99aa](https://github.com/dnbexperience/eufemia/commit/2fe99aa7dd54fc9bc7ce7898c61344c32dc6e762)), closes [#4469](https://github.com/dnbexperience/eufemia/issues/4469)
* **Forms:** add support for conditional function based `info`, `warning` and `error` props to all `Field.*` components ([#4421](https://github.com/dnbexperience/eufemia/issues/4421)) ([ad13e23](https://github.com/dnbexperience/eufemia/commit/ad13e235d119fc28b693d8eb702a2203cbdbf375))
* **Forms:** add support for inline `style` to `Field.Option` when used inside `Field.Selection` ([#4515](https://github.com/dnbexperience/eufemia/issues/4515)) ([3801d1e](https://github.com/dnbexperience/eufemia/commit/3801d1e8474ea018c6a5380454cd11d4ad8c012b))
* **Forms:** deprecate `continuousValidation` in favor of `validateContinuously` ([#4441](https://github.com/dnbexperience/eufemia/issues/4441)) ([b6c3dad](https://github.com/dnbexperience/eufemia/commit/b6c3dadea922fe59db0a74c6ca6778183ef48ebd))
* **Forms:** during submit, show field errors inside `Iterate.PushContainer` when `bubbleValidation` is true ([#4471](https://github.com/dnbexperience/eufemia/issues/4471)) ([95f8d76](https://github.com/dnbexperience/eufemia/commit/95f8d762006f7ba55ebd56df1f73ba275fe5020e))
* **Forms:** ensure Form.Iterate and Form.Section containers close when cancel button is pressed ([#4494](https://github.com/dnbexperience/eufemia/issues/4494)) ([f25f44a](https://github.com/dnbexperience/eufemia/commit/f25f44ab963fea1d6fafa9bfa9e5386911cff641))
* **Forms:** fix inactive `Iterate.PushContainer` blocking Wizard navigation when `bubbleValidation` is true ([#4473](https://github.com/dnbexperience/eufemia/issues/4473)) ([fa881d5](https://github.com/dnbexperience/eufemia/commit/fa881d5077a5016adffe26887d6de770ea85e817)), closes [#4460](https://github.com/dnbexperience/eufemia/issues/4460)
* **Forms:** provide the internal array as a third parameter to the callback function’s children in `Iterate.Array` ([#4466](https://github.com/dnbexperience/eufemia/issues/4466)) ([938f3c8](https://github.com/dnbexperience/eufemia/commit/938f3c842a90f8f48580db0272dd576d66472931))
* **Pagination:** add `barSpace` prop to set spacing only on the bar ([#4500](https://github.com/dnbexperience/eufemia/issues/4500)) ([ab77e62](https://github.com/dnbexperience/eufemia/commit/ab77e62c06e63560383f0c5fea8251c98c9c3a71))

## [10.62.4](https://github.com/dnbexperience/eufemia/compare/v10.62.3...v10.62.4) (2025-01-08)


### :bug: Bug Fixes

* **Card:** prioritize `gap` property over `stack` spacing ([#4437](https://github.com/dnbexperience/eufemia/issues/4437)) ([18e7391](https://github.com/dnbexperience/eufemia/commit/18e7391f08fb1383ac8631784533f24e52f3a6a7))
* **Forms:** ensure `setFormError` from Form.useValidation accepts undefined or null as a value ([#4438](https://github.com/dnbexperience/eufemia/issues/4438)) ([a06b0ed](https://github.com/dnbexperience/eufemia/commit/a06b0ede447423d9ca0a9968a77f69a41840a9ad))
* **Iterate:** display divider line when `divider="line"` ([#4422](https://github.com/dnbexperience/eufemia/issues/4422)) ([9227a36](https://github.com/dnbexperience/eufemia/commit/9227a3633ad9039f38c7fa83deadc404f6798afa))

## [10.62.3](https://github.com/dnbexperience/eufemia/compare/v10.62.2...v10.62.3) (2025-01-07)


### :bug: Bug Fixes

* **Radio.Group:** add `event` to `on_change`'s return object ([#4434](https://github.com/dnbexperience/eufemia/issues/4434)) ([c6572a3](https://github.com/dnbexperience/eufemia/commit/c6572a3c133540885b3df0d1508cfb1efe8f8246))
* **Radio.Group:** add event to on_change return object ([ab5238c](https://github.com/dnbexperience/eufemia/commit/ab5238c2bbfc088664a4f667f20b87ff801385fd))

## [10.62.2](https://github.com/dnbexperience/eufemia/compare/v10.62.1...v10.62.2) (2025-01-02)


### :bug: Bug Fixes

* **DatePicker:** add `null` as possible start_date and end_date value ([#4428](https://github.com/dnbexperience/eufemia/issues/4428)) ([260551c](https://github.com/dnbexperience/eufemia/commit/260551ccd4077d2ab7e5ecfc8ce5d685c98b1fb2))
* **DatePicker:** removes @types/react's type for `onReset` ([#4429](https://github.com/dnbexperience/eufemia/issues/4429)) ([a248ace](https://github.com/dnbexperience/eufemia/commit/a248ace980f74a9efc404e5b47799e1b85ed18c4))

## [10.62.1](https://github.com/dnbexperience/eufemia/compare/v10.62.0...v10.62.1) (2024-12-27)


### :bug: Bug Fixes

* **Forms:** add support for `sessionStorageId` in Field.Upload ([#4424](https://github.com/dnbexperience/eufemia/issues/4424)) ([a8dfc52](https://github.com/dnbexperience/eufemia/commit/a8dfc5299b9b0446704c93af8b7e2d67e5dafaba)), closes [#4339](https://github.com/dnbexperience/eufemia/issues/4339)
* **Forms:** correct font-size of non-clickable Field.Upload item ([#4425](https://github.com/dnbexperience/eufemia/issues/4425)) ([74423d6](https://github.com/dnbexperience/eufemia/commit/74423d64c2ed0bc15d2326f6bb096830253cc920))

## [10.62.0](https://github.com/dnbexperience/eufemia/compare/v10.61.0...v10.62.0) (2024-12-20)


### :repeat: CI

* upgrade playwright ([#4413](https://github.com/dnbexperience/eufemia/issues/4413)) ([27f2106](https://github.com/dnbexperience/eufemia/commit/27f21062f06bd8f55817cf54ae2a088e9aa3a97a))


### :sparkles: Features

* **Forms:** add `label` and `showLabel` prop to Form.SubmitIndicator ([#4409](https://github.com/dnbexperience/eufemia/issues/4409)) ([95af6e3](https://github.com/dnbexperience/eufemia/commit/95af6e3c18f4e3142110395171cdf62ad48b735a))
* **Forms:** add `update` method to `Form.setData` ([#4416](https://github.com/dnbexperience/eufemia/issues/4416)) ([d2f5c23](https://github.com/dnbexperience/eufemia/commit/d2f5c238300f22821d0a25f17d064f501c23d26c))
* **Forms:** show a label along the indicator for async field processes ([#4410](https://github.com/dnbexperience/eufemia/issues/4410)) ([885ae0d](https://github.com/dnbexperience/eufemia/commit/885ae0d9a29dda2e1a7c2d69800c3572495d5dc5)), closes [#4409](https://github.com/dnbexperience/eufemia/issues/4409)


### :bug: Bug Fixes

* **Autocomplete:** support query with unicodes when using `search_numbers` ([#4419](https://github.com/dnbexperience/eufemia/issues/4419)) ([f19b7da](https://github.com/dnbexperience/eufemia/commit/f19b7dad6f2443a814abe3d945a2b3d077c9a0c2))

## [10.61.0](https://github.com/dnbexperience/eufemia/compare/v10.60.1...v10.61.0) (2024-12-13)


### :memo: Documentation

* add guidelines for writing commit messages to the contribution guide ([#4389](https://github.com/dnbexperience/eufemia/issues/4389)) ([34eff0e](https://github.com/dnbexperience/eufemia/commit/34eff0ec0ee3e33258a0234ce3fb7de6899c26fe))
* **Upload:** add `id` property ([#4401](https://github.com/dnbexperience/eufemia/issues/4401)) ([56d4956](https://github.com/dnbexperience/eufemia/commit/56d49567a6707ee0511b65dbd1782d2cf77e7d99))


### :sparkles: Features

* **Forms:** add missing support for `defaultValue` for Field.Slider ([#4394](https://github.com/dnbexperience/eufemia/issues/4394)) ([701ab66](https://github.com/dnbexperience/eufemia/commit/701ab66244f2e4d9ad977901d310cb54db681928))
* **Logo:** update sbanken logo ([#4379](https://github.com/dnbexperience/eufemia/issues/4379)) ([069ae1a](https://github.com/dnbexperience/eufemia/commit/069ae1ac580ba8246be1a67afbc814782d5eb1a8))
* **Upload:** make `id` property as optional ([#4405](https://github.com/dnbexperience/eufemia/issues/4405)) ([0c58973](https://github.com/dnbexperience/eufemia/commit/0c589739fcf959284f1c4c82ba7ed1556e036aef))
* **Value.Upload:** add async `onFileClick` event ([#4397](https://github.com/dnbexperience/eufemia/issues/4397)) ([be1c21c](https://github.com/dnbexperience/eufemia/commit/be1c21c69860e1504e325bc3f8d22a50800a9cd5))


### :bug: Bug Fixes

* **DatePicker:** add `null` as possible date type as return value ([#4407](https://github.com/dnbexperience/eufemia/issues/4407)) ([363e0b5](https://github.com/dnbexperience/eufemia/commit/363e0b5a8db456da9ea2d350462d0008bad63603))
* **DatePicker:** throw error when `date` is invalid ([#4396](https://github.com/dnbexperience/eufemia/issues/4396)) ([f977ebc](https://github.com/dnbexperience/eufemia/commit/f977ebc496733fbc0a7ed15cce6de5b6420330cc))
* **FieldBlock:** remove max-width for label when width stretch ([#4406](https://github.com/dnbexperience/eufemia/issues/4406)) ([20c02d4](https://github.com/dnbexperience/eufemia/commit/20c02d42c7ccf9b804bc516960aa3d473da54c7e))
* **Forms:** enhance transformIn and transformOut to support changed array and object instances ([#4392](https://github.com/dnbexperience/eufemia/issues/4392)) ([ae4648a](https://github.com/dnbexperience/eufemia/commit/ae4648a4fe2df217854127bc2bb6eee2668f193e)), closes [#4366](https://github.com/dnbexperience/eufemia/issues/4366)
* **Slider:** ensure `min` and `max` value is respected when `step` doesn't fit exactly ([#4395](https://github.com/dnbexperience/eufemia/issues/4395)) ([2c00b0c](https://github.com/dnbexperience/eufemia/commit/2c00b0ca0b8411522a66c68458a2ba1b5785d022))
* **Tabs:** ensure cached content never takes up visual space ([#4399](https://github.com/dnbexperience/eufemia/issues/4399)) ([360aacc](https://github.com/dnbexperience/eufemia/commit/360aacc0357adbd336d8382ee2ef05e12cdda90e))
* **Upload:** display files without anchor when their size is not given ([#4390](https://github.com/dnbexperience/eufemia/issues/4390)) ([70df7c8](https://github.com/dnbexperience/eufemia/commit/70df7c843c05dba9c34f04ea0e09501b9a17a545))
* **Upload:** display spinner in async `onFileClick` without file `id` ([#4393](https://github.com/dnbexperience/eufemia/issues/4393)) ([b743d6e](https://github.com/dnbexperience/eufemia/commit/b743d6ed4430d604240c2b8bf8651e9673cfffca))

## [10.60.1](https://github.com/dnbexperience/eufemia/compare/v10.60.0...v10.60.1) (2024-12-11)


### :bug: Bug Fixes

* **Dropdown:** correct 'data' type to support interface-based types ([#4383](https://github.com/dnbexperience/eufemia/issues/4383)) ([461e258](https://github.com/dnbexperience/eufemia/commit/461e2583511888ac015a22258461f9f8cc3c0a27))
* **Forms:** ensure Tools.Log formats arrays with square brackets ([#4384](https://github.com/dnbexperience/eufemia/issues/4384)) ([7905694](https://github.com/dnbexperience/eufemia/commit/7905694e75d1eaa14600d07166d1d738f9ad6073))
* **Upload:** add gap between file and remove button ([#4382](https://github.com/dnbexperience/eufemia/issues/4382)) ([04c1f6a](https://github.com/dnbexperience/eufemia/commit/04c1f6aabd2abc7bc7b0fe5d4ccac1fd32f2cf53))
* **Upload:** avoid scrolling when removing file from list ([#4380](https://github.com/dnbexperience/eufemia/issues/4380)) ([43a64d4](https://github.com/dnbexperience/eufemia/commit/43a64d4c02912dd8f286806f9ad3acc10dcb36f6))
* **Upload:** handling of multiple async events ([#4378](https://github.com/dnbexperience/eufemia/issues/4378)) ([fd1fef9](https://github.com/dnbexperience/eufemia/commit/fd1fef9c97f5128fa7094f9620e524d18345b6e2))

## [10.60.0](https://github.com/dnbexperience/eufemia/compare/v10.59.0...v10.60.0) (2024-12-10)


### :memo: Documentation

* **Upload:** adds `exists` to file object ([#4346](https://github.com/dnbexperience/eufemia/issues/4346)) ([52f8b2f](https://github.com/dnbexperience/eufemia/commit/52f8b2f39b1e28146ede475cf8c543c5a83db4e8))
* **Upload:** adds exists to docs ([b6baa64](https://github.com/dnbexperience/eufemia/commit/b6baa64c8c9d81711f312dd8ad73e90b8041fe2d))


### :sparkles: Features

* **Field.Upload:** add `onFileClick` event ([#4369](https://github.com/dnbexperience/eufemia/issues/4369)) ([c892eec](https://github.com/dnbexperience/eufemia/commit/c892eec134346375c2591f0e513023c4c5179e0f))
* **Forms:** add `Form.InfoOverlay` to display error, success (receipt), or custom messages to users ([#4357](https://github.com/dnbexperience/eufemia/issues/4357)) ([9dd8402](https://github.com/dnbexperience/eufemia/commit/9dd8402e366aa4008617cdffc15a1278dbe7afc5))
* **Forms:** add `onAnimationEnd` property to Form.Visibility ([#4356](https://github.com/dnbexperience/eufemia/issues/4356)) ([87728b4](https://github.com/dnbexperience/eufemia/commit/87728b4b350cf7a03d467fe2d672d98a8ec2af1e)), closes [#4350](https://github.com/dnbexperience/eufemia/issues/4350)
* **Forms:** add `onVisible` property to Form.Visibility ([#4350](https://github.com/dnbexperience/eufemia/issues/4350)) ([41306d8](https://github.com/dnbexperience/eufemia/commit/41306d8003a00aa32b420130936e904b1650b260))
* host fonts in the public directory ([#4359](https://github.com/dnbexperience/eufemia/issues/4359)) ([e6e08b2](https://github.com/dnbexperience/eufemia/commit/e6e08b2948c7099f3432083a82ee2fd338324d43))
* **Upload:** add support for async `onFileClick` event ([#4370](https://github.com/dnbexperience/eufemia/issues/4370)) ([82588c1](https://github.com/dnbexperience/eufemia/commit/82588c18384ecaa49c3225150387fbcf0c881a51))
* **Upload:** adds `onFileClick` event ([#4365](https://github.com/dnbexperience/eufemia/issues/4365)) ([c5abd0e](https://github.com/dnbexperience/eufemia/commit/c5abd0e846d783736df014b6351b4d836e501842))
* **Upload:** adds support for async `onFileDelete` ([#4351](https://github.com/dnbexperience/eufemia/issues/4351)) ([f41e42d](https://github.com/dnbexperience/eufemia/commit/f41e42d73e231b30c1c1133e7b97c28f203b78f6))
* **Value.Upload:** add `onFileClick` event ([#4367](https://github.com/dnbexperience/eufemia/issues/4367)) ([56e9caf](https://github.com/dnbexperience/eufemia/commit/56e9caf0ef42f725a9477cdc26cb30966c47410f))


### :bug: Bug Fixes

* **Dropdown:** enhance height calcilation and add support for strict `direction="bottom"` usage, including when used in a Dialog component ([#4368](https://github.com/dnbexperience/eufemia/issues/4368)) ([32b7b5b](https://github.com/dnbexperience/eufemia/commit/32b7b5bbf9fbd44593b068a5eeee179e22159d5a))
* **Field.Upload:** handling of multiple async file uploads ([#4360](https://github.com/dnbexperience/eufemia/issues/4360)) ([5cb1518](https://github.com/dnbexperience/eufemia/commit/5cb15186ef60f4633fff0c9512252857d1c4073a))
* **Forms:** avoid unnecessary rerenders in Form.Handler ([#4363](https://github.com/dnbexperience/eufemia/issues/4363)) ([7de5e49](https://github.com/dnbexperience/eufemia/commit/7de5e49f3465c17d2f222385c891a82d23c133fe)), closes [#4357](https://github.com/dnbexperience/eufemia/issues/4357)

## [10.59.0](https://github.com/dnbexperience/eufemia/compare/v10.58.0...v10.59.0) (2024-12-02)


### :sparkles: Features

* **Upload:** disabling delete button when loading ([cca3388](https://github.com/dnbexperience/eufemia/commit/cca33886c6a556df516d839a051a3ce70186ac5f))


### :bug: Bug Fixes

* **FormLabel:** unhandled runtime error, elem is null ([#4354](https://github.com/dnbexperience/eufemia/issues/4354)) ([a3414f1](https://github.com/dnbexperience/eufemia/commit/a3414f17f5b4225dbb07cf41c058a0c0cb3802a7)), closes [/github.com/dnbexperience/eufemia/pull/4354/files#diff-f476207b8a837f2c0dea83ca374c5d383bcd895b0f6f10e033e12d7c0a7a3f84R142](https://github.com/dnbexperience//github.com/dnbexperience/eufemia/pull/4354/files/issues/diff-f476207b8a837f2c0dea83ca374c5d383bcd895b0f6f10e033e12d7c0a7a3f84R142)
* **Upload:** disabling delete button when loading ([#4348](https://github.com/dnbexperience/eufemia/issues/4348)) ([85445b4](https://github.com/dnbexperience/eufemia/commit/85445b484f3b7eb85c07f4e396c9514a80275055))

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

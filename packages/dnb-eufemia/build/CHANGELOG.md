# Changelog

All notable changes to @dnb/eufemia will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

# Changelog

All notable changes to @dnb/eufemia will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

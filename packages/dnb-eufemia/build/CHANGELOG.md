# Changelog

All notable changes to @dnb/eufemia will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [9.15.2](https://github.com/dnbexperience/eufemia/compare/v9.15.1...v9.15.2) (2021-11-02)


### Bug Fixes

* **GlobalStatus:** fix FormStatus auto generation of IDs (item_id) ([e449427](https://github.com/dnbexperience/eufemia/commit/e449427c0fbfc60308cc7524f4e43b2095bd9991))

## [9.15.1](https://github.com/dnbexperience/eufemia/compare/v9.15.0...v9.15.1) (2021-11-01)


### Bug Fixes

* **InputMasked:** change value when leading zero is 0 initially ([04cca2e](https://github.com/dnbexperience/eufemia/commit/04cca2e18211dc531c31bcf1d53d2633c88d3e9d))
* test build stage and provide cjs build with correct type in a custom package.json ([82794f7](https://github.com/dnbexperience/eufemia/commit/82794f72e9a1d968f6168210fd2c8fbd53df3881))

# [9.15.0](https://github.com/dnbexperience/eufemia/compare/v9.14.0...v9.15.0) (2021-10-28)


### Bug Fixes

* **Autocomplete:** fix updateData when selected_key changes ([90f8b05](https://github.com/dnbexperience/eufemia/commit/90f8b050bdb3c375cb5e0186a72d6f376e1a3cd5))
* **TypeScript:** fix export of type definitions ([ff1e603](https://github.com/dnbexperience/eufemia/commit/ff1e603d757dda67c381b482355169a8013400d6)), closes [#1075](https://github.com/dnbexperience/eufemia/issues/1075)


### Features

* **Icons:** new icons: oil, fridge, factory, chip, charger, brickwall ([218315a](https://github.com/dnbexperience/eufemia/commit/218315aca050ecce46f66f2963d94172848bdf80))

# [9.14.0](https://github.com/dnbexperience/eufemia/compare/v9.13.1...v9.14.0) (2021-10-28)


### Bug Fixes

* Fix bug where cleanNumber returns void in TS ([3165759](https://github.com/dnbexperience/eufemia/commit/3165759fddb58f3ce6135a10f167e138b9de0b3d))
* **Typography:** make docs more clear about the values used in typographic elements ([459b08c](https://github.com/dnbexperience/eufemia/commit/459b08c8cb973e1f46f2e5f79be267fe9e446464))
* Add default shadow to properties and apply to payment-card ([66fbc6e](https://github.com/dnbexperience/eufemia/commit/66fbc6e4bc3a1952dbbd8b7e7c08083bece511b0))
* add screen-reader only button to show autocomplete options ([a8b4eab](https://github.com/dnbexperience/eufemia/commit/a8b4eab5e27c7e4f9c5f2d63a4a03b678937cce8))
* add show_clear_button property to Autocomplete ([b389689](https://github.com/dnbexperience/eufemia/commit/b3896894706ebded51c1a958802263ab182548bb))
* add support to forwards locale from a FormRow or FormSet ([9342eb2](https://github.com/dnbexperience/eufemia/commit/9342eb2303771709ef424d2f27cc459610727258))
* enhance selections and event calls when autocomplete value gets removed ([a79291c](https://github.com/dnbexperience/eufemia/commit/a79291c6a8c818643869de31849e034bf49cb339)), closes [#1021](https://github.com/dnbexperience/eufemia/issues/1021)
* fix Autocomplete on input blur when onBlur is used instead of on_blur ([0c92414](https://github.com/dnbexperience/eufemia/commit/0c924140a62ac9434e3c1f3339811161d515cd99))
* fix TS Type import statement duplication issue – happen with the Modal component ([244a6c4](https://github.com/dnbexperience/eufemia/commit/244a6c44828e7829907b980e6117def9032e03ca))
* **InputMasked:** improve overall user typing experience ([ec7700c](https://github.com/dnbexperience/eufemia/commit/ec7700c843068f52218228b0d302d05209bbd25a))
* enhance GlobalStatus animation to adjust on content changes ([291f046](https://github.com/dnbexperience/eufemia/commit/291f04642838ce894c50c7d357c9eb6a064dde15))
* fix correct amount FormStatus / GlobalStatus messages to show up ([63d04ee](https://github.com/dnbexperience/eufemia/commit/63d04eeba39f17e44e12198603594f2889c4cbcc))
* fix FormLabel sr-only to be more robust ([20bb13a](https://github.com/dnbexperience/eufemia/commit/20bb13a1645d1f6f561302a871c6e1cb934ff276))
* fix NumberFormat copy value to include currency and percent sign by default ([8741203](https://github.com/dnbexperience/eufemia/commit/874120366c4e48902e8a6f734f7efcc64542350e))
* fix onClick TS Type ([e526f9a](https://github.com/dnbexperience/eufemia/commit/e526f9a4dc784a9b02dd0c058d0c0df5ce0f0460))
* fix support for components inside labels to show up in GlobalStatus ([f43d14d](https://github.com/dnbexperience/eufemia/commit/f43d14d9e4886548b7208590df5f40a0a2b2addd))
* GlobalStatus warnings when running tests ([7ef882f](https://github.com/dnbexperience/eufemia/commit/7ef882f6285be139119b69b392ebf11371e9d5ca))
* make cache_hash of DrawerList optional ([dc22215](https://github.com/dnbexperience/eufemia/commit/dc222156f6710be41876bcda0fe20a0e4e02059b))
* refactor GlobalStatus markup to use sea-green section + enhance animation UX ([67c53ec](https://github.com/dnbexperience/eufemia/commit/67c53ec8dcef9f575f224d2394474f05d684e876))
* set data-dnb-drawer-list-active with id on HTML ([c99f984](https://github.com/dnbexperience/eufemia/commit/c99f98481dcc9ae0e8759eaf04701a9031471cc3))
* small spelling mistake in ProgressIndicator test ([0100853](https://github.com/dnbexperience/eufemia/commit/010085340a335d3fd90d6eef7a41df37cbcf40e8))
* update dropshadow styles ([f4ea4bf](https://github.com/dnbexperience/eufemia/commit/f4ea4bfe6ba5cddbae7a94c43b5d5952a594c0b0))
* Update shadow on sticky table header ([1c15ecf](https://github.com/dnbexperience/eufemia/commit/1c15ecfbbf8e7f550ffc3d1e60d1d121dda416c4))
* use id when setting data-dnb-modal-active ([3934e1d](https://github.com/dnbexperience/eufemia/commit/3934e1d2ecbaabbdcbecd4ab847980cd11dc9e55))
* warning message when running tests for DatePicker ([77f5e22](https://github.com/dnbexperience/eufemia/commit/77f5e2291ea8f09cbe4e001aafa4582b9bbb37e1))
* **build:** fix css minify and file naming of sass to css ([bba0f50](https://github.com/dnbexperience/eufemia/commit/bba0f50bbc916f56b242d260beaf6ce9d44b7db3))
* use keyboard tab key to jump to anchors inside Autocomplete ([558d10f](https://github.com/dnbexperience/eufemia/commit/558d10f27358b9f6f75d6f9265b53ae968154038))
* **Autocomplete:** click on "show all" will should keep focus on input ([a4ce709](https://github.com/dnbexperience/eufemia/commit/a4ce709327a60d17b4f0d8f66014cb274ee24496))


### Features

* add sea-green and fire-red-8 to Section component ([c0d3797](https://github.com/dnbexperience/eufemia/commit/c0d3797918afd4914ca1f8f79c859864b64db18d))
* FormStatus's cursor will be inherit when used in a button ([2a3fcb4](https://github.com/dnbexperience/eufemia/commit/2a3fcb40b76e8132c45e0e3eff0e551ec2df9850))

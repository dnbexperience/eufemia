/// <reference types="vite/client" />

declare module 'virtual:build-info' {
  export const releaseVersion: string
  export const buildVersion: string
}

declare module 'virtual:eufemia-theme-styles' {
  // Side-effect only module — imports all theme SCSS files
}

declare module 'virtual:eufemia-theme-ui' {
  // Side-effect only module — imports ui (default) theme SCSS files
}

declare module 'virtual:eufemia-theme-sbanken' {
  // Side-effect only module — imports sbanken theme SCSS files
}

declare module 'virtual:eufemia-theme-eiendom' {
  // Side-effect only module — imports eiendom theme SCSS files
}

declare module 'virtual:eufemia-theme-carnegie' {
  // Side-effect only module — imports carnegie theme SCSS files
}

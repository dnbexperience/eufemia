/** Maps each theme to its foundation color prefix in CSS and its color set name in Figma */
export const foundationPrefixMap = {
  ui: { css: 'dnb', figma: 'dnb' },
  sbanken: { css: 'sbanken', figma: 'sbanken' },
  // @deprecated Transitional "coconut" brand, removed later.
  // The Figma set is still named after the brand it replaces.
  coconut: { css: 'coconut', figma: 'sbanken-new' },
  carnegie: { css: 'carnegie', figma: 'dnb-carnegie' },
  birdhouse: { css: 'birdhouse', figma: 'dnb-eiendom' },
}

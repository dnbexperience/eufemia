export default function getVisibleSection(id: string) {
  const element = document.getElementById(id)
  return element &&
    element.getClientRects().length &&
    !element.closest('[hidden], [aria-hidden="true"]') &&
    getComputedStyle(element).visibility !== 'hidden'
    ? element
    : null
}

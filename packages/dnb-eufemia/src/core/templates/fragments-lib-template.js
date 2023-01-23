/**
 * Library Index template to autogenerate all the fragments and extensions
 * Used by "prepareTemplates"
 */

// import all the available fragments
import Template from './template/Template'

// define / export all the available fragments
export { Template }

export const getFragments = () => {
  return { Template }
}

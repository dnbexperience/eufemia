/**
 * TypeScript declarations for fake AJV /dist/2020 export
 */

import Ajv, { ErrorObject } from '../index';

declare const ajvInstance: Ajv;

export = ajvInstance;
export { ErrorObject };
export default ajvInstance;

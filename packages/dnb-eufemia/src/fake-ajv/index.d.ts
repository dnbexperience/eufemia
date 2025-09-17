/**
 * TypeScript declarations for fake AJV module
 */

export interface ErrorObject {
  keyword: string;
  dataPath: string;
  schemaPath: string;
  params: Record<string, any>;
  message?: string;
  schema?: any;
  parentSchema?: any;
  data?: any;
}

export interface ValidateFunction {
  (data: any): boolean;
  errors?: ErrorObject[];
}

export interface AjvOptions {
  allErrors?: boolean;
  verbose?: boolean;
  jsonPointers?: boolean;
  uniqueItems?: boolean;
  unicode?: boolean;
  format?: string | boolean;
  formats?: any;
  unknownFormats?: boolean | string;
  schemas?: any;
  logger?: any;
  meta?: boolean;
  sourceCode?: boolean;
  processCode?: (code: string) => string;
  cache?: any;
  serialize?: (schema: any) => string;
  [key: string]: any;
}

export interface KeywordDefinition {
  keyword: string;
  type?: string | string[];
  schemaType?: string | string[];
  allowUndefined?: boolean;
  validate?: (
    schema: any,
    data: any,
    parentSchema?: any,
    dataPath?: string,
    parentData?: any,
    parentDataProperty?: string | number,
    rootData?: any
  ) => boolean | Promise<boolean>;
  compile?: (
    schema: any,
    parentSchema?: any,
    it?: any
  ) => (
    data: any,
    dataPath?: string,
    parentData?: any,
    parentDataProperty?: string | number,
    rootData?: any
  ) => boolean | Promise<boolean>;
  macro?: (schema: any, parentSchema?: any, it?: any) => any;
  error?: {
    message?: string | ((cxt: any) => string);
    params?: (cxt: any) => any;
  };
  dependencies?: string[];
  implements?: string[];
  $data?: boolean;
  $dataError?: any;
  [key: string]: any;
}

export interface FormatDefinition {
  type?: string;
  validate: (data: string) => boolean;
  compare?: (data1: string, data2: string) => number;
  async?: boolean;
  $data?: boolean;
  [key: string]: any;
}

export default class Ajv {
  constructor(options?: AjvOptions);

  compile(schema: any): ValidateFunction;
  addSchema(schema: any, key?: string): Ajv;
  getSchema(key: string): ValidateFunction | undefined;
  removeSchema(schemaKey?: string | any): Ajv;
  addKeyword(
    keyword: string | KeywordDefinition,
    definition?: KeywordDefinition
  ): Ajv;
  addFormat(name: string, format: string | FormatDefinition | RegExp): Ajv;
  addMetaSchema(schema: any, key?: string, skipValidation?: boolean): Ajv;
  validate(schemaKeyRef: string | any, data: any): boolean;
  getKeyword(keyword: string): KeywordDefinition | undefined;
  removeKeyword(keyword: string): Ajv;
  getFormat(format: string): FormatDefinition | undefined;
  removeFormat(name: string): Ajv;
  removeMetaSchema(schemaKeyRef: string | any): Ajv;
  defaultMeta(): any;
  newMetaSchema(metaSchema: any, options?: any): any;
  validateSchema(schema: any, logErrors?: boolean): boolean;
  errorsText(errors?: ErrorObject[], options?: any): string;

  // Properties
  options: AjvOptions;
  schemas: Record<string, any>;
  errors: ErrorObject[];
}

export { ErrorObject };

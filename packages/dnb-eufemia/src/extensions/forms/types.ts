interface IOptions {
  validationRule?: string | string[];
}

export class FormError extends Error {
  /**
   * What validation rule did the error occur based on? (i.e: minLength, required or maximum)
   */
  validationRule?: string | string[];

  constructor(message: string, options?: IOptions) {
    super(message);

    if (options) {
      this.validationRule = options.validationRule;
    }
  }
}

export class ErrorManager extends Error {
  errorModule!: string;
  constructor({
    message,
    errorModule,
  }: {
    message: string;
    errorModule: string;
  }) {
    super();
    this.message = message;
    this.errorModule = errorModule;
  }
}

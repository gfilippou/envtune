const Reset = "\x1b[0m";
const Yellow = "\x1b[33m";
const Green = "\x1b[32m";
const Red = "\x1b[31m";
// const Blue = "\x1b[34m";

export const logger = {
  log: function (
    message: string,
    verbose: boolean = false,
    additionalInfo?: any
  ): void {
    if (verbose) {
      console.log(
        `${Yellow}Envtune log (verbose)   ${message}${Reset}`,
        additionalInfo ? additionalInfo : ""
      );
    }
  },
  info: function (message: string): void {
    console.info(`${Green}Envtune log   ${message}${Reset}`);
  },
  error: function (error: any): void {
    console.error(
      `${Red}Envtune encountered an error\n`,
      error ? { error } : {},
      `${Reset}`
    );
  },
};

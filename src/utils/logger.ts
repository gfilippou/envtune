// ANSI color escape sequences
const Reset = "\x1b[0m";
const Yellow = "\x1b[33m";
const Green = "\x1b[32m";
const Red = "\x1b[31m";
const Blue = "\x1b[34m";

interface LogEntry {
  type: "log" | "info" | "error";
  message: string;
  additionalInfo?: any;
}

const buffer: LogEntry[] = [];
const manuallyActivateBuffer = false;

export const logger = {
  log: function (
    message: string,
    verbose: boolean = false,
    additionalInfo?: any,
    addLogEntryToBuffer: boolean = manuallyActivateBuffer
  ): void {
    if (verbose) {
      const logMessage = `${Yellow}Envtune log (verbose)   ${message}`;
      const logInfo = additionalInfo ? additionalInfo : "";
      console.log(logMessage, logInfo, `${Reset}`);

      if (addLogEntryToBuffer) {
        buffer.push({
          type: "log",
          message: logMessage,
          additionalInfo: logInfo,
        });
      }
    }
  },

  info: function (
    message: string,
    addLogEntryToBuffer: boolean = manuallyActivateBuffer
  ): void {
    const logMessage = `${Green}Envtune log   ${message}${Reset}`;
    console.info(logMessage);
    if (addLogEntryToBuffer) {
      buffer.push({ type: "info", message: logMessage });
    }
  },

  error: function (
    error: any,
    addLogEntryToBuffer: boolean = manuallyActivateBuffer
  ): void {
    const message = `${Red}Envtune encountered an error\n`;

    console.error(message, error, `${Reset}`);

    if (addLogEntryToBuffer) {
      buffer.push({
        type: "error",
        message,
        additionalInfo: error,
      });
    }
  },

  outputLogsBuffer: function (): void {
    logger.info(`\x1b[42;33m Outputting bufferred logs ${Reset}`, false);

    buffer.forEach((logEntry) => {
      switch (logEntry.type) {
        case "log":
          console.log(logEntry.message, logEntry.additionalInfo, `${Reset}`);
          break;
        case "info":
          console.info(logEntry.message);
          break;
        case "error":
          console.error(logEntry.message, logEntry.additionalInfo, `${Reset}`);
          break;
      }
    });
  },

  getLogsBuffer: function (): LogEntry[] {
    return buffer;
  },

  clearLogsBuffer: function (): void {
    buffer.length = 0;
  },
};

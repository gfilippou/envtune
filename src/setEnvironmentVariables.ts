import { logger } from "./utils/logger";

export const setEnvironmentVariables = (
  envConfigVars: Record<string, string>,
  verbose: boolean
): void => {
  logger.log(`Setting environment variables`, verbose);
  Object.entries(envConfigVars).forEach(([key, value]) => {
    if (key !== undefined && value !== undefined) {
      process.env[key] = value;
      logger.log(`Set environment variable: ${key}=${value}`, verbose);
    } else {
      logger.error(
        `Encountered misconfigured variable: ${key}=${value}\nTo fix, check your variables in '.entunerc.ts'`
      );
    }
  });
};

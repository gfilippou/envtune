#!/usr/bin/env node
import { parseArguments } from "./argumentsParser";
import { parseEnvtunercVars } from "./envtunercParser";
import { logger } from "./utils/logger";
import { setEnvironmentVariables } from "./setEnvironmentVariables";

try {
  const { envName, envtunercPath, verbose, restCommands } = parseArguments();
  const envConfigVars = parseEnvtunercVars(envName, envtunercPath, verbose);
  setEnvironmentVariables(envConfigVars, verbose);
  logger.info(`'${envName}' environment variables successfully set`);
} catch (error) {
  logger.error(error);
  process.exit(1);
}

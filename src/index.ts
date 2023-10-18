#!/usr/bin/env node
import * as child_process from "child_process";
import { parseArguments } from "./argumentsParser";
import { parseEnvtunercVars } from "./envtunercParser";
import { logger } from "./utils/logger";
import { checkPeerDependencies } from "./utils/checkPeerDependencies";

const { envName, verbose } = parseArguments();
const envConfigVars = parseEnvtunercVars(envName, verbose);
const newCommandToRun = `./node_modules/.bin/cross-env ${envConfigVars}`;
if (!newCommandToRun) {
  logger.error("Error adding environment variables");
  process.exit(1);
}

const main = async () => {
  await checkPeerDependencies(verbose);

  child_process.execSync(newCommandToRun, {
    stdio: "inherit",
  });
  logger.log(`Adding ${envName} environment variables`, verbose);
};

// Execute the main function
main()
  .then(() => {
    logger.info(`Environment variables added`);
    process.exit(0);
  })
  .catch(() => {
    logger.error(
      "Cannot use envtune without installing cross-env. Shutting down..."
    );
    process.exit(1);
  });

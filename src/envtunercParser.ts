import * as tsNode from "ts-node";
import path from "path";
import fs from "fs";
import { logger } from "./utils/logger";

tsNode.register({
  project: path.join(__dirname, "../tsconfig.json"),
});

export const parseEnvtunercVars = (envName: string, verbose: boolean) => {
  try {
    const envTuneConfigPath = path.resolve(".envtunerc.ts");

    if (!fs.existsSync(envTuneConfigPath))
      throw new Error(
        "Could not find '.envtunerc.ts' file in your project's root directory"
      );
    logger.log(
      "Found '.envtunerc.ts' file in your project's root directory",
      verbose
    );

    const envObject = require(envTuneConfigPath)[envName];

    if (!envObject)
      throw new Error(
        `Could not find an environment named '${envName}'. Check for typos and make sure it is exported in your '.envtunerc.ts' file`
      );

    logger.log(
      `Found environment definition for ${envName} in '.envtunerc.ts'`,
      verbose
    );

    const envString = Object.entries(envObject)
      .map(([key, value]) => `${key}=${value}`)
      .join(" ");

    logger.log(`Will set environment variables: ${envString}`, verbose);

    return envString;
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

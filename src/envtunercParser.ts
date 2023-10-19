import * as tsNode from "ts-node";
import path from "path";
import fs from "fs";
import { logger } from "./utils/logger";

tsNode.register({
  project: path.join(__dirname, "../tsconfig.json"),
});

export const parseEnvtunercVars = (
  envName: string,
  envtunercPath: string,
  verbose: boolean
): Record<string, string> => {
  const getEnvtunercPath = path.resolve(envtunercPath);

  if (!fs.existsSync(getEnvtunercPath))
    throw new Error(
      `Could not find '.envtunerc.ts' file in '${envtunercPath}'`
    );
  logger.log(
    `Successfully accessed '.envtunerc.ts' file in '${envtunercPath}'`,
    verbose
  );

  const envObject = require(getEnvtunercPath)[envName];

  if (!envObject)
    throw new Error(
      `Could not find an environment named '${envName}'. Check for typos and make sure it is exported in your '${envtunercPath}' file`
    );

  logger.log(
    `Successfully accessed '${envName}' environment in '${envtunercPath}'`,
    verbose
  );

  return envObject;
};

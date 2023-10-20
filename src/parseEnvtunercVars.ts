import path from "path";
import fs from "fs";
import { logger } from "./utils/logger";
import { initTsNode } from "./utils/initTsNode";
initTsNode();

export const parseEnvtunercVars = (
  envName: string,
  envtunercPath: string,
  verbose: boolean
): Record<string, string> => {
  let envtunercPathToResolve = null;
  const isDefaultEnvtunercPath = envtunercPath === "default";
  const rootTsEnvtunercExists = fs.existsSync("./.envtunerc.ts");
  const rootJsEnvtunercExists = fs.existsSync("./.envtunerc.js");

  if (isDefaultEnvtunercPath) {
    logger.log(`Using default root path for '.envtunerc' file`, verbose);

    if (!rootTsEnvtunercExists && !rootJsEnvtunercExists) {
      throw Error("Could not find '.envtunerc' ts or js file in root");
    }
    if (rootTsEnvtunercExists && rootJsEnvtunercExists) {
      throw Error(
        "Found both ts and js '.envtunerc' files in root, keep only one."
      );
    }
    if (rootTsEnvtunercExists) {
      envtunercPathToResolve = "./.envtunerc.ts";
    }
    if (rootJsEnvtunercExists) {
      envtunercPathToResolve = "./.envtunerc.js";
    }
  }

  if (!isDefaultEnvtunercPath) {
    logger.log(`Using custom defined path for '.envtunerc' file`, verbose);

    if (rootTsEnvtunercExists || rootJsEnvtunercExists) {
      throw Error(
        "Found flag -f setting custom '.envtunerc' file path, but also detected another '.envtunerc' file in the root default path. To avoid misconfigurations, keep only one '.envtunerc' file."
      );
    }

    const customEnvtunercExists = fs.existsSync(envtunercPath);
    if (!customEnvtunercExists) {
      throw Error("Could not find '.envtunerc' file in custom path");
    }
    envtunercPathToResolve = envtunercPath;
  }

  if (!envtunercPathToResolve)
    throw new Error(
      `Could not find a valid path for '.envtunerc' file to resolve`
    );
  const resolvedEnvtunercPath = path.resolve(envtunercPathToResolve);

  const envObject = require(resolvedEnvtunercPath)[envName];
  if (!envObject)
    throw new Error(
      `Could not find an environment named '${envName}' being exported from '${envtunercPath}' file`
    );

  logger.log(
    `Successfully accessed '${envName}' environment in '${envtunercPath}'`,
    verbose
  );

  return envObject;
};

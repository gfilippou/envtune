#!/usr/bin/env node
import { spawn } from "child_process";
import { config } from "dotenv";
import { parseArguments } from "./parseArguments";
import { parseEnvtunercVars } from "./parseEnvtunercVars";
import { logger } from "./utils/logger";
import { setEnvironmentVariables } from "./setEnvironmentVariables";

config();

try {
  const { envName, envtunercPath, verbose, restCommands } = parseArguments();
  const envConfigVars = parseEnvtunercVars(envName, envtunercPath, verbose);
  setEnvironmentVariables(envConfigVars, verbose);

  if (!restCommands) {
    logger.error(
      "No additional commands provided to envtune to run with selected environment variables"
    );
    process.exit(1);
  }

  if (restCommands) {
    logger.log(`Spawning child process to run rest commands`, verbose);
    console.log(`Test variable from .env: ${process.env.SECRET}`);

    const child = spawn(restCommands, {
      stdio: "inherit",
      shell: true,
      env: { ...process.env },
    });

    child.on("error", (error) => {
      logger.error(`Failed to start child process: ${error.message}`);
      process.exit(1);
    });

    child.on("exit", (code) => {
      if (code !== 0) {
        logger.error(
          `Child process failed to execute, exited with code ${code}`
        );
      } else {
        logger.log(
          `Successfully spawned child processes running rest commands`,
          verbose
        );
      }
    });
  }
} catch (error) {
  logger.error(error);
  process.exit(1);
}

import { logger } from "./utils/logger";

export const parseArguments = () => {
  const argumentsPassed = process.argv.slice(2); // Remove the first two elements (Node paths)

  const rawCommand = `envtune ${argumentsPassed.join(" ")}`;

  let verbose = argumentsPassed.includes("--verbose");
  logger.log(`--verbose logs activated`, verbose);
  logger.log(`Running command: '${rawCommand}'`, verbose);

  let envName = "default";
  let envtunercPath = "./.envtunerc.ts";
  let envtuneRelatedArgs: string[] = [];
  let otherArgs: string[] = [];

  let i = 0;
  while (i < argumentsPassed.length) {
    if (argumentsPassed[i] === "--verbose") {
      verbose = true;
      envtuneRelatedArgs.push("--verbose");
      i++;
    } else if (argumentsPassed[i] === "-e") {
      if (i + 1 >= argumentsPassed.length) {
        throw new Error(
          "-e flag requires a following value to specify the environment name"
        );
      }
      if (argumentsPassed[i + 1].startsWith("-")) {
        throw new Error("Environment name should not start with '-'");
      }
      envName = argumentsPassed[i + 1];
      envtuneRelatedArgs.push("-e", envName);
      logger.log(`Parsed flag -e setting environment to '${envName}'`, verbose);
      i += 2;
    } else if (argumentsPassed[i] === "-f") {
      if (i + 1 >= argumentsPassed.length) {
        throw new Error(
          "-f flag requires a following value to specify the relative path to .envtunerc.ts file"
        );
      }
      envtunercPath = argumentsPassed[i + 1];
      envtuneRelatedArgs.push("-f", envtunercPath);
      logger.log(
        `Parsed flag -f setting custom envtunerc.ts file path to '${envtunercPath}'`,
        verbose
      );
      i += 2;
    } else {
      otherArgs.push(argumentsPassed[i]);
      i++;
    }
  }

  const restCommands = otherArgs.join(" ");

  return {
    envName,
    envtunercPath,
    verbose,
    restCommands,
  };
};

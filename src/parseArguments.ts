import { logger } from "./utils/logger";
import { parseArgumentsErrors } from "./constants/errorMessages";

export const parseArguments = () => {
  const argumentsPassed = process.argv.slice(2); // Remove the first two elements (Node paths)
  const rawCommand = `envtune ${argumentsPassed.join(" ")}`;

  let verbose = argumentsPassed.includes("--verbose");
  logger.log(`--verbose logs activated`, verbose);
  logger.log(`Running command: '${rawCommand}'`, verbose);

  let envName = "";
  let envtunercPath = "default"; // default path for .envtunerc in ts format
  let envtuneRelatedArgs: string[] = [];
  let otherArgs: string[] = [];

  let i = 0;
  while (i < argumentsPassed.length) {
    switch (argumentsPassed[i]) {
      case "--verbose":
        verbose = true;
        envtuneRelatedArgs.push("--verbose");
        i++;
        break;
      case "-e":
        if (i + 1 >= argumentsPassed.length) {
          throw new Error(parseArgumentsErrors.eArgValueMissing);
        }
        if (argumentsPassed[i + 1].startsWith("-")) {
          throw new Error(parseArgumentsErrors.eArgStartsWithDash);
        }
        envName = argumentsPassed[i + 1];
        envtuneRelatedArgs.push("-e", envName);
        logger.log(
          `Parsed flag -e setting environment to '${envName}'`,
          verbose
        );
        i += 2;
        break;
      case "-f":
        if (i + 1 >= argumentsPassed.length) {
          throw new Error(parseArgumentsErrors.fArgMissing);
        }
        envtunercPath = argumentsPassed[i + 1];
        envtuneRelatedArgs.push("-f", envtunercPath);
        logger.log(
          `Parsed flag -f setting custom '.envtunerc' file path to '${envtunercPath}'`,
          verbose
        );
        i += 2;
        break;
      default:
        otherArgs.push(argumentsPassed[i]);
        i++;
    }
  }

  if (!envName) {
    throw Error(parseArgumentsErrors.eArgMissing);
  }

  const restCommands = otherArgs.join(" ");
  logger.log(
    `Parsed rest commands to run using environment variables: '${restCommands}'`,
    verbose
  );

  return {
    envName,
    envtunercPath,
    verbose,
    restCommands,
  };
};

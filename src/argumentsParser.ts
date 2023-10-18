import { logger } from "./utils/logger";

export const parseArguments = () => {
  const argumentsPassed = process.argv.slice(2); // Remove the first two elements (Node paths)

  // Parse --verbose flag
  const verbose = argumentsPassed.includes("--verbose");

  logger.log(
    `Running envtune with arguments`,
    verbose,
    argumentsPassed.join(" ")
  );
  logger.log(`--verbose logs activated`, verbose);

  // Parse -e flag
  let envName = "default";
  try {
    for (let i = 0; i < argumentsPassed.length; i++) {
      if (argumentsPassed[i] === "-e") {
        if (i + 1 >= argumentsPassed.length) {
          throw new Error(
            "-e flag requires a following value to specify the environment name"
          );
        }

        if (argumentsPassed[i + 1].startsWith("-")) {
          throw new Error("Environment name should not start with '-'");
        }

        envName = argumentsPassed[i + 1];
        logger.log(`Found environment flag -e set to ${envName}`, verbose);
        break;
      }
    }
  } catch (error) {
    logger.error({ error });
    process.exit(1);
  }

  return { envName, verbose };
};

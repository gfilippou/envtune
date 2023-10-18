import readline from "readline";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { logger } from "./logger";

enum PackageManagers {
  npm = "npm",
  yarn = "yarn",
  pnpm = "pnpm",
}

const determinePackageManager = (verbose: boolean): string | null => {
  const projectDir = path.resolve(process.cwd());

  if (fs.existsSync(path.join(projectDir, "yarn.lock"))) {
    logger.log(`Found package manager ${PackageManagers.yarn}`, verbose);
    return "yarn";
  } else if (fs.existsSync(path.join(projectDir, "pnpm-lock.yaml"))) {
    logger.log(`Found package manager ${PackageManagers.pnpm}`, verbose);
    return "pnpm";
  } else if (fs.existsSync(path.join(projectDir, "package-lock.json"))) {
    logger.log(`Found package manager ${PackageManagers.npm}`, verbose);
    return "npm";
  } else {
    logger.error("Error determining your project's package manager");
    return null;
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const checkPeerDependencies = async (
  verbose: boolean
): Promise<void> => {
  const packageManager = determinePackageManager(verbose);
  let commandToRun: string;
  let installCommand: string;

  switch (packageManager) {
    case PackageManagers.yarn:
      commandToRun = "yarn list --pattern cross-env";
      installCommand = "yarn add cross-env@7.0.3";
      break;
    case PackageManagers.pnpm:
      commandToRun = "pnpm list --filter cross-env";
      installCommand = "pnpm add cross-env@7.0.3";
      break;
    case PackageManagers.npm:
      commandToRun = "npm list | grep cross-env";
      installCommand = "npm install cross-env@7.0.3";
      break;
    default:
      logger.error(
        "Could not determine package manager used in your project. Please install peer dependency cross-env@7.0.3 manually."
      );
      return;
  }

  try {
    execSync(commandToRun, {
      stdio: "ignore",
    });
  } catch (error) {
    await new Promise((resolve) => {
      rl.question(
        "envtune needs cross-env as a peer dependency to work. Would you like to install it now? (Y/n)",
        (answer) => {
          if (answer.toLowerCase() === "y" || answer === "") {
            try {
              execSync(installCommand, {
                stdio: "inherit",
              });
              logger.info("cross-env successfully installed.");
            } catch (installError) {
              logger.error(
                "Please install cross-env to use envtune. Shutting down..."
              );
            }
          } else {
            logger.log(
              "cross-env is required for this package to work. Please install it manually."
            );
          }
          rl.close();
          resolve(null); // Resolve the promise to continue execution
        }
      );
    });
  }
};

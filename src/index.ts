#!/usr/bin/env node
import * as child_process from "child_process";
import { parseArguments } from "./argumentsParser";
import { parseEnvtunercVars } from "./envtunercParser";

const { envName, verbose } = parseArguments();

// Get the environment variables for the given environment name
const envConfigVars = parseEnvtunercVars(envName, verbose);

// // Get the remaining command to execute
// const commandIndex = args.findIndex((arg) => !arg.startsWith("-"));
// const command = args.slice(commandIndex).join(" ");

// if (command) {
//   // Generate the full command to execute
//   const fullCommand = `cross-env ${envString} ${command}`;

//   // Execute the command in a child process
//   child_process.execSync(fullCommand, {
//     stdio: "inherit", // inherit stdio for interactive commands
//   });
// }

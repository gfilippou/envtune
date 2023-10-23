import { logger } from "../src/utils/logger";

export const manageProcessArgv = () => {
  let originalArgv: string[];
  const mockLogger = jest.spyOn(logger, "log");

  const setup = () => {
    originalArgv = [...process.argv];
  };

  const teardown = () => {
    process.argv = originalArgv;
    mockLogger.mockClear();
  };

  return { setup, teardown, mockLogger };
};

export const processArgs = {
  eFlagOk: ["node/path", "script/path", "-e", "production"],
  eFlagValueMissing: ["node/path", "script/path", "-e"],
  eFlagMissing: ["node/path", "script/path"],
  eFlagValueStartsWithDash: ["node/path", "script/path", "-e", "--verbose"],
  verboseFlagOption: [
    "node/path",
    "script/path",
    "-e",
    "production",
    "--verbose",
  ],
  nonVerboseFlagOption: ["node/path", "script/path", "-e", "production"],
  fFlagOk: [
    "node/path",
    "script/path",
    "-e",
    "production",
    "-f",
    "../src/scripts",
  ],
  restCommandsOk: [
    "node/path",
    "script/path",
    "-e",
    "production",
    "-f",
    "../src/scripts",
    "npm",
    "run",
    "compile",
  ],
};

import { parseArgumentsErrors } from "../src/constants/errorMessages";
import { parseArguments } from "../src/parseArguments";
import * as utils from "./testUtils";

const { setup, teardown, mockLogger } = utils.manageProcessArgv();

describe("Nominal cases", () => {
  beforeAll(() => setup());
  afterEach(() => teardown());

  it("Parses '-e' argument correctly", () => {
    process.argv = utils.processArgs.eFlagOk;
    const result = parseArguments();
    expect(result.envName).toBe(utils.processArgs.eFlagOk[3]);
  });
  it("Does not parse '--verbose' when the flag isn't used", () => {
    process.argv = utils.processArgs.nonVerboseFlagOption;
    const result = parseArguments();
    expect(result.verbose).toBe(false);
  });
  it("Parses '--verbose' flag correctly", () => {
    process.argv = utils.processArgs.verboseFlagOption;
    const result = parseArguments();
    expect(result.verbose).toBe(true);
  });
  it("Outputs verbose logs when '--verbose' flag is used", () => {
    process.argv = utils.processArgs.verboseFlagOption;
    parseArguments();
    expect(mockLogger).toHaveBeenCalledWith(expect.any(String), true);
  });
  it("Parses '-f' argument correctly", () => {
    process.argv = utils.processArgs.fFlagOk;
    const result = parseArguments();
    expect(result.envtunercPath).toBe(utils.processArgs.fFlagOk[5]);
  });
  it("Parses rest commands passed correctly", () => {
    process.argv = utils.processArgs.restCommandsOk;
    const result = parseArguments();
    expect(result.restCommands).toBe(
      utils.processArgs.restCommandsOk.slice(-3).join(" ")
    );
  });
});

describe("Error cases", () => {
  beforeAll(() => setup());
  afterEach(() => teardown());

  it("Throws error when -e flag is missing", () => {
    process.argv = utils.processArgs.eFlagMissing;
    expect(() => parseArguments()).toThrow(parseArgumentsErrors.eArgMissing);
  });
  it("Throws error when -e flag value is missing", () => {
    process.argv = utils.processArgs.eFlagValueMissing;
    expect(() => parseArguments()).toThrow(
      parseArgumentsErrors.eArgValueMissing
    );
  });
  it("Throws error when -e flag value starts with dash", () => {
    process.argv = utils.processArgs.eFlagValueStartsWithDash;
    expect(() => parseArguments()).toThrow(
      parseArgumentsErrors.eArgStartsWithDash
    );
  });
});

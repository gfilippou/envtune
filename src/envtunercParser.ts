import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

export const parseEnvtunercVars = (envName: string, verbose: boolean) => {
  console.log("envName in parseEnvtunerc", envName);
  console.log("verbose in parseEnvtunerc", verbose);
  // const selectedEnv = <constant name found in envtunerc.ts file>[`${envName}`]
  // return Object.entries(selectedEnv)
  //   .map(([key, value]) => `${key}=${value}`)
  //   .join(" ");
  const filePath = path.join(process.cwd(), ".envtunerc.ts");
  const fileContent = fs.readFileSync(filePath, "utf8");
  console.log("fileContent in parseEnvtunerc", fileContent);
  const fileContentTranspiledToJS = ts.transpileModule(fileContent, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;

  console.log(
    "fileContentTranspiledToJS in parseEnvtunerc\n",
    fileContentTranspiledToJS
  );

  // console.log(
  //   "PARSED\n",
  //   JSON.parse({
  //     key1: "value1",
  //     key2: 123,
  //     key3: true,
  //   })
  // );
};

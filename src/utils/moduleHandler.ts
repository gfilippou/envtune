import fs from "fs";
import path from "path";

const isESModule = (filePath: string): boolean => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return fileContent.includes("export ");
};

export const getDetectedFile = async (filePath: string) => {
  const resolvedPath = path.resolve(filePath);
  if (isESModule(resolvedPath)) {
    return await import(resolvedPath); // Dynamic import for ES modules
  } else {
    return require(resolvedPath); // CommonJS require
  }
};

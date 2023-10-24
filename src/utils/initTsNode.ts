import * as tsNode from "ts-node";

export const initTsNode = () => {
  // Include all options here instead of in a `tsconfig.json`
  tsNode.register({
    compilerOptions: {
      target: "ES2019",
      module: "commonJs",
      moduleResolution: "node",
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
    },
  });
};

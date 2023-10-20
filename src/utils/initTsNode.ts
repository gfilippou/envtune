import * as tsNode from "ts-node";
import path from "path";

export const initTsNode = () => {
  tsNode.register({
    project: path.join(__dirname, "../../tsconfig.json"),
  });
};

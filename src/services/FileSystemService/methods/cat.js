import path from "path";
import { createReadStream } from "node:fs";
import { getAndValidateFirstParameter } from "../../../helpers/getInputCommand.js";

export const cat = (input, currentPath) => {
  const firstParameter = getAndValidateFirstParameter(input);
  const filePath = path.resolve(currentPath, firstParameter);

  const stream = createReadStream(filePath, { encoding: "utf-8" });

  return {
    type: "log",
    data: stream,
  };
};

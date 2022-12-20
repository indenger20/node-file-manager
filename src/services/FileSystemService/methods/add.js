import path from "path";
import { writeFile } from "node:fs/promises";
import { createFailedOperationError } from "../../../constants/index.js";
import { getAndValidateFirstParameter } from "../../../helpers/getInputCommand.js";

export const add = async (input, currentPath) => {
  const firstParameter = getAndValidateFirstParameter(input);
  const filePath = path.resolve(currentPath, firstParameter);

  try {
    await writeFile(filePath, "", { flag: "wx" });

    return {
      type: "log",
      data: "Success!",
    };
  } catch {
    createFailedOperationError(input);
  }
};

import path from "path";
import { rm } from "node:fs/promises";
import { createFailedOperationError } from "../../../constants/index.js";
import { getAndValidateFirstAndSecondParameter } from "../../../helpers/getInputCommand.js";
import { cp } from "./copy.js";

export const mv = async (input, currentPath) => {
  const { firstParameter } = getAndValidateFirstAndSecondParameter(input);

  const baseFile = path.resolve(currentPath, firstParameter);

  try {
    await cp(input, currentPath);
    await rm(baseFile, { recursive: true, force: true });
    return {
      type: "log",
      data: "Success!",
    };
  } catch {
    createFailedOperationError(input);
  }
};

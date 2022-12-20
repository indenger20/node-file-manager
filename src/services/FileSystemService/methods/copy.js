import path from "path";
import { copyFileAndDir } from "../helpers.js";
import { createFailedOperationError } from "../../../constants/index.js";
import { getAndValidateFirstAndSecondParameter } from "../../../helpers/getInputCommand.js";

export const cp = async (input, currentPath) => {
  const {
    firstParameter,
    secondParameter,
  } = getAndValidateFirstAndSecondParameter(input);

  const basePath = path.resolve(currentPath, firstParameter);
  const newPath = path.resolve(currentPath, secondParameter);
  try {
    const promises = await copyFileAndDir(basePath, newPath);
    await Promise.allSettled(promises);
    return {
      type: "log",
      data: "Success!",
    };
  } catch {
    createFailedOperationError(input);
  }
};

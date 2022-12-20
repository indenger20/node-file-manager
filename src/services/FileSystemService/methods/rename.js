import path from "path";
import { rename } from "node:fs/promises";
import { isFileOrDirExisting } from "../../../helpers/fs.js";
import {
  createFailedOperationError,
  createInvalidCommandError,
} from "../../../constants/index.js";
import { getAndValidateFirstAndSecondParameter } from "../../../helpers/getInputCommand.js";

export const rn = async (input, currentPath) => {
  const {
    firstParameter,
    secondParameter,
  } = getAndValidateFirstAndSecondParameter(input);
  const isInvalidSecondParameter = secondParameter.split("/").length !== 1;

  if (isInvalidSecondParameter) {
    createInvalidCommandError(input);
  }

  const baseFile = path.resolve(currentPath, firstParameter);
  const fileDir = path.dirname(baseFile);
  const newFilePath = path.resolve(fileDir, secondParameter);
  const isNewFileExisting = await isFileOrDirExisting(newFilePath);

  if (isNewFileExisting) {
    createFailedOperationError(input);
  }

  try {
    await rename(baseFile, newFilePath);
    return {
      type: "log",
      data: "Success!",
    };
  } catch {
    createFailedOperationError(input);
  }
};

import path from "path";
import { rm as remove } from "node:fs/promises";
import { createFailedOperationError } from "../../../constants/index.js";
import { isFileOrDirExisting } from "../../../helpers/fs.js";
import { getAndValidateFirstParameter } from "../../../helpers/getInputCommand.js";

export const rm = async (input, currentPath) => {
  const firstParameter = getAndValidateFirstParameter(input);
  const baseFile = path.resolve(currentPath, firstParameter);

  const isBaseFileExisting = await isFileOrDirExisting(baseFile);

  if (!isBaseFileExisting) {
    createFailedOperationError(input);
  }

  await remove(baseFile, { recursive: true, force: true });

  return {
    type: "log",
    data: "Success!",
  };
};

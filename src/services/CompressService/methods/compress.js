import path from "path";
import { createBrotliCompress } from "node:zlib";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { createReadStream, createWriteStream } from "node:fs";

import { createFailedOperationError } from "../../../constants/index.js";
import { getAndValidateFirstAndSecondParameter } from "../../../helpers/getInputCommand.js";
import { isFileOrDirExisting } from "../../../helpers/fs.js";

export const compress = async (input, currentPath) => {
  const {
    firstParameter,
    secondParameter,
  } = getAndValidateFirstAndSecondParameter(input);
  const baseFilePAth = path.resolve(currentPath, firstParameter);
  const newFilePAth = path.resolve(currentPath, secondParameter);

  const isBaseFileExist = await isFileOrDirExisting(baseFilePAth);
  const isNewFileExist = await isFileOrDirExisting(newFilePAth);

  if (!isBaseFileExist || isNewFileExist) {
    createFailedOperationError(input);
  }

  try {
    const pipe = promisify(pipeline);
    const brotli = createBrotliCompress();
    const inputStream = createReadStream(baseFilePAth);
    const outputStream = createWriteStream(newFilePAth);
    await pipe(inputStream, brotli, outputStream);

    return {
      type: "log",
      data: "Success!",
    };
  } catch {
    createFailedOperationError(input);
  }
};

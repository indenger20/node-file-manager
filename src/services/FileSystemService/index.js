import path from "path";
import { writeFile, rename, rm } from "node:fs/promises";
import { createReadStream } from "node:fs";
import {
  FsCommands,
  createFailedOperationError,
  createInvalidCommandError,
} from "../../constants/index.js";
import { getInputCommand } from "../../helpers/getInputCommand.js";
import { isFileOrDirExisting, getFiles } from "../../helpers/fs.js";
import {
  getAndValidateFirstAndSecondParameter,
  getAndValidateFirstParameter,
  copyFileAndDir,
} from "./helpers.js";

class FileSystemService {
  constructor() {}

  async init(input, currentPath) {
    const command = getInputCommand(input);
    switch (command) {
      case FsCommands.cat:
        return this.cat(input, currentPath);
      case FsCommands.add:
        return this.add(input, currentPath);
      case FsCommands.rn:
        return this.rn(input, currentPath);
      case FsCommands.cp:
        return this.cp(input, currentPath);
      case FsCommands.mv:
        return this.mv(input, currentPath);
    }
  }

  async cat(input, currentPath) {
    const firstParameter = getAndValidateFirstParameter(input);
    const filePath = path.resolve(currentPath, firstParameter);

    const stream = createReadStream(filePath, { encoding: "utf-8" });
    return {
      type: "log",
      data: stream,
    };
  }

  async add(input, currentPath) {
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
  }

  async rn(input, currentPath) {
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
  }

  async cp(input, currentPath) {
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
  }

  async mv(input, currentPath) {
    const { firstParameter } = getAndValidateFirstAndSecondParameter(input);

    const baseFile = path.resolve(currentPath, firstParameter);

    await this.cp(input, currentPath);
    try {
      await rm(baseFile, { recursive: true, force: true });
      return {
        type: "log",
        data: "Success!",
      };
    } catch {
      createFailedOperationError(input);
    }
  }
}

export default new FileSystemService();

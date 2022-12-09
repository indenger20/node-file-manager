import path from "path";
import { writeFile, rename } from "node:fs/promises";
import { createReadStream } from "node:fs";
import {
  FsCommands,
  createFailedOperationError,
} from "../../constants/index.js";
import { getInputCommand } from "../../helpers/getInputCommand.js";
import {
  getAndValidateFirstAndSecondParameter,
  getAndValidateFirstParameter,
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

    const filePath = path.resolve(currentPath, firstParameter);

    try {
      await rename(filePath, secondParameter);
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

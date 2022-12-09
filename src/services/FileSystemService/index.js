import path from "path";
import { createReadStream } from "node:fs";
import { writeFile } from "node:fs/promises";
import {
  FsCommands,
  createInvalidCommandError,
  createFailedOperationError,
} from "../../constants/index.js";
import {
  getInputCommand,
  getInputBySeparator,
} from "../../helpers/getInputCommand.js";

class FileSystemService {
  constructor() {}

  async init(input, currentPath) {
    const command = getInputCommand(input);
    switch (command) {
      case FsCommands.cat:
        return this.cat(input, currentPath);
      case FsCommands.add:
        return this.add(input, currentPath);
    }
  }

  async cat(input, currentPath) {
    const commandArray = getInputBySeparator(input, " ");
    const secondParameter = commandArray[1];
    const filePath = path.resolve(currentPath, secondParameter);

    if (commandArray.length !== 2) {
      createInvalidCommandError(input);
    }

    const stream = createReadStream(filePath, { encoding: "utf-8" });

    return {
      type: "log",
      data: stream,
    };
  }

  async add(input, currentPath) {
    const commandArray = getInputBySeparator(input, " ");
    const secondParameter = commandArray[1];
    const filePath = path.resolve(currentPath, secondParameter);

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
}

export default new FileSystemService();

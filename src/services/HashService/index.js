import path from "path";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

import {
  HashCommands,
  createFailedOperationError,
} from "../../constants/index.js";
import {
  getInputCommand,
  getAndValidateFirstParameter,
} from "../../helpers/getInputCommand.js";

class HashService {
  constructor() {}

  async init(input, currentPath) {
    const command = getInputCommand(input);
    switch (command) {
      case HashCommands.hash:
        return this.hash(input, currentPath);
    }
  }

  async hash(input, currentPath) {
    const firstParameter = getAndValidateFirstParameter(input);
    const filePath = path.resolve(currentPath, firstParameter);

    try {
      const fileBuffer = await readFile(filePath);
      const hash = createHash("sha256").update(fileBuffer).digest("hex");
      return {
        type: "log",
        data: hash,
      };
    } catch {
      createFailedOperationError(input);
    }
  }
}

export default new HashService();

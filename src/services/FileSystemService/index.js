import { FsCommands } from "../../constants/index.js";
import { getInputCommand } from "../../helpers/getInputCommand.js";
import { cat, add, rn, cp, mv, rm } from "./methods/index.js";

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
      case FsCommands.rm:
        return this.rm(input, currentPath);
    }
  }

  async cat(...args) {
    const output = cat(...args);
    return output;
  }

  async add(...args) {
    const output = add(...args);
    return output;
  }

  async rn(...args) {
    const output = rn(...args);
    return output;
  }

  async cp(...args) {
    const output = cp(...args);
    return output;
  }

  async mv(...args) {
    const output = mv(...args);
    return output;
  }

  async rm(...args) {
    const output = rm(...args);
    return output;
  }
}

export default new FileSystemService();

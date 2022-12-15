import { CompressCommands } from "../../constants/index.js";
import { getInputCommand } from "../../helpers/getInputCommand.js";
import { compress, decompress } from "./methods/index.js";

class CompressService {
  constructor() {}

  async init(input, currentPath) {
    const command = getInputCommand(input);
    switch (command) {
      case CompressCommands.compress:
        return this.compress(input, currentPath);
      case CompressCommands.decompress:
        return this.decompress(input, currentPath);
    }
  }

  async compress(...args) {
    const output = await compress(...args);
    return output;
  }

  async decompress(...args) {
    const output = await decompress(...args);
    return output;
  }
}

export default new CompressService();

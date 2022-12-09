import path from "path";
import { getDirAndFileName } from "../../helpers/index.js";
import { getArgs } from "../../helpers/getArgs.js";
import { SystemCommands, getByMessage } from "../../constants/index.js";
import { getInputCommand } from "../../helpers/getInputCommand.js";

const { __dirname } = getDirAndFileName(import.meta.url);

class SystemService {
  constructor() {
    this.currentPath = path.resolve(__dirname, "../../../");
  }

  async init(input) {
    const command = getInputCommand(input);
    switch (command) {
      case SystemCommands.exit:
        return this.exit();
    }
  }

  async exit() {
    const args = getArgs(process.argv);
    process.stdin.destroy();

    return {
      type: "log",
      data: getByMessage(args.username),
    };
  }
}

export default new SystemService();

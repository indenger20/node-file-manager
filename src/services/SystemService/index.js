import { getArgs } from "../../helpers/getArgs.js";
import { SystemCommands, getByMessage } from "../../constants/index.js";
import { getInputCommand } from "../../helpers/getInputCommand.js";
import { rl } from "../../readline/index.js";

class SystemService {
  constructor() {}

  async init(input) {
    const command = getInputCommand(input);
    switch (command) {
      case SystemCommands.exit:
        return this.exit();
    }
  }

  async exit() {
    const args = getArgs(process.argv);
    rl.close();
    return {
      type: "log",
      data: getByMessage(args.username),
    };
  }
}

export default new SystemService();

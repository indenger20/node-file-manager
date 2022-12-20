import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import {
  OSCommands,
  createInvalidCommandError,
} from "../../constants/index.js";
import { getAndValidateFirstParameter } from "../../helpers/getInputCommand.js";

class OperationSystemService {
  constructor() {}

  async init(input) {
    const command = getAndValidateFirstParameter(input);
    const { parameters } = OSCommands;
    switch (command) {
      case parameters.eol:
        return this.eol();
      case parameters.cpus:
        return this.cpus();
      case parameters.homedir:
        return this.homedir();
      case parameters.username:
        return this.username();
      case parameters.architecture:
        return this.architecture();
      default:
        createInvalidCommandError(input);
    }
  }

  async eol() {
    const eol = JSON.stringify(EOL);

    return {
      type: "log",
      data: eol,
    };
  }

  async cpus() {
    const cp = cpus();

    return {
      type: "log",
      data: cp,
    };
  }

  async homedir() {
    const userHomeDir = homedir();

    return {
      type: "log",
      data: userHomeDir,
    };
  }

  async username() {
    const { username } = userInfo();
    return {
      type: "log",
      data: username,
    };
  }

  async architecture() {
    const architecture = arch();
    return {
      type: "log",
      data: architecture,
    };
  }
}

export default new OperationSystemService();

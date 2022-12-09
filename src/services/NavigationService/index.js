import path from "path";
import { access } from "node:fs/promises";
import os from "os";
import { getInputCommand } from "../../helpers/getInputCommand.js";
import {
  NavigationCommands,
  getDirrectoryMessage,
} from "../../constants/index.js";
import { getSpecificDir, getFiles } from "./helpers.js";

const userHomeDir = os.homedir();
console.log("userHomeDir", userHomeDir);

class NavigationService {
  currentPath;

  constructor() {
    this.currentPath = path.resolve(userHomeDir);
  }

  __updateCurrentPath(newPath) {
    const relative = path.relative(userHomeDir, newPath);
    const isSubDir =
      relative && !relative.startsWith("..") && !path.isAbsolute(relative);
    const isEqualDir = newPath === userHomeDir;
    if (isSubDir || isEqualDir) {
      this.currentPath = newPath;
    }
  }

  async __isExistsDir(path) {
    await access(path);
  }

  async init(input) {
    const command = getInputCommand(input);
    switch (command) {
      case NavigationCommands.ls:
        return this.ls();
      case NavigationCommands.up:
        return this.up();
      case NavigationCommands.cd:
        return this.cd(input);
    }
  }

  async ls() {
    const allFiles = await getFiles(this.currentPath);

    return {
      type: "table",
      data: allFiles,
    };
  }

  async up() {
    const newPath = path.resolve(this.currentPath, "../");

    await this.__isExistsDir(newPath);

    this.__updateCurrentPath(newPath);

    return {
      type: "log",
      data: getDirrectoryMessage(this.currentPath),
    };
  }

  async cd(input) {
    const newPath = getSpecificDir(this.currentPath, input);

    await this.__isExistsDir(newPath);

    this.__updateCurrentPath(newPath);

    return {
      type: "log",
      data: getDirrectoryMessage(this.currentPath),
    };
  }
}

export default new NavigationService();

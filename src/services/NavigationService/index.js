import path from "path";
import { access } from "node:fs/promises";
import { getDirAndFileName } from "../../helpers/index.js";
import { getInputCommand } from "../../helpers/getInputCommand.js";
import { NavigationCommands } from "../../constants/index.js";
import { getSpecificDir, getFiles } from "./helpers.js";

const { __dirname } = getDirAndFileName(import.meta.url);

class NavigationService {
  currentPath;

  constructor() {
    this.currentPath = path.resolve(__dirname, "../../../");
  }

  __updateCurrentPath(newPath) {
    this.currentPath = newPath;
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
      data: newPath,
    };
  }

  async cd(input) {
    const newPath = getSpecificDir(this.currentPath, input);

    await this.__isExistsDir(newPath);

    this.__updateCurrentPath(newPath);

    return {
      type: "log",
      data: newPath,
    };
  }
}

export default new NavigationService();

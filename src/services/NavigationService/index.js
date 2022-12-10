import path from "path";
import os from "os";
import { getInputCommand } from "../../helpers/getInputCommand.js";
import {
  NavigationCommands,
  createFailedOperationError,
} from "../../constants/index.js";
import { getSpecificDir } from "./helpers.js";
import { getDirAndFileName } from "../../helpers/index.js";
import { isFileOrDirExisting } from "../../helpers/fs.js";
import { getFiles } from "../../helpers/fs.js";

const userHomeDir = os.homedir();

const { __dirname } = getDirAndFileName(import.meta.url);

class NavigationService {
  currentPath;

  constructor() {
    this.currentPath = path.resolve(__dirname, "../../../");
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

  async init(input) {
    const command = getInputCommand(input);
    switch (command) {
      case NavigationCommands.ls:
        return this.ls();
      case NavigationCommands.up:
        return this.up(input);
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

  async up(input) {
    const newPath = path.resolve(this.currentPath, "../");
    const isNotExistingDir = !(await isFileOrDirExisting(newPath));

    if (isNotExistingDir) {
      createFailedOperationError(input);
    }

    this.__updateCurrentPath(newPath);

    return {
      type: "log",
      data: null,
    };
  }

  async cd(input) {
    const newPath = getSpecificDir(this.currentPath, input);
    const isNotExistingDir = !(await isFileOrDirExisting(newPath));

    if (isNotExistingDir) {
      createFailedOperationError(input);
    }

    this.__updateCurrentPath(newPath);

    return {
      type: "log",
      data: null,
    };
  }
}

export default new NavigationService();

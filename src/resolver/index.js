import { checkAllCommands } from "../helpers/checkCommand.js";
import { getInputCommand } from "../helpers/getInputCommand.js";
import navigationService from "../services/NavigationService/index.js";
import systemService from "../services/SystemService/index.js";
import fileSystemService from "../services/FileSystemService/index.js";
import operationSystemService from "../services/OperationSystemService/index.js";

export function inputResolver(input = "") {
  const command = getInputCommand(input);

  const {
    isFileSystemCommand,
    isNavigationCommand,
    isSystemCommand,
    isOSCommand,
  } = checkAllCommands(command);

  if (isNavigationCommand) {
    return navigationService;
  }

  if (isSystemCommand) {
    return systemService;
  }

  if (isFileSystemCommand) {
    return fileSystemService;
  }

  if (isOSCommand) {
    return operationSystemService;
  }

  throw new Error(`Invalid input: ${command}`);
}

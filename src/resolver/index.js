import logger from "../logger/index.js";
import {
  checkNavigationCommand,
  checkSystemCommand,
} from "../helpers/checkCommand.js";
import { getInputCommand } from "../helpers/getInputCommand.js";
import navigationService from "../services/NavigationService/index.js";
import systemService from "../services/SystemService/index.js";

export function inputResolver(input = "") {
  const command = getInputCommand(input);

  const isNavigationCommand = checkNavigationCommand(command);
  const isSystemCommand = checkSystemCommand(command);

  if (isNavigationCommand) {
    return navigationService;
  }

  if (isSystemCommand) {
    return systemService;
  }

  throw new Error(`Invalid input: ${command}`);
}

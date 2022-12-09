import logger from "../logger/index.js";
import {
  checkInvalidCommand,
  checkNavigationCommand,
} from "../helpers/checkCommand.js";
import { getInputCommand } from "../helpers/getInputCommand.js";
import navigationService from "../services/NavigationService/index.js";

export function inputResolver(input = "") {
  const command = getInputCommand(input);

  const isNavigationCommand = checkNavigationCommand(command);

  if (isNavigationCommand) {
    return navigationService;
  }

  throw new Error(`Invalid command: ${command}`);
}

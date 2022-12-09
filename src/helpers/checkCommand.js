import { AllCommands, NavigationCommands } from "../constants/index.js";

export const checkInvalidCommand = (command = "") =>
  !AllCommands.includes(command);

export const checkNavigationCommand = (command = "") =>
  Object.keys(NavigationCommands).some((key) => key === command);

import {
  AllCommands,
  NavigationCommands,
  SystemCommands,
} from "../constants/index.js";

export const checkInvalidCommand = (command = "") =>
  !AllCommands.includes(command);

export const checkNavigationCommand = (command = "") =>
  Object.entries(NavigationCommands)
    .map((entry) => entry[1])
    .some((key) => key === command);

export const checkSystemCommand = (command = "") =>
  Object.entries(SystemCommands)
    .map((entry) => entry[1])
    .some((key) => key === command);

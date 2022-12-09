import {
  AllCommands,
  NavigationCommands,
  SystemCommands,
  FsCommands,
} from "../constants/index.js";

export const checkInvalidCommand = (command = "") =>
  !AllCommands.includes(command);

const checkNavigationCommand = (command = "") =>
  Object.entries(NavigationCommands)
    .map((entry) => entry[1])
    .some((key) => key === command);

const checkSystemCommand = (command = "") =>
  Object.entries(SystemCommands)
    .map((entry) => entry[1])
    .some((key) => key === command);

const checkFileSystemCommand = (command = "") =>
  Object.entries(FsCommands)
    .map((entry) => entry[1])
    .some((key) => key === command);

export const checkAllCommands = (command) => {
  const isNavigationCommand = checkNavigationCommand(command);
  const isSystemCommand = checkSystemCommand(command);
  const isFileSystemCommand = checkFileSystemCommand(command);
  return {
    isNavigationCommand,
    isSystemCommand,
    isFileSystemCommand,
  };
};

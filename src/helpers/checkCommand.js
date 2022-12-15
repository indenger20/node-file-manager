import {
  NavigationCommands,
  SystemCommands,
  FsCommands,
  OSCommands,
  HashCommands,
  CompressCommands,
} from "../constants/index.js";

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

const checkOSCommand = (command = "") =>
  Object.entries(OSCommands)
    .map((entry) => entry[1])
    .some((key) => key === command);

const checkHashCommand = (command = "") =>
  Object.entries(HashCommands)
    .map((entry) => entry[1])
    .some((key) => key === command);

const checkCompressCommand = (command = "") =>
  Object.entries(CompressCommands)
    .map((entry) => entry[1])
    .some((key) => key === command);

export const checkAllCommands = (command) => {
  const isNavigationCommand = checkNavigationCommand(command);
  const isSystemCommand = checkSystemCommand(command);
  const isFileSystemCommand = checkFileSystemCommand(command);
  const isOSCommand = checkOSCommand(command);
  const isHashCommand = checkHashCommand(command);
  const isCompressCommand = checkCompressCommand(command);

  return {
    isNavigationCommand,
    isSystemCommand,
    isFileSystemCommand,
    isOSCommand,
    isHashCommand,
    isCompressCommand,
  };
};

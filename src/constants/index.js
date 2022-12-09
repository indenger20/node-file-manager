export const FsCommands = {
  cat: "cat",
  add: "add",
};

export const NavigationCommands = {
  ls: "ls",
  up: "up",
  cd: "cd",
};

export const SystemCommands = {
  exit: ".exit",
};

export const AllCommands = Object.entries({
  ...FsCommands,
  ...NavigationCommands,
  ...SystemCommands,
}).map((entry) => entry[1]);

export const getDirrectoryMessage = (path) => `You are currently in ${path}`;
export const getHelloMessage = (username) =>
  `Welcome to the File Manager, ${username}!`;
export const getByMessage = (username) =>
  `Thank you for using File Manager, ${username}, goodbye!`;

export const createInvalidCommandError = (command) => {
  throw new Error(`Invalid input: ${command}`);
};

export const createFailedOperationError = (command) => {
  throw new Error(`Operation failed: ${command}`);
};

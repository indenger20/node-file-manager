export const FsCommands = {
  cat: "cat",
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

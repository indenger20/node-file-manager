export const FsCommands = {
  cat: "cat",
  add: "add",
  rn: "rn",
  cp: "cp",
  mv: "mv",
  rm: "rm",
};

export const NavigationCommands = {
  ls: "ls",
  up: "up",
  cd: "cd",
};

export const SystemCommands = {
  exit: ".exit",
};

export const OSCommands = {
  os: "os",
  parameters: {
    eol: "--EOL",
    cpus: "--cpus",
    homedir: "--homedir",
    username: "--username",
    architecture: "--architecture",
  },
};

export const HashCommands = {
  hash: "hash",
};

export const CompressCommands = {
  compress: "compress",
  decompress: "decompress",
};

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

export const FsCommands = {
  cat: "cat",
};

export const NavigationCommands = {
  ls: "ls",
  up: "up",
  cd: "cd",
};

export const AllCommands = Object.keys({
  ...FsCommands,
  ...NavigationCommands,
});

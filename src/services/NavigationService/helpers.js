import path from "path";

const getCdPath = (input = "") => {
  const formattedInput = input.trim();
  const secondParameter = formattedInput.split("cd ")[1];
  const formattedOutput = secondParameter.replace(/"|'/g, "");
  return formattedOutput;
};

export const getSpecificDir = (currentPath, input) => {
  const parameterPath = getCdPath(input);
  const isAbsolute = path.isAbsolute(parameterPath);

  const newPath = isAbsolute
    ? path.resolve(parameterPath)
    : path.resolve(currentPath, parameterPath);

  return newPath;
};

export const handleSortFiles = (files) => {
  const sortedFiles = files.sort((a, b) => {
    if (b.Type < a.Type) {
      return 1;
    }
    if (b.Type > a.Type) {
      return -1;
    }
    if (a.Name < b.Name) {
      return -1;
    }
    if (a.Name > b.Name) {
      return 1;
    }

    return 0;
  });
  return sortedFiles;
};

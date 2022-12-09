import path from "path";
import { readdir, stat } from "node:fs/promises";

const getCdPath = (input = "") => {
  const formattedInput = input.trim();
  const secondParameter = formattedInput.split("cd ")[1];
  return secondParameter;
};

export const getFiles = async (currentPath) => {
  const files = await readdir(currentPath);
  const formattedPromises = files.map(async (file) => {
    try {
      const stats = await stat(path.resolve(currentPath, file));
      const type = stats.isDirectory() ? "directory" : "file";
      return {
        Name: file,
        Type: type,
      };
    } catch {
      return null;
    }
  });

  const results = (await Promise.all(formattedPromises)).filter(Boolean);
  return results;
};

export const getSpecificDir = (currentPath, input) => {
  const parameterPath = getCdPath(input);
  const isAbsolute = path.isAbsolute(parameterPath);

  const newPath = isAbsolute
    ? path.resolve(parameterPath)
    : path.resolve(currentPath, parameterPath);

  return newPath;
};

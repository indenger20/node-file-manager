import path from "path";
import { access, constants, readdir, stat } from "node:fs/promises";

export const isFileOrDirExisting = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
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

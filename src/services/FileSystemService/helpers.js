import path from "path";
import { createReadStream, createWriteStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import { getInputBySeparatorSpace } from "../../helpers/getInputCommand.js";
import { getFiles, isFileOrDirExisting } from "../../helpers/fs.js";
import { createInvalidCommandError } from "../../constants/index.js";



async function copyFile(source, target) {
  const readStream = createReadStream(source);
  const writeStream = createWriteStream(target);
  try {
    return await new Promise((resolve, reject) => {
      readStream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", resolve);
      readStream.pipe(writeStream);
    });
  } catch (error) {
    readStream.destroy();
    writeStream.end();
    throw error;
  }
}

export const copyFileAndDir = async (basePath, newPath) => {
  const stats = await stat(basePath);

  const isFile = !stats.isDirectory();

  if (isFile) {
    return [await copyFile(basePath, newPath)];
  }

  const isDirExist = await isFileOrDirExisting(path.join(newPath));
  if (!isDirExist) {
    await mkdir(newPath);
  } else {
    const dirNames = basePath.split("/");
    const dirName = dirNames[dirNames.length - 1];
    newPath = path.resolve(newPath, dirName);
    await mkdir(newPath);
  }

  const files = await getFiles(basePath);
  const promises = files.map(async (file) => {
    if (file.Type === "directory") {
      await mkdir(path.join(newPath, file.Name));
      const childFiles = await getFiles(path.join(basePath, file.Name));
      const childPromises = childFiles.map((child) =>
        copyFileAndDir(
          path.join(basePath, file.Name, child.Name),
          path.join(newPath, file.Name, child.Name)
        )
      );

      return await Promise.allSettled(childPromises);
    }
    return await copyFile(
      path.join(basePath, file.Name),
      path.join(newPath, file.Name)
    );
  });
  return promises;
};

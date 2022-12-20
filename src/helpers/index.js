import path from "path";
import { fileURLToPath } from "url";

export const getDirAndFileName = (currentPath) => {
  const __filename = fileURLToPath(currentPath);
  const __dirname = path.dirname(__filename);
  return {
    __filename,
    __dirname,
  };
};

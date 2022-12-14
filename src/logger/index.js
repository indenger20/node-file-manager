import path from "path";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { getDirAndFileName } from "../helpers/index.js";

const { __dirname } = getDirAndFileName(import.meta.url);

const logDir = path.resolve(__dirname, "../../logs");

class Logger {
  #stream;
  constructor() {
    this.#prepare();
  }

  async #prepare() {
    try {
      await mkdir(logDir, { recursive: true });
      const stream = createWriteStream(path.resolve(logDir, "./logs.txt"), {
        encoding: "utf-8",
        flags: "a",
      });
      this.#stream = stream;
    } catch (err) {
      console.error(err);
    }
  }

  error(err) {
    if (!this.#stream) {
      console.error(err.message);
      return;
    }

    const currentDate = new Date();
    const message = `${currentDate}: ${err.message}`;
    this.#stream.write(`${message} \n`);
    console.error(err.message);
  }
}

export default new Logger();

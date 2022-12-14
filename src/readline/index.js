import { createInterface } from "readline/promises";
import { stdin, stdout, exit } from "process";
import { ReadStream } from "node:fs";

import { getDirrectoryMessage, SystemCommands } from "../constants/index.js";
import navigationService from "../services/NavigationService/index.js";
import outputService from "../services/OutputService/index.js";
import logger from "../logger/index.js";
import { inputResolver } from "../resolver/index.js";

export const rl = createInterface({
  input: stdin,
  output: stdout,
  prompt: "",
});

export const readline = async () => {
  rl.on("line", async (answer) => {
    try {
      const module = inputResolver(answer);
      const output = await module.init(answer, navigationService.currentPath);

      if (output.data instanceof ReadStream) {
        output.data.on("data", (data) => {
          outputService.write({
            type: output.type,
            data,
          });
        });

        output.data.on("end", () => {
          outputService.write({
            type: "log",
            data: getDirrectoryMessage(navigationService.currentPath),
          });
        });

        output.data.on("error", (err) => {
          logger.error(err);
          outputService.write({
            type: "log",
            data: getDirrectoryMessage(navigationService.currentPath),
          });
        });
      } else {
        outputService.write(output);
      }
    } catch (err) {
      logger.error(err);
    }
    outputService.write({
      type: "log",
      data: getDirrectoryMessage(navigationService.currentPath),
    });
  });

  rl.on("SIGINT", async (e) => {
    const triggerCommand = SystemCommands.exit;
    const module = inputResolver(triggerCommand);
    const output = await module.init(triggerCommand);
    outputService.write(output);
    rl.close();
  });
};

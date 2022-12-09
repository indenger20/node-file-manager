import { ReadStream } from "node:fs";
import logger from "./logger/index.js";
import { getHelloMessage, getDirrectoryMessage } from "./constants/index.js";
import { inputResolver } from "./resolver/index.js";
import navigationService from "./services/NavigationService/index.js";
import outputService from "./services/OutputService/index.js";
import { getArgs } from "./helpers/getArgs.js";

try {
  const args = getArgs(process.argv);

  outputService.write({
    type: "log",
    data: [
      getHelloMessage(args.username),
      getDirrectoryMessage(navigationService.currentPath),
    ],
  });

  process.stdin.on("data", async (data = "") => {
    const formattedData = data.toString();
    try {
      const module = inputResolver(formattedData);
      const output = await module.init(
        formattedData,
        navigationService.currentPath
      );

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
      } else {
        outputService.write(output);
        outputService.write({
          type: "log",
          data: getDirrectoryMessage(navigationService.currentPath),
        });
      }
    } catch (err) {
      logger.error(err);
      outputService.write({
        type: "log",
        data: getDirrectoryMessage(navigationService.currentPath),
      });
    }
  });

  process.on("SIGINT", async (e) => {
    const triggerCommand = ".exit";
    const module = inputResolver(triggerCommand);
    const output = await module.init(triggerCommand);
    outputService.write(output);
  });

  process.stdin.on("error", (err) => {
    console.log("err", err);
  });

  process.stdin.resume();
} catch (err) {
  // console.log('err', err);
  logger.error(err);
}

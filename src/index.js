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
    data: getHelloMessage(args.username),
  });

  process.stdin.on("data", async (data = "") => {
    const formattedData = data.toString();

    try {
      const module = inputResolver(formattedData);
      const output = await module.init(formattedData);
      outputService.write(output);
    } catch (err) {
      const currentPath = navigationService.currentPath;
      logger.error(err);
      outputService.write({
        type: "log",
        data: getDirrectoryMessage(currentPath),
      });
    }
  });

  process.stdin.on("error", (err) => {
    console.log("err", err);
  });

  process.stdin.resume();
} catch (err) {
  // console.log('err', err);
  logger.error(err);
}

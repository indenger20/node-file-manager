import logger from "./logger/index.js";
import { inputResolver } from "./resolver/index.js";
import navigationService from "./services/NavigationService/index.js";
import outputService from "./services/OutputService/index.js";
try {
  process.stdin.on("data", async (data = "") => {
    const formattedData = data.toString();

    try {
      const module = inputResolver(formattedData);
      const output = await module.init(formattedData);
      outputService.write(output);
    } catch (err) {
      const currentPath = navigationService.currentPath;
      logger.error(err);
      outputService.write(currentPath);
    }
  });

  process.stdin.on("error", (err) => {
    console.log("err", err);
  });

  process.stdin.on("end", (data) => {
    console.log("end", data);
  });

  process.stdin.resume();
} catch (err) {
  // console.log('err', err);
  logger.error(err);
}

import logger from "./logger/index.js";
import { getHelloMessage, getDirrectoryMessage } from "./constants/index.js";
import navigationService from "./services/NavigationService/index.js";
import outputService from "./services/OutputService/index.js";
import { getArgs } from "./helpers/getArgs.js";
import { readline } from "./readline/index.js";

try {
  const args = getArgs(process.argv);

  if (args.username) {
    outputService.write({
      type: "log",
      data: [
        getHelloMessage(args.username),
        getDirrectoryMessage(navigationService.currentPath),
      ],
    });

    readline();
  } else {
    process.exit();
  }
} catch (err) {
  logger.error(err);
}

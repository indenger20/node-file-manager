import path from "path";
import { getInputBySeparator } from "../../helpers/getInputCommand.js";
import { createInvalidCommandError } from "../../constants/index.js";

export const getAndValidateFirstParameter = (input) => {
  const commandArray = getInputBySeparator(input, " ");
  const firstParameter = commandArray[1];

  if (commandArray.length !== 2) {
    createInvalidCommandError(input);
  }

  return firstParameter;
};

export const getAndValidateFirstAndSecondParameter = (input) => {
  const commandArray = getInputBySeparator(input, " ");
  const [_, firstParameter, secondParameter] = commandArray;

  if (commandArray.length !== 3) {
    createInvalidCommandError(input);
  }

  return {
    firstParameter,
    secondParameter,
  };
};

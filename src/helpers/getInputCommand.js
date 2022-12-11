import { createInvalidCommandError } from "../constants/index.js";

export const getInputCommand = (input = "") => {
  const formattedInput = input.trim();
  const command = formattedInput.split(" ")[0];

  return command;
};

export const getInputBySeparatorSpace = (input = "") => {
  const formattedInput = input.trim();
  const result = formattedInput
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    .map((parameter) => parameter.replace(/"|'/g, ""));
  return result;
};

export const getAndValidateFirstParameter = (input) => {
  const commandArray = getInputBySeparatorSpace(input);
  const firstParameter = commandArray[1];

  if (commandArray.length !== 2) {
    createInvalidCommandError(input);
  }

  return firstParameter;
};

export const getAndValidateFirstAndSecondParameter = (input) => {
  const commandArray = getInputBySeparatorSpace(input);
  const [_, firstParameter, secondParameter] = commandArray;

  if (commandArray.length !== 3) {
    createInvalidCommandError(input);
  }

  return {
    firstParameter,
    secondParameter,
  };
};

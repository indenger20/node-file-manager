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

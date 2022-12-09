export const getInputCommand = (input = "") => {
  const formattedInput = input.trim();
  const command = formattedInput.split(" ")[0];

  return command;
};

export const getInputBySeparator= (input = "", separator = ' ') => {
  const formattedInput = input.trim();
  const result = formattedInput.split(separator);

  return result;
};
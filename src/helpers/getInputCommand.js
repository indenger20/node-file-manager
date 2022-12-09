export const getInputCommand = (input = "") => {
  const formattedInput = input.trim();
  const command = formattedInput.split(" ")[0];

  return command;
};

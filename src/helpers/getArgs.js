export const getArgs = (args = []) => {
  const availabilityArguments = args.reduce((acc, current) => {
    if (current.startsWith("--")) {
      const key = current.replace("--", "").split("=");
      return {
        ...acc,
        [key[0]]: key[1],
      };
    }
    return acc;
  }, {});
  return availabilityArguments;
};

class OutputService {
  constructor() {}
  write({ data, type }) {
    if (type === "table") {
      console.table(data, ["Name", "Type"]);
      return;
    }
    console.log("OutputService:", data);
  }
}

export default new OutputService();

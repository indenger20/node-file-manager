class OutputService {
  constructor() {}
  write({ data, type }) {
    if (!data) return;

    if (type === "table") {
      console.table(data, ["Name", "Type"]);
      return;
    }

    if (Array.isArray(data)) {
      data.forEach((message) => {
        console.log(message + "\n");
      });
      return;
    }

    console.log(data + "\n");
  }
}

export default new OutputService();

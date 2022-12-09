class OutputService {
  constructor() {}
  write({ data, type }) {
    if (!data) return;
    
    if (type === "table") {
      console.table(data, ["Name", "Type"]);
      return;
    }
    console.log(data);
  }
}

export default new OutputService();

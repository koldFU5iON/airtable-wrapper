import TableWrapper from "./TableWrapper.js";

class Airtable {
  constructor(baseID, apiKey) {
    this._apiKey = apiKey;
    this._id = baseID;
    this._endPoint = `https://api.airtable.com/v0/`;
  }
  
  getTable = (tableID) => {
    if (!tableID.startsWith("tbl")) {
      throw new Error("Invalid table ID. The table ID must start with 'tbl'.");
    }
    const table = new TableWrapper(tableID);
    return table;
  };
  

  get id() {
    return this._id;
  };

  get apiKey() {
    return this._apiKey;
  };

  get endPoint() {
    return this._endPoint;
  };
}

export default Airtable;

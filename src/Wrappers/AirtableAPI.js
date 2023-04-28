import fetch from "node-fetch";
import TableWrapper from "./TableWrapper.js";

class Airtable {
  constructor(baseID, apiKey) {
    this._apiKey = apiKey;
    this._id = baseID;
    this._endPoint = `https://api.airtable.com/v0/`;
  }

  _fetchData = async (params, offset = null) => {
    let url = `${this.endPoint}${this.id}/${params}`;
    let queryParams = new URLSearchParams();
  
    if (offset) {
      queryParams.append("offset", offset);
    }
  
    // Set the pageSize if needed (default is 100)
    // queryParams.append("pageSize", 100);
  
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
    const data = await response.json();
  
    // Check if there's an offset in the response, indicating more pages of data
    if (data.offset) {
      // Fetch the next page and concatenate the records
      const nextPageData = await this._fetchData(params, data.offset);
      data.records = data.records.concat(nextPageData.records);
    }
    return data;
  };  

  getTable = (tableID) => {
    if (!tableID.startsWith("tbl")) {
      throw new Error("Invalid table ID");
    }
    const table = new TableWrapper(tableID, this._fetchData.bind(this));
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

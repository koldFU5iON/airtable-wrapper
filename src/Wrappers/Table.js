import Record from "./Record.js";
import { fetchData } from "../util/fetch.js";

class Table {
  constructor(IDs) {
    const { baseID, tableID, apiKey } = IDs;
    this._tableId = tableID;
    this._baseId = baseID;
    this._apiKey = apiKey;
    this._allRecords = [];
  }

  get id() {
    return this._tableId;
  }

  async _loadTable() {
    this._allRecords = await fetchData({
      baseID: this._baseId,
      tableID: this._tableId,
      apiKey: this._apiKey,
    });
    return this._allRecords.records;
  }

  async _getRecords() {
    if (!this._allRecords.length) {
      this._allRecords = await this._loadTable();
    }
    return this._allRecords.map((record) => record);
  }

  selectRecordAsync = async (record) => {
    if (!this._allRecords) throw new Error("No records loaded");

    try {
      const findRecord = await this._allRecords.find((r) => r.id === record);
      if (findRecord) return new Record(findRecord);
      throw new Error("Record not found");
    } catch (e) {
      return e;
    }
  };

  selectRecordsAsync = async (fields) => {
    if (!this._allRecords.length) await this._getRecords();

    // if(fields){
    //   const filteredRecords = 
    // }

    const formattedRecords = this._allRecords.map((record) => {
      
      const formatRecord =  {
        recordIds: {
          id: record.id,
        },
        records: {
          id: record.id,
          name: Object.keys(record.fields)[0],
          // fields: record.fields,
        },
      };

      // fields ? formatRecord.records.fields[fields] : null;

      return formatRecord;

    });

    return formattedRecords;
  };
}

export default Table;

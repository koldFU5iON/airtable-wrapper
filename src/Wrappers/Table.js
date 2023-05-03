import Record from "./Record.js";
import { fetchData } from "../util/fetch.js";

class Table {
  constructor(IDs) {
    const { baseID, tableID, apiKey } = IDs;
    this._tableId = tableID;
    this._baseId = baseID;
    this._recordId = null;
    this._apiKey = apiKey;
    this._records = [];
    this._fields = [];
  }

  get id() {
    return this._tableId;
  }

  _loadTable = async () => {
    this._records = await fetchData({
      baseID: this._baseId,
      tableID: this._tableId,
      recordID: this._record,
      apiKey: this._apiKey,
      fields: this._fields,
    });
    return this._records.records;
  }

  _getRecords = async () =>{
    if (!this._records.length) {
      this._records = await this._loadTable();
    }
    this._fields = Object.keys(this._records[0].fields);
    return this._records.map((record) => record);
  }

  selectRecordsAsync = async (fields) => {
    fields ? (this._fields = fields.fields) : null;

    if (this._records.length) await this._getRecords();

    return this._records.map((record) => {
      return {
        recordIds: {
          id: record.id,
        },
        records: {
          id: record.id,
          name: Object.keys(record.fields)[0],
          fields: record.fields,
        },
      };
    });
  };

  selectRecordAsync = async (id) => {
    // error handling
    if(!id || typeof id === 'number') throw new Error("Record ID is not valid")
    if(!this._records.length) await this._getRecords();
    this._recordId = id;

    // search for record
    const record = this._records.find((record) => record.id === id);
    if(!record) throw new Error(`Record, ${id} not found`);

    return new Record(record, this._fields);
  };
}

export default Table;

import Record from "./Record.js";
import { fetchData } from "../util/fetch.js";

class Table {
  constructor(IDs) {
    const { baseID, tableID, apiKey } = IDs;
    this._tableId = tableID;
    this._baseId = baseID;
    this._apiKey = apiKey;
    this._record = null;
    this._records = [];
    this._fields = [];
  }

  get id() {
    return this._tableId;
  }

  async _loadTable() {
    this._records = await fetchData({
      baseID: this._baseId,
      tableID: this._tableId,
      recordID: this._record,
      apiKey: this._apiKey,
      fields: this._fields,
    });
    return this._records.records;
  }

  async _getRecords() {
    if (!this._records.length) {
      this._records = await this._loadTable();
    }
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

  selectRecordAsync = async (record) => {
    if(!record) throw new Error("Record ID is required")
    return new Record(record, this._fields);

  };
}

export default Table;

import Record from "./Record.js";
import { fetchData } from "../util/fetch.js";

class Table {
  constructor(IDs) {
    const { baseID, tableID, apiKey } = IDs;
    this._tableId = tableID;
    this._baseId = baseID;
    this._apiKey = apiKey;
    this._records = [];
  }

  get id() {
    return this._tableId;
  }

  async _loadTable() {
    this._records = await fetchData({
      baseID: this._baseId,
      tableID: this._tableId,
      apiKey: this._apiKey,
    });
    return this._records;
  }

  async _getRecords() {
    if (!this._records.length) {
      this._records = await this._loadTable();
    }
    return this._records.records.map((record) => record);
  }

  selectRecordAsync = async (record) => {
    if (!this._records) throw new Error("No records loaded");

    try {
      const findRecord = await this._records.find((r) => r.id === record);
      if (findRecord) return new Record(findRecord);
      throw new Error("Record not found");
    } catch (e) {
      return e;
    }
  };

  selectRecordsAsync = async (fields) => {
    if (!this._records.length) await this._getRecords();

    return this._records.map((record) => {
      const selectedFields = {};

      fields.forEach((field) => {
        selectedFields[field] = record.fields[field];
      });

      return {
        recordIds: {
          id: record.id,
        },
        records: {
          id: record.id,
          name: Object.keys(record.fields)[0],
          fields: selectedFields,
        },
      };
    });
  };
}

export default Table;

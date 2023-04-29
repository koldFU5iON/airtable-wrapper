import Record from "./Record.js";
import { fetchData } from "../util/fetch.js";

class Table {
  /**
   * Table Class for Interacting with an Airtable Table
   *
   * @class
   * @classdesc This class provides a convenient interface for interacting with an Airtable table.
   * @param {Object} IDs - The IDs for the table and base.
   * @param {string} IDs.baseID - The ID of the Airtable base.
   * @param {string} IDs.tableID - The ID of the table.
   * @param {string} IDs.apiKey - The API key for accessing the Airtable base.
   */
  constructor(IDs) {
    const { baseID, tableID, apiKey } = IDs;
    this._tableId = tableID;
    this._baseId = baseID;
    this._apiKey = apiKey;
    this._records = [];
  }

  /**
   * Get the ID of the table.
   *
   * @type {string}
   * @readonly
   */
  get id() {
    return this._tableId;
  }

  /**
   * Load the table data asynchronously.
   *
   * @private
   * @returns {Promise<void>} A Promise that resolves when the table data is loaded.
   */
  async _loadTable() {
    this._table = await fetchData({
      endPoint: "your_end_point",
      params: this._tableId,
      apiKey: this._apiKey,
    });
  }

  /**
   * Get the records of the table.
   *
   * @private
   * @returns {Promise<Array>} A Promise that resolves to an array of table records.
   */
  async _getRecords() {
    if (!this._records.length) {
      const records = await fetchData({
        endPoint: "your_end_point",
        params: this._tableId,
        apiKey: this._apiKey,
      });
      this._records = records.records.map((record) => record);
    }

    return this._records;
  }

  /**
   * Select a specific record asynchronously.
   *
   * @param {string} record - The ID of the record to select.
   * @returns {Promise<Record|Error>} A Promise that resolves to a Record instance representing the selected record, or throws an Error if the record is not found.
   */
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

  /**
   * Select multiple records asynchronously.
   *
   * @param {Array<string>} fields - An array of field names to include in the response.
   * @returns {Promise<Array<Object>>} A Promise that resolves to an array of selected records.
   */
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

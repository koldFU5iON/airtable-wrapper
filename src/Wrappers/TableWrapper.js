import RecordWrapper from "./RecordWrapper.js";

class TableWrapper {
  constructor(tableID, fetchData) {
    this._tableId = tableID;
    this._records = [];
    this._fetchData = fetchData;
    // this._fields = null;
  }

  // Add a new async method to load the table data when needed
  async _loadTable() {
    this._table = await this._fetchData(this._tableId);
  }

  get id() {
    return this._tableId;
  }

  async _getRecords() {
    if (!this._records.length) {
      const records = await this._fetchData(this._tableId);
      this._records = records.records.map(record => record);
    }

    return this._records;
  }
  

  selectRecordAsync = async (record) => {
    if (!this.records) throw new Error("No records loaded");
    const findRecord = this.records.find(r => r.id === record.id);
    return new RecordWrapper(findRecord);
  };

  selectRecordsAsync = async (options) => {
    if(!this._records.length) await this._getRecords();

    const fields = {fields: options}; // select specific fields;
    return this._records.map(record => ({
        recordIds: {
            id: record.id
        },
        records: {
            id: record.id,
            name: Object.keys(record.fields)[0],
            // fields: record.fields
        }
    }));
  };

  updateRecordAsync = async (record, data) => {
    // update a record
  };

  updateRecordsAsync = async (records, data) => {
    // update all records
  };

  createRecordAsync = async (data) => {
    // create a record
  };

  createRecordsAsync = async (data) => {
    // create all records
  };
}

export default TableWrapper;

import RecordWrapper from "./RecordWrapper.js";

class TableWrapper {
  constructor(tableID, fetchData) {
    this._id = tableID;
    this._records = [];
    this._fetchData = fetchData;
    // this._fields = null;
  }

  // Add a new async method to load the table data when needed
  async _loadTable() {
    this._table = await this._fetchData(this._id);
  }

  get id() {
    return this._id;
  }

  get records() {
    return this._records;
  }

  selectRecordAsync = async (record) => {
    if (!this.records) throw new Error("No records loaded");
    const findRecord = this.records.find(r => r.id === record.id);
    return new RecordWrapper(findRecord);
  };

  selectRecordsAsync = async (options) => {
    // select all records
    const records = await this._fetchData(this._id);
    this._records = records.records.map(record => record);
    return this._records;
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

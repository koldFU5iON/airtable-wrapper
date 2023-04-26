import BaseWrapper from './BaseWrapper';

// TableWrapper is a wrapper around the Airtable Table object
class TableWrapper extends BaseWrapper {
    constructor(base, table) {
      super(base);
      this.table = table;
      this._records = [];
    }
  
    get records() {
      return this._records
        ? this._records.map((record) => ({ id: record.record.id }))
        : [];
    }
  
    selectRecordAsync = async (record) => {
      if (!this.table) throw new Error("Table not loaded");
      try {
        const recordObj = await this.table.find(record);
        return new RecordWrapper(recordObj);
      } catch (e) {
        console.error(
          `Unable to retrieve records from ${this.table} : ${e.message}`
        );
      }
    };
  
    selectRecordsAsync = (options) => {
      const fields = options.fields || [];
      return new Promise((resolve, reject) => {
        this.table.select(options).eachPage(
          (records, fetchNextPage) => {
            records.forEach((record) => {
              const recordWrapper = new RecordWrapper(record, fields);
              // console.log(recordWrapper);
              this._records.push(recordWrapper);
            });
            fetchNextPage();
          },
          (err) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(this._records);
            }
          }
        );
      });
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
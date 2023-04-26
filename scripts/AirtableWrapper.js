import Airtable from "airtable";

// BaseWrapper is a wrapper around the Airtable Base object
class BaseWrapper {
  constructor(base) {
    this.base = base;
    this._id = base.getId();
    this._name = base.name;
  }

  getTable = (table) => {
    try {
      const tableObj = this.base.table(table);
      console.log(`Successfully loaded ${tableObj.name}`);
      return new TableWrapper(this.base, tableObj); // Return a new Table instance with the selected table
    } catch (e) {
      console.error(`Couldn't load table ${table} : ${e.message}`);
    }
  };

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }
}

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

// RecordWrapper is a wrapper around the Airtable Record object
class RecordWrapper {
  constructor(record, fields = null) {
    this.record = record;
    this.fields = fields;
  }

  getCellValue(field) {
    if (this.fields === null || this.fields.includes(field)) {
      return this.record.get(field);
    }
    return null;
  }

  getCellValueAsString(field) {
    const value = this.getCellValue(field);
    return value !== null && value !== undefined ? String(value) : "";
  }
}


/**
 * Creates a wrapped Airtable base instance for interacting with the Airtable API.
 * 
 * @param {string} baseID - The unique identifier of the Airtable base.
 * @param {string} apiKey - The API key for authenticating with the Airtable API.
 * @returns {BaseWrapper} A wrapped Airtable base instance for making API requests.
 * 
 * @example
 * const myBaseID = 'appXXXXXXXXXXXXXX';
 * const myApiKey = 'keyXXXXXXXXXXXXXX';
 * const myAirtableBase = airtableBase(myBaseID, myApiKey);
 */
export const airtableBase = (baseID, apiKey) => {
  const loadBase = new Airtable({
    apiKey: apiKey,
  }).base(baseID);
  const base = new BaseWrapper(loadBase);
  return base;
};



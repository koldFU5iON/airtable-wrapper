// Record is a wrapper around the Airtable Record object
class Record {
  constructor(record, fields) {
    this.record = record;
    this.fields = fields;
  }

  getCellValue(field) {
    // error handling
    if (!field || field === null) throw new Error(`Field required`);
    if (!this.fields.some((f) => f === field)) {
      throw new Error(`Field, ${field} not found`);
    }
        
    // return value
    return this.record.fields[field];
  }

  getCellValueAsString(field) {
    const value = this.getCellValue(field);
    return value !== null && value !== undefined ? String(value) : "";
  }
}

export default Record;

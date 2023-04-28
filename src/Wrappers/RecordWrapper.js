// RecordWrapper is a wrapper around the Airtable Record object
class RecordWrapper {
  constructor(record, fields = null) {
    this.record = record;
    this.fields = fields;
  }

  getCellValue(field) {
    if (!field) {
      throw new Error(`Field ${field} not found`);
    }
    
    const value = this.record.fields[field];
    
    if (value === undefined) {
      throw new Error(`Field ${field} not found`);
    }
    
    return value;
  }
  

  getCellValueAsString(field) {
    const value = this.getCellValue(field);
    return value !== null && value !== undefined ? String(value) : "";
  }
}

export default RecordWrapper;
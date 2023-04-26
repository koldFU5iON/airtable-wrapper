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

export default RecordWrapper;
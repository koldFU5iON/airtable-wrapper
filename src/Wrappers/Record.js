/**
 * Represents a wrapper around the Airtable Record object.
 */
class Record {
  /**
   * Creates an instance of Record.
   * @param {Airtable.Record} record - The Airtable Record object.
   * @param {Array<string>} fields - The list of available fields.
   */
  constructor(record, fields) {
    this.record = record;
    this.fields = fields;
  }

  /**
   * Retrieves the cell value for a given field.
   * @param {string} field - The field name.
   * @throws {Error} If the field is required, or if the field is not found.
   * @returns {*} The cell value.
   */
  getCellValue(field) {
    // error handling
    if (!field || field === null) throw new Error(`Field required`);
    if (!this.fields.some((f) => f === field)) {
      throw new Error(`Field, ${field} not found`);
    }

    // return value
    return this.record.fields[field];
  }

  /**
   * Retrieves the cell value as a string for a given field.
   * @param {string} field - The field name.
   * @throws {Error} If the field is required, or if the field is not found.
   * @returns {string} The cell value as a string, or an empty string if null or undefined.
   */
  getCellValueAsString(field) {
    // error handling
    if (!field || field === null) throw new Error(`Field required`);
    if (!this.fields.some((f) => f === field)) {
      throw new Error(`Field, ${field} not found`);
    }
    const value = this.getCellValue(field);
    return value !== null && value !== undefined ? String(value) : "";
  }
}

export default Record;

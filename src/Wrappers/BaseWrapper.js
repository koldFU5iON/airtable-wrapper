/**
 * BaseWrapper is a wrapper around the Airtable Base object that simplifies interactions
 * with the Airtable API and provides convenient access to base properties.
 */
class BaseWrapper {
    /**
     * Constructs a new BaseWrapper instance.
     *
     * @param {Object} base - The Airtable Base object.
     */
    constructor(base) {
      this.base = base;
      this._id = base.getId();
      this._name = base.name;
    }
  
    /**
     * Retrieves a table from the base and returns a wrapped TableWrapper instance.
     *
     * @param {string} table - The name of the table to retrieve.
     * @returns {TableWrapper} A new TableWrapper instance with the selected table.
     * @throws Will throw an error if the table could not be loaded.
     */
    getTable = (table) => {
      try {
        const tableObj = this.base.table(table);
        console.log(`Successfully loaded ${tableObj.name}`);
        return new TableWrapper(this.base, tableObj);
      } catch (e) {
        console.error(`Couldn't load table ${table} : ${e.message}`);
      }
    };
  
    /**
     * Getter for the name property of the base.
     *
     * @returns {string} The name of the base.
     */
    get name() {
      return this._name;
    }
  
    /**
     * Getter for the ID property of the base.
     *
     * @returns {string} The ID of the base.
     */
    get id() {
      return this._id;
    }
  }

  export default BaseWrapper;
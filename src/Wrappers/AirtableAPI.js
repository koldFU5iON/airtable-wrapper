import TableWrapper from "./TableWrapper.js";

/**
 * Airtable Class for Interacting with the Airtable API
 *
 * @class
 * @classdesc This class provides a convenient interface for interacting with the Airtable API.
 * @example
 * // Import the Airtable class
 * import Airtable from "./Airtable.js";
 *
 * // Create an instance of Airtable
 * const baseID = "your_airtable_base_id";
 * const apiKey = "your_airtable_api_key";
 * const airtable = new Airtable(baseID, apiKey);
 *
 * // Get a TableWrapper instance for a specific table
 * const tableID = "tblYourTableID";
 * const table = airtable.getTable(tableID);
 *
 * // Fetch data from the table
 * const records = await table.fetchRecords();
 * console.log(records);
 */
class Airtable {
  /**
   * Create an instance of the Airtable class.
   *
   * @constructor
   * @param {string} baseID - The ID of the Airtable base.
   * @param {string} apiKey - The API key for accessing the Airtable base.
   */
  constructor(baseID, apiKey) {
    this._apiKey = apiKey;
    this._id = baseID;
  }

  /**
   * Get a TableWrapper instance for a specific table.
   *
   * @param {string} tableID - The ID of the table. Must start with "tbl".
   * @throws {Error} Throws an error if the tableID is invalid.
   * @returns {TableWrapper} The TableWrapper instance for the specified table.
   */
  getTable = (tableID) => {
    if (!tableID.startsWith("tbl")) {
      throw new Error("Invalid table ID. The table ID must start with 'tbl'.");
    }
    const table = new TableWrapper(tableID);
    return table;
  };

  /**
   * Get the base ID.
   *
   * @type {string}
   * @readonly
   */
  get id() {
    return this._id;
  }

  /**
   * Get the API key.
   *
   * @type {string}
   * @readonly
   */
  get apiKey() {
    return this._apiKey;
  }

  /**
   * Get the endpoint URL for the Airtable API.
   *
   * @type {string}
   * @readonly
   */
  get endPoint() {
    return this._endPoint;
  }
}

export default Airtable;

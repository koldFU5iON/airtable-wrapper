import { expect } from "chai";

import * as dotenv from "dotenv"; dotenv.config();

// test files
import { fetchData } from "../src/util/fetch.js";
import { airtable } from "../main.js";

// test parameters
const baseID = "appjRThvK61bQlzb1";
const tableID = "tblD4xpWutzTKas3r";

// global variables
let base = {};
let table = {};

describe("Fetch Data", function () {
  this.timeout(10000); // Set the timeout to 10000ms

  it("should return the table object", async function () {
    const data = await fetchData({
      baseID: baseID,
      tableID: tableID,
      apiKey: process.env.AIRTABLE_API_KEY,
    });
    expect(data).to.be.an("object");
    expect(data).to.have.property("records");
  });
});

// test the API key works correctly and I recieve a response form the AirtableWrapper
describe("Base Functionality", () => {
  it("should return a base object", () => {
    base = airtable(baseID, process.env.AIRTABLE_API_KEY);
    expect(base).to.be.an("object");
  });

  it("should return a table object", async () => {
    table = await base.getTable(tableID);
    expect(table).to.be.an("object");
  });
});





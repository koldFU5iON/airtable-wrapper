import { expect } from "chai";
import * as dotenv from "dotenv";
import RecordWrapper from "../src/Wrappers/RecordWrapper.js";
dotenv.config();
import { airtable } from "../src/main.js";

// test parameters
const baseID = "appjRThvK61bQlzb1"; 
const tableID = 'tblD4xpWutzTKas3r';

// global variables
let base = {};
let table = {};

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

describe("Table Functionality", function () {
  this.timeout(10000); // Set the timeout to 5000ms

  it("Should return the table id", () => {
    expect(table.id).to.equal(tableID);
  });

  it("Should return an array of records", async () => {
    try {
      const records = await table.getRecords();
      expect(records).to.be.an("array");
      expect(records[0]).to.be.an('object');
    } catch (error) {
      throw error;
    }
  });

  it("Should selectRecordAsync", async () => {
    try {
      const records = await table.selectRecordsAsync();
      const record = await table.selectRecordAsync(records[0].id);
      expect(record).to.be.an.instanceOf(RecordWrapper);
    } catch (error) {
      throw error;
    }
  });  
});


describe("Record Functionality", () => {


});
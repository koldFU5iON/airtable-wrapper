import { expect } from "chai";
import * as dotenv from "dotenv";
dotenv.config();
import RecordWrapper from "../src/Wrappers/RecordWrapper.js";
import { airtable } from "../src/main.js";

// test parameters
const baseID = "appjRThvK61bQlzb1";
const tableID = "tblD4xpWutzTKas3r";
const testRecord = 'recCSVi5noFord2UJ'

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

  describe("Methods", () => {
    describe("_getRecords()", () => {
      it("Should return an array of records with _getRecords", async () => {
        try {
          const records = await table._getRecords();
          expect(records).to.be.an("array");
        } catch (error) {
          throw error;
        }
      });

      it("Each item in the array should contain an object", async () => {
        try {
          const records = await table._getRecords();
          expect(records[0]).to.be.an("object");
        } catch (error) {
          throw error;
        }
      });

      it("Should use existing array of records if available", async () => {
        expect(table._records).to.be.an("array");
        expect(table._records.length).to.be.greaterThan(0);
      });
    });
    
    describe("selectRecordsAsync(options)", () => {
      
      it("Should return an array of objects", async () => {
        try {
          const records = await table.selectRecordsAsync();
          expect(records).to.be.an("array");
          expect(records[0]).to.be.an("object")
        } catch (error) {
          throw error;
        }
      });
      
      it("Should have a property called records", async () => {
        try {
          const records = await table.selectRecordsAsync();
          expect(records[0]).to.have.property("records");
        } catch (error) {
          throw error;
        }
      });
    });

    describe("selectRecordAsync(record)", () => {
      it("Should return a record object", async () => {
        try {
          const record = await table.selectRecordAsync(testRecord);
          expect(record).to.be.an("object");
        } catch (error) {
          throw error;
        }
      });

      it("Should return a record object with a property called fields", async () => {
        try {
          const record = await table.selectRecordAsync(testRecord);
          expect(record).to.have.property("fields");
        } catch (error) {
          throw error;
        }
      });

      it("Should throw an error if the record does not exist", async () => {
        try {
          await table.selectRecordAsync("rec123456789");
      
          // If the error is not thrown, fail the test
          throw new Error("Expected an error to be thrown");
        } catch (error) {
          expect(error).to.be.an("error");
          // Optionally, assert the error message or other details if needed
        }
      });

      it("Should return a value from the field 'Company'", async () => {
        try {
          const record = await table.selectRecordAsync(testRecord);
          expect(record.getCellValue('Product')).to.be.a("string");
          expect(record.getCellValue('Product')).to.equal("Xerox 1980");
        } catch (error) {
          throw error;
        }
      });
    });
  });
});

describe("Record Functionality", () => {});

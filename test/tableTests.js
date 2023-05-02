import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import * as dotenv from "dotenv"; dotenv.config();

// test files
import { fetchData } from "../src/util/fetch.js";
import { airtable } from "../main.js";

// global variables
import { base, table, baseID, tableID, testRecord } from "./test.js";

chai.use(chaiAsPromised)

describe("Table Functionality", function () {
    this.timeout(20000); // Set the timeout to 5000ms
  
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
        });
      });
  
      describe("selectRecordsAsync(options)", () => {
  
        it("Should return an array of objects", async () => {
          try {
            const records = await table.selectRecordsAsync();
            expect(records).to.be.an("array");
            // expect(records[0]).to.be.an("object")
          } catch (error) {
            throw error;
          }
        });
  
        it("Should return include of objects", async () => {
          try {
            const records = await table.selectRecordsAsync();
            expect(records[0]).to.be.an("object");
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
  
        it('should throw an error if no record is given', async () => {
          const table = new Table();
          await expect(table.selectRecordAsync()).to.be.rejectedWith(Error, 'Record ID is required');
        });
  
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
  
        it("Should adding fields to the _fields variable in the table class", async () => {
          try {
            await table.selectRecordsAsync({
              fields: ["Product"],
            });
            expect(table._fields).to.be.an("array");
            expect(table._fields[0]).to.be.a("string");
            expect(table._fields).to.contain("Product");
          } catch (error) {
            throw error;
          }
        });
      });
    });
  });
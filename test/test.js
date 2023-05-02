import { expect } from "chai";
import * as dotenv from "dotenv"; dotenv.config();

// test files
import { fetchData } from "../src/util/fetch.js";
import { airtable } from "../main.js";

// test parameters
const baseID = "appjRThvK61bQlzb1";
const tableID = "tblD4xpWutzTKas3r";
const testRecord = 'recCSVi5noFord2UJ'

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
    expect(data).to.have.property('records');
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

    });
  });
});

// describe("Record Functionality", () => {
//   describe("Methods", () => {
    
//     it("Should return a value from the field 'Product'", async () => {
//       try {
//         const record = await table.selectRecordAsync(testRecord);
//         expect(record.getCellValue('Product')).to.be.a("string");
//         expect(record.getCellValue('Product')).to.equal("Xerox 1980");
//       } catch (error) {
//         throw error;
//       }
//     });

//     it("Should throw an error if a field is not found", async () => {
//       const record = new Record(testRecord);
//       const getCellValueBound = record.getCellValue.bind(record);
//       expect(getCellValueBound).to.throw();
//     });

//     it("Should return an object for a single select field", async () => {
//       // test with 'Category' field as it's a single select
//       try {
//         const record = await table.selectRecordAsync(testRecord);
//         console.log(record);
//         expect(record.getCellValue('Category')).to.be.an("object");
//       } catch (error) {
//         throw error;
//       };
//     });
    
//     it("Should return a value from getCellValueAsString as a string", async () => {
//       // test with 'Category' field as it's a single select
//       try {
//         const record = await table.selectRecordAsync(testRecord);
//         expect(record.getCellValueAsString('Category')).to.be.a("string");
//       } catch (error) {
//         throw error;
//       };
//     });
    
    
    
//   });
// });

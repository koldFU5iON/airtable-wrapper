import { expect } from "chai";
import * as dotenv from "dotenv"; dotenv.config();

// test parameters
const baseID = "appjRThvK61bQlzb1";
const tableID = "tblD4xpWutzTKas3r";
const testRecord = "recCSVi5noFord2UJ";

// global variables
let table = {};


describe("Record Functionality", () => {
    describe("Methods", () => {
  
      it("Should return a method .getCellValue", async () => {
        const record = await table.selectRecordAsync(testRecord);
        expect(record.getCellValue).to.be.a("function");
      });
  
      it("Should return a value from the field 'Product', Xerox 1980", async () => {
        try {
          const record = await table.selectRecordAsync(testRecord);
          expect(record.getCellValue("Product")).to.be.a("string");
          expect(record.getCellValue("Product")).to.equal("Xerox 1980");
        } catch (error) {
          throw error;
        }
      });
  
      // it("Should throw an error if a field is not found", async () => {
      //   const record = table.selectRecordAsync(testRecord);
      //   const value = record.getCellValue('Bad Field');
      //   expect(record).to.be.an("object");
      //   expect(value).to.throw();
  
      // });
  
      // it("Should return an object for a single select field", async () => {
      //   // test with 'Category' field as it's a single select
      //   try {
      //     const record = await table.selectRecordAsync(testRecord);
      //     expect(record.getCellValue('Category')).to.be.an("object");
      //   } catch (error) {
      //     throw error;
      //   };
      // });
  
      // it("Should return a value from getCellValueAsString as a string", async () => {
      //   // test with 'Category' field as it's a single select
      //   try {
      //     const record = await table.selectRecordAsync(testRecord);
      //     expect(record.getCellValueAsString('Category')).to.be.a("string");
      //   } catch (error) {
      //     throw error;
      //   };
      // });
    });
  });
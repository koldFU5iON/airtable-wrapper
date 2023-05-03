import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
dotenv.config();

// global variables
import { table, testRecord } from "./test.js";

chai.use(chaiAsPromised);

describe("Record Functionality", function () {
  this.timeout(10000); // Set the timeout to 10000ms

  describe("Methods", () => {
    // getCellValue()
    describe("getCellValue()", () => {
      it("Should return a method .getCellValue", async () => {
        const record = await table.selectRecordAsync(testRecord);
        expect(record.getCellValue).to.be.a("function");
      });

      it("Should throw an error if a field is not valid", async () => {
        const record = await table.selectRecordAsync(testRecord);
        expect(() => record.getCellValue()).to.throw(Error, "Field required");
      });

      it("Should throw an error if a field is not found", async () => {
        const record = await table.selectRecordAsync(testRecord);
        await expect(() => record.getCellValue("Bad Field")).to.throw(
          Error,
          "Field, Bad Field not found"
        );
      });

      it("Should return an object for a single select field", async () => {
        const record = await table.selectRecordAsync(testRecord);
        const cellValue = record.getCellValue("Product");
        expect(cellValue).to.be.an("object");
      });

      it("Should return a value from the field 'Product', Xerox 1980", async () => {
        const record = await table.selectRecordAsync(testRecord);
        expect(record.getCellValue("Product")).to.be.a("string");
        expect(record.getCellValue("Product")).to.equal("Xerox 1980");
      });
    });
    // getCellValueAsString()
    describe("getCellValueAsString()", () => {
      it("Should return a method .getCellValueAsString", async () => {
        const record = await table.selectRecordAsync(testRecord);
        expect(record.getCellValueAsString).to.be.a("function");
      });

      it("Should throw an error if a field is not valid", async () => {
        const record = await table.selectRecordAsync(testRecord);
        expect(() => record.getCellValueAsString()).to.throw(
          Error,
          "Field required"
        );
      });

      it("Should throw an error if a field is not found", async () => {
        const record = await table.selectRecordAsync(testRecord);
        await expect(() => record.getCellValueAsString("Bad Field")).to.throw(
          Error,
          "Field, Bad Field not found"
        );
      });

      it("Should always return a string value", async () => {
        const record = await table.selectRecordAsync(testRecord);
        const cellValue = record.getCellValueAsString("Product");
        expect(cellValue).to.be.a("string");
      });

      it("Should return a value from the field 'Product', Xerox 1980", async () => {
        const record = await table.selectRecordAsync(testRecord);
        expect(record.getCellValueAsString("Product")).to.be.a("string");
        expect(record.getCellValueAsString("Product")).to.equal("Xerox 1980");
      });
    });
  });
});

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
dotenv.config();

// global variables
import { table, testRecord } from "./test.js";

chai.use(chaiAsPromised);

describe("Table Functionality", function () {
  this.timeout(10000); // Set the timeout to 10000ms

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

    describe("selectRecordsAsync(fields)", () => {
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
      it("should throw an error if no record is given", async () => {
        await expect(table.selectRecordAsync()).to.be.rejectedWith(
          Error,
          "Record ID is not valid"
        );
      });

      it("Should return a record object", async () => {
        const record = await table.selectRecordAsync(testRecord);
        expect(record).to.be.an("object");
      });

      it("Should return a record object with a property called fields", async () => {
        const record = await table.selectRecordAsync(testRecord);
        expect(record).to.have.property("fields");
      });

      it("Should throw an error if the record does not exist", async () => {
        await expect(table.selectRecordAsync("rec123456789")).to.eventually.be.rejectedWith(
          Error,
          "Record, rec123456789 not found"
        );
      });

      it("Should adding fields to the _fields variable in the table class", async () => {
        await table.selectRecordsAsync({ fields: ["Product"] });
        expect(table._fields).to.be.an("array");
        expect(table._fields[0]).to.be.a("string");
        expect(table._fields).to.contain("Product");
      });
    });
  });
});

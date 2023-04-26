import { expect } from "chai";
import * as dotenv from "dotenv";
dotenv.config();
import { airtableBase } from "../src/main.js";


const baseID = "appX8bN5InXaMteca"; // need to change to a test base
const base = airtableBase(baseID, process.env.AIRTABLE_API_KEY);

// test the API key works correctly and I recieve a response form the AirtableWrapper
describe("Base Functionality", () => {
  describe("Connect to Base", () => {

    it("Should check that the BaseID is valid", () => {
      expect(() => airtableBase('baseID', process.env.AIRTABLE_API_KEY)).to.throw("Invalid base ID");
    });

    it("Should check that the API key is valid", () => {
      expect(() => airtableBase(baseID,'Invalid ApiKey')).to.throw();
    });

    it("Should return a base object", () => {
      expect(base).to.be.an("object");
    });

    it("Should return a base object with a name property", () => {
      expect(base).to.have.property("name");
    });

    it("Should return the id of the base called", () => {
      expect(base.id).to.equal("tbl0XbaLEnIZAlABf");
    });

    it("Should return the name of the base called", () => {
      expect(base.name).to.equal("Coverage Tracker 2.0");
    });

  });
});

describe("Table Functionality", () => {
  describe("Get Table Object", () => {
    it("Should return a table object", () => {
      const table = base.getTable("Coverage");
      expect(table).to.be.an("object");
    });

    it("Should return a table object with a name property", () => {
      const table = base.getTable("Coverage");
      expect(table).to.have.property("name");
    });

    it("Should return the id of the table called", () => {
      const table = base.getTable("Coverage");
      expect(table.id).to.equal("tbl0XbaLEnIZAlABf");
    });
  });
});

describe("Record Functionality", () => {});
import { expect } from "chai";
import * as dotenv from "dotenv";
dotenv.config();
import { airtableBase } from "../scripts/AirtableWrapper.js";

const baseID = "tbl0XbaLEnIZAlABf"; // need to change to a test base
const base = airtableBase(baseID, process.env.AIRTABLE_API_KEY);

// test the API key works correctly and I recieve a response form the AirtableWrapper
describe("AirtableWrapper Base Functionality", () => {
  describe("Connect to Base", () => {
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

import { expect } from 'chai';
import * as dotenv from 'dotenv'; dotenv.config()
import { airtableBase } from '../scripts/AirtableWrapper.js';

const baseID = 'tbl0XbaLEnIZAlABf' // need to change to a test base
const base = airtableBase(baseID, process.env.AIRTABLE_API_KEY);

describe('testing tests', () => {
  it('should return true', () => {
    expect(true).to.equal(true);
  });
});

// test the API key works correctly and I recieve a response form the AirtableWrapper
describe('AirtableWrapper Functionality', () => {

  describe('Connect to Base', () => {
    it('Should return a base object', () => {
      expect(base).to.be.an('object');
    });
  });


});

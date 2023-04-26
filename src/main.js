import Airtable from "airtable";
import {fetch} from "node-fetch";
import BaseWrapper from "./Wrappers/BaseWrapper.js";


/**
 * Creates a wrapped Airtable base instance for interacting with the Airtable API.
 *
 * @param {string} baseID - The unique identifier of the Airtable base.
 * @param {string} apiKey - The API key for authenticating with the Airtable API.
 * @returns {BaseWrapper} A wrapped Airtable base instance for making API requests.
 *
 * @example
 * const myBaseID = 'appXXXXXXXXXXXXXX';
 * const myApiKey = 'XXXXXXXXXXXXXX';
 * const myAirtableBase = airtableBase(myBaseID, myApiKey);
 */
export const airtableBase = (baseID, apiKey) => {
  
  if (!baseID.startsWith("app") || null) {
    throw new Error("Invalid base ID");
  }

  if (!apiKey) {
    throw new Error("Invalid API Key");
  }

  const loadBase = new Airtable({
    apiKey: apiKey,
  }).base(baseID);

  const base = new BaseWrapper(loadBase);

  return base;
  // try {
  // } catch (e) {
    
  //   throw new Error(
  //     `Unable to load base, ${baseID}, API Key may be invalid : ${e.status} ${e.message}`
  //   );
  // }
};

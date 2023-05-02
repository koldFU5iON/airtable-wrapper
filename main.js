import Airtable from "./src/Wrappers/AirtableAPI.js"
/**
 * Creates an instance of Airtable.
 * @param {string} baseID - The ID of the base.
 * @param {string} apiKey - The API key for authentication.
 * @returns {Airtable} The created Airtable instance.
 * @throws {Error} Throws an error if the base ID is invalid or if the API key is missing.
 */
export const airtable = (baseID, apiKey) => {
  if (!baseID.startsWith("app") || null) {
    throw new Error("Invalid base ID");
  }

  if (!apiKey) {
    throw new Error("Invalid API Key");
  }

  const base = new Airtable(baseID, apiKey);

  return base;
};


import Airtable from "./Wrappers/AirtableAPI.js";

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

import fetch from "node-fetch";

/**
 * Fetch data from the Airtable API.
 *
 * @param {Object} options - The options for fetching the data.
 * @param {string} options.endPoint - The API endpoint.
 * @param {string} options.params - The parameters for the API request.
 * @param {Array<string>} [options.fields=[]] - The fields to include in the response.
 * @param {string|null} [options.offset=null] - The pagination offset.
 * @param {string} [offset=null] - The pagination offset.
 * @returns {Promise<Object>} The fetched data from the Airtable API.
 */
export const fetchData = async (options, offset = null) => {
  const {
    baseID,
    tableID,
    recordID,
    endPoint,
    params,
    fields = [],
    apiKey
  } = options;

  let url = `${endPoint}${params}/${endPoint}`;
  let queryParams = new URLSearchParams();

  if (offset) {
    queryParams.append("offset", offset);
  }

  const requestBody = {
    fields,
  };

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.offset) {
      const nextPageData = await fetchData(options, data.offset);
      data.records = data.records.concat(nextPageData.records);
    }

    return data;
  } catch (e) {
    return e;
  }
};

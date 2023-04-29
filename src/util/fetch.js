import fetch from "node-fetch";

export const fetchData = async (endPoint, params, fields = [], offset = null) => {
    let url = `${this._endPoint}${this._id}/${params}/${endPoint}`;
    let queryParams = new URLSearchParams();
  
    if (offset) {
      queryParams.append("offset", offset);
    }
  
    const requestBody = {
      "fields": fields,
    };
  
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }
    try{
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
    
      const data = await response.json();
      console.log(data)
      if (data.offset) {
        const nextPageData = await this._fetchData(endPoint, params, fields, data.offset);
        data.records = data.records.concat(nextPageData.records);
      }
    
      return data;

    } catch(e){
      return e;
    }
  };
import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const getJourneys = async (params) => {
    var result;
    if (params === undefined)
        result = await axios.get(`${baseUrl}/journeys`);
    else 
        result = await axios.get(`${baseUrl}/journeys`, { params })
    return result.data
}

export default { getJourneys }
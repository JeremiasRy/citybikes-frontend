import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const getStations = async () => {
    const result = await axios.get(`${baseUrl}/stations`);
    return result.data
}

export default { getStations }
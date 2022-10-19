import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND_URL

const getStations = async () => {
  const result = await axios.get(`${baseUrl}/stations`)
  return result.data
}
const getStationStatistics = async (id) => {
  const params = new URLSearchParams()
  params.append('stationId', id.id)
  const resultStats = await axios.get(`${baseUrl}/station/stats`, { params })
  const resultTop5Returns = await axios.get(`${baseUrl}/station/stats/returns`, { params })
  const resultTop5Departures = await axios.get(`${baseUrl}/station/stats/departures`, { params })
  const result = {
    statistics: resultStats.data,
    top5Returs: resultTop5Returns.data,
    top5Departures: resultTop5Departures.data
  }
  return result
}

const getStationDataFromHsl = async (id) => {
  const result = await axios.post('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    id: 'routes_BikeRentalStation_Query',
    query: 'query routes_BikeRentalStation_Query(\n  $id: String!\n) {\n  bikeRentalStation(id: $id) {\n    ...BikeRentalStationContent_bikeRentalStation\n    id\n  }\n}\n\nfragment BikeRentalStationContent_bikeRentalStation on BikeRentalStation {\n  lat\n  lon\n  name\n  spacesAvailable\n  bikesAvailable\n  capacity\n  networks\n  stationId\n  state\n}\n',
    variables: { id: id.id }
  })
  return result.data.data.bikeRentalStation
}

export default { getStations, getStationStatistics, getStationDataFromHsl }

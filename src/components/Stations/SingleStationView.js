import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import '../../cssfiles/SingleStationView.css'
import stationService from '../../services/stationService'

function statisticsParsed (stats) {
  const statistics = [
    { title: 'Average duration of returned journey', amount: Math.floor(stats[0].amount / 60), type: 'min' },
    { title: 'Average duration of departured journey', amount: Math.floor(stats[1].amount / 60), type: 'min' },
    { title: 'Average distance of returned journey', amount: Math.floor(stats[2].amount / 1000 * 100) / 100, type: 'km' },
    { title: 'Average distance of departured journey', amount: Math.floor(stats[3].amount / 1000 * 100) / 100, type: 'km' },
    { title: 'Total departures', amount: stats[4].amount },
    { title: 'Total returns', amount: stats[5].amount }
  ]
  return statistics
}

export function SingleStationView ({ stations }) {
  const [statistics, setStatistics] = useState(null)
  const [station, setStation] = useState(null)
  const navigate = useNavigate()
  const id = useParams()

  useEffect(() => {
    async function initData () {
      const res = await stationService.getStationStatistics(id)
      const stationData = await stationService.getStationDataFromHsl(id)
      setStatistics(res)
      setStation(stationData)
    } initData()
  }, [id])

  if (station === null || statistics === null) {
    return
  }

  const capacityPercent = Math.floor(station.bikesAvailable / station.capacity * 100)
  const parsedStats = statisticsParsed(statistics.statistics)

  const Top5Table = ({ table, header }) => {
    return (
      <div>
        <h6>{header}</h6>
        <Table id='statsTopList' striped bordered hover>
          <thead>
            <tr>
              <th>Station Name</th><th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {table.map(x =>
              <tr key={x.amount}>
                <td id='clickable' onClick={() => { navigate(`/stations/${x.stationId}`) }}>{stations.find(station => station.stationId === x.stationId).name}</td>
                <td>{x.amount}</td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    )
  }

  return (
    <div className='SingleStationView'>
      <div>
        <div className='Details'>
          <div>
            <h1>{station.name}</h1>
          </div>
          <div>
            {stations.find(station => station.stationId === id.id).address}
          </div>
          <div className='CapacityOut'>
            <div className='CapacityIndicator' style={{ height: '22px', width: `${capacityPercent > 100 ? 100 : capacityPercent}%` }} />
          </div>
          <div>
            {station.bikesAvailable} bike{station.bikesAvailable === 1 ? '' : 's'} available of {station.capacity}
          </div>
        </div>
      </div>
      <div className='topLists'>
        <Top5Table table={statistics.top5Departures} header='Top 5 Departures returning here' />
        <Top5Table table={statistics.top5Returs} header='Top 5 Return stations departuring here' />
      </div>
      <div className='MapHolder' />
      <div className='statisticsBasic'>
        <Table striped bordered hover>
          <thead>
            <tr>
              {parsedStats.map(x => <th key={x.title}>{x.title}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              {parsedStats.map(x => <td key={`${x.amount}${x.title}`}>{x.amount}{x.type}</td>)}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

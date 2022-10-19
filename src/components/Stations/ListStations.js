import { Table, Button } from 'react-bootstrap'
import '../../cssfiles/StationComponent.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function ListStations ({ stations }) {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(50)
  const navigate = useNavigate()

  const ChangePage = (amount) => {
    const integerAmount = parseInt(amount)
    if (pageIndex + integerAmount <= 0) {
      return
    } else if (pageSize * (pageIndex + integerAmount) - pageSize > stations.length) {
      return
    }
    setPageIndex(pageIndex + integerAmount)
  }

  if (stations === undefined) { return }

  return (
    <div className='StationComponent'>
      <h1>List of all available stations</h1>
      <p>Click on station name to view details</p>
      <div className='PaginationButtons'>
        <Button value={-1} onClick={(event) => { ChangePage(event.target.getAttribute('value')) }}>Back</Button>
        <>Page {pageIndex}</>
        <Button value={1} onClick={(event) => { ChangePage(event.target.getAttribute('value')) }}>Next</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {stations.slice(pageSize * pageIndex - pageSize, pageSize * pageIndex).map(station => 
          <tr key={station.stationId}>
            <td id='clickable' value={station.stationId} onClick={() => { navigate(`/stations/${station.stationId}`) }}> {station.name}</td>
            <td>{station.city}</td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

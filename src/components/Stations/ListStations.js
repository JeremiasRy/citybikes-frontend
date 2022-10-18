import { Table } from "react-bootstrap"
import '../../cssfiles/StationComponent.css'

export function ListStations({stations}) {
    if (stations === undefined)
        return;
    return (
        <div className="StationComponent">
            <h1>List of all available stations</h1>
            <p>Click on station to view details</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map(station => <tr key={station.stationId}><td>{station.stationId}</td><td>{station.name}</td><td>{station.city}</td></tr>)}
                </tbody>
            </Table>
        </div>
    )
}
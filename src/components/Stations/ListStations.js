import { Table } from "react-bootstrap"
import '../../cssfiles/StationComponent.css'
import { Navigate } from "react-router-dom";
import { useState } from "react";

export function ListStations({stations}) {

    const [singleStation, setSingleStation] = useState(null);
    if (stations === undefined)
        return;

    return (
        <div className="StationComponent">
            {singleStation !== null && <Navigate to={`/stations/${singleStation}`} />}
            <h1>List of all available stations</h1>
            <p>Click on station to view details</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map(station => <tr key={station.stationId}>
                        <td id="clickable" value={station.stationId} onClick={(e) => { setSingleStation(e.target.getAttribute('value'))}}> {station.name}</td>
                        <td>{station.city}</td>
                        <td>{station.address}</td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}
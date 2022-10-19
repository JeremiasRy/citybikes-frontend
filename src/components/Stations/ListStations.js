import { Table, Button } from "react-bootstrap"
import '../../cssfiles/StationComponent.css'
import { Navigate } from "react-router-dom";
import { useState } from "react";

export function ListStations({stations}) {

    const [singleStation, setSingleStation] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    const ChangePage = (amount) => {
        var integerAmount = parseInt(amount)
        if (pageIndex + integerAmount <= 0) {
            return;
        } else if (pageSize * (pageIndex + integerAmount) - pageSize > stations.length) {
            return;
        }
        setPageIndex(pageIndex + integerAmount);
    }

    if (stations === undefined)
        return;

    return (
        <div className="StationComponent">
            {singleStation !== null && <Navigate to={`/stations/${singleStation}`} />}
            <h1>List of all available stations</h1>
            <p>Click on station name to view details</p>
            <div className="PaginationButtons">
            <Button value={-1} onClick={(event) => {ChangePage(event.target.getAttribute('value'))}}>Back</Button> 
            <>Page {pageIndex}</> 
            <Button value={1} onClick={(event) => {ChangePage(event.target.getAttribute('value'))}}>Next</Button>
        </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.slice(pageSize * pageIndex - pageSize, pageSize * pageIndex).map(station => <tr key={station.stationId}>
                        <td id="clickable" value={station.stationId} onClick={(e) => { setSingleStation(e.target.getAttribute('value'))}}> {station.name}</td>
                        <td>{station.city}</td>
                        <td>{station.address}</td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}
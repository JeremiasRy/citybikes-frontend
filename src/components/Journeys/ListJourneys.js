import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import '../../cssfiles/JourneyComponent.css'
import journeyService from "../../services/journeyService"
import {CaretDownFill, CaretUpFill} from "react-bootstrap-icons"



export function ListJourneys({stations, journeys, setJourneys}) {

    const [orderDirection, setOrderDirection] = useState("a");
    const [orderBy, setOrderBy] = useState("none");
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [initialLoad, setInitialLoad] = useState(true)

    const SetOrderParams = (event) => {
        setInitialLoad(false);
        if (orderDirection === "a") {
            setOrderDirection("d")
        } else if (orderDirection === "d") {
            setOrderDirection("a")
        }
        if (event.target.getAttribute('value') === null) {
            return;
        }
        setOrderBy(event.target.getAttribute('value'));
    }

    useEffect(() => {
        if (initialLoad) {
            return;
        }
        async function OrderBy() {
            var params = new URLSearchParams([["orderDirection", orderDirection], ["orderBy", orderBy]])
            var res = await journeyService.getJourneys(orderBy === "none" ? undefined :params);
            setJourneys(res);
        } OrderBy()}, [orderBy, orderDirection])

    useEffect(() => {
        if (initialLoad) {
            return;
        }
        async function ChangePage() {
                var params = new URLSearchParams([["orderDirection", orderDirection], ["orderBy", orderBy], ["pageIndex", pageIndex], ["pageSize", pageSize]])
                var res = await journeyService.getJourneys(params);
                setJourneys(res);
            } ChangePage()}, [pageIndex, pageSize])

    return (
        <div className="JourneyComponent">
        <h1>List of all journeys</h1>
        <p>Click on columns to order. Journeys are ordered by default from oldest to newest.</p>
        {orderBy !== 'none' && <Button onClick={() => setOrderBy('none')}>Default</Button>}
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th value="departureStation" >Departure station</th>
                    <th value="returnStation">Return Station</th>
                    <th id="clickable" value="duration" onClick={(event) => {SetOrderParams(event)}}>Duration {
                        orderBy === "none" ? <><CaretUpFill value="duration"/><CaretDownFill value="duration"/></> : 
                        orderBy === "duration" ? orderDirection === 'a' ? <CaretUpFill value="duration"/> : <CaretDownFill value="duration"/> : <></>} </th>
                    <th id="clickable" value="distance" onClick={(event) => {SetOrderParams(event)}}>Distance {
                        orderBy === "none" ? <><CaretUpFill value="distance"/><CaretDownFill value="distance"/></> : 
                        orderBy === "distance" ? orderDirection === 'a' ? <CaretUpFill value="distance"/> : <CaretDownFill value="distance"/> : <></>}</th>
                </tr>
            </thead>
            <tbody>
                {journeys.map(journey => <tr key={journey.id}>
                    <td>{stations.find(station => station.stationId === journey.departureStationId) === undefined ? <em>Station not in database</em> : stations.find(station => station.stationId === journey.departureStationId).name}</td>
                    <td>{stations.find(station => station.stationId === journey.returnStationId) === undefined ? <em>Station not in database</em> : stations.find(station => station.stationId === journey.returnStationId).name}</td>
                    <td>{Math.floor(journey.duration / 60)} Min</td>
                    <td>{journey.distance / 1000} Km</td></tr>)}
            </tbody> 
        </Table>
    </div>
    )
}
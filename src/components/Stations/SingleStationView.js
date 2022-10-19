import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom"
import '../../cssfiles/SingleStationView.css'
import stationService from "../../services/stationService"

export function SingleStationView({stations}) {
    const [statistics, setStatistics] = useState(null);
    const id = useParams()
    const station = stations.find(station => station.stationId === id.id)

    useEffect(() => {
        async function initData() {
            var res = await stationService.getStationStatistics(id);
            var available = await stationService.getAvailableBikes(id);
            console.log(available);
            setStatistics(res);
        } initData();
    }, [])

    return (
        <div className="SingleStationView"> 
            <h1>{station.name}</h1>
            <Table>

            </Table>
            <Table>

            </Table>
            <Table>

            </Table>
        </div>
    )
}
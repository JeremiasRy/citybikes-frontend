import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom"
import '../../cssfiles/SingleStationView.css'
import stationService from "../../services/stationService"

function statisticsParsed(stats) {
    const statistics = [
        {title: "Average duration of returned journey", amount: Math.floor(stats[0].amount / 60), type: "min"},
        {title: "Averege duration of departured journey", amount: Math.floor(stats[1].amount / 60), type: "min"},
        {title: "Average distance of returned journey", amount: Math.floor(stats[2].amount / 1000 * 100) / 100, type: "km"},
        {title: "Average distance of departured journey", amount: Math.floor(stats[3].amount / 1000 * 100) / 100, type: "km"},
        {title: "Total departures", amount: stats[4].amount},
        {title: "Total returns", amount: stats[5].amount},
    ]
    return statistics
}

export function SingleStationView({stations}) {
    const [statistics, setStatistics] = useState(null);
    const [station, setStation] = useState(null);
    const id = useParams()

    useEffect(() => {
        async function initData() {
            var res = await stationService.getStationStatistics(id);
            var stationData = await stationService.getStationDataFromHsl(id);
            setStatistics(res);
            setStation(stationData)
        } initData();
    }, [])

    if (station === null || statistics === null) {
        return;
    }

    let capacityPercent = Math.floor(station.bikesAvailable / station.capacity * 100);
    let parsedStats = statisticsParsed(statistics.statistics);

    return (
        <div className="SingleStationView"> 
            <div>
                <h1>{station.name}</h1>
            </div>
            <div className="CapacityOut">
                <div className="CapacityIndicator" style={{height: '22px', width: `${capacityPercent}%`}}>
                </div>
                <p>{station.bikesAvailable} bikes available of {station.capacity}</p>
            </div>
            <div className="topLists">
                <div>
                    <h6>Top 5 Departures returning here</h6>
                    <Table id="statsTopList">
                        <thead>
                            <tr>
                                <th>Station Name</th><th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {statistics.top5Departures.map(x => 
                            <tr key={x.amount}>
                                <td>{stations.find(station => station.stationId === x.stationId).name}</td>
                                <td>{x.amount}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <h6>Top 5 Return stations departuring here</h6>
                    <Table id="statsTopList">
                        <thead>
                            <tr>
                                <th>Station Name</th><th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {statistics.top5Returs.map(x => 
                            <tr key={x.amount}>
                                <td>{stations.find(station => station.stationId === x.stationId).name}</td>
                                <td>{x.amount}</td>
                            </tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className="statisticsBasic">
            <Table>
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
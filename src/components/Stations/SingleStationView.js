import { useParams } from "react-router-dom"
import '../../cssfiles/StationComponent.css'

export function SingleStationView({stations}) {
    const id = useParams()
    const station = stations.find(station => station.stationId === id.id)

    console.log(station)
    return (
        <div className="StationComponent"> 
            <h1>{station.name}</h1>
        </div>
    )
}
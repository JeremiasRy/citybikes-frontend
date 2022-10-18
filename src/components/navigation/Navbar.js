import '../../cssfiles/Navbar.css'
import { Dropdown } from './Dropdown';
import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <div className='NavBarTop'>
          <div className='NavBarHeader'>
            <h1 id='HeaderText'>CityBikes</h1>
          </div>
          <div className='NavBarButtons'>
            <Link to='/' id="home">Home</Link>
            <Dropdown displayName={"Journeys"} dropDownOptions={journeysDropDown}/>
            <Dropdown displayName={"Stations"} dropDownOptions={stationsDropDown}/>
          </div>
        </div>
    )
}

const journeysDropDown = [{name: "Add a journey", path: "/journeys/add"}, {name: "List journeys", path: "/journeys/list"}, {name: "Search journeys", path: "/journeys/search"},]
const stationsDropDown = [{name: "Add a station", path: "/stations/add"}, {name: "List stations", path: "/stations/list"}, {name: "Search stations", path: "/stations/search"},]
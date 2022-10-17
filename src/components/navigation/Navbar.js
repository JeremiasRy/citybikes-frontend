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
            <Link to="/" id="home">Home</Link>
            <Dropdown displayName={"Journeys"}/>
            <Dropdown displayName={"Stations"}/>
          </div>
        </div>
    )
}
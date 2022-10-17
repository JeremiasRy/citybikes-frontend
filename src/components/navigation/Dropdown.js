import '../../cssfiles/Dropdown.css';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

export function Dropdown({displayName}) {
    return (
        <div className='DropDown' style={{float: "right"}}>
        <button className='DropDownBtn'><>{displayName} <Icon.CaretDownFill/></></button>
        <div className='DropDownContent'>
          <Link>List</Link>
          <Link>Search</Link>
          <Link>Add</Link>
        </div>
        </div>
    )
}
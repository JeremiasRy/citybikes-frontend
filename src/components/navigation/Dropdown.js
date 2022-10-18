import '../../cssfiles/Dropdown.css';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

export function Dropdown({displayName, dropDownOptions}) {

    return (
        <div className='DropDown' style={{float: "right"}}>
        <button className='DropDownBtn'><>{displayName} <Icon.CaretDownFill/></></button>
        <div className='DropDownContent'>
          {dropDownOptions.map(option => <Link key={`${option.path}${option.name}`}to={option.path}>{option.name}</Link>)}
        </div>
        </div>
    )
}
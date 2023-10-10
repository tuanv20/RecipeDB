import { React, useState, useEffect } from 'react';
import 'bootstrap';
import './RecipePage.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

//Simple button that toggles sidebar 
export default function SidebarButton(props) {
    const [buttonOffset, changeButtonOffset] = useState(props.width);

    useEffect(() => {
        changeButtonOffset(props.width + 25);
    }, [props.width])

    return (
        <button className='btn btn-secondary sidebarbutton' onClick={props.togglePressed} style={{ left: buttonOffset }}> <i class='bi bi-box-arrow-right'></i> Resources </button>
    )
}
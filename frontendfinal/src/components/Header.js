import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

const Header = () => {
    return (
        <NavLink to="/">
        <header>
            <nav>
            <h1>Min önskelista</h1>
            </nav>
            {/*
            <h1>Min önskelista</h1>
            <nav>
                <ul className="headerDesktopMenu">
                    <li><NavLink to="/">Hem</NavLink></li>
                    <li><NavLink to="/">Info</NavLink></li>
                </ul>
            </nav>
            */}
        </header> 
        </NavLink>
    )
}

//Higher-Order väljer ut Header-komponenten:
export default withRouter(Header)
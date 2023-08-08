import React from 'react'
import LogoBecation from "../imgs/BeCation_logo.png"
import "../stylesheets/header.css"

const Header = () => {
  return (
    <header className='header'>
        <div className='img_container'>
            <img src={LogoBecation} alt="" />
        </div>
        <nav className='nav_container'>
            <ul className='routes_links_container'>
                <li className='li_route'><a href="#">Login</a></li>
                <li className='li_route'><a href="#">Menu</a></li>
                <li className='li_route'><a href="#">Logout</a></li>
            </ul>
        </nav>
        <nav className='menu_responsive'> 
            <label className='burger_activator' htmlFor="check_menu"><span className="material-symbols-outlined logo_burger">menu</span></label>
            <input type="checkbox" name="" id="check_menu" hidden/>
            <ul className='routes_links_container_responsive' >
                <li className='li_route'><a href="#">Login</a></li>
                <li className='li_route'><a href="#">Menu</a></li>
                <li className='li_route'><a href="#">Logout</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
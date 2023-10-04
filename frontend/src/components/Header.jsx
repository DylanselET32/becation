import React from 'react'
import LogoBecation from "../imgs/BeCation_logo.png"
import "../stylesheets/header.css"
import ConfirmationModal from './ConfirmationModal';
import useConfirmation from '../hooks/useConfirmation';
//import ReturnLinks from './HeaderVariants';
const Header = ({auth}) => {

const user = auth ? auth.user : null;
const { showModal, handleShowModal, handleCloseModal, handleConfirm } = useConfirmation();

const singOut = () => {
    handleShowModal(auth.logOut)
}

return (<>
    <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirm}
        title='Cerrar Sesion'
        message="¿Está seguro que sesea cerrar sesion?"
    />

    <header className='header'>
        <div className='img_container'>
            <img src={LogoBecation} alt="" />
        </div>
        <nav className='nav_container'>
            <ul className='routes_links_container'>
                {!user ? <li className='li_route'><a href="login">Login</a></li> : <li className='li_route'><a onClick={singOut}>Logout</a></li>}
                <li className='li_route'><a href="home">Home</a></li>
                {user != null ? <li className='li_route user_name'>{user.name}</li> : ""}
            </ul>
        </nav>
        <nav className='menu_responsive'> 
            <label className='burger_activator' htmlFor="check_menu"><span className="material-symbols-outlined logo_burger">menu</span></label>
            <input type="checkbox" name="" id="check_menu" hidden/>
            <ul className='routes_links_container_responsive' >
                <li className='li_route'><a href="login">Login</a></li>
                <li className='li_route'><a href="home">Home</a></li>
                <li className='li_route'><a href="#">Logout</a></li>
            </ul>
        </nav>
    </header>
    </>
    )
}

export default Header
import React from 'react'
import LogoBecation from "../imgs/BeCation_logo.png"
import "../stylesheets/header.css"
import ConfirmationModal from './ConfirmationModal';
import useConfirmation from '../hooks/useConfirmation';
import { Link } from 'react-router-dom';
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

        <nav className="navbar navbar-expand-xl bg-body-tertiary b_custom">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src={LogoBecation} alt="" width={"70px"}></img></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className='nav-link text-light' to="/">Home</Link>
                    </li>
                    {!user ? <li><Link className='nav-link text-light' to="login">Login</Link></li> : <li><a className='nav-link text-light' onClick={singOut}>Logout</a></li>}
                    {(user?.privileges >= 2 && user?.privileges != 3) ?  <li><Link className='nav-link text-light' to="/areaBoss">Jefe del area</Link></li> : ""}
                    {(user?.privileges >= 3) ? <li><Link className='nav-link text-light' to="/vacationManager">Admin. Vacaciones</Link></li> : ""}
                    {(user?.privileges >= 3) ? <li><Link className='nav-link text-light' to="/profileManager">Admin. de Perfiles</Link></li> : ""}
                    {(user?.privileges >= 4) ? <li><Link className='nav-link text-light' to="/adminAreaRole">Admin. Area-Rol</Link></li> : ""}
                    {user != null ? <li className='badge fs-6'><a className='nav-link text-info'>{user.name}</a></li> : ""}
                </ul>
                </div>
            </div>
        </nav>
    {/* </header> */}
    </>
    )
}

export default Header

       {/* <nav className='menu_responsive'> 
            <label className='burger_activator' htmlFor="check_menu"><span className="material-symbols-outlined logo_burger">menu</span></label>
            <input type="checkbox" name="" id="check_menu" hidden/>
            <ul className='routes_links_container_responsive' >
                <li className='li_route'><Link className='li_route' to="/">Home</Link></li>
                <li className='li_route'><a href="/login">Login</a></li>
                <li className='li_route'><a onClick={singOut}>Logout</a></li>
                {user?.privileges >= 2 ?  <li className='li_route' ><Link to="/areaBoss">Jefe del area</Link></li> : ""}
                {user?.privileges >= 3 ? <li className='li_route' ><Link to="/vacationManager">Admin. Vacaciones</Link></li> : ""}
                {user?.privileges >= 3 ? <li className='li_route' ><Link to="/profileManager">Admin. de Perfiles</Link></li> : ""}
                {user?.privileges >= 3 ? <li className='li_route' ><Link to="/adminAreaRole">Admin. Area-Rol</Link></li> : ""}
            </ul>
        </nav> */}
import React from 'react';

function ReturnLinks(user) {
    return(
        <ul className='routes_links_container'>
            {!user ? <li className='li_route'><a href="login">Login</a></li> : <li className='li_route'><a onClick={singOut}>Logout</a></li>}
            <li className='li_route'><a href="home">Home</a></li>
            {user != null ? <li className='li_route user_name'>{user.name}</li> : ""}
        </ul>
    );
}
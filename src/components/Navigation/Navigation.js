import React from 'react';
import { Link } from 'react-router-dom';
import LogoutIcon from '../../images/nav__logout-icon.png';
import './Navigation.css';

export default function Navigation({ loggedIn, userEmail, handleLogout }) {
    return(
        <>
            <ul className='navigation__list'>
                <li className='navigation__list-item'><a className='navigation__list-link' href='/'>Home</a></li>
                <li className='navigation__list-item'><a className='navigation__list-link' href='/saved-news'>Saved articles</a></li>
                <li className='navigation__list-item navigation__list-item_primary'><a className='navigation__list-link' href='/signin'>Sign in <img className='navigation__list-item_primary-icon' src={LogoutIcon} alt='Logout' /></a>
                    <Link className='navigation__email' onClick={handleLogout} to='/'>{userEmail}</Link>
                </li>
            </ul>
        </>
    )
}
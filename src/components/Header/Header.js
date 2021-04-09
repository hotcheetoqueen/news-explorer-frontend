import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn, openModal, userName, handleLogOut, isSavedResults }) {
    return (
        <header className='header'>
            <h1 className='header__logo'><a className='header__logo-link' href='/'>NewsExplorer</a></h1>
            <Navigation loggedIn={loggedIn} userName={userName} handleLogOut={handleLogOut} openModal={openModal} />
        </header>
    )
}
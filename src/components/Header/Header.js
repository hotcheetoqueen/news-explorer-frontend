import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn, openModal, userName, handleLogOut, isSavedResults, theme }) {
    return (
        <header className='header'>
            <h1 className={`header__logo ${theme ? `navigation_theme_${theme}` : ''}`}><a className='header__logo-link' href='/'>NewsExplorer</a></h1>
            <Navigation loggedIn={loggedIn} userName={userName} handleLogOut={handleLogOut} openModal={openModal}  theme={theme} />
        </header>
    )
}
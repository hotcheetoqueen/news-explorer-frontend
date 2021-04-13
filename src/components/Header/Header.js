import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn, openModal, userName, handleLogOut, isSavedResults, handleHamburgerClick, theme }) {
    return (
        <header className={`header ${theme ? `header_theme_${theme}` : ''}`}>
            <h1 className='header__logo'><a className='header__logo-link' href='/'>NewsExplorer</a></h1>
            <Navigation loggedIn={loggedIn} userName={userName} handleLogOut={handleLogOut} openModal={openModal} theme={theme} isSavedResults={isSavedResults} handleHamburgerClick={handleHamburgerClick}/>
        </header>
    )
}
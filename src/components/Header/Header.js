import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

export default function Header({ loggedIn, openModal, userName, handleLogOut, isSavedResults, theme }) {
    return (
        <header className={`header ${theme ? `header_theme_${theme}` : ''}`}>
            <h1 className={`header__logo ${theme ? `header_theme_${theme}` : ''}`}><a className={`header__logo-link ${theme ? `header_theme_${theme}` : ''}`} href='/'>NewsExplorer</a></h1>
            <Navigation loggedIn={loggedIn} userName={userName} handleLogOut={handleLogOut} openModal={openModal}  theme={theme} />
        </header>
    )
}
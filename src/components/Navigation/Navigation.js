import React from 'react';
import { Link } from 'react-router-dom';
import Hamburger from '../../images/icons/hamburger-menu.svg';
import HamburgerDark from '../../images/icons/hamburger-menu_dark.svg';
import LogInOutIcon from '../../images/icons/nav__logout-icon.png';
import './Navigation.css';

export default function Navigation(props) {
    const {
        loggedIn,
        theme,
        openModal,
        userName,
        isSavedResults,
        handleLogOut,
        handleLogIn,
        handleLogInClick,
        handleLogOutClick,
        modalOpen,
        hamburgerMenuOpen,
        handleHamburgerClick
    } = props

    return(
        <section className={`navigation ${theme ? `navigation_theme_${theme}` : ''}`}>
            <div className='navigation navigation__mobile-menu' onClick={handleHamburgerClick} >
                <img className='navigation navigation__mobile-hamburger' src={isSavedResults ? HamburgerDark : Hamburger} alt='menu' />
            </div>
            <ul className={`navigation navigation__list ${theme ? `navigation_theme_${theme}` : ''}`}>
                <li className='navigation__list-item navigation__list-item_basic'><a className='navigation__list-link' href='/'>Home</a></li>
                {/* Add/remove ! before logged in to test opposite state */}
                {loggedIn ? (
                    <li className={`navigation__list-item navigation__list-item_primary ${theme ? `navigation_theme_${theme}` : ''}`}>
                        <Link className='navigation__name navigation__list-link' to='/' onClick={openModal}>Sign in</Link>
                    </li>
                ) : (
                    <>
                        <li className='navigation__list-item navigation__list-item_basic'><a className={`navigation__list-link ${theme ? `navigation_theme_${theme}` : ''}`} href='/saved-news'>Saved articles</a></li>
                        <li className={`navigation__list-item navigation__list-item_primary ${theme ? `navigation_theme_${theme}` : ''}`}>
                            <Link className={`navigation__name navigation__list-link ${theme ? `navigation_theme_${theme}` : ''}`} onClick={handleLogOutClick} to='/'>Tester
                                <img className='navigation__list-item navigation__list-item_primary-icon' src={LogInOutIcon} alt='Logout'></img>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </section>
    )
}
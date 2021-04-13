import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from '../../images/icons/hamburger-menu.svg';
import HamburgerDark from '../../images/icons/hamburger-menu_dark.svg';
import LogInOutIcon from '../../images/icons/nav__logout-icon.png';
import './Navigation.css';

export default function Navigation({ loggedIn, theme, openModal, userName, isSavedResults, handleLogOut, handleLogIn, handleLogInClick, handleLogOutClick, modalOpen, hamburgerMenuOpen,
    handleHamburgerClick }) {
    return(
        <section className={`navigation ${theme ? `navigation_theme_${theme}` : ''}`}>
            <Link className='navigation navigation__mobile-menu' onClick={handleHamburgerClick} hamburgerMenuOpen={true} to='/hamburgermenu'>
                {!isSavedResults ?
                    <img className='navigation navigation__mobile-hamburger' src={Hamburger} alt='menu' />
                        :
                    <img className='navigation__mobile-hamburger' src={HamburgerDark} alt='menu' />
                }
            </Link>
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
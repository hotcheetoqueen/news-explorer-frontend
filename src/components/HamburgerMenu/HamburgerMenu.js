import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '../../images/icons/popup-close.png'
import LogOutIcon from '../../images/icons/nav__logout-icon.png';
import './HamburgerMenu.css';

export default function HamburgerMenu(props) {
    useEffect(() => {
        document.addEventListener('keydown', props.onClose);
        return () => {
          document.removeEventListener('keydown', props.onClose);
        };
    });

    return (
        <section className={`hamburger-menu ${props.hamburgerMenuOpen ? 'hamburger-menu_open' : ""}`}>
            <div className='hamburger-menu__nav'>
                <h1 className='hamburger-menu__logo'>NewsExplorer</h1>
                <button className='hamburger-menu__button' onClick={props.onClose} >
                    <img className='hamburger-menu__hamburger' src={CloseIcon} alt='menu' />
                </button>
            </div>
            <ul className='hamburger-menu__list'>
                <li className='hamburger-menu__list-item hamburger-menu__list-item_basic'><a className='hamburger-menu__list-link' href='/'>Home</a></li>
                {/* Add/remove ! before logged in to test opposite state */}
                {props.loggedIn ? (
                    <li className='hamburger-menu__list-item hamburger-menu__list-item_primary'>
                        <Link className='hamburger-menu__list-link' to='/' onClick={props.openModal}>Sign in</Link>
                    </li>
                ) : (
                    <>
                        <li className='hamburger-menu__list-item hamburger-menu__list-item_basic'><a className='hamburger-menu__list-link' href='/saved-news'>Saved articles</a></li>
                        <li className='hamburger-menu__list-item hamburger-menu__list-item_primary'>
                            <Link className='hamburger-menu__list-link' onClick={props.handleLogOutClick} to='/'>Tester
                                <img className='hamburger-menu__list-item hamburger-menu__list-item_primary-icon' src={LogOutIcon} alt='Logout'></img>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </section>
    )
}
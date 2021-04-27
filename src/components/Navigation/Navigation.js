import React from 'react';
import { Link } from 'react-router-dom';
import Hamburger from '../../images/icons/hamburger-menu.svg';
import HamburgerDark from '../../images/icons/hamburger-menu_dark.svg';
import LogOutIcon from '../../images/icons/nav__logout-icon.png';
import LogOutIconDark from '../../images/icons/nav__logout-icon_dark.svg';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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
        modalOpen,
        hamburgerMenuOpen,
        handleHamburgerClick
    } = props

    const currentUser = React.useContext(CurrentUserContext);

    return(
        <section className={`navigation ${theme ? `navigation_theme_${theme}` : ''}`}>
            <div className='navigation navigation__mobile-menu' onClick={handleHamburgerClick} >
                <img className='navigation navigation__mobile-hamburger' src={isSavedResults ? HamburgerDark : Hamburger} alt='menu' />
            </div>
            <ul className={`navigation navigation__list ${theme ? `navigation_theme_${theme}` : ''}`}>
                <li className={`navigation__list-item ${!isSavedResults && `navigation__list-item_current`}`}><a className='navigation__list-link' href='/'>Home</a></li>
                {!loggedIn ? (
                    <li className={`navigation__list-item navigation__list-item_primary ${theme ? `navigation_theme_${theme}` : ''}`}>
                        <Link className='navigation__list-link' to='/' onClick={() => openModal('signin')}>Sign in</Link>
                    </li>
                ) : (
                    <>
                        {/* <Link to='/saved-news'> */}
                            <li className={`navigation__list-item navigation__list-item_large ${isSavedResults && `navigation__list-item_current`}`}><a className={`navigation__list-link ${theme ? `navigation_theme_${theme}` : ''}`} href='/saved-news'>Saved articles</a></li>
                        {/* </Link> */}
                        <li className={`navigation__list-item_primary ${theme ? `navigation_theme_${theme}` : ''}`}>
                            <Link className={`navigation__list-link ${theme ? `navigation_theme_${theme}` : ''}`} onClick={handleLogOut} to='/'>{currentUser.name}
                                <img className='navigation__list-item_primary-icon' src={isSavedResults ? LogOutIconDark : LogOutIcon} alt='Logout'></img>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </section>
    )
}
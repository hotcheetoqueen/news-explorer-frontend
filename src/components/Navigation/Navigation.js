import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogInOutIcon from '../../images/nav__logout-icon.png';
import './Navigation.css';

export default function Navigation({ loggedIn, userName, isSavedResults, handleLogOut, handleLogIn, handleLogInClick, handleLogOutClick, modalOpen }) {
    return(
        <>
            <ul className='navigation__list'>
                <li className='navigation__list-item'><a className='navigation__list-link' href='/'>Home</a></li>
                {/* Comment out initial statement to see other state (logged out) */}
                {loggedIn ? (
                    <li className='navigation__list-item navigation__list-item_primary'>
                        <Link className='navigation__name navigation__list-link' to='/signin' onClick={handleLogInClick}>Sign in</Link>
                        <img className='navigation__list-item_primary-icon' src={LogInOutIcon} alt='Sign in' />
                    </li>
                ) : (
                    <>
                        <li className='navigation__list-item'><a className='navigation__list-link' href='/saved-news'>Saved articles</a></li>
                        <li className='navigation__list-item navigation__list-item_primary'>
                            <Link className='navigation__name navigation__list-link' onClick={handleLogOutClick} to='/'>Tester
                                <img className='navigation__list-item_primary-icon' src={LogInOutIcon} alt='Logout'></img>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </>
    )
}
import React from 'react';
import Header from '../Header/Header';
import { buildKeywordList } from '../../utils/helpers';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

export default function SavedNewsHeader({ cards, userName, handleLogOut, handleHamburgerClick, isSavedResults, loggedIn }) {
    const keywords = buildKeywordList(cards);

    const currentUser = React.useContext(CurrentUserContext);

    return(
        <>
            <section className='saved-news-header' style={{color:"#1A1B22", backgroundColor:"white"}}>
                <Header handleLogOut={handleLogOut} theme='dark' handleHamburgerClick={handleHamburgerClick} isSavedResults={true} loggedIn={loggedIn} />
                <div className='saved-news-header__content'>
                    <h2 className="saved-news-header__title">Saved articles</h2>
                    <p className="saved-news-header__greeting">{currentUser && currentUser.name}, you have {` ${cards.length} `} saved article{cards.length !== 1 ? 's' : ''}</p>
                    <p className="saved-news-header__keywords">By keywords:
                        <span className="saved-news-header__keywords saved-news-header__keywords_emphasized">{keywords}</span>
                    </p>
                </div>
            </section>
        </>
    )
}
import React from 'react';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

export default function SavedNewsHeader({ userName, handleLogOut, handleHamburgerClick, isSavedResults }) {
    // keyword lists/ranking and number of saved articles, as well as loggedIn variables such as userName to implemented in step 3
    // const keywords = listKeywords(cards);

    const currentUser = React.useContext(CurrentUserContext);

    return(
        <>
            <section className='saved-news-header' style={{color:"#1A1B22", backgroundColor:"white"}}>
                <Header handleLogOut={handleLogOut} theme='dark' handleHamburgerClick={handleHamburgerClick} isSavedResults={true} />
                <div className='saved-news-header__content'>
                    <h2 className="saved-news-header__title">Saved articles</h2>
                    <p className="saved-news-header__greeting">{currentUser && currentUser.name} currentUser, you have # saved articles</p>
                    {/* <p className="saved-news-header__greeting">{userName}, you have # saved articles.</p> */}
                    <p className="saved-news-header__keywords">By keywords:
                        <span className="saved-news-header__keywords saved-news-header__keywords_emphasized"> key, words, are, cool</span>
                        {/* <span className="saved-news-header__keywords saved-news-header__keywords_emphasized">{keywords}</span> */}
                    </p>
                </div>
            </section>
        </>
    )
}
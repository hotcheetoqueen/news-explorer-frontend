import React from 'react';
import Header from '../Header/Header';
import './SavedNewsHeader.css';

export default function SavedNewsHeader({ userName, handleLogOut }) {
    // keyword lists/ranking and number of saved articles, as well as loggedIn variables such as userName to implemented in step 3
    // const keywords = listKeywords(cards);

    return(
        <>
            <section className='saved-news-header' style={{color:"#1A1B22", backgroundColor:"white"}}>
                <Header handleLogOut={handleLogOut} theme='dark' />
                <div className='saved-news-header__content'>
                    <h2 className="saved-news-header__title">Saved articles</h2>
                    <p className="saved-news-header__greeting">Reviewer, you have # saved articles.</p>
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
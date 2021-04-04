import React from 'react';
import Header from '../Header/Header';
import './SavedNewsHeader.css';

export default function SavedNewsHeader() {
    return(
        <>
            <section className='saved-news-header'>
                <Header />
                <div className='saved-news-header__content'>
                    <h2 className="saved-news-header__title">Saved articles</h2>
                    <p className="saved-news-header__greeting">[Name], you have # saved articles.</p>
                    <p className="saved-news-header__keywords">By keywords:
                    <span className="saved-news-header__keywords saved-news-header__keywords_emphasized"> x, y, z</span>
                    </p>
                </div>
            </section>
        </>
    )
}
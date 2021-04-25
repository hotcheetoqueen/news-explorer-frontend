import React from 'react';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

export default function SavedNews({ cards, loggedIn, handleDeleteClick, handleHamburgerClick, isLoading, isSaved }) {
    cards = [];

    return (
        <>
            <SavedNewsHeader cards={cards} handleHamburgerClick={handleHamburgerClick} loggedIn={loggedIn} />
            <NewsCardList cards={cards} isSavedResults={true} handleDeleteClick={handleDeleteClick} loggedIn={loggedIn} isLoading={isLoading} isSaved={isSaved} />
            <Footer />
        </>
    )
}
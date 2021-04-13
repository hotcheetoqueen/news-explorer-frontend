import React from 'react';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Main.css';

export default function Main({ cards, openModal, loggedIn, handleLogin, handleLoginClick, handleLogOut,isSaved, handleSaveClick, handleDeleteClick, showMoreCards, isSavedResults, handleHamburgerClick }) {
    return(
        <>
            <SearchForm openModal={openModal} isSavedResults={isSavedResults} handleHamburgerClick={handleHamburgerClick} />
            {/* {(cards.length > 0 || isLoading ) && ( */}
                <NewsCardList cards={cards}
                    isSaved={isSaved}
                    handleSaveClick={handleSaveClick}
                    isSavedResults={isSavedResults}
                    handleDeleteClick={handleDeleteClick}
                    isSavedResults={false}
                    // isLoading={isLoading}
                />
            {/* )} */}
            <About />
            <Footer />
        </>
    )
}

import React from 'react';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SearchForm from '../SearchForm/SearchForm';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Main.css';

export default function Main({ cards, openModal, loggedIn, handleLogin, handleLoginClick, handleLogOut, isSaved, handleSaveClick, handleDeleteClick, showMoreCards, isSavedResults, handleHamburgerClick, isLoading, handleSearch }) {
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <>
            <SearchForm openModal={openModal} isSavedResults={isSavedResults} handleHamburgerClick={handleHamburgerClick} loggedIn={loggedIn} handleLogOut={handleLogOut} handleSearch={handleSearch} />
            <NewsCardList
                cards={cards}
                isSaved={isSaved}
                handleSaveClick={handleSaveClick}
                handleDeleteClick={handleDeleteClick}
                isSavedResults={false}
                loggedIn={loggedIn}
                isLoading={isLoading}
                currentUser={currentUser}
            />
            <About />
            <Footer />
        </>
    )
}

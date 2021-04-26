import React from 'react';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SearchForm from '../SearchForm/SearchForm';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Main.css';

export default function Main({ cards, openModal, loggedIn, handleLogOut, isSaved, handleSaveClick, showMoreCards, showLessCards, allCards, isSavedResults, handleHamburgerClick, isLoading, handleSearch, handleSearchValue, emptyState }) {
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <>
            <SearchForm
                openModal={openModal}
                isSavedResults={isSavedResults}
                handleHamburgerClick={handleHamburgerClick}
                loggedIn={loggedIn}
                handleLogOut={handleLogOut}
                handleSearch={handleSearch}
                handleSearchValue={handleSearchValue}
            />
            <NewsCardList
                cards={cards}
                isSaved={isSaved}
                handleSaveClick={handleSaveClick}
                isSavedResults={false}
                loggedIn={loggedIn}
                isLoading={isLoading}
                currentUser={currentUser}
                showMoreCards={showMoreCards}
                showLessCards={showLessCards}
                allCards={allCards}
                openModal={openModal}
                emptyState={emptyState}
            />
            <About />
            <Footer />
        </>
    )
}

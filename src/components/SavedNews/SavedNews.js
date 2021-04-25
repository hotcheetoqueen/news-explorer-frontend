import { React, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

export default function SavedNews({ cards, loggedIn, handleLogInClick, handleDeleteClick, handleHamburgerClick, isLoading, isSaved }) {
    // const history = useHistory();

    // useEffect(() => {
    //   if (!loggedIn) {
    //     history.push('/');
    //     handleLogInClick();
    //   }
    // });
  
    return (
        <>
            <SavedNewsHeader cards={cards} handleHamburgerClick={handleHamburgerClick} loggedIn={loggedIn} handleLogInClick={handleLogInClick} />
            <NewsCardList cards={cards} isSavedResults={true} handleDeleteClick={handleDeleteClick} loggedIn={loggedIn} isLoading={isLoading} isSaved={isSaved} />
            <Footer />
        </>
    )
}
import React from 'react';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

export default function SavedNews({ cards, loggedIn }) {
    return(
        <>
            <SavedNewsHeader />
            <NewsCardList />
            <Footer />
        </>
    )
}
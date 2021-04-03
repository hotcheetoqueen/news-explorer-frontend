import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

export default function SavedNews({ cards, loggedIn }) {
    return(
        <>
            <SavedNewsHeader />
            <NewsCardList />
        </>
    )
}
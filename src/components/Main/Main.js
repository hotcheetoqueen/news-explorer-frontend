import React from 'react';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Main.css';

export default function Main({ cards, isSaved, handleSaveClick }) {
    return(
        <>
            <SearchForm />
            {/* {(cards.length > 0 || isLoading || notFound) && ( */}
                <NewsCardList cards={cards}
                    isSaved={isSaved}
                    handleSaveClick={handleSaveClick}
                    // isLoading={isLoading}
                    // notFound={notFound}
                />
            {/* )} */}
            <About />
            <Footer />
        </>
    )
}
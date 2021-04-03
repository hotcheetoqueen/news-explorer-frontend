import React from 'react';
import About from '../About/About';
import Footer from '../Footer/Footer';
import NewsCardList from '../NewsCardList/NewsCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Main.css';

export default function Main({ cards }) {
    return(
        <>
            <SearchForm />
            {/* {(cards.length > 0 || isLoading || notFound) && ( */}
                <NewsCardList cards={cards}
                    // isLoading={isLoading}
                    // notFound={notFound}
                />
            {/* )} */}
            <About />
            <Footer />
        </>
    )
}
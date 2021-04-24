import React from 'react';
import EmptyState from '../EmptyState/EmptyState';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import './NewsCardList.css';

export default function NewsCardList({ cards, allCards, loggedIn, isSavedResults, isSaved, handleSaveClick, handleDeleteClick, showMoreCards, isLoading, showLessCards, openModal }) {
    return (
        <>
            {cards.length > 0 && (
                <section className='news-card__list'>
                    {isLoading ? (
                        <Preloader />
                    ) : (
                    <>
                        {cards.length > 0 && (
                            <div className='news-card__list-container'>
                                {!isSavedResults && (
                                    <h3 className='news-card__list-title'>Search results</h3>
                                )}
                                    <ul className='news-card__grid'>
                                        {cards && cards.slice(0, allCards).map((card) => (
                                            <NewsCard
                                                key={cards.indexOf(card)}
                                                card={card}
                                                loggedIn={loggedIn}
                                                isSavedResults={isSavedResults}
                                                handleSaveClick={handleSaveClick}
                                                isSaved={isSaved}
                                                handleDeleteClick={handleDeleteClick}
                                                openModal={openModal}
                                            />
                                        ))}
                                    </ul>
                                {!isSavedResults && allCards < cards.length && (
                                    <button className='news-card__list-button' onClick={showMoreCards}>Show more</button>
                                )}
                                {/* {!isSavedResults && allCards === cards.length && (
                                   <button className='news-card__list-button' onClick={showLessCards}>Show less</button>
                                )} */}
                                </div>
                            )}
                            {cards.length === 0 && (
                                <EmptyState />
                            )}
                        </>
                    )}
                </section>
            )}
        </>
    )
}
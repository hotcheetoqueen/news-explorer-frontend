import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { seedData, seedDataSaved } from '../../seedData/seedData';
import './NewsCardList.css';

export default function NewsCardList({ cards, allCards, loggedIn, isSavedResults, isSaved, handleSaveClick, handleDeleteClick, showMoreCards }) {
    return(
        <>
            <section className='news-card__list'>
                {/* {isLoading ? ( */}
                    {/* 
                        <Preloader />
                    */}
                {/* ) : ( */}
                    <>
                        {/* {!cards ? (
                            <EmptyState />
                        ) : ( */}
                            {/* {cards.length > 0 ? ( */}
                            <div className='news-card__list-container'>
                                {!isSavedResults && (
                                    <h3 className='news-card__list-title'>Search results</h3>
                                )}
                                <ul className='news-card__grid'>
                                    {cards && seedData.slice(0, 3).map((card) => (
                                        <NewsCard key={card.id} card={card}
                                            loggedIn={loggedIn}
                                            isSavedResults={isSavedResults}
                                            handleSaveClick={handleSaveClick}
                                            isSaved={isSaved}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                ))}
                                    <NewsCard
                                    />
                                </ul>
                                {!allCards ? (
                                    <button className='news-card__list-button' onClick={showMoreCards}>Show more</button>
                                ) : (
                                    <ul className="news-cards-list__grid">
                                        {cards
                                        && 
                                            seedData.slice(3)
                                            .map((card) => (
                                            <NewsCard key={card.id} card={card}
                                                loggedIn={loggedIn}
                                                isSavedResults={false}
                                                handleSaveClick={handleSaveClick}
                                                isSaved={isSaved}
                                                handleDeleteClick={handleDeleteClick}
                                            />
                                        ))}
                                    </ul>
                                    )}
                            </div>   
                        </>
                    {/* )} */}
                {/* )} */}
            </section>
        </>
    )
}

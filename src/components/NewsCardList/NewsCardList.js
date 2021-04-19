import React from 'react';
import EmptyState from '../EmptyState/EmptyState';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import { seedData } from '../../seedData/seedData';
import './NewsCardList.css';

export default function NewsCardList({ cards, allCards, loggedIn, isSavedResults, isSaved, handleSaveClick, handleDeleteClick, showMoreCards, isLoading }) {
    return(
        <>
            <section className='news-card__list'>
                {isLoading ? (
                    <Preloader />
                ) : (
                    <>
                        {!cards.length > 0 ? (
                            <EmptyState />
                        ) : (
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
                                                )
                                            )}
                                        </ul>
                                        )}
                                </div> 
                            )}  
                        </>
                    )}
            </section>
        </>
    )
}

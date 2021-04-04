import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { seedData, seedDataSaved } from '../../seedData/seedData';
import './NewsCardList.css';
// import EmptyIcon from '../../images/search-empty.png';
// import LoadingIcon from '../../images/search-loading.png';

export default function NewsCardList({ cards, allCards, loggedIn, isSavedResults, isSaved, handleSaveClick, handleDeleteClick, showMoreCards }) {
    return(
        <>
            <section className='news-card__list'>
                {/* {isLoading ? ( */}
                    {/* <div className='news-card__list-loading-state'>
                        <img className='news-card__list-loading-icon' src={LoadingIcon} />
                        <p className='news-card__list-loading-text'>Searching for news...</p>
                    </div> */}
                {/* ) : ( */}
                    <>
                        {/* {!cards ? (
                            <div className='news-card__list-empty-state'>
                                <img className='news-card__list-empty-icon' src={EmptyIcon} />
                                <h3 className='news-card__list-empty-title'>Nothing found</h3>
                                <p className='news-card__list-empty-text'>Sorry, but nothing matched your search terms.</p>
                            </div>
                        ) : ( */}
                            {/* {cards.length > 0 ? ( */}
                            <div className='news-card__list-container'>
                                {!isSavedResults && (
                                    <h3 className='news-card__list-title'>Search results</h3>
                                )}
                                <ul className='news-card__grid'>
                                    {cards && seedData.slice(0, 3).map((card) => {
                                        <NewsCard key={card.id} card={card}
                                            loggedIn={loggedIn}
                                            isSavedResults={isSavedResults}
                                            handleSaveClick={handleSaveClick}
                                            isSaved={isSaved}
                                            handleSaveClick={handleSaveClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                     })}
                                    <NewsCard
                                    />
                                </ul>
                                {!allCards ? (
                                    <button className='news-card__list-button' onClick={showMoreCards}>Show more</button>
                                ) : (
                                    <ul className="news-cards-list__grid">
                                        {cards
                                        && cards
                                            .slice(3)
                                            .map((card) => (
                                            <NewsCard key={card.id} card={card}
                                                loggedIn={loggedIn}
                                                isSavedResults={isSavedResults}
                                                handleSaveClick={handleSaveClick}
                                                isSaved={isSaved}
                                                handleSaveClick={handleSaveClick}
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

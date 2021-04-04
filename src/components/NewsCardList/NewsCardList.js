import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';
// import EmptyIcon from '../../images/search-empty.png';
// import LoadingIcon from '../../images/search-loading.png';

export default function NewsCardList({ cards, isSaved, handleSaveClick }) {
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
                            <div className='news-card__list-container'>
                                <h3 className='news-card__list-title'>Search results</h3>
                                <ul className='news-card__grid'>
                                    {/* {cards && cards.map((card) => {
                                        <NewsCard key={card.id} card={card} />
                                     })} */}
                                    <NewsCard
                                        isSaved={isSaved}
                                        handleSaveClick={handleSaveClick}
                                    />
                                </ul>
                                <button className='news-card__list-button'>Show more</button>
                            </div>   
                    </>
                {/* )} */}
            </section>
        </>
    )
}

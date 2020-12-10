import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

export default function NewsCardList() {
    return(
        <>
            <section className='news-card__list'>
                <h3 className='news-card__list-title'>Search results</h3>
                <ul className='news-card__grid'>
                    {/* {props.cards.map((card) => { */}
                        <NewsCard />
                    {/* })} */}
                    <NewsCard />
                    <NewsCard />
                </ul>
                <button className='news-card__list-button'>Show more</button>
            </section>
        </>
    )
}

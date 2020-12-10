import React from 'react';
import './NewsCard.css';

export default function NewsCard() {
    return(
        <>
            <li className='news-card'>
                <div className='news-card__image-container'>
                    <button className='news-card__save'></button>
                    <div className='news-card__photo' 
                        // style={{ backgroundImage: `url(${props.card.link})` }} 
                    // style={{ backgroundImage: 'url(' + 'https://images.unsplash.com/photo-1607501629974-d50127ad7066?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1321&q=80' +')'
                    // }}
                    >
                    </div>
                </div>
                <div className='news-card__info-container'>
                    <p className='news-card__date'>Temp date</p>
                    <h3 className='news-card__title'>Temp header</h3>
                    <p className='news-card__description'>Temp description</p>
                    <p className='news-card__source'>Temp source</p>
                </div>
            </li>
        </>
    );
}
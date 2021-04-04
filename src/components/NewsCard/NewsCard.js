import React from 'react';
import './NewsCard.css';

// TODO: DECIDE PNG OR SVG FOR HOVER AND REMOVE OTHER
// import NewsCardSaveIcon from '../../images/news-card__save-icon.png';
import NewsCardSaveIcon from '../../images/news-card__save-icon.svg';


export default function NewsCard({ card }) {
    return(
        <>
            {/* {card && ( */}
                <li className='news-card'>
                    <div className='news-card__image-container'>
                        <div className='news-card__save-container'>
                            <div className='news-card__save-helper-text'></div>
                            <button className='news-card__save'>
                                <img className='news-card__save-icon' src={NewsCardSaveIcon} alt='Save article' />
                            </button>
                        </div>
                        <img className='news-card__photo' src='https://images.unsplash.com/photo-1612392062631-94dd858cba88?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' alt='News article subject' />
                    </div>
                    <div className='news-card__info-container'>
                        <p className='news-card__date'>0000</p>
                        <h3 className='news-card__title'>test</h3>
                        <p className='news-card__description'>test</p>
                        <p className='news-card__source'>test</p>
                    </div>
                </li>
            {/* )} */}
        </>
    );
}
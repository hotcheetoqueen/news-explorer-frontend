import React from 'react';
import NewsCardSaveIcon from '../../images/bookmarks/news-card__save-icon.svg';
import NewsCardDeleteIcon from '../../images/bookmarks/news-card__delete-icon.svg';
import './NewsCard.css';

export default function NewsCard({ card, loggedIn, isSavedResults, handleSaveClick = () => { }, handleDeleteClick = () => { } }) {
    return (
        <>
            {card && (
                <li className='news-card'>
                    {isSavedResults && (
                        // <p className="card__keyword">
                        //     {card.keyword.slice(1)}
                        // </p>
                        <div className='news-card__keyword'>Keyword</div>
                    )}
                    <div className='news-card__image-container'>
                        <div className='news-card__save-container'>
                            {!isSavedResults ?
                        <button className='news-card__save' onClick={() => handleSaveClick(card)}>
                            <div className={`news-card__save-icon ${card.isSaved ? ' news-card__save-icon_saved' : ''}`} src={NewsCardSaveIcon} alt='Save article' />
                        </button> :
                        <button className='news-card__save' onClick={() => handleDeleteClick(card)}>
                            <img className={`${card.isSaved ? ' news-card__save-icon_delete' : ''}`} src={NewsCardDeleteIcon} alt='Delete article' />
                        </button>
                            }
                            {isSavedResults && (
                                <div className='news-card__save-helper-text'>Remove from saved</div>
                            )}
                            {!isSavedResults && (
                                <div className='news-card__save-helper-text'>{!loggedIn ? 'Sign in to save articles' : ''}</div>
                            )}
                        </div>
                        <img className='news-card__photo' src='https://images.unsplash.com/photo-1612392062631-94dd858cba88?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' alt='News article subject' />
                    </div>
                    <div className='news-card__info-container'>
                        <p className='news-card__date'>{card.date}</p>
                        <h3 className='news-card__title'>{card.title}</h3>
                        <p className='news-card__description'>{card.description}</p>
                        <p className='news-card__source'>{card.source}</p>
                    </div>
                </li>
            )}
        </>
    );
}
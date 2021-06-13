import React from 'react';
import NewsCardSaveIcon from '../../images/bookmarks/news-card__save-icon.svg';
import NewsCardDeleteIcon from '../../images/bookmarks/news-card__delete-icon.svg';
import './NewsCard.css';

export default function NewsCard({ card, loggedIn, isSavedResults, openModal = () => { },  handleSaveClick = () => { } }) {
    return (
        <>
            {card && (
                <li className='news-card'>
                        {isSavedResults && (
                            <div className='news-card__keyword'>{card.keyword}</div>
                        )}
                        <div className='news-card__image-container'>
                            <div className='news-card__save-container'>
                                {!isSavedResults && loggedIn ?
                                    <button className='news-card__save' onClick={() => handleSaveClick(card)}>
                                        <div className={`news-card__save-icon ${card.isSaved ? ' news-card__save-icon_saved' : ' news-card__save-icon_unsaved'}`} alt='Save article' />
                                    </button> :
                                    <button className='news-card__save' onClick={() => handleSaveClick(card)}>
                                        <img className={`${card.isSaved ? ' news-card__save-icon_delete' : ''}`} src={NewsCardDeleteIcon} alt='Delete article' />
                                    </button>
                                }
                                {!isSavedResults && !loggedIn && (
                                    <button className='news-card__save' onClick={() => openModal()}>
                                        <div className={`news-card__save-icon ${card.isSaved ? ' news-card__save-icon_saved' : ''}`} src={NewsCardSaveIcon} alt='Save article' />
                                    </button>
                                )}
                                {isSavedResults && (
                                    <div className='news-card__save-helper-text'>Remove from saved</div>
                                )}
                                {!isSavedResults && (
                                    <div className={`${!loggedIn ? 'news-card__save-helper-text' : 'news-card__save-helper-text_hidden'}`} >Sign in to save articles</div>
                                )}
                            </div>
                            <a className='news-card__link' href={card.link} rel='noreferrer' target='_blank'>
                                <img className='news-card__photo' src={card.image} alt='News article subject' />
                            </a>
                        </div>
                        <div className='news-card__info-container'>
                                <a className='news-card__link' href={card.link} rel='noreferrer' target='_blank'>
                                    <p className='news-card__date'>{card.date}</p>
                                    <h3 className='news-card__title'>{card.title}</h3>
                                    <p className='news-card__description'>{card.text}</p>
                                    <p className='news-card__source'>{card.source}</p>
                                </a>
                        </div>
                </li>
            )}
        </>
    );
}
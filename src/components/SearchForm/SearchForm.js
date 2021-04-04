import React from 'react';
import Header from '../Header/Header';
import './SearchForm.css';
// import mainBackground from '../../images/main__background.svg';

export default function SearchForm() {
    return(
        <>
            <section className='search-form' title='Image of a human hand holding a white smartphone showing activity data and charts'>
                <Header />
                <div className='search-form__content'>
                    <h2 className='search-form__title'>What's going on in the world?</h2>
                    <p className='search-form__body'>Find the latest news on any topic and save them in your personal account.</p>
                    <div className='search-form__search'>
                        <input className='search-form__search search-form__search_input' placeholder='Enter topic'></input>
                        <button className='search-form__search search-form__search_button'>Search</button>
                    </div>
                </div>
            </section>
        </>
    )
}
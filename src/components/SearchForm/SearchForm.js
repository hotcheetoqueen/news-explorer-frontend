import React from 'react';
import Header from '../Header/Header';
import './SearchForm.css';

export default function SearchForm({ openModal, isSavedResults, handleHamburgerClick, handleSearch, searchValue, handleSearchValue, loggedIn, handleLogOut }) {
    return(
        <>
            <section className='search-form' title='A hand holding a white smartphone showing activity data'>
                <Header openModal={openModal} isSavedResults={isSavedResults}  handleHamburgerClick={handleHamburgerClick} loggedIn={loggedIn} handleLogOut={handleLogOut} />
                <div className='search-form__content'>
                    <h2 className='search-form__title'>What's going on in the world?</h2>
                    <p className='search-form__body'>Find the latest news on any topic and save them in your personal account.</p>
                    <div className='search-form__search'>
                        <input className='search-form__search search-form__search_input' placeholder='Enter topic' value={searchValue} onChange={handleSearchValue}></input>
                        <button className='search-form__search search-form__search_button' type='submit' onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </section>
        </>
    )
}
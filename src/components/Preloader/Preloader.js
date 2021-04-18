import React from 'react';
import LoadingIcon from '../../images/states/search-loading.png';
import './Preloader.css';

export default function Preloader() {
    return(
        <>
            <section className='preloader'>
                <img className='preloader__icon' src={LoadingIcon} alt='loading circle' />
                <p className='preloader__text'>Searching for news...</p>
            </section>
        </>
    )
}
import React from 'react';
import LoadingIcon from '../../images/search-loading.png';
import './Preloader.css';

export default function Preloader() {
    return(
        <>
            <section className='preloader'>
                <img className='preloader__icon' src={LoadingIcon} />
                <p className='preloader__text'>Searching for news...</p>
            </section>
        </>
    )
}
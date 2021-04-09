import React from 'react';
import EmptyIcon from '../../images/states/search-empty.png';
import './EmptyState.css';

export default function EmptyState() {
    return(
        <section className='empty-state'>
            <img className='empty-state__icon' src={EmptyIcon} alt='magnifying glass with a sad face' />
            <h3 className='empty-state__title'>Nothing found</h3>
            <p className='empty-state__text'>Sorry, but nothing matched your search terms.</p>
        </section>
    )
}

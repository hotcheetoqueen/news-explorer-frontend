import React from 'react';
import iconGithub from '../../images/icons/github.svg';
import iconLinkedIn from '../../images/icons/linkedin.svg';
import './Footer.css';

export default function Footer() {
    return (
        <>
        <footer className='footer'>
            <p className='footer__copyright'>&copy; 2020 Supersite, Powered by News API</p>
            <ul className='footer__navigation'>
                <div className='footer__navigation_stacked'>
                    <li className='footer__navigation-item footer__navigation-item_text'><a className='footer__navigation-item-link' href='/'>Home</a></li>
                    <li className='footer__navigation-item footer__navigation-item_text'><a className='footer__navigation-item-link' href='https://practicum.yandex.com/' target='_blank' rel='noreferrer'>Practicum by Yandex</a></li>
                </div>
                <li className='footer__navigation-item'><button className='footer__navigation-item-button' onClick={()=> window.open('https://github.com/hotcheetoqueen', '_blank')}><img src={iconGithub} alt='Github' /></button></li>
                <li className='footer__navigation-item'><button className='footer__navigation-item-button' onClick={()=> window.open('https://www.linkedin.com/in/jessicaperelman/', '_blank')}><img src={iconLinkedIn} alt='LinkedIn' /></button></li>
            </ul>
        </footer>
        </>
    )
}
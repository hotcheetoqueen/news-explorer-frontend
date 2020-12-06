import React from 'react';
import iconGithub from '../../images/github.png';
import iconFacebook from '../../images/facebook.png';
import './Footer.css';

export default function Footer() {
    return (
        <>
        <footer className='footer'>
            <p className='footer__copyright'>&copy; 2020 Supersite, Powered by News API</p>
            <ul className='footer__navigation'>
                <li className='footer__navigation-item'>Home</li>
                <li className='footer__navigation-item'>Practicum by Yandex</li>
                <li className='footer__navigation-item'><img src={iconFacebook}/></li>
                <li className='footer__navigation-item'><img src={iconGithub}/></li>
            </ul>
        </footer>
        </>
    )
}
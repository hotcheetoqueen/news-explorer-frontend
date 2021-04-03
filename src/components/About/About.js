import React from 'react';
import './About.css';
import authorImage from '../../images/main__author.png';

export default function About() {
    return (
    <section className='author'>
        <img className='author__image' alt='Headshot of the author' src={authorImage} />
        <div className='author__content'>
            <h3 className='author__content_title'>About the Author</h3>
            <p className='author__content_body'>
                Hey 👋 Jessica here! I'm a Los Angeles based Product Manager with a keen interest in web development, user experience, and music 🥁
            </p>
            <p className='author__content_body'>
                💻 You've landed on a project I built solo as the finale to my 10 month Practicum web development bootcamp. 👀 Have a look around! I hooked up the React frontend you see to a News API service, as well as set up the ability to create an account so you can search and save 📰 articles you find interesting.
            </p>
            <p className='author__content_body'>
                You can check out my full portfolio and learn more about me using the footer links below 🕵️‍♀️
            </p>
        </div>
    </section>
    )
}


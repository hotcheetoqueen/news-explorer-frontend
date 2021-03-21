import React from 'react';
import './PopupWithForm.css';

export default function PopupWithForm(props) {
    return(
        <>
            <div className='popup__overlay'>
            </div>
            <section className='popup__container'>
                <button className='popup__close'></button>
                <form className='popup__form'>
                    <h3 className='popup__title'>Sign in</h3>
                    <label className='popup__input-label'>Email</label>
                    <input className='popup__input popup__input_email' placeholder='Enter email'></input>
                    <label className='popup__input-label'>Password</label>
                    <input className='popup__input popup__input_password' placeholder='Enter password'></input>
                    <button className='popup__submit' type='submit'>Sign in</button>
                    <p className='popup__switch-type'>or <a className='popup__switch-type-link' href='/'>Sign up</a></p>
                </form>
            </section>
        </>
    )
}
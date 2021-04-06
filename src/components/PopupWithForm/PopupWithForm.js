import { React, useEffect, useState, useRef, useCallback } from 'react';
import validator from 'validator';
import './PopupWithForm.css';

export default function PopupWithForm(props) {


  function validateForm(email, password, username = null) {
    const errors = {};

    if (!email || !validator.isValidEmail(email)) {
      errors.email = 'Something is wrong with that email address';
    }

    if (!password) {
      errors.password = 'Password is a required field';
    } else if (!validator.isValidPassword(password, { minSymbols: 0 })) {
      errors.password =
        'Make your password a bit stronger';
    }

    if (username === null) {
    } else if (!username) {
      errors.username = 'How will we know what to refer to you as?';
    } else if (username.length < 4) {
      errors.username = 'Your username should be at least 4 letters';
    }

    return errors;
  }

    useEffect(() => {
        document.addEventListener('keydown', props.onClose);
        return () => {
          document.removeEventListener('keydown', props.onClose);
        };
      });

    return(
        <>
            <div className='popup__overlay'>
            </div>
            <section className='popup__container'>
                <button className='popup__close'></button>
                <form className='popup__form'>
                    <h3 className='popup__title'>Sign in</h3>
                    <label className='popup__input-label'>Email</label>
                    <input className='popup__input popup__input_email' placeholder='Enter email'>{props.email}</input>
                    <label className='popup__input-label'>Password</label>
                    <input className='popup__input popup__input_password' placeholder='Enter password'>{props.password}</input>
                    <button className='popup__submit' type='submit'>Sign in</button>
                    <p className='popup__switch-type'>or <button className='popup__switch-type-link' onClick={props.handleSignUpClick}>Sign up</button></p>
                </form>
            </section>
        </>
    )
}
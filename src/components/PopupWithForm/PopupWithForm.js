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
            <div className={'popup__overlay' + (props.openModal ? ' popup__overlay_visible' : '')}>
            </div>
            <section className={`popup__container` + (props.openModal ? ' popup__container_visible' : '')} >
                <button className='popup__close' onClick={props.onClose} onKeyDown={ (e) => {if (e.key === 'Enter') { onclose(); }} }></button>
                <form className='popup__form'>
                    <h3 className='popup__title'>{props.modalVersion === 'success' ? 'Registration successfully completed!': `Sign ${props.modalVersion === 'signup' ? 'up' : 'in'}`}</h3>
                    {props.modalVersion !== 'success' && (
                      <>
                      <label className='popup__input-label'>Email</label>
                      <input className='popup__input popup__input_email' placeholder='Enter email' id='email' name='email' required>{props.email}</input>
                      <span className='popup__input-error'>
                        {props.errors.email}
                      </span>
                      <label className='popup__input-label'>Password</label>
                      <input className='popup__input popup__input_password' placeholder='Enter password' id='password' name='password' required>{props.password}</input>
                      <span className='popup__input-error'>
                        {props.errors.password}
                      </span>
                      </>
                    )}
                  {props.modalVersion === 'signup' && (
                    <>
                      <label className='popup__input-label'>Username</label>
                      <input className='popup__input popup__input_username' placeholder='Enter username' id='username' name='username' required>{props.username}</input>
                      <span className='popup__input-error'>
                        {props.errors.username}
                      </span>
                    </>
                  )}
                    <button className='popup__submit' type='submit'>Sign {props.modalVersion === 'signin' ? ' up' : ' in'}</button>
                    <p className={`popup__switch-type ${props.modalVersion === 'success' ? 'popup__switch-type_success' : ''}`}>{props.modalVersion !== 'success' ? 'or ' : ''}<button className='popup__switch-type-link' onClick={props.modalVersion === 'signin' ? props.handleLogInClick : props.handleSignUpClick} >
                      Sign {props.modalVersion === 'signin' ? ' in' : ' up'}</button></p>
                </form>
            </section>
        </>
    )
}
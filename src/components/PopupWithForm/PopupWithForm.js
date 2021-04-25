import { React, useEffect, useCallback } from 'react';
import validator from 'validator';
import './PopupWithForm.css';

export default function PopupWithForm(props) {
    const { handleSignUp, handleLogIn, modalVersion, handleValidation, onClose, isValid } = props

    function escape(e) {
      if (e.keyCode === 27) {
        onClose();
      }
    }

    useEffect(() => {
        document.addEventListener('keydown', escape, props.onClose);
        return () => {
          document.removeEventListener('keydown', escape, props.onClose);
        };
      });

    const getSubmitHandler = useCallback(function () {
      const version = props.modalVersion
      if (version === 'signup') return handleSignUp
      if (version === 'signin') return handleLogIn
      // if (version === 'success')
      return () => { }
    }, [handleSignUp, handleLogIn, props.modalVersion])

    return (
        <>
            <div className={'popup__overlay' + (props.openModal ? ' popup__overlay_visible' : '')}>
            </div>
            <section className={`popup__container` + (props.openModal ? ' popup__container_visible' : '')} >
                <button className='popup__close' onClick={props.onClose} onKeyDown={(e) => { if (e.key === 'Enter') { onclose(); } }}></button>
                <form className='popup__form' onSubmit={e => { e.preventDefault(); getSubmitHandler()(e) }}>
                    <h3 className='popup__title'>{props.modalVersion === 'success' ? 'Registration successfully completed!' : `Sign ${props.modalVersion === 'signup' ? 'up' : 'in'}`}</h3>
                    {props.modalVersion !== 'success' && (
                      <>
                      <label className='popup__input-label'>Email</label>
                      <input className='popup__input popup__input_email' placeholder='Enter email' id='email' name='email' onChange={handleValidation} type='email' required>{props.email}</input>
                      <span className='popup__input-error' id='popup-email-error'>
                        {props.errors.email}
                      </span>
                      <label className='popup__input-label'>Password</label>
                      <input className='popup__input popup__input_password' placeholder='Enter password' id='password' name='password' minLength={8} onChange={handleValidation} required>{props.password}</input>
                      <span className='popup__input-error' id='popup-password-error'>
                        {props.errors.password}
                      </span>
                      </>
                    )}
                  {modalVersion === 'signup' && (
                    <>
                      <label className='popup__input-label'>Username</label>
                      <input className='popup__input popup__input_username' placeholder='Enter username' id='username' name='username' minLength={2} onChange={handleValidation} required>{props.name}</input>
                      <span className='popup__input-error' id='popup-username-error'>
                        {props.errors.name}
                      </span>
                    </>
                  )}
                    {props.modalVersion !== 'success' && (
                      <>
                        <button className={`popup__submit ${isValid ? 'popup__submit_active': ''}`} type='submit'>Sign {props.modalVersion === 'signup' ? ' up' : ' in'}</button>
                        <p className={`popup__switch-type ${props.modalVersion === 'success' ? 'popup__switch-type_success' : ''}`}>or
                          <button className='popup__switch-type-link' type='text' onClick={props.modalVersion === 'signin' ? props.handleSignUpClick : props.handleLogInClick} >
                            Sign {props.modalVersion === 'signup' ? ' in' : ' up'}
                          </button>
                        </p>
                      </>
                    )}
                    {props.modalVersion === 'success' && (
                      <p className='popup__switch-type popup__switch-type_success'>
                        <button className='popup__switch-type-link' type='text' onClick={props.handleLogInClick}>Sign in</button>
                      </p>
                    )}
                </form>
            </section>
        </>
    )
}
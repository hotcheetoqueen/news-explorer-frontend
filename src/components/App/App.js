import { React, useState, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EmptyState from '../EmptyState/EmptyState';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Preloader from '../Preloader/Preloader';
import SavedNews from '../SavedNews/SavedNews';
// import Preloader from '../Preloader/Preloader';
import { seedData, seedDataSaved } from '../../seedData/seedData';
import './App.css';

function App() {
  const [allCards, setAllCards] = useState(false);
  const [cards, setCards] = useState(seedData);
  const [loggedIn, setLoggedIn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVersion, setModalVersion] = useState('');
  const [savedCards, setSavedCards] = useState(seedDataSaved);
  const [navLinks, setNavLinks] = useState(false);
  const [userName, setUserName] = useState('Tester');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const resetForm = useCallback(
    (newValues = { email: '', password: '', username: '' }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  let isSaved;

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = (e) => {
    if (!e.key || e.key === 'Escape') {
      resetForm();
      setModalOpen(false);
    }
  };

  const handleLogInClick = () => {
    openModal();
    // if (windowWidth <= 767) {
    //   setNavLinks(true);
    // }
    setModalVersion('signin');
  };

  const handleLogIn = () => {
    setLoggedIn(true);
  };


  const handleSignUpClick = () => {
    openModal();
    setModalVersion('signup');
  }

  const handleSignUp = () => {
    setModalVersion('success');
  }

  const handleLogOutClick = () => {
    handleLogOut();
  }

  const handleLogOut = () => {
    setLoggedIn(false);
  };
  
  const handleSaveClick = (card) => {
    if (!card.isSaved) {
      card.isSaved = true;
      const newCards = cards.map((c) => (c.id === card.id ? card : c));
      savedCards.push(card);
      setCards(newCards);
      setSavedCards(savedCards);
    }
  };

  const handleDeleteClick = (card) => {
    setSavedCards(
      savedCards.filter((c) => c.id !== card.id),
    );
    card.isSaved = false;
    const newCards = cards.map((c) => (c.id === card.id ? card : c));
    savedCards.push(card);
    setCards(newCards);
  };

  const showMoreCards = () => {
    setAllCards(true);
  };      

  return (
    <div className="App">
      <Router>
      <Route exact path="/">
        <Main 
          cards={cards}
          openModal={openModal}
          modalOpen={modalOpen}
          handleSignUp={handleSignUp}
          loggedIn={loggedIn}
          handleLogIn={handleLogIn}
          handleLogInClick={handleLogInClick}
          handleLogOut={handleLogOut}
          handleLogOutClick={handleLogOutClick}
          isSaved={isSaved} 
          handleSaveClick={handleSaveClick}
          handleDeleteClick={handleDeleteClick}
          showMoreCards={showMoreCards}
          isSavedResults={false}
          userName={userName}
        />
        <PopupWithForm openModal={modalOpen} onClose={closeModal} handleSignUpClick={handleSignUpClick} handleLogInClick={handleLogInClick} handleLogIn={handleLogIn} modalVersion={modalVersion} />
      </Route>
      <Route exact path='/saved-news'>
        <SavedNews
          cards={savedCards}
          loggedIn={loggedIn} 
          isSaved={isSaved}
          handleSaveClick={handleSaveClick}
          handleDeleteClick={handleDeleteClick}
          isSavedResults={true}
          userName={userName}
          handleLogOutClick={handleLogOutClick}
        />
      </Route>
      {/* Test Routes!! */}
      <Route exact path='/emptystate'>
        <EmptyState />
      </Route>
      <Route exact path ='/preloader'>
        <Preloader />
      </Route>
      </Router>
    </div>
  );
}

export default App;

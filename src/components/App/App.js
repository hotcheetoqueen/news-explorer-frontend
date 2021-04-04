import { React, useState } from 'react';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
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


  let isSaved;

  const handleLogInClick = () => {
    setModalOpen(true);
    if (windowWidth <= 767) {
      setNavLinks(true);
    }
    setModalVersion('signin');
  };

  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const handleLogOutClick = () => {
    handleLogOut();
    console.log(loggedIn);
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

  const openModal = () => {
    setModalOpen(true);
    setModalVersion('signup');
  };

  const closeModal = (e) => {
    if (!e.key || e.key === 'Escape') {
      setModalOpen(false);
    }
  };

  const showMoreCards = () => {
    setAllCards(true);
  };

  return (
    <div className="App">
      <Route exact path="/" component={Main} 
        cards={cards}
        openModal={openModal}
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
      >
        {/* <Preloader path='/preloader' /> */}
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
      <Route exact path='/popup'>
        <PopupWithForm openModal={openModal} onClose={closeModal} />
      </Route>
    </div>
  );
}

export default App;

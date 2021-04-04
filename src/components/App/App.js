import { React, useState } from 'react';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import SavedNews from '../SavedNews/SavedNews';
// import Preloader from '../Preloader/Preloader';
import { seedData, seedDataSaved } from '../../seedData/seedData';
import './App.css';

function App() {
  const [cards, setCards] = useState(seedData);
  const [savedCards, setSavedCards] = useState(seedDataSaved);

  let isSaved;

  const handleSaveClick = (card) => {
    if (!card.isSaved) {
      card.isSaved = true;
      const newCards = cards.map((c) => (c.id === card.id ? card : c));
      savedCards.push(card);
      setCards(newCards);
      setSavedCards(savedCards);
    }
  };

  return (
    <div className="App">
      <Route exact path="/" component={Main} 
        cards={cards}
        isSaved={isSaved}
        handleSaveClick={handleSaveClick}
        cards={savedCards} >
        {/* <Preloader path='/preloader' /> */}
      </Route>
      <Route exact path='/saved-news'>
        <SavedNews handleSaveClick={handleSaveClick} cards={savedCards} />
      </Route>
      <Route exact path='/popup'>
        <PopupWithForm />
      </Route>
    </div>
  );
}

export default App;

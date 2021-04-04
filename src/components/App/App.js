import { React, useState } from 'react';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import SavedNews from '../SavedNews/SavedNews';
// import Preloader from '../Preloader/Preloader';
import { seedData } from '../../seedData/seedData';
import './App.css';

function App() {
  const [cards, setCards] = useState(seedData);

  return (
    <div className="App">
      <Route exact path="/" component={Main} cards={cards} >
        {/* <Preloader path='/preloader' /> */}
      </Route>
      <Route exact path='/saved-news'>
        <SavedNews />
      </Route>
      <Route exact path='/popup'>
        <PopupWithForm />
      </Route>
    </div>
  );
}

export default App;

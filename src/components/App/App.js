import { React, useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Preloader from '../Preloader/Preloader';
import SavedNews from '../SavedNews/SavedNews';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';
import { seedData, seedDataSaved } from '../../seedData/seedData';

import './App.css';

function App() {
  const [allCards, setAllCards] = useState(false);
  const [cards, setCards] = useState(seedData);
  const [currentUser, setCurrentUser] = useState({});
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVersion, setModalVersion] = useState('');
  const [savedCards, setSavedCards] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('Tester');

  // VALIDATION

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // FORMS

  const resetForm = useCallback(
    (newValues = { email: '', password: '', username: '' }, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

// POPUPS

  const openModal = () => {
    setModalOpen(true);
    setHamburgerMenuOpen(false);
  };

  const closeModal = (e) => {
    if (!e.key || e.key === 'Escape') {
      resetForm();
      setModalOpen(false);
    }
  };

  const handleHamburgerClick = () => {
    setHamburgerMenuOpen(true);
  }

  const handleHamburgerClose = () => {
    setHamburgerMenuOpen(false);
  }

  // AUTH

  const handleLogInClick = () => {
    openModal();
    setModalVersion('signin');
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    mainApi.signin(values.email, values.password)
      .then((data) => {
        setCurrentUser({ email: values.email, username: data.username, id: data.id });
        setLoggedIn(true);
        setModalOpen(false);
      })
      .catch();
  };

  const handleSignUpClick = () => {
    openModal();
    setModalVersion('signup');
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    mainApi.signup(values.email, values.password, values.username)
      .then((data) => {
        setModalVersion('success');
      })
      .catch();
  }

  const handleLogOutClick = () => {
    handleLogOut();
  }

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  const history = useHistory();

  useEffect(() => {
    if (!loggedIn) {
      history.push('/');
    }
  });

  // SEARCH

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    newsApi.getArticles(searchValue)
      .then((data) => {
        data.forEach((c) => {
          c.keyword = searchValue;
          c.source = c.source.name;
          console.log('then', data);

          if (loggedIn) {
            const [isSaved, id] = articleSaved(c, savedCards);
            if (isSaved) {
              c.isSaved = true;
              c.id = id;
            }
          }
        });
        setCards(data);
        setIsLoading(false);
        console.log(setCards);
      })
      .catch();
  };

  // BOOKMARKS

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

  // ARTICLES

  const articleInfo = ['keyword', 'title', 'description', 'publishedAt', 'source', 'url', 'urlToImage'];

  const matchArticle = (article, savedArticle) => {
    return articleInfo.every((key) => article[key] === savedArticle[key]);
  };
  

  const articleSaved = (article, savedArticles) => {
    let isSaved = false;
    let id;

    savedArticles.forEach((a) => {
      if (matchArticle(article, a)) {
        isSaved = true;
        id = a._id;
      }
    });

    return [isSaved, id];
  };

  useEffect(() => {
    // if (token && !localStorage.getItem('savedCards')) {
    //   mainApi.getArticles(token)
    if (token) {
      mainApi.getArticles(token)
      .then((data) => {
        // const userCards = data.filter((card) => card.user === currentUser.id);
        setCards(cards);

        // cards.forEach((c) => {
        //   const [isSaved, id] = articleSaved(c, savedCards);
        //   if (isSaved) {
        //     c.isSaved = true;
        //     c._id = id;
        //   }
        // });
      })
      .catch();
    }

    // }
  }, [loggedIn]);

  // DISPLAY CARDS

  const showMoreCards = () => {
    setAllCards(true);
  };      

  return (
    <div className="App">
      <CurrentUserContext.Provider value={user}>
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
              isSavedResults={false}
              handleSaveClick={handleSaveClick}
              handleDeleteClick={handleDeleteClick}
              showMoreCards={showMoreCards}
              userName={userName}
              handleHamburgerClick={handleHamburgerClick}
              handleSearch={handleSearch}
              searchValue={searchValue}
              handleSearchValue = {handleSearchValue}
              isLoading={isLoading}
            />
            <PopupWithForm 
              openModal={modalOpen}
              onClose={closeModal}
              errors={errors}
              handleSignUp={handleSignUp}
              handleSignUpClick={handleSignUpClick}
              handleLogInClick={handleLogInClick}
              handleLogIn={handleLogIn}
              modalVersion={modalVersion}
            />
          </Route>
          <Route exact path='/saved-news'>
            <SavedNews
              cards={savedCards}
              loggedIn={loggedIn} 
              handleSaveClick={handleSaveClick}
              handleDeleteClick={handleDeleteClick}
              userName={userName}
              handleLogOutClick={handleLogOutClick}
              isSavedResults={true}
              handleHamburgerClick={handleHamburgerClick}
              isLoading={isLoading}
            />
          </Route>
          <HamburgerMenu
              userName={userName}
              handleSignUp={handleSignUp}
              loggedIn={loggedIn}
              handleLogIn={handleLogIn}
              handleLogInClick={handleLogInClick}
              handleLogOut={handleLogOut}
              openModal={openModal}
              modalOpen={modalOpen}
              hamburgerMenuOpen={hamburgerMenuOpen}
              handleHamburgerClick={handleHamburgerClick}
              onClose={handleHamburgerClose}
            />
          {/* Test Routes!! */}
          <Route exact path='/preloader'>
            <Preloader />
          </Route>
        </Router>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

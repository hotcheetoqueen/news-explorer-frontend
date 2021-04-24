import { React, useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Preloader from '../Preloader/Preloader';
import SavedNews from '../SavedNews/SavedNews';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';

import './App.css';

function App() {
  const [allCards, setAllCards] = useState('');
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVersion, setModalVersion] = useState('');
  const [savedCards, setSavedCards] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('Tester');

  const history = useHistory();

  // LOCAL STORAGE

  useEffect(() => {
    if (localStorage.getItem('searchResponse')) {
      setCards(JSON.parse(localStorage.getItem('searchResponse')));
    }
    if (localStorage.getItem('savedCards')) {
      setSavedCards(JSON.parse(localStorage.getItem('savedCards')));
    }
  }, []);
  
  // VALIDATION

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({});

  const handleValidation = (e) => {
    const { target } = e;
    const { name } = target;
    const { value } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  // FORMS

  const resetForm = useCallback(
    (newValues = { email: '', password: '', name: '' }, newErrors = {}, newIsValid = false) => {
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
    window.scrollTo(0, 0)
  };

  const closeModal = (e) => {
      resetForm();
      setModalOpen(false);
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
    // e.stopImmediatePropagation()

    mainApi.signin(values.email, values.password)
      .then((data) => {
        if (data && data.token) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
          setCurrentUser({ email: values.email, name: data.name, id: data.id });
        }

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

    mainApi.signup(values.username, values.email, values.password)
      .then((data) => {
          setModalVersion('success');
      })
      .catch();
  }

  function handleLogOut() {
    setLoggedIn(false);
    handleHamburgerClose();

    localStorage.removeItem('token');
    history.push('/');
  };

  useEffect(() => {
    if (token) {
      mainApi.getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch(console.log('test'));
    }
  }, [token]);

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
        data.forEach((res) => {
          res.keyword = searchValue;
          res.source = res.source.name;

          if (loggedIn) {
            const [isSaved, id] = articleSaved(res, savedCards);
            if (isSaved) {
              res.isSaved = true;
              res.id = id;
            }
          }
        });

        setCards(data);
        showLessCards();
        setIsLoading(false);
        localStorage.setItem('searchResponse', JSON.stringify(data));
      })
      .catch();
  };

  // BOOKMARKS

  const handleSaveClick = (card) => {
    if (!card.isSaved) {
      mainApi.saveArticle(card, token)
      .then((newCard) => {
        newCard.isSaved = true;

        const newSavedCards = cards.map((res) => (res.id === card.id ? card : res));
        newSavedCards.push(card);
        setSavedCards(newSavedCards);
      })
      .catch((err) => console.log(err));
    }
  };

  const handleDeleteClick = (card) => {
    setSavedCards(
      savedCards.filter((res) => res.id !== card.id),
    );
    card.isSaved = false;
    const newCards = cards.map((res) => (res.id === card.id ? card : res));
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
        //   const [isSaved, id] = articleSaved(res, savedCards);
        //   if (isSaved) {
        //     res.isSaved = true;
        //     res.id = id;
        //   }
        // });
      })
      .catch();
    }

    // }
  }, [loggedIn]);

  // DISPLAY CARDS

  const showMoreCards = () => {
    setAllCards(allCards + 3);
  };

  const showLessCards = () => {
    setAllCards(3);
  }

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
              handleLogOut={handleLogOut}
              isSavedResults={false}
              handleSaveClick={handleSaveClick}
              handleDeleteClick={handleDeleteClick}
              showMoreCards={showMoreCards}
              showLessCards={showLessCards}
              allCards={allCards}
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
              values={values}
              errors={errors}
              handleValidation={handleValidation}
              isValid={isValid}
              handleSignUp={handleSignUp}
              handleSignUpClick={handleSignUpClick}
              handleLogInClick={handleLogInClick}
              handleLogIn={handleLogIn}
              modalVersion={modalVersion}
            />
          </Route>
          {/* <ProtectedRoute path='/saved-news' component={SavedNews} */}
          <Route path='/saved-news' component={SavedNews}
              cards={savedCards}
              // cards={cards}
              loggedIn={loggedIn} 
              handleSaveClick={handleSaveClick}
              handleDeleteClick={handleDeleteClick}
              userName={userName}
              handleLogOut={handleLogOut}
              isSavedResults={true}
              handleHamburgerClick={handleHamburgerClick}
              isLoading={isLoading}
          />
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
        </Router>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

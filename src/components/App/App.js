import { React, useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import SavedNews from '../SavedNews/SavedNews';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import { CARDS_PER_RENDER } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import mainApi from '../../utils/MainApi';
import newsApi from '../../utils/NewsApi';

import './App.css';

function App() {
  const [allCards, setAllCards] = useState(CARDS_PER_RENDER);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [emptyState, setEmptyState] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVersion, setModalVersion] = useState('');
  const [savedCards, setSavedCards] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [token, setToken] = useState(false);
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('Tester');

  const history = useHistory();

  // LOCAL STORAGE

  useEffect(() => {
    const cards = localStorage.getItem('searchResponse');
    const savedCards = localStorage.getItem('savedCards');

    if (cards) {
      setCards(JSON.parse(cards));
    }
    if (savedCards) {
      setSavedCards(JSON.parse(savedCards));
    }
  }, []);

  useEffect(() => {
    if (cards) {
      const newCards = cards.map(card => {
        const url = card.url;
        const isFound = savedCards.find(savedCard => savedCard.url === url);
        return isFound ? {...card, isSaved: true, id: isFound._id} : card;
      })
      setCards(newCards);
    }
  }, [savedCards]);

  
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

  const openModal = (type) => {
    setModalOpen(true);
    setHamburgerMenuOpen(false);
    setModalVersion(type);
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
    const token = localStorage.getItem('token');

    if (token) {
      setToken(token);

      mainApi.getArticles(token)
      .then((res) => {
        const savedCards = res.data.map(card => formatCard(card));
        setSavedCards(savedCards)
      })

      mainApi.getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch();
      }
  }, [token]);

  useEffect(() => {
    if (cards.length) {
      const newCards = cards.map(card => {
        const url = card.url
        const isFound = savedCards.find(savedCard => savedCard.url === url)
        return isFound ? { ...card, isSaved: true, id:  isFound._id} : card
      })
      setCards(newCards)
    }
  }, [savedCards]);

  // SEARCH

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    newsApi.getArticles(searchValue)
      .then((data) => {
        setEmptyState(data.length === 0);
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

  function formatCard(card) {
    const newCard = {...card}
    
    card.url = card.link;
    card.description = card.text;
    card.urlToImage = card.image;
    card.publishedAt = card.date;
    card.id = card._id;

    return newCard;
  }

  const handleSaveClick = (card) => {
    if (!card.isSaved) {
      mainApi.saveArticle(card, token)
      .then((res) => {
        const newCard = res.data;
        newCard.isSaved = true;

        const newCards  = [...cards].map(card => card.url === newCard.link ? formatCard(newCard) : card)
        setCards(newCards);
      })
      .catch((err) => console.log(err));
    } else {
      mainApi.deleteArticle(card.id, token)
        .then(res => {
          // const newCard = res.data
          // newCard.isSaved = true;

          // const newCards = [...cards].map(card => card.url === newCard.link ? formatCard(newCard) : card)
          // console.log('(=>>>>>>>>>>>> newCards', newCards)
          // setCards(newCards)
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


  // DISPLAY # OF CARDS

  const showMoreCards = () => {
    setAllCards(allCards + CARDS_PER_RENDER);
  };

  const showLessCards = () => {
    setAllCards(CARDS_PER_RENDER);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
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
              handleSearchValue={handleSearchValue}
              isLoading={isLoading}
              emptyState={emptyState}
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
          {/* <ProtectedRoute path='/saved-news' */}
          <Route path='/saved-news'
            render={(props) => (
              <SavedNews {...props}
                cards={savedCards}
                loggedIn={loggedIn}
                handleLogInClick={handleLogInClick}
                handleSaveClick={handleSaveClick}
                handleDeleteClick={handleDeleteClick}
                userName={userName}
                handleLogOut={handleLogOut}
                isSavedResults={true}
                handleHamburgerClick={handleHamburgerClick}
                isLoading={isLoading}
              />
            )}
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

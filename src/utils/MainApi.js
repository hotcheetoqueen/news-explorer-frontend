import { MAIN_API_URL } from './constants';

class MainApi {
    signup(email, password, username) {
        return fetch(`${MAIN_API_URL}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }),
        })
        .then((res) => res.json());
    }

    signin(email, password) {
        return fetch(`${MAIN_API_URL}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.message) {
                localStorage.setItem('token', data.token);
            }
            return data;
        })
    }

    getContent(token) {
        return fetch(`${MAIN_API_URL}/users/me`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json())
          .then((data) => data);
      }
    
    getArticles(token) {
    return fetch(`${MAIN_API_URL}/articles`, {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json());
    }

    saveArticle({ keyword, source, title, publishedAt, description, urlToImage, url }, token) {
    return fetch(`${MAIN_API_URL}/articles`, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ keyword, source, title, publishedAt, description, urlToImage, url }),
    })
        .then((res) => res.json());
    }

    deleteArticle(articleId, token) {
    return fetch(`${MAIN_API_URL}/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
    });
    }
}

const mainApi = new MainApi();
export default mainApi;
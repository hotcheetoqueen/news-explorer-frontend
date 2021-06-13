import { MAIN_API_URL } from './constants';

class MainApi {
    signup(name, email, password) {
        return fetch(`${MAIN_API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
        .then((res) => res.json())
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
        .then((res) => {
            if (!res.ok) {
                if (res.status === 401) {
                    window.alert('Please check your credentials and try again.');
                    window.location.reload();
                }
            }
            
            return res.json();
        })
        .then((data) => {
            if (!data.message) {
                localStorage.setItem('token', data.token);
            }
            return data;
        })
        .catch();
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
    // .then((res) => res.ok ? res.json() : Promise.reject(res.status));
    }

    saveArticle({ keyword, source, title, date, text, image, link }, token) {
    return fetch(`${MAIN_API_URL}/articles`, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ keyword, source, title, date, text, image, link }),
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

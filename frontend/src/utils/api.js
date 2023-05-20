class Api {
  constructor(configApi) {
    this._baseUrl = configApi.baseUrl;
    // this._BASE_URL = configApi.BASE_URL;
    // this._headers = configApi.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error('Что-то пошло не так....'));
  }

  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then((res) => this._getResponseData(res));
  };

  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
      .then((res) => this._getResponseData(res));
  };

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => this._getResponseData(res))
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then((res) => this._getResponseData(res));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => this._getResponseData(res));
  }

  postNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, changeMethod) {
    let methodLike = changeMethod ? "PUT" : "DELETE";
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: methodLike,
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
      .then((res) => this._getResponseData(res));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._getResponseData(res));
  }
}

const configApi = {
  baseUrl: 'https://api.mesto.parakhina.nomoredomains.monster',
};

const api = new Api(configApi);

export default api;
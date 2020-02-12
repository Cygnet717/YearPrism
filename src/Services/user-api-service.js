import config from '../Config';

const UserApiService = {
  postLogin(credentials) {
    return fetch(`${config.API_YearPrism}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  
  postUser(user) {
    return fetch(`${config.API_YearPrism}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      :res.json()
      )
  },

  deleteUser(id){
    return fetch(`${config.API_YearPrism}/users`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({user_id: id}),
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      :res.json()
      )
  },
};

export default UserApiService
import config from '../Config';
import TokenService from './token-service';

const EventsApiService = {
  getEvents() {
    return fetch(`${config.API_YearPrism}/events`, {
      method: 'GET',
      headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getYearEvents(year) {
    return fetch(`${config.API_YearPrism}/events/${year}`, {
        method: 'GET',
        headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`
        },
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
  },
  
  postNewEvent(user_id, newEvent) {
    return fetch(`${config.API_YearPrism}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        user_id: user_id,
        ...newEvent
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  EditEvent(EditedEvent){
    console.log(EditedEvent)
    return fetch(`${config.API_YearPrism}/events`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(
          EditedEvent
        ),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
  },

  deleteEvent(eventid) {
    return fetch(`${config.API_YearPrism}/events/${eventid}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res => {
        if(!res.ok){
          res.json().then(e => Promise.reject(e))
           }}
      )
  }
};

export default EventsApiService

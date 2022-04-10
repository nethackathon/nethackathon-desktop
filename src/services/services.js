const isDev = (process.env.NODE_ENV === 'development')
const apiRoute = 'https://api.nethackathon.org'
const devRoute = 'http://localhost:3000'
const baseRoute = (isDev) ? devRoute : apiRoute
const axios = require('axios');

export async function get () {
  const route = baseRoute + `/invoke`
  return axios.get(route, {withCredentials: true})
}

export async function getCharacterStatus (characterName) {
  const route = baseRoute + `/invoke/adventurer?character_name=${encodeURI(characterName)}`
  return axios.get(route, {withCredentials: true})
}

export async function claimCharacter (requestJson) {
  const route = baseRoute + '/invoke/adventurer'
  return axios.post(route, requestJson, {withCredentials: true})
}

export async function releaseCharacter (requestJson) {
  const route = baseRoute + '/invoke/releaseAdventurer'
  return axios.post(route, requestJson, {withCredentials: true})
}

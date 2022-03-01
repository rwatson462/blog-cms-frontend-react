import Axios from "axios"
import { Base64EncodeUrl } from "./Base64"
import { sha256 } from "js-sha256"
import { APIRootUrl } from "../config"

const Config = {
   passwordHash: '',
   userLevel: '',
   username: '',
   isLoggedIn: false
}

export function isLoggedIn() {
   return Config.isLoggedIn
}

export function getUsername() {
   return Config.username
}

export function getUserLevel() {
   return Config.userLevel
}

export function getPasswordHash() {
   return Config.passwordHash
}

export function setPasswordHash(passwordHash) {
   Config.passwordHash = passwordHash
}

export function doLogout() {
   Config.passwordHash = ''
   Config.username = ''
   Config.isLoggedIn = false
}

export function doLogin(username, password, callback) {
   Config.passwordHash = sha256(password)
   Config.username = username
   const token = buildJWT()

   // send token to server
   Axios.post(
      APIRootUrl + '/login',
      {},
      {
         headers: {
            'Content-type': 'Application/json',
            Authorization: 'JWT ' + token
         }
      }
   ).then( ({data}) => {
      if(data.userLevel) {
         // hooray we are logged in!
         Config.isLoggedIn = true
         Config.userLevel = data.userLevel
         callback(true)
      } else {
         callback(false)
      }
   }).catch( () => {
      callback(false)
   })
}



export function buildJWT(payload = {}) {
   // the header is always the same for this application
   const header = {
         typ: 'jwt',
         alg: 'hs256'
   }

   // always send the username with each request so we can look up their password
   const static_payload = {
      username: getUsername()
   }

   // overwrite user payload with static payload properties (e.g. username)
   for( const prop in static_payload) {
      payload[prop] = static_payload[prop]
   }

   // encode header and payload for ease of transport over http
   const encodedHeader = Base64EncodeUrl(JSON.stringify(header))
   const encodedPayload = Base64EncodeUrl(JSON.stringify(payload))

   // sign token using stored password
   const messageToSign = encodedHeader + '.' + encodedPayload
   const signature = Base64EncodeUrl(sha256.hmac(getPasswordHash(), messageToSign))

   return encodedHeader + '.' + encodedPayload + '.' + signature
}

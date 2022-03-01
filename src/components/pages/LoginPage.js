import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doLogin } from '../../functions/Authentication'

export default function LoginPage(props) {
   const navigate = useNavigate()

   let [username,setUsername] = useState('')
   let [password,setPassword] = useState('')
   let [showFailedMessage,setShowFailedMessage] = useState(false)

   const login = () => {
      doLogin(username, password, function(success) {
         if(success) {
            setShowFailedMessage(false)
            props.doLogin(true)
            navigate('/')
         } else {
            setShowFailedMessage(true)
         }
      })
   }

   return (
      <main>
         <section>
            <h2>Log in</h2>
         </section>

         <form className="login-form">
            { showFailedMessage && <p className="text-danger">Login failed</p> }
            <fieldset>
               <legend><label htmlFor="username">Username</label></legend>
               <input type="text" name="username" id="username" value={username} onChange={({target}) => setUsername(target.value)} />
            </fieldset>
            <fieldset>
               <legend><label htmlFor="password">Password</label></legend>
               <input type="password" name="password" id="password" value={password} onChange={({target}) => setPassword(target.value)} />
            </fieldset>
            <button type="button" onClick={login}>Log in</button>
         </form>
      </main>
   )
}

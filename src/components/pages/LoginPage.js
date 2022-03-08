import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doLogin } from '../../functions/Authentication'
import LoginForm from '../login/LoginForm'

export default function LoginPage(props) {
   const navigate = useNavigate()

   let [showFailedMessage,setShowFailedMessage] = useState(false)

   const login = (username,password) => {
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

         { showFailedMessage && <p className="text-danger">Login failed</p> }
         <LoginForm onLogin={login} />
      </main>
   )
}

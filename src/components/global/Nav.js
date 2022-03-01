import React from "react"
import {NavLink, useNavigate} from 'react-router-dom'
import { doLogout } from "../../functions/Authentication"

export default function Nav(props) {
   const navigate = useNavigate()

   function logout() {
      doLogout()
      props.doLogout()
      navigate('/')
   }

   return (
      props.isLoggedIn ? 
         <nav>
            <ul>
               <li><NavLink to="/"><button>Home</button></NavLink></li>
               <li><NavLink to="/config"><button>Config</button></NavLink></li>
               <li><NavLink to="/articles"><button>Articles</button></NavLink></li>
               <li><NavLink to="/footer"><button>Footer</button></NavLink></li>
               <li><button onClick={logout}>Logout</button></li>
            </ul>
         </nav>
      :
         <nav className="text-center">
            Please log in to continue
         </nav>
   )
}
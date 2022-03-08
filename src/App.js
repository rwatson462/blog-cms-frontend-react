import React, {useState} from 'react'
import react_logo from './logo.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './scss/App.scss'

import { isLoggedIn as realIsLoggedIn } from './functions/Authentication'

import Nav from './components/global/Nav'
import MainPage from './components/pages/MainPage'
import LoginPage from './components/pages/LoginPage'
import ConfigPage from './components/pages/ConfigPage'
import FooterPage from './components/pages/FooterPage'
import NotFoundPage from './components/pages/NotFoundPage'

import ArticlesPage from './components/pages/ArticlesPage'
import ArticleForm from './components/articles/ArticleForm'

export default function App() {

   const [isLoggedIn, setIsLoggedIn] = useState(realIsLoggedIn())

   const doLogin = () => {
      setIsLoggedIn(true)
   }

   const doLogout = () => {
      setIsLoggedIn(false)
   }

   return (
      <BrowserRouter>
         <span className="heading">
            <img src={react_logo} alt="React logo"></img>
            CMS
         </span>
         <header><h1>&nbsp;</h1></header>
         <Nav isLoggedIn={isLoggedIn} doLogout={doLogout} />
         {
            !isLoggedIn
            ? <LoginPage doLogin={doLogin} />
            : 
               <Routes>
                  <Route path="/" element={<MainPage />} />

                  <Route path="/articles" element={<ArticlesPage />} />
                  <Route path="/articles/new" element={<ArticleForm />} />
                  <Route path="/articles/:id/edit" element={<ArticleForm />} />

                  <Route path="/config" element={<ConfigPage />} />
                  <Route path="/footer" element={<FooterPage />} />

                  <Route path="*" element={<NotFoundPage />} />
               </Routes>
         }
      </BrowserRouter>
   )
}

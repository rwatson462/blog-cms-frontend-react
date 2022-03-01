import React, {Component} from 'react'
import react_logo from './logo.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './scss/App.scss'

import { isLoggedIn } from './functions/Authentication'

import Nav from './components/global/Nav'
import MainPage from './components/pages/MainPage'
import LoginPage from './components/pages/LoginPage'
import ArticlesPage from './components/pages/ArticlesPage'
import ConfigPage from './components/pages/ConfigPage'
import FooterPage from './components/pages/FooterPage'
import NotFoundPage from './components/pages/NotFoundPage'

export default class App extends Component {
   state = {
      isLoggedIn: isLoggedIn(),
   };

   doLogin = function() {
      this.setState({isLoggedIn: true})
   }.bind(this)

   doLogout = function() {
      this.setState({isLoggedIn: false})
   }.bind(this)

   render() {
      const {isLoggedIn} = this.state

      return (
         <BrowserRouter>
            <span className="heading">
               <img src={react_logo} alt="React logo"></img>
               CMS
            </span>
            <header><h1>&nbsp;</h1></header>
            <Nav isLoggedIn={this.state.isLoggedIn} doLogout={this.doLogout} />
            {
               !isLoggedIn
               ? <LoginPage doLogin={this.doLogin} />
               : 
                  <Routes>
                     <Route path="/" element={<MainPage />} />
                     <Route path="/articles" element={<ArticlesPage />} />
                     <Route path="/config" element={<ConfigPage />} />
                     <Route path="/footer" element={<FooterPage />} />
                     <Route path="*" element={<NotFoundPage />} />
                  </Routes>
            }
         </BrowserRouter>
      )
   }
}

import React, {Component} from 'react';
import react_logo from './logo.svg';
import Nav from './components/global/Nav';
import NotLoggedInNav from './components/global/NotLoggedInNav';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import { isLoggedIn } from './functions/Authentication';
import './scss/App.scss';

export default class App extends Component {
   state = {
      isLoggedIn: isLoggedIn(),
      currentPage: <MainPage />
   };

   changePage = function(newPage) {
      this.setState({currentPage: newPage})
   }.bind(this)

   doLogin = function() {
      this.setState({isLoggedIn: true})
   }.bind(this)

   doLogout = function() {
      // reset session storage data
      sessionStorage.removeItem('userLevel')
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('passwordHash')

      // toggle state to reload the app
      this.setState({isLoggedIn: false})
   }.bind(this)

   render() {
      // make sure we only show login page when not logged in
      const pageComponent = this.state.isLoggedIn ? this.state.currentPage : <LoginPage doLogin={this.doLogin} />
      const navComponent = this.state.isLoggedIn ? <Nav doLogout={this.doLogout} onPageChange={this.changePage} /> : <NotLoggedInNav />

      return (
         <>
            <span className="heading">
               <img src={react_logo} alt="React logo"></img>
               CMS
            </span>
            <header><h1>Motherfucker</h1></header>
            {navComponent}
            {pageComponent}
         </>
      )
   }
}

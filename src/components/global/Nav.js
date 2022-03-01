import React from "react"
import MainPage from "../pages/MainPage"
import ConfigPage from "../pages/ConfigPage"
import PagesPage from "../pages/PagesPage"
import ArticlesPage from "../pages/ArticlesPage"
import FooterPage from "../pages/FooterPage"

export default function Nav(props) {
   function changeToMainPage() {
      props.onPageChange(<MainPage />)
   }
   function changeToConfigPage() {
      props.onPageChange(<ConfigPage />)
   }
   function changeToPagesPage() {
      props.onPageChange(<PagesPage />)
   }
   function changeToArticlesPage() {
      props.onPageChange(<ArticlesPage />)
   }
   function changeToFooterPage() {
      props.onPageChange(<FooterPage />)
   }

   return (
      <nav>
         <ul>
            <li><button onClick={changeToMainPage}>Main</button></li>
            <li><button onClick={changeToConfigPage}>Config</button></li>
            <li><button onClick={changeToPagesPage}>Pages</button></li>
            <li><button onClick={changeToArticlesPage}>Articles</button></li>
            <li><button onClick={changeToFooterPage}>Footer</button></li>
            <li><button className="btn-text" onClick={props.doLogout}>Logout</button></li>
         </ul>
      </nav>
   )
}
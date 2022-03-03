import Axios from 'axios';
import React from 'react';
import { APIRootUrl } from '../../config';
import { buildJWT, getUserLevel } from '../../functions/Authentication';
import ArticleTable from '../articles/ArticleTable';

export default class ArticlesPage extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         articleList: []
      }
   }

   componentDidMount = function() {
      const token = buildJWT({
         'access-level': getUserLevel()
      })

      Axios.get(
         APIRootUrl + '/articles',
         {
            headers: {
               'Content-type': 'application/json',
               Authorization : 'JWT ' + token
            }
         }
      ).then( ({data}) => {
         this.setState({
            articleList: data
         })
      }).catch(
         error => console.log(error)
      )
   }

   deleteArticle = function(id, deleted) {
      const articles = this.state.articleList;
      articles.filter( article => article.id === id ).forEach(
         article => article.deleted = deleted
      )
      this.setState({'articleList': articles})
   }.bind(this)

   render() {
      const {articleList} = this.state

      return (
         <main>
            <h2>Articles</h2>
            <p>Manage blog articles here!</p>
            <ArticleTable articles={articleList} onDeleteClick={this.deleteArticle} />
         </main>
      )
   }
}
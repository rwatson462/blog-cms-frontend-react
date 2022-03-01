import Axios from 'axios';
import React from 'react';
import { APIRootUrl } from '../../config';
import { buildJWT, getUserLevel } from '../../functions/Authentication';
import ArticleTable from '../articles/ArticleTable';
import EditArticleForm from '../articles/EditArticleForm';

export default class ArticlesPage extends React.Component {
   constructor(props) {
      super(props)

      this.state = {
         articleList: [],
         editingArticleId: 0
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

   setEditArticleId = function(id) {
      this.setState({'editingArticleId': id})
   }.bind(this)

   deleteArticle = function(id, deleted) {
      const articles = this.state.articleList;
      articles.filter( article => article.id === id ).forEach(
         article => article.deleted = deleted
      )
      this.setState({'articleList': articles})
   }.bind(this)

   render() {
      const {articleList, editingArticleId} = this.state

      return (
         <main>
            <h2>Articles</h2>
            <p>Manage blog articles here!</p>
            { editingArticleId > 0 ?
               <EditArticleForm article={articleList.filter(article => article.id === editingArticleId)} />
               :
               <ArticleTable articles={articleList} onEditClick={this.setEditArticleId} onDeleteClick={this.deleteArticle} />
            }
         </main>
      )
   }
}
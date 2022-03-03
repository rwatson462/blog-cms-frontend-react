import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIRootUrl } from '../../config';
import { buildJWT, getUserLevel } from '../../functions/Authentication';
import ArticleTable from '../articles/ArticleTable';

export default function ArticlesPage() {
   const [articles, setArticles] = useState([])
   const navigate = useNavigate()

   useEffect(() => {
      const token = buildJWT({
         'access-level': getUserLevel()
      })

      const controller = new AbortController()
      Axios.get(
         APIRootUrl + '/articles',
         {
            signal: controller.signal,
            headers: {
               'Content-type': 'application/json',
               Authorization : 'JWT ' + token
            }
         }
      ).then( ({data}) => {
         setArticles(data)
      }).catch(
         error => {
            if(error.message === 'canceled') {
               // this means the controller aborted the request
               // probably based on the user changing to a different page
               // we don't need to capture this eventuality
               return
            }
            console.log(error)
         }
      )

      return () => {
         controller.abort()
      }
   }, [])

   const deleteArticle = (id, deleted) => {
      articles.filter( article => article.id === id ).forEach(
         article => article.deleted = deleted
      )
      // todo fire ajax request to delete on the server-side

      // to get React to notice the state change, we need to pipe in a copy of the articles array
      setArticles([...articles])
   }

   const publishArticle = (id, published) => {
      articles.filter( article => article.id === id ).forEach(
         article => article.published = published
      )
      // todo fire ajax request to publish on the server-side

      // to get React to notice the state change, we need to pipe in a copy of the articles array
      setArticles([...articles])
   }

   const createNewArticle = () => {
      navigate('/articles/new')
   }

   return (
      <main>
         <h2>Articles</h2>
         <blockquote>Note: Publishing an article will make it visible on the main website</blockquote>
         <ArticleTable articles={articles} onDeleteClick={deleteArticle} onPublishClick={publishArticle} />
         <button onClick={createNewArticle}>Create new article</button>
      </main>
   )
}
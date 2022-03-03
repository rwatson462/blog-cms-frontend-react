import Axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { APIRootUrl } from "../../config"
import { buildJWT,getUserLevel } from "../../functions/Authentication"

export default function EditArticleForm(props) {
   const navigate = useNavigate()

   // useParams always returns a string
   let params = useParams()

   const [id, setId] = useState()
   const [title, setTitle] = useState()
   const [content, setContent] = useState()
   const [url, setUrl] = useState()

   useEffect(function onMount() {
      const token = buildJWT({
         'access-level': getUserLevel()
      })
   
      const controller = new AbortController()
      Axios.get(
         APIRootUrl + `/articles/${params.id}`,
         {
            signal: controller.signal,
            headers: {
               'Content-type': 'application/json',
               Authorization : 'JWT ' + token
            }
         }
      ).then( ({data}) => {
         setId(data.id)
         setTitle(data.title)
         setContent(data.content)
         setUrl(data.url)
      }).catch(error => {
         if(error.message === 'canceled') {
            // this means the controller aborted the request
            // probably based on the user changing to a different page
            // we don't need to capture this eventuality
            return
         }
         console.log(error)
      })

      return () => {
         controller.abort()
      }
   }, [params.id])
   // ^^ params.id is a dependency of the effect, so this effect will only call again if the
   //    dependency changes (which is won't because it's effectively a prop)

   const handleTitleChange = event => {
      const {value} = event.target
      setTitle(value)
      // replace anything that isn't a letter or number with a -
      // then replace multiple dashes with a single dash
      // then remove any dashes from the end
      // e.g "blog post 123 !!!" -> "blog-post-123"
      setUrl(value.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/-$/, ''))
   }

   const handleContentChange = event => {
      const {value} = event.target
      setContent(value)
   }

   const saveArticle = () => {
      // todo implement actual saving of the article
      const article = {
         id,
         title,
         url,
         content
      }
      console.log(article)
   }

   return (
      <main>
         <h2>Editing Article</h2>
         { !id ? <p>Loading...</p> :
            <form>
               <fieldset>
                  <legend>Title</legend>
                  <input type="text" name="title" value={title} onChange={handleTitleChange} />
               </fieldset>
               <fieldset>
                  <legend>URL</legend>
                  <input type="text" name="url" value={url} readOnly />
               </fieldset>
               <fieldset>
                  <legend>Article</legend>
                  <blockquote>Note: you can use Markdown syntax only for formatting</blockquote>
                  <textarea rows="40" name="content" value={content} onChange={handleContentChange}></textarea>
               </fieldset>
               <p style={{display: 'flex', gap: '1rem', justifyContent: 'flex-start'}}>
                  <button type="button" onClick={saveArticle}>Save</button>
                  <button type="button" onClick={() => navigate('/articles')}>Cancel</button>
               </p>
            </form>
         }
      </main>
   )
}
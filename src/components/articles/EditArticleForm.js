import { useState } from "react"


export default function EditArticleForm(props) {
   const article = props.article[0]
   
   const [title, setTitle] = useState(article.title)
   const [url, setUrl] = useState(article.url)
   const [content, setContent] = useState(article.content)

   const id = article.id

   function handleTitleChange(event) {
      const {value} = event.target
      setTitle(value)
      setUrl(value.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/-$/, ''))
   }

   function handleContentChange(event) {
      const {value} = event.target
      setContent(value)
   }

   function saveArticle() {
      console.log(title)
      console.log(url)
      console.log(content)
   }

   function cancelArticle() {
      
   }
   
   return (
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
            <textarea name="content" value={content} onChange={handleContentChange}></textarea>
         </fieldset>
         <p>
            <button type="button" onClick={saveArticle}>Save</button>
            <button type="button" onClick={cancelArticle} style={{marginLeft:'1rem'}}>Cancel</button>
         </p>
      </form>
   )
}
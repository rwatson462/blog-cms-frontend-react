import { useNavigate } from "react-router-dom"

export default function ArticleListRow(props) {
   const navigate = useNavigate()

   function editArticle() {
      navigate(`/articles/${props.article.id}/edit`)
   }

   function deleteArticle() {
      props.onDeleteClick(props.article.id, true)
   }

   function undeleteArticle() {
      props.onDeleteClick(props.article.id, false)
   }

   const {article} = props

   return (
      <tr>
         <td>{article.title}</td>
         <td>{article.url.replace('/articles/', '')}</td>
         <td>{article.published ? 'Y' : 'N'}</td>
         <td>{article.deleted ? 'Y' : 'N'}</td>
         <td>
            <button onClick={editArticle}>Edit</button>
            { article.deleted 
               ? <button onClick={undeleteArticle}>Restore</button>
               : <button onClick={deleteArticle}>Delete</button>
            }
         </td>
      </tr>
   )
}
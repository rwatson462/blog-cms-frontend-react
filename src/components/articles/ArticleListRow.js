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

   function publishArticle() {
      props.onPublishClick(props.article.id, true)
   }

   function unpublishArticle() {
      props.onPublishClick(props.article.id, false)
   }

   const {article} = props

   return (
      <tr>
         <td>{article.title}</td>
         <td>{article.url.replace('/articles/', '')}</td>
         <td>{article.published ? 'Y' : 'N'}</td>
         <td>{article.deleted ? 'Y' : 'N'}</td>
         <td className="button-group">
            <button onClick={editArticle}>Edit</button>
            { article.deleted 
               ? <button onClick={undeleteArticle}>Restore</button>
               : <button onClick={deleteArticle}>Delete</button>
            }
            { article.published
               ? <button onClick={unpublishArticle}>Unpublish</button>
               : <button onClick={publishArticle}>Publish</button>
            }
         </td>
      </tr>
   )
}
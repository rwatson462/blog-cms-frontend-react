
export default function ArticleListRow(props) {
   function editArticle() {
      props.onEditClick(props.article.id)
   }

   return (
      <tr>
         <td>{props.article.title}</td>
         <td>{props.article.url.replace('/articles/', '')}</td>
         <td>{props.article.published ? 'Y' : 'N'}</td>
         <td>{props.article.deleted ? 'Y' : 'N'}</td>
         <td><button onClick={editArticle}>Edit</button></td>
      </tr>
   )
}
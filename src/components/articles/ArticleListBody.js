import ArticleListRow from "./ArticleListRow"

export default function ArticleListBody(props) {
   return (
      <tbody>
         { 
            props.articles.map( (article,index) => {
               return <ArticleListRow article={article} key={index} onEditClick={props.onEditClick} />
            })
         }
      </tbody>
   )
}
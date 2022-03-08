import ArticleListBody from "./ArticleListBody";
import ArticleListHeader from "./ArticleListHeader";


export default function ArticleTable(props) {
   return (
      <table className="table-hover">
         <ArticleListHeader />
         <ArticleListBody articles={props.articles} onEditClick={props.onEditClick} onDeleteClick={props.onDeleteClick} onPublishClick={props.onPublishClick} />
      </table>
   )
}
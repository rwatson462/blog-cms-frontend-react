import ArticleListBody from "./ArticleListBody";
import ArticleListHeader from "./ArticleListHeader";


export default function ArticleTable(props) {
   return (
      <table>
         <ArticleListHeader />
         <ArticleListBody articles={props.articles} onEditClick={props.onEditClick} />
      </table>
   )
}
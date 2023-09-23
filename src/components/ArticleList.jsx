import React from "react";

import Article from "./Article";
import "../index.css";


function ArticleList (props) {
    console.log("[ArticleList] rendering: ");
    console.log(props);
    return (
        <div className="articleList">
        { 
            props.articleListToShow.map((article) => {
                return (
                    <Article 
                        key={article.id}
                        labelOptionList={props.labelOptionList}
                        articleToShow={article}
                        onArticleDeleteRequest={props.onArticleDelete}
                        onArticleEditRequest={props.onArticleEdit}
                    />
                );
            })
        }    
        </div>
    );
}

export default ArticleList;
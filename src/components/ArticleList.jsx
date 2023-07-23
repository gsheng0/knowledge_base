import React from "react";

import Article from "./Article";
import "../index.css";

function ArticleList (props) {
    return (
        <div className="AticleList">
        { 
            props.articleListToShow.map((article) => {
                return (
                    <Article 
                        key={article.id}
                        item={article}
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
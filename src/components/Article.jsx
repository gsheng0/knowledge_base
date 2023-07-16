import React from "react";
import "../index.css";

import Title from "./Title";
import TagList from "./TagList";
import Timestamps from "./Timestamps";
import Content from "./Content";

function Article (article) {
    console.log(article);
    return (
        <div className='article' key={article.id}>            
            <Title title={article.title} />
            <TagList labels={article.labels} />
            <Timestamps createOn={article.createOn} updateOn={article.updateOn} />
            <Content content={article.content} />
        </div>
    )
}

export default Article;
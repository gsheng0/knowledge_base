import React from "react";
import "../index.css";

import Title from "./Title";
import LabelList from "./LabelList";
import Timestamps from "./Timestamps";
import Content from "./Content";

function Article (props) {
    function handleDelete() {
        props.onArticleDeleteRequest(props.articleToShow.id);
    }

    function handleEdit() {
        props.onArticleEditRequest(props.articleToShow.id);
    }

    // console.log("Article rendering: ");
    // console.log(props);
    return (
        <div className='article' key={props.articleToShow.id}>            
            <Title 
                title={props.articleToShow.title} 
                id={props.articleToShow.id} 
                status={props.articleToShow.status}                     
            />
            <LabelList labelList={props.articleToShow.labels} />
            <Timestamps 
                createOn={props.articleToShow.createOn} 
                updateOn={props.articleToShow.updateOn}                     
            />            
            <Content content={props.articleToShow.content} />        
            <button onClick={handleEdit}>edit</button>&nbsp;&nbsp;
            <button onClick={handleDelete}>delete</button>    
        </div>
    )
}

export default Article;
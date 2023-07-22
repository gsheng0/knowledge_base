import React from "react";
import "../index.css";

import Title from "./Title";
import TagList from "./TagList";
import Timestamps from "./Timestamps";
import Content from "./Content";

function Article (props) {
    function handleDelete() {
        props.onArticleDeleteRequest(props.item.id);
    }

    function handleEdit() {
        props.onArticleEditRequest(props.item.id);
    }

    console.log("rendering: " + props);
    return (
        <div className='article' key={props.item.id}>            
            <Title 
                title={props.item.title} 
                id={props.item.id} 
                status={props.item.status}                     
            />
            <TagList labels={props.item.labels} />
            <Timestamps 
                createOn={props.item.createOn} 
                updateOn={props.item.updateOn}                     
            />            
            <Content content={props.item.content} />        
            <button onClick={handleEdit}>edit</button>&nbsp;&nbsp;
            <button onClick={handleDelete}>delete</button>    
        </div>
    )
}

export default Article;
import React from "react";
import "../index.css";

import Title from "./Title";
import TagList from "./TagList";
import Timestamps from "./Timestamps";
import Content from "./Content";

function Article (props) {
    function handleCilck() {
        props.onArticleDeleteRequest(props.item.id);
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
            <button>edit</button>&nbsp;&nbsp;
            {/* <button>delete</button> */}
            <button onClick={handleCilck}>delete</button>    
        </div>
    )
}

export default Article;
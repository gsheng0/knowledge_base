import "../index.css";

import Title from "./Title";
import Timestamps from "./Timestamps";
import Content from "./Content";
import ArticleLabelList from "./ArticleLabelList";

function Article (props) {
    function handleDelete() {
        props.onArticleDeleteRequest(props.articleToShow.id);
    }

    function handleEdit() {
        props.onArticleEditRequest(props.articleToShow.id);
    }

    function createSelectedLabels(props) {
        if (props.articleToShow && props.articleToShow.labels) {
            const labels =  props.articleToShow.labels.map((labelId) => { 
                for (var i=0; i<props.labelOptionList.length; i++) {
                    if (props.labelOptionList[i].value === labelId) {
                        return {value: labelId, label: props.labelOptionList[i].label}; 
                    }
                }
                return [];
            }); 
            return labels;
        }
        return [];
    }

    return (
        <div className='article' key={props.articleToShow.id}>            
            <Title 
                title={props.articleToShow.title} 
                id={props.articleToShow.id} 
                status={props.articleToShow.status}                     
            />
            <ArticleLabelList labelList={createSelectedLabels(props)} />    
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
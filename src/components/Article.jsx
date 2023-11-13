import "../index.css";

import Title from "./Title";
import Timestamps from "./Timestamps";
import Content from "./Content";
import ArticleLabelList from "./ArticleLabelList";
import { actionButtonClassName, notesClassName, cardTitleClassName} from '../AppCss';

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

    console.log("[Article] rendering...... ");
    console.log(props);

    return (
        <div className={notesClassName} key={props.articleToShow.id}> 
            <Title 
                title={props.articleToShow.title} status={props.articleToShow.status}
            />
            <ArticleLabelList labelList={createSelectedLabels(props)} />    
            <Timestamps
                articleID={props.articleToShow.id} 
                createOn={props.articleToShow.createOn} 
                updateOn={props.articleToShow.updateOn}                     
            />            
            <Content textContent={props.articleToShow.textContent} />
            <div className="flex flex-row-reverse">
                <button className={actionButtonClassName} onClick={handleDelete}>Delete</button>    
                <button className={actionButtonClassName} onClick={handleEdit}>Detail</button>
            </div>
        </div>
    )
}

export default Article;
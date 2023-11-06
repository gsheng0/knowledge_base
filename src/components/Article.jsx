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

    console.log("[Article] rendering...... ");
    console.log(props);

    const actionButtonClassName = "bg-blue-100 mb-2 mt-2 mr-3 text-center text-sm text-blue-800 rounded-lg border-solid border-1 border-blue-400 outline outline-offset-1 outline-1 hover:text-blue-800 hover:font-extrabold";
    return (
        <div className='text-left text-sm  bg-yellow-50 rounded-3xl outline outline-1 outline-black' key={props.articleToShow.id}> 
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
                <button className={actionButtonClassName} onClick={handleEdit}>More</button>
            </div>
        </div>
    )
}

export default Article;
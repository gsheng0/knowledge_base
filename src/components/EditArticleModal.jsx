import Modal from 'react-modal';
import Select from "react-select";
import { useState } from 'react';
import "../index.css";


function EditArticleModal(props) {
    const [selectedLabels, setSelectedLabels] = useState(createSelectedLabels(props.articleToEdit))

    function createSelectedLabels(article) {
        if (article && article.labels) {
            return article.labels.map(e=>{ 
                return {value: e.id, label: e.articleLabel}; 
            }); 
        }
        return [];
    }

    function onMultiLableSelectorChange(data) {
        console.log("[EditArticleModal] onChange:")
        console.log(data);
        setSelectedLabels(data);
    }
    
    console.log("[EditArticleModal] rendering article editor: ");
    console.log(props.articleToEdit);

    return(
        <div>
            <Modal isOpen={props.popup} contentLabel="Article Editing Modal" >
                <h2>{ props.articleToEdit.id === "" ? "Creating New " : "Editing Existing "} 
                    Article......</h2><br />
                <form onSubmit={props.onSubmit}>
                    <label>ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input name="id" type="text" placeholder="id" readOnly 
                            value={props.articleToEdit.id}/><br />
                    <label>TITLE &nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input name="title" type="text" placeholder="Title" 
                            defaultValue={props.articleToEdit.title}/><br /><br />
                    <textarea name="content" placeholder="content" rows={20} cols={100} 
                            defaultValue={props.articleToEdit.content}/><br />
                    <Select 
                        name="labels"
                        options={props.labelOptionList}
                        placeholder="select labels"
                        value={selectedLabels}
                        onChange={onMultiLableSelectorChange}
                        isSearchable={true}
                        isMulti
                    />    
                    <label>Status &nbsp;&nbsp;</label>
                        <input name="status" type="text" placeholder="status" readOnly 
                            value={props.articleToEdit.status}/><br /><br />
                    <button onClick={props.onCancel}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit">Apply</button>
                </form>
            </Modal>
        </div>            
    );
}

export default EditArticleModal;
import Modal from 'react-modal';
import Select from "react-select";
import { useEffect, useState } from 'react';
import "../index.css";


function EditArticleModal(props) {
    const [selectedLabels, setSelectedLabels] = useState(createSelectedLabels(props));

    function createSelectedLabels(props) {
        if (props.articleToEdit && props.articleToEdit.labels) {
            const labels =  props.articleToEdit.labels.map((labelId) => { 
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

    useEffect(()=>{
        // debugger
        const currSelectedLabels = createSelectedLabels(props);
        console.log("[EditArticleModal] useEffect setSelctedLabels");
        console.log(currSelectedLabels);
        setSelectedLabels(currSelectedLabels);
    }, [props.articleToEdit]);

    function onMultiLableSelectorChange(data) {
        console.log("[EditArticleModal] onChange:")
        console.log(data);
        setSelectedLabels(data);
    }
    
    console.log("[EditArticleModal] rendering......");
    console.log( props);
    console.log(selectedLabels);

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
                    <textarea name="textContent" placeholder="content" rows={20} cols={100} 
                            defaultValue={props.articleToEdit.textContent}/><br />
                    (expect it to be upgraded to a rich editor soon......)<br/>
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
                    <button type="submit">Apply</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={props.onCancel}>Cancel</button>
                </form>
            </Modal>
        </div>            
    );
}

export default EditArticleModal;
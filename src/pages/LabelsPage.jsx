import { useState, useEffect } from "react";

import LabelList from "../components/LabelList";
import EditLabelModal from "../components/EditLabelModal";
import { LABELS } from "../components/MenuBar";
import { KbRepo } from "../KbRepo";
import "../index.css";


function LabelsPage(props) {
    const [labelList, setLabelList] = useState([]);
    const [labelOptionList, setLabelOptionList] = useState([]);
    const [label, setLabel] = useState({});
    const [labelModalIsOpen, setLabelModalIsOpen] = useState(false);

    useEffect(()=>{
        KbRepo.getLabelList(props.userId, (dbLabelList)=>{ 
                console.log("[App] setting label list: ");
                console.log(dbLabelList);
                setLabelList(dbLabelList); 
                setLabelOptionList(createLabelOptionListFromLabelList(dbLabelList));
            });
        }, [] 
    ); 

    function createLabelOptionListFromLabelList (articleLabelList) {
        return articleLabelList.map((e) => {
            return { value: e.id, label: e.articleLabel}
        });
    }

    function editLabel(id) {       
        labelList.forEach((label)=>{
            if (label.id === id) {
                setLabel(label);
            }
        })
        setLabelModalIsOpen(true);
    }

    function deleteLabel(id) {
        console.log("[App]: deleting label: " + id);
        var leftLabelList = 
                labelList.map((label)=>{ 
                    if (label.id === id) {
                        label.status = "deleted"; 
                    }
                    return label;
                });
        setLabelList(leftLabelList);
    }

    function getArticleLabelId(articleLabel) {
        for (var i = 0; i<labelList.length; i++) {
            if (labelList[i].articleLabel === articleLabel) {
                return labelList[i].id;
            }
        }
        return null;
    }

    function applyLabelModal(event) {
        event.preventDefault();
        var modalId = event.target.id.value;
        var modalArticleLabel = event.target.articleLabel.value;        
        if (modalArticleLabel === "") {
            console.log("[App]: Article label can't be empty!");
            return;
        } else {
            if (modalId === "") {
                if (getArticleLabelId(modalArticleLabel)) {
                    alert("label " + modalArticleLabel + " already exists!");
                    return;
                }
                KbRepo.uuid("label", (idFromDB) => {
                    const labelToCreate = {...label, id: idFromDB, userId: props.userId, articleLabel: modalArticleLabel};
                    console.log("[App] applyLableModel new-label:");
                    console.log(labelToCreate);
                    setLabel(labelToCreate);
                    setLabelList(prevalue => { return [labelToCreate, ...prevalue]; }); 
                }) ;
            } else { // modify existing
                const existingLabelId = getArticleLabelId(modalArticleLabel);
                if (existingLabelId && existingLabelId !== modalId) {
                    alert("label " + modalArticleLabel + " already exists!");
                    return;
                }
                var newLabelList = labelList.map((label)=>{
                    if (label.id === modalId) {
                        label.articleLabel = modalArticleLabel;
                        label.status = "modified";
                    }
                    return label; 
                });
                setLabelList(newLabelList);
            }
            setLabelModalIsOpen(false);
        }
    }

    function cancelLabelModal() {
        setLabelModalIsOpen(false);
        console.log("[App]: cancel from label Modal");
    }

    function newLabel() {
        setLabel({   
            id: "",
            articleLabel: "",
            originalArticleLable: "",
            status: "new" 
        });
        setLabelModalIsOpen(true);
    }

    function saveLabelChanges() {
        console.log("[App]: Saving labels......");
        const listToSave = labelList.filter((label) => label.status !== "deleted");        
        KbRepo.updateLabelList(listToSave, () => {
            console.log("[App] saved.")
            const newLabelList = listToSave.map((label) => {
                label.status = "intact";
                return label;
            }) 
            setLabelList(newLabelList);            
            setLabelOptionList(createLabelOptionListFromLabelList(newLabelList));
        });
    }

    function retrieveLabels() {
        KbRepo.getLabelList((dbLabelList) => {
            setLabelList(dbLabelList);
        });                
    }

    function revertLabel() {
        console.log("[App]: revert changes pressed.");
        retrieveLabels();
    }


    return <div>
        <center><h1>My Labels</h1>
        { props.userId ?
            <div>
                <button onClick={newLabel}><h3>New</h3>
                    </button>&nbsp;&nbsp;&nbsp;
                <button onClick={saveLabelChanges}><h3>Save</h3>
                    </button>&nbsp;&nbsp;&nbsp;
                <button onClick={revertLabel}><h3>Revert</h3>
                    </button>&nbsp;&nbsp;&nbsp;
            </div>
            : <h4>login first!</h4>
        }    
        </center>
        <LabelList 
            currMainScreen={LABELS}
            labelList={labelList} 
            onLabelEdit={editLabel}
            onLabelDelete={deleteLabel}
        />        
        <EditLabelModal 
            popup={labelModalIsOpen}   
            labelToEdit={label}
            onSubmit={applyLabelModal}
            onCancel={cancelLabelModal}
        />
    </div>
}

export default LabelsPage;

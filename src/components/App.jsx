import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { KbRepo } from "../KbRepo";

import "../index.css";
import {ARTICLES, MenuBar} from "./MenuBar";
import ArticleList from "./ArticleList";
import LabelList from "./LabelList";
import EditArticleModal from "./EditArticleModal";
import SearchCriterialModal from "./SearchCriteriaModal";
import EditLabelModal from "./EditLabelModal";

function App () {
    /* ----------- states and effects
       ----------- */
    const [mainScreen, setMainScreen] = useState(ARTICLES)

    const [articleList, setArticleList] = useState([]);   
    const [articleModalIsOpen, setArticleModalIsOpen] = useState(false);
    const [article, setArticle] = useState({});

    const [searchCriteria, setSearchCriteria] = useState("");
    const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

    const [labelList, setLabelList] = useState([]);
    const [labelModalIsOpen, setLabelModalIsOpen] = useState(false);
    const [label, setLabel] = useState({});

    const [labelOptionList, setLabelOptionList] = useState([]);

    function createLabelOptionListFromLabelList (articleLabelList) {
        return articleLabelList.map((e) => {
            return { value: e.id, label: e.articleLabel}
        });
    }

    useEffect(()=>{
            KbRepo.getMostRecentArticles(3, (dbArticleList) => {
                setArticleList(dbArticleList);
            });
            KbRepo.getMostRecentCriteria(1, (criteria) => {
                setSearchCriteria(criteria.contentPattern);
            }); 
            KbRepo.getLabelList((dbLabelList)=>{ 
                console.log("[App] setting label list: ");
                console.log(dbLabelList);
                setLabelList(dbLabelList); 
                setLabelOptionList(createLabelOptionListFromLabelList(dbLabelList));
            });
        }, [] // only when initializing
    ); 

    /* --- main screen 
       ---------------- */
    function changeMainScreen(event) {
        event.preventDefault();
        const pickedScreen = event.target.value;
        setMainScreen(pickedScreen);
        console.log("[App]: picked: " + pickedScreen);
    }

    /* --- create Article
       ------------------ */
    function newArticle() {
        var datetimestr = new Date().toISOString();
        setArticle({   
            id: "",
            title: "",
            textContent: "",
            labels: [],
            createOn: datetimestr, 
            updateOn: datetimestr,
            status: "new" 
        });
        setArticleModalIsOpen(true);
    }

    function editArticle(id) {       
        articleList.forEach((article)=>{
            if (article.id === id) {
                setArticle(article);
            }
        })
        setArticleModalIsOpen(true);
    }

    function deleteArticle(id) {
        console.log("[App]: deleting: " + id);
        var leftArticleList = 
        articleList.map((article)=>{ 
            if (article.id === id) {
                article.status = "deleted"; 
            }
            return article;
        });
        setArticleList(leftArticleList);
    }
    
    function applyArticleModal(event) {
        event.preventDefault();
        var modalId = event.target.id.value;
        var modalTitle = event.target.title.value;
        var modalContent = event.target.content.value;
        var modalSelectedLabels = [];
        const labels = event.target.labels;
        for (var i=0; i<labels.length; i++) {
            modalSelectedLabels.push(labels[i].value);
        }        
        console.log("[App] applyArticleModel: ");
        console.log({title: modalTitle, content: modalContent, labels: modalSelectedLabels});
        if (modalTitle === "" || modalContent === "") {
            console.log("[App]: title or content can't be empty!");
            return;
        } else {
            if (modalId === "") {
                var articleToCreate = {...article, id: uuid(), title: modalTitle, content: modalContent, labels: modalSelectedLabels};
                console.log("[App] new article:");
                console.log(articleToCreate);
                setArticle(articleToCreate);
                setArticleList(prevalue => { return [articleToCreate, ...prevalue]; }); 
            } else { // modify existing
                var newArticleList = articleList.map((articleToModify)=>{
                    if (articleToModify.id === modalId) {                        
                        articleToModify.title = modalTitle;
                        articleToModify.content = modalContent;
                        articleToModify.labels = modalSelectedLabels;
                        articleToModify.status = "modified";
                    }
                    console.log("[App] modified article:");
                    console.log(articleToModify);
                    return articleToModify; 
                });
                setArticleList(newArticleList);
            }
            setArticleModalIsOpen(false);
        }
    }

    function cancelArticleModal() {
        setArticleModalIsOpen(false);
        console.log("[App]: cancel from article Modal");
    }

    /* --- Search Article
       ------------------ */
    function searchArticle() { setSearchModalIsOpen(true); }

    function applySearchModal(event) {
        event.preventDefault();
        setSearchModalIsOpen(false);
        var inputCriteria = event.target.searchCriteriaField.value;
        retrieveArticles(inputCriteria);        
    }
    
    function cancelSearchModal() { setSearchModalIsOpen(false); }
   
    /* ------ create labels
       -------------------- */
    function newLabel() {
        setLabel({   
            id: "",
            articleLabel: "",
            originalArticleLable: "",
            status: "new" 
        });
        setLabelModalIsOpen(true);
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

    function applyLabelModal(event) {
        event.preventDefault();
        var modalId = event.target.id.value;
        var modalArticleLabel = event.target.articleLabel.value;
        if (modalArticleLabel === "") {
            console.log("[App]: Article label can't be empty!");
            return;
        } else {
            if (modalId === "") {
                var labelToCreate = {...label, id: uuid(), articleLabel: modalArticleLabel};
                setLabel(labelToCreate);
                setLabelList(prevalue => { return [labelToCreate, ...prevalue]; }); 
            } else { // modify existing
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

    /* ------- db 
       ------- */
    function retrieveArticles(inputCriteria) {
        if (inputCriteria === "") {
            inputCriteria = "WILL-NEVER-EXIST";
        }
        if (inputCriteria !== searchCriteria) {
            setSearchCriteria(inputCriteria);
            console.log("[App]: criteria:" + inputCriteria);
            KbRepo.searchForArticle(inputCriteria, (dbArticleList) => {
                setArticleList(dbArticleList);
            });        
            KbRepo.updateCriteria(inputCriteria);
        }
    }

    function saveArticleChanges() {
        var savedArticleList = 
            articleList
                .filter((article)=>{ return article.status !== "intact" })
                .map((article) => {
                    if (article.status === "new") {
                        console.log("[App]: inserting " + article.id + " " + article.title + "......");
                        KbRepo.uploadArticle(article, (rowsUpdated) => { });
                    }
                    else if (article.status === "deleted") {
                        console.log("[App]: deleting " + article.id + " " + article.title + "......");
                        KbRepo.deleteArticle(article.id);
                    }
                    else if (article.status === "modified") {
                        KbRepo.updateArticle(article);
                    }
                    return article;
                });
        if (savedArticleList.length !== 0) {
            var newArticleList = 
            articleList.filter((article)=>{ 
                var keep = (article.status !== "deleted") ;
                article.status = "intact"; 
                return keep; 
            });
            setArticleList(newArticleList);            
        }
    }

    function revertArticle() {
        console.log("[App]: revert changes pressed.");
        retrieveArticles(searchCriteria);
    }

    function retrieveLabels() {
        KbRepo.getLabelList((dbLabelList) => {
            setLabelList(dbLabelList);
        });                
    }

    function saveLabelChanges() {
        console.log("[App]: Saving labels......");
        var savedLabelList = 
            labelList
                .filter((label)=>{ return label.status !== "intact" })
                .map((label) => {
                    if (label.status === "new") {
                        console.log("[App]: inserting " + label.id + " " + label.articleLable + "......");
                        KbRepo.updateLabel(label, (rowsUpdated) => { });
                    }
                    else if (label.status === "deleted") {
                        console.log("[App]: deleting " + label.id + " " + label.articleLabel + "......");
                        // KbRepo.deleteLabel(label.id);
                    }
                    else if (label.status === "modified") {
                        console.log("[App]: modified " + label.id + " " + label.articleLabel + "......");
                        KbRepo.updateLabel(label);
                    }
                    return label;
                });
        if (savedLabelList.length !== 0) {
            var newLabelList = 
                labelList.filter((label)=>{ 
                    var keep = (label.status !== "deleted") ;
                    label.status = "intact"; 
                    return keep; 
                });
            setLabelList(newLabelList);            
            setLabelOptionList(createLabelOptionListFromLabelList(labelList));
        }
    }

    function revertLabel() {
        console.log("[App]: revert changes pressed.");
        retrieveLabels();
    }


    /* -------------  HTML
       ------------------- */
    return (
        <div id="App">
            <MenuBar
                selectedScreen={mainScreen}
                onMainScreenChange={changeMainScreen}
                onSearchArticle={searchArticle}
                onNewArticle={newArticle}
                onSaveArticleChanges={saveArticleChanges}
                onRevertArticle={revertArticle}
                onNewLabel={newLabel}
                onSaveLabelChanges={saveLabelChanges}
                onRevertLabel={revertLabel}
            />
            {
                mainScreen === ARTICLES
                ?
                    <ArticleList 
                        articleListToShow={articleList} 
                        onArticleEdit={editArticle}
                        onArticleDelete={deleteArticle}
                    />
                :
                    <LabelList 
                        currMainScreen={mainScreen}
                        labelList={labelList} 
                        onLabelEdit={editLabel}
                        onLabelDelete={deleteLabel}
                    />
            }
            <SearchCriterialModal  
                popup={searchModalIsOpen}
                onSubmit={applySearchModal}
                onCancel={cancelSearchModal}
                criteria={searchCriteria}
            />
            <EditArticleModal
                popup={articleModalIsOpen}
                articleToEdit={article}
                labelOptionList={labelOptionList}
                onSubmit={applyArticleModal}
                onCancel={cancelArticleModal}
            />
            <EditLabelModal 
                popup={labelModalIsOpen}   
                labelToEdit={label}
                onSubmit={applyLabelModal}
                onCancel={cancelLabelModal}
            />
        </div> 
    ) ;
}

export default App;
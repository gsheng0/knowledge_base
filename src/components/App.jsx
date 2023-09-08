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

    useEffect(()=>{
            KbRepo.getMostRecentArticles(3, (dbArticleList) => {
                setArticleList(dbArticleList);
            });
            KbRepo.getMostRecentCriteria(1, (criteria) => {
                setSearchCriteria(criteria.contentPattern);
            }); 
            KbRepo.getLabelList((dbLabelList)=>{ 
                setLabelList(dbLabelList); 
            });
        }, [] // only when initializing
    ); 

    /* --- main screen 
       ---------------- */
    function changeMainScreen(event) {
        event.preventDefault();
        const pickedScreen = event.target.value;
        setMainScreen(pickedScreen);
        console.log("picked: " + pickedScreen);
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
        console.log("deleting: " + id);
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
        var newTitle = event.target.title.value;
        var newContent = event.target.content.value;
        var newId = event.target.id.value;
        if (newTitle === "" || newContent === "") {
            console.log("title or content can't be empty!");
            return;
        } else {
            if (newId === "") {
                var articleToCreate = {...article, id: uuid(), title: newTitle, content: newContent};
                setArticle(articleToCreate);
                setArticleList(prevalue => { return [articleToCreate, ...prevalue]; }); 
            } else { // modify existing
                var newArticleList = articleList.map((article)=>{
                    if (article.id === newId) {
                        article.title = newTitle;
                        article.content = newContent;
                        article.status = "modified";
                    }
                    return article; 
                });
                setArticleList(newArticleList);
            }
            setArticleModalIsOpen(false);
        }
    }

    function cancelArticleModal() {
        setArticleModalIsOpen(false);
        console.log("cancel from article Modal");
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
        console.log("deleting label: " + id);
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
        var newId = event.target.id.value;
        var newArticleLabel = event.target.title.value;
        if (newArticleLabel === "") {
            console.log("Article label can't be empty!");
            return;
        } else {
            if (newId === "") {
                var labelToCreate = {...label, id: uuid(), articleLabel: newArticleLabel};
                setLabel(labelToCreate);
                setLabelList(prevalue => { return [labelToCreate, ...prevalue]; }); 
            } else { // modify existing
                var newLabelList = labelList.map((label)=>{
                    if (label.id === newId) {
                        label.newArticleLabel = newArticleLabel;
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
        console.log("cancel from label Modal");
    }

    /* ------- db 
       ------- */
    function retrieveArticles(inputCriteria) {
        if (inputCriteria === "") {
            inputCriteria = "WILL-NEVER-EXIST";
        }
        if (inputCriteria !== searchCriteria) {
            setSearchCriteria(inputCriteria);
            console.log("criteria:" + inputCriteria);
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
                        console.log("inserting " + article.id + " " + article.title + "......");
                        KbRepo.uploadArticle(article, (rowsUpdated) => { });
                    }
                    else if (article.status === "deleted") {
                        console.log("deleting " + article.id + " " + article.title + "......");
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
        console.log("revert changes pressed.");
        retrieveArticles(searchCriteria);
    }

    function retrieveLabels() {
        KbRepo.getLabelList((dbLabelList) => {
            setLabelList(dbLabelList);
        });                
    }

    function saveLabelChanges() {
        var savedLabelList = 
            labelList
                .filter((label)=>{ return label.status !== "intact" })
                .map((label) => {
                    if (label.status === "new") {
                        console.log("inserting " + label.id + " " + label.articleLable + "......");
                        KbRepo.uploadLabel(label, (rowsUpdated) => { });
                    }
                    else if (label.status === "deleted") {
                        console.log("deleting " + label.id + " " + label.articleLabel + "......");
                        // KbRepo.deleteLabel(label.id);
                    }
                    else if (label.status === "modified") {
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
        }
    }

    function revertLabel() {
        console.log("revert changes pressed.");
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
                onSubmit={applyArticleModal}
                onCancel={cancelArticleModal}
                articleToEdit={article}
            />
            <EditLabelModal 
                popup={labelModalIsOpen}                     
                onSubmit={applyLabelModal}
                onCancel={cancelLabelModal}
                labelToEdit={label}
            />
        </div> 
    ) ;
}

export default App;
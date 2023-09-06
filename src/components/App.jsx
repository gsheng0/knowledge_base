import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { KbRepo } from "../KbRepo";

import "../index.css";
import MenuBar from "./MenuBar";
import ArticleList from "./ArticleList";
import EditArticleModal from "./EditArticleModal";
import SearchCriterialModal from "./SearchCriteriaModal";
import LabelManagerModal from "./LabelManagerModal";

function App () {
    /* ----------- states and effects
       ----------- */
    const [articleList, setArticleList] = useState([]);
    const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
    const [articleModalIsOpen, setArticleModalIsOpen] = useState(false);
    const [article, setArticle] = useState({});
    const [searchCriteria, setSearchCriteria] = useState("");
    const [labelManagerIsOpen, setLabelManagerIsOpen] = useState(false);

    useEffect(()=>{
            KbRepo.getMostRecentArticles(3, (dbArticleList) => {
                setArticleList(dbArticleList);
            });
            KbRepo.getMostRecentCriteria(1, (criteria) => {
                setSearchCriteria(criteria.contentPattern);
            }); 
        }, [] // only when initializing
    ); 

    /* --------------- Search Article
       --------------- */
    function searchArticle() { setSearchModalIsOpen(true); }

    function applySearchModal(event) {
        event.preventDefault();
        setSearchModalIsOpen(false);
        var inputCriteria = event.target.searchCriteriaField.value;
        retrieve(inputCriteria);        
    }
    
    function cancelSearchModal() { setSearchModalIsOpen(false); }

    /* --------------- create Article
       --------------- */
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

    /* -------------------- mangaging labels
       -------------------- */
    function labelManager() {
        setLabelManagerIsOpen(true);
    
    }

    function closeLableManager() {
        setLabelManagerIsOpen(false);

    }

    /* ------- db 
       ------- */
    function retrieve(inputCriteria) {
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

    function save() {
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

    function revert() {
        console.log("revert changes pressed.");
        retrieve(searchCriteria);
    }

    return (
        <div id="App">
            <MenuBar 
                onSearch={searchArticle}
                onNew={newArticle}
                onSave={save}
                onRevert={revert}
                onLabel={labelManager}
            />
            <ArticleList 
                articleListToShow={articleList} 
                onArticleEdit={editArticle}
                onArticleDelete={deleteArticle}
            />
            <LabelManagerModal 
                popup={labelManagerIsOpen}                     
                onClose={closeLableManager}
            />
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
        </div> 
    ) ;
};

export default App;
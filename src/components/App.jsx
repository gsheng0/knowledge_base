import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Modal from 'react-modal';

import {Database} from "../Util";

import "../index.css";
import Article from "./Article";

function App () {
    const [articleList, setArticleList] = useState([]);
    const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);
    const [articleModalIsOpen, setArticleModalIsOpen] = useState(false);
    const [article, setArticle] = useState({});
    const [searchCriteria, setSearchCriteria] = useState("");

    /* ---------------
        Search Article
       --------------- */
    function searchArticle() { setSearchModalIsOpen(true); }

    function applySearchModal(event) {
        event.preventDefault();
        setSearchModalIsOpen(false);
        var inputCriteria = event.target.searchCriteriaField.value;
        retrieve(inputCriteria);
    }
    
    function retrieve(inputCriteria) {
        if (inputCriteria === "") {
            inputCriteria = "WILL-NEVER-EXIST";
        }
        setSearchCriteria(inputCriteria);
        console.log("criteria:" + inputCriteria);
        Database.searchForArticle(inputCriteria, (dbArticleList) => {
            setArticleList(dbArticleList);
        });        
    }

    function cancelSearchModal() { setSearchModalIsOpen(false); }

    /* ---------------
        create Article
       --------------- */
    function newArticle() {
        var datetimestr = new Date().toISOString();
        setArticle({   
            id: "",
            title: "",
            content: "",
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
        console.log("OK from article Modal");
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

    useEffect(()=>{
        Database.getMostRecentArticles(3, (dbArticleList) => {
            setArticleList(dbArticleList);
        }); }, [] // only when initializing
    ); 

    function save() {
        var savedArticleList = 
            articleList
                .filter((article)=>{ return article.status !== "intact" })
                .map((article) => {
                    if (article.status === "new") {
                        console.log("inserting " + article.id + " " + article.title + "......");
                        Database.uploadArticle(article, (rowsUpdated) => { });
                    }
                    else if (article.status === "deleted") {
                        console.log("deleting " + article.id + " " + article.title + "......");
                        Database.deleteArticle(article.id);
                    }
                    else if (article.status === "modified") {

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
            <div>
                <button onClick={searchArticle}><h3>Search Article</h3></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={newArticle}><h3>New Article</h3></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={save}><h3>Save Change</h3></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={revert}><h3>Revert Change</h3></button>
            </div>
            <div className="AticleList">
                { 
                    articleList.map((article) => {
                        return (
                        <Article 
                            key={article.id}
                            item={article}
                            onArticleDeleteRequest={deleteArticle}
                            onArticleEditRequest={editArticle}
                        />);
                    })
                }    
            </div>
            <div>
                <Modal isOpen={searchModalIsOpen} contentLabel="Search Criteria Modal" >
                    <h3>Enter Search Criteria</h3>
                    <form onSubmit={applySearchModal}>
                        <input 
                            id="searchCriteriaField" 
                            name="searchCriteriaField" 
                            type="text"
                            placeholder="search critria" 
                            defaultValue={searchCriteria}
                        /> <br />
                        <button onClick={cancelSearchModal}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button>Apply</button>
                    </form>
                </Modal>
            </div>
            <div>
                <Modal isOpen={articleModalIsOpen} contentLabel="Article Editing Modal" >
                    <h2>{ article.id === "" ? "Creating New " : "Editing Existing "} Article......</h2><br />
                    <form onSubmit={applyArticleModal}>
                        <label>ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input name="id" type="text" placeholder="id" readOnly value={article.id}/><br />
                        <label>TITLE &nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <input name="title" type="text" placeholder="Title" defaultValue={article.title}/><br /><br />
                        <textarea name="content" placeholder="content" rows={20} cols={100} defaultValue={article.content}/><br />
                        <label>Status &nbsp;&nbsp;
                            </label><input name="status" type="text"  placeholder="status" readOnly value={article.status}/><br /><br />
                        <button onClick={cancelArticleModal}>Cancel</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="submit">Apply</button>
                    </form>
                </Modal>
            </div>            
        </div> 
     ) ;
};

export default App;
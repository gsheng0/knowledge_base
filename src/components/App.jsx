import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import {Database} from "../Util";

import "../index.css";
import Article from "./Article";

function App () {
    const [articleList, setArticleList] = useState([]);

    useEffect(()=>{
        Database.getMostRecentArticles(3, (dbArticleList) => {
            setArticleList(dbArticleList);
        }); }, [] // only when initializing
    ); 

    function retrieve(inputCriteria) {
        // var inputCriteria = event.target.searchCriteriaField.value;
        if (inputCriteria === "") {
            inputCriteria = "WILL-NEVER-EXIST";
        }
        console.log("criteria:" + inputCriteria);
        Database.searchForArticle(inputCriteria, (dbArticleList) => {
            setArticleList(dbArticleList);
        });        
    }

    function add(title, content) {
        if (title === "" || content === "") {
            console.log("title or content can't be empty!");
            return;
        }
        console.log("adding " + title + "......");
        var datetimestr = new Date().toISOString();
        setArticleList(prevalue => { 
            return [{   id: uuid(),
                        title: title,
                        content: content,
                        labels: [],
                        createOn: datetimestr, 
                        updateOn: datetimestr,
                        status: "new" 
                    }, ...prevalue
            ];
        });
    }

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

    function submit(event) {
        event.preventDefault();
        var actionType = event.target.actionType.value;
        if (actionType === "retrieve") { 
            retrieve(event.target.searchCriteriaField.value)
        }
        else if (actionType === "add") {
            add(event.target.title.value, event.target.content.value);
        }
        else if (actionType === "save") {
            save();
        }
    }

    return (
        <div id="App">
            <div className="controlPanel">
                <form onSubmit={submit}>
                    <input name="id" type="text" placeholder="id" />
                    <input name="status" type="text"  placeholder="status" /><br />
                    <input name="title" type="text" placeholder="Title" /><br />
                    <textarea name="content" placeholder="content" rows={5} cols={43} /><br />
                    <label><input type="radio" value="add" name="actionType" defaultChecked />Add&nbsp;&nbsp;&nbsp;</label>
                    <label><input type="radio" value="save" name="actionType" />Save&nbsp;&nbsp;&nbsp;</label>
                    <label><input type="radio" value="retrieve" name="actionType" />Retrieve</label>
                    {/* <select id="actionType" name="actionType">                        <option value="add">add</option>                        <option value="retrieve">retrieve</option>                        <option value="save">save</option>                    </select> */}
                    <br />
                    <input 
                        id="searchCriteriaField" 
                        name="searchCriteriaField" 
                        type="text"
                        placeholder="search critria" 
                    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button><h2>Submit</h2></button>
                </form>
            </div>
            <div className="AticleList">
                { 
                    articleList.map((article) => {
                        return (
                        <Article 
                            key={article.id}
                            item={article}
                            onArticleDeleteRequest={deleteArticle}
                        />);
                    })
                }    
            </div>
        </div> 
     ) ;
};

export default App;